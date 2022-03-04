import React ,{useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { userList, userUpdate} from '@/services/user'
import Upload from '@/components/SingleUpload'
import './index.less';

interface User {
  username: string;
  id: number;
  avatar:string;
  createdAt: string;
  status: number;
}
const columns: ProColumns<User>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 80,
  },
  {
    title: 'Id',
    dataIndex: 'id',
    width: 80,
    editable: false
  },
  {
    title: '头像',
    // eslint-disable-next-line no-param-reassign
    renderFormItem: ({entry}:any) => <Upload url={entry.avatar} setAva={(ava:any) => {entry.avatar = ava}} />,
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
    search: false,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
    // formItemProps: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '此项为必填项',
    //     },
    //   ]
    // },
    width: '150px',
    search: false
  },
  {
    title: '密码',
    dataIndex: 'password',
    ellipsis: true,
    valueType: 'password',
    // formItemProps: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '此项为必填项',
    //     },
    //   ]
    // },
    width: '300px'
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    editable: false
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   filters: true,
  //   valueEnum: {
  //     1: {
  //       text: '正常',
  //       status: 1,
  //     },
  //     2: {
  //       text: '已删除',
  //       status: 2,
  //     },
  //   },
  // },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
        <EditOutlined
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        />,
        <DeleteOutlined key="del" />
    ]
  },
];
const UserAdmin: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer breadcrumb={undefined}>
    <ProTable<User>
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
      editable={{
        type: 'single',
        onSave: async (key, row, originRow, newLine): Promise<any> => {
          if(newLine){
            console.log(1)
          }else{
            await userUpdate(row)
          }
        }
      }}
      dateFormatter="string"
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button
        type="primary"
        onClick={() => {
          actionRef.current?.addEditRecord?.({
            id: (Math.random() * 1000000).toFixed(0),
            username: '',
            email: '',
            password: '',
            status: ''
          });
        }}>新增</Button>
      ]}
    />
    </PageContainer>
  );
};

export default UserAdmin;
