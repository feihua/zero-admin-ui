import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio,} from 'antd';
import type {DictTypeListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: DictTypeListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<CreateFormProps> = (props) => {
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

  const handleFinish = (values: DictTypeListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="dictName"
          label="字典名称"
          rules={[{required: true, message: '请输入字典类型名称!'}]}
        >
          <Input id="create-jobName" placeholder={'请输入字典类型名称'}/>
        </FormItem>
        <FormItem
          name="dictType"
          label="字典类型"
          rules={[{required: true, message: '请输入字典类型名称!'}]}
        >
          <Input id="create-jobName" placeholder={'请输入字典类型名称'}/>
        </FormItem>
        <FormItem
          name="status"
          label="字典状态"
          initialValue={1}
          rules={[{required: true, message: '请选择状态!'}]}
        >
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
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

export default AddModal;
