<template>
  <div class="story-main">
    <el-container>
      <el-header>
        <div id="el-header-story-main" class="el-header-story-main" />
      </el-header>

      <el-main>
        <el-scrollbar height="100%">
          <div id="el-main-story-main" class="el-main-story-main-class"></div>
          <el-divider />
          <div class="main-comment-div">
            <template v-if="!commentCount">
              <span class="main-comment-span">参与评论</span>
            </template>
            <template v-else>
              <span class="main-comment-span">{{
                `评论 ${commentCount}`
              }}</span>
            </template>
            <div class="main-comment-info">
              <el-avatar :src="userInfo.avatar_url" />
              <el-input v-model="commentContent" placeholder="想对作者说点什么">
                <template #append>
                  <el-button icon="el-icon-edit" @click="handleComment">
                    评论
                  </el-button>
                </template>
              </el-input>
            </div>
            <template v-if="commentCount">
              <template v-for="item of commentList" :key="item.id">
                <el-divider />
                <div class="comment-content">
                  <el-avatar :src="item.user.avatarUrl" />
                  <template v-if="!item.commentId">
                    <span class="comment-content-name">{{
                      item.user.name
                    }}</span>
                  </template>
                  <template v-else>
                    <span class="comment-content-name">{{
                      `${item.user.name} 回复 ${
                        commentList.find((item1) => item1.id == item.commentId)
                          .user.name
                      }`
                    }}</span>
                  </template>
                  <span class="comment-content-createAt">{{
                    $filters.formatTime(item.createAt)
                  }}</span>
                  <span class="comment-content-content">{{
                    item.content
                  }}</span>
                  <template
                    v-if="
                      item.user.id === userInfo.id ||
                      userInfo.id === storyData.authorInfo.id
                    "
                  >
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="comment-content-delete"
                      @click="handleDeleteComment(item)"
                      >删除
                    </el-button>
                  </template>
                  <template v-if="!isReply || replyCommentId !== item.id">
                    <el-button
                      type="text"
                      icon="el-icon-chat-dot-square"
                      class="comment-content-reply"
                      @click="handleReplyComment(item)"
                      >回复
                    </el-button>
                  </template>
                  <template v-else>
                    <el-button
                      type="text"
                      icon="el-icon-chat-dot-square"
                      class="comment-content-reply"
                      @click="handleReplyUpComment"
                      >收起
                    </el-button>
                  </template>
                  <template v-if="isReply && replyCommentId === item.id">
                    <el-input
                      class="comment-content-input"
                      v-model="commentReplyContent"
                      :placeholder="`回复${item.user.name}`"
                    >
                      <template #append>
                        <el-button
                          class="el-button-commentRe"
                          icon="el-icon-edit"
                          @click="handleCommentRe(item)"
                        >
                          评论
                        </el-button>
                      </template>
                    </el-input>
                  </template>
                </div>
              </template>
            </template>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const commentContent = ref('')
    const commentReplyContent = ref('')

    let storyPage = router.resolve({})
    const storyUrl = storyPage.path.replace('/main', '')
    const { storyId } = storyPage.params
    const commentUrl = `/comment/list?storyId=${storyId}`

    const userInfo = computed(() => store.state.login.userInfo)

    const getStoryData = async () => {
      await store.dispatch('system/getPageDataAction', {
        pageName: 'story',
        pageUrl: storyUrl
      })
      await store.dispatch('system/getPageDataAction', {
        pageName: 'comment',
        pageUrl: commentUrl
      })
    }
    getStoryData()

    const storyData = computed(() => store.state.system.storyMain)
    const commentList = computed(() => store.state.system.commentList)
    const commentCount = computed(() => store.state.system.commentCount)

    watch(storyData, () => {
      setStoryContent()
    })

    const setStoryContent = () => {
      const storyMainEl = document.getElementById('el-main-story-main')
      storyMainEl!.innerHTML = storyData.value.content

      const storyHeaderEl = document.getElementById('el-header-story-main')
      storyHeaderEl!.innerHTML = `
      <h1 style="
        margin: 7px auto;
        font-size: 40px
      ">${storyData.value.title}</h1>
      <img src=${storyData.value.authorInfo.avatarUrl} style="
          height: 55px;
          width: 55px;
          border-radius: 50%;
          position: absolute;
          left: 15%;
          top: 1px;
      ">
      <span style="
        font-size: 14px;
        color: #606266;
        position: absolute;
        left: 19%;
        top: 25px;
      ">${storyData.value.authorInfo.name}</span>
      `
    }

    const handleComment = async () => {
      await store.dispatch('system/createPageDataAction', {
        pageName: 'comment',
        newData: { content: commentContent.value, storyId: storyData.value.id }
      })
      commentContent.value = ''
      getStoryData()
    }

    const isReply = ref(false)
    const replyCommentId = ref<number>(0)

    const handleReplyComment = async (commentInfo: any) => {
      isReply.value = true
      replyCommentId.value = commentInfo.id
    }

    const handleCommentRe = async (commentInfo: any) => {
      await store.dispatch('system/createPageDataAction', {
        pageName: `comment/${commentInfo.id}/reply`,
        newData: {
          content: commentReplyContent.value,
          storyId: storyData.value.id
        }
      })
      commentReplyContent.value = ''
      isReply.value = false
      replyCommentId.value = 0
      getStoryData()
    }

    const handleReplyUpComment = () => {
      isReply.value = false
      replyCommentId.value = 0
    }

    const handleDeleteComment = async (commentInfo: any) => {
      await store.dispatch('system/deletePageDataAction', {
        pageName: 'comment',
        id: commentInfo.id
      })
      getStoryData()
    }

    return {
      storyData,
      commentContent,
      commentReplyContent,
      userInfo,
      handleComment,
      handleCommentRe,
      commentList,
      commentCount,
      handleReplyComment,
      handleReplyUpComment,
      handleDeleteComment,
      isReply,
      replyCommentId
    }
  }
})
</script>

<style scoped lang="less">
.story-main {
  position: relative;
  height: 100%;
  background-color: #f9f9f9;
  .el-header {
    // position: relative;
    color: var(--el-text-color-primary);
    background-color: #fff;
    box-shadow: 0 2px 10px rgb(200, 200, 200);
    z-index: 100;
    text-align: center;
  }
  .el-main {
    width: 70%;
    height: calc(100% - 60px);
    background-color: #fff;
    position: absolute;
    top: 60px;
    left: 15%;
    padding: 5px 10px;

    .main-comment-div {
      width: 90%;
      margin-left: 3.5%;
      margin-bottom: 200px;

      .main-comment-span {
        font-size: 25px;
        font-weight: 700;
        display: block;
      }

      .main-comment-info {
        margin-top: 50px;
        margin-bottom: 50px;
        position: relative;
        .el-avatar {
          position: absolute;
          left: 0px;
        }
        .el-input {
          width: 95%;
          // position: absolute;
          left: 60px;
        }
        .el-button:hover {
          background: #fc5531;
          color: #fff;
        }
      }
      .comment-content {
        margin-top: 0px;
        position: relative;

        .comment-content-name {
          position: absolute;
          left: 45px;
        }
        .comment-content-createAt {
          position: absolute;
          left: 330px;
        }
        .comment-content-content {
          position: absolute;
          left: 45px;
          top: 30px;
        }
        .comment-content-reply {
          position: absolute;
          right: 10px;
        }
        .comment-content-delete {
          position: absolute;
          right: 70px;
        }
        .comment-content-input {
          margin-top: 20px;
        }
        .el-button-commentRe:hover {
          background: #fc5531;
          color: #fff;
        }
      }
    }

    .el-main-story-main-class {
      padding: 0px 40px;
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
