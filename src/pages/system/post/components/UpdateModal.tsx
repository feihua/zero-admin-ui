import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {PostListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: PostListItem) => void;
  open: boolean;
  currentData: Partial<PostListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateModalProps> = ({onCancel, onSubmit, open, currentData}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (form && !open) {
      form.resetFields();
    }
  }, [open]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as PostListItem);
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
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>

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
          name="status"
          label="岗位状态"
          rules={[{required: true, message: '请选择状态!'}]}
        >
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="sort"
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


  return (
    <Modal forceRender destroyOnClose title="编辑" open={open} okText={'保存'} onOk={handleSubmit} onCancel={onCancel}>
      <Form{...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateModal;
