import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getRandomQuestionsByCategory, getCategoryBySlug, type Question } from "@/mocks/questions";
import { useTestHistory } from "@/hooks/useTestHistory";

interface AnswerRecord {
  questionId: number;
  selected: 0 | 1 | 2;
  correct: boolean;
}

export default function TestPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const categoryInfo = useMemo(() => getCategoryBySlug(category || ""), [category]);

  // Usar un seed para forzar re-selección aleatoria al reiniciar
  const [seed, setSeed] = useState(() => Math.random());

  const questions = useMemo(
    () => getRandomQuestionsByCategory(category || "", 20),
    [category, seed]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedOption, setSelectedOption] = useState<0 | 1 | 2 | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const { addEntry } = useTestHistory();

  const [resultSaved, setResultSaved] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
    setFinished(false);
    setTimeElapsed(0);
    setTimerRunning(true);
  }, [category, seed]);

  useEffect(() => {
    if (!timerRunning || finished) return;
    const interval = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning, finished]);

  // Guardar resultado cuando termina el test
  useEffect(() => {
    if (finished && !resultSaved && categoryInfo) {
      const correctCount = answers.filter((a) => a.correct).length;
      const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
      addEntry({
        category: category,
        categoryLabel: categoryInfo.label,
        score: correctCount,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        percentage,
        timeSeconds: timeElapsed,
      });
      setResultSaved(true);
    }
  }, [finished, resultSaved, categoryInfo, category, answers, questions.length, timeElapsed, addEntry]);

  const currentQuestion: Question | undefined = questions[currentIndex];

  const handleSelect = useCallback((option: 0 | 1 | 2) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    setShowExplanation(true);
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion!.id,
        selected: option,
        correct: option === currentQuestion!.correctAnswer,
      },
    ]);
  }, [selectedOption, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      setTimerRunning(false);
    }
  }, [currentIndex, questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      const prevAnswer = answers.find((a) => a.questionId === questions[currentIndex - 1].id);
      setSelectedOption(prevAnswer ? prevAnswer.selected : null);
      setShowExplanation(!!prevAnswer);
    }
  }, [currentIndex, answers, questions]);

  const handleRestart = useCallback(() => {
    setSeed(Math.random());
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const correctCount = answers.filter((a) => a.correct).length;
  const incorrectCount = answers.length - correctCount;
  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (!categoryInfo || questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-slate-100 flex items-center justify-center">
            <div className="w-8 h-8 flex items-center justify-center text-slate-400">
              <i className="ri-error-warning-line text-2xl" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Categoría no encontrada</h1>
          <p className="text-sm text-slate-500 mb-6">
            La categoría de test que buscas no existe o no tiene preguntas disponibles.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-left-line" />
            </div>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 md:pt-24 pb-12">
        <div className="w-full px-4 md:px-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 md:p-10 text-center border-b border-slate-100">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-full bg-slate-100 flex items-center justify-center">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-slate-600">
                  <i className="ri-trophy-line text-2xl md:text-3xl" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Test completado</h1>
              <p className="text-sm text-slate-500">
                {categoryInfo.label} · {formatTime(timeElapsed)}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                  <p className="text-xl md:text-2xl font-bold text-emerald-700">{correctCount}</p>
                  <p className="text-xs text-emerald-600 mt-1">Correctas</p>
                </div>
                <div className="rounded-xl bg-rose-50 border border-rose-100 p-4">
                  <p className="text-xl md:text-2xl font-bold text-rose-700">{incorrectCount}</p>
                  <p className="text-xs text-rose-600 mt-1">Incorrectas</p>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xl md:text-2xl font-bold text-slate-700">{percentage}%</p>
                  <p className="text-xs text-slate-500 mt-1">Aciertos</p>
                </div>
              </div>

              <div className="mt-6 w-full max-w-sm mx-auto">
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      percentage >= 70 ? "bg-emerald-500" : percentage >= 50 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Revisión de respuestas</h2>
              <div className="space-y-4">
                {questions.map((q, i) => {
                  const ans = answers.find((a) => a.questionId === q.id);
                  const isCorrect = ans?.correct ?? false;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl border p-4 md:p-5 transition-all ${
                        isCorrect
                          ? "bg-emerald-50/50 border-emerald-100"
                          : "bg-rose-50/50 border-rose-100"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                          }`}
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className={`ri-${isCorrect ? "check" : "close"}-line text-xs`} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800 leading-relaxed">
                            <span className="text-slate-400 font-normal mr-2">{i + 1}.</span>
                            {q.question}
                          </p>
                        </div>
                      </div>
                      <div className="ml-9 space-y-1.5">
                        {q.options.map((opt, idx) => {
                          const isSelected = ans?.selected === idx;
                          const isCorrectOpt = q.correctAnswer === idx;
                          let optClass = "text-sm px-3 py-1.5 rounded-md border ";
                          if (isCorrectOpt) {
                            optClass += "bg-emerald-100 border-emerald-200 text-emerald-800 font-medium";
                          } else if (isSelected && !isCorrectOpt) {
                            optClass += "bg-rose-100 border-rose-200 text-rose-800";
                          } else {
                            optClass += "bg-white border-slate-100 text-slate-500";
                          }
                          return (
                            <div key={idx} className={optClass}>
                              {opt}
                              {isCorrectOpt && (
                                <span className="ml-2 text-xs font-medium text-emerald-600">Correcta</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="ml-9 mt-3 text-xs text-slate-500 leading-relaxed bg-white/60 rounded-md px-3 py-2 border border-slate-100">
                        <span className="font-medium text-slate-600">Explicación:</span> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 md:p-10 border-t border-slate-100 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-refresh-line" />
                  </div>
                  Repetir test
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-home-line" />
                  </div>
                  Menú principal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = questions.length > 0 ? ((currentIndex + (selectedOption !== null ? 1 : 0)) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 pt-20 md:pt-24 pb-12">
      <div className="w-full px-4 md:px-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => navigate("/")}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Volver"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-arrow-left-line" />
                </div>
              </button>
              <h1 className="text-lg md:text-xl font-bold text-slate-800">{categoryInfo.label}</h1>
            </div>
            <p className="text-xs text-slate-400 ml-7">
              Pregunta {currentIndex + 1} de {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-500">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-time-line" />
            </div>
            <span>{formatTime(timeElapsed)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-700 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        {currentQuestion && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="mb-6 md:mb-8">
              <span className="inline-block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3">
                Pregunta {currentIndex + 1}
              </span>
              <h2 className="text-base md:text-lg font-semibold text-slate-800 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;
                const showResult = selectedOption !== null;

                let btnClass =
                  "w-full text-left px-4 md:px-5 py-3.5 md:py-4 rounded-xl border text-sm md:text-base font-medium transition-all duration-200 ";

                if (showResult) {
                  if (isCorrect) {
                    btnClass += "bg-emerald-50 border-emerald-200 text-emerald-800";
                  } else if (isSelected && !isCorrect) {
                    btnClass += "bg-rose-50 border-rose-200 text-rose-800";
                  } else {
                    btnClass += "bg-slate-50 border-slate-100 text-slate-400";
                  }
                } else {
                  btnClass +=
                    "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 cursor-pointer";
                }

                return (
                  <button
                    key={idx}
                    className={btnClass}
                    onClick={() => handleSelect(idx as 0 | 1 | 2)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                          showResult && isCorrect
                            ? "bg-emerald-200 text-emerald-700"
                            : showResult && isSelected && !isCorrect
                            ? "bg-rose-200 text-rose-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrect && (
                        <div className="w-5 h-5 flex items-center justify-center text-emerald-600">
                          <i className="ri-check-line" />
                        </div>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <div className="w-5 h-5 flex items-center justify-center text-rose-600">
                          <i className="ri-close-line" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 md:p-5 rounded-xl bg-slate-50 border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-4 h-4 flex items-center justify-center text-slate-600">
                      <i className="ri-lightbulb-line text-xs" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-1">Explicación</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all flex items-center gap-2 whitespace-nowrap ${
                  currentIndex === 0
                    ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-left-line" />
                </div>
                Anterior
              </button>

              {selectedOption !== null ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  {currentIndex < questions.length - 1 ? "Siguiente" : "Ver resultados"}
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </div>
                </button>
              ) : (
                <div className="px-4 py-2.5 text-sm text-slate-400">
                  Selecciona una respuesta
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
