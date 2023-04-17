import React, {useEffect} from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { FlashPromotionListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: FlashPromotionListItem) => void;
  updateModalVisible: boolean;
  values: Partial<FlashPromotionListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateFlashPromotionForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    values,
  } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();

    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
      });
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(item as FlashPromotionListItem);
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
          name="title"
          label="活动标题"
        >
          <Input id="update-title" placeholder={'请输入活动标题'}/>
        </FormItem>
        <FormItem
          name="startDate"
          label="开始日期"
        >
          <Input id="update-startDate" placeholder={'请输入开始日期'}/>
        </FormItem>
        <FormItem
          name="endDate"
          label="结束日期"
        >
          <Input id="update-endDate" placeholder={'请输入结束日期'}/>
        </FormItem>

        <FormItem
          name="status"
          label="上下线状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>停用</Option>
            <Option value={1}>启用</Option>
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
      title="修改秒杀信息"
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

export default UpdateFlashPromotionForm;
