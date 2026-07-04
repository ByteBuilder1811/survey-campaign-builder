import { Upload } from "lucide-react";
import { useSurvey } from "../../context/SurveyContext";
import { ColorField, FourSideField, NumberField, SegmentedField, ToggleField } from "../controls/Field";
import CollapsibleCard from "../content/CollapsibleCard";

const STYLES = [
  { value: "circle", label: "Circle" },
  { value: "minimal", label: "Minimal" },
  { value: "square", label: "Square" },
];

export default function CrossButtonSection() {
  const { state, setPathValue } = useSurvey();
  const c = state.styling.crossButton;
  const set = (field, v) => setPathValue(`styling.crossButton.${field}`, v);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    set("customIconUrl", URL.createObjectURL(file));
  };

  return (
    <CollapsibleCard title="Cross Button Styling" badge={c.enabled ? "Enabled" : "Disabled"}>
      <ToggleField label="Enable / Disable" checked={c.enabled} onChange={(v) => set("enabled", v)} />

      {c.enabled && (
        <>
          <SegmentedField label="Choose Cross Button Style" value={c.style} onChange={(v) => set("style", v)} options={STYLES} />

          <div className="mb-3">
            <span className="block text-xs font-medium text-gray-500 mb-1">Upload Custom Cross Icon</span>
            <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-md px-3 py-2 text-xs text-gray-500 cursor-pointer hover:bg-gray-50">
              <Upload size={14} />
              {c.customIconUrl ? "Custom icon selected" : "SVG or PNG"}
              <input type="file" accept=".svg,.png" className="hidden" onChange={handleUpload} />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ColorField label="Cross Color" value={c.crossColor} onChange={(v) => set("crossColor", v)} />
            <ColorField label="Fill Color" value={c.fillColor} onChange={(v) => set("fillColor", v)} />
            <ColorField label="Stroke Color" value={c.strokeColor} onChange={(v) => set("strokeColor", v)} />
          </div>
          <NumberField label="Size" value={c.size} onChange={(v) => set("size", v)} suffix="px" />
          <FourSideField label="Margins" value={c.margin} onChange={(v) => set("margin", v)} />
        </>
      )}
    </CollapsibleCard>
  );
}
