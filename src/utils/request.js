import fetch from 'dva/fetch';
import nprogress from 'nprogress';

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

  const error = new Error('请求错误！');
  error.response = response;
  throw error;
}

class Progress {
  n = 0;

  inc() {
    if (this.n < 1) {
      this.n = 1;
      nprogress.inc();
    } else {
      ++this.n;
    }
  }

  done() {
    --this.n;
    if (this.n < 1) {
      nprogress.done();
    }
  }
}

const progress = new Progress();

export default function request(url, options) {
  console.log(url, options && options.body);
  progress.inc();
  return fetch(url, options).
    then(checkStatus).
    then(checkSystemStatus).
    then(data => data).finally(() => {
      progress.done();
    });
}

export function plat(url, options) {
  return request('http://localhost/' + url, options);
}

export function platPost(url, data) {
  return plat(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function platGet(url) {
  return plat(url);
}
