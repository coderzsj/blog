(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{636:function(l,t,s){"use strict";s.r(t);var e=s(1),a=Object(e.a)({},(function(){var l=this,t=l.$createElement,s=l._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[s("h2",{attrs:{id:"mysql主从复制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mysql主从复制"}},[l._v("#")]),l._v(" mysql主从复制")]),l._v(" "),s("p",[l._v("MySQL主从复制是一个异步的复制过程，底层是基于数据库自带的二进制日志功能。就是一台或多台MySQL数据库（slave，即从库）从另一台MySQL数据库（")]),l._v(" "),s("ul",[s("li",[l._v("master将改变纪录到二进制日志（binary log)")]),l._v(" "),s("li",[l._v("slave将master的binary log拷贝到它的中继日志（relay log）")]),l._v(" "),s("li",[l._v("slave重做中继日志中的事件，将改变应用到自己的数据库中。")])]),l._v(" "),s("p",[l._v("搭建，实现主从同步。 (两阶段提交)")]),l._v(" "),s("p",[l._v("配置-前置条件")]),l._v(" "),s("p",[l._v("提前准备好两台服务器，分别安装MySQL并启动服务成功。")]),l._v(" "),s("ul",[s("li",[l._v("主库（master） 192.168.138.100")]),l._v(" "),s("li",[l._v("从库（slave） 192.168.138.101")])])])}),[],!1,null,null,null);t.default=a.exports}}]);