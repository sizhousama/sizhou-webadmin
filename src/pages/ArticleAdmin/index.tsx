import React ,{useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import {articleList} from '@/services/article'
import styles from './index.less';
interface Article {
  cover: string;
  id: number;
  createdAt: string;
  title: string;
  category: {
    name: string;
    id: number;
  };
  tag: {
    name: string;
    id: number;
  };
  status: number;
}
const columns: ProColumns<Article>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '25%',
    search: false,
  },
  {
    title: '类别',
    dataIndex: 'category',
    render: (_, row) => (
      <Space key={row.category.id}>{row.category.name}</Space>
    ),
  },
  {
    title: '标签',
    dataIndex: 'tag',
    render: (_, row) => (
      <Tag key={row.tag.name}>
        {row.tag.name}
      </Tag>
    ),
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 1,
    filters: true,
    valueEnum: {
      1: {
        text: '已发布',
        status: 1,
      },
      2: {
        text: '已删除',
        status: 2,
      },
      3: {
        text: '待审核',
        status: 3,
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, row) => (
      <Space key={row.id}>
        <EditOutlined />
        <DeleteOutlined />
      </Space>
    )
  },
];
const ArticleAdmin: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer breadcrumb={undefined}>
    <ProTable<Article>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}) =>
       articleList({page:params.current,size:params.pageSize,orderType:'createdAt'}).then(res=>{
         const result = {
           data:res.data.articles,
           total:res.data.total,
           pageSize:res.data.size,
           current:res.data.page
         } 
         return result
       })
      }
      rowKey="id"
      search={false}
      dateFormatter="string"
      headerTitle="文章列表"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>
      ]}
    />
    </PageContainer>
  );
};

export default ArticleAdmin;
