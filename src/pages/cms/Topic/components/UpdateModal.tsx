import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { TopicListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: TopicListItem) => void;
  open: boolean;
  currentData: Partial<TopicListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    open,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !open) {
      form.resetFields();
    }
  }, [props.open]);

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
      onSubmit(values as TopicListItem);
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
          name="categoryId"
          label="关联分类id"
          rules={[{required: true, message: '请输入关联分类id!'}]}
        >
            <Input id="update-categoryId" placeholder={'请输入关联分类id!'}/>
        </FormItem>
        <FormItem
          name="name"
          label="话题名称"
          rules={[{required: true, message: '请输入话题名称!'}]}
        >
            <Input id="update-name" placeholder={'请输入话题名称!'}/>
        </FormItem>
        <FormItem
          name="startTime"
          label="话题开始时间"
          rules={[{required: true, message: '请输入话题开始时间!'}]}
        >
            <Input id="update-startTime" placeholder={'请输入话题开始时间!'}/>
        </FormItem>
        <FormItem
          name="endTime"
          label="话题结束时间"
          rules={[{required: true, message: '请输入话题结束时间!'}]}
        >
            <Input id="update-endTime" placeholder={'请输入话题结束时间!'}/>
        </FormItem>
        <FormItem
          name="attendCount"
          label="参与人数"
          rules={[{required: true, message: '请输入参与人数!'}]}
        >
            <Input id="update-attendCount" placeholder={'请输入参与人数!'}/>
        </FormItem>
        <FormItem
          name="attentionCount"
          label="关注人数"
          rules={[{required: true, message: '请输入关注人数!'}]}
        >
            <Input id="update-attentionCount" placeholder={'请输入关注人数!'}/>
        </FormItem>
        <FormItem
          name="readCount"
          label="阅读数"
          rules={[{required: true, message: '请输入阅读数!'}]}
        >
            <Input id="update-readCount" placeholder={'请输入阅读数!'}/>
        </FormItem>
        <FormItem
          name="awardName"
          label="奖品名称"
          rules={[{required: true, message: '请输入奖品名称!'}]}
        >
            <Input id="update-awardName" placeholder={'请输入奖品名称!'}/>
        </FormItem>
        <FormItem
          name="attendType"
          label="参与方式"
          rules={[{required: true, message: '请输入参与方式!'}]}
        >
            <Radio.Group>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>正常</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="content"
          label="话题内容"
          rules={[{required: true, message: '请输入话题内容!'}]}
        >
            <Input id="update-content" placeholder={'请输入话题内容!'}/>
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
      open={open}
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

export default UpdateModal;
