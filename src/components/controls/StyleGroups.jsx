import { useSurvey } from "../../context/SurveyContext";
import { getPath } from "../../utils/objectPath";
import {
  ColorField,
  CornerRadiusField,
  FontStyleToggles,
  FourSideField,
  NumberField,
  SegmentedField,
  SelectField,
  ToggleField,
} from "./Field";

const FONT_OPTIONS = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
  { value: "Verdana, sans-serif", label: "Verdana" },
];

const ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

// Renders: color, font family, size, weight, style toggles, alignment, margins
// for any object shaped like makeTextStyle() in defaultState.js.
export function TextStyleGroup({ basePath }) {
  const { state, setPathValue } = useSurvey();
  const value = getPath(state, basePath);
  const set = (field, v) => setPathValue(`${basePath}.${field}`, v);

  return (
    <div>
      <ColorField label="Color" value={value.color} onChange={(v) => set("color", v)} />
      <SelectField
        label="Font Family"
        value={value.fontFamily}
        onChange={(v) => set("fontFamily", v)}
        options={FONT_OPTIONS}
      />
      <div className="grid grid-cols-2 gap-3">
        <NumberField
          label="Font Size"
          value={value.fontSize}
          onChange={(v) => set("fontSize", v)}
          suffix="px"
        />
        <NumberField
          label="Font Weight"
          value={value.fontWeight}
          onChange={(v) => set("fontWeight", v)}
          min={100}
          max={900}
          step={100}
        />
      </div>
      <FontStyleToggles
        value={{ bold: value.bold, italic: value.italic, underline: value.underline }}
        onChange={(v) => {
          set("bold", v.bold);
          set("italic", v.italic);
          set("underline", v.underline);
        }}
      />
      <SegmentedField
        label="Alignment"
        value={value.alignment}
        onChange={(v) => set("alignment", v)}
        options={ALIGN_OPTIONS}
      />
      <FourSideField label="Margin" value={value.margin} onChange={(v) => set("margin", v)} />
    </div>
  );
}

// Renders full box styling (used for selected/unselected option, additional comment)
export function BoxStyleGroup({ basePath, title }) {
  const { state, setPathValue } = useSurvey();
  const value = getPath(state, basePath);
  const set = (field, v) => setPathValue(`${basePath}.${field}`, v);

  return (
    <div>
      {title && <p className="text-sm font-semibold text-gray-700 mb-2">{title}</p>}
      <div className="grid grid-cols-3 gap-3">
        <ColorField label="Border" value={value.borderColor} onChange={(v) => set("borderColor", v)} />
        <ColorField label="Text" value={value.textColor} onChange={(v) => set("textColor", v)} />
        <ColorField label="Background" value={value.backgroundColor} onChange={(v) => set("backgroundColor", v)} />
      </div>
      <NumberField
        label="Border Width"
        value={value.borderWidth}
        onChange={(v) => set("borderWidth", v)}
        suffix="px"
      />
      <SelectField
        label="Font"
        value={value.fontFamily}
        onChange={(v) => set("fontFamily", v)}
        options={FONT_OPTIONS}
      />
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Font Size" value={value.fontSize} onChange={(v) => set("fontSize", v)} suffix="px" />
        <NumberField
          label="Font Weight"
          value={value.fontWeight}
          onChange={(v) => set("fontWeight", v)}
          min={100}
          max={900}
          step={100}
        />
      </div>
      <FontStyleToggles
        value={{ bold: value.bold, italic: value.italic, underline: value.underline }}
        onChange={(v) => {
          set("bold", v.bold);
          set("italic", v.italic);
          set("underline", v.underline);
        }}
      />
      <SegmentedField
        label="Alignment"
        value={value.alignment}
        onChange={(v) => set("alignment", v)}
        options={ALIGN_OPTIONS}
      />
    </div>
  );
}

// Renders full button styling (used for CTA and Thank You buttons)
export function ButtonStyleGroup({ basePath }) {
  const { state, setPathValue } = useSurvey();
  const value = getPath(state, basePath);
  const set = (field, v) => setPathValue(`${basePath}.${field}`, v);

  return (
    <div>
      <ToggleField
        label="Occupy Full Width"
        checked={value.fullWidth}
        onChange={(v) => set("fullWidth", v)}
      />
      <div className="grid grid-cols-3 gap-3">
        <ColorField label="Border" value={value.borderColor} onChange={(v) => set("borderColor", v)} />
        <ColorField label="Text" value={value.textColor} onChange={(v) => set("textColor", v)} />
        <ColorField label="Background" value={value.backgroundColor} onChange={(v) => set("backgroundColor", v)} />
      </div>
      <SelectField label="Font" value={value.fontFamily} onChange={(v) => set("fontFamily", v)} options={FONT_OPTIONS} />
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Font Size" value={value.fontSize} onChange={(v) => set("fontSize", v)} suffix="px" />
        <SelectField
          label="Font Style"
          value={value.fontStyle}
          onChange={(v) => set("fontStyle", v)}
          options={[
            { value: "normal", label: "Normal" },
            { value: "italic", label: "Italic" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Height" value={value.height} onChange={(v) => set("height", v)} suffix="px" disabled={value.fullWidth} />
        <NumberField label="Width" value={value.width} onChange={(v) => set("width", v)} suffix="px" />
      </div>
      <NumberField label="Border Width" value={value.borderWidth} onChange={(v) => set("borderWidth", v)} suffix="px" />
      <CornerRadiusField value={value.cornerRadius} onChange={(v) => set("cornerRadius", v)} />
      <SegmentedField label="Alignment" value={value.alignment} onChange={(v) => set("alignment", v)} options={ALIGN_OPTIONS} />
      <FourSideField label="Margins" value={value.margin} onChange={(v) => set("margin", v)} />
    </div>
  );
}

export { FONT_OPTIONS, ALIGN_OPTIONS };
