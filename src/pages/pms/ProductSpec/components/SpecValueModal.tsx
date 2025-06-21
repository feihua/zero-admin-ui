import React from 'react';
import {Modal} from 'antd';
import ProductSpecValuecList from '@/pages/pms/ProductSpecValue';

export interface UpdateFormProps {
  onCancel: () => void;
  modalVisible: boolean;
  specId: number;
}

const SpecValueModal: React.FC<UpdateFormProps> = (props) => {

  const {modalVisible, onCancel} = props;


  return (
    <Modal
      width={1600}
      forceRender
      destroyOnClose
      onCancel={onCancel}
      open={modalVisible}
      footer={null}
    >

      {modalVisible &&
        <ProductSpecValuecList specId={props.specId}></ProductSpecValuecList>}
    </Modal>
  );
};

export default SpecValueModal;
