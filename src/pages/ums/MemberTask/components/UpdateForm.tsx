import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberTaskListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberTaskListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberTaskListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
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
      onSubmit(values as MemberTaskListItem);
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
          name="createBy"
          label="创建者"
          rules={[{required: true, message: '请输入创建者!'}]}
        >
            <Input id="create-createBy" placeholder={'请输入创建者!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="create-createTime" placeholder={'请输入创建时间!'}/>
         </FormItem>
        <FormItem
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
            <Input id="create-id" placeholder={'请输入!'}/>
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
          name="taskGrowth"
          label="赠送成长值"
          rules={[{required: true, message: '请输入赠送成长值!'}]}
        >
            <Input id="create-taskGrowth" placeholder={'请输入赠送成长值!'}/>
         </FormItem>
        <FormItem
          name="taskIntegral"
          label="赠送积分"
          rules={[{required: true, message: '请输入赠送积分!'}]}
        >
            <Input id="create-taskIntegral" placeholder={'请输入赠送积分!'}/>
         </FormItem>
        <FormItem
          name="taskName"
          label="任务名称"
          rules={[{required: true, message: '请输入任务名称!'}]}
        >
            <Input id="create-taskName" placeholder={'请输入任务名称!'}/>
         </FormItem>
        <FormItem
          name="taskType"
          label="任务类型：0->新手任务；1->日常任务"
          rules={[{required: true, message: '请输入任务类型：0->新手任务；1->日常任务!'}]}
        >
            <Input id="create-taskType" placeholder={'请输入任务类型：0->新手任务；1->日常任务!'}/>
         </FormItem>
        <FormItem
          name="updateBy"
          label="更新者"
          rules={[{required: true, message: '请输入更新者!'}]}
        >
            <Input id="create-updateBy" placeholder={'请输入更新者!'}/>
         </FormItem>
        <FormItem
          name="updateTime"
          label="更新时间"
          rules={[{required: true, message: '请输入更新时间!'}]}
        >
            <Input id="create-updateTime" placeholder={'请输入更新时间!'}/>
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

export default UpdateForm;
