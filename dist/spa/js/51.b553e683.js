(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[51],{f361:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-slide-item",{attrs:{"right-color":"blue","left-color":"white"},on:{right:t.onRight},scopedSlots:t._u([{key:"right",fn:function(){return[i("q-icon",{attrs:{name:"keyboard_backspace"}})]},proxy:!0}])},[i("q-tooltip",{attrs:{delay:1500,offset:[0,10]}},[t._v("\n    Slide left to select\n  ")]),i("q-item",[i("q-item-section",[i("q-item-label",{staticClass:"text-subtitle1"},[t._v("\n        "+t._s(t.vocab.definition)+"\n      ")])],1)],1)],1)},n=[],s=(i("c5f6"),{props:{vocab:{type:Object,required:!0},listName:{type:String,required:!0},shuffle:{type:Number}},methods:{onRight:function(t){var e=t.reset;this.$root.$emit("selectWord",this.vocab),this.finalize(e)},finalize:function(t){this.timer=setTimeout((function(){t()}),2500)},showNotif:function(t,e,i){var o={type:t,message:e,icon:i};this.$q.notify(o)}},beforeDestroy:function(){clearTimeout(this.timer)}}),r=s,a=i("2877"),c=i("eebe"),l=i.n(c),f=i("de1d"),u=i("05c0"),m=i("4074"),p=i("0170"),h=i("0016"),b=i("66e5"),d=Object(a["a"])(r,o,n,!1,null,null,null);e["default"]=d.exports;l()(d,"components",{QSlideItem:f["a"],QTooltip:u["a"],QItemSection:m["a"],QItemLabel:p["a"],QIcon:h["a"],QItem:b["a"]})}}]);