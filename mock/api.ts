import mockjs from 'mockjs';

const bankList= ['招商银行', '浙商银行', '中国工商银行', '建设银行', '中信银行', '广发银行', '光大银行', '兴业银行', '中国农业银行', '浦发银行']

export default {
  'GET /api/earlyWarning': mockjs.mock({
    'warningList|8-20': [
      {
        order: '@guid',
        remainingTime: '@natural(5, 30)',
        customer: '@city' + '@ctitle(2,5)' + '有限公司',
        'financial|1': bankList,
        amount: '@natural(20, 600)' + '0000',
        'currency|1': ['RMB', 'USD', 'CAD', 'JPY'],
        createTime: '@date("2021-MM-dd")',
        notificationTime: '@date("2021-MM-dd")',
      },
    ],
  }),
  'GET /api/completedOrder': mockjs.mock({
    'orderList|8-20': [
      {
        order: '@guid',
        remainingTime: '@natural(5, 30)',
        customer: '@city' + '@ctitle(2,5)' + '有限公司',
        'financial|1':  bankList,
        amount: '@natural(20, 600)' + '0000',
        'currency|1': ['RMB', 'USD', 'CAD', 'JPY'],
        createTime: '@date("2021-MM-dd")',
        'repaymentStatus|1-2': 2,
      },
    ],
  }),
  'GET /api/financingScale': mockjs.mock({
    'financingScaleList|12': [
      {
        'month|+1': 1,
        scale: '@integer(100, 500)',
      },
    ],
  }),
  'GET /api/enterpriseQuota': mockjs.mock({
    'enterpriseQuotaList|10': [
      {
        customer: '@city' + '@ctitle(2,5)' + '有限公司',
        usedQuota: '@integer(100, 500)',
        unUsedQuota: '@integer(100, 500)',
      },
    ],
  }),
  'GET /api/ranking': mockjs.mock({
    'monthRanking|10': [
      {
        'bank|+1':  bankList,
        value: '@integer(80, 300)',
      },
    ],
    'quarterlyRanking|10': [
      {
        'bank|+1':  bankList,
        value: '@integer(80, 300)',
      },
    ],
    quarterly: '@integer(200, 600)',
  }),
  'GET /api/rose': mockjs.mock({
    'rose1|5': [
      {
        'name|+1': ['平行进口车', '跨境电商', '雀巢咖啡', '倍耐力轮胎', '业务场景'],
        value: '@integer(50, 100)',
      },
    ],
    'rose2|5': [
      {
        'name|+1': ['平行进口车', '跨境电商', '雀巢咖啡', '倍耐力轮胎', '业务场景'],
        value: '@integer(10, 200)',
      },
    ],
    'rose3|5': [
      {
        'name|+1': ['平行进口车', '跨境电商', '雀巢咖啡', '倍耐力轮胎', '业务场景'],
        value: '@integer(10, 100)',
      },
    ],
  }),
};
