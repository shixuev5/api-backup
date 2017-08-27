<template>
  <div id="root">
    <Steps :current="current">
      <Step title="选择模块" content="选择需要打包的API模块"></Step>
      <Step title="配置路径" content="配置模块请求的基础Url"></Step>
      <Step title="自动构建" content="自动打包下载模块"></Step>
    </Steps>
    <div v-show="current == 0" class="content">
      <Card class="card" :class="cardClass(item)" @click.native="clickCard(item)" 
      v-for="(item, index) in moduleList" :key="item.id" dis-hover>
        <p slot="title">
          <Icon type="checkmark-circled" size="16"></Icon>
          {{item.name}}
        </p>
        <p>{{item.description}}</p>
      </Card>
    </div>
    <div v-show="current == 1" class="content">
      <Form v-for="(item, index) in baseData" :key="item.id" :label-width="80" inline>
        <Form-item label="基础地址:">
          <Input v-model="item.baseUrl" style="width: 400px"></Input>
          <Button style="margin-left: 8px" type="ghost" @click="updateBaseUrl(item)">更新</Button>
        </Form-item>
      </Form>
    </div>
    <pre v-show="current == 2" class="content">
      {{content ? content : '打包日志输出'}}
    </pre>
    <Button v-show="current == 0 || current == 1" type="primary" @click="next">
      下一步
    </Button>
    <Button class="download" v-show="current == 2 && !prodLoading" type="primary" :loading="devLoading" icon="android-download" @click="download('dev')">
      <span v-if="!devLoading">开发版下载</span>
      <span v-else>打包中...</span>
    </Button>
    <Button class="download" v-show="current == 2 && !devLoading" type="success" :loading="prodLoading" icon="android-download" @click="download('prod')">
      <span v-if="!prodLoading">生产版下载</span>
      <span v-else>打包中...</span>
    </Button>
  </div>
</template>
<script>
import fetch from '../config/fetch';
import config from '../config';

export default {
  name: 'ApiConfig',
  data() {
    return {
      devLoading: false,
      prodLoading: false,
      moduleId: [],
      current: 0,
      content: '',
    };
  },
  methods: {
    next() {
      this.current += 1;
    },
    change(status) {
      this.$Message.info(`开关状态：${status}`);
    },
    updateBaseUrl(item) {
      fetch.post(config.updateBaseUrl, { baseUrl: item.baseUrl, id: item.id })
        .then(() => {
          this.$Message.success('修改成功!');
          this.$store.dispatch('fetchBaseUrl');
        });
    },
    download(version) {
      this[`${version}Loading`] = true;
      fetch.post(config.package, {
        moduleId: this.moduleId,
        version,
      }).then((response) => {
        this[`${version}Loading`] = false;
        this.content = response.data.message;
        const link = document.createElement('a');
        link.href = config.downloadUrl;
        link.click();
        link.remove();
      });
    },
    clickCard(item) {
      const index = this.moduleId.indexOf(item.id);
      if (index > -1) {
        this.moduleId.splice(index, 1);
      } else {
        this.moduleId.push(item.id);
      }
    },
    cardClass(item) {
      return this.moduleId.indexOf(item.id) > -1 ? 'check' : '';
    },
  },
  computed: {
    baseData() {
      return this.$store.state.Urls.baseUrls;
    },
    moduleList() {
      return this.$store.getters.module;
    },
  },
};
</script>
<style lang="less" scoped>
#root {
  text-align: center;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    padding: 24px;
    overflow-y: scroll;

    .card {
      flex: 200px 0 0;
      margin: 0 20px;
      max-height: 180px;

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
  }

  .download {
    margin: 0 40px;
  }

  .ivu-steps {
    margin-top: 24px;
  }
}
</style>