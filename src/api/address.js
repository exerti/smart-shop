import request from '@/utils/request'

export const getAddressList = () => {
  return request.get('/address/list')
}

export const getDefaultID = () => {
  return request.get('/address/defaultId')
}
