import request from 'utils/request';
import {
  ELEGANT_POST_URL
} from 'services';

export async function post({ acpairs, file, d3Algo }) {
  const formData = new FormData();

  formData.append('d3Algo', JSON.stringify(d3Algo));
  formData.append('acpairs', JSON.stringify(acpairs));
  formData.append('apk', file);

  return request(ELEGANT_POST_URL, {
    method: 'POST',
    body: formData
  });
}