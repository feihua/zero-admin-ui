import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { ProductBrandListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductBrandListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

  useEffect(() => {
    if (form && !addVisible) {
      form.resetFields();
    }
  }, [props.addVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: ProductBrandListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>


        <FormItem
          name="name"
          label="品牌名称"
          rules={[{required: true, message: '请输入品牌名称!'}]}
        >
            <Input id="create-name" placeholder={'请输入品牌名称!'}/>
         </FormItem>
        <FormItem
          name="logo"
          label="品牌logo"
          rules={[{required: true, message: '请输入品牌logo!'}]}
        >
            <Input id="create-logo" placeholder={'请输入品牌logo!'}/>
         </FormItem>
        <FormItem
          name="bigPic"
          label="专区大图"
          rules={[{required: true, message: '请输入专区大图!'}]}
        >
            <Input id="create-bigPic" placeholder={'请输入专区大图!'}/>
         </FormItem>

        <FormItem
          name="firstLetter"
          label="首字母"
          rules={[{required: true, message: '请输入首字母!'}]}
        >
            <Input id="create-firstLetter" placeholder={'请输入首字母!'}/>
         </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={ {width: 255} } placeholder={'请输入排序!'}/>
        </FormItem>
        <FormItem
          name="recommendStatus"
          label="推荐状态"
          rules={[{required: true, message: '请输入推荐状态!'}]}
        >
              <Radio.Group>
                <Radio value={0}>不推荐</Radio>
                <Radio value={1}>推荐</Radio>
              </Radio.Group>
       </FormItem>
        <FormItem
          name="isEnabled"
          label="是否启用"
          rules={[{required: true, message: '请输入是否启用!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
         </FormItem>
        <FormItem
          name="description"
          label="描述"
        >
          <Input.TextArea rows={2} placeholder={'请输入描述'}/>
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
      open={addVisible}
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
