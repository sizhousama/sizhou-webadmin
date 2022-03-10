import React ,{useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tag, Space, Popconfirm, message, Image } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { articleList, articleDelete } from '@/services/article'

import Create from './components/create'

const ArticleAdmin: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const createRef = useRef();

  const columns: ProColumns<any>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      width: '200px'
    },
    {
      title: '封面',
      dataIndex: 'cover',
      render: (_, row) => (
        <Image key={row.id} src={row.cover} style={{ width: '200px' }} />
      ),
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
      )
    },
    {
      title: '创建时间',
      key: 'since',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: '100px',
      render: (text, record) => [
        <EditOutlined
          key="editable"
          onClick={() => {
            (createRef.current as any).open('edit', record.id)
          }}
        />,
        <Popconfirm
          key="delete"
          title="是否确定删除？"
          onConfirm={async ()=> {
            await articleDelete({ id: record.id })
            message.success('删除成功！')
            actionRef.current?.reload()
          }}
          okText="是"
          cancelText="否"
        >
          <DeleteOutlined />
        </Popconfirm>
      ]
    }
  ];

  return (
    <PageContainer breadcrumb={undefined}>
    <ProTable<any>
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
    />
      <Create
        cRef={createRef}
        reload={() => {
          actionRef.current?.reload()
        }}
      />
    </PageContainer>
  );
};

export default ArticleAdmin;
