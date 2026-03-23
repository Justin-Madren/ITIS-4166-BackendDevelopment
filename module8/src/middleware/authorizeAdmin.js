export function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'ADMIN') {
    const error = new Error('Insufficient permissions');
    error.status = 403;
    return next(error);
  }
  next();
}
