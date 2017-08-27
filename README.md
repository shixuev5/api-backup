# ktw-api

> ktw.api project

## Build Setup

``` bash
项目初始化：
cd ktw-api && npm install;

# 启动前端项目dev模式：
npm run dev;

# 启动后端nodejs服务：
npm run server;

# 关闭后端nodejs服务：
pm2 kill;

# 打包前端项目到dist目录：
npm run build:web

# 构建api的dev版本(no-uglifyjs):
npm run api:dev

# 构建api的production版本(minify):
npm run api:prod

相关命令存在于根目录 package.json文件中，请勿更改 api 构建的名称及命令，服务端自动打包依赖。
```
#api文件夹

## http文件夹

> http

* 基于axios模块增加了全局错误处理和传参验证，外部可以通过ktw.http调用，使用方法同[axios](https://github.com/mzabriskie/axios)。

> customError

* 定义自定义错误码及其错误提示和错误说明。

> httpError

* 定义http错误码的错误提示和错误说明。

## config文件夹

> url

* 存放请求函数对应的请求地址，及地址所属的模块名，用以按模块名导出

``` js
[{
  id: 1,
  baseUrlId: 1   //存放baseUrl表中的id
  moduleUrlId: 1  //存放moduleUrl表中的id
  serverUrl: '/user/login'   //存放服务地址
  moduleId: 1    //存放地址所属module的module.id
}]
```

> params 

* post请求：

``` js
{ 
  name: 'login',
  method: 'post',
  description: '登录',
  data: [{
    name: 'username',
    type: 'string',
    required: true,
    description: '用户名'
  },{
    name: 'passwd',
    type: 'string',
    required: true,
    description: 'md5加密后的用户密码'
  }],
  serverUrlId: 1,     //对应serverUrl表中的id
  moduleId: 1,        //对应module表中的id
  createDate: xxx     //创建时间
}
```

* get请求：

``` js
get方法的 params定义的参数对象将会以  url: xxx?id=xxx&id1=xxx的形式请求
get方法的 data定义的参数对象将会以  url: xxx/${id}/${id1}的形式请求，请严格保证对象参数的先后顺序

{ 
  name: 'getPerm',
  method: 'get',
  description: '获取用户权限',
  data: [{
    name: 'orgId',
    type: 'string',
    required: true,
    description: '用户所属组织id'
  }],
  params: [{
    name: 'id',
    type: 'string',
    required: true,
    description: '用户名id'
  }]
  serverUrlId: 2,     //对应serverUrl表中的id
  moduleId: 1,        //对应module表中的id
  createDate: xxx     //创建时间
}

最终请求路径为：`xxx/getPerm/${orgId}?id=${id}`
```

## dist文件夹

* 存放打包压缩后的代码，支持以下方式调用：

``` js
1. <script src="/js/ktw.api.min.js"></script>
2. npm install xxx 
   import ktw from 'ktw';
```

### 使用方式：

``` js
1. post请求：
  ktw.api.[模块名].[调用函数名](参数对象)    // 参数对象作为params中的data进行类型匹配检查
2. get请求：
  ktw.api.[模块名].[调用函数名](参数对象1, 参数对象2)    // 参数对象1作为params中的data进行类型匹配检查
                                                   // 参数对象2作为params中的params进行类型匹配检查
  只存在参数对象1：    
  ktw.api.[模块名].[调用函数名](参数对象1)

  只存在参数对象2：    
  ktw.api.[模块名].[调用函数名](null, 参数对象2)

3. 自定义请求：
  ktw.http.post(请求路径, 参数对象).then(function(response) {
    response.data为返回的数据对象
  })

  ktw.http.get(`请求路径/${参数1}/${参数2}`).then(function(response) {
    response.data为返回的数据对象
  })
  ktw.http.get(请求路径, {params: 参数对象}).then(function(response) {
    response.data为返回的数据对象
  })

  需要注意的是当请求成功返回时，将自动过滤掉服务端返回的message消息，这是为了避免形如以下调用：
  例如服务端返回：
  {
    statusCode:200,
    message: '成功',
    data: {
      dataSource: {
        //需要的data
      }，
      pageInfo: {
        //分页信息
      }
    }
  }
  调用方式: response.data.data.dataSource.xxx;

  现在：response.data即为服务端返回数据, 调用方式： response.data.dataSource
```

## utils文件夹

* 存放工具方法

# server文件夹

* 存放nodejs服务端代码

# src文件夹

* 存放vue前端工程项目

# dist文件夹

* 存放前端打包构造项目文件，作为服务端static文件夹