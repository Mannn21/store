const response = (statusCode, data, message, toNext, prev, res) => {
    res.json({
        status: statusCode,
        payload: {
            details: data
        },
        message: message,
        metadata: {
            prev: prev,
            next: toNext
        }
    })
}

module.exports = response