<template>
  <div class="bankProduct-box">
    <el-row>
      <el-col :span="4">
        <el-select v-model="name" clearable placeholder="请选择姓名">
          <el-option v-for="item in names" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="bank" clearable placeholder="请选择银行卡">
          <el-option v-for="item in banks" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="el-icon-search" @click="getBankProducts()">搜索</el-button>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
        <!-- <el-button type="danger" icon="el-icon-delete" size="small" @click="mulDelete">批量删除</el-button> -->
      </el-col>
    </el-row>
    <el-table :data="bankProducts" show-summary :summary-method="getSummaries" @selection-change="selectChange" style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="bank" label="银行"></el-table-column>
      <el-table-column prop="bankCard" label="银行卡号"></el-table-column>
      <el-table-column prop="productType" label="产品类型"></el-table-column>
      <el-table-column prop="bankProduct" label="购买产品"></el-table-column>
      <el-table-column prop="investmentAmount" label="投资金额"></el-table-column>
      <el-table-column prop="interestRate" label="利率"></el-table-column>
      <el-table-column prop="interestPaymentMethod" label="付息方式"></el-table-column>
      <el-table-column prop="profitDate" label="收利日期"></el-table-column>
      <el-table-column prop="depositPeriod" label="存款期"></el-table-column>
      <el-table-column prop="expectedInterestIncomeMonth" label="利息预期收益(月)"></el-table-column>
      <el-table-column prop="expectedInterestIncomeTotal" label="利息预期收益"></el-table-column>
      <el-table-column prop="totalEffectiveUnterestIncome" label="实际利息总收益"></el-table-column>
      <el-table-column prop="principalAndInterestIncome" label="本息收益"></el-table-column>
      <el-table-column prop="buyingTime" label="买入时间"></el-table-column>
      <el-table-column prop="dueTime" label="到期时间"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
      :visible.sync="bankProductFormVisible"
      @close="resetForm('bankProductForm')"
    >
      <el-form :model="bankProduct" :rules="rules" ref="bankProductForm">
        <el-form-item label="姓名" prop="name" label-width="50px">
          <el-input v-model="bankProduct.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行" label-width="50px">
          <el-input v-model="bankProduct.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="卡号" label-width="50px">
          <el-input v-model="bankProduct.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" label-width="50px">
          <el-date-picker
            v-model="bankProduct.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bankProductFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBankProduct('bankProductForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0, //默认数据总数
      currentPage: 1, //默认开始页面
      pageSize: 10,
      bankProducts: [],
      names: ["李杰", "李艳", "李凭跃"],
      name: "",
      banks: ["中国工商银行", "招商银行", "交通银行", "天津银行"],
      bank: "",
      bankProduct: {
        id: "",
        date: "",
        name: "",
        phone: "",
        address: "",
        status: 0
      },
      bankProductBackup: Object.assign({}, this.bankProduct),
      multipleSelection: [],
      bankProductFormVisible: false,
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
    this.getBankProducts();
  },
  methods: {
    getBankProducts() {
      let postData = this.$qs.stringify({
        page: this.currentPage,
        rows: this.pageSize,
        name: this.name,
        bank: this.bank
      });
      this.loading = true;
      this.$http("/api/bankProducts")
        .then(res => {
          this.bankProducts = res.data.filter((item) => {
          let self = this;
            if ("" != this.name && "" != this.bank) {
              return item.name == this.name && item.bank == this.bank;
            }
            if ("" != this.name) {
              return item.name == this.name;
            }
            if ("" != this.bank) {
              return item.bank == this.bank;
            }
            return true;
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleEdit(index, row) {
      this.dialogTitle = "编辑";
      this.bankProduct = Object.assign({}, row);
      this.bankProductFormVisible = true;
      this.rowIndex = index;
    },
    submitbankProduct(formName) {
      // 表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.bankProduct.id;
          if (id) {
            // id非空-修改
            this.bankProducts.splice(this.rowIndex, 1, this.bankProduct);
          } else {
            // id为空-新增
            this.bankProducts.id = this.bankProducts.length + 1;
            this.bankProducts.unshift(this.bankProduct);
          }
          this.bankProductFormVisible = false;
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
          this.bankProducts.splice(index, 1);
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
      this.bankProduct = Object.assign({}, this.bankProductBackup);
      this.bankProductFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.bankProduct-box {
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
