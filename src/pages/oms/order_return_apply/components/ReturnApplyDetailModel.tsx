import React, {useEffect} from 'react';
import {Card, Col, Form, Input, Modal, Row, Select} from 'antd';
import type {ReturnApplyListItem} from '../data.d';
import '../index.less'
import ReturnApplyProduct from "@/pages/oms/order_return_apply/components/ReturnApplyProduct";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: ReturnApplyListItem) => void;
  updateModalVisible: boolean;
  currentData: ReturnApplyListItem;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateReturnForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;

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
      onSubmit(values as ReturnApplyListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <ReturnApplyProduct currentData={currentData}/>
        <Card title="服务单信息">
          <Card type="inner">
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={18}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={18}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={18}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
          </Card>
          <Card style={{marginTop: 16}} type="inner">
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={18}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
          </Card>
          <Card style={{marginTop: 16}}>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
          </Card>
          <Card style={{marginTop: 16}} type="inner">
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>手机号码</Col>
            </Row>
            <Row>
              <Col span={6}>收货人</Col>
              <Col span={6}>18033441849</Col>
            </Row>
          </Card>
        </Card>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="退货信息"
      open={updateModalVisible}
      {...modalFooter}
      width={1200}
    >
      {renderContent()}
    </Modal>
  );
};

export default UpdateReturnForm;
