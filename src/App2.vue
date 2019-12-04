<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <el-radio-group v-model="radio1">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
    <router-view/>
  </div>
</template>

<script>
import tableView from './components/tableView.vue'
import lineChart from './components/lineChart.vue'
import barChart from './components/barChart.vue'
import defaultTable from './components/customizeDefaultTable.vue'

export default {
  name: 'App',
  components: {
    tableView,
    lineChart,
    barChart,
    defaultTable
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
