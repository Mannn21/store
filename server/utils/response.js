const response = (statusCode, data, message, next, prev, res) => {
    res.status(statusCode).json({
        payload: {
            details: data
        },
        message: message,
        metadata: {
            prev: prev,
            next: next
        }
    })
}

module.exports = response