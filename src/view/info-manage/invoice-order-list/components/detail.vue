<!-- 信息管理-开票订单列表-开票详情 -->
<script>
// import {mapState} from 'vuex';
import { mixinBreadCrumb } from "_m/breadCrumb";

export default {
  name: "InvoiceOrderListDetail",
  components: {},
  mixins: [mixinBreadCrumb],
  props: {},
  data() {
    return {
      breadCrumbName: "详情"
    };
  },
  methods: {}
};
</script>

<template>
  <div class="invoice-order-list-detail">invoice-order-list-detail测试</div>
</template>
