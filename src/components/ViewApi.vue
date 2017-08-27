<template>
  <Row>
    <Col span="5">
    <ModuleTree :treeData="treeData" @clickTreeNode="clickTreeNode"></ModuleTree>
    </Col>
    <Col offset="1" span="18">
    <Card v-show="url" :bordered="false" dis-hover>
      <p slot="title">
        <span class="method">{{params.method}}</span>
        <span class="url">{{url}}</span>
      </p>
      <Alert v-show="params.description" show-icon>
        <Icon type="ios-information-outline" slot="icon"></Icon>
        <template slot="desc">{{params.description}}</template>
      </Alert>
      <Tabs :animated="false">
        <Tab-pane label="data">
          <Table :columns="columns" :data="params.data"></Table>
        </Tab-pane>
        <Tab-pane :disabled="params.method === 'post'" label="params">
          <Table :columns="columns" :data="params.params"></Table>
        </Tab-pane>
      </Tabs>
      <Tabs class="code">
        <Tab-pane :label="renderLabel">
          <pre id="template">{{codeTemplate}}</pre>
        </Tab-pane>
      </Tabs>
    </Card>
    </Col>
  </Row>
</template>
<script>
import Clipboard from 'clipboard';
import ModuleTree from './ModuleTree';
import { formate } from '../utils';

export default {
  name: 'ViewApi',
  components: {
    ModuleTree,
  },
  data() {
    return {
      url: '',
      tabName: 'data',
      params: {},
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        }, {
          title: '参数名',
          key: 'name',
          width: 120,
        },
        {
          title: '参数类型',
          key: 'type',
          width: 120,
        },
        {
          title: '参数说明',
          key: 'description',
        },
        {
          title: '必传项',
          key: 'required',
          width: 120,
          align: 'center',
          render: (h, params) => {
            const style = { color: params.row.required ? 'red' : 'black' };
            return <span style={style}>{params.row.required ? '是' : '否'}</span>;
          },
        }],
    };
  },
  methods: {
    clickTreeNode(node) {
      if (node.method) {
        // eslint-disable-next-line
        this.url = this.$store.getters.getServerUrls.filter(val => val.id === node.serverUrlId)[0].url;
        node.moduleName = node.module.name;
        this.params = node;
      } else {
        this.url = '';
      }
    },
    renderLabel() {
      return <div>代码块： <tooltip content="点击复制! 😀" placement="top" transfer>
        <icon class="copy-icon" data-clipboard-target="#template" type="ios-copy" size="18"></icon>
      </tooltip></div>;
    },
  },
  computed: {
    treeData() {
      return this.$store.getters.methodTree;
    },
    codeTemplate() {
      return `
      /** 请求地址：${this.url}
       *  请求方式：${this.params.method}
       *  方法说明: ${this.params.description}
       */

      let data = ${JSON.stringify(formate(this.params.data), null)};

      let params = ${JSON.stringify(formate(this.params.params), null)};

      ktw.api.${this.params.moduleName}.${this.params.name}(data, params).then((response) => {
          response.data
      });`;
    },
  },
  created() {
    const clipboard = new Clipboard('.copy-icon');
    clipboard.on('success', () => this.$Message.success('复制成功，快去粘贴吧！'));
  },
};
</script>
<style lang="less" scoped>
.method {
  color: #EF5350;
  font-size: 18px;
  margin-right: 20px;
}

.url {
  font-size: 16px;
}

.code {
  margin-top: 24px;
  .ivu-tabs-tabpane {
    height: 360px;
    border-radius: 4px;
    background: #FFFDE7;
    overflow-y:scroll;
  }
}
</style>