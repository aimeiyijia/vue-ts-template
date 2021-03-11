import { VuexModule, Module, getModule } from 'vuex-module-decorators'
import store from '@/store'
const path = require('path')

export interface ISettingsState {}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
  // 页面功能配置
  public fixedHeader = '';
}

export const SettingsModule = getModule(Settings)
