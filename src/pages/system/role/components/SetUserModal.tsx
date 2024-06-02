import React  from 'react';
import { Modal} from 'antd';
import SetUserList from "@/pages/system/role/components/SetUser";

export interface SetRoleModalProps {
  onCancel: () => void;
  onSubmit: (value: { userId: number, roleIds: number[] }) => void;
  setUserModalVisible: boolean;
  roleId: number;
}

// 设置用户弹框
const SetUserModal: React.FC<SetRoleModalProps> = (props) => {

  const {setUserModalVisible, onCancel} = props;

  return (
    <Modal
      width={1000}
      forceRender
      destroyOnClose
      title={"设置用户 - " + props.roleId}
      open={setUserModalVisible}
      onCancel={onCancel}
      footer={null}
    >

      {setUserModalVisible &&
        <SetUserList
          roleId={props.roleId}
          setUserModalVisible={setUserModalVisible}
        >
        </SetUserList>}

    </Modal>
  );
};

export default SetUserModal;
