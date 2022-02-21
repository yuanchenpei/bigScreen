import styles from './index.less';
import CustomerTable from '../components/CustomerTable/index';
import BusinessData from '../components/BusinessData/index';
import Blockchain from '../components/Blockchain/index';
import RankingBar from '@/pages/components/Charts/RankingBar';
import UserPieChart from '@/pages/components/Charts/UserPieChart';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { request } from 'umi';

import { ranking, warningList, orderList, userPieData } from '@/assets/mockJSON';

const basicInfo = [
  {
    title: '融资单号',
    dataIndex: 'order',
    key: 'order',
    width: 98,
    ellipsis: true,
  },
  {
    title: '剩余期限(天)',
    dataIndex: 'remainingTime',
    key: 'remainingTime',
    width: 98,
    ellipsis: true,
  },
  {
    title: '信贷客户',
    dataIndex: 'customer',
    key: 'customer',
    width: 98,
    ellipsis: true,
  },
  {
    title: '金融机构',
    dataIndex: 'financial',
    key: 'financial',
    width: 98,
    ellipsis: true,
  },
];
const basicInfo2 = [
  {
    title: '融资单号',
    dataIndex: 'order',
    key: 'order',
    width: 98,
    ellipsis: true,
  },
  {
    title: '融资期限(天)',
    dataIndex: 'remainingTime',
    key: 'remainingTime',
    width: 98,
    ellipsis: true,
  },
  {
    title: '信贷客户',
    dataIndex: 'customer',
    key: 'customer',
    width: 98,
    ellipsis: true,
  },
  {
    title: '金融机构',
    dataIndex: 'financial',
    key: 'financial',
    width: 98,
    ellipsis: true,
  },
];
const earlyWarningColumns = [
  {
    title: '融资金额(万元)',
    dataIndex: 'amount',
    key: 'amount',
    width: 108,
    ellipsis: true,
  },
  {
    title: '币种',
    dataIndex: 'currency',
    key: 'currency',
    width: 88,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 98,
    ellipsis: true,
  },
  {
    title: '通知时间',
    dataIndex: 'notificationTime',
    key: 'notificationTime',
    width: 98,
  },
];
const completedOrderColumns = [
  {
    title: '融资金额(万元)',
    dataIndex: 'amount',
    key: 'amount',
    width: 108,
    ellipsis: true,
  },
  {
    title: '币种',
    dataIndex: 'currency',
    key: 'currency',
    width: 88,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 98,
    ellipsis: true,
  },
  {
    title: '还款状态',
    dataIndex: 'repaymentStatus',
    key: 'repaymentStatus',
    width: 98,
    render(text, record, index) {
      if (text === 1) {
        return <span style={{ color: 'green' }}>正常</span>;
      } else {
        return <span style={{ color: 'red' }}>逾期</span>;
      }
    },
  },
];

export default function IndexPage() {
  const [monthRanking, setMonthRanking] = useState(ranking.monthRanking || []);
  const [quarterlyRanking, setQuarterlyRanking] = useState(ranking.quarterlyRanking || []);
  const [userPie, setUserPie] = useState(userPieData || []);
  const [earlyWarningList, setEarlyWarningList] = useState(warningList || []);
  const [completedOrder, setCompletedOrder] = useState(orderList || []);

  async function getEarlyWarning() {
    const res = await request('/api/earlyWarning', {
      method: 'get',
    });
    setEarlyWarningList(res.warningList);
  }

  async function getCompletedOrder() {
    const res = await request('/api/completedOrder', {
      method: 'get',
    });
    setCompletedOrder(res.orderList);
  }

  async function getRankingData() {
    const res = await request('/api/ranking', {
      method: 'get',
    });
    setMonthRanking(res.monthRanking);
    setQuarterlyRanking(res.quarterlyRanking);
  }

  // useEffect(() => {
  //   getEarlyWarning().then();
  //   getCompletedOrder().then();
  //   getRankingData().then();
  // }, []);

  return (
    <div className={styles.warpBG}>
      <div className={styles.warpBorder}>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <div className={styles.contentLeftTop}>
              <CustomerTable
                tableTitle={'即将到期融资预警'}
                idName={'expiring'}
                key={'expiring'}
                dataSource={earlyWarningList}
                columns1={basicInfo}
                columns2={earlyWarningColumns}
              />
            </div>
            <div className={styles.contentLeftBottom}>
              <CustomerTable
                tableTitle={'本月已完成融资订单'}
                key={'completed'}
                idName={'completed'}
                dataSource={completedOrder}
                columns1={basicInfo2}
                columns2={completedOrderColumns}
              />
            </div>

          </div>
          <div className={styles.contentMiddle}>
            <div className={styles.contentMiddleTop}>
              <BusinessData />
            </div>
            <div className={styles.contentMiddleBottom}>
              <Blockchain />
            </div>
          </div>
          <div className={styles.contentRight}>
            <div className={styles.contentRightTop}>
              <Carousel autoplay autoplaySpeed={10000} infinite={true} initialSlide={0} lazyLoad={'progressive'}>
                <div className={styles.contentRightTopInner}>
                  <div className={styles.rankingTitle}>
                    <span>金融机构放款金额排行</span>
                    <span>月</span>
                  </div>
                  <div className={styles.rankingBar}>
                    <RankingBar data={monthRanking} />
                  </div>
                </div>
                <div className={styles.contentRightTopInner}>
                  <div className={styles.rankingTitle}>
                    <span>金融机构放款金额排行</span>
                    <span>季度</span>
                  </div>
                  <div className={styles.rankingBar}>
                    <RankingBar data={quarterlyRanking} />
                  </div>
                </div>
              </Carousel>
            </div>
            <div className={styles.contentRightBottom}>
              <div className={styles.userPieTitle}>
                <span>平台用户数：</span>
                <span className={styles.titleNum}>{2985}</span>
              </div>
              <div className={styles.userPieChart}>
                <UserPieChart data={userPie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
