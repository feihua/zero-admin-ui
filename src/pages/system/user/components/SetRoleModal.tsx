import React, {useState} from 'react';
import {Modal} from 'antd';
import SetRoleList from "@/pages/system/user/components/SetRole";

export interface SetRoleModalProps {
  onCancel: () => void;
  onSubmit: (value: { userId: number, roleIds: number[] }) => void;
  setRoleModalVisible: boolean;
  userId: number;
}

// 设置角色弹框
const SetRoleModal: React.FC<SetRoleModalProps> = (props) => {

  const {setRoleModalVisible, onCancel} = props;

  const [userRoleList, setUserRoleList] = useState<{ userId: number, roleIds: number[] }>({roleIds: [], userId: 0});

  const handleSubmit = () => {
    props.onSubmit({userId: userRoleList.userId, roleIds: userRoleList.roleIds})
  };
  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};
  return (
    <Modal
      width={1000}
      forceRender
      destroyOnClose
      title={"设置用户角色 - " + props.userId}
      open={setRoleModalVisible}
      {...modalFooter}
    >

      {setRoleModalVisible &&
        <SetRoleList
          userId={props.userId}
          setRoleModalVisible={setRoleModalVisible}
          onSubmit={async (userId: number, roleIds: number[]) => {
            setUserRoleList({userId, roleIds})
          }}
        >
        </SetRoleList>}
    </Modal>
  );
};

export default SetRoleModal;
