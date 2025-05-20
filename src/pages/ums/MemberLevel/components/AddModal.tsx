import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {MemberLevelListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberLevelListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

  useEffect(() => {
    if (form && !addVisible) {
      form.resetFields();
    }
  }, [props.addVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: MemberLevelListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="name"
          label="等级名称"
          rules={[{required: true, message: '请输入等级名称!'}]}
        >
          <Input id="create-name" placeholder={'请输入等级名称!'}/>
        </FormItem>
        <FormItem
          name="level"
          label="等级"
          rules={[{required: true, message: '请输入等级!'}]}
        >
          <InputNumber id="create-level" placeholder={'请输入等级!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="growthPoint"
          label="升级所需成长值"
          rules={[{required: true, message: '请输入升级所需成长值!'}]}
        >
          <InputNumber id="create-growthPoint" placeholder={'请输入升级所需成长值!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="discountRate"
          label="折扣率(0-100)"
          rules={[{required: true, message: '请输入折扣率(0-100)!'}]}
        >
          <InputNumber id="create-discountRate" placeholder={'请输入折扣率(0-100)!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="freeFreight"
          label="是否免运费"
          initialValue={1}
          rules={[{required: true, message: '请输入是否免运费!'}]}
        >
          <Radio.Group id="freeFreight">
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="commentExtra"
          label="可评论获取奖励"
          initialValue={1}
          rules={[{required: true, message: '请输入是否可评论获取奖励!'}]}
        >
          <Radio.Group id="commentExtra">
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="privileges"
          label="会员特权JSON"
          rules={[{required: true, message: '请输入会员特权JSON!'}]}
        >
          <Input.TextArea rows={2} placeholder={'请输入会员特权JSON'}/>
        </FormItem>
        <FormItem
          name="isEnabled"
          label="是否启用"
          initialValue={1}
          rules={[{required: true, message: '请选择是否启用!'}]}
        >
          <Radio.Group id="isEnabled">
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
        >
          <Input.TextArea rows={2} placeholder={'请输入备注'}/>
        </FormItem>

      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新增"
      open={addVisible}
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

export default AddModal;
