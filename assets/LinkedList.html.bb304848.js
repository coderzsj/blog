import{b as a}from"./app.9da19d67.js";import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";const s={},i=a(`<h1 id="\u6570\u7EC4\u548C\u94FE\u8868\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u6570\u7EC4\u548C\u94FE\u8868\u7684\u533A\u522B" aria-hidden="true">#</a> \u6570\u7EC4\u548C\u94FE\u8868\u7684\u533A\u522B</h1><p>1\u3001\u6570\u7EC4\u7279\u70B9</p><p>\u5B58\u50A8\u533A\u95F4\u662F\u8FDE\u7EED\u3001\u4E14\u5360\u7528\u5185\u5B58\u4E25\u91CD\uFF0C\u7A7A\u95F4\u590D\u6742\u4E5F\u5F88\u5927\uFF0C\u65F6\u95F4\u590D\u6742O(1)\u3002\u4F18\u70B9\uFF1A\u662F\u968F\u673A\u8BFB\u53D6\u6548\u7387\u5F88\u9AD8\uFF0C\u539F\u56E0\u6570\u7EC4\u662F\u8FDE\u7EED\uFF08\u968F\u673A\u8BBF\u95EE\u6027\u5F3A\uFF0C\u67E5\u627E\u901F\u5EA6\u5FEB\uFF09\u3002\u7F3A\u70B9\uFF1A\u63D2\u5165\u548C\u5220\u9664\u6570\u636E\u6548\u7387\u4F4E\uFF0C\u56E0\u63D2\u5165\u6570\u636E\uFF0C\u8FD9\u4E2A\u4F4D\u7F6E\u540E\u9762\u7684\u6570\u636E\u5728\u5185\u5B58\u4E2D\u836F\u7F51\u540E\u88D4\u7684\uFF0C\u4E14\u5927\u5C0F\u56FA\u5B9A\u4E0D\u6613\u52A8\u6001\u6269\u5C55\u3002</p><p>2\u3001\u94FE\u8868\u7279\u70B9</p><p>\u533A\u95F4\u79BB\u6563\uFF0C\u5360\u7528\u5185\u5B58\u5BBD\u677E\uFF0C\u7A7A\u95F4\u590D\u6742\u5EA6\u5C0F\uFF0C\u65F6\u95F4\u590D\u6742\u5EA6O(N)\u3002\u4F18\u70B9\uFF1A\u63D2\u5165\u5220\u9664\u901F\u5EA6\u5FEB\uFF0C\u5185\u5B58\u5229\u7528\u7387\u9AD8\uFF0C\u6CA1\u6709\u5927\u5C0F\u56FA\u5B9A\uFF0C\u6269\u5C55\u7075\u6D3B\u3002\u7F3A\u70B9\uFF1A\u4E0D\u80FD\u968F\u673A\u67E5\u627E\uFF0C\u6BCF\u6B21\u90FD\u662F\u4ECE\u7B2C\u4E00\u4E2A\u5F00\u59CB\u904D\u5386\uFF08\u67E5\u8BE2\u6548\u7387\u4F4E\uFF09\u3002</p><p>ArrayList\uFF0ClinkedList\u63D2\u5165\u548C\u68C0\u7D22\u987A\u5E8F\u662F\u4E00\u6837\u7684\u3002</p><p>LinkedHashMap\u5B9E\u73B0\u987A\u5E8F\u6027</p><h2 id="arraylist" tabindex="-1"><a class="header-anchor" href="#arraylist" aria-hidden="true">#</a> ArrayList</h2><p>\u4E0A\u7BC7\u6587\u7AE0\u6211\u4EEC\u5206\u6790\u4E86\u5E38\u89C1\u7684ArrayList\u6E90\u7801\uFF0C\u5B83\u7684\u5185\u90E8\u662F\u7531\u4E00\u4E2A\u6570\u7EC4\u6765\u5B9E\u73B0\u7684\u3002\u90A3\u4E48\u4ECA\u5929\uFF0C\u6211\u4EEC\u6765\u5206\u6790\u53E6\u4E00\u4E2A\u5E38\u89C1\u7684\u7C7BLinkedList\u3002\u672C\u6587\u5206\u6790\u90FD\u6765\u81EAJava8\u3002(ps:\u8FD9\u6BB5\u8BDD\u5199\u81EA\u5199\u5B8C\u672C\u6587\u8BB0\u5F55\u540E\u6DFB\u52A0\u3002\u4E2A\u4EBA\u611F\u60F3\u4E3A\u5DF2\u7ECF\u5199\u6210\u4E86\u4ECB\u7ECD\u94FE\u8868)</p><p>\u4E00\u3001\u7C7B\u8BF4\u660E</p><p>\u9996\u5148\u6211\u4EEC\u6765\u770B\u4E00\u4E0B\u8FD9\u4E2A\u7C7B\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LinkedLiist</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u9996\u5148linkedlist \u5185\u90E8\u662F\u7531\u53CC\u5411\u94FE\u8868\u6765\u5B9E\u73B0\u7684\u3002\u6211\u4EEC\u5B58\u50A8\u7684\u6BCF\u4E00\u4E2A\u6570\u636E\u90FD\u4F1A\u88AB\u5C01\u88C5\u5230\u4E00\u4E2A\u6570\u636E\u8282\u70B9\u4E4B\u4E2D\u3002\u5305\u62EC\u6307\u5411\u524D\u8282\u70B9\u7684\u6307\u9488\uFF0C\u6570\u636E\uFF0C\u6307\u5411\u540E\u8282\u70B9\u7684\u6307\u9488\uFF1B\u4F9D\u9760\u8FD9\u4E9B\u6570\u636E\u7ED3\u70B9\u5B9E\u73B0\u53CC\u5411\u94FE\u8868\u3002</p><p>\u65E2\u7136\u662F\u94FE\u8868\uFF0C\u90A3\u4E48\u4F18\u70B9\u5C31\u662F\u63D2\u5165\uFF0C\u4FEE\u6539\uFF0C\u5220\u9664\u6570\u636E\u6548\u7387\u6BD4\u6570\u7EC4\u9AD8\u5F88\u591A\u3002\u56E0\u4E3A\u5728\u63D2\u5165\u6216\u8005\u5B9E\u65F6\u67D0\u4E2A\u6570\u636E\u65F6\uFF0C\u53EA\u9700\u5BF9\u8981\u5220\u9664\u8282\u70B9\uFF0C\u524D\u8282\u70B9\uFF0C\u540E\u8282\u70B9\u8FDB\u884C\u64CD\u4F5C\uFF0C\u65E0\u9700\u50CF\u6570\u7EC4\u4E00\u6837\u5C06\u540E\u7EED\u6570\u636E\u5168\u90E8\u524D\u79FB\u6216\u8005\u540E\u79FB\u3002\u4F46\u662F\u7531\u6B64\u4E5F\u770B\u51FA\u7F3A\u70B9\uFF0C\u56E0\u4E3A\u94FE\u8868\u5E76\u4E0D\u662F\u8FDE\u7EED\u7684\u7A7A\u95F4\u5B58\u50A8\uFF0C\u4E5F\u6CA1\u6709\u4EC0\u4E48\u4E0B\u6807\u8FDB\u884C\u8BB0\u5F55\u4F4D\u7F6E\uFF0C\u56E0\u6B64\u8981\u5BFB\u627E\u67D0\u4E2A\u6570\u636E\u65F6\u53EA\u80FD\u8FDB\u884C\u904D\u5386\uFF0C\u800C\u4E0D\u50CF\u6570\u7EC4\u4E00\u6837\u53EF\u4EE5\u968F\u673A\u67E5\u627E\u3002\u5982\u679C\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\uFF0C\u6211\u4EEC\u9700\u8981\u5BF9\u67D0\u4E2Alist\u8FDB\u884C\u9891\u7E41\u7684\u63D2\u5165\u3001\u5220\u9664\uFF0C\u800C\u4E14\u6570\u636E\u91CF\u6709\u7279\u522B\u5927\u7684\u65F6\u5019\u3002\u53EF\u4EE5\u8003\u8651\u4F7F\u7528linkedlist\u3002</p>`,15);function n(r,p){return i}var l=e(s,[["render",n],["__file","LinkedList.html.vue"]]);export{l as default};
