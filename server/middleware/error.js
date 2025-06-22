export const error_handler = (err, req, res, next) => {
    const status_code = res.statuCode === 200 ? 500 : res.statusCode;
    res.status(status_code);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};