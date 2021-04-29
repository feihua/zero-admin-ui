import React, {useEffect} from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { HomeAdvertiseListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<HomeAdvertiseListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<HomeAdvertiseListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateHomeAdvertiseForm: React.FC<UpdateFormProps> = (props) => {
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
          name="name"
          label="广告名"
        >
          <Input id="update-name" placeholder={'请输入广告名'}/>
        </FormItem>
        <FormItem
          name="type"
          label="轮播位置"
        >
          <Select id="type" placeholder={'请选择轮播位置'}>
            <Option value={0}>PC首页轮播</Option>
            <Option value={1}>app首页轮播</Option>
          </Select>
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
      title="修改广告信息"
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

export default UpdateHomeAdvertiseForm;
