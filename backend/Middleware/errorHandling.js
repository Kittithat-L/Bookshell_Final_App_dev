const errorHandling = (err, req, res, next) => {
    console.log('Error Stack: ',err.Stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'Development' ? err.message : 'Something went wrong'
    });
};
module.exports = errorHandling;