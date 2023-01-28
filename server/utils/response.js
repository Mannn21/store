const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            details: data
        },
        message: message,
        metadata: {
            prev: "",
            next: ""
        }
    })
}

module.exports = response