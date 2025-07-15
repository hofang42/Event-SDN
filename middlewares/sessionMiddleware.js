module.exports = (req, res, next) => {
  // Make user available to all views
  res.locals.user = req.session.user || null;
  next();
};
