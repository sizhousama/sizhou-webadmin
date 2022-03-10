import React ,{ useState, useImperativeHandle, useRef } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Modal, message  } from 'antd';
import { categoryGet, categoryAdd, categoryUpdate } from '@/services/category'

const CreateCategory: React.FC<any> = (props:any) => {
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
          en_name: ''
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
            const fun = type === 'create' ? categoryAdd(val) : categoryUpdate({...val, id});
            await fun;
            message.success(`${type === 'create' ? '新增' : '编辑'}成功！`)
            close()
            props.reload()
          })
        }}
        params={{}}
        request={async () => {
          if(type === 'edit'){
            const { data } = await categoryGet({id})
            const { name, en_name } = data
            return { name, en_name }
          }
          return {
            id: '',
            name: '',
            en_name: ''
          }
        }}
      >
        <ProFormText width="md" name="name" label="名称" placeholder="请输入类别名称" rules={[{required: true, message: '请输入类别名称'}]} />
        <ProFormText width="md" name="en_name" label="英文名" placeholder="请输入类别英文名" />
      </ProForm>
    </Modal>
  );
};
  
export default CreateCategory;
