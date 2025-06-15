import React, {useEffect} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {HomeAdvertiseListItem} from '../data.d';
import moment from "moment/moment";
import UploadFileComponents from "@/components/common/UploadFileComponents";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeAdvertiseListItem) => void;
  updateModalVisible: boolean;
  values: Partial<HomeAdvertiseListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateAdvertiseModal: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
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
        startTime: moment(values.startTime, 'YYYY-MM-DD HH:mm:ss'),
        endTime: moment(values.endTime, 'YYYY-MM-DD HH:mm:ss'),
      });
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({...item as HomeAdvertiseListItem});
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem name="name" label="广告名称" rules={[{required: true, message: '请输入广告名!'}]}>
          <Input id="update-name" placeholder={'请输入广告名'}/>
        </FormItem>
        <FormItem name="type" label="广告位置" rules={[{required: true, message: '请选择轮播位置!'}]}>
          <Radio.Group id="type">
            <Radio value={0}>PC首页轮播</Radio>
            <Radio value={1}>APP首页轮播</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name={'startTime'}
          label="开始时间"
          rules={[{required: true, message: '请输入开始时间!'}]}
        >
          <DatePicker showTime
                      placeholder={'请输入开始时间'}/>
        </FormItem>
        <FormItem
          name={'endTime'}
          label="结束时间"
          rules={[{required: true, message: '请输入结束时间!'}]}
        >
          <DatePicker showTime
                      placeholder={'请输入结束时间'}/>
        </FormItem>

        <FormItem
          name="status"
          label="上线/下线"
          rules={[{required: true}]}
        >
          <Radio.Group id="status">
            <Radio value={0}>下线</Radio>
            <Radio value={1}>上线</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="pic"
          label="广告图片"
          rules={[{required: true}]}
        >
          <UploadFileComponents
            backApi={'http://127.0.0.1:8000/api/sys/upload'} count={1}
            onSubmit={(url) => {
              form.setFieldValue("pic", url);
            }}
            defaultImageUrl={values.pic}/>
        </FormItem>
        <FormItem
          name="sort"
          label="广告排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber/>
        </FormItem>
        <FormItem name="url" label="链接" rules={[{required: true, message: '请输入链接!'}]}>
          <Input id="update-url" placeholder={'请输入链接'}/>
        </FormItem>
        <FormItem
          name="note"
          label="广告备注"
        >
          <Input.TextArea rows={2}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改广告信息"
      open={updateModalVisible}
      {...modalFooter}
      width={600}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateAdvertiseModal;
