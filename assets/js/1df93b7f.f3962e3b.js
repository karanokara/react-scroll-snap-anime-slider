"use strict";(self.webpackChunkreact_scroll_snap_anime_slider_docs=self.webpackChunkreact_scroll_snap_anime_slider_docs||[]).push([[237],{898:(e,t,s)=>{s.r(t),s.d(t,{default:()=>z});var i=s(7294),l=s(6010),r=s(9960),n=s(2263),a=s(7961);const o={features:"features_t9lD",featureSvg:"featureSvg_GfXr",featureSettingContainer:"featureSettingContainer_q9aX",demoBox:"demoBox_nTD8"};var c=s(6765),d=s(7462),p=s(7378);const m={slideHeight:0,slideWidth:0,visibleSlides:1,step:1,currentSlide:0,freeScroll:!1,inertiaPower:.4,inertiaStopSpeed:800},h={...m,totalSlides:0,updateContext:()=>{},subscribers:[],slideTo:()=>{}},u=p.createContext(h);function g(){let e=[];for(let t=0;t<arguments.length;++t){let s=t<0||arguments.length<=t?void 0:arguments[t];null!=s&&"boolean"!=typeof s&&(Array.isArray(s)?e.push(g(...s)):e.push(s))}return e.join(" ").replace(/\s+/g," ").trim()}function S(e){return Math.round(1e3*e)/1e3}const x={slider:"slider_unY5","slider-tray":"slider-tray_ttc9","css-only":"css-only_ngm3",slide:"slide_eBl3","slide-inner-padding":"slide-inner-padding_fGKM","slide-inner-wrapper":"slide-inner-wrapper_MAuO","fixed-size":"fixed-size_ppLw","align-center":"align-center_bMzf","snap-stop":"snap-stop_PTdh","scroll-snap":"scroll-snap_fUHI","slider-bar-track":"slider-bar-track_zG2y","slider-bar-thumb":"slider-bar-thumb_VQ93","slider-bar-dot-group":"slider-bar-dot-group_i5P0","slider-dot-wrapper":"slider-dot-wrapper_s6xW","slider-dot":"slider-dot_uxcO",dynamic:"dynamic_JzIw",active:"active_cj5m"},y="rssas";function f(e){return[y+"-"+e,x[e]]}class b extends p.Component{static defaultProps={...m};constructor(e){super(e),this.state={context:this.extractContextProps(this.props)}}extractContextProps(e){let t,s=Object.assign({},h);for(t in s)null!=e[t]&&(s[t]=this.props[t]);return s.step=this.validateStep(e),s.updateContext=this.updateContext,s.onSlide=e.onSlide,s.slideMargin=e.slideMargin,s.snapAnimation=e.snapAnimation,s.trayPadding=e.trayPadding,s}compareContextProps(e,t){let s=["totalSlides","visibleSlides","step","slideHeight","slideWidth","slideMargin","trayPadding","freeScroll","onSlide","snapAnimation","inertiaPower","inertiaStopSpeed"];for(let i of s)if(e[i]!==t[i])return!1;return!0}updateContext=e=>{this.setState({context:{...this.state.context,...e}})};validateStep(e){return e.step>0?e.step<e.visibleSlides?e.step:e.visibleSlides:1}componentDidUpdate(e,t,s){this.compareContextProps(e,this.props)||this.setState({context:this.extractContextProps(this.props)})}render(){const{className:e,children:t,currentSlide:s,freeScroll:i,slideHeight:l,slideWidth:r,step:n,totalSlides:a,visibleSlides:o,slideMargin:c,onSlide:m,trayPadding:h,inertiaPower:S,snapAnimation:x,inertiaStopSpeed:y,...b}=this.props;return p.createElement("div",(0,d.Z)({},b,{className:g(f("wrapper"),e)}),p.createElement(u.Provider,{value:{...this.state.context}},t))}}var v=s(3542);class E extends p.Component{sliderTrayRef=p.createRef();tempCurrentSlide=0;sliderDidSlided=!1;constructor(e){super(e)}onScroll=e=>{let t=this.getTrayState();if(t){let e=t.trayWidth,s=t.innerTrayWidth,i=t.slideWidth,l=t.scrollLeft,r=this.context.currentSlide;for(let t=0;t<this.context.subscribers.length;++t)this.context.subscribers[t](s,i,l);this.updateSlideIndex(t),this.context.onSlide&&this.context.onSlide({scrollLeft:l,currentSlide:r,slideWidth:i,trayWidth:e})}};onWheel=e=>{if(this.stopAnimeActions(),this.sliderTrayRef.current){let e=this.sliderTrayRef.current;!this.context.freeScroll&&e.classList.add(...f("scroll-snap"))}};startTracking=e=>{let t=this.getScrollMax();if(this.stopAnimeActions(),this.sliderTrayRef.current&&t>0){let e=this.sliderTrayRef.current,s=e.scrollLeft,i=s,l=()=>{!this.context.freeScroll&&e.classList.remove(...f("scroll-snap"))};this.sliderDidSlided=!1,this.scrollValue=(0,v.S3)(s,(t=>{this.sliderDidSlided&&e.scrollTo(t,0)})),this.pointerAction=(0,v.cx)({x:0,y:0}).pipe((e=>{let s=i-e.x;return 0==e.x||this.sliderDidSlided||(this.sliderDidSlided=!0,l()),s<0?(i=e.x,{x:0,y:e.y}):s>t?(i=t+e.x,{x:t,y:e.y}):{x:s,y:e.y}})).start({update:e=>{this.scrollValue.update(e.x)}}),this.mouseUpAction=(0,v.oL)(window.document,"mouseup").start(this.stopTracking)}};stopTracking=e=>{if(this.pointerAction&&this.sliderTrayRef.current){let e=this.sliderTrayRef.current,t=this.getScrollMax(),s=this.scrollValue.get(),i=this.scrollValue.getVelocity(),l=!1,r=this.context.inertiaStopSpeed,n=()=>{this.snapAction=void 0,!this.context.freeScroll&&e.classList.add(...f("scroll-snap"))},a=(e,t)=>(0,v.if)({from:e,to:t,duration:300,ease:this.getEase()}).start({update:e=>this.scrollValue.update(e),complete:n});if(this.mouseUpAction?.stop(),this.pointerAction.stop(),this.pointerAction=void 0,0===i){if(!this.context.freeScroll){let e=this.getSnapScrollValue(s,i);Math.abs(s-e)>.5?this.snapAction=a(s,e):n()}return}let o=!1,c=(0,v.II)({from:s,velocity:i,power:this.context.inertiaPower,restDelta:.4,timeConstant:500}).while((e=>!l)).pipe((e=>e<0?(l=!0,0):e>t?(l=!0,t):e)).start({update:e=>{if(!o)return void(o=!0);let t=this.scrollValue.getVelocity();if(this.scrollValue.update(e),Math.abs(t)<r&&!this.context.freeScroll){c.stop(),this.inertiaAction=void 0;let s=this.getSnapScrollValue(e,t);this.snapAction=a(e,s)}},complete:n});this.inertiaAction=c}};getTrayState(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current,t=e.scrollLeft,s=e.offsetWidth,i=Number(window.getComputedStyle(e).paddingLeft.replace("px","")),l=null==this.context.trayPadding?s:s-2*i,r=l/this.context.visibleSlides;return{trayElement:e,scrollLeft:t,trayWidth:s,innerTrayWidth:l,trayPaddingX:i,slideWidth:r,slideCount:e.childElementCount,currentSlide:Math.round(t/r)}}}updateSlideIndex(e){if(void 0===e&&(e=this.getTrayState()),e){let t=e.currentSlide;this.tempCurrentSlide!==t&&(this.tempCurrentSlide=t,this.context.updateContext({currentSlide:this.tempCurrentSlide}))}}slideTo(e,t){void 0===t&&(t=!0);let s=this.getTrayState();if(s){this.stopAnimeActions();let i=s.trayElement,l=s.scrollLeft,r=()=>{this.snapAction=void 0,!this.context.freeScroll&&i.classList.add(...f("scroll-snap"))},n=e*s.slideWidth;!this.context.freeScroll&&i.classList.remove(...f("scroll-snap")),this.snapAction=(0,v.if)({from:l,to:n,duration:t?300:0,ease:this.getEase()}).start({update:e=>{i.scrollTo(e,0)},complete:r})}}stopAnimeActions(){this.inertiaAction&&(this.inertiaAction.stop(),this.inertiaAction=void 0),this.snapAction&&(this.snapAction.stop(),this.snapAction=void 0)}applyOverdrag(e,t){let s=e;return e<0&&(s=v.yx.getValueFromProgress(0,e,.1)),e>t&&(s=v.yx.getValueFromProgress(t,e,.1)),s}getScrollMax(){let e=this.getTrayState();if(e){return e.slideWidth*(e.slideCount-this.context.visibleSlides)}return 0}getSnapScrollValue(e,t){let s=e,i=this.getTrayState();if(i){let l=i.slideWidth,r=i.slideCount,n=0;n=t>0?Math.ceil(e/l):t<0?Math.floor(e/l):Math.round(e/l),n<=r&&(s=n*l)}return s}getEase(){if(this.context.snapAnimation){if("string"!=typeof this.context.snapAnimation)return v.Ui.cubicBezier(...this.context.snapAnimation);if("easeInOut"===this.context.snapAnimation)return v.Ui.easeInOut;if("easeIn"===this.context.snapAnimation)return v.Ui.easeIn}return v.Ui.easeOut}handleOnClickCapture(e){this.sliderDidSlided&&(e.preventDefault(),e.stopPropagation())}componentDidUpdate(e,t,s){this.context.slideTo=e=>this.slideTo(e,!0)}componentDidMount(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current;this.mouseDownAction=(0,v.oL)(e,"mousedown").start(this.startTracking),e.addEventListener("scroll",this.onScroll,!1),e.addEventListener("mousewheel",this.onWheel,!1),e.addEventListener("DOMMouseScroll",this.onWheel,!1)}this.tempCurrentSlide!==this.context.currentSlide&&this.slideTo(this.context.currentSlide,!1),this.context.slideTo=e=>this.slideTo(e,!0)}componentWillUnmount(){if(this.sliderTrayRef.current){let e=this.sliderTrayRef.current;this.stopAnimeActions(),this.mouseDownAction?.stop(),this.pointerAction?.stop(),e.removeEventListener("scroll",this.onScroll,!1),e.removeEventListener("mousewheel",this.onWheel,!1),e.removeEventListener("DOMMouseScroll",this.onWheel,!1)}}render(){const{children:e,className:t,trayProps:s,...i}=this.props;let l={};return this.context.slideMargin&&(l.marginLeft="-"+this.context.slideMargin,l.marginRight="-"+this.context.slideMargin),null!=this.context.trayPadding&&(l.paddingLeft=this.context.trayPadding,l.paddingRight=this.context.trayPadding),p.createElement("div",(0,d.Z)({},i,{className:g(f("slider"),t)}),p.createElement("div",(0,d.Z)({},s,{className:g(f("slider-tray"),f("css-only"),this.context.freeScroll?"":f("scroll-snap"),s?.className),style:{...s?.style,...l},ref:this.sliderTrayRef,onClickCapture:this.handleOnClickCapture.bind(this)}),e))}}E.contextType=u;class N extends p.Component{constructor(e){super(e),this.state={}}render(){let{children:e,style:t,className:s,innerMarginDivProps:i,innerPaddingDivProps:l,innerWrapperDivProps:r,...n}=this.props,{slideHeight:a,slideWidth:o,visibleSlides:c}=this.context,m=a>0&&o>0?a/o*100:0,h={width:(c>0?100/c:100)+"%",scrollMargin:null!=this.context.trayPadding&&this.context.visibleSlides%2==0?`0 ${this.context.trayPadding}`:"",...t},u={paddingBottom:m>0?m+"%":"",...l?.style},S={...i?.style};null!=this.context.slideMargin&&(S.marginLeft=this.context.slideMargin,S.marginRight=this.context.slideMargin);let x=m>0?f("fixed-size"):"";return p.createElement("div",(0,d.Z)({},n,{className:g(f("slide"),null!=this.context.trayPadding&&this.context.visibleSlides%2==1&&f("align-center"),s),style:h}),p.createElement("div",(0,d.Z)({},i,{className:g(f("slide-inner-margin")),style:S}),p.createElement("div",(0,d.Z)({},l,{className:g(f("slide-inner-padding")),style:u}),p.createElement("div",(0,d.Z)({},r,{className:g(f("slide-inner-wrapper"),x,r?.className)}),e))))}}N.contextType=u;class C extends p.PureComponent{className="slider-button";ariaLabel="";isBack=!0;onClick=()=>{};handleOnClick(e){let t=this.context.currentSlide,s=this.context.step,i=this.context.totalSlides-this.context.visibleSlides,l=t+(e?s:-1*s);l>i?l=i:l<0&&(l=0),t!==l&&this.context.slideTo(l)}render(){const{visibleSlides:e,totalSlides:t,currentSlide:s}=this.context;let{className:i,disabled:l,onClick:r,...n}=this.props;const a=g(this.className,i),o=t-e;return null==l&&(this.isBack&&s<=0||!this.isBack&&s>=o)&&(l=!0),p.createElement("button",(0,d.Z)({"aria-label":this.ariaLabel,type:"button",disabled:l},n,{className:a,onClick:e=>{r&&"function"==typeof r&&r(e),this.onClick()}}),this.props.children)}}C.contextType=u;class k extends C{constructor(e){super(e),this.className=g(f("slider-button-back"),f(this.className)),this.ariaLabel="previous",this.onClick=()=>this.handleOnClick(!1)}}class A extends C{constructor(e){super(e),this.isBack=!1,this.className=g(f("slider-button-next"),f(this.className)),this.ariaLabel="next",this.onClick=()=>this.handleOnClick(!0)}}class T extends p.Component{constructor(e){super(e),this.state={left:0}}slideTo=e=>{let t=this.context.currentSlide,s=this.context.totalSlides-this.context.visibleSlides;e>s?e=s:e<0&&(e=0),t!==e&&this.context.slideTo(e)};onScroll=(e,t,s)=>{const{totalSlides:i}=this.context,l=s/(i*t)*100;this.setState({left:l})};componentDidUpdate(e,t,s){this.prevContext.subscribers!==this.context.subscribers&&(this.context.subscribers.push(this.onScroll),this.prevContext=this.context)}componentDidMount(){const{currentSlide:e,visibleSlides:t,totalSlides:s}=this.context;if(this.context.subscribers.push(this.onScroll),this.prevContext=this.context,0!==e){let t=e/s*100;this.setState({left:t})}}componentWillUnmount(){let e=this.context.subscribers.indexOf(this.onScroll);e>=0&&this.context.subscribers.splice(e,1)}}T.contextType=u;class P extends T{render(){const{visibleSlides:e,totalSlides:t}=this.context,{className:s,style:i,thumbProps:l,trackProps:r,...n}=this.props;let a=e/t*100,o=this.state.left;o<0&&(a+=o,o=0),o+a>100&&(a=100-o);let c={width:a+"%",left:o+"%"};const m=g(f("slider-bar"),s);return l&&(c={...l.style,...c}),p.createElement("div",(0,d.Z)({},n,{className:m,style:i}),p.createElement("div",(0,d.Z)({},r,{className:g(f("slider-bar-track"),r?.className)}),p.createElement("div",(0,d.Z)({},l,{className:g(f("slider-bar-thumb"),l?.className),style:c}))))}}class w extends T{theDot(e,t,s){return p.createElement("div",{className:g(f("slider-dot-wrapper"),t?f("active"):""),onClick:s},p.createElement("div",{key:e,className:g(f("slider-dot"))}))}renderDots(e){let{visibleSlides:t,totalSlides:s,currentSlide:i,slideTo:l}=e,r=[],n=i,a=i+t;for(let o=0;o<s;++o){let e=n<=o&&o<a;r.push(this.theDot(o,e,(()=>l(o))))}return r}render(){const{visibleSlides:e,totalSlides:t,step:s,currentSlide:i}=this.context,{children:l,className:r,dotGroupProps:n,renderDots:a,...o}=this.props;let c={visibleSlides:e,totalSlides:t,step:s,currentSlide:i,left:this.state.left,slideTo:this.slideTo};const m=g(f("slider-bar"),r);return p.createElement("div",(0,d.Z)({},o,{className:m}),p.createElement("div",(0,d.Z)({},n,{className:g(f("slider-bar-dot-group"),n?.className)}),a?a(c):this.renderDots(c)))}}function _(e,t){let{visibleSlides:s,totalSlides:i,step:l,left:r,currentSlide:n,slideTo:a}=e,o=[],c=S(s/i),d=S(r/100),m=d+c,h=S(1/i),u=n,g=n+s;for(let x=0;x<i;++x){let e=S(x/i),s=S(e+h),l=1,r=u<=x&&x<g;if(e<m&&s>d)if(e<=d&&d<=s){l+=(s-d)/h}else if(d<=e&&s<=m)l=2;else if(e<=m&&m<=s){l+=(m-e)/h}o.push(p.createElement(t,{key:x,scale:l,active:r,onClick:()=>{a(x)}}))}return o}function M(e){return p.createElement("div",{className:g(f("slider-dot-wrapper"),f("dynamic"),e.active?f("active"):""),onClick:e.onClick},p.createElement("div",{className:g(f("slider-dot"),f("circle")),style:{transform:`scale(${e.scale})`}}))}function D(e){return _(e,M)}function L(e){return p.createElement("div",{className:g(f("slider-dot-wrapper"),f("dynamic"),e.active?f("active"):""),onClick:e.onClick},p.createElement("div",{className:g(f("slider-dot"),f("circle")),style:{width:8*e.scale+"px",height:"8px"}}))}function W(e){return _(e,L)}function R(e){const[t,s]=(0,i.useState)(0);return i.createElement("div",{style:{display:"flex",width:"100%",height:"100%",backgroundColor:e.background,color:e.color,alignItems:"center",borderRadius:"1rem",overflow:"hidden"}},i.createElement("div",{className:"text--center",style:{width:"100%"}},i.createElement("h4",null,e.title),i.createElement("div",null,i.createElement("button",{className:"button button--sm button--secondary",type:"button",onClick:()=>s(t+1)},"Add Count ",t)),i.createElement("div",null,i.createElement("a",{style:{color:e.color,textDecorationLine:"underline"},href:"docs/getting-started",target:"_blank"},"This is a link"))))}function B(){const e=(0,i.useMemo)((()=>({index:0})),[]),[t,s]=(0,i.useState)("20"),[l,r]=(0,i.useState)("3"),[n,a]=(0,i.useState)("1"),[d,p]=(0,i.useState)("1"),[m,h]=(0,i.useState)("1"),[u,g]=(0,i.useState)("10"),[S,x]=(0,i.useState)("0"),[y,f]=(0,i.useState)(!1),[v,C]=(0,i.useState)(!0),[T,_]=(0,i.useState)(!0),[M,L]=(0,i.useState)(!0),[B,O]=(0,i.useState)(1);let Z=[];for(let i=0;i<Number(t);++i){let e=(0,c.MX)(),t=e.isLight()?"#000":"#fff";Z.push({title:"Slide #"+(i+1),background:e.toHex(),color:t})}return i.createElement("section",null,i.createElement("div",{className:"container"},i.createElement("div",{className:"padding-bottom--md"},i.createElement(b,{id:"my-carousel","aria-label":"my carousel",className:"my-carousel",totalSlides:Z.length,visibleSlides:Number(l),step:Number(n),slideHeight:Number(d),slideWidth:Number(m),freeScroll:y,currentSlide:e.index,slideMargin:Number(u)/2+"px",trayPadding:S+"px",onSlide:t=>{let{currentSlide:s}=t;e.index=s},style:{margin:`0 -${Number(S)>0?1:0}rem`}},i.createElement(E,{"aria-label":"my slider"},Z.map(((e,t)=>i.createElement(N,{key:t,"aria-label":"my slide",innerWrapperDivProps:{}},i.createElement(R,e))))),T&&i.createElement(P,{id:"my-slider-bar",className:"margin-top--md","aria-label":"slider bar",trackProps:{id:"my-slider-bar-track","aria-label":"slider track",style:{borderRadius:"1rem"}},thumbProps:{id:"my-slider-bar-thumb","aria-label":"slider thumb",style:{borderRadius:"1rem"}},style:{padding:`0 ${S}px`}}),M&&i.createElement(w,{id:"my-slider-dot-group",className:"margin-top--md","aria-label":"slider bar",dotGroupProps:{id:"my-slider-bar-dot-group","aria-label":"dot group"},renderDots:1===B?D:2===B?W:void 0,style:{padding:`0 ${S}px`}}),v&&i.createElement("div",{className:"margin-top--md",style:{textAlign:"center",padding:`0 ${S}px`}},i.createElement(k,{className:"button button--primary"},"<"),i.createElement(A,{className:"button button--primary margin-left--md"},">"))))),i.createElement("hr",null),i.createElement("div",{className:o.featureSettingContainer},i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Slide count: ",i.createElement("input",{className:"site-input",type:"number",value:t,onChange:e=>s(e.target.value)})),i.createElement("div",{className:"padding-top--xs"},"Visible slides: ",i.createElement("input",{className:"site-input",type:"number",value:l,onChange:e=>r(e.target.value)})),i.createElement("div",{className:"padding-top--xs"},"Slides per step: ",i.createElement("input",{className:"site-input",type:"number",value:n,onChange:e=>a(e.target.value)}))),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:"padding-top--xs"},"Slide height: ",i.createElement("input",{className:"site-input",type:"number",value:d,onChange:e=>p(e.target.value),step:"0.1"})),i.createElement("div",{className:"padding-top--xs"},"Slide width: ",i.createElement("input",{className:"site-input",type:"number",value:m,onChange:e=>h(e.target.value),step:"0.1"})),i.createElement("div",{className:"",style:{color:" var(--ifm-color-secondary-darkest)",fontSize:"12px"}},"Height will become auto if set to 0")),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Slide margin: ",i.createElement("input",{className:"site-input",type:"number",value:u,onChange:e=>g(e.target.value),step:"1"})," px"),i.createElement("div",{className:"",style:{color:" var(--ifm-color-secondary-darkest)",fontSize:"12px"}},"Margin between each slide"),i.createElement("div",{className:"padding-top--xs"},"Tray padding: ",i.createElement("input",{className:"site-input",type:"number",value:S,onChange:e=>x(e.target.value),step:"1"})," px"),i.createElement("div",{className:"",style:{color:" var(--ifm-color-secondary-darkest)",fontSize:"12px"}},"Offset the tray to see prev/next slide partially")),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Free Scroll?: ",i.createElement("input",{className:"",type:"checkbox",checked:y,onChange:()=>f(!y)})),i.createElement("div",{className:"padding-top--xs"},"Show scrollbar?: ",i.createElement("input",{className:"",type:"checkbox",checked:T,onChange:()=>_(!T)})),i.createElement("div",{className:"padding-top--xs"},"Show buttons?: ",i.createElement("input",{className:"",type:"checkbox",checked:v,onChange:()=>C(!v)}))),i.createElement("div",{className:"padding--md"},i.createElement("div",{className:""},"Show dot group?: ",i.createElement("input",{className:"",type:"checkbox",checked:M,onChange:()=>L(!M)})),i.createElement("div",{className:"padding-top--xs"},"Normal: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:0===B,onChange:()=>O(0),disabled:!M})),i.createElement("div",{className:""},"Dynamic circle: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:1===B,onChange:()=>O(1),disabled:!M})),i.createElement("div",{className:""},"Dynamic pill: ",i.createElement("input",{className:"",type:"radio",name:"dot-type",checked:2===B,onChange:()=>O(2),disabled:!M})))))}const O={heroBanner:"heroBanner_qdFl",heroBannerBg:"heroBannerBg__ymP",buttons:"buttons_AeoN"},Z=JSON.parse('{"i8":"1.5.0","WL":"A simple slider/carousel using css style scroll-snap and Popmotion."}');function V(){const{siteConfig:e}=(0,n.Z)();return i.createElement("header",{className:(0,l.W)("",O.heroBanner)},i.createElement("div",{className:O.heroBannerBg}),i.createElement("div",{className:"container",style:{position:"relative"}},i.createElement("h1",{style:{fontSize:"2.5rem"}},e.title),i.createElement("h4",null,"A simple slider using css style ",i.createElement("a",{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap",target:"_blank"},"scroll-snap")," and ",i.createElement("a",{className:"",style:{color:"#FA196C",fontStyle:"italic"},href:"https://popmotion.io/",target:"_blank"},"Popmotion")),i.createElement("div",{className:O.buttons},i.createElement(r.Z,{className:"button button--primary",to:"/docs/getting-started"},"Getting Started ",i.createElement("b",{style:{fontSize:"12px"}},"(v",Z.i8,")")))))}function z(){const{siteConfig:e}=(0,n.Z)();return i.createElement(a.Z,{description:Z.WL},i.createElement(V,null),i.createElement("main",{style:{position:"relative"}},i.createElement(B,null)))}}}]);