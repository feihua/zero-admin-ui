import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberLoginLogListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberLoginLogListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberLoginLogListItem>;
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
      onSubmit(values as MemberLoginLogListItem);
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
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
            <Input id="create-id" placeholder={'请输入!'}/>
         </FormItem>
        <FormItem
          name="memberId"
          label="会员id"
          rules={[{required: true, message: '请输入会员id!'}]}
        >
            <Input id="create-memberId" placeholder={'请输入会员id!'}/>
         </FormItem>
        <FormItem
          name="memberIp"
          label="登录ip"
          rules={[{required: true, message: '请输入登录ip!'}]}
        >
            <Input id="create-memberIp" placeholder={'请输入登录ip!'}/>
         </FormItem>
        <FormItem
          name="city"
          label="登录城市"
          rules={[{required: true, message: '请输入登录城市!'}]}
        >
            <Input id="create-city" placeholder={'请输入登录城市!'}/>
         </FormItem>
        <FormItem
          name="loginType"
          label="登录类型：0->PC；1->android;2->ios;3->小程序"
          rules={[{required: true, message: '请输入登录类型：0->PC；1->android;2->ios;3->小程序!'}]}
        >
                <Radio.Group>
                  <Radio value={0}>禁用</Radio>
                  <Radio value={1}>正常</Radio>
                </Radio.Group>
         </FormItem>
        <FormItem
          name="province"
          label="登录省份"
          rules={[{required: true, message: '请输入登录省份!'}]}
        >
            <Input id="create-province" placeholder={'请输入登录省份!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="登录时间"
          rules={[{required: true, message: '请输入登录时间!'}]}
        >
            <Input id="create-createTime" placeholder={'请输入登录时间!'}/>
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
