<template>
  <div class="story-main">
    <el-container>
      <el-header style="text-align: right; font-size: 12px"></el-header>

      <el-main>
        <el-scrollbar height="100%">
          <div id="el-main-story-main" class="el-main-story-main-class"></div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, nextTick } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    let storyPage = router.resolve({})
    const url = storyPage.path.replace('/main', '')

    const getStoryData = async (queryInfo: any = {}) => {
      await store.dispatch('system/getPageDataAction', {
        pageUrl: url,
        queryInfo: {
          ...queryInfo
        }
      })
    }
    getStoryData()

    const storyData = computed(() => store.state.system.storyMain)

    const setStoryContent = () => {
      nextTick(() => {
        const storyMainEl = document.getElementById('el-main-story-main')
        storyMainEl!.innerHTML = storyData.value.content
        const childNodes = storyMainEl?.childNodes
        console.log(childNodes)
        if (childNodes) {
          for (let value of childNodes.values()) {
            console.log(value.nodeName)
            console.log(document.getElementsByTagName(value.nodeName))
          }
        }
      })
    }

    watch(storyData, () => {
      setStoryContent()
    })

    return {}
  }
})
</script>

<style scoped lang="less">
.story-main {
  position: relative;
  height: 100%;
  background-color: #f9f9f9;
  .el-header {
    position: relative;
    color: var(--el-text-color-primary);
    background-color: #fff;
    box-shadow: 0 2px 10px rgb(200, 200, 200);
    z-index: 100;
  }
  .el-main {
    width: 70%;
    padding: 10px;
    height: calc(100% - 60px);
    background-color: #fff;
    position: absolute;
    top: 60px;
    left: 15%;

    .el-main-story-main-class {
      /* table 样式 */
      table {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
      }
      table td,
      table th {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
      }
      table th {
        border-bottom: 2px solid #ccc;
        text-align: center;
      }

      /* blockquote 样式 */
      blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 5px 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
      }

      /* code 样式 */
      code {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        background-color: #f1f1f1;
        border-radius: 3px;
        padding: 3px 5px;
        margin: 0 3px;
      }
      pre code {
        display: block;
      }

      /* ul ol 样式 */
      ul,
      ol {
        margin: 10px 0 10px 20px;
      }
    }
  }
}
</style>
