module.exports = {
  checkLogin(req, res, next) {
    if (!req.session.user) {
      return res.json({
         error: '未登录'
      });
    }
    next();
  },

  checkNotLogin(req, res, next) {
    if (req.session.user) {
      return res.json({
        error: '已登录',
        session: req.session
      });
    }
    next();
  }
};