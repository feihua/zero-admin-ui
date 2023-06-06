import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import type {DictListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: DictListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateDictForm: React.FC<CreateFormProps> = (props) => {
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

  const handleFinish = (values: DictListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="value" label="数据值" rules={[{required: true, message: '请输入数据值'}]}>
          <Input id="update-value" placeholder={'请输入数据值'}/>
        </FormItem>
        <FormItem name="label" label="标签名" rules={[{required: true, message: '请输入标签名'}]}>
          <Input id="update-label" placeholder={'请输入标签名'}/>
        </FormItem>
        <FormItem name="type" label="类型" rules={[{required: true, message: '请输入标签名'}]}>
          <Input id="update-type" placeholder={'请输入类型'}/>
        </FormItem>
        <FormItem name="sort" label="排序" initialValue={0} rules={[{required: true, message: '请输入排序'}]}>
          <InputNumber placeholder={'请输入排序'} style={{width: 255}}/>
        </FormItem>
        <FormItem name="delFlag" label="状态" rules={[{required: true, message: '请求选择状态'}]}>
          <Select id="delFlag" placeholder={'请选择状态'}>
            <Select.Option value={1}>禁用</Select.Option>
            <Select.Option value={0}>启用</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="description" label="描述">
          <Input.TextArea id="update-description" placeholder={'请输入描述'} rows={2}/>
        </FormItem>
        <FormItem name="remarks" label="备注">
          <Input.TextArea id="update-remarks" placeholder={'请输入备注'} rows={2}/>
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

export default CreateDictForm;
