(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,function(t,e,n){t.exports=n.p+"static/media/bomb.78099a3b.png"},function(t,e,n){"use strict";(function(t){var i,a=n(1),o=n.n(a);t&&Object({NODE_ENV:"production",PUBLIC_URL:""}),i=new a.HttpProvider("https://wallet.icon.foundation/api/v3");var r=new o.a(i),c=a.IconBuilder.CallBuilder,s=a.IconBuilder.CallTransactionBuilder,u=a.IconBuilder.IcxTransactionBuilder;e.a={iconService:r,callBuild:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.from,n=t.method,i=t.to,a=t.params,o=void 0===a?{}:a;return(new c).from(e).to(i).method(n).params(o).build()},sendTxBuild:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.from,n=t.to,i=t.method,a=t.params,o=void 0===a?{}:a,r=t.networkId,c=void 0===r?"0x3":r,u=t.stepLimit,d=void 0===u?"0x493e0":u,m=t.value,l=void 0===m?"0x0":m;return{jsonrpc:"2.0",method:"icx_sendTransaction",params:(new s).nid(c).from(e).to(n).stepLimit(d).value(l).timestamp("0x".concat((1e3*(new Date).getTime()).toString(16))).method(i).params(o).version("0x3").build(),id:1}},sendTxBuild2:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.from,n=t.to,i=t.networkId,a=void 0===i?"0x3":i,o=t.stepLimit,r=void 0===o?"0x493e0":o,c=t.value,s=void 0===c?"0x0":c;return{jsonrpc:"2.0",method:"icx_sendTransaction",params:(new u).nid(a).from(e).to(n).stepLimit(r).value(s).timestamp("0x".concat((1e3*(new Date).getTime()).toString(16))).version("0x3").build(),id:1}}}}).call(this,n(3))},function(t,e,n){"use strict";(function(t){e.a={contractAddress:t?"cx997b02ae706cfeea22e3f48c02c3f6dafe6e9a27":"cx7f80ee8c33982f38a5722b4c371ce8a323c45eb9",networkId:t?"0x3":"0x1"}}).call(this,n(3))},,,function(t,e,n){t.exports=n.p+"static/media/boom.1f042630.mp3"},function(t,e,n){t.exports=n.p+"static/media/victory.4f86f5e9.m4a"},function(t,e,n){t.exports=n.p+"static/media/click.8026a539.mp3"},function(t,e,n){t.exports=n(32)},,,,,function(t,e,n){},function(t,e,n){},,function(t,e,n){},,,,function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),o=n(16),r=n.n(o),c=(n(25),n(4)),s=n(5),u=n(7),d=n(6),m=n(8),l=(n(26),n(2)),f=n.n(l),v=n(9),p=n(11),h=n.n(p),y=(n(28),n(17)),g=n.n(y),x=n(18),E=n.n(x),w=n(19),b=n.n(w),C=n(12),S=n.n(C),L={getAddress:function(){return new Promise(function(t){window.addEventListener("ICONEX_RELAY_RESPONSE",function e(n){var i=n.detail,a=i.type,o=i.payload;"RESPONSE_ADDRESS"===a&&t(o),window.removeEventListener("ICONEX_RELAY_RESPONSE",e)}),window.dispatchEvent(new CustomEvent("ICONEX_RELAY_REQUEST",{detail:{type:"REQUEST_ADDRESS"}}))})},sendTransaction:function(t){return new Promise(function(e){window.addEventListener("ICONEX_RELAY_RESPONSE",function t(n){var i=n.detail,a=i.type,o=i.payload;"RESPONSE_JSON-RPC"===a&&e(o.result),window.removeEventListener("ICONEX_RELAY_RESPONSE",t)}),window.dispatchEvent(new CustomEvent("ICONEX_RELAY_REQUEST",{detail:{type:"REQUEST_JSON-RPC",payload:t}}))})}},O=n(1),k=(n(29),n(13)),M=n(14),R=O.IconBuilder.CallTransactionBuilder,D=function(t){function e(t){var n;return Object(c.a)(this,e),(n=Object(u.a)(this,Object(d.a)(e).call(this,t))).config={row:10,column:10,mineCount:15},n.getTxBuild=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.from,n=t.to,i=t.method,a=t.params,o=void 0===a?{}:a,r=t.networkId,c=void 0===r?"0x3":r,s=t.stepLimit,u=void 0===s?"0x13d620":s,d=t.value,m=void 0===d?"0x0":d;return{jsonrpc:"2.0",method:"icx_sendTransaction",params:(new R).nid(c).from(e).to(n).stepLimit(u).value(m).timestamp("0x".concat((1e3*(new Date).getTime()).toString(16))).method(i).params(o).version("0x3").build(),id:1}},n.initState=function(){var t=n.initMakeMineList(n.config.row*n.config.column,n.config.mineCount),e=n.arrToObject(t),i=n.initMainDataList({mineObj:e,row:n.config.row,column:n.config.column}),a=n.updatedMineMainData({mainDataList:i,mineList:t,row:n.config.row,column:n.config.column});return{mineList:t,mineObj:e,mainDataList:n.updatedPositionMainData(a),gameState:"start",victoryCount:0}},n.updatedPositionMainData=function(t){return t.forEach(function(t){t.forEach(function(t){var e=n.getPosition(t.index,n.config.row);t.x=e.x,t.y=e.y})}),t},n.updatedMineMainData=function(t){var e=t.mainDataList,i=t.mineList,a=t.row,o=t.column;return i.forEach(function(t){var i=n.getPosition(t,a);n.getWay8List({x:i.x,y:i.y,maxX:o,maxY:a}).forEach(function(t){var n=e[t.y][t.x];n.mineCount+=1,n.isMine&&(n.mineCount=0)})}),e},n.getPosition=function(t,e){return{x:t%e,y:parseInt(t/e)}},n.getWay8List=function(t){var e=t.x,n=t.y,i=t.maxX,a=t.maxY,o=[];return o.push({x:e-1,y:n-1}),o.push({x:e-1,y:n}),o.push({x:e-1,y:n+1}),o.push({x:e,y:n-1}),o.push({x:e,y:n+1}),o.push({x:e+1,y:n-1}),o.push({x:e+1,y:n}),o.push({x:e+1,y:n+1}),o=o.filter(function(t){return!(t.x<0)&&(!(t.x>=i)&&(!(t.y<0)&&!(t.y>=a)))})},n.initMakeMineList=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=[];n.length<e;){var i=Math.floor(Math.random()*t);-1===n.indexOf(i)&&n.push(i)}return n.sort(function(t,e){return t-e}),n},n.initMainDataList=function(t){for(var e=t.mineObj,i=t.row,a=t.column,o=[],r=0,c=0;c<i;c++){for(var s=[],u=0;u<a;u++){var d=n.initMakeCellData({index:r,mineObj:e});r++,s.push(d)}o.push(s)}return o},n.isMine=function(t,e){return e[t]},n.initMakeCellData=function(t){var e=t.index,i=t.mineObj,a=t.mineCount,o=void 0===a?0:a,r=n.isMine(e,i);return{index:e,isMine:r||!1,mineCount:o,isHide:!0,setMine:!1}},n.checkVictory=function(){var t=n.state.mainDataList,e=!0;t.forEach(function(t){t.forEach(function(t){!0===t.isHide&&(t.isMine&&t.setMine||(e=!1))})}),!0===e&&(n.victoryRef.current.play(),n.setState({gameState:"victory"}))},n.onClickItem=function(t,e){var i=n.state,a=i.mainDataList,o=i.gameState,r=t.currentTarget.getAttribute("data");console.log("num",r);var c=n.getPosition(r,n.config.row),s=a[c.y][c.x];"end"!==o&&"victory"!==o&&(!0===s.setMine?s.setMine=!1:s.isMine?(a.forEach(function(t){t.forEach(function(t){!0===t.isMine&&(t.isHide=!1)})}),n.setState({gameState:"end"}),n.boomRef.current.play()):0!==s.mineCount?(s.isHide=!1,n.clickPlay()):0===s.mineCount&&(n.clickPlay(),n.emptyOpen(s)),n.setState({mainDataList:a},function(){n.checkVictory()}))},n.emptyOpen=function(t){t.isHide=!1;var e=n.state.mainDataList;n.getWay8List({x:t.x,y:t.y,maxX:n.config.column,maxY:n.config.row}).forEach(function(t){var i=e[t.y][t.x];!0===i.isHide&&!1===i.isMine&&0===i.mineCount?n.emptyOpen(i):i.isHide=!1}),n.setState({mainDataList:e})},n.clickPlay=function(){n.clickRef.current.play()},n.setMine=function(t){t.preventDefault();var e=n.state.mainDataList,i=t.currentTarget.getAttribute("data"),a=n.getPosition(i,n.config.row),o=e[a.y][a.x];n.clickPlay(),!0===o.isHide&&(o.setMine=!o.setMine,n.setState({mainDataList:e},function(){n.checkVictory()}))},n.cellText=function(t){if(!1===t.isHide){if(t.isMine)return a.a.createElement("img",{src:S.a,alt:"",style:{width:"100%",height:"100%"}});if(0!==t.mineCount){return a.a.createElement("span",{style:{color:{1:"#4374D9",2:"black",3:"#FF0000",4:"#005766",5:"#005766",6:"#005766",7:"#005766",8:"#005766"}[t.mineCount],fontWeight:"bold"}},t.mineCount)}return""}return!0===t.setMine?a.a.createElement("img",{src:S.a,alt:"",style:{width:"100%",height:"100%"}}):""},n.retry=function(){var t=n.state.victoryCount,e=n.initState();e.victoryCount=t,n.setState(e)},n.save=function(){n.getUserAddress(n.registSave)},n.getUserAddress=function(){var t=Object(v.a)(f.a.mark(function t(e){var n;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,L.getAddress();case 2:n=t.sent,e&&setTimeout(function(){e(n)},1e3);case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),n.registSave=function(){var t=Object(v.a)(f.a.mark(function t(e){var i,a;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("address",e),i=n.getTxBuild({method:"setCount",params:{},from:e,to:M.a.contractAddress}),console.log("txObj",i),t.next=5,L.sendTransaction(i);case 5:a=t.sent,console.log("tx",a),window.open("https://tracker.icon.foundation/transaction/".concat(a)),setTimeout(function(){n.getVictory(e)},3e3);case 9:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),n.getVictory=function(){var t=Object(v.a)(f.a.mark(function t(e){var i;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.a.iconService.call(k.a.callBuild({method:"getCount",params:{},to:M.a.contractAddress,from:e})).execute();case 2:i=t.sent,n.setState({victoryCount:O.IconConverter.toNumber(i)});case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),n.load=function(){n.getUserAddress(n.getVictory)},n.state=n.initState(),n.boomRef=a.a.createRef(),n.victoryRef=a.a.createRef(),n.clickRef=a.a.createRef(),n}return Object(m.a)(e,t),Object(s.a)(e,[{key:"arrToObject",value:function(t){var e={};return t.forEach(function(t){e[t]=!0}),e}},{key:"render",value:function(){var t=this,e=this.state,n=e.mainDataList,i=e.gameState,o=e.victoryCount;return a.a.createElement("div",null,a.a.createElement("div",{style:{marginTop:10,marginBottom:20}},"\uc2b9\ub9ac\uc218 : ",o),a.a.createElement("div",{className:"main-container",onDragStart:function(t){return t.preventDefault(),!1}},n.map(function(e,n){return a.a.createElement("div",{key:n,className:h()("main-row-container")},e.map(function(e,i){var o=n+i;return a.a.createElement("div",{key:i,className:h()("main-row-item",e.isHide?"hide":"open",{"main-row-item-even":o%2===0,"main-row-item-odd":o%2===1}),data:e.index,onClick:function(n){t.onClickItem(n,e)},onContextMenu:t.setMine},t.cellText(e))}))})),a.a.createElement("div",{className:"button-container"},"victory"===i&&a.a.createElement("button",{onClick:this.save},"\ube14\ub85d\uccb4\uc778\uc5d0 \uae30\ub85d\ud558\uae30"),a.a.createElement("button",{onClick:this.retry},"\ub2e4\uc2dc\ud558\uae30"),"victory"!==i&&a.a.createElement("button",{onClick:this.load},"\ube14\ub7ec\uc624\uae30")),a.a.createElement("video",{src:g.a,ref:this.boomRef}),a.a.createElement("video",{src:E.a,ref:this.victoryRef}),a.a.createElement("video",{src:b.a,ref:this.clickRef}))}}]),e}(i.Component),T=function(t){function e(){return Object(c.a)(this,e),Object(u.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return a.a.createElement("div",{className:"main-page-wrapper"},a.a.createElement("div",{className:"page-container_header"},"\uc9c0\ub8b0\ucc3e\uae30"),a.a.createElement("div",{style:{paddingLeft:30,color:"#507e26"}},"\uc2b9\ub9ac\uc2dc \ube14\ub85d\uccb4\uc778\uc5d0 \uae30\ub85d\ud560\uc218\uc788\uc2b5\ub2c8\ub2e4."),a.a.createElement("div",{style:{paddingLeft:30,color:"#507e26"}},"\ubd88\ub7ec\uc624\uae30\ub85c \uba87\uc2b9\ud588\ub294\uc9c0 \ub85c\ub4dc\ud560\uc218\uc788\uc2b5\ub2c8\ub2e4."),a.a.createElement("div",{className:"main-page-container"},a.a.createElement("div",{className:"page-container_content"},a.a.createElement(D,null))))}}]),e}(a.a.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[20,1,2]]]);
//# sourceMappingURL=main.0749d07c.chunk.js.map