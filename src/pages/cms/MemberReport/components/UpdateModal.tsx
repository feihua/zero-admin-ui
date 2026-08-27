import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberReportListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberReportListItem) => void;
  open: boolean;
  currentData: Partial<MemberReportListItem>;
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
      onSubmit(values as MemberReportListItem);
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
          name="reportType"
          label="举报类型：0->商品评价；1->话题内容；2->用户评论"
          rules={[{required: true, message: '请输入举报类型：0->商品评价；1->话题内容；2->用户评论!'}]}
        >
            <Radio.Group>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>正常</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="reportMemberName"
          label="举报人"
          rules={[{required: true, message: '请输入举报人!'}]}
        >
            <Input id="update-reportMemberName" placeholder={'请输入举报人!'}/>
        </FormItem>
        <FormItem
          name="reportObject"
          label="被举报对象"
          rules={[{required: true, message: '请输入被举报对象!'}]}
        >
            <Input id="update-reportObject" placeholder={'请输入被举报对象!'}/>
        </FormItem>
        <FormItem
          name="reportStatus"
          label="举报状态：0->未处理；1->已处理"
          rules={[{required: true, message: '请输入举报状态：0->未处理；1->已处理!'}]}
        >
            <Radio.Group>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>正常</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="handleStatus"
          label="处理结果：0->无效；1->有效；2->恶意"
          rules={[{required: true, message: '请输入处理结果：0->无效；1->有效；2->恶意!'}]}
        >
            <Radio.Group>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>正常</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="note"
          label="备注"
          rules={[{required: true, message: '请输入备注!'}]}
        >
            <Input id="update-note" placeholder={'请输入备注!'}/>
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
