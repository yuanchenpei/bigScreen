import React, { useEffect, useState } from 'react';
import styles from './index.less';
import ShadowLineChart from '../Charts/ShadowLineChart';
import ScrollTable from '@/pages/components/ScrollTable/index';
import { Spin } from 'antd';
import { request } from 'umi';

const Index = (props: any) => {
  const [blockchainInfo, setBlockchainInfo] = useState({});
  const [blockchainList, setBlockchainList] = useState([]);
  const [statisticInfo, setStatisticInfo] = useState([]);


  function getBlockchainInfo() {
    request('https://explorer.sfzito.com/api/v1/home', {
      method: 'get',
    }).then(infoRes => {
      setBlockchainInfo(infoRes.data);
    });
  }

  function getStatisticInfo() {
    request('https://explorer.sfzito.com/api/v1/statisticinfo', {
      method: 'get',
    }).then(statisticRes => {
      setStatisticInfo(statisticRes.data?.txCountStatisticInfo);
    });
  }

  function getBlockchainList() {
    return request('https://explorer.sfzito.com/api/v1/account/actions', {
      method: 'get',
      params: {
        account: 'evidence',
        skip: 0,
        limit: 20,
      },
    }).then(listRes => {
      setBlockchainList(listRes.data.actions);
    });
  }


  useEffect(() => {
    getBlockchainInfo();
    getStatisticInfo();
    getBlockchainList();
  }, []);

  useEffect(() => {
    const taskTimer = setInterval(() => {
      getBlockchainInfo();
    }, 7000);
    return () => {
      clearInterval(taskTimer);
    };
  }, []);

  return (
    <div className={styles.blockchainWarp}>
      <div className={styles.titleBox}>
        <Title1>区块链存证</Title1>
        <Title2 titleText={'存证数量：'} value={blockchainInfo.txCount} />
        <Title2 titleText={'区块高度：'} value={blockchainInfo.latestBlockHeight} />
      </div>
      <div className={styles.chartAndTable}>
        <div className={styles.lineChart}>
          <ShadowLineChart data={statisticInfo} />
        </div>

        <div className={styles.scrollTable}>
          <ScrollTable dataSource={blockchainList} />
        </div>
      </div>
    </div>
  );
};

function Title1(props: any) {
  return <div className={styles.title1}>{props.children}</div>;
}

function Title2(props: any) {
  const { titleText, value } = props;
  return (
    <div className={styles.title2}>
      <span className={styles.titleText}>{titleText}</span>
      <span className={styles.titleNum}>{value}</span>
    </div>
  );
}

export default Index;
