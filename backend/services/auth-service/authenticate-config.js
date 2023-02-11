export const noLoginPaths = [
  [/^\/api\/docs.*/, /.*/],
  [/^\/api\/user\/(google|facebook|login|logout).*/, /.*/],
  [/^\/api\/user(\/)?$/, /(GET|POST)/],
  [/^\/api\/meta.*/, /.*/],
];
export const requireAuthViaTokenPaths = [[/^\/api\/_service.*/, /.*/]];
export default {
  noLoginPaths,
  requireAuthViaTokenPaths,
};
