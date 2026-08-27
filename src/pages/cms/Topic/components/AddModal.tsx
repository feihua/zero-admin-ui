import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { TopicListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: TopicListItem) => void;
  open: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    open,
  } = props;

  useEffect(() => {
    if (form && !open) {
      form.resetFields();
    }
  }, [props.open]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: TopicListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
            <FormItem
              name="categoryId"
              label="关联分类id"
              rules={[{required: true, message: '请输入关联分类id!'}]}
            >
              <Input id="create-categoryId" placeholder={'请输入关联分类id!'}/>
            </FormItem>
            <FormItem
              name="name"
              label="话题名称"
              rules={[{required: true, message: '请输入话题名称!'}]}
            >
              <Input id="create-name" placeholder={'请输入话题名称!'}/>
            </FormItem>
            <FormItem
              name="startTime"
              label="话题开始时间"
              rules={[{required: true, message: '请输入话题开始时间!'}]}
            >
              <Input id="create-startTime" placeholder={'请输入话题开始时间!'}/>
            </FormItem>
            <FormItem
              name="endTime"
              label="话题结束时间"
              rules={[{required: true, message: '请输入话题结束时间!'}]}
            >
              <Input id="create-endTime" placeholder={'请输入话题结束时间!'}/>
            </FormItem>
            <FormItem
              name="attendCount"
              label="参与人数"
              rules={[{required: true, message: '请输入参与人数!'}]}
            >
              <Input id="create-attendCount" placeholder={'请输入参与人数!'}/>
            </FormItem>
            <FormItem
              name="attentionCount"
              label="关注人数"
              rules={[{required: true, message: '请输入关注人数!'}]}
            >
              <Input id="create-attentionCount" placeholder={'请输入关注人数!'}/>
            </FormItem>
            <FormItem
              name="readCount"
              label="阅读数"
              rules={[{required: true, message: '请输入阅读数!'}]}
            >
              <Input id="create-readCount" placeholder={'请输入阅读数!'}/>
            </FormItem>
            <FormItem
              name="awardName"
              label="奖品名称"
              rules={[{required: true, message: '请输入奖品名称!'}]}
            >
              <Input id="create-awardName" placeholder={'请输入奖品名称!'}/>
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
              <Input id="create-content" placeholder={'请输入话题内容!'}/>
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

export default AddModal;
