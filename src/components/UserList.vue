<template>
  <div class="uselist">
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop='_id'
      label="用户id"
      >
    </el-table-column>
    <el-table-column
      prop='usename'
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop='password'
      label="密码">
     </el-table-column>
    <el-table-column
      prop='age'
      label="年龄"
      >
     </el-table-column>
      
  </el-table>
  </div>
</template>



<script>

export default {
  data(){
    return{
      tableData:[]
    }
  },
  created(){
    this.$store.dispatch('getUser').then(()=>{
          this.tableData = this.$store.state.userList
    })
  }
}
</script>

<style>

</style>
