import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import {DictItemListItem} from './data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: DictItemListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<DictItemListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateDictItemForm: React.FC<UpdateFormProps> = (props) => {
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
      onSubmit(values as DictItemListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem
          name="dictLabel"
          label="字典标签"
          rules={[{required: true, message: '请输入字典类型名称!'}]}
        >
          <Input id="update-dictLabel" placeholder={'请输入字典标签'}/>
        </FormItem>
        <FormItem
          name="dictValue"
          label="字典键值"
          rules={[{required: true, message: '请输入字典键值'}]}
        >
          <Input id="update-dictValue" placeholder={'请输入字典键值'}/>
        </FormItem>
        <FormItem
          name="dictSort"
          label="字典排序"
          rules={[{required: true}]}
        >
          <InputNumber style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="dictStatus"
          label="字典状态"
          rules={[{required: true}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="isDefault"
          label="是否默认"
          rules={[{required: true}]}
        >
          <Radio.Group>
            <Radio value={0}>否</Radio>
            <Radio value={1}>是</Radio>
          </Radio.Group>
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

export default UpdateDictItemForm;
