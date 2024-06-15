import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio} from 'antd';
import type {CompanyAddressListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: CompanyAddressListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<CompanyAddressListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as CompanyAddressListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id"/>
        </FormItem>
        <FormItem
          name="addressName"
          label="地址名称"
          rules={[{required: true, message: '请输入地址名称!'}]}
        >
          <Input id="create-addressName" placeholder={'请输入地址名称!'}/>
        </FormItem>
        <FormItem
          name="province"
          label="省/直辖市"
          rules={[{required: true, message: '请输入省/直辖市!'}]}
        >
          <Input id="create-province" placeholder={'请输入省/直辖市!'}/>
        </FormItem>
        <FormItem
          name="city"
          label="市"
          rules={[{required: true, message: '请输入市!'}]}
        >
          <Input id="create-city" placeholder={'请输入市!'}/>
        </FormItem>
        <FormItem
          name="region"
          label="区"
          rules={[{required: true, message: '请输入区!'}]}
        >
          <Input id="create-region" placeholder={'请输入区!'}/>
        </FormItem>
        <FormItem
          name="detailAddress"
          label="详细地址"
          rules={[{required: true, message: '请输入详细地址!'}]}
        >
          <Input id="create-detailAddress" placeholder={'请输入详细地址!'}/>
        </FormItem>

        <FormItem
          name="name"
          label="收发货人姓名"
          rules={[{required: true, message: '请输入收发货人姓名!'}]}
        >
          <Input id="create-name" placeholder={'请输入收发货人姓名!'}/>
        </FormItem>
        <FormItem
          name="phone"
          label="收货人电话"
          rules={[{required: true, message: '请输入收货人电话!'}]}
        >
          <Input id="create-phone" placeholder={'请输入收货人电话!'}/>
        </FormItem>

        <FormItem
          name="receiveStatus"
          label="是否默认收货地址"
          rules={[{required: true, message: '请输入是否默认收货地址!'}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
        </FormItem>

        <FormItem
          name="sendStatus"
          label="默认发货地址"
          rules={[{required: true, message: '请输入默认发货地址!'}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
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
      title="编辑"
      open={updateModalVisible}
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

export default UpdateForm;
