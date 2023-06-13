import React, {useState} from 'react';
import {Button, Col, Input, Modal, Row} from 'antd';
import type {ReturnApplyListItem} from '../data.d';
import '../index.less'
import {EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";

const {confirm} = Modal;

export interface ReturnApplyProductProps {
  currentData: ReturnApplyListItem;
  onSubmit: (values: ReturnApplyListItem) => void;
}

const ReturnApplyHandler: React.FC<ReturnApplyProductProps> = (props) => {
  const [remark, setRemark] = useState<string>("");
  const item = props.currentData

  const handleReturnApply = (title: string) => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled/>,
      content: '确认后,不能再修改',
      onOk() {
        props.onSubmit({id: item.id, receiveNote: remark, status: 2})

      },
      onCancel() {
      },
    });
  };

  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setRemark(e.target.value)
  };

  return (
    <>
      <Row>
        <Col span={6} className={"Col"}>收货备注</Col>
        <Col span={12} className={"Col"}><Input.TextArea rows={2} placeholder={'收货备注'} onChange={onChange}/></Col>
        <Col span={6} className={"Col"} style={{marginTop: 10}}>
          <Button type="primary" icon={<EditOutlined/>} onClick={() => handleReturnApply("确认收货")}
          >
            确认收货
          </Button></Col>
      </Row>

    </>
  );
};

export default ReturnApplyHandler;
