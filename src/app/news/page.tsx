import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { RecordMeta } from "@/components/RecordMeta";
import { getRecord } from "@/data/civic";

interface NewsData {
  items: {
    id: string;
    headline: string;
    summary: string;
    publisher: string;
    publishedAt: string;
    eventDate?: string;
    category: string;
    status: string;
    canonicalUrl: string;
  }[];
  limitations: string;
}

const newsRecord = getRecord<NewsData>("maddela-news-feed");

export const metadata: Metadata = {
  title: "News and Announcements",
  description: "Dated government and agency updates with direct relevance to Maddela.",
};

function badgeClass(status: string) {
  const value = status.toLowerCase();
  if (value.includes("archive") || value.includes("expired")) return "badge badge-warning";
  if (value.includes("current") || value.includes("recent")) return "badge badge-success";
  return "badge badge-info";
}

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="News & Updates"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <section className="section">
        <div className="container">
          <div className="news-card-grid">
            {newsRecord.data.items.map((item) => (
              <a
                key={item.id}
                href={item.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
              >
                <div className="news-card-header">
                  <span className={badgeClass(item.status)}>{item.category}</span>
                  <span className="news-card-date">
                    <i className="bi bi-calendar-event" aria-hidden="true" /> Published <time dateTime={item.publishedAt}>{item.publishedAt}</time>
                  </span>
                </div>
                <div className="news-card-body">
                  <h2 className="news-card-title">{item.headline}</h2>
                  <p className="news-card-desc">{item.summary}</p>
                  {item.eventDate && <p className="record-meta">Event date: <time dateTime={item.eventDate}>{item.eventDate}</time></p>}
                  <p className="record-meta">{item.publisher}, {item.status}, open source <i className="bi bi-box-arrow-up-right" aria-hidden="true" /></p>
                </div>
              </a>
            ))}
          </div>
          <RecordMeta record={newsRecord} />
        </div>
      </section>

      <section className="section fb-feed-section" aria-labelledby="coverage-heading">
        <div className="container">
          <div className="fb-feed-head">
            <h2 id="coverage-heading">Coverage</h2>
            <p>{newsRecord.data.limitations}</p>
          </div>
        </div>
      </section>
    </>
  );
}
