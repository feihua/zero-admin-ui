import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Radio, Select } from 'antd';
import type { ProductSpecValueListItem} from '../data.d';
import { ProductSpecListItem } from '@/pages/pms/ProductSpec/data';
import { queryProductSpecList } from '@/pages/pms/ProductSpec/service';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductSpecValueListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();
  const [categoryListItems, setCategoryListItems] = useState<ProductSpecListItem[]>([]);
  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

  useEffect(() => {
    if (form && !addVisible) {
      form.resetFields();
    }else {
      queryProductSpecList({pageSize: 100, current: 1}).then((res) => {
        setCategoryListItems(res.data)
      });
    }
  }, [props.addVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: ProductSpecValueListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="specId"
          label="规格ID"
          rules={[{required: true, message: '请输入规格ID!'}]}
        >
          <Select id="groupId" placeholder={'请输入规格'}>
            {categoryListItems.map(r => <Select.Option value={r.id}>{r.name}</Select.Option>)}
          </Select>
         </FormItem>
        <FormItem
          name="value"
          label="规格值"
          rules={[{required: true, message: '请输入规格值!'}]}
        >
            <Input id="create-value" placeholder={'请输入规格值!'}/>
         </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          rules={[{required: true, message: '请输入状态!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
        </FormItem>

      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新增"
      open={addVisible}
      {...modalFooter}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AddModal;
