import { useState, useEffect, useCallback } from "react";

export interface TestHistoryEntry {
  id: string;
  category: string;
  categoryLabel: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timeSeconds: number;
}

const STORAGE_KEY = "aerotest_history";
const CHANGE_EVENT = "aerotest-history-change";

export function loadHistory(): TestHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: TestHistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function useTestHistory() {
  const [history, setHistory] = useState<TestHistoryEntry[]>(loadHistory);
  const [open, setOpen] = useState(false);

  const reload = useCallback(() => {
    setHistory(loadHistory());
  }, []);

  // Sincroniza entre instancias del hook en la MISMA pestaña
  useEffect(() => {
    const onChange = () => reload();
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, [reload]);

  // Re-hidrata si cambia el localStorage en OTRA pestaña
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        reload();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [reload]);

  const addEntry = useCallback((entry: Omit<TestHistoryEntry, "id" | "date">) => {
    const newEntry: TestHistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
    };
    const prev = loadHistory();
    const updated = [newEntry, ...prev].slice(0, 50); // máximo 50 entradas
    saveHistory(updated);
    setHistory(updated);
  }, []);

  return { history, addEntry, open, setOpen };
}