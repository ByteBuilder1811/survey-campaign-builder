// Tiny immutable helpers for reading/writing deeply nested state
// by a dot-delimited path, e.g. "styling.ctaButton.margin.top".
// This keeps every style control generic instead of writing a
// bespoke setter for each of the ~120 style fields in the spec.

export function getPath(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function setPath(obj, path, value) {
  const keys = path.split(".");
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let cursor = clone;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    if (isLast) {
      cursor[key] = value;
    } else {
      const next = cursor[key];
      const nextClone = Array.isArray(next) ? [...next] : { ...next };
      cursor[key] = nextClone;
      cursor = nextClone;
    }
  });

  return clone;
}
