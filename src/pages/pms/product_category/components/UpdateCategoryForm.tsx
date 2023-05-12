import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Select} from 'antd';
import {CategoryListItem} from '../data.d';
import {queryCategory} from "@/pages/pms/product_category/service";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: CategoryListItem) => void;
  updateModalVisible: boolean;
  values: Partial<CategoryListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateCategoryForm: React.FC<UpdateFormProps> = (props) => {
  const [parentIdMap, setParentIdMap] = useState([]);

  const [form] = Form.useForm();
  const {Option} = Select;

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
      queryCategory({parentId: 0}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; name: any; }) => ({
            value: item.id,
            label: item.name,
          }));
          map.unshift({
            value: 0,
            label: '无上级分类',
          })
          setParentIdMap(map);
        } else {
          message.error(res.msg);
        }
      });
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(item as CategoryListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem name="productCount" label="产品数量" hidden>
          <Input id="update-productCount" placeholder={'请输入产品数量'}/>
        </FormItem>
        <FormItem name="name" label="分类名称" rules={[{required: true, message: '请输入分类名称!'}]}>
          <Input id="update-name" placeholder={'请输入分类名称'}/>
        </FormItem>
        <FormItem
          name="parentId"
          label="上级"
          initialValue={0}
          rules={[{required: true, message: '请输入上级!'}]}
        >
          <Select id="parentId" options={parentIdMap}>
          </Select>
        </FormItem>
        <FormItem name="icon" label="图标" rules={[{required: true, message: '请输入图标!'}]}>
          <Input id="update-icon" placeholder={'请输入图标'}/>
        </FormItem>
        <FormItem name="level" label="分类级别" rules={[{required: true, message: '请输入品牌名!'}]}>
          <Select id="level" placeholder={'请选择分类级别'}>
            <Option value={0}>一级</Option>
            <Option value={1}>二级</Option>
          </Select>
        </FormItem>
        <FormItem name="productUnit" label="产品单位" rules={[{required: true, message: '请输入产品单位!'}]}>
          <Input id="update-productUnit" placeholder={'请输入产品单位'}/>
        </FormItem>
        <FormItem name="navStatus" label="是否显示在导航栏" rules={[{required: true, message: '请选择是否显示在导航栏!'}]}>
          <Select id="navStatus" placeholder={'请选择是否显示在导航栏'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>
        <FormItem name="showStatus" label="显示状态" rules={[{required: true, message: '请选择显示状态!'}]}>
          <Select id="showStatus" placeholder={'请选择显示状态'}>
            <Option value={0}>否</Option>
            <Option value={1}>是</Option>
          </Select>
        </FormItem>
        <FormItem name="sort" label="排序" rules={[{required: true, message: '请输入排序!'}]}>
          <InputNumber/>
        </FormItem>
        <FormItem name="keywords" label="关键字">
          <Input id="update-keywords" placeholder={'请输入关键字'}/>
        </FormItem>
        <FormItem name="description" label="描述">
          <Input.TextArea rows={2} id="update-description" placeholder={'请输入描述'}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改商品分类"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateCategoryForm;
