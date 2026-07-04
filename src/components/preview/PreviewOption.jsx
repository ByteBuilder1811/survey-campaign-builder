import { boxStyleToCss, cornerRadiusToCss } from "./previewStyleHelpers";

export default function PreviewOption({ text, selected, onClick, optionList }) {
  const style = selected ? optionList.selected : optionList.unselected;
  const css = {
    ...boxStyleToCss(style),
    ...cornerRadiusToCss(optionList.cornerRadius),
    minHeight: optionList.optionHeight,
    marginBottom: optionList.optionSpacing,
    display: "flex",
    alignItems: "center",
    gap: optionList.bulletSpacing,
    padding: "0 14px",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.15s ease",
  };

  const showBullet = optionList.layout === "radio" || optionList.layout === "checkbox";
  const bulletShape = optionList.layout === "radio" ? "50%" : "4px";

  return (
    <button type="button" onClick={onClick} style={css}>
      {showBullet && (
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: bulletShape,
            border: `2px solid ${selected ? style.borderColor : "#9ca3af"}`,
            backgroundColor: selected ? style.borderColor : "transparent",
            flexShrink: 0,
          }}
        />
      )}
      <span style={{ flex: 1, textAlign: style.alignment }}>{text}</span>
    </button>
  );
}
