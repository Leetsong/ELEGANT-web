import request from 'utils/request';
import {
  ACPAIR_GET_URL
} from 'services';

export async function get() {
  return request(ACPAIR_GET_URL);
}