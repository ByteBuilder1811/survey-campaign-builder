import { useState } from "react";
import { boxStyleToCss, buttonStyleToCss, buttonWrapperToCss, textStyleToCss } from "./previewStyleHelpers";
import PreviewOption from "./PreviewOption";

export default function PreviewQuestion({ question, styling }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [comment, setComment] = useState("");

  const ctaBtn = {
    ...styling.ctaButton,
    // Submit button text comes from the question, everything else from styling
  };

  return (
    <div>
      <h3 style={textStyleToCss(styling.questionTitle)}>{question.title}</h3>
      {question.subtitle && (
        <p style={textStyleToCss(styling.subtitleStyle)}>{question.subtitle}</p>
      )}

      <div style={{ marginTop: 12 }}>
        {question.options.map((opt) => (
          <PreviewOption
            key={opt.id}
            text={opt.text}
            selected={selectedOptionId === opt.id}
            onClick={() => setSelectedOptionId(opt.id)}
            optionList={styling.optionList}
          />
        ))}
      </div>

      {question.additionalComments && (
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          style={{
            ...boxStyleToCss(styling.additionalComment),
            width: "100%",
            borderRadius: 8,
            padding: 10,
            marginTop: 10,
            resize: "none",
            fontFamily: styling.additionalComment.fontFamily,
          }}
        />
      )}

      <div style={buttonWrapperToCss(ctaBtn)}>
        <button type="button" data-cta-button style={buttonStyleToCss(ctaBtn)}>
          {question.submitButtonText || "Next"}
        </button>
      </div>
    </div>
  );
}
