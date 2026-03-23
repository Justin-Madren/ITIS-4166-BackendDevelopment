
export function authorizedRoles(...allowedRoles) {
    return function(req, res, next) {
        if(!allowedRoles.includes(req.user.role)) {
            const error = new Error('Forbidden: insufficient permissions');
            error.status = 403;
            return next(error);
        }
        return next();
    };
}