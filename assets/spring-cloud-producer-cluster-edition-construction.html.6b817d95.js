import{b as i}from"./app.9da19d67.js";import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";const e={},o=i("<p>\u9700\u8981\u6362\u6210\u751F\u4EA7\u8005\u7684\u670D\u52A1\u540D\u79F0\u5C31\u884C\u4E86\uFF0C\u5982\u4E0B\u56FE\uFF1A</p><p>\u4F60\u770B\u5F97\u89C1\u7231\u5728\u6EE1\u7EA2\u6B86\u5C3D\u7684\u71C3\u70E7\u7740\u5417</p><ol><li>\u6CE8\u518C\u4E2D\u5FC3\uFF1A<code>eureka</code>(\u5C5E\u4E8ENetflix,2.x\u7248\u672C\u4E0D\u5728\u5F00\u6E90\uFF0C1.x\u7248\u672C\u8BA9\u5728\u66F4\u65B0)</li><li>\u670D\u52A1\u8C03\u7528\uFF1A<code>ribbon</code>(\u5C5E\u4E8ENetflix,\u505C\u6B62\u66F4\u65B0\uFF0C\u5DF2\u7ECF\u5F7B\u5E95\u88AB\u79FB\u9664\uFF09\u3001spring <code>Loadbalancer</code>(\u5C5E\u4E8ESpring Cloud\u5B98\u65B9,\u76EE\u524D\u7684\u9ED8\u8BA4\u65B9\u6848)</li><li>\u670D\u52A1\u964D\u7EA7\uFF1A<code>hystrix</code>(\u5C5E\u4E8ENetflix,\u505C\u6B62\u66F4\u65B0\uFF0C\u5DF2\u7ECF\u5F7B\u5E95\u88AB\u79FB\u9664\uFF09</li><li>\u8DEF\u7531\u7F51\u5173\uFF1A<code>zuul</code>(\u5C5E\u4E8ENetflix,\u505C\u6B62\u66F4\u65B0\uFF0C\u5DF2\u7ECF\u5F7B\u5E95\u88AB\u79FB\u9664\uFF09\u3001gateway(\u5C5E\u4E8Espring Cloud\u5B98\u65B9, \u63A8\u8350\u65B9\u6848)</li></ol><p>\u627E\u4E00\u5957\u66F4\u597D\u7684\u89E3\u51B3\u65B9\u6848\u52BF\u5728\u5FC5\u884C\uFF0C\u4E5F\u5C31\u5F15\u51FA\u4E86\u6211\u4EEC\u672C\u7AE0\u7684\u4E3B\u89D2\uFF1Aspring cloud alibaba</p><blockquote><p>\u963F\u91CC\u5DF4\u5DF4\u4F5C\u4E3A\u4E1A\u754C\u7684\u4E92\u8054\u7F51\u5927\u5382\uFF0C\u7ED9\u51FA\u4E86\u4E00\u5957\u5FAE\u670D\u52A1\u5F00\u53D1\u7684\u4E00\u7AD9\u5F0F\u89E3\u51B3\u65B9\u6848\u3002\u6B64\u9879\u76EE\u5305\u542B\u5F00\u53D1\u5206\u5E03\u5F0F\u5E94\u7528\u670D\u52A1\u7684\u5FC5\u9700\u7EC4\u4EF6\uFF0C\u65B9\u4FBF\u5F00\u53D1\u8005\u901A\u8FC7spring cloud\u7F16\u7A0B\u6A21\u578B\u8F7B\u677E\u4F7F\u7528\u8FD9\u4E9B\u7EC4\u4EF6\u6765\u5F00\u53D1\u5206\u5E03\u5F0F\u5E94\u7528\u670D\u52A1\u3002 \u4F9D\u6258spring cloud alibaba,\u60A8\u53EA\u9700\u8981\u6DFB\u52A0\u4E00\u4E9B\u6CE8\u89E3\u548C\u5C11\u91CF\u914D\u7F6E\uFF0C\u5C31\u53EF\u4EE5\u5C06spring cloud \u5E94\u7528\u63A5\u5165\u963F\u91CC\u5206\u5E03\u5F0F\u5E94\u7528\u89E3\u51B3\u65B9\u6848\uFF0C\u901A\u8FC7\u963F\u91CC\u4E2D\u6E10\u6E10\u8FC5\u901F\u642D\u5EFA\u5206\u5E03\u5F0F\u5E94\u7528\u7CFB\u7EDF\u3002</p></blockquote><p>\u76EE\u524Dspring cloud alibaba\u63D0\u4F9B\u4E86\u5982\u4E0B\u529F\u80FD\uFF1A</p><ol><li>\u670D\u52A1\u9650\u6D41\u964D\u7EA7\uFF1A\u652F\u6301WebServlet\u3001WebFlux\u3001OpenFeign\u3001RestTemplate\u3001dubbo\u9650\u6D41\u964D\u7EA7\u529F\u80FD\u7684\u63A5\u5165\uFF0C\u53EF\u4EE5\u5728\u8FD0\u884C\u65F6\u901A\u8FC7\u63A7\u5236\u53F0\u5B9E\u65F6\u4FEE\u6539\u9650\u6D41\u964D\u7EA7\u89C4\u5219\uFF0C\u8FD8\u652F\u6301\u67E5\u770B\u9650\u6D41\u964D\u4F4EMetrics\u76D1\u63A7\u3002</li><li>\u670D\u52A1\u6CE8\u518C\u4E0E\u53D1\u73B0\uFF1A\u9002\u914Dspring cloud\u670D\u52A1\u6CE8\u518C\u4E0E\u53D1\u73B0\u6807\u51C6\uFF0C\u9ED8\u8BA4\u96C6\u6210\u4E86Ribbon\u7684\u652F\u6301\uFF1B</li><li>\u5206\u5E03\u5F0F\u914D\u7F6E\u7BA1\u7406\uFF1A\u652F\u6301\u5206\u5E03\u5F0F\u7CFB\u7EDF\u4E2D\u7684\u5916\u90E8\u5316\u914D\u7F6E\uFF0C\u914D\u7F6E\u66F4\u6539\u65F6\u81EA\u52A8\u5237\u65B0\u3002</li><li>RPC\u670D\u52A1\uFF1A\u6269\u5C55RestTemplate\u3001OpenFeign\u3001dubbo\u7B49RPC\u5BA2\u6237\u7AEF</li><li>\u6D88\u606F\u9A71\u52A8\u80FD\u529B\uFF1A\u57FA\u4E8ERabbitMQ\u3001RocketMQ\u3001Kafka\u7B49\u6D88\u606F\u9A71\u52A8\u80FD\u529B\uFF0C\u652F\u6301\u6D88\u606F\u961F\u5217\u3001\u6D88\u606F\u4E8B\u4EF6\u3001\u6D88\u606F\u8BA2\u9605\u7B49\u80FD\u529B\u3002</li><li>\u5206\u5E03\u5F0F\u4E8B\u52A1\uFF1A\u4F7F\u7528\u4E86@GlobalTransactional\u6CE8\u89E3\uFF0C\u9AD8\u6548\u5E76\u4E14\u5BF9\u4E1A\u52A1\u96F6\u4FB5\u5165\u5730\u89E3\u51B3\u4E86\u5206\u5E03\u5F0F\u4E8B\u52A1\u7684\u95EE\u9898\u3002</li><li>\u963F\u91CC\u4E91\u5BF9\u8C61\u5B58\u50A8\uFF1A\u963F\u91CC\u4E91\u63D0\u4F9B\u7684\u6D77\u91CF\u3001\u5B89\u5168\u3001\u4F4E\u6210\u672C\u3001\u9AD8\u53EF\u9760\u7684\u4E91\u5B58\u50A8\u670D\u52A1\u3002\u652F\u6301\u5728\u4EFB\u4F55\u5E94\u7528\u3001\u4EFB\u4F55\u65F6\u95F4\u3001\u4EFB\u4F55\u5730\u70B9\u5B58\u50A8\u548C\u8BBF\u95EE\u4EFB\u610F\u7C7B\u578B\u7684\u6570\u636E\u3002</li><li>\u5206\u5E03\u5F0F\u4EFB\u52A1\u8C03\u5EA6\uFF1A\u63D0\u4F9B\u79D2\u7EA7\u3001\u7CBE\u51C6\u3001\u9AD8\u53EF\u9760\u3001\u9AD8\u53EF\u7528\u7684\u5B9A\u65F6\uFF08\u57FA\u4E8ECRON\u8868\u8FBE\u5F0F\uFF09\u4EFB\u52A1\u8C03\u5EA6\u670D\u52A1\u3002\u540C\u65F6\u63D0\u4F9B\u5206\u5E03\u5F0F\u7684\u4EFB\u52A1\u6267\u884C\u6A21\u578B\uFF0C\u5982\u7F51\u7EDC\u4EFB\u52A1\u3002\u7F51\u7EDC\u4EFB\u52A1\u652F\u6301\u6D77\u91CF\u5B50\u4EFB\u52A1\u5747\u5300\u5206\u914D\u5230\u6240\u6709worker\uFF08shceduler-client)\u4E0A\u6267\u884C\u3002</li><li>\u963F\u91CC\u4E91\u77ED\u4FE1\u670D\u52A1\uFF1A\u8986\u76D6\u5168\u7403\u7684\u77ED\u4FE1\u670D\u52A1\uFF0C\u53CB\u597D\u3001\u641E\u7B11\u3001\u667A\u80FD\u7684\u4E92\u8054\u5316\u901A\u8BAF\u80FD\u529B\uFF0C\u5E2E\u52A9\u4F01\u4E1A\u8FC5\u901F\u642D\u5EFA\u5BA2\u6237\u89E6\u8FBE\u901A\u9053\u3002</li></ol>",7);function r(c,t){return o}var d=l(e,[["render",r],["__file","spring-cloud-producer-cluster-edition-construction.html.vue"]]);export{d as default};
