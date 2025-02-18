/**
 * Converts English numbers to Persian numbers
 * @param value - The number or string containing numbers to convert
 * @returns The string with Persian numbers
 */
export const toPersianNumbers = (value: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value
    .toString()
    .replace(/\d/g, (digit: string) => persianDigits[parseInt(digit)]);
};

/**
 * Formats a number with Persian digits and optional thousand separators
 * @param value - The number to format
 * @param useThousandSeparator - Whether to add thousand separators
 * @returns Formatted Persian number string
 */
export const formatPersianNumber = (
  value: number | string,
  useThousandSeparator = true
): string => {
  const numberString = value.toString();

  // First convert to Persian digits
  let result = toPersianNumbers(numberString);

  // Add thousand separators if requested
  if (useThousandSeparator) {
    result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return result;
};
