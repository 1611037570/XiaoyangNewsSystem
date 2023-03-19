<template>
  <div style="height: 100%">
    <Editor :newsId="newsId"></Editor>
  </div>
</template>

<script>
import Editor from "@/components/Editor"

export default {
  data() {
    return {
      newsId: null
    }
  },
  components: {
    Editor
  },
  created() {
    this.newsId = this.$route.query.newsId
  }
}
</script>

<style lang="less" scoped></style>
