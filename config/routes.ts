/*
 * @Author: sizhou
 * @Date: 2020-11-09 18:22:09
 * @LastEditors: sizhou
 * @LastEditTime: 2020-11-16 15:16:40
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/home',
    name: '首页',
    icon: 'home',
    component: './Home',
  },
  {
    path: '/articleAdmin',
    name: '文章管理',
    icon: 'profile',
    access: 'canAdmin',
    component: './ArticleAdmin'
  },
  {
    path: '/category',
    name: '类别管理',
    icon: 'bars',
    component: './CategoryAdmin',
  },
  {
    path: '/tag',
    name: '标签管理',
    icon: 'tag',
    component: './TagAdmin',
  },
  {
    path: '/useradmin',
    name: '用户管理',
    icon: 'user',
    component: './UserAdmin',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
