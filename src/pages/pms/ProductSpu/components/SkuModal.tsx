import React from 'react';
import { Modal } from 'antd';
import ProductSkuList from '@/pages/pms/ProductSku';

export interface UpdateFormProps {
  onCancel: () => void;
  modalVisible: boolean;
  spuId: number;
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
      {modalVisible && <ProductSkuList spuId={props.spuId}></ProductSkuList>}
    </Modal>
  );
};

export default AttributeModal;
