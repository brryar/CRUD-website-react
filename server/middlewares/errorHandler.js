function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";

  console.log(err.name);
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      msg = err.errors[0].message;
      code = 400;
      break;
    case "Not found":
      msg = "Data not found";
      code = 404;
      break;
  }

  res.status(code).json({ message: msg });
}

module.exports = errorHandler;
