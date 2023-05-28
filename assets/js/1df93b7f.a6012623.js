"use strict";(self.webpackChunkreact_scroll_snap_anime_slider_docs=self.webpackChunkreact_scroll_snap_anime_slider_docs||[]).push([[237],{9188:(e,t,s)=>{s.r(t),s.d(t,{default:()=>V});var i=s(7294),r=s(6010),n=s(2263),l=s(7961);const a={features:"features_t9lD",featureSvg:"featureSvg_GfXr",featureSettingContainer:"featureSettingContainer_q9aX",demoBox:"demoBox_nTD8"};var o=s(6765),c=s(7462),d=s(7378),u=s(6101);const h={slideHeight:0,slideWidth:0,visibleSlides:1,step:1,currentSlide:0,freeScroll:!1},m={...h,totalSlides:0,updateContext:()=>{},subscribers:[],slideTo:()=>{}},p=d.createContext(m);var f=s(4708);function b(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];return t.map((e=>!1===e?null:e)).join(" ").replace(/\s+/g," ").trim()}function y(e){return Math.round(1e3*e)/1e3}class S extends d.Component{sliderTrayRef=d.createRef();tempCurrentSlide=0;constructor(e){super(e)}onScroll=e=>{if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current,t=e.offsetWidth,s=t/this.context.visibleSlides,i=e.scrollLeft;for(let r=0;r<this.context.subscribers.length;++r)this.context.subscribers[r](t,s,i);this.updateSlideIndex(),this.props.onSlide&&this.props.onSlide({scrollLeft:i,currentSlide:this.context.currentSlide,slideWidth:s,trayWidth:t})}};onWheel=e=>{if(this.stopAnimeActions(),this.sliderTrayRef.current){let e=this.sliderTrayRef.current;!this.context.freeScroll&&e.classList.add("scroll-snap")}};startTracking=e=>{let t=this.getScrollMax();if(this.stopAnimeActions(),this.sliderTrayRef.current&&t>0){let e=this.sliderTrayRef.current,s=e.scrollLeft,i=s;this.scrollValue=(0,u.S3)(s,(t=>{e.scrollTo(t,0)})),!this.context.freeScroll&&e.classList.remove("scroll-snap"),this.pointerAction=(0,u.cx)({x:0,y:0}).pipe((e=>{let r=i-e.x;return r<0?(i=e.x,{x:0,y:e.y}):r>t?(i=s+e.x,{x:t,y:e.y}):{x:r,y:e.y}})).start({update:e=>{this.scrollValue.update(e.x)}}),this.mouseUpAction=(0,u.oL)(window.document,"mouseup").start(this.stopTracking)}};stopTracking=e=>{if(this.pointerAction&&this.sliderTrayRef.current){let e=this.sliderTrayRef.current,t=this.getScrollMax(),s=this.scrollValue.get(),i=this.scrollValue.getVelocity(),r=!1,n=()=>{this.snapAction=void 0,!this.context.freeScroll&&e.classList.add("scroll-snap")},l=(e,t)=>(0,u.if)({from:e,to:t,duration:300,ease:u.Ui.Vv}).start({update:e=>this.scrollValue.update(e),complete:n});if(this.mouseUpAction?.stop(),this.pointerAction.stop(),this.pointerAction=void 0,0===i){if(!this.context.freeScroll){let e=this.getSnapScrollValue(s,i);this.snapAction=l(s,e)}return}let a=!1,o=(0,u.II)({from:s,velocity:i,bounceStiffness:500,bounceDamping:30,power:.4,restDelta:.4,timeConstant:500}).while((e=>!r)).pipe((e=>e<0?(r=!0,0):e>t?(r=!0,t):e)).start({update:e=>{if(!a)return void(a=!0);let t=this.scrollValue.getVelocity();if(this.scrollValue.update(e),Math.abs(t)<250&&!this.context.freeScroll){o.stop(),this.inertiaAction=void 0;let s=this.getSnapScrollValue(e,t);this.snapAction=l(e,s)}},complete:n});this.inertiaAction=o}};getCurrentSlideIndex(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current,t=e.scrollLeft,s=e.offsetWidth/this.context.visibleSlides;return Math.round(t/s)}return 0}updateSlideIndex(){let e=this.getCurrentSlideIndex();this.tempCurrentSlide!==e&&(this.tempCurrentSlide=e,this.context.updateContext({currentSlide:this.tempCurrentSlide}))}slideTo(e,t){if(void 0===t&&(t=!0),this.sliderTrayRef.current){this.stopAnimeActions();let s=this.sliderTrayRef.current,i=s.scrollLeft,r=()=>{this.snapAction=void 0,!this.context.freeScroll&&s.classList.add("scroll-snap")},n=e*(s.offsetWidth/this.context.visibleSlides);!this.context.freeScroll&&s.classList.remove("scroll-snap"),this.snapAction=(0,u.if)({from:i,to:n,duration:t?300:0,ease:u.Ui.Vv}).start({update:e=>{s.scrollTo(e,0)},complete:r})}}stopAnimeActions(){this.inertiaAction&&(this.inertiaAction.stop(),this.inertiaAction=void 0),this.snapAction&&(this.snapAction.stop(),this.snapAction=void 0)}applyOverdrag(e,t){let s=e;return e<0&&(s=u.yx.getValueFromProgress(0,e,.1)),e>t&&(s=u.yx.getValueFromProgress(t,e,.1)),s}getScrollMax(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current;return e.offsetWidth/this.context.visibleSlides*(e.childElementCount-this.context.visibleSlides)}return 0}getSnapScrollValue(e,t){let s=e;if(this.sliderTrayRef.current){let i=this.sliderTrayRef.current,r=i.offsetWidth/this.context.visibleSlides,n=i.childElementCount,l=0;l=t>0?Math.ceil(e/r):t<0?Math.floor(e/r):Math.round(e/r),l<=n&&(s=l*r)}return s}componentDidUpdate(e,t,s){this.context.slideTo=e=>this.slideTo(e,!0)}componentDidMount(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current;this.sliderTraystyler=(0,f.ZP)(e),this.mouseDownAction=(0,u.oL)(e,"mousedown").start(this.startTracking),e.addEventListener("scroll",this.onScroll,!1),e.addEventListener("mousewheel",this.onWheel,!1),e.addEventListener("DOMMouseScroll",this.onWheel,!1)}this.tempCurrentSlide!==this.context.currentSlide&&this.slideTo(this.context.currentSlide,!1),this.context.slideTo=e=>this.slideTo(e,!0)}componentWillUnmount(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current;this.stopAnimeActions(),this.mouseDownAction?.stop(),this.pointerAction?.stop(),e.removeEventListener("scroll",this.onScroll,!1),e.removeEventListener("mousewheel",this.onWheel,!1),e.removeEventListener("DOMMouseScroll",this.onWheel,!1)}}render(){const{children:e,className:t,trayProps:s,...i}=this.props;let r={};return this.context.margin&&(r.marginLeft="-"+this.context.margin,r.marginRight="-"+this.context.margin),d.createElement("div",(0,c.Z)({},i,{className:b("slider",t)}),d.createElement("div",(0,c.Z)({},s,{className:b("slider-tray","css-only",this.context.freeScroll?"":"scroll-snap",s?.className),style:{...s?.style,...r},ref:this.sliderTrayRef}),e))}}S.contextType=p;class x extends d.Component{constructor(e){super(e),this.state={}}render(){let{children:e,style:t,className:s,...i}=this.props,{slideHeight:r,slideWidth:n,visibleSlides:l}=this.context,a=r>0&&n>0?r/n*100:0,o={width:(l>0?100/l:100)+"%",...t},u={paddingBottom:a>0?a+"%":""},h=a>0?"fixed-size":"";return this.context.margin&&(u.marginLeft=this.context.margin,u.marginRight=this.context.margin),d.createElement("div",(0,c.Z)({},i,{className:b("slide",s),style:o}),d.createElement("div",{className:"slide-inner",style:u},d.createElement("div",{className:b("slide-inner-inner",h)},e)))}}x.contextType=p;class v extends d.PureComponent{className="slider-button";ariaLabel="";isBack=!0;onClick=()=>{};handleOnClick(e){let t=this.context.currentSlide,s=this.context.step,i=this.context.totalSlides-this.context.visibleSlides,r=t+(e?s:-1*s);r>i?r=i:r<0&&(r=0),t!==r&&this.context.slideTo(r)}render(){const{visibleSlides:e,totalSlides:t,currentSlide:s}=this.context;let{className:i,disabled:r,...n}=this.props;const l=b(this.className,i),a=t-e;return null==r&&(this.isBack&&s<=0||!this.isBack&&s>=a)&&(r=!0),d.createElement("button",(0,c.Z)({type:"button","aria-label":this.ariaLabel,className:l,onClick:this.onClick,disabled:r},n),this.props.children)}}v.contextType=p;class g extends v{constructor(e){super(e),this.className=b(this.className,"slider-back-button"),this.ariaLabel="previous",this.onClick=()=>this.handleOnClick(!1)}}class N extends v{constructor(e){super(e),this.isBack=!1,this.className=b(this.className,"slider-next-button"),this.ariaLabel="next",this.onClick=()=>this.handleOnClick(!0)}}class E extends d.Component{static defaultProps={...h};constructor(e){super(e);const{className:t,style:s,children:i,...r}=this.props;r.step=this.validateStep(),this.state={context:{...r,updateContext:this.updateContext,subscribers:[],slideTo:()=>{}}}}updateContext=e=>{this.setState({context:{...this.state.context,...e}})};validateStep(){return this.props.step>0?this.props.step<this.props.visibleSlides?this.props.step:this.props.visibleSlides:1}componentDidUpdate(e,t,s){const{className:i,style:r,children:n,...l}=e,{className:a,style:o,children:c,...d}=this.props;(function(){var e,t,s,i;function r(e,t){var n;if(isNaN(e)&&isNaN(t)&&"number"==typeof e&&"number"==typeof t)return!0;if(e===t)return!0;if("function"==typeof e&&"function"==typeof t||e instanceof Date&&t instanceof Date||e instanceof RegExp&&t instanceof RegExp||e instanceof String&&t instanceof String||e instanceof Number&&t instanceof Number)return e.toString()===t.toString();if(!(e instanceof Object&&t instanceof Object))return!1;if(e.isPrototypeOf(t)||t.isPrototypeOf(e))return!1;if(e.constructor!==t.constructor)return!1;if(e.prototype!==t.prototype)return!1;if(s.indexOf(e)>-1||i.indexOf(t)>-1)return!1;for(n in t){if(t.hasOwnProperty(n)!==e.hasOwnProperty(n))return!1;if(typeof t[n]!=typeof e[n])return!1}for(n in e){if(t.hasOwnProperty(n)!==e.hasOwnProperty(n))return!1;if(typeof t[n]!=typeof e[n])return!1;switch(typeof e[n]){case"object":case"function":if(s.push(e),i.push(t),!r(e[n],t[n]))return!1;s.pop(),i.pop();break;default:if(e[n]!==t[n])return!1}}return!0}for(var n=arguments.length,l=new Array(n),a=0;a<n;a++)l[a]=arguments[a];if(l.length<1)return!0;for(e=1,t=l.length;e<t;e++)if(s=[],i=[],!r(l[0],l[e]))return!1;return!0})(l,d)||(d.step=this.validateStep(),this.setState({context:{...d,updateContext:this.updateContext,subscribers:[],slideTo:()=>{}}}))}render(){const{className:e,style:t,children:s}=this.props;return d.createElement("div",{className:b("react-scroll-snap-anime-slider",e),style:t},d.createElement(p.Provider,{value:{...this.state.context}},s))}}class C extends d.Component{constructor(e){super(e),this.state={left:0}}slideTo=e=>{let t=this.context.currentSlide,s=this.context.totalSlides-this.context.visibleSlides;e>s?e=s:e<0&&(e=0),t!==e&&this.context.slideTo(e)};onScroll=(e,t,s)=>{const{totalSlides:i}=this.context,r=s/(i*t)*100;this.setState({left:r})};componentDidUpdate(e,t,s){this.prevContext.subscribers!==this.context.subscribers&&(this.context.subscribers.push(this.onScroll),this.prevContext=this.context)}componentDidMount(){const{currentSlide:e,visibleSlides:t,totalSlides:s}=this.context;if(this.context.subscribers.push(this.onScroll),this.prevContext=this.context,0!==e){let t=e/s*100;this.setState({left:t})}}componentWillUnmount(){let e=this.context.subscribers.indexOf(this.onScroll);e>=0&&this.context.subscribers.splice(e,1)}}C.contextType=p;class k extends C{render(){const{visibleSlides:e,totalSlides:t}=this.context,{className:s,style:i,thumbProps:r,trackProps:n,...l}=this.props;let a=e/t*100,o=this.state.left;o<0&&(a+=o,o=0),o+a>100&&(a=100-o);let u={width:a+"%",left:o+"%"};const h=b("slider-bar",s);return r&&(u={...r.style,...u}),d.createElement("div",(0,c.Z)({},l,{className:h,style:i}),d.createElement("div",(0,c.Z)({},n,{className:b("slider-bar-track",n?.className)}),d.createElement("div",(0,c.Z)({},r,{className:b("slider-bar-thumb",r?.className),style:u}))))}}class T extends C{theDot(e,t,s){return d.createElement("div",{key:e,className:b("slider-dot",t?"active":""),onClick:s})}renderDots(e){let{visibleSlides:t,totalSlides:s,currentSlide:i,slideTo:r}=e,n=[],l=i,a=i+t;for(let o=0;o<s;++o)n.push(this.theDot(o,l<=o&&o<a,(()=>r(o))));return n}render(){const{visibleSlides:e,totalSlides:t,step:s,currentSlide:i}=this.context,{children:r,className:n,dotGroupProps:l,renderDots:a,...o}=this.props;let u={visibleSlides:e,totalSlides:t,step:s,currentSlide:i,left:this.state.left,slideTo:this.slideTo};const h=b("slider-bar",n);return d.createElement("div",(0,c.Z)({},o,{className:h}),d.createElement("div",(0,c.Z)({},l,{className:b("slider-bar-dot-group",l?.className)}),a?a(u):this.renderDots(u)))}}function A(e,t){let{visibleSlides:s,totalSlides:i,step:r,left:n,currentSlide:l,slideTo:a}=e,o=[],c=y(s/i),u=y(n/100),h=u+c,m=y(1/i);for(let p=0;p<i;++p){let e=y(p/i),s=y(e+m),r=1;if(e<h&&s>u)if(e<=u&&u<=s){r+=(s-u)/m}else if(u<=e&&s<=h)r=2;else if(e<=h&&h<=s){r+=(h-e)/m}o.push(d.createElement(t,{key:p,scale:r,onClick:()=>{a(p)}}))}return o}function R(e){return d.createElement("div",{className:b("slider-dot","dynamic","circle"),style:{transform:`scale(${e.scale})`},onClick:e.onClick})}function w(e){return A(e,R)}function L(e){return d.createElement("div",{className:b("slider-dot","dynamic","circle"),style:{width:8*e.scale+"px",height:"8px"},onClick:e.onClick})}function D(e){return A(e,L)}function _(e){const[t,s]=(0,i.useState)(0);return i.createElement("div",{style:{display:"flex",width:"100%",height:"100%",backgroundColor:e.background,color:e.color,alignItems:"center"}},i.createElement("div",{className:"text--center",style:{width:"100%"}},i.createElement("h3",null,e.title),i.createElement("div",null,i.createElement("button",{className:"button button--sm button--secondary",type:"button",onClick:()=>s(t+1)},"Add Count")),i.createElement("div",null,t)))}function P(){const[e,t]=(0,i.useState)(20),[s,r]=(0,i.useState)(3),[n,l]=(0,i.useState)(1),[c,d]=(0,i.useState)(1),[u,h]=(0,i.useState)(1.2),[m,p]=(0,i.useState)(0),[f,b]=(0,i.useState)(!1),[y,v]=(0,i.useState)(!0),[C,A]=(0,i.useState)(!0),[R,L]=(0,i.useState)(!0),[P,W]=(0,i.useState)(1);let O=[];for(let i=0;i<e;++i){let e=(0,o.MX)(),t=e.isLight()?"#000":"#fff";O.push({title:"Slide #"+(i+1),background:e.toHex(),color:t})}return i.createElement("section",null,i.createElement("div",{className:"container"},i.createElement("div",{className:"padding-bottom--md"},i.createElement(E,{totalSlides:O.length,visibleSlides:s,step:n,slideHeight:c,slideWidth:u,freeScroll:f,currentSlide:0,margin:m/2+"px"},i.createElement(S,{"aria-label":"my slider",style:{borderRadius:"1rem",overflow:"hidden"}},O.map(((e,t)=>i.createElement(x,{key:t,"aria-label":"my slide"},i.createElement(_,e))))),C&&i.createElement(k,{id:"my-slider-bar",className:"margin-top--md","aria-label":"slider bar",trackProps:{id:"my-slider-bar-track","aria-label":"slider track",style:{borderRadius:"1rem"}},thumbProps:{id:"my-slider-bar-thumb","aria-label":"slider thumb",style:{borderRadius:"1rem"}}}),R&&i.createElement(T,{id:"my-slider-dot-group",className:"margin-top--md","aria-label":"slider bar",dotGroupProps:{id:"my-slider-bar-dot-track","aria-label":"slider track"},renderDots:1===P?w:2===P?D:void 0}),y&&i.createElement("div",{className:"margin-top--md",style:{textAlign:"center"}},i.createElement(g,{className:"button button--primary"},"<"),i.createElement(N,{className:"button button--primary margin-left--md"},">"))))),i.createElement("hr",null),i.createElement("div",{className:a.featureSettingContainer},i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Slide count: ",i.createElement("input",{className:"site-input",type:"number",value:e,onChange:e=>t(Number(e.target.value))})),i.createElement("div",{className:"padding-top--xs"},"Visible slides: ",i.createElement("input",{className:"site-input",type:"number",value:s,onChange:e=>r(Number(e.target.value))})),i.createElement("div",{className:"padding-top--xs"},"Slides per step: ",i.createElement("input",{className:"site-input",type:"number",value:n,onChange:e=>l(Number(e.target.value))}))),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Slide gap: ",i.createElement("input",{className:"site-input",type:"number",value:m,onChange:e=>p(Number(e.target.value)),step:"1"})," px"),i.createElement("div",{className:"padding-top--xs"},"Slide height: ",i.createElement("input",{className:"site-input",type:"number",value:c,onChange:e=>d(Number(e.target.value)),step:"0.1"})),i.createElement("div",{className:"padding-top--xs"},"Slide width: ",i.createElement("input",{className:"site-input",type:"number",value:u,onChange:e=>h(Number(e.target.value)),step:"0.1"})),i.createElement("div",{className:"padding-top--xs",style:{color:" var(--ifm-color-secondary-darkest)",fontSize:"12px"}},"Height will become auto if set to 0")),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Free Scroll?: ",i.createElement("input",{className:"",type:"checkbox",checked:f,onChange:()=>b(!f)})),i.createElement("div",{className:"padding-top--xs"},"Show scrollbar?: ",i.createElement("input",{className:"",type:"checkbox",checked:C,onChange:()=>A(!C)})),i.createElement("div",{className:"padding-top--xs"},"Show buttons?: ",i.createElement("input",{className:"",type:"checkbox",checked:y,onChange:()=>v(!y)}))),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Show dot group?: ",i.createElement("input",{className:"",type:"checkbox",checked:R,onChange:()=>L(!R)})),i.createElement("div",{className:"padding-top--xs"},"Normal: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:0===P,onChange:()=>W(0),disabled:!R})),i.createElement("div",{className:""},"Dynamic circle: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:1===P,onChange:()=>W(1),disabled:!R})),i.createElement("div",{className:""},"Dynamic pill: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:2===P,onChange:()=>W(2),disabled:!R})))))}const W={heroBanner:"heroBanner_qdFl",heroBannerBg:"heroBannerBg__ymP",buttons:"buttons_AeoN"};function O(){const{siteConfig:e}=(0,n.Z)();return i.createElement("header",{className:(0,r.W)("",W.heroBanner)},i.createElement("div",{className:W.heroBannerBg}),i.createElement("div",{className:"container",style:{position:"relative"}},i.createElement("h1",{className:"hero__title"},e.title),i.createElement("h5",{className:"hero__subtitle"},"A simple slider using css style scroll-snap and ",i.createElement("a",{className:"",style:{color:"#FA196C",fontStyle:"italic"},href:"https://popmotion.io/",target:"_blank"},"Popmotion")),i.createElement("div",{className:W.buttons})))}function V(){const{siteConfig:e}=(0,n.Z)();return i.createElement(l.Z,{description:"A Simple React Anime Slider"},i.createElement(O,null),i.createElement("main",{style:{position:"relative"}},i.createElement(P,null)))}}}]);