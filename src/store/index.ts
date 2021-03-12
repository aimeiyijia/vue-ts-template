import Vue from "vue";
import Vuex from "vuex";
import { VuexPersistence } from "vuex-persist";
import { ISettingsState } from "./modules/settings";
import { IUserState } from "./modules/user";

export interface IRootState {
  settings: ISettingsState;
  user: IUserState;
}

let vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  plugins: [vuexLocal.plugin]
});
