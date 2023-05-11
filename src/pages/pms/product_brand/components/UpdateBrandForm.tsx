import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import type {BrandListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: BrandListItem) => void;
  updateModalVisible: boolean;
  values: Partial<BrandListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateBrandForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {onSubmit, onCancel, updateModalVisible, values} = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
      });
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(item as BrandListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="id" hidden>
          <Input id="update-id"/>
        </FormItem>
        <FormItem name="name" label="品牌名" rules={[{required: true, message: '请输入品牌名!'}]}>
          <Input id="update-name" placeholder={'请输入品牌名'}/>
        </FormItem>
        <FormItem name="firstLetter" label="首字母" rules={[{required: true, message: '请输入首字母!'}]}>
          <Input id="update-firstLetter" placeholder={'请输入首字母'}/>
        </FormItem>
        <FormItem name="sort" label="排序" rules={[{required: true, message: '请输入排序!'}]}>
          <InputNumber/>
        </FormItem>
        <FormItem
          name="factoryStatus"
          label="是否为品牌制造商"
          rules={[{required: true, message: '请输入品牌制造商!'}]}
        >
          <Select id="factoryStatus">
            <Select.Option value={0}>不是</Select.Option>
            <Select.Option value={1}>是</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="showStatus"
          label="是否显示"
          rules={[{required: true, message: '请输入是否显示!'}]}
        >
          <Select id="showStatus">
            <Select.Option value={0}>否</Select.Option>
            <Select.Option value={1}>是</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="productCount" label="产品数量" rules={[{required: true, message: '请输入产品数量!'}]}>
          <InputNumber/>
        </FormItem>
        <FormItem name="productCommentCount" label="产品评论数量" rules={[{required: true, message: '请输入产品评论数量!'}]}>
          <InputNumber/>
        </FormItem>
        <FormItem name="logo" label="品牌logo" rules={[{required: true, message: '请输入品牌logo!'}]}>
          <Input id="update-logo" placeholder={'请输入品牌logo'}/>
        </FormItem>
        <FormItem name="bigPic" label="专区大图" rules={[{required: true, message: '请输入专区大图!'}]}>
          <Input id="update-bigPic" placeholder={'请输入专区大图'}/>
        </FormItem>
        <FormItem name="brandStory" label="品牌故事" rules={[{required: true, message: '请输入品牌故事!'}]}>
          <Input.TextArea rows={2} placeholder={'请输入品牌故事'}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改品牌"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateBrandForm;
