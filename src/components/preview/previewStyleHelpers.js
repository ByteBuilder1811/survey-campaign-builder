// Converts the makeTextStyle()-shaped state into a React inline style object.
export function textStyleToCss(t) {
  return {
    color: t.color,
    fontFamily: t.fontFamily,
    fontSize: `${t.fontSize}px`,
    fontWeight: t.bold ? 700 : t.fontWeight,
    fontStyle: t.italic ? "italic" : "normal",
    textDecoration: t.underline ? "underline" : "none",
    textAlign: t.alignment,
    marginTop: t.margin.top,
    marginBottom: t.margin.bottom,
    marginLeft: t.margin.left,
    marginRight: t.margin.right,
  };
}

export function boxStyleToCss(b) {
  return {
    borderColor: b.borderColor,
    borderWidth: b.borderWidth,
    borderStyle: "solid",
    color: b.textColor,
    backgroundColor: b.backgroundColor,
    fontFamily: b.fontFamily,
    fontSize: `${b.fontSize}px`,
    fontWeight: b.bold ? 700 : b.fontWeight,
    fontStyle: b.italic ? "italic" : "normal",
    textDecoration: b.underline ? "underline" : "none",
    textAlign: b.alignment,
  };
}

export function cornerRadiusToCss(c) {
  return {
    borderTopLeftRadius: c.tl,
    borderTopRightRadius: c.tr,
    borderBottomLeftRadius: c.bl,
    borderBottomRightRadius: c.br,
  };
}

export function marginToCss(m) {
  return {
    marginTop: m.top,
    marginBottom: m.bottom,
    marginLeft: m.left,
    marginRight: m.right,
  };
}

export function buttonStyleToCss(btn) {
  return {
    width: btn.fullWidth ? "100%" : btn.width,
    height: btn.height,
    color: btn.textColor,
    backgroundColor: btn.backgroundColor,
    borderColor: btn.borderColor,
    borderWidth: btn.borderWidth,
    borderStyle: "solid",
    fontFamily: btn.fontFamily,
    fontSize: btn.fontSize,
    fontStyle: btn.fontStyle,
    textAlign: "center",
    ...cornerRadiusToCss(btn.cornerRadius),
    cursor: "pointer",
  };
}

// Wrapper style that positions the button per its alignment + margin,
// kept separate from buttonStyleToCss so full-width buttons still align sensibly.
export function buttonWrapperToCss(btn) {
  const justify =
    btn.alignment === "center" ? "center" : btn.alignment === "right" ? "flex-end" : "flex-start";
  return {
    display: "flex",
    justifyContent: justify,
    ...marginToCss(btn.margin),
  };
}
