(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[58],{"93a2":function(n,t,e){"use strict";e.r(t);var r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("q-page",{attrs:{padding:""}},[n.loading?e("div",{staticClass:"row absolute-center"},[e("loading")],1):n._e(),n.loading?n._e():e("div",{staticClass:"row q-mb-xs"},n._l(n.journaltypes,(function(n){return e("journalcard",{key:n.id,attrs:{journal:n}})})),1),e("q-separator"),n.loading?n._e():e("div",{staticClass:"q-pt-sm"},[0==n.userJournals.journals.length?e("q-banner",{staticClass:"text-white bg-negative",attrs:{"inline-actions":""}},[n._v("\n      You have no journals.\n    ")]):e("journals",{attrs:{journals:n.userJournals.journals}})],1)],1)},o=[],a=(e("8e6e"),e("8a81"),e("ac6a"),e("cadf"),e("06db"),e("456d"),e("9523")),u=e.n(a),l=(e("6c7b"),e("2f62"));function s(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function i(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?s(Object(e),!0).forEach((function(t){u()(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):s(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}var c={data:function(){return{loading:!1,journaltypes:[{id:"01",title:"open",description:"an open journal format for thoughts and notes",count:8,color:"grey"},{id:"02",title:"weeding",description:"a journal format to uproot problems",count:5,color:"blue"},{id:"03",title:"reflection",description:"a reflective journal format for retrospection",count:1,color:"red"}]}},components:{journalcard:function(){return Promise.all([e.e(0),e.e(22)]).then(e.bind(null,"7c48"))},journal:function(){return e.e(14).then(e.bind(null,"b96d"))},journals:function(){return Promise.all([e.e(0),e.e(15)]).then(e.bind(null,"4c4d"))},loading:function(){return Promise.all([e.e(0),e.e(1)]).then(e.bind(null,"3ede"))}},computed:i(i({},Object(l["c"])("journal",["userJournals"])),{},{openJournalCount:function(){return this.userJournals.journals.filter((function(n){return"open"===n.type})).length}}),methods:i(i({},Object(l["b"])("journal",["fetchUserJournals"])),{},{getUserJournals:function(){var n=this;this.loading=!0,this.fetchUserJournals().then((function(){n.journaltypes.forEach((function(t){n.journaltypes[0].count=n.userJournals.journals.filter((function(n){return"open"===n.type})).length,n.journaltypes[1].count=n.userJournals.journals.filter((function(n){return"weeding"===n.type})).length,n.journaltypes[2].count=n.userJournals.journals.filter((function(n){return"reflection"===n.type})).length})),n.loading=!1})).catch((function(t){n.loading=!1}))},addJournalCount:function(n){"open"==n&&this.journaltypes[0].count++,"weeding"==n&&this.journaltypes[1].count++,"reflection"==n&&this.journaltypes[2].count++}}),created:function(){var n=this;this.getUserJournals(),this.$root.$on("newJournalAdded",(function(t){n.addJournalCount(t)}))}},d=c,p=e("2877"),f=e("eebe"),j=e.n(f),b=e("9989"),h=e("eb85"),g=e("54e1"),y=Object(p["a"])(d,r,o,!1,null,null,null);t["default"]=y.exports;j()(y,"components",{QPage:b["a"],QSeparator:h["a"],QBanner:g["a"]})}}]);