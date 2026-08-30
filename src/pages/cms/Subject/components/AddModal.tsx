import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { SubjectListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: SubjectListItem) => void;
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

  const handleFinish = (values: SubjectListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="categoryId"
          label="专题分类id"
          rules={[{ required: true, message: '请输入专题分类id!' }]}
        >
          <Input id="create-categoryId" placeholder={'请输入专题分类id!'} />
        </FormItem>
        <FormItem
          name="title"
          label="专题标题"
          rules={[{ required: true, message: '请输入专题标题!' }]}
        >
          <Input id="create-title" placeholder={'请输入专题标题!'} />
        </FormItem>
        <FormItem
          name="pic"
          label="专题主图"
          rules={[{ required: true, message: '请输入专题主图!' }]}
        >
          <Input id="create-pic" placeholder={'请输入专题主图!'} />
        </FormItem>
        <FormItem
          name="recommendStatus"
          label="推荐状态"
          rules={[{ required: true, message: '请输入推荐状态!' }]}
        >
          <Radio.Group>
            <Radio value={1}>推荐</Radio>
            <Radio value={0}>不推荐</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="albumPics"
          label="画册图片"
          rules={[{ required: true, message: '请输入画册图片!' }]}
        >
          <Input id="create-albumPics" placeholder={'请输入画册图片!'} />
        </FormItem>
        <FormItem
          name="description"
          label="专题内容"
          rules={[{ required: true, message: '请输入专题内容!' }]}
        >
          <Input id="create-description" placeholder={'请输入专题内容!'} />
        </FormItem>
        <FormItem
          name="showStatus"
          label="显示状态"
          rules={[{ required: true, message: '请输入显示状态!' }]}
        >
          <Radio.Group>
            <Radio value={1}>显示</Radio>
            <Radio value={0}>不显示</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="sort" label="排序" rules={[{ required: true, message: '请输入排序!' }]}>
          <InputNumber style={{ width: 255 }} />
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
