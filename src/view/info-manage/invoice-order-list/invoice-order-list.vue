<!-- 信息管理-开票订单列表 -->
<script>
// import './invoice-order-list.less'
const Detail = () => import("./components/detail");
export default {
  name: "InvoiceOrderList",
  components: {
    Detail
  },
  props: {},
  data() {
    return {
      show: false
    };
  },
  methods: {
    ss() {
      this.show = true;
    }
  }
};
</script>

<template>
  <div class="invoice-order-list">
    invoice-order-list组件测试
    <button @click="ss">123</button>
    <Detail v-if="show"></Detail>
  </div>
</template>

