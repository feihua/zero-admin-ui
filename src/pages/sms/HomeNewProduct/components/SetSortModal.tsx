import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal} from 'antd';
import type {HomeNewProductListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeNewProductListItem) => void;
  updateModalVisible: boolean;
  values: Partial<HomeNewProductListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const SetSortModal: React.FC<UpdateFormProps> = (props) => {
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
      onSubmit(item as HomeNewProductListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id"/>
        </FormItem>
        <FormItem name="sort" label="排序">
          <InputNumber id="update-sort" placeholder={'请输入排序'}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="设置排序"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default SetSortModal;
