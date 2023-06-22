// Функция для проверки длины строки.

function stringLenght (line, Maxlength ) {
  return line.length <= Maxlength;
}

console.log(stringLenght('Проверка длинны строки', 30));

// Функция для проверки, является ли строка палиндромом.

function palindrome(str) {
  str = str.replaceAll(' ', '').toUpperCase();
  return str === [...str].reverse().join('');
}

console.log( palindrome('Лёша на полке клопа нашёл') );
