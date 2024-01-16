import {Card, Col, Row, Statistic, Typography} from 'antd';
import ReactEcharts from 'echarts-for-react';
// import { useState } from "react";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {PageContainer} from '@ant-design/pro-layout';
const { Link } = Typography;

const Welcome: React.FC = () => {
  // const [sales, setSales] = useState<number[]>([5, 20, 36, 10, 10, 20]);
  // const [inventorys, setInventorys] = useState<number[]>([15, 30, 46, 20, 20, 40]);
  const sales = [5, 20, 36, 10, 10, 20];
  const inventorys = [15, 30, 46, 20, 20, 40];

  const getOption = () => {
    return {
      title: {
        text: '销量与库存',
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: sales,
        },
        {
          name: '库存',
          type: 'bar',
          data: inventorys,
        },
      ],
    };
  };

  const getOption2 = () => {
    return {
      title: {
        text: '用户访问来源',
        subtext: '纯属虚构',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  };

  const getOption3 = () => {
    return {
      title: {
        text: '销量与库存',
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: '库存',
          type: 'line',
          data: [15, 30, 46, 20, 20, 40],
        },
      ],
    };
  };
  return (
    <PageContainer>
      <Row gutter={8}>
        <Col span={6}>
          <span
            onClick={() => {
              window.open('https://github.com/feihua/zero-admin');
            }}
          >
          <Card bordered={false} hoverable title={"zero-admin"} style={{height: 200}}>
            Zero-Admin是一套基于go-zero框架实现的电商系统，包括前台商城系统和后台管理系统，提供了完整的电商解决方案。
            <br/>
            <Link>
                 zero-admin github 地址
             </Link>
          </Card>
          </span>
        </Col>
        <Col span={6} style={{height: 200}}>
          <span
            onClick={() => {
              window.open('https://github.com/feihua/zero-admin-ui');
            }}
          >
            <Card bordered={false} hoverable title={"zero-admin-ui"} style={{height: 200}}>
              Zero-Admin-UI是一个基于React实现的电商后台管理系统的前端项目，为管理者提供了便捷高效的操作界面。
              <br/>
              <br/>
            <Link>
                 zero-admin-ui github 地址
             </Link>
            </Card>
          </span>
        </Col>
        <Col span={6}>
          <span
            onClick={() => {
              window.open('https://github.com/feihua/flutter_mall');
            }}
          >
            <Card bordered={false} hoverable title={"flutter_mall"} style={{height: 200}}>
              Flutter Mall是一个基于Flutter框架实现的电商系统移动端项目，旨在提供全面的购物体验。
              <br/>
              <br/>
            <Link>
                 flutter_mall github 地址
             </Link>
            </Card>
          </span>
        </Col>
        <Col span={6}>
          <span
            onClick={() => {
              window.open('https://feihua.github.io');
            }}
          >
            <Card bordered={false} hoverable title={"项目文档"} style={{height: 200}}>
              基于vuepress和markdown编写的项目文档
              <br/>
              <br/>
              <br/>
            <Link>
                 文档地址
             </Link>
            </Card>
            </span>
        </Col>
      </Row>
      <Row gutter={8} style={{marginTop: 10}}>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="总销售额"
              value={126560}
              precision={2}
              valueStyle={{color: '#cf1322'}}
              suffix={<ArrowUpOutlined/>}
              prefix="￥"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="访问量"
              value={8846}
              precision={2}
              valueStyle={{color: '#3f8600'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="支付笔数"
              value={6560}
              precision={2}
              valueStyle={{color: '#3f8600'}}
              suffix={<ArrowDownOutlined/>}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="运营活动效果"
              value={9.3}
              precision={2}
              valueStyle={{color: '#cf1322'}}
              prefix={<ArrowDownOutlined/>}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={8} style={{marginTop: 10}}>
        <Col span={12}>
          <Card bordered={false} hoverable>
            <ReactEcharts option={getOption()} style={{height: 280}}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} hoverable>
            <ReactEcharts option={getOption2()} style={{height: 280}}/>
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Col span={24}>
          <Card bordered={false} hoverable>
            <ReactEcharts option={getOption3()} style={{height: 280}}/>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
