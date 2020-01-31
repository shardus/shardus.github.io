(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{224:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"getaccountdatabylist"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getaccountdatabylist"}},[t._v("#")]),t._v(" getAccountDataByList")]),t._v(" "),a("p",[t._v("This function is required to be implemented by the app developer for internal use by shardus. It takes in 1 parameter.")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("addressList")]),t._v(" An array of account addresses")])]),t._v(" "),a("p",[t._v("Using the passed in list of addresses, find the corresponding accounts within your database, wrap them in an object with:")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("accountId")]),t._v(": The account id")]),t._v(" "),a("li",[a("code",[t._v("stateId")]),t._v(": The hash property on the account")]),t._v(" "),a("li",[a("code",[t._v("data")]),t._v(": The entire account object")]),t._v(" "),a("li",[a("code",[t._v("timestamp")]),t._v(": The timestamp property on the account")])]),t._v(" "),a("blockquote",[a("p",[t._v("Because shardus allows you to use whatever kind of database you choose, this is required by the app developer to implement so shardus can grab the account data for it's internal uses.")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAccountDataByList")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("addressList")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" results "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" address "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" addressList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" account "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" accounts"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("address"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("account"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" wrapped "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          accountId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" account"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          stateId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" account"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hash"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          data"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" account"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          timestamp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" account"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("timestamp\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        results"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("push")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("wrapped"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" results"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);