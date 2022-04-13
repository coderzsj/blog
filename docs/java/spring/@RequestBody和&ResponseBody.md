---
title: RequestBody&ResponseBody
category: spring
icon: annotation
date: 2019-06-23
tag:
  - RequestBody&ResponseBody
  - annotation
---

## Content-Type

### application/x-www-form-urlencoded

application/x-www-form-urlencoded主要用于表单形式的POST请求中，如普通的表单提交，或者js发包，默认都是通过这种方式，可以使用Postman来发一个这种类型请求：

用get提交，和post提交是一样的，数据格式都是这样，get和post的区别是，get显示地址栏中，post提交是不显示的，相对于get来说，post这种提交方式更加安全

### multipart/form-data

multipart/form-data是使用POST请求上传文件，如果上传照片，文件等，由于很多情况下都会有批量上传，为了区分不同的数据，multipart/form-data的类型有boundary参数进行分割，对上传文件请求抓包，request头部信息如下：

此时的数据格式是json格式：

a=123&b=123&c=123

用get提交，和post提交是一样的，数据格式都是这样，get和post的区别是，get显示地址栏中，post提交是不显示的，相对于get来说，post这种提交方式更加安全

如果说是 a=123&b=123&c=123这种格式的话。，spring会自动的去转成对象的格式

### application/json

application/json是POST请求以JSON的格式向服务请求发起请求或者请求返回JSON格式的响应内容，服务端接受到数据后对JSON进行解析拿到所需要的参数，同样适用Postman模拟一个请求：

此时的数据格式是json格式：

{“a”，“b”，“c”，“d”}。

那么这种格式的话，Spring就无法自动转化为对象，那么如何解决呢？ 就会自动将json数据转化为对象（实体类）

## @RequestBody

@RequestBody的作用是将前端传来的json格式的数据转为自己定义好的javabean对象

@RequestBody要写在方法的参数前

如图以微信小程序为例，前端向后端传入如下json格式的

传入数据的属性名称要和后端javabean中定义的一致

## @ResponseBody

@ResponseBody的作用是将后端以return返回的javabean类型数据转为json格式数据输出到HTTP响应中


