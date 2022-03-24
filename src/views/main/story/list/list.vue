<template>
  <div class="storyList">
    <template v-for="item in storyList" :key="item.id">
      <tl-card :title="item.title" @click="openStoryClick(item.id)">
        <div class="card-content">
          <el-container>
            <el-container>
              <el-main :id="`storyContent${item.id}`">{{
                setStoryContent(item)
              }}</el-main>
              <el-footer height="30">
                <span class="footerAuthor">{{
                  `作者: ${item.authorInfo.name}`
                }}</span>
                <span class="footerFavor">
                  <svg
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    data-v-ba633cb8=""
                    style="
                      width: 1.3em;
                      height: 1.3em;
                      position: absolute;
                      left: -17px;
                      bottom: 0px;
                    "
                  >
                    <path
                      fill="currentColor"
                      d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"
                    ></path>
                  </svg>
                  {{ item.favor }}
                </span>
                <span class="footerCreateAt">{{
                  `发布日期: ${$filters.formatTime(item.createAt)}`
                }}</span>
              </el-footer>
            </el-container>
            <el-aside width="200px">
              <img
                class="story-img"
                src="http://localhost:8000/users/1/avatar/24"
                alt="加载失败"
              />
            </el-aside>
          </el-container>
        </div>
      </tl-card>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { usePermission } from '@/hooks/usePermission'

import TlCard from '@/base-ui/card'

export default defineComponent({
  name: 'list',
  components: {
    TlCard
  },
  setup() {
    const store = useStore()

    // const isCreate = usePermission('story', 'create')
    // const isDelete = usePermission('story', 'delete')
    const isQuery = usePermission('story', 'query')

    const getPageData = async (queryInfo: any = {}) => {
      if (!isQuery) return // 如果没有查询权限，直接返回

      await store.dispatch('system/getPageListAction', {
        pageName: 'story',
        queryInfo: {
          offset: 0,
          size: 100,
          ...queryInfo
        }
      })
    }
    getPageData()

    const storyList = computed(() => store.state.system.storyList)

    // const _document = document
    const setStoryContent = (item: any) => {
      nextTick(() => {
        document.getElementById(`storyContent${item.id}`)!.innerHTML =
          item.intro
      })
    }

    const router = useRouter()

    const openStoryClick = (storyId: number) => {
      let newpage = router.resolve({})
      newpage.href = `${newpage.href}/main/${storyId}`

      window.open(newpage.href, '_blank')
    }

    return {
      storyList,
      setStoryContent,
      openStoryClick
    }
  }
})
</script>

<style scoped lang="less">
.storyList {
  .el-card {
    margin-bottom: 20px;
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-size: 30px;
      font-weight: 700;
    }

    &:deep(.el-card__header span):hover {
      text-decoration: underline;
      cursor: pointer;
    }

    .card-content {
      .story-img {
        border-radius: 10px;
        width: 200px;
        height: 200px;
      }
    }
    .el-footer {
      .footerAuthor {
        margin-right: 30px;
      }
      .footerFavor {
        position: relative;
        margin-right: 50px;
      }
    }
  }
}
</style>
