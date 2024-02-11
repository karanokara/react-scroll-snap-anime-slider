"use strict";(self.webpackChunkreact_scroll_snap_anime_slider_docs=self.webpackChunkreact_scroll_snap_anime_slider_docs||[]).push([[162],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>g});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var o=n.createContext({}),c=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(o.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(r),m=a,g=p["".concat(o,".").concat(m)]||p[m]||u[m]||i;return r?n.createElement(g,l(l({ref:t},d),{},{components:r})):n.createElement(g,l({ref:t},d))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=m;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[p]="string"==typeof e?e:a,l[1]=s;for(var c=2;c<i;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},9390:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=r(7462),a=(r(7294),r(3905));const i={sidebar_position:1,description:"A short start guide of using react scroll snap anime slider",keywords:["react scroll snap anime slider","getting started"]},l="Getting Started",s={unversionedId:"getting-started",id:"getting-started",title:"Getting Started",description:"A short start guide of using react scroll snap anime slider",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/react-scroll-snap-anime-slider/docs/getting-started",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"A short start guide of using react scroll snap anime slider",keywords:["react scroll snap anime slider","getting started"]},sidebar:"tutorialSidebar",next:{title:"Component API",permalink:"/react-scroll-snap-anime-slider/docs/category/component-api"}},o={},c=[{value:"Install",id:"install",level:2},{value:"Create a simple slider",id:"create-a-simple-slider",level:2}],d={toc:c},p="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"getting-started"},"Getting Started"),(0,a.kt)("h2",{id:"install"},"Install"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install react-scroll-snap-anime-slider\n")),(0,a.kt)("h2",{id:"create-a-simple-slider"},"Create a simple slider"),(0,a.kt)("p",null,"Here create a simple slider by just passing required props, then add a slide bar (line) and the prev/next buttons."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'import { ButtonBack, ButtonNext, Carousel, Slide, Slider, SliderBarLine } from "react-scroll-snap-anime-slider";\n\nexport function MySlider() {\n    let total = 20;\n    let visible = 3;\n    let step = 3;\n\n    return (\n        <Carousel\n            totalSlides={total}\n            visibleSlides={visible}\n            step={step}\n        >\n            <Slider>\n                {new Array(total).fill(0).map((_, i) => {\n                    return <Slide key={i}>\n                        <div style={{ height: "100px", border: "1px solid #ccc", textAlign: "center" }}>slider# {i}</div>\n                    </Slide>;\n                })}\n            </Slider>\n\n            <SliderBarLine />\n\n            <div style={{ textAlign: "center" }}>\n                <ButtonBack>&lt;</ButtonBack>\n                <ButtonNext>&gt;</ButtonNext>\n            </div>\n\n        </Carousel>\n    );\n}\n')),(0,a.kt)("div",{align:"right"},(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://codesandbox.io/s/react-scroll-snap-anime-slider-starter-9k5f43?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"},(0,a.kt)("img",{parentName:"a",src:"https://codesandbox.io/static/img/play-codesandbox.svg",alt:"Edit react-scroll-snap-anime-slider-starter"})))))}u.isMDXComponent=!0}}]);