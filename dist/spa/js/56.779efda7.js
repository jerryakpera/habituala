(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[56],{"28b7":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-slide-item",{attrs:{"right-color":"red","left-color":"positive"},on:{left:t.onLeft,right:t.onRight},scopedSlots:t._u(["All"==t.listName?{key:"left",fn:function(){return[o("q-icon",{attrs:{name:"add"}})]},proxy:!0}:"game"==t.listName?{key:"right",fn:function(){return[o("q-icon",{attrs:{name:"remove"}})]},proxy:!0}:null,"My List"==t.listName?{key:"right",fn:function(){return[o("q-icon",{attrs:{name:"remove"}})]},proxy:!0}:null],null,!0)},["My List"==t.listName?o("q-tooltip",{attrs:{delay:1500,offset:[0,10]}},[t._v("\n    Slide left remove\n  ")]):o("q-tooltip",{attrs:{delay:1500,offset:[0,10]}},[t._v("\n    Slide right to add to your list\n  ")]),o("q-item",[o("q-item-section",[o("q-item-label",{staticClass:"text-h5"},[t._v("\n        "+t._s(t.vocab.word)+"\n      ")]),o("q-item-label",{staticClass:"text-subtitle1"},[t._v("\n        "+t._s(t.vocab.definition)+"\n      ")])],1)],1)],1)},r=[],n=(o("8e6e"),o("8a81"),o("ac6a"),o("cadf"),o("06db"),o("456d"),o("20d6"),o("9523")),s=o.n(n),c=o("2f62");function a(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,i)}return o}function l(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?a(Object(o),!0).forEach((function(e){s()(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var f={props:{vocab:{type:Object,required:!0},listName:{type:String,required:!0}},computed:l({},Object(c["c"])("retrospect",["userWords"])),methods:l(l({},Object(c["b"])("retrospect",["addVocabToUserList","removeVocabFromUser"])),{},{onLeft:function(t){var e=t.reset;this.addWordFromList(),this.finalize(e)},onRight:function(t){var e=t.reset;this.removeWord(),this.finalize(e)},finalize:function(t){this.timer=setTimeout((function(){t()}),1e3)},removeWord:function(){this.removeVocabFromUser(this.vocab._id)},addWordFromList:function(){var t=this,e=this.userWords.findIndex((function(e){return e._id===t.vocab._id}));e>=0?this.showNotif("positive","Already exists","done_all"):this.addVocabToUserList(this.vocab._id).then((function(){})).catch((function(e){t.showNotif("negative",e,"priority_high")}))},showNotif:function(t,e,o){var i={type:t,message:e,icon:o};this.$q.notify(i)}}),beforeDestroy:function(){clearTimeout(this.timer)}},d=f,u=o("2877"),m=o("eebe"),p=o.n(m),b=o("de1d"),h=o("05c0"),v=o("0016"),y=o("66e5"),O=o("4074"),g=o("0170"),w=Object(u["a"])(d,i,r,!1,null,null,null);e["default"]=w.exports;p()(w,"components",{QSlideItem:b["a"],QTooltip:h["a"],QIcon:v["a"],QItem:y["a"],QItemSection:O["a"],QItemLabel:g["a"]})}}]);