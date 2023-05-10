import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import type {LevelListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: LevelListItem) => void;
  updateModalVisible: boolean;
  values: Partial<LevelListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateLevelForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const {onSubmit, onCancel, updateModalVisible, values} = props;

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

  const handleFinish = (value: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(value as LevelListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem name="name" label="会员名" rules={[{required: true, message: '请输入会员名!'}]}>
          <Input id="update-name" placeholder={'请输入会员名'}/>
        </FormItem>
        <FormItem name="growthPoint" label="成长值" rules={[{required: true, message: '成长值!'}]}>
          <InputNumber addonAfter={"积分"}/>
        </FormItem>
        <FormItem name="commentGrowthPoint" label="每次评价获取的成长值" rules={[{required: true, message: '每次评价获取的成长值!'}]}>
          <InputNumber addonAfter={"积分"}/>
        </FormItem>
        <FormItem name="freeFreightPoint" label="免运费标准" rules={[{required: true, message: '免运费标准!'}]}>
          <InputNumber addonBefore={"满"} addonAfter={"元"}/>
        </FormItem>

        <FormItem name="defaultStatus" label="是否为默认等级" rules={[{required: true, message: '是否为默认等级!'}]}>
          <Select id="status" placeholder={'是否为默认等级'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>

        <FormItem name="priviledgeFreeFreight" label="免邮特权" rules={[{required: true, message: '请选择免邮特权!'}]}>
          <Select id="priviledgeFreeFreight" placeholder={'请选择免邮特权'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>

        <FormItem name="priviledgeSignIn" label="签到特权" rules={[{required: true, message: '请选择签到特权!'}]}>
          <Select id="priviledgeSignIn" placeholder={'请选择签到特权'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>

        <FormItem name="priviledgeComment" label="评论获奖励特权" rules={[{required: true, message: '请选择评论获奖励特权!'}]}>
          <Select id="priviledgeComment" placeholder={'请选择评论获奖励特权'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>

        <FormItem name="priviledgePromotion" label="专享活动特权" rules={[{required: true, message: '请选择专享活动特权!'}]}>
          <Select id="priviledgePromotion" placeholder={'请选择专享活动特权'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>

        <FormItem name="priviledgeMemberPrice" label="会员价格特权" rules={[{required: true, message: '请选择会员价格特权!'}]}>
          <Select id="priviledgeMemberPrice" placeholder={'请选择会员价格特权'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>
        <FormItem name="priviledgeBirthday" label="生日特权" rules={[{required: true, message: '请选择生日特权!'}]}>
          <Select id="priviledgeBirthday" placeholder={'请选择生日特权'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>
        <FormItem
          name="note"
          label="备注"
        >
          <Input.TextArea rows={2}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改会员等级"
      open={updateModalVisible}
      {...modalFooter}
      width={600}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateLevelForm;
