import React ,{useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Popconfirm, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { userList, userDelete} from '@/services/user'

import Create from './components/create'
import './index.less';

const UserAdmin: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();
  const createRef = useRef();

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 80,
    },
    {
      title: 'Id',
      dataIndex: 'id',
      width: 80
    },
    {
      title: '头像',
      render: (_,row)=>{
        return <Avatar key={row.id} size={40} src={row.avatar} />
      },
      width: '100px',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      ellipsis: true,
      width: '100px',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
      ellipsis: true,
      width: '150px'
    },
    {
      title: '密码',
      dataIndex: 'password',
      ellipsis: true,
      width: '300px'
    },
    {
      title: '创建时间',
      key: 'since',
      dataIndex: 'createdAt',
      valueType: 'dateTime'
    },
    {
      title: '操作',
      valueType: 'option',
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
            await userDelete({ id: record.id })
            message.success('删除成功！')
            actionRef.current?.reload()
          }}
          okText="是"
          cancelText="否"
        >
          <DeleteOutlined />
        </Popconfirm>
      ]
    },
  ];

  return (
    <PageContainer breadcrumb={undefined}>
    <ProTable<any>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}) =>
        userList({page:params.current,size:params.pageSize,orderType:'createdAt',status: 1}).then(res=>{
          const result = {
            data:res.data.list,
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
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button
        type="primary"
        onClick={() => {
          (createRef.current as any).open('create')
        }}>新增</Button>
      ]}
    />
      <Create cRef={createRef} reload={() => {
        actionRef.current?.reload()
      }} />
    </PageContainer>
  );
};

export default UserAdmin;
