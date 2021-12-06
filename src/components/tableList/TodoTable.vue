<template>
  <!-- <h2>{{ count }}</h2> -->
  <el-table
    ref="multipleTable"
    :data="tableDate"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <!-- <el-table-column type="selection" width="55" /> -->
    <el-table-column label="名称" width="120">
      <template #default="scope">{{ scope.row.name }}</template>
    </el-table-column>
    <el-table-column property="" label="详情" show-overflow-tooltip>
      <template #default="scope">{{ scope.row.detail }}</template>
    </el-table-column>
    <el-table-column property="" label="开始时间" show-overflow-tooltip>
      <template #default="scope">{{ scope.row.opTime }}</template>
    </el-table-column>
    <el-table-column property="" label="截至时间" show-overflow-tooltip>
      <template #default="scope">{{ scope.row.edTime }}</template>
    </el-table-column>
    <el-table-column property="" label="负责人" show-overflow-tooltip>
      <template #default="scope">{{ scope.row.leader }}</template>
    </el-table-column>
    <el-table-column property="" label="协作人" show-overflow-tooltip>
      <template #default="scope">
        <!-- {{ scope.row.collaborator }} -->
        <el-tag type="info" v-for="(item,index) in scope.row.collaborator" :key="index"> {{item}} </el-tag>
      </template>
    </el-table-column>
    <el-table-column property="" label="状态" show-overflow-tooltip>
      <template #default="scope">
        <el-tag type="info" v-show="scope.row.status == 'ongoing'"
          >进行中</el-tag
        >
        <el-tag type="success" v-show="scope.row.status == 'finish'"
          >已完成</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column property="" label="操作">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope.$index,scope.row)"
          >修改</el-button
        >
        <el-button type="danger" size="small" @click="handleDelete(scope.$index,scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
export default {
  name: "TodoTable",
  props: {
    onRowEdit: Function,
    onRowDelete: Function,
    tableDate: Array,
  },
  setup(props) {
    console.log("---setup---", props.tableDate);
    const state = reactive({
      selectedIds: [],
      tableDate: [],
    });

    watch(props.tableDate,(older,newer)=>{
      state.tableDate = newer
    })

    // 编辑事件
    const handleEdit = (index,row) => {
      console.log(props);
      if (props.onRowEdit) {
        props.onRowEdit(index,row);
      }
    };

    // 删除事件
    const handleDelete = (index,row) => {
      if (props.onRowDelete) {
        props.onRowDelete(index,row.name);
      }
    };


    return {
      ...toRefs(state),
      handleDelete,
      handleEdit,
      handleSelectionChange,
    };
  },
};
</script>
