(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{155:function(e,t,a){e.exports=a.p+"static/media/logo.b7a65b42.png"},226:function(e,t,a){e.exports=a(386)},385:function(e,t,a){},386:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(26),i=a.n(o),c=a(97),l=a.n(c),s=a(22),u=a.n(s),m=a(25),p=a(11),d=a(10),h=a(14),g=a(12),f=a(13),b=a(6),v=a.n(b),E=a(147),O=a.n(E),j=a(5),x=a(18),k=a(146),w=a.n(k),C=a(28),y=a.n(C),N=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.data,a=this.props.mangaStatus;if("none"===a)return"";if("waiting"===a)return r.a.createElement(j.q,{className:e.mangaInfo},t);if("error"===a)return r.a.createElement(j.q,{className:e.error},t);if("ok"===a)return r.a.createElement(y.a,{className:e.mangaInfo,container:!0},r.a.createElement(y.a,{item:!0,md:4},r.a.createElement("img",{className:e.mangaImg,src:t.image,alt:t.name})),r.a.createElement(y.a,{item:!0,md:8},r.a.createElement(j.q,{variant:"h6"},t.name),r.a.createElement(j.q,{variant:"subtitle1"},"Number of chapters: ",t.chapterCount),r.a.createElement(j.q,{variant:"subtitle1"},"Is completed: ",t.isCompleted)));throw new Error("Invalid mangaStatus property")}}]),t}(r.a.Component),S=v()(function(){return{mangaImg:{width:150},mangaInfo:{padding:"30px 20px 0 20px"},error:{padding:"30px 20px 0 0",color:"#f00"},mangaName:{color:"#009d8a"}}})(N),R=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(g.a)(t).call(this,e))).onClickOpen=function(){a.setState({open:!0})},a.onClose=function(){a.setState({open:!1})},a.onChangeLink=function(){var e=Object(m.a)(u.a.mark(function e(t){var n,r,o;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""===(n=t.target.value.trim())){e.next=31;break}return a.setState({link:n,mangaStatus:"waiting",manga:"Loading manga info ..."}),"/api/manga/info",r={method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({link:n})},e.prev=5,e.next=8,fetch("/api/manga/info",r);case 8:if(!(o=e.sent).ok){e.next=18;break}return e.t0=a,e.next=13,o.json();case 13:e.t1=e.sent,e.t2={mangaStatus:"ok",manga:e.t1},e.t0.setState.call(e.t0,e.t2),e.next=24;break;case 18:return e.t3=a,e.next=21,o.text();case 21:e.t4=e.sent,e.t5={mangaStatus:"error",manga:e.t4},e.t3.setState.call(e.t3,e.t5);case 24:e.next=29;break;case 26:e.prev=26,e.t6=e.catch(5),a.setState({mangaStatus:"error",manga:"ERROR: Network error "+e.t6});case 29:e.next=32;break;case 31:a.setState({link:n,mangaStatus:"none"});case 32:case"end":return e.stop()}},e,null,[[5,26]])}));return function(t){return e.apply(this,arguments)}}(),a.addManga=Object(m.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state.link,e.prev=1,a.setState({mangaStatus:"waiting",manga:"Adding manga ..."}),e.next=5,a.props.onAddManga(t);case 5:a.setState({open:!1,link:"",mangaStatus:"none"}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),alert("ERROR: "+e.t0);case 11:case"end":return e.stop()}},e,null,[[1,8]])})),a.state={open:!1,link:"",mangaStatus:"none"},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e="";return"ok"===this.state.mangaStatus&&(e=r.a.createElement(j.e,null,r.a.createElement(j.c,{variant:"raised",color:"secondary",onClick:this.addManga},"Add"))),r.a.createElement("div",null,r.a.createElement(w.a,{onClick:this.onClickOpen}),r.a.createElement(j.d,{open:this.state.open,onClose:this.onClose,fullWidth:!0,maxWidth:"sm","aria-labelledby":"add-form-dialog-title"},r.a.createElement(j.g,{id:"add-form-dialog-title"}," Add new manga "),r.a.createElement(j.f,null,r.a.createElement(j.o,{fullWidth:!0,multiline:!0,rows:2,label:"Manga link",onChange:this.onChangeLink,value:this.state.link}),r.a.createElement(S,{mangaStatus:this.state.mangaStatus,data:this.state.manga})),e))}}]),t}(r.a.Component),M=Object(x.a)(function(){return{}})(R),B=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.floatButtonGroup},r.a.createElement(j.h,{onClick:T,size:"small",color:"secondary"},r.a.createElement(O.a,null)),r.a.createElement(j.h,{size:"small",color:"secondary"},r.a.createElement(M,{onAddManga:this.props.onAddManga})))}}]),t}(r.a.Component);function T(){document.querySelector("#page-top").scrollIntoView({behavior:"smooth"})}var I=Object(x.a)(function(){return{floatButtonGroup:{position:"fixed",bottom:30,right:20,display:"flex",flexDirection:"column",height:90,justifyContent:"space-between"}}})(B),L=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(j.q,{className:e.label,variant:"subtitle1"},"Following status"),r.a.createElement(j.j,{value:this.props.following,onChange:this.props.onChange},r.a.createElement(j.i,{value:"toread"},"To read"),r.a.createElement(j.i,{value:"following"},"Following"),r.a.createElement(j.i,{value:"waiting"},"Waiting"),r.a.createElement(j.i,{value:"dropped"},"Dropped"),r.a.createElement(j.i,{value:"finished"},"Finished")))}}]),t}(r.a.Component),D=Object(x.a)(function(){return{root:{display:"flex",alignItems:"flex-end"},label:{paddingRight:15,paddingBottom:3}}})(L),F=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.onChange,a=this.props.sortby;return r.a.createElement("div",{className:e.root},r.a.createElement(j.q,{className:e.label,variant:"subtitle1"},"Sort by"),r.a.createElement(j.j,{value:a,onChange:t,variant:"filled"},r.a.createElement(j.i,{value:"status"},"Status"),r.a.createElement(j.i,{value:"name"},"Name"),r.a.createElement(j.i,{value:"latest"},"Latest"),r.a.createElement(j.i,{value:"many"},"Many to read")))}}]),t}(r.a.Component),A=Object(x.a)(function(){return{root:{display:"flex",alignItems:"flex-end"},label:{paddingRight:15,paddingBottom:3}}})(F),W=a(148),H=a.n(W),_=a(38),q=a.n(_),z=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(g.a)(t).call(this,e))).state={searchTerm:e.searchTerm},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.searchTerm;return r.a.createElement("div",{className:e.search},r.a.createElement("span",{className:e.searchIcon},r.a.createElement(H.a,null)),r.a.createElement(q.a,{className:e.input,placeholder:"Search\u2026",value:t}))}}]),t}(r.a.Component),G=Object(x.a)(function(){return{search:{border:"1px solid #00bea6",borderRadius:5,display:"flex"},searchIcon:{display:"flex",justifyContent:"center",alignItems:"center",paddingLeft:5,paddingRight:5},input:{}}})(z),P=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",null,r.a.createElement("div",{className:e.paddingTop,id:"page-top"}),r.a.createElement("div",{className:e.header},r.a.createElement(D,{following:this.props.following,onChange:this.props.onFollowingChange}),r.a.createElement(A,{sortby:this.props.sortby,onChange:this.props.onSortByChange}),r.a.createElement(G,null)))}}]),t}(r.a.Component),J=Object(x.a)(function(){return{header:{display:"flex",justifyContent:"space-between"},paddingTop:{paddingTop:100}}})(P),$=a(23),V=a.n($),K=a(60),Q=a.n(K),U=a(61),X=a.n(U),Y=a(149),Z=a.n(Y),ee=20,te=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.chapters,a=t.length;if(0===a)return r.a.createElement("div",{className:e.noChap},"No chapter available");for(var n=t.filter(function(e){return e.isRead}).map(function(e){return e._id}),o={name:"-----"},i=0;i<a;i++)if(t[i].isRead){o=t[i];break}for(var c,l=0;l<a-1;l++)if(!t[l].isRead&&t[l+1].isRead){c=t[l];break}void 0!==c||t[a-1].isRead||(c=t[a-1]);var s="";return void 0!==c&&(s=r.a.createElement("div",{className:e.actionBtn,title:"Read "+c.name,onClick:function(){return window.open(c.link,"_blank")}},r.a.createElement(Z.a,null))),r.a.createElement("div",{className:e.noWrap},r.a.createElement(j.j,{multiple:!0,value:n,onChange:this.props.onChangeChapter,renderValue:function(){return r.a.createElement("span",null,(e=o.name).length<=ee?e:e.slice(0,ee)+" ...");var e}},t.map(function(e){return r.a.createElement(j.i,{key:e._id,value:e._id},r.a.createElement(Q.a,{checked:e.isRead}),r.a.createElement(X.a,{primary:r.a.createElement("a",{href:e.link},e.name)}))})),s)}}]),t}(r.a.Component);var ae=Object(x.a)(function(){return{noWrap:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",whiteSpace:"nowrap"},actionBtn:{padding:2,margin:"3px 0px 0px 15px",borderRadius:3,display:"inline-block","&:hover":{cursor:"pointer",background:"#efa230",color:"#fff"}},noChap:{fontSize:"125%",fontStyle:"italic"}}})(te),ne=a(151),re=a.n(ne),oe=a(150),ie=a.n(oe),ce=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.manga,a="";return t.isCompleted||(a=r.a.createElement("div",{className:e.actionBtn,title:"Mark manga as completed",onClick:this.props.onChangeCompleted},r.a.createElement(ie.a,null))),r.a.createElement("div",{className:e.noWrap},r.a.createElement(j.j,{value:t.following,onChange:this.props.onChangeFollowing},r.a.createElement(j.i,{value:"toread"},"toread"),r.a.createElement(j.i,{value:"following"},"following"),r.a.createElement(j.i,{value:"waiting"},"waiting"),r.a.createElement(j.i,{value:"dropped"},"dropped"),r.a.createElement(j.i,{value:"finished"},"finished")),r.a.createElement("div",null,a,r.a.createElement("div",{className:e.actionBtn,title:"Delete manga",onClick:this.props.deleteManga},r.a.createElement(re.a,null))))}}]),t}(r.a.Component),le=Object(x.a)(function(){return{noWrap:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",whiteSpace:"nowrap"},actionBtn:{padding:2,margin:"3px 0px 0px 15px",borderRadius:3,display:"inline-block","&:hover":{cursor:"pointer",background:"#efa230",color:"#fff"}}}})(ce),se=a(59),ue=a.n(se),me=a(153),pe=a.n(me),de=a(154),he=a.n(de),ge=a(152),fe=a.n(ge),be=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(g.a)(t).call(this,e))).onNoteEdited=function(e){a.setState({note:e.target.value})},a.editNoteClicked=function(){a.setState({note:a.props.mangaNote})},a.cancelEditNote=function(){a.setState({note:null})},a.saveNote=function(){a.props.saveNote(a.state.note),a.setState({note:null})},a.state={note:null},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.mangaNote,a=this.state.note;return null==a?r.a.createElement("div",null,r.a.createElement("div",null,""===t?r.a.createElement("i",null,"Nothing to show"):t),r.a.createElement("div",{className:e.noteBtnGroup,onClick:this.editNoteClicked},r.a.createElement(fe.a,{className:e.actionBtn,fontSize:"small",titleAccess:"Edit"}))):r.a.createElement("div",null,r.a.createElement(ue.a,{fullWidth:!0,value:a,onChange:this.onNoteEdited}),r.a.createElement("div",{className:e.noteBtnGroup},r.a.createElement(pe.a,{className:e.actionBtn,titleAccess:"Save",onClick:this.saveNote}),r.a.createElement(he.a,{className:e.actionBtn,titleAccess:"Cancel",onClick:this.cancelEditNote})))}}]),t}(r.a.Component),ve=Object(x.a)(function(){return{actionBtn:{padding:2,margin:"3px 0px 0px 15px",borderRadius:3,display:"inline-block","&:hover":{cursor:"pointer",background:"#efa230",color:"#fff"}},noteBtnGroup:{display:"flex",justifyContent:"flex-end",margin:"10px 0 15px 0"}}})(be);var Ee={"Hoc vien truyen tranh":/^https?:\/\/hocvientruyentranh\.net\/truyen\/[0-9]+\/.*$/,Mangakakalot:/^https?:\/\/mangakakalot\.com\/manga\/[a-z0-9]+$/,Mangarock:/^https?:\/\/mangarock\.com\/manga\/mrs-serie-[0-9]+$/,Nettruyen:/^https?:\/\/www\.nettruyen\.com\/truyen-tranh\/.+$/};var Oe={getMangaStatus:function(e){var t=e.chapters.every(function(e){return e.isRead});return e.isCompleted?t?"Finished":"Many to read":t?"Last chap reached":"New chap"},mangaStatuses:["New chap","Many to read","Last chap reached","Finished"],getMangaSource:function(e){for(var t in Ee)if(e.match(Ee[t]))return t;return null}},je=function(e){function t(){return Object(p.a)(this,t),Object(h.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props.manga,a=Oe.getMangaSource(t.link);return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("a",{className:e.mangaName,href:t.link},t.name)),r.a.createElement(y.a,{container:!0,className:e.mangaDetails},r.a.createElement(y.a,{item:!0,xs:4,className:e.infoHeader},"Source"),r.a.createElement(y.a,{item:!0,xs:8},a),r.a.createElement(y.a,{item:!0,xs:4,className:e.infoHeader},"Total chapters"),r.a.createElement(y.a,{item:!0,xs:8},t.chapters.length)))}}]),t}(r.a.Component),xe=Object(x.a)(function(){return{infoHeader:{fontWeight:550,whiteSpace:"nowrap"},mangaName:{color:"#525252",fontSize:"130%",fontWeight:900,textDecoration:"none","&:hover":{textDecoration:"underline",color:"#000"}},mangaDetails:{marginTop:20}}})(je),ke=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(g.a)(t).call(this,e))).onChangeChapter=function(){var e=Object(m.a)(u.a.mark(function e(t){var n,r,o,i,c,l,s,m,p,d;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.state.manga,r=a.state.manga.chapters,o=t.target.value,i=r.filter(function(e){return e.isRead}).map(function(e){return e._id}),o.length>i.length?(c=o.filter(function(e){return-1===i.indexOf(e)})[0],l="read"):(c=i.filter(function(e){return-1===o.indexOf(e)})[0],l="unread"),e.prev=5,s="/api/chapter/".concat(l,"/").concat(c),m={method:"POST",credentials:"same-origin"},e.next=10,fetch(s,m);case 10:if((p=e.sent).ok){e.next=17;break}return e.next=14,p.text();case 14:return d=e.sent,alert("ERROR: "+d),e.abrupt("return");case 17:e.next=23;break;case 19:return e.prev=19,e.t0=e.catch(5),alert("ERROR: Cannot load data. Check your Internet connection."),e.abrupt("return");case 23:r.forEach(function(e){return e.isRead=-1!==o.indexOf(e._id)}),a.setState({manga:n});case 25:case"end":return e.stop()}},e,null,[[5,19]])}));return function(t){return e.apply(this,arguments)}}(),a.saveNote=function(){var e=Object(m.a)(u.a.mark(function e(t){var n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.state.manga,e.prev=1,e.next=4,a.props.onEditManga(n._id,{note:t});case 4:n.note=t,a.setState({manga:n,note:null}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),alert("ERROR: "+e.t0);case 11:case"end":return e.stop()}},e,null,[[1,8]])}));return function(t){return e.apply(this,arguments)}}(),a.deleteManga=function(){window.confirm("Are you sure to delete this manga?")&&a.props.onDeleteManga(a.state.manga._id)},a.onChangeCompleted=Object(m.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.state.manga,e.prev=1,e.next=4,a.props.onEditManga(t._id,{isCompleted:!0});case 4:t.isCompleted=!0,a.setState({manga:t}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),alert("ERROR: "+e.t0);case 11:case"end":return e.stop()}},e,null,[[1,8]])})),a.onChangeFollowing=function(){var e=Object(m.a)(u.a.mark(function e(t){var n,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.state.manga,r=t.target.value,e.prev=2,e.next=5,a.props.onEditManga(n._id,{following:r});case 5:n.following=r,a.setState({manga:n}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),alert("ERROR: "+e.t0);case 12:case"end":return e.stop()}},e,null,[[2,9]])}));return function(t){return e.apply(this,arguments)}}(),a.state={manga:e.manga,note:null},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.manga,a=t.chapters,n=Oe.getMangaStatus(t),o={Finished:e.F,"Many to read":e.MTR,"Last chap reached":e.LCR,"New chap":e.NC}[n],i=a.filter(function(e){return!e.isRead}).length;return r.a.createElement(j.n,null,r.a.createElement(V.a,null,r.a.createElement(j.b,{badgeContent:i,color:"error",max:10},r.a.createElement("div",{className:[o,e.mangaStatus].join(" ")},n))),r.a.createElement(V.a,null,r.a.createElement("div",{className:e.mangaImg},r.a.createElement("img",{src:t.image,alt:"img",className:e.mangaImg}))),r.a.createElement(V.a,null,r.a.createElement(xe,{manga:t})),r.a.createElement(V.a,null,r.a.createElement(ae,{chapters:a,onChangeChapter:this.onChangeChapter})),r.a.createElement(V.a,null,r.a.createElement(le,{manga:t,onChangeCompleted:this.onChangeCompleted,onChangeFollowing:this.onChangeFollowing,deleteManga:this.deleteManga})),r.a.createElement(V.a,null,r.a.createElement(ve,{mangaNote:t.note,saveNote:this.saveNote})))}}]),t}(r.a.Component),we=Object(x.a)(function(){return{F:{color:"#999999"},MTR:{color:"#efa230"},LCR:{color:"rgba(37,68,111,0.95)"},NC:{color:"#07853a"},mangaStatus:{margin:"5px 12px",fontWeight:900,fontSize:"120%",textTransform:"capitalize"},mangaImg:{width:100,minHeight:100}}})(ke),Ce=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(g.a)(t).call(this,e))).fetchManga=Object(m.a)(u.a.mark(function e(){var t,n,r,o,i;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.props.following,n="/api/manga?following="+t,r={method:"GET",credentials:"same-origin"},e.next=5,fetch(n,r);case 5:if(!(o=e.sent).ok){e.next=13;break}return e.next=9,o.json();case 9:return i=e.sent,a.props.sortMethod(i),a.setState({data:i}),e.abrupt("return");case 13:return e.next=15,o.text();case 15:throw e.sent;case 16:case"end":return e.stop()}},e)})),a.onEditManga=function(){var e=Object(m.a)(u.a.mark(function e(t,n){var r,o,i,c;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r="/api/manga/edit/".concat(t),o={method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)},e.next=4,fetch(r,o);case 4:if((i=e.sent).ok){e.next=9;break}return e.next=8,i.text();case 8:throw e.sent;case 9:c=a.state.data,n.hasOwnProperty("following")&&(c=c.filter(function(e){return e._id!==t||e.following===n.following})),a.setState({data:c});case 12:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),a.onDeleteManga=function(){var e=Object(m.a)(u.a.mark(function e(t){var n,r,o,i,c;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n="/api/manga/delete/".concat(t),r={method:"POST",credentials:"same-origin"},e.next=5,fetch(n,r);case 5:if((o=e.sent).ok){e.next=12;break}return e.next=9,o.text();case 9:return i=e.sent,alert("ERROR: "+i),e.abrupt("return");case 12:c=a.state.data.filter(function(e){return e._id!==t}),a.setState({data:c}),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),alert("ERROR: Network error "+e.t0);case 19:case"end":return e.stop()}},e,null,[[0,16]])}));return function(t){return e.apply(this,arguments)}}(),a.state={data:[]},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.fetchManga(this.props.following).catch(alert)}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state.data,n=r.a.createElement(j.n,null,r.a.createElement(V.a,{colSpan:6},r.a.createElement(j.q,null,"Nothing to show")));return a.length>0&&(n=a.map(function(t){return r.a.createElement(we,{manga:t,key:t._id,onEditManga:e.onEditManga,onDeleteManga:e.onDeleteManga})})),r.a.createElement(j.k,{className:t.table},r.a.createElement(j.m,null,r.a.createElement(j.n,{className:t.tableHeader},r.a.createElement(V.a,{className:t.tableHeaderCell}," Status "),r.a.createElement(V.a,{className:t.tableHeaderCell,colSpan:2}," Name "),r.a.createElement(V.a,{className:t.tableHeaderCell}," Chapters "),r.a.createElement(V.a,{className:t.tableHeaderCell}," Action "),r.a.createElement(V.a,{className:t.tableHeaderCell}," Note "))),r.a.createElement(j.l,null,n))}}]),t}(r.a.Component),ye=v()(function(){return{table:{marginTop:45},tableHeader:{background:"#00bea6","&:hover":{background:"#00bea6"}},tableHeaderCell:{fontSize:"110%",fontWeight:800,color:"rgba(51,51,51,0.89)"}}})(Ce),Ne=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(g.a)(t).call(this,e))).onFollowingChange=function(e){a.setState({following:e.target.value})},a.onSortByChange=function(e){a.setState({sortby:e.target.value})},a.onAddManga=function(){var e=Object(m.a)(u.a.mark(function e(t){var n,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"/api/manga/add",n={method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({link:t})},e.next=4,fetch("/api/manga/add",n);case 4:if(!(r=e.sent).ok){e.next=9;break}a.setState({following:"following"}),e.next=12;break;case 9:return e.next=11,r.text();case 11:throw e.sent;case 12:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={sortby:"status",following:"following"},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.following,a=this.state.sortby,n={status:Se,name:Re,latest:Me,many:Be}[a];return r.a.createElement("div",{className:e.content},r.a.createElement(J,{sortby:a,following:t,onFollowingChange:this.onFollowingChange,onSortByChange:this.onSortByChange}),r.a.createElement(ye,{sortMethod:n,following:this.state.following,key:new Date}),r.a.createElement(I,{onAddManga:this.onAddManga}))}}]),t}(r.a.Component);function Se(e){e.sort(function(e,t){return(e=Oe.mangaStatuses.indexOf(Oe.getMangaStatus(e)))>(t=Oe.mangaStatuses.indexOf(Oe.getMangaStatus(t)))?1:e<t?-1:0})}function Re(e){e.sort(function(e,t){return(e=e.name.toLowerCase().trim())>(t=t.name.toLowerCase().trim())?1:e<t?-1:0})}function Me(e){var t=function(e){for(var t=new Date("2000-01-01"),a=0;a<e.chapters.length;a++){var n=new Date(e.chapters[a].createAt);n>t&&(t=n)}return t};e.sort(function(e,a){return(e=t(e))>(a=t(a))?-1:e<a?1:0})}function Be(e){e.sort(function(e,t){return(e=e.chapters.filter(function(e){return!e.isRead}).length)>(t=t.chapters.filter(function(e){return!e.isRead}).length)?-1:e<t?1:0})}var Te=v()(function(){return{content:{paddingLeft:24,paddingRight:24},header:{display:"flex",justifyContent:"space-between"}}})(Ne);var Ie=Object(x.a)(function(){return{grow:{flexGrow:1}}})(function(e){return r.a.createElement("span",{className:e.classes.grow})}),Le=a(155),De=a.n(Le),Fe=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(h.a)(this,Object(g.a)(t).call(this,e))).state={username:e.username},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.state.username;return r.a.createElement("div",null,r.a.createElement(j.a,{color:"primary",position:"fixed"},r.a.createElement(j.p,null,r.a.createElement("img",{className:e.logo,src:De.a,alt:"MangaBookmark"}),r.a.createElement(Ie,null),r.a.createElement(j.q,{className:e.navBarText},"Hello, ",t),r.a.createElement(j.q,{className:e.navBarText},r.a.createElement("a",{href:"/auth/logout",className:e.navBarLink},"Logout")))))}}]),t}(r.a.Component),Ae=Object(x.a)(function(){return{logo:{marginTop:5,marginBottom:5,width:190},navBarText:{color:"#555",fontWeight:800,textTransform:"uppercase",paddingRight:0,paddingLeft:15},navBarLink:{color:"#555",textDecoration:"none","&:hover":{textDecoration:"underline",color:"#000",fontWeight:"bold"}}}})(Fe),We=a(50),He=a.n(We)()({typography:{useNextVariants:!0},palette:{primary:{main:"#00bea6"},secondary:{main:"#efa230"}},overrides:{MuiTableCell:{head:{paddingRight:25,paddingLeft:15},body:{paddingRight:25,paddingLeft:15}},MuiTableRow:{root:{"&:hover":{background:"rgba(240,240,240,0.47)"}}},MuiInputBase:{root:{}}}});var _e=function(){return r.a.createElement(l.a,{theme:He},r.a.createElement(Ae,{username:"hung"}),r.a.createElement(Te,null))};a(385);i.a.render(r.a.createElement(_e,null),document.getElementById("root"))}},[[226,1,2]]]);
//# sourceMappingURL=main.95a53a7a.chunk.js.map