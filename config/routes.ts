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
    name: 'home',
    icon: 'home',
    component: './Home',
  },
  {
    path: '/articleAdmin',
    name: 'article-admin',
    icon: 'profile',
    access: 'canAdmin',
    routes: [
      {
        path: '/articleAdmin/article',
        name: 'article',
        component: './ArticleAdmin',
      },
      {
        path: '/articleAdmin/draft',
        name: 'draft',
        component: './DraftAdmin',
      }
    ],
  },
  {
    path: '/category',
    name: 'category-admin',
    icon: 'bars',
    component: './CategoryAdmin',
  },
  {
    path: '/tag',
    name: 'tag-admin',
    icon: 'tag',
    component: './TagAdmin',
  },
  {
    path: '/useradmin',
    name: 'user-admin',
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
