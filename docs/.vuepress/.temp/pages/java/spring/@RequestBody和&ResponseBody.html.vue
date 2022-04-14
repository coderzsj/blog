<template><h2 id="content-type" tabindex="-1"><a class="header-anchor" href="#content-type" aria-hidden="true">#</a> Content-Type</h2>
<h3 id="application-x-www-form-urlencoded" tabindex="-1"><a class="header-anchor" href="#application-x-www-form-urlencoded" aria-hidden="true">#</a> application/x-www-form-urlencoded</h3>
<p>application/x-www-form-urlencoded主要用于表单形式的POST请求中，如普通的表单提交，或者js发包，默认都是通过这种方式，可以使用Postman来发一个这种类型请求：</p>
<p>用get提交，和post提交是一样的，数据格式都是这样，get和post的区别是，get显示地址栏中，post提交是不显示的，相对于get来说，post这种提交方式更加安全</p>
<h3 id="multipart-form-data" tabindex="-1"><a class="header-anchor" href="#multipart-form-data" aria-hidden="true">#</a> multipart/form-data</h3>
<p>multipart/form-data是使用POST请求上传文件，如果上传照片，文件等，由于很多情况下都会有批量上传，为了区分不同的数据，multipart/form-data的类型有boundary参数进行分割，对上传文件请求抓包，request头部信息如下：</p>
<p>此时的数据格式是json格式：</p>
<p>a=123&amp;b=123&amp;c=123</p>
<p>用get提交，和post提交是一样的，数据格式都是这样，get和post的区别是，get显示地址栏中，post提交是不显示的，相对于get来说，post这种提交方式更加安全</p>
<p>如果说是 a=123&amp;b=123&amp;c=123这种格式的话。，spring会自动的去转成对象的格式</p>
<h3 id="application-json" tabindex="-1"><a class="header-anchor" href="#application-json" aria-hidden="true">#</a> application/json</h3>
<p>application/json是POST请求以JSON的格式向服务请求发起请求或者请求返回JSON格式的响应内容，服务端接受到数据后对JSON进行解析拿到所需要的参数，同样适用Postman模拟一个请求：</p>
<p>此时的数据格式是json格式：</p>
<p>{“a”，“b”，“c”，“d”}。</p>
<p>那么这种格式的话，Spring就无法自动转化为对象，那么如何解决呢？ 就会自动将json数据转化为对象（实体类）</p>
<h2 id="requestbody" tabindex="-1"><a class="header-anchor" href="#requestbody" aria-hidden="true">#</a> @RequestBody</h2>
<p>@RequestBody的作用是将前端传来的json格式的数据转为自己定义好的javabean对象</p>
<p>@RequestBody要写在方法的参数前</p>
<p>如图以微信小程序为例，前端向后端传入如下json格式的</p>
<p>传入数据的属性名称要和后端javabean中定义的一致</p>
<h2 id="responsebody" tabindex="-1"><a class="header-anchor" href="#responsebody" aria-hidden="true">#</a> @ResponseBody</h2>
<p>@ResponseBody的作用是将后端以return返回的javabean类型数据转为json格式数据输出到HTTP响应中</p>
</template>
