export function closestFraction(percentage) {
  const fractions = [
      "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", 
      "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", 
      "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", 
      "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", 
      "10/12", "11/12", "full"
  ];

  // Convert percentage to a decimal value
  const decimal = parseFloat(percentage) / 100;

  let closestFraction = "";
  let minDifference = Number.MAX_VALUE;

  for (const fraction of fractions) {
      const [numerator, denominator] = fraction.split('/').map(Number);
      const fractionValue = numerator / denominator;

      const difference = Math.abs(decimal - fractionValue);

      if (difference < minDifference) {
          minDifference = difference;
          closestFraction = fraction;
      }
  }

  return closestFraction;
}