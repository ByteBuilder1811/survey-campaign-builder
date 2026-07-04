import { Plus, Trash2 } from "lucide-react";
import { useSurvey } from "../../context/SurveyContext";
import { TextField, TextAreaField, ToggleField } from "../controls/Field";
import CollapsibleCard from "./CollapsibleCard";
import LogicSection from "./LogicSection";

export default function QuestionSection({ question, index }) {
  const { dispatch } = useSurvey();

  const updateQuestion = (patch) =>
    dispatch({ type: "UPDATE_QUESTION", questionId: question.id, patch });

  return (
    <CollapsibleCard title={`Question ${index + 1}`} badge={`${question.options.length} options`}>
      <TextField
        label="Title"
        value={question.title}
        onChange={(v) => updateQuestion({ title: v })}
      />
      <TextAreaField
        label="Subtitle"
        value={question.subtitle}
        onChange={(v) => updateQuestion({ subtitle: v })}
      />

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="block text-xs font-medium text-gray-500">Options</span>
          <button
            type="button"
            onClick={() => dispatch({ type: "ADD_OPTION", questionId: question.id })}
            className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"
          >
            <Plus size={12} /> Add Option
          </button>
        </div>
        {question.options.map((opt, i) => (
          <div key={opt.id} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={opt.text}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_OPTION_TEXT",
                  questionId: question.id,
                  optionId: opt.id,
                  text: e.target.value,
                })
              }
              className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={`Option ${i + 1}`}
            />
            <button
              type="button"
              disabled={question.options.length <= 2}
              onClick={() =>
                dispatch({ type: "DELETE_OPTION", questionId: question.id, optionId: opt.id })
              }
              className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400"
              title={question.options.length <= 2 ? "Minimum 2 options required" : "Delete option"}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <ToggleField
        label="Additional Comments"
        checked={question.additionalComments}
        onChange={(v) => updateQuestion({ additionalComments: v })}
      />

      <LogicSection question={question} />

      <div className="mt-3">
        <TextField
          label="Submit Button Text"
          value={question.submitButtonText}
          onChange={(v) => updateQuestion({ submitButtonText: v })}
        />
      </div>
    </CollapsibleCard>
  );
}
