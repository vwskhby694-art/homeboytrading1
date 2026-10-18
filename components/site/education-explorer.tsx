"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { learningPaths, topicMarketLinks, type LearningPath } from "@/app/content";
import { siteConfig } from "@/app/site-config";

type PathFilter = "all" | LearningPath["id"];

const filterOptions: readonly { id: PathFilter; label: string; count: number }[] = [
  { id: "all", label: "All paths", count: learningPaths.reduce((total, path) => total + path.topics.length, 0) },
  ...learningPaths.map((path) => ({ id: path.id, label: path.title, count: path.topics.length }))
];
const topicIds = new Set(learningPaths.flatMap((path) => path.topics.map((topic) => topic.id)));
const symbolNames = new Map<string, string>(siteConfig.marketSymbols.map((item) => [item.id, item.short]));

export function EducationExplorer() {
  const [filter, setFilter] = useState<PathFilter>("all");
  const [query, setQuery] = useState("");
  const [requestedTopic, setRequestedTopic] = useState<string | null>(null);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return learningPaths
      .filter((path) => filter === "all" || path.id === filter)
      .map((path) => ({
        ...path,
        topics: path.topics.filter((topic) =>
          !normalized || [topic.title, topic.summary, ...topic.takeaways].join(" ").toLowerCase().includes(normalized)
        )
      }))
      .filter((path) => path.topics.length);
  }, [filter, query]);

  // Links such as #risk-basics open the matching topic, clearing any filter that hides it.
  useEffect(() => {
    const onHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!topicIds.has(id)) return;
      setFilter("all");
      setQuery("");
      setRequestedTopic(id);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!requestedTopic) return;
    const element = document.getElementById(requestedTopic);
    if (element instanceof HTMLDetailsElement) {
      element.open = true;
      element.scrollIntoView({ block: "start" });
      element.querySelector("summary")?.focus({ preventScroll: true });
    }
    setRequestedTopic(null);
  }, [requestedTopic, visible]);

  const resultCount = visible.reduce((count, path) => count + path.topics.length, 0);

  return (
    <div className="education-explorer">
      <div className="education-toolbar">
        <div className="education-filters" role="group" aria-label="Filter by learning path">
          {filterOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? "is-active" : ""}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label} <span aria-hidden="true">{item.count}</span>
            </button>
          ))}
        </div>
        <label className="education-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search education topics</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics, for example “leverage”" />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button> : null}
        </label>
      </div>

      <p className="result-count" role="status">{resultCount} topic{resultCount === 1 ? "" : "s"} available</p>

      {visible.length ? visible.map((path) => (
        <section className="learning-path" key={path.id} aria-labelledby={`path-${path.id}`}>
          <div className="learning-path-heading">
            <span>{path.label}</span>
            <h2 className="h2" id={`path-${path.id}`}>{path.title}</h2>
            <p>{path.description}</p>
          </div>
          <div className="topic-list">
            {path.topics.map((topic, index) => {
              const symbol = topicMarketLinks[topic.id];
              return (
                <details className="topic-item" key={topic.id} id={topic.id}>
                  <summary>
                    <span className="topic-number tabular" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div className="topic-heading"><h3>{topic.title}</h3><p>{topic.summary}</p></div>
                    <ChevronDown className="topic-chevron" size={22} aria-hidden="true" />
                  </summary>
                  <div className="topic-content">
                    <p className="topic-content-label">Key ideas</p>
                    <ul>{topic.takeaways.map((takeaway) => <li key={takeaway}><BookOpen size={16} aria-hidden="true" />{takeaway}</li>)}</ul>
                    {symbol ? (
                      <Link className="text-link" href={`/markets?symbol=${encodeURIComponent(symbol)}`}>
                        See a live {symbolNames.get(symbol)} chart <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      )) : (
        <div className="empty-results"><Search size={24} aria-hidden="true" /><h2 className="h3">No matching topics</h2><p>Try a broader term or choose another learning path.</p></div>
      )}
    </div>
  );
}
