const errorHandling = (err, req, res, next) => {
    console.error('Error Stack:', err.stack); // log error stack
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err.message || 'Unknown error'
    });
};

module.exports = errorHandling;