import { Upload } from "lucide-react";
import { useSurvey } from "../../context/SurveyContext";
import { SelectField, TextField, TextAreaField, ToggleField } from "../controls/Field";
import CollapsibleCard from "./CollapsibleCard";

const MEDIA_TYPES = ["none", "png", "jpg", "jpeg", "gif", "lottie"];

export default function ThankYouSection() {
  const { state, dispatch } = useSurvey();
  const ty = state.content.thankYou;

  const update = (patch) =>
    dispatch({
      type: "SET_PATH",
      path: "content.thankYou",
      value: { ...ty, ...patch },
    });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    const type = MEDIA_TYPES.includes(ext) ? ext : "png";
    update({ media: { type, url: URL.createObjectURL(file) } });
  };

  return (
    <CollapsibleCard title="Thank You Page" badge={ty.enabled ? "Enabled" : "Disabled"}>
      <ToggleField label="Enable Thank You Page" checked={ty.enabled} onChange={(v) => update({ enabled: v })} />

      {ty.enabled && (
        <>
          <div className="mb-3">
            <span className="block text-xs font-medium text-gray-500 mb-1">Upload Media</span>
            <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-md px-3 py-2 text-xs text-gray-500 cursor-pointer hover:bg-gray-50">
              <Upload size={14} />
              {ty.media.type !== "none" ? `${ty.media.type.toUpperCase()} selected` : "PNG, JPG, JPEG, GIF or Lottie"}
              <input type="file" accept=".png,.jpg,.jpeg,.gif,.json" className="hidden" onChange={handleFile} />
            </label>
          </div>

          <TextField label="Title" value={ty.title} onChange={(v) => update({ title: v })} />
          <TextAreaField label="Subtitle" value={ty.subtitle} onChange={(v) => update({ subtitle: v })} />
          <TextField label="CTA Button Text" value={ty.ctaButtonText} onChange={(v) => update({ ctaButtonText: v })} />

          <SelectField
            label="Redirect"
            value={ty.redirectUrl ? "url" : "none"}
            onChange={(v) => update({ redirectUrl: v === "url" ? ty.redirectUrl || "https://" : "" })}
            options={[
              { value: "none", label: "None" },
              { value: "url", label: "URL" },
            ]}
          />
          {ty.redirectUrl !== "" && (
            <TextField
              label="Redirect URL"
              value={ty.redirectUrl}
              onChange={(v) => update({ redirectUrl: v })}
            />
          )}
        </>
      )}
    </CollapsibleCard>
  );
}
