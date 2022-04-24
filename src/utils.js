/** Will return a integer between 0 and 37 */
export const getRandomNumber = () => Math.floor(Math.random() * 37);

/** Will return a string based on an array */
export const getArrayString = (array) => {
  const length = array.length;

  switch (length) {
    case 0:
      return '[]';
    case 1:
      return `[${array[0]}]`;
    case 2:
      return `[${array[0]}, ${array[1]}]`;
    case 3:
      return `[${array[0]}, ${array[1]}, ${array[2]}]`;
    case 4:
      return `[${array[0]}, ${array[1]}, ${array[2]}, ${array[3]}]`;
    default:
      return `[${array[0]}, ${array[1]} ... ${array[length - 2]}, ${array[length - 1]}]`;
  }
};
