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
## md文件使用方法说明

### "#"标题
原文地址 https://www.cnblogs.com/shiweida/p/7679674.html

若干"#"代表几级标题

### "*，+" 无序列表

每个*号代表一行
* 一 "*"
* 二 "*"
+ 三 "+"

### "No." 有序列表

1. 一 "1."
2. 二 "2."

### ">" 区块引用

> 区块引用 ">"

### "***、 --- ___"分割线 星号或减号或下划线 至少三个 可以有空格
1. 减号

---  

2. 星号

*** 

3. 下划线
___

### 链接 链接的文字放在[]中，链接地址放在随后的（）中

[百度一下](http://baidu.com)

### 图片 "![]()" 由叹号中括号和小括号组成，小括号放链接 中括号内为图片说明 最前面加！

[百度图片](https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png)

### 代码框 单行使用 "``" 多行使用三个`包起来 

`const str="我是单行代码"`

```
const str="我是多行代码";
console.log(str);
```
### 字体 *_ 星号或下划线包起来为斜体字 两个**或_包起来为加粗字体 ~删除线 两个~包起来为删除线

*斜体*

_斜体_

**粗体**

__粗体__

~~删除线~~

## git提交代码


> git init

> git add README.md

> git commit -m "first commit"

> git remote add origin https://github.com/1445626579/react-component.git

> git push -u origin master
