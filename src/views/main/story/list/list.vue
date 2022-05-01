<template>
  <div class="storyList" id="storyList">
    <page-search
      class="story-page-search"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />
    <template v-if="storyList.length === 0">
      <div class="notData">暂无数据</div>
    </template>
    <template v-for="item in storyList" :key="item.id">
      <tl-card :title="item.title" :storyId="item.id">
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
              <template v-if="item.authorInfo.id !== userInfo.id">
                <img
                  v-if="item.cover_url"
                  class="story-img"
                  :src="item.cover_url"
                  alt="加载失败"
                />
                <img
                  v-else
                  class="story-img"
                  src="@/assets/img/coverUpload.jpg"
                  alt="加载失败"
                />
              </template>
              <template v-else>
                <el-upload
                  class="cover-uploader"
                  action="/api/file/cover"
                  name="cover"
                  :data="{ storyId: item.id }"
                  :show-file-list="false"
                  :headers="myheaders"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="item.cover_url"
                    :src="item.cover_url"
                    class="cover"
                    alt="加载图片失败"
                  />
                  <img
                    v-else
                    src="@/assets/img/coverUpload.jpg"
                    class="cover"
                    alt="加载图片失败"
                  />
                </el-upload>
              </template>
            </el-aside>
          </el-container>
        </div>
      </tl-card>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import TlCard from '@/base-ui/card'

export default defineComponent({
  name: 'list',
  components: {
    TlCard,
    PageSearch
  },
  setup() {
    const store = useStore()
    let isLoad = ref(false)
    const loadCount = ref(10)

    const token = localCache.getCache('token')
    const myheaders = {
      Authorization: `Bearer ${token}`
    }

    const handleAvatarSuccess = async () => {
      await store.dispatch('system/getPageListAction', {
        pageName: 'story',
        queryInfo: {}
      })
    }

    const beforeAvatarUpload = (file: any) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        ElMessage.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }

    const isQuery = usePermission('story', 'query')

    const getPageData = async (queryInfo: any) => {
      if (!isQuery) return // 如果没有查询权限，直接返回
      isLoad.value = true
      loadCount.value += queryInfo

      await store.dispatch('system/getPageListAction', {
        pageName: 'story',
        queryInfo: {
          offset: 0,
          size: loadCount.value
        }
      })
    }
    getPageData(0)

    const handleSearchClick = async (queryInfo: any) => {
      console.log(queryInfo)
      if (!isQuery) return // 如果没有查询权限，直接返回
      isLoad.value = true

      await store.dispatch('system/getPageListAction', {
        pageName: 'story',
        queryInfo: {
          ...queryInfo,
          offset: 0,
          size: loadCount.value
        }
      })
    }

    const handleResetClick = () => {
      getPageData(0)
    }

    const userInfo = computed(() => store.state.login.userInfo)
    const storyList = computed(() => store.state.system.storyList)
    const storyCount = computed(() => store.state.system.storyCount)

    const setStoryContent = (item: any) => {
      nextTick(() => {
        document.getElementById(`storyContent${item.id}`)!.innerHTML =
          item.intro
      })
    }

    onMounted(() => {
      const obj = document.getElementById('page-content')
      obj?.addEventListener('scroll', onPageScroll)
    })

    const onPageScroll = () => {
      const obj = document.getElementById('page-content')
      const scrollHeight = obj!.scrollHeight
      const scrollTop = obj!.scrollTop
      const objHeight = obj!.offsetHeight
      // 100为阈值，可根据实际情况调整
      if (
        scrollHeight <= scrollTop + objHeight &&
        loadCount.value <= storyCount.value
      ) {
        isLoad.value = true
        setTimeout(() => {
          getPageData(5)
          console.log('加载数据')
          isLoad.value = false
        }, 1000)
      }
      // obj?.offsetTop = scrollTop
    }

    return {
      storyList,
      userInfo,
      setStoryContent,
      myheaders,
      handleAvatarSuccess,
      beforeAvatarUpload,
      getPageData,
      searchFormConfig,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang="less">
.storyList {
  .story-page-search {
    border-bottom: 20px solid rgb(245, 245, 245);
  }
  .notData {
    height: 200px;
    line-height: 200px;
    font-size: 30px;
  }
  // height: 1800px;
  .infinite-list {
    height: 900px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

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
        width: 180px;
        height: 180px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
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

    .el-aside {
      .cover-uploader {
        position: relative;
      }

      .cover-uploader .el-upload {
        width: 190px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }
      .cover-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .cover {
        width: 178px;
        height: 178px;
        display: block;
        border-radius: 10px;
        border: rgb(226, 226, 226) 1px dashed;
      }
      .cover:hover {
        border: rgb(64, 158, 255) 1px dashed;
      }
      .coverBg {
        width: 178px;
        height: 178px;
        border: rgb(226, 226, 226) 1px dashed;
        border-radius: 10px;
      }
      .coverBg:hover {
        border: rgb(64, 158, 255) 1px dashed;
      }
    }
  }
}
</style>
