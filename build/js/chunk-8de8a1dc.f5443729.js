(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8de8a1dc"],{ab96:function(e,t,n){"use strict";n.r(t);var a=n("7a23"),l={class:"menu"};function o(e,t,n,o,i,d){var p=Object(a["resolveComponent"])("page-content"),r=Object(a["resolveComponent"])("page-modal");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",l,[Object(a["createVNode"])(p,{contentTableConfig:e.contentTableConfig,pageName:"menu",onNewBtnClick:e.handleNewData,onEditBtnClick:e.handleEditData},null,8,["contentTableConfig","onNewBtnClick","onEditBtnClick"]),Object(a["createVNode"])(r,{defaultInfo:e.defaultInfo,modalConfig:e.modalConfigComputed,ref:"pageModalRef",pageName:"menu",modelValue:e.typeData,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.typeData=t})},null,8,["defaultInfo","modalConfig","modelValue"])])}var i=n("3835"),d=(n("7db0"),n("d81d"),n("b0c0"),n("159b"),n("0613")),p=n("3573"),r=n("9d1a"),c={title:"菜单列表",propsList:[{prop:"name",label:"菜单名称",minWidth:"100"},{prop:"type",label:"类型",minWidth:"60"},{prop:"url",label:"菜单url",minWidth:"100"},{prop:"icon",label:"菜单icon",minWidth:"100"},{prop:"permission",label:"按钮权限",minWidth:"100"},{prop:"createAt",label:"创建时间",minWidth:"220",slotName:"createAt"},{prop:"updateAt",label:"更新时间",minWidth:"220",slotName:"updateAt"},{label:"操作",minWidth:"120",slotName:"handler"}],showIndexColumn:!1,showSelectColumn:!1,childrenProps:{rowKey:"id",treeProp:{children:"children"}},showFooter:!1},u={title:"新建菜单",formItems:[{field:"name",type:"input",label:"菜单名",placeholder:"请输入菜单名"},{field:"icon",type:"input",label:"图标",placeholder:"请输入图标名"},{field:"type",type:"select",label:"选择菜单层级",placeholder:"请选择菜单层级",options:[{title:"一级菜单",value:1},{title:"二级菜单",value:2},{title:"三级菜单",value:3}]},{field:"url",type:"input",label:"菜单地址",placeholder:"请输入菜单地址"},{field:"parentId",type:"select",label:"选择上级菜单",placeholder:"请选择上级菜单",options:[]},{field:"permission",type:"input",label:"按钮权限",placeholder:"请输入按钮权限"}],colLayout:{span:24},itemStyle:{}},m=n("d8f6"),f=Object(a["defineComponent"])({name:"tl-menu",components:{PageContent:p["a"],PageModal:r["a"]},setup:function(){var e=Object(a["ref"])({}),t=Object(m["a"])(),n=Object(i["a"])(t,4),l=n[0],o=n[1],p=n[2],r=n[3],f=Object(d["c"])(),s=u;return Object(a["watch"])(e,(function(){var t=u.formItems.find((function(e){return"parentId"===e.field}));t.options=[];var n=[];1!==e.value.type&&(t.options=f.state.entireMenu.map((function(t){switch(e.value.type){case 2:return 1===t.type&&{title:t.name,value:t.id};case 3:var a=t.children.map((function(e){return 2===e.type&&{title:e.name,value:e.id}}));a.forEach((function(e){return n.push(e)}));break;default:break}}))),3===e.value.type&&(t.options=n),s=u})),{typeData:e,contentTableConfig:c,modalConfigComputed:s,pageModalRef:l,defaultInfo:o,handleNewData:p,handleEditData:r}}}),s=n("d959"),b=n.n(s);const h=b()(f,[["render",o]]);t["default"]=h},d81d:function(e,t,n){"use strict";var a=n("23e7"),l=n("b727").map,o=n("1dde"),i=o("map");a({target:"Array",proto:!0,forced:!i},{map:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-8de8a1dc.f5443729.js.map