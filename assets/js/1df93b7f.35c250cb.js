"use strict";(self.webpackChunkreact_scroll_snap_anime_slider_docs=self.webpackChunkreact_scroll_snap_anime_slider_docs||[]).push([[237],{898:(e,t,s)=>{s.r(t),s.d(t,{default:()=>z});var i=s(7294),r=s(6010),n=s(9960),l=s(2263),a=s(7961);const o={features:"features_t9lD",featureSvg:"featureSvg_GfXr",featureSettingContainer:"featureSettingContainer_q9aX",demoBox:"demoBox_nTD8"};var c=s(6765),d=s(7378);const p={slideHeight:0,slideWidth:0,visibleSlides:1,step:1,currentSlide:0,freeScroll:!1},u={...p,totalSlides:0,updateContext:()=>{},subscribers:[],slideTo:()=>{}},h=d.createContext(u);function m(){let e=[];for(let t=0;t<arguments.length;++t){let s=t<0||arguments.length<=t?void 0:arguments[t];null!=s&&"boolean"!=typeof s&&(Array.isArray(s)?e.push(m(...s)):e.push(s))}return e.join(" ").replace(/\s+/g," ").trim()}function f(e){return Math.round(1e3*e)/1e3}const y={wrapper:"wrapper_l4Eu",slider:"slider_unY5","slider-tray":"slider-tray_ttc9","css-only":"css-only_ngm3",slide:"slide_eBl3","slide-inner-padding":"slide-inner-padding_fGKM","slide-inner-wrapper":"slide-inner-wrapper_MAuO","fixed-size":"fixed-size_ppLw","align-center":"align-center_bMzf","snap-stop":"snap-stop_PTdh","scroll-snap":"scroll-snap_fUHI","slider-bar":"slider-bar_JE59","slider-bar-track":"slider-bar-track_zG2y","slider-bar-thumb":"slider-bar-thumb_VQ93","slider-bar-dot-group":"slider-bar-dot-group_i5P0","slider-dot":"slider-dot_uxcO",dynamic:"dynamic_JzIw",active:"active_cj5m"},g="rssas";function b(e){return[g+"-"+e,y[e]]}class S extends d.Component{static defaultProps={...p};constructor(e){super(e);const{className:t,style:s,children:i,...r}=this.props;r.step=this.validateStep(),this.state={context:{...r,updateContext:this.updateContext,subscribers:[],slideTo:()=>{}}}}updateContext=e=>{this.setState({context:{...this.state.context,...e}})};validateStep(){return this.props.step>0?this.props.step<this.props.visibleSlides?this.props.step:this.props.visibleSlides:1}componentDidUpdate(e,t,s){const{className:i,style:r,children:n,...l}=e,{className:a,style:o,children:c,...d}=this.props;(function(){var e,t,s,i;function r(e,t){var n;if(isNaN(e)&&isNaN(t)&&"number"==typeof e&&"number"==typeof t)return!0;if(e===t)return!0;if("function"==typeof e&&"function"==typeof t||e instanceof Date&&t instanceof Date||e instanceof RegExp&&t instanceof RegExp||e instanceof String&&t instanceof String||e instanceof Number&&t instanceof Number)return e.toString()===t.toString();if(!(e instanceof Object&&t instanceof Object))return!1;if(e.isPrototypeOf(t)||t.isPrototypeOf(e))return!1;if(e.constructor!==t.constructor)return!1;if(e.prototype!==t.prototype)return!1;if(s.indexOf(e)>-1||i.indexOf(t)>-1)return!1;for(n in t){if(t.hasOwnProperty(n)!==e.hasOwnProperty(n))return!1;if(typeof t[n]!=typeof e[n])return!1}for(n in e){if(t.hasOwnProperty(n)!==e.hasOwnProperty(n))return!1;if(typeof t[n]!=typeof e[n])return!1;switch(typeof e[n]){case"object":case"function":if(s.push(e),i.push(t),!r(e[n],t[n]))return!1;s.pop(),i.pop();break;default:if(e[n]!==t[n])return!1}}return!0}for(var n=arguments.length,l=new Array(n),a=0;a<n;a++)l[a]=arguments[a];if(l.length<1)return!0;for(e=1,t=l.length;e<t;e++)if(s=[],i=[],!r(l[0],l[e]))return!1;return!0})(l,d)||(d.step=this.validateStep(),this.setState({context:{...d,updateContext:this.updateContext,subscribers:[],slideTo:()=>{}}}))}render(){const{className:e,style:t,children:s}=this.props;return d.createElement("div",{className:m(b("wrapper"),e),style:t},d.createElement(h.Provider,{value:{...this.state.context}},s))}}var x=s(7462),v=s(3542);class N extends d.Component{sliderTrayRef=d.createRef();tempCurrentSlide=0;sliderDidSlided=!1;constructor(e){super(e)}onScroll=e=>{let t=this.getTrayState();if(t){let e=t.trayWidth,s=t.innerTrayWidth,i=t.slideWidth,r=t.scrollLeft,n=this.context.currentSlide;for(let t=0;t<this.context.subscribers.length;++t)this.context.subscribers[t](s,i,r);this.updateSlideIndex(t),this.context.onSlide&&this.context.onSlide({scrollLeft:r,currentSlide:n,slideWidth:i,trayWidth:e})}};onWheel=e=>{if(this.stopAnimeActions(),this.sliderTrayRef.current){let e=this.sliderTrayRef.current;!this.context.freeScroll&&e.classList.add(...b("scroll-snap"))}};startTracking=e=>{let t=this.getScrollMax();if(this.stopAnimeActions(),this.sliderTrayRef.current&&t>0){let e=this.sliderTrayRef.current,s=e.scrollLeft,i=s;this.sliderDidSlided=!1,this.scrollValue=(0,v.S3)(s,(t=>{e.scrollTo(t,0)})),!this.context.freeScroll&&e.classList.remove(...b("scroll-snap")),this.pointerAction=(0,v.cx)({x:0,y:0}).pipe((e=>{let s=i-e.x;return 0!=e.x&&(this.sliderDidSlided=!0),s<0?(i=e.x,{x:0,y:e.y}):s>t?(i=t+e.x,{x:t,y:e.y}):{x:s,y:e.y}})).start({update:e=>{this.scrollValue.update(e.x)}}),this.mouseUpAction=(0,v.oL)(window.document,"mouseup").start(this.stopTracking)}};stopTracking=e=>{if(this.pointerAction&&this.sliderTrayRef.current){let e=this.sliderTrayRef.current,t=this.getScrollMax(),s=this.scrollValue.get(),i=this.scrollValue.getVelocity(),r=!1,n=()=>{this.snapAction=void 0,!this.context.freeScroll&&e.classList.add(...b("scroll-snap"))},l=(e,t)=>(0,v.if)({from:e,to:t,duration:300,ease:v.Ui.Vv}).start({update:e=>this.scrollValue.update(e),complete:n});if(this.mouseUpAction?.stop(),this.pointerAction.stop(),this.pointerAction=void 0,0===i){if(!this.context.freeScroll){let e=this.getSnapScrollValue(s,i);Math.abs(s-e)>.2&&(this.snapAction=l(s,e))}return}let a=!1,o=(0,v.II)({from:s,velocity:i,bounceStiffness:500,bounceDamping:30,power:.4,restDelta:.4,timeConstant:500}).while((e=>!r)).pipe((e=>e<0?(r=!0,0):e>t?(r=!0,t):e)).start({update:e=>{if(!a)return void(a=!0);let t=this.scrollValue.getVelocity();if(this.scrollValue.update(e),Math.abs(t)<250&&!this.context.freeScroll){o.stop(),this.inertiaAction=void 0;let s=this.getSnapScrollValue(e,t);this.snapAction=l(e,s)}},complete:n});this.inertiaAction=o}};getTrayState(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current,t=e.scrollLeft,s=e.offsetWidth,i=Number(window.getComputedStyle(e).paddingLeft.replace("px","")),r=null==this.context.trayPadding?s:s-2*i,n=r/this.context.visibleSlides;return{trayElement:e,scrollLeft:t,trayWidth:s,innerTrayWidth:r,trayPaddingX:i,slideWidth:n,slideCount:e.childElementCount,currentSlide:Math.round(t/n)}}}updateSlideIndex(e){if(void 0===e&&(e=this.getTrayState()),e){let t=e.currentSlide;this.tempCurrentSlide!==t&&(this.tempCurrentSlide=t,this.context.updateContext({currentSlide:this.tempCurrentSlide}))}}slideTo(e,t){void 0===t&&(t=!0);let s=this.getTrayState();if(s){this.stopAnimeActions();let i=s.trayElement,r=s.scrollLeft,n=()=>{this.snapAction=void 0,!this.context.freeScroll&&i.classList.add(...b("scroll-snap"))},l=e*s.slideWidth;!this.context.freeScroll&&i.classList.remove(...b("scroll-snap")),this.snapAction=(0,v.if)({from:r,to:l,duration:t?300:0,ease:v.Ui.Vv}).start({update:e=>{i.scrollTo(e,0)},complete:n})}}stopAnimeActions(){this.inertiaAction&&(this.inertiaAction.stop(),this.inertiaAction=void 0),this.snapAction&&(this.snapAction.stop(),this.snapAction=void 0)}applyOverdrag(e,t){let s=e;return e<0&&(s=v.yx.getValueFromProgress(0,e,.1)),e>t&&(s=v.yx.getValueFromProgress(t,e,.1)),s}getScrollMax(){let e=this.getTrayState();if(e){return e.slideWidth*(e.slideCount-this.context.visibleSlides)}return 0}getSnapScrollValue(e,t){let s=e,i=this.getTrayState();if(i){let r=i.slideWidth,n=i.slideCount,l=0;l=t>0?Math.ceil(e/r):t<0?Math.floor(e/r):Math.round(e/r),l<=n&&(s=l*r)}return s}handleOnClickCapture(e){this.sliderDidSlided&&(e.preventDefault(),e.stopPropagation())}componentDidUpdate(e,t,s){this.context.slideTo=e=>this.slideTo(e,!0)}componentDidMount(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current;this.mouseDownAction=(0,v.oL)(e,"mousedown").start(this.startTracking),e.addEventListener("scroll",this.onScroll,!1),e.addEventListener("mousewheel",this.onWheel,!1),e.addEventListener("DOMMouseScroll",this.onWheel,!1)}this.tempCurrentSlide!==this.context.currentSlide&&this.slideTo(this.context.currentSlide,!1),this.context.slideTo=e=>this.slideTo(e,!0)}componentWillUnmount(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current;this.stopAnimeActions(),this.mouseDownAction?.stop(),this.pointerAction?.stop(),e.removeEventListener("scroll",this.onScroll,!1),e.removeEventListener("mousewheel",this.onWheel,!1),e.removeEventListener("DOMMouseScroll",this.onWheel,!1)}}render(){const{children:e,className:t,trayProps:s,...i}=this.props;let r={};return this.context.slideMargin&&(r.marginLeft="-"+this.context.slideMargin,r.marginRight="-"+this.context.slideMargin),null!=this.context.trayPadding&&(r.padding=`0 ${this.context.trayPadding}`),d.createElement("div",(0,x.Z)({},i,{className:m(b("slider"),t)}),d.createElement("div",(0,x.Z)({},s,{className:m(b("slider-tray"),b("css-only"),this.context.freeScroll?"":b("scroll-snap"),s?.className),style:{...s?.style,...r},ref:this.sliderTrayRef,onClickCapture:this.handleOnClickCapture.bind(this)}),e))}}N.contextType=h;class E extends d.Component{constructor(e){super(e),this.state={}}render(){let{children:e,style:t,className:s,innerMarginDivProps:i,innerPaddingDivProps:r,innerWrapperDivProps:n,...l}=this.props,{slideHeight:a,slideWidth:o,visibleSlides:c}=this.context,p=a>0&&o>0?a/o*100:0,u={width:(c>0?100/c:100)+"%",scrollMargin:null!=this.context.trayPadding&&this.context.visibleSlides%2==0?`0 ${this.context.trayPadding}`:"",...t},h={paddingBottom:p>0?p+"%":"",...r?.style},f={...i?.style};null!=this.context.slideMargin&&(f.marginLeft=this.context.slideMargin,f.marginRight=this.context.slideMargin);let y=p>0?b("fixed-size"):"";return d.createElement("div",(0,x.Z)({},l,{className:m(b("slide"),null!=this.context.trayPadding&&this.context.visibleSlides%2==1&&b("align-center"),s),style:u}),d.createElement("div",(0,x.Z)({},i,{className:m(b("slide-inner-margin")),style:f}),d.createElement("div",(0,x.Z)({},r,{className:m(b("slide-inner-padding")),style:h}),d.createElement("div",(0,x.Z)({},n,{className:m(b("slide-inner-wrapper"),y,n?.className)}),e))))}}E.contextType=h;class C extends d.PureComponent{className="slider-button";ariaLabel="";isBack=!0;onClick=()=>{};handleOnClick(e){let t=this.context.currentSlide,s=this.context.step,i=this.context.totalSlides-this.context.visibleSlides,r=t+(e?s:-1*s);r>i?r=i:r<0&&(r=0),t!==r&&this.context.slideTo(r)}render(){const{visibleSlides:e,totalSlides:t,currentSlide:s}=this.context;let{className:i,disabled:r,onClick:n,...l}=this.props;const a=m(this.className,i),o=t-e;return null==r&&(this.isBack&&s<=0||!this.isBack&&s>=o)&&(r=!0),d.createElement("button",(0,x.Z)({"aria-label":this.ariaLabel,type:"button",disabled:r},l,{className:a,onClick:e=>{n&&"function"==typeof n&&n(e),this.onClick()}}),this.props.children)}}C.contextType=h;class k extends C{constructor(e){super(e),this.className=m(b("slider-button-back"),b(this.className)),this.ariaLabel="previous",this.onClick=()=>this.handleOnClick(!1)}}class T extends C{constructor(e){super(e),this.isBack=!1,this.className=m(b("slider-button-next"),b(this.className)),this.ariaLabel="next",this.onClick=()=>this.handleOnClick(!0)}}class A extends d.Component{constructor(e){super(e),this.state={left:0}}slideTo=e=>{let t=this.context.currentSlide,s=this.context.totalSlides-this.context.visibleSlides;e>s?e=s:e<0&&(e=0),t!==e&&this.context.slideTo(e)};onScroll=(e,t,s)=>{const{totalSlides:i}=this.context,r=s/(i*t)*100;this.setState({left:r})};componentDidUpdate(e,t,s){this.prevContext.subscribers!==this.context.subscribers&&(this.context.subscribers.push(this.onScroll),this.prevContext=this.context)}componentDidMount(){const{currentSlide:e,visibleSlides:t,totalSlides:s}=this.context;if(this.context.subscribers.push(this.onScroll),this.prevContext=this.context,0!==e){let t=e/s*100;this.setState({left:t})}}componentWillUnmount(){let e=this.context.subscribers.indexOf(this.onScroll);e>=0&&this.context.subscribers.splice(e,1)}}A.contextType=h;class _ extends A{render(){const{visibleSlides:e,totalSlides:t}=this.context,{className:s,style:i,thumbProps:r,trackProps:n,...l}=this.props;let a=e/t*100,o=this.state.left;o<0&&(a+=o,o=0),o+a>100&&(a=100-o);let c={width:a+"%",left:o+"%"};const p=m(b("slider-bar"),s);return r&&(c={...r.style,...c}),d.createElement("div",(0,x.Z)({},l,{className:p,style:i}),d.createElement("div",(0,x.Z)({},n,{className:m(b("slider-bar-track"),n?.className)}),d.createElement("div",(0,x.Z)({},r,{className:m(b("slider-bar-thumb"),r?.className),style:c}))))}}class w extends A{theDot(e,t,s){return d.createElement("div",{key:e,className:m(b("slider-dot"),t?b("active"):""),onClick:s})}renderDots(e){let{visibleSlides:t,totalSlides:s,currentSlide:i,slideTo:r}=e,n=[],l=i,a=i+t;for(let o=0;o<s;++o)n.push(this.theDot(o,l<=o&&o<a,(()=>r(o))));return n}render(){const{visibleSlides:e,totalSlides:t,step:s,currentSlide:i}=this.context,{children:r,className:n,dotGroupProps:l,renderDots:a,...o}=this.props;let c={visibleSlides:e,totalSlides:t,step:s,currentSlide:i,left:this.state.left,slideTo:this.slideTo};const p=m(b("slider-bar"),n);return d.createElement("div",(0,x.Z)({},o,{className:p}),d.createElement("div",(0,x.Z)({},l,{className:m(b("slider-bar-dot-group"),l?.className)}),a?a(c):this.renderDots(c)))}}function P(e,t){let{visibleSlides:s,totalSlides:i,step:r,left:n,currentSlide:l,slideTo:a}=e,o=[],c=f(s/i),p=f(n/100),u=p+c,h=f(1/i);for(let m=0;m<i;++m){let e=f(m/i),s=f(e+h),r=1;if(e<u&&s>p)if(e<=p&&p<=s){r+=(s-p)/h}else if(p<=e&&s<=u)r=2;else if(e<=u&&u<=s){r+=(u-e)/h}o.push(d.createElement(t,{key:m,scale:r,onClick:()=>{a(m)}}))}return o}function D(e){return d.createElement("div",{className:m(b("slider-dot"),b("dynamic"),b("circle")),style:{transform:`scale(${e.scale})`},onClick:e.onClick})}function L(e){return P(e,D)}function M(e){return d.createElement("div",{className:m(b("slider-dot"),b("dynamic"),b("circle")),style:{width:8*e.scale+"px",height:"8px"},onClick:e.onClick})}function W(e){return P(e,M)}function O(e){const[t,s]=(0,i.useState)(0);return i.createElement("div",{style:{display:"flex",width:"100%",height:"100%",backgroundColor:e.background,color:e.color,alignItems:"center"}},i.createElement("div",{className:"text--center",style:{width:"100%"}},i.createElement("h4",null,e.title),i.createElement("div",null,i.createElement("button",{className:"button button--sm button--secondary",type:"button",onClick:()=>s(t+1)},"Add Count")),i.createElement("div",null,t),i.createElement("div",null,i.createElement("a",{style:{color:e.color,textDecorationLine:"underline"},href:"docs/getting-started",target:"_blank"},"This is a link to test"))))}function R(){const e=(0,i.useMemo)((()=>({index:0})),[]),[t,s]=(0,i.useState)(20),[r,n]=(0,i.useState)(3),[l,a]=(0,i.useState)(1),[d,p]=(0,i.useState)(1),[u,h]=(0,i.useState)(1.2),[m,f]=(0,i.useState)(10),[y,g]=(0,i.useState)(0),[b,x]=(0,i.useState)(!1),[v,C]=(0,i.useState)(!0),[A,P]=(0,i.useState)(!0),[D,M]=(0,i.useState)(!0),[R,V]=(0,i.useState)(1);let B=[];for(let i=0;i<t;++i){let e=(0,c.MX)(),t=e.isLight()?"#000":"#fff";B.push({title:"Slide #"+(i+1),background:e.toHex(),color:t})}return i.createElement("section",null,i.createElement("div",{className:"container"},i.createElement("div",{className:"padding-bottom--md"},i.createElement(S,{totalSlides:B.length,visibleSlides:r,step:l,slideHeight:d,slideWidth:u,freeScroll:b,currentSlide:e.index,slideMargin:m/2+"px",trayPadding:y+"px",onSlide:t=>{let{currentSlide:s}=t;e.index=s},style:{margin:`0 -${y>0?1:0}rem`}},i.createElement(N,{"aria-label":"my slider"},B.map(((e,t)=>i.createElement(E,{key:t,"aria-label":"my slide",innerWrapperDivProps:{style:{borderRadius:"1rem",overflow:"hidden"}}},i.createElement(O,e))))),A&&i.createElement(_,{id:"my-slider-bar",className:"margin-top--md","aria-label":"slider bar",trackProps:{id:"my-slider-bar-track","aria-label":"slider track",style:{borderRadius:"1rem"}},thumbProps:{id:"my-slider-bar-thumb","aria-label":"slider thumb",style:{borderRadius:"1rem"}},style:{padding:`0 ${y}px`}}),D&&i.createElement(w,{id:"my-slider-dot-group",className:"margin-top--md","aria-label":"slider bar",dotGroupProps:{id:"my-slider-bar-dot-group","aria-label":"dot group"},renderDots:1===R?L:2===R?W:void 0,style:{padding:`0 ${y}px`}}),v&&i.createElement("div",{className:"margin-top--md",style:{textAlign:"center",padding:`0 ${y}px`}},i.createElement(k,{className:"button button--primary"},"<"),i.createElement(T,{className:"button button--primary margin-left--md"},">"))))),i.createElement("hr",null),i.createElement("div",{className:o.featureSettingContainer},i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Slide count: ",i.createElement("input",{className:"site-input",type:"number",value:t,onChange:e=>s(Number(e.target.value))})),i.createElement("div",{className:"padding-top--xs"},"Visible slides: ",i.createElement("input",{className:"site-input",type:"number",value:r,onChange:e=>n(Number(e.target.value))})),i.createElement("div",{className:"padding-top--xs"},"Slides per step: ",i.createElement("input",{className:"site-input",type:"number",value:l,onChange:e=>a(Number(e.target.value))}))),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:"padding-top--xs"},"Slide height: ",i.createElement("input",{className:"site-input",type:"number",value:d,onChange:e=>p(Number(e.target.value)),step:"0.1"})),i.createElement("div",{className:"padding-top--xs"},"Slide width: ",i.createElement("input",{className:"site-input",type:"number",value:u,onChange:e=>h(Number(e.target.value)),step:"0.1"})),i.createElement("div",{className:"",style:{color:" var(--ifm-color-secondary-darkest)",fontSize:"12px"}},"Height will become auto if set to 0")),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Slide margin: ",i.createElement("input",{className:"site-input",type:"number",value:m,onChange:e=>f(Number(e.target.value)),step:"1"})," px"),i.createElement("div",{className:"",style:{color:" var(--ifm-color-secondary-darkest)",fontSize:"12px"}},"Margin between each slide"),i.createElement("div",{className:"padding-top--xs"},"Tray padding: ",i.createElement("input",{className:"site-input",type:"number",value:y,onChange:e=>g(Number(e.target.value)),step:"1"})," px"),i.createElement("div",{className:"",style:{color:" var(--ifm-color-secondary-darkest)",fontSize:"12px"}},"Offset the tray to see prev/next slide partially")),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Free Scroll?: ",i.createElement("input",{className:"",type:"checkbox",checked:b,onChange:()=>x(!b)})),i.createElement("div",{className:"padding-top--xs"},"Show scrollbar?: ",i.createElement("input",{className:"",type:"checkbox",checked:A,onChange:()=>P(!A)})),i.createElement("div",{className:"padding-top--xs"},"Show buttons?: ",i.createElement("input",{className:"",type:"checkbox",checked:v,onChange:()=>C(!v)}))),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Show dot group?: ",i.createElement("input",{className:"",type:"checkbox",checked:D,onChange:()=>M(!D)})),i.createElement("div",{className:"padding-top--xs"},"Normal: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:0===R,onChange:()=>V(0),disabled:!D})),i.createElement("div",{className:""},"Dynamic circle: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:1===R,onChange:()=>V(1),disabled:!D})),i.createElement("div",{className:""},"Dynamic pill: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:2===R,onChange:()=>V(2),disabled:!D})))))}const V={heroBanner:"heroBanner_qdFl",heroBannerBg:"heroBannerBg__ymP",buttons:"buttons_AeoN"},B=JSON.parse('{"i8":"1.3.6","WL":"A simple slider/carousel using css style scroll-snap and Popmotion."}');function Z(){const{siteConfig:e}=(0,l.Z)();return i.createElement("header",{className:(0,r.W)("",V.heroBanner)},i.createElement("div",{className:V.heroBannerBg}),i.createElement("div",{className:"container",style:{position:"relative"}},i.createElement("h1",{style:{fontSize:"2.5rem"}},e.title),i.createElement("h4",null,"A simple slider using css style ",i.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap",target:"_blank"},"scroll-snap")," and ",i.createElement("a",{className:"",style:{color:"#FA196C",fontStyle:"italic"},href:"https://popmotion.io/",target:"_blank"},"Popmotion")),i.createElement("div",{className:V.buttons},i.createElement(n.Z,{className:"button button--primary",to:"/docs/getting-started"},"Getting Started ",i.createElement("b",{style:{fontSize:"12px"}},"(v",B.i8,")")))))}function z(){const{siteConfig:e}=(0,l.Z)();return i.createElement(a.Z,{description:B.WL},i.createElement(Z,null),i.createElement("main",{style:{position:"relative"}},i.createElement(R,null)))}}}]);