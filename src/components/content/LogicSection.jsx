import { Plus, Trash2 } from "lucide-react";
import { useSurvey } from "../../context/SurveyContext";
import { SelectField, TextField } from "../controls/Field";

export default function LogicSection({ question }) {
  const { dispatch } = useSurvey();

  return (
    <div className="mt-3 rounded-md bg-gray-50 border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-gray-600">Logic</p>
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_CONDITION", questionId: question.id })}
          className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"
        >
          <Plus size={12} /> Add Condition
        </button>
      </div>

      {question.logic.conditions.length === 0 && (
        <p className="text-[11px] text-gray-400">
          No conditions yet. Add one to redirect based on a selected option.
        </p>
      )}

      {question.logic.conditions.map((cond) => (
        <div key={cond.id} className="flex items-end gap-2 mb-2 last:mb-0">
          <div className="flex-1">
            <SelectField
              label="If option selected"
              value={cond.optionId}
              onChange={(v) =>
                dispatch({
                  type: "UPDATE_CONDITION",
                  questionId: question.id,
                  conditionId: cond.id,
                  patch: { optionId: v },
                })
              }
              options={question.options.map((o) => ({ value: o.id, label: o.text }))}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Redirect / skip to"
              value={cond.target}
              placeholder="e.g. Question 3 or a URL"
              onChange={(v) =>
                dispatch({
                  type: "UPDATE_CONDITION",
                  questionId: question.id,
                  conditionId: cond.id,
                  patch: { target: v },
                })
              }
            />
          </div>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: "DELETE_CONDITION",
                questionId: question.id,
                conditionId: cond.id,
              })
            }
            className="mb-3 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
