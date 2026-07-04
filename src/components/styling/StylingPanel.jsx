import CollapsibleCard from "../content/CollapsibleCard";
import { BoxStyleGroup, ButtonStyleGroup, TextStyleGroup } from "../controls/StyleGroups";
import AppearanceSection from "./AppearanceSection";
import CrossButtonSection from "./CrossButtonSection";
import OptionListSection from "./OptionListSection";
import ThankYouStyleSection from "./ThankYouStyleSection";

export default function StylingPanel() {
  return (
    <div>
      <AppearanceSection />

      <CollapsibleCard title="Question Title Styling">
        <TextStyleGroup basePath="styling.questionTitle" />
      </CollapsibleCard>

      <CollapsibleCard title="Subtitle Styling">
        <TextStyleGroup basePath="styling.subtitleStyle" />
      </CollapsibleCard>

      <OptionListSection />

      <CollapsibleCard title="Additional Comment Styling">
        <BoxStyleGroup basePath="styling.additionalComment" />
      </CollapsibleCard>

      <CollapsibleCard title="CTA Button Styling">
        <ButtonStyleGroup basePath="styling.ctaButton" />
      </CollapsibleCard>

      <CrossButtonSection />

      <ThankYouStyleSection />
    </div>
  );
}
