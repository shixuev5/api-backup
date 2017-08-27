<template>
  <div class="root" v-html="html">
  </div>
</template>
<script>
import marked from 'marked';
import hljs from 'highlight.js';
import fetch from '../config/fetch';
import config from '../config';

export default {
  name: 'ReadMe',
  data() {
    return {
      html: '',
    };
  },
  methods: {
    fetchMarkdown() {
      fetch.get(config.markdown).then((response) => {
        this.html = marked(response.data);
      });
    },
  },
  created() {
    this.fetchMarkdown();
    marked.setOptions({
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
    });
  },
};
</script>
<style lang="less" scoped>
.root {
  font-size: 16px;
}
</style>