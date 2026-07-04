import { useSurvey } from "../../context/SurveyContext";
import { NumberField } from "../controls/Field";
import CollapsibleCard from "./CollapsibleCard";

export default function IntroductionSection() {
  const { state, dispatch } = useSurvey();

  return (
    <CollapsibleCard title="Introduction Page" defaultOpen>
      <p className="text-xs text-gray-500 mb-3">
        Set how many questions this survey campaign has. Question sections below
        update automatically.
      </p>
      <NumberField
        label="Number of Survey Pages"
        value={state.content.numPages}
        min={1}
        onChange={(count) => dispatch({ type: "SET_NUM_PAGES", count })}
      />
    </CollapsibleCard>
  );
}
