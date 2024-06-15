import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { OrderReturnReasonListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: OrderReturnReasonListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: OrderReturnReasonListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="name"
          label="退货类型"
          rules={[{required: true, message: '请输入退货类型!'}]}
        >
            <Input id="create-name" placeholder={'请输入退货类型!'}/>
         </FormItem>
        <FormItem
          name="sort"
          label="排序"
          initialValue={1}
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          initialValue={1}
          rules={[{required: true, message: '请输入状态!'}]}
        >
              <Radio.Group>
                <Radio value={0}>不启用</Radio>
                <Radio value={1}>启用</Radio>
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
      open={createModalVisible}
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

export default CreateForm;
