// 子组件面包屑
// 引入: import { mixinBreadCrumb } from '_m/breadCrumb';
const mixinBreadCrumb = {
  data() {
    return {
      breadCrumbName: "请定义data的breadCrumbName属性"
    };
  },
  created() {
    this.$store.commit("setSubBreadCrumb", this.breadCrumbName);
  },
  beforeDestroy() {
    this.$store.commit("setSubBreadCrumb", "");
  },
};

export { mixinBreadCrumb };
