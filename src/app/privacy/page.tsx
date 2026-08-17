import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="shell prose-page">
      <p className="eyebrow">Plain-language notice</p>
      <h1>Privacy</h1>
      <p>
        The BetterMaddela application is a static information site. It has no account,
        form submission, payment, booking, resident-record, or analytics feature in
        this repository.
      </p>
      <h2>Hosting and external links</h2>
      <p>
        This repository does not yet define a production hosting provider. A future
        host may process ordinary technical logs under its own policy. Links to PSA,
        PHLPost, LawPhil, and GitHub leave BetterMaddela and are governed by those
        services.
      </p>
      <h2>Do not send sensitive information</h2>
      <p>
        BetterMaddela is not a government transaction channel. Do not submit personal
        records, credentials, payments, applications, complaints, or emergency
        requests through the project repository.
      </p>
    </div>
  );
}
