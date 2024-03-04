export const formatCurrency = (amount) => {
    return (amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

export function findFieldGivenArrObj(arrayObj, fieldName, field, returnField) {
  for (let i = 0; i < arrayObj.length; i++) {
      if (arrayObj[i][fieldName] === field) {
          return arrayObj[i][returnField];
      }
  }
  return null; 
}
