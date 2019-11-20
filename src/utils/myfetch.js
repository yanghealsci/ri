import qs from 'qs'
import 'whatwg-fetch'
// import store from 'store'

export default async function myfetch({ url, data, method = 'GET', headers = {}, dataType, cookie = true }) {
  if (!url) {
    throw new Error('url is not defined!')
  }
  let fullUrl = url.indexOf('http') === 0
    ? url
    : url.indexOf('/') === 0 ? `${url}` : `/${url}`
  let options = {
    method: method.toUpperCase(),
    headers
  }
  if (cookie) {
    options = {
      ...options
      // credentials: 'include'
    }
  }
  if ((options.method === 'GET' || options.method === 'PUT') && dataType !== 'json') {
    data && (fullUrl += `?${qs.stringify(data)}`)
    options = {
      ...options,
      headers: {
        ...options.headers
      }
    }
  } else {
    options = {
      ...options,
      body: qs.stringify(data),
      headers: {
        // for post Content-Type: 'application/x-www-form-urlencoded'
        ...options.headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  }
  if (dataType === 'json') {
    options = {
      ...options,
      body: JSON.stringify(data),
      headers: {
        ...options.headers,
        'Content-Type': 'application/json'
      }
    }
  }

  const resp = await Promise.race([
    fetch(fullUrl, options),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('time out')), 20000)
    })
  ])

  const json = await resp.json()

  if (resp.status === 400) {
    console.log(json.errorMessage)
    throw new Error(json.errorMessage)
  } else if (resp.status > 299 || resp.status < 200) {
    throw new Error('System error, try again later')
  }

  return json
}