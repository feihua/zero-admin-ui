import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {PostListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: PostListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreatePostForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: PostListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="postCode"
          label="岗位编码"
          rules={[{required: true, message: '请输入岗位编码!'}]}
        >
          <Input id="update-jobName" placeholder={'请输入岗位编码'}/>
        </FormItem>
        <FormItem
          name="postName"
          label="岗位名称"
          rules={[{required: true, message: '请输入岗位名称!'}]}
        >
          <Input id="update-jobName" placeholder={'请输入岗位名称'}/>
        </FormItem>
        <FormItem
          name="postStatus"
          label="岗位状态"
          initialValue={1}
          rules={[{required: true, message: '请选择状态!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="postSort"
          label="岗位排序"
          rules={[{required: true, message: '请输入排序!'}]}
          initialValue={0}
        >
          <InputNumber style={{width: 255}}/>
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
      open={createModalVisible}
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

export default CreatePostForm;
