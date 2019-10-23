<template>
  <el-row>
    <el-col :span="4">
      <el-select v-model="param.name" clearable placeholder="请选择姓名">
        <el-option v-for="item in names" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-select v-model="param.bank" clearable placeholder="请选择银行">
        <el-option v-for="item in banks" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-select v-model="param.bankCard" clearable placeholder="请选择银行卡">
        <el-option v-for="item in bankCards" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </el-col>
    <el-col :span="2" :offset="1">
      <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
    </el-col>
    <el-col :span="2" :offset="6">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
      <!-- <el-button type="danger" icon="el-icon-delete" size="small" @click="mulDelete">批量删除</el-button> -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {
      currentPath: location.pathname,
      names: ["李杰", "李艳", "李凭跃"],
      banks: ["中国工商银行", "招商银行", "交通银行", "天津银行"],
      bankCards: ["622100", "65554", "6333", "6000"],
      param: {"name":"","bank":"","bankCard":""}
    };
  },
  methods: {
    search() {
      //console.log("search"+JSON.stringify(this.param) );
      this.$emit('search',this.param)
    },
    handleAdd() {
      console.log("handleAdd");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
.menu-nav:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
