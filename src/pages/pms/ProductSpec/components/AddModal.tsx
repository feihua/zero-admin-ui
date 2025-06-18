import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message, Modal, Radio, TreeSelect } from 'antd';
import type { ProductSpecListItem} from '../data.d';
import { queryProductCategoryList } from '@/pages/pms/ProductCategory/service';
import { tree } from '@/utils/utils';
import { ProductCategoryListItem } from '@/pages/pms/ProductCategory/data';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductSpecListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();
  const [categoryListItem, setCategoryListItem] = useState<ProductCategoryListItem[]>([]);
  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

  useEffect(() => {
    if (form && !addVisible) {
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
  }, [props.addVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: ProductSpecListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

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
