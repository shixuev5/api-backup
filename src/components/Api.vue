<template>
  <div>
    <Form ref="form" :model="form" :label-width="74" :rules="ruleValidate" inline>
      <Form-item class="form-block" label="函数名" prop="name">
        <Input v-model="form.name" placeholder="请输入"></Input>
      </Form-item>
      <Form-item class="form-block" label="请求地址" prop="url">
        <Select v-model="form.url.baseUrlId">
          <Option v-for="url in baseUrls" :value="url.id" :key="url.id">{{ url.baseUrl }}</Option>
        </Select>
        <Select v-model="form.url.moduleUrlId">
          <Option v-for="url in moduleUrls" :value="url.id" :key="url.id">{{ url.moduleUrl }}</Option>
        </Select>
        <Input class="server-url" v-model="form.url.serverUrl" placeholder="请输入"></Input>
      </Form-item>
      <Form-item class="form-block" label="函数说明" prop="description">
        <Input v-model="form.description" type="textarea" :autosize="{minRows: 3}" placeholder="请输入"></Input>
      </Form-item>
      <Form-item class="form-block" label="请求方式" prop="method">
        <Radio-group v-model="form.method">
          <Radio label="post">POST</Radio>
          <Radio label="get">GET</Radio>
        </Radio-group>
      </Form-item>
      <Tabs>
        <Tab-pane label="data" name="data">
          <Alert banner closable>提示：参数名必填，请注意严格大小写匹配！</Alert>
          <div v-for="(item, index) in form.data" :key="index">
            <Form-item label="参数名:">
              <Input type="text" v-model="item.name" placeholder="请输入参数名..."></Input>
            </Form-item>
            <Form-item label="参数类型:">
              <Select v-model="item.type" transfer style="width: 100px">
                <Option v-for="paramsType in paramsTypes" :value="paramsType.value" :key="paramsType.value">{{ paramsType.type }}</Option>
              </Select>
            </Form-item>
            <Form-item label="参数描述:">
              <Input type="text" v-model="item.description" placeholder="请输入参数描述..."></Input>
            </Form-item>
            <Form-item label="必传:">
              <i-switch v-model="item.required">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </Form-item>
            <Button type="ghost" @click="handleRemove(index, 'data')">删除</Button>
          </div>
          <Button type="dashed" long @click="handleAdd('data')" icon="plus-round">新增</Button>
        </Tab-pane>
        <Tab-pane :disabled="form.method === 'post'" label="params" name="params">
          <div v-for="(item, index) in form.params" :key="index">
            <Form-item label="参数名:">
              <Input type="text" v-model="item.name" placeholder="请输入参数名..."></Input>
            </Form-item>
            <Form-item label="参数类型:">
              <Select v-model="item.type" transfer style="width: 100px">
                <Option v-for="paramsType in paramsTypes" :value="paramsType.value" :key="paramsType.value">{{ paramsType.type }}</Option>
              </Select>
            </Form-item>
            <Form-item label="参数描述:">
              <Input type="text" v-model="item.description" placeholder="请输入参数描述..."></Input>
            </Form-item>
            <Form-item label="必传:">
              <i-switch v-model="item.required">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </Form-item>
            <Button type="ghost" @click="handleRemove(index, 'params')">删除</Button>
          </div>
          <Button type="dashed" long @click="handleAdd('params')" icon="plus-round">新增</Button>
        </Tab-pane>
      </Tabs>
    </Form>
    <div class="footer">
      <div>
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button type="ghost" @click="handleReset()" style="margin-left: 8px">重置</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Api',
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ruleValidate: {
        name: [
          { required: true, message: '函数名不能为空', trigger: 'blur' },
        ],
        url: {
          type: 'object',
          required: true,
          fields: {
            serverUrl: { type: 'string', required: true, message: '服务地址不能为空', trigger: 'blur' },
          },
        },
      },
      paramsTypes: [{
        value: 'string',
        type: 'String',
      }, {
        value: 'number',
        type: 'Number',
      }, {
        value: 'object',
        type: 'Object',
      }, {
        value: 'array',
        type: 'Array',
      }, {
        value: 'boolean',
        type: 'Boolean',
      }],
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = JSON.parse(JSON.stringify(this.form));
          method.data = JSON.stringify(this.form.data);
          method.params = JSON.stringify(this.form.params);
          this.$emit('submit', method);
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.form.data = [];
      this.form.params = [];
      this.form.url.serverUrl = '';
    },
    handleAdd(flag) {
      this.form[flag].push({
        name: '',
        type: 'string',
        description: '',
        required: true,
      });
    },
    handleRemove(index, flag) {
      this.form[flag].splice(index, 1);
    },
  },
  computed: {
    baseUrls() {
      return this.$store.state.Urls.baseUrls;
    },
    moduleUrls() {
      return this.$store.state.Urls.moduleUrls;
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
