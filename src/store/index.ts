import Vue from 'vue'
import Vuex from 'vuex'
import { ISettingsState } from './modules/settings'

Vue.use(Vuex)

export interface IRootState {
  settings: ISettingsState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
