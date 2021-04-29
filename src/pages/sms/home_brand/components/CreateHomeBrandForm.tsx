import React, {useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import { HomeBrandListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeBrandListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateHomeBrandForm: React.FC<CreateFormProps> = (props) => {
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

  const handleFinish = (values: HomeBrandListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="brandName"
          label="品牌名称"
        >
          <Input id="update-brandName" placeholder={'请输入品牌名称'}/>
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
      title="新建品牌推荐信息"
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

export default CreateHomeBrandForm;
