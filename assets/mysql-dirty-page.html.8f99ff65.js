import{r as c,c as l,a as e,d as r,F as a,b as n,e as t,o as p}from"./app.9da19d67.js";import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";const s={},i=n('<h2 id="\u810F\u9875" tabindex="-1"><a class="header-anchor" href="#\u810F\u9875" aria-hidden="true">#</a> \u810F\u9875</h2><p>\u5F53\u5185\u5B58\u6570\u636E\u9875\u8DDF\u78C1\u76D8\u6570\u636E\u9875\u5185\u5BB9\u4E0D\u4E00\u81F4\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u79F0\u8FD9\u4E2A\u5185\u5B58\u9875\u4E3A\u201C\u810F\u9875\u201D\u3002\u5185\u5B58\u6570\u636E\u5199\u5165\u5230\u78C1\u76D8\u540E\uFF0C\u5185\u5B58\u548C\u78C1\u76D8\u4E0A\u7684\u6570\u636E\u9875\u7684\u5185\u5BB9\u5C31\u4E00\u81F4\u4E86\uFF0C\u79F0\u4E3A\u201C\u5E72\u51C0\u9875\u201D\u3002</p><p>\u4E0D\u8BBA\u662F\u810F\u9875\u8FD8\u662F\u5E72\u51C0\u9875\uFF0C\u90FD\u5728\u5185\u5B58\u4E2D\u3002</p><p>\u5E73\u65F6\u5F88\u5FEB\u5730\u66F4\u65B0\u64CD\u4F5C\uFF0C\u90FD\u662F\u5728\u5199\u5185\u5B58\u548C\u65E5\u5FD7\u3002</p><p>\u4E00\u6761 SQL \u8BED\u53E5\uFF0C\u6B63\u5E38\u6267\u884C\u7684\u65F6\u5019\u7279\u522B\u5FEB\uFF0C\u4F46\u662F\u6709\u65F6\u4E5F\u4E0D\u77E5\u9053\u600E\u4E48\u56DE\u4E8B\uFF0C\u5B83\u5C31\u4F1A\u53D8\u5F97\u7279\u522B\u6162\u3002</p><p>\u90A3\u8FD9\u65F6\u5019\u53EF\u80FD\u5C31\u662F\u5728\u5237\u810F\u9875\u5230\u78C1\u76D8\u4E2D\u4E86~ flush</p><h2 id="_2\u3001\u4EC0\u4E48\u65F6\u5019\u4F1A\u5F15\u8D77flush" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u4EC0\u4E48\u65F6\u5019\u4F1A\u5F15\u8D77flush" aria-hidden="true">#</a> 2\u3001\u4EC0\u4E48\u65F6\u5019\u4F1A\u5F15\u8D77flush</h2><p>\uFF081\uFF09 InnoDB\u7684redo log\u5199\u6EE1\u4E86\u3002\u8FD9\u65F6\u5019\u7CFB\u7EDF\u4F1A\u505C\u6B62\u6240\u6709\u7684\u66F4\u65B0\u64CD\u4F5C\uFF0C\u7136\u540E\u8BA9\u65E5\u5FD7\u53EF\u4EE5\u7EE7\u7EED\u5199\u3002</p><p>\u628A\u8FD9\u90E8\u5206\u6570\u636E\u65E5\u5FD7\u90FDflush\u5230\u78C1\u76D8\u4E0A\u9762\u3002</p><p>(2) \u4E5F\u53EF\u80FD\u662F\u7CFB\u7EDF\u5185\u5B58\u4E0D\u8DB3\uFF0C\u9700\u8981\u65B0\u7684\u5185\u5B58\u9875\uFF0C\u90A3\u4E48\u5C31\u6DD8\u6C70\u4E00\u4E9B\u5185\u5B58\u9875\uFF0C\u7A7A\u51FA\u6765\u7684\u7ED9\u522B\u7684\u6570\u636E\u9875\u4F7F\u7528\u3002</p><p>\u5148\u628A\u810F\u9875\u5199\u5230\u78C1\u76D8\u3002</p><p>PS:\u4F7F\u7528\u5185\u5B58\u662F\u4E3A\u4E86\u6548\u7387\u66F4\u597D\uFF0C</p><p>\u56E0\u4E3A\u5982\u679C\u5185\u5B58\u5B58\u5728\u6570\u636E\u9875\uFF0C\u90A3\u4E48\u6570\u636E\u5C31\u4E00\u5B9A\u6B63\u786E\uFF0C\u76F4\u63A5\u8FD4\u56DE\uFF1B</p><p>\u5982\u679C\u5185\u5B58\u6CA1\u6709\u6570\u636E\uFF0C\u624D\u9700\u8981\u53BB\u78C1\u76D8\u4E2D\u53D6\uFF0C\u8BFB\u5165\u5230\u5185\u5B58\uFF0C\u8FD4\u56DE\uFF1B</p><h2 id="qa" tabindex="-1"><a class="header-anchor" href="#qa" aria-hidden="true">#</a> qa</h2><p>Q\uFF1Abuffer pool\uFF1F</p><p>\u7F13\u5B58\u533A\u57DF\uFF0C\u7F13\u5B58\u6570\u636E\u548C\u7D22\u5F15\u5728\u5185\u5B58\u4E2D\u3002</p><p><code>innodb</code>\u4F7F\u7528\u4E86\u4E00\u4E9B\u94FE\u8868\u3002</p><ul><li><code>lru</code>\u94FE\u8868\uFF1A\u7528\u6765\u5B58\u50A8\u5185\u5B58\u4E2D\u7684\u7F13\u5B58\u6570\u636E\u3002</li><li><code>free</code>\u94FE\u8868\uFF1A\u7528\u6765\u5B58\u653E\u6240\u6709\u7684\u7A7A\u95F2\u9875\uFF0C\u6BCF\u6B21\u9700\u8981\u6570\u636E\u9875\u5B58\u50A8\u6570\u636E\u65F6\uFF0C\u5C31\u9996\u5148\u68C0\u6D4Bfree\u4E2D\u6709\u6CA1\u6709\u7A7A\u95F2\u7684\u9875\u6765\u5206\u914D\u3002</li><li><code>flush</code>\u94FE\u8868\uFF1A\u5728\u5185\u5B58\u4E2D\u88AB\u4FEE\u6539\u4F46\u8FD8\u6CA1\u6709\u5237\u65B0\u5230\u78C1\u76D8\u7684\u6570\u636E\u9875\u5217\u8868\uFF0C\u5C31\u662F\u6240\u8C13\u7684\u810F\u9875\u5217\u8868\uFF0C\u5185\u5B58\u4E2D\u7684\u6570\u636E\u8DDF\u5BF9\u5E94\u7684\u78C1\u76D8\u4E0A\u7684\u6570\u636E\u4E0D\u4E00\u81F4\uFF0C\u5C5E\u4E8E\u8BE5\u5217\u8868\u7684\u9875\u9762\u540C\u6837\u5B58\u5728\u4E8Elru\u5217\u8868\u4E2D\uFF0C\u4F46\u53CD\u4E4B\u672A\u5FC5\u3002</li></ul><p>Q:LSN\uFF1F</p><p>Log sequence number: \u5F53\u524D\u7CFB\u7EDF\u6700\u5927\u7684<code>LSN</code>\u53F7</p><p>\u6BCF\u4E2A\u6570\u636E\u9875\u6709LSN\uFF0C\u91CD\u505A\u65E5\u5FD7\u6709LSN\uFF0C<code>checkpoint</code>\u6709LSN\u3002</p><p>\u5360\u75288\u5B57\u8282\uFF0CLSN\u4E3B\u8981\u7528\u4E8E\u53D1\u751Fcrash\u65F6\u5BF9\u6570\u636E\u8FDB\u884C<code>recovery</code>\uFF0CLSN\u662F\u4E00\u4E2A\u4E00\u76F4\u9012\u589E\u7684\u6574\u578B\u6570\u5B57\uFF0C\u8868\u793A\u4E8B\u52A1\u5199\u5165\u5230\u65E5\u5FD7\u7684\u5B57\u8282\u603B\u91CF\u3002 LSN\u4E0D\u4EC5\u53EA\u5B58\u5728\u4E8E\u91CD\u505A\u65E5\u5FD7\u4E2D\uFF0C\u5728\u6BCF\u4E2A\u6570\u636E\u9875\u5934\u90E8\u4E5F\u4F1A\u6709\u5BF9\u5E94\u7684LSN\u53F7\uFF0C\u8BE5LSN\u8BB0\u5F55\u5F53\u524D\u9875\u6700\u540E\u4E00\u6B21\u4FEE\u6539\u7684LSN\u53F7\uFF0C\u7528\u4E8E\u5728recovery\u65F6\u5BF9\u6BD4\u91CD\u505A\u65E5\u5FD7LSN\u53F7\u51B3\u5B9A\u662F\u5426\u5BF9\u8BE5\u9875\u8FDB\u884C\u6062\u590D\u6570\u636E\u3002\u524D\u9762\u8BF4\u7684checkpoint\u4E5F\u662F\u6709LSN\u53F7\u8BB0\u5F55\u7684\uFF0CLSN\u53F7\u4E32\u8054\u8D77\u4E00\u4E2A\u4E8B\u52A1\u5F00\u59CB\u5230\u6062\u590D\u7684\u8FC7\u7A0B\u3002</p><p>\u7A0B\u5E8F\u4EBA\u751F program-life</p><p>Q:\u5237\u5199\u7684\u7B54\u9898\u8FC7\u7A0B\uFF1F</p><p><code>buffer pool</code>\u91CC\u7EF4\u62A4\u7740\u4E00\u4E2A\u810F\u9875\u5217\u8868\uFF0C\u5047\u8BBE\u73B0\u5728<code>redo log</code> \u7684 <code>checkpoint</code> \u8BB0\u5F55\u7684 <code>LSN</code> \u4E3A 10\uFF0C\u73B0\u5728\u5185\u5B58\u4E2D\u7684\u4E00\u5E72\u51C0\u9875\u6709\u4FEE\u6539\uFF0C\u4FEE\u6539\u540E\u8BE5\u9875\u7684LSN\u4E3A12\uFF0C\u5927\u4E8E checkpoint \u7684LSN\uFF0C\u5219\u5728\u5199redo log\u7684\u540C\u65F6\u8BE5\u9875\u4E5F\u4F1A\u88AB\u6807\u8BB0\u4E3A\u810F\u9875\u8BB0\u5F55\u5230\u810F\u9875\u5217\u8868\u4E2D\uFF0C\u73B0\u5728\u5185\u5B58\u4E0D\u8DB3\uFF0C\u8BE5\u9875\u9700\u8981\u88AB\u6DD8\u6C70\u6389\uFF0C\u8BE5\u9875\u4F1A\u88AB\u5237\u5230\u78C1\u76D8\uFF0C\u78C1\u76D8\u4E2D\u8BE5\u9875\u7684LSN\u4E3A12\uFF0C\u8BE5\u9875\u4E5F\u4ECE\u810F\u9875\u5217\u8868\u4E2D\u79FB\u9664\uFF0C\u73B0\u5728redo log \u9700\u8981\u5F80\u524D\u63A8\u8FDBcheckpoint\uFF0C\u5230LSN\u4E3A12\u7684\u8FD9\u6761log\u65F6\uFF0C\u53D1\u73B0\u5185\u5B58\u4E2D\u7684\u810F\u9875\u5217\u8868\u91CC\u6CA1\u6709\u8BE5\u9875\uFF0C\u4E14\u78C1\u76D8\u4E0A\u8BE5\u9875\u7684LSN\u4E5F\u5DF2\u7ECF\u4E3A12\uFF0C\u5219\u8BE5\u9875\u5DF2\u5237\u810F\uFF0C\u5DF2\u4E3A\u5E72\u51C0\u9875\uFF0C\u8DF3\u8FC7\u3002</p><p>Q:\u5982\u679C\u7CFB\u7EDF\u6027\u80FD\u5DEE\uFF0C\u4E3A\u4EC0\u4E48\u4F1A\u6162\uFF1F</p><p>\u56E0\u4E3A\u810F\u9875\u5237\u5F97\u5F88\u6162\uFF0C\u5806\u79EF\u4E86\u4E4B\u540E\uFF0C\u5C31\u4F1A\u7B49\u5F85\u810F\u9875\u5237\u5B8C\u4E4B\u540E\u5728\u8FDB\u884C\u66F4\u65B0\u548C\u8BFB\u53D6\u3002</p>',28),h={href:"https://blog.csdn.net/pmdream/article/details/103668933?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165076788816782391885620%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165076788816782391885620&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-103668933.142%5Ev9%5Econtrol,157%5Ev4%5Econtrol&utm_term=MySQL+%E8%84%8F%E9%A1%B5&spm=1018.2226.3001.4187",target:"_blank",rel:"noopener noreferrer"},_=t("[MySQL]\u810F\u9875"),u={href:"https://blog.csdn.net/qq_27347991/article/details/81052728",target:"_blank",rel:"noopener noreferrer"},f=t("Mysql Buffer Pool"),L={href:"https://www.cnblogs.com/drizzle-xu/p/9713378.html",target:"_blank",rel:"noopener noreferrer"},m=t("MySQL-LSN");function S(N,b){const o=c("ExternalLinkIcon");return p(),l(a,null,[i,e("ul",null,[e("li",null,[e("a",h,[_,r(o)])]),e("li",null,[e("a",u,[f,r(o)])]),e("li",null,[e("a",L,[m,r(o)])])])],64)}var q=d(s,[["render",S],["__file","mysql-dirty-page.html.vue"]]);export{q as default};
