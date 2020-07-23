(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[40],{f2dd:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.milestone?n("div",[n("q-card-section",{staticClass:"q-pa-none q-mt-sm",class:0==e.milestone.group?"bg-blue-8":1==e.milestone.group?"bg-orange-8":"bg-green-8",staticStyle:{"border-radius":"30px"},attrs:{componentKey:e.componentKey}},[n("q-expansion-item",{staticClass:"text-white",attrs:{label:e.milestone.name,"expand-icon-class":"text-white","dense-toggle":""},scopedSlots:e._u([{key:"header",fn:function(){return[n("q-item-section",{attrs:{avatar:""}},[n("q-badge",{attrs:{color:"white","text-color":"black",label:e.milestone.tasks.length}})],1),n("q-item-section",[e._v("\n          "+e._s(e.milestone.name)+"\n        ")])]},proxy:!0}],null,!1,3391804822)},[n("q-card",{attrs:{bordered:""}},[n("q-linear-progress",{attrs:{stripe:"",size:"8px",value:e.progress,color:e.progress<=.3?"red":e.progress<=.6?"blue":"green"}}),n("q-card-section",{staticClass:"q-pa-none q-ma-none q-mt-xs q-mb-sm",attrs:{horizontal:""}},[n("q-card-section",{staticClass:"q-pa-none q-ma-none col-2"},[0!=e.milestone.group?n("q-btn",{staticClass:"q-ml-sm",attrs:{dense:"",size:"10px",color:"blue",icon:"arrow_left",unelevated:""},on:{click:function(t){return e.moveMilestone("left")}}}):e._e()],1),n("q-card-section",{staticClass:"q-pa-none q-ma-none col-8"}),n("q-card-section",{staticClass:"q-pa-none q-ml-lg col-1"},[2!=e.milestone.group?n("q-btn",{attrs:{dense:"",size:"10px",color:"blue","icon-right":"arrow_right",unelevated:""},on:{click:function(t){return e.moveMilestone("right")}}}):e._e()],1)],1),n("q-card-section",{staticClass:"q-pa-none"},[n("q-list",e._l(e.milestone.tasks,(function(t){return n("task",{key:t.id,attrs:{task:t,id:t._id,group:e.milestone.group,milestoneID:e.milestone._id},on:{removeTask:e.removeTaskFromMilestone,refreshMilestone:e.refreshEditedTask}})})),1)],1),n("q-card-section",[n("q-btn",{attrs:{dense:"",size:"10px",round:"",color:"green",icon:"add",unelevated:""},on:{click:function(t){e.showAddTask=!0}}}),n("q-btn",{staticClass:"q-ml-sm",attrs:{dense:"",size:"10px",round:"",color:"blue-grey",unelevated:"",icon:"edit"},on:{click:function(t){e.editMilestoneDialog=!0}}}),n("q-btn",{staticClass:"q-ml-sm",attrs:{dense:"",size:"10px",round:"",color:"red",unelevated:"",icon:"delete"},on:{click:e.promptToDelete}})],1)],1)],1)],1),n("q-dialog",{model:{value:e.showAddTask,callback:function(t){e.showAddTask=t},expression:"showAddTask"}},[n("addtask",{attrs:{milestoneID:e.milestone._id},on:{closeDialog:function(t){e.showAddTask=!1},addNewTask:e.addNewTaskToMilestone}})],1),n("q-dialog",{model:{value:e.editMilestoneDialog,callback:function(t){e.editMilestoneDialog=t},expression:"editMilestoneDialog"}},[n("editmilestone",{attrs:{milestone:e.milestone}})],1)],1):e._e()},s=[],i=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("7f7f"),n("20d6"),n("9523")),r=n.n(i),a=(n("c5f6"),n("2f62"));function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d={data:function(){return{componentKey:0,showAddTask:!1,editMilestoneDialog:!1}},props:{milestone:{type:Object,required:!0},color:{type:String,required:!0}},components:{editmilestone:function(){return n.e(43).then(n.bind(null,"92a2"))},addtask:function(){return n.e(42).then(n.bind(null,"0891"))},task:function(){return Promise.all([n.e(0),n.e(50)]).then(n.bind(null,"1730"))}},computed:{progress:function(){var e=this.milestone.tasks.filter((function(e){return e.completed})).length,t=this.milestone.tasks.length;return 0===t?0:Number((e/t).toFixed(1))}},methods:c(c({},Object(a["b"])("milestones",["deleteMilestone","editMilestone","changeMilestoneGroup"])),{},{promptToDelete:function(e){var t=this;this.$q.dialog({title:"Confirm",message:"Really, delete?",cancel:!0,persistent:!0}).onOk((function(){t.removeMilestone(t.milestone._id)}))},removeMilestone:function(){var e=this;this.deleteMilestone(this.milestone._id).then((function(){e.$root.$emit("fetchMilestones")})).catch((function(e){console.log(e)}))},refreshEditedTask:function(e){var t=[];this.milestone.tasks.forEach((function(n){n._id!=e._id?t.push(n):t.push(e)})),this.milestone.tasks=t,this.componentKey++},addNewTaskToMilestone:function(e){this.milestone.tasks.push(e)},removeTaskFromMilestone:function(e){var t=this.milestone.tasks.findIndex((function(t){return e==t._id}));this.milestone.tasks.splice(t,1),this.componentKey++},moveMilestone:function(e){var t=this,n={milestoneID:this.milestone._id,name:this.milestone.name,group:this.milestone.group};n.group="left"===e?this.milestone.group-1:this.milestone.group+1,this.editMilestone(n).then((function(e){t.$root.$emit("fetchMilestones")})).catch((function(e){console.log(e)}))}}),mounted:function(){var e=this;this.$root.$on("refreshTask",(function(t){e.refreshEditedTask(t)}))}},u=d,m=n("2877"),p=n("eebe"),f=n.n(p),h=n("a370"),g=n("3b73"),b=n("4074"),k=n("58a8"),q=n("f09f"),v=n("6b1d"),w=n("9c40"),y=n("1c1c"),M=n("24e8"),O=Object(m["a"])(u,o,s,!1,null,null,null);t["default"]=O.exports;f()(O,"components",{QCardSection:h["a"],QExpansionItem:g["a"],QItemSection:b["a"],QBadge:k["a"],QCard:q["a"],QLinearProgress:v["a"],QBtn:w["a"],QList:y["a"],QDialog:M["a"]})}}]);