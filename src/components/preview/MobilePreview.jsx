import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSurvey } from "../../context/SurveyContext";
import { cornerRadiusToCss, marginToCss } from "./previewStyleHelpers";
import PreviewQuestion from "./PreviewQuestion";
import PreviewThankYou from "./PreviewThankYou";

export default function MobilePreview() {
  const { state } = useSurvey();
  const { content, styling } = state;
  const totalPages = content.questions.length;

  // page index: 0..totalPages-1 are questions, totalPages is the thank-you page
  const [pageIndex, setPageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Reset navigation whenever question count changes so we never point
  // past the end of the array after the user edits "Number of Survey Pages".
  useEffect(() => {
    setPageIndex((idx) => Math.min(idx, Math.max(totalPages - 1, 0)));
  }, [totalPages]);

  const isThankYouPage = pageIndex === totalPages;
  const currentQuestion = content.questions[pageIndex];

  const goNext = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex((i) => i + 1);
    } else if (content.thankYou.enabled) {
      setPageIndex(totalPages);
    }
  };

  const crossBtn = styling.crossButton;

  if (!visible) {
    return (
      <div className="flex items-center justify-center h-full">
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="text-sm text-indigo-600 font-medium hover:underline"
        >
          Survey closed — click to reopen preview
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      {/* Phone frame */}
      <div className="relative w-[340px] h-[680px] bg-black rounded-[44px] p-3 shadow-2xl">
        <div className="relative w-full h-full bg-gray-900 rounded-[34px] overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: styling.appearance.backdropColor,
              opacity: styling.appearance.backdropOpacity / 100,
            }}
          />

          {/* Survey card */}
          <div
            className="absolute inset-x-3 top-10 bottom-10 overflow-y-auto builder-scroll"
            style={{
              backgroundColor: styling.appearance.backgroundColor,
              ...cornerRadiusToCss(styling.appearance.cornerRadius),
              padding: "20px 18px",
            }}
          >
            {crossBtn.enabled && (
              <button
                type="button"
                onClick={() => setVisible(false)}
                style={{
                  position: "absolute",
                  width: crossBtn.size,
                  height: crossBtn.size,
                  borderRadius:
                    crossBtn.style === "circle" ? "50%" : crossBtn.style === "square" ? 6 : 0,
                  backgroundColor: crossBtn.style === "minimal" ? "transparent" : crossBtn.fillColor,
                  border: crossBtn.style === "minimal" ? "none" : `1px solid ${crossBtn.strokeColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  ...marginToCss(crossBtn.margin),
                  top: crossBtn.margin.top,
                  right: crossBtn.margin.right,
                }}
              >
                {crossBtn.customIconUrl ? (
                  <img src={crossBtn.customIconUrl} alt="close" style={{ width: "60%", height: "60%" }} />
                ) : (
                  <X size={crossBtn.size * 0.55} color={crossBtn.crossColor} />
                )}
              </button>
            )}

            {isThankYouPage ? (
              <PreviewThankYou thankYou={content.thankYou} thankYouStyle={styling.thankYouStyle} />
            ) : currentQuestion ? (
              <PreviewQuestionWithNav
                question={currentQuestion}
                styling={styling}
                onNext={goNext}
              />
            ) : (
              <p className="text-sm text-gray-400 text-center mt-20">
                Add at least one question to preview your survey.
              </p>
            )}
          </div>

          {/* Page dots */}
          {!isThankYouPage && totalPages > 1 && (
            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
              {content.questions.map((q, i) => (
                <span
                  key={q.id}
                  className={`h-1.5 rounded-full transition-all ${
                    i === pageIndex ? "w-4 bg-gray-700" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Small wrapper so the CTA button inside PreviewQuestion can advance
// the phone's own page state without prop-drilling setters everywhere.
function PreviewQuestionWithNav({ question, styling, onNext }) {
  return (
    <div onClickCapture={(e) => {
      if (e.target.closest("[data-cta-button]")) onNext();
    }}>
      <PreviewQuestion question={{ ...question }} styling={styling} />
    </div>
  );
}
