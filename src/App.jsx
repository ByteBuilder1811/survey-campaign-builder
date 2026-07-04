import { useState } from "react";
import { SurveyProvider } from "./context/SurveyContext";
import Tabs from "./components/Tabs";
import ContentPanel from "./components/content/ContentPanel";
import StylingPanel from "./components/styling/StylingPanel";
import MobilePreview from "./components/preview/MobilePreview";

const TABS = [
  { value: "content", label: "Content" },
  { value: "styling", label: "Styling" },
];

function BuilderShell() {
  const [tab, setTab] = useState("content");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Survey Campaign Builder</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Configure your survey and watch the mobile preview update instantly.
        </p>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[420px] border-r border-gray-200 bg-white overflow-y-auto builder-scroll p-5">
          <Tabs tabs={TABS} active={tab} onChange={setTab} />
          {tab === "content" ? <ContentPanel /> : <StylingPanel />}
        </div>

        <div className="flex-1 bg-gray-50">
          <MobilePreview />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SurveyProvider>
      <BuilderShell />
    </SurveyProvider>
  );
}
