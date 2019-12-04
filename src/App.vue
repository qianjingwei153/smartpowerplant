<template>
  <div id="app">
    <el-container>
        <!--顶部标题-->
      <el-header>
        <el-container>
          <div style="text-align: left; width: 20%">
            <h1 align="center">智慧电厂故障报警管理系统</h1>
          </div>
          <div style="text-align: right; width: 80%;line-height: 60px">
            <span>操作员1</span>
            <el-dropdown >
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-container>
      </el-header>
<!--body内容-->
      <el-container ref="homePage" style="border: 1px solid #eee">
          <!--左侧导航栏-->
        <el-aside width="200px">
          <el-menu  v-for="(nav, index) in navigationBars" v-bind:key="nav.id">
            <template v-if="nav.content.length === 0">
              <el-menu-item index="nav.index"
                            v-bind:key="nav.id"
                            @click="addParent(index)"
              >
                <i :class="nav.icon"></i>
                <span slot="title">{{nav.title}}</span>
              </el-menu-item>
            </template>
            <template v-else>
              <el-submenu  index="nav.index">
                <template slot="title">
                  <i :class="nav.icon"></i>
                  <span>{{ nav.title}}</span>
                </template>
                <el-menu-item v-for="(subNav, subIndex) in nav.content"
                              v-bind:key="subNav.id"
                              @click="addTab(index,subIndex)"
                              :index="nav.index+'-'+subNav.index"> {{ subNav.title }} </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
          <!--主页面-->
        <el-main>
<!--          <router-view/>-->
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in editableTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
            >
              <!--判断要打开哪个子tab标签-->
              <div v-if="item.link === 'tableView'">
                <tableView v-bind:index="index"></tableView>
              </div>
              <div v-else-if="item.link === 'lineChart'">
                <lineChart  v-bind:chartdata="chartdata1" v-bind:options="chartoptions1"></lineChart>
              </div>
              <div v-else-if="item.link === 'barChart'">
                <barChart v-bind:chartdata="chartdata2" v-bind:options="chartoptions2"></barChart>
              </div>
              <div v-else-if="item.link === 'customizeDefaultTable'">
                <customizeDefaultTable></customizeDefaultTable>
              </div>
              <div v-else-if="item.link === 'demoToTomcat'">
                <demoToTomcat></demoToTomcat>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>/* eslint-disable */
  import tableView from './components/tableView.vue'
  import lineChart from './components/lineChart.vue'
  import barChart from './components/barChart.vue'
  import customizeDefaultTable from './components/customizeDefaultTable.vue'
  import demoToTomcat from './components/demoToTomcat.vue'

  export default {
    components: {
      tableView,
      lineChart,
      barChart,
      customizeDefaultTable,
      demoToTomcat,
    },
    data() {

      return {
        chartdata2: {
          labels: ['AG01DB023', 'AG01CB112', 'AG01CB30', 'AG01CB21', 'AG01CA025', 'AG01CA008', 'AG01DB021'],
          datasets: [
            {
              label: '报警点名',
              backgroundColor: '#FC2525',
              data: [90, 71, 70, 41, 21, 15, 11]
            },
          ]
        },
        chartoptions1 :{responsive: true, maintainAspectRatio: false},
        chartoptions2 :{responsive: true, maintainAspectRatio: false},
        clientHeight: '',
        navigationBars: [
          // {
          //   title:'测试tomcat连接',
          //   link:'demoToTomcat',
          //   content:[],
          // },
                {
          title: '定制报警一览表',
            icon:'el-icon-user-solid',
            link:'customizeDefaultTable',
          content:[]
        },{
          title: '报警管理',
          icon:'el-icon-menu',
          content: [{
            title: '报警一览表',
            link: 'tableView'
          },{
            title: '自定义报警',
            link: 'lineChart'
          },{
            title: '智能报警抑制',
            link: 'barChart'
          },]
        },{
          title: '故障诊断',
          icon: 'el-icon-document',
          content : [{
            title: '报警趋势查看',
            link: 'lineChart'
          },{
            title: '智能报警故障指导',
            link: 'tableView'
          }]
        },{
          title: '报警分析',
          icon: 'el-icon-setting',
          content : [{
            title: '最持久报警',
            link: 'barChart'
          },{
            title: '最频繁报警',
            link: 'barChart'
          }]
        },{
          title: '历史报警查看',
          icon: 'el-icon-s-flag',
          link: 'tableView',
          content:[]
        }],
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 0
      }
    },

    mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`
      //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },

    methods: {
      //添加没有子目录的导航
      addParent(index){
        let newTabName = ++this.tabIndex + '';
        var nav = this.navigationBars[index];
        this.editableTabs.push({
          title: nav.title,
          name: newTabName,
          link: nav.link
        });
        this.editableTabsValue = newTabName;
      },
      changeFixed(clientHeight){ //动态修改样式
        // console.log(clientHeight);
        // console.log(this.$refs.homePage.$el.style.height);
        this.$refs.homePage.$el.style.height = clientHeight - 60 + 'px';
      },
      //添加拥有子目录的导航
      addTab(navindex,subnavindex) {
        let newTabName = ++this.tabIndex + '';
        var subnav = this.navigationBars[navindex].content[subnavindex];
        this.editableTabs.push({
          title: subnav.title,
          name: newTabName,
          link: subnav.link
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
  }

</style>
