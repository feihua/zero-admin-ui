import React, {useState} from 'react';
import {Button, Col, Input, Modal, Row} from 'antd';
import {EditOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import type {OrderListItem} from "@/pages/oms/order/data";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: OrderListItem) => void;
  closeOrderModelVisible: boolean;
  currentData: OrderListItem;
}

const {confirm} = Modal;

const NoteOrderModel: React.FC<UpdateFormProps> = (props) => {

  const {
    onSubmit,
    onCancel,
    closeOrderModelVisible,
  } = props;

  const [remark, setRemark] = useState<string>("");

  const handleReturnApply = (title: string) => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled/>,
      content: '确认后,不能再支付了',
      onOk() {

        onSubmit({note: remark, id: props.currentData.id})

      },
      onCancel() {
      },
    });
  };

  const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setRemark(e.target.value)
  };

  const renderContent = () => {
    return (
      <>
        <Row>
          <Col span={5} className={"Col"}>操作备注：</Col>
          <Col span={19} className={"Col"}><Input.TextArea rows={4} placeholder={'操作备注'} onChange={onChange}/></Col>
        </Row>
        <Row style={{marginTop: 30, marginBottom: 30}}>
          <Col span={10} className={"Col"}></Col>
          <Col span={14} className={"Col"}>
            <Button type="primary" icon={<EditOutlined/>} onClick={() => handleReturnApply("关闭订单")}
            >
              关闭订单
            </Button></Col>
        </Row>
      </>
    );
  };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="关闭订单"
      open={closeOrderModelVisible}
      onCancel={onCancel}
      footer={false}
    >
      {renderContent()}
    </Modal>
  );
};

export default NoteOrderModel;
