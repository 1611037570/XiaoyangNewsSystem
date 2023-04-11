<template>
  <view class="content">
    <van-button type="primary" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
const title = ref("Hello")
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
