/**
 * @description 可以被所有人访问的公共路由
 */
export const publicRoutes = ['/'];

/**
 * @description 用于登录认证的路由，登陆后会重定位
 */
export const authRoutes = ['/sign-in', '/sign-up'];

/**
 * @description prefix for api authentication routes
 */
export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/';
