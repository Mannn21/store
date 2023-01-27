const response = (statusCode, data, message, res) => {
    res.json(statusCode, {
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