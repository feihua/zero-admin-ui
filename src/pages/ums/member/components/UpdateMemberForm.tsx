import React, {useEffect} from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { MemberTableListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<MemberTableListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberTableListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateMemberForm: React.FC<UpdateFormProps> = (props) => {
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
          name="username"
          label="会员名"
        >
          <Input id="update-username" placeholder={'请输入会员名'}/>
        </FormItem>
        <FormItem
          name="nickname"
          label="昵称"
        >
          <Input id="update-nickname" placeholder={'请输入昵称'}/>
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
        >
          <Input id="update-phone" placeholder={'请输入手机号'}/>
        </FormItem>
        <FormItem
          name="icon"
          label="头像"
        >
          <Input id="update-icon" placeholder={'请输入头像'}/>
        </FormItem>

        <FormItem
          name="gender"
          label="性别"
        >
          <Select id="gender" placeholder={'请选择性别'}>
            <Select.Option value={0}>停用</Select.Option>
            <Select.Option value={1}>启用</Select.Option>
          </Select>
        </FormItem>

        <FormItem
          name="birthday"
          label="生日"
        >
          <Input id="update-birthday" placeholder={'请输入生日'}/>
        </FormItem>

        <FormItem
          name="integration"
          label="积分"
        >
          <Input id="update-integration" placeholder={'请输入积分'}/>
        </FormItem>

        <FormItem
          name="growth"
          label="成长值"
        >
          <Input id="update-growth" placeholder={'请输入成长值'}/>
        </FormItem>

        <FormItem
          name="luckeyCount"
          label="剩余抽奖次数"
        >
          <Input id="update-luckeyCount" placeholder={'请输入剩余抽奖次数'}/>
        </FormItem>

        <FormItem
          name="historyIntegration"
          label="历史积分数量"
        >
          <Input id="update-historyIntegration" placeholder={'请输入历史积分数量'}/>
        </FormItem>

        <FormItem
          name="status"
          label="状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Select.Option value={0}>禁用</Select.Option>
            <Select.Option value={1}>正常</Select.Option>
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
      title="修改会员信息"
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

export default UpdateMemberForm;
