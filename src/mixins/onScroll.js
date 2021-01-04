// 滚动加载事件处理 (通用 滚动父级是scroll-content 子级是组件)
const onScrollMixin = {
  data() {
    return {
      scrollShow: false, // 滚动到当前组件, true显示组件
      lastScrollCall: 0 // 节流(最后一次滚动时间回调)
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.addScrollListener();
    });
  },
  beforeDestroy() {
    // 这里面的this指向是新页面的this
    // this.removeScrollListener();
  },
  // keep-alive进入
  activated() {},
  // keep-alive离开(隐藏RankCardDetail, 显示页面其他组件)
  deactivated() {},
  methods: {
    // 添加滚动监听
    addScrollListener() {
      this.$nextTick(() => {
        document
          .getElementById("scroll-content")
          .addEventListener("scroll", this.handleScroll); // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
        // 初始化需要判断一下组件显示还是隐藏
        this.handleScroll();
      });
    },
    // 移除滚动监听
    removeScrollListener() {
      document
        .getElementById("scroll-content")
        .removeEventListener("scroll", this.handleScroll);
    },
    // 滚动事件处理
    handleScroll() {
      let res = this.throttle(120);
      if (res) {
        setTimeout(() => {
          // 当前滚动条距离顶部的距离
          let ADistance =
            document.getElementById("scroll-content").scrollTop +
            document.getElementById("scroll-content").clientHeight;
          // 当前实例距离顶部的距离
          let BDistance = this.$parent.$el.offsetTop;

          // 当滚动到当前元素, 加载组件内容, 关闭监听
          if (ADistance > BDistance) {
            this.scrollShow = true;
            this.removeScrollListener();
          }
        }, 50); // 在实际项目中，延迟一点时间执行效果更好（针对监听scroll）
      }
    },
    /**
     * 节流函数
     * @param delay String  间隔时间 ms
     * */
    throttle(delay) {
      const now = new Date().getTime();
      if (now - this.lastScrollCall < delay) return false;
      this.lastScrollCall = now;
      return true;
    }
  }
};

export { onScrollMixin };
