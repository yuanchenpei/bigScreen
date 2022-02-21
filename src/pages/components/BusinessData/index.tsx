import React, { useEffect, useState } from 'react';
import styles from './index.less';
import RowsChart from '@/pages/components/Charts/RowsChart';
import GradientBar from '@/pages/components/Charts/GradientBar';
import QuotaBar from '@/pages/components/Charts/QuotaBar';
import { request } from '@@/plugin-request/request';

import { financingScaleList, enterpriseQuotaList, rose } from '@/assets/mockJSON';

const Index = (props: any) => {
  const [financingScale, setFinancingScale] = useState(financingScaleList || []);
  const [enterpriseQuota, setEnterpriseQuota] = useState(enterpriseQuotaList || []);
  const [rose1, setRose1] = useState([]);
  const [rose2, setRose2] = useState([]);
  const [rose3, setRose3] = useState([]);

  function getFinancingScale() {
    request('/api/financingScale', {
      method: 'get',
    }).then(res => {
      setFinancingScale(res.financingScaleList);
    });
  }

  function getEnterpriseQuota() {
    request('/api/enterpriseQuota', {
      method: 'get',
    }).then(res => {
      setEnterpriseQuota(res.enterpriseQuotaList);
    });
  }

  function getRoseData() {
    new Promise((resolve) => {
      resolve(rose)
    }).then(res => {
      setRose1(res.rose1);
      setRose2(res.rose2);
      setRose3(res.rose3);
    });
    // request('/api/rose', {
    //   method: 'get',
    // }).then(res => {
    //   setRose1(res.rose1);
    //   setRose2(res.rose2);
    //   setRose3(res.rose3);
    // });
  }


  useEffect(() => {
    // getFinancingScale()
    // getEnterpriseQuota()
    getRoseData();
  }, []);


  return (
    <div className={styles.dataWarp}>
      <div className={styles.dataTitle}>
        <div>平台业务数据</div>
      </div>
      <div className={styles.dataRowBox}>
        <div>
          <CardTitle1 titleText={'当前融资规模'} value={'30000'} unit={'万元'} />
          <div className={styles.financingScale}>
            <div className={`${styles.bubble} ${styles.blueBubble}`}>
              <div>入驻企业</div>
              <div>
                <span className={styles.bubbleValue}>{1406}</span>
                <span className={styles.bubbleUnit}>家</span>
              </div>
            </div>
            <div className={`${styles.bubble} ${styles.yellowBubble}`}>
              <div>金融机构</div>
              <div>
                <span className={styles.bubbleValue}>{32}</span>
                <span className={styles.bubbleUnit}>家</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <CardTitle2>融资规模</CardTitle2>
          <div className={styles.rowsChart}>
            <GradientBar data={financingScale} />
          </div>
        </div>
        <div>
          <CardTitle2>融资规模占比</CardTitle2>
          <div className={styles.rowsChart}>
            <RowsChart data={rose1} name={'融资规模占比'} />
          </div>
        </div>
      </div>

      <div className={styles.dataRowBox}>
        <div>
          <CardTitle1 titleText={'当前授信规模'} value={'120000'} unit={'万元'} />
          <div className={styles.rowsChart}>
            <RowsChart data={rose2} name={'授信规模'} />
          </div>
        </div>
        <div>
          <CardTitle2>企业授信</CardTitle2>
          <div className={styles.rowsChart}>
            <QuotaBar data={enterpriseQuota} />
          </div>
        </div>
        <div>
          <CardTitle2>机构产品授信</CardTitle2>
          <div className={styles.rowsChart}>
            <RowsChart data={rose3} name={'机构产品授信'} />
          </div>
        </div>
      </div>
    </div>
  );
};

function CardTitle1(props: any) {
  const { titleText, value, unit } = props;
  return (
    <div className={styles.cardTitle1}>
      <div className={styles.titleText}>{titleText}</div>
      <div className={styles.cardTitleNum}>
        <span className={styles.card1Value}>{value}</span>
        <span className={styles.card1Unit}>{unit}</span>
      </div>
    </div>
  );
}

function CardTitle2(props: any) {
  return <div className={styles.cardTitle2}>{props.children}</div>;
}


export default Index;
