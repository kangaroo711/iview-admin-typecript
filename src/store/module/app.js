import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled
} from "@/libs/util";
import router from "@/router";
import routers from "@/router/routers";
import config from "@/config";
const { homeName } = config;

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route);
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route);
  });
  router.push(nextRoute);
};

export default {
  state: {
    subBreadCrumb: "", // 子组件面包屑名称
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    errorList: [],
    hasReadErrorPage: false
  },
  getters: {
    menuList: (state, getters, rootState) =>
      getMenuByRouter(routers, rootState.user.access),
    errorCount: state => state.errorList.length
  },
  mutations: {
    // 子组件面包屑名称
    setSubBreadCrumb(state, payload) {
      state.subBreadCrumb = payload;
    },
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute);
    },
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName);
    },
    setTagNavList(state, list) {
      let tagList = [];
      if (list) {
        tagList = [...list];
      } else tagList = getTagNavListFromLocalstorage() || [];
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
      let homeTagIndex = tagList.findIndex(item => item.name === homeName);
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0];
        tagList.unshift(homeTag);
      }
      state.tagNavList = tagList;
      setTagNavListInLocalstorage([...tagList]);
    },
    closeTag(state, route) {
      let stateTemp = state;
      let routeTemp = route;
      let tag = stateTemp.tagNavList.filter(item =>
        routeEqual(item, routeTemp)
      );
      routeTemp = tag[0] ? tag[0] : null;
      if (!routeTemp) return;
      closePage(stateTemp, routeTemp);
    },
    addTag(state, { route, type = "unshift" }) {
      let router = getRouteTitleHandled(route);
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === "push") state.tagNavList.push(router);
        else {
          if (router.name === homeName) state.tagNavList.unshift(router);
          else state.tagNavList.splice(1, 0, router);
        }
        setTagNavListInLocalstorage([...state.tagNavList]);
      }
    }
  },
  actions: {}
};
