<template>
  <div class="myIndex">
    <div class="left leftContent">
      <div class="people">张兴顺</div>
      <span class="department">研发部</span>
      <el-divider></el-divider>
      <div
        class="todo"
        v-for="(item, index) in todoTab"
        :key="index"
        @click="handleTab(item, index)"
        :class="{ active: index == isActive }"
      >
        {{ item }}
      </div>
    </div>
    <div class="right rightContent">
      <div class="header">
        <div>{{ todoTab[isActive] }}</div>
        <el-button type="primary" @click="openEditor()">新建任务</el-button>
      </div>
      <el-divider></el-divider>
      <div class="todoList">
        <TodoList
          ref="todoTodoListRef"
          :tableData="todoList"
          :onRowEdit="handleUpdate"
          :onRowDelete="deleteOne"
        />
      </div>
    </div>
    <!-- 编辑弹窗组件开始 -->
    <TodoEditor ref="todoEditorRef" :onCreate="handleCreate" />
    <!-- 编辑弹窗组件结束 -->
  </div>
</template>

<script>
import { localSet, localGet } from "../utils";
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, toRefs } from "vue";
import TodoList from "@/components/tableList/TodoList.vue";
import TodoEditor from "@/components/editor/TodoEditor.vue";

export default {
  name: "Index", //组件名称
  //定义子组件
  components: {
    TodoList,
    TodoEditor,
  },
  setup() {
    // 这是一个管理组件，现在开始设置管理的内容
    const state = reactive({
      queryKey: "",
      totalCount: 1,
      totalPage: 1,
      currentPage: 1,
      pageSize: 15,
      todoList: [],
      todoTab: ["我的待办", "我参与的", "已完成的", "我的项目"],
      isActive: 0,
    });

    const router = new useRouter();

    //父组件拿子组件在VUE3.0中需要这样写
    const todoEditorRef = ref(null);
    const todoTodoListRef = ref(null);
    
    //只是加载数据用数据初始化用
    const pageInit = () => {
      updataData();
    };

    // 操作Dom的时候需要更新视图
    // onMounted(() => {
    //   axios.get("test.json").then((res) => {
    //     console.log(res.data.data, "返回的数据");
    //     state.todoList = res.data.data
    //   });
    // });

    //更新数据
    const updataData = () => {
      //这算是直接从本地缓存中拿数据
      state.todoList = localGet("todoList") || [];
      console.log(localGet("todoList"),'---初始化数据---')
    };

    //打开创建任务的Editor
    const openEditor = () => {
      todoEditorRef.value.open();
    };
    //新建任务
    const handleCreate = (todoItem) => {
      state.todoList.unshift(todoItem);
      localSet("todoList", state.todoList);
      updataData();
      todoEditorRef.value.close();
    };

    //删除
    const deleteOne = (item, index) => {
      console.log(item.project, index);
      state.todoList.splice(index,1)
      localSet("todoList", state.todoList);
      updataData();
    };

    //修改
    const handleUpdate = (index) => {
      console.log('---------------',index)
      state.todoList[index].status = !state.todoList[index].status;
      localSet("todoList", state.todoList);
    };  

    //点击切换tab
    const handleTab = (item, index) => {
      state.isActive = index;
      if (index == 0) {
        todoTodoListRef.value.todoOngoing();
      }else if(index == 1){
        todoTodoListRef.value.todoUser();
      }else if(index == 2){
        todoTodoListRef.value.todoFinish();
      }else{
         router.push({ name: "Project" });
      }
    };
    // 页面初始化
    pageInit();
    return {
      updataData,
      deleteOne,
      openEditor,
      todoEditorRef,
      todoTodoListRef,
      handleCreate,
      handleUpdate,
      handleTab,
      ...toRefs(state),
    };
  },
};
</script>


<style lang="scss">
.myIndex {
  display: flex;
  padding: 44px;
  background-image: url(../assets/ccc.png);
  background-size: 100% 100%; //(x,y)
  background-repeat: no-repeat; //不平铺
  .left {
    // width: 360px;
    width: 18%;
    margin-right: 26px;
    height: calc(100vh - 128px);
    border-radius: 14px;
    box-shadow: 0 6px 10px 0 rgba(95, 101, 106, 0.6);
    padding: 20px;
    background: #ffffff99;
  }
  .right {
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
.leftContent {
  // text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .people {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 175px;
    height: 175px;
    border-radius: 500%;
    background-color: #129ef6;
    font-size: 28px;
    font-weight: bold;
    color: #fff;
  }
  .department {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
  }
  .todo {
    background-color: #f0f0f0;
    width: 100%;
    text-align: center;
    line-height: 50px;
    padding: 4px 0;
    margin: 10px 0;
    border-radius: 6px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: #fff;
    }
  }
}
.rightContent {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
  }
}
.active {
  color: #129ef6;
}
</style>