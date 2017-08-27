<template>
  <div>
    <Button class="add-btn" type="primary" @click="baseModal = true, flag = 'add'">新增</Button>
    <Table :columns="baseColumns" :data="baseData"></Table>
    <div class="split"></div>
    <Button class="add-btn" type="primary" @click="moduleModal = true, flag = 'add'">新增</Button>
    <Table :columns="moduleColumns" :data="moduleData"></Table>
    <Modal title="新增基础地址" v-model="baseModal" ok-text="保存" @on-ok="saveBaseUrl" @on-cancel="baseUrl = 'http://'" :closable="false" :mask-closable="false">
      <label class="modal-label">基础地址:</label>
      <Input v-model="baseUrl" placeholder="请输入服务器IP及端口号..." style="width:400px"></Input>
    </Modal>
    <Modal title="新增模块地址" v-model="moduleModal" ok-text="保存" @on-ok="saveModuleUrl" @on-cancel="moduleUrl = ''" :closable="false" :mask-closable="false">
      <label class="modal-label">模块地址:</label>
      <Input v-model="moduleUrl" placeholder="请输入模块地址..." style="width:400px"></Input>
    </Modal>
  </div>
</template>
<script>
import fetch from '../config/fetch';
import config from '../config';

export default {
  name: 'ApiConfig',
  data() {
    return {
      baseUrl: 'http://',
      baseId: '',
      moduleUrl: '',
      moduleId: '',
      baseModal: false,
      moduleModal: false,
      flag: '',
      baseColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '基础地址',
          key: 'baseUrl',
        },
        {
          title: '创建时间',
          key: 'createdAt',
          width: 180,
          render: (h, params) => new Date(params.row.createdAt).toLocaleString(),
        },
        {
          title: '更新时间',
          key: 'updatedAt',
          width: 180,
          render: (h, params) => new Date(params.row.updatedAt).toLocaleString(),
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => <i-button type="text" onClick={() => this.edit(params.row, 'base')}>编辑</i-button>,
        },
      ],
      moduleColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '模块地址',
          key: 'moduleUrl',
        },
        {
          title: '创建时间',
          key: 'createdAt',
          width: 180,
          render: (h, params) => new Date(params.row.createdAt).toLocaleString(),
        },
        {
          title: '更新时间',
          key: 'updatedAt',
          width: 180,
          render: (h, params) => new Date(params.row.updatedAt).toLocaleString(),
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => <i-button type="text" onClick={() => this.edit(params.row, 'module')}>编辑</i-button>,
        },
      ],
    };
  },
  methods: {
    edit(row, i) {
      this.flag = 'edit';
      if (i === 'base') {
        this.baseModal = true;
        this.baseUrl = row.baseUrl;
        this.baseId = row.id;
      } else {
        this.moduleModal = true;
        this.moduleUrl = row.moduleUrl;
        this.moduleId = row.id;
      }
    },
    saveBaseUrl() {
      if (this.flag === 'add') {
        fetch.post(config.baseUrl, { baseUrl: this.baseUrl }).then(() => {
          this.$Message.success('新增成功!');
          this.baseUrl = 'http://';
          this.$store.dispatch('fetchBaseUrl');
        });
      } else {
        fetch.post(config.updateBaseUrl, { baseUrl: this.baseUrl, id: this.baseId })
          .then(() => {
            this.$Message.success('修改成功!');
            this.baseUrl = 'http://';
            this.$store.dispatch('fetchBaseUrl');
          });
      }
    },
    saveModuleUrl() {
      if (this.flag === 'add') {
        fetch.post(config.moduleUrl, { moduleUrl: this.moduleUrl }).then(() => {
          this.$Message.success('新增成功!');
          this.moduleUrl = '';
          this.$store.dispatch('fetchModuleUrl');
        });
      } else {
        fetch.post(config.updateModuleUrl, { moduleUrl: this.moduleUrl, id: this.moduleId })
          .then(() => {
            this.$Message.success('修改成功!');
            this.moduleUrl = '';
            this.$store.dispatch('fetchModuleUrl');
          });
      }
    },
  },
  computed: {
    baseData() {
      return this.$store.state.Urls.baseUrls;
    },
    moduleData() {
      return this.$store.state.Urls.moduleUrls;
    },
  },
};
</script>
<style lang="less" scoped>
.add-btn {
  margin-bottom: 16px;
}
.split {
  margin: 24px 0;
}

.modal-label {
  margin-right: 16px;
}
</style>