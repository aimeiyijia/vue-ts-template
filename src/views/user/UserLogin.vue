<template>
  <div class="login-wrap">
    <div class="login-main">
      <div class="login-main_header">
        <i></i>
        <div class="login-main_header-name">破产案件综合管理信息系统</div>
        <div class="login-main_header-englishname">
          Comprehensive management information system for bankruptcy cases
        </div>
        <div class="tips">管理人平台</div>
      </div>
      <div class="login-main_form">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-width="0px"
          class="login-form"
        >
          <el-form-item prop="userName">
            <span class="formPrefix-icon">
              <svg-icon name="acc" />
            </span>
            <el-input
              v-model="loginForm.userName"
              placeholder="请输入登录账号"
              class="login_input"
              prefix-icon="test"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="formPrefix-icon">
              <svg-icon name="password" />
            </span>
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              class="login_input"
              prefix-icon="test"
            />
          </el-form-item>
          <el-form-item prop="verifyCode">
            <div class="verify-form">
              <span class="formPrefix-icon">
                <svg-icon name="verify" />
              </span>
              <el-input
                placeholder="请输入验证码"
                v-model="loginForm.verifyCode"
                class="verify-input"
                prefix-icon="test"
              />
              <span class="verify-img" @click="handleRefreshVerifyImg">
                <img v-if="verifyImgUrl" :src="verifyImgUrl" />
              </span>
            </div>
          </el-form-item>
        </el-form>
        <div class="login-main-forget">
          <span class="link">忘记密码</span>
        </div>
        <div class="login-main_btn">
          <el-button class="btn" type="primary" @click="handleLogin"
            >登录</el-button
          >
        </div>
        <div class="login-main_assist">
          <el-checkbox v-model="remember">记住账号</el-checkbox>
          <span class="switch link">债权人平台</span>
          <span class="link">申请注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AxiosError } from 'axios'
import { Form as ElForm, Input } from 'element-ui'
import { uuid } from '@/utils/utility'
import { UserModule } from '@/store/modules/user'
import { $getVerifyCode, $postOrgUserLogin, $postUserByCode } from '@/api/user'
const imgFail = require('@/assets/images/img-fail.png')

interface IVerifyImg {
  uuid: string
}

@Component({
  name: 'UserLogin'
})
export default class extends Vue {
  private loginForm = {
    userName: '',
    password: '',
    roleCode: 'glr',
    verifyCode: '',
    uuid: uuid()
  };

  private verifyImgUrl = '';

  private loginRules = {
    userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  };

  private remember = false;

  created() {
    this.getRememberUser()
    this.setVerifyImg()
    UserModule.SetToken('123')
    console.log(UserModule, '用户模块')
  }

  // 点击登陆按钮
  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        const loginRes = await this.login()
        if (loginRes.code === 200) {
          const { data } = loginRes
          // 获取并存储token
          UserModule.SetToken(data.token)
          // 获取用户信息
          const userinfo = await this.getUserByCode(data.userCode)
          // 获取并存储用户信息
          UserModule.SetUserInfo(userinfo)
          // 获取并存储菜单
          // 获取并存储权限
          const { menus, pageResources } = userinfo.resourceDto
        } else {
          this.handleRefreshVerifyImg()
          this.$message.warning(loginRes.msg)
        }
        return true
      } else {
        return false
      }
    })
  }

  // 登陆
  private async login() {
    try {
      const params = this.loginForm
      return await $postOrgUserLogin(this.$qs.stringify(params))
    } catch (error) {
      console.log(error)
    }
  }

  // 获取用户信息
  private async getUserByCode(userCode: string) {
    try {
      return await $postUserByCode(
        this.$qs.stringify({ userCode, roleCode: this.loginForm.roleCode })
      )
    } catch (error) {
      console.log(error)
    }
  }

  // 获取记住的用户
  private getRememberUser() {
    const savedAcc = localStorage.getItem('savedAcc')
    if (savedAcc) {
      const saveObj = JSON.parse(savedAcc)
      if (saveObj.save === true) {
        this.remember = true
        this.loginForm.userName = saveObj.userName
      }
    }
  }

  // 勾选记住
  private rememberUser() {
    if (this.remember) {
      localStorage.setItem(
        'savedAcc',
        JSON.stringify({ save: 'true', userName: this.loginForm.userName })
      )
    } else {
      localStorage.removeItem('savedAcc')
    }
  }

  // 刷新验证码
  private handleRefreshVerifyImg() {
    this.setVerifyImg()
  }

  // 设置验证码
  private async setVerifyImg() {
    const params = {
      uuid: this.loginForm.uuid
    }
    this.verifyImgUrl = await this.getVerifyImg(params)
  }

  // 获取验证码
  private async getVerifyImg(params: IVerifyImg): Promise<string> {
    try {
      const res = await $getVerifyCode(params)
      if (res.code === 200) {
        return res.data
      }
      return imgFail
    } catch (error) {
      console.log(error)
      return imgFail
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  color: #fff;
  stroke-width: 24px;
  stroke: white;
}
::v-deep .el-input .el-input__inner {
  height: 54px;
  margin: 0;
  background: transparent;
  border: 1px solid #9ba0c3;
  padding-left: 86px;
  height: 54px;
  line-height: 54px;
  font-size: 18px;
  color: #fff;
  &::placeholder {
    color: #fff;
  }
  &::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: #fff;
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    color: #fff;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    color: #fff;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    color: #fff;
  }
}
.formPrefix-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px !important;
  height: 54px !important;
  border-right: 1px solid #9ba0c3;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9;
  & > svg {
    font-size: 24px;
  }
}
.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/images/login/bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  .login-main {
    width: 600px;
    .login-main_header {
      width: 100%;
      height: 250px;
      color: #fff;
      i {
        display: block;
        width: 100%;
        height: 123px;
        background: url("~@/assets/images/logo_login.png") center top no-repeat;
      }
      .login-main_header-name {
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        margin-top: 10px;
        line-height: 1.2em;
        letter-spacing: 5px;
      }
      .login-main_header-englishname {
        font-size: 17px;
        text-align: center;
        line-height: 1.2em;
        text-align: center;
      }
      .tips {
        font-size: 28px;
        text-align: center;
        margin-top: 15px;
        color: rgb(255, 131, 112);
      }
    }
    .login-main_form {
      width: 414px;
      margin: 0 auto;
      margin-top: 30px;
      .verify-form {
        .verify-input {
          width: calc(100% - 124px);
          margin-right: 4px;
          vertical-align: middle;
        }
        .verify-img {
          display: inline-block;
          vertical-align: middle;
          width: 120px;
          height: 54px;
          cursor: pointer;
          svg {
            font-size: 54px;
          }
          img {
            width: 120px;
            height: 50px;
            position: relative;
            top: 50%;
            transform: translate(0%, -50%);
          }
        }
      }
      & .el-form-item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
    .login-main_btn {
      .btn {
        padding: 0;
        display: inline-block;
        outline: none;
        border: 0;
        cursor: pointer;
        width: 100%;
        height: 54px;
        background-color: #ff8370;
        border-radius: 3px;
        font-size: 18px;
        line-height: 54px;
        color: #fff;
        text-align: center;
        vertical-align: top;
        &:hover {
          background-color: #e26653;
        }
      }
    }
    .login-main-forget {
      color: #fff;
      text-align: right;
      margin: 18px 0 12px 0;
    }
    .login-main_assist {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      ::v-deep .el-checkbox {
        color: #fff;
        border-color: #9da4c7;
        .el-checkbox__inner {
          &:hover {
            border-color: #9da4c7;
          }
        }
      }
      ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #fff;
      }
      ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #9da4c7;
        background-color: #6d78ad;
      }
      ::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #9da4c7;
      }
      ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner::after {
        border-color: #ff7388;
      }
      .switch {
        margin-left: 120px;
      }
    }
    .link {
      &:hover {
        color: #ff7388;
        cursor: pointer;
      }
    }
  }
}
</style>
