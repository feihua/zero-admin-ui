import React, {useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import type {OrderListItem} from "../data.d";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: OrderListItem) => void;
  deliveryModelVisible: boolean;
  currentData: Partial<OrderListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const DeliveryModel: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    deliveryModelVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !deliveryModelVisible) {
      form.resetFields();

    }
  }, [props.deliveryModelVisible]);

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
      onSubmit(values as OrderListItem);
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
          name="status"
          label="订单状态"
          initialValue={2}
          hidden
        >
          <Input id="update-status"/>
        </FormItem>
        <FormItem
          name="orderSn"
          label="订单编号"
          rules={[{required: true, message: '请输入订单编号'}]}
        >
          <Input id="update-orderSn" bordered={false}/>
        </FormItem>
        <FormItem
          name="receiverName"
          label="收货人"
          rules={[{required: true, message: '请输入收货人'}]}
        >
          <Input id="update-receiverName" bordered={false}/>
        </FormItem>
        <FormItem
          name="receiverPhone"
          label="手机号码"
          rules={[{required: true, message: '请输入手机号码'}]}
        >
          <Input id="update-receiverPhone" bordered={false}/>
        </FormItem>
        <FormItem
          name="receiverPostCode"
          label="邮政编码"
          rules={[{required: true, message: '请输入邮政编码'}]}
        >
          <Input id="update-receiverPostCode" bordered={false}/>
        </FormItem>
        <FormItem
          name="receiverDetailAddress"
          label="收货地址"
          rules={[{required: true, message: '请输入收货地址'}]}
        >
          <Input.TextArea rows={2} bordered={false}/>
        </FormItem>
        <FormItem
          name="deliveryCompany"
          label="配送方式"
          initialValue={'顺丰快递'}
          rules={[{required: true, message: '请选择配送方式'}]}
        >
          <Select
            defaultValue="顺丰快递"
            style={{width: 120}}
            id={'deliveryCompany'}
            options={[
              {value: '顺丰快递', label: '顺丰快递'},
              {value: '圆通快递', label: '圆通快递'},
              {value: '中通快递', label: '中通快递'},
              {value: '韵达快递', label: '韵达快递'},
            ]}
          />
        </FormItem>
        <FormItem
          name="deliverySn"
          label="物流单号"
          rules={[{required: true, message: '请输入物流单号'}]}
        >
          <Input id="update-name" placeholder={'请输入物流单号'}/>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="发货信息"
      open={deliveryModelVisible}
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

export default DeliveryModel;
