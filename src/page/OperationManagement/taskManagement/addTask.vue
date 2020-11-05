<template>
  <div>
    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="taskForm" :model="taskForm" label-width="120px" :rules="rules">
          <el-form-item label="奖品商户logo" required prop="merchantLogo">
            <div class="comm-dis">
              <div class="header-banner">
                <img v-if="taskForm.merchantLogo" :src="taskForm.merchantLogo" class="avatar">
                <span class="deletImg">
                  <span class="deletImg2" @click="handleCoverDelete">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div v-show="!taskForm.merchantLogo">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadimgUrl"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="图片url" prop="merchantLogo">
            <el-input v-model="taskForm.merchantLogo" :disabled="disable" class="w500" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="商户名称" prop="merchantName">
            <el-input v-model="taskForm.merchantName" :disabled="disable" class="w500" placeholder="商户名称"></el-input>
          </el-form-item>
          <el-form-item label="奖品名称" prop="prizeName">
            <el-input :disabled="disable" v-model="taskForm.prizeName" class="w500" placeholder="奖品名称"></el-input>
          </el-form-item>
          <el-form-item label="奖品副标题" prop="prizeSubtitle">
            <el-input :disabled="disable" v-model="taskForm.prizeSubtitle" class="w500" placeholder="奖品副标题"></el-input>
          </el-form-item>
          <el-form-item label="奖品类型" prop="type">
            <el-select :disabled="disable || disableOp" v-model="taskForm.type" class="w240">
              <el-option
                v-for="item in linkOptions"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖品内容" prop="content">
            <el-input :disabled="disable || disableOp" v-model="taskForm.content" class="w500"></el-input>
            <br>
            乘车券模板ID/H5跳转链接（人传人）/小程序跳转链接（印鸽）
          </el-form-item>
          <el-form-item label="总库存" prop="stock">
            <el-input type="number" :disabled="disable" v-model="taskForm.stock" class="w240" placeholder="总库存"></el-input>
          </el-form-item>
          <el-form-item label="单日库存" prop="dailyStock">
            <el-input type="number" :disabled="disable" v-model="taskForm.dailyStock" class="w240" placeholder="单日库存"></el-input>
          </el-form-item>
          <el-form-item label="步数要求" prop="step">
            <el-input :disabled="disable || disableOp" v-model="taskForm.step" class="w240" placeholder="步数"></el-input>
          </el-form-item>
          <el-form-item v-if="!disable">
            <el-button type="primary" @click="submitForm('taskForm')" class="mt20">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import taskManageService from "../../../service/OperationManagement/taskManagement.js";
import apiHost from "@/hostconfig/index";
import _ from "lodash";
export default {
  data() {
    return {
      taskClassifyOptions: [],
      linkOptions: [
        {
          typeId: 1,
          typeName: '乘车券'
        },
        {
          typeId: 2,
          typeName: 'H5跳转'
        },
        {
          typeId: 3,
          typeName: '小程序外跳'
        }
      ],
      disable: false,
      disableOp: false,
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      taskForm: {
        merchantLogo: "",
        id: "",
        merchantName: '',
        prizeName: '',
        prizeSubtitle: '',
        step: '',
        stock: '',
        dailyStock: ''
      },
      rules: {
        taskType: [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ],
        merchantName: [{ required: true, message: "请输入商户名称", trigger: "change" }],
        step: [
          { required: true, message: "请输入步数要求", trigger: "change" },
          {
            validator(rule, value, callback) {
              var reg = /^-?\d{1,15}(?:\.\d{0})?$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("请输入整数"));
              }
            },
            trigger: "change"
          }
        ],
        prizeName: [
          { required: true, message: "请输入奖品名称", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择奖品类型", trigger: "change" }
        ],
        content: [{ required: true, message: "请输入奖品内容", trigger: "change" }],
        prizeSubtitle: [
          { required: true, message: "请输入奖品副标题", trigger: "change" }
        ],
        merchantLogo: [{ required: true, message: "请上传图片", trigger: "blur" }]
      }
    };
  },
  created() {
    const routeName = this.$route.name || "addTask";
    if(routeName !== 'addTask') {
      this.getTaskDetails()
    }
    if (routeName === "checkTask") {
      this.disable = true
    } else if (routeName === "updateTask") {
      this.disableOp = true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addTask();
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleCoverSuccess(res, file) {
      this.taskForm.merchantLogo = `https://${res.data}`;
    },
    handleCoverDelete() {
      this.$confirm("是否删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.taskForm.merchantLogo = ''
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已撤销"
          });
        });
    },
    //获取任务详情
    getTaskDetails() {
      taskManageService.getTaskDetails(this.$route.query.id).then(
        response => {
          this.taskForm = JSON.parse(JSON.stringify(response.data));
          // this.taskForm.id = this.$route.query.id;
        },
        response => {
          this.$message.error(
            response.sub_msg || response.msg || "请求服务器连接失败!"
          );
        }
      );
    },

    // 新增任务、编辑任务
    addTask() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      if (routeName === "addTask") {
        console.log("test", data);
        taskManageService.addTask(data).then(
          response => {
            if (response.code === "20000") {
              this.$router.go(-1);
            } else {
              this.$message.error(
                response.sub_msg || response.msg || "新增任务失败!"
              );
            }
          },
          response => {
            this.$message.error(
              response.sub_msg || response.msg || "请求服务器连接失败!"
            );
          }
        );
      } else if (routeName === "updateTask") {
        taskManageService.updateTask(data).then(
          response => {
            if (response.code === "20000") {
              this.$router.go(-1);
            } else {
              this.$message.error(
                response.sub_msg || response.msg || "编辑任务失败!"
              );
            }
          },
          response => {
            this.$message.error(
              response.sub_msg || response.msg || "请求服务器连接失败!"
            );
          }
        );
      }
    },
    //参数处理
    handparams() {
      const self = this;
      const params = JSON.parse(JSON.stringify(self.taskForm));
      return params;
    }
  }
};
</script>
<style lang="scss">
.voucher-container {
  margin-top: 10px;
  border: solid 1px #ddd;
  border-bottom: none;
  min-width: 400px;
  max-width: 600px;
}
.voucher-cell {
  display: flex;
  align-items: center;
  border-bottom: solid 1px #ddd;
  padding: 5px;
  min-width: 400px;
  .voucher-id {
    width: 120px;
    border-right: solid 1px #ddd;
    text-align: center;
  }
  .voucher-name {
    min-width: 200px;
    max-width: 400px;
    text-indent: 10px;
  }
  .voucher-btn {
    color: #409eff;
    font-size: 14px;
  }
}
.w400 {
  width: 400px;
}
.comm-dis {
  display: flex;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  margin: 10px 10px 0 0;
}
.header-banner {
  position: relative;
}
.deletImg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.deletImg:hover {
  opacity: 1;
}
.deletImg2 {
  position: absolute;
  top: 40%;
  left: 45%;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

