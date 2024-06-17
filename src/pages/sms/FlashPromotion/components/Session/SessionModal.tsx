import React from 'react';
import {Modal} from 'antd';
import SessionList from "@/pages/sms/FlashPromotion/components/Session/SessionList";

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
        <SessionList sessionModalVisible={sessionModalVisible}></SessionList>}
    </Modal>
  );
};

export default SessionModal;
