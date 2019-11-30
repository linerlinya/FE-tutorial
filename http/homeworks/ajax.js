// Level 3
const request = ({ type, url, data, headers, success, error } = {}) => {
  const formatData = (data) =>
    `?${Object.keys(data).reduce((acc, cur) => `${acc}&${cur}=${data[cur]}`, '').slice(1)}`
  const upperCaseType = type.toUpperCase()
  const params = formatData(data)

  const req = new XMLHttpRequest()

  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      if (req.status >= 200 && req.status < 300 || req.status === 304) {
        success(req)
      } else {
        error(req)
      }
    }
  }

  if (upperCaseType === 'GET') {
    req.open(upperCaseType, url + params)

    Object.entries(headers).forEach(([key, value]) => req.setRequestHeader(key, value))

    req.send()
  }

  if (upperCaseType === 'POST') {
    req.open(upperCaseType, url)

    Object.entries(headers).forEach(([key, value]) => req.setRequestHeader(key, value))

    req.send(params)
  }
}


function Ajax({
  data,
  headers,
  beforeSuccess,
  afterSuccess,
  beforeError,
  afterError,
} = {
  data: {},
  headers: {},
  beforeSuccess: () => {},
  afterSuccess: () => {},
  beforeError: () => {},
  afterError: () => {},
}) {
  function ajax(url, config) {
    const finalData = Object.assign({}, data, config.data || {})
    const finalHeaders = Object.assign({}, headers, config.headers || {})
    const finalSuccess = (req) => {
      beforeSuccess(req)
      config.success(req)
      afterSuccess(req)
    }
    const finalError = (req) => {
      beforeError(req)
      config.error(req)
      afterError(req)
    }

    request({
      type: config.type || 'GET',
      url,
      data: finalData,
      headers: finalHeaders,
      success: finalSuccess,
      error: finalError,
    })
  }

  // 关键点，JS 中函数也是对象
  ajax.get = function get(url, config) {
    this(url, config)
  }

  ajax.post = function post(url, config) {
    this(url, { type: 'POST', ...config })
  }

  return ajax
}

// 我们让它 return ajax，其实现在 new 就啥用没有
// 我们这样调用也可以：const ajax = Ajax({ ... })
const ajax = new Ajax({
  data: {
    // 传递参数，会与之后传的合并
  },
  headers: {
    name: 'LJ',
    age: 1,
  },
  beforeSuccess: () => console.log('beforSuccess'),
  afterSuccess: () => console.log('afterSuccess'),
  beforeError: () => console.log('beforeError'),
  afterError: () => console.log('afterError'),
})

const getMusicAPI = keyword => `https://music.niubishanshan.top/api/v2/music/search/${keyword}/1/10`
const GITHUB_API = `https://api.github.com/search/repositories`
// ?q=${keyword}+in:name&sort=stars&order=desc

// 默认 GET 请求
ajax(getMusicAPI('hah'), {
  success: (req) => console.log(JSON.parse(req.responseText)),
  error: (req) => console.log('error: ', req),
})

ajax.get(GITHUB_API, {
  data: {
    q: 'react+in:name',
    sort: 'start',
    order: 'desc',
  },
  success: (req) => console.log(JSON.parse(req.responseText)),
  error: (req) => console.log('error: ', req),
})


// Level 4
// https://github.com/developit/unfetch/blob/master/src/index.mjs
