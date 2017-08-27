<template>
  <div class="layout">
    <Menu @on-select="selectMenu" mode="horizontal" theme="primary">
      <div class="layout-nav">
        <Menu-item name="viewapi">
          <Icon type="eye"></Icon>
          Api查看
        </Menu-item>
        <Menu-item name="addapi">
          <Icon type="plus"></Icon>
          Api新增
        </Menu-item>
        <Menu-item name="editapi">
          <Icon type="edit"></Icon>
          Api编辑
        </Menu-item>
        <Menu-item name="download">
          <Icon type="android-download"></Icon>
          打包下载
        </Menu-item>
        <Menu-item name="readme">
          <Icon type="ios-paper"></Icon>
          说明文档
        </Menu-item>
        <Menu-item name="apiconfig">
          <Icon type="wrench"></Icon>
          系统配置
        </Menu-item>
      </div>
    </Menu>
    <div class="layout-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  methods: {
    selectMenu(name) {
      this.$router.push({ path: name });
    },
  },
  created() {
    this.$store.dispatch('fetchProject');
  },
};
</script>
<style lang="less" scoped>
.layout {
  background: #f5f7f9;
}

.layout-nav {
  width: 700px;
  margin: 0 auto;
}

.layout-content {
  width: 1200px;
  height: calc(~"100vh - 62px");
  padding: 15px 20px;
  margin: 0 auto;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>