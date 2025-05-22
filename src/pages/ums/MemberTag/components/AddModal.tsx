import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberTagListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberTagListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

  useEffect(() => {
    if (form && !addVisible) {
      form.resetFields();
    }
  }, [props.addVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: MemberTagListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="tagName"
          label="标签名称"
          rules={[{required: true, message: '请输入标签名称!'}]}
        >
            <Input id="create-tagName" placeholder={'请输入标签名称!'}/>
         </FormItem>
        <FormItem
          name="description"
          label="标签描述"
          rules={[{required: true, message: '请输入标签描述!'}]}
        >
          <Input.TextArea rows={2} placeholder={'请输入标签描述'}/>
         </FormItem>
        <FormItem
          name="finishOrderCount"
          label="自动打标签完成订单数量"
          rules={[{required: true, message: '请输入自动打标签完成订单数量!'}]}
        >
            <InputNumber id="create-finishOrderCount" placeholder={'请输入自动打标签完成订单数量!'} style={{width: 255}}/>
         </FormItem>
        <FormItem
          name="finishOrderAmount"
          label="自动打标签完成订单金额"
          rules={[{required: true, message: '请输入自动打标签完成订单金额!'}]}
        >
            <InputNumber id="create-finishOrderAmount" placeholder={'请输入自动打标签完成订单金额!'} style={{width: 255}}/>
         </FormItem>
        <FormItem
          name="status"
          label="状态：0-禁用，1-启用"
          rules={[{required: true, message: '请输入状态：0-禁用，1-启用!'}]}
        >
              <Radio.Group>
                <Radio value={1}>正常</Radio>
                <Radio value={0}>禁用</Radio>
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
