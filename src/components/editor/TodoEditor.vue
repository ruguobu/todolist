<template>
  <!-- 修改标签dialog -->
  <el-dialog
    v-model="visible"
    :title="editType == 1 ? '新增任务' : '修改任务'"
    width="500px"
    center
    custom-class="radiused-dialog"
  >
    <el-form ref="ruleForm" :rules="rules" :model="dataForm" label-position="left" label-width="80px">
      <el-form-item label="事件名" prop="name">
        <el-input
          v-model="dataForm.name"
          placeholder="请输入事件名"
          clearable
        />
      </el-form-item>
      <el-form-item label="所属项目" >
        <el-select v-model="dataForm.project" placeholder="请选择所属项目">
          <el-option
            v-for="item in allProject"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="dateTime"
          type="daterange"
          value-format="YYYY-MM-DD"
          @change="changeDate"
          unlink-panels
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="领导人">
        <el-select v-model="dataForm.leader" placeholder="请选择领导人">
          <el-option
            v-for="item in allPeoples"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="协作人">
        <el-select v-model="dataForm.collaborator" multiple placeholder="请选择协作人">
          <el-option
            v-for="item in allPeoples"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情" prop="detail">
        <el-input
          v-model="dataForm.detail"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="createOrUpdateMate">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改标签dialog结束 -->
</template> 

<script>
import { toRefs, reactive, ref } from "vue";

export default {
  name: "TodoEditor",
  props: {
    onCreate: Function,
    onUpdate: Function,
  },
  setup(props) {
    // console.log('---setup---',props)
    const ruleForm = ref(null);
    const state = reactive({
      dataForm: {
        name: "",
        detail: "",
        opTime: "",
        edTime: "",
        leader: "",
        project:"",
        collaborator: [],
        status: false,
      },
      rules: {
        name: [{ required: true, message: "事件名不能为空", trigger: "blur" }],
        detail: [{ required: true, message: "详情不能为空", trigger: "blur" }],
      },
      allPeoples: [
        { value: "安明哲"},
        { value: "杨文慧"},
        { value: "续啊军"},
        { value: "聂佳豪"},
        { value: "张兴顺"}
      ],
      allProject: [
        { value: "住房系统"},
        { value: "学习系统"},
        { value: "紧急模拟演练"},
        { value: "空投系统"},
        { value: "ToList"}
      ],
      visible: false,
      editType: 1, //1为新增 2为修改
      dateTime: [],
    });

    //起止时间选择触发
    const changeDate = () => {
      let opTime = state.dateTime[0].split("-")
      let edTime = state.dateTime[1].split("-")
      state.dataForm.opTime = opTime[0]+"年"+opTime[1]+"月"+opTime[2]+"日";
      state.dataForm.edTime = edTime[0]+"年"+edTime[1]+"月"+edTime[2]+"日";
      console.log(state.dataForm.opTime)
    };

    // 打开弹出框【用于编辑标签资源】
    const open = (todoObj) => {
      state.visible = true;
      if (!todoObj) {
        state.editType = 1;
      } else {
        state.editType = 2;
        state.dataForm = { ...todoObj };
      }
    };

    // 关闭弹出框
    const close = () => {
      state.dataForm.name = "";
      state.dataForm.detail = "";
      state.dataForm.opTime = "";
      state.dataForm.edTime = "";
      state.dataForm.leader = "";
      state.dataForm.project = "";
      state.dataForm.collaborator = "";
      state.visible = false;
    };

    // 增加或修改数据
    const createOrUpdateMate = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          if (state.editType == 1) {
            if (props.onCreate) {
              let obj = Object.assign({}, state.dataForm);
              props.onCreate(obj);
            }
          } else {
            if (props.onUpdate) {
              console.log("修改");
              let obj = Object.assign({}, state.dataForm);
              props.onUpdate(obj);
            }
          }
        }
      });
    };

    return {
      ...toRefs(state),
      open,
      close,
      ruleForm,
      changeDate,
      createOrUpdateMate,
    };
  },
};
</script>

<style>
.radiused-dialog {
    /* background: #FFFFFF11; */
    border-radius: 20px !important;
    background: rgba(255, 255,255, 0.92) !important;
}


</style>
