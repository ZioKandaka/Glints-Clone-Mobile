function dotSeparator(salary) {
  salary = salary.toString();
  var formattedNumber = "";
  for (var i = salary.length - 1; i >= 0; i--) {
    formattedNumber = salary.charAt(i) + formattedNumber;
    if ((salary.length - i) % 3 === 0 && i !== 0) {
      formattedNumber = "." + formattedNumber;
    }
  }
  return formattedNumber;
}

module.exports = dotSeparator;
