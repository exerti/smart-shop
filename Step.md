
1、安装脚手架配置相关插件

2、安装vant-ui,在可以在 babel.config.js 中配置， 实现按需引入
并且 抽离一个单独的vant.js文件，在main.js中引入

3、移动端适配的问题 **
将设计稿的 px 转换为 css3  的 vw 

使用方法： 在vant文档的进阶用法中，有介绍
       
 npm install postcss-px-to-viewport@1.1.1 -D

 在src同级目录下创建postcss.config.js文件

 在postcss.config.js中配置


 // postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};

4、配置路由

先配一级路由（独立单独设置的），再配二级路由


二级路由tableBar  使用vant组件库，实现底部导航tablebar
     按需引入，引入代码， 自定义修改文字，图标，颜色

配置二级路由（规则和组件）
、
配置导航链接
、
配置路由出口


5、登录页的静态布局


在main.js中引入common.less, 出现Syntax Error: Error: Cannot find module 'less'
排查问题：
先看下根目录下面的package.json 里面有没有 “less-loader”: “5.0.0”, 如果没有，请安装：npm install less-loader。
如果安装了，还是继续报同样的问题，那么此时执行命令：npm install less -–save-dev，再次尝试重新运行。

6、登陆添加loading效果
在每一次execute中，添加loading效果，在then中，移除loading效果

好处是：
节流处理，防止用户在一次没有请求完成时，多次进行无效请求
友好的提示：

实现步骤是：
在请求拦截器中，添加loading效果，在响应拦截器中移除loading效果

7、设置路由守卫


8、搜索列表

先写静态结构


9、
$router.go()0 , -1 , 1
$router.push() 跳转 -1, 0 , 1  详解

router.push , 导航到不同的url，为history 栈中的一个新记录
  <router-link :to="" >
router.replace , 导航到不同的url， 不会在history 栈中生成新记录 ，替换
  <router-link :to="" replace>  
  router.place（）
router.go(n) 指定前进或回退的步数， === window。history.go 
router.go(1)  =  hisfory.forward()
router.go(-1) =  hisfory.back()
10、路由传参


11、list[activeIndex]?.children 这个?. 表示如果为空，则不执行后面的代码
href="javascript:;  代表点击之后，不跳转

12、这里的$router前面没有this ，为啥 ， $router是vuex中的一个对象，可以直接使用
<div class="prodetail">
      <van-nav-bar
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
    />
    </div>


13、对于state传来的数组，需要写一些计算属性。最好是在vuex里面写成 getter, 
  而不是在渲染的组件中，写成计算属性，？