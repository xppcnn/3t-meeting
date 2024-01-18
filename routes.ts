/**
 * 公共路由不需要授权
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 *用于身份验证的路由数组
 *这些路由会将登录用户重定向到/user-center
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * API认证路由前缀
 *以此前缀开头的路由用于 API 身份验证目的
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * 登录后默认重定向路径
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/user-center";
