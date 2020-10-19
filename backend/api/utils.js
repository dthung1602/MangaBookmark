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

// TODO move this to user schema
function removePassword(user) {
  if (user) {
    user = JSON.parse(JSON.stringify(user));
    user.password = !!user.password;
  }
  return user;
}

module.exports = { redirectHome, removeUndefinedAttrs, removePassword };
