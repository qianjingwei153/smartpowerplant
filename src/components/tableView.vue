<template>
    <div>
<!--        <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--            <el-form-item v-for="item in formTitle"-->
<!--                          :label="item.title"-->
<!--                          v-bind:key="item.id" >-->
<!--                <div v-if="item.type === 'select'">-->
<!--                    <el-select :value="formInline[item.t]" v-model="formInline[item.content]">-->
<!--                        <el-option  v-for="subItem in item.content"-->
<!--                                    v-bind:key="subItem.id"-->
<!--                                    :value="subItem.title"-->
<!--                                    :label="subItem.title"></el-option>-->
<!--                    </el-select>-->
<!--                </div>-->
<!--                <div v-else-if="item.type === 'string'">-->
<!--                    <el-input   type = "alarm_name" v-model="alarm_name" placeholder="请输入查询条件"></el-input>-->
<!--                </div>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--                <el-button type="primary" @click="onSubmit">查询</el-button>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
        <!--<span>{{ index }}</span>-->
        <el-form :inline="true" :model="selectTable" class="demo-form-inline">
          <el-form-item label="报警名称">
            <el-input v-model="selectTable.alarm_name" placeholder="请输入报警名" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="报警类型">
            <el-select v-model="selectTable.alarm_type" placeholder="请输入报警类型">
              <el-option label="请选择" value=""></el-option>
              <el-option label="A" value="A"></el-option>
              <el-option label="W" value="W"></el-option>
              <el-option label="T" value="T"></el-option>
              <el-option label="I&C" value="I&C"></el-option>
              <el-option label="C" value="C"></el-option>
              <el-option label="M" value="M"></el-option>
              <el-option label="S" value="S"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报警优先级">
            <el-select v-model="selectTable.alarm_priority" placeholder="请输入报警优先级">
              <el-option label="请选择" value=""></el-option>
              <el-option label="0" value="0"></el-option>
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报警状态">
            <el-select v-model="selectTable.alarm_state" placeholder="请输入报警状态">
              <el-option label="请选择" value=""></el-option>
              <el-option label="出现" value="出现"></el-option>
              <el-option label="消失" value="消失"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column v-for="title in tableTitle"
                             :prop="title.prop"
                             :label="title.label"
                             v-bind:key="title.id"
                             :width="title.width">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>/* eslint-disable */
import axios from "axios";
export default {
  props: ['index'],
  data: function () {
    return {
      selectTable: {
        alarm_name:'',
        alarm_type:'',
        alarm_priority:'',
        alarm_state:'',
      },
      formTitle: [{
        title: '报警名称',
        t:'alarm_name',
        type: 'string'
      },{
        title: '报警类型',
        t: 'alarm_type',
        type: 'select',
        content: [{
          title: 'A'
        },{
          title: 'W'
        },{
          title: 'T'
        }]
      },{
        title: '优先级',
        t:'alarm_priority',
        type: 'select',
        content: [{
          title: '0'
        },{
          title: '1'
        },{
          title: '2'
        },{
          title: '3'
        }]
      },{
        title: '报警状态',
        t:'alarm_state',
        type: 'select',
        content: [{
          title: '出现'
        },{
          title: '消失'
        }]
      }],
      tableTitle: [{label: "报警类型", prop:"alarm_type", width:"100"},
        {label: "报警确认", prop:"if_ack", width:"100"},
        {label: "报警名称", prop:"alarm_name", width:"200"},
        {label: "报警状态", prop:"alarm_state", width:"100"},
        {label: "报警子系统", prop:"alarm_sub_system_name", width:"100"},
        {label: "报警描述", prop:"alarm_comment", width:"200"},
        {label: "报警优先级", prop:"alarm_priority", width:"100"},
        {label: "出现时间", prop:"occur_time", width:"200"},
        {label: "消失时间", prop:"disappear_time", width:"200"}],
      tableData: [
        {
          alarm_type:'T',
          if_ack:'',
          alarm_name:'AG01CA025',
          alarm_state:'出现',
          alarm_sub_system_name:'冷却水',
          alarm_comment:'#1机组冷却水25水位预警',
          alarm_priority:'0',
          occur_time:'2019-6-14 15:50:31',
          disappear_time:'',
        },
        {
          alarm_type:'W',
          if_ack:'是',
          alarm_name:'AG01CF002',
          alarm_state:'消失',
          alarm_sub_system_name:'汽轮机',
          alarm_comment:'#1机组汽轮机2转速超速',
          alarm_priority:'0',
          occur_time:'2019-6-14 12:55:30',
          disappear_time:'2019-6-14 13:55:50',
        },
        {
          alarm_type:'A',
          if_ack:'',
          alarm_name:'AG01DB020',
          alarm_state:'出现',
          alarm_sub_system_name:'风烟',
          alarm_comment:'#1机组风烟20转速超速',
          alarm_priority:'0',
          occur_time:'2019-6-14 13:50:31',
          disappear_time:'',
        },
        {
          alarm_type:'A',
          if_ack:'',
          alarm_name:'AG01DB023',
          alarm_state:'出现',
          alarm_sub_system_name:'风烟',
          alarm_comment:'#1机组风烟23转速超速',
          alarm_priority:'0',
          occur_time:'2019-6-14 13:40:31',
          disappear_time:'',
        },
        {
          alarm_type:'A',
          if_ack:'',
          alarm_name:'AG01CB112',
          alarm_state:'出现',
          alarm_sub_system_name:'锅炉',
          alarm_comment:'#1机组锅炉112温度超限',
          alarm_priority:'0',
          occur_time:'2019-6-14 12:50:40',
          disappear_time:'',
        },
        {
          alarm_type:'A',
          if_ack:'是',
          alarm_name:'AG01CB30',
          alarm_state:'出现',
          alarm_sub_system_name:'锅炉',
          alarm_comment:'#1机组锅炉30温度超限',
          alarm_priority:'0',
          occur_time:'2019-6-14 12:50:40',
          disappear_time:'2019-6-14 12:55:41',
        },
        {
          alarm_type:'W',
          if_ack:'是',
          alarm_name:'AG01CB21',
          alarm_state:'出现',
          alarm_sub_system_name:'锅炉',
          alarm_comment:'#1机组锅炉21温度超限',
          alarm_priority:'0',
          occur_time:'2019-6-14 08:15:05',
          disappear_time:'2019-6-14 08:25:15',
        }
      ],

    }
  },
  methods: {
    //提交查询报警一览表请求
    onSubmit() {
      //refresh当前页面
      this.tableData = window.tableData
      //过滤器
      let filter=(condition,data)=>{
        return data.filter( item => {
          return Object.keys( condition ).every( key => {
            return String( item[ key ] ).toLowerCase().includes(
              String( condition[ key ] ).trim().toLowerCase() )
          } )
        } )
      }
      var conditionalarm_name = {
        alarm_name:this.selectTable.alarm_name,
        alarm_type:this.selectTable.alarm_type,
        alarm_priority:this.selectTable.alarm_priority,
        alarm_state:this.selectTable.alarm_state
      }
      this.tableData=filter(conditionalarm_name,this.tableData)

    }
  },
  created(){
    axios.get("http://localhost:8080/alarmTableController/getTableData").then((res) => {
      //设置全局变量window.tableData缓存当前查询的值
      window.tableData = res.data
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
