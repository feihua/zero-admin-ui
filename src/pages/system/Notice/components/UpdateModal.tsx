import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio} from 'antd';
import type { NoticeListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: NoticeListItem) => void;
  open: boolean;
  currentData: Partial<NoticeListItem>;
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
      onSubmit(values as NoticeListItem);
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
          name="noticeTitle"
          label="公告标题"
          rules={[{required: true, message: '请输入公告标题!'}]}
        >
            <Input id="update-noticeTitle" placeholder={'请输入公告标题!'}/>
        </FormItem>
        <FormItem
          name="noticeType"
          label="公告类型"
          rules={[{required: true, message: '请输入公告类型!'}]}
        >
            <Radio.Group>
              <Radio value={1}>通知</Radio>
              <Radio value={2}>公告</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="noticeContent"
          label="公告内容"
          rules={[{required: true, message: '请输入公告内容!'}]}
        >
            <Input id="update-noticeContent" placeholder={'请输入公告内容!'}/>
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

export default UpdateForm;
