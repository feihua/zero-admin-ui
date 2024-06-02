import React, {useState} from 'react';
import {Modal} from 'antd';
import AddUserList from "@/pages/system/role/components/AddUser";
import {CancelAuthorizationParams} from "@/pages/system/role/components/SetUser/data";

export interface SetRoleModalProps {
  onCancel: () => void;
  onSubmit: (value: CancelAuthorizationParams) => void;
  setUserModalVisible: boolean;
  roleId: number;
}

// 设置用户弹框
const AddUserModal: React.FC<SetRoleModalProps> = (props) => {

  const {setUserModalVisible, onCancel} = props;

  const [userRoleList, setUserRoleList] = useState<{ roleId: number, userIds: number[] }>({userIds: [], roleId: 0});

  const handleSubmit = () => {
    props.onSubmit({userIds: userRoleList.userIds, roleId: userRoleList.roleId, isExist: 1})
  };
  const modalFooter = {okText: '批量授权', onOk: handleSubmit, onCancel};
  return (
    <Modal
      width={1000}
      forceRender
      destroyOnClose
      title={"选择要授权的用户"}
      open={setUserModalVisible}
      {...modalFooter}
    >

      {setUserModalVisible &&
        <AddUserList
          roleId={props.roleId}
          setUserModalVisible={setUserModalVisible}
          onSubmit={async (userIds: number[], roleId: number) => {
            setUserRoleList({userIds, roleId})
          }}
        >
        </AddUserList>}
    </Modal>
  );
};

export default AddUserModal;
