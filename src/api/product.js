import request from '@/utils/request'

export const getGoodsList = (product) => {
  const { categoryId, goodsName, page, sortPrice, sortType } = product
  return request.get('/goods/list', {
    params: {
      sortType,
      sortPrice,
      categoryId,
      goodsName,
      page
    }
  })
}

export const getGoodsDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
