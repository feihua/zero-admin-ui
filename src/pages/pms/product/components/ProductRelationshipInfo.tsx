import React, {useEffect, useState} from 'react';
import {Card, Col, message, Row, Transfer} from 'antd';
import type {PrefrenceAreaItem} from "@/pages/pms/product/data";
import {querySubject} from "@/pages/sms/home_recommend_subject/service";
import {queryPrefrenceArea} from "@/pages/pms/product/service";
import type {SubjectListItem} from "@/pages/sms/home_recommend_subject/data";
import type {ProductParams} from "@/pages/pms/product/data";

export interface BaseInfoProps {
  visible: boolean;
  onChangeProductParams: (value: ProductParams) => void;
  currentData?: ProductParams;
}

const ProductRelationshipInfo: React.FC<BaseInfoProps> = (props) => {

  interface RecordType {
    key: string;
    title: string;
    description: string;
  }

  const [subjectList, setSubjectList] = useState<RecordType[]>([]);
  const [prefrenceArea, setPrefrenceArea] = useState<RecordType[]>([]);

  const [subjectTargetKeys, setSubjectTargetKeys] = useState<string[]>([]);
  const [targetPrefrenceAreaKeys, setPrefrenceAreaTargetKeys] = useState<string[]>([]);

  useEffect(() => {
    if (props.visible) {
      querySubject({pageSize: 100, current: 1}).then((res) => {
        if (res.code === '000000') {
          setSubjectList(res.data.map((item: SubjectListItem) => ({
            key: item.id,
            title: item.title,
            description: item.description,
          })))
          // @ts-ignore
          setSubjectTargetKeys(props.currentData?.subjectProductRelationList || [])
        } else {
          message.error(res.msg);
        }

      });

      queryPrefrenceArea({pageSize: 100, current: 1}).then((res) => {
        if (res.code === '000000') {
          setPrefrenceArea(res.data.map((item: PrefrenceAreaItem) => ({
            key: item.id,
            title: item.name,
            description: item.subTitle,
          })))
          // @ts-ignore
          setPrefrenceAreaTargetKeys(props.currentData?.prefrenceAreaProductRelationList || [])
        } else {
          message.error(res.msg);
        }

      });

    }
  }, [props.visible]);

  const onChangeSubject = (nextTargetKeys: string[]) => {
    setSubjectTargetKeys(nextTargetKeys);
    console.log("onChangeSubject", nextTargetKeys)
    props.onChangeProductParams({subjectProductRelationList: nextTargetKeys.map(x => Number(x))})
  };


  const onChangePreferenceArea = (nextTargetKeys: string[]) => {
    props.onChangeProductParams({prefrenceAreaProductRelationList: nextTargetKeys.map(x => Number(x))})
    setPrefrenceAreaTargetKeys(nextTargetKeys);
  };


  const renderContext = {listStyle: {height: 300, width: 250}, showSearch: true, titles: ['待选择', '已选择']}

  return (
    <>
      <Row>
        <Col span={4}>关联专题</Col>
        <Col span={20}>
          <Card>
            <Transfer dataSource={subjectList} targetKeys={subjectTargetKeys} onChange={onChangeSubject} {...renderContext} render={item => item.title}/>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={4}>优选商品</Col>
        <Col span={20}>
          <Card>
            <Transfer dataSource={prefrenceArea} targetKeys={targetPrefrenceAreaKeys} onChange={onChangePreferenceArea} {...renderContext} render={item => item.title}/>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductRelationshipInfo;
