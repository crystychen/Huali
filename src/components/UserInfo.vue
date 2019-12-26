<template>
  <div class="container">
    <h1>{{msg}}</h1>
    <el-row>
      <el-col>
        <div>
          <el-form :inline="true">
            <el-form-item style="float:left"
                          label="查询用户信息">
              <el-input v-model="keyUser"
                        placeholder="查询所需要的内容......"></el-input>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="primary"
                         size="small"
                         icon="el-icon-edit-outline"
                         @click="handleAdd()">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table">
          <!-- style="width: 100%" -->
          <el-table :data="tableData"
                    border
                    >
            <el-table-column prop="date"
                             label="日期"
                             width="120">
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名"
                             width="120">
            </el-table-column>
            <el-table-column prop="address"
                             label="地址"
                             width="300">
            </el-table-column>
            <el-table-column label="操作"
                             fixed="right">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini"
                           type="danger"
                           @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      msg: '用户信息管理',
      keyUser: "",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 80%;
  margin: 0 auto
}
.table {

}
</style>
