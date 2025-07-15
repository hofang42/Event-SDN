module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  // Ensure the user object has the proper structure for API operations
  req.user = {
    _id: req.session.user._id,
    username: req.session.user.username,
    role: req.session.user.role,
  };
  next();
};
