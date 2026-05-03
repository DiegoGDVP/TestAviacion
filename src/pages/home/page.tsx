import { Link } from "react-router-dom";
import CategoryCard from "@/components/feature/CategoryCard";
import { categories, getQuestionsByCategory } from "@/mocks/questions";

export default function Home() {
  const categoryCounts = categories.map((cat) => ({
    ...cat,
    count: getQuestionsByCategory(cat.slug).length,
  }));

  const totalQuestions = categoryCounts.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[420px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20aeronautical%20engineering%20background%20with%20blue%20and%20grey%20tones%20geometric%20patterns%20aircraft%20silhouettes%20modern%20minimal%20tech%20aesthetic%20subtle%20gradients%20clean%20professional%20aviation%20themed%20wallpaper%20high%20quality&width=1920&height=600&seq=1&orientation=landscape"
            alt="Fondo aeronáutico"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-white/90 tracking-wide">
              {totalQuestions} preguntas disponibles · 5 categorías
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Domina la mecánica
            <br />
            <span className="text-white/80">de la aviación</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Practica tests interactivos de mecánica aeronáutica. Motores, aerodinámica, electricidad, instrumentación y estructuras.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/test/motores"
              className="px-7 py-3 rounded-lg bg-white text-slate-900 font-semibold text-sm hover:bg-white/90 transition-all shadow-lg whitespace-nowrap"
            >
              Empezar test
            </Link>
            <a
              href="#categorias"
              className="px-7 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white font-medium text-sm border border-white/20 hover:bg-white/20 transition-all whitespace-nowrap"
            >
              Ver categorías
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-slate-100 bg-white">
        <div className="w-full px-4 md:px-8 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { value: `${totalQuestions}`, label: "Preguntas totales" },
              { value: "5", label: "Categorías" },
              { value: "3", label: "Opciones por pregunta" },
              { value: "100%", label: "Gratuito" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs md:text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="w-full px-4 md:px-8 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
              Elige una categoría
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto">
              Selecciona el área de mecánica aeronáutica que quieras practicar. Cada test incluye preguntas realistas con explicaciones detalladas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {categoryCounts.map((cat, i) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
                questionCount={cat.count}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="w-full px-4 md:px-8 py-14 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
                ¿Cómo funciona?
              </h2>
              <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto">
                Tres pasos sencillos para empezar a practicar y mejorar tus conocimientos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  step: "01",
                  title: "Elige categoría",
                  desc: "Selecciona entre Motores, Aerodinámica, Electricidad, Instrumentación o Estructuras.",
                  icon: "ri-folders-line",
                },
                {
                  step: "02",
                  title: "Responde las preguntas",
                  desc: "Lee cada pregunta y selecciona una de las tres opciones. Avanza a tu ritmo con la barra de progreso.",
                  icon: "ri-edit-box-line",
                },
                {
                  step: "03",
                  title: "Revisa tus resultados",
                  desc: "Obtén tu puntuación, revisa las respuestas correctas e incorrectas, y lee las explicaciones detalladas.",
                  icon: "ri-bar-chart-box-line",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-slate-600">
                      <i className={`${item.icon} text-xl md:text-2xl`} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 tracking-widest mb-2 block">
                    {item.step}
                  </span>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 md:px-8 py-14 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            ¿Listo para despegar?
          </h2>
          <p className="text-sm md:text-base text-slate-500 mb-8 max-w-md mx-auto">
            Empieza a practicar ahora mismo. No necesitas registrarte, es totalmente gratuito.
          </p>
          <Link
            to="/test/motores"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 transition-all shadow-lg whitespace-nowrap"
          >
            <span>Empezar primer test</span>
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}