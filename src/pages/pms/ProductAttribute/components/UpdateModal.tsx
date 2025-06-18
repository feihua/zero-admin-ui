import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { ProductAttributeListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductAttributeListItem) => void;
  updateVisible: boolean;
  currentData: Partial<ProductAttributeListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateVisible) {
      form.resetFields();
    }
  }, [props.updateVisible]);

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
      onSubmit(values as ProductAttributeListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id"/>
        </FormItem>

        
        <FormItem
          name="id"
          label="主键id"
          rules={[{required: true, message: '请输入主键id!'}]}
        >
            <Input id="update-id" placeholder={'请输入主键id!'}/>
         </FormItem>
        <FormItem
          name="groupId"
          label="属性分组ID"
          rules={[{required: true, message: '请输入属性分组ID!'}]}
        >
            <Input id="update-groupId" placeholder={'请输入属性分组ID!'}/>
         </FormItem>
        <FormItem
          name="name"
          label="属性名称"
          rules={[{required: true, message: '请输入属性名称!'}]}
        >
            <Input id="update-name" placeholder={'请输入属性名称!'}/>
         </FormItem>
        <FormItem
          name="inputType"
          label="输入类型：1-手动输入，2-单选，3-多选"
          rules={[{required: true, message: '请输入输入类型：1-手动输入，2-单选，3-多选!'}]}
        >
                <Radio.Group>
                  <Radio value={0}>禁用</Radio>
                  <Radio value={1}>正常</Radio>
                </Radio.Group>
         </FormItem>
        <FormItem
          name="valueType"
          label="值类型：1-文本，2-数字，3-日期"
          rules={[{required: true, message: '请输入值类型：1-文本，2-数字，3-日期!'}]}
        >
                <Radio.Group>
                  <Radio value={0}>禁用</Radio>
                  <Radio value={1}>正常</Radio>
                </Radio.Group>
         </FormItem>
        <FormItem
          name="inputList"
          label="可选值列表，用逗号分隔"
          rules={[{required: true, message: '请输入可选值列表，用逗号分隔!'}]}
        >
            <Input id="update-inputList" placeholder={'请输入可选值列表，用逗号分隔!'}/>
         </FormItem>
        <FormItem
          name="unit"
          label="单位"
          rules={[{required: true, message: '请输入单位!'}]}
        >
            <Input id="update-unit" placeholder={'请输入单位!'}/>
         </FormItem>
        <FormItem
          name="isRequired"
          label="是否必填"
          rules={[{required: true, message: '请输入是否必填!'}]}
        >
            <Input id="update-isRequired" placeholder={'请输入是否必填!'}/>
         </FormItem>
        <FormItem
          name="isSearchable"
          label="是否支持搜索"
          rules={[{required: true, message: '请输入是否支持搜索!'}]}
        >
            <Input id="update-isSearchable" placeholder={'请输入是否支持搜索!'}/>
         </FormItem>
        <FormItem
          name="isShow"
          label="是否显示"
          rules={[{required: true, message: '请输入是否显示!'}]}
        >
            <Input id="update-isShow" placeholder={'请输入是否显示!'}/>
         </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="status"
          label="状态：0->禁用；1->启用"
          rules={[{required: true, message: '请输入状态：0->禁用；1->启用!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
        </FormItem>
        <FormItem
          name="createBy"
          label="创建人ID"
          rules={[{required: true, message: '请输入创建人ID!'}]}
        >
            <Input id="update-createBy" placeholder={'请输入创建人ID!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="update-createTime" placeholder={'请输入创建时间!'}/>
         </FormItem>
        <FormItem
          name="updateBy"
          label="更新人ID"
          rules={[{required: true, message: '请输入更新人ID!'}]}
        >
            <Input id="update-updateBy" placeholder={'请输入更新人ID!'}/>
         </FormItem>
        <FormItem
          name="updateTime"
          label="更新时间"
          rules={[{required: true, message: '请输入更新时间!'}]}
        >
            <Input id="update-updateTime" placeholder={'请输入更新时间!'}/>
         </FormItem>
        <FormItem
          name="isDeleted"
          label="是否删除"
          rules={[{required: true, message: '请输入是否删除!'}]}
        >
            <Input id="update-isDeleted" placeholder={'请输入是否删除!'}/>
         </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="编辑"
      open={updateVisible}
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

export default UpdateModal;
