import React ,{ useState, useImperativeHandle, useRef } from 'react';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Modal, message  } from 'antd';
import { articleGet, articleUpdate } from '@/services/article'
import { tagList } from '@/services/tag'
import { categoryList } from '@/services/category'

const CreateActicle: React.FC<any> = (props:any) => {
  const formRef = useRef<any>();
  const [visible, setVisible] = useState<boolean>();
  const [type, setType] = useState<string>('create');
  const [id, setId] = useState<any>();
  const title = `${type === 'create' ? '新增' : '编辑'}文章`
  
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
          title: '',
          cover: '',
          view: '',
          favorite: '',
          tag_id: '',
          category_id: '',
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
            await articleUpdate({...val, id});
            message.success('编辑成功！')
            close()
            props.reload()
          })
        }}
        params={{}}
        request={async () => {
          if(type === 'edit'){
            const { data } = await articleGet({id})
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { title, cover, view, favorite, tag_id, category_id } = data
            return { title, cover, view, favorite, tag_id, category_id }
          }
          return {
            id: '',
            title: '',
            cover: '',
            view: '',
            favorite: '',
            tag_id: '',
            category_id: '',
          }
        }}
      >
        <ProFormText width="md" name="title" label="标题" placeholder="请输入文章标题" rules={[{required: true, message: '请输入文章标题'}]} />
        <ProFormDigit width="md" name="view" label="曝光数" placeholder="请输入类曝光数" />
        <ProFormDigit width="md" name="favorite" label="点赞数" placeholder="请输入点赞数" />
        <ProFormSelect
          name="category_id"
          label="类别"
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
        <ProFormSelect
          name="tag_id"
          label="标签"
          showSearch
          debounceTime={300}
          request={async ({ keyWords }) => {
            const { data } = await tagList({ name: keyWords });
            return data.map((item:any)=>{
              return { label: item.name, value: item.id }
            })
          }}
          placeholder="请选择标签"
          rules={[{ required: true, message: '请选择标签' }]}
        />
      </ProForm>
    </Modal>
  );
};
  
export default CreateActicle;
