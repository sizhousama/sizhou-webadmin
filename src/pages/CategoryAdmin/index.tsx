import React ,{useRef} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import {categoryList} from '@/services/category'
import styles from './index.less';
interface Draft {
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
const columns: ProColumns<Draft>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '名称',
    dataIndex: 'name',
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
    title: '状态',
    dataIndex: 'status',
    initialValue: 1,
    filters: true,
    valueEnum: {
      1: {
        text: '正常',
        status: 1,
      },
      2: {
        text: '已删除',
        status: 2,
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
const CategoryAdmin: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer breadcrumb={undefined}>
    <ProTable<Draft>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}) =>
      categoryList().then(res=>{ 
         return res
       })
      }
      rowKey="id"
      search={false}
      dateFormatter="string"
      headerTitle="类别列表"
    />
    </PageContainer>
  );
};

export default CategoryAdmin;
