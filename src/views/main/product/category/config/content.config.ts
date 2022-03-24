export const contentTableConfig = {
  title: '类别列表',
  propsList: [
    { prop: 'name', label: '类别名称', minWidth: '120' },
    { prop: 'goodsCount', label: '商品数量', minWidth: '120' },
    { prop: 'goodsSale', label: '商品销量', minWidth: '120' },
    { prop: 'goodsFavor', label: '商品收藏量', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
