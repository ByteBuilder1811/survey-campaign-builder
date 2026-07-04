import { useSurvey } from "../../context/SurveyContext";
import { CornerRadiusField, NumberField, SegmentedField } from "../controls/Field";
import { BoxStyleGroup } from "../controls/StyleGroups";
import CollapsibleCard from "../content/CollapsibleCard";

const LAYOUTS = [
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "filled", label: "Filled" },
  { value: "alternative", label: "Alt" },
];

export default function OptionListSection() {
  const { state, setPathValue } = useSurvey();
  const o = state.styling.optionList;

  return (
    <CollapsibleCard title="Option List Style">
      <SegmentedField
        label="Option Layout"
        value={o.layout}
        onChange={(v) => setPathValue("styling.optionList.layout", v)}
        options={LAYOUTS}
      />
      <NumberField
        label="Option Height"
        value={o.optionHeight}
        onChange={(v) => setPathValue("styling.optionList.optionHeight", v)}
        suffix="px"
      />
      <div className="grid grid-cols-2 gap-3">
        <NumberField
          label="Bullet Spacing"
          value={o.bulletSpacing}
          onChange={(v) => setPathValue("styling.optionList.bulletSpacing", v)}
          suffix="px"
        />
        <NumberField
          label="Option Spacing"
          value={o.optionSpacing}
          onChange={(v) => setPathValue("styling.optionList.optionSpacing", v)}
          suffix="px"
        />
      </div>
      <CornerRadiusField
        value={o.cornerRadius}
        onChange={(v) => setPathValue("styling.optionList.cornerRadius", v)}
      />

      <div className="mt-4 pt-3 border-t border-gray-100">
        <BoxStyleGroup basePath="styling.optionList.selected" title="Selected Option Styling" />
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <BoxStyleGroup basePath="styling.optionList.unselected" title="Unselected Option Styling" />
      </div>
    </CollapsibleCard>
  );
}
