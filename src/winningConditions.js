function isNumberRed(number) {
  return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number);
}

function isNumberBlack(number) {
  return number > 0 && number < 37 && isNumberRed(number) == false;
}

function isNumberEven(number) {
  if (number === 0) return false;
  return number % 2 == 0;
}

function isNumberOdd(number) {
  if (number === 0) return false;
  return !isNumberEven(number);
}

function isNumberLow(number) {
  return number >= 1 && number <= 18;
}

function isNumberHight(number) {
  return number >= 19 && number <= 36;
}

export const winningConditions = {
  onRed: isNumberRed,
  onBlack: isNumberBlack,
  onEven: isNumberEven,
  onOdd: isNumberOdd,
  onLow: isNumberLow,
  onHight: isNumberHight,
};
