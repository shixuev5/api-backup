<template>
  <div id="tree">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree ref="tree" :data="treeData" :props="defaultProps" :render-content="renderContent" :filter-node-method="filterNode" @current-change="clickNode" highlight-current accordion>
    </el-tree>
    <Modal title="新增子模块" v-model="modal" ok-text="保存" @on-ok="addModule" @on-cancel="cancle" :closable="false" :mask-closable="false">
      <Form ref="form" :model="module" :rules="rules" :label-width="100">
        <Form-item label="模块名：" prop="name">
          <Input v-model="module.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="模块描述：" prop="description">
          <Input v-model="module.description" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>
<script>
import fetch from '../config/fetch';
import config from '../config';

export default {
  name: 'ModuleTree',
  props: {
    treeData: {
      type: Array,
      required: true,
    },
    showAdd: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterText: '',
      modal: false,
      module: {
        id: '',
        name: '',
        description: '',
      },
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      rules: {
        name: [
          { required: true, message: '函数名不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    renderContent(h, { data }) {
      if (data.method) {
        return <span class="tree-node">
        <icon type="social-javascript" color="#FFC107" style="margin-right: 8px"></icon>
          <span>{data.name}</span>
          <poptip
            style="float: right;"
            v-show={this.showDelete}
            title="您确认删除这该方法吗？"
            placement="left-end"
            width="200"
            confirm
            onOn-ok={() => { this.deleteMethod(data); }}>
            <i-button type="text" style="font-size: 14px;">删除</i-button>
          </poptip>
        </span>;
      }
      return <span class="tree-node">
        <icon type="ios-folder" color="#607D8B" style="margin-right: 8px"></icon>
        <span>{data.name}</span>
        <i-button v-show={this.showAdd} type="text" style="float: right; font-size: 14px;" onClick={
          () => { this.module.id = data.id; this.modal = true; }
        }>新增</i-button>
      </span>;
    },
    addModule() {
      fetch.post(config.addModule, {
        parentId: this.module.id,
        name: this.module.name,
        description: this.module.description,
      })
      .then(() => {
        this.$Message.success('新增成功!');
        this.$store.dispatch('fetchModule');
      });
    },
    deleteMethod(method) {
      this.$store.dispatch('deleteMethod', method).then(() => {
        this.$Message.success('删除成功!');
        this.$router.go(0);
      });
    },
    cancle() {
      this.$refs.form.resetFields();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    clickNode(node) {
      if (!this.modal) {
        this.$emit('clickTreeNode', node);
      }
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>
<style lang="less" scoped>
#tree {
  max-height: calc(~"100vh - 90px");
  .el-tree {
    margin-top: 16px;
  }
}
</style>