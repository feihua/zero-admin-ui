import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio,} from 'antd';
import type {DictItemListItem} from './data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: DictItemListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateDictItemForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: DictItemListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="dictLabel"
          label="字典标签"
          rules={[{required: true, message: '请输入字典类型名称!'}]}
        >
          <Input id="update-dictLabel" placeholder={'请输入字典标签'}/>
        </FormItem>
        <FormItem
          name="dictValue"
          label="字典键值"
          rules={[{required: true, message: '请输入字典键值'}]}
        >
          <Input id="update-dictValue" placeholder={'请输入字典键值'}/>
        </FormItem>
        <FormItem
          name="dictSort"
          label="字典排序"
          initialValue={0}
          rules={[{required: true}]}
        >
          <InputNumber style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="dictStatus"
          label="字典状态"
          initialValue={1}
          rules={[{required: true}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="isDefault"
          label="是否默认"
          initialValue={0}
          rules={[{required: true}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
        >
          <Input.TextArea rows={2} placeholder={'请输入备注'}/>
        </FormItem>

      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建字典"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateDictItemForm;
