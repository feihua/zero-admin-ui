import React, {useEffect, useState} from 'react';
import {Card, Col, message, Row, Transfer} from 'antd';
import type {TransferDirection} from "antd/es/transfer";
import type {PrefrenceAreaItem} from "@/pages/pms/product/data";
import {querySubject} from "@/pages/sms/home_recommend_subject/service";
import {queryPrefrenceArea} from "@/pages/pms/product/service";
import type {SubjectListItem} from "@/pages/sms/home_recommend_subject/data";

export interface BaseInfoProps {
  visible: boolean;
}

const ProductRelationshipInfo: React.FC<BaseInfoProps> = (props) => {

  interface RecordType {
    key: string;
    title: string;
    description: string;
  }

  const [subjectListItem, setSubjectListItem] = useState<RecordType[]>([]);
  const [prefrenceAreaItem, setPrefrenceAreaItem] = useState<RecordType[]>([]);

  useEffect(() => {
    if (props.visible) {
      querySubject({pageSize: 100, current: 1}).then((res) => {
        if (res.code === '000000') {
          setSubjectListItem(res.data.map((item: SubjectListItem) => ({
            key: item.id,
            title: item.title,
            description: item.description,
          })))
        } else {
          message.error(res.msg);
        }

      });

      queryPrefrenceArea({pageSize: 100, current: 1}).then((res) => {
        if (res.code === '000000') {
          setPrefrenceAreaItem(res.data.map((item: PrefrenceAreaItem) => ({
            key: item.id,
            title: item.name,
            description: item.subTitle,
          })))
        } else {
          message.error(res.msg);
        }

      });

    }
  }, [props.visible]);


  // const mockData: RecordType[] = Array.from({length: 20}).map((_, i) => ({
  //   key: i.toString(),
  //   title: `content${i + 1}`,
  //   description: `description of content${i + 1}`,
  // }));

  // const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

  const [subjectTargetKeys, setSubjectTargetKeys] = useState<string[]>([]);
  const [selectedSubjectKeys, setSelectedSubjectKeys] = useState<string[]>([]);

  const [targetPrefrenceAreaKeys, setPrefrenceAreaTargetKeys] = useState<string[]>([]);
  const [selectedPrefrenceAreaKeys, setSelectedPrefrenceAreaKeys] = useState<string[]>([]);

  const onChangeSubject = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setSubjectTargetKeys(nextTargetKeys);
  };

  const onSelectChangeSubject = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedSubjectKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScrollSubject = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };


  const onChangePrefrenceArea = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setPrefrenceAreaTargetKeys(nextTargetKeys);
  };

  const onSelectChangePrefrenceArea = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedPrefrenceAreaKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScrollPrefrenceArea = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  return (
    <>
      <Row>
        <Col span={4}>关联专题</Col>
        <Col span={20}><Card>
          <Transfer
            dataSource={subjectListItem}
            titles={['待选择', '已选择']}
            targetKeys={subjectTargetKeys}
            selectedKeys={selectedSubjectKeys}
            onChange={onChangeSubject}
            onSelectChange={onSelectChangeSubject}
            onScroll={onScrollSubject}
            render={(item) => item.title}
            listStyle={{
              height: 300,
              width: 250,
            }}
            showSearch
          />
        </Card></Col>
      </Row>

      <Row>
        <Col span={4}>优选商品</Col>
        <Col span={20}><Card>
          <Transfer
            dataSource={prefrenceAreaItem}
            titles={['待选择', '已选择']}
            targetKeys={targetPrefrenceAreaKeys}
            selectedKeys={selectedPrefrenceAreaKeys}
            onChange={onChangePrefrenceArea}
            onSelectChange={onSelectChangePrefrenceArea}
            onScroll={onScrollPrefrenceArea}
            render={(item) => item.title}
            listStyle={{
              height: 300,
              width: 250,
            }}
            showSearch
          />
        </Card></Col>
      </Row>
    </>
  );
};

export default ProductRelationshipInfo;
