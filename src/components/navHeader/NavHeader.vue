<template>
  <div>
    <input placeholder="请输入任务名称" v-model="value"/>
  </div>
</template>

<script>
import { ref, reactive, toRefs, } from 'vue'
export default {
  name: "NavHeader",//组件名称
  //接收父组件的数据
  props: {

  },
  //定义子组件
  components: {

  },
  setup(props, ctx){
    const state = reactive({
      value:"哈哈"
    })

    return {
      ...toRefs(state)

    }
  }

}

</script>

<style scoped lang='scss'>

</style>
