# BetterMaddela research handoff: Municipal budget and financial-transparency documents (FY 2024–2026)

- Prepared by: research-agent:budget-2026-08 (non-human automated preparer)
- Prepared at: 2026-08-23T07:48:25+08:00
- Research cutoff: 2026-08-23
- Scope included: Enacted Annual Budget / Appropriations Ordinance (FY 2024–2026); Statement of Receipts and Expenditures (CY 2024–CY 2026 postings to date); Annual Procurement Plan (FY 2024–2026); Statement of Indebtedness Payments and Balances / Statement of Debt Services (CY 2024–CY 2025); Annual Investment Program; COA Annual Audit Reports for the Municipality of Maddela
- Scope excluded: Barangay-level finances; provincial and national budgets; school (SEF line items beyond the SRE columns); officials' SALNs; procurement contract awards (covered by a separate 2026-08 procurement handoff); direct confirmation by phone or in person
- Methods and access limits:
  - Read-only inspection of production data (`src/data/civic/records.json`, `src/data/civic/sources.json`) confirmed the site publishes no municipal budget total today.
  - The WebFetch tool failed with `Transport error` on fdp.dilg.gov.ph, fdpp.dilg.gov.ph (both schemes), lgu201.dilg.gov.ph, quirino.gov.ph, and all web.archive.org page URLs. Evidence collection therefore used Windows PowerShell 5.1 `Invoke-WebRequest` (TLS 1.2, read-only GET requests).
  - DILG Full Disclosure Policy Portal (https://fdpp.dilg.gov.ph/) was reachable this way. The Maddela report listing was enumerated at `https://fdpp.dilg.gov.ph/fdpp/report/index?region_filter=02&province_filter=057&lgu_filter=04` (optionally `&document_filter=<type>`), and individual documents were fetched from `https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=<ID>`. Nine files were downloaded to a machine-local temp directory (`%TEMP%\opencode\fdpp-evidence\`) that is outside the repository; they were hashed (SHA-256 below) and were NOT committed or copied into the repo.
  - The FDP documents are Excel workbooks (XLSX). Text was extracted by unzipping the packages in memory/temp and reading `xl/sharedStrings.xml` plus worksheet XML. Some merged-header cells did not resolve cleanly; where a column label could not be recovered reliably, the figure is reported with its raw column position and flagged rather than interpreted. Dates stored as Excel serial numbers were converted mechanically (epoch 1899-12-30): 45216→2023-10-17, 45478→2024-07-05, 45728→2025-03-12, 50956→2039-07-05.
  - Inaccessible avenues, with the environment's exact errors: coa.gov.ph → `403 Forbidden` (WAF/bot protection; also via WebFetch: `StatusCode: non 2xx status code (403 GET https://www.coa.gov.ph/reports/audit-reports/local-government-units/)`), including `/reports/audit-reports/local-government-units/` and `/downloads/local-government-units/` with full browser headers; quirino.gov.ph and www.quirino.gov.ph → `The remote name could not be resolved`; lgu201.dilg.gov.ph → `Unable to connect to the remote server`; facebook.com (LGU page posts) → `The remote server returned an error: (400) Bad Request.`; web.archive.org pages → `The remote name could not be resolved: 'web.archive.org'` (note: the archive.org availability API host did resolve and confirms a saved snapshot of the portal homepage at http://web.archive.org/web/20240501231330/https://fdpp.dilg.gov.ph/, but snapshot content could not be fetched from this environment). fdp.dilg.gov.ph (older portal host) was unreachable under both fetch paths.
  - The two broken Annual Budget Report files (FY2025 id=141187, FY2026 id=224583) were attempted three times each across separate sessions, once with a fresh portal session and Referer header, always returning `The remote server returned an error: (500) Internal Server Error.`
  - DILG Region II (https://region2.dilg.gov.ph/) was reachable; its transparency page (/4-transparency-page) contains only DILG-regional-office items and links back to the FDPP portal — no Maddela budget documents found there.
  - No binaries were placed in the repository; no production file was modified; nothing was committed.

## Source registry

### fdpp-maddela-report-index: FDPP Document Reports — filtered listing for Region 02 / Province 057 QUIRINO / LGU 04 MADDELA

- Publisher: Department of the Interior and Local Government — Full Disclosure Policy Portal (LGU-uploaded records)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/index?region_filter=02&province_filter=057&lgu_filter=04
- Document type: webpage
- Published at (when supplied): not supplied (portal shows posting periods per row instead)
- Effective period (when supplied): not supplied
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): none (HTML inspected live only)
- Notes: Each row supplies document title, LGU path ("REGION II - CAGAYAN VALLEY, QUIRINO, MADDELA"), posting period, document period, and a download link. Every Maddela row carries the description "This document was also posted at Municipal Public Market Bulletin Board, Municipal Gymnasium Bulletin Board, and Municipal Hall Bulletin Board." The default listing paginates (~8 pages × 10 rows of recent postings).

### fdpp-abr-fy2024-xlsx: ANNUAL BUDGET REPORT (FDPP Form 1b - Annual Budget Report, Summary), posting QUARTER 1 CY 2024, document period ANNUAL CY 2024

- Publisher: Municipality of Maddela (LGU-prepared form posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=70846
- Document type: dataset (XLSX workbook; sheets include "Form 1b - ABR Summary" and per-office Form 1a sheets)
- Published at (when supplied): posting period QUARTER 1 CY 2024 (no day-level date supplied by portal)
- Effective period (when supplied): ANNUAL CY 2024
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): abr-fy2024.bin (temp copy, not in repo), SHA-256 aa07c50b5f2684cffb139d141a87f6bcbfd9c99d7f8058c104314ef1aad50c31
- Notes: Workbook metadata: last modified 2024-02-28T16:25:00+08:00. Header block states REGION: REGION II - CAGAYAN VALLEY; PROVINCE: QUIRINO; CITY/MUNICIPALITY: MADDELA; year cell 2024. Column semantics recovered from merged headers: Past Year (Actual) = CY2023; Current Year = First Semester (Estimate) [col D], Second Semester (Estimate) [col E], TOTAL [col F]; an additional value column [col G] has no recoverable header label and carries alternative totals including a ₱300,000,000 row labelled "Approp. from Acquisition of Loan-Const. of Three Storey Farmer's Market Bldg." — see limitations in the candidate record. Certification rows name Municipal Treasurer DARIO M. GABAY and Municipal Budget Officer MELANIE C. CADAVIS; "APPROVED BY: RIMEL C. TOLENTINO, Municipal Mayor". No appropriations ordinance number appears anywhere in the workbook.

### fdpp-abr-fy2025-entry: ANNUAL BUDGET REPORT listing entry, posting QUARTER 1 CY 2025, document period ANNUAL CY 2025

- Publisher: Municipality of Maddela (listing on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=141187 (listed at https://fdpp.dilg.gov.ph/fdpp/report/index?region_filter=02&province_filter=057&lgu_filter=04&document_filter=1)
- Document type: dataset (unretrieved; download endpoint returns HTTP 500)
- Published at (when supplied): posting period QUARTER 1 CY 2025
- Effective period (when supplied): ANNUAL CY 2025
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): none — three download attempts each returned "The remote server returned an error: (500) Internal Server Error."
- Notes: Title and periods are evidenced by the listing page; the file's contents could not be inspected. No figures may be cited from this source.

### fdpp-abr-fy2026-entry: ANNUAL BUDGET REPORT listing entry, posting QUARTER 1 CY 2026, document period ANNUAL CY 2026

- Publisher: Municipality of Maddela (listing on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=224583 (listed at https://fdpp.dilg.gov.ph/fdpp/report/index?region_filter=02&province_filter=057&lgu_filter=04&document_filter=1)
- Document type: dataset (unretrieved; download endpoint returns HTTP 500)
- Published at (when supplied): posting period QUARTER 1 CY 2026
- Effective period (when supplied): ANNUAL CY 2026
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): none — three download attempts each returned "The remote server returned an error: (500) Internal Server Error."
- Notes: Same limitation as the FY2025 entry. Only the existence, title, and periods are evidenced.

### fdpp-app-fy2024-xlsx: ANNUAL PROCUREMENT PLAN (FDP Forms 4a/4b), posting QUARTER 1 CY 2024, document period ANNUAL CY 2024

- Publisher: Municipality of Maddela (BAC-prepared form posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=75598
- Document type: dataset (XLSX; sheets "Form 4a - APP Office", "Form 4b - APP Summary")
- Published at (when supplied): posting period QUARTER 1 CY 2024
- Effective period (when supplied): ANNUAL CY 2024
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): app-fy2024.bin (temp copy, not in repo), SHA-256 185c2611d046ae502bddce9c8028409babfdb7405eb28bdad96bbf0e6c1a5ab1
- Notes: Form 4b summary names heads of offices and per-office totals but contains no grand-total row as extracted. Several label cells use merged shared strings that did not resolve cleanly; amounts and office/name pairs that resolved are listed in the candidate record. Prepared by LOURDES B. AGDUYENG (Head, BAC Secretariat); Recommending Approval MELANIE C. CADAVIS (BAC Chairman).

### fdpp-app-fy2025-xlsx: ANNUAL PROCUREMENT PLAN (FDP Forms 4a/4b), posting QUARTER 1 CY 2025, document period ANNUAL CY 2025

- Publisher: Municipality of Maddela (BAC-prepared form posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=140908
- Document type: dataset (XLSX; "Form 4b - APP Summary")
- Published at (when supplied): posting period QUARTER 1 CY 2025
- Effective period (when supplied): ANNUAL CY 2025
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): app-fy2025.bin (temp copy, not in repo), SHA-256 eec31c850baac4c53eeb92d16b313b35c3d0742853621e2339df9c2819d8b175
- Notes: Clean extraction of the Form 4b summary (department, head of office, total cost). No grand-total row present in the sheet as extracted.

### fdpp-app-fy2026-xlsx: ANNUAL PROCUREMENT PLAN (FDP Forms 4a/4b), posting QUARTER 1 CY 2026, document period ANNUAL CY 2026

- Publisher: Municipality of Maddela (BAC-prepared form posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=220640
- Document type: dataset (XLSX; "Form 4b - APP Summary")
- Published at (when supplied): posting period QUARTER 1 CY 2026
- Effective period (when supplied): ANNUAL CY 2026
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): app-fy2026.bin (temp copy, not in repo), SHA-256 57da5ae2aac39116cf3570db0129eb78184d1ee08a6705a17df4e5a03c0977cf
- Notes: Includes an "ENGINEERING AND INFRASTRUCTURE PROJECT" block with named projects and estimated costs. Prepared-by block: ROWENA F. TAAN, BAC Secretariat. No grand-total row present in the sheet as extracted.

### fdpp-sre-q4cy2024-xlsx: STATEMENT OF RECEIPTS AND EXPENDITURES (BLGF form, DOF-BLGF Memorandum Circular No. 023-2019 dated January 22, 2019, Annex A), posting QUARTER 1 CY 2025, document period QUARTER 4 CY 2024 (full-year CY 2024)

- Publisher: Municipality of Maddela (posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=151383
- Document type: dataset (XLSX; "Form 3 - SRE")
- Published at (when supplied): posting period QUARTER 1 CY 2025
- Effective period (when supplied): QUARTER 4 CY 2024 (calendar-year totals)
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): sre-q4cy2024.bin (temp copy, not in repo), SHA-256 bee91bf6043ff814b6b1f97d1916e0c35ce2f7c9535492f68760e2c4afa2d65e
- Notes: Columns: Income Target/Budget Appropriation; actuals per General Fund, SEF, Trust Fund, Trust Liability, Total. Header: REGION II - CAGAYAN VALLEY / QUIRINO / MADDELA; CALENDAR YEAR 2024; QUARTER 4.

### fdpp-sre-q4cy2025-xlsx: STATEMENT OF RECEIPTS AND EXPENDITURES (BLGF form, DOF-BLGF Memorandum Circular No. 023-2019 dated January 22, 2019, Annex A), posting QUARTER 1 CY 2026, document period QUARTER 4 CY 2025 (full-year CY 2025)

- Publisher: Municipality of Maddela (posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=217543
- Document type: dataset (XLSX; "Form 3 - SRE")
- Published at (when supplied): posting period QUARTER 1 CY 2026
- Effective period (when supplied): QUARTER 4 CY 2025 (calendar-year totals)
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): sre-q4cy2025.bin (temp copy, not in repo), SHA-256 256bdf846d09ee3cbac32904e72dda2f2d3fc3206e59f1b3b6ecf61cb4f3a584
- Notes: Columns: Budget; actuals per General Fund, SEF, Trust Fund, Trust Liability, Total, % to Total Income. Calendar year 2025, quarter 4.

### fdpp-sre-q1cy2026-xlsx: STATEMENT OF RECEIPTS AND EXPENDITURES (BLGF form), posting QUARTER 2 CY 2026, document period QUARTER 1 CY 2026

- Publisher: Municipality of Maddela (posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=235452
- Document type: dataset (XLSX; "Form 3 - SRE")
- Published at (when supplied): posting period QUARTER 2 CY 2026
- Effective period (when supplied): QUARTER 1 CY 2026
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): sre-q1cy2026.bin (temp copy, not in repo), SHA-256 68dbcca3d02f8cf013c88e901bcfbe03b5f8a144da5ca3cdc3de07be504cc86c
- Notes: First quarter of CY 2026 only; beginning cash balances tie to the CY2025 full-year ending balances (₱124,675,213.81), supporting chain continuity.

### fdpp-soipb-q4cy2024-xlsx: STATEMENT OF INDEBTEDNESS PAYMENTS AND BALANCES (FDPP Form 2 - Annual Statement of Indebtedness, Payments and Balances; DOF-BLGF Memorandum Circular No. 023-2019 dated September 19, 2019, Annex A), posting QUARTER 1 CY 2025, document period QUARTER 4 CY 2024

- Publisher: Municipality of Maddela (posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=151379
- Document type: dataset (XLSX)
- Published at (when supplied): posting period QUARTER 1 CY 2025
- Effective period (when supplied): QUARTER 4 CY 2024 (report date printed as "4th Qtr. December 31, 2024")
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): soipb-q4cy2024.bin (temp copy, not in repo), SHA-256 301b022230895cc3cb3249f23eb3e220f35e456156e09a0fe9aa484030e0cb8e
- Notes: Single-loan statement. Certified correct by DARIO M. GABAY, Local Treasurer; Date Issued (Excel serial 45728) converts to 2025-03-12. Certificate Number NDSC/BC printed as 02-2023-09-266.

### fdpp-soipb-q4cy2025-xlsx: STATEMENT OF INDEBTEDNESS PAYMENTS AND BALANCES (FDPP Form 2), posting QUARTER 2 CY 2026, document period QUARTER 1 CY 2026 posting cycle — statement data dated QUARTER 4 CY 2025

- Publisher: Municipality of Maddela (posted on the DILG Full Disclosure Policy Portal)
- Original URL or direct-confirmation reference: https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=217733
- Document type: dataset (XLSX)
- Published at (when supplied): posting period QUARTER 2 CY 2026 (per portal row "QUARTER 2 CY 2026 / QUARTER 1 CY 2026" series; the workbook header states CALENDAR YEAR 2025, QUARTER 4)
- Effective period (when supplied): QUARTER 4 CY 2025
- Retrieved at: 2026-08-23
- Verified at: 2026-08-23
- Verifier: research-agent:budget-2026-08
- Source state (`active` or `superseded`): active
- Evidence file and SHA-256 (for downloaded evidence): soipb-q4cy2025.bin (temp copy, not in repo), SHA-256 089a399fee0a4aa6d98cb0247b3734d6c0fa3a3066d4fdb2190aa3294adf4d83
- Notes: Same LANDBANK loan as the CY2024 filing. Workbook header states REGION II - CAGAYAN VALLEY / QUIRINO / MADDELA, CALENDAR YEAR 2025, QUARTER 4; certified by DARIO M. GABAY, Local Treasurer. Values stored in merged cells resolved via shared strings; date fields are Excel serials converted mechanically (45216→2023-10-17, 45478→2024-07-05, 50956→2039-07-05).

## Candidate records

### maddela-fdp-abr-fy2024: FDPP Annual Budget Report summary, FY 2024 (General Fund)

- Type: transparency document
- Candidate data:
  - Document: FDPP Form 1b - Annual Budget Report, Summary ("PROGRAMMED APPROPRIATION AND OBLIGATION BY OBJECT OF EXPENDITURE"), General Fund
  - Publishing body: Municipality of Maddela; signatories: Municipal Treasurer DARIO M. GABAY, Municipal Budget Officer MELANIE C. CADAVIS, approved by Municipal Mayor RIMEL C. TOLENTINO
  - Fiscal period: CY 2024 estimates against CY 2023 actuals (columns "Past Year (Actual)" and "Current Year: First Semester (Estimate) / Second Semester (Estimate) / TOTAL")
  - National Tax Allotment, current-year TOTAL column: ₱349,694,707.00 (past-year actual ₱408,855,727.00)
  - TOTAL RECEIPTS, current-year TOTAL column: ₱366,435,771.83 (past-year actual ₱428,307,169.78)
  - TOTAL AVAILABLE RESOURCES, current-year TOTAL column: ₱442,588,892.76
  - TOTAL PERSONAL SERVICES, current-year TOTAL column: ₱149,786,638.96
  - TOTAL MAINTENANCE & OPERATING EXPENSES, current-year TOTAL column: ₱131,680,986.00
  - TOTAL CAPITAL OUTLAY, current-year TOTAL column: ₱40,427,162.50
  - TOTAL SPECIAL PURPOSE APPROPRIATIONS, current-year TOTAL column: ₱120,694,104.88 (includes 20% Development Fund ₱76,627,842.19; LDRRMF ₱36,845,516.34; Aid to Barangays ₱32,000.00; Other Authorized SPAs ₱7,188,746.35)
  - TOTAL EXPENDITURE, current-year TOTAL column: ₱442,588,892.34
  - Unlabeled fifth data column (col G) additionally carries: TOTAL RECEIPTS ₱689,474,898.00; TOTAL AVAILABLE RESOURCES ₱689,474,898.00; TOTAL EXPENDITURE ₱689,474,897.06; and SPA line "Approp. from Acquisition of Loan-Const. of Three Storey Farmer's Market Bldg." ₱300,000,000.00 — column label unrecoverable; see limitations
  - Appropriations ordinance number: not stated in the document
- Source IDs for the record: fdpp-abr-fy2024-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping (required when fields use different evidence):
  - All monetary figures, labels, signatories: fdpp-abr-fy2024-xlsx
  - Posting period (QUARTER 1 CY 2024) and physical-posting note: fdpp-maddela-report-index
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2024-01-01 (CY 2024 annual period implied by form header "E5=2024"; document period printed "ANNUAL CY 2024")
- Effective to (when supplied): 2024-12-31 (implied by annual period; not printed explicitly)
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2027-08-23
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: Official LGU-uploaded document on the DILG FDPP with category (Annual Budget Report), fiscal period (ANNUAL CY 2024), publishing body, and source link identified; downloaded file hashed; unlike-document separation maintained (ABR ≠ SRE ≠ APP ≠ loan statements)
- Limitations or notes: Figures come from the LGU-prepared FDPP summary form, not from the signed appropriations ordinance; the ordinance number and enactment date are absent. The unlabeled col-G totals must not be published as "the budget" without clarification from the LGU; publish only the labeled TOTAL-column values if accepted. Beginning-cash tie-out observed: CY2023 ending cash ₱76,153,120.93 equals CY2024 beginning cash.

### maddela-fdp-abr-fy2025: FDPP Annual Budget Report summary, FY 2025 (existence only)

- Type: transparency document
- Candidate data: Listing row evidences title "ANNUAL BUDGET REPORT", posting period QUARTER 1 CY 2025, document period ANNUAL CY 2025, download id=141187. No contents recoverable (HTTP 500). No amounts recorded — none invented.
- Source IDs for the record: fdpp-abr-fy2025-entry; fdpp-maddela-report-index
- Claim-to-source mapping: single evidence basis (listing page) for all fields
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): blocked
- Effective from (when supplied): 2025-01-01 (document period "ANNUAL CY 2025")
- Effective to (when supplied): 2025-12-31 (implied; not printed explicitly)
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2026-11-23 (retry download)
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: fails — required official document content is unobtainable; only its index metadata was observed
- Limitations or notes: Do not publish any figure for FY2025 from this record. Retry after portal repair or request the file directly from the LGU through official channels.

### maddela-fdp-abr-fy2026: FDPP Annual Budget Report summary, FY 2026 (existence only)

- Type: transparency document
- Candidate data: Listing row evidences title "ANNUAL BUDGET REPORT", posting period QUARTER 1 CY 2026, document period ANNUAL CY 2026, download id=224583. No contents recoverable (HTTP 500). No amounts recorded — none invented.
- Source IDs for the record: fdpp-abr-fy2026-entry; fdpp-maddela-report-index
- Claim-to-source mapping: single evidence basis (listing page) for all fields
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): blocked
- Effective from (when supplied): 2026-01-01 (document period "ANNUAL CY 2026")
- Effective to (when supplied): 2026-12-31 (implied; not printed explicitly)
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2026-11-23 (retry download)
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: fails — required official document content is unobtainable; only its index metadata was observed
- Limitations or notes: Same treatment as FY2025. Note the Q1-CY-2026 SRE separately reports a CY2026 budget column (see maddela-fdp-sre-q1cy2026), which must not be merged with this record.

### maddela-fdp-app-fy2024: Annual Procurement Plan CY 2024 (summary by office)

- Type: transparency document (procurement plan)
- Candidate data:
  - Form 4b - APP Summary, CY 2024, selected per-office totals exactly as printed: Office of the Mayor (Hon. Rimel C. Tolentino) ₱64,503,500.00; second Office-of-the-Mayor line ₱170,000.00; Internal Audit Services (Mrs. Luz M. Sebastian) ₱168,485.00; Tourism (Mrs. Kathrina C. Dela Vega) ₱92,860.00; BPLO (Mrs. Juliet G. Apostol) ₱223,238.00; Support to DILG (Mrs. Arceli S. Diaz) ₱108,000.00; Support to PNP (PMAJ Francisco D. Liwag) ₱965,000.00; Support to Fire Marshall (SFO4 Walter C. Valerio) ₱375,000.00; Support to BJMP (JSINSP Venancio S. Valdez, Jr.) ₱111,000.00; Support to COA (Atty. Princess Vinci A. Caleda) ₱162,072.93; Sangguniang Bayan ₱1,585,000.00; MSWDO ₱6,106,840.00; Municipal Agriculturist ₱8,460,000.00; Municipal Health Officer (Dr. Don Francis B. Juguilon) ₱6,514,032.00; MDRRMO ₱7,540,909.00; MENRO ₱4,037,140.00; GSO ₱1,300,860.00; Economic Enterprise office (Mr. George O. Colebra & Mrs. Melanie R. Ascaño) ₱1,317,000.00
  - Grand total: not present in the extracted Form 4b sheet
  - BAC signatories: Prepared by Lourdes B. Agduyeng (Head, BAC Secretariat); Recommending approval Melanie C. Cadavis (BAC Chairman)
- Source IDs for the record: fdpp-app-fy2024-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures/names; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2024-01-01
- Effective to (when supplied): 2024-12-31
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2027-08-23
- Applicable publication gate: Budgets, transparency, procurement, and projects (procurement ceilings are plan estimates, not awards)
- Gate evidence: Official LGU-uploaded APP on FDPP; category, fiscal period, publishing body, link identified; hash recorded; status reported exactly as published (plan stage only)
- Limitations or notes: Estimated Budget (PhP) values are planning ceilings, never contract awards or spending. Some Form 4b row labels were lost to merged-cell extraction; only fully resolved office/amount pairs should be displayed. Coordinate with the separate procurement handoff to avoid double presentation.

### maddela-fdp-app-fy2025: Annual Procurement Plan CY 2025 (summary by office)

- Type: transparency document (procurement plan)
- Candidate data:
  - Form 4b - APP Summary, CY 2025, selected per-office totals exactly as printed: Office of the Mayor (Hon. Rimel C. Tolentino) ₱94,797,996.30; Vice Mayor/Sangguniang Bayan (Hon. Joel B. Badongen) ₱1,130,000.00; Secretary to the SB (Cristina Raquedan) ₱268,415.00; MPDC (Lemuel Rey O. Maranion) ₱215,000.00; Municipal Treasurer (Dario M. Gabay) ₱640,125.00; Municipal Accountant (Floreta G. Bautista) ₱457,620.00; Municipal Assessor (Melody B. Belmonte) ₱566,800.00; Municipal Budget Officer (Engr. Melanie C. Cadavis) ₱862,900.00; Municipal Engineer (Engr. Junard L. Umaweng) ₱544,550.00; Motorpool (Engr. Apolinario D. Orias Jr.) ₱752,548.00; HRMO (Marietta G. Salvador) ₱375,000.00; MSWDO (Maryrose S. Valiente) ₱8,386,840.00; Senior Citizen & PWD operations (Charmaine G. Castillo) ₱119,237.00; Municipal Agriculturist (Jovencio G. Salvador) ₱10,830,000.00; Municipal Health Officer (Dr. Don Francis Juguilon) ₱7,462,841.00; Nutrition Services (Blesetrina V. Respicio) ₱445,000.00; Population Services (Rona S. Colendrino) ₱441,260.00; MDRRMO (Edwin S. Besas) ₱5,600,000.00; MENRO (Redentor Soriano) ₱6,120,755.00; GSO (Rommel A. Respicio) ₱1,100,000.00; Market & Slaughterhouse operations (Goerge O. Colebra [sic]) ₱1,422,000.00; Internal Audit Services (Gracia Ville G. Agduyeng) ₱170,000.00; Support to PNP (Pmaj William D. Agpalza) ₱965,000.00
  - Grand total: not present in the extracted Form 4b sheet
- Source IDs for the record: fdpp-app-fy2025-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures/names; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2025-01-01
- Effective to (when supplied): 2025-12-31
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2027-08-23
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: Official LGU-uploaded APP on FDPP; category, fiscal period, publishing body, link identified; hash recorded
- Limitations or notes: Plan-stage ceilings only; do not present as expenditures. Name spelling "Goerge O. Colebra" reproduced exactly as printed.

### maddela-fdp-app-fy2026: Annual Procurement Plan CY 2026 (summary by office, with named infrastructure projects)

- Type: transparency document (procurement plan)
- Candidate data:
  - Form 4b - APP Summary, CY 2026, selected per-office totals exactly as printed: Office of the Mayor (Hon. Rimel C. Tolentino) ₱12,783,273.00; Vice Mayor/Sangguniang Bayan (Hon. Orlando L. Salvador, Jr.) ₱1,315,000.00; Secretary to the SB (Cristina Raquedan) ₱273,415.00; MPDC (Lemuel Rey O. Maranion) ₱434,000.00; Municipal Treasurer (Dario M. Gabay) ₱580,000.00; Municipal Accountant (Floreta G. Bautista) ₱508,620.00; Municipal Assessor (Melody B. Belmonte) ₱782,500.00; Municipal Budget Officer (Lourdes B. Agduyeng) ₱300,000.00; Municipal Civil Registrar (Godofredo M. Sabug) ₱195,000.00; Municipal Engineer (Engr. Junard L. Umaweng) ₱713,350.00; Motorpool (Engr. Apolinario D. Orias Jr.) ₱1,506,000.00; HRMO (Nellie B. Sadia) ₱405,000.00; MSWDO (Maryrose S. Valiente) ₱13,710,000.00; Senior Citizen & PWD operations (Charmaine G. Castillo) ₱212,237.00; Municipal Agriculturist (Jovencio G. Salvador) ₱11,120,000.00; Municipal Health Officer (Dr. Don Francis B. Juguilon) ₱3,949,200.00; Nutrition Services (Blesetrina V. Respicio) ₱452,400.00; Population Services (Rona S. Colendrino) ₱590,060.00; MDRRMO (Edwin S. Besas) ₱4,250,000.00; MENRO (Redentor A. Soriano) ₱4,940,755.00; GSO (Rommel A. Respicio) ₱1,330,883.00; Market & Slaughterhouse operations (George O. Colebra) ₱1,040,000.00
  - ENGINEERING AND INFRASTRUCTURE PROJECT block, exactly as printed: Construction of Drainage Canal Along A. Bonifacio St. ₱15,000,000.00; Concreting of Barangay Road/FTMR (Agricultural Production Area) ₱35,500,000.00; Opening of Barangay Road/FTMR (Agricultural Production Area) ₱29,343,008.80; OTHER STRUCTURES ₱4,000,000.00; MOTORPOOL SERVICES ₱1,000,000.00
  - Grand total: not present in the extracted Form 4b sheet
  - Prepared by: ROWENA F. TAAN, BAC Secretariat
- Source IDs for the record: fdpp-app-fy2026-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures/names; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2026-01-01
- Effective to (when supplied): 2026-12-31
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2027-08-23
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: Official LGU-uploaded APP on FDPP; category, fiscal period, publishing body, link identified; hash recorded; project lines are planned procurements, not awarded or completed works
- Limitations or notes: Infrastructure lines are APP entries; announcement or appropriation does not prove completion (contract-prohibited inference).

### maddela-fdp-sre-cy2024: Statement of Receipts and Expenditures, calendar-year CY 2024 actuals

- Type: transparency document (financial statement)
- Candidate data:
  - BLGF Form 3 - SRE, CY 2024, Quarter 4 (full-year totals), all funds combined (Total column):
  - LOCAL SOURCES actual ₱43,164,041.05 (target ₱37,428,065.50)
  - National Tax Allotment actual ₱370,901,363.04 (target ₱371,040,818.00)
  - TOTAL CURRENT OPERATING INCOME actual ₱431,508,246.30 (target ₱408,588,883.50) — composition: General Fund ₱411,107,214.13; SEF ₱3,008,189.96; Trust Fund ₱17,392,842.21
  - TOTAL CURRENT OPERATING EXPENDITURES actual ₱341,619,973.00 (appropriation ₱348,174,879.49)
  - NET OPERATING INCOME FROM CURRENT OPERATIONS ₱89,888,273.30
  - RECEIPTS FROM LOANS AND BORROWINGS — Acquisition of Loans actual ₱151,636,000.00 (budgeted ₱300,000,000.00)
  - CAPITAL/INVESTMENT EXPENDITURES actual ₱229,028,206.30 (appropriation ₱381,455,189.06)
  - DEBT SERVICE (Principal Cost) — Payment of Loan Amortization actual ₱998,096.59 (equal to its ₱998,096.59 line target)
  - CASH BALANCE, BEGINNING ₱52,970,825.39; FUND/CASH BALANCE, END ₱47,025,102.82
  - Total Assets (net of accumulated depreciation) ₱875,418,367.77
- Source IDs for the record: fdpp-sre-q4cy2024-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2024-01-01
- Effective to (when supplied): 2024-12-31
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2027-08-23
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: Official LGU-uploaded quarterly SRE covering Q4 CY2024; reporting period, publishing body, link identified; hash recorded; expenditure/income kept strictly separate from appropriations (ABR) and loan balances (SIPB)
- Limitations or notes: This is a cash-basis LGU-prepared statement, not an audited COA figure. The ₱151,636,000 loan proceeds received in CY2024 match the SIPB CY2024 availment exactly (cross-consistent), while the ₱300,000,000 figure appears only as a budget/appropriation target — never merge the two.

### maddela-fdp-sre-cy2025: Statement of Receipts and Expenditures, calendar-year CY 2025 actuals

- Type: transparency document (financial statement)
- Candidate data:
  - BLGF Form 3 - SRE, CY 2025, Quarter 4 (full-year totals), all funds combined (Total column):
  - LOCAL SOURCES actual ₱43,874,965.29 (budget ₱40,800,233.49)
  - EXTERNAL SOURCES actual ₱464,713,824.95 (budget ₱440,635,985.00), of which National Tax Allotment ₱440,398,413.00 and Extraordinary Receipts/Grants/Donations/Aids (Trust Fund) ₱24,315,411.95
  - TOTAL CURRENT OPERATING INCOME actual ₱508,588,790.24 (budget ₱481,436,218.49, plus supplemental budget line ₱19,730,979.52 shown in the Budget column)
  - TOTAL CURRENT OPERATING EXPENDITURES actual ₱380,167,308.07 (budget ₱388,518,156.39)
  - NET OPERATING INCOME FROM CURRENT OPERATIONS ₱128,421,482.17
  - RECEIPTS FROM LOANS AND BORROWINGS — Acquisition of Loans actual ₱148,364,000.00 (General Fund); matching "ADD: SUPPLEMENTAL BUDGET FOR CAPITAL OUTLAY" Budget-column line ₱148,364,000.00
  - CAPITAL/INVESTMENT EXPENDITURES actual ₱173,954,097.64 (Budget column ₱246,013,041.62)
  - DEBT SERVICE (Principal Cost) — Payment of Loan Amortization actual ₱12,215,610.03 (budget ₱15,000,000.00)
  - NET INCREASE IN FUNDS ₱90,615,774.50; CASH BALANCE, BEGINNING ₱47,025,102.82; FUND/CASH BALANCE, END ₱124,675,213.81
  - Total Assets (net of accumulated depreciation) ₱1,305,921,911.74
- Source IDs for the record: fdpp-sre-q4cy2025-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2025-01-01
- Effective to (when supplied): 2025-12-31
- Update cadence: per-document
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2027-08-23
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: Official LGU-uploaded SRE covering Q4 CY2025; period, publishing body, link identified; hash recorded
- Limitations or notes: Cash-basis, unaudited. Beginning balance ties to CY2024 ending balance (₱47,025,102.82) and ending balance ties to the Q1 CY2026 statement's beginning balance (₱124,675,213.81), evidencing a continuous series. Keep income, expenditure, borrowing proceeds, and principal payments as separate claims.

### maddela-fdp-sre-q1cy2026: Statement of Receipts and Expenditures, Q1 CY 2026 (with first-printed CY 2026 budget column)

- Type: transparency document (financial statement)
- Candidate data:
  - BLGF Form 3 - SRE, CY 2026, Quarter 1, all funds combined (Total column):
  - TOTAL CURRENT OPERATING INCOME actual ₱155,394,713.78 (Budget column ₱548,927,035.00, of which National Tax Allotment ₱506,912,035.00); NTA actual for the quarter ₱126,728,010.00
  - Debt Service (Interest Expense & Other Charges) within current operating expenditures: budget ₱20,000,000.00; quarter actual ₱3,947,481.28
  - TOTAL CURRENT OPERATING EXPENDITURES actual ₱79,788,302.22 (budget ₱430,545,025.39)
  - NET OPERATING INCOME FROM CURRENT OPERATIONS ₱75,606,411.56
  - CAPITAL/INVESTMENT EXPENDITURES actual ₱4,024,853.43 (Budget column ₱118,382,008.80)
  - DEBT SERVICE (Principal Cost) actual ₱0.00 for the quarter
  - FUND/CASH BALANCE, END ₱195,641,678.14 (beginning ₱124,675,213.81)
  - Total Assets (net of accumulated depreciation) ₱1,305,921,911.74
- Source IDs for the record: fdpp-sre-q1cy2026-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2026-01-01
- Effective to (when supplied): 2026-03-31
- Update cadence: quarterly
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2026-11-23
- Applicable publication gate: Budgets, transparency, procurement, and projects
- Gate evidence: Official LGU-uploaded quarterly SRE; period, publishing body, link identified; hash recorded
- Limitations or notes: Quarterly partial-year data; never present alongside annual totals without clear labeling. Its Budget column is the first accessible printing of CY2026 budget levels given the broken FY2026 ABR download, but it is a budget column inside an SRE, not the Annual Budget Report — do not substitute it for the ABR record.

### maddela-fdp-soipb-landbank-loan-cy2024: Statement of Indebtedness Payments and Balances, Q4 CY 2024 (Land Bank of the Philippines public-market loan)

- Type: transparency document (debt statement)
- Candidate data:
  - FDPP Form 2 - Annual Statement of Indebtedness, Payments and Balances; report date printed "4th Qtr. December 31, 2024"
  - LGU Income Classification: First Class
  - Lending Institution: Land Bank of the Philippines
  - Certificate Number NDSC/BC: 02-2023-09-266; Date of Certification 2023-10-17 (Excel serial 45216)
  - Date of Approval Loan 2024-07-05 (Excel serial 45478); Amount Approved ₱296,000,000.00
  - Maturity Date 2039-07-05 (Excel serial 50956); instrument "Loan (Secured or Unsecured)"; Purpose "Construction or Repair of Public Market"; term 15 years; interest rate 0.0675 (6.75%); payment frequency Monthly; Annual Amortization Interest ₱2,700,000.00; Starting Date of Payment August 05, 2024
  - As of Q4 CY 2024: Cumulative Principal paid ₱0.00; Cumulative Interest paid ₱1,674,889.10; Total Amount Released (Availment) ₱151,636,000.00; Remaining Balance to Date / Undrawn Amount ₱144,364,000.00; Outstanding Loan Balance After Principal Payment ₱151,636,000.00; Arrears: none (₱0.00 both principal and interest)
  - Certified Correct by: DARIO M. GABAY, Local Treasurer; Date Issued 2025-03-12 (Excel serial 45728)
- Source IDs for the record: fdpp-soipb-q4cy2024-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2024-12-31 (statement "as of" date)
- Effective to (when supplied): omit (superseded in substance by the CY2025 filing, which remains active)
- Update cadence: quarterly
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2026-11-23
- Applicable publication gate: Budgets, transparency, procurement, and projects (Statement of Debt Services scope)
- Gate evidence: Official LGU-uploaded debt statement; category, period, publishing body, link identified; hash recorded; serial-number dates converted mechanically and noted
- Limitations or notes: Point-in-time filing; supersede with later quarters rather than merging. Amount approved (₱296,000,000.00) differs from the ₱300,000,000.00 loan appropriation label in the FY2024 ABR col G — related but distinct claims (appropriation vs. approved credit line); keep separate.

### maddela-fdp-soipb-landbank-loan-cy2025: Statement of Indebtedness Payments and Balances, Q4 CY 2025 (Land Bank of the Philippines public-market loan)

- Type: transparency document (debt statement)
- Candidate data:
  - FDPP Form 2; workbook header: CALENDAR YEAR 2025, QUARTER 4
  - LGU Income Classification: First Class; Lending Institution: Land Bank of the Philippines
  - Certificate Number NDSC/BC date field: 2023-10-17 (serial 45216; certificate number cell blank in this filing)
  - Date of Approval Loan 2024-07-05 (serial 45478); Amount Approved ₱296,000,000.00
  - Maturity Date 2039-07-05 (serial 50956); instrument "Loan (Secured or Unsecured)"; Purpose "Construction or Repair of Public Market"; term 15 years; interest rate 0.0675 (6.75%); frequency Monthly; Starting Date of Payment August 05, 2024
  - As of Q4 CY 2025: Cumulative Principal paid ₱0.00; Cumulative Interest paid ₱13,890,499.15; Total Amount Released (Availment as of date) ₱231,984,500.00; Remaining Balance to Date / Undrawn Amount ₱64,015,500.00; Outstanding Loan Balance After Principal Payment ₱231,984,500.00; Arrears: none (₱0.00 both); Annual Amortization Principal/Interest/GRT rows print ₱0.00 in this filing (as printed)
  - Certified Correct by: DARIO M. GABAY, Local Treasurer
- Source IDs for the record: fdpp-soipb-q4cy2025-xlsx; fdpp-maddela-report-index
- Claim-to-source mapping: workbook for all figures; index page for posting period
- Proposed status (`provisional` or `blocked`; `verified` is reviewer-only): provisional
- Effective from (when supplied): 2025-12-31 (statement "as of" period)
- Effective to (when supplied): omit (latest available filing)
- Update cadence: quarterly
- Review owner role: BetterMaddela budget and finance reviewer
- Proposed next review date: 2026-11-23
- Applicable publication gate: Budgets, transparency, procurement, and projects (Statement of Debt Services scope)
- Gate evidence: Official LGU-uploaded debt statement; category, period, publishing body, link identified; hash recorded
- Limitations or notes: Latest recoverable debt-service picture. If published together with the CY2024 filing, show both with their own as-of dates; never average or combine. The zero-filled amortization rows conflict internally with the monthly-payment terms and nonzero cumulative interest; reproduce only labeled cells, and flag rather than reconcile.

Reviewer-only acceptance fields are added after independent review: `lastVerified`, `acceptedBy`, `acceptedAt`, `nextReviewOn`, and final `status`.

## Direct-confirmation log

None performed. Per task constraints, no phone calls, emails, or other direct confirmations were made; all evidence above comes from publicly retrievable government web sources.

## Conflicts and unresolved items

| Item | Competing claims or missing evidence | Source IDs checked | Why blocked/not found | Required next action |
|---|---|---|---|---|
| ABR FY2025 contents | Document exists per portal listing; file unfetchable | fdpp-abr-fy2025-entry | Download endpoint returns HTTP 500 on 3 attempts (plain, session+Referer, retry round) | Retry after portal repair; or request file from LGU Budget Office / DILG Quirino FOI channel |
| ABR FY2026 contents | Document exists per portal listing; file unfetchable | fdpp-abr-fy2026-entry | Download endpoint returns HTTP 500 on 3 attempts | Same as above |
| Enacted Annual Budget / Appropriations Ordinance numbers & enactment dates, FY 2024–2026 | Not stated in any retrieved document; no ordinance repository accessible | fdpp-abr-fy2024-xlsx; fdpp-maddela-report-index | SB Maddela measures are not published online in any source reachable from this environment | Request from SB Secretariat or check Sangguniang Panlalawigan/official channels once reachable; treat site budget display as "ordinance details unavailable" until then |
| COA Annual Audit Reports for the Municipality of Maddela | Existence not confirmable this session | none (coa.gov.ph unreachable to tools) | coa.gov.ph returns 403 Forbidden (WAF) to both fetch paths, incl. /reports/audit-reports/local-government-units/ and /downloads/local-government-units/ | Retrieve from a network without the block (browser session) and open a follow-up handoff; do not cite from memory |
| Annual Investment Program (AIP) | Not among the 15 FDP document types offered by the portal; not located elsewhere | fdpp-maddela-report-index | Not found in accessible sources | Ask DILG Quirino/LGU whether AIP is posted anywhere official; otherwise keep unpublished |
| Standalone "Statement of Debt Services" | Not offered as an FDP document type | fdpp-maddela-report-index | Not found; SIPB filings are the closest published instrument | Use SIPB records if accepted; note the substitution honestly |
| quirino.gov.ph / Sangguniang Panlalawigan ng Quirino online sources | Provincial domain does not resolve here | none | "The remote name could not be resolved: 'quirino.gov.ph'" (also www variant) | Re-attempt from unrestricted network/DNS |
| lgu201.dilg.gov.ph (DILG LGU 201 profiles) | Connection refused | none | "Unable to connect to the remote server" | Re-attempt later; may hold supplementary LGU profile data |
| Wayback Machine fallback for dead links | Snapshot existence confirmed via archive.org API but pages unfetchable | fdpp-maddela-report-index | "The remote name could not be resolved: 'web.archive.org'" in this environment; API showed snapshot http://web.archive.org/web/20240501231330/https://fdpp.dilg.gov.ph/ | Not needed for live FDPP links; revisit only if a cited URL dies |
| Official LGU Facebook posts (social-post evidence) | No social-post evidence collected | none | facebook.com returns "(400) Bad Request." to automated fetch; page handle unverified | Optional weak-evidence avenue for a future researcher with browser access |
| ABR FY2024 unlabeled fifth data column (col G) | Alternative totals (receipts/expenditure ₱689,474,898.00 area) incl. ₱300,000,000.00 loan-funded SPA line vs. labeled TOTAL column (expenditure ₱442,588,892.34) | fdpp-abr-fy2024-xlsx | Single-source ambiguity: merged header label unrecoverable; meaning of col G cannot be established from the artifact alone | Clarify with LGU Budget Office before ever displaying col-G values; publish only labeled TOTAL-column figures meanwhile |
| SIPB CY2025 internal inconsistency | Amortization rows print ₱0.00 while payment frequency is Monthly and cumulative interest is ₱13,890,499.15 | fdpp-soipb-q4cy2025-xlsx | As-printed contradiction inside one official form | Reproduce labeled values only; flag in display notes; optionally verify against Q1–Q3 CY2026 SIPB filings when posted |

## Media rights

| Item | Creator/rights holder | Source | License/permission | Attribution | Modified? | Restrictions | Publication recommendation |
|---|---|---|---|---|---|---|---|
| N/A — no media items collected | — | — | — | — | — | — | No image, logo, seal, audio, video, or document copy is proposed for republication. Records reference original government URLs only; downloaded XLSX evidence copies remain outside the repository. |

## Researcher self-check

- [x] Every candidate claim maps to source IDs.
- [x] Original sources, dates, periods, and limitations are recorded.
- [x] Conflicts and unsuccessful searches are disclosed.
- [x] High-risk claims are not marked verified without their full gate evidence.
- [x] No guessed value, secret, private contact detail, or machine-local path is included.
- [x] Research did not directly change production data.
