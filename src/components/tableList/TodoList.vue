<template>
  <div class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
    <div
      v-for="(item, index) in markData"
      :key="index"
      class="todoItemContent"
      @mouseenter="handleItem(index)"
      @mouseleave="leaver(index)"
    >
      <div class="mark" v-show="index == markAction">
        <div class="markContent">
          <div style="background:#67C23A" v-show="!item.status" class="typeSty" @click="typeChange(index)">
            已完成
          </div>
          <div style="background:#0F4B7A" class="projectSty" @click="toProjectDetail(item, index)">所属项目</div>
          <div style="background:#F56C6C" class="deleteSty" @click="handleDelete(item, index)">删除</div>
        </div>
      </div>
      <div class="up">
        <div class="">{{ item.name }}</div>
        <div>
          <el-button v-show="!item.status" type="info" round>进行中</el-button>
          <el-button v-show="item.status" type="success" round
            >已完成</el-button
          >
        </div>
      </div>
      <div class="middle">
        {{ item.detail }}
      </div>
      <div class="down">
        <div>{{ item.project }}</div>
        <div class="people">
          <span style="background-color: #129ef6">{{
            item.leader.charAt(0)
          }}</span>
          <span
            v-for="(info, index) in item.collaborator"
            :key="index"
            :style="{ background: randomPersonColor(index) }"
            >{{ info.charAt(0) }}</span
          >
        </div>

        <div>{{ item.opTime }} —— {{ item.edTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "TodoList",
  props: {
    onRowEdit: Function,
    onRowDelete: Function,
    tableData: Array,
  },
  setup(props) {
    const state = reactive({
      markData: [],
      markAction: -1,
    });

    const router = new useRouter();

    //函数,让映射出有
    const dataMapper = (data) => {
      return data.map((x) => {
        x.markFlag = false;
        return x;
      });
    };

    //页面数据初始化
    const pageInit = () => {
      //后端传过来的数据不够用了,新增一个操作UI的数据
      // const dataUimake = props.tableData.map((x) => {
      //   x.markFlag = false;
      //   return x;
      // });
      updataData();
    };

    //更新数据
    const updataData = () => {
      //这算是直接从本地缓存中拿数据
      const dataUimake = dataMapper(props.tableData);
      state.markData = dataUimake;
    };

    //观察props.tableData值发生变化时，重新赋新值
    // watch(props, (older,newer)=>{
    //   state.markData = props.tableData
    // })

    //更新Dom视图
    // onMounted(() => {
    //   state.markData = props.tableData
    // });

    //控制下拉显示更多内容
    const count = ref(0);
    const load = () => {
      count.value += 2;
    };

    const colors = "#339966,#884677,#ffc8dd,#9988dd".split(",");
    // 编辑事件
    const handleEdit = (index, row) => {
      if (props.onRowEdit) {
        props.onRowEdit(index, row);
      }
    };

    //删除事件
    const handleDelete = (item, index) => {
      console.log(item, index);
      if (props.onRowDelete) {
        props.onRowDelete(item, index);
      }
    };

    //点击显示遮罩层
    const handleItem = (index) => {
      state.markAction = index;
    };

    //鼠标离开
    const leaver = () => {
      state.markAction = -1;
    };

    //切换状态 完成/进行中
    const typeChange = (index) => {
      if (props.onRowEdit) {
        props.onRowEdit(index);
      }
    };

    //跳转到所选项目
    const toProjectDetail = (item, index) => {
      router.push({ name: "ProjectDetail", params: { project: item.project } });
    };

    //生成随机颜色
    const randomPersonColor = (index) => {
      return colors[index % colors.length];
    };

    //筛选状态
    const filterByStatus = (arr, status) => {
      return arr.filter((item) => item.status == status);
    };

    //筛选名字
    function filterByName(arr, name) {
      return arr.filter((item) => item.leader == name);
    }

    //全部待办
    const todoOngoing = () => {
      updataData();
    };

    //我参与的
    const todoUser = () => {
      updataData();
      state.markData = filterByName(state.markData, "续啊军");
    };

    //已完成的todo
    const todoFinish = () => {
      updataData();
      state.markData = filterByStatus(state.markData, true);
    };

    pageInit();
    return {
      ...toRefs(state),
      count,
      load,
      leaver,
      handleDelete,
      typeChange,
      handleItem,
      handleEdit,
      toProjectDetail,
      todoFinish,
      todoOngoing,
      todoUser,
      randomPersonColor,
    };
  },
};
</script>

<style lang="scss" scoped>
.mark {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  .markContent {
    color: #fff;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .typeSty,
    .projectSty,
    .deleteSty {
      cursor: pointer;
      width: 80px;
      height: 80px;
      background: plum;
      border-radius: 50%;
      text-align: center;
      line-height: 80px;
    }
  }
}

.todoItemContent {
  margin: 0 20px 20px 0;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 6px;
  position: relative;
  .up {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
  }
  .middle {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 20px 0;
  }
  .down {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .people {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: #767676;
        border-radius: 50%;
        margin: 5px;
        color: #fff;
      }
      span:nth-of-type(1) {
        width: 36px;
        height: 36px;
        line-height: 36px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
.infinite-list {
  height: 710px;
}
</style>