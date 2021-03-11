import { $post, $get } from '@/http/index'
export function postOrgUserLogin(params: any) {
  return $post(
    '/user/webUserLogin',
    params,
    'application/x-www-form-urlencoded'
  )
}
export function postUserByCode(params: any) {
  return $post(
    '/user/getUserByCode',
    params,
    'application/x-www-form-urlencoded'
  )
}

export function getVerifyCode(params: any) {
  return $get('/user/verifyCode', params)
}
