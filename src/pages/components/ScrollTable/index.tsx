import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { Table } from 'antd';

const moment = require('moment');
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

const columns = [
  {
    title: 'Tx Hash',
    dataIndex: 'trx_id',
    key: 'trx_id',
    width: 260,
    ellipsis: true,
  },
  {
    title: '区块高度',
    dataIndex: 'block_num',
    key: 'block_num',
    width: 100,
    ellipsis: true,
  },
  {
    title: '存证时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
    ellipsis: true,
    render(text, record, index) {
      return <span>{moment(text).format('YYYY-MM-DD')}</span>;
    },
  },
  {
    title: '验证结果',
    dataIndex: 'irreversible',
    key: 'irreversible',
    ellipsis: true,
    render(text, record, index) {
      return text ? <CheckCircleTwoTone twoToneColor='#10D044' /> : <CloseCircleTwoTone twoToneColor='#eb2f96' />;

    },

  },
];

const Index = (props) => {
  const { dataSource = [] } = props;
  const [timer, setTimer] = useState(null);
  const tableRef = useRef(null);
  useEffect(() => {
    InitialScroll(dataSource);
    return () => {
      clearInterval(timer);
    };
  }, [dataSource]);

  const InitialScroll = (data) => {
    let v = document.getElementsByClassName('ant-table-body')[0];
    if (data.length > calculateNum() || data.length > 3) {
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

  function calculateNum() {
    return Math.ceil((tableRef.current?.clientHeight - 40) / 40);
  }

  return (
    <div style={{ height: '100%' }}>
      <div
        ref={tableRef}
        onMouseEnter={() => {
          if (timer) clearTimeout(timer);
          clearInterval(timer);
        }}
        onMouseLeave={() => {
          if (timer) clearTimeout(timer);
          InitialScroll(dataSource);
        }}
        className={styles.table}
      >
        <Table
          dataSource={dataSource}
          scroll={{ y: tableRef.current ? tableRef.current?.clientHeight - 40 : 120 }}
          columns={columns}
          pagination={false}
          rowKey={(record) => record?.trx_id}
          loading={!timer}
        />

      </div>
    </div>
  );
};

export default Index;
