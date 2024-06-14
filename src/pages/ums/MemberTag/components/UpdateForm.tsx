import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberTagListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberTagListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberTagListItem>;
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
      onSubmit(values as MemberTagListItem);
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
          name="finishOrderAmount"
          label="自动打标签完成订单金额"
          rules={[{required: true, message: '请输入自动打标签完成订单金额!'}]}
        >
            <Input id="create-finishOrderAmount" placeholder={'请输入自动打标签完成订单金额!'}/>
         </FormItem>
        <FormItem
          name="finishOrderCount"
          label="自动打标签完成订单数量"
          rules={[{required: true, message: '请输入自动打标签完成订单数量!'}]}
        >
            <Input id="create-finishOrderCount" placeholder={'请输入自动打标签完成订单数量!'}/>
         </FormItem>
        <FormItem
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
            <Input id="create-id" placeholder={'请输入!'}/>
         </FormItem>
        <FormItem
          name="status"
          label="状态：0->禁用；1->启用"
          rules={[{required: true, message: '请输入状态：0->禁用；1->启用!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
        </FormItem>
        <FormItem
          name="tagName"
          label="标签名称"
          rules={[{required: true, message: '请输入标签名称!'}]}
        >
            <Input id="create-tagName" placeholder={'请输入标签名称!'}/>
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
