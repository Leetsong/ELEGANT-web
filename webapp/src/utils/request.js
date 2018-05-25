import fetch from 'dva/fetch';

function checkStatus(response, fetchedRet) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(fetchedRet.message || response.statusText);
  error.response = response;

  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options);
  const fetchedRet = await response.json();

  checkStatus(response, fetchedRet);

  const ret = {
    data: fetchedRet,
    headers: {}
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}