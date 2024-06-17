import React from 'react';
import {Modal} from 'antd';
import SetProductList from "@/pages/sms/FlashPromotion/components/SetProductList/index";

export interface UpdateFormProps {
  onCancel: () => void;
  productModalVisible: boolean;
  flashPromotionId: number
}

const SessionProductModal: React.FC<UpdateFormProps> = (props) => {

  const {productModalVisible, onCancel} = props;


  return (
    <Modal
      width={1600}
      forceRender
      destroyOnClose
      // title={"配置时间段"}
      onCancel={onCancel}
      open={productModalVisible}
      footer={null}
    >

      {productModalVisible &&
        <SetProductList flashPromotionId={props.flashPromotionId} ></SetProductList>}
    </Modal>
  );
};

export default SessionProductModal;
