<template>
  <div class="myProjectDetail">
    <div class="projectContent">
      <h1>所属项目 {{ $route.params.project }}</h1>
      <h2>完成进度</h2>
      <div class="projectProgress">
        <el-progress type="circle" :percentage="0"  width="200"/>
        <el-progress type="circle" :percentage="25" width="200" />
        <el-progress type="circle" :percentage="50" width="200"/>
        <el-progress type="circle" :percentage="75" width="200"/>
        <el-progress type="circle" :percentage="100" status="success" width="200"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "ProjectDetail",
  setup() {
    const router = new useRouter();
    //挂载后立马加载数据
    onMounted(() => {
      console.log(router.currentRoute.value.params.project);
    });
  },
};
</script>

<style lang="scss" scoped>
.myProjectDetail {
  display: flex;
  padding: 44px;
  background-image: url(../assets/ccc.png);
  background-size: 100% 100%; //(x,y)
  background-repeat: no-repeat; //不平铺
  .projectContent {
    // background-color: red;
    flex: 1;
    border-radius: 14px;
    height: calc(100vh - 128px);
    // overflow: hidden;
    box-shadow: 0 6px 10px 0 rgba(95, 101, 106, 0.6);
    background: #ffffff99;
    padding: 20px;
  }
}
.projectProgress {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding:20px 0;
}
</style>
