import Mock from 'mockjs'

const Random = Mock.Random

// 登录
Mock.mock('/api/login', 'post', (option) => {
  let { username, password } = JSON.parse(option.body)
  return (username === 'admin' && password === 'admin')
})

// 用户数据
const userData = () => {
  let users = []
  for (let i = 0; i < 10; i++) {
    let user = {
      'id': i + 1,
      'date': Random.date('yyyy-MM-dd'),
      'name': Random.cname(),
      'address': Mock.mock('@county(true)'),
      'phone': Mock.mock(/^1[0-9]{10}$/),
      'status': Random.integer(0, 1)
    }
    users.push(user)
  }
  return users
}
Mock.mock('/api/users', userData)

// 银行卡数据
const bankData = () => {
  let banks = [
    {"name":"李杰","bank":"交通银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"accountBalance":"100000"},
    {"name":"李杰","bank":"招生银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"accountBalance":"100000"},
    {"name":"李艳","bank":"中国银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"accountBalance":"100000"},
    {"name":"李凭跃","bank":"交通银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"accountBalance":"100000"},
    {"name":"李杰","bank":"广发银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"accountBalance":"100000"},
  ]
  return banks
}
Mock.mock('/api/banks', bankData)

// 银行理财数据
const bankProductsData = () => {
  let bankProducts = [
    {"name":"李杰","bank":"交通银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"bankProduct":"大额存单","investmentAmount":"1000","interestRate":"4.5","interestPaymentMethod":"月付","profitDate":Random.date('yyyy-MM-dd'),"depositPeriod":"3","expectedInterestIncomeMonth":"100","expectedInterestIncomeTotal":"1000","totalEffectiveUnterestIncome":"1000","principalAndInterestIncome":"11000","buyingTime":Random.date('yyyy-MM-dd'),"dueTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李杰","bank":"招生银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"bankProduct":"活期","investmentAmount":"1000","interestRate":"4.5","interestPaymentMethod":"月付","profitDate":Random.date('yyyy-MM-dd'),"depositPeriod":"3","expectedInterestIncomeMonth":"100","expectedInterestIncomeTotal":"1000","totalEffectiveUnterestIncome":"1000","principalAndInterestIncome":"11000","buyingTime":Random.date('yyyy-MM-dd'),"dueTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李艳","bank":"中国银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"bankProduct":"活期转入跃交通银行","investmentAmount":"1000","interestRate":"4.5","interestPaymentMethod":"月付","profitDate":Random.date('yyyy-MM-dd'),"depositPeriod":"3","expectedInterestIncomeMonth":"100","expectedInterestIncomeTotal":"1000","totalEffectiveUnterestIncome":"1000","principalAndInterestIncome":"11000","buyingTime":Random.date('yyyy-MM-dd'),"dueTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李凭跃","bank":"交通银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"bankProduct":"华夏保险","investmentAmount":"1000","interestRate":"4.5","interestPaymentMethod":"月付","profitDate":Random.date('yyyy-MM-dd'),"depositPeriod":"3","expectedInterestIncomeMonth":"100","expectedInterestIncomeTotal":"1000","totalEffectiveUnterestIncome":"1000","principalAndInterestIncome":"11000","buyingTime":Random.date('yyyy-MM-dd'),"dueTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李杰","bank":"广发银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"bankProduct":"大额存单","investmentAmount":"1000","interestRate":"4.5","interestPaymentMethod":"月付","profitDate":Random.date('yyyy-MM-dd'),"depositPeriod":"3","expectedInterestIncomeMonth":"100","expectedInterestIncomeTotal":"1000","totalEffectiveUnterestIncome":"1000","principalAndInterestIncome":"11000","buyingTime":Random.date('yyyy-MM-dd'),"dueTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
  ]
  return bankProducts
}
Mock.mock('/api/bankProducts', bankProductsData)

// 操作流水数据
const bankLogData = () => {
  let bankLogs = [
    {"name":"李杰","bank":"交通银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"transactionAmount":"10000","transactionType":"转账","transactionTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李杰","bank":"招生银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"transactionAmount":"10000","transactionType":"转账","transactionTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李艳","bank":"中国银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"transactionAmount":"10000","transactionType":"转账","transactionTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李凭跃","bank":"交通银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"transactionAmount":"10000","transactionType":"转账","transactionTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
    {"name":"李杰","bank":"广发银行","bankCard":Mock.mock(/^1[0-9]{10}$/),"transactionAmount":"10000","transactionType":"转账","transactionTime":Random.date('yyyy-MM-dd'),"remark":"备注信息"},
  ]
  return bankLogs
}
Mock.mock('/api/bankLogs', bankLogData)

// 文章数据
const articleData = () => {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let article = {
      'id': i + 1,
      'date': Random.date('yyyy-MM-dd'),
      'title': Random.csentence(),
      'author': Random.cname(),
      'content': Random.csentence(),
      'status': Random.integer(0, 1)
    }
    articles.push(article)
  }
  return articles
}
Mock.mock('/api/articles', articleData)
