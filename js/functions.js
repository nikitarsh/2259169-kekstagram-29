// Функция для проверки длины строки.
function checkStringLength (string, maxlength) {
  return string.length <= maxlength;
}
// console.log(checkStringLength('Проверка длинны строки', 30));
// Функция для проверки, является ли строка палиндромом.
function isPalindrome(str) {
  str = str.replaceAll(' ', '').toUpperCase();
  return str === [...str].reverse().join('');
}
// console.log(isPalindrome('Лёша на полке клопа нашёл'));
