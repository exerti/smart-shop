
const KEY_INFO = 'shop-info'
const KEY_SEARCH = 'shop-search'
// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(KEY_INFO)
  return result ? JSON.parse(result) : { token: '', userid: '' }
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(KEY_INFO, JSON.stringify(info))
}

// 删除个人信息
export const removeInfo = () => {
  localStorage.removeItem(KEY_INFO)
}

// 存储到本地

export const setSearch = (search) => {
  localStorage.setItem(KEY_SEARCH, JSON.stringify(search))
}

// 获取本地存储的搜索历史
export const getSearch = () => {
  const result = localStorage.getItem(KEY_SEARCH)
  return result ? JSON.parse(result) : []
}

// 删除本地存储的搜索历史
export const removeSearch = () => {
  localStorage.removeItem(KEY_SEARCH)
}
