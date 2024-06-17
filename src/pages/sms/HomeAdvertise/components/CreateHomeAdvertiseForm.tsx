import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {HomeAdvertiseListItem} from '../data.d';
import UploadFileComponents from "@/components/common/UploadFileComponents";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeAdvertiseListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateHomeAdvertiseForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: HomeAdvertiseListItem) => {
    if (onSubmit) {
      onSubmit({...values, pic: imageUrl});
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="广告名称" rules={[{required: true, message: '请输入广告名!'}]}>
          <Input id="update-name" placeholder={'请输入广告名'}/>
        </FormItem>
        <FormItem name="type" label="广告位置" initialValue={0} rules={[{required: true, message: '请选择轮播位置!'}]}>
          <Radio.Group id="type">
            <Radio value={0}>PC首页轮播</Radio>
            <Radio value={1}>APP首页轮播</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="startTime" label="开始日期" rules={[{required: true, message: '请输入开始日期!'}]}>
          <DatePicker showTime placeholder={'请输入开始日期'}/>
        </FormItem>
        <FormItem name="endTime" label="结束日期" rules={[{required: true, message: '请输入结束日期!'}]}>
          <DatePicker showTime placeholder={'请输入结束日期'}/>
        </FormItem>

        <FormItem
          name="status"
          label="上线/下线"
          initialValue={1}
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
            backApi={'http://127.0.0.1:8000/api/sys/upload'}
            count={1}
            onSubmit={(url) => {
              setImageUrl(url)
            }}/>
        </FormItem>
        <FormItem
          name="sort"
          label="广告排序"
          initialValue={1}
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber/>
        </FormItem>
        <FormItem name="url" label="广告链接"
                  initialValue={"https://www.baidu.com"}
                  rules={[{required: true, message: '请输入链接!'}]}>
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
      title="新建广告信息"
      open={createModalVisible}
      {...modalFooter}
      width={600}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateHomeAdvertiseForm;
