import { createContext, useContext, useMemo, useReducer } from "react";
import { setPath } from "../utils/objectPath";
import {
  buildQuestions,
  defaultState,
  makeQuestion,
} from "../utils/defaultState";
import { generateId } from "../utils/id";

const SurveyContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    // Generic setter: works for any field anywhere in state via a dot path.
    // e.g. { type: "SET_PATH", path: "styling.ctaButton.height", value: 50 }
    case "SET_PATH":
      return setPath(state, action.path, action.value);

    case "SET_NUM_PAGES": {
      const count = Math.max(1, Number(action.count) || 1);
      const current = state.content.questions;
      let nextQuestions;
      if (count === current.length) {
        nextQuestions = current;
      } else if (count > current.length) {
        const extra = Array.from({ length: count - current.length }, (_, i) =>
          makeQuestion(current.length + i + 1)
        );
        nextQuestions = [...current, ...extra];
      } else {
        nextQuestions = current.slice(0, count);
      }
      return {
        ...state,
        content: {
          ...state.content,
          numPages: count,
          questions: nextQuestions,
        },
      };
    }

    case "UPDATE_QUESTION": {
      const { questionId, patch } = action;
      return {
        ...state,
        content: {
          ...state.content,
          questions: state.content.questions.map((q) =>
            q.id === questionId ? { ...q, ...patch } : q
          ),
        },
      };
    }

    case "ADD_OPTION": {
      const { questionId } = action;
      return {
        ...state,
        content: {
          ...state.content,
          questions: state.content.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  options: [
                    ...q.options,
                    {
                      id: generateId("option"),
                      text: `Option ${q.options.length + 1}`,
                    },
                  ],
                }
              : q
          ),
        },
      };
    }

    case "DELETE_OPTION": {
      const { questionId, optionId } = action;
      return {
        ...state,
        content: {
          ...state.content,
          questions: state.content.questions.map((q) => {
            if (q.id !== questionId) return q;
            if (q.options.length <= 2) return q; // enforce minimum 2 options
            return { ...q, options: q.options.filter((o) => o.id !== optionId) };
          }),
        },
      };
    }

    case "UPDATE_OPTION_TEXT": {
      const { questionId, optionId, text } = action;
      return {
        ...state,
        content: {
          ...state.content,
          questions: state.content.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  options: q.options.map((o) =>
                    o.id === optionId ? { ...o, text } : o
                  ),
                }
              : q
          ),
        },
      };
    }

    case "ADD_CONDITION": {
      const { questionId } = action;
      return {
        ...state,
        content: {
          ...state.content,
          questions: state.content.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  logic: {
                    ...q.logic,
                    conditions: [
                      ...q.logic.conditions,
                      {
                        id: generateId("cond"),
                        optionId: q.options[0]?.id || "",
                        action: "redirect",
                        target: "",
                      },
                    ],
                  },
                }
              : q
          ),
        },
      };
    }

    case "UPDATE_CONDITION": {
      const { questionId, conditionId, patch } = action;
      return {
        ...state,
        content: {
          ...state.content,
          questions: state.content.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  logic: {
                    ...q.logic,
                    conditions: q.logic.conditions.map((c) =>
                      c.id === conditionId ? { ...c, ...patch } : c
                    ),
                  },
                }
              : q
          ),
        },
      };
    }

    case "DELETE_CONDITION": {
      const { questionId, conditionId } = action;
      return {
        ...state,
        content: {
          ...state.content,
          questions: state.content.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  logic: {
                    ...q.logic,
                    conditions: q.logic.conditions.filter(
                      (c) => c.id !== conditionId
                    ),
                  },
                }
              : q
          ),
        },
      };
    }

    default:
      return state;
  }
}

export function SurveyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // Convenience helper so components don't need to know action shapes
  // for the common case of "update one field at this path".
  const setPathValue = (path, value) =>
    dispatch({ type: "SET_PATH", path, value });

  const value = useMemo(
    () => ({ state, dispatch, setPathValue }),
    [state]
  );

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
}

export function useSurvey() {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error("useSurvey must be used within a SurveyProvider");
  return ctx;
}
