import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { SubjectListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: SubjectListItem) => void;
  open: boolean;
  currentData: Partial<SubjectListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    open,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !open) {
      form.resetFields();
    }
  }, [props.open]);

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
      onSubmit(values as SubjectListItem);
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
          label="专题分类id"
          rules={[{required: true, message: '请输入专题分类id!'}]}
        >
            <Input id="update-categoryId" placeholder={'请输入专题分类id!'}/>
        </FormItem>
        <FormItem
          name="title"
          label="专题标题"
          rules={[{required: true, message: '请输入专题标题!'}]}
        >
            <Input id="update-title" placeholder={'请输入专题标题!'}/>
        </FormItem>
        <FormItem
          name="pic"
          label="专题主图"
          rules={[{required: true, message: '请输入专题主图!'}]}
        >
            <Input id="update-pic" placeholder={'请输入专题主图!'}/>
        </FormItem>
        <FormItem
          name="productCount"
          label="关联产品数量"
          rules={[{required: true, message: '请输入关联产品数量!'}]}
        >
            <Input id="update-productCount" placeholder={'请输入关联产品数量!'}/>
        </FormItem>
        <FormItem
          name="recommendStatus"
          label="推荐状态：0->不推荐；1->推荐"
          rules={[{required: true, message: '请输入推荐状态：0->不推荐；1->推荐!'}]}
        >
            <Radio.Group>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>正常</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="collectCount"
          label="收藏数"
          rules={[{required: true, message: '请输入收藏数!'}]}
        >
            <Input id="update-collectCount" placeholder={'请输入收藏数!'}/>
        </FormItem>
        <FormItem
          name="readCount"
          label="阅读数"
          rules={[{required: true, message: '请输入阅读数!'}]}
        >
            <Input id="update-readCount" placeholder={'请输入阅读数!'}/>
        </FormItem>
        <FormItem
          name="commentCount"
          label="评论数"
          rules={[{required: true, message: '请输入评论数!'}]}
        >
            <Input id="update-commentCount" placeholder={'请输入评论数!'}/>
        </FormItem>
        <FormItem
          name="albumPics"
          label="画册图片用逗号分割"
          rules={[{required: true, message: '请输入画册图片用逗号分割!'}]}
        >
            <Input id="update-albumPics" placeholder={'请输入画册图片用逗号分割!'}/>
        </FormItem>
        <FormItem
          name="description"
          label="专题内容"
          rules={[{required: true, message: '请输入专题内容!'}]}
        >
            <Input id="update-description" placeholder={'请输入专题内容!'}/>
        </FormItem>
        <FormItem
          name="showStatus"
          label="显示状态：0->不显示；1->显示"
          rules={[{required: true, message: '请输入显示状态：0->不显示；1->显示!'}]}
        >
            <Radio.Group>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>正常</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="content"
          label="专题内容"
          rules={[{required: true, message: '请输入专题内容!'}]}
        >
            <Input id="update-content" placeholder={'请输入专题内容!'}/>
        </FormItem>
        <FormItem
          name="forwardCount"
          label="转发数"
          rules={[{required: true, message: '请输入转发数!'}]}
        >
            <Input id="update-forwardCount" placeholder={'请输入转发数!'}/>
        </FormItem>
        <FormItem
          name="categoryName"
          label="专题分类名称"
          rules={[{required: true, message: '请输入专题分类名称!'}]}
        >
            <Input id="update-categoryName" placeholder={'请输入专题分类名称!'}/>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={{width: 255}}/>
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
      open={open}
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
