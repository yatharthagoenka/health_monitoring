"use strict";(self.webpackChunkvitality=self.webpackChunkvitality||[]).push([[745],{6768:function(t,e,n){n(2791);var i=n(4270),r=n(184);e.Z=function(t){var e=t.title,n=t.description,a=t.children;return(0,r.jsxs)("div",{children:[(0,r.jsxs)(i.q,{children:[(0,r.jsx)("title",{children:e}),(0,r.jsx)("meta",{name:"description",content:n})]}),a]})}},4015:function(t,e,n){var i=n(1413),r=(n(2791),n(6934)),a=n(9981),o=n(184),s=(0,r.ZP)((function(t){return(0,o.jsx)(a.Z,(0,i.Z)({},t))}))((function(t){var e=t.theme;return{"& .MuiOutlinedInput-input::-webkit-input-placeholder":{color:e.palette.text.secondary,opacity:"0.8"},"& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder":{color:e.palette.text.secondary,opacity:"1"},"& .Mui-disabled .MuiOutlinedInput-notchedOutline":{borderColor:e.palette.grey[200]}}}));e.Z=s},5745:function(t,e,n){n.r(e),n.d(e,{default:function(){return k}});var i=n(2791),r=n(1087),a=n(4554),o=n(1889),s=n(7621),l=n(890),c=n(3767),u=n(6768),d=n(4757),h=n(4942),p=n(1413),f=n(9439),x=n(7689),g=n(4015),m=n(6151),Z=n(5671),j=n(3144),b=n(1243),v=new(function(){function t(){(0,Z.Z)(this,t)}return(0,j.Z)(t,[{key:"login",value:function(t,e){return b.Z.post("".concat("http://localhost:3005/")+"auth/login",{username:t,password:e}).then((function(t){return t.data.token&&localStorage.setItem("user",JSON.stringify(t.data)),t.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(t,e,n){return b.Z.post("http://localhost:3005/auth/register",{username:t,email:e,password:n}).then((function(t){return t.data.token&&localStorage.setItem("user",JSON.stringify(t.data)),t.data}))}},{key:"getCurrentUser",value:function(){return JSON.parse(localStorage.getItem("user"))}}]),t}()),y=n(184),w=function(t){var e=t.title,n=t.subtitle,r=t.subtext,o=(0,x.s0)(),s=(0,i.useState)({username:"",password:""}),u=(0,f.Z)(s,2),d=u[0],Z=u[1],j=function(t){var e=t.target,n=e.id,i=e.value;Z((function(t){return(0,p.Z)((0,p.Z)({},t),{},(0,h.Z)({},n,i))}))};return(0,y.jsxs)(y.Fragment,{children:[e?(0,y.jsx)(l.Z,{fontWeight:"700",variant:"h2",mb:1,children:e}):null,r,(0,y.jsxs)(c.Z,{children:[(0,y.jsxs)(a.Z,{children:[(0,y.jsx)(l.Z,{variant:"subtitle1",fontWeight:600,component:"label",htmlFor:"username",mb:"5px",children:"Username"}),(0,y.jsx)(g.Z,{id:"username",variant:"outlined",onChange:j,fullWidth:!0})]}),(0,y.jsxs)(a.Z,{mt:"25px",children:[(0,y.jsx)(l.Z,{variant:"subtitle1",fontWeight:600,component:"label",htmlFor:"password",mb:"5px",children:"Password"}),(0,y.jsx)(g.Z,{id:"password",type:"password",variant:"outlined",onChange:j,fullWidth:!0})]})]}),(0,y.jsx)(a.Z,{mt:3,children:(0,y.jsx)(m.Z,{color:"primary",variant:"contained",size:"large",fullWidth:!0,onClick:function(t){t.preventDefault(),v.login(d.username,d.password).then((function(){o("/user/dashboard"),window.location.reload()}),(function(t){console.log(t)}))},type:"submit",children:"Sign In"})}),n]})},k=function(){return(0,y.jsx)(u.Z,{title:"Login",description:"this is Login page",children:(0,y.jsx)(a.Z,{sx:{position:"relative","&:before":{content:'""',background:"radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",backgroundSize:"400% 400%",animation:"gradient 15s ease infinite",position:"absolute",height:"100%",width:"100%",opacity:"0.3"}},children:(0,y.jsx)(o.ZP,{container:!0,spacing:0,justifyContent:"center",sx:{height:"100vh"},children:(0,y.jsx)(o.ZP,{item:!0,xs:12,sm:12,lg:4,xl:3,display:"flex",justifyContent:"center",alignItems:"center",children:(0,y.jsxs)(s.Z,{elevation:9,sx:{p:4,zIndex:1,width:"100%",maxWidth:"500px"},children:[(0,y.jsx)(a.Z,{display:"flex",alignItems:"center",justifyContent:"center",children:(0,y.jsx)("img",{src:d,height:90})}),(0,y.jsx)(w,{subtext:(0,y.jsx)(l.Z,{variant:"subtitle1",textAlign:"center",color:"textSecondary",mb:3,children:"A real-time health monitoring system"}),subtitle:(0,y.jsxs)(c.Z,{direction:"row",spacing:1,justifyContent:"center",mt:3,children:[(0,y.jsx)(l.Z,{color:"textSecondary",variant:"h6",fontWeight:"500",children:"New to Vitality?"}),(0,y.jsx)(l.Z,{component:r.rU,to:"/auth/register",fontWeight:"500",sx:{textDecoration:"none",color:"primary.main"},children:"Create an account"})]})})]})})})})})}},4757:function(t,e,n){t.exports=n.p+"static/media/vitality_logo.17b5bed0f4ac3610fd11.png"}}]);
//# sourceMappingURL=745.51593c32.chunk.js.map