"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import Button from "./Button";
import { fetchLogs } from "@/lib/contentApi";
import type { LogRecord } from "@/lib/contentTypes";
import { fallbackLogs } from "@/lib/fallbackContent";

type LogEntry = {
  id: string;
  title: string;
  body: string;
  tag?: string;
  location?: string;
  status?: string;
  publishedAt?: string;
};

export default function LogsContent() {
  const [overview, setOverview] = useState<LogEntry | null>(null);
  const [sections, setSections] = useState<LogEntry[]>([]);
  const [olderLogs, setOlderLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const mapLog = useCallback((record: LogRecord): LogEntry => ({
    id: record.id,
    title: record.title,
    body: record.body ?? "",
    tag: record.tag ?? undefined,
    location: record.location ?? undefined,
    status: record.status ?? undefined,
    publishedAt: record.published_at ?? undefined,
  }), []);

  const fallbackMapped = useMemo(() => fallbackLogs.map(mapLog), [mapLog]);

  const fallbackOverview = useMemo<LogEntry | null>(() => {
    const latest = fallbackMapped[0];
    if (!latest) return null;
    return {
      ...latest,
      publishedAt: latest.publishedAt ?? "—",
    };
  }, [fallbackMapped]);

  const fallbackSections = useMemo(() => {
    const latest = fallbackMapped[0];
    if (!latest?.body) return [];
    return latest.body
      .split(/\n\n+/)
      .filter(Boolean)
      .map((text, index) => ({
        id: `${latest.id}-section-${index}`,
        title: latest.title,
        body: text,
      }));
  }, [fallbackMapped]);

  const fallbackOlderLogs = useMemo(
    () => (fallbackMapped.length > 1 ? fallbackMapped.slice(1) : []),
    [fallbackMapped],
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchLogs()
      .then((result) => {
        if (!mounted) return;
        if (!result.data.length) {
          setOverview(fallbackOverview);
          setSections(fallbackSections);
          setOlderLogs(fallbackOlderLogs);
          return;
        }
        const mapped = result.data.map(mapLog);
        const [latest, ...rest] = mapped;
        if (latest) {
          setOverview({
            ...(fallbackOverview ?? {}),
            ...latest,
            publishedAt: latest.publishedAt ?? fallbackOverview?.publishedAt,
          });
          const sectionBodies = latest.body
            ? latest.body.split(/\n\n+/).filter(Boolean)
            : [];
          if (sectionBodies.length) {
            setSections(
              sectionBodies.map((text, index) => ({
                id: `${latest.id}-section-${index}`,
                title: latest.title,
                body: text,
              })),
            );
          }
        }
        if (rest.length) {
          setOlderLogs(rest);
        }
      })
      .catch(() => {
        setOverview(fallbackOverview);
        setSections(fallbackSections);
        setOlderLogs(fallbackOlderLogs);
      })
      .finally(() => {
        if (mounted) {
          setHasFetched(true);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const displayOverview = overview ?? fallbackOverview;
  const displaySections =
    sections.length || !hasFetched ? sections : fallbackSections;
  const displayOlderLogs =
    olderLogs.length || !hasFetched ? olderLogs : fallbackOlderLogs;

  const safeOverview =
    displayOverview ?? {
      id: "no-log",
      title: "No logs yet",
      body: "",
      publishedAt: "—",
      location: "—",
      status: "—",
    };

  const dateLabel = safeOverview.publishedAt ?? "—";

  return (
    <div className="h-full w-full max-h-[calc(100vh-74px)] md:max-h-[calc(100vh-176px)] overflow-y-auto px-4 lg:px-6 pt-6 lg:pt-10 2xl:pt-12">
      <div className="flex h-full flex-col gap-6 max-w-285 mx-auto pb-10 sm:pb-12">
        <h1 className="text-center title18">Data Log Dump Initialized.</h1>
        <p className="text-center text-xs uppercase tracking-[0.18em] text-info-light">
          {loading && !hasFetched ? "Syncing from Supabase..." : "CMS synced"}
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between sm:gap-3 bg-primary px-2">
            <p className="font-big text-[16px] sm:text-lg font-bold tracking-[0.2em] text-dark">
              {safeOverview.title}
            </p>
            <span className="title16 !text-dark">Date: {dateLabel}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="title16">
              Location:{" "}
              <span className="text-info-light">
                {safeOverview.location ?? "Unspecified"}
              </span>
            </span>
            <span className="title16">
              Project Status:{" "}
              <span className="text-info-light">
                {safeOverview.status ?? "—"}
              </span>
            </span>
          </div>
        </div>
        <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
          {displaySections.map((section) => (
            <div
              key={section.id}
              className="flex h-full flex-col justify-between border border-white/15 bg-black p-3 md:px-5 md:py-4 shadow-[0_0_24px_rgba(0,0,0,0.35)]"
            >
              <div className="space-y-1">
                <p className="font-big title18 font-bold text-primary">
                  {section.title}
                </p>
                <p className="title14 !text-info-light">{section.body}</p>
              </div>
              <button
                type="button"
                className="mt-2 w-max cursor-pointer text-sm tracking-widest text-primary transition uppercase hover:text-primary-70"
              >
                + Expand
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-1 border-t border-white/10 pt-6 pb-8">
          <p className="title18">Older Logs:</p>
          <div className="space-y-2">
            {displayOlderLogs.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-primary px-2 py-1 text-primary"
              >
                <h1 className="text-[16px] sm:text-lg font-big text-primary font-bold">
                  {entry.title}
                </h1>
                <p className="title16 text-primary">
                  Date: {entry.publishedAt ?? dateLabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
