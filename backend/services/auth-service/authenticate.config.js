module.exports = {
  noLoginPaths: [
    [/^\/api\/docs.*/, /.*/],
    [/^\/api\/user\/(google|facebook|login|logout).*/, /.*/],
    [/^\/api\/user(\/)?$/, /(GET|POST)/],
    [/^\/api\/meta.*/, /.*/],
  ],
  basicAuthPaths: [[/^\/api\/_service.*/, /.*/]],
};
