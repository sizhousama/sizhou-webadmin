import React ,{useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { tagList, tagDelete } from '@/services/tag'

import Create from './components/create'

const TagAdmin: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();
  const createRef = useRef();

  const columns: ProColumns<any>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      search: false
    },
    {
      title: '类别',
      dataIndex: 'category',
      render: (_, row) => (
        row.category && <Space key={row.category.id}>{row.category.name}</Space>
      ),
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
            await tagDelete({ id: record.id })
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
      request={async (params = {status: 1}) =>
        tagList({page:params.current,size:params.pageSize,status: 1}).then(res=>{
          return res
        })
      }
      rowKey="id"
      search={false}
      dateFormatter="string"
      headerTitle="标签列表"
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

export default TagAdmin;
