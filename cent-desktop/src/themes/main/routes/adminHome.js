async function adminHome(req, res, next) {
  try {
    debug('admin');
    const modules = req.app.get('MODULES');
    debug('modules', modules.length);
    res.render('admin-index', { layout: 'layout-admin' });
  } catch (err) {
    res.send(err);
  }
}

export default adminHome;
