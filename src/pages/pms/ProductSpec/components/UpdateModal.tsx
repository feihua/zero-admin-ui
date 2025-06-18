import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message, Modal, Radio, TreeSelect } from 'antd';
import type { ProductSpecListItem} from '../data.d';
import { queryProductCategoryList } from '@/pages/pms/ProductCategory/service';
import { tree } from '@/utils/utils';
import { ProductCategoryListItem } from '@/pages/pms/ProductCategory/data';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductSpecListItem) => void;
  updateVisible: boolean;
  currentData: Partial<ProductSpecListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const [form] = Form.useForm();
  const [categoryListItem, setCategoryListItem] = useState<ProductCategoryListItem[]>([]);
  const {
    onSubmit,
    onCancel,
    updateVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateVisible) {
      form.resetFields();
    }else {
      queryProductCategoryList({}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; name: any; title: any; parentId: any }) => ({
            value: item.id,
            id: item.id,
            label: item.name,
            title: item.name,
            parentId: item.parentId,
          }));

          setCategoryListItem(tree(map, 0, 'parentId'));
        } else {
          message.error(res.msg);
        }
      });
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
      onSubmit(values as ProductSpecListItem);
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
          name="categoryId"
          label="商品分类"
          rules={[{required: true, message: '请选择商品分类!'}]}
        >
          <TreeSelect
            style={{width: '100%'}}
            treeData={categoryListItem}
            placeholder="请选择商品分类"
            treeDefaultExpandAll
          />
        </FormItem>
        <FormItem
          name="name"
          label="规格名称"
          rules={[{required: true, message: '请输入规格名称!'}]}
        >
          <Input id="create-name" placeholder={'请输入规格名称!'}/>
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
          label="状态"
          rules={[{required: true, message: '请输入状态：0->禁用；1->启用!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
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
