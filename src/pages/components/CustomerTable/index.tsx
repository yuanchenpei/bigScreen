import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Table } from 'antd';

const Index = (props: any) => {
  const { dataSource, columns1, columns2, tableTitle, idName } = props;

  const [timer, setTimer] = useState(null);
  useEffect(() => {
    InitialScroll(dataSource);
    return () => {
      clearInterval(timer);
    };
  }, [dataSource]);

  const InitialScroll = (data) => {
    let v = document.getElementById(idName);
    if (data.length > 2) {
      let time = setInterval(() => {
        v.scrollTop += 1.5;
        if (
          Math.ceil(v.scrollTop) >= parseFloat(v.scrollHeight - v.clientHeight)
        ) {
          v.scrollTop = 0;
        }
      }, 100);
      setTimer(time);
    }
  };

  return (
    <div className={styles.tableWarp}>
      <div className={styles.tableTitle}>
        <div>{tableTitle}</div>
        <div>
          <span>{dataSource.length}</span>单
        </div>
      </div>
      <div
        className={styles.listBox}
        id={idName}
        onMouseEnter={() => {
          if (timer) clearTimeout(timer);
          clearInterval(timer);
        }}
        onMouseLeave={() => {
          if (timer) clearTimeout(timer);
          InitialScroll(dataSource);
        }}
      >
        {dataSource.map((item, index) => {
          return (
            <div className={styles.rowItem} key={item.order}>
              <RowItem
                idName={idName}
                dataSource={[item]}
                columns1={columns1}
                columns2={columns2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

function RowItem(props) {
  const { dataSource, columns1, columns2, idName } = props;
  return (
    <div className={styles.table}>
      <Table dataSource={dataSource} columns={columns1} pagination={false} rowKey={'order'} />
      <Table dataSource={dataSource} columns={columns2} pagination={false} rowKey={'order'} />
    </div>
  );
}

export default Index;
