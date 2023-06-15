import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';

export default (props) => {
  const refList = useRef([]);
  const { initNumber } = props;
  const [num, setNum] = useState(initNumber || 1371923);
  const [numList, setNumList] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNum(n => n += getRandomNumber(-500, 1000));
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getRef = (dom) => {
    refList.current.push(dom);
  };

  useEffect(() => {
    num && setNumList(formatNumber(num));
    setNumberTransform();
  }, [num]);

  const setNumberTransform = () => {
    let domList = refList.current;
    let numArr = numList.filter(item => !isNaN(item));
    for (let index = 0; index < domList.length; index++) {
      let elem = domList[index];
      if (elem) {
        elem.style.transform = `translate(-50%, -${numArr[index] * 10}%)`;
      }
    }
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const formatNumber = (num, maxLength = 9) => {
    let str = num.toFixed(0).padStart(maxLength, '0').replace(/(\d)(?=(\d{3})+(\.\d+)?$)/g, '$1,');
    return str.split('');
  };

  return (
    <div className={styles.box}>
      {
        numList.map((item, index) => {
          {
            return !isNaN(item) ? (
                <div className={styles.boxItem} key={index}>
                  <span ref={getRef}>0123456789</span>
                </div>
              )
              :
              <div className={styles.dot}>
                <i>{item}</i>
              </div>;
          }
        })
      }
    </div>
  );
};


