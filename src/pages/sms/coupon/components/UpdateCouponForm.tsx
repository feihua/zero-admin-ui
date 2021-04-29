import React, {useEffect} from 'react';
import { Form, Input, Modal } from 'antd';
import { CouponListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<CouponListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<CouponListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateCouponForm: React.FC<UpdateFormProps> = (props) => {
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
      onSubmit(values);
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
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
        <FormItem
          name="name"
          label="优惠券名"
        >
          <Input id="update-name" placeholder={'请输入优惠券名'}/>
        </FormItem>
        <FormItem
          name="count"
          label="数量"
        >
          <Input id="update-count" placeholder={'请输入数量'}/>
        </FormItem>
        <FormItem
          name="amount"
          label="金额"
        >
          <Input id="update-amount" placeholder={'请输入金额'}/>
        </FormItem>
        <FormItem
          name="perLimit"
          label="每人限领张数"
        >
          <Input id="update-perLimit" placeholder={'请输入每人限领张数'}/>
        </FormItem>
        <FormItem
          name="publishCount"
          label="发行数量"
        >
          <Input id="update-publishCount" placeholder={'请输入发行数量'}/>
        </FormItem>

        <FormItem
          name="useCount"
          label="已使用数量"
        >
          <Input id="update-useCount" placeholder={'请输入已使用数量'}/>
        </FormItem>

        <FormItem
          name="receiveCount"
          label="领取数量"
        >
          <Input id="update-receiveCount" placeholder={'请输入领取数量'}/>
        </FormItem>
      </>
    );
  };


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改优惠券信息"
      visible={updateModalVisible}
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

export default UpdateCouponForm;
