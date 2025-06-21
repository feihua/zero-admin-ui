import React from 'react';
import { Modal } from 'antd';
import AttributeList from '@/pages/pms/ProductAttribute';

export interface UpdateFormProps {
  onCancel: () => void;
  modalVisible: boolean;
  groupId: number;
}

const AttributeModal: React.FC<UpdateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      width={1600}
      forceRender
      destroyOnClose
      onCancel={onCancel}
      open={modalVisible}
      footer={null}
    >
      {modalVisible && <AttributeList groupId={props.groupId}></AttributeList>}
    </Modal>
  );
};

export default AttributeModal;
