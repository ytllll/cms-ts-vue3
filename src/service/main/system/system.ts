import tlRequest from '../../index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return tlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
