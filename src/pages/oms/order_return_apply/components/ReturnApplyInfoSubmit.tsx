import React, {useState} from 'react';
import {Button, Col, Divider, Input, Modal, Row} from 'antd';
import type {ReturnApplyListItem} from '../data.d';
import '../index.less'
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";

const {confirm} = Modal;

export interface ReturnApplyProductProps {
  currentData: ReturnApplyListItem;
  onSubmit: (values: ReturnApplyListItem) => void;
}

const ReturnApplyInfo: React.FC<ReturnApplyProductProps> = (props) => {
  const [remark, setRemark] = useState<string>("");
  const item = props.currentData

  const handleReturnApply = (title: string, status: number) => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled/>,
      content: '确认后,不能再修改',
      onOk() {
        props.onSubmit({id: item.id, handleNote: remark, status: status})
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
        <Col span={6} className={"Col"}>处理备注</Col>
        <Col span={10} className={"Col"}><Input.TextArea rows={2} placeholder={'请输入处理备注'} onChange={onChange}/></Col>
        <Col span={8} className={"Col"} style={{marginTop: 10}}>
          <Button type="primary" icon={<EditOutlined/>} onClick={() => handleReturnApply("确认退货", 1)}>确认退货</Button>
          <Divider type="vertical"/>
          <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => handleReturnApply("拒绝退货", 3)}>拒绝退货</Button>
        </Col>
      </Row>
    </>
  );
};

export default ReturnApplyInfo;
