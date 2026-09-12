(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();var De="top",qe="bottom",He="right",ke="left",To="auto",kr=[De,qe,He,ke],Dn="start",_r="end",Ud="clippingParents",Ic="viewport",ir="popper",Fd="reference",Wa=kr.reduce(function(n,e){return n.concat([e+"-"+Dn,e+"-"+_r])},[]),bc=[].concat(kr,[To]).reduce(function(n,e){return n.concat([e,e+"-"+Dn,e+"-"+_r])},[]),$d="beforeRead",Bd="read",jd="afterRead",qd="beforeMain",Hd="main",Wd="afterMain",Kd="beforeWrite",zd="write",Gd="afterWrite",Yd=[$d,Bd,jd,qd,Hd,Wd,Kd,zd,Gd];function pt(n){return n?(n.nodeName||"").toLowerCase():null}function We(n){if(n==null)return window;if(n.toString()!=="[object Window]"){var e=n.ownerDocument;return e&&e.defaultView||window}return n}function kn(n){var e=We(n).Element;return n instanceof e||n instanceof Element}function ze(n){var e=We(n).HTMLElement;return n instanceof e||n instanceof HTMLElement}function Rc(n){if(typeof ShadowRoot>"u")return!1;var e=We(n).ShadowRoot;return n instanceof e||n instanceof ShadowRoot}function c_(n){var e=n.state;Object.keys(e.elements).forEach(function(t){var r=e.styles[t]||{},s=e.attributes[t]||{},i=e.elements[t];!ze(i)||!pt(i)||(Object.assign(i.style,r),Object.keys(s).forEach(function(a){var c=s[a];c===!1?i.removeAttribute(a):i.setAttribute(a,c===!0?"":c)}))})}function l_(n){var e=n.state,t={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,t.popper),e.styles=t,e.elements.arrow&&Object.assign(e.elements.arrow.style,t.arrow),function(){Object.keys(e.elements).forEach(function(r){var s=e.elements[r],i=e.attributes[r]||{},a=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:t[r]),c=a.reduce(function(l,h){return l[h]="",l},{});!ze(s)||!pt(s)||(Object.assign(s.style,c),Object.keys(i).forEach(function(l){s.removeAttribute(l)}))})}}const Qd={name:"applyStyles",enabled:!0,phase:"write",fn:c_,effect:l_,requires:["computeStyles"]};function ct(n){return n.split("-")[0]}var Cn=Math.max,eo=Math.min,yr=Math.round;function Ka(){var n=navigator.userAgentData;return n!=null&&n.brands&&Array.isArray(n.brands)?n.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function Xd(){return!/^((?!chrome|android).)*safari/i.test(Ka())}function Er(n,e,t){e===void 0&&(e=!1),t===void 0&&(t=!1);var r=n.getBoundingClientRect(),s=1,i=1;e&&ze(n)&&(s=n.offsetWidth>0&&yr(r.width)/n.offsetWidth||1,i=n.offsetHeight>0&&yr(r.height)/n.offsetHeight||1);var a=kn(n)?We(n):window,c=a.visualViewport,l=!Xd()&&t,h=(r.left+(l&&c?c.offsetLeft:0))/s,f=(r.top+(l&&c?c.offsetTop:0))/i,g=r.width/s,E=r.height/i;return{width:g,height:E,top:f,right:h+g,bottom:f+E,left:h,x:h,y:f}}function Sc(n){var e=Er(n),t=n.offsetWidth,r=n.offsetHeight;return Math.abs(e.width-t)<=1&&(t=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:n.offsetLeft,y:n.offsetTop,width:t,height:r}}function Jd(n,e){var t=e.getRootNode&&e.getRootNode();if(n.contains(e))return!0;if(t&&Rc(t)){var r=e;do{if(r&&n.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Pt(n){return We(n).getComputedStyle(n)}function u_(n){return["table","td","th"].indexOf(pt(n))>=0}function ln(n){return((kn(n)?n.ownerDocument:n.document)||window.document).documentElement}function wo(n){return pt(n)==="html"?n:n.assignedSlot||n.parentNode||(Rc(n)?n.host:null)||ln(n)}function ku(n){return!ze(n)||Pt(n).position==="fixed"?null:n.offsetParent}function h_(n){var e=/firefox/i.test(Ka()),t=/Trident/i.test(Ka());if(t&&ze(n)){var r=Pt(n);if(r.position==="fixed")return null}var s=wo(n);for(Rc(s)&&(s=s.host);ze(s)&&["html","body"].indexOf(pt(s))<0;){var i=Pt(s);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||e&&i.willChange==="filter"||e&&i.filter&&i.filter!=="none")return s;s=s.parentNode}return null}function Fs(n){for(var e=We(n),t=ku(n);t&&u_(t)&&Pt(t).position==="static";)t=ku(t);return t&&(pt(t)==="html"||pt(t)==="body"&&Pt(t).position==="static")?e:t||h_(n)||e}function Cc(n){return["top","bottom"].indexOf(n)>=0?"x":"y"}function Es(n,e,t){return Cn(n,eo(e,t))}function d_(n,e,t){var r=Es(n,e,t);return r>t?t:r}function Zd(){return{top:0,right:0,bottom:0,left:0}}function ef(n){return Object.assign({},Zd(),n)}function tf(n,e){return e.reduce(function(t,r){return t[r]=n,t},{})}var f_=function(e,t){return e=typeof e=="function"?e(Object.assign({},t.rects,{placement:t.placement})):e,ef(typeof e!="number"?e:tf(e,kr))};function p_(n){var e,t=n.state,r=n.name,s=n.options,i=t.elements.arrow,a=t.modifiersData.popperOffsets,c=ct(t.placement),l=Cc(c),h=[ke,He].indexOf(c)>=0,f=h?"height":"width";if(!(!i||!a)){var g=f_(s.padding,t),E=Sc(i),I=l==="y"?De:ke,C=l==="y"?qe:He,O=t.rects.reference[f]+t.rects.reference[l]-a[l]-t.rects.popper[f],S=a[l]-t.rects.reference[l],M=Fs(i),F=M?l==="y"?M.clientHeight||0:M.clientWidth||0:0,x=O/2-S/2,L=g[I],H=F-E[f]-g[C],$=F/2-E[f]/2+x,T=Es(L,$,H),m=l;t.modifiersData[r]=(e={},e[m]=T,e.centerOffset=T-$,e)}}function m_(n){var e=n.state,t=n.options,r=t.element,s=r===void 0?"[data-popper-arrow]":r;s!=null&&(typeof s=="string"&&(s=e.elements.popper.querySelector(s),!s)||Jd(e.elements.popper,s)&&(e.elements.arrow=s))}const nf={name:"arrow",enabled:!0,phase:"main",fn:p_,effect:m_,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function vr(n){return n.split("-")[1]}var g_={top:"auto",right:"auto",bottom:"auto",left:"auto"};function __(n,e){var t=n.x,r=n.y,s=e.devicePixelRatio||1;return{x:yr(t*s)/s||0,y:yr(r*s)/s||0}}function Lu(n){var e,t=n.popper,r=n.popperRect,s=n.placement,i=n.variation,a=n.offsets,c=n.position,l=n.gpuAcceleration,h=n.adaptive,f=n.roundOffsets,g=n.isFixed,E=a.x,I=E===void 0?0:E,C=a.y,O=C===void 0?0:C,S=typeof f=="function"?f({x:I,y:O}):{x:I,y:O};I=S.x,O=S.y;var M=a.hasOwnProperty("x"),F=a.hasOwnProperty("y"),x=ke,L=De,H=window;if(h){var $=Fs(t),T="clientHeight",m="clientWidth";if($===We(t)&&($=ln(t),Pt($).position!=="static"&&c==="absolute"&&(T="scrollHeight",m="scrollWidth")),$=$,s===De||(s===ke||s===He)&&i===_r){L=qe;var _=g&&$===H&&H.visualViewport?H.visualViewport.height:$[T];O-=_-r.height,O*=l?1:-1}if(s===ke||(s===De||s===qe)&&i===_r){x=He;var v=g&&$===H&&H.visualViewport?H.visualViewport.width:$[m];I-=v-r.width,I*=l?1:-1}}var w=Object.assign({position:c},h&&g_),A=f===!0?__({x:I,y:O},We(t)):{x:I,y:O};if(I=A.x,O=A.y,l){var y;return Object.assign({},w,(y={},y[L]=F?"0":"",y[x]=M?"0":"",y.transform=(H.devicePixelRatio||1)<=1?"translate("+I+"px, "+O+"px)":"translate3d("+I+"px, "+O+"px, 0)",y))}return Object.assign({},w,(e={},e[L]=F?O+"px":"",e[x]=M?I+"px":"",e.transform="",e))}function y_(n){var e=n.state,t=n.options,r=t.gpuAcceleration,s=r===void 0?!0:r,i=t.adaptive,a=i===void 0?!0:i,c=t.roundOffsets,l=c===void 0?!0:c,h={placement:ct(e.placement),variation:vr(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:s,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,Lu(Object.assign({},h,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:a,roundOffsets:l})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,Lu(Object.assign({},h,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const rf={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:y_,data:{}};var Ci={passive:!0};function E_(n){var e=n.state,t=n.instance,r=n.options,s=r.scroll,i=s===void 0?!0:s,a=r.resize,c=a===void 0?!0:a,l=We(e.elements.popper),h=[].concat(e.scrollParents.reference,e.scrollParents.popper);return i&&h.forEach(function(f){f.addEventListener("scroll",t.update,Ci)}),c&&l.addEventListener("resize",t.update,Ci),function(){i&&h.forEach(function(f){f.removeEventListener("scroll",t.update,Ci)}),c&&l.removeEventListener("resize",t.update,Ci)}}const sf={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:E_,data:{}};var v_={left:"right",right:"left",bottom:"top",top:"bottom"};function ji(n){return n.replace(/left|right|bottom|top/g,function(e){return v_[e]})}var T_={start:"end",end:"start"};function Vu(n){return n.replace(/start|end/g,function(e){return T_[e]})}function Pc(n){var e=We(n),t=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:t,scrollTop:r}}function Oc(n){return Er(ln(n)).left+Pc(n).scrollLeft}function w_(n,e){var t=We(n),r=ln(n),s=t.visualViewport,i=r.clientWidth,a=r.clientHeight,c=0,l=0;if(s){i=s.width,a=s.height;var h=Xd();(h||!h&&e==="fixed")&&(c=s.offsetLeft,l=s.offsetTop)}return{width:i,height:a,x:c+Oc(n),y:l}}function A_(n){var e,t=ln(n),r=Pc(n),s=(e=n.ownerDocument)==null?void 0:e.body,i=Cn(t.scrollWidth,t.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),a=Cn(t.scrollHeight,t.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0),c=-r.scrollLeft+Oc(n),l=-r.scrollTop;return Pt(s||t).direction==="rtl"&&(c+=Cn(t.clientWidth,s?s.clientWidth:0)-i),{width:i,height:a,x:c,y:l}}function Nc(n){var e=Pt(n),t=e.overflow,r=e.overflowX,s=e.overflowY;return/auto|scroll|overlay|hidden/.test(t+s+r)}function of(n){return["html","body","#document"].indexOf(pt(n))>=0?n.ownerDocument.body:ze(n)&&Nc(n)?n:of(wo(n))}function vs(n,e){var t;e===void 0&&(e=[]);var r=of(n),s=r===((t=n.ownerDocument)==null?void 0:t.body),i=We(r),a=s?[i].concat(i.visualViewport||[],Nc(r)?r:[]):r,c=e.concat(a);return s?c:c.concat(vs(wo(a)))}function za(n){return Object.assign({},n,{left:n.x,top:n.y,right:n.x+n.width,bottom:n.y+n.height})}function I_(n,e){var t=Er(n,!1,e==="fixed");return t.top=t.top+n.clientTop,t.left=t.left+n.clientLeft,t.bottom=t.top+n.clientHeight,t.right=t.left+n.clientWidth,t.width=n.clientWidth,t.height=n.clientHeight,t.x=t.left,t.y=t.top,t}function Mu(n,e,t){return e===Ic?za(w_(n,t)):kn(e)?I_(e,t):za(A_(ln(n)))}function b_(n){var e=vs(wo(n)),t=["absolute","fixed"].indexOf(Pt(n).position)>=0,r=t&&ze(n)?Fs(n):n;return kn(r)?e.filter(function(s){return kn(s)&&Jd(s,r)&&pt(s)!=="body"}):[]}function R_(n,e,t,r){var s=e==="clippingParents"?b_(n):[].concat(e),i=[].concat(s,[t]),a=i[0],c=i.reduce(function(l,h){var f=Mu(n,h,r);return l.top=Cn(f.top,l.top),l.right=eo(f.right,l.right),l.bottom=eo(f.bottom,l.bottom),l.left=Cn(f.left,l.left),l},Mu(n,a,r));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function af(n){var e=n.reference,t=n.element,r=n.placement,s=r?ct(r):null,i=r?vr(r):null,a=e.x+e.width/2-t.width/2,c=e.y+e.height/2-t.height/2,l;switch(s){case De:l={x:a,y:e.y-t.height};break;case qe:l={x:a,y:e.y+e.height};break;case He:l={x:e.x+e.width,y:c};break;case ke:l={x:e.x-t.width,y:c};break;default:l={x:e.x,y:e.y}}var h=s?Cc(s):null;if(h!=null){var f=h==="y"?"height":"width";switch(i){case Dn:l[h]=l[h]-(e[f]/2-t[f]/2);break;case _r:l[h]=l[h]+(e[f]/2-t[f]/2);break}}return l}function Tr(n,e){e===void 0&&(e={});var t=e,r=t.placement,s=r===void 0?n.placement:r,i=t.strategy,a=i===void 0?n.strategy:i,c=t.boundary,l=c===void 0?Ud:c,h=t.rootBoundary,f=h===void 0?Ic:h,g=t.elementContext,E=g===void 0?ir:g,I=t.altBoundary,C=I===void 0?!1:I,O=t.padding,S=O===void 0?0:O,M=ef(typeof S!="number"?S:tf(S,kr)),F=E===ir?Fd:ir,x=n.rects.popper,L=n.elements[C?F:E],H=R_(kn(L)?L:L.contextElement||ln(n.elements.popper),l,f,a),$=Er(n.elements.reference),T=af({reference:$,element:x,placement:s}),m=za(Object.assign({},x,T)),_=E===ir?m:$,v={top:H.top-_.top+M.top,bottom:_.bottom-H.bottom+M.bottom,left:H.left-_.left+M.left,right:_.right-H.right+M.right},w=n.modifiersData.offset;if(E===ir&&w){var A=w[s];Object.keys(v).forEach(function(y){var ge=[He,qe].indexOf(y)>=0?1:-1,Fe=[De,qe].indexOf(y)>=0?"y":"x";v[y]+=A[Fe]*ge})}return v}function S_(n,e){e===void 0&&(e={});var t=e,r=t.placement,s=t.boundary,i=t.rootBoundary,a=t.padding,c=t.flipVariations,l=t.allowedAutoPlacements,h=l===void 0?bc:l,f=vr(r),g=f?c?Wa:Wa.filter(function(C){return vr(C)===f}):kr,E=g.filter(function(C){return h.indexOf(C)>=0});E.length===0&&(E=g);var I=E.reduce(function(C,O){return C[O]=Tr(n,{placement:O,boundary:s,rootBoundary:i,padding:a})[ct(O)],C},{});return Object.keys(I).sort(function(C,O){return I[C]-I[O]})}function C_(n){if(ct(n)===To)return[];var e=ji(n);return[Vu(n),e,Vu(e)]}function P_(n){var e=n.state,t=n.options,r=n.name;if(!e.modifiersData[r]._skip){for(var s=t.mainAxis,i=s===void 0?!0:s,a=t.altAxis,c=a===void 0?!0:a,l=t.fallbackPlacements,h=t.padding,f=t.boundary,g=t.rootBoundary,E=t.altBoundary,I=t.flipVariations,C=I===void 0?!0:I,O=t.allowedAutoPlacements,S=e.options.placement,M=ct(S),F=M===S,x=l||(F||!C?[ji(S)]:C_(S)),L=[S].concat(x).reduce(function(Ut,Ve){return Ut.concat(ct(Ve)===To?S_(e,{placement:Ve,boundary:f,rootBoundary:g,padding:h,flipVariations:C,allowedAutoPlacements:O}):Ve)},[]),H=e.rects.reference,$=e.rects.popper,T=new Map,m=!0,_=L[0],v=0;v<L.length;v++){var w=L[v],A=ct(w),y=vr(w)===Dn,ge=[De,qe].indexOf(A)>=0,Fe=ge?"width":"height",Pe=Tr(e,{placement:w,boundary:f,rootBoundary:g,altBoundary:E,padding:h}),_e=ge?y?He:ke:y?qe:De;H[Fe]>$[Fe]&&(_e=ji(_e));var ot=ji(_e),Xe=[];if(i&&Xe.push(Pe[A]<=0),c&&Xe.push(Pe[_e]<=0,Pe[ot]<=0),Xe.every(function(Ut){return Ut})){_=w,m=!1;break}T.set(w,Xe)}if(m)for(var pn=C?3:1,qr=function(Ve){var mn=L.find(function(_t){var yt=T.get(_t);if(yt)return yt.slice(0,Ve).every(function(Hr){return Hr})});if(mn)return _=mn,"break"},Le=pn;Le>0;Le--){var ce=qr(Le);if(ce==="break")break}e.placement!==_&&(e.modifiersData[r]._skip=!0,e.placement=_,e.reset=!0)}}const cf={name:"flip",enabled:!0,phase:"main",fn:P_,requiresIfExists:["offset"],data:{_skip:!1}};function xu(n,e,t){return t===void 0&&(t={x:0,y:0}),{top:n.top-e.height-t.y,right:n.right-e.width+t.x,bottom:n.bottom-e.height+t.y,left:n.left-e.width-t.x}}function Uu(n){return[De,He,qe,ke].some(function(e){return n[e]>=0})}function O_(n){var e=n.state,t=n.name,r=e.rects.reference,s=e.rects.popper,i=e.modifiersData.preventOverflow,a=Tr(e,{elementContext:"reference"}),c=Tr(e,{altBoundary:!0}),l=xu(a,r),h=xu(c,s,i),f=Uu(l),g=Uu(h);e.modifiersData[t]={referenceClippingOffsets:l,popperEscapeOffsets:h,isReferenceHidden:f,hasPopperEscaped:g},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":g})}const lf={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:O_};function N_(n,e,t){var r=ct(n),s=[ke,De].indexOf(r)>=0?-1:1,i=typeof t=="function"?t(Object.assign({},e,{placement:n})):t,a=i[0],c=i[1];return a=a||0,c=(c||0)*s,[ke,He].indexOf(r)>=0?{x:c,y:a}:{x:a,y:c}}function D_(n){var e=n.state,t=n.options,r=n.name,s=t.offset,i=s===void 0?[0,0]:s,a=bc.reduce(function(f,g){return f[g]=N_(g,e.rects,i),f},{}),c=a[e.placement],l=c.x,h=c.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=h),e.modifiersData[r]=a}const uf={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:D_};function k_(n){var e=n.state,t=n.name;e.modifiersData[t]=af({reference:e.rects.reference,element:e.rects.popper,placement:e.placement})}const hf={name:"popperOffsets",enabled:!0,phase:"read",fn:k_,data:{}};function L_(n){return n==="x"?"y":"x"}function V_(n){var e=n.state,t=n.options,r=n.name,s=t.mainAxis,i=s===void 0?!0:s,a=t.altAxis,c=a===void 0?!1:a,l=t.boundary,h=t.rootBoundary,f=t.altBoundary,g=t.padding,E=t.tether,I=E===void 0?!0:E,C=t.tetherOffset,O=C===void 0?0:C,S=Tr(e,{boundary:l,rootBoundary:h,padding:g,altBoundary:f}),M=ct(e.placement),F=vr(e.placement),x=!F,L=Cc(M),H=L_(L),$=e.modifiersData.popperOffsets,T=e.rects.reference,m=e.rects.popper,_=typeof O=="function"?O(Object.assign({},e.rects,{placement:e.placement})):O,v=typeof _=="number"?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),w=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,A={x:0,y:0};if($){if(i){var y,ge=L==="y"?De:ke,Fe=L==="y"?qe:He,Pe=L==="y"?"height":"width",_e=$[L],ot=_e+S[ge],Xe=_e-S[Fe],pn=I?-m[Pe]/2:0,qr=F===Dn?T[Pe]:m[Pe],Le=F===Dn?-m[Pe]:-T[Pe],ce=e.elements.arrow,Ut=I&&ce?Sc(ce):{width:0,height:0},Ve=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Zd(),mn=Ve[ge],_t=Ve[Fe],yt=Es(0,T[Pe],Ut[Pe]),Hr=x?T[Pe]/2-pn-yt-mn-v.mainAxis:qr-yt-mn-v.mainAxis,Qn=x?-T[Pe]/2+pn+yt+_t+v.mainAxis:Le+yt+_t+v.mainAxis,Ft=e.elements.arrow&&Fs(e.elements.arrow),Wr=Ft?L==="y"?Ft.clientTop||0:Ft.clientLeft||0:0,Xn=(y=w==null?void 0:w[L])!=null?y:0,Kr=_e+Hr-Xn-Wr,zr=_e+Qn-Xn,Gr=Es(I?eo(ot,Kr):ot,_e,I?Cn(Xe,zr):Xe);$[L]=Gr,A[L]=Gr-_e}if(c){var ui,Zo=L==="x"?De:ke,hi=L==="x"?qe:He,Je=$[H],gn=H==="y"?"height":"width",di=Je+S[Zo],Jn=Je-S[hi],_n=[De,ke].indexOf(M)!==-1,Yr=(ui=w==null?void 0:w[H])!=null?ui:0,de=_n?di:Je-T[gn]-m[gn]-Yr+v.altAxis,pe=_n?Je+T[gn]+m[gn]-Yr-v.altAxis:Jn,yn=I&&_n?d_(de,Je,pe):Es(I?de:di,Je,I?pe:Jn);$[H]=yn,A[H]=yn-Je}e.modifiersData[r]=A}}const df={name:"preventOverflow",enabled:!0,phase:"main",fn:V_,requiresIfExists:["offset"]};function M_(n){return{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}}function x_(n){return n===We(n)||!ze(n)?Pc(n):M_(n)}function U_(n){var e=n.getBoundingClientRect(),t=yr(e.width)/n.offsetWidth||1,r=yr(e.height)/n.offsetHeight||1;return t!==1||r!==1}function F_(n,e,t){t===void 0&&(t=!1);var r=ze(e),s=ze(e)&&U_(e),i=ln(e),a=Er(n,s,t),c={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(r||!r&&!t)&&((pt(e)!=="body"||Nc(i))&&(c=x_(e)),ze(e)?(l=Er(e,!0),l.x+=e.clientLeft,l.y+=e.clientTop):i&&(l.x=Oc(i))),{x:a.left+c.scrollLeft-l.x,y:a.top+c.scrollTop-l.y,width:a.width,height:a.height}}function $_(n){var e=new Map,t=new Set,r=[];n.forEach(function(i){e.set(i.name,i)});function s(i){t.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(c){if(!t.has(c)){var l=e.get(c);l&&s(l)}}),r.push(i)}return n.forEach(function(i){t.has(i.name)||s(i)}),r}function B_(n){var e=$_(n);return Yd.reduce(function(t,r){return t.concat(e.filter(function(s){return s.phase===r}))},[])}function j_(n){var e;return function(){return e||(e=new Promise(function(t){Promise.resolve().then(function(){e=void 0,t(n())})})),e}}function q_(n){var e=n.reduce(function(t,r){var s=t[r.name];return t[r.name]=s?Object.assign({},s,r,{options:Object.assign({},s.options,r.options),data:Object.assign({},s.data,r.data)}):r,t},{});return Object.keys(e).map(function(t){return e[t]})}var Fu={placement:"bottom",modifiers:[],strategy:"absolute"};function $u(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function ff(n){n===void 0&&(n={});var e=n,t=e.defaultModifiers,r=t===void 0?[]:t,s=e.defaultOptions,i=s===void 0?Fu:s;return function(c,l,h){h===void 0&&(h=i);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Fu,i),modifiersData:{},elements:{reference:c,popper:l},attributes:{},styles:{}},g=[],E=!1,I={state:f,setOptions:function(M){var F=typeof M=="function"?M(f.options):M;O(),f.options=Object.assign({},i,f.options,F),f.scrollParents={reference:kn(c)?vs(c):c.contextElement?vs(c.contextElement):[],popper:vs(l)};var x=B_(q_([].concat(r,f.options.modifiers)));return f.orderedModifiers=x.filter(function(L){return L.enabled}),C(),I.update()},forceUpdate:function(){if(!E){var M=f.elements,F=M.reference,x=M.popper;if($u(F,x)){f.rects={reference:F_(F,Fs(x),f.options.strategy==="fixed"),popper:Sc(x)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(v){return f.modifiersData[v.name]=Object.assign({},v.data)});for(var L=0;L<f.orderedModifiers.length;L++){if(f.reset===!0){f.reset=!1,L=-1;continue}var H=f.orderedModifiers[L],$=H.fn,T=H.options,m=T===void 0?{}:T,_=H.name;typeof $=="function"&&(f=$({state:f,options:m,name:_,instance:I})||f)}}}},update:j_(function(){return new Promise(function(S){I.forceUpdate(),S(f)})}),destroy:function(){O(),E=!0}};if(!$u(c,l))return I;I.setOptions(h).then(function(S){!E&&h.onFirstUpdate&&h.onFirstUpdate(S)});function C(){f.orderedModifiers.forEach(function(S){var M=S.name,F=S.options,x=F===void 0?{}:F,L=S.effect;if(typeof L=="function"){var H=L({state:f,name:M,instance:I,options:x}),$=function(){};g.push(H||$)}})}function O(){g.forEach(function(S){return S()}),g=[]}return I}}var H_=[sf,hf,rf,Qd,uf,cf,df,nf,lf],Dc=ff({defaultModifiers:H_});const pf=Object.freeze(Object.defineProperty({__proto__:null,afterMain:Wd,afterRead:jd,afterWrite:Gd,applyStyles:Qd,arrow:nf,auto:To,basePlacements:kr,beforeMain:qd,beforeRead:$d,beforeWrite:Kd,bottom:qe,clippingParents:Ud,computeStyles:rf,createPopper:Dc,detectOverflow:Tr,end:_r,eventListeners:sf,flip:cf,hide:lf,left:ke,main:Hd,modifierPhases:Yd,offset:uf,placements:bc,popper:ir,popperGenerator:ff,popperOffsets:hf,preventOverflow:df,read:Bd,reference:Fd,right:He,start:Dn,top:De,variationPlacements:Wa,viewport:Ic,write:zd},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const qt=new Map,ga={set(n,e,t){qt.has(n)||qt.set(n,new Map);const r=qt.get(n);if(!r.has(e)&&r.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);return}r.set(e,t)},get(n,e){return qt.has(n)&&qt.get(n).get(e)||null},remove(n,e){if(!qt.has(n))return;const t=qt.get(n);t.delete(e),t.size===0&&qt.delete(n)}},W_=1e6,K_=1e3,Ga="transitionend",mf=n=>(n&&window.CSS&&window.CSS.escape&&(n=n.replace(/#([^\s"#']+)/g,(e,t)=>`#${CSS.escape(t)}`)),n),z_=n=>n==null?`${n}`:Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase(),G_=n=>{do n+=Math.floor(Math.random()*W_);while(document.getElementById(n));return n},Y_=n=>{if(!n)return 0;let{transitionDuration:e,transitionDelay:t}=window.getComputedStyle(n);const r=Number.parseFloat(e),s=Number.parseFloat(t);return!r&&!s?0:(e=e.split(",")[0],t=t.split(",")[0],(Number.parseFloat(e)+Number.parseFloat(t))*K_)},gf=n=>{n.dispatchEvent(new Event(Ga))},Rt=n=>!n||typeof n!="object"?!1:(typeof n.jquery<"u"&&(n=n[0]),typeof n.nodeType<"u"),nn=n=>Rt(n)?n.jquery?n[0]:n:typeof n=="string"&&n.length>0?document.querySelector(mf(n)):null,Lr=n=>{if(!Rt(n)||n.getClientRects().length===0)return!1;const e=getComputedStyle(n).getPropertyValue("visibility")==="visible",t=n.closest("details:not([open])");if(!t)return e;if(t!==n){const r=n.closest("summary");if(r&&r.parentNode!==t||r===null)return!1}return e},rn=n=>!n||n.nodeType!==Node.ELEMENT_NODE||n.classList.contains("disabled")?!0:typeof n.disabled<"u"?n.disabled:n.hasAttribute("disabled")&&n.getAttribute("disabled")!=="false",_f=n=>{if(!document.documentElement.attachShadow)return null;if(typeof n.getRootNode=="function"){const e=n.getRootNode();return e instanceof ShadowRoot?e:null}return n instanceof ShadowRoot?n:n.parentNode?_f(n.parentNode):null},to=()=>{},$s=n=>{n.offsetHeight},yf=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,_a=[],Q_=n=>{document.readyState==="loading"?(_a.length||document.addEventListener("DOMContentLoaded",()=>{for(const e of _a)e()}),_a.push(n)):n()},Ge=()=>document.documentElement.dir==="rtl",Qe=n=>{Q_(()=>{const e=yf();if(e){const t=n.NAME,r=e.fn[t];e.fn[t]=n.jQueryInterface,e.fn[t].Constructor=n,e.fn[t].noConflict=()=>(e.fn[t]=r,n.jQueryInterface)}})},Me=(n,e=[],t=n)=>typeof n=="function"?n.call(...e):t,Ef=(n,e,t=!0)=>{if(!t){Me(n);return}const s=Y_(e)+5;let i=!1;const a=({target:c})=>{c===e&&(i=!0,e.removeEventListener(Ga,a),Me(n))};e.addEventListener(Ga,a),setTimeout(()=>{i||gf(e)},s)},kc=(n,e,t,r)=>{const s=n.length;let i=n.indexOf(e);return i===-1?!t&&r?n[s-1]:n[0]:(i+=t?1:-1,r&&(i=(i+s)%s),n[Math.max(0,Math.min(i,s-1))])},X_=/[^.]*(?=\..*)\.|.*/,J_=/\..*/,Z_=/::\d+$/,ya={};let Bu=1;const vf={mouseenter:"mouseover",mouseleave:"mouseout"},ey=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function Tf(n,e){return e&&`${e}::${Bu++}`||n.uidEvent||Bu++}function wf(n){const e=Tf(n);return n.uidEvent=e,ya[e]=ya[e]||{},ya[e]}function ty(n,e){return function t(r){return Lc(r,{delegateTarget:n}),t.oneOff&&N.off(n,r.type,e),e.apply(n,[r])}}function ny(n,e,t){return function r(s){const i=n.querySelectorAll(e);for(let{target:a}=s;a&&a!==this;a=a.parentNode)for(const c of i)if(c===a)return Lc(s,{delegateTarget:a}),r.oneOff&&N.off(n,s.type,e,t),t.apply(a,[s])}}function Af(n,e,t=null){return Object.values(n).find(r=>r.callable===e&&r.delegationSelector===t)}function If(n,e,t){const r=typeof e=="string",s=r?t:e||t;let i=bf(n);return ey.has(i)||(i=n),[r,s,i]}function ju(n,e,t,r,s){if(typeof e!="string"||!n)return;let[i,a,c]=If(e,t,r);e in vf&&(a=(C=>function(O){if(!O.relatedTarget||O.relatedTarget!==O.delegateTarget&&!O.delegateTarget.contains(O.relatedTarget))return C.call(this,O)})(a));const l=wf(n),h=l[c]||(l[c]={}),f=Af(h,a,i?t:null);if(f){f.oneOff=f.oneOff&&s;return}const g=Tf(a,e.replace(X_,"")),E=i?ny(n,t,a):ty(n,a);E.delegationSelector=i?t:null,E.callable=a,E.oneOff=s,E.uidEvent=g,h[g]=E,n.addEventListener(c,E,i)}function Ya(n,e,t,r,s){const i=Af(e[t],r,s);i&&(n.removeEventListener(t,i,!!s),delete e[t][i.uidEvent])}function ry(n,e,t,r){const s=e[t]||{};for(const[i,a]of Object.entries(s))i.includes(r)&&Ya(n,e,t,a.callable,a.delegationSelector)}function bf(n){return n=n.replace(J_,""),vf[n]||n}const N={on(n,e,t,r){ju(n,e,t,r,!1)},one(n,e,t,r){ju(n,e,t,r,!0)},off(n,e,t,r){if(typeof e!="string"||!n)return;const[s,i,a]=If(e,t,r),c=a!==e,l=wf(n),h=l[a]||{},f=e.startsWith(".");if(typeof i<"u"){if(!Object.keys(h).length)return;Ya(n,l,a,i,s?t:null);return}if(f)for(const g of Object.keys(l))ry(n,l,g,e.slice(1));for(const[g,E]of Object.entries(h)){const I=g.replace(Z_,"");(!c||e.includes(I))&&Ya(n,l,a,E.callable,E.delegationSelector)}},trigger(n,e,t){if(typeof e!="string"||!n)return null;const r=yf(),s=bf(e),i=e!==s;let a=null,c=!0,l=!0,h=!1;i&&r&&(a=r.Event(e,t),r(n).trigger(a),c=!a.isPropagationStopped(),l=!a.isImmediatePropagationStopped(),h=a.isDefaultPrevented());const f=Lc(new Event(e,{bubbles:c,cancelable:!0}),t);return h&&f.preventDefault(),l&&n.dispatchEvent(f),f.defaultPrevented&&a&&a.preventDefault(),f}};function Lc(n,e={}){for(const[t,r]of Object.entries(e))try{n[t]=r}catch{Object.defineProperty(n,t,{configurable:!0,get(){return r}})}return n}function qu(n){if(n==="true")return!0;if(n==="false")return!1;if(n===Number(n).toString())return Number(n);if(n===""||n==="null")return null;if(typeof n!="string")return n;try{return JSON.parse(decodeURIComponent(n))}catch{return n}}function Ea(n){return n.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}const St={setDataAttribute(n,e,t){n.setAttribute(`data-bs-${Ea(e)}`,t)},removeDataAttribute(n,e){n.removeAttribute(`data-bs-${Ea(e)}`)},getDataAttributes(n){if(!n)return{};const e={},t=Object.keys(n.dataset).filter(r=>r.startsWith("bs")&&!r.startsWith("bsConfig"));for(const r of t){let s=r.replace(/^bs/,"");s=s.charAt(0).toLowerCase()+s.slice(1),e[s]=qu(n.dataset[r])}return e},getDataAttribute(n,e){return qu(n.getAttribute(`data-bs-${Ea(e)}`))}};class Bs{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const r=Rt(t)?St.getDataAttribute(t,"config"):{};return{...this.constructor.Default,...typeof r=="object"?r:{},...Rt(t)?St.getDataAttributes(t):{},...typeof e=="object"?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const[r,s]of Object.entries(t)){const i=e[r],a=Rt(i)?"element":z_(i);if(!new RegExp(s).test(a))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${a}" but expected type "${s}".`)}}}const sy="5.3.8";class st extends Bs{constructor(e,t){super(),e=nn(e),e&&(this._element=e,this._config=this._getConfig(t),ga.set(this._element,this.constructor.DATA_KEY,this))}dispose(){ga.remove(this._element,this.constructor.DATA_KEY),N.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,r=!0){Ef(e,t,r)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return ga.get(nn(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,typeof t=="object"?t:null)}static get VERSION(){return sy}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}const va=n=>{let e=n.getAttribute("data-bs-target");if(!e||e==="#"){let t=n.getAttribute("href");if(!t||!t.includes("#")&&!t.startsWith("."))return null;t.includes("#")&&!t.startsWith("#")&&(t=`#${t.split("#")[1]}`),e=t&&t!=="#"?t.trim():null}return e?e.split(",").map(t=>mf(t)).join(","):null},j={find(n,e=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(e,n))},findOne(n,e=document.documentElement){return Element.prototype.querySelector.call(e,n)},children(n,e){return[].concat(...n.children).filter(t=>t.matches(e))},parents(n,e){const t=[];let r=n.parentNode.closest(e);for(;r;)t.push(r),r=r.parentNode.closest(e);return t},prev(n,e){let t=n.previousElementSibling;for(;t;){if(t.matches(e))return[t];t=t.previousElementSibling}return[]},next(n,e){let t=n.nextElementSibling;for(;t;){if(t.matches(e))return[t];t=t.nextElementSibling}return[]},focusableChildren(n){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(t=>`${t}:not([tabindex^="-"])`).join(",");return this.find(e,n).filter(t=>!rn(t)&&Lr(t))},getSelectorFromElement(n){const e=va(n);return e&&j.findOne(e)?e:null},getElementFromSelector(n){const e=va(n);return e?j.findOne(e):null},getMultipleElementsFromSelector(n){const e=va(n);return e?j.find(e):[]}},Ao=(n,e="hide")=>{const t=`click.dismiss${n.EVENT_KEY}`,r=n.NAME;N.on(document,t,`[data-bs-dismiss="${r}"]`,function(s){if(["A","AREA"].includes(this.tagName)&&s.preventDefault(),rn(this))return;const i=j.getElementFromSelector(this)||this.closest(`.${r}`);n.getOrCreateInstance(i)[e]()})},iy="alert",oy="bs.alert",Rf=`.${oy}`,ay=`close${Rf}`,cy=`closed${Rf}`,ly="fade",uy="show";class js extends st{static get NAME(){return iy}close(){if(N.trigger(this._element,ay).defaultPrevented)return;this._element.classList.remove(uy);const t=this._element.classList.contains(ly);this._queueCallback(()=>this._destroyElement(),this._element,t)}_destroyElement(){this._element.remove(),N.trigger(this._element,cy),this.dispose()}static jQueryInterface(e){return this.each(function(){const t=js.getOrCreateInstance(this);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}Ao(js,"close");Qe(js);const hy="button",dy="bs.button",fy=`.${dy}`,py=".data-api",my="active",Hu='[data-bs-toggle="button"]',gy=`click${fy}${py}`;class qs extends st{static get NAME(){return hy}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(my))}static jQueryInterface(e){return this.each(function(){const t=qs.getOrCreateInstance(this);e==="toggle"&&t[e]()})}}N.on(document,gy,Hu,n=>{n.preventDefault();const e=n.target.closest(Hu);qs.getOrCreateInstance(e).toggle()});Qe(qs);const _y="swipe",Vr=".bs.swipe",yy=`touchstart${Vr}`,Ey=`touchmove${Vr}`,vy=`touchend${Vr}`,Ty=`pointerdown${Vr}`,wy=`pointerup${Vr}`,Ay="touch",Iy="pen",by="pointer-event",Ry=40,Sy={endCallback:null,leftCallback:null,rightCallback:null},Cy={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class no extends Bs{constructor(e,t){super(),this._element=e,!(!e||!no.isSupported())&&(this._config=this._getConfig(t),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return Sy}static get DefaultType(){return Cy}static get NAME(){return _y}dispose(){N.off(this._element,Vr)}_start(e){if(!this._supportPointerEvents){this._deltaX=e.touches[0].clientX;return}this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX)}_end(e){this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX-this._deltaX),this._handleSwipe(),Me(this._config.endCallback)}_move(e){this._deltaX=e.touches&&e.touches.length>1?0:e.touches[0].clientX-this._deltaX}_handleSwipe(){const e=Math.abs(this._deltaX);if(e<=Ry)return;const t=e/this._deltaX;this._deltaX=0,t&&Me(t>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(N.on(this._element,Ty,e=>this._start(e)),N.on(this._element,wy,e=>this._end(e)),this._element.classList.add(by)):(N.on(this._element,yy,e=>this._start(e)),N.on(this._element,Ey,e=>this._move(e)),N.on(this._element,vy,e=>this._end(e)))}_eventIsPointerPenTouch(e){return this._supportPointerEvents&&(e.pointerType===Iy||e.pointerType===Ay)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const Py="carousel",Oy="bs.carousel",un=`.${Oy}`,Sf=".data-api",Ny="ArrowLeft",Dy="ArrowRight",ky=500,ls="next",rr="prev",or="left",qi="right",Ly=`slide${un}`,Ta=`slid${un}`,Vy=`keydown${un}`,My=`mouseenter${un}`,xy=`mouseleave${un}`,Uy=`dragstart${un}`,Fy=`load${un}${Sf}`,$y=`click${un}${Sf}`,Cf="carousel",Pi="active",By="slide",jy="carousel-item-end",qy="carousel-item-start",Hy="carousel-item-next",Wy="carousel-item-prev",Pf=".active",Of=".carousel-item",Ky=Pf+Of,zy=".carousel-item img",Gy=".carousel-indicators",Yy="[data-bs-slide], [data-bs-slide-to]",Qy='[data-bs-ride="carousel"]',Xy={[Ny]:qi,[Dy]:or},Jy={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},Zy={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Mr extends st{constructor(e,t){super(e,t),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=j.findOne(Gy,this._element),this._addEventListeners(),this._config.ride===Cf&&this.cycle()}static get Default(){return Jy}static get DefaultType(){return Zy}static get NAME(){return Py}next(){this._slide(ls)}nextWhenVisible(){!document.hidden&&Lr(this._element)&&this.next()}prev(){this._slide(rr)}pause(){this._isSliding&&gf(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){N.one(this._element,Ta,()=>this.cycle());return}this.cycle()}}to(e){const t=this._getItems();if(e>t.length-1||e<0)return;if(this._isSliding){N.one(this._element,Ta,()=>this.to(e));return}const r=this._getItemIndex(this._getActive());if(r===e)return;const s=e>r?ls:rr;this._slide(s,t[e])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(e){return e.defaultInterval=e.interval,e}_addEventListeners(){this._config.keyboard&&N.on(this._element,Vy,e=>this._keydown(e)),this._config.pause==="hover"&&(N.on(this._element,My,()=>this.pause()),N.on(this._element,xy,()=>this._maybeEnableCycle())),this._config.touch&&no.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const r of j.find(zy,this._element))N.on(r,Uy,s=>s.preventDefault());const t={leftCallback:()=>this._slide(this._directionToOrder(or)),rightCallback:()=>this._slide(this._directionToOrder(qi)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),ky+this._config.interval))}};this._swipeHelper=new no(this._element,t)}_keydown(e){if(/input|textarea/i.test(e.target.tagName))return;const t=Xy[e.key];t&&(e.preventDefault(),this._slide(this._directionToOrder(t)))}_getItemIndex(e){return this._getItems().indexOf(e)}_setActiveIndicatorElement(e){if(!this._indicatorsElement)return;const t=j.findOne(Pf,this._indicatorsElement);t.classList.remove(Pi),t.removeAttribute("aria-current");const r=j.findOne(`[data-bs-slide-to="${e}"]`,this._indicatorsElement);r&&(r.classList.add(Pi),r.setAttribute("aria-current","true"))}_updateInterval(){const e=this._activeElement||this._getActive();if(!e)return;const t=Number.parseInt(e.getAttribute("data-bs-interval"),10);this._config.interval=t||this._config.defaultInterval}_slide(e,t=null){if(this._isSliding)return;const r=this._getActive(),s=e===ls,i=t||kc(this._getItems(),r,s,this._config.wrap);if(i===r)return;const a=this._getItemIndex(i),c=I=>N.trigger(this._element,I,{relatedTarget:i,direction:this._orderToDirection(e),from:this._getItemIndex(r),to:a});if(c(Ly).defaultPrevented||!r||!i)return;const h=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(a),this._activeElement=i;const f=s?qy:jy,g=s?Hy:Wy;i.classList.add(g),$s(i),r.classList.add(f),i.classList.add(f);const E=()=>{i.classList.remove(f,g),i.classList.add(Pi),r.classList.remove(Pi,g,f),this._isSliding=!1,c(Ta)};this._queueCallback(E,r,this._isAnimated()),h&&this.cycle()}_isAnimated(){return this._element.classList.contains(By)}_getActive(){return j.findOne(Ky,this._element)}_getItems(){return j.find(Of,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(e){return Ge()?e===or?rr:ls:e===or?ls:rr}_orderToDirection(e){return Ge()?e===rr?or:qi:e===rr?qi:or}static jQueryInterface(e){return this.each(function(){const t=Mr.getOrCreateInstance(this,e);if(typeof e=="number"){t.to(e);return}if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}N.on(document,$y,Yy,function(n){const e=j.getElementFromSelector(this);if(!e||!e.classList.contains(Cf))return;n.preventDefault();const t=Mr.getOrCreateInstance(e),r=this.getAttribute("data-bs-slide-to");if(r){t.to(r),t._maybeEnableCycle();return}if(St.getDataAttribute(this,"slide")==="next"){t.next(),t._maybeEnableCycle();return}t.prev(),t._maybeEnableCycle()});N.on(window,Fy,()=>{const n=j.find(Qy);for(const e of n)Mr.getOrCreateInstance(e)});Qe(Mr);const eE="collapse",tE="bs.collapse",Hs=`.${tE}`,nE=".data-api",rE=`show${Hs}`,sE=`shown${Hs}`,iE=`hide${Hs}`,oE=`hidden${Hs}`,aE=`click${Hs}${nE}`,wa="show",hr="collapse",Oi="collapsing",cE="collapsed",lE=`:scope .${hr} .${hr}`,uE="collapse-horizontal",hE="width",dE="height",fE=".collapse.show, .collapse.collapsing",Qa='[data-bs-toggle="collapse"]',pE={parent:null,toggle:!0},mE={parent:"(null|element)",toggle:"boolean"};class wr extends st{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[];const r=j.find(Qa);for(const s of r){const i=j.getSelectorFromElement(s),a=j.find(i).filter(c=>c===this._element);i!==null&&a.length&&this._triggerArray.push(s)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return pE}static get DefaultType(){return mE}static get NAME(){return eE}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let e=[];if(this._config.parent&&(e=this._getFirstLevelChildren(fE).filter(c=>c!==this._element).map(c=>wr.getOrCreateInstance(c,{toggle:!1}))),e.length&&e[0]._isTransitioning||N.trigger(this._element,rE).defaultPrevented)return;for(const c of e)c.hide();const r=this._getDimension();this._element.classList.remove(hr),this._element.classList.add(Oi),this._element.style[r]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const s=()=>{this._isTransitioning=!1,this._element.classList.remove(Oi),this._element.classList.add(hr,wa),this._element.style[r]="",N.trigger(this._element,sE)},a=`scroll${r[0].toUpperCase()+r.slice(1)}`;this._queueCallback(s,this._element,!0),this._element.style[r]=`${this._element[a]}px`}hide(){if(this._isTransitioning||!this._isShown()||N.trigger(this._element,iE).defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,$s(this._element),this._element.classList.add(Oi),this._element.classList.remove(hr,wa);for(const s of this._triggerArray){const i=j.getElementFromSelector(s);i&&!this._isShown(i)&&this._addAriaAndCollapsedClass([s],!1)}this._isTransitioning=!0;const r=()=>{this._isTransitioning=!1,this._element.classList.remove(Oi),this._element.classList.add(hr),N.trigger(this._element,oE)};this._element.style[t]="",this._queueCallback(r,this._element,!0)}_isShown(e=this._element){return e.classList.contains(wa)}_configAfterMerge(e){return e.toggle=!!e.toggle,e.parent=nn(e.parent),e}_getDimension(){return this._element.classList.contains(uE)?hE:dE}_initializeChildren(){if(!this._config.parent)return;const e=this._getFirstLevelChildren(Qa);for(const t of e){const r=j.getElementFromSelector(t);r&&this._addAriaAndCollapsedClass([t],this._isShown(r))}}_getFirstLevelChildren(e){const t=j.find(lE,this._config.parent);return j.find(e,this._config.parent).filter(r=>!t.includes(r))}_addAriaAndCollapsedClass(e,t){if(e.length)for(const r of e)r.classList.toggle(cE,!t),r.setAttribute("aria-expanded",t)}static jQueryInterface(e){const t={};return typeof e=="string"&&/show|hide/.test(e)&&(t.toggle=!1),this.each(function(){const r=wr.getOrCreateInstance(this,t);if(typeof e=="string"){if(typeof r[e]>"u")throw new TypeError(`No method named "${e}"`);r[e]()}})}}N.on(document,aE,Qa,function(n){(n.target.tagName==="A"||n.delegateTarget&&n.delegateTarget.tagName==="A")&&n.preventDefault();for(const e of j.getMultipleElementsFromSelector(this))wr.getOrCreateInstance(e,{toggle:!1}).toggle()});Qe(wr);const Wu="dropdown",gE="bs.dropdown",jn=`.${gE}`,Vc=".data-api",_E="Escape",Ku="Tab",yE="ArrowUp",zu="ArrowDown",EE=2,vE=`hide${jn}`,TE=`hidden${jn}`,wE=`show${jn}`,AE=`shown${jn}`,Nf=`click${jn}${Vc}`,Df=`keydown${jn}${Vc}`,IE=`keyup${jn}${Vc}`,ar="show",bE="dropup",RE="dropend",SE="dropstart",CE="dropup-center",PE="dropdown-center",In='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',OE=`${In}.${ar}`,Hi=".dropdown-menu",NE=".navbar",DE=".navbar-nav",kE=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",LE=Ge()?"top-end":"top-start",VE=Ge()?"top-start":"top-end",ME=Ge()?"bottom-end":"bottom-start",xE=Ge()?"bottom-start":"bottom-end",UE=Ge()?"left-start":"right-start",FE=Ge()?"right-start":"left-start",$E="top",BE="bottom",jE={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},qE={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class et extends st{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=j.next(this._element,Hi)[0]||j.prev(this._element,Hi)[0]||j.findOne(Hi,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return jE}static get DefaultType(){return qE}static get NAME(){return Wu}toggle(){return this._isShown()?this.hide():this.show()}show(){if(rn(this._element)||this._isShown())return;const e={relatedTarget:this._element};if(!N.trigger(this._element,wE,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(DE))for(const r of[].concat(...document.body.children))N.on(r,"mouseover",to);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(ar),this._element.classList.add(ar),N.trigger(this._element,AE,e)}}hide(){if(rn(this._element)||!this._isShown())return;const e={relatedTarget:this._element};this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!N.trigger(this._element,vE,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const r of[].concat(...document.body.children))N.off(r,"mouseover",to);this._popper&&this._popper.destroy(),this._menu.classList.remove(ar),this._element.classList.remove(ar),this._element.setAttribute("aria-expanded","false"),St.removeDataAttribute(this._menu,"popper"),N.trigger(this._element,TE,e)}}_getConfig(e){if(e=super._getConfig(e),typeof e.reference=="object"&&!Rt(e.reference)&&typeof e.reference.getBoundingClientRect!="function")throw new TypeError(`${Wu.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return e}_createPopper(){if(typeof pf>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");let e=this._element;this._config.reference==="parent"?e=this._parent:Rt(this._config.reference)?e=nn(this._config.reference):typeof this._config.reference=="object"&&(e=this._config.reference);const t=this._getPopperConfig();this._popper=Dc(e,this._menu,t)}_isShown(){return this._menu.classList.contains(ar)}_getPlacement(){const e=this._parent;if(e.classList.contains(RE))return UE;if(e.classList.contains(SE))return FE;if(e.classList.contains(CE))return $E;if(e.classList.contains(PE))return BE;const t=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return e.classList.contains(bE)?t?VE:LE:t?xE:ME}_detectNavbar(){return this._element.closest(NE)!==null}_getOffset(){const{offset:e}=this._config;return typeof e=="string"?e.split(",").map(t=>Number.parseInt(t,10)):typeof e=="function"?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(St.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,...Me(this._config.popperConfig,[void 0,e])}}_selectMenuItem({key:e,target:t}){const r=j.find(kE,this._menu).filter(s=>Lr(s));r.length&&kc(r,t,e===zu,!r.includes(t)).focus()}static jQueryInterface(e){return this.each(function(){const t=et.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e]()}})}static clearMenus(e){if(e.button===EE||e.type==="keyup"&&e.key!==Ku)return;const t=j.find(OE);for(const r of t){const s=et.getInstance(r);if(!s||s._config.autoClose===!1)continue;const i=e.composedPath(),a=i.includes(s._menu);if(i.includes(s._element)||s._config.autoClose==="inside"&&!a||s._config.autoClose==="outside"&&a||s._menu.contains(e.target)&&(e.type==="keyup"&&e.key===Ku||/input|select|option|textarea|form/i.test(e.target.tagName)))continue;const c={relatedTarget:s._element};e.type==="click"&&(c.clickEvent=e),s._completeHide(c)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),r=e.key===_E,s=[yE,zu].includes(e.key);if(!s&&!r||t&&!r)return;e.preventDefault();const i=this.matches(In)?this:j.prev(this,In)[0]||j.next(this,In)[0]||j.findOne(In,e.delegateTarget.parentNode),a=et.getOrCreateInstance(i);if(s){e.stopPropagation(),a.show(),a._selectMenuItem(e);return}a._isShown()&&(e.stopPropagation(),a.hide(),i.focus())}}N.on(document,Df,In,et.dataApiKeydownHandler);N.on(document,Df,Hi,et.dataApiKeydownHandler);N.on(document,Nf,et.clearMenus);N.on(document,IE,et.clearMenus);N.on(document,Nf,In,function(n){n.preventDefault(),et.getOrCreateInstance(this).toggle()});Qe(et);const kf="backdrop",HE="fade",Gu="show",Yu=`mousedown.bs.${kf}`,WE={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},KE={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Lf extends Bs{constructor(e){super(),this._config=this._getConfig(e),this._isAppended=!1,this._element=null}static get Default(){return WE}static get DefaultType(){return KE}static get NAME(){return kf}show(e){if(!this._config.isVisible){Me(e);return}this._append();const t=this._getElement();this._config.isAnimated&&$s(t),t.classList.add(Gu),this._emulateAnimation(()=>{Me(e)})}hide(e){if(!this._config.isVisible){Me(e);return}this._getElement().classList.remove(Gu),this._emulateAnimation(()=>{this.dispose(),Me(e)})}dispose(){this._isAppended&&(N.off(this._element,Yu),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const e=document.createElement("div");e.className=this._config.className,this._config.isAnimated&&e.classList.add(HE),this._element=e}return this._element}_configAfterMerge(e){return e.rootElement=nn(e.rootElement),e}_append(){if(this._isAppended)return;const e=this._getElement();this._config.rootElement.append(e),N.on(e,Yu,()=>{Me(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(e){Ef(e,this._getElement(),this._config.isAnimated)}}const zE="focustrap",GE="bs.focustrap",ro=`.${GE}`,YE=`focusin${ro}`,QE=`keydown.tab${ro}`,XE="Tab",JE="forward",Qu="backward",ZE={autofocus:!0,trapElement:null},ev={autofocus:"boolean",trapElement:"element"};class Vf extends Bs{constructor(e){super(),this._config=this._getConfig(e),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return ZE}static get DefaultType(){return ev}static get NAME(){return zE}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),N.off(document,ro),N.on(document,YE,e=>this._handleFocusin(e)),N.on(document,QE,e=>this._handleKeydown(e)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,N.off(document,ro))}_handleFocusin(e){const{trapElement:t}=this._config;if(e.target===document||e.target===t||t.contains(e.target))return;const r=j.focusableChildren(t);r.length===0?t.focus():this._lastTabNavDirection===Qu?r[r.length-1].focus():r[0].focus()}_handleKeydown(e){e.key===XE&&(this._lastTabNavDirection=e.shiftKey?Qu:JE)}}const Xu=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",Ju=".sticky-top",Ni="padding-right",Zu="margin-right";class Xa{constructor(){this._element=document.body}getWidth(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}hide(){const e=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,Ni,t=>t+e),this._setElementAttributes(Xu,Ni,t=>t+e),this._setElementAttributes(Ju,Zu,t=>t-e)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,Ni),this._resetElementAttributes(Xu,Ni),this._resetElementAttributes(Ju,Zu)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(e,t,r){const s=this.getWidth(),i=a=>{if(a!==this._element&&window.innerWidth>a.clientWidth+s)return;this._saveInitialAttribute(a,t);const c=window.getComputedStyle(a).getPropertyValue(t);a.style.setProperty(t,`${r(Number.parseFloat(c))}px`)};this._applyManipulationCallback(e,i)}_saveInitialAttribute(e,t){const r=e.style.getPropertyValue(t);r&&St.setDataAttribute(e,t,r)}_resetElementAttributes(e,t){const r=s=>{const i=St.getDataAttribute(s,t);if(i===null){s.style.removeProperty(t);return}St.removeDataAttribute(s,t),s.style.setProperty(t,i)};this._applyManipulationCallback(e,r)}_applyManipulationCallback(e,t){if(Rt(e)){t(e);return}for(const r of j.find(e,this._element))t(r)}}const tv="modal",nv="bs.modal",Ye=`.${nv}`,rv=".data-api",sv="Escape",iv=`hide${Ye}`,ov=`hidePrevented${Ye}`,Mf=`hidden${Ye}`,xf=`show${Ye}`,av=`shown${Ye}`,cv=`resize${Ye}`,lv=`click.dismiss${Ye}`,uv=`mousedown.dismiss${Ye}`,hv=`keydown.dismiss${Ye}`,dv=`click${Ye}${rv}`,eh="modal-open",fv="fade",th="show",Aa="modal-static",pv=".modal.show",mv=".modal-dialog",gv=".modal-body",_v='[data-bs-toggle="modal"]',yv={backdrop:!0,focus:!0,keyboard:!0},Ev={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Ln extends st{constructor(e,t){super(e,t),this._dialog=j.findOne(mv,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new Xa,this._addEventListeners()}static get Default(){return yv}static get DefaultType(){return Ev}static get NAME(){return tv}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||this._isTransitioning||N.trigger(this._element,xf,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(eh),this._adjustDialog(),this._backdrop.show(()=>this._showElement(e)))}hide(){!this._isShown||this._isTransitioning||N.trigger(this._element,iv).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(th),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){N.off(window,Ye),N.off(this._dialog,Ye),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Lf({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Vf({trapElement:this._element})}_showElement(e){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const t=j.findOne(gv,this._dialog);t&&(t.scrollTop=0),$s(this._element),this._element.classList.add(th);const r=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,N.trigger(this._element,av,{relatedTarget:e})};this._queueCallback(r,this._dialog,this._isAnimated())}_addEventListeners(){N.on(this._element,hv,e=>{if(e.key===sv){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),N.on(window,cv,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),N.on(this._element,uv,e=>{N.one(this._element,lv,t=>{if(!(this._element!==e.target||this._element!==t.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(eh),this._resetAdjustments(),this._scrollBar.reset(),N.trigger(this._element,Mf)})}_isAnimated(){return this._element.classList.contains(fv)}_triggerBackdropTransition(){if(N.trigger(this._element,ov).defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,r=this._element.style.overflowY;r==="hidden"||this._element.classList.contains(Aa)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(Aa),this._queueCallback(()=>{this._element.classList.remove(Aa),this._queueCallback(()=>{this._element.style.overflowY=r},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._scrollBar.getWidth(),r=t>0;if(r&&!e){const s=Ge()?"paddingLeft":"paddingRight";this._element.style[s]=`${t}px`}if(!r&&e){const s=Ge()?"paddingRight":"paddingLeft";this._element.style[s]=`${t}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(e,t){return this.each(function(){const r=Ln.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof r[e]>"u")throw new TypeError(`No method named "${e}"`);r[e](t)}})}}N.on(document,dv,_v,function(n){const e=j.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&n.preventDefault(),N.one(e,xf,s=>{s.defaultPrevented||N.one(e,Mf,()=>{Lr(this)&&this.focus()})});const t=j.findOne(pv);t&&Ln.getInstance(t).hide(),Ln.getOrCreateInstance(e).toggle(this)});Ao(Ln);Qe(Ln);const vv="offcanvas",Tv="bs.offcanvas",Mt=`.${Tv}`,Uf=".data-api",wv=`load${Mt}${Uf}`,Av="Escape",nh="show",rh="showing",sh="hiding",Iv="offcanvas-backdrop",Ff=".offcanvas.show",bv=`show${Mt}`,Rv=`shown${Mt}`,Sv=`hide${Mt}`,ih=`hidePrevented${Mt}`,$f=`hidden${Mt}`,Cv=`resize${Mt}`,Pv=`click${Mt}${Uf}`,Ov=`keydown.dismiss${Mt}`,Nv='[data-bs-toggle="offcanvas"]',Dv={backdrop:!0,keyboard:!0,scroll:!1},kv={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class Ot extends st{constructor(e,t){super(e,t),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return Dv}static get DefaultType(){return kv}static get NAME(){return vv}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){if(this._isShown||N.trigger(this._element,bv,{relatedTarget:e}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new Xa().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(rh);const r=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(nh),this._element.classList.remove(rh),N.trigger(this._element,Rv,{relatedTarget:e})};this._queueCallback(r,this._element,!0)}hide(){if(!this._isShown||N.trigger(this._element,Sv).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(sh),this._backdrop.hide();const t=()=>{this._element.classList.remove(nh,sh),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new Xa().reset(),N.trigger(this._element,$f)};this._queueCallback(t,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const e=()=>{if(this._config.backdrop==="static"){N.trigger(this._element,ih);return}this.hide()},t=!!this._config.backdrop;return new Lf({className:Iv,isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?e:null})}_initializeFocusTrap(){return new Vf({trapElement:this._element})}_addEventListeners(){N.on(this._element,Ov,e=>{if(e.key===Av){if(this._config.keyboard){this.hide();return}N.trigger(this._element,ih)}})}static jQueryInterface(e){return this.each(function(){const t=Ot.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}N.on(document,Pv,Nv,function(n){const e=j.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&n.preventDefault(),rn(this))return;N.one(e,$f,()=>{Lr(this)&&this.focus()});const t=j.findOne(Ff);t&&t!==e&&Ot.getInstance(t).hide(),Ot.getOrCreateInstance(e).toggle(this)});N.on(window,wv,()=>{for(const n of j.find(Ff))Ot.getOrCreateInstance(n).show()});N.on(window,Cv,()=>{for(const n of j.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(n).position!=="fixed"&&Ot.getOrCreateInstance(n).hide()});Ao(Ot);Qe(Ot);const Lv=/^aria-[\w-]*$/i,Bf={"*":["class","dir","id","lang","role",Lv],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Vv=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Mv=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,xv=(n,e)=>{const t=n.nodeName.toLowerCase();return e.includes(t)?Vv.has(t)?!!Mv.test(n.nodeValue):!0:e.filter(r=>r instanceof RegExp).some(r=>r.test(t))};function Uv(n,e,t){if(!n.length)return n;if(t&&typeof t=="function")return t(n);const s=new window.DOMParser().parseFromString(n,"text/html"),i=[].concat(...s.body.querySelectorAll("*"));for(const a of i){const c=a.nodeName.toLowerCase();if(!Object.keys(e).includes(c)){a.remove();continue}const l=[].concat(...a.attributes),h=[].concat(e["*"]||[],e[c]||[]);for(const f of l)xv(f,h)||a.removeAttribute(f.nodeName)}return s.body.innerHTML}const Fv="TemplateFactory",$v={allowList:Bf,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},Bv={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},jv={entry:"(string|element|function|null)",selector:"(string|element)"};class qv extends Bs{constructor(e){super(),this._config=this._getConfig(e)}static get Default(){return $v}static get DefaultType(){return Bv}static get NAME(){return Fv}getContent(){return Object.values(this._config.content).map(e=>this._resolvePossibleFunction(e)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(e){return this._checkContent(e),this._config.content={...this._config.content,...e},this}toHtml(){const e=document.createElement("div");e.innerHTML=this._maybeSanitize(this._config.template);for(const[s,i]of Object.entries(this._config.content))this._setContent(e,i,s);const t=e.children[0],r=this._resolvePossibleFunction(this._config.extraClass);return r&&t.classList.add(...r.split(" ")),t}_typeCheckConfig(e){super._typeCheckConfig(e),this._checkContent(e.content)}_checkContent(e){for(const[t,r]of Object.entries(e))super._typeCheckConfig({selector:t,entry:r},jv)}_setContent(e,t,r){const s=j.findOne(r,e);if(s){if(t=this._resolvePossibleFunction(t),!t){s.remove();return}if(Rt(t)){this._putElementInTemplate(nn(t),s);return}if(this._config.html){s.innerHTML=this._maybeSanitize(t);return}s.textContent=t}}_maybeSanitize(e){return this._config.sanitize?Uv(e,this._config.allowList,this._config.sanitizeFn):e}_resolvePossibleFunction(e){return Me(e,[void 0,this])}_putElementInTemplate(e,t){if(this._config.html){t.innerHTML="",t.append(e);return}t.textContent=e.textContent}}const Hv="tooltip",Wv=new Set(["sanitize","allowList","sanitizeFn"]),Ia="fade",Kv="modal",Di="show",zv=".tooltip-inner",oh=`.${Kv}`,ah="hide.bs.modal",us="hover",ba="focus",Ra="click",Gv="manual",Yv="hide",Qv="hidden",Xv="show",Jv="shown",Zv="inserted",eT="click",tT="focusin",nT="focusout",rT="mouseenter",sT="mouseleave",iT={AUTO:"auto",TOP:"top",RIGHT:Ge()?"left":"right",BOTTOM:"bottom",LEFT:Ge()?"right":"left"},oT={allowList:Bf,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},aT={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class qn extends st{constructor(e,t){if(typeof pf>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");super(e,t),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return oT}static get DefaultType(){return aT}static get NAME(){return Hv}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),N.off(this._element.closest(oh),ah,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const e=N.trigger(this._element,this.constructor.eventName(Xv)),r=(_f(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(e.defaultPrevented||!r)return;this._disposePopper();const s=this._getTipElement();this._element.setAttribute("aria-describedby",s.getAttribute("id"));const{container:i}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(i.append(s),N.trigger(this._element,this.constructor.eventName(Zv))),this._popper=this._createPopper(s),s.classList.add(Di),"ontouchstart"in document.documentElement)for(const c of[].concat(...document.body.children))N.on(c,"mouseover",to);const a=()=>{N.trigger(this._element,this.constructor.eventName(Jv)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(a,this.tip,this._isAnimated())}hide(){if(!this._isShown()||N.trigger(this._element,this.constructor.eventName(Yv)).defaultPrevented)return;if(this._getTipElement().classList.remove(Di),"ontouchstart"in document.documentElement)for(const s of[].concat(...document.body.children))N.off(s,"mouseover",to);this._activeTrigger[Ra]=!1,this._activeTrigger[ba]=!1,this._activeTrigger[us]=!1,this._isHovered=null;const r=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),N.trigger(this._element,this.constructor.eventName(Qv)))};this._queueCallback(r,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(e){const t=this._getTemplateFactory(e).toHtml();if(!t)return null;t.classList.remove(Ia,Di),t.classList.add(`bs-${this.constructor.NAME}-auto`);const r=G_(this.constructor.NAME).toString();return t.setAttribute("id",r),this._isAnimated()&&t.classList.add(Ia),t}setContent(e){this._newContent=e,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(e){return this._templateFactory?this._templateFactory.changeContent(e):this._templateFactory=new qv({...this._config,content:e,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[zv]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(e){return this.constructor.getOrCreateInstance(e.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(Ia)}_isShown(){return this.tip&&this.tip.classList.contains(Di)}_createPopper(e){const t=Me(this._config.placement,[this,e,this._element]),r=iT[t.toUpperCase()];return Dc(this._element,e,this._getPopperConfig(r))}_getOffset(){const{offset:e}=this._config;return typeof e=="string"?e.split(",").map(t=>Number.parseInt(t,10)):typeof e=="function"?t=>e(t,this._element):e}_resolvePossibleFunction(e){return Me(e,[this._element,this._element])}_getPopperConfig(e){const t={placement:e,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:r=>{this._getTipElement().setAttribute("data-popper-placement",r.state.placement)}}]};return{...t,...Me(this._config.popperConfig,[void 0,t])}}_setListeners(){const e=this._config.trigger.split(" ");for(const t of e)if(t==="click")N.on(this._element,this.constructor.eventName(eT),this._config.selector,r=>{const s=this._initializeOnDelegatedTarget(r);s._activeTrigger[Ra]=!(s._isShown()&&s._activeTrigger[Ra]),s.toggle()});else if(t!==Gv){const r=t===us?this.constructor.eventName(rT):this.constructor.eventName(tT),s=t===us?this.constructor.eventName(sT):this.constructor.eventName(nT);N.on(this._element,r,this._config.selector,i=>{const a=this._initializeOnDelegatedTarget(i);a._activeTrigger[i.type==="focusin"?ba:us]=!0,a._enter()}),N.on(this._element,s,this._config.selector,i=>{const a=this._initializeOnDelegatedTarget(i);a._activeTrigger[i.type==="focusout"?ba:us]=a._element.contains(i.relatedTarget),a._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},N.on(this._element.closest(oh),ah,this._hideModalHandler)}_fixTitle(){const e=this._element.getAttribute("title");e&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",e),this._element.setAttribute("data-bs-original-title",e),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(e,t)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(e){const t=St.getDataAttributes(this._element);for(const r of Object.keys(t))Wv.has(r)&&delete t[r];return e={...t,...typeof e=="object"&&e?e:{}},e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e.container=e.container===!1?document.body:nn(e.container),typeof e.delay=="number"&&(e.delay={show:e.delay,hide:e.delay}),typeof e.title=="number"&&(e.title=e.title.toString()),typeof e.content=="number"&&(e.content=e.content.toString()),e}_getDelegateConfig(){const e={};for(const[t,r]of Object.entries(this._config))this.constructor.Default[t]!==r&&(e[t]=r);return e.selector=!1,e.trigger="manual",e}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(e){return this.each(function(){const t=qn.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e]()}})}}Qe(qn);const cT="popover",lT=".popover-header",uT=".popover-body",hT={...qn.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},dT={...qn.DefaultType,content:"(null|string|element|function)"};class Io extends qn{static get Default(){return hT}static get DefaultType(){return dT}static get NAME(){return cT}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[lT]:this._getTitle(),[uT]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(e){return this.each(function(){const t=Io.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e]()}})}}Qe(Io);const fT="scrollspy",pT="bs.scrollspy",Mc=`.${pT}`,mT=".data-api",gT=`activate${Mc}`,ch=`click${Mc}`,_T=`load${Mc}${mT}`,yT="dropdown-item",sr="active",ET='[data-bs-spy="scroll"]',Sa="[href]",vT=".nav, .list-group",lh=".nav-link",TT=".nav-item",wT=".list-group-item",AT=`${lh}, ${TT} > ${lh}, ${wT}`,IT=".dropdown",bT=".dropdown-toggle",RT={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},ST={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class Ws extends st{constructor(e,t){super(e,t),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return RT}static get DefaultType(){return ST}static get NAME(){return fT}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const e of this._observableSections.values())this._observer.observe(e)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(e){return e.target=nn(e.target)||document.body,e.rootMargin=e.offset?`${e.offset}px 0px -30%`:e.rootMargin,typeof e.threshold=="string"&&(e.threshold=e.threshold.split(",").map(t=>Number.parseFloat(t))),e}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(N.off(this._config.target,ch),N.on(this._config.target,ch,Sa,e=>{const t=this._observableSections.get(e.target.hash);if(t){e.preventDefault();const r=this._rootElement||window,s=t.offsetTop-this._element.offsetTop;if(r.scrollTo){r.scrollTo({top:s,behavior:"smooth"});return}r.scrollTop=s}}))}_getNewObserver(){const e={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(t=>this._observerCallback(t),e)}_observerCallback(e){const t=a=>this._targetLinks.get(`#${a.target.id}`),r=a=>{this._previousScrollData.visibleEntryTop=a.target.offsetTop,this._process(t(a))},s=(this._rootElement||document.documentElement).scrollTop,i=s>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=s;for(const a of e){if(!a.isIntersecting){this._activeTarget=null,this._clearActiveClass(t(a));continue}const c=a.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(i&&c){if(r(a),!s)return;continue}!i&&!c&&r(a)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const e=j.find(Sa,this._config.target);for(const t of e){if(!t.hash||rn(t))continue;const r=j.findOne(decodeURI(t.hash),this._element);Lr(r)&&(this._targetLinks.set(decodeURI(t.hash),t),this._observableSections.set(t.hash,r))}}_process(e){this._activeTarget!==e&&(this._clearActiveClass(this._config.target),this._activeTarget=e,e.classList.add(sr),this._activateParents(e),N.trigger(this._element,gT,{relatedTarget:e}))}_activateParents(e){if(e.classList.contains(yT)){j.findOne(bT,e.closest(IT)).classList.add(sr);return}for(const t of j.parents(e,vT))for(const r of j.prev(t,AT))r.classList.add(sr)}_clearActiveClass(e){e.classList.remove(sr);const t=j.find(`${Sa}.${sr}`,e);for(const r of t)r.classList.remove(sr)}static jQueryInterface(e){return this.each(function(){const t=Ws.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}N.on(window,_T,()=>{for(const n of j.find(ET))Ws.getOrCreateInstance(n)});Qe(Ws);const CT="tab",PT="bs.tab",Hn=`.${PT}`,OT=`hide${Hn}`,NT=`hidden${Hn}`,DT=`show${Hn}`,kT=`shown${Hn}`,LT=`click${Hn}`,VT=`keydown${Hn}`,MT=`load${Hn}`,xT="ArrowLeft",uh="ArrowRight",UT="ArrowUp",hh="ArrowDown",Ca="Home",dh="End",bn="active",fh="fade",Pa="show",FT="dropdown",jf=".dropdown-toggle",$T=".dropdown-menu",Oa=`:not(${jf})`,BT='.list-group, .nav, [role="tablist"]',jT=".nav-item, .list-group-item",qT=`.nav-link${Oa}, .list-group-item${Oa}, [role="tab"]${Oa}`,qf='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',Na=`${qT}, ${qf}`,HT=`.${bn}[data-bs-toggle="tab"], .${bn}[data-bs-toggle="pill"], .${bn}[data-bs-toggle="list"]`;class Vn extends st{constructor(e){super(e),this._parent=this._element.closest(BT),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),N.on(this._element,VT,t=>this._keydown(t)))}static get NAME(){return CT}show(){const e=this._element;if(this._elemIsActive(e))return;const t=this._getActiveElem(),r=t?N.trigger(t,OT,{relatedTarget:e}):null;N.trigger(e,DT,{relatedTarget:t}).defaultPrevented||r&&r.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,t){if(!e)return;e.classList.add(bn),this._activate(j.getElementFromSelector(e));const r=()=>{if(e.getAttribute("role")!=="tab"){e.classList.add(Pa);return}e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),N.trigger(e,kT,{relatedTarget:t})};this._queueCallback(r,e,e.classList.contains(fh))}_deactivate(e,t){if(!e)return;e.classList.remove(bn),e.blur(),this._deactivate(j.getElementFromSelector(e));const r=()=>{if(e.getAttribute("role")!=="tab"){e.classList.remove(Pa);return}e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),N.trigger(e,NT,{relatedTarget:t})};this._queueCallback(r,e,e.classList.contains(fh))}_keydown(e){if(![xT,uh,UT,hh,Ca,dh].includes(e.key))return;e.stopPropagation(),e.preventDefault();const t=this._getChildren().filter(s=>!rn(s));let r;if([Ca,dh].includes(e.key))r=t[e.key===Ca?0:t.length-1];else{const s=[uh,hh].includes(e.key);r=kc(t,e.target,s,!0)}r&&(r.focus({preventScroll:!0}),Vn.getOrCreateInstance(r).show())}_getChildren(){return j.find(Na,this._parent)}_getActiveElem(){return this._getChildren().find(e=>this._elemIsActive(e))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist");for(const r of t)this._setInitialAttributesOnChild(r)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e);const t=this._elemIsActive(e),r=this._getOuterElement(e);e.setAttribute("aria-selected",t),r!==e&&this._setAttributeIfNotExists(r,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){const t=j.getElementFromSelector(e);t&&(this._setAttributeIfNotExists(t,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(t,"aria-labelledby",`${e.id}`))}_toggleDropDown(e,t){const r=this._getOuterElement(e);if(!r.classList.contains(FT))return;const s=(i,a)=>{const c=j.findOne(i,r);c&&c.classList.toggle(a,t)};s(jf,bn),s($T,Pa),r.setAttribute("aria-expanded",t)}_setAttributeIfNotExists(e,t,r){e.hasAttribute(t)||e.setAttribute(t,r)}_elemIsActive(e){return e.classList.contains(bn)}_getInnerElement(e){return e.matches(Na)?e:j.findOne(Na,e)}_getOuterElement(e){return e.closest(jT)||e}static jQueryInterface(e){return this.each(function(){const t=Vn.getOrCreateInstance(this);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}N.on(document,LT,qf,function(n){["A","AREA"].includes(this.tagName)&&n.preventDefault(),!rn(this)&&Vn.getOrCreateInstance(this).show()});N.on(window,MT,()=>{for(const n of j.find(HT))Vn.getOrCreateInstance(n)});Qe(Vn);const WT="toast",KT="bs.toast",hn=`.${KT}`,zT=`mouseover${hn}`,GT=`mouseout${hn}`,YT=`focusin${hn}`,QT=`focusout${hn}`,XT=`hide${hn}`,JT=`hidden${hn}`,ZT=`show${hn}`,ew=`shown${hn}`,tw="fade",ph="hide",ki="show",Li="showing",nw={animation:"boolean",autohide:"boolean",delay:"number"},rw={animation:!0,autohide:!0,delay:5e3};class Ks extends st{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return rw}static get DefaultType(){return nw}static get NAME(){return WT}show(){if(N.trigger(this._element,ZT).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(tw);const t=()=>{this._element.classList.remove(Li),N.trigger(this._element,ew),this._maybeScheduleHide()};this._element.classList.remove(ph),$s(this._element),this._element.classList.add(ki,Li),this._queueCallback(t,this._element,this._config.animation)}hide(){if(!this.isShown()||N.trigger(this._element,XT).defaultPrevented)return;const t=()=>{this._element.classList.add(ph),this._element.classList.remove(Li,ki),N.trigger(this._element,JT)};this._element.classList.add(Li),this._queueCallback(t,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(ki),super.dispose()}isShown(){return this._element.classList.contains(ki)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=t;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=t;break}}if(t){this._clearTimeout();return}const r=e.relatedTarget;this._element===r||this._element.contains(r)||this._maybeScheduleHide()}_setListeners(){N.on(this._element,zT,e=>this._onInteraction(e,!0)),N.on(this._element,GT,e=>this._onInteraction(e,!1)),N.on(this._element,YT,e=>this._onInteraction(e,!0)),N.on(this._element,QT,e=>this._onInteraction(e,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each(function(){const t=Ks.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}Ao(Ks);Qe(Ks);const sw=Object.freeze(Object.defineProperty({__proto__:null,Alert:js,Button:qs,Carousel:Mr,Collapse:wr,Dropdown:et,Modal:Ln,Offcanvas:Ot,Popover:Io,ScrollSpy:Ws,Tab:Vn,Toast:Ks,Tooltip:qn},Symbol.toStringTag,{value:"Module"}));function iw(){if("ontouchstart"in window||navigator.maxTouchPoints>0||window.innerWidth<992)return;let n=document.querySelector(".custom-cursor-dot"),e=document.querySelector(".custom-cursor-ring"),t=document.querySelector(".custom-cursor-text");(!n||!e)&&(n=document.createElement("div"),n.className="custom-cursor-dot",e=document.createElement("div"),e.className="custom-cursor-ring",t=document.createElement("span"),t.className="custom-cursor-text",t.textContent="VIEW",e.appendChild(t),document.body.appendChild(n),document.body.appendChild(e));let r=window.innerWidth/2,s=window.innerHeight/2,i=r,a=s;window.addEventListener("mousemove",h=>{r=h.clientX,s=h.clientY,n.style.transform=`translate3d(${r}px, ${s}px, 0)`});function c(){i+=(r-i)*.18,a+=(s-a)*.18,e.style.transform=`translate3d(${i}px, ${a}px, 0)`,requestAnimationFrame(c)}requestAnimationFrame(c);function l(){document.querySelectorAll("a, button, .btn, .filter-btn, .quantity-btn, .btn-close-custom, .nav-link, input, select, textarea").forEach(E=>{E.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover")),E.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"))}),document.querySelectorAll(".product-card, .product-card-image-wrap, .social-item, .gallery-main-img").forEach(E=>{E.addEventListener("mouseenter",()=>{t.textContent="VIEW",document.body.classList.add("cursor-view")}),E.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-view"))}),document.querySelectorAll(".hero-cta-btn, .featured-cta-btn, .category-panel").forEach(E=>{E.addEventListener("mouseenter",()=>{t.textContent="EXPLORE",document.body.classList.add("cursor-explore")}),E.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-explore"))})}return l(),document.addEventListener("mouseleave",()=>{n.style.opacity="0",e.style.opacity="0"}),document.addEventListener("mouseenter",()=>{n.style.opacity="1",e.style.opacity="1"}),{updateCursorTriggers:l}}function ow(){const n=document.querySelector(".xoroniq-navbar");if(!n)return;const e=()=>{window.scrollY>40?n.classList.add("nav-scrolled"):n.classList.remove("nav-scrolled")};window.addEventListener("scroll",e,{passive:!0}),e()}function aw(n=document){const e=n.querySelectorAll(".reveal:not(.is-revealed)");if(!e.length)return;if(window.innerWidth<768||"ontouchstart"in window||navigator.maxTouchPoints>0){e.forEach((s,i)=>{setTimeout(()=>s.classList.add("is-revealed"),i*30)});return}const r=new IntersectionObserver((s,i)=>{s.forEach(a=>{a.isIntersecting&&(a.target.classList.add("is-revealed"),i.unobserve(a.target))})},{root:null,threshold:.05,rootMargin:"0px 0px 50px 0px"});e.forEach(s=>r.observe(s))}function cw(){if(window.innerWidth<992)return;document.querySelectorAll("[data-tilt]").forEach(e=>{const t=e.querySelector("[data-tilt-target]")||e;e.addEventListener("mousemove",r=>{const s=e.getBoundingClientRect(),i=r.clientX-s.left,a=r.clientY-s.top,c=s.width/2,l=s.height/2,h=(a-l)/l*-12,f=(i-c)/c*12;t.style.transform=`perspective(1000px) rotateX(${h}deg) rotateY(${f}deg) scale3d(1.03, 1.03, 1.03)`}),e.addEventListener("mouseleave",()=>{t.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"})})}function lw(){const n=document.querySelectorAll(".stat-counter");if(!n.length)return;const e=new IntersectionObserver((t,r)=>{t.forEach(s=>{if(s.isIntersecting){let I=function(C){const O=C-E,S=Math.min(O/g,1);f=(1-Math.pow(1-S,3))*a,h?i.textContent=`${c}${f.toFixed(1)}${l}`:i.textContent=`${c}${Math.floor(f)}${l}`,S<1?requestAnimationFrame(I):i.textContent=`${c}${a}${l}`};const i=s.target,a=parseFloat(i.getAttribute("data-target"))||0,c=i.getAttribute("data-prefix")||"",l=i.getAttribute("data-suffix")||"",h=i.getAttribute("data-decimal")==="true";let f=0;const g=1800,E=performance.now();requestAnimationFrame(I),r.unobserve(i)}})},{threshold:.25});n.forEach(t=>e.observe(t))}const Tt={RAZORPAY_KEY_ID:"rzp_live_TWJriH4XFtLA4T",FIREBASE:{apiKey:"AIzaSyAIeLh3I9tPRtHCPCFszon4yaJAxrbLetE",authDomain:"marketing-website-45737.firebaseapp.com",projectId:"marketing-website-45737",storageBucket:"marketing-website-45737.firebasestorage.app",messagingSenderId:"1042908231312",appId:"1:1042908231312:web:de65221312f1673e328a15"},STORE:{NAME:"XORONIQ Car Care",CURRENCY:"₹",FREE_SHIPPING_THRESHOLD:2e3,STANDARD_SHIPPING_FEE:80,LOCAL_SHIPPING_FEE:40,LOCAL_PINCODE_BASE:"676306"}};function Ke(n){return typeof n!="number"&&(n=parseFloat(n)||0),`${Tt.STORE.CURRENCY}${n.toLocaleString("en-IN")}`}function xc(n,e){return!e||e<=n?0:Math.round((e-n)/e*100)}function Hf(n){if(!n)return!1;const e=String(n).trim().replace(/\D/g,"");return e.length!==6?!1:!!(e===Tt.STORE.LOCAL_PINCODE_BASE||e==="676306"||e.startsWith("676")||["673634","673635","673636","673637","673638","673639","673641","673642","673633"].includes(e))}function uw(n){if(!n)return"N/A";let e;return n.toDate?e=n.toDate():n.seconds?e=new Date(n.seconds*1e3):e=new Date(n),e.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Wf(n){return n.toString().toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}function hw(){return`XOR-${Math.floor(1e5+Math.random()*9e5)}`}function zs(n){if(!n)return["CAR CARE"];if(Array.isArray(n.categories)&&n.categories.length>0)return n.categories.map(e=>String(e).trim().toUpperCase()).filter(Boolean);if(typeof n.category=="string"&&n.category.trim()){const e=n.category.split(/[,&/]+/).map(t=>t.trim().toUpperCase()).filter(Boolean);return e.length>0?e:[n.category.trim().toUpperCase()]}return["CAR CARE"]}function bo(n){const e=zs(n),t=e.some(a=>a.includes("CAR")),r=e.some(a=>a.includes("BIKE")),s=e.some(a=>a.includes("KIT")),i=e.some(a=>a.includes("ACCESSOR"));return t&&r?"CAR & BIKE":s?"KITS":t?"CAR CARE":r?"BIKE CARE":i?"ACCESSORIES":e[0]||"CAR CARE"}function Kf(n,e){if(!e||e==="ALL")return!0;const t=e.toUpperCase().trim();return zs(n).some(s=>!!(s===t||t.includes("CAR")&&s.includes("CAR")||t.includes("BIKE")&&s.includes("BIKE")||t.includes("KIT")&&s.includes("KIT")||t.includes("ACCESSOR")&&s.includes("ACCESSOR")||s.includes(t)||t.includes(s)))}function dw(n="KITS",e=""){const r=(Array.isArray(n)?n:typeof n=="string"?n.split(/[,&/]+/):["KITS"]).map(f=>String(f).trim().toUpperCase()),s=r.some(f=>f.includes("CAR")),i=r.some(f=>f.includes("BIKE")),a=r.some(f=>f.includes("KIT")),c=r.some(f=>f.includes("ACCESSOR"));let l="GEN";a?l="KIT":s&&i?l="CB":s?l="CC":i?l="BC":c&&(l="ACC");const h=Math.floor(1e3+Math.random()*9e3);return`XOR-${l}-${h}`}function zf(n,e){let t;return function(...s){const i=()=>{clearTimeout(t),n(...s)};clearTimeout(t),t=setTimeout(i,e)}}function Ro(n,e="info"){let t=document.getElementById("xoroniq-toast-container");t||(t=document.createElement("div"),t.id="xoroniq-toast-container",t.className="toast-container-custom",document.body.appendChild(t));const r={success:"bi-check-circle-fill text-success",error:"bi-exclamation-octagon-fill text-danger",warning:"bi-exclamation-triangle-fill text-warning",info:"bi-info-circle-fill text-accent"},s=document.createElement("div");s.className="toast-custom",s.innerHTML=`
    <i class="bi ${r[e]||r.info} fs-5"></i>
    <div class="toast-message font-heading fw-semibold small">${n}</div>
  `,t.appendChild(s),requestAnimationFrame(()=>{s.classList.add("show")}),setTimeout(()=>{s.classList.remove("show"),setTimeout(()=>{s.remove()},400)},3500)}function Gf(n,e=null){try{const t=localStorage.getItem(n);return t?JSON.parse(t):e}catch(t){return console.error(`Error reading from localStorage: ${n}`,t),e}}function Yf(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch(t){console.error(`Error writing to localStorage: ${n}`,t)}}const LP=Object.freeze(Object.defineProperty({__proto__:null,calculateDiscount:xc,debounce:zf,formatCategoryBadge:bo,formatCurrency:Ke,formatDate:uw,generateOrderId:hw,generateSku:dw,getProductCategories:zs,getStorage:Gf,isNearLocalPincode:Hf,matchesCategory:Kf,setStorage:Yf,showToast:Ro,slugify:Wf},Symbol.toStringTag,{value:"Module"})),Qf="xoroniq_cart";function Gs(){return Gf(Qf,[])}function So(n){Yf(Qf,n),Zf(),tp()}function Xf(n=null){const e=Gs(),t=e.reduce((l,h)=>l+(h.quantity||1),0),r=e.reduce((l,h)=>l+h.price*(h.quantity||1),0);let s=0,i=0,a=!1;r>0&&(r>=Tt.STORE.FREE_SHIPPING_THRESHOLD?(s=0,i=0):(n&&Hf(n)?(s=Tt.STORE.LOCAL_SHIPPING_FEE,a=!0):s=Tt.STORE.STANDARD_SHIPPING_FEE,i=Math.max(0,Tt.STORE.FREE_SHIPPING_THRESHOLD-r)));const c=r+s;return{count:t,subtotal:r,shipping:s,isLocalDelivery:a,freeShippingRemaining:i,total:c,freeShippingThreshold:Tt.STORE.FREE_SHIPPING_THRESHOLD}}function VP(n,e=1){const t=Gs(),r=t.findIndex(i=>i.id===n.id),s=Array.isArray(n.images)&&n.images.length>0?n.images[0]:n.image||"images/product/essentials.png";r>-1?t[r].quantity+=e:t.push({id:n.id,name:n.name,slug:n.slug||n.id,price:Number(n.price)||0,compareAtPrice:Number(n.compareAtPrice)||0,image:s,quantity:e,sku:n.sku||""}),So(t),Ro(`${n.name} added to cart`,"success"),ep()}function Jf(n){let e=Gs();e=e.filter(t=>t.id!==n),So(e),Ro("Item removed from cart","info")}function mh(n,e){const t=Gs(),r=t.find(s=>s.id===n);r&&(e<=0?Jf(n):(r.quantity=e,So(t)))}function MP(){So([])}function Zf(){const n=Xf();document.querySelectorAll(".badge-cart-count").forEach(t=>{t.textContent=n.count,t.style.display=n.count>0?"flex":"none",t.style.transform="scale(1.35)",setTimeout(()=>{t.style.transform="scale(1)"},250)})}function ep(){const n=document.getElementById("xoroniq-cart-drawer");n&&window.bootstrap&&window.bootstrap.Offcanvas&&window.bootstrap.Offcanvas.getOrCreateInstance(n).show()}function tp(){const n=document.getElementById("cart-drawer-items"),e=document.getElementById("cart-drawer-subtotal"),t=document.getElementById("cart-drawer-total"),r=document.getElementById("cart-drawer-shipping"),s=document.getElementById("cart-shipping-msg"),i=document.getElementById("cart-shipping-progress"),a=document.getElementById("cart-drawer-checkout-btn");if(!n)return;const c=Gs(),l=Xf();if(c.length===0){n.innerHTML=`
      <div class="text-center py-5">
        <i class="bi bi-bag-x text-muted-custom display-4 mb-3"></i>
        <h5 class="font-heading text-black fw-bold mb-2">YOUR CART IS EMPTY</h5>
        <p class="small text-muted-custom mb-4">Elevate your detailing arsenal with professional-grade care.</p>
        <a href="shop.html" class="btn btn-x-outline-accent btn-sm">EXPLORE COLLECTION</a>
      </div>
    `,a&&a.classList.add("disabled"),e&&(e.textContent=Ke(0)),r&&(r.textContent=Ke(0)),t&&(t.textContent=Ke(0)),s&&(s.innerHTML=`Free delivery on orders above <strong>${Ke(Tt.STORE.FREE_SHIPPING_THRESHOLD)}</strong>`),i&&(i.style.width="0%");return}if(a&&a.classList.remove("disabled"),n.innerHTML=c.map(h=>`
    <div class="cart-item" data-id="${h.id}">
      <img src="${h.image}" alt="${h.name}" class="cart-item-img" onerror="this.src='images/product/essentials.png'">
      <div class="cart-item-info">
        <div class="d-flex justify-content-between align-items-start">
          <div class="cart-item-title">${h.name}</div>
          <button class="btn btn-link text-muted-custom p-0 remove-item-btn" data-id="${h.id}" title="Remove Item">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="cart-item-price">${Ke(h.price)}</div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <div class="quantity-control">
            <button class="quantity-btn btn-qty-minus" data-id="${h.id}">-</button>
            <span class="quantity-value">${h.quantity}</span>
            <button class="quantity-btn btn-qty-plus" data-id="${h.id}">+</button>
          </div>
          <div class="font-mono text-black fw-bold small">
            ${Ke(h.price*h.quantity)}
          </div>
        </div>
      </div>
    </div>
  `).join(""),n.querySelectorAll(".remove-item-btn").forEach(h=>{h.addEventListener("click",()=>Jf(h.getAttribute("data-id")))}),n.querySelectorAll(".btn-qty-minus").forEach(h=>{h.addEventListener("click",()=>{const f=h.getAttribute("data-id"),g=c.find(E=>E.id===f);g&&mh(f,g.quantity-1)})}),n.querySelectorAll(".btn-qty-plus").forEach(h=>{h.addEventListener("click",()=>{const f=h.getAttribute("data-id"),g=c.find(E=>E.id===f);g&&mh(f,g.quantity+1)})}),e&&(e.textContent=Ke(l.subtotal)),r&&(r.textContent=l.shipping===0?"FREE":Ke(l.shipping)),t&&(t.textContent=Ke(l.total)),s&&i)if(l.freeShippingRemaining>0){const h=Math.min(100,Math.round(l.subtotal/l.freeShippingThreshold*100));i.style.width=`${h}%`,s.innerHTML=`Add <strong>${Ke(l.freeShippingRemaining)}</strong> more to get <strong>FREE SHIPPING</strong>`}else i.style.width="100%",s.innerHTML='<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i> YOU HAVE UNLOCKED FREE SHIPPING!</span>'}var gh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},fw=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},rp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,g=(i&3)<<4|c>>4;let E=(c&15)<<2|h>>6,I=h&63;l||(I=64,a||(E=64)),r.push(t[f],t[g],t[E],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(np(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):fw(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const g=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||g==null)throw new pw;const E=i<<2|c>>4;if(r.push(E),h!==64){const I=c<<4&240|h>>2;if(r.push(I),g!==64){const C=h<<6&192|g;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class pw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const mw=function(n){const e=np(n);return rp.encodeByteArray(e,!0)},so=function(n){return mw(n).replace(/\./g,"")},sp=function(n){try{return rp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w=()=>gw().__FIREBASE_DEFAULTS__,yw=()=>{if(typeof process>"u"||typeof gh>"u")return;const n=gh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ew=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&sp(n[1]);return e&&JSON.parse(e)},Co=()=>{try{return _w()||yw()||Ew()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ip=n=>{var e,t;return(t=(e=Co())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},op=n=>{const e=ip(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ap=()=>{var n;return(n=Co())===null||n===void 0?void 0:n.config},cp=n=>{var e;return(e=Co())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[so(JSON.stringify(t)),so(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Tw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ce())}function ww(){var n;const e=(n=Co())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Aw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Iw(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function bw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Rw(){const n=Ce();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Sw(){return!ww()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Cw(){try{return typeof indexedDB=="object"}catch{return!1}}function Pw(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ow="FirebaseError";class gt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ow,Object.setPrototypeOf(this,gt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ys.prototype.create)}}class Ys{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Nw(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new gt(s,c,r)}}function Nw(n,e){return n.replace(Dw,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Dw=/\{\$([^}]+)}/g;function kw(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function io(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(_h(i)&&_h(a)){if(!io(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function _h(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function fs(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ps(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Lw(n,e){const t=new Vw(n,e);return t.subscribe.bind(t)}class Vw{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Mw(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Da),s.error===void 0&&(s.error=Da),s.complete===void 0&&(s.complete=Da);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Mw(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Da(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n){return n&&n._delegate?n._delegate:n}class sn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new vw;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fw(e))try{this.getOrInitializeService({instanceIdentifier:An})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=An){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=An){return this.instances.has(e)}getOptions(e=An){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Uw(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=An){return this.component?this.component.multipleInstances?e:An:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Uw(n){return n===An?void 0:n}function Fw(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $w{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new xw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Bw={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},jw=Y.INFO,qw={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},Hw=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=qw[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Uc{constructor(e){this.name=e,this._logLevel=jw,this._logHandler=Hw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Bw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const Ww=(n,e)=>e.some(t=>n instanceof t);let yh,Eh;function Kw(){return yh||(yh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zw(){return Eh||(Eh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const up=new WeakMap,Ja=new WeakMap,hp=new WeakMap,ka=new WeakMap,Fc=new WeakMap;function Gw(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Xt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&up.set(t,n)}).catch(()=>{}),Fc.set(e,n),e}function Yw(n){if(Ja.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Ja.set(n,e)}let Za={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ja.get(n);if(e==="objectStoreNames")return n.objectStoreNames||hp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Xt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Qw(n){Za=n(Za)}function Xw(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(La(this),e,...t);return hp.set(r,e.sort?e.sort():[e]),Xt(r)}:zw().includes(n)?function(...e){return n.apply(La(this),e),Xt(up.get(this))}:function(...e){return Xt(n.apply(La(this),e))}}function Jw(n){return typeof n=="function"?Xw(n):(n instanceof IDBTransaction&&Yw(n),Ww(n,Kw())?new Proxy(n,Za):n)}function Xt(n){if(n instanceof IDBRequest)return Gw(n);if(ka.has(n))return ka.get(n);const e=Jw(n);return e!==n&&(ka.set(n,e),Fc.set(e,n)),e}const La=n=>Fc.get(n);function Zw(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Xt(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Xt(a.result),l.oldVersion,l.newVersion,Xt(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const eA=["get","getKey","getAll","getAllKeys","count"],tA=["put","add","delete","clear"],Va=new Map;function vh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Va.get(e))return Va.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=tA.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||eA.includes(t)))return;const i=async function(a,...c){const l=this.transaction(a,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return Va.set(e,i),i}Qw(n=>({...n,get:(e,t,r)=>vh(e,t)||n.get(e,t,r),has:(e,t)=>!!vh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(rA(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function rA(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ec="@firebase/app",Th="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt=new Uc("@firebase/app"),sA="@firebase/app-compat",iA="@firebase/analytics-compat",oA="@firebase/analytics",aA="@firebase/app-check-compat",cA="@firebase/app-check",lA="@firebase/auth",uA="@firebase/auth-compat",hA="@firebase/database",dA="@firebase/data-connect",fA="@firebase/database-compat",pA="@firebase/functions",mA="@firebase/functions-compat",gA="@firebase/installations",_A="@firebase/installations-compat",yA="@firebase/messaging",EA="@firebase/messaging-compat",vA="@firebase/performance",TA="@firebase/performance-compat",wA="@firebase/remote-config",AA="@firebase/remote-config-compat",IA="@firebase/storage",bA="@firebase/storage-compat",RA="@firebase/firestore",SA="@firebase/vertexai-preview",CA="@firebase/firestore-compat",PA="firebase",OA="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tc="[DEFAULT]",NA={[ec]:"fire-core",[sA]:"fire-core-compat",[oA]:"fire-analytics",[iA]:"fire-analytics-compat",[cA]:"fire-app-check",[aA]:"fire-app-check-compat",[lA]:"fire-auth",[uA]:"fire-auth-compat",[hA]:"fire-rtdb",[dA]:"fire-data-connect",[fA]:"fire-rtdb-compat",[pA]:"fire-fn",[mA]:"fire-fn-compat",[gA]:"fire-iid",[_A]:"fire-iid-compat",[yA]:"fire-fcm",[EA]:"fire-fcm-compat",[vA]:"fire-perf",[TA]:"fire-perf-compat",[wA]:"fire-rc",[AA]:"fire-rc-compat",[IA]:"fire-gcs",[bA]:"fire-gcs-compat",[RA]:"fire-fst",[CA]:"fire-fst-compat",[SA]:"fire-vertex","fire-js":"fire-js",[PA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss=new Map,DA=new Map,nc=new Map;function wh(n,e){try{n.container.addComponent(e)}catch(t){Nt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Mn(n){const e=n.name;if(nc.has(e))return Nt.debug(`There were multiple attempts to register component ${e}.`),!1;nc.set(e,n);for(const t of Ss.values())wh(t,n);for(const t of DA.values())wh(t,n);return!0}function Po(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function wt(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Jt=new Ys("app","Firebase",kA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LA{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new sn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Jt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=OA;function dp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:tc,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Jt.create("bad-app-name",{appName:String(s)});if(t||(t=ap()),!t)throw Jt.create("no-options");const i=Ss.get(s);if(i){if(io(t,i.options)&&io(r,i.config))return i;throw Jt.create("duplicate-app",{appName:s})}const a=new $w(s);for(const l of nc.values())a.addComponent(l);const c=new LA(t,r,a);return Ss.set(s,c),c}function $c(n=tc){const e=Ss.get(n);if(!e&&n===tc&&ap())return dp();if(!e)throw Jt.create("no-app",{appName:n});return e}function Ah(){return Array.from(Ss.values())}function lt(n,e,t){var r;let s=(r=NA[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const c=[`Unable to register library "${s}" with version "${e}":`];i&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Nt.warn(c.join(" "));return}Mn(new sn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VA="firebase-heartbeat-database",MA=1,Cs="firebase-heartbeat-store";let Ma=null;function fp(){return Ma||(Ma=Zw(VA,MA,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Cs)}catch(t){console.warn(t)}}}}).catch(n=>{throw Jt.create("idb-open",{originalErrorMessage:n.message})})),Ma}async function xA(n){try{const t=(await fp()).transaction(Cs),r=await t.objectStore(Cs).get(pp(n));return await t.done,r}catch(e){if(e instanceof gt)Nt.warn(e.message);else{const t=Jt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Nt.warn(t.message)}}}async function Ih(n,e){try{const r=(await fp()).transaction(Cs,"readwrite");await r.objectStore(Cs).put(e,pp(n)),await r.done}catch(t){if(t instanceof gt)Nt.warn(t.message);else{const r=Jt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Nt.warn(r.message)}}}function pp(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UA=1024,FA=30*24*60*60*1e3;class $A{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new jA(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=bh();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=FA}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Nt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=bh(),{heartbeatsToSend:r,unsentEntries:s}=BA(this._heartbeatsCache.heartbeats),i=so(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Nt.warn(t),""}}}function bh(){return new Date().toISOString().substring(0,10)}function BA(n,e=UA){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Rh(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Rh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class jA{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Cw()?Pw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await xA(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ih(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ih(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Rh(n){return so(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qA(n){Mn(new sn("platform-logger",e=>new nA(e),"PRIVATE")),Mn(new sn("heartbeat",e=>new $A(e),"PRIVATE")),lt(ec,Th,n),lt(ec,Th,"esm2017"),lt("fire-js","")}qA("");var HA="firebase",WA="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */lt(HA,WA,"app");function Bc(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function mp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const KA=mp,gp=new Ys("auth","Firebase",mp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oo=new Uc("@firebase/auth");function zA(n,...e){oo.logLevel<=Y.WARN&&oo.warn(`Auth (${Wn}): ${n}`,...e)}function Wi(n,...e){oo.logLevel<=Y.ERROR&&oo.error(`Auth (${Wn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,...e){throw jc(n,...e)}function ut(n,...e){return jc(n,...e)}function _p(n,e,t){const r=Object.assign(Object.assign({},KA()),{[e]:t});return new Ys("auth","Firebase",r).create(e,{appName:n.name})}function Zt(n){return _p(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function jc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return gp.create(n,...e)}function q(n,e,...t){if(!n)throw jc(e,...t)}function At(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Wi(e),new Error(e)}function Dt(n,e){n||At(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function GA(){return Sh()==="http:"||Sh()==="https:"}function Sh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(GA()||Iw()||"connection"in navigator)?navigator.onLine:!0}function QA(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t){this.shortDelay=e,this.longDelay=t,Dt(t>e,"Short delay should be less than long delay!"),this.isMobile=Tw()||bw()}get(){return YA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(n,e){Dt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;At("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;At("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;At("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JA=new Xs(3e4,6e4);function dn(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function xt(n,e,t,r,s={}){return Ep(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Qs(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:l},i);return Aw()||(h.referrerPolicy="no-referrer"),yp.fetch()(vp(n,n.config.apiHost,t,c),h)})}async function Ep(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},XA),e);try{const s=new eI(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Vi(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Vi(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Vi(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Vi(n,"user-disabled",a);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw _p(n,f,h);nt(n,f)}}catch(s){if(s instanceof gt)throw s;nt(n,"network-request-failed",{message:String(s)})}}async function Oo(n,e,t,r,s={}){const i=await xt(n,e,t,r,s);return"mfaPendingCredential"in i&&nt(n,"multi-factor-auth-required",{_serverResponse:i}),i}function vp(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?qc(n.config,s):`${n.config.apiScheme}://${s}`}function ZA(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class eI{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ut(this.auth,"network-request-failed")),JA.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Vi(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ut(n,e,r);return s.customData._tokenResponse=t,s}function Ch(n){return n!==void 0&&n.enterprise!==void 0}class tI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ZA(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function nI(n,e){return xt(n,"GET","/v2/recaptchaConfig",dn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rI(n,e){return xt(n,"POST","/v1/accounts:delete",e)}async function Tp(n,e){return xt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function sI(n,e=!1){const t=ie(n),r=await t.getIdToken(e),s=Hc(r);q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ts(xa(s.auth_time)),issuedAtTime:Ts(xa(s.iat)),expirationTime:Ts(xa(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function xa(n){return Number(n)*1e3}function Hc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Wi("JWT malformed, contained fewer than 3 sections"),null;try{const s=sp(t);return s?JSON.parse(s):(Wi("Failed to decode base64 JWT payload"),null)}catch(s){return Wi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Ph(n){const e=Hc(n);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ps(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof gt&&iI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function iI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ts(this.lastLoginAt),this.creationTime=Ts(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ao(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Ps(n,Tp(t,{idToken:r}));q(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];n._notifyReloadListener(i);const a=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?wp(i.providerUserInfo):[],c=cI(n.providerData,a),l=n.isAnonymous,h=!(n.email&&i.passwordHash)&&!(c!=null&&c.length),f=l?h:!1,g={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:c,metadata:new sc(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(n,g)}async function aI(n){const e=ie(n);await ao(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function cI(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function wp(n){return n.map(e=>{var{providerId:t}=e,r=Bc(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lI(n,e){const t=await Ep(n,{},async()=>{const r=Qs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=vp(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",yp.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function uI(n,e){return xt(n,"POST","/v2/accounts:revokeToken",dn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ph(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=Ph(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await lI(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new fr;return r&&(q(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(q(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(q(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new fr,this.toJSON())}_performRefresh(){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(n,e){q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class It{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,i=Bc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new oI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new sc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Ps(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return sI(this,e)}reload(){return aI(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new It(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ao(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(wt(this.auth.app))return Promise.reject(Zt(this.auth));const e=await this.getIdToken();return await Ps(this,rI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,i,a,c,l,h,f;const g=(r=t.displayName)!==null&&r!==void 0?r:void 0,E=(s=t.email)!==null&&s!==void 0?s:void 0,I=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,C=(a=t.photoURL)!==null&&a!==void 0?a:void 0,O=(c=t.tenantId)!==null&&c!==void 0?c:void 0,S=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,M=(h=t.createdAt)!==null&&h!==void 0?h:void 0,F=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:x,emailVerified:L,isAnonymous:H,providerData:$,stsTokenManager:T}=t;q(x&&T,e,"internal-error");const m=fr.fromJSON(this.name,T);q(typeof x=="string",e,"internal-error"),Ht(g,e.name),Ht(E,e.name),q(typeof L=="boolean",e,"internal-error"),q(typeof H=="boolean",e,"internal-error"),Ht(I,e.name),Ht(C,e.name),Ht(O,e.name),Ht(S,e.name),Ht(M,e.name),Ht(F,e.name);const _=new It({uid:x,auth:e,email:E,emailVerified:L,displayName:g,isAnonymous:H,photoURL:C,phoneNumber:I,tenantId:O,stsTokenManager:m,createdAt:M,lastLoginAt:F});return $&&Array.isArray($)&&(_.providerData=$.map(v=>Object.assign({},v))),S&&(_._redirectEventId=S),_}static async _fromIdTokenResponse(e,t,r=!1){const s=new fr;s.updateFromServerResponse(t);const i=new It({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ao(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?wp(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new fr;c.updateFromIdToken(r);const l=new It({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new sc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=new Map;function bt(n){Dt(n instanceof Function,"Expected a class definition");let e=Oh.get(n);return e?(Dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Oh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ap{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ap.type="NONE";const Nh=Ap;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(n,e,t){return`firebase:${n}:${e}:${t}`}class pr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ki(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ki("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?It._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new pr(bt(Nh),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||bt(Nh);const a=Ki(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){const g=It._fromJSON(e,f);h!==i&&(c=g),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new pr(i,e,r):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new pr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Sp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ip(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pp(e))return"Blackberry";if(Op(e))return"Webos";if(bp(e))return"Safari";if((e.includes("chrome/")||Rp(e))&&!e.includes("edge/"))return"Chrome";if(Cp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ip(n=Ce()){return/firefox\//i.test(n)}function bp(n=Ce()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Rp(n=Ce()){return/crios\//i.test(n)}function Sp(n=Ce()){return/iemobile/i.test(n)}function Cp(n=Ce()){return/android/i.test(n)}function Pp(n=Ce()){return/blackberry/i.test(n)}function Op(n=Ce()){return/webos/i.test(n)}function Wc(n=Ce()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function hI(n=Ce()){var e;return Wc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function dI(){return Rw()&&document.documentMode===10}function Np(n=Ce()){return Wc(n)||Cp(n)||Op(n)||Pp(n)||/windows phone/i.test(n)||Sp(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(n,e=[]){let t;switch(n){case"Browser":t=Dh(Ce());break;case"Worker":t=`${Dh(Ce())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Wn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pI(n,e={}){return xt(n,"GET","/v2/passwordPolicy",dn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI=6;class gI{constructor(e){var t,r,s,i;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:mI,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,i,a,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(i=l.containsUppercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new kh(this),this.idTokenSubscription=new kh(this),this.beforeStateQueue=new fI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=bt(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await pr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Tp(this,{idToken:e}),r=await It._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(wt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(s=l.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ao(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=QA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(wt(this.app))return Promise.reject(Zt(this));const t=e?ie(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return wt(this.app)?Promise.reject(Zt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return wt(this.app)?Promise.reject(Zt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(bt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await pI(this),t=new gI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ys("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await uI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&bt(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await pr.create(this,[bt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&zA(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Kn(n){return ie(n)}class kh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Lw(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let No={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function yI(n){No=n}function kp(n){return No.loadJS(n)}function EI(){return No.recaptchaEnterpriseScript}function vI(){return No.gapiScript}function TI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const wI="recaptcha-enterprise",AI="NO_RECAPTCHA";class II{constructor(e){this.type=wI,this.auth=Kn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{nI(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new tI(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,a,c){const l=window.grecaptcha;Ch(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(AI)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&Ch(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=EI();l.length!==0&&(l+=c),kp(l).then(()=>{s(c,i,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function Lh(n,e,t,r=!1){const s=new II(n);let i;try{i=await s.verify(t)}catch{i=await s.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:i}):Object.assign(a,{captchaResponse:i}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ic(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Lh(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Lh(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(n,e){const t=Po(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(io(i,e??{}))return s;nt(s,"already-initialized")}return t.initialize({options:e})}function RI(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(bt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function SI(n,e,t){const r=Kn(n);q(r._canInitEmulator,r,"emulator-config-failed"),q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Lp(e),{host:a,port:c}=CI(e),l=c===null?"":`:${c}`;r.config.emulator={url:`${i}//${a}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),PI()}function Lp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function CI(n){const e=Lp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Vh(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Vh(a)}}}function Vh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function PI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return At("not implemented")}_getIdTokenResponse(e){return At("not implemented")}_linkToIdToken(e,t){return At("not implemented")}_getReauthenticationResolver(e){return At("not implemented")}}async function OI(n,e){return xt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NI(n,e){return Oo(n,"POST","/v1/accounts:signInWithPassword",dn(n,e))}async function DI(n,e){return xt(n,"POST","/v1/accounts:sendOobCode",dn(n,e))}async function kI(n,e){return DI(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(n,e){return Oo(n,"POST","/v1/accounts:signInWithEmailLink",dn(n,e))}async function VI(n,e){return Oo(n,"POST","/v1/accounts:signInWithEmailLink",dn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends Kc{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Os(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Os(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ic(e,t,"signInWithPassword",NI);case"emailLink":return LI(e,{email:this._email,oobCode:this._password});default:nt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ic(e,r,"signUpPassword",OI);case"emailLink":return VI(e,{idToken:t,email:this._email,oobCode:this._password});default:nt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mr(n,e){return Oo(n,"POST","/v1/accounts:signInWithIdp",dn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MI="http://localhost";class xn extends Kc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new xn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,i=Bc(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new xn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return mr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,mr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,mr(e,t)}buildRequest(){const e={requestUri:MI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Qs(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function UI(n){const e=fs(ps(n)).link,t=e?fs(ps(e)).deep_link_id:null,r=fs(ps(n)).deep_link_id;return(r?fs(ps(r)).link:null)||r||t||e||n}class zc{constructor(e){var t,r,s,i,a,c;const l=fs(ps(e)),h=(t=l.apiKey)!==null&&t!==void 0?t:null,f=(r=l.oobCode)!==null&&r!==void 0?r:null,g=xI((s=l.mode)!==null&&s!==void 0?s:null);q(h&&f&&g,"argument-error"),this.apiKey=h,this.operation=g,this.code=f,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(a=l.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=UI(e);try{return new zc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(){this.providerId=xr.PROVIDER_ID}static credential(e,t){return Os._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=zc.parseLink(t);return q(r,"argument-error"),Os._fromEmailAndCode(e,r.code,r.tenantId)}}xr.PROVIDER_ID="password";xr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";xr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js extends Vp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt extends Js{constructor(){super("facebook.com")}static credential(e){return xn._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wt.credential(e.oauthAccessToken)}catch{return null}}}Wt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Wt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends Js{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Kt.credential(t,r)}catch{return null}}}Kt.GOOGLE_SIGN_IN_METHOD="google.com";Kt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends Js{constructor(){super("github.com")}static credential(e){return xn._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zt.credential(e.oauthAccessToken)}catch{return null}}}zt.GITHUB_SIGN_IN_METHOD="github.com";zt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt extends Js{constructor(){super("twitter.com")}static credential(e,t){return xn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Gt.credential(t,r)}catch{return null}}}Gt.TWITTER_SIGN_IN_METHOD="twitter.com";Gt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await It._fromIdTokenResponse(e,r,s),a=Mh(r);return new Ar({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Mh(r);return new Ar({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Mh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co extends gt{constructor(e,t,r,s){var i;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,co.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new co(e,t,r,s)}}function Mp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?co._fromErrorAndOperation(n,i,e,r):i})}async function FI(n,e,t=!1){const r=await Ps(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ar._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $I(n,e,t=!1){const{auth:r}=n;if(wt(r.app))return Promise.reject(Zt(r));const s="reauthenticate";try{const i=await Ps(n,Mp(r,s,e,n),t);q(i.idToken,r,"internal-error");const a=Hc(i.idToken);q(a,r,"internal-error");const{sub:c}=a;return q(n.uid===c,r,"user-mismatch"),Ar._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&nt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xp(n,e,t=!1){if(wt(n.app))return Promise.reject(Zt(n));const r="signIn",s=await Mp(n,r,e),i=await Ar._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function BI(n,e){return xp(Kn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jI(n){const e=Kn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function qI(n,e,t){const r=Kn(n);await ic(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",kI)}function HI(n,e,t){return wt(n.app)?Promise.reject(Zt(n)):BI(ie(n),xr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&jI(n),r})}function WI(n,e,t,r){return ie(n).onIdTokenChanged(e,t,r)}function KI(n,e,t){return ie(n).beforeAuthStateChanged(e,t)}function zI(n,e,t,r){return ie(n).onAuthStateChanged(e,t,r)}function GI(n){return ie(n).signOut()}const lo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(lo,"1"),this.storage.removeItem(lo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI=1e3,QI=10;class Fp extends Up{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Np(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);dI()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,QI):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},YI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Fp.type="LOCAL";const XI=Fp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p extends Up{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}$p.type="SESSION";const Bp=$p;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JI(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Do(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),l=await JI(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Do.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const h=Gc("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(g){const E=g;if(E.data.eventId===h)switch(E.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(E.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(){return window}function eb(n){ht().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(){return typeof ht().WorkerGlobalScope<"u"&&typeof ht().importScripts=="function"}async function tb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function nb(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function rb(){return jp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp="firebaseLocalStorageDb",sb=1,uo="firebaseLocalStorage",Hp="fbase_key";class Zs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ko(n,e){return n.transaction([uo],e?"readwrite":"readonly").objectStore(uo)}function ib(){const n=indexedDB.deleteDatabase(qp);return new Zs(n).toPromise()}function oc(){const n=indexedDB.open(qp,sb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(uo,{keyPath:Hp})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(uo)?e(r):(r.close(),await ib(),e(await oc()))})})}async function xh(n,e,t){const r=ko(n,!0).put({[Hp]:e,value:t});return new Zs(r).toPromise()}async function ob(n,e){const t=ko(n,!1).get(e),r=await new Zs(t).toPromise();return r===void 0?null:r.value}function Uh(n,e){const t=ko(n,!0).delete(e);return new Zs(t).toPromise()}const ab=800,cb=3;class Wp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await oc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>cb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return jp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Do._getInstance(rb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tb(),!this.activeServiceWorker)return;this.sender=new ZI(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||nb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await oc();return await xh(e,lo,"1"),await Uh(e,lo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>xh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>ob(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Uh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ko(s,!1).getAll();return new Zs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ab)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Wp.type="LOCAL";const lb=Wp;new Xs(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ub(n,e){return e?bt(e):(q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc extends Kc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return mr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return mr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function hb(n){return xp(n.auth,new Yc(n),n.bypassAuthState)}function db(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),$I(t,new Yc(n),n.bypassAuthState)}async function fb(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),FI(t,new Yc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hb;case"linkViaPopup":case"linkViaRedirect":return fb;case"reauthViaPopup":case"reauthViaRedirect":return db;default:nt(this.auth,"internal-error")}}resolve(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=new Xs(2e3,1e4);class dr extends Kp{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,dr.currentPopupAction&&dr.currentPopupAction.cancel(),dr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){Dt(this.filter.length===1,"Popup operations only handle one event");const e=Gc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ut(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ut(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,dr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ut(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pb.get())};e()}}dr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mb="pendingRedirect",zi=new Map;class gb extends Kp{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=zi.get(this.auth._key());if(!e){try{const r=await _b(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}zi.set(this.auth._key(),e)}return this.bypassAuthState||zi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _b(n,e){const t=vb(e),r=Eb(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function yb(n,e){zi.set(n._key(),e)}function Eb(n){return bt(n._redirectPersistence)}function vb(n){return Ki(mb,n.config.apiKey,n.name)}async function Tb(n,e,t=!1){if(wt(n.app))return Promise.reject(Zt(n));const r=Kn(n),s=ub(r,e),a=await new gb(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wb=10*60*1e3;class Ab{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ib(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!zp(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(ut(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wb&&this.cachedEventUids.clear(),this.cachedEventUids.has(Fh(e))}saveEventToCache(e){this.cachedEventUids.add(Fh(e)),this.lastProcessedEventTime=Date.now()}}function Fh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function zp({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Ib(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return zp(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bb(n,e={}){return xt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sb=/^https?/;async function Cb(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bb(n);for(const t of e)try{if(Pb(t))return}catch{}nt(n,"unauthorized-domain")}function Pb(n){const e=rc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Sb.test(t))return!1;if(Rb.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ob=new Xs(3e4,6e4);function $h(){const n=ht().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Nb(n){return new Promise((e,t)=>{var r,s,i;function a(){$h(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$h(),t(ut(n,"network-request-failed"))},timeout:Ob.get()})}if(!((s=(r=ht().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=ht().gapi)===null||i===void 0)&&i.load)a();else{const c=TI("iframefcb");return ht()[c]=()=>{gapi.load?a():t(ut(n,"network-request-failed"))},kp(`${vI()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Gi=null,e})}let Gi=null;function Db(n){return Gi=Gi||Nb(n),Gi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kb=new Xs(5e3,15e3),Lb="__/auth/iframe",Vb="emulator/auth/iframe",Mb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},xb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ub(n){const e=n.config;q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?qc(e,Vb):`https://${n.config.authDomain}/${Lb}`,r={apiKey:e.apiKey,appName:n.name,v:Wn},s=xb.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Qs(r).slice(1)}`}async function Fb(n){const e=await Db(n),t=ht().gapi;return q(t,n,"internal-error"),e.open({where:document.body,url:Ub(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Mb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=ut(n,"network-request-failed"),c=ht().setTimeout(()=>{i(a)},kb.get());function l(){ht().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $b={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bb=500,jb=600,qb="_blank",Hb="http://localhost";class Bh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Wb(n,e,t,r=Bb,s=jb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l=Object.assign(Object.assign({},$b),{width:r.toString(),height:s.toString(),top:i,left:a}),h=Ce().toLowerCase();t&&(c=Rp(h)?qb:t),Ip(h)&&(e=e||Hb,l.scrollbars="yes");const f=Object.entries(l).reduce((E,[I,C])=>`${E}${I}=${C},`,"");if(hI(h)&&c!=="_self")return Kb(e||"",c),new Bh(null);const g=window.open(e||"",c,f);q(g,n,"popup-blocked");try{g.focus()}catch{}return new Bh(g)}function Kb(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zb="__/auth/handler",Gb="emulator/auth/handler",Yb=encodeURIComponent("fac");async function jh(n,e,t,r,s,i){q(n.config.authDomain,n,"auth-domain-config-required"),q(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Wn,eventId:s};if(e instanceof Vp){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",kw(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))a[f]=g}if(e instanceof Js){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${Yb}=${encodeURIComponent(l)}`:"";return`${Qb(n)}?${Qs(c).slice(1)}${h}`}function Qb({config:n}){return n.emulator?qc(n,Gb):`https://${n.authDomain}/${zb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua="webStorageSupport";class Xb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Bp,this._completeRedirectFn=Tb,this._overrideRedirectResult=yb}async _openPopup(e,t,r,s){var i;Dt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const a=await jh(e,t,r,rc(),s);return Wb(e,a,Gc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await jh(e,t,r,rc(),s);return eb(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Dt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Fb(e),r=new Ab(e);return t.register("authEvent",s=>(q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ua,{type:Ua},s=>{var i;const a=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Ua];a!==void 0&&t(!!a),nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Cb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Np()||bp()||Wc()}}const Jb=Xb;var qh="@firebase/auth",Hh="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eR(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function tR(n){Mn(new sn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;q(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dp(n)},h=new _I(r,s,i,l);return RI(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Mn(new sn("auth-internal",e=>{const t=Kn(e.getProvider("auth").getImmediate());return(r=>new Zb(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),lt(qh,Hh,eR(n)),lt(qh,Hh,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nR=5*60,rR=cp("authIdTokenMaxAge")||nR;let Wh=null;const sR=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>rR)return;const s=t==null?void 0:t.token;Wh!==s&&(Wh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function iR(n=$c()){const e=Po(n,"auth");if(e.isInitialized())return e.getImmediate();const t=bI(n,{popupRedirectResolver:Jb,persistence:[lb,XI,Bp]}),r=cp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=sR(i.toString());KI(t,a,()=>a(t.currentUser)),WI(t,c=>a(c))}}const s=ip("auth");return s&&SI(t,`http://${s}`),t}function oR(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}yI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=ut("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",oR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});tR("Browser");var Kh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pn,Gp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,m){function _(){}_.prototype=m.prototype,T.D=m.prototype,T.prototype=new _,T.prototype.constructor=T,T.C=function(v,w,A){for(var y=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)y[ge-2]=arguments[ge];return m.prototype[w].apply(v,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,m,_){_||(_=0);var v=Array(16);if(typeof m=="string")for(var w=0;16>w;++w)v[w]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(w=0;16>w;++w)v[w]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=T.g[0],_=T.g[1],w=T.g[2];var A=T.g[3],y=m+(A^_&(w^A))+v[0]+3614090360&4294967295;m=_+(y<<7&4294967295|y>>>25),y=A+(w^m&(_^w))+v[1]+3905402710&4294967295,A=m+(y<<12&4294967295|y>>>20),y=w+(_^A&(m^_))+v[2]+606105819&4294967295,w=A+(y<<17&4294967295|y>>>15),y=_+(m^w&(A^m))+v[3]+3250441966&4294967295,_=w+(y<<22&4294967295|y>>>10),y=m+(A^_&(w^A))+v[4]+4118548399&4294967295,m=_+(y<<7&4294967295|y>>>25),y=A+(w^m&(_^w))+v[5]+1200080426&4294967295,A=m+(y<<12&4294967295|y>>>20),y=w+(_^A&(m^_))+v[6]+2821735955&4294967295,w=A+(y<<17&4294967295|y>>>15),y=_+(m^w&(A^m))+v[7]+4249261313&4294967295,_=w+(y<<22&4294967295|y>>>10),y=m+(A^_&(w^A))+v[8]+1770035416&4294967295,m=_+(y<<7&4294967295|y>>>25),y=A+(w^m&(_^w))+v[9]+2336552879&4294967295,A=m+(y<<12&4294967295|y>>>20),y=w+(_^A&(m^_))+v[10]+4294925233&4294967295,w=A+(y<<17&4294967295|y>>>15),y=_+(m^w&(A^m))+v[11]+2304563134&4294967295,_=w+(y<<22&4294967295|y>>>10),y=m+(A^_&(w^A))+v[12]+1804603682&4294967295,m=_+(y<<7&4294967295|y>>>25),y=A+(w^m&(_^w))+v[13]+4254626195&4294967295,A=m+(y<<12&4294967295|y>>>20),y=w+(_^A&(m^_))+v[14]+2792965006&4294967295,w=A+(y<<17&4294967295|y>>>15),y=_+(m^w&(A^m))+v[15]+1236535329&4294967295,_=w+(y<<22&4294967295|y>>>10),y=m+(w^A&(_^w))+v[1]+4129170786&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^w&(m^_))+v[6]+3225465664&4294967295,A=m+(y<<9&4294967295|y>>>23),y=w+(m^_&(A^m))+v[11]+643717713&4294967295,w=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(w^A))+v[0]+3921069994&4294967295,_=w+(y<<20&4294967295|y>>>12),y=m+(w^A&(_^w))+v[5]+3593408605&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^w&(m^_))+v[10]+38016083&4294967295,A=m+(y<<9&4294967295|y>>>23),y=w+(m^_&(A^m))+v[15]+3634488961&4294967295,w=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(w^A))+v[4]+3889429448&4294967295,_=w+(y<<20&4294967295|y>>>12),y=m+(w^A&(_^w))+v[9]+568446438&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^w&(m^_))+v[14]+3275163606&4294967295,A=m+(y<<9&4294967295|y>>>23),y=w+(m^_&(A^m))+v[3]+4107603335&4294967295,w=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(w^A))+v[8]+1163531501&4294967295,_=w+(y<<20&4294967295|y>>>12),y=m+(w^A&(_^w))+v[13]+2850285829&4294967295,m=_+(y<<5&4294967295|y>>>27),y=A+(_^w&(m^_))+v[2]+4243563512&4294967295,A=m+(y<<9&4294967295|y>>>23),y=w+(m^_&(A^m))+v[7]+1735328473&4294967295,w=A+(y<<14&4294967295|y>>>18),y=_+(A^m&(w^A))+v[12]+2368359562&4294967295,_=w+(y<<20&4294967295|y>>>12),y=m+(_^w^A)+v[5]+4294588738&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^w)+v[8]+2272392833&4294967295,A=m+(y<<11&4294967295|y>>>21),y=w+(A^m^_)+v[11]+1839030562&4294967295,w=A+(y<<16&4294967295|y>>>16),y=_+(w^A^m)+v[14]+4259657740&4294967295,_=w+(y<<23&4294967295|y>>>9),y=m+(_^w^A)+v[1]+2763975236&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^w)+v[4]+1272893353&4294967295,A=m+(y<<11&4294967295|y>>>21),y=w+(A^m^_)+v[7]+4139469664&4294967295,w=A+(y<<16&4294967295|y>>>16),y=_+(w^A^m)+v[10]+3200236656&4294967295,_=w+(y<<23&4294967295|y>>>9),y=m+(_^w^A)+v[13]+681279174&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^w)+v[0]+3936430074&4294967295,A=m+(y<<11&4294967295|y>>>21),y=w+(A^m^_)+v[3]+3572445317&4294967295,w=A+(y<<16&4294967295|y>>>16),y=_+(w^A^m)+v[6]+76029189&4294967295,_=w+(y<<23&4294967295|y>>>9),y=m+(_^w^A)+v[9]+3654602809&4294967295,m=_+(y<<4&4294967295|y>>>28),y=A+(m^_^w)+v[12]+3873151461&4294967295,A=m+(y<<11&4294967295|y>>>21),y=w+(A^m^_)+v[15]+530742520&4294967295,w=A+(y<<16&4294967295|y>>>16),y=_+(w^A^m)+v[2]+3299628645&4294967295,_=w+(y<<23&4294967295|y>>>9),y=m+(w^(_|~A))+v[0]+4096336452&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~w))+v[7]+1126891415&4294967295,A=m+(y<<10&4294967295|y>>>22),y=w+(m^(A|~_))+v[14]+2878612391&4294967295,w=A+(y<<15&4294967295|y>>>17),y=_+(A^(w|~m))+v[5]+4237533241&4294967295,_=w+(y<<21&4294967295|y>>>11),y=m+(w^(_|~A))+v[12]+1700485571&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~w))+v[3]+2399980690&4294967295,A=m+(y<<10&4294967295|y>>>22),y=w+(m^(A|~_))+v[10]+4293915773&4294967295,w=A+(y<<15&4294967295|y>>>17),y=_+(A^(w|~m))+v[1]+2240044497&4294967295,_=w+(y<<21&4294967295|y>>>11),y=m+(w^(_|~A))+v[8]+1873313359&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~w))+v[15]+4264355552&4294967295,A=m+(y<<10&4294967295|y>>>22),y=w+(m^(A|~_))+v[6]+2734768916&4294967295,w=A+(y<<15&4294967295|y>>>17),y=_+(A^(w|~m))+v[13]+1309151649&4294967295,_=w+(y<<21&4294967295|y>>>11),y=m+(w^(_|~A))+v[4]+4149444226&4294967295,m=_+(y<<6&4294967295|y>>>26),y=A+(_^(m|~w))+v[11]+3174756917&4294967295,A=m+(y<<10&4294967295|y>>>22),y=w+(m^(A|~_))+v[2]+718787259&4294967295,w=A+(y<<15&4294967295|y>>>17),y=_+(A^(w|~m))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+m&4294967295,T.g[1]=T.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.u=function(T,m){m===void 0&&(m=T.length);for(var _=m-this.blockSize,v=this.B,w=this.h,A=0;A<m;){if(w==0)for(;A<=_;)s(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<m;)if(v[w++]=T.charCodeAt(A++),w==this.blockSize){s(this,v),w=0;break}}else for(;A<m;)if(v[w++]=T[A++],w==this.blockSize){s(this,v),w=0;break}}this.h=w,this.o+=m},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var m=1;m<T.length-8;++m)T[m]=0;var _=8*this.o;for(m=T.length-8;m<T.length;++m)T[m]=_&255,_/=256;for(this.u(T),T=Array(16),m=_=0;4>m;++m)for(var v=0;32>v;v+=8)T[_++]=this.g[m]>>>v&255;return T};function i(T,m){var _=c;return Object.prototype.hasOwnProperty.call(_,T)?_[T]:_[T]=m(T)}function a(T,m){this.h=m;for(var _=[],v=!0,w=T.length-1;0<=w;w--){var A=T[w]|0;v&&A==m||(_[w]=A,v=!1)}this.g=_}var c={};function l(T){return-128<=T&&128>T?i(T,function(m){return new a([m|0],0>m?-1:0)}):new a([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return g;if(0>T)return S(h(-T));for(var m=[],_=1,v=0;T>=_;v++)m[v]=T/_|0,_*=4294967296;return new a(m,0)}function f(T,m){if(T.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(T.charAt(0)=="-")return S(f(T.substring(1),m));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(m,8)),v=g,w=0;w<T.length;w+=8){var A=Math.min(8,T.length-w),y=parseInt(T.substring(w,w+A),m);8>A?(A=h(Math.pow(m,A)),v=v.j(A).add(h(y))):(v=v.j(_),v=v.add(h(y)))}return v}var g=l(0),E=l(1),I=l(16777216);n=a.prototype,n.m=function(){if(O(this))return-S(this).m();for(var T=0,m=1,_=0;_<this.g.length;_++){var v=this.i(_);T+=(0<=v?v:4294967296+v)*m,m*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(O(this))return"-"+S(this).toString(T);for(var m=h(Math.pow(T,6)),_=this,v="";;){var w=L(_,m).g;_=M(_,w.j(m));var A=((0<_.g.length?_.g[0]:_.h)>>>0).toString(T);if(_=w,C(_))return A+v;for(;6>A.length;)A="0"+A;v=A+v}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var m=0;m<T.g.length;m++)if(T.g[m]!=0)return!1;return!0}function O(T){return T.h==-1}n.l=function(T){return T=M(this,T),O(T)?-1:C(T)?0:1};function S(T){for(var m=T.g.length,_=[],v=0;v<m;v++)_[v]=~T.g[v];return new a(_,~T.h).add(E)}n.abs=function(){return O(this)?S(this):this},n.add=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],v=0,w=0;w<=m;w++){var A=v+(this.i(w)&65535)+(T.i(w)&65535),y=(A>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);v=y>>>16,A&=65535,y&=65535,_[w]=y<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function M(T,m){return T.add(S(m))}n.j=function(T){if(C(this)||C(T))return g;if(O(this))return O(T)?S(this).j(S(T)):S(S(this).j(T));if(O(T))return S(this.j(S(T)));if(0>this.l(I)&&0>T.l(I))return h(this.m()*T.m());for(var m=this.g.length+T.g.length,_=[],v=0;v<2*m;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(var w=0;w<T.g.length;w++){var A=this.i(v)>>>16,y=this.i(v)&65535,ge=T.i(w)>>>16,Fe=T.i(w)&65535;_[2*v+2*w]+=y*Fe,F(_,2*v+2*w),_[2*v+2*w+1]+=A*Fe,F(_,2*v+2*w+1),_[2*v+2*w+1]+=y*ge,F(_,2*v+2*w+1),_[2*v+2*w+2]+=A*ge,F(_,2*v+2*w+2)}for(v=0;v<m;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=m;v<2*m;v++)_[v]=0;return new a(_,0)};function F(T,m){for(;(T[m]&65535)!=T[m];)T[m+1]+=T[m]>>>16,T[m]&=65535,m++}function x(T,m){this.g=T,this.h=m}function L(T,m){if(C(m))throw Error("division by zero");if(C(T))return new x(g,g);if(O(T))return m=L(S(T),m),new x(S(m.g),S(m.h));if(O(m))return m=L(T,S(m)),new x(S(m.g),m.h);if(30<T.g.length){if(O(T)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var _=E,v=m;0>=v.l(T);)_=H(_),v=H(v);var w=$(_,1),A=$(v,1);for(v=$(v,2),_=$(_,2);!C(v);){var y=A.add(v);0>=y.l(T)&&(w=w.add(_),A=y),v=$(v,1),_=$(_,1)}return m=M(T,w.j(m)),new x(w,m)}for(w=g;0<=T.l(m);){for(_=Math.max(1,Math.floor(T.m()/m.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),A=h(_),y=A.j(m);O(y)||0<y.l(T);)_-=v,A=h(_),y=A.j(m);C(A)&&(A=E),w=w.add(A),T=M(T,y)}return new x(w,T)}n.A=function(T){return L(this,T).h},n.and=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)&T.i(v);return new a(_,this.h&T.h)},n.or=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)|T.i(v);return new a(_,this.h|T.h)},n.xor=function(T){for(var m=Math.max(this.g.length,T.g.length),_=[],v=0;v<m;v++)_[v]=this.i(v)^T.i(v);return new a(_,this.h^T.h)};function H(T){for(var m=T.g.length+1,_=[],v=0;v<m;v++)_[v]=T.i(v)<<1|T.i(v-1)>>>31;return new a(_,T.h)}function $(T,m){var _=m>>5;m%=32;for(var v=T.g.length-_,w=[],A=0;A<v;A++)w[A]=0<m?T.i(A+_)>>>m|T.i(A+_+1)<<32-m:T.i(A+_);return new a(w,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Gp=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Pn=a}).apply(typeof Kh<"u"?Kh:typeof self<"u"?self:typeof window<"u"?window:{});var Mi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yp,ms,Qp,Yi,ac,Xp,Jp,Zp;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Mi=="object"&&Mi];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(o,u){if(u)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var b=o[p];if(!(b in d))break e;d=d[b]}o=o[o.length-1],p=d[o],u=u(p),u!=p&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function i(o,u){o instanceof String&&(o+="");var d=0,p=!1,b={next:function(){if(!p&&d<o.length){var R=d++;return{value:u(R,o[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(o){return o||function(){return i(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function g(o,u,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,p),o.apply(u,b)}}return function(){return o.apply(u,arguments)}}function E(o,u,d){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,E.apply(null,arguments)}function I(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function C(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,b,R){for(var k=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)k[ee-2]=arguments[ee];return u.prototype[b].apply(p,k)}}function O(o){const u=o.length;if(0<u){const d=Array(u);for(let p=0;p<u;p++)d[p]=o[p];return d}return[]}function S(o,u){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(l(p)){const b=o.length||0,R=p.length||0;o.length=b+R;for(let k=0;k<R;k++)o[b+k]=p[k]}else o.push(p)}}class M{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function F(o){return/^[\s\xa0]*$/.test(o)}function x(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function L(o){return L[" "](o),o}L[" "]=function(){};var H=x().indexOf("Gecko")!=-1&&!(x().toLowerCase().indexOf("webkit")!=-1&&x().indexOf("Edge")==-1)&&!(x().indexOf("Trident")!=-1||x().indexOf("MSIE")!=-1)&&x().indexOf("Edge")==-1;function $(o,u,d){for(const p in o)u.call(d,o[p],p,o)}function T(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function m(o){const u={};for(const d in o)u[d]=o[d];return u}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,u){let d,p;for(let b=1;b<arguments.length;b++){p=arguments[b];for(d in p)o[d]=p[d];for(let R=0;R<_.length;R++)d=_[R],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function w(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function A(o){c.setTimeout(()=>{throw o},0)}function y(){var o=Xe;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class ge{constructor(){this.h=this.g=null}add(u,d){const p=Fe.get();p.set(u,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Fe=new M(()=>new Pe,o=>o.reset());class Pe{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let _e,ot=!1,Xe=new ge,pn=()=>{const o=c.Promise.resolve(void 0);_e=()=>{o.then(qr)}};var qr=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(d){A(d)}var u=Fe;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}ot=!1};function Le(){this.s=this.s,this.C=this.C}Le.prototype.s=!1,Le.prototype.ma=function(){this.s||(this.s=!0,this.N())},Le.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ce(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}ce.prototype.h=function(){this.defaultPrevented=!0};var Ut=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,u),c.removeEventListener("test",d,u)}catch{}return o}();function Ve(o,u){if(ce.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(H){e:{try{L(u.nodeName);var b=!0;break e}catch{}b=!1}b||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:mn[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Ve.aa.h.call(this)}}C(Ve,ce);var mn={2:"touch",3:"pen",4:"mouse"};Ve.prototype.h=function(){Ve.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var _t="closure_listenable_"+(1e6*Math.random()|0),yt=0;function Hr(o,u,d,p,b){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!p,this.ha=b,this.key=++yt,this.da=this.fa=!1}function Qn(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Ft(o){this.src=o,this.g={},this.h=0}Ft.prototype.add=function(o,u,d,p,b){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var k=Xn(o,u,p,b);return-1<k?(u=o[k],d||(u.fa=!1)):(u=new Hr(u,this.src,R,!!p,b),u.fa=d,o.push(u)),u};function Wr(o,u){var d=u.type;if(d in o.g){var p=o.g[d],b=Array.prototype.indexOf.call(p,u,void 0),R;(R=0<=b)&&Array.prototype.splice.call(p,b,1),R&&(Qn(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Xn(o,u,d,p){for(var b=0;b<o.length;++b){var R=o[b];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==p)return b}return-1}var Kr="closure_lm_"+(1e6*Math.random()|0),zr={};function Gr(o,u,d,p,b){if(Array.isArray(u)){for(var R=0;R<u.length;R++)Gr(o,u[R],d,p,b);return null}return d=Yr(d),o&&o[_t]?o.K(u,d,h(p)?!!p.capture:!1,b):ui(o,u,d,!1,p,b)}function ui(o,u,d,p,b,R){if(!u)throw Error("Invalid event type");var k=h(b)?!!b.capture:!!b,ee=Jn(o);if(ee||(o[Kr]=ee=new Ft(o)),d=ee.add(u,d,p,k,R),d.proxy)return d;if(p=Zo(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)Ut||(b=k),b===void 0&&(b=!1),o.addEventListener(u.toString(),p,b);else if(o.attachEvent)o.attachEvent(gn(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Zo(){function o(d){return u.call(o.src,o.listener,d)}const u=di;return o}function hi(o,u,d,p,b){if(Array.isArray(u))for(var R=0;R<u.length;R++)hi(o,u[R],d,p,b);else p=h(p)?!!p.capture:!!p,d=Yr(d),o&&o[_t]?(o=o.i,u=String(u).toString(),u in o.g&&(R=o.g[u],d=Xn(R,d,p,b),-1<d&&(Qn(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[u],o.h--)))):o&&(o=Jn(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Xn(u,d,p,b)),(d=-1<o?u[o]:null)&&Je(d))}function Je(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[_t])Wr(u.i,o);else{var d=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(d,p,o.capture):u.detachEvent?u.detachEvent(gn(d),p):u.addListener&&u.removeListener&&u.removeListener(p),(d=Jn(u))?(Wr(d,o),d.h==0&&(d.src=null,u[Kr]=null)):Qn(o)}}}function gn(o){return o in zr?zr[o]:zr[o]="on"+o}function di(o,u){if(o.da)o=!0;else{u=new Ve(u,this);var d=o.listener,p=o.ha||o.src;o.fa&&Je(o),o=d.call(p,u)}return o}function Jn(o){return o=o[Kr],o instanceof Ft?o:null}var _n="__closure_events_fn_"+(1e9*Math.random()>>>0);function Yr(o){return typeof o=="function"?o:(o[_n]||(o[_n]=function(u){return o.handleEvent(u)}),o[_n])}function de(){Le.call(this),this.i=new Ft(this),this.M=this,this.F=null}C(de,Le),de.prototype[_t]=!0,de.prototype.removeEventListener=function(o,u,d,p){hi(this,o,u,d,p)};function pe(o,u){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new ce(u,o);else if(u instanceof ce)u.target=u.target||o;else{var b=u;u=new ce(p,o),v(u,b)}if(b=!0,d)for(var R=d.length-1;0<=R;R--){var k=u.g=d[R];b=yn(k,p,!0,u)&&b}if(k=u.g=o,b=yn(k,p,!0,u)&&b,b=yn(k,p,!1,u)&&b,d)for(R=0;R<d.length;R++)k=u.g=d[R],b=yn(k,p,!1,u)&&b}de.prototype.N=function(){if(de.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],p=0;p<d.length;p++)Qn(d[p]);delete o.g[u],o.h--}}this.F=null},de.prototype.K=function(o,u,d,p){return this.i.add(String(o),u,!1,d,p)},de.prototype.L=function(o,u,d,p){return this.i.add(String(o),u,!0,d,p)};function yn(o,u,d,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var b=!0,R=0;R<u.length;++R){var k=u[R];if(k&&!k.da&&k.capture==d){var ee=k.listener,ye=k.ha||k.src;k.fa&&Wr(o.i,k),b=ee.call(ye,p)!==!1&&b}}return b&&!p.defaultPrevented}function Ul(o,u,d){if(typeof o=="function")d&&(o=E(o,d));else if(o&&typeof o.handleEvent=="function")o=E(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function Fl(o){o.g=Ul(()=>{o.g=null,o.i&&(o.i=!1,Fl(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Mg extends Le{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Fl(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Qr(o){Le.call(this),this.h=o,this.g={}}C(Qr,Le);var $l=[];function Bl(o){$(o.g,function(u,d){this.g.hasOwnProperty(d)&&Je(u)},o),o.g={}}Qr.prototype.N=function(){Qr.aa.N.call(this),Bl(this)},Qr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ea=c.JSON.stringify,xg=c.JSON.parse,Ug=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function ta(){}ta.prototype.h=null;function jl(o){return o.h||(o.h=o.i())}function ql(){}var Xr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function na(){ce.call(this,"d")}C(na,ce);function ra(){ce.call(this,"c")}C(ra,ce);var En={},Hl=null;function fi(){return Hl=Hl||new de}En.La="serverreachability";function Wl(o){ce.call(this,En.La,o)}C(Wl,ce);function Jr(o){const u=fi();pe(u,new Wl(u))}En.STAT_EVENT="statevent";function Kl(o,u){ce.call(this,En.STAT_EVENT,o),this.stat=u}C(Kl,ce);function Oe(o){const u=fi();pe(u,new Kl(u,o))}En.Ma="timingevent";function zl(o,u){ce.call(this,En.Ma,o),this.size=u}C(zl,ce);function Zr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function es(){this.g=!0}es.prototype.xa=function(){this.g=!1};function Fg(o,u,d,p,b,R){o.info(function(){if(o.g)if(R)for(var k="",ee=R.split("&"),ye=0;ye<ee.length;ye++){var X=ee[ye].split("=");if(1<X.length){var Ae=X[0];X=X[1];var Ie=Ae.split("_");k=2<=Ie.length&&Ie[1]=="type"?k+(Ae+"="+X+"&"):k+(Ae+"=redacted&")}}else k=null;else k=R;return"XMLHTTP REQ ("+p+") [attempt "+b+"]: "+u+`
`+d+`
`+k})}function $g(o,u,d,p,b,R,k){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+b+"]: "+u+`
`+d+`
`+R+" "+k})}function Zn(o,u,d,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+jg(o,d)+(p?" "+p:"")})}function Bg(o,u){o.info(function(){return"TIMEOUT: "+u})}es.prototype.info=function(){};function jg(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var b=p[1];if(Array.isArray(b)&&!(1>b.length)){var R=b[0];if(R!="noop"&&R!="stop"&&R!="close")for(var k=1;k<b.length;k++)b[k]=""}}}}return ea(d)}catch{return u}}var pi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Gl={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},sa;function mi(){}C(mi,ta),mi.prototype.g=function(){return new XMLHttpRequest},mi.prototype.i=function(){return{}},sa=new mi;function $t(o,u,d,p){this.j=o,this.i=u,this.l=d,this.R=p||1,this.U=new Qr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Yl}function Yl(){this.i=null,this.g="",this.h=!1}var Ql={},ia={};function oa(o,u,d){o.L=1,o.v=Ei(Et(u)),o.m=d,o.P=!0,Xl(o,null)}function Xl(o,u){o.F=Date.now(),gi(o),o.A=Et(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),hu(d.i,"t",p),o.C=0,d=o.j.J,o.h=new Yl,o.g=Pu(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Mg(E(o.Y,o,o.g),o.O)),u=o.U,d=o.g,p=o.ca;var b="readystatechange";Array.isArray(b)||(b&&($l[0]=b.toString()),b=$l);for(var R=0;R<b.length;R++){var k=Gr(d,b[R],p||u.handleEvent,!1,u.h||u);if(!k)break;u.g[k.key]=k}u=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Jr(),Fg(o.i,o.u,o.A,o.l,o.R,o.m)}$t.prototype.ca=function(o){o=o.target;const u=this.M;u&&vt(o)==3?u.j():this.Y(o)},$t.prototype.Y=function(o){try{if(o==this.g)e:{const Ie=vt(this.g);var u=this.g.Ba();const nr=this.g.Z();if(!(3>Ie)&&(Ie!=3||this.g&&(this.h.h||this.g.oa()||yu(this.g)))){this.J||Ie!=4||u==7||(u==8||0>=nr?Jr(3):Jr(2)),aa(this);var d=this.g.Z();this.X=d;t:if(Jl(this)){var p=yu(this.g);o="";var b=p.length,R=vt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){vn(this),ts(this);var k="";break t}this.h.i=new c.TextDecoder}for(u=0;u<b;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(R&&u==b-1)});p.length=0,this.h.g+=o,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=d==200,$g(this.i,this.u,this.A,this.l,this.R,Ie,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ee,ye=this.g;if((ee=ye.g?ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(ee)){var X=ee;break t}}X=null}if(d=X)Zn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ca(this,d);else{this.o=!1,this.s=3,Oe(12),vn(this),ts(this);break e}}if(this.P){d=!0;let Ze;for(;!this.J&&this.C<k.length;)if(Ze=qg(this,k),Ze==ia){Ie==4&&(this.s=4,Oe(14),d=!1),Zn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ze==Ql){this.s=4,Oe(15),Zn(this.i,this.l,k,"[Invalid Chunk]"),d=!1;break}else Zn(this.i,this.l,Ze,null),ca(this,Ze);if(Jl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ie!=4||k.length!=0||this.h.h||(this.s=1,Oe(16),d=!1),this.o=this.o&&d,!d)Zn(this.i,this.l,k,"[Invalid Chunked Response]"),vn(this),ts(this);else if(0<k.length&&!this.W){this.W=!0;var Ae=this.j;Ae.g==this&&Ae.ba&&!Ae.M&&(Ae.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),pa(Ae),Ae.M=!0,Oe(11))}}else Zn(this.i,this.l,k,null),ca(this,k);Ie==4&&vn(this),this.o&&!this.J&&(Ie==4?bu(this.j,this):(this.o=!1,gi(this)))}else o_(this.g),d==400&&0<k.indexOf("Unknown SID")?(this.s=3,Oe(12)):(this.s=0,Oe(13)),vn(this),ts(this)}}}catch{}finally{}};function Jl(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function qg(o,u){var d=o.C,p=u.indexOf(`
`,d);return p==-1?ia:(d=Number(u.substring(d,p)),isNaN(d)?Ql:(p+=1,p+d>u.length?ia:(u=u.slice(p,p+d),o.C=p+d,u)))}$t.prototype.cancel=function(){this.J=!0,vn(this)};function gi(o){o.S=Date.now()+o.I,Zl(o,o.I)}function Zl(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Zr(E(o.ba,o),u)}function aa(o){o.B&&(c.clearTimeout(o.B),o.B=null)}$t.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Bg(this.i,this.A),this.L!=2&&(Jr(),Oe(17)),vn(this),this.s=2,ts(this)):Zl(this,this.S-o)};function ts(o){o.j.G==0||o.J||bu(o.j,o)}function vn(o){aa(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,Bl(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function ca(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||la(d.h,o))){if(!o.K&&la(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var b=p;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)bi(d),Ai(d);else break e;fa(d),Oe(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=Zr(E(d.Za,d),6e3));if(1>=nu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else wn(d,11)}else if((o.K||d.g==o)&&bi(d),!F(u))for(b=d.Da.g.parse(u),u=0;u<b.length;u++){let X=b[u];if(d.T=X[0],X=X[1],d.G==2)if(X[0]=="c"){d.K=X[1],d.ia=X[2];const Ae=X[3];Ae!=null&&(d.la=Ae,d.j.info("VER="+d.la));const Ie=X[4];Ie!=null&&(d.Aa=Ie,d.j.info("SVER="+d.Aa));const nr=X[5];nr!=null&&typeof nr=="number"&&0<nr&&(p=1.5*nr,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Ze=o.g;if(Ze){const Si=Ze.g?Ze.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Si){var R=p.h;R.g||Si.indexOf("spdy")==-1&&Si.indexOf("quic")==-1&&Si.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ua(R,R.h),R.h=null))}if(p.D){const ma=Ze.g?Ze.g.getResponseHeader("X-HTTP-Session-Id"):null;ma&&(p.ya=ma,te(p.I,p.D,ma))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var k=o;if(p.qa=Cu(p,p.J?p.ia:null,p.W),k.K){ru(p.h,k);var ee=k,ye=p.L;ye&&(ee.I=ye),ee.B&&(aa(ee),gi(ee)),p.g=k}else Au(p);0<d.i.length&&Ii(d)}else X[0]!="stop"&&X[0]!="close"||wn(d,7);else d.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?wn(d,7):da(d):X[0]!="noop"&&d.l&&d.l.ta(X),d.v=0)}}Jr(4)}catch{}}var Hg=class{constructor(o,u){this.g=o,this.map=u}};function eu(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function tu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function nu(o){return o.h?1:o.g?o.g.size:0}function la(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function ua(o,u){o.g?o.g.add(u):o.h=u}function ru(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}eu.prototype.cancel=function(){if(this.i=su(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function su(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return O(o.i)}function Wg(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],d=o.length,p=0;p<d;p++)u.push(o[p]);return u}u=[],d=0;for(p in o)u[d++]=o[p];return u}function Kg(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const p in o)u[d++]=p;return u}}}function iu(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=Kg(o),p=Wg(o),b=p.length,R=0;R<b;R++)u.call(void 0,p[R],d&&d[R],o)}var ou=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zg(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),b=null;if(0<=p){var R=o[d].substring(0,p);b=o[d].substring(p+1)}else R=o[d];u(R,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Tn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Tn){this.h=o.h,_i(this,o.j),this.o=o.o,this.g=o.g,yi(this,o.s),this.l=o.l;var u=o.i,d=new ss;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),au(this,d),this.m=o.m}else o&&(u=String(o).match(ou))?(this.h=!1,_i(this,u[1]||"",!0),this.o=ns(u[2]||""),this.g=ns(u[3]||"",!0),yi(this,u[4]),this.l=ns(u[5]||"",!0),au(this,u[6]||"",!0),this.m=ns(u[7]||"")):(this.h=!1,this.i=new ss(null,this.h))}Tn.prototype.toString=function(){var o=[],u=this.j;u&&o.push(rs(u,cu,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(rs(u,cu,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(rs(d,d.charAt(0)=="/"?Qg:Yg,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",rs(d,Jg)),o.join("")};function Et(o){return new Tn(o)}function _i(o,u,d){o.j=d?ns(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function yi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function au(o,u,d){u instanceof ss?(o.i=u,Zg(o.i,o.h)):(d||(u=rs(u,Xg)),o.i=new ss(u,o.h))}function te(o,u,d){o.i.set(u,d)}function Ei(o){return te(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function ns(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function rs(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Gg),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Gg(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var cu=/[#\/\?@]/g,Yg=/[#\?:]/g,Qg=/[#\?]/g,Xg=/[#\?@]/g,Jg=/#/g;function ss(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Bt(o){o.g||(o.g=new Map,o.h=0,o.i&&zg(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=ss.prototype,n.add=function(o,u){Bt(this),this.i=null,o=er(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function lu(o,u){Bt(o),u=er(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function uu(o,u){return Bt(o),u=er(o,u),o.g.has(u)}n.forEach=function(o,u){Bt(this),this.g.forEach(function(d,p){d.forEach(function(b){o.call(u,b,p,this)},this)},this)},n.na=function(){Bt(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let p=0;p<u.length;p++){const b=o[p];for(let R=0;R<b.length;R++)d.push(u[p])}return d},n.V=function(o){Bt(this);let u=[];if(typeof o=="string")uu(this,o)&&(u=u.concat(this.g.get(er(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},n.set=function(o,u){return Bt(this),this.i=null,o=er(this,o),uu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function hu(o,u,d){lu(o,u),0<d.length&&(o.i=null,o.g.set(er(o,u),O(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var p=u[d];const R=encodeURIComponent(String(p)),k=this.V(p);for(p=0;p<k.length;p++){var b=R;k[p]!==""&&(b+="="+encodeURIComponent(String(k[p]))),o.push(b)}}return this.i=o.join("&")};function er(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Zg(o,u){u&&!o.j&&(Bt(o),o.i=null,o.g.forEach(function(d,p){var b=p.toLowerCase();p!=b&&(lu(this,p),hu(this,b,d))},o)),o.j=u}function e_(o,u){const d=new es;if(c.Image){const p=new Image;p.onload=I(jt,d,"TestLoadImage: loaded",!0,u,p),p.onerror=I(jt,d,"TestLoadImage: error",!1,u,p),p.onabort=I(jt,d,"TestLoadImage: abort",!1,u,p),p.ontimeout=I(jt,d,"TestLoadImage: timeout",!1,u,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function t_(o,u){const d=new es,p=new AbortController,b=setTimeout(()=>{p.abort(),jt(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(b),R.ok?jt(d,"TestPingServer: ok",!0,u):jt(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(b),jt(d,"TestPingServer: error",!1,u)})}function jt(o,u,d,p,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),p(d)}catch{}}function n_(){this.g=new Ug}function r_(o,u,d){const p=d||"";try{iu(o,function(b,R){let k=b;h(b)&&(k=ea(b)),u.push(p+R+"="+encodeURIComponent(k))})}catch(b){throw u.push(p+"type="+encodeURIComponent("_badmap")),b}}function vi(o){this.l=o.Ub||null,this.j=o.eb||!1}C(vi,ta),vi.prototype.g=function(){return new Ti(this.l,this.j)},vi.prototype.i=function(o){return function(){return o}}({});function Ti(o,u){de.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Ti,de),n=Ti.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,os(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,is(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,os(this)),this.g&&(this.readyState=3,os(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;du(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function du(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?is(this):os(this),this.readyState==3&&du(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,is(this))},n.Qa=function(o){this.g&&(this.response=o,is(this))},n.ga=function(){this.g&&is(this)};function is(o){o.readyState=4,o.l=null,o.j=null,o.v=null,os(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function os(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ti.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function fu(o){let u="";return $(o,function(d,p){u+=p,u+=":",u+=d,u+=`\r
`}),u}function ha(o,u,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=fu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):te(o,u,d))}function se(o){de.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(se,de);var s_=/^https?$/i,i_=["POST","PUT"];n=se.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():sa.g(),this.v=this.o?jl(this.o):jl(sa),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(R){pu(this,R);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var b in p)d.set(b,p[b]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(i_,u,void 0))||p||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,k]of d)this.g.setRequestHeader(R,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{_u(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){pu(this,R)}};function pu(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,mu(o),wi(o)}function mu(o){o.A||(o.A=!0,pe(o,"complete"),pe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,pe(this,"complete"),pe(this,"abort"),wi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),wi(this,!0)),se.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?gu(this):this.bb())},n.bb=function(){gu(this)};function gu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||vt(o)!=4||o.Z()!=2)){if(o.u&&vt(o)==4)Ul(o.Ea,0,o);else if(pe(o,"readystatechange"),vt(o)==4){o.h=!1;try{const k=o.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var p;if(p=k===0){var b=String(o.D).match(ou)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),p=!s_.test(b?b.toLowerCase():"")}d=p}if(d)pe(o,"complete"),pe(o,"success");else{o.m=6;try{var R=2<vt(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",mu(o)}}finally{wi(o)}}}}function wi(o,u){if(o.g){_u(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||pe(o,"ready");try{d.onreadystatechange=p}catch{}}}function _u(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function vt(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<vt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),xg(u)}};function yu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function o_(o){const u={};o=(o.g&&2<=vt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(F(o[p]))continue;var d=w(o[p]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=u[b]||[];u[b]=R,R.push(d)}T(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function as(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Eu(o){this.Aa=0,this.i=[],this.j=new es,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=as("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=as("baseRetryDelayMs",5e3,o),this.cb=as("retryDelaySeedMs",1e4,o),this.Wa=as("forwardChannelMaxRetries",2,o),this.wa=as("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new eu(o&&o.concurrentRequestLimit),this.Da=new n_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Eu.prototype,n.la=8,n.G=1,n.connect=function(o,u,d,p){Oe(0),this.W=o,this.H=u||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Cu(this,null,this.W),Ii(this)};function da(o){if(vu(o),o.G==3){var u=o.U++,d=Et(o.I);if(te(d,"SID",o.K),te(d,"RID",u),te(d,"TYPE","terminate"),cs(o,d),u=new $t(o,o.j,u),u.L=2,u.v=Ei(Et(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=u.v,d=!0),d||(u.g=Pu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),gi(u)}Su(o)}function Ai(o){o.g&&(pa(o),o.g.cancel(),o.g=null)}function vu(o){Ai(o),o.u&&(c.clearTimeout(o.u),o.u=null),bi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Ii(o){if(!tu(o.h)&&!o.s){o.s=!0;var u=o.Ga;_e||pn(),ot||(_e(),ot=!0),Xe.add(u,o),o.B=0}}function a_(o,u){return nu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Zr(E(o.Ga,o,u),Ru(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const b=new $t(this,this.j,o);let R=this.o;if(this.S&&(R?(R=m(R),v(R,this.S)):R=this.S),this.m!==null||this.O||(b.H=R,R=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=wu(this,b,u),d=Et(this.I),te(d,"RID",o),te(d,"CVER",22),this.D&&te(d,"X-HTTP-Session-Id",this.D),cs(this,d),R&&(this.O?u="headers="+encodeURIComponent(String(fu(R)))+"&"+u:this.m&&ha(d,this.m,R)),ua(this.h,b),this.Ua&&te(d,"TYPE","init"),this.P?(te(d,"$req",u),te(d,"SID","null"),b.T=!0,oa(b,d,null)):oa(b,d,u),this.G=2}}else this.G==3&&(o?Tu(this,o):this.i.length==0||tu(this.h)||Tu(this))};function Tu(o,u){var d;u?d=u.l:d=o.U++;const p=Et(o.I);te(p,"SID",o.K),te(p,"RID",d),te(p,"AID",o.T),cs(o,p),o.m&&o.o&&ha(p,o.m,o.o),d=new $t(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=wu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),ua(o.h,d),oa(d,p,u)}function cs(o,u){o.H&&$(o.H,function(d,p){te(u,p,d)}),o.l&&iu({},function(d,p){te(u,p,d)})}function wu(o,u,d){d=Math.min(o.i.length,d);var p=o.l?E(o.l.Na,o.l,o):null;e:{var b=o.i;let R=-1;for(;;){const k=["count="+d];R==-1?0<d?(R=b[0].g,k.push("ofs="+R)):R=0:k.push("ofs="+R);let ee=!0;for(let ye=0;ye<d;ye++){let X=b[ye].g;const Ae=b[ye].map;if(X-=R,0>X)R=Math.max(0,b[ye].g-100),ee=!1;else try{r_(Ae,k,"req"+X+"_")}catch{p&&p(Ae)}}if(ee){p=k.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,p}function Au(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;_e||pn(),ot||(_e(),ot=!0),Xe.add(u,o),o.v=0}}function fa(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Zr(E(o.Fa,o),Ru(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Iu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Zr(E(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Oe(10),Ai(this),Iu(this))};function pa(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Iu(o){o.g=new $t(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Et(o.qa);te(u,"RID","rpc"),te(u,"SID",o.K),te(u,"AID",o.T),te(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&te(u,"TO",o.ja),te(u,"TYPE","xmlhttp"),cs(o,u),o.m&&o.o&&ha(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Ei(Et(u)),d.m=null,d.P=!0,Xl(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Ai(this),fa(this),Oe(19))};function bi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function bu(o,u){var d=null;if(o.g==u){bi(o),pa(o),o.g=null;var p=2}else if(la(o.h,u))d=u.D,ru(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var b=o.B;p=fi(),pe(p,new zl(p,d)),Ii(o)}else Au(o);else if(b=u.s,b==3||b==0&&0<u.X||!(p==1&&a_(o,u)||p==2&&fa(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),b){case 1:wn(o,5);break;case 4:wn(o,10);break;case 3:wn(o,6);break;default:wn(o,2)}}}function Ru(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function wn(o,u){if(o.j.info("Error code "+u),u==2){var d=E(o.fb,o),p=o.Xa;const b=!p;p=new Tn(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||_i(p,"https"),Ei(p),b?e_(p.toString(),d):t_(p.toString(),d)}else Oe(2);o.G=0,o.l&&o.l.sa(u),Su(o),vu(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Oe(2)):(this.j.info("Failed to ping google.com"),Oe(1))};function Su(o){if(o.G=0,o.ka=[],o.l){const u=su(o.h);(u.length!=0||o.i.length!=0)&&(S(o.ka,u),S(o.ka,o.i),o.h.i.length=0,O(o.i),o.i.length=0),o.l.ra()}}function Cu(o,u,d){var p=d instanceof Tn?Et(d):new Tn(d);if(p.g!="")u&&(p.g=u+"."+p.g),yi(p,p.s);else{var b=c.location;p=b.protocol,u=u?u+"."+b.hostname:b.hostname,b=+b.port;var R=new Tn(null);p&&_i(R,p),u&&(R.g=u),b&&yi(R,b),d&&(R.l=d),p=R}return d=o.D,u=o.ya,d&&u&&te(p,d,u),te(p,"VER",o.la),cs(o,p),p}function Pu(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new se(new vi({eb:d})):new se(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ou(){}n=Ou.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ri(){}Ri.prototype.g=function(o,u){return new $e(o,u)};function $e(o,u){de.call(this),this.g=new Eu(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!F(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!F(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new tr(this)}C($e,de),$e.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){da(this.g)},$e.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=ea(o),o=d);u.i.push(new Hg(u.Ya++,o)),u.G==3&&Ii(u)},$e.prototype.N=function(){this.g.l=null,delete this.j,da(this.g),delete this.g,$e.aa.N.call(this)};function Nu(o){na.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}C(Nu,na);function Du(){ra.call(this),this.status=1}C(Du,ra);function tr(o){this.g=o}C(tr,Ou),tr.prototype.ua=function(){pe(this.g,"a")},tr.prototype.ta=function(o){pe(this.g,new Nu(o))},tr.prototype.sa=function(o){pe(this.g,new Du)},tr.prototype.ra=function(){pe(this.g,"b")},Ri.prototype.createWebChannel=Ri.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,Zp=function(){return new Ri},Jp=function(){return fi()},Xp=En,ac={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},pi.NO_ERROR=0,pi.TIMEOUT=8,pi.HTTP_ERROR=6,Yi=pi,Gl.COMPLETE="complete",Qp=Gl,ql.EventType=Xr,Xr.OPEN="a",Xr.CLOSE="b",Xr.ERROR="c",Xr.MESSAGE="d",de.prototype.listen=de.prototype.K,ms=ql,se.prototype.listenOnce=se.prototype.L,se.prototype.getLastError=se.prototype.Ka,se.prototype.getLastErrorCode=se.prototype.Ba,se.prototype.getStatus=se.prototype.Z,se.prototype.getResponseJson=se.prototype.Oa,se.prototype.getResponseText=se.prototype.oa,se.prototype.send=se.prototype.ea,se.prototype.setWithCredentials=se.prototype.Ha,Yp=se}).apply(typeof Mi<"u"?Mi:typeof self<"u"?self:typeof window<"u"?window:{});const zh="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Re.UNAUTHENTICATED=new Re(null),Re.GOOGLE_CREDENTIALS=new Re("google-credentials-uid"),Re.FIRST_PARTY=new Re("first-party-uid"),Re.MOCK_USER=new Re("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ur="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un=new Uc("@firebase/firestore");function hs(){return Un.logLevel}function U(n,...e){if(Un.logLevel<=Y.DEBUG){const t=e.map(Qc);Un.debug(`Firestore (${Ur}): ${n}`,...t)}}function kt(n,...e){if(Un.logLevel<=Y.ERROR){const t=e.map(Qc);Un.error(`Firestore (${Ur}): ${n}`,...t)}}function Ir(n,...e){if(Un.logLevel<=Y.WARN){const t=e.map(Qc);Un.warn(`Firestore (${Ur}): ${n}`,...t)}}function Qc(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(n="Unexpected state"){const e=`FIRESTORE (${Ur}) INTERNAL ASSERTION FAILED: `+n;throw kt(e),new Error(e)}function Z(n,e){n||W()}function z(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends gt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class aR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Re.UNAUTHENTICATED))}shutdown(){}}class cR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class lR{constructor(e){this.t=e,this.currentUser=Re.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Z(this.o===void 0);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Ct;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ct,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},c=l=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ct)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Z(typeof r.accessToken=="string"),new em(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Z(e===null||typeof e=="string"),new Re(e)}}class uR{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Re.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class hR{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new uR(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Re.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class dR{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fR{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Z(this.o===void 0);const r=i=>{i.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.R;return this.R=i.token,U("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Z(typeof t.token=="string"),this.R=t.token,new dR(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pR(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=pR(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%e.length))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function br(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return fe.fromMillis(Date.now())}static fromDate(e){return fe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new fe(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.timestamp=e}static fromTimestamp(e){return new K(e)}static min(){return new K(new fe(0,0))}static max(){return new K(new fe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(),r===void 0?r=e.length-t:r>e.length-t&&W(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ns.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ns?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=e.get(s),a=t.get(s);if(i<a)return-1;if(i>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ne extends Ns{construct(e,t,r){return new ne(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new ne(t)}static emptyPath(){return new ne([])}}const mR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ve extends Ns{construct(e,t,r){return new ve(e,t,r)}static isValidIdentifier(e){return mR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ve(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ve(t)}static emptyPath(){return new ve([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(ne.fromString(e))}static fromName(e){return new B(ne.fromString(e).popFirst(5))}static empty(){return new B(ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ne.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new ne(e.slice()))}}function gR(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=K.fromTimestamp(r===1e9?new fe(t+1,0):new fe(t,r));return new on(s,B.empty(),e)}function _R(n){return new on(n.readTime,n.key,-1)}class on{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new on(K.min(),B.empty(),-1)}static max(){return new on(K.max(),B.empty(),-1)}}function yR(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=B.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ER="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class vR{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ei(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==ER)throw n;U("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},l=>r(l))}),a=!0,i===s&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(s=>s?D.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new D((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next(f=>{a[h]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new D((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function TR(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ti(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Xc.oe=-1;function Lo(n){return n==null}function ho(n){return n===0&&1/n==-1/0}function wR(n){return typeof n=="number"&&Number.isInteger(n)&&!ho(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function zn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function nm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,t){this.comparator=e,this.root=t||Ee.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ee.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ee.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new xi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new xi(this.root,e,this.comparator,!1)}getReverseIterator(){return new xi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new xi(this.root,e,this.comparator,!0)}}class xi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ee{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ee.RED,this.left=s??Ee.EMPTY,this.right=i??Ee.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ee(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ee.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ee.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw W();const e=this.left.check();if(e!==this.right.check())throw W();return e+(this.isRed()?0:1)}}Ee.EMPTY=null,Ee.RED=!0,Ee.BLACK=!1;Ee.EMPTY=new class{constructor(){this.size=0}get key(){throw W()}get value(){throw W()}get color(){throw W()}get left(){throw W()}get right(){throw W()}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ee(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Yh(this.data.getIterator())}getIteratorFrom(e){return new Yh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Te)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Te(this.comparator);return t.data=e,t}}class Yh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.fields=e,e.sort(ve.comparator)}static empty(){return new Be([])}unionWith(e){let t=new Te(ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Be(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return br(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new rm("Invalid base64 string: "+i):i}}(e);return new we(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new we(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}we.EMPTY_BYTE_STRING=new we("");const AR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function an(n){if(Z(!!n),typeof n=="string"){let e=0;const t=AR.exec(n);if(Z(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:le(n.seconds),nanos:le(n.nanos)}}function le(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Fn(n){return typeof n=="string"?we.fromBase64String(n):we.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Zc(n){const e=n.mapValue.fields.__previous_value__;return Jc(e)?Zc(e):e}function Ds(n){const e=an(n.mapValue.fields.__local_write_time__.timestampValue);return new fe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IR{constructor(e,t,r,s,i,a,c,l,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h}}class ks{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ks("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ks&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui={mapValue:{}};function $n(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Jc(n)?4:RR(n)?9007199254740991:bR(n)?10:11:W()}function mt(n,e){if(n===e)return!0;const t=$n(n);if(t!==$n(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ds(n).isEqual(Ds(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=an(s.timestampValue),c=an(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Fn(s.bytesValue).isEqual(Fn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return le(s.geoPointValue.latitude)===le(i.geoPointValue.latitude)&&le(s.geoPointValue.longitude)===le(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return le(s.integerValue)===le(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=le(s.doubleValue),c=le(i.doubleValue);return a===c?ho(a)===ho(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return br(n.arrayValue.values||[],e.arrayValue.values||[],mt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Gh(a)!==Gh(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!mt(a[l],c[l])))return!1;return!0}(n,e);default:return W()}}function Ls(n,e){return(n.values||[]).find(t=>mt(t,e))!==void 0}function Rr(n,e){if(n===e)return 0;const t=$n(n),r=$n(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=le(i.integerValue||i.doubleValue),l=le(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Qh(n.timestampValue,e.timestampValue);case 4:return Qh(Ds(n),Ds(e));case 5:return J(n.stringValue,e.stringValue);case 6:return function(i,a){const c=Fn(i),l=Fn(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),l=a.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=J(c[h],l[h]);if(f!==0)return f}return J(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=J(le(i.latitude),le(a.latitude));return c!==0?c:J(le(i.longitude),le(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Xh(n.arrayValue,e.arrayValue);case 10:return function(i,a){var c,l,h,f;const g=i.fields||{},E=a.fields||{},I=(c=g.value)===null||c===void 0?void 0:c.arrayValue,C=(l=E.value)===null||l===void 0?void 0:l.arrayValue,O=J(((h=I==null?void 0:I.values)===null||h===void 0?void 0:h.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return O!==0?O:Xh(I,C)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Ui.mapValue&&a===Ui.mapValue)return 0;if(i===Ui.mapValue)return 1;if(a===Ui.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=a.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let g=0;g<l.length&&g<f.length;++g){const E=J(l[g],f[g]);if(E!==0)return E;const I=Rr(c[l[g]],h[f[g]]);if(I!==0)return I}return J(l.length,f.length)}(n.mapValue,e.mapValue);default:throw W()}}function Qh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=an(n),r=an(e),s=J(t.seconds,r.seconds);return s!==0?s:J(t.nanos,r.nanos)}function Xh(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Rr(t[s],r[s]);if(i)return i}return J(t.length,r.length)}function Sr(n){return cc(n)}function cc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=an(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Fn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return B.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=cc(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${cc(t.fields[a])}`;return s+"}"}(n.mapValue):W()}function Jh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function lc(n){return!!n&&"integerValue"in n}function el(n){return!!n&&"arrayValue"in n}function Zh(n){return!!n&&"nullValue"in n}function ed(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Qi(n){return!!n&&"mapValue"in n}function bR(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function ws(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return zn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ws(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ws(n.arrayValue.values[t]);return e}return Object.assign({},n)}function RR(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Qi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ws(t)}setAll(e){let t=ve.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=ws(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Qi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return mt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Qi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){zn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new xe(ws(this.value))}}function sm(n){const e=[];return zn(n.fields,(t,r)=>{const s=new ve([t]);if(Qi(r)){const i=sm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Be(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Se(e,0,K.min(),K.min(),K.min(),xe.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,K.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,K.min(),K.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,K.min(),K.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,t){this.position=e,this.inclusive=t}}function td(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=B.comparator(B.fromName(a.referenceValue),t.key):r=Rr(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function nd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!mt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(e,t="asc"){this.field=e,this.dir=t}}function SR(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{}class he extends im{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new PR(e,t,r):t==="array-contains"?new DR(e,r):t==="in"?new kR(e,r):t==="not-in"?new LR(e,r):t==="array-contains-any"?new VR(e,r):new he(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new OR(e,r):new NR(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Rr(t,this.value)):t!==null&&$n(this.value)===$n(t)&&this.matchesComparison(Rr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rt extends im{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new rt(e,t)}matches(e){return om(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function om(n){return n.op==="and"}function am(n){return CR(n)&&om(n)}function CR(n){for(const e of n.filters)if(e instanceof rt)return!1;return!0}function uc(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+Sr(n.value);if(am(n))return n.filters.map(e=>uc(e)).join(",");{const e=n.filters.map(t=>uc(t)).join(",");return`${n.op}(${e})`}}function cm(n,e){return n instanceof he?function(r,s){return s instanceof he&&r.op===s.op&&r.field.isEqual(s.field)&&mt(r.value,s.value)}(n,e):n instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&cm(a,s.filters[c]),!0):!1}(n,e):void W()}function lm(n){return n instanceof he?function(t){return`${t.field.canonicalString()} ${t.op} ${Sr(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(lm).join(" ,")+"}"}(n):"Filter"}class PR extends he{constructor(e,t,r){super(e,t,r),this.key=B.fromName(r.referenceValue)}matches(e){const t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class OR extends he{constructor(e,t){super(e,"in",t),this.keys=um("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class NR extends he{constructor(e,t){super(e,"not-in",t),this.keys=um("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function um(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>B.fromName(r.referenceValue))}class DR extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return el(t)&&Ls(t.arrayValue,this.value)}}class kR extends he{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ls(this.value.arrayValue,t)}}class LR extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ls(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ls(this.value.arrayValue,t)}}class VR extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!el(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ls(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MR{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.ue=null}}function rd(n,e=null,t=[],r=[],s=null,i=null,a=null){return new MR(n,e,t,r,s,i,a)}function tl(n){const e=z(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>uc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Lo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Sr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Sr(r)).join(",")),e.ue=t}return e.ue}function nl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!SR(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!cm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!nd(n.startAt,e.startAt)&&nd(n.endAt,e.endAt)}function hc(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function xR(n,e,t,r,s,i,a,c){return new ni(n,e,t,r,s,i,a,c)}function rl(n){return new ni(n)}function sd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function hm(n){return n.collectionGroup!==null}function As(n){const e=z(n);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Te(ve.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new po(i,r))}),t.has(ve.keyField().canonicalString())||e.ce.push(new po(ve.keyField(),r))}return e.ce}function dt(n){const e=z(n);return e.le||(e.le=UR(e,As(n))),e.le}function UR(n,e){if(n.limitType==="F")return rd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new po(s.field,i)});const t=n.endAt?new fo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fo(n.startAt.position,n.startAt.inclusive):null;return rd(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function dc(n,e){const t=n.filters.concat([e]);return new ni(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function fc(n,e,t){return new ni(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Vo(n,e){return nl(dt(n),dt(e))&&n.limitType===e.limitType}function dm(n){return`${tl(dt(n))}|lt:${n.limitType}`}function cr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>lm(s)).join(", ")}]`),Lo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Sr(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Sr(s)).join(",")),`Target(${r})`}(dt(n))}; limitType=${n.limitType})`}function Mo(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):B.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of As(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,l){const h=td(a,c,l);return a.inclusive?h<=0:h<0}(r.startAt,As(r),s)||r.endAt&&!function(a,c,l){const h=td(a,c,l);return a.inclusive?h>=0:h>0}(r.endAt,As(r),s))}(n,e)}function FR(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function fm(n){return(e,t)=>{let r=!1;for(const s of As(n)){const i=$R(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function $R(n,e,t){const r=n.field.isKeyField()?B.comparator(e.key,t.key):function(i,a,c){const l=a.data.field(i),h=c.data.field(i);return l!==null&&h!==null?Rr(l,h):W()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){zn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return nm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BR=new re(B.comparator);function Lt(){return BR}const pm=new re(B.comparator);function gs(...n){let e=pm;for(const t of n)e=e.insert(t.key,t);return e}function mm(n){let e=pm;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Rn(){return Is()}function gm(){return Is()}function Is(){return new Fr(n=>n.toString(),(n,e)=>n.isEqual(e))}const jR=new re(B.comparator),qR=new Te(B.comparator);function G(...n){let e=qR;for(const t of n)e=e.add(t);return e}const HR=new Te(J);function WR(){return HR}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ho(e)?"-0":e}}function _m(n){return{integerValue:""+n}}function KR(n,e){return wR(e)?_m(e):sl(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(){this._=void 0}}function zR(n,e,t){return n instanceof Vs?function(s,i){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Jc(i)&&(i=Zc(i)),i&&(a.fields.__previous_value__=i),{mapValue:a}}(t,e):n instanceof Ms?Em(n,e):n instanceof xs?vm(n,e):function(s,i){const a=ym(s,i),c=id(a)+id(s.Pe);return lc(a)&&lc(s.Pe)?_m(c):sl(s.serializer,c)}(n,e)}function GR(n,e,t){return n instanceof Ms?Em(n,e):n instanceof xs?vm(n,e):t}function ym(n,e){return n instanceof mo?function(r){return lc(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Vs extends xo{}class Ms extends xo{constructor(e){super(),this.elements=e}}function Em(n,e){const t=Tm(e);for(const r of n.elements)t.some(s=>mt(s,r))||t.push(r);return{arrayValue:{values:t}}}class xs extends xo{constructor(e){super(),this.elements=e}}function vm(n,e){let t=Tm(e);for(const r of n.elements)t=t.filter(s=>!mt(s,r));return{arrayValue:{values:t}}}class mo extends xo{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function id(n){return le(n.integerValue||n.doubleValue)}function Tm(n){return el(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YR{constructor(e,t){this.field=e,this.transform=t}}function QR(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Ms&&s instanceof Ms||r instanceof xs&&s instanceof xs?br(r.elements,s.elements,mt):r instanceof mo&&s instanceof mo?mt(r.Pe,s.Pe):r instanceof Vs&&s instanceof Vs}(n.transform,e.transform)}class XR{constructor(e,t){this.version=e,this.transformResults=t}}class tt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tt}static exists(e){return new tt(void 0,e)}static updateTime(e){return new tt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Xi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Uo{}function wm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new il(n.key,tt.none()):new ri(n.key,n.data,tt.none());{const t=n.data,r=xe.empty();let s=new Te(ve.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new fn(n.key,r,new Be(s.toArray()),tt.none())}}function JR(n,e,t){n instanceof ri?function(s,i,a){const c=s.value.clone(),l=ad(s.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof fn?function(s,i,a){if(!Xi(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=ad(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Am(s)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function bs(n,e,t,r){return n instanceof ri?function(i,a,c,l){if(!Xi(i.precondition,a))return c;const h=i.value.clone(),f=cd(i.fieldTransforms,l,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof fn?function(i,a,c,l){if(!Xi(i.precondition,a))return c;const h=cd(i.fieldTransforms,l,a),f=a.data;return f.setAll(Am(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(i,a,c){return Xi(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function ZR(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=ym(r.transform,s||null);i!=null&&(t===null&&(t=xe.empty()),t.set(r.field,i))}return t||null}function od(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&br(r,s,(i,a)=>QR(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ri extends Uo{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class fn extends Uo{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Am(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function ad(n,e,t){const r=new Map;Z(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,GR(a,c,t[s]))}return r}function cd(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,zR(i,a,e))}return r}class il extends Uo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class eS extends Uo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&JR(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=bs(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=bs(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=gm();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const l=wm(a,c);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(K.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&br(this.mutations,e.mutations,(t,r)=>od(t,r))&&br(this.baseMutations,e.baseMutations,(t,r)=>od(t,r))}}class ol{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Z(e.mutations.length===r.length);let s=function(){return jR}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new ol(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue,Q;function sS(n){switch(n){default:return W();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function Im(n){if(n===void 0)return kt("GRPC error has no .code"),P.UNKNOWN;switch(n){case ue.OK:return P.OK;case ue.CANCELLED:return P.CANCELLED;case ue.UNKNOWN:return P.UNKNOWN;case ue.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ue.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ue.INTERNAL:return P.INTERNAL;case ue.UNAVAILABLE:return P.UNAVAILABLE;case ue.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ue.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ue.NOT_FOUND:return P.NOT_FOUND;case ue.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ue.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ue.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ue.ABORTED:return P.ABORTED;case ue.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ue.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ue.DATA_LOSS:return P.DATA_LOSS;default:return W()}}(Q=ue||(ue={}))[Q.OK=0]="OK",Q[Q.CANCELLED=1]="CANCELLED",Q[Q.UNKNOWN=2]="UNKNOWN",Q[Q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Q[Q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Q[Q.NOT_FOUND=5]="NOT_FOUND",Q[Q.ALREADY_EXISTS=6]="ALREADY_EXISTS",Q[Q.PERMISSION_DENIED=7]="PERMISSION_DENIED",Q[Q.UNAUTHENTICATED=16]="UNAUTHENTICATED",Q[Q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Q[Q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Q[Q.ABORTED=10]="ABORTED",Q[Q.OUT_OF_RANGE=11]="OUT_OF_RANGE",Q[Q.UNIMPLEMENTED=12]="UNIMPLEMENTED",Q[Q.INTERNAL=13]="INTERNAL",Q[Q.UNAVAILABLE=14]="UNAVAILABLE",Q[Q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iS(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oS=new Pn([4294967295,4294967295],0);function ld(n){const e=iS().encode(n),t=new Gp;return t.update(e),new Uint8Array(t.digest())}function ud(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Pn([t,r],0),new Pn([s,i],0)]}class al{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new _s(`Invalid padding: ${t}`);if(r<0)throw new _s(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new _s(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new _s(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Pn.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(Pn.fromNumber(r)));return s.compare(oS)===1&&(s=new Pn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=ld(e),[r,s]=ud(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);if(!this.de(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new al(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;const t=ld(e),[r,s]=ud(t);for(let i=0;i<this.hashCount;i++){const a=this.Ee(r,s,i);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class _s extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,si.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Fo(K.min(),s,new re(J),Lt(),G())}}class si{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new si(r,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class bm{constructor(e,t){this.targetId=e,this.me=t}}class Rm{constructor(e,t,r=we.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class hd{constructor(){this.fe=0,this.ge=fd(),this.pe=we.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=G(),t=G(),r=G();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:W()}}),new si(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=fd()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Z(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class aS{constructor(e){this.Le=e,this.Be=new Map,this.ke=Lt(),this.qe=dd(),this.Qe=new re(J)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:W()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const i=s.target;if(hc(i))if(r===0){const a=new B(i.path);this.Ue(t,a,Se.newNoDocument(a,K.min()))}else Z(r===1);else{const a=this.Ye(t);if(a!==r){const c=this.Ze(e),l=c?this.Xe(c,e,a):1;if(l!==0){this.je(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=Fn(r).toUint8Array()}catch(l){if(l instanceof rm)return Ir("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new al(a,s,i)}catch(l){return Ir(l instanceof _s?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,i,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((i,a)=>{const c=this.Je(a);if(c){if(i.current&&hc(c.target)){const l=new B(c.target.path);this.ke.get(l)!==null||this.it(a,l)||this.Ue(a,l,Se.newNoDocument(l,e))}i.be&&(t.set(a,i.ve()),i.Ce())}});let r=G();this.qe.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const h=this.Je(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ke.forEach((i,a)=>a.setReadTime(e));const s=new Fo(e,t,this.Qe,this.ke,r);return this.ke=Lt(),this.qe=dd(),this.Qe=new re(J),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new hd,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Te(J),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||U("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new hd),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function dd(){return new re(B.comparator)}function fd(){return new re(B.comparator)}const cS={asc:"ASCENDING",desc:"DESCENDING"},lS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},uS={and:"AND",or:"OR"};class hS{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function pc(n,e){return n.useProto3Json||Lo(e)?e:{value:e}}function go(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Sm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function dS(n,e){return go(n,e.toTimestamp())}function ft(n){return Z(!!n),K.fromTimestamp(function(t){const r=an(t);return new fe(r.seconds,r.nanos)}(n))}function cl(n,e){return mc(n,e).canonicalString()}function mc(n,e){const t=function(s){return new ne(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Cm(n){const e=ne.fromString(n);return Z(km(e)),e}function gc(n,e){return cl(n.databaseId,e.path)}function Fa(n,e){const t=Cm(e);if(t.get(1)!==n.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new B(Om(t))}function Pm(n,e){return cl(n.databaseId,e)}function fS(n){const e=Cm(n);return e.length===4?ne.emptyPath():Om(e)}function _c(n){return new ne(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Om(n){return Z(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function pd(n,e,t){return{name:gc(n,e),fields:t.value.mapValue.fields}}function pS(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:W()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(Z(f===void 0||typeof f=="string"),we.fromBase64String(f||"")):(Z(f===void 0||f instanceof Buffer||f instanceof Uint8Array),we.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?P.UNKNOWN:Im(h.code);return new V(f,h.message||"")}(a);t=new Rm(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Fa(n,r.document.name),i=ft(r.document.updateTime),a=r.document.createTime?ft(r.document.createTime):K.min(),c=new xe({mapValue:{fields:r.document.fields}}),l=Se.newFoundDocument(s,i,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Ji(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Fa(n,r.document),i=r.readTime?ft(r.readTime):K.min(),a=Se.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ji([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Fa(n,r.document),i=r.removedTargetIds||[];t=new Ji([],i,s,null)}else{if(!("filter"in e))return W();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new rS(s,i),c=r.targetId;t=new bm(c,a)}}return t}function mS(n,e){let t;if(e instanceof ri)t={update:pd(n,e.key,e.value)};else if(e instanceof il)t={delete:gc(n,e.key)};else if(e instanceof fn)t={update:pd(n,e.key,e.data),updateMask:IS(e.fieldMask)};else{if(!(e instanceof eS))return W();t={verify:gc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof Vs)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ms)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof xs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof mo)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw W()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:dS(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:W()}(n,e.precondition)),t}function gS(n,e){return n&&n.length>0?(Z(e!==void 0),n.map(t=>function(s,i){let a=s.updateTime?ft(s.updateTime):ft(i);return a.isEqual(K.min())&&(a=ft(i)),new XR(a,s.transformResults||[])}(t,e))):[]}function _S(n,e){return{documents:[Pm(n,e.path)]}}function yS(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Pm(n,s);const i=function(h){if(h.length!==0)return Dm(rt.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(E){return{field:lr(E.field),direction:TS(E.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=pc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:s}}function ES(n){let e=fS(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Z(r===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(g){const E=Nm(g);return E instanceof rt&&am(E)?E.getFilters():[E]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(E=>function(C){return new po(ur(C.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(E))}(t.orderBy));let c=null;t.limit&&(c=function(g){let E;return E=typeof g=="object"?g.value:g,Lo(E)?null:E}(t.limit));let l=null;t.startAt&&(l=function(g){const E=!!g.before,I=g.values||[];return new fo(I,E)}(t.startAt));let h=null;return t.endAt&&(h=function(g){const E=!g.before,I=g.values||[];return new fo(I,E)}(t.endAt)),xR(e,s,a,i,c,"F",l,h)}function vS(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Nm(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ur(t.unaryFilter.field);return he.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=ur(t.unaryFilter.field);return he.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ur(t.unaryFilter.field);return he.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=ur(t.unaryFilter.field);return he.create(a,"!=",{nullValue:"NULL_VALUE"});default:return W()}}(n):n.fieldFilter!==void 0?function(t){return he.create(ur(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return W()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(r=>Nm(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return W()}}(t.compositeFilter.op))}(n):W()}function TS(n){return cS[n]}function wS(n){return lS[n]}function AS(n){return uS[n]}function lr(n){return{fieldPath:n.canonicalString()}}function ur(n){return ve.fromServerFormat(n.fieldPath)}function Dm(n){return n instanceof he?function(t){if(t.op==="=="){if(ed(t.value))return{unaryFilter:{field:lr(t.field),op:"IS_NAN"}};if(Zh(t.value))return{unaryFilter:{field:lr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ed(t.value))return{unaryFilter:{field:lr(t.field),op:"IS_NOT_NAN"}};if(Zh(t.value))return{unaryFilter:{field:lr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:lr(t.field),op:wS(t.op),value:t.value}}}(n):n instanceof rt?function(t){const r=t.getFilters().map(s=>Dm(s));return r.length===1?r[0]:{compositeFilter:{op:AS(t.op),filters:r}}}(n):W()}function IS(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function km(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,t,r,s,i=K.min(),a=K.min(),c=we.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Qt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e){this.ct=e}}function RS(n){const e=ES({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?fc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SS{constructor(){this.un=new CS}addToCollectionParentIndex(e,t){return this.un.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(on.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(on.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class CS{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Te(ne.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Te(ne.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Cr(0)}static kn(){return new Cr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PS{constructor(){this.changes=new Fr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OS{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NS{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&bs(r.mutation,s,Be.empty(),fe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,G()).next(()=>r))}getLocalViewOfDocuments(e,t,r=G()){const s=Rn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=gs();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Rn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,G()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=Lt();const a=Is(),c=function(){return Is()}();return t.forEach((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof fn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),bs(f.mutation,h,f.mutation.getFieldMask(),fe.now())):a.set(h.key,Be.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var g;return c.set(h,new OS(f,(g=a.get(h))!==null&&g!==void 0?g:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Is();let s=new re((a,c)=>a-c),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const h=t.get(l);if(h===null)return;let f=r.get(l)||Be.empty();f=c.applyToLocalView(h,f),r.set(l,f);const g=(s.get(c.batchId)||G()).add(l);s=s.insert(c.batchId,g)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,g=gm();f.forEach(E=>{if(!i.has(E)){const I=wm(t.get(E),r.get(E));I!==null&&g.set(E,I),i=i.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,g))}return D.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return B.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):hm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):D.resolve(Rn());let c=-1,l=i;return a.next(h=>D.forEach(h,(f,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),i.get(f)?D.resolve():this.remoteDocumentCache.getEntry(e,f).next(E=>{l=l.insert(f,E)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,l,h,G())).next(f=>({batchId:c,changes:mm(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(r=>{let s=gs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=gs();return this.indexManager.getCollectionParents(e,i).next(c=>D.forEach(c,l=>{const h=function(g,E){return new ni(E,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((g,E)=>{a=a.insert(g,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((l,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Se.newInvalidDocument(f)))});let c=gs();return a.forEach((l,h)=>{const f=i.get(l);f!==void 0&&bs(f.mutation,h,Be.empty(),fe.now()),Mo(t,h)&&(c=c.insert(l,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DS{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return D.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:ft(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:RS(s.bundledQuery),readTime:ft(s.readTime)}}(t)),D.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kS{constructor(){this.overlays=new re(B.comparator),this.Ir=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Rn();return D.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.ht(e,t,i)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=Rn(),i=t.length+1,a=new B(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new re((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=Rn(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Rn(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return D.resolve(c)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new nS(t,r));let i=this.Ir.get(t);i===void 0&&(i=G(),this.Ir.set(t,i)),this.Ir.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LS{constructor(){this.sessionToken=we.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(){this.Tr=new Te(me.Er),this.dr=new Te(me.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new me(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new me(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new B(new ne([])),r=new me(t,e),s=new me(t,e+1),i=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),i.push(a.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new B(new ne([])),r=new me(t,e),s=new me(t,e+1);let i=G();return this.dr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new me(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class me{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return B.comparator(e.key,t.key)||J(e.wr,t.wr)}static Ar(e,t){return J(e.wr,t.wr)||B.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VS{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Te(me.Er)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new tS(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.br=this.br.add(new me(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),i=s<0?0:s;return D.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new me(t,0),s=new me(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],a=>{const c=this.Dr(a.wr);i.push(c)}),D.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Te(J);return t.forEach(s=>{const i=new me(s,0),a=new me(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,a],c=>{r=r.add(c.wr)})}),D.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;B.isDocumentKey(i)||(i=i.child(""));const a=new me(new B(i),0);let c=new Te(J);return this.br.forEachWhile(l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.wr)),!0)},a),D.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Z(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return D.forEach(t.mutations,s=>{const i=new me(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new me(t,0),s=this.br.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MS{constructor(e){this.Mr=e,this.docs=function(){return new re(B.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=Lt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Se.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Lt();const a=t.path,c=new B(a.child("")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||yR(_R(f),r)<=0||(s.has(f.key)||Mo(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return D.resolve(i)}getAllFromCollectionGroup(e,t,r,s){W()}Or(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new xS(this)}getSize(e){return D.resolve(this.size)}}class xS extends PS{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class US{constructor(e){this.persistence=e,this.Nr=new Fr(t=>tl(t),nl),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ll,this.targetCount=0,this.kr=Cr.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),D.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Cr(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.Kn(t),D.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Nr.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(i).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),D.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Xc(0),this.Kr=!1,this.Kr=!0,this.$r=new LS,this.referenceDelegate=e(this),this.Ur=new US(this),this.indexManager=new SS,this.remoteDocumentCache=function(s){return new MS(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new bS(t),this.Gr=new DS(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new kS,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new VS(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){U("MemoryPersistence","Starting transaction:",e);const s=new $S(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,t){return D.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class $S extends vR{constructor(e){super(),this.currentSequenceNumber=e}}class ul{constructor(e){this.persistence=e,this.Jr=new ll,this.Yr=null}static Zr(e){return new ul(e)}get Xr(){if(this.Yr)return this.Yr;throw W()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),D.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.Xr,r=>{const s=B.fromPath(r);return this.ei(e,s).next(i=>{i||t.removeEntry(s,K.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return D.or([()=>D.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new hl(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BS{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jS{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Sw()?8:TR(Ce())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.Yi(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.Zi(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new BS;return this.Xi(e,t,a).next(c=>{if(i.result=c,this.zi)return this.es(e,t,a,c.size)})}).next(()=>i.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(hs()<=Y.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",cr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),D.resolve()):(hs()<=Y.DEBUG&&U("QueryEngine","Query:",cr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(hs()<=Y.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",cr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,dt(t))):D.resolve())}Yi(e,t){if(sd(t))return D.resolve(null);let r=dt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=fc(t,null,"F"),r=dt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=G(...i);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const h=this.ts(t,c);return this.ns(t,h,a,l.readTime)?this.Yi(e,fc(t,null,"F")):this.rs(e,h,t,l)}))})))}Zi(e,t,r,s){return sd(t)||s.isEqual(K.min())?D.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const a=this.ts(t,i);return this.ns(t,a,r,s)?D.resolve(null):(hs()<=Y.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),cr(t)),this.rs(e,a,t,gR(s,-1)).next(c=>c))})}ts(e,t){let r=new Te(fm(e));return t.forEach((s,i)=>{Mo(e,i)&&(r=r.add(i))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,r){return hs()<=Y.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",cr(t)),this.Ji.getDocumentsMatchingQuery(e,t,on.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qS{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new re(J),this._s=new Fr(i=>tl(i),nl),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new NS(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function HS(n,e,t,r){return new qS(n,e,t,r)}async function Lm(n,e){const t=z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let l=G();for(const h of s){a.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:c}))})})}function WS(n,e){const t=z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,l,h,f){const g=h.batch,E=g.keys();let I=D.resolve();return E.forEach(C=>{I=I.next(()=>f.getEntry(l,C)).next(O=>{const S=h.docVersions.get(C);Z(S!==null),O.version.compareTo(S)<0&&(g.applyToRemoteDocument(O,h),O.isValidDocument()&&(O.setReadTime(h.commitVersion),f.addEntry(O)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(l,g))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Vm(n){const e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function KS(n,e){const t=z(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const c=[];e.targetChanges.forEach((f,g)=>{const E=s.get(g);if(!E)return;c.push(t.Ur.removeMatchingKeys(i,f.removedDocuments,g).next(()=>t.Ur.addMatchingKeys(i,f.addedDocuments,g)));let I=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?I=I.withResumeToken(we.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),s=s.insert(g,I),function(O,S,M){return O.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:M.addedDocuments.size+M.modifiedDocuments.size+M.removedDocuments.size>0}(E,I,f)&&c.push(t.Ur.updateTargetData(i,I))});let l=Lt(),h=G();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(zS(i,a,e.documentUpdates).next(f=>{l=f.Ps,h=f.Is})),!r.isEqual(K.min())){const f=t.Ur.getLastRemoteSnapshotVersion(i).next(g=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return D.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,h)).next(()=>l)}).then(i=>(t.os=s,i))}function zS(n,e,t){let r=G(),s=G();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=Lt();return t.forEach((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(K.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):U("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)}),{Ps:a,Is:s}})}function GS(n,e){const t=z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function YS(n,e){const t=z(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Ur.getTargetData(r,e).next(i=>i?(s=i,D.resolve(s)):t.Ur.allocateTargetId(r).next(a=>(s=new Qt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function yc(n,e,t){const r=z(n),s=r.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ti(a))throw a;U("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function md(n,e,t){const r=z(n);let s=K.min(),i=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,h,f){const g=z(l),E=g._s.get(f);return E!==void 0?D.resolve(g.os.get(E)):g.Ur.getTargetData(h,f)}(r,a,dt(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?s:K.min(),t?i:G())).next(c=>(QS(r,FR(e),c),{documents:c,Ts:i})))}function QS(n,e,t){let r=n.us.get(e)||K.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.us.set(e,r)}class gd{constructor(){this.activeTargetIds=WR()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class XS{constructor(){this.so=new gd,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new gd,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JS{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){U("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){U("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi=null;function $a(){return Fi===null?Fi=function(){return 268435456+Math.round(2147483648*Math.random())}():Fi++,"0x"+Fi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eC{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="WebChannelConnection";class tC extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,r,s,i,a){const c=$a(),l=this.xo(t,r.toUriEncodedString());U("RestConnection",`Sending RPC '${t}' ${c}:`,l,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,a),this.No(t,l,h,s).then(f=>(U("RestConnection",`Received RPC '${t}' ${c}: `,f),f),f=>{throw Ir("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",l,"request:",s),f})}Lo(t,r,s,i,a,c){return this.Mo(t,r,s,i,a)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ur}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,a)=>t[a]=i),s&&s.headers.forEach((i,a)=>t[a]=i)}xo(t,r){const s=ZS[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const i=$a();return new Promise((a,c)=>{const l=new Yp;l.setWithCredentials(!0),l.listenOnce(Qp.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Yi.NO_ERROR:const f=l.getResponseJson();U(be,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),a(f);break;case Yi.TIMEOUT:U(be,`RPC '${e}' ${i} timed out`),c(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case Yi.HTTP_ERROR:const g=l.getStatus();if(U(be,`RPC '${e}' ${i} failed with status:`,g,"response text:",l.getResponseText()),g>0){let E=l.getResponseJson();Array.isArray(E)&&(E=E[0]);const I=E==null?void 0:E.error;if(I&&I.status&&I.message){const C=function(S){const M=S.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(M)>=0?M:P.UNKNOWN}(I.status);c(new V(C,I.message))}else c(new V(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new V(P.UNAVAILABLE,"Connection failed."));break;default:W()}}finally{U(be,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);U(be,`RPC '${e}' ${i} sending request:`,s),l.send(t,"POST",h,r,15)})}Bo(e,t,r){const s=$a(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Zp(),c=Jp(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const f=i.join("");U(be,`Creating RPC '${e}' stream ${s}: ${f}`,l);const g=a.createWebChannel(f,l);let E=!1,I=!1;const C=new eC({Io:S=>{I?U(be,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(E||(U(be,`Opening RPC '${e}' stream ${s} transport.`),g.open(),E=!0),U(be,`RPC '${e}' stream ${s} sending:`,S),g.send(S))},To:()=>g.close()}),O=(S,M,F)=>{S.listen(M,x=>{try{F(x)}catch(L){setTimeout(()=>{throw L},0)}})};return O(g,ms.EventType.OPEN,()=>{I||(U(be,`RPC '${e}' stream ${s} transport opened.`),C.yo())}),O(g,ms.EventType.CLOSE,()=>{I||(I=!0,U(be,`RPC '${e}' stream ${s} transport closed`),C.So())}),O(g,ms.EventType.ERROR,S=>{I||(I=!0,Ir(be,`RPC '${e}' stream ${s} transport errored:`,S),C.So(new V(P.UNAVAILABLE,"The operation could not be completed")))}),O(g,ms.EventType.MESSAGE,S=>{var M;if(!I){const F=S.data[0];Z(!!F);const x=F,L=x.error||((M=x[0])===null||M===void 0?void 0:M.error);if(L){U(be,`RPC '${e}' stream ${s} received error:`,L);const H=L.status;let $=function(_){const v=ue[_];if(v!==void 0)return Im(v)}(H),T=L.message;$===void 0&&($=P.INTERNAL,T="Unknown error status: "+H+" with message "+L.message),I=!0,C.So(new V($,T)),g.close()}else U(be,`RPC '${e}' stream ${s} received:`,F),C.bo(F)}}),O(c,Xp.STAT_EVENT,S=>{S.stat===ac.PROXY?U(be,`RPC '${e}' stream ${s} detected buffering proxy`):S.stat===ac.NOPROXY&&U(be,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.wo()},0),C}}function Ba(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $o(n){return new hS(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e,t,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&U("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(e,t,r,s,i,a,c,l){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Mm(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(kt(t.toString()),kt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new V(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return U("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(U("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class nC extends xm{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=pS(this.serializer,e),r=function(i){if(!("targetChange"in i))return K.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?K.min():a.readTime?ft(a.readTime):K.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=_c(this.serializer),t.addTarget=function(i,a){let c;const l=a.target;if(c=hc(l)?{documents:_S(i,l)}:{query:yS(i,l)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Sm(i,a.resumeToken);const h=pc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(K.min())>0){c.readTime=go(i,a.snapshotVersion.toTimestamp());const h=pc(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=vS(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=_c(this.serializer),t.removeTarget=e,this.a_(t)}}class rC extends xm{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Z(!!e.streamToken),this.lastStreamToken=e.streamToken,Z(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Z(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=gS(e.writeResults,e.commitTime),r=ft(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=_c(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>mS(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sC extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Mo(e,mc(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(P.UNKNOWN,i.toString())})}Lo(e,t,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,mc(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(P.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class iC{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(kt(t),this.D_=!1):U("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oC{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(a=>{r.enqueueAndForget(async()=>{Gn(this)&&(U("RemoteStore","Restarting streams for network reachability change."),await async function(l){const h=z(l);h.L_.add(4),await ii(h),h.q_.set("Unknown"),h.L_.delete(4),await Bo(h)}(this))})}),this.q_=new iC(r,s)}}async function Bo(n){if(Gn(n))for(const e of n.B_)await e(!0)}async function ii(n){for(const e of n.B_)await e(!1)}function Um(n,e){const t=z(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),ml(t)?pl(t):$r(t).r_()&&fl(t,e))}function dl(n,e){const t=z(n),r=$r(t);t.N_.delete(e),r.r_()&&Fm(t,e),t.N_.size===0&&(r.r_()?r.o_():Gn(t)&&t.q_.set("Unknown"))}function fl(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}$r(n).A_(e)}function Fm(n,e){n.Q_.xe(e),$r(n).R_(e)}function pl(n){n.Q_=new aS({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),$r(n).start(),n.q_.v_()}function ml(n){return Gn(n)&&!$r(n).n_()&&n.N_.size>0}function Gn(n){return z(n).L_.size===0}function $m(n){n.Q_=void 0}async function aC(n){n.q_.set("Online")}async function cC(n){n.N_.forEach((e,t)=>{fl(n,e)})}async function lC(n,e){$m(n),ml(n)?(n.q_.M_(e),pl(n)):n.q_.set("Unknown")}async function uC(n,e,t){if(n.q_.set("Online"),e instanceof Rm&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.N_.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.N_.delete(c),s.Q_.removeTarget(c))}(n,e)}catch(r){U("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await _o(n,r)}else if(e instanceof Ji?n.Q_.Ke(e):e instanceof bm?n.Q_.He(e):n.Q_.We(e),!t.isEqual(K.min()))try{const r=await Vm(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.Q_.rt(a);return c.targetChanges.forEach((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.N_.get(h);f&&i.N_.set(h,f.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,h)=>{const f=i.N_.get(l);if(!f)return;i.N_.set(l,f.withResumeToken(we.EMPTY_BYTE_STRING,f.snapshotVersion)),Fm(i,l);const g=new Qt(f.target,l,h,f.sequenceNumber);fl(i,g)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){U("RemoteStore","Failed to raise snapshot:",r),await _o(n,r)}}async function _o(n,e,t){if(!ti(e))throw e;n.L_.add(1),await ii(n),n.q_.set("Offline"),t||(t=()=>Vm(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{U("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Bo(n)})}function Bm(n,e){return e().catch(t=>_o(n,t,e))}async function jo(n){const e=z(n),t=cn(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;hC(e);)try{const s=await GS(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,dC(e,s)}catch(s){await _o(e,s)}jm(e)&&qm(e)}function hC(n){return Gn(n)&&n.O_.length<10}function dC(n,e){n.O_.push(e);const t=cn(n);t.r_()&&t.V_&&t.m_(e.mutations)}function jm(n){return Gn(n)&&!cn(n).n_()&&n.O_.length>0}function qm(n){cn(n).start()}async function fC(n){cn(n).p_()}async function pC(n){const e=cn(n);for(const t of n.O_)e.m_(t.mutations)}async function mC(n,e,t){const r=n.O_.shift(),s=ol.from(r,e,t);await Bm(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await jo(n)}async function gC(n,e){e&&cn(n).V_&&await async function(r,s){if(function(a){return sS(a)&&a!==P.ABORTED}(s.code)){const i=r.O_.shift();cn(r).s_(),await Bm(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await jo(r)}}(n,e),jm(n)&&qm(n)}async function yd(n,e){const t=z(n);t.asyncQueue.verifyOperationInProgress(),U("RemoteStore","RemoteStore received new credentials");const r=Gn(t);t.L_.add(3),await ii(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Bo(t)}async function _C(n,e){const t=z(n);e?(t.L_.delete(2),await Bo(t)):e||(t.L_.add(2),await ii(t),t.q_.set("Unknown"))}function $r(n){return n.K_||(n.K_=function(t,r,s){const i=z(t);return i.w_(),new nC(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:aC.bind(null,n),Ro:cC.bind(null,n),mo:lC.bind(null,n),d_:uC.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),ml(n)?pl(n):n.q_.set("Unknown")):(await n.K_.stop(),$m(n))})),n.K_}function cn(n){return n.U_||(n.U_=function(t,r,s){const i=z(t);return i.w_(),new rC(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:fC.bind(null,n),mo:gC.bind(null,n),f_:pC.bind(null,n),g_:mC.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await jo(n)):(await n.U_.stop(),n.O_.length>0&&(U("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new gl(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function _l(n,e){if(kt("AsyncQueue",`${e}: ${n}`),ti(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e){this.comparator=e?(t,r)=>e(t,r)||B.comparator(t.key,r.key):(t,r)=>B.comparator(t.key,r.key),this.keyedMap=gs(),this.sortedSet=new re(this.comparator)}static emptySet(e){return new gr(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof gr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new gr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(){this.W_=new re(B.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):W():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Pr{constructor(e,t,r,s,i,a,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Pr(e,t,gr.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Vo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yC{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class EC{constructor(){this.queries=vd(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=z(t),i=s.queries;s.queries=vd(),i.forEach((a,c)=>{for(const l of c.j_)l.onError(r)})})(this,new V(P.ABORTED,"Firestore shutting down"))}}function vd(){return new Fr(n=>dm(n),Vo)}async function Hm(n,e){const t=z(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new yC,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=_l(a,`Initialization of query '${cr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&yl(t)}async function Wm(n,e){const t=z(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.j_.indexOf(e);a>=0&&(i.j_.splice(a,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function vC(n,e){const t=z(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.j_)c.X_(s)&&(r=!0);a.z_=s}}r&&yl(t)}function TC(n,e,t){const r=z(n),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(t);r.queries.delete(e)}function yl(n){n.Y_.forEach(e=>{e.next()})}var Ec,Td;(Td=Ec||(Ec={})).ea="default",Td.Cache="cache";class Km{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Pr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Pr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Ec.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e){this.key=e}}class Gm{constructor(e){this.key=e}}class wC{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=G(),this.mutatedKeys=G(),this.Aa=fm(e),this.Ra=new gr(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Ed,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,g)=>{const E=s.get(f),I=Mo(this.query,g)?g:null,C=!!E&&this.mutatedKeys.has(E.key),O=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let S=!1;E&&I?E.data.isEqual(I.data)?C!==O&&(r.track({type:3,doc:I}),S=!0):this.ga(E,I)||(r.track({type:2,doc:I}),S=!0,(l&&this.Aa(I,l)>0||h&&this.Aa(I,h)<0)&&(c=!0)):!E&&I?(r.track({type:0,doc:I}),S=!0):E&&!I&&(r.track({type:1,doc:E}),S=!0,(l||h)&&(c=!0)),S&&(I?(a=a.add(I),i=O?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{Ra:a,fa:r,ns:c,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((f,g)=>function(I,C){const O=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W()}};return O(I)-O(C)}(f.type,g.type)||this.Aa(f.doc,g.doc)),this.pa(r),s=s!=null&&s;const c=t&&!s?this.ya():[],l=this.da.size===0&&this.current&&!s?1:0,h=l!==this.Ea;return this.Ea=l,a.length!==0||h?{snapshot:new Pr(this.query,e.Ra,i,a,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Ed,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=G(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new Gm(r))}),this.da.forEach(r=>{e.has(r)||t.push(new zm(r))}),t}ba(e){this.Ta=e.Ts,this.da=G();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Pr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class AC{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class IC{constructor(e){this.key=e,this.va=!1}}class bC{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new Fr(c=>dm(c),Vo),this.Ma=new Map,this.xa=new Set,this.Oa=new re(B.comparator),this.Na=new Map,this.La=new ll,this.Ba={},this.ka=new Map,this.qa=Cr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function RC(n,e,t=!0){const r=eg(n);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Ym(r,e,t,!0),s}async function SC(n,e){const t=eg(n);await Ym(t,e,!0,!1)}async function Ym(n,e,t,r){const s=await YS(n.localStore,dt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await CC(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Um(n.remoteStore,s),c}async function CC(n,e,t,r,s){n.Ka=(g,E,I)=>async function(O,S,M,F){let x=S.view.ma(M);x.ns&&(x=await md(O.localStore,S.query,!1).then(({documents:T})=>S.view.ma(T,x)));const L=F&&F.targetChanges.get(S.targetId),H=F&&F.targetMismatches.get(S.targetId)!=null,$=S.view.applyChanges(x,O.isPrimaryClient,L,H);return Ad(O,S.targetId,$.wa),$.snapshot}(n,g,E,I);const i=await md(n.localStore,e,!0),a=new wC(e,i.Ts),c=a.ma(i.documents),l=si.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,l);Ad(n,t,h.wa);const f=new AC(e,t,a);return n.Fa.set(e,f),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),h.snapshot}async function PC(n,e,t){const r=z(n),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(a=>!Vo(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await yc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&dl(r.remoteStore,s.targetId),vc(r,s.targetId)}).catch(ei)):(vc(r,s.targetId),await yc(r.localStore,s.targetId,!0))}async function OC(n,e){const t=z(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),dl(t.remoteStore,r.targetId))}async function NC(n,e,t){const r=UC(n);try{const s=await function(a,c){const l=z(a),h=fe.now(),f=c.reduce((I,C)=>I.add(C.key),G());let g,E;return l.persistence.runTransaction("Locally write mutations","readwrite",I=>{let C=Lt(),O=G();return l.cs.getEntries(I,f).next(S=>{C=S,C.forEach((M,F)=>{F.isValidDocument()||(O=O.add(M))})}).next(()=>l.localDocuments.getOverlayedDocuments(I,C)).next(S=>{g=S;const M=[];for(const F of c){const x=ZR(F,g.get(F.key).overlayedDocument);x!=null&&M.push(new fn(F.key,x,sm(x.value.mapValue),tt.exists(!0)))}return l.mutationQueue.addMutationBatch(I,h,M,c)}).next(S=>{E=S;const M=S.applyToLocalDocumentSet(g,O);return l.documentOverlayCache.saveOverlays(I,S.batchId,M)})}).then(()=>({batchId:E.batchId,changes:mm(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,l){let h=a.Ba[a.currentUser.toKey()];h||(h=new re(J)),h=h.insert(c,l),a.Ba[a.currentUser.toKey()]=h}(r,s.batchId,t),await oi(r,s.changes),await jo(r.remoteStore)}catch(s){const i=_l(s,"Failed to persist write");t.reject(i)}}async function Qm(n,e){const t=z(n);try{const r=await KS(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Na.get(i);a&&(Z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?Z(a.va):s.removedDocuments.size>0&&(Z(a.va),a.va=!1))}),await oi(t,r,e)}catch(r){await ei(r)}}function wd(n,e,t){const r=z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((i,a)=>{const c=a.view.Z_(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const l=z(a);l.onlineState=c;let h=!1;l.queries.forEach((f,g)=>{for(const E of g.j_)E.Z_(c)&&(h=!0)}),h&&yl(l)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function DC(n,e,t){const r=z(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),i=s&&s.key;if(i){let a=new re(B.comparator);a=a.insert(i,Se.newNoDocument(i,K.min()));const c=G().add(i),l=new Fo(K.min(),new Map,new re(J),a,c);await Qm(r,l),r.Oa=r.Oa.remove(i),r.Na.delete(e),El(r)}else await yc(r.localStore,e,!1).then(()=>vc(r,e,t)).catch(ei)}async function kC(n,e){const t=z(n),r=e.batch.batchId;try{const s=await WS(t.localStore,e);Jm(t,r,null),Xm(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await oi(t,s)}catch(s){await ei(s)}}async function LC(n,e,t){const r=z(n);try{const s=await function(a,c){const l=z(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next(g=>(Z(g!==null),f=g.keys(),l.mutationQueue.removeMutationBatch(h,g))).next(()=>l.mutationQueue.performConsistencyCheck(h)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>l.localDocuments.getDocuments(h,f))})}(r.localStore,e);Jm(r,e,t),Xm(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await oi(r,s)}catch(s){await ei(s)}}function Xm(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Jm(n,e,t){const r=z(n);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function vc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||Zm(n,r)})}function Zm(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(dl(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),El(n))}function Ad(n,e,t){for(const r of t)r instanceof zm?(n.La.addReference(r.key,e),VC(n,r)):r instanceof Gm?(U("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||Zm(n,r.key)):W()}function VC(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(U("SyncEngine","New document in limbo: "+t),n.xa.add(r),El(n))}function El(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new B(ne.fromString(e)),r=n.qa.next();n.Na.set(r,new IC(t)),n.Oa=n.Oa.insert(t,r),Um(n.remoteStore,new Qt(dt(rl(t.path)),r,"TargetPurposeLimboResolution",Xc.oe))}}async function oi(n,e,t){const r=z(n),s=[],i=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((c,l)=>{a.push(r.Ka(l,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const g=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(h){s.push(h);const g=hl.Wi(l.targetId,h);i.push(g)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(l,h){const f=z(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>D.forEach(h,E=>D.forEach(E.$i,I=>f.persistence.referenceDelegate.addReference(g,E.targetId,I)).next(()=>D.forEach(E.Ui,I=>f.persistence.referenceDelegate.removeReference(g,E.targetId,I)))))}catch(g){if(!ti(g))throw g;U("LocalStore","Failed to update sequence numbers: "+g)}for(const g of h){const E=g.targetId;if(!g.fromCache){const I=f.os.get(E),C=I.snapshotVersion,O=I.withLastLimboFreeSnapshotVersion(C);f.os=f.os.insert(E,O)}}}(r.localStore,i))}async function MC(n,e){const t=z(n);if(!t.currentUser.isEqual(e)){U("SyncEngine","User change. New user:",e.toKey());const r=await Lm(t.localStore,e);t.currentUser=e,function(i,a){i.ka.forEach(c=>{c.forEach(l=>{l.reject(new V(P.CANCELLED,a))})}),i.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await oi(t,r.hs)}}function xC(n,e){const t=z(n),r=t.Na.get(e);if(r&&r.va)return G().add(r.key);{let s=G();const i=t.Ma.get(e);if(!i)return s;for(const a of i){const c=t.Fa.get(a);s=s.unionWith(c.view.Va)}return s}}function eg(n){const e=z(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Qm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=xC.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=DC.bind(null,e),e.Ca.d_=vC.bind(null,e.eventManager),e.Ca.$a=TC.bind(null,e.eventManager),e}function UC(n){const e=z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=kC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=LC.bind(null,e),e}class yo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=$o(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return HS(this.persistence,new jS,e.initialUser,this.serializer)}Ga(e){return new FS(ul.Zr,this.serializer)}Wa(e){return new XS}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}yo.provider={build:()=>new yo};class Tc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>wd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=MC.bind(null,this.syncEngine),await _C(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new EC}()}createDatastore(e){const t=$o(e.databaseInfo.databaseId),r=function(i){return new tC(i)}(e.databaseInfo);return function(i,a,c,l){return new sC(i,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new oC(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>wd(this.syncEngine,t,0),function(){return _d.D()?new _d:new JS}())}createSyncEngine(e,t){return function(s,i,a,c,l,h,f){const g=new bC(s,i,a,c,l,h);return f&&(g.Qa=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=z(s);U("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await ii(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Tc.provider={build:()=>new Tc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):kt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FC{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Re.UNAUTHENTICATED,this.clientId=tm.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{U("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(U("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ct;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=_l(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ja(n,e){n.asyncQueue.verifyOperationInProgress(),U("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Lm(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Id(n,e){n.asyncQueue.verifyOperationInProgress();const t=await $C(n);U("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>yd(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>yd(e.remoteStore,s)),n._onlineComponents=e}async function $C(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){U("FirestoreClient","Using user provided OfflineComponentProvider");try{await ja(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Ir("Error using user provided cache. Falling back to memory cache: "+t),await ja(n,new yo)}}else U("FirestoreClient","Using default OfflineComponentProvider"),await ja(n,new yo);return n._offlineComponents}async function ng(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(U("FirestoreClient","Using user provided OnlineComponentProvider"),await Id(n,n._uninitializedComponentsProvider._online)):(U("FirestoreClient","Using default OnlineComponentProvider"),await Id(n,new Tc))),n._onlineComponents}function BC(n){return ng(n).then(e=>e.syncEngine)}async function rg(n){const e=await ng(n),t=e.eventManager;return t.onListen=RC.bind(null,e.syncEngine),t.onUnlisten=PC.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=SC.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=OC.bind(null,e.syncEngine),t}function jC(n,e,t={}){const r=new Ct;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,h){const f=new tg({next:E=>{f.Za(),a.enqueueAndForget(()=>Wm(i,g));const I=E.docs.has(c);!I&&E.fromCache?h.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&E.fromCache&&l&&l.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(E)},error:E=>h.reject(E)}),g=new Km(rl(c.path),f,{includeMetadataChanges:!0,_a:!0});return Hm(i,g)}(await rg(n),n.asyncQueue,e,t,r)),r.promise}function qC(n,e,t={}){const r=new Ct;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,h){const f=new tg({next:E=>{f.Za(),a.enqueueAndForget(()=>Wm(i,g)),E.fromCache&&l.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(E)},error:E=>h.reject(E)}),g=new Km(c,f,{includeMetadataChanges:!0,_a:!0});return Hm(i,g)}(await rg(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ig(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function HC(n,e,t,r){if(e===!0&&r===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Rd(n){if(!B.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Sd(n){if(B.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function qo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W()}function Vt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=qo(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}HC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sg((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ho{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cd({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cd(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new aR;switch(r.type){case"firstParty":return new hR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=bd.get(t);r&&(U("ComponentProvider","Removing Datastore"),bd.delete(t),r.terminate())}(this),Promise.resolve()}}function WC(n,e,t,r={}){var s;const i=(n=Vt(n,Ho))._getSettings(),a=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==a&&Ir("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:a,ssl:!1})),r.mockUserToken){let c,l;if(typeof r.mockUserToken=="string")c=r.mockUserToken,l=Re.MOCK_USER;else{c=lp(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new Re(h)}n._authCredentials=new cR(new em(c,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Br(this.firestore,e,this._query)}}class Ue{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new en(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ue(this.firestore,e,this._key)}}class en extends Br{constructor(e,t,r){super(e,t,rl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ue(this.firestore,null,new B(e))}withConverter(e){return new en(this.firestore,e,this._path)}}function Yn(n,e,...t){if(n=ie(n),ig("collection","path",e),n instanceof Ho){const r=ne.fromString(e,...t);return Sd(r),new en(n,null,r)}{if(!(n instanceof Ue||n instanceof en))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return Sd(r),new en(n.firestore,null,r)}}function ai(n,e,...t){if(n=ie(n),arguments.length===1&&(e=tm.newId()),ig("doc","path",e),n instanceof Ho){const r=ne.fromString(e,...t);return Rd(r),new Ue(n,null,new B(r))}{if(!(n instanceof Ue||n instanceof en))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return Rd(r),new Ue(n.firestore,n instanceof en?n.converter:null,new B(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Mm(this,"async_queue_retry"),this.Vu=()=>{const r=Ba();r&&U("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=Ba();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Ba();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Ct;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ti(e))throw e;U("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw kt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=gl.createAndSchedule(this,e,t,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&W()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class jr extends Ho{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Pd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Pd(e),this._firestoreClient=void 0,await e}}}function KC(n,e){const t=typeof n=="object"?n:$c(),r=typeof n=="string"?n:"(default)",s=Po(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=op("firestore");i&&WC(s,...i)}return s}function vl(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||zC(n),n._firestoreClient}function zC(n){var e,t,r;const s=n._freezeSettings(),i=function(c,l,h,f){return new IR(c,l,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,sg(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new FC(n._authCredentials,n._appCheckCredentials,n._queue,i,n._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Or(we.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Or(we.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GC=/^__.*__$/;class YC{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new fn(e,this.data,this.fieldMask,t,this.fieldTransforms):new ri(e,this.data,t,this.fieldTransforms)}}class og{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new fn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ag(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W()}}class Al{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Al(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Eo(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(ag(this.Cu)&&GC.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class QC{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||$o(e)}Qu(e,t,r,s=!1){return new Al({Cu:e,methodName:t,qu:r,path:ve.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Il(n){const e=n._freezeSettings(),t=$o(n._databaseId);return new QC(n._databaseId,!!e.ignoreUndefinedProperties,t)}function XC(n,e,t,r,s,i={}){const a=n.Qu(i.merge||i.mergeFields?2:0,e,t,s);Rl("Data must be an object, but it was:",a,r);const c=cg(r,a);let l,h;if(i.merge)l=new Be(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const E=wc(e,g,t);if(!a.contains(E))throw new V(P.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);ug(f,E)||f.push(E)}l=new Be(f),h=a.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,h=a.fieldTransforms;return new YC(new xe(c),l,h)}class zo extends Ko{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zo}}class bl extends Ko{_toFieldTransform(e){return new YR(e.path,new Vs)}isEqual(e){return e instanceof bl}}function JC(n,e,t,r){const s=n.Qu(1,e,t);Rl("Data must be an object, but it was:",s,r);const i=[],a=xe.empty();zn(r,(l,h)=>{const f=Sl(e,l,t);h=ie(h);const g=s.Nu(f);if(h instanceof zo)i.push(f);else{const E=ci(h,g);E!=null&&(i.push(f),a.set(f,E))}});const c=new Be(i);return new og(a,c,s.fieldTransforms)}function ZC(n,e,t,r,s,i){const a=n.Qu(1,e,t),c=[wc(e,r,t)],l=[s];if(i.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)c.push(wc(e,i[E])),l.push(i[E+1]);const h=[],f=xe.empty();for(let E=c.length-1;E>=0;--E)if(!ug(h,c[E])){const I=c[E];let C=l[E];C=ie(C);const O=a.Nu(I);if(C instanceof zo)h.push(I);else{const S=ci(C,O);S!=null&&(h.push(I),f.set(I,S))}}const g=new Be(h);return new og(f,g,a.fieldTransforms)}function e0(n,e,t,r=!1){return ci(t,n.Qu(r?4:3,e))}function ci(n,e){if(lg(n=ie(n)))return Rl("Unsupported field value:",e,n),cg(n,e);if(n instanceof Ko)return function(r,s){if(!ag(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let l=ci(c,s.Lu(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=ie(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return KR(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=fe.fromDate(r);return{timestampValue:go(s.serializer,i)}}if(r instanceof fe){const i=new fe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:go(s.serializer,i)}}if(r instanceof Tl)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Or)return{bytesValue:Sm(s.serializer,r._byteString)};if(r instanceof Ue){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:cl(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof wl)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(l=>{if(typeof l!="number")throw c.Bu("VectorValues must only contain numeric values.");return sl(c.serializer,l)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${qo(r)}`)}(n,e)}function cg(n,e){const t={};return nm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):zn(n,(r,s)=>{const i=ci(s,e.Mu(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function lg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof fe||n instanceof Tl||n instanceof Or||n instanceof Ue||n instanceof Ko||n instanceof wl)}function Rl(n,e,t){if(!lg(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=qo(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function wc(n,e,t){if((e=ie(e))instanceof Wo)return e._internalPath;if(typeof e=="string")return Sl(n,e);throw Eo("Field path arguments must be of type string or ",n,!1,void 0,t)}const t0=new RegExp("[~\\*/\\[\\]]");function Sl(n,e,t){if(e.search(t0)>=0)throw Eo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Wo(...e.split("."))._internalPath}catch{throw Eo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Eo(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new V(P.INVALID_ARGUMENT,c+n+l)}function ug(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new n0(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Cl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class n0 extends hg{data(){return super.data()}}function Cl(n,e){return typeof e=="string"?Sl(n,e):e instanceof Wo?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r0(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Pl{}class s0 extends Pl{}function Nr(n,e,...t){let r=[];e instanceof Pl&&r.push(e),r=r.concat(t),function(i){const a=i.filter(l=>l instanceof Ol).length,c=i.filter(l=>l instanceof Go).length;if(a>1||a>0&&c>0)throw new V(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Go extends s0{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Go(e,t,r)}_apply(e){const t=this._parse(e);return dg(e._query,t),new Br(e.firestore,e.converter,dc(e._query,t))}_parse(e){const t=Il(e.firestore);return function(i,a,c,l,h,f,g){let E;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new V(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Nd(g,f);const I=[];for(const C of g)I.push(Od(l,i,C));E={arrayValue:{values:I}}}else E=Od(l,i,g)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Nd(g,f),E=e0(c,a,g,f==="in"||f==="not-in");return he.create(h,f,E)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Yo(n,e,t){const r=e,s=Cl("where",n);return Go._create(s,r,t)}class Ol extends Pl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ol(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:rt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const l of c)dg(a,l),a=dc(a,l)}(e._query,t),new Br(e.firestore,e.converter,dc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Od(n,e,t){if(typeof(t=ie(t))=="string"){if(t==="")throw new V(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!hm(e)&&t.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ne.fromString(t));if(!B.isDocumentKey(r))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Jh(n,new B(r))}if(t instanceof Ue)return Jh(n,t._key);throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${qo(t)}.`)}function Nd(n,e){if(!Array.isArray(n)||n.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function dg(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class i0{convertValue(e,t="none"){switch($n(e)){case 0:return null;case 1:return e.booleanValue;case 2:return le(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Fn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw W()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return zn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var t,r,s;const i=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>le(a.doubleValue));return new wl(i)}convertGeoPoint(e){return new Tl(le(e.latitude),le(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Zc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ds(e));default:return null}}convertTimestamp(e){const t=an(e);return new fe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ne.fromString(e);Z(km(r));const s=new ks(r.get(1),r.get(3)),i=new B(r.popFirst(5));return s.isEqual(t)||kt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o0(n,e,t){let r;return r=n?n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class fg extends hg{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Zi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Cl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Zi extends fg{data(e={}){return super.data(e)}}class a0{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ys(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Zi(this._firestore,this._userDataWriter,r.key,r,new ys(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const l=new Zi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ys(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new Zi(s._firestore,s._userDataWriter,c.doc.key,c.doc,new ys(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:c0(c.type),doc:l,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function c0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l0(n){n=Vt(n,Ue);const e=Vt(n.firestore,jr);return jC(vl(e),n._key).then(t=>h0(e,n,t))}class pg extends i0{constructor(e){super(),this.firestore=e}convertBytes(e){return new Or(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ue(this.firestore,null,t)}}function li(n){n=Vt(n,Br);const e=Vt(n.firestore,jr),t=vl(e),r=new pg(e);return r0(n._query),qC(t,n._query).then(s=>new a0(e,r,n,s))}function mg(n,e,t,...r){n=Vt(n,Ue);const s=Vt(n.firestore,jr),i=Il(s);let a;return a=typeof(e=ie(e))=="string"||e instanceof Wo?ZC(i,"updateDoc",n._key,e,t,r):JC(i,"updateDoc",n._key,e),Nl(s,[a.toMutation(n._key,tt.exists(!0))])}function u0(n){return Nl(Vt(n.firestore,jr),[new il(n._key,tt.none())])}function gg(n,e){const t=Vt(n.firestore,jr),r=ai(n),s=o0(n.converter,e);return Nl(t,[XC(Il(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,tt.exists(!1))]).then(()=>r)}function Nl(n,e){return function(r,s){const i=new Ct;return r.asyncQueue.enqueueAndForget(async()=>NC(await BC(r),s,i)),i.promise}(vl(n),e)}function h0(n,e,t){const r=t.docs.get(e._key),s=new pg(n);return new fg(n,s,e._key,r,new ys(t.hasPendingWrites,t.fromCache),e.converter)}function Dr(){return new bl("serverTimestamp")}(function(e,t=!0){(function(s){Ur=s})(Wn),Mn(new sn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new jr(new lR(r.getProvider("auth-internal")),new fR(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ks(h.options.projectId,f)}(a,s),a);return i=Object.assign({useFetchStreams:t},i),c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),lt(zh,"4.7.3",e),lt(zh,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _g="firebasestorage.googleapis.com",yg="storageBucket",d0=2*60*1e3,f0=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae extends gt{constructor(e,t,r=0){super(qa(e),`Firebase Storage: ${t} (${qa(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ae.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return qa(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var oe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(oe||(oe={}));function qa(n){return"storage/"+n}function Dl(){const n="An unknown error occurred, please check the error payload for server response.";return new ae(oe.UNKNOWN,n)}function p0(n){return new ae(oe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function m0(n){return new ae(oe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function g0(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ae(oe.UNAUTHENTICATED,n)}function _0(){return new ae(oe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function y0(n){return new ae(oe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function E0(){return new ae(oe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function v0(){return new ae(oe.CANCELED,"User canceled the upload/download.")}function T0(n){return new ae(oe.INVALID_URL,"Invalid URL '"+n+"'.")}function w0(n){return new ae(oe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function A0(){return new ae(oe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+yg+"' property when initializing the app?")}function I0(){return new ae(oe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function b0(){return new ae(oe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function R0(n){return new ae(oe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Ac(n){return new ae(oe.INVALID_ARGUMENT,n)}function Eg(){return new ae(oe.APP_DELETED,"The Firebase app was deleted.")}function S0(n){return new ae(oe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Rs(n,e){return new ae(oe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ds(n){throw new ae(oe.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=je.makeFromUrl(e,t)}catch{return new je(e,"")}if(r.path==="")return r;throw w0(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(L){L.path.charAt(L.path.length-1)==="/"&&(L.path_=L.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+s+a,"i"),l={bucket:1,path:3};function h(L){L.path_=decodeURIComponent(L.path)}const f="v[A-Za-z0-9_]+",g=t.replace(/[.]/g,"\\."),E="(/([^?#]*).*)?$",I=new RegExp(`^https?://${g}/${f}/b/${s}/o${E}`,"i"),C={bucket:1,path:3},O=t===_g?"(?:storage.googleapis.com|storage.cloud.google.com)":t,S="([^?#]*)",M=new RegExp(`^https?://${O}/${s}/${S}`,"i"),x=[{regex:c,indices:l,postModify:i},{regex:I,indices:C,postModify:h},{regex:M,indices:{bucket:1,path:2},postModify:h}];for(let L=0;L<x.length;L++){const H=x[L],$=H.regex.exec(e);if($){const T=$[H.indices.bucket];let m=$[H.indices.path];m||(m=""),r=new je(T,m),H.postModify(r);break}}if(r==null)throw T0(e);return r}}class C0{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P0(n,e,t){let r=1,s=null,i=null,a=!1,c=0;function l(){return c===2}let h=!1;function f(...S){h||(h=!0,e.apply(null,S))}function g(S){s=setTimeout(()=>{s=null,n(I,l())},S)}function E(){i&&clearTimeout(i)}function I(S,...M){if(h){E();return}if(S){E(),f.call(null,S,...M);return}if(l()||a){E(),f.call(null,S,...M);return}r<64&&(r*=2);let x;c===1?(c=2,x=0):x=(r+Math.random())*1e3,g(x)}let C=!1;function O(S){C||(C=!0,E(),!h&&(s!==null?(S||(c=2),clearTimeout(s),g(0)):S||(c=1)))}return g(0),i=setTimeout(()=>{a=!0,O(!0)},t),O}function O0(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N0(n){return n!==void 0}function D0(n){return typeof n=="object"&&!Array.isArray(n)}function kl(n){return typeof n=="string"||n instanceof String}function Dd(n){return Ll()&&n instanceof Blob}function Ll(){return typeof Blob<"u"}function kd(n,e,t,r){if(r<e)throw Ac(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Ac(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function vg(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var On;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(On||(On={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k0(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L0{constructor(e,t,r,s,i,a,c,l,h,f,g,E=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=l,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=g,this.retry=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((I,C)=>{this.resolve_=I,this.reject_=C,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new $i(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=c=>{const l=c.loaded,h=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,h)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const c=i.getErrorCode()===On.NO_ERROR,l=i.getStatus();if(!c||k0(l,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===On.ABORT;r(!1,new $i(!1,null,f));return}const h=this.successCodes_.indexOf(l)!==-1;r(!0,new $i(h,i))})},t=(r,s)=>{const i=this.resolve_,a=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(c,c.getResponse());N0(l)?i(l):i()}catch(l){a(l)}else if(c!==null){const l=Dl();l.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,l)):a(l)}else if(s.canceled){const l=this.appDelete_?Eg():v0();a(l)}else{const l=E0();a(l)}};this.canceled_?t(!1,new $i(!1,null,!0)):this.backoffId_=P0(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&O0(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class $i{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function V0(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function M0(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function x0(n,e){e&&(n["X-Firebase-GMPID"]=e)}function U0(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function F0(n,e,t,r,s,i,a=!0){const c=vg(n.urlParams),l=n.url+c,h=Object.assign({},n.headers);return x0(h,e),V0(h,t),M0(h,i),U0(h,r),new L0(l,n.method,h,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $0(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function B0(...n){const e=$0();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Ll())return new Blob(n);throw new ae(oe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function j0(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q0(n){if(typeof atob>"u")throw R0("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Ha{constructor(e,t){this.data=e,this.contentType=t||null}}function H0(n,e){switch(n){case at.RAW:return new Ha(Tg(e));case at.BASE64:case at.BASE64URL:return new Ha(wg(n,e));case at.DATA_URL:return new Ha(K0(e),z0(e))}throw Dl()}function Tg(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,a=n.charCodeAt(++t);r=65536|(i&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function W0(n){let e;try{e=decodeURIComponent(n)}catch{throw Rs(at.DATA_URL,"Malformed data URL.")}return Tg(e)}function wg(n,e){switch(n){case at.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Rs(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case at.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Rs(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=q0(e)}catch(s){throw s.message.includes("polyfill")?s:Rs(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Ag{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Rs(at.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=G0(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function K0(n){const e=new Ag(n);return e.base64?wg(at.BASE64,e.rest):W0(e.rest)}function z0(n){return new Ag(n).contentType}function G0(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,t){let r=0,s="";Dd(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Dd(this.data_)){const r=this.data_,s=j0(r,e,t);return s===null?null:new Yt(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Yt(r,!0)}}static getBlob(...e){if(Ll()){const t=e.map(r=>r instanceof Yt?r.data_:r);return new Yt(B0.apply(null,t))}else{const t=e.map(a=>kl(a)?H0(at.RAW,a).data:a.data_);let r=0;t.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(a=>{for(let c=0;c<a.length;c++)s[i++]=a[c]}),new Yt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ig(n){let e;try{e=JSON.parse(n)}catch{return null}return D0(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y0(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Q0(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function bg(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X0(n,e){return e}class Ne{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||X0}}let Bi=null;function J0(n){return!kl(n)||n.length<2?n:bg(n)}function Rg(){if(Bi)return Bi;const n=[];n.push(new Ne("bucket")),n.push(new Ne("generation")),n.push(new Ne("metageneration")),n.push(new Ne("name","fullPath",!0));function e(i,a){return J0(a)}const t=new Ne("name");t.xform=e,n.push(t);function r(i,a){return a!==void 0?Number(a):a}const s=new Ne("size");return s.xform=r,n.push(s),n.push(new Ne("timeCreated")),n.push(new Ne("updated")),n.push(new Ne("md5Hash",null,!0)),n.push(new Ne("cacheControl",null,!0)),n.push(new Ne("contentDisposition",null,!0)),n.push(new Ne("contentEncoding",null,!0)),n.push(new Ne("contentLanguage",null,!0)),n.push(new Ne("contentType",null,!0)),n.push(new Ne("metadata","customMetadata",!0)),Bi=n,Bi}function Z0(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new je(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function eP(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const a=t[i];r[a.local]=a.xform(r,e[a.server])}return Z0(r,n),r}function Sg(n,e,t){const r=Ig(e);return r===null?null:eP(n,r,t)}function tP(n,e,t,r){const s=Ig(e);if(s===null||!kl(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(h=>{const f=n.bucket,g=n.fullPath,E="/b/"+a(f)+"/o/"+a(g),I=Vl(E,t,r),C=vg({alt:"media",token:h});return I+C})[0]}function nP(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class Cg{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pg(n){if(!n)throw Dl()}function rP(n,e){function t(r,s){const i=Sg(n,s,e);return Pg(i!==null),i}return t}function sP(n,e){function t(r,s){const i=Sg(n,s,e);return Pg(i!==null),tP(i,s,n.host,n._protocol)}return t}function Og(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=_0():s=g0():t.getStatus()===402?s=m0(n.bucket):t.getStatus()===403?s=y0(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function iP(n){const e=Og(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=p0(n.path)),i.serverResponse=s.serverResponse,i}return t}function oP(n,e,t){const r=e.fullServerUrl(),s=Vl(r,n.host,n._protocol),i="GET",a=n.maxOperationRetryTime,c=new Cg(s,i,sP(n,t),a);return c.errorHandler=iP(e),c}function aP(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function cP(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=aP(null,e)),r}function lP(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function c(){let x="";for(let L=0;L<2;L++)x=x+Math.random().toString().slice(2);return x}const l=c();a["Content-Type"]="multipart/related; boundary="+l;const h=cP(e,r,s),f=nP(h,t),g="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+l+`\r
Content-Type: `+h.contentType+`\r
\r
`,E=`\r
--`+l+"--",I=Yt.getBlob(g,r,E);if(I===null)throw I0();const C={name:h.fullPath},O=Vl(i,n.host,n._protocol),S="POST",M=n.maxUploadRetryTime,F=new Cg(O,S,rP(n,t),M);return F.urlParams=C,F.headers=a,F.body=I.uploadData(),F.errorHandler=Og(e),F}class uP{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=On.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=On.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=On.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s){if(this.sent_)throw ds("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ds("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ds("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ds("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ds("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class hP extends uP{initXhr(){this.xhr_.responseType="text"}}function Ng(){return new hP}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,t){this._service=e,t instanceof je?this._location=t:this._location=je.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Bn(e,t)}get root(){const e=new je(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return bg(this._location.path)}get storage(){return this._service}get parent(){const e=Y0(this._location.path);if(e===null)return null;const t=new je(this._location.bucket,e);return new Bn(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw S0(e)}}function dP(n,e,t){n._throwIfRoot("uploadBytes");const r=lP(n.storage,n._location,Rg(),new Yt(e,!0),t);return n.storage.makeRequestWithTokens(r,Ng).then(s=>({metadata:s,ref:n}))}function fP(n){n._throwIfRoot("getDownloadURL");const e=oP(n.storage,n._location,Rg());return n.storage.makeRequestWithTokens(e,Ng).then(t=>{if(t===null)throw b0();return t})}function pP(n,e){const t=Q0(n._location.path,e),r=new je(n._location.bucket,t);return new Bn(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mP(n){return/^[A-Za-z]+:\/\//.test(n)}function gP(n,e){return new Bn(n,e)}function Dg(n,e){if(n instanceof Ml){const t=n;if(t._bucket==null)throw A0();const r=new Bn(t,t._bucket);return e!=null?Dg(r,e):r}else return e!==void 0?pP(n,e):n}function _P(n,e){if(e&&mP(e)){if(n instanceof Ml)return gP(n,e);throw Ac("To use ref(service, url), the first argument must be a Storage instance.")}else return Dg(n,e)}function Ld(n,e){const t=e==null?void 0:e[yg];return t==null?null:je.makeFromBucketSpec(t,n)}function yP(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:lp(s,n.app.options.projectId))}class Ml{constructor(e,t,r,s,i){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=_g,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=d0,this._maxUploadRetryTime=f0,this._requests=new Set,s!=null?this._bucket=je.makeFromBucketSpec(s,this._host):this._bucket=Ld(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=je.makeFromBucketSpec(this._url,e):this._bucket=Ld(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){kd("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){kd("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Bn(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new C0(Eg());{const a=F0(e,this._appId,r,s,t,this._firebaseVersion,i);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const Vd="@firebase/storage",Md="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg="storage";function EP(n,e,t){return n=ie(n),dP(n,e,t)}function vP(n){return n=ie(n),fP(n)}function TP(n,e){return n=ie(n),_P(n,e)}function wP(n=$c(),e){n=ie(n);const r=Po(n,kg).getImmediate({identifier:e}),s=op("storage");return s&&AP(r,...s),r}function AP(n,e,t,r={}){yP(n,e,t,r)}function IP(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Ml(t,r,s,e,Wn)}function bP(){Mn(new sn(kg,IP,"PUBLIC").setMultipleInstances(!0)),lt(Vd,Md,""),lt(Vd,Md,"esm2017")}bP();const xl=Ah().length?Ah()[0]:dp(Tt.FIREBASE),Qo=iR(xl),it=KC(xl),RP=wP(xl),vo={id:"xoroniq-essential-kit",name:"XORONIQ Essential Kit",slug:"xoroniq-essential-kit",category:"CAR & BIKE CARE",categories:["CAR CARE","BIKE CARE","KITS"],price:1199,compareAtPrice:1499,discount:20,stock:50,sku:"XOR-KIT-001",featured:!0,active:!0,isComingSoon:!1,launchStatus:"AVAILABLE NOW",shortDescription:"Everything you need for a premium clean. Professional-grade automotive & bike detailing complete system.",description:"The XORONIQ Essential Kit is our flagship detailing collection engineered for high-performance automotive and motorcycle enthusiasts. Formulated with laboratory-tested hydrophobic polymers and ultra-pure surfactants, this kit delivers extreme gloss, deep paint decontamination, streak-free glass clarity, and long-lasting protective shielding across all vehicle surfaces.",images:["images/product/essentials.png"],contents:["Xoroniq Ultra Foam Car Shampoo 473 ml","Microfiber 350 GSM Buffing Towel","Microfiber 1200 GSM Heavy Plush Drying Towel","Premium Detailing Wash Mitt","Manual Pump Foam Sprayer","Precision Detailing Brushes (2x Pack)"],specs:[{label:"Kit Contents",value:"6-Piece Complete Detailing Arsenal"},{label:"Surface Compatibility",value:"Paint, Glass, Chrome, Wheels, Plastics"},{label:"Formulation",value:"pH-Balanced, High Lubricity Ultra Foam"},{label:"Durability",value:"Extreme Scratch-Free Foam Protection"},{label:"Origin",value:"Engineered & Bottled for XORONIQ"}],features:["Xoroniq Ultra Foam Car Shampoo (473 ml) lifts heavy road dirt with extreme lubricity","Heavy-Duty Manual Foam Sprayer for thick, clinging snow foam without pressure washer","Ultra-soft scratch-free wash mitt for gentle paint contact","Microfiber 350 GSM for effortless wipe-down and buffing","Microfiber 1200 GSM heavy plush towel for streak-free paint drying","2x Precision Detailing Brushes for emblems, lug nuts, and interior AC vents"],rating:4.9,reviewsCount:128,createdAt:new Date("2026-01-01T00:00:00Z"),updatedAt:new Date("2026-01-01T00:00:00Z")},SP={id:"xoroniq-pro-kit",name:"XORONIQ Pro Kit",slug:"xoroniq-pro-kit",category:"CAR & BIKE CARE",categories:["CAR CARE","BIKE CARE","KITS"],price:0,compareAtPrice:0,discount:0,stock:0,sku:"XOR-KIT-PRO",featured:!0,active:!0,isComingSoon:!0,launchStatus:"LAUNCHING SOON",shortDescription:"Advanced multi-stage detailing arsenal with ceramic coating, iron fallout remover, leather conditioner & pro accessories.",description:"The XORONIQ Pro Kit is crafted for seasoned detailers and enthusiasts demanding professional-grade paint correction, intense hydrophobic gloss, and complete cockpit restoration. Features high-concentration iron fallout decontaminator, ultra-slick ceramic booster, and interior leather shield.",images:["images/product/anonymous-teaser.jpg"],specs:[{label:"Surface Compatibility",value:"All Automotive & Motorcycle Surfaces"},{label:"Protection Tier",value:"Pro Ceramic Polymer Matrix"},{label:"Durability",value:"Up to 6 months hydrophobic barrier"},{label:"Status",value:"Launching Soon"}],features:["Heavy-duty pH-neutral iron fallout decontaminator","Advanced SiO2 ceramic gloss enhancer & repellent","Matte-finish interior detailer & UV shield","Complete set of 4x plush microfiber towels & applicator pads"],rating:5,reviewsCount:0,createdAt:new Date("2026-02-01T00:00:00Z"),updatedAt:new Date("2026-02-01T00:00:00Z")},CP={id:"xoroniq-ultra-kit",name:"XORONIQ Ultra Kit",slug:"xoroniq-ultra-kit",category:"CAR & BIKE CARE",categories:["CAR CARE","BIKE CARE","KITS"],price:0,compareAtPrice:0,discount:0,stock:0,sku:"XOR-KIT-ULTRA",featured:!0,active:!0,isComingSoon:!0,launchStatus:"LAUNCHING SOON",shortDescription:"The ultimate flagship detailing vault with 9H ceramic graphene coat, dual-action buffer set, engine bay protectant & comprehensive accessory set.",description:"The pinnacle of automotive perfection. The XORONIQ Ultra Kit delivers laboratory-grade graphene protection, high-durability hydrophobic ceramic barriers, deep leather nourishment, engine bay degreasing, and precision detailing brushes in a luxury collector case.",images:["images/product/anonymous-teaser.jpg"],specs:[{label:"Surface Compatibility",value:"Full Vehicle Exterior, Interior & Engine Bay"},{label:"Protection Tier",value:"9H Graphene Ceramic Shield"},{label:"Durability",value:"Up to 12 months extreme protection"},{label:"Status",value:"Launching Soon"}],features:["Flagship 9H Graphene & SiO2 Ceramic Nanocoat","Complete multi-stage wheel, glass, and engine bay formulas","Leather conditioner & hydrophobic fabric sealant","Luxury heavy-duty detailing bag, horsehair brushes & drying towel"],rating:5,reviewsCount:0,createdAt:new Date("2026-03-01T00:00:00Z"),updatedAt:new Date("2026-03-01T00:00:00Z")},PP=[vo,SP,CP],Lg="xoroniq_custom_products";function Xo(){try{const n=localStorage.getItem(Lg);return n?JSON.parse(n):[]}catch{return[]}}function Us(n){try{localStorage.setItem(Lg,JSON.stringify(n))}catch(e){console.warn("Failed to save products locally:",e)}}async function Jo({activeOnly:n=!0,category:e=null}={}){let t=[];const r=Xo();try{const s=Yn(it,"products"),i=n?Nr(s,Yo("active","==",!0)):Nr(s),a=await li(i);a.empty||a.forEach(c=>{t.push({id:c.id,...c.data()})})}catch(s){console.warn("Firestore products fetch returned warning/offline, local active:",s)}return PP.forEach(s=>{t.some(i=>i.id===s.id||i.slug===s.slug)||t.push(s)}),r.forEach(s=>{const i=t.findIndex(a=>a.id===s.id||a.sku&&a.sku===s.sku);i>=0?t[i]={...t[i],...s}:t.push(s)}),n&&(t=t.filter(s=>s.active!==!1)),e&&e!=="ALL"&&(t=t.filter(s=>Kf(s,e))),t}async function $P(n){const t=(await Jo({activeOnly:!1})).find(r=>r.id===n||r.slug===n);if(t)return t;try{const r=ai(it,"products",n),s=await l0(r);if(s.exists())return{id:s.id,...s.data()}}catch(r){console.warn("Error fetching product by ID:",r)}return vo}async function BP(n){const t=(await Jo({activeOnly:!1})).find(r=>r.slug===n);if(t)return t;if(n===vo.slug)return vo;try{const r=Yn(it,"products"),s=Nr(r,Yo("slug","==",n)),i=await li(s);if(!i.empty){const a=i.docs[0];return{id:a.id,...a.data()}}}catch(r){console.warn("Error fetching product by slug:",r)}return null}async function jP(n){const e=n.slug||Wf(n.name),t=xc(n.price,n.compareAtPrice),r=zs(n),s=n.category||bo(n),i=`xoroniq-prod-${Date.now()}`,a={id:i,name:n.name,slug:e,category:s,categories:r,price:Number(n.price)||0,compareAtPrice:Number(n.compareAtPrice)||0,discount:t,stock:Number(n.stock)||0,sku:n.sku||`XOR-${Math.floor(1e3+Math.random()*9e3)}`,featured:!!n.featured,active:n.active!==void 0?!!n.active:!0,shortDescription:n.shortDescription||"",description:n.description||"",images:Array.isArray(n.images)&&n.images.length>0?n.images:["images/product/essentials.png"],specs:n.specs||[],rating:5,reviewsCount:1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},c=Xo();c.push(a),Us(c);try{const l={...a};delete l.id,l.createdAt=Dr(),l.updatedAt=Dr();const h=await gg(Yn(it,"products"),l);a.id=h.id;const f=c.map(g=>g.id===i?{...g,id:h.id}:g);return Us(f),{id:h.id,...a}}catch(l){return console.warn("Firestore cloud write warning (persisted in browser catalog):",l),a}}async function qP(n,e){const t=Xo(),r=t.findIndex(i=>i.id===n),s={...e,updatedAt:new Date().toISOString()};(e.categories||e.category)&&(s.categories=zs(e),s.category=e.category||bo(e)),(e.price!==void 0||e.compareAtPrice!==void 0)&&(s.discount=xc(e.price,e.compareAtPrice)),r>=0?(t[r]={...t[r],...s},Us(t)):(t.push({id:n,...s}),Us(t));try{const i=ai(it,"products",n),a={...s,updatedAt:Dr()};await mg(i,a)}catch(i){console.warn("Firestore updateDoc warning (persisted locally):",i)}return!0}async function HP(n){const t=Xo().filter(r=>r.id!==n);Us(t);try{const r=ai(it,"products",n);await u0(r)}catch(r){console.warn("Firestore deleteDoc warning (deleted locally):",r)}return!0}async function WP(n,e){try{const t=TP(RP,e||`products/${Date.now()}_${n.name}`),r=await EP(t,n);return await vP(r.ref)}catch(t){throw console.warn("Firebase Storage upload notice:",t),t}}async function KP(n){try{const e={orderId:n.orderId,customer:{name:n.customer.name,email:n.customer.email,phone:n.customer.phone},shippingAddress:{address:n.shippingAddress.address,city:n.shippingAddress.city,state:n.shippingAddress.state,pincode:n.shippingAddress.pincode,country:n.shippingAddress.country||"India"},items:n.items||[],subtotal:Number(n.subtotal)||0,shipping:Number(n.shipping)||0,total:Number(n.total)||0,payment:{method:n.payment.method||"RAZORPAY",razorpayPaymentId:n.payment.razorpayPaymentId||"",razorpayOrderId:n.payment.razorpayOrderId||"",status:n.payment.status||"PAID"},orderStatus:"Payment Confirmed",createdAt:Dr(),updatedAt:Dr()};return{id:(await gg(Yn(it,"orders"),e)).id,...e}}catch(e){throw console.error("Error creating order in Firestore:",e),e}}async function zP(n){try{const e=Yn(it,"orders"),t=Nr(e,Yo("orderId","==",n.trim())),r=await li(t);if(!r.empty){const s=r.docs[0];return{id:s.id,...s.data()}}}catch(e){console.error("Error fetching order by ID:",e)}return null}async function GP(n){try{const e=Yn(it,"orders"),t=await li(e),r=[],s=n.toLowerCase().trim();return t.forEach(i=>{var g,E,I;const a=i.data(),c=(a.orderId||"").toLowerCase().includes(s),l=(((g=a.customer)==null?void 0:g.email)||"").toLowerCase().includes(s),h=(((E=a.customer)==null?void 0:E.phone)||"").includes(s),f=(((I=a.customer)==null?void 0:I.name)||"").toLowerCase().includes(s);(c||l||h||f)&&r.push({id:i.id,...a})}),r}catch(e){return console.error("Error searching orders:",e),[]}}async function OP({status:n=null}={}){try{const e=Yn(it,"orders");let t=Nr(e);n&&n!=="ALL"&&(t=Nr(e,Yo("orderStatus","==",n)));const r=await li(t),s=[];return r.forEach(i=>{s.push({id:i.id,...i.data()})}),s}catch(e){return console.error("Error fetching orders list:",e),[]}}async function YP(n,e){try{const t=ai(it,"orders",n);return await mg(t,{orderStatus:e,updatedAt:Dr()}),!0}catch(t){throw console.error("Error updating order status:",t),t}}async function QP(){try{const n=await Jo({activeOnly:!1}),e=await OP(),t=n.length,r=n.filter(l=>l.active!==!1).length,s=e.length,i=e.filter(l=>l.orderStatus==="Payment Confirmed"||l.orderStatus==="Processing").length,a=e.filter(l=>l.orderStatus==="Delivered").length,c=e.reduce((l,h)=>l+(h.total||0),0);return{totalProducts:t,activeProducts:r,totalOrders:s,pendingOrders:i,completedOrders:a,totalSales:c}}catch(n){return console.error("Error calculating metrics:",n),{totalProducts:1,activeProducts:1,totalOrders:0,pendingOrders:0,completedOrders:0,totalSales:0}}}async function XP(n,e){return await HI(Qo,n,e)}async function JP(){return await GI(Qo)}function ZP(n){return zI(Qo,n)}async function eO(n){return await qI(Qo,n)}let Nn=null,tn=null,Sn=null,Vg=[];async function NP(){document.getElementById("xoroniq-search-overlay")||document.body.insertAdjacentHTML("beforeend",`
      <div id="xoroniq-search-overlay" class="search-overlay">
        <div class="search-container">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <span class="section-tag mb-0">GLOBAL CATALOG QUERY</span>
            <button type="button" class="btn-close-custom fs-4 text-dark" id="close-search-btn">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          
          <input type="text" id="global-search-input" class="search-input-field" placeholder="SEARCH XORONIQ PRODUCTS..." autocomplete="off">
          
          <div class="d-flex align-items-center justify-content-between mt-3 text-muted-custom small">
            <span>Type product name, category, or SKU</span>
            <span id="search-count-label"></span>
          </div>

          <div id="global-search-results" class="search-results-box mt-4">
            <!-- Results injected here -->
          </div>
        </div>
      </div>
    `),Nn=document.getElementById("xoroniq-search-overlay"),tn=document.getElementById("global-search-input"),Sn=document.getElementById("global-search-results");const n=document.getElementById("close-search-btn");document.querySelectorAll('.nav-search-trigger, [data-action="open-search"]').forEach(t=>{t.addEventListener("click",r=>{r.preventDefault(),DP()})}),n&&n.addEventListener("click",xd),document.addEventListener("keydown",t=>{t.key==="Escape"&&Nn&&Nn.classList.contains("active")&&xd()}),tn&&tn.addEventListener("input",zf(kP,200))}async function DP(){if(Nn){Nn.classList.add("active"),document.body.style.overflow="hidden",tn&&(tn.value="",setTimeout(()=>tn.focus(),250)),Sn&&(Sn.innerHTML=`
      <div class="text-center py-4 text-muted-custom small">
        <i class="bi bi-search display-6 d-block mb-2"></i>
        Start typing to search products...
      </div>
    `);try{Vg=await Jo({activeOnly:!0})}catch(n){console.warn("Error loading search catalog:",n)}}}function xd(){Nn&&(Nn.classList.remove("active"),document.body.style.overflow="")}function kP(){if(!tn||!Sn)return;const n=tn.value.toLowerCase().trim(),e=document.getElementById("search-count-label");if(!n){Sn.innerHTML=`
      <div class="text-center py-4 text-muted-custom small">
        <i class="bi bi-search display-6 d-block mb-2"></i>
        Start typing to search products...
      </div>
    `,e&&(e.textContent="");return}const t=Vg.filter(r=>{const s=(r.name||"").toLowerCase().includes(n),i=(r.category||"").toLowerCase().includes(n),a=Array.isArray(r.categories)&&r.categories.some(h=>h.toLowerCase().includes(n)),c=(r.sku||"").toLowerCase().includes(n),l=(r.description||"").toLowerCase().includes(n);return s||i||a||c||l});if(e&&(e.textContent=`${t.length} match${t.length===1?"":"es"} found`),t.length===0){Sn.innerHTML=`
      <div class="text-center py-5">
        <i class="bi bi-slash-circle display-5 text-muted-custom mb-3"></i>
        <h5 class="text-black font-heading fw-bold">NO RESULTS FOR "${n.toUpperCase()}"</h5>
        <p class="text-muted-custom small">Try searching for "Kit", "Car Care", "Bike Care", or "Ceramic".</p>
      </div>
    `;return}Sn.innerHTML=t.map(r=>{const s=!!(r.isComingSoon||r.launchStatus==="LAUNCHING SOON");let i=Array.isArray(r.images)&&r.images.length>0?r.images[0]:r.image||"images/product/essentials.png";s&&(!i||i==="images/product/essentials.png")&&(i="images/product/anonymous-teaser.jpg");const a=bo(r);return`
      <a href="product.html?id=${r.id}" class="search-result-item">
        <img src="${i}" alt="${r.name}" class="rounded p-1 bg-light border" style="width: 50px; height: 50px; object-fit: contain;" onerror="this.src='images/product/anonymous-teaser.jpg'">
        <div class="flex-grow-1">
          <div class="font-heading fw-bold text-black small">${r.name}</div>
          <div class="text-muted-custom small font-mono">${a} • SKU: ${r.sku||"N/A"}</div>
        </div>
        <div class="font-mono ${s?"text-dark":"text-accent"} fw-bold">
          ${s?"₹XXXX":Ke(r.price)}
        </div>
      </a>
    `}).join("")}window.bootstrap=sw;document.addEventListener("DOMContentLoaded",()=>{window.location.hash||window.scrollTo(0,0),iw(),ow(),aw(),cw(),lw(),NP(),Zf(),tp(),document.querySelectorAll('.nav-cart-trigger, [data-action="open-cart"]').forEach(t=>{t.addEventListener("click",r=>{r.preventDefault(),ep()})});const e=document.getElementById("newsletter-form");e&&e.addEventListener("submit",t=>{t.preventDefault();const r=document.getElementById("newsletter-email");r&&r.value.trim()&&(Ro("Welcome to XORONIQ Inner Circle. You are subscribed.","success"),r.value="")}),document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",function(r){const s=this.getAttribute("href");if(s&&s!=="#"){const i=document.querySelector(s);i&&(r.preventDefault(),i.scrollIntoView({behavior:"smooth",block:"start"}))}})})});export{hw as A,VP as B,Tt as C,$P as D,BP as E,aw as F,zP as G,Gf as H,vo as I,YP as J,GP as K,LP as L,OP as a,uw as b,dw as c,zs as d,bo as e,Ke as f,QP as g,qP as h,jP as i,xc as j,HP as k,Jo as l,Kf as m,JP as n,ZP as o,XP as p,eO as q,Gs as r,Ro as s,Xf as t,WP as u,Jf as v,mh as w,KP as x,Yf as y,MP as z};
