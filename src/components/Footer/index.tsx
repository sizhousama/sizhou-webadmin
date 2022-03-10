import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2022 sizhou技术网官方出品"
    links={[
      {
        key: 'sizhou-web',
        title: 'sizhou-web',
        href: 'https://www.sizhouweb.cn',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/sizhousama',
        blankTarget: true,
      }
    ]}
  />
);
