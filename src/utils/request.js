import fetch from 'dva/fetch';

function checkSystemStatus(response) {
  if (response.code == 200) {
    return response;
  }
  throw new Error(response.msg);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 *
 * @param  {object} [options] The options we want to pass to "fetch"
 * method: 请求使用的方法，如 GET、POST。
 * headers: 请求的头信息，形式为 Headers 对象或 ByteString。
 * body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
 * mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
 * credentials: 请求的 credentials，如 omit、same-origin 或者 include。
 * cache: 请求的 cache 模式: default, no-store, reload, no-cache, force-cache, 或者 only-if-cached。
 *
 * @return {object}           An object containing either "data" or "err"
 * 属性：
 * status (number) - HTTP请求结果参数，在100–599 范围
 * statusText (String) - 服务器返回的状态报告
 * ok (boolean) - 如果返回200表示请求成功则为true
 * headers (Headers) - 返回头部信息，下面详细介绍
 * url (String) - 请求的地址
 * 方法：text() - 以string的形式生成请求text
 * json() - 生成JSON.parse(responseText)的结果
 * blob() - 生成一个Blob
 * arrayBuffer() - 生成一个ArrayBuffer
 * formData() - 生成格式化的数据，可用于其他的请求
 * 其他方法：
 * clone()
 * Response.error() Response.redirect()
 */
export default function request(url, options) {
  return fetch(url, options).
    then(checkStatus).
    then(checkSystemStatus).
    then(data => ({data}));
}

export function plat(url, options = {}) {
  return request('http://localhost/' + url, {...{method: 'POST'}, ...options});
}
