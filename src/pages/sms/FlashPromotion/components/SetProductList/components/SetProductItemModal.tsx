import React, {useState} from 'react';
import {Modal} from 'antd';
import {
  ProductListItem
} from "@/pages/sms/FlashPromotion/components/SetProductList/components/SetProductListItem/data";
import SetProductListItem from "@/pages/sms/FlashPromotion/components/SetProductList/components/SetProductListItem";

export interface SetRoleModalProps {
  onCancel: () => void;
  onSubmit: (value: {
    flashPromotionSessionId?: number;
    flashPromotionId?: number, productList: ProductListItem[]
  }) => void;
  setRoleModalVisible: boolean;
}

// 设置角色弹框
const SetProductItemModal: React.FC<SetRoleModalProps> = (props) => {

  const {setRoleModalVisible, onCancel} = props;

  const [userRoleList, setUserRoleList] = useState<ProductListItem[]>([]);

  const handleSubmit = () => {
    props.onSubmit({productList: userRoleList})
  };
  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};
  return (
    <Modal
      width={1000}
      forceRender
      destroyOnClose
      // title={"设置用户角色 - " + props.userId}
      open={setRoleModalVisible}
      {...modalFooter}
    >

      {setRoleModalVisible &&
        <SetProductListItem
          setRoleModalVisible={setRoleModalVisible}
          onSubmit={async (items: ProductListItem[]) => {
            setUserRoleList(items)
          }}
        >
        </SetProductListItem>}
    </Modal>
  );
};

export default SetProductItemModal;
