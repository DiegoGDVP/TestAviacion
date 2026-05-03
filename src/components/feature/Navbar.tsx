import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { categories } from "@/mocks/questions";
import { useTestHistory, clearHistory } from "@/hooks/useTestHistory";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { history, open, setOpen } = useTestHistory();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpen(false);
  }, [location, setOpen]);

  // Cerrar panel al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, setOpen]);

  const isHome = location.pathname === "/";

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src="https://public.readdy.ai/ai/img_res/7c95ef8d-472d-41f0-9c0f-84f6dffd3d60.png"
                alt="AeroTest logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${
                scrolled || !isHome ? "text-slate-800" : "text-white"
              }`}
            >
              AeroTest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/test/${cat.slug}`}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-slate-100/10 whitespace-nowrap ${
                  scrolled || !isHome
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Right section: history + mobile menu */}
          <div className="flex items-center gap-2">
            {/* History button */}
            <div className="relative" ref={panelRef}>
              <button
                onClick={() => setOpen(!open)}
                className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  scrolled || !isHome
                    ? "text-slate-600 hover:bg-slate-100"
                    : "text-white/80 hover:bg-white/10"
                }`}
                aria-label="Historial de tests"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-history-line text-lg" />
                </div>
                {history.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    {history.length > 9 ? "9+" : history.length}
                  </span>
                )}
              </button>

              {/* History panel */}
              {open && (
                <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-800">Historial de tests</h3>
                    {history.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="text-xs text-rose-500 hover:text-rose-700 transition-colors"
                      >
                        Borrar todo
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {history.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                          <div className="w-5 h-5 flex items-center justify-center text-slate-400">
                            <i className="ri-history-line" />
                          </div>
                        </div>
                        <p className="text-sm text-slate-500">Aún no has realizado ningún test</p>
                        <p className="text-xs text-slate-400 mt-1">Completa un test para verlo aquí</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-50">
                        {history.slice(0, 8).map((entry) => (
                          <div key={entry.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">
                                  {entry.categoryLabel}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">
                                  {formatDate(entry.date)} · {formatTime(entry.timeSeconds)} · {entry.totalQuestions} preg.
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className={`text-sm font-bold ${
                                  entry.percentage >= 70 ? "text-emerald-600" :
                                  entry.percentage >= 50 ? "text-amber-600" : "text-rose-600"
                                }`}>
                                  {entry.percentage}%
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  {entry.correctAnswers}/{entry.totalQuestions}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  entry.percentage >= 70 ? "bg-emerald-500" :
                                  entry.percentage >= 50 ? "bg-amber-500" : "bg-rose-500"
                                }`}
                                style={{ width: `${entry.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {history.length > 0 && (
                    <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                      <Link
                        to="/historial"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        Ver historial completo
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-arrow-right-line" />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                scrolled || !isHome ? "text-slate-700" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              <i className={`ri-${mobileOpen ? "close" : "menu"}-line text-xl`} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Inicio
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/test/${cat.slug}`}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
