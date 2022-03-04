import React ,{useState, useImperativeHandle} from 'react';
import { Modal } from 'antd';

const CreateUser: React.FC<{}> = ({cRef}:any) => {
    const [val, setVal] = useState();
    useImperativeHandle(cRef, () => ({
        // changeVal 就是暴露给父组件的方法
        changeVal: (newVal:any) => {
          setVal(newVal);
        }
    }));
    return (
      <Modal title="Basic Modal" visible={val}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  };
  
  export default CreateUser;
  