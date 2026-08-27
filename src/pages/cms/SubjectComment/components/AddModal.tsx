import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { SubjectCommentListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: SubjectCommentListItem) => void;
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

  const handleFinish = (values: SubjectCommentListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
            <FormItem
              name="subjectId"
              label="关联专题id"
              rules={[{required: true, message: '请输入关联专题id!'}]}
            >
              <Input id="create-subjectId" placeholder={'请输入关联专题id!'}/>
            </FormItem>
            <FormItem
              name="memberNickName"
              label="关联会员昵称"
              rules={[{required: true, message: '请输入关联会员昵称!'}]}
            >
              <Input id="create-memberNickName" placeholder={'请输入关联会员昵称!'}/>
            </FormItem>
            <FormItem
              name="memberIcon"
              label="会员头像"
              rules={[{required: true, message: '请输入会员头像!'}]}
            >
              <Input id="create-memberIcon" placeholder={'请输入会员头像!'}/>
            </FormItem>
            <FormItem
              name="content"
              label="评论内容"
              rules={[{required: true, message: '请输入评论内容!'}]}
            >
              <Input id="create-content" placeholder={'请输入评论内容!'}/>
            </FormItem>
            <FormItem
              name="showStatus"
              label="是否显示，0->不显示；1->显示"
              rules={[{required: true, message: '请输入是否显示，0->不显示；1->显示!'}]}
            >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
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
