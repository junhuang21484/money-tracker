export const formatCurrency = (amount) => {
    return (amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  export function convertToTitleCase(str) {
    if (!str) {
        return ""
    }
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }