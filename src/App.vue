<script setup>
import { useRoute,useRouter  } from 'vue-router'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
const route = useRoute()
const router = useRouter()
const goBack = () => {
  if (route.name === 'user') {
    router.push({ name: 'user-list' })
  } else {
    router.go(-1)
  }
}
</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      
      <div class="main-title"> 
        <a-button type="link" v-if="route.name!=='user'" @click="goBack"><ArrowLeftOutlined /></a-button>
      <h2 :style="{ color: '#fff' }">Brained Task</h2>
    </div>
    </a-layout-header>
    <a-layout-content style="padding: 20px 50px">
      <div class="container_wrapper" :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">      
          <RouterView />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.main-title {
  display: flex;
  align-items: center;
  
}
.main-title h2 {
    margin: 0 0 0 20px;
  }

  .main-title .ant-btn {
    font-size: 20px;
    color:#fff;
    line-height: normal;
  }
</style>
