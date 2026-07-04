import { useSurvey } from "../../context/SurveyContext";
import { FourSideField, NumberField } from "../controls/Field";
import { ButtonStyleGroup, TextStyleGroup } from "../controls/StyleGroups";
import CollapsibleCard from "../content/CollapsibleCard";

export default function ThankYouStyleSection() {
  const { state, setPathValue } = useSurvey();
  const img = state.styling.thankYouStyle.image;

  return (
    <CollapsibleCard title="Thank You Page Styling">
      <p className="text-xs font-semibold text-gray-700 mb-2">Title</p>
      <TextStyleGroup basePath="styling.thankYouStyle.title" />

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-700 mb-2">Subtitle</p>
        <TextStyleGroup basePath="styling.thankYouStyle.subtitle" />
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-700 mb-2">Image Styling</p>
        <div className="grid grid-cols-2 gap-3">
          <NumberField
            label="Width"
            value={img.width}
            onChange={(v) => setPathValue("styling.thankYouStyle.image.width", v)}
            suffix="px"
          />
          <NumberField
            label="Height"
            value={img.height}
            onChange={(v) => setPathValue("styling.thankYouStyle.image.height", v)}
            suffix="px"
          />
        </div>
        <FourSideField
          label="Margins"
          value={img.margin}
          onChange={(v) => setPathValue("styling.thankYouStyle.image.margin", v)}
        />
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-700 mb-2">Thank You Button Styling</p>
        <ButtonStyleGroup basePath="styling.thankYouStyle.button" />
      </div>
    </CollapsibleCard>
  );
}
