import { useSurvey } from "../../context/SurveyContext";
import { ColorField, CornerRadiusField, NumberField } from "../controls/Field";
import CollapsibleCard from "../content/CollapsibleCard";

export default function AppearanceSection() {
  const { state, setPathValue } = useSurvey();
  const a = state.styling.appearance;

  return (
    <CollapsibleCard title="Appearance" defaultOpen>
      <ColorField
        label="Background Color"
        value={a.backgroundColor}
        onChange={(v) => setPathValue("styling.appearance.backgroundColor", v)}
      />
      <CornerRadiusField
        value={a.cornerRadius}
        onChange={(v) => setPathValue("styling.appearance.cornerRadius", v)}
      />
      <NumberField
        label="Display Delay"
        value={a.delaySeconds}
        onChange={(v) => setPathValue("styling.appearance.delaySeconds", v)}
        suffix="seconds"
      />
      <div className="grid grid-cols-2 gap-3">
        <ColorField
          label="Backdrop Color"
          value={a.backdropColor}
          onChange={(v) => setPathValue("styling.appearance.backdropColor", v)}
        />
        <NumberField
          label="Backdrop Opacity"
          value={a.backdropOpacity}
          min={0}
          max={100}
          onChange={(v) => setPathValue("styling.appearance.backdropOpacity", v)}
          suffix="%"
        />
      </div>
    </CollapsibleCard>
  );
}
