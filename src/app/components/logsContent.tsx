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
  project?: string;
};

export default function LogsContent() {
  const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
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
    project: record.project ?? undefined,
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
          setRecentLogs(fallbackMapped.slice(0, 4));
          setOlderLogs(fallbackOlderLogs);
          return;
        }
        const mapped = result.data.map(mapLog);
        setRecentLogs(mapped.slice(0, 4));
        setOlderLogs(mapped.slice(4));
      })
      .catch(() => {
        setRecentLogs(fallbackMapped.slice(0, 4));
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

  const displayRecent =
    recentLogs.length || !hasFetched ? recentLogs : fallbackMapped.slice(0, 4);
  const displayOlderLogs =
    olderLogs.length || !hasFetched ? olderLogs : fallbackOlderLogs;

  const safeOverview =
    displayRecent[0] ??
    fallbackOverview ?? {
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
          {displayRecent.map((entry) => {
            const snippet =
              entry.body.length > 200
                ? `${entry.body.slice(0, 200)}…`
                : entry.body || "No details provided.";
            return (
              <div
                key={entry.id}
                className="flex h-full flex-col justify-between border border-white/15 bg-black p-3 md:px-5 md:py-4 shadow-[0_0_24px_rgba(0,0,0,0.35)]"
              >
                <div className="space-y-1">
                  <p className="font-big title18 font-bold text-primary">
                    {entry.title}
                  </p>
                  {entry.project ? (
                    <p className="text-xs uppercase tracking-[0.18em] text-info-light">
                      Project: <span className="text-primary">{entry.project}</span>
                    </p>
                  ) : null}
                  <p className="title14 !text-info-light whitespace-pre-line">
                    {snippet}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs uppercase tracking-[0.14em] text-info-light">
                  <span>{entry.tag ?? "Log"}</span>
                  <span>{entry.publishedAt ?? "—"}</span>
                </div>
              </div>
            );
          })}
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
                {entry.project ? (
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/90">
                    Project: {entry.project}
                  </p>
                ) : null}
                <p className="title16 text-primary">
                  Date: {entry.publishedAt ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
