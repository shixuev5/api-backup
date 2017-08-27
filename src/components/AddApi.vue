<template>
  <Row>
    <Col span="5">
    <ModuleTree :treeData="treeData" @clickTreeNode="clickTreeNode" showAdd></ModuleTree>
    </Col>
    <Col v-show="form.moduleId" offset="1" span="18">
    <Api ref="api" :form="form" @submit="submit" ></Api>
    </Col>
  </Row>
</template>
<script>
import ModuleTree from './ModuleTree';
import Api from './Api';

export default {
  name: 'AddApi',
  components: {
    ModuleTree,
    Api,
  },
  data() {
    return {
      form: {
        name: '',
        method: 'post',
        description: '',
        moduleId: '',
        url: {
          baseUrlId: '',
          moduleUrlId: '',
          serverUrl: '',
        },
        data: [],
        params: [],
        mock: '',
      },
    };
  },
  methods: {
    clickTreeNode(node) {
      this.form.moduleId = node.id;
    },
    submit(method) {
      this.$store.dispatch('addMethod', method).then(() => {
        this.$Message.success('提交成功!');
        this.refs.api.handleReset();
      });
    },
  },
  computed: {
    treeData() {
      return this.$store.getters.moduleTree;
    },
  },
};
</script>
<style lang="less" scoped>
.form-block {
  display: block;
  .ivu-select {
    width: 200px;
  }
  .server-url {
    width: 378px;
  }
}

.footer {
  text-align: center;
  margin-top: 24px;
}
</style>