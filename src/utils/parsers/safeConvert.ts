export default function safeConvertStoN(input: string): number {
  const result = Number(input);
  if (isNaN(result)) {
    throw new Error("Invalid number format");
  }
  return result;
}