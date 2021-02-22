import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Test extends Vue {
  render() {
    return (
      <el-button>默认按钮</el-button>
    )
  }
}
