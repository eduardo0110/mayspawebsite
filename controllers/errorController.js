const httpStatus = require('http-status-codes')

exports.pageNotFoundError = (req , res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;

    res.status(errorCode)
    res.render("error");

}

exports.internalServerError = (req , res) => {
    let errorCode = httpStatus.internalServerError;

    res.status(errorCode)
    res.render(`${errorCode} | sorry our application is taking a nap`);
};