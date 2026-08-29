"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Map as LeafletMapInstance, LatLngBounds } from "leaflet";

interface LuzonMapProps {
  /** Attribution line from the reviewed civic record, shown in the caption. */
  attribution: string;
  /** Static SVG fallback rendered inside <noscript> for visitors without JS. */
  children?: ReactNode;
}

interface LuzonFeatureProps {
  kind: "province" | "municipality";
  psgc?: string;
  name?: string;
  adm2_name?: string;
  area_sqkm?: number;
}

interface LuzonDocument {
  type: "FeatureCollection";
  features: GeoJSON.Feature[];
}

/*
 * Interactive Luzon locator for barangay profiles: opens framed on Quirino
 * province (nearby provinces partially visible) with Maddela highlighted, and
 * lets the visitor drag and zoom out to the rest of mainland Luzon. Vector
 * only — no raster basemap — with colors carried by CSS classes in atlas.css.
 */
export default function LuzonMap({ attribution, children }: LuzonMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let map: LeafletMapInstance | null = null;
    let disposed = false;

    async function build() {
      const [L, document] = await Promise.all([
        import("leaflet"),
        fetch("/assets/data/luzon-mainland-boundaries-codab.geojson").then(
          (response) => {
            if (!response.ok) {
              throw new Error(`Luzon dataset request failed: ${response.status}`);
            }
            return response.json() as Promise<LuzonDocument>;
          },
        ),
      ]);
      if (disposed || !containerRef.current) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: false,
        fadeAnimation: !reduceMotion,
        zoomAnimation: !reduceMotion,
        maxZoom: 11,
      });

      const provinces = document.features.filter(
        (feature) => (feature.properties as LuzonFeatureProps).kind === "province",
      );
      const maddela = document.features.find(
        (feature) => (feature.properties as LuzonFeatureProps).kind === "municipality",
      );

      const quirinoBounds: { current: LatLngBounds | null } = { current: null };

      const provinceDocument: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: provinces,
      };
      const provinceLayer = L.geoJSON(
        provinceDocument,
        {
          style: () => ({
            weight: 1,
            fillOpacity: 1,
            className: "luzon-leaf-prov",
          }),
          onEachFeature: (feature, layer) => {
            const props = (feature.properties ?? {}) as LuzonFeatureProps;
            const name = props.name ?? props.adm2_name ?? "Province";
            if (name === "Quirino") {
              quirinoBounds.current = (layer as unknown as { getBounds(): LatLngBounds }).getBounds();
            }
            layer.bindTooltip(name, { sticky: true, direction: "top" });
            layer.bindPopup(
              `<strong>${name}</strong><br>Mainland Luzon province shown for context. Boundaries: OCHA COD-AB, CC BY-IGO 3.0.`,
            );
          },
        },
      ).addTo(map);

      if (maddela) {
        const area = (maddela.properties as LuzonFeatureProps).area_sqkm;
        const maddelaDocument: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: [maddela],
        };
        L.geoJSON(
          maddelaDocument,
          {
            style: () => ({
              weight: 2,
              fillOpacity: 1,
              className: "luzon-leaf-maddela",
            }),
            onEachFeature: (_feature, layer) => {
              layer.bindTooltip("Maddela", {
                permanent: true,
                direction: "center",
                className: "atlas-leaf-label atlas-leaf-label--muni",
              });
              layer.bindPopup(
                `<strong>Maddela</strong><br>Municipality of Quirino, Region II${
                  area
                    ? ` — ${area.toLocaleString("en-PH", { maximumFractionDigits: 1 })} km²`
                    : ""
                } (OCHA COD-AB).`,
              );
            },
          },
        ).addTo(map);
      }

      const luzonExtent = provinceLayer.getBounds().pad(0.04);
      if (quirinoBounds.current) {
        map.fitBounds(quirinoBounds.current, { padding: [24, 24] });
      } else {
        map.fitBounds(luzonExtent);
      }
      map.setMaxBounds(luzonExtent);
      // Minimum zoom keeps the whole mainland in reach so "zoom out to see
      // Luzon" always works, without letting the map shrink into a dot.
      map.setMinZoom(map.getBoundsZoom(luzonExtent));

      containerRef.current
        .closest(".leaflet-shell")
        ?.classList.add("leaflet-shell--ready");
    }

    build().catch(() => {
      containerRef.current
        ?.closest(".leaflet-shell")
        ?.classList.add("leaflet-shell--failed");
    });

    return () => {
      disposed = true;
      map?.remove();
      map = null;
    };
  }, []);

  return (
    <figure className="luzon-loc">
      <div
        className="leaflet-shell leaflet-shell--luzon"
        role="region"
        aria-label="Interactive map of mainland Luzon, opened on Quirino province with Maddela highlighted. Drag to explore and zoom out to see the rest of the island."
      >
        <div ref={containerRef} className="leaflet-shell-canvas" />
      </div>
      {children && <noscript className="luzon-loc-noscript">{children}</noscript>}
      <figcaption className="luzon-loc-caption" lang="en">
        <span>
          Opened on Quirino with Maddela highlighted — drag to explore, zoom out
          for the rest of Luzon.
        </span>
        <span>{attribution}</span>
      </figcaption>
    </figure>
  );
}
