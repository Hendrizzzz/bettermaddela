import { readFileSync } from "node:fs";

const sourceDocument = JSON.parse(
  readFileSync("src/data/civic/sources.json", "utf8"),
);
const recordDocument = JSON.parse(
  readFileSync("src/data/civic/records.json", "utf8"),
);

const errors = [];
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const isoTimestampPattern =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/;
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sha256Pattern = /^[a-f0-9]{64}$/;
const localPathPattern =
  /\b[A-Za-z]:[\\/]|\\\\[^\\\s]+\\[^\s]+|(?<!:)\/\/[A-Za-z0-9._-]+\/[A-Za-z0-9$._-]+|\/(?:Users|home|tmp|private\/tmp|var\/tmp)\//;
const today = new Date().toISOString().slice(0, 10);
const allowedSourceTypes = new Set([
  "webpage",
  "pdf",
  "law",
  "social-post",
  "dataset",
  "procurement-record",
  "media-file",
  "permission-record",
  "direct-confirmation",
]);
const allowedSourceStates = new Set(["active", "superseded"]);
const allowedCadences = new Set([
  "monthly",
  "quarterly",
  "annually",
  "per-term",
  "per-document",
  "manual",
]);
const allowedRecordTypes = new Set([
  "municipal-identity",
  "legal-instrument",
  "statistic",
  "statistic-series",
  "barangay-dataset",
  "data-quality-reconciliation",
  "history-profile",
  "official-snapshot",
  "office-observation",
  "news-feed",
  "procurement-register",
  "community-profile",
  "weather-config",
]);

function requireText(value, path) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${path} must be a non-empty string`);
  }
}

function isValidDate(value) {
  if (typeof value !== "string" || !isoDatePattern.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function requireDate(value, path) {
  if (typeof value !== "string" || !isoDatePattern.test(value)) {
    errors.push(`${path} must use YYYY-MM-DD`);
  } else if (!isValidDate(value)) {
    errors.push(`${path} is not a valid calendar date`);
  }
}

function requireTimestamp(value, path) {
  if (typeof value !== "string") {
    errors.push(`${path} must be an ISO 8601 timestamp with an explicit offset`);
    return;
  }

  const match = value.match(isoTimestampPattern);
  if (!match) {
    errors.push(`${path} must be an ISO 8601 timestamp with an explicit offset`);
    return;
  }

  const [, year, month, day, hour, minute, second, , offsetHour, offsetMinute] = match;
  const date = `${year}-${month}-${day}`;
  const invalidClock =
    Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59;
  const invalidOffset =
    offsetHour !== undefined &&
    (Number(offsetHour) > 14 ||
      Number(offsetMinute) > 59 ||
      (Number(offsetHour) === 14 && Number(offsetMinute) !== 0));

  if (
    !isValidDate(date) ||
    invalidClock ||
    invalidOffset ||
    Number.isNaN(Date.parse(value))
  ) {
    errors.push(`${path} is not a valid ISO 8601 timestamp`);
  }
}

function duplicateValues(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item)) return true;
    seen.add(item);
    return false;
  });
}

if (sourceDocument.schemaVersion !== 1) {
  errors.push("sources.json schemaVersion must be 1");
}
if (recordDocument.schemaVersion !== 1) {
  errors.push("records.json schemaVersion must be 1");
}
if (!Array.isArray(sourceDocument.sources)) {
  errors.push("sources.json sources must be an array");
}
if (!Array.isArray(recordDocument.records)) {
  errors.push("records.json records must be an array");
}

const sources = Array.isArray(sourceDocument.sources)
  ? sourceDocument.sources
  : [];
const records = Array.isArray(recordDocument.records)
  ? recordDocument.records
  : [];
const sourceIds = sources.map((source) => source.id);
const recordIds = records.map((record) => record.id);
const sourceIdSet = new Set(sourceIds);
const sourceById = new Map(sources.map((source) => [source.id, source]));

for (const id of duplicateValues(sourceIds)) errors.push(`duplicate source id: ${id}`);
for (const id of duplicateValues(recordIds)) errors.push(`duplicate record id: ${id}`);

for (const [index, source] of sources.entries()) {
  const path = `sources[${index}]`;
  requireText(source.id, `${path}.id`);
  if (!idPattern.test(source.id ?? "")) errors.push(`${path}.id is not stable lowercase kebab-case`);
  requireText(source.title, `${path}.title`);
  requireText(source.publisher, `${path}.publisher`);
  requireText(source.url, `${path}.url`);
  requireText(source.documentType, `${path}.documentType`);
  requireDate(source.retrievedAt, `${path}.retrievedAt`);
  requireDate(source.verifiedAt, `${path}.verifiedAt`);
  requireText(source.verifier, `${path}.verifier`);
  if (!allowedSourceStates.has(source.sourceState)) {
    errors.push(`${path}.sourceState must be active or superseded`);
  }
  if (!allowedSourceTypes.has(source.documentType)) errors.push(`${path}.documentType is not supported`);

  if (source.url === undefined && source.documentType !== "direct-confirmation") {
    errors.push(`${path}.url is required unless the source is a direct confirmation`);
  }

  if (source.url !== undefined) {
    try {
      const url = new URL(source.url);
      if (url.protocol !== "https:") errors.push(`${path}.url must use HTTPS`);
      if (url.username || url.password) errors.push(`${path}.url must not contain credentials`);
      if (/^(?:www\.)?(?:google|bing)\./i.test(url.hostname)) {
        errors.push(`${path}.url must not be a search-results URL`);
      }
    } catch {
      errors.push(`${path}.url is invalid`);
    }
  }

  if (source.publishedAt !== undefined) requireDate(source.publishedAt, `${path}.publishedAt`);
  if (source.sha256 !== undefined && !sha256Pattern.test(source.sha256)) {
    errors.push(`${path}.sha256 must be a lowercase 64-character SHA-256 value`);
  }
  if (
    (source.documentType === "pdf" || source.documentType === "media-file") &&
    !sha256Pattern.test(source.sha256 ?? "")
  ) {
    errors.push(`${path}.sha256 is required for a PDF or media-file evidence source`);
  }
}

for (const [index, record] of records.entries()) {
  const path = `records[${index}]`;
  requireText(record.id, `${path}.id`);
  if (!idPattern.test(record.id ?? "")) errors.push(`${path}.id is not stable lowercase kebab-case`);
  requireText(record.type, `${path}.type`);
  requireText(record.label, `${path}.label`);
  if (!allowedRecordTypes.has(record.type)) errors.push(`${path}.type is not allowed in the accepted baseline`);
  if (!record.data || typeof record.data !== "object" || Array.isArray(record.data)) {
    errors.push(`${path}.data must be an object`);
  }
  if (!Array.isArray(record.sourceIds) || record.sourceIds.length === 0) {
    errors.push(`${path}.sourceIds must be a non-empty array`);
  } else {
    for (const sourceId of record.sourceIds) {
      if (!sourceIdSet.has(sourceId)) errors.push(`${path}.sourceIds does not resolve: ${sourceId}`);
    }
  }
  if (!record.claimSources || typeof record.claimSources !== "object" || Array.isArray(record.claimSources)) {
    errors.push(`${path}.claimSources must be an object`);
  } else {
    for (const [claim, ids] of Object.entries(record.claimSources)) {
      if (!Array.isArray(ids) || ids.length === 0) {
        errors.push(`${path}.claimSources.${claim} must be a non-empty array`);
        continue;
      }
      for (const sourceId of ids) {
        if (!record.sourceIds?.includes(sourceId)) {
          errors.push(`${path}.claimSources.${claim} references a source outside sourceIds: ${sourceId}`);
        }
      }
    }
    for (const field of Object.keys(record.data ?? {})) {
      if (!Object.hasOwn(record.claimSources, field)) {
        errors.push(`${path}.claimSources is missing the displayed data field: ${field}`);
      }
    }
  }
  if (record.status !== "verified") errors.push(`${path}.status must be verified in production data`);
  requireDate(record.lastVerified, `${path}.lastVerified`);
  requireText(record.acceptedBy, `${path}.acceptedBy`);
  if (record.acceptedBy === "openai-gpt-5.6-pro-researcher") {
    errors.push(`${path}.acceptedBy must be independent from the research preparer`);
  }
  requireTimestamp(record.acceptedAt, `${path}.acceptedAt`);
  requireDate(record.nextReviewOn, `${path}.nextReviewOn`);
  if (isValidDate(record.lastVerified) && isValidDate(record.nextReviewOn) && record.nextReviewOn < record.lastVerified) {
    errors.push(`${path}.nextReviewOn must not precede lastVerified`);
  }
  if (isValidDate(record.nextReviewOn) && record.nextReviewOn < today) {
    errors.push(`${path}.nextReviewOn has passed and requires reverification`);
  }
  if (!allowedCadences.has(record.updateCadence)) errors.push(`${path}.updateCadence is unsupported`);
  requireText(record.owner, `${path}.owner`);
  if (record.effectiveFrom !== undefined) requireDate(record.effectiveFrom, `${path}.effectiveFrom`);
  if (record.effectiveTo !== undefined) requireDate(record.effectiveTo, `${path}.effectiveTo`);
  if (
    isValidDate(record.effectiveFrom) &&
    isValidDate(record.effectiveTo) &&
    record.effectiveTo < record.effectiveFrom
  ) {
    errors.push(`${path}.effectiveTo must not precede effectiveFrom`);
  }
  if (
    Array.isArray(record.sourceIds) &&
    record.sourceIds.length > 0 &&
    record.sourceIds.every(
      (sourceId) => sourceById.get(sourceId)?.sourceState === "superseded",
    )
  ) {
    errors.push(`${path}.sourceIds must include at least one active source`);
  }
}

const barangayRecord = records.find((record) => record.id === "barangay-dataset-2026q2");
const populationRecord = records.find((record) => record.id === "population-2024-popcen");
const reconciliationRecord = records.find((record) => record.id === "barangay-population-reconciliation");

if (!barangayRecord || !populationRecord || !reconciliationRecord) {
  errors.push("population and barangay reconciliation records are required together");
} else {
  const barangays = barangayRecord.data?.barangays;
  if (!Array.isArray(barangays)) {
    errors.push("barangay-dataset-2026q2.data.barangays must be an array");
  } else {
    const populationSum = barangays.reduce((sum, barangay) => sum + (Number.isInteger(barangay.population) ? barangay.population : 0), 0);
    const codes = barangays.map((barangay) => barangay.psgcCode);
    const correspondenceCodes = barangays.map((barangay) => barangay.correspondenceCode);
    const names = barangays.map((barangay) => barangay.name);

    if (barangays.length !== barangayRecord.data.barangayCount) errors.push("barangay count does not match the barangay array");
    if (duplicateValues(codes).length > 0) errors.push("barangay PSGC codes must be unique");
    if (duplicateValues(correspondenceCodes).length > 0) errors.push("barangay correspondence codes must be unique");
    if (duplicateValues(names).length > 0) errors.push("barangay names must be unique");
    for (const [index, barangay] of barangays.entries()) {
      if (!/^\d{10}$/.test(barangay.psgcCode ?? "")) errors.push(`barangay ${index + 1} has an invalid PSGC code`);
      if (!/^\d{9}$/.test(barangay.correspondenceCode ?? "")) errors.push(`barangay ${index + 1} has an invalid correspondence code`);
      if (!["Urban", "Rural"].includes(barangay.classification)) errors.push(`barangay ${index + 1} has an invalid classification`);
      if (!Number.isInteger(barangay.population) || barangay.population < 0) errors.push(`barangay ${index + 1} has an invalid population`);
    }
    if (populationSum !== reconciliationRecord.data?.barangayPopulationSum) errors.push("computed barangay population sum does not match reconciliation data");
    if (populationSum !== populationRecord.data?.population) errors.push("computed barangay population sum does not match the municipal census record");
    if (reconciliationRecord.data?.difference !== 0) errors.push("barangay reconciliation difference must be zero");
  }
}

const serialized = JSON.stringify({ sources, records });
if (localPathPattern.test(serialized)) errors.push("production civic data contains a machine-local path");

if (errors.length > 0) {
  console.error(`Civic data validation failed (${errors.length} findings).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Civic data validation passed: ${records.length} verified records, ${sources.length} sources.`);
}
