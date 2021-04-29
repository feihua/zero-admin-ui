import React, {useEffect} from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { ReturnApplyListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<ReturnApplyListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<ReturnApplyListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateReturnForm: React.FC<UpdateFormProps> = (props) => {
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
          name="returnAmount"
          label="退款金额"
        >
          <Input id="update-returnAmount" bordered={false}/>
        </FormItem>
        <FormItem
          name="returnName"
          label="退货人姓名"
        >
          <Input id="update-returnName" placeholder={'请输入退货人姓名'}/>
        </FormItem>
        <FormItem
          name="returnPhone"
          label="退货人电话"
        >
          <Input id="update-returnPhone" placeholder={'请输入退货人电话'}/>
        </FormItem>
        <FormItem
          name="productCount"
          label="退货数量"
        >
          <Input id="update-productCount" placeholder={'请输入退货数量'}/>
        </FormItem>
        <FormItem
          name="productPrice"
          label="商品单价"
        >
          <Input id="update-productPrice" placeholder={'请输入商品单价'}/>
        </FormItem>

        <FormItem
          name="status"
          label="状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>待处理</Option>
            <Option value={1}>退货中</Option>
            <Option value={2}>已完成</Option>
            <Option value={3}>已拒绝</Option>
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
      title="修改退货信息"
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

export default UpdateReturnForm;
