<template>
  <Row>
    <Col span="5">
    <ModuleTree :treeData="treeData" @clickTreeNode="clickTreeNode" showDelete></ModuleTree>
    </Col>
    <Col v-show="form.moduleId" offset="1" span="18">
    <Api ref="api" :form="form" @submit="submit"></Api>
    </Col>
  </Row>
</template>
<script>
import ModuleTree from './ModuleTree';
import Api from './Api';

export default {
  name: 'EditApi',
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
      const method = JSON.parse(JSON.stringify(node));
      method.url = this.$store.getters.getServerUrls.filter(val =>
        val.id === method.serverUrlId)[0];
      this.form = method;
    },
    submit(method) {
      this.$store.dispatch('updateMethod', method).then(() => {
        this.$Message.success('提交成功!');
        this.refs.api.handleReset();
      });
    },
  },
  computed: {
    treeData() {
      return this.$store.getters.methods;
    },
  },
};
</script>
