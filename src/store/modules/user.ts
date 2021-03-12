// 用户模块
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

export interface IUserState {
  token: string
  userInfo: any
}

@Module({ namespaced: true, dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  // token
  public token = ""
  // 用户信息
  public userInfo = {}
  // 菜单
  public menus = {}
  // 页面资源（菜单，页面内按钮等权限）
  public pageResources = {}

  @Mutation
  SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  SET_USERINFO(userinfo: any) {
    this.userInfo = userinfo
  }

  @Action({ commit: "SET_TOKEN" })
  SetToken(token: string) {
    return token;
  }

  @Action({ commit: "SET_USERINFO" })
  SetUserInfo(userinfo: any) {
    return userinfo;
  }
}

export const UserModule = getModule(User);
