import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { TopicCategoryListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: TopicCategoryListItem) => void;
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

  const handleFinish = (values: TopicCategoryListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
            <FormItem
              name="name"
              label="分类名称"
              rules={[{required: true, message: '请输入分类名称!'}]}
            >
              <Input id="create-name" placeholder={'请输入分类名称!'}/>
            </FormItem>
            <FormItem
              name="icon"
              label="分类图标"
              rules={[{required: true, message: '请输入分类图标!'}]}
            >
              <Input id="create-icon" placeholder={'请输入分类图标!'}/>
            </FormItem>
            <FormItem
              name="subjectCount"
              label="专题数量"
              rules={[{required: true, message: '请输入专题数量!'}]}
            >
              <Input id="create-subjectCount" placeholder={'请输入专题数量!'}/>
            </FormItem>
            <FormItem
              name="showStatus"
              label="显示状态：0->不显示；1->显示"
              rules={[{required: true, message: '请输入显示状态：0->不显示；1->显示!'}]}
            >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem
              name="sort"
              label="排序"
              rules={[{required: true, message: '请输入排序!'}]}
            >
              <InputNumber style={{width: 255}}/>
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
