import { useMemo } from "react";
import { Link } from "react-router-dom";
import { loadHistory, clearHistory, type TestHistoryEntry } from "@/hooks/useTestHistory";
import { getCategoryBySlug, categories } from "@/mocks/questions";
import { useState, useCallback } from "react";

function useForceReload() {
  const [tick, setTick] = useState(0);
  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { tick, reload };
}

export default function HistoryPage() {
  const { tick, reload } = useForceReload();

  const history = useMemo(() => {
    // eslint-disable-next-line no-unused-expressions
    tick;
    return loadHistory();
  }, [tick]);

  const handleClear = useCallback(() => {
    if (window.confirm("¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.")) {
      clearHistory();
      reload();
    }
  }, [reload]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  };

  const stats = useMemo(() => {
    if (history.length === 0) return null;
    const totalTests = history.length;
    const avgPercentage = Math.round(history.reduce((sum, h) => sum + h.percentage, 0) / totalTests);
    const bestTest = history.reduce((best, h) => (h.percentage > best.percentage ? h : best), history[0]);
    const totalQuestions = history.reduce((sum, h) => sum + h.totalQuestions, 0);
    const totalCorrect = history.reduce((sum, h) => sum + h.correctAnswers, 0);
    return { totalTests, avgPercentage, bestTest, totalQuestions, totalCorrect };
  }, [history]);

  const byCategory = useMemo(() => {
    const map: Record<string, { label: string; slug: string; count: number; avg: number }> = {};
    for (const entry of history) {
      const cat = getCategoryBySlug(entry.category);
      if (!map[entry.category]) {
        map[entry.category] = { label: cat?.label || entry.categoryLabel, slug: entry.category, count: 0, avg: 0 };
      }
      map[entry.category].count += 1;
      map[entry.category].avg += entry.percentage;
    }
    for (const key of Object.keys(map)) {
      map[key].avg = Math.round(map[key].avg / map[key].count);
    }
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [history]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 md:pt-28 pb-16">
      <div className="w-full px-4 md:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link to="/" className="text-slate-400 hover:text-slate-600 transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-arrow-left-line" />
                </div>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Historial de tests</h1>
            </div>
            <p className="text-sm text-slate-500 ml-7">
              Revisa tu progreso y evolución en cada categoría
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg text-sm font-medium text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-delete-bin-line" />
              </div>
              Borrar historial
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                <i className="ri-history-line text-2xl" />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Aún no has realizado ningún test</h2>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              Completa tu primer test para empezar a ver tu historial y seguir tu progreso.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/test/${cat.slug}`}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Stats cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
                  <p className="text-xs text-slate-400 mb-1">Tests realizados</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-800">{stats.totalTests}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
                  <p className="text-xs text-slate-400 mb-1">Media de aciertos</p>
                  <p className={`text-2xl md:text-3xl font-bold ${stats.avgPercentage >= 70 ? "text-emerald-600" : stats.avgPercentage >= 50 ? "text-amber-600" : "text-rose-600"}`}>
                    {stats.avgPercentage}%
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
                  <p className="text-xs text-slate-400 mb-1">Mejor puntuación</p>
                  <p className={`text-2xl md:text-3xl font-bold ${stats.bestTest.percentage >= 70 ? "text-emerald-600" : stats.bestTest.percentage >= 50 ? "text-amber-600" : "text-rose-600"}`}>
                    {stats.bestTest.percentage}%
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 truncate">{stats.bestTest.categoryLabel}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5">
                  <p className="text-xs text-slate-400 mb-1">Respuestas correctas</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-800">{stats.totalCorrect}</p>
                  <p className="text-[10px] text-slate-400 mt-1">de {stats.totalQuestions} totales</p>
                </div>
              </div>
            )}

            {/* By category */}
            {byCategory.length > 1 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 mb-6">
                <h2 className="text-sm font-semibold text-slate-800 mb-4">Rendimiento por categoría</h2>
                <div className="space-y-3">
                  {byCategory.map((cat) => (
                    <div key={cat.slug} className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700 truncate">{cat.label}</span>
                          <span className="text-xs text-slate-400 ml-2 flex-shrink-0">{cat.count} test{cat.count > 1 ? "s" : ""}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              cat.avg >= 70 ? "bg-emerald-500" : cat.avg >= 50 ? "bg-amber-500" : "bg-rose-500"
                            }`}
                            style={{ width: `${cat.avg}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-sm font-bold w-12 text-right ${cat.avg >= 70 ? "text-emerald-600" : cat.avg >= 50 ? "text-amber-600" : "text-rose-600"}`}>
                        {cat.avg}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full history list */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 md:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Registro completo</h2>
                <span className="text-xs text-slate-400">{history.length} entrada{history.length > 1 ? "s" : ""}</span>
              </div>
              <div className="divide-y divide-slate-50">
                {history.map((entry) => (
                  <EntryRow key={entry.id} entry={entry} formatDate={formatDate} formatTime={formatTime} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EntryRow({
  entry,
  formatDate,
  formatTime,
}: {
  entry: TestHistoryEntry;
  formatDate: (iso: string) => string;
  formatTime: (s: number) => string;
}) {
  const cat = getCategoryBySlug(entry.category);

  return (
    <div className="px-5 md:px-6 py-4 hover:bg-slate-50/60 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* Left: category + date */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-slate-600">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className={cat?.icon || "ri-file-list-line"} />
              </div>
              {entry.categoryLabel}
            </span>
            <span className="text-xs text-slate-400">{formatDate(entry.date)}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-time-line" />
              </div>
              {formatTime(entry.timeSeconds)}
            </span>
            <span>{entry.totalQuestions} preguntas</span>
          </div>
        </div>

        {/* Right: score */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className={`text-lg font-bold leading-none ${
              entry.percentage >= 70 ? "text-emerald-600" :
              entry.percentage >= 50 ? "text-amber-600" : "text-rose-600"
            }`}>
              {entry.percentage}%
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {entry.correctAnswers}/{entry.totalQuestions} correctas
            </p>
          </div>
          <div className="w-12 h-12 relative">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={entry.percentage >= 70 ? "#10b981" : entry.percentage >= 50 ? "#f59e0b" : "#f43f5e"}
                strokeWidth="3"
                strokeDasharray={`${entry.percentage} ${100 - entry.percentage}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-600">
              {entry.percentage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}