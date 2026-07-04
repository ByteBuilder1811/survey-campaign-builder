import { generateId } from "./id";

// A single reusable shape for any "text element" (title/subtitle/etc.)
// so the same style-control component can drive many sections.
export function makeTextStyle(overrides = {}) {
  return {
    color: "#1f2937",
    fontFamily: "Inter, sans-serif",
    fontSize: 18,
    fontWeight: 600,
    bold: false,
    italic: false,
    underline: false,
    alignment: "left", // left | center | right
    margin: { top: 8, bottom: 8, left: 0, right: 0 },
    ...overrides,
  };
}

// A single reusable shape for any "box element" (option pill / button)
export function makeBoxStyle(overrides = {}) {
  return {
    borderColor: "#d1d5db",
    textColor: "#1f2937",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    bold: false,
    italic: false,
    underline: false,
    alignment: "left",
    ...overrides,
  };
}

export function makeCornerRadius(value = 8) {
  return { tl: value, tr: value, bl: value, br: value };
}

export function makeMargin(overrides = {}) {
  return { top: 0, bottom: 0, left: 0, right: 0, ...overrides };
}

export function makeQuestion(index) {
  return {
    id: generateId("question"),
    title: `Question ${index}`,
    subtitle: "Add a short description for this question",
    options: [
      { id: generateId("option"), text: "Option 1" },
      { id: generateId("option"), text: "Option 2" },
    ],
    additionalComments: false,
    logic: {
      conditions: [], // [{ id, optionId, action: 'redirect'|'skipTo', target }]
    },
    submitButtonText: "Next",
  };
}

export function buildQuestions(count) {
  return Array.from({ length: count }, (_, i) => makeQuestion(i + 1));
}

export const defaultState = {
  content: {
    numPages: 2,
    questions: buildQuestions(2),
    thankYou: {
      enabled: true,
      media: { type: "none", url: "" }, // type: none | png | jpg | jpeg | gif | lottie
      title: "Thank you!",
      subtitle: "Your response has been recorded.",
      ctaButtonText: "Done",
      redirectUrl: "",
    },
  },
  styling: {
    appearance: {
      backgroundColor: "#ffffff",
      cornerRadius: makeCornerRadius(16),
      delaySeconds: 0,
      backdropColor: "#000000",
      backdropOpacity: 40,
    },
    questionTitle: makeTextStyle({ fontSize: 20, fontWeight: 700 }),
    subtitleStyle: makeTextStyle({
      fontSize: 14,
      fontWeight: 400,
      color: "#6b7280",
    }),
    optionList: {
      layout: "radio", // radio | checkbox | filled | alternative
      optionHeight: 48,
      bulletSpacing: 10,
      optionSpacing: 12,
      cornerRadius: makeCornerRadius(10),
      selected: makeBoxStyle({
        borderColor: "#4f46e5",
        backgroundColor: "#eef2ff",
        textColor: "#4338ca",
        fontWeight: 600,
      }),
      unselected: makeBoxStyle({}),
    },
    additionalComment: makeBoxStyle({
      backgroundColor: "#f9fafb",
      alignment: "left",
    }),
    ctaButton: {
      fullWidth: true,
      borderColor: "#4f46e5",
      textColor: "#ffffff",
      backgroundColor: "#4f46e5",
      fontFamily: "Inter, sans-serif",
      fontSize: 15,
      fontStyle: "normal", // normal | italic
      height: 46,
      width: 200,
      borderWidth: 0,
      cornerRadius: makeCornerRadius(10),
      alignment: "center",
      margin: makeMargin({ top: 16, bottom: 0 }),
    },
    crossButton: {
      enabled: true,
      style: "circle", // circle | minimal | square
      customIconUrl: "",
      crossColor: "#374151",
      fillColor: "#f3f4f6",
      strokeColor: "#d1d5db",
      size: 28,
      margin: makeMargin({ top: 12, right: 12 }),
    },
    thankYouStyle: {
      title: makeTextStyle({ fontSize: 20, fontWeight: 700, alignment: "center" }),
      subtitle: makeTextStyle({
        fontSize: 14,
        fontWeight: 400,
        color: "#6b7280",
        alignment: "center",
      }),
      image: {
        width: 120,
        height: 120,
        margin: makeMargin({ top: 8, bottom: 16 }),
      },
      button: {
        fullWidth: true,
        borderColor: "#4f46e5",
        textColor: "#ffffff",
        backgroundColor: "#4f46e5",
        fontFamily: "Inter, sans-serif",
        fontSize: 15,
        fontStyle: "normal",
        height: 46,
        width: 200,
        borderWidth: 0,
        cornerRadius: makeCornerRadius(10),
        alignment: "center",
        margin: makeMargin({ top: 16 }),
      },
    },
  },
};
