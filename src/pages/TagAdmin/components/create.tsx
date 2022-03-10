import React ,{ useState, useImperativeHandle, useRef } from 'react';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Modal, message  } from 'antd';
import { tagGet, tagAdd, tagUpdate } from '@/services/tag'
import { categoryList } from '@/services/category'

const CreateTag: React.FC<any> = (props:any) => {
  const formRef = useRef<any>();
  const [visible, setVisible] = useState<boolean>();
  const [type, setType] = useState<string>('create');
  const [id, setId] = useState<any>();
  const title = `${type === 'create' ? '新增' : '编辑'}标签`
  
  const close = () => {
    setVisible(false)
  }
  useImperativeHandle(props.cRef, () => ({
    open: (t:string, uid?: any) => {
      setType(t)
      if(uid){
        setId(uid)
      }
      setVisible(true);
    }
  }));
  return (
    <Modal title={title} visible={visible} footer={null} onCancel={close} destroyOnClose >
      <ProForm<any>
        formRef={formRef}
        initialValues={{
          id: '',
          name: '',
          en_name: '',
          category_id: ''
        }}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none'
            }
          }
        }}
        onFinish={() => {
          return formRef.current?.validateFields?.().then(async (val: any) => {
            const fun = type === 'create' ? tagAdd(val) : tagUpdate({...val, id});
            await fun;
            message.success(`${type === 'create' ? '新增' : '编辑'}成功！`)
            close()
            props.reload()
          })
        }}
        params={{}}
        request={async () => {
          if(type === 'edit'){
            const { data } = await tagGet({id})
            const { name, en_name, category_id } = data
            return { name, en_name, category_id }
          }
          return {
            id: '',
            name: '',
            en_name: '',
            category_id: ''
          }
        }}
      >
        <ProFormText width="md" name="name" label="名称" placeholder="请输入标签名称" rules={[{required: true, message: '请输入标签名称'}]} />
        <ProFormText width="md" name="en_name" label="英文名" placeholder="请输入标签英文名" />
        <ProFormSelect
          name="category_id"
          label="所属类别"
          showSearch
          debounceTime={300}
          request={async ({ keyWords }) => {
            const { data } = await categoryList({ name: keyWords });
            return data.map((item:any)=>{
              return { label: item.name, value: item.id }
            })
          }}
          placeholder="请选择所属类别"
          rules={[{ required: true, message: '请选择所属类别' }]}
        />
      </ProForm>
    </Modal>
  );
};
  
export default CreateTag;
