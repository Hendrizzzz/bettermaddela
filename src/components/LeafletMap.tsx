"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMapInstance, LatLngBounds } from "leaflet";
import { slugify } from "@/lib/slugify";

interface LeafletMapProps {
  variant: "hero" | "full";
  /** Reviewed population counts by barangay name, for the choropleth shading. */
  populations?: Record<string, number>;
  /** When true, barangay popups link to the barangay profile page. */
  linkBarangays?: boolean;
}

interface BoundaryFeatureProps {
  kind: "province" | "municipality" | "barangay" | "neighbour-municipality";
  psgc: string;
  name: string;
  area_sqkm: number;
}

interface BoundaryDocument {
  type: "FeatureCollection";
  attribution: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  generatedAt: string;
  note: string;
  features: GeoJSON.Feature[];
}

// Colors for every layer come from the Golden Hour tokens via CSS classes
// (see atlas.css), so the interactive map matches the stylized atlas exactly.
// No raster basemap is drawn: the dataset itself carries the place labels, and
// the data attribution lives in each page caption instead of on the map.
function bandIndexFor(share: number) {
  return Math.min(4, Math.max(0, Math.floor(share * 5)));
}

export default function LeafletMap({
  variant,
  populations,
  linkBarangays = false,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const populationsRef = useRef(populations);
  populationsRef.current = populations;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let map: LeafletMapInstance | null = null;
    let disposed = false;

    async function build() {
      const [L, boundaryDocument] = await Promise.all([
        import("leaflet"),
        fetch("/assets/data/maddela-boundaries-codab.geojson").then((response) => {
          if (!response.ok) throw new Error(`Boundary dataset request failed: ${response.status}`);
          return response.json() as Promise<BoundaryDocument>;
        }),
      ]);
      if (disposed || !containerRef.current) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: false,
        fadeAnimation: !reduceMotion,
        zoomAnimation: !reduceMotion,
      });

      const counts = Object.values(populationsRef.current ?? {}).sort((a, b) => a - b);
      const quantile = (fraction: number) =>
        counts.length === 0
          ? 0
          : counts[Math.min(counts.length - 1, Math.floor(fraction * counts.length))];
      const populationFloor = quantile(0);
      const populationCeiling = quantile(1);

      const contextFeatures = boundaryDocument.features.filter(
        (feature) => (feature.properties as BoundaryFeatureProps).kind !== "barangay",
      );
      const barangayFeatures = boundaryDocument.features.filter(
        (feature) => (feature.properties as BoundaryFeatureProps).kind === "barangay",
      );
      const contextDocument: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: contextFeatures,
      };
      const barangayDocument: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: barangayFeatures,
      };
      const municipalDocument: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: contextFeatures.filter(
          (feature) => (feature.properties as BoundaryFeatureProps).kind === "municipality",
        ),
      };

      const boundsRef: { current: LatLngBounds | null } = { current: null };
      const municipalBoundsRef: { current: LatLngBounds | null } = { current: null };

      // Paint order: province + neighbours first, barangays above, municipal
      // outline on top.
      L.geoJSON(contextDocument, {
        style: (feature) => {
          const props = (feature?.properties ?? {}) as BoundaryFeatureProps;
          if (props.kind === "province") {
            return {
              weight: 1.5,
              dashArray: "5 5",
              fillOpacity: 0.45,
              interactive: false,
              className: "atlas-leaf-prov",
            };
          }
          return {
            weight: 1,
            fillOpacity: 0.5,
            className: "atlas-leaf-nb",
          };
        },
        onEachFeature: (feature, layer) => {
          const props = (feature.properties ?? {}) as BoundaryFeatureProps;
          if (props.kind === "province") {
            boundsRef.current = (layer as unknown as { getBounds(): LatLngBounds }).getBounds();
            layer.bindTooltip("Quirino", {
              permanent: true,
              direction: "center",
              className: "atlas-leaf-label atlas-leaf-label--prov",
            });
            return;
          }
          layer.bindTooltip(props.name, {
            permanent: true,
            direction: "center",
            className: "atlas-leaf-label atlas-leaf-label--nb",
          });
          layer.bindPopup(
            `<strong>${props.name}</strong><br>${props.area_sqkm.toLocaleString("en-PH", {
              maximumFractionDigits: 1,
            })} km² — one of the five municipalities surrounding Maddela in Quirino province.`,
          );
        },
      }).addTo(map);

      L.geoJSON(barangayDocument, {
        style: (feature) => {
          const props = (feature?.properties ?? {}) as BoundaryFeatureProps;
          const population = populationsRef.current?.[props.name];
          const band =
            population === undefined
              ? 0
              : bandIndexFor(
                  (population - populationFloor) /
                    Math.max(1, populationCeiling - populationFloor),
                );
          return {
            weight: 1,
            fillOpacity: 0.85,
            className: `atlas-leaf-band-${band}`,
          };
        },
        onEachFeature: (feature, layer) => {
          const props = (feature.properties ?? {}) as BoundaryFeatureProps;
          const population = populationsRef.current?.[props.name];
          layer.bindTooltip(props.name, { sticky: true, direction: "top" });
          layer.bindPopup(
            `<strong>Barangay ${props.name}</strong>` +
              (population !== undefined
                ? `<br>${population.toLocaleString("en-PH")} residents (PSA census)`
                : "") +
              (linkBarangays
                ? `<br><a href="/government/barangays/${slugify(props.name)}">Open profile</a>`
                : ""),
          );
        },
      }).addTo(map);

      L.geoJSON(municipalDocument, {
        style: () => ({
          weight: 2.5,
          fill: false,
          interactive: false,
          className: "atlas-leaf-muni",
        }),
        onEachFeature: (_feature, layer) => {
          municipalBoundsRef.current = (layer as unknown as { getBounds(): LatLngBounds }).getBounds();
          layer.bindTooltip("Maddela", {
            permanent: true,
            direction: "center",
            className: "atlas-leaf-label atlas-leaf-label--muni",
          });
        },
      }).addTo(map);

      // Open framed on Maddela itself so the barangays fill the card; the
      // minimum zoom still lets the visitor zoom out to the whole province.
      if (municipalBoundsRef.current && boundsRef.current) {
        map.fitBounds(municipalBoundsRef.current, { padding: [28, 28] });
        const padded = boundsRef.current.pad(0.25);
        map.setMaxBounds(padded);
        map.setMinZoom(Math.max(1, map.getBoundsZoom(padded) - 1));
      }

      // The ready flag must land on the outer .leaflet-shell element: the
      // loading veil is removed via `.leaflet-shell--ready .leaflet-shell-canvas::before`.
      containerRef.current
        ?.closest(".leaflet-shell")
        ?.classList.add("leaflet-shell--ready");
    }

    build().catch((error) => {
      console.error("Leaflet map failed to initialize", error);
      containerRef.current
        ?.closest(".leaflet-shell")
        ?.classList.add("leaflet-shell--failed");
    });

    return () => {
      disposed = true;
      map?.remove();
      map = null;
    };
  }, [linkBarangays]);

  return (
    <div
      className={`leaflet-shell leaflet-shell--${variant}`}
      role="region"
      aria-label="Interactive map of Maddela and the surrounding Quirino province"
    >
      <div ref={containerRef} className="leaflet-shell-canvas" />
    </div>
  );
}
