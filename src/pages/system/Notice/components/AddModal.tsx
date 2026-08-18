import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio} from 'antd';
import type { NoticeListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: NoticeListItem) => void;
  open: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
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

  const handleFinish = (values: NoticeListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
            <FormItem
              name="noticeTitle"
              label="公告标题"
              rules={[{required: true, message: '请输入公告标题!'}]}
            >
              <Input id="create-noticeTitle" placeholder={'请输入公告标题!'}/>
            </FormItem>
            <FormItem
              name="noticeType"
              label="公告类型"
              rules={[{required: true, message: '请输入公告类型!'}]}
            >
              <Radio.Group>
                <Radio value={0}>通知</Radio>
                <Radio value={1}>公告</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem
              name="noticeContent"
              label="公告内容"
              rules={[{required: true, message: '请输入公告内容!'}]}
            >
              <Input id="create-noticeContent" placeholder={'请输入公告内容!'}/>
            </FormItem>
            <FormItem
              name="status"
              label="公告状态"
              rules={[{required: true, message: '请输入公告状态!'}]}
            >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem
              name="remark"
              label="备注"
              rules={[{required: true, message: '请输入备注!'}]}
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

export default CreateForm;
