<template>

  <div class="myProject">
    <div class="projectContent" >
      <div class="infinite-list" v-infinite-scroll="load" style="overflow: auto"  >
        <el-card  v-for="item in projectList" :key="item"
      class="projectItemContent">
          <h1> {{item.name}} </h1>
          <h1> {{item.detail}} </h1>
      </el-card>

      </div>
    </div>
  </div>
</template>

<script>
import { localSet, localGet } from "../utils";
import { ref, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Project",
  setup(props) {
    const state = reactive({
      projectList: [
        { name: "住房系统",detail:'住房系统,查看房间使用'},
        { name: "学习系统",detail:'学习系统学习系统学习系统学习系统学习系统'},
        { name: "紧急模拟演练",detail:'部队上进行模拟训练的一个紧急模拟演练'},
        { name: "空投系统",detail:'部队上进行模拟训练的一个空投系统'},
        { name: "ToList",detail:'我公司现在没有一个专门的任务管理工具,而且无法直接使用外网的任务管理服务,需要自己开发一个'}
      ],
    });

    //页面数据初始化
    const pageInit = () => {
         updataData();
    };

    //更新数据
    const updataData = () => {
      //这算是直接从本地缓存中拿数据
      
    };


    //控制下拉显示更多内容
    const count = ref(0);
    const load = () => {
      count.value += 2;
    };

    pageInit();
    return {
      ...toRefs(state),
      count,
      load
    };
  },
};
</script>

<style lang="scss" scoped>
.myProject {
  display: flex;
  padding: 44px;
  background-image: url(../assets/ccc.png);
  background-size: 100% 100%; //(x,y)
  background-repeat: no-repeat; //不平铺
  .projectContent {
    flex: 1;
    border-radius: 14px;
    height: calc(100vh - 128px);
    box-shadow: 0 6px 10px 0 rgba(95, 101, 106, 0.6);
    background: #ffffff99;
    padding: 20px;
  }
}
.projectItemContent {
  height: 400px;
  margin: 0 20px 20px 0;
  padding: 20px;
  border-radius: 6px;
  
}
.infinite-list {
  height: calc(100vh - 128px);
  
}
</style>
