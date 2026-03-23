import rateLimit from 'express-rate-limit';

export const longinLimiter = rateLimit({
    windowMs: 1*60*1000, // 1 minute
    limit: 3, // limit each IP to 3 requests per windowMs
    handler: function(req, res) {
        const error = new Error('Too many requests, please try again later.');
        error.status = 429;
        next(error);
    },
})