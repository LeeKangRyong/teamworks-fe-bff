export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    console.error('Error:', {
        message: error.message,
        status: error.status,
        stack: error.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    if (error.status === 500 || !error.status) {
        return res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === 'production' 
                ? 'Internal server error' 
                : error.message,
            code: 'INTERNAL_ERROR'
        });
    }

    return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'An error occurred'
    });
};