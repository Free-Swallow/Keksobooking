
// Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomPositiveInteger = (valueA = 0, valueB = 25) => {
  const lower = Math.ceil(Math.min(Math.abs(valueA), Math.abs(valueB)));
  const upper = Math.floor(Math.max(Math.abs(valueA), Math.abs(valueB)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для проверки максимальной длины строки

const isCheckLength = (checkString, maxLength = 200) => checkString.length <= maxLength;

isCheckLength('251', getRandomPositiveInteger());
