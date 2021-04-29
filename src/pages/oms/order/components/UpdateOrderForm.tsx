import React, {useEffect} from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { OrderListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<OrderListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<OrderListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateOrderForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

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
          name="orderSn"
          label="订单编号"
        >
          <Input id="update-orderSn" bordered={false}/>
        </FormItem>
        <FormItem
          name="memberUserName"
          label="用户帐号"
        >
          <Input id="update-memberUserName" bordered={false}/>
        </FormItem>
        <FormItem
          name="totalAmount"
          label="订单总金额"
        >
          <Input id="update-totalAmount" bordered={false}/>
        </FormItem>
        <FormItem
          name="payAmount"
          label="应付金额"
        >
          <Input id="update-payAmount" placeholder={'请输入应付金额'}/>
        </FormItem>
        <FormItem
          name="freightAmount"
          label="运费金额"
        >
          <Input id="update-freightAmount" placeholder={'请输入运费金额'}/>
        </FormItem>

        <FormItem
          name="promotionAmount"
          label="促销优化金额"
        >
          <Input id="update-promotionAmount" placeholder={'请输入促销优化金额'}/>
        </FormItem>
        <FormItem
          name="integrationAmount"
          label="积分抵扣金额"
        >
          <Input id="update-integrationAmount" placeholder={'请输入积分抵扣金额'}/>
        </FormItem>
        <FormItem
          name="integrationAmount"
          label="积分抵扣金额"
        >
          <Input id="update-integrationAmount" placeholder={'请输入积分抵扣金额'}/>
        </FormItem>
        <FormItem
          name="couponAmount"
          label="优惠券抵扣金额"
        >
          <Input id="update-couponAmount" placeholder={'请输入优惠券抵扣金额'}/>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>待付款</Option>
            <Option value={1}>待发货</Option>
            <Option value={2}>已发货</Option>
            <Option value={3}>已完成</Option>
            <Option value={4}>已关闭</Option>
            <Option value={5}>无效订单</Option>
          </Select>
        </FormItem>
      </>
    );
  };


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改订单信息"
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

export default UpdateOrderForm;
