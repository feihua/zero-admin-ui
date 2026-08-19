import React from 'react';
import {Modal} from 'antd';
import ResourceMenuList from "@/pages/system/Resource";

export interface UpdateFormProps {
  onCancel: () => void;
  open: boolean;
}

const ResourceModal: React.FC<UpdateFormProps> = (props) => {

  const {open, onCancel} = props;


  return (
    <Modal
      width={1600}
      forceRender
      destroyOnClose
      title={"配置权限"}
      onCancel={onCancel}
      open={open}
      footer={null}
    >

      {open &&
        <ResourceMenuList />}
    </Modal>
  );
};

export default ResourceModal;
