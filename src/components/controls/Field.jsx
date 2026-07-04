// A small library of controlled input primitives. Every styling section
// in this app is built out of these five components plus a dot-path,
// so adding a new style property never means writing new markup logic —
// only a new <ColorField path="..." /> style line.

export function FieldWrapper({ label, children }) {
  return (
    <label className="block mb-3">
      {label && (
        <span className="block text-xs font-medium text-gray-500 mb-1">
          {label}
        </span>
      )}
      {children}
    </label>
  );
}

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <FieldWrapper label={label}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </FieldWrapper>
  );
}

export function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <FieldWrapper label={label}>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />
    </FieldWrapper>
  );
}

export function NumberField({ label, value, onChange, min = 0, max, step = 1, suffix }) {
  return (
    <FieldWrapper label={label}>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {suffix && <span className="text-xs text-gray-400">{suffix}</span>}
      </div>
    </FieldWrapper>
  );
}

export function ColorField({ label, value, onChange }) {
  return (
    <FieldWrapper label={label}>
      <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer border-none bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-sm focus:outline-none"
        />
      </div>
    </FieldWrapper>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <FieldWrapper label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export function ToggleField({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export function SegmentedField({ label, value, onChange, options }) {
  return (
    <FieldWrapper label={label}>
      <div className="flex rounded-md border border-gray-300 overflow-hidden">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-1.5 text-xs font-medium transition-colors ${
              value === opt.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FieldWrapper>
  );
}

export function FourSideField({ label, value, onChange, sides = ["top", "bottom", "left", "right"], suffix = "px" }) {
  return (
    <FieldWrapper label={label}>
      <div className="grid grid-cols-4 gap-2">
        {sides.map((side) => (
          <div key={side}>
            <span className="block text-[10px] uppercase text-gray-400 mb-0.5">
              {side.slice(0, 2)}
            </span>
            <input
              type="number"
              value={value[side]}
              onChange={(e) => onChange({ ...value, [side]: Number(e.target.value) })}
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>
    </FieldWrapper>
  );
}

export function CornerRadiusField({ label = "Corner Radius", value, onChange }) {
  return (
    <FourSideField
      label={label}
      value={{ top: value.tl, bottom: value.br, left: value.bl, right: value.tr }}
      onChange={(v) =>
        onChange({ tl: v.top, tr: v.right, bl: v.left, br: v.bottom })
      }
      sides={["top", "right", "bottom", "left"]}
    />
  );
}

export function FontStyleToggles({ label = "Font Style", value, onChange }) {
  const toggle = (key) => onChange({ ...value, [key]: !value[key] });
  const items = [
    { key: "bold", display: "B", className: "font-bold" },
    { key: "italic", display: "I", className: "italic" },
    { key: "underline", display: "U", className: "underline" },
  ];
  return (
    <FieldWrapper label={label}>
      <div className="flex gap-2">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => toggle(item.key)}
            className={`w-9 h-8 rounded-md border text-sm ${item.className} ${
              value[item.key]
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {item.display}
          </button>
        ))}
      </div>
    </FieldWrapper>
  );
}
