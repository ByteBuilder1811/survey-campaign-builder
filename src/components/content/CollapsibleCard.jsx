import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CollapsibleCard({ title, defaultOpen = false, badge, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-gray-200 bg-white mb-3 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          {badge && (
            <span className="text-[11px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-4 pb-4 border-t border-gray-100 pt-3">{children}</div>}
    </div>
  );
}
