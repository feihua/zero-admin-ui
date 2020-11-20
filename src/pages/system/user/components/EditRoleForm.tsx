import React from 'react';
import { Modal,Select } from 'antd';
import {FormValueType} from "@/pages/system/user/components/UpdateForm";
import {TableListItem} from "@/pages/system/user/data";

const { Option } = Select;

interface CreateFormProps {
  editModalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values: Partial<TableListItem>;
}

function onChange(value: any) {
  console.log(`selected ${value}`);
}

function onSearch(val: any) {
  console.log('search:', val);
}

const EditRoleForm: React.FC<CreateFormProps> = (props) => {
  const { editModalVisible, onCancel,onSubmit } = props;


  // @ts-ignore
  return (
    <Modal
      destroyOnClose
      title="分配用户角色"
      width={300}
      visible={editModalVisible}
      onCancel={() => onCancel()}
      onOk={() => onSubmit}

      // footer={null}
    >
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="请选择角色"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}

      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>,
    </Modal>
  );
};

export default EditRoleForm;
