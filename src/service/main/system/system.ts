import tlRequest from '../../index'
import { IDataType } from '../../types'

export function getPageData(url: string) {
  return tlRequest.get<IDataType>({
    url: url
  })
}

export function getPageListData(url: string, queryInfo: any) {
  return tlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return tlRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return tlRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return tlRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
