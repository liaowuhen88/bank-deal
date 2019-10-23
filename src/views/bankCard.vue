<template>
  <div class="bank-box">
    <searchs @search="getBanks" />

    <el-table :data="banks" show-summary @selection-change="selectChange" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="bank" label="银行"></el-table-column>
      <el-table-column prop="bankCard" label="银行卡号"></el-table-column>
      <el-table-column prop="cashAamount" label="现金金额"></el-table-column>
      <el-table-column prop="investmentAmount" label="投资金额"></el-table-column>
      <el-table-column prop="accountBalance" label="总金额"></el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-sizes="[10, 20, 30, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <el-dialog
      :title="dialogTitle"
      width="600px"
      :visible.sync="bankFormVisible"
      @close="resetForm('bankForm')"
    >
      <el-form :model="bank" :rules="rules" ref="bankForm">
        <el-form-item label="姓名" prop="name" label-width="50px">
          <el-input v-model="bank.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行" label-width="50px">
          <el-input v-model="bank.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="卡号" label-width="50px">
          <el-input v-model="bank.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" label-width="50px">
          <el-date-picker
            v-model="bank.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bankFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBank('bankForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchs from "@/components/search/search";
export default {
  data() {
    return {
      banks: [],
      bank: {
        id: "",
        date: "",
        name: "",
        phone: "",
        address: "",
        status: 0
      },
      bankBackup: Object.assign({}, this.bank),
      multipleSelection: [],
      bankFormVisible: false,
      dialogTitle: "",
      rowIndex: 9999,
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getBanks();
  },
  components: {
    searchs
  },
  props: ["param"],
  methods: {
    getBanks(param) {
      this.loading = true;
      this.$http("/api/banks")
        .then(res => {
          this.banks = res.data.filter(item => {
            if (param) {
              if ("" != param.name && "" != param.bank) {
                return item.name == param.name && item.bank == param.bank;
              }
              if ("" != param.name) {
                return item.name == param.name;
              }
              if ("" != param.bank) {
                return item.bank == param.bank;
              }
              return true;
            } else {
              return true;
            }
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.bank = Object.assign({}, row);
      this.bankFormVisible = true;
      this.rowIndex = index;
    },
    submitBank(formName) {
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.bank.id;
          if (id) {
            // id非空-修改
            this.banks.splice(this.rowIndex, 1, this.bank);
          } else {
            // id为空-新增
            this.bank.id = this.banks.length + 1;
            this.banks.unshift(this.bank);
          }
          this.bankFormVisible = false;
          this.$message({
            type: "success",
            message: id ? "修改成功！" : "新增成功！"
          });
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm(`确定删除用户 【${row.name}】 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.banks.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    resetForm(formName) {
      this.$refs[formName].clearValidate();
    },
    mulDelete() {
      let len = this.multipleSelection.length;
      if (len === 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一项！"
        });
      } else {
        this.$confirm(`确定删除选中的 ${len} 个用户吗？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: `成功删除了${len}条数据！`
            });
          })
          .catch(() => {
            console.log("取消删除");
          });
      }
    },
    selectChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.dialogTitle = "新增";
      this.bank = Object.assign({}, this.bankBackup);
      this.bankFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.bank-box {
  width: 100%;
  .tool-box {
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
