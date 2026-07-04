export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            active === tab.value
              ? "bg-white shadow-sm text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
