import React, {useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import { HomeNewProductListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeNewProductListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateHomeNewProductForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;


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

  const handleFinish = (values: HomeNewProductListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="productName"
          label="商品名称"
        >
          <Input id="update-productName" placeholder={'请输入商品名称'}/>
        </FormItem>
        <FormItem
          name="recommendStatus"
          label="推荐状态"
        >
          <Select id="recommendStatus" placeholder={'请选择推荐状态'}>
            <Option value={0}>PC首页轮播</Option>
            <Option value={1}>app首页轮播</Option>
          </Select>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
        >
          <Input id="update-sort" placeholder={'请输入排序'}/>
        </FormItem>


      </>
    );
  };


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建新鲜好物"
      visible={createModalVisible}
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

export default CreateHomeNewProductForm;
