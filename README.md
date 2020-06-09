# 说明


## validate.js


验证用来检测表单提交数据等，待扩展 同时测试对象与数组（relus该以如何格式使用） 调用方式：

```
const relus= {
  name: [
    { required: true, message: '请输入收货人姓名' },
    { len: 10, message: '联系姓名不能超过十个字', type: 'maxLength' },
  ],
    address: [
      { required: true, message: '请输入收货地址' },
      { len: 100, message: '详细地址不能超过100个字', type: 'maxLength' }
    ]
}
validate.testAll({name:'xxxxxx',address:'xxxxx'},relus)
validate.testArray([{name:'xxxxxx',address:'xxxxx'},{name:'xxxxxx',address:'xxxxx'}],relus);
```

##git提交代码

> git init

> git add README.md

> git commit -m "first commit"

> git remote add origin https://github.com/1445626579/react-component.git

> git push -u origin master
