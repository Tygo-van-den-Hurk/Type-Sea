const representString = function representString(value: string): string {
  const json = JSON.stringify(value);
  const maxDisplayableLength = 20;
  if (json.length < maxDisplayableLength) return json;
  const halfwayStart = 10;
  const halfwayEnd = -10;
  const start = json.slice(0, halfwayStart).trim();
  const end = json.slice(halfwayEnd).trim();
  return `${start}...${end}`;
};

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/no-unsafe-function-type
const representFunction = function representFunction(value: Function): string {
  if (!value.toString().startsWith('class')) return 'function';
  if ('name' in value && typeof value.name === 'string' && value.name !== '') return value.name;
  return 'Class';
};

/** Represents any value as a string. Useful for peaking inside of object without being flooded with text. */
export const represent = function represent(value: unknown): string {
  if (value === null) return 'null';
  if (value === void 0) return ''; // eslint-disable-line no-void
  if (Array.isArray(value)) return `[${value.map(represent).join(', ')}]`;

  switch (typeof value) {
    case 'string':
      return representString(value);
    case 'number':
    case 'boolean':
    case 'bigint':
      return value.toString();
    case 'function':
      return representFunction(value);
    case 'object':
      return `{ ${Object.keys(value).join(', ')} }`;
    case 'symbol':
    case 'undefined':
    default:
      return typeof value;
  }
};
