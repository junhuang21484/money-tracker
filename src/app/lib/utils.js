export const formatCurrency = (amount) => {
  return (amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (dateStr, locale = 'en-US',) => {
  const date = new Date(dateStr);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function convertToTitleCase(str) {
  if (!str) {
    return ""
  }
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}
