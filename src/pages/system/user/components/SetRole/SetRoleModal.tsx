import React from 'react';
import {Modal} from 'antd';
import {DictTypeListItem} from '../../data';
import DictItemLIst from "@/pages/system/dict/components/DictItem/DictItemLIst";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: DictTypeListItem) => void;
  dictItemModalVisible: boolean;
  currentData: Partial<DictTypeListItem>;
}

const SetRoleModal: React.FC<UpdateFormProps> = (props) => {

  const {dictItemModalVisible, onCancel} = props;


  return (
    <Modal
      width={1600}
      forceRender
      destroyOnClose
      title={"配置字典项 - " + props.currentData.dictName}
      onCancel={onCancel}
      open={dictItemModalVisible}
      footer={null}
    >

      {dictItemModalVisible &&
        <DictItemLIst dictType={props.currentData.dictType} dictItemModalVisible={dictItemModalVisible}></DictItemLIst>}
    </Modal>
  );
};

export default SetRoleModal;
