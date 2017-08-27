<template>
  <div>
    <div class="project">
      <Card class="card" :class="cardClass(item)" @click.native="clickCard(item)" 
      v-for="(item, index) in projects" :key="item.id" dis-hover>
        <p slot="title">
          <Icon type="checkmark-circled" size="16"></Icon>
          {{item.name}}
        </p>
        <p>{{item.description}}</p>
      </Card>
      <div class="add-project" @click="modal = true">
        <Icon type="plus" size="32" style="color: #3399ff; margin: 40px 0 20px 0;"></Icon>
        <p>点击新增项目</p>
      </div>
    </div>
    <div class="footer">
      <Button type="primary" @click="complete">完成</Button>
    </div>
    <Modal title="新增项目" v-model="modal" ok-text="确认" @on-ok="addProject" @on-cancel="cancel" :closable="false" :mask-closable="false">
      <Form ref="form" :model="project" :label-width="80">
        <Form-item label="项目名称:" prop="name">
          <Input v-model="project.name" placeholder="请输入项目名称..."></Input>
        </Form-item>
        <Form-item label="项目描述:" prop="description">
          <Input v-model="project.description" :autosize="{minRows: 2,maxRows: 5}" type="textarea" placeholder="请输入项目描述..."></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'Project',
  data() {
    return {
      projectId: [],
      modal: false,
      project: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    complete() {
      this.$store.dispatch('fetchBaseUrl');
      this.$store.dispatch('fetchModuleUrl');
      this.$store.dispatch('fetchServerUrl');
      this.$store.dispatch('fetchModule');
      this.$store.dispatch('fetchMethod');
      this.$router.push('viewapi');
    },
    clickCard(item) {
      const index = this.projectId.indexOf(item.id);
      if (index > -1) {
        this.projectId.splice(index, 1);
      } else {
        this.projectId.push(item.id);
      }
    },
    cardClass(item) {
      return this.projectId.indexOf(item.id) > -1 ? 'check' : '';
    },
    addProject() {
      this.$store.dispatch('addProject', this.project).then(() => {
        this.$Message.success('提交成功!');
      });
    },
    cancel() {
      this.$refs.form.resetFields();
    },
  },
  computed: {
    projects() {
      return this.$store.getters.project;
    },
  },
  watch: {
    projectId(newVal) {
      this.$store.commit('SET_PROJECT_ID', newVal);
    },
  },
};
</script>
<style lang="less" scoped>
.project {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  padding: 24px;
  overflow-y: scroll;

  .card {
    flex: 0 0 200px;
    margin: 0 20px;
    height: 160px;

    .ivu-icon {
      color: #eee;
      transition: color .3s;
    }
  }

  .check {
    border-color: #03A9F4;
    box-shadow: 2px 2px 6px 0px #BBDEFB;

    .ivu-icon {
      color: green;
    }
  }

  .add-project {
    width: 200px;
    height: 160px;
    font-size: 14px;
    text-align: center;
    transition: border-color .3s;
    border-radius: 4px;
    border: 1px dashed #dddee1;

    &:hover {
      cursor: pointer;
      border-color: #3399ff;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 24px;
}
</style>
