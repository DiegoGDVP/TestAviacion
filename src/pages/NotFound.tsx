import { useLocation, Link } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-xl bg-slate-100 flex items-center justify-center">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-slate-400">
            <i className="ri-error-warning-line text-2xl md:text-3xl" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-200 mb-2">404</h1>
        <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Página no encontrada</h2>
        <p className="text-sm text-slate-400 font-mono mb-1">{location.pathname}</p>
        <p className="text-sm text-slate-500 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-home-line" />
          </div>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}