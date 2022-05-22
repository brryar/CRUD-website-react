// generate random code for product_code
function codeGenerator(input) {
  let code = `${input[0].toUpperCase()}${input[input.length - 1].toUpperCase()}${Math.floor(Math.random() * 1000000)}`;
  return code;
}

module.exports = codeGenerator;
