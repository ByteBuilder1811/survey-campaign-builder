// Small dependency-free id generator (avoids pulling in uuid for a single use case)
let counter = 0;

export function generateId(prefix = "id") {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}_${counter}`;
}
