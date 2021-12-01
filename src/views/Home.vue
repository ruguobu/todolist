<template>
  <el-card>
    <!--头部信息【操作按钮，数据检索表单】-->
    <div class="header">
      <div><ZhztTextSearch :search="searchData" /></div>
      <div>
        <!-- <el-button type="danger"  @click="deleteMany()"
          >批量删除</el-button
        > -->
        <el-button type="primary" @click="openEditor()">新建任务</el-button>
      </div>
    </div>
    <!--头部信息结束-->

    <!-- 表格展示开始 -->
    <TodoTable
      :tableDate="todoList"
      :onRowEdit="openEditor"
      :onRowDelete="deleteOne"
    />
    <!-- 表格展示结束 -->

    <!-- 分页组件开始 -->
    <ZhztPagination
      :updataData="updataData"
      :pageSize="5"
      :currentPage="1"
      :totalCount="10"
    />
    <!-- 分页组件结束 -->

    <!-- 编辑弹窗组件开始 -->
    <TodoEditor ref="todoEditorRef" :onCreate="handleCreate" :onUpdate="handleUpdate"/>
    <!-- 编辑弹窗组件结束 -->
  </el-card>
</template>

<script>
import axios from "axios";
import { ref, reactive, onMounted, toRefs } from "vue";
import { localSet, localGet } from "../utils";
import TodoTable from "@/components/tableList/TodoTable.vue";
import ZhztTextSearch from "@/components/common/ZhztTextSearch.vue";
import ZhztPagination from "@/components/common/ZhztPagination.vue";
import TodoEditor from "@/components/editor/TodoEditor.vue";
import GlobalValue from "@/config/settings";
export default {
  name: "Home", //组件名称
  //定义子组件
  components: {
    TodoTable,
    ZhztTextSearch,
    ZhztPagination,
    TodoEditor,
  },
  setup(props, ctx) {
    // 这是一个管理组件，现在开始设置管理的内容
    const state = reactive({
      queryKey: "",
      totalCount: 1,
      totalPage: 1,
      currentPage: 1,
      pageSize: 15,
      todoList: [],
    });

    //父组件拿子组件在VUE3.0中需要这样写
    const todoEditorRef = ref(null);

    // 挂载后立马加载数据
    // onMounted(() => {
    //   axios.get("test.json").then((res) => {
    //     console.log(res.data.data, "返回的数据");
    //     state.todoList = res.data.data
    //   });
    // });

    //挂载后立马加载数据
    onMounted(() => {
      updataData(
        GlobalValue.paginationSettings.page,
        GlobalValue.paginationSettings.pageSize
      );
      console.log(state.todoList, "初始化数据");
    });

    //更新数据
    const updataData = (page, pageSize) => {
      state.todoList = localGet("todoList");
    };

    //打开创建任务的Editor
    const openEditor = (index,todoObj) => {
      console.log(index,todoObj,"好好学习")
      todoEditorRef.value.open(todoObj);
      happy(index)
    };

    const happy = (index)=>{
       
    }

    //修改
    const handleUpdate = (todoItem)=>{
       console.log("标签名", todoItem);
      state.todoList[0] = todoItem;
      todoEditorRef.value.close();
    }

    //新建任务
    const handleCreate = (todoItem) => {
      console.log("任务", todoItem);
      state.todoList.push(todoItem);
      todoEditorRef.value.close();
      localSet("todoList", state.todoList);
    };

    //删除
    const deleteOne = (index,name) => {
      state.todoList.splice(index, 1);
    };
    

    return {
      updataData,
      deleteOne,
      openEditor,
      todoEditorRef,
      handleCreate,
      handleUpdate,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  // background-color: plum;
}
.el-pagination {
  margin-top: 18 px;
}
</style>
