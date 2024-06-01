import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {RoleListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: RoleListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<RoleListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateRoleForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

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
      onSubmit(values as RoleListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        />
        <FormItem
          name="roleName"
          label="角色名称"
          rules={[{required: true, message: '请输入角色名称'}]}
        >
          <Input id="update-name" placeholder={'请输入角色名称'}/>
        </FormItem>
        <FormItem
          name="roleKey"
          label="权限字符"
          rules={[{required: true, message: '请输入权限字符'}]}
        >
          <Input id="update-name" placeholder={'请输入权限字符'}/>
        </FormItem>
        <FormItem
          name="roleSort"
          label="角色排序" initialValue={0}
          rules={[{required: true, message: '请输入角色排序'}]}>
          <InputNumber placeholder={'请输入角色排序'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="roleStatus"
          label="状态"
          initialValue={1}
          rules={[{required: true, message: '请选择状态'}]}
        >
          <Radio.Group id="status">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
        >
          <Input.TextArea id="update-remark" placeholder={'请输入备注'} rows={2}/>
        </FormItem>

      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改角色信息"
      open={updateModalVisible}
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

export default UpdateRoleForm;
