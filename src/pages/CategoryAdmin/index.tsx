import React ,{useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { categoryList, categoryDelete } from '@/services/category'
import { Button, message, Popconfirm } from 'antd';

import Create from './components/create'

const CategoryAdmin: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();
  const createRef = useRef();

  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      search: false
    },
    {
      title: '标签数量',
      render:(_,row:any)=>{
        return row.tags.length
      }
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
            await categoryDelete({ id: record.id })
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
        categoryList({page:params.current,size:params.pageSize,status: 1}).then(res=>{ 
          return res
        })
      }
      rowKey="id"
      search={false}
      dateFormatter="string"
      headerTitle="类别列表"
      toolBarRender={() => [
        <Button
          type="primary"
          onClick={() => {
            (createRef.current as any).open('create')
          }}
        >新增</Button>
      ]}
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

export default CategoryAdmin;
