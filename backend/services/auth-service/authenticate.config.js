module.exports = {
  noLoginPaths: [
    [/^\/api\/docs.*/, /.*/],
    [/^\/api\/auth.*/, /.*/],
    [/^\/api\/user(\/)?$/, /(GET|POST)/],
  ],
};
