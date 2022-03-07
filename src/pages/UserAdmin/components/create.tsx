import React ,{useState, useImperativeHandle, useRef} from 'react';
import ProForm, { ProFormText, ProFormUploadButton  } from '@ant-design/pro-form';
import { Modal, message  } from 'antd';
import {userGet, userAdd, userUpdate} from '@/services/user'
import {baseUrl} from '@/utils/baseUrl'
import { getToken } from '@/utils/utils'


const CreateUser: React.FC<any> = (props:any) => {
  const formRef = useRef<any>();
  const [visible, setVisible] = useState<boolean>();
  const [type, setType] = useState<string>('create');
  const [id, setId] = useState<any>();
  const title = `${type === 'create' ? '新增' : '编辑'}用户`
  
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
          avatarList: [],
          avatar: '',
          username: '',
          email: '',
          password: ''
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
            const formData = JSON.parse(JSON.stringify(val))
            if(type === 'edit') delete formData.password
            if(formData.avatarList.length){
              if(formData.avatarList[0].url){
                formData.avatar = formData.avatarList[0].url
              }else{
                formData.avatar = formData.avatarList[0].response.data.url
              }
            }else{
              formData.avatar = ''
            }
            delete formData.avatarList
            const fun = type === 'create' ? userAdd(formData) : userUpdate({...formData, id});
            await fun;
            message.success('更新成功！')
            close()
            props.reload()
          })
        }}
        params={{}}
        request={async () => {
          if(type === 'edit'){
            const { data } = await userGet({id})
            const { avatar, username, email, password} = data
            return {avatar, avatarList: [{url:avatar}], username, email, password}
          }
          return {
            id: '',
            avatar: '',
            avatarList: [],
            username: '',
            email: '',
            password: ''
          }
        }}
      >
        <ProFormUploadButton
          name="avatarList"
          label="头像"
          max={1}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            headers: {token:getToken()}
          }}
          action={`${baseUrl()}/util/upload`}
        />
        <ProFormText width="md" name="username" label="用户名" placeholder="请输入用户名" />
        <ProFormText width="md" name="email" label="邮箱" placeholder="请输入邮箱" rules={[{required: true, message: '请输入邮箱'}]} />
        <ProFormText.Password width="md" name="password" label="密码" placeholder="请输入密码" rules={[{required: true, message: '请输入密码'}]} disabled={ type==='edit' } />
      </ProForm>
    </Modal>
  );
};
  
export default CreateUser;
