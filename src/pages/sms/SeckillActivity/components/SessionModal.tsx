import React from 'react';
import {Modal} from 'antd';
import SeckillSessionList from '@/pages/sms/SeckillSession';

export interface UpdateFormProps {
  onCancel: () => void;
  sessionModalVisible: boolean;
}

const SessionModal: React.FC<UpdateFormProps> = (props) => {

  const {sessionModalVisible, onCancel} = props;


  return (
    <Modal
      width={1600}
      forceRender
      destroyOnClose
      // title={"配置时间段"}
      onCancel={onCancel}
      open={sessionModalVisible}
      footer={null}
    >

      {sessionModalVisible &&
        <SeckillSessionList></SeckillSessionList>}
    </Modal>
  );
};

export default SessionModal;
