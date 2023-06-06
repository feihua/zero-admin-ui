import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import {DictListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: DictListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<DictListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateDictForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {onSubmit, onCancel, updateModalVisible, currentData} = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as DictListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem name="value" label="数据值" rules={[{required: true, message: '请输入数据值'}]}>
          <Input id="update-value" placeholder={'请输入数据值'}/>
        </FormItem>
        <FormItem name="label" label="标签名" rules={[{required: true, message: '请输入标签名'}]}>
          <Input id="update-label" placeholder={'请输入标签名'}/>
        </FormItem>
        <FormItem name="type" label="类型" rules={[{required: true, message: '请输入标签名'}]}>
          <Input id="update-type" placeholder={'请输入类型'}/>
        </FormItem>
        <FormItem name="sort" label="排序" rules={[{required: true, message: '请输入排序'}]}>
          <InputNumber placeholder={'请输入排序'} style={{width: 255}}/>
        </FormItem>
        <FormItem name="delFlag" label="状态" rules={[{required: true, message: '请求选择状态'}]}>
          <Select id="delFlag" placeholder={'请选择状态'}>
            <Select.Option value={1}>禁用</Select.Option>
            <Select.Option value={0}>启用</Select.Option>
          </Select>
        </FormItem>
        <FormItem name="description" label="描述">
          <Input.TextArea id="update-description" placeholder={'请输入描述'} rows={2}/>
        </FormItem>
        <FormItem name="remarks" label="备注">
          <Input.TextArea id="update-remarks" placeholder={'请输入备注'} rows={2}/>
        </FormItem>

      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改字典"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateDictForm;
