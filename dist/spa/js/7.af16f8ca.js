(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{7710:function(s,e,r){"use strict";r.r(e);var t=function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("q-card",[s.loading?r("q-card-section",[r("loading")],1):s._e(),s.loading?s._e():r("q-card-section",{staticClass:"row"},[r("modalheader",[s._v("Change Password")]),r("q-space"),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",size:"10px",round:"",flat:"",icon:"close"}})],1),s.loading?s._e():r("form",{on:{submit:function(e){return e.preventDefault(),s.submitForm(e)}}},[r("q-card-section",{staticClass:"q-pt-none"},[r("q-input",{ref:"currentpassword",staticClass:"q-mt-lg",staticStyle:{width:"300px"},attrs:{type:s.showCurrentPassword?"password":"text",label:"Current Password",dense:"",rules:[function(s){return s.length>=8||"Password is too short"}],autofocus:""},scopedSlots:s._u([{key:"append",fn:function(){return[r("q-icon",{staticStyle:{cursor:"pointer"},attrs:{name:s.showCurrentPassword?"visibility":"visibility_off",color:"dark"},on:{click:function(e){s.showCurrentPassword=!s.showCurrentPassword}}})]},proxy:!0}],null,!1,3003332077),model:{value:s.user.currentpassword,callback:function(e){s.$set(s.user,"currentpassword",e)},expression:"user.currentpassword"}}),r("q-input",{ref:"newpassword",staticClass:"q-mt-lg",staticStyle:{width:"300px"},attrs:{type:s.showNewPassword?"password":"text",label:"New Password",dense:"",rules:[function(s){return s.length>=8||"Password is too short"},s.isDifferent]},scopedSlots:s._u([{key:"append",fn:function(){return[r("q-icon",{staticStyle:{cursor:"pointer"},attrs:{name:s.showNewPassword?"visibility":"visibility_off",color:"dark"},on:{click:function(e){s.showNewPassword=!s.showNewPassword}}})]},proxy:!0}],null,!1,2507465752),model:{value:s.user.newpassword,callback:function(e){s.$set(s.user,"newpassword",e)},expression:"user.newpassword"}}),r("q-input",{ref:"confirmnewpassword",staticClass:"q-mt-lg",staticStyle:{width:"300px"},attrs:{type:s.showConfirmNewPassword?"password":"text",label:"Confirm New Password",dense:"",rules:[function(s){return s.length>=8||"Password is too short"},s.isNotSame]},scopedSlots:s._u([{key:"append",fn:function(){return[r("q-icon",{staticStyle:{cursor:"pointer"},attrs:{name:s.showConfirmNewPassword?"visibility":"visibility_off",color:"dark"},on:{click:function(e){s.showConfirmNewPassword=!s.showConfirmNewPassword}}})]},proxy:!0}],null,!1,3384269802),model:{value:s.user.confirmnewpassword,callback:function(e){s.$set(s.user,"confirmnewpassword",e)},expression:"user.confirmnewpassword"}})],1),r("q-card-actions",{attrs:{align:"right"}},[r("q-btn",{staticClass:"q-mr-sm text-right q-pl-lg q-pr-lg",attrs:{label:"Save",color:"positive",type:"submit"}})],1)],1)],1)},o=[],n=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("9523")),a=r.n(n),i=r("2f62");function c(s,e){var r=Object.keys(s);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(s);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(s,e).enumerable}))),r.push.apply(r,t)}return r}function u(s){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){a()(s,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(s,e,Object.getOwnPropertyDescriptor(r,e))}))}return s}var d={data:function(){return{showCurrentPassword:!0,showNewPassword:!0,showConfirmNewPassword:!0,loading:!1,user:{currentpassword:"",newpassword:"",confirmnewpassword:""}}},components:{modalheader:function(){return r.e(2).then(r.bind(null,"2197"))},loading:function(){return Promise.all([r.e(0),r.e(1)]).then(r.bind(null,"3ede"))}},computed:{},methods:u(u({},Object(i["b"])("auth",["updatePassword"])),{},{isNotSame:function(s){return s===this.user.newpassword||"Passwords must match"},isDifferent:function(s){return s!=this.user.currentpassword||"Current and new passwords must be different"},submitForm:function(){this.$refs.currentpassword.validate(),this.$refs.newpassword.validate(),this.$refs.confirmnewpassword.validate(),this.$refs.currentpassword.hasError||this.$refs.newpassword.hasError||this.$refs.confirmnewpassword.hasError||this.submitUpdatePassword()},submitUpdatePassword:function(){var s=this;this.setLoading(!0),this.updatePassword(this.user).then((function(e){s.setLoading(!1);var r={message:"Password changed successfully",icon:"done_all"};s.openSnackbar(r),s.$emit("closeDialog")})).catch((function(e){s.$emit("closeDialog");var r={message:e,icon:"priority_high"};s.openSnackbar(r),s.setLoading(!1)}))},openSnackbar:function(s){this.$root.$emit("showSnackbar",s)},setLoading:function(s){this.loading=s}}),mounted:function(){}},l=d,w=r("2877"),p=r("eebe"),f=r.n(p),h=r("f09f"),m=r("a370"),b=r("2c91"),P=r("9c40"),g=r("27f9"),y=r("0016"),v=r("4b7e"),C=r("7f67"),q=Object(w["a"])(l,t,o,!1,null,null,null);e["default"]=q.exports;f()(q,"components",{QCard:h["a"],QCardSection:m["a"],QSpace:b["a"],QBtn:P["a"],QInput:g["a"],QIcon:y["a"],QCardActions:v["a"]}),f()(q,"directives",{ClosePopup:C["a"]})}}]);