import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberRuleSettingListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberRuleSettingListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberRuleSettingListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
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
      onSubmit(values as MemberRuleSettingListItem);
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
          name="consumePerPoint"
          label="每消费多少元获取1个点"
          rules={[{required: true, message: '请输入每消费多少元获取1个点!'}]}
        >
            <Input id="create-consumePerPoint" placeholder={'请输入每消费多少元获取1个点!'}/>
         </FormItem>
        <FormItem
          name="continueSignDay"
          label="连续签到天数"
          rules={[{required: true, message: '请输入连续签到天数!'}]}
        >
            <Input id="create-continueSignDay" placeholder={'请输入连续签到天数!'}/>
         </FormItem>
        <FormItem
          name="continueSignPoint"
          label="连续签到赠送数量"
          rules={[{required: true, message: '请输入连续签到赠送数量!'}]}
        >
            <Input id="create-continueSignPoint" placeholder={'请输入连续签到赠送数量!'}/>
         </FormItem>
        <FormItem
          name="createBy"
          label="创建者"
          rules={[{required: true, message: '请输入创建者!'}]}
        >
            <Input id="create-createBy" placeholder={'请输入创建者!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="create-createTime" placeholder={'请输入创建时间!'}/>
         </FormItem>
        <FormItem
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
            <Input id="create-id" placeholder={'请输入!'}/>
         </FormItem>
        <FormItem
          name="lowOrderAmount"
          label="最低获取点数的订单金额"
          rules={[{required: true, message: '请输入最低获取点数的订单金额!'}]}
        >
            <Input id="create-lowOrderAmount" placeholder={'请输入最低获取点数的订单金额!'}/>
         </FormItem>
        <FormItem
          name="maxPointPerOrder"
          label="每笔订单最高获取点数"
          rules={[{required: true, message: '请输入每笔订单最高获取点数!'}]}
        >
            <Input id="create-maxPointPerOrder" placeholder={'请输入每笔订单最高获取点数!'}/>
         </FormItem>
        <FormItem
          name="ruleType"
          label="类型：0->积分规则；1->成长值规则"
          rules={[{required: true, message: '请输入类型：0->积分规则；1->成长值规则!'}]}
        >
                <Radio.Group>
                  <Radio value={0}>禁用</Radio>
                  <Radio value={1}>正常</Radio>
                </Radio.Group>
         </FormItem>
        <FormItem
          name="status"
          label="状态：0->禁用；1->启用"
          rules={[{required: true, message: '请输入状态：0->禁用；1->启用!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
        </FormItem>
        <FormItem
          name="updateBy"
          label="更新者"
          rules={[{required: true, message: '请输入更新者!'}]}
        >
            <Input id="create-updateBy" placeholder={'请输入更新者!'}/>
         </FormItem>
        <FormItem
          name="updateTime"
          label="更新时间"
          rules={[{required: true, message: '请输入更新时间!'}]}
        >
            <Input id="create-updateTime" placeholder={'请输入更新时间!'}/>
         </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="编辑"
      open={updateModalVisible}
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

export default UpdateForm;
