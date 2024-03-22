import request from '@/utils/request'

export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
export const getCartList = () => {
  return request.get('/cart/list')
}

export const updateCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
export const deleteCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}

export const getCartGoodsTotal = () => {
  return request.get('/cart/total')
}
