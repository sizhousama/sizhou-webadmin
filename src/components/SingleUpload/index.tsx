import React ,{ useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {baseUrl} from '@/utils/baseUrl'
import { getToken } from '@/utils/utils'

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const SingleUpload: React.FC<any> = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState(props.url || '')


  const handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
        props.setAva(info.file.response.data.url)
        setImgUrl(info.file.response.data.url)
        setLoading(false)
    }
   }

    const uploadButton = (
      <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${baseUrl()}/util/upload`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{token:getToken()}}
      >
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )
}

export default SingleUpload;