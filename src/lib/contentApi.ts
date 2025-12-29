"use client";

import { getSupabaseClient } from "./supabaseClient";
import type {
  AchievementRecord,
  LogRecord,
  ProjectRecord,
  ProjectStatus,
} from "./contentTypes";

type ListResult<T> =
  | { data: T[]; error: null }
  | { data: T[]; error: string };

export async function fetchProjects(status?: ProjectStatus): Promise<ListResult<ProjectRecord>> {
  const client = getSupabaseClient();
  if (!client) return { data: [], error: "Supabase not configured" };

  let query = client
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[supabase] fetchProjects", error);
    return { data: [], error: error.message };
  }
  return { data: data ?? [], error: null };
}

export async function fetchLogs(): Promise<ListResult<LogRecord>> {
  const client = getSupabaseClient();
  if (!client) return { data: [], error: "Supabase not configured" };

  const { data, error } = await client
    .from("logs")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[supabase] fetchLogs", error);
    return { data: [], error: error.message };
  }
  return { data: data ?? [], error: null };
}

export async function fetchAchievements(): Promise<ListResult<AchievementRecord>> {
  const client = getSupabaseClient();
  if (!client) return { data: [], error: "Supabase not configured" };

  const { data, error } = await client
    .from("achievements")
    .select("*")
    .order("order_index", { ascending: true })
    .order("achieved_on", { ascending: false });

  if (error) {
    console.error("[supabase] fetchAchievements", error);
    return { data: [], error: error.message };
  }
  return { data: data ?? [], error: null };
}
