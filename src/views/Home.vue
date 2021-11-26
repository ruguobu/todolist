<template>
   <el-card >
     <!--头部信息【操作按钮，数据检索表单】-->
    <div class="header">
      <div><ZhztTextSearch :search="searchData" /></div>
      <div>
        <!-- <el-button type="danger"  @click="deleteMany()"
          >批量删除</el-button
        > -->
        <el-button type="primary"  @click="openEditor()"
          >新建任务</el-button
        >
      </div>
    </div>
    <!--头部信息结束-->

    <!-- 表格展示开始 -->
    <TodoTable/>
    <!-- 表格展示结束 -->
    
    <!-- 分页组件开始 -->
    <ZhztPagination/>
    <!-- 分页组件结束 -->

    <!-- 编辑弹窗组件开始 -->
    <TodoEditor ref="todoEditorRef"/>
    <!-- 编辑弹窗组件结束 -->
   </el-card>
</template>

<script>
import { ref, reactive, onMounted} from 'vue'
import TodoTable from '../components/tableList/TodoTable.vue'
import ZhztTextSearch from '../components/common/ZhztTextSearch.vue'
import ZhztPagination from '../components/common/ZhztPagination.vue'
import TodoEditor from '../components/editor/TodoEditor.vue'
export default {
  name: "Home",//组件名称
  //定义子组件
  components: {
    TodoTable,
    ZhztTextSearch,
    ZhztPagination,
    TodoEditor
  },
  setup(props, ctx){
     // 这是一个管理组件，现在开始设置管理的内容
    const state = reactive({
      queryKey: "",
      totalCount: 1,
      totalPage: 1,
      currentPage: 1,
      pageSize: 15,
      mateData: []
    });
    
    //父组件拿子组件在VUE3.0中需要这样写
    const todoEditorRef = ref(null)
    
    // 挂载后立马加载数据
    onMounted(() => {
      // updateData(GlobalValue.paginationSettings.page, GlobalValue.paginationSettings.pageSize);

    });
    
    //打开创建标签的Editor
    const openEditor = (mateObj)=>{
      console.log(todoEditorRef)
      todoEditorRef.value.open(mateObj)
    }
    return {
      openEditor,
      todoEditorRef
    }
  }

}

</script>

<style scoped lang='scss'>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  // background-color: plum;
}
</style>
