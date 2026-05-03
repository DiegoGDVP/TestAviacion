export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/60">
      <div className="w-full px-4 md:px-8 py-10 md:py-14">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-slate-200 flex items-center justify-center">
              <img
                src="https://public.readdy.ai/ai/img_res/7c95ef8d-472d-41f0-9c0f-84f6dffd3d60.png"
                alt="AeroTest logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-slate-700">AeroTest</span>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Tests interactivos de mecánica de aviación · Prepárate para tus exámenes
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Email">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-mail-line text-lg" />
              </div>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} AeroTest. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}