function redirectHome(req, res) {
  res.redirect("/");
}
function removeUndefinedAttrs(obj) {
  for (let key of Object.keys(obj)) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}

module.exports = { redirectHome, removeUndefinedAttrs };
