(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[47,48],{"1c83":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.dueDate?n("q-input",{staticClass:"q-mt-md",attrs:{dense:"",standout:"",label:"Due time",value:e.dueTime},on:{input:function(t){return e.$emit("update:dueTime",t)}},scopedSlots:e._u([{key:"append",fn:function(){return[e.dueTime?n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"cancel"},on:{click:function(t){return t.stopPropagation(),e.$emit("update:dueTime","")}}}):e._e(),n("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[n("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[n("q-time",{attrs:{value:e.dueTime},on:{input:function(t){return e.$emit("update:dueTime",t)}}})],1)],1)]},proxy:!0}],null,!1,214163154)}):e._e()},u=[],i={props:["dueTime","dueDate"]},o=i,s=n("2877"),r=n("eebe"),c=n.n(r),p=n("27f9"),l=n("0016"),d=n("7cbe"),m=n("ca78"),f=Object(s["a"])(o,a,u,!1,null,null,null);t["default"]=f.exports;c()(f,"components",{QInput:p["a"],QIcon:l["a"],QPopupProxy:d["a"],QTime:m["a"]})}}]);