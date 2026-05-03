import { Link } from "react-router-dom";
import type { categories } from "@/mocks/questions";

type Category = (typeof categories)[number];

interface CategoryCardProps {
  category: Category;
  questionCount: number;
  index: number;
}

export default function CategoryCard({ category, questionCount, index }: CategoryCardProps) {
  const colors = [
    { bg: "bg-slate-50", iconBg: "bg-slate-100", iconText: "text-slate-600", border: "border-slate-200", hover: "hover:border-slate-300" },
    { bg: "bg-slate-50", iconBg: "bg-slate-100", iconText: "text-slate-600", border: "border-slate-200", hover: "hover:border-slate-300" },
    { bg: "bg-slate-50", iconBg: "bg-slate-100", iconText: "text-slate-600", border: "border-slate-200", hover: "hover:border-slate-300" },
    { bg: "bg-slate-50", iconBg: "bg-slate-100", iconText: "text-slate-600", border: "border-slate-200", hover: "hover:border-slate-300" },
    { bg: "bg-slate-50", iconBg: "bg-slate-100", iconText: "text-slate-600", border: "border-slate-200", hover: "hover:border-slate-300" },
  ];
  const c = colors[index % colors.length];

  return (
    <Link
      to={`/test/${category.slug}`}
      className={`group relative flex flex-col rounded-xl border ${c.border} ${c.bg} ${c.hover} transition-all duration-300 hover:shadow-sm p-5 md:p-6`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-lg ${c.iconBg} flex items-center justify-center transition-transform group-hover:scale-105`}>
          <div className={`${c.iconText} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center`}>
            <i className={`${category.icon} text-xl md:text-2xl`} />
          </div>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 group-hover:text-slate-600 group-hover:border-slate-300 transition-all">
          <i className="ri-arrow-right-line text-sm" />
        </div>
      </div>

      <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-1.5 group-hover:text-slate-900 transition-colors">
        {category.label}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
        {category.description}
      </p>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        <i className="ri-questionnaire-line" />
        <span>{questionCount} preguntas</span>
      </div>
    </Link>
  );
}