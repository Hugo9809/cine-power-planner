const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-C8GHSTtM.js","assets/vendor-Dzz8Pluk.js","assets/core-modules-CvxJ6PMl.js","assets/data-B26rSgVw.js","assets/main-BSN_IgTq.css","assets/rules-view-Cc041Lt8.css","assets/contacts-Cu1vBGIE.css","assets/settings-B5-wQjsT.css","assets/owned-gear-D1_apNqb.css"])))=>i.map(i=>d[i]);
var tn=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);import{_ as M,d as xe,s as nn}from"./core-modules-CvxJ6PMl.js";var Fo=tn((Uo,fe)=>{const C=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};let ut=!1,W=!1;const ye="cine_use_v2_ui";function on(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2")){const n=e.get("v2")==="true";return localStorage.setItem(ye,n.toString()),n}return localStorage.getItem(ye)==="true"}catch{return!1}}function an(){const e=localStorage.getItem("darkMode")==="true";document.body.classList.toggle("dark-mode",e);const n=localStorage.getItem("cameraPowerPlanner_pinkMode")==="true"||localStorage.getItem("pinkMode")==="true";document.body.classList.toggle("pink-mode",n)}function Fe(){try{localStorage.setItem(ye,"true"),W=!0,document.body.classList.add("v2-mode"),an();const e=document.getElementById("topBar"),n=document.getElementById("mainContent"),t=document.getElementById("sideMenu"),o=document.getElementById("menuOverlay"),i=document.getElementById("cineGlobalLoadingIndicator");i&&(i.style.display="none"),e&&(e.style.display="none"),n&&(n.style.display="none"),t&&(t.style.display="none"),o&&(o.style.display="none");const s=document.getElementById("siteFooter");s&&(s.style.display="none");const a=document.getElementById("installPromptBanner"),r=document.getElementById("offlineIndicator"),l=document.getElementById("backupNotificationContainer");a&&(a.style.display="none"),r&&(r.style.display="none"),l&&(l.style.display="none");const c=document.getElementById("v2-app");return c&&(c.style.display="",c.setAttribute("aria-hidden","false")),C.cineProjectDetail&&typeof C.cineProjectDetail.init=="function"&&C.cineProjectDetail.init(),C.cineViewManager&&typeof C.cineViewManager.enableV2=="function"&&C.cineViewManager.enableV2(),rn(),C.cineProjectDashboard&&typeof C.cineProjectDashboard.init=="function"&&C.cineProjectDashboard.init(),C.cineV2Sidebar&&typeof C.cineV2Sidebar.init=="function"&&C.cineV2Sidebar.init(),Me(),console.log("[V2 Bootstrap] V2 UI enabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to enable V2:",e),Me(),!1}}function sn(){let e=document.getElementById("v2-loader");e||(e=document.createElement("div"),e.id="v2-loader",e.innerHTML=`
                <div class="v2-loader-content">
                    <div class="v2-spinner"></div>
                    <div class="v2-loader-text">Loading Cine Power Planner...</div>
                </div>
            `,document.body.appendChild(e)),e.classList.add("visible")}function Me(){const e=document.getElementById("v2-loader");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},500))}function ze(){try{localStorage.setItem(ye,"false"),W=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("topBar"),n=document.getElementById("mainContent"),t=document.getElementById("sideMenu"),o=document.getElementById("menuOverlay"),i=document.getElementById("siteFooter");e&&(e.style.display=""),n&&(n.style.display=""),t&&(t.style.display=""),o&&(o.style.display=""),i&&(i.style.display="");const s=document.getElementById("v2-app");return s&&(s.style.display="none",s.setAttribute("aria-hidden","true")),C.cineViewManager&&typeof C.cineViewManager.disableV2=="function"&&C.cineViewManager.disableV2(),console.log("[V2 Bootstrap] V2 UI disabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to disable V2:",e),!1}}function rn(){const e=document.getElementById("v2ExitBtn");e&&!e.dataset.bound&&(e.dataset.bound="true",e.addEventListener("click",()=>{ze(),window.location.reload()}))}function St(){return W?ze():Fe()}async function Et(){try{console.log("[V2 Bootstrap] Loading V2 assets via Vite dynamic imports..."),await M(()=>import("./main-C8GHSTtM.js").then(n=>n.i),__vite__mapDeps([0,1,2,3,4])),await M(()=>Promise.resolve({}),__vite__mapDeps([5])),await M(()=>Promise.resolve({}),__vite__mapDeps([6])),await M(()=>Promise.resolve({}),__vite__mapDeps([7])),await M(()=>Promise.resolve({}),__vite__mapDeps([8])),console.log("[V2 Bootstrap] V2 CSS loaded"),await M(()=>Promise.resolve().then(()=>wn),void 0),await M(()=>Promise.resolve().then(()=>En),void 0);const{LegacyShim:e}=await M(async()=>{const{LegacyShim:n}=await Promise.resolve().then(()=>Vn);return{LegacyShim:n}},void 0);return await M(()=>import("./main-C8GHSTtM.js").then(n=>n.a),__vite__mapDeps([0,1,2,3,4])),await M(()=>Promise.resolve().then(()=>Kn),void 0),await M(()=>Promise.resolve().then(()=>co),void 0),await M(()=>Promise.resolve().then(()=>Po),void 0),await M(()=>Promise.resolve().then(()=>Vo),void 0),await M(()=>Promise.resolve().then(()=>jo),void 0),await M(()=>import("./core-modules-CvxJ6PMl.js").then(n=>n.h),__vite__mapDeps([2,1])),await M(()=>import("./own-gear-CSm93DJ1.js"),[]),await M(()=>Promise.resolve().then(()=>_o),void 0),await M(()=>Promise.resolve().then(()=>Ro),void 0),await M(()=>Promise.resolve().then(()=>Ho),void 0),await M(()=>Promise.resolve().then(()=>qo),void 0),await M(()=>Promise.resolve().then(()=>Oo),void 0),await M(()=>Promise.resolve().then(()=>No),void 0),await M(()=>Promise.resolve().then(()=>Go),void 0),window.cineBackupsView&&typeof window.cineBackupsView.init=="function"&&window.cineBackupsView.init(),console.log("[V2 Bootstrap] V2 JS modules loaded"),C.cineV2Sidebar&&typeof C.cineV2Sidebar.init=="function"&&C.cineV2Sidebar.init(),C.cineRulesView&&typeof C.cineRulesView.init=="function"&&C.cineRulesView.init(),C.cineV2DeviceLibrary&&typeof C.cineV2DeviceLibrary.init=="function"&&C.cineV2DeviceLibrary.init(),C.cineContactsView&&typeof C.cineContactsView.init=="function"&&C.cineContactsView.init(),C.cineSettingsView&&typeof C.cineSettingsView.init=="function"&&C.cineSettingsView.init(),C.cineOwnGearView&&typeof C.cineOwnGearView.init=="function"&&C.cineOwnGearView.init(),C.cineHelpView&&typeof C.cineHelpView.init=="function"&&C.cineHelpView.init(),!0}catch(e){return console.error("[V2 Bootstrap] Failed to load V2 assets:",e),!1}}async function Ae(){if(ut){console.warn("[V2 Bootstrap] Already initialized");return}ut=!0,W=on(),console.log(`[V2 Bootstrap] Starting. V2 enabled: ${W}`),W&&(sn(),await Et()?Fe():Me()),ln(),console.log("[V2 Bootstrap] Initialization complete")}function ln(){if(document.getElementById("v2ToggleBtn"))return;const e=document.getElementById("settingsDialog");if(!e)return;const n=e.querySelector(".modal-content, .settings-content, .modal-surface");if(!n)return;const t=document.createElement("div");t.className="settings-row v2-toggle-section",t.style.cssText="margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;";const o=document.createElement("label");o.textContent="Experimental UI",o.style.cssText="font-weight: 600; display: block; margin-bottom: 8px;";const i=document.createElement("p");i.textContent="Try the new V2 interface design. This is experimental and can be toggled off at any time.",i.style.cssText="font-size: 0.875rem; color: #666; margin-bottom: 12px;";const s=document.createElement("button");s.id="v2ToggleBtn",s.type="button",s.className="v2-btn v2-btn-secondary",s.style.cssText="padding: 8px 16px; border-radius: 6px; cursor: pointer; background: #4a90d9; color: white; border: none;",s.textContent=W?"Return to Classic UI":"Try New UI",s.addEventListener("click",()=>{St(),s.textContent=W?"Return to Classic UI":"Try New UI",window.location.reload()}),t.appendChild(o),t.appendChild(i),t.appendChild(s),n.appendChild(t)}const vt={init:Ae,enableV2:Fe,disableV2:ze,toggleV2:St,isV2Enabled:()=>W,loadV2Assets:Et};typeof globalThis<"u"?globalThis.cineV2Bootstrap=vt:typeof window<"u"&&(window.cineV2Bootstrap=vt);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ae):setTimeout(Ae,100));const cn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},dn=".app-view",pt="active",We="projects",Ue={projects:{id:"view-projects",title:"Projects",pattern:/^#?\/?projects?\/?$/i},projectDetail:{id:"view-project-detail",title:"Project",pattern:/^#?\/?project\/([^/]+)(\/([a-z]+))?\/?$/i},settings:{id:"view-settings",title:"Settings",pattern:/^#?\/?settings?\/?$/i},contacts:{id:"view-contacts",title:"Contacts",pattern:/^#?\/?contacts?\/?$/i},devices:{id:"view-devices",title:"Device Library",pattern:/^#?\/?devices?\/?$/i},help:{id:"view-help",title:"Help",pattern:/^#?\/?help\/?$/i},rules:{id:"view-rules",title:"Auto Gear Rules",pattern:/^#?\/?rules\/?$/i},ownGear:{id:"view-own-gear",title:"Owned Gear",pattern:/^#?\/?own-gear\/?$/i}};let de=null,Ve={},ae=[],Ke=!1;function Je(){return document.querySelector(".v2-app")||document.getElementById("v2-app")}function un(){const e=Je();return e?Array.from(e.querySelectorAll(dn)):[]}function vn(e){return document.getElementById(e)}function he(e,n={}){const t=Ue[e];if(!t)return console.warn(`[ViewManager] Unknown view: ${e}`),!1;const o=vn(t.id);return o?(un().forEach(i=>{i.classList.remove(pt)}),o.classList.add(pt),de&&de!==e&&ae.push({view:de,params:Ve}),de=e,Ve=n,bn(e,n),fn(e,n),yn(t.title,n),!0):(console.warn(`[ViewManager] View element not found: ${t.id}`),!1)}function pn(){if(ae.length>0){const e=ae.pop();return he(e.view,e.params),!0}return he(We),!1}function gn(){return de}function mn(){return{...Ve}}function bn(e,n){let t="";switch(e){case"projects":t="#/projects";break;case"projectDetail":t=`#/project/${encodeURIComponent(n.projectId||"new")}`,n.tab&&(t+=`/${n.tab}`);break;case"settings":t="#/settings";break;case"contacts":t="#/contacts";break;case"devices":t="#/devices";break;case"help":t="#/help";break;case"rules":t="#/rules";break;case"ownGear":t="#/own-gear";break;default:t="#/projects"}window.location.hash!==t&&history.replaceState(null,"",t)}function kt(){const e=window.location.hash||"#/projects";for(const[n,t]of Object.entries(Ue)){const o=e.match(t.pattern);if(o){const i={};return n==="projectDetail"&&o[1]&&(i.projectId=decodeURIComponent(o[1]),o[3]&&(i.tab=o[3])),{viewName:n,params:i}}}return{viewName:We,params:{}}}function Lt(){const{viewName:e,params:n}=kt();he(e,n)}function fn(e,n){const t=new CustomEvent("v2:viewchange",{bubbles:!0,detail:{view:e,params:n,previousView:ae.length>0?ae[ae.length-1]:null}});document.dispatchEvent(t)}function yn(e,n){let t=e;n.projectId&&n.projectId!=="new"&&(t=`${n.projectId} - ${e}`),document.title=`${t} | Cine Power Planner`}function $t(){try{return localStorage.getItem("cine_use_v2_ui")==="true"}catch{return!1}}function Ct(){try{localStorage.setItem("cine_use_v2_ui","true"),Ke=!0,document.body.classList.add("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="none");const n=Je();return n&&(n.style.display=""),Lt(),!0}catch(e){return console.error("[ViewManager] Failed to enable V2 UI:",e),!1}}function xt(){try{localStorage.setItem("cine_use_v2_ui","false"),Ke=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="");const n=Je();return n&&(n.style.display="none"),!0}catch(e){return console.error("[ViewManager] Failed to disable V2 UI:",e),!1}}function hn(){return Ke?xt():Ct()}function je(){window.addEventListener("hashchange",Lt),$t()&&cn.cineV2Bootstrap,console.log("[ViewManager] Initialized")}const _e={showView:he,goBack:pn,getCurrentView:gn,getCurrentParams:mn,parseHash:kt,isV2Enabled:$t,enableV2:Ct,disableV2:xt,toggleV2:hn,init:je,VIEWS:Ue,DEFAULT_VIEW:We};typeof globalThis<"u"?globalThis.cineViewManager=_e:typeof window<"u"&&(window.cineViewManager=_e);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",je):je());const wn=Object.freeze(Object.defineProperty({__proto__:null,ViewManager:_e},Symbol.toStringTag,{value:"Module"})),De=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Dt=["contactsViewTitle","rulesViewTitle","ownGearViewTitle","deviceLibraryTitle","buttonAddContact","buttonAddRule","buttonAddGearItem"];function Ye(){if(!De.texts||!De.texts.en)return console.warn("[V2 Translations] Main translation system not loaded"),!1;const e=Dt.filter(n=>!(n in De.texts.en));return e.length>0?(console.warn("[V2 Translations] Missing keys:",e),!1):(console.log("[V2 Translations] All V2 keys verified"),!0)}const It=Ye(),Sn={verifyV2Translations:Ye,isReady:It},En=Object.freeze(Object.defineProperty({__proto__:null,V2_REQUIRED_KEYS:Dt,default:Sn,isReady:It,verifyV2Translations:Ye},Symbol.toStringTag,{value:"Module"})),gt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Ze={project:["setupSelect","setupName","saveSetupBtn","deleteSetupBtn"],devices:["cameraSelect","monitorSelect","videoSelect","motor1Select","motor2Select","motor3Select","motor4Select","controller1Select","controller2Select","controller3Select","controller4Select","distanceSelect","batteryPlateSelect","batterySelect","batteryHotswapSelect"],hidden:["cageSelect"],power:["heroCard","heroTotalDraw","heroAvailablePower","heroRuntime","heroCurrent144","heroCurrent12","heroBatteryCount","breakdownList","pinWarning","dtapWarning","hotswapWarning"],outputs:["projectRequirementsOutput","gearListOutput","batteryTable","powerDiagram"]},Qe=Object.values(Ze).flat();let N=null,we=!0,ge=new Map;function Bt(){return N||(N=document.getElementById("v2-legacy-context"),N||(N=document.createElement("div"),N.id="v2-legacy-context",N.setAttribute("aria-hidden","true"),N.style.cssText="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);",document.body.appendChild(N)),N)}function kn(e){const n=document.getElementById(e);return n?(Bt().appendChild(n),n):(console.warn(`[LegacyShim] Element not found: ${e}`),null)}function Pt(e,n){if(!we)return;const t=document.getElementById(e),o=document.getElementById(n);!t||!o||(o.value=t.value,X(o,"change"))}function Tt(e,n){if(!we)return;const t=document.getElementById(e),o=document.getElementById(n);!t||!o||(o.value=t.value,X(o,"input"))}function Mt(e,n){const t=document.getElementById(e),o=document.getElementById(n);!t||!o||(we=!1,o.value=t.value,we=!0)}function X(e,n,t={}){if(!e)return;const o=new Event(n,{bubbles:!0,cancelable:!0,...t});e.dispatchEvent(o)}function Xe(e){const n=document.getElementById(e);return n?(X(n,"click"),!0):(console.warn(`[LegacyShim] Cannot trigger click, element not found: ${e}`),!1)}function Ln(e){const n=document.getElementById("setupSelect");return n?Array.from(n.options).find(o=>o.value===e)?(n.value=e,X(n,"change"),!0):(console.warn(`[LegacyShim] Project not found: ${e}`),!1):(console.error("[LegacyShim] setupSelect not found"),!1)}function At(){return Xe("saveSetupBtn")}function $n(){return Xe("deleteSetupBtn")}function Cn(e){const n=document.getElementById("setupSelect"),t=document.getElementById("setupName");return!n||!t?(console.error("[LegacyShim] Project elements not found"),!1):(n.value="",X(n,"change"),t.value=e,X(t,"input"),At())}function xn(){if(typeof window.getSetups=="function")try{const n=window.getSetups()||{},t=Object.keys(n).filter(o=>o&&!o.startsWith("auto-backup-"));if(t.length>0)return t}catch(n){console.warn("[LegacyShim] getSetups failed:",n)}const e=document.getElementById("setupSelect");if(e&&e.options.length>1){const n=Array.from(e.options).map(t=>t.value).filter(t=>t!=="");if(n.length>0)return[...new Set(n)]}try{const n=localStorage.getItem("cameraPowerPlanner_setups");if(n){const t=JSON.parse(n);return Object.keys(t).filter(o=>o&&!o.startsWith("auto-backup-"))}}catch(n){console.warn("[LegacyShim] localStorage fallback failed:",n)}return[]}function Dn(e,n){const t=document.getElementById(e);return t?(t.value=n,X(t,"change"),!0):(console.warn(`[LegacyShim] Device element not found: ${e}`),!1)}function In(e){const n=document.getElementById(e);return n?n.value:null}function Bn(){const e={};return Ze.devices.forEach(n=>{const t=document.getElementById(n);t&&(e[n]=t.value)}),e}function Pn(e,n){const t=document.getElementById(e);if(!t)return;const o=()=>Pt(e,n);t.addEventListener("change",o),ge.set(`${e}:change`,{element:t,handler:o})}function Tn(e,n){const t=document.getElementById(e);if(!t)return;const o=()=>Tt(e,n);t.addEventListener("input",o),ge.set(`${e}:input`,{element:t,handler:o})}function Mn(e,n){const t=document.getElementById(e);if(!t)return;const o=()=>Mt(e,n);t.addEventListener("change",o),ge.set(`${e}:legacy:change`,{element:t,handler:o})}function An(){ge.forEach(({element:e,handler:n},t)=>{const o=t.split(":")[1];e.removeEventListener(o,n)}),ge.clear()}function Vt(){const e=[],n=[];return Qe.forEach(t=>{document.getElementById(t)?n.push(t):e.push(t)}),e.length>0&&console.warn("[LegacyShim] Missing critical IDs:",e),{found:n,missing:e}}function Re(){const{found:e,missing:n}=Vt();console.log(`[LegacyShim] Initialized. Found ${e.length}/${Qe.length} critical elements.`),n.length>0&&console.warn("[LegacyShim] Missing elements:",n)}const Le={ensureLegacyContainer:Bt,shimToLegacyContainer:kn,syncSelectValue:Pt,syncInputValue:Tt,syncToV2:Mt,dispatchNativeEvent:X,triggerLegacyClick:Xe,loadProject:Ln,saveProject:At,deleteProject:$n,createProject:Cn,getProjectNames:xn,setDeviceValue:Dn,getDeviceValue:In,getDeviceSnapshot:Bn,bindV2Select:Pn,bindV2Input:Tn,listenLegacyChanges:Mn,verifyLegacyIds:Vt,cleanup:An,init:Re,CRITICAL_IDS:Ze,ALL_CRITICAL_IDS:Qe};typeof gt<"u"&&(gt.cineLegacyShim=Le);typeof window<"u"&&(window.cineLegacyShim=Le);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Re):Re());typeof fe<"u"&&fe.exports&&(fe.exports=Le);const Vn=Object.freeze(Object.defineProperty({__proto__:null,LegacyShim:Le},Symbol.toStringTag,{value:"Module"})),B=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},jt="projectGrid",ue="view-projects",O="cameraPowerPlanner_setups",Q=["blue","green","orange","purple","red","pink","teal","indigo","yellow","amber","lime","emerald","cyan","sky","violet","fuchsia","rose","slate","stone","neutral","gold","crimson","navy","aquamarine"],jn=["📽️","🎬","⚡","🔋","🎥","📺","💡","🎞️","📸","🎯","📝","⭐","🐴","🦄","🤘","🦊","🐶","🦖","🐙","🐉","👽","👻","🤖","💀","👾","🤡","🎉","🔥","✨","🚀","🍕","🤙","✌️","💪"];let me={query:""},_=null;function He(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function ve(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function be(e){if(!e||typeof e!="string")return"";const n=e.split(" to ");return n.length===1?ve(n[0]):n.length===2?`${ve(n[0])} - ${ve(n[1])}`:e}function P(e,n={}){const t=document.documentElement.lang||"en";let o=window.texts&&window.texts[t]?window.texts[t]:null;!o&&window.texts&&(o=window.texts.en);const i=(a,r)=>r.split(".").reduce((l,c)=>l?l[c]:null,a);let s=o?i(o,e):null;if(!s&&t!=="en"&&window.texts&&window.texts.en&&(s=i(window.texts.en,e)),!s)return e;if(typeof s=="string")for(const[a,r]of Object.entries(n))s=s.replace(`{${a}}`,r);return s}function et(){if(typeof window.loadProjectMetadata=="function")try{_=window.loadProjectMetadata();return}catch(e){console.warn("[V2] Failed to load project metadata via storage API:",e)}try{const e=localStorage.getItem(O);e?_=JSON.parse(e):_={}}catch(e){console.error("[V2] Failed to parse project data:",e),_={}}}function $e(){if(_)return Object.keys(_).filter(n=>n&&!n.startsWith("auto-backup-"));if(B.cineLegacyShim&&typeof B.cineLegacyShim.getProjectNames=="function"){const n=B.cineLegacyShim.getProjectNames();if(n.length>0)return n}const e=document.getElementById("setupSelect");if(e&&e.options.length>1){const n=Array.from(e.options).map(t=>t.value).filter(t=>t!=="");if(n.length>0)return[...new Set(n)]}try{const n=localStorage.getItem(O);if(n){const t=JSON.parse(n);return Object.keys(t).filter(o=>o&&!o.startsWith("auto-backup-"))}}catch{}return[]}function _n(){let e=$e();if(e=e.filter(n=>!!!_t(n).archived),me.query){const n=me.query.toLowerCase();e=e.filter(t=>t.toLowerCase().includes(n))}return[...new Set(e)]}function _t(e){_===null&&et();const n=_[e];return n?{lastModified:n.lastModified||null,color:n.color||null,icon:n.icon||null,prepDays:n.prepDays||[],shootingDays:n.shootingDays||[],returnDays:n.returnDays||[],archived:n.archived||!1,status:n.status||(n.archived?"Archived":"Planning")}:{lastModified:null,color:null,icon:null,prepDays:[],shootingDays:[],returnDays:[],archived:!1,status:"Planning"}}function tt(e,n={}){if(typeof window.loadProject=="function"&&typeof window.saveProject=="function")try{const t=window.loadProject(e);if(t)return n.color&&(t.color=n.color),n.icon&&(t.icon=n.icon),n.prepDays&&(t.prepDays=n.prepDays),n.shootingDays&&(t.shootingDays=n.shootingDays),n.returnDays&&(t.returnDays=n.returnDays),typeof n.archived<"u"&&(t.archived=n.archived),n.status&&(t.status=n.status),window.saveProject(e,t),_&&_[e]&&Object.assign(_[e],n),!0}catch(t){return console.error("[V2] Failed to update project via storage API:",t),!1}try{et();const t=_||{};if(t&&t[e])return n.color&&(t[e].color=n.color),n.icon&&(t[e].icon=n.icon),n.prepDays&&(t[e].prepDays=n.prepDays),n.shootingDays&&(t[e].shootingDays=n.shootingDays),n.returnDays&&(t[e].returnDays=n.returnDays),typeof n.archived<"u"&&(t[e].archived=n.archived),n.status&&(t[e].status=n.status),localStorage.setItem(O,JSON.stringify(t)),_=t,!0}catch(t){console.error("[V2] Failed to update project metadata:",t)}return!1}function Rn(e,n){const t=_t(e);let o=t.color||Q[n%Q.length];Q.includes(o)||(o=Q[n%Q.length]);const i=He(t.icon||"📽️"),s=t.lastModified?ve(t.lastModified):"",a=He(e),r=t.status||"Planning",l=r.toLowerCase().replace(/\s+/g,"-");let c=r.toLowerCase().replace(/\s+/g,"");c==="waitingforapproval"&&(c="waitingForApproval");const h=P(`v2.dashboard.status.${c}`)===`v2.dashboard.status.${c}`?r:P(`v2.dashboard.status.${c}`);let b="";return(t.prepDays?.length>0||t.shootingDays?.length>0||t.returnDays?.length>0)&&(b='<div class="v2-tile-periods">',Array.isArray(t.prepDays)&&t.prepDays.forEach(f=>{const u=be(f);u&&(b+=`<span class="v2-period-badge prep" title="${P("v2.dashboard.projectTile.prep")} ${u}"><span class="period-icon">📅</span> ${u}</span>`)}),Array.isArray(t.shootingDays)&&t.shootingDays.forEach(f=>{const u=be(f);u&&(b+=`<span class="v2-period-badge shoot" title="${P("v2.dashboard.projectTile.shoot")} ${u}"><span class="period-icon">🎥</span> ${u}</span>`)}),Array.isArray(t.returnDays)&&t.returnDays.forEach(f=>{const u=be(f);u&&(b+=`<span class="v2-period-badge return" title="${P("v2.dashboard.projectTile.return")} ${u}"><span class="period-icon">🚛</span> ${u}</span>`)}),b+="</div>"),`
      <div class="v2-project-tile" data-project="${a}" tabindex="0" role="button" aria-label="${P("v2.dashboard.projectTile.actionsFor",{project:a})}">
        <div class="v2-tile-header">
          <div class="v2-tile-icon color-${o}">${i}</div>
            <div class="v2-tile-info">
            <h3 class="v2-tile-title">${a}</h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                 ${s?`<span class="v2-tile-meta">${s}</span>`:""}
                 <span class="v2-status-badge ${l}">${h}</span>
            </div>
            ${b}
          </div>
          <div class="v2-tile-actions">
            <button type="button" class="v2-tile-action-btn" data-action="menu" data-project="${a}" title="${P("v2.dashboard.projectTile.moreOptions")}" aria-label="${P("v2.dashboard.projectTile.actionsFor",{project:a})}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `}function Hn(){return`
      <div class="v2-project-tile new-project" id="v2CreateProjectTile" tabindex="0" role="button" aria-label="${P("v2.dashboard.newProject")}">
        <div class="v2-tile-header center">
          <div class="v2-tile-icon-add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="v2-tile-title">${P("v2.dashboard.newProject")}</h3>
        </div>
      </div>
    `}function qn(e){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 48px; display: flex; align-items: center; justify-content: center;">🔍</div>
        <h2>${P("v2.dashboard.search.noResults.title")}</h2>
        <p class="text-muted">${P("v2.dashboard.search.noResults.subtitle",{query:He(e)})}</p>
        <button id="v2ClearSearchBtn" class="v2-btn-secondary">
          Clear Search
        </button>
      </div>
    `}function U(){B.cineProjectLockManager&&B.cineProjectLockManager.releaseLock();const e=document.getElementById(jt);e&&On(e)}function On(e){if(e.innerHTML="",e.className="v2-project-grid",e.style="",et(),$e().length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const s=e.closest(".v2-main");s&&s.classList.add("align-top"),e.innerHTML=zn(),Fn(e);return}const t=_n();if(t.length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const s=e.closest(".v2-main");s&&s.classList.add("align-top"),e.innerHTML=qn(me.query);const a=e.querySelector("#v2ClearSearchBtn");a&&a.addEventListener("click",()=>{const r=document.getElementById("v2SidebarSearchInput");r&&(r.value="",r.dispatchEvent(new Event("input",{bubbles:!0})))});return}const o=e.closest(".v2-main");o&&o.classList.remove("align-top");let i="";t.forEach((s,a)=>{i+=Rn(s,a)}),me.query||(i+=Hn()),e.innerHTML=i,Gn(e)}function Nn(){window.addEventListener("v2:search",e=>{me.query=e.detail?.query||"",U()})}function Gn(e){e.querySelectorAll(".v2-project-tile").forEach(t=>{t.addEventListener("click",o=>{if(o.target.closest('[data-action="menu"]'))return;const i=t.dataset.project;i&&Se(i)}),t.addEventListener("contextmenu",o=>{o.preventDefault();const i=t.dataset.project;i&&mt(o,i)}),t.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t.click())})}),e.querySelectorAll('[data-action="menu"]').forEach(t=>{t.addEventListener("click",o=>{o.stopPropagation();const i=t.dataset.project;i&&mt(o,i)})});const n=e.querySelector("#v2CreateProjectTile");n&&(n.addEventListener("click",()=>qe()),n.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),qe())}))}function mt(e,n){G();const t=document.createElement("div");t.className="v2-context-menu",t.innerHTML=`
            <button class="v2-context-menu-item" data-action="open">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                ${P("v2.dashboard.contextMenu.open")}
            </button>
            <button class="v2-context-menu-item" data-action="edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                ${P("v2.dashboard.contextMenu.rename")}
            </button>
            <button class="v2-context-menu-item" data-action="print">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                ${P("v2.dashboard.contextMenu.print")}
            </button>
            <button class="v2-context-menu-item" data-action="duplicate">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                ${P("v2.dashboard.contextMenu.duplicate")}
            </button>
            <button class="v2-context-menu-item" data-action="archive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                ${P("v2.dashboard.contextMenu.archive")}
            </button>
             <div style="height: 1px; background: var(--v2-border-default); margin: 4px 0;"></div>
            <button class="v2-context-menu-item danger" data-action="delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                ${P("v2.dashboard.contextMenu.delete")}
            </button>
        `,t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`,t.querySelector('[data-action="open"]').addEventListener("click",()=>{Se(n),G()}),t.querySelector('[data-action="edit"]').addEventListener("click",()=>{G(),qe(n)}),t.querySelector('[data-action="print"]').addEventListener("click",()=>{Se(n,{action:"print"}),G()}),t.querySelector('[data-action="duplicate"]').addEventListener("click",()=>{Un(n),G()}),t.querySelector('[data-action="archive"]').addEventListener("click",()=>{Wn(n),G()}),t.querySelector('[data-action="delete"]').addEventListener("click",()=>{Rt(n),G()}),document.body.appendChild(t);const o=t.getBoundingClientRect();o.right>window.innerWidth&&(t.style.left=`${window.innerWidth-o.width-10}px`),o.bottom>window.innerHeight&&(t.style.top=`${window.innerHeight-o.height-10}px`),setTimeout(()=>{document.addEventListener("click",G,{once:!0}),document.addEventListener("contextmenu",G,{once:!0})},0)}function G(){const e=document.querySelector(".v2-context-menu");e&&e.remove(),document.removeEventListener("click",G)}function Fn(e){const n=e.querySelector("#v2EmptyStateCreateBtn");n&&n.addEventListener("click",Ce)}async function Se(e,n={}){if(B.cineProjectLockManager&&!await B.cineProjectLockManager.requestLock(e)){alert(P("v2.dashboard.projectLocked",{projectName:e}));return}B.cineLegacyShim&&B.cineLegacyShim.loadProject(e),B.cineViewManager&&B.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera",...n})}function zn(){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 64px; opacity: 0.8; margin-bottom: 16px;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h2>${P("v2.dashboard.emptyState.title")}</h2>
        <p class="text-muted">${P("v2.dashboard.emptyState.subtitle")}</p>
        <div class="v2-empty-actions">
            <button id="v2EmptyStateCreateBtn" class="v2-btn-primary">
              + ${P("v2.dashboard.newProject")}
            </button>
            <p class="v2-help-link-container">
                <a href="#/help" class="v2-link-subtle">${P("v2.dashboard.emptyState.help")}</a>
            </p>
        </div>
      </div>
    `}function Rt(e){if(confirm(P("v2.dashboard.confirmDelete",{project:e})||`Are you sure you want to delete project "${e}"?`))try{const n=localStorage.getItem(O);if(n){const t=JSON.parse(n);t[e]&&(delete t[e],localStorage.setItem(O,JSON.stringify(t)),nt())}B.cineLegacyShim&&typeof B.cineLegacyShim.deleteProject=="function"&&typeof B.cineLegacyShim.refreshProjects=="function"&&B.cineLegacyShim.refreshProjects(),U()}catch(n){console.error("[V2] Failed to delete project:",n),alert(P("v2.common.error")||"An error occurred.")}}function Wn(e){tt(e,{archived:!0,status:"Archived"}),U()}function Un(e){try{const n=localStorage.getItem(O);if(!n)return;const t=JSON.parse(n),o=t[e];if(!o)return;let i=`${e} (Copy)`,s=2;for(;t[i];)i=`${e} (Copy ${s})`,s++;const a=JSON.parse(JSON.stringify(o));a.created=new Date().toISOString(),a.lastModified=new Date().toISOString(),t[i]=a,localStorage.setItem(O,JSON.stringify(t)),nt(),U(),B.cineLegacyShim&&typeof B.cineLegacyShim.refreshProjects=="function"&&B.cineLegacyShim.refreshProjects()}catch(n){console.error("Failed to duplicate project:",n)}}function qe(e=null){Ce(e)}function Ce(e=null){const n=!!e,t=Math.floor(Math.random()*Q.length);let o=Q[t],i="📽️",s=null;if(n){const k=localStorage.getItem(O);if(k){const T=JSON.parse(k);T[e]&&(s=T[e],s.color&&(o=s.color),s.icon&&(i=s.icon))}}let a=[];if(n&&s){let k=1;const T=(D,V,Y)=>{if(!D)return;let te="",ne="";D.includes(" to ")?[te,ne]=D.split(" to "):(te=D,ne=D),a.push({id:`period-${k++}`,type:V,name:Y,startDate:te,endDate:ne})};Array.isArray(s.prepDays)&&s.prepDays.forEach(D=>T(D,"prep","Prep")),Array.isArray(s.shootingDays)&&s.shootingDays.forEach(D=>T(D,"shoot","Shoot")),Array.isArray(s.returnDays)&&s.returnDays.forEach(D=>T(D,"return","Return"))}!n&&a.length===0&&(a=[{id:"period-1",type:"prep",name:"Prep",startDate:"",endDate:""},{id:"period-2",type:"shoot",name:"Shoot",startDate:"",endDate:""},{id:"period-3",type:"return",name:"Return",startDate:"",endDate:""}]);let r=a.length>0?a.length:3;const l=[{value:"prep",label:"Prep",icon:"📅"},{value:"shoot",label:"Shoot",icon:"🎥"},{value:"return",label:"Return",icon:"🚛"}],c=k=>`var(--v2-color-${k})`,h=Q.map(k=>`
            <button type="button" class="v2-color-swatch-sm color-${k} ${k===o?"selected":""}" 
                    data-color="${k}" aria-label="Select ${k} color">
            </button>
        `).join(""),b=jn.map(k=>`
            <button type="button" class="v2-icon-option-sm ${k===i?"selected":""}" 
                    data-icon="${k}" aria-label="Select icon ${k}">
                ${k}
            </button>
        `).join(""),E=()=>a.length===0?'<div class="v2-empty-state" style="padding: 16px; font-size: 13px;">No dates added yet.</div>':a.map(k=>{const T=l.map(D=>`<option value="${D.value}" ${k.type===D.value?"selected":""}>${D.icon} ${D.label}</option>`).join("");return`
                <div class="v2-period-row" data-period-id="${k.id}">
                    <div class="v2-period-name">
                        <select class="v2-period-type-select" data-field="type">
                            ${T}
                        </select>
                    </div>
                    <input type="date" class="v2-date-input" value="${k.startDate}" data-field="startDate" aria-label="${k.name} Start Date">
                    <span class="v2-date-separator">to</span>
                    <input type="date" class="v2-date-input" value="${k.endDate}" data-field="endDate" aria-label="${k.name} End Date">
                    <button type="button" class="v2-period-remove" data-period-id="${k.id}" aria-label="Remove period">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `}).join(""),f=document.createElement("div");f.className="v2-modal-backdrop",f.innerHTML=`
            <div class="v2-modal" style="max-width: 520px;">
                <div class="v2-modal-header">
                    <h3 class="v2-modal-title">${n?"Edit Project":"Create New Project"}</h3>
                    <button type="button" class="v2-modal-close v2-btn v2-btn-ghost" aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="v2-modal-body">
                    <!-- Project Name -->
                    <div style="margin-bottom: var(--v2-space-lg);">
                        <label for="v2NewProjectName" class="v2-form-section-label" style="font-size: var(--v2-font-size-base); color: var(--v2-text-primary);">
                            Project Name
                        </label>
                        <input type="text" id="v2NewProjectName" class="v2-input" placeholder="Enter project name..." 
                               value="${n?e:""}"
                               style="width: 100%; padding: var(--v2-space-sm) var(--v2-space-md); border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-md); font-size: var(--v2-font-size-base);">
                        ${n?'<p class="text-muted" style="font-size: 12px; margin-top: 4px;">Warning: Renaming will create a new entry.</p>':""}
                        <p id="v2NewProjectError" style="color: var(--v2-status-error); font-size: var(--v2-font-size-sm); margin-top: var(--v2-space-sm); display: none;"></p>
                    </div>

                    <!-- Color & Icon Pickers Row -->
                    <div class="v2-picker-row" style="margin-bottom: var(--v2-space-lg);">
                        <div class="v2-picker-group">
                            <label class="v2-form-section-label">Color</label>
                            <button type="button" class="v2-picker-trigger" id="v2ColorPickerTrigger">
                                <span class="v2-picker-preview" id="v2ColorPreview" style="background-color: ${c(o)};"></span>
                                <span class="v2-picker-label">${o.charAt(0).toUpperCase()+o.slice(1)}</span>
                                <svg class="v2-picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="v2-picker-popover" id="v2ColorPopover">
                                <div class="v2-picker-popover-grid">
                                    ${h}
                                </div>
                            </div>
                        </div>
                        <div class="v2-picker-group">
                            <label class="v2-form-section-label">Icon</label>
                            <button type="button" class="v2-picker-trigger" id="v2IconPickerTrigger">
                                <span class="v2-picker-icon-preview" id="v2IconPreview">${i}</span>
                                <span class="v2-picker-label">Icon</span>
                                <svg class="v2-picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="v2-picker-popover" id="v2IconPopover" style="min-width: 280px;">
                                <div class="v2-picker-popover-grid" style="grid-template-columns: repeat(7, 1fr);">
                                    ${b}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Periods -->
                    <div style="margin-bottom: var(--v2-space-md);">
                        <label class="v2-form-section-label">Project Roadmap</label>
                        <div class="v2-periods-container" id="v2PeriodsContainer">
                            ${E()}
                        </div>
                        <button type="button" class="v2-add-period-btn" id="v2AddPeriodBtn" style="margin-top: var(--v2-space-sm); width: 100%;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                            Add Period
                        </button>
                    </div>
                </div>
                <div class="v2-modal-footer">
                    <button type="button" class="v2-btn v2-btn-secondary" id="v2CancelProjectBtn">Cancel</button>
                    <button type="button" class="v2-btn v2-btn-primary" id="v2CreateProjectBtn">${n?"Save Changes":"Create Project"}</button>
                </div>
            </div>
        `,document.body.appendChild(f),requestAnimationFrame(()=>{f.classList.add("open")});const u=f.querySelector("#v2NewProjectName"),y=f.querySelector("#v2NewProjectError"),v=f.querySelector("#v2CreateProjectBtn"),d=f.querySelector("#v2CancelProjectBtn"),m=f.querySelector(".v2-modal-close"),p=f.querySelector("#v2PeriodsContainer"),w=f.querySelector("#v2AddPeriodBtn"),S=f.querySelector("#v2ColorPickerTrigger"),$=f.querySelector("#v2ColorPopover"),x=f.querySelector("#v2ColorPreview"),K=S.querySelector(".v2-picker-label");S.addEventListener("click",k=>{k.stopPropagation(),S.classList.toggle("open"),$.classList.toggle("open"),R.classList.remove("open"),A.classList.remove("open")}),$.querySelectorAll(".v2-color-swatch-sm").forEach(k=>{k.addEventListener("click",T=>{T.stopPropagation(),$.querySelectorAll(".v2-color-swatch-sm").forEach(D=>D.classList.remove("selected")),k.classList.add("selected"),o=k.dataset.color,x.style.backgroundColor=c(o),K.textContent=o.charAt(0).toUpperCase()+o.slice(1),S.classList.remove("open"),$.classList.remove("open")})});const R=f.querySelector("#v2IconPickerTrigger"),A=f.querySelector("#v2IconPopover"),ie=f.querySelector("#v2IconPreview");R.addEventListener("click",k=>{k.stopPropagation(),R.classList.toggle("open"),A.classList.toggle("open"),S.classList.remove("open"),$.classList.remove("open")}),A.querySelectorAll(".v2-icon-option-sm").forEach(k=>{k.addEventListener("click",T=>{T.stopPropagation(),A.querySelectorAll(".v2-icon-option-sm").forEach(D=>D.classList.remove("selected")),k.classList.add("selected"),i=k.dataset.icon,ie.textContent=i,R.classList.remove("open"),A.classList.remove("open")})}),f.addEventListener("click",()=>{S.classList.remove("open"),$.classList.remove("open"),R.classList.remove("open"),A.classList.remove("open")});function ee(k,T,D){const V=a.find(Y=>Y.id===k);if(V)if(T==="type"){const Y=l.find(te=>te.value===D);Y&&(V.type=D,V.name=Y.label)}else V[T]=D}function se(k){a=a.filter(T=>T.id!==k),le()}function re(){r++,a.push({id:`period-${r}`,type:"shoot",name:"Shoot",startDate:"",endDate:""}),le()}function le(){p.innerHTML=E(),J()}function J(){p.querySelectorAll(".v2-period-row").forEach(k=>{const T=k.dataset.periodId;k.querySelectorAll("input, select").forEach(V=>{V.addEventListener("change",()=>{ee(T,V.dataset.field,V.value)}),V.addEventListener("input",()=>{ee(T,V.dataset.field,V.value)})});const D=k.querySelector(".v2-period-remove");D&&D.addEventListener("click",()=>{se(T)})})}J(),w.addEventListener("click",re),n||setTimeout(()=>u.focus(),100);function ce(){f.classList.remove("open"),setTimeout(()=>f.remove(),200)}function ct(){const k=u.value.trim();if(!k){y.textContent="Please enter a project name.",y.style.display="block",u.focus();return}const T=$e();if(n){if(k!==e&&T.includes(k)){y.textContent="A project with this name already exists.",y.style.display="block",u.focus();return}}else if(T.includes(k)){y.textContent="A project with this name already exists.",y.style.display="block",u.focus();return}ce();const D=j=>{if(!j)return null;const H=j.startDate,Z=j.endDate;return!H&&!Z?null:H&&Z?`${H} to ${Z}`:H||Z||null},V=a.filter(j=>j.type==="prep").map(D).filter(Boolean),Y=a.filter(j=>j.type==="shoot").map(D).filter(Boolean),te=a.filter(j=>j.type==="return").map(D).filter(Boolean),ne={color:o,icon:i,prepDays:V,shootingDays:Y,returnDays:te};if(n)if(k!==e)try{const j=localStorage.getItem(O);if(j){const H=JSON.parse(j),Z=H[e];if(Z){H[k]={...Z,...ne},H[k].lastModified=new Date().toISOString(),delete H[e],localStorage.setItem(O,JSON.stringify(H)),nt();const dt=document.getElementById("setupSelect");dt&&dt.value,U(),B.cineLegacyShim&&typeof B.cineLegacyShim.refreshProjects=="function"&&B.cineLegacyShim.refreshProjects()}}}catch(j){console.error("Rename failed",j)}else tt(k,ne),U();else Ht(k,ne)}v.addEventListener("click",ct),d.addEventListener("click",ce),m.addEventListener("click",ce),f.addEventListener("click",k=>{k.target===f&&ce()}),u.addEventListener("keydown",k=>{k.key==="Enter"&&ct(),k.key==="Escape"&&ce()}),u.addEventListener("input",()=>{y.style.display="none"})}function Ht(e,n={}){if(B.cineLegacyShim){B.cineLegacyShim.createProject(e);const t=(o=0)=>{const s=localStorage.getItem(O);if(s)try{const a=JSON.parse(s);if(a&&a[e]){tt(e,n);return}}catch{}o<20?setTimeout(()=>t(o+1),100):console.warn("[V2] Timed out waiting for project to be saved:",e)};t()}B.cineViewManager&&B.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera"})}function nt(){try{const e="cameraPowerPlanner_project_rev",n=parseInt(localStorage.getItem(e)||"0",10);localStorage.setItem(e,(n+1).toString())}catch(e){console.error("[V2] Failed to update project revision:",e)}}function qt(){if(document.getElementById(ue))return document.getElementById(ue);const e=document.createElement("section");e.id=ue,e.className="app-view v2-app",e.innerHTML=`
      <header class="view-header">
        <h1>Projects</h1>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-secondary" id="v2HeaderImportBtn" style="margin-right: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Import Project
          </button>
          <button type="button" class="v2-btn v2-btn-primary" id="v2HeaderCreateBtn">
            + New Project
          </button>
        </div>
      </header>
      <div class="view-content">
        <div class="v2-project-grid" id="${jt}">
          <!-- Tiles will be rendered here -->
        </div>
      </div>
    `;const n=e.querySelector("#v2HeaderCreateBtn");return n&&n.addEventListener("click",Ce),e}function Oe(){console.log("[ProjectDashboard] init() called");const e=qt(),n=document.querySelector(".v2-main");n&&!document.getElementById(ue)&&n.appendChild(e),document.addEventListener("click",o=>{o.target&&(o.target.closest("#v2HeaderCreateBtn")?Ce():o.target.closest("#v2HeaderImportBtn")&&B.cineLegacyShim&&B.cineLegacyShim.triggerLegacyClick("applySharedLinkBtn"))});const t=document.querySelector(".v2-view.active");t&&t.id===ue&&U(),window.addEventListener("v2:viewchange",o=>{o.detail.view==="projects"&&U()}),Nn()}const ot={init:Oe,renderProjectGrid:U,createProject:Ht,deleteProject:Rt,openProject:Se,getProjectNames:$e,createDashboardView:qt,formatDate:ve,formatDateRange:be};typeof B<"u"&&(B.cineProjectDashboard=ot);typeof window<"u"&&(window.cineProjectDashboard=ot);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(Oe,200)}):setTimeout(Oe,200));const Kn=Object.freeze(Object.defineProperty({__proto__:null,ProjectDashboard:ot},Symbol.toStringTag,{value:"Module"})),L=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},pe="view-project-detail",Ot="cameraPowerPlanner_setups",Jn=["camera","power","requirements","kit"],Yn="camera";let F=null,Nt=Yn,bt=!1,z=null;function Ee(e){if(!Jn.includes(e)){console.warn(`[ProjectDetail] Invalid tab: ${e}`);return}Nt=e,document.querySelectorAll("#view-project-detail .v2-tab-btn").forEach(o=>{const i=o.dataset.tab===e;o.classList.toggle("active",i),o.setAttribute("aria-selected",i?"true":"false")}),document.querySelectorAll("#view-project-detail .v2-tab-pane").forEach(o=>{const i=o.id===`tab-${e}`;o.classList.toggle("active",i),o.hidden=!i}),document.dispatchEvent(new CustomEvent("v2:tabchange",{detail:{tab:e,project:F}})),e==="power"&&setTimeout(()=>Kt(),10)}function Gt(){return Nt}function Ie(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function Be(e){if(!e||typeof e!="string")return"";const n=e.split(" to ");return n.length===1?Ie(n[0]):n.length===2?`${Ie(n[0])} - ${Ie(n[1])}`:e}function I(e,n={}){const t=document.documentElement.lang||"en";let o=window.texts&&window.texts[t]?window.texts[t]:null;!o&&window.texts&&(o=window.texts.en);const i=(a,r)=>r.split(".").reduce((l,c)=>l?l[c]:null,a);let s=o?i(o,e):null;if(!s&&t!=="en"&&window.texts&&window.texts.en&&(s=i(window.texts.en,e)),!s)return e;if(typeof s=="string")for(const[a,r]of Object.entries(n))s=s.replace(`{${a}}`,r);return s}function at(){try{const e=localStorage.getItem(Ot);e?z=JSON.parse(e):z={}}catch(e){console.error("[ProjectDetail] Failed to parse project data:",e),z={}}}function Ft(e){if(z===null&&at(),z&&z[e]){const n=z[e];return{prepDays:n.prepDays||[],shootingDays:n.shootingDays||[],returnDays:n.returnDays||[],status:n.status||(n.archived?"Archived":"Planning")}}return{prepDays:[],shootingDays:[],returnDays:[],status:"Planning"}}function zt(e,n){try{at();const t=z||{};if(t&&t[e])return t[e].status=n,n==="Archived"?t[e].archived=!0:t[e].archived=!1,localStorage.setItem(Ot,JSON.stringify(t)),z=t,!0}catch(t){console.error("[ProjectDetail] Failed to update status:",t)}return!1}function Wt(e){if(!e)return console.warn("[ProjectDetail] No project name provided"),!1;at(),F=e;const n=document.getElementById("v2ProjectName");n&&(n.textContent=e),L.cineLegacyShim&&L.cineLegacyShim.loadProject(e);const t=Ft(e),o=document.getElementById("v2ProjectPeriods"),i=document.getElementById("v2ProjectStatus");if(i){i.value=t.status,Ne(i);const s=i.cloneNode(!0);i.parentNode.replaceChild(s,i),s.addEventListener("change",a=>{const r=a.target.value;zt(e,r),Ne(s)})}if(o){let s="";Array.isArray(t.prepDays)&&t.prepDays.forEach(a=>{const r=Be(a);r&&(s+=`<span class="v2-header-badge prep" title="Prep Dates: ${r}"><span class="period-icon">📅</span> ${r}</span>`)}),Array.isArray(t.shootingDays)&&t.shootingDays.forEach(a=>{const r=Be(a);r&&(s+=`<span class="v2-header-badge shoot" title="Shooting Dates: ${r}"><span class="period-icon">🎥</span> ${r}</span>`)}),Array.isArray(t.returnDays)&&t.returnDays.forEach(a=>{const r=Be(a);r&&(s+=`<span class="v2-header-badge return" title="Return Dates: ${r}"><span class="period-icon">🚛</span> ${r}</span>`)}),o.innerHTML=s,o.style.display=s?"flex":"none"}return console.log(`[ProjectDetail] Loaded project: ${e}`),!0}function Zn(){return F}function Qn(){L.cineViewManager&&L.cineViewManager.showView("projects")}function Xn(){if(document.getElementById(pe))return document.getElementById(pe);const e=document.createElement("section");e.id=pe,e.className="app-view";const n=document.querySelector(".v2-main");return n&&n.appendChild(e),e}function Ut(){const e=Xn();e&&(e.innerHTML=`
      <header class="view-header view-header-with-back">
        <button type="button" class="v2-back-btn" id="v2BackToProjects" aria-label="${I("v2.detail.backButton")}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>${I("v2.detail.backButton")}</span>
        </button>
        <h1 id="v2ProjectName" class="view-header-title">Project</h1>
        <div class="v2-header-status">
            <select id="v2ProjectStatus" class="v2-status-select">
                <option value="Draft">${I("v2.dashboard.status.draft")}</option>
                <option value="Planning">${I("v2.dashboard.status.planning")}</option>
                <option value="Waiting for Approval">${I("v2.dashboard.status.waitingForApproval")}</option>
                <option value="Approved">${I("v2.dashboard.status.approved")}</option>
                <option value="Shooting">${I("v2.dashboard.status.shooting")}</option>
                <option value="Completed">${I("v2.dashboard.status.completed")}</option>
                <option value="Archived">${I("v2.dashboard.status.archived")}</option>
            </select>
        </div>
        <div id="v2ProjectPeriods" class="v2-header-periods" style="display: none;"></div>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-ghost" id="v2PrintProjectBtn" title="${I("v2.detail.header.print")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateReqsGearBtn" title="${I("v2.detail.header.generateReqs")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${I("v2.detail.header.generateReqs")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2ExportProjectBtn" title="${I("v2.detail.header.export")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
               <polyline points="16 6 12 2 8 6"/>
               <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span class="v2-btn-label">${I("v2.detail.header.export")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateOverviewBtn" title="${I("v2.detail.header.generateOverview")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${I("v2.detail.header.generateOverview")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-secondary" id="v2SaveProjectBtn">
            ${I("v2.detail.header.save")}
          </button>
        </div>
      </header>


      
      <!-- Tab Navigation (Sticky Top) -->
      <nav class="v2-tabs-nav" role="tablist" aria-label="Project sections">
        <button type="button" class="v2-tab-btn active" data-tab="camera" role="tab" aria-selected="true" aria-controls="tab-camera">
          ${I("v2.detail.tabs.cameraPackage")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="power" role="tab" aria-selected="false" aria-controls="tab-power">
          ${I("v2.detail.tabs.powerSummary")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="requirements" role="tab" aria-selected="false" aria-controls="tab-requirements">
          ${I("v2.detail.tabs.requirements")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="kit" role="tab" aria-selected="false" aria-controls="tab-kit">
          ${I("v2.detail.tabs.gearList")}
        </button>
      </nav>

      <div class="view-content">
        <!-- Tab Content -->
        <div class="v2-tab-content" style="padding-top: var(--v2-space-lg);">
          <!-- Camera Package Tab -->
          <section id="tab-camera" class="v2-tab-pane active" role="tabpanel" aria-labelledby="tab-camera-btn">
            ${eo()}
          </section>
          
          <!-- Power Summary Tab -->
          <section id="tab-power" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-power-btn" hidden>
            ${no()}
          </section>
          
          <!-- Requirements Tab -->
          <section id="tab-requirements" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-requirements-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${I("v2.detail.actions.projectRequirements")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateRequirementsBtn">
                  ${I("v2.detail.actions.generateRequirements")}
                </button>
              </div>
              <div class="v2-card-body" id="v2RequirementsContainer">
                <p class="v2-text-muted">${I("v2.detail.actions.generateRequirementsHelp")}</p>
                <div data-reparent="projectForm"></div>
                <div id="v2RequirementsOutput" class="v2-requirements-output" style="margin-top: var(--v2-space-md);"></div>
              </div>
            </div>
          </section>
          
          <!-- Gear List Tab -->
          <section id="tab-kit" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-kit-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${I("v2.detail.actions.gearList")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateGearListBtn">
                  ${I("v2.detail.actions.generateGearList")}
                </button>
              </div>
              <div class="v2-card-body" id="v2KitListContainer">
                <p class="v2-text-muted">${I("v2.detail.actions.generateGearListHelp")}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `,oo(e),setTimeout(()=>to(e),0))}function eo(){return`
      <div id="v2-setup-config" style="padding: 0; margin: 0;">
        <div class="form-row">
          <label for="cameraSelect" id="cameraLabel">Camera:</label>
          <div data-reparent="cameraSelect"></div>
        </div>
        
        <div class="form-row" id="monitorSelectRow">
          <label for="monitorSelect" id="monitorLabel">Monitor:</label>
          <div data-reparent="monitorSelect"></div>
        </div>
        
        <div class="form-row" id="wirelessVideoRow">
          <label for="videoSelect" id="videoLabel">Wireless Transmitter:</label>
          <div data-reparent="videoSelect"></div>
        </div>

        <fieldset id="fizFieldset">
          <legend id="fizLegend">FIZ (Follow Focus) Systems</legend>
          <div class="form-row">
            <label for="motor1Select" id="fizMotorsLabel">FIZ Motors:</label>
            <div data-reparent="motor1Select"></div>
          </div>
          <div class="form-row">
            <label for="motor2Select"></label>
            <div data-reparent="motor2Select"></div>
          </div>
          <div class="form-row">
            <label for="motor3Select"></label>
            <div data-reparent="motor3Select"></div>
          </div>
          <div class="form-row">
            <label for="motor4Select"></label>
            <div data-reparent="motor4Select"></div>
          </div>
          <div class="form-row">
            <label for="controller1Select" id="fizControllersLabel">FIZ Controllers:</label>
            <div data-reparent="controller1Select"></div>
          </div>
          <div class="form-row">
            <label for="controller2Select"></label>
            <div data-reparent="controller2Select"></div>
          </div>
          <div class="form-row">
            <label for="controller3Select"></label>
            <div data-reparent="controller3Select"></div>
          </div>
          <div class="form-row">
            <label for="controller4Select"></label>
            <div data-reparent="controller4Select"></div>
          </div>
          <div class="form-row">
            <label for="distanceSelect" id="distanceLabel">Distance Sensor:</label>
            <div data-reparent="distanceSelect"></div>
          </div>
        </fieldset>

        <div class="form-row" id="batteryPlateRow">
          <label for="batteryPlateSelect" id="batteryPlateLabel">Battery Plate:</label>
          <div data-reparent="batteryPlateSelect"></div>
        </div>

        <div class="form-row" id="batterySelectRow">
          <label for="batterySelect" id="batteryLabel">Battery:</label>
          <div data-reparent="batterySelect"></div>
        </div>

        <div class="form-row" id="batteryHotswapRow">
          <label for="batteryHotswapSelect" id="batteryHotswapLabel">Battery Hotswap:</label>
          <div data-reparent="batteryHotswapSelect"></div>
        </div>
      </div>
    `}function to(e){e.querySelectorAll("[data-reparent]").forEach(t=>{const o=t.dataset.reparent,i=document.getElementById(o);if(i){const s=i.tagName.toLowerCase();["select","input","textarea"].includes(s)?(i.style.display="block",i.classList.add("v2-"+s),i.style.width="100%",i.style.height="",i.style.minHeight=""):s==="form"&&(i.style.display="block",i.style.position="static",i.style.visibility="visible",i.style.width="100%",i.classList.add("v2-reparented-form")),i.style.whiteSpace="";const a=i.closest(".select-wrapper"),r=a||i;a&&(a.classList.add("v2-select-container"),a.style.width="100%"),t.parentNode.replaceChild(r,t)}else console.warn(`[ProjectDetail] Legacy element not found: ${o}`),t.innerHTML='<span class="v2-error-text">Element missing</span>'})}function no(){return`
      <div class="v2-power-grid">
        <!-- V1 Results Reparented -->
        <div id="v2-results-legacy-wrapper" class="v2-results-reparented">
          <!-- Hero Card -->
          <div data-reparent="heroCard"></div>

          <!-- Warnings -->
          <div data-reparent="pinWarning"></div>
          <div data-reparent="dtapWarning"></div>
          <div data-reparent="hotswapWarning"></div>

          <!-- Breakdown List -->
          <ul data-reparent="breakdownList"></ul>

          <!-- Power Diagram -->
          <div data-reparent="powerDiagram"></div>

          <!-- Plain Summary -->
          <div data-reparent="resultsPlainSummary"></div>

          <!-- Temperature Note -->
          <div data-reparent="temperatureNote"></div>
          
          <!-- Feedback Button -->
          <div data-reparent="runtimeFeedbackBtn"></div>
          <div data-reparent="feedbackTableContainer"></div>
        </div>

        <!-- Connection Diagram Card (V2 Wrapper) -->
        <div class="v2-card v2-diagram-card" style="margin-top: var(--v2-space-lg);">
          <div class="v2-card-header v2-card-header-with-actions">
            <h3>Connection Diagram</h3>
            <div class="v2-diagram-toolbar">
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomOut" title="${I("v2.detail.diagram.zoomOut")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ResetView" title="${I("v2.detail.diagram.resetView")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomIn" title="${I("v2.detail.diagram.zoomIn")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <div class="v2-vr"></div>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2DownloadDiagram" title="${I("v2.detail.diagram.download")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
               </button>
            </div>
          </div>
          <div class="v2-card-body v2-diagram-body">
            <div id="v2-diagram-area" class="v2-diagram-area"></div>
            <div id="v2-diagram-legend" class="v2-diagram-legend"></div>
            <!-- Hidden containers required by module -->
            <div id="v2-diagram-hint" style="display:none;"></div>
          </div>
        </div>

        <!-- Battery Comparison -->
        <div class="v2-card" style="margin-top: var(--v2-space-lg);">
          <div class="v2-card-body" style="padding: 0;">
             <div data-reparent="batteryComparison" class="v2-reparent-full-width"></div>
          </div>
        </div>
      </div>
    `}function oo(e){const n=e.querySelector("#v2BackToProjects");n&&n.addEventListener("click",Qn);const t=e.querySelector("#v2PrintProjectBtn");t&&t.addEventListener("click",()=>{if(confirm('Do you want to set the project status to "Waiting for Approval"?')){zt(F,"Waiting for Approval");const E=document.getElementById("v2ProjectStatus");E&&(E.value="Waiting for Approval",Ne(E))}if(console.log("[ProjectDetail] Triggering Print/Export"),typeof window.openLegacyPrintDialog=="function"){window.openLegacyPrintDialog();return}L.cineFeaturePrint&&typeof L.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?L.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof L.triggerOverviewPrintWorkflow=="function"?L.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()});const o=e.querySelector("#v2SaveProjectBtn");o&&o.addEventListener("click",()=>{if(L.cineLegacyShim&&F){const E=document.getElementById("saveSetupBtn");E&&E.click()}});function i(){if(!F)return;const E=Ft(F);let f={};L.getCurrentProjectInfo&&typeof L.getCurrentProjectInfo=="function"?f=L.getCurrentProjectInfo():f={projectName:F};const u=Object.assign({},f,{prepDays:E.prepDays||[],shootingDays:E.shootingDays||[],returnDays:E.returnDays||[],projectName:F});L.populateProjectForm&&typeof L.populateProjectForm=="function"?L.populateProjectForm(u):console.warn("[ProjectDetail] populateProjectForm not found"),Ee("requirements");const y=document.getElementById("tab-requirements");y&&y.scrollIntoView({behavior:"smooth"})}const s=e.querySelector("#v2GenerateReqsGearBtn");s&&s.addEventListener("click",()=>{i()});const a=e.querySelector("#v2ExportProjectBtn");a&&a.addEventListener("click",()=>{const E=document.getElementById("shareSetupBtn");E&&E.click()});const r=e.querySelector("#v2GenerateOverviewBtn");r&&r.addEventListener("click",()=>{const E=document.getElementById("generateOverviewBtn");E&&E.click()});const l=e.querySelector("#v2GenerateRequirementsBtn");l&&(l.innerHTML='<i class="fas fa-save"></i> Save & Generate Gear List',l.addEventListener("click",()=>{let E={};L.collectProjectFormData&&typeof L.collectProjectFormData=="function"?E=L.collectProjectFormData():console.warn("[ProjectDetail] collectProjectFormData not found");let f="";if(L.generateGearListHtml&&typeof L.generateGearListHtml=="function")f=L.generateGearListHtml(E);else{alert("Error: Generator module not found.");return}if(L.getSafeGearListHtmlSections&&typeof L.getSafeGearListHtmlSections=="function"){const u=L.getSafeGearListHtmlSections(f),y=document.getElementById("v2RequirementsOutput");y&&(u.projectHtml?(y.innerHTML=u.projectHtml,y.style.display="block"):y.style.display="none");const v=document.getElementById("v2KitListContainer");v&&u.gearHtml?v.innerHTML=u.gearHtml:v&&(v.innerHTML='<p class="v2-text-muted">No gear list items generated.</p>'),alert("Requirements Saved & Gear List Generated!")}}));const c=e.querySelector("#v2GenerateGearListBtn");c&&c.addEventListener("click",()=>{i()}),e.querySelectorAll(".v2-tab-btn").forEach(E=>{E.addEventListener("click",()=>{const f=E.dataset.tab;Ee(f)})});const b=e.querySelector("#v2DownloadDiagram");b&&b.addEventListener("click",E=>{const f=document.getElementById("downloadDiagram");if(f){const u=new MouseEvent("click",{bubbles:!0,cancelable:!0,shiftKey:E.shiftKey});f.dispatchEvent(u)}else console.warn("[ProjectDetail] Legacy download button not found")}),setTimeout(()=>lo(e),0)}function Kt(){if(!F)return;if(!L.cineFeaturesConnectionDiagram||typeof L.cineFeaturesConnectionDiagram.createConnectionDiagram!="function"){console.warn("[ProjectDetail] Connection Diagram module not found.");return}if(!document.getElementById("v2-diagram-area"))return;console.log("[ProjectDetail] Rendering Power Diagram...");const t={getSetupDiagramContainer:()=>document.getElementById("v2-diagram-area"),getDiagramLegend:()=>document.getElementById("v2-diagram-legend"),getDiagramHint:()=>document.getElementById("v2-diagram-hint"),getDownloadDiagramBtn:()=>document.getElementById("v2DownloadDiagram"),getZoomInBtn:()=>document.getElementById("v2ZoomIn"),getZoomOutBtn:()=>document.getElementById("v2ZoomOut"),getResetViewBtn:()=>document.getElementById("v2ResetView"),getDiagramDetailDialog:()=>{const o=document.getElementById("diagramDetailDialog");return o&&o.closest("#mainContent")&&document.body.appendChild(o),o},getDiagramDetailContent:()=>document.getElementById("diagramDetailDialogContent")};if(!document.getElementById("v2-diagram-css")){const o=typeof L.cineFeaturesConnectionDiagram.getDiagramCss=="function"?L.cineFeaturesConnectionDiagram.getDiagramCss(!1):"";if(o){const i=document.createElement("style");i.id="v2-diagram-css",i.textContent=o,document.head.appendChild(i)}}try{L.cineFeaturesConnectionDiagram.createConnectionDiagram(t)}catch(o){console.error("[ProjectDetail] Error rendering diagram:",o)}}function Ne(e){const t=e.value.toLowerCase().replace(/\s+/g,"-");e.classList.remove("draft","planning","waiting-for-approval","approved","shooting","completed","archived"),e.classList.add(t)}function it(){const e={heroTotalDraw:"v2TotalDraw",heroRuntime:"v2Runtime",heroBatteryCount:"v2BatteryCount",heroCurrent144:"v2Current144",heroCurrent12:"v2Current12"};Object.keys(e).forEach(n=>{const t=document.getElementById(n),o=document.getElementById(e[n]);t&&o&&(o.textContent=t.textContent)}),Gt()==="power"&&setTimeout(()=>Kt(),50)}function ao(){const e=document.getElementById("results");if(!e){console.warn("[ProjectDetail] Legacy results container not found. Auto-sync disabled.");return}new MutationObserver(()=>{it()}).observe(e,{childList:!0,subtree:!0,characterData:!0}),console.log("[ProjectDetail] Power observer started")}function io(){if(!bt){if(bt=!0,ao(),it(),document.addEventListener("v2:viewchange",ft),L.cineViewManager&&typeof L.cineViewManager.getCurrentView=="function"&&L.cineViewManager.getCurrentView()==="projectDetail"){const n=L.cineViewManager.getCurrentParams?L.cineViewManager.getCurrentParams():{};n&&n.projectId&&(console.log("[ProjectDetail] Already on projectDetail, triggering render"),ft({detail:{view:"projectDetail",params:n}}))}console.log("[ProjectDetail] Initialized")}}function ft(e){const{view:n,params:t}=e.detail||{};if(n==="projectDetail"&&t&&t.projectId){console.log("[ProjectDetail] View change detected, loading:",t.projectId);const o=document.getElementById(pe);if(!o){console.warn("[ProjectDetail] View element not found:",pe);return}o.querySelector(".view-header")||Ut(),Wt(t.projectId),t.tab&&Ee(t.tab),t.action==="print"&&(console.log("[ProjectDetail] Auto-triggering print workflow"),setTimeout(()=>{L.cineFeaturePrint&&typeof L.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?L.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof L.triggerOverviewPrintWorkflow=="function"?L.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()},800))}}function so(e){return typeof e!="string"?"":e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}function ro(e){const n=L.texts?L.texts[e]:null;if(!n){console.warn(`[ProjectDetail] Translation key not found: ${e}`);return}const t=so(n);console.log(`[ProjectDetail] Triggering Add Custom for: ${n} (${t})`);const o=document.querySelector(`[data-gear-custom-add="${t}"]`);o?o.click():(console.warn(`[ProjectDetail] Legacy Add Button not found for slug: ${t}`),alert(`Could not open Add Custom dialog for ${n}. Legacy element missing.`))}function lo(e){[{cardId:"v2-camera-card",key:"category_cameras"},{cardId:"v2-power-card",key:"category_batteries"}].forEach(({cardId:t,key:o})=>{const i=e.querySelector(`#${t}`);if(!i)return;const s=i.querySelector(".v2-card-header");if(!s||s.querySelector(".v2-add-custom-btn"))return;const a=document.createElement("button");a.type="button",a.className="v2-btn v2-btn-sm v2-btn-ghost v2-add-custom-btn",a.title="Add Custom Item",a.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `,a.addEventListener("click",r=>{r.stopPropagation(),ro(o)}),s.appendChild(a)})}const st={init:io,createDetailViewContent:Ut,loadProject:Wt,getCurrentProject:Zn,switchTab:Ee,getCurrentTab:Gt,syncLegacyResultsToV2:it};typeof L<"u"&&(L.cineProjectDetail=st);typeof window<"u"&&(window.cineProjectDetail=st);const co=Object.freeze(Object.defineProperty({__proto__:null,ProjectDetail:st},Symbol.toStringTag,{value:"Module"})),oe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},yt="v2-sidebar-search",rt="v2SidebarSearchInput",Jt="darkMode",Yt="cameraPowerPlanner_pinkMode",uo="pinkMode",vo={"All Projects":"v2.sidebar.nav.allProjects","Active Projects":"v2.sidebar.nav.activeProjects",Archive:"v2.sidebar.nav.archive","Auto Backups":"v2.sidebar.nav.autoBackups","Device Library":"v2.sidebar.nav.deviceLibrary",Contacts:"v2.sidebar.nav.contacts","Auto Gear Rules":"v2.sidebar.nav.autoGearRules","Owned Gear":"v2.sidebar.nav.ownedGear","Create New Project":"v2.sidebar.nav.createProject",Projects:"v2.sidebar.nav.projectsSection",Tools:"v2.sidebar.nav.toolsSection",Support:"v2.sidebar.nav.supportSection",Help:"v2.sidebar.nav.help",Settings:"v2.sidebar.nav.settings"};function Ge(e,n={},t=null){const o=t||document.documentElement.lang||"en";let i=window.texts&&window.texts[o]?window.texts[o]:null;!i&&window.texts&&(i=window.texts.en);const s=(r,l)=>l.split(".").reduce((c,h)=>c?c[h]:null,r);let a=i?s(i,e):null;if(!a&&o!=="en"&&window.texts&&window.texts.en&&(a=s(window.texts.en,e)),!a)return e;if(typeof a=="string")for(const[r,l]of Object.entries(n))a=a.replace(`{${r}}`,l);return a}function po(){console.log("[V2 Sidebar] Initializing...");const e=document.querySelector(".v2-sidebar");if(!e){console.error("[V2 Sidebar] .v2-sidebar not found. Cannot inject controls.");return}go(e),mo(e),fo(e),bo(),$o(),So(),Eo(),yo(),wo();const n=document.getElementById("languageSelect");n&&ke(n.value)}function go(e){if(e.querySelector(".v2-sidebar-header"))return;const n=document.createElement("div");n.className="v2-sidebar-header";const t=document.createElement("img");t.src="src/icons/Icon Bluenew.svg",t.className="v2-sidebar-logo",t.alt="Logo";const o=document.createElement("h1");o.className="v2-sidebar-title",o.innerHTML="Cine Power<br>Planner",n.appendChild(t),n.appendChild(o),e.insertBefore(n,e.firstChild)}function mo(e){if(e.querySelector(".v2-sidebar-controls-container"))return;const n=document.createElement("div");n.className="v2-sidebar-controls-container";const t=document.createElement("div");t.className="v2-controls-row-1",ko(t),Co(t),Lo(t),n.appendChild(t);const o=e.querySelector(".v2-sidebar-footer");o?o.insertAdjacentElement("beforebegin",n):e.appendChild(n)}function bo(){const e=document.getElementById(rt),n=document.getElementById("featureSearch");!e||!n||(e.addEventListener("input",t=>{t.stopPropagation(),n.value=t.target.value,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))}),e.addEventListener("focus",()=>{n.dispatchEvent(new Event("focus",{bubbles:!0}))}),e.addEventListener("blur",()=>{setTimeout(()=>{n.dispatchEvent(new Event("blur",{bubbles:!0}))},200)}),e.addEventListener("keydown",t=>{if(t.stopPropagation(),!["ArrowUp","ArrowDown","Enter","Escape"].includes(t.key))return;const i=new KeyboardEvent("keydown",{key:t.key,code:t.code,keyCode:t.keyCode,bubbles:!0,cancelable:!0});n.dispatchEvent(i)}),e.addEventListener("input",t=>{const o=t.target.value.trim();window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:o}}))}))}function fo(e){if(e.querySelector(`.${yt}`))return;const n=document.createElement("div");n.className=yt,n.innerHTML=`
            <div class="v2-search-input-wrapper">
                <svg class="v2-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" id="${rt}" class="v2-search-input" placeholder="${Ge("v2.sidebar.search.placeholder")}" aria-label="Search features">
            </div>
        `;const t=e.querySelector(".v2-sidebar-header");if(t)t.insertAdjacentElement("afterend",n);else{const o=e.querySelector(".v2-sidebar-nav");o?e.insertBefore(n,o):e.insertBefore(n,e.firstChild)}setTimeout(()=>{const o=document.getElementById("featureSearchDropdown"),i=n.querySelector(".v2-search-input-wrapper");o&&i&&(i.appendChild(o),o.style.top="110%",o.style.left="0",o.style.visibility="visible",o.style.display="none")},1e3)}function yo(){document.addEventListener("click",e=>{e.target.closest("#closeHelp")&&(e.preventDefault(),e.stopImmediatePropagation(),ho())})}function ho(){const e=document.getElementById("helpDialog");e&&(e.setAttribute("hidden",""),e.style.display="none",typeof oe.closeDialog=="function"&&oe.closeDialog(e))}function wo(){const e=document.getElementById("helpButton"),n=document.querySelector('[data-nav-key="openHelpNav"]'),t=o=>{o.preventDefault(),o.stopImmediatePropagation(),window.location.hash="/help"};e&&e.addEventListener("click",t),n&&n.addEventListener("click",t),document.addEventListener("keydown",o=>{o.target.matches("input, textarea, [contenteditable]")||((o.key==="?"&&o.shiftKey||o.key==="H"||o.key==="h"||o.key==="F1")&&t(o),o.key==="/"&&(o.ctrlKey||o.metaKey)&&t(o))},!0)}function So(){const e=document.getElementById("navAutoBackups");if(e){const o=localStorage.getItem("cineAutoRecover")==="true";e.style.display=o?"flex":"none"}const n=document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link");n.forEach(o=>{o.addEventListener("click",()=>{n.forEach(i=>i.classList.remove("active")),o.classList.add("active")})});const t=window.location.hash;t&&n.forEach(o=>{o.getAttribute("href")===t&&o.classList.add("active")})}function Eo(){const e=document.querySelectorAll(".v2-mobile-menu-toggle"),n=document.getElementById("v2-app"),t=document.querySelector(".v2-sidebar-overlay");if(!n)return;function o(){n.classList.add("sidebar-open")}function i(){n.classList.remove("sidebar-open")}e.forEach(r=>{r.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),o()})}),t&&t.addEventListener("click",i),document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link").forEach(r=>{r.addEventListener("click",()=>{window.innerWidth<=768&&i()})});const a=document.getElementById("v2ExitBtn");a&&a.addEventListener("click",i)}function ko(e){if(!e||e.querySelector(".v2-lang-select-wrapper"))return;const n=document.getElementById("languageSelect"),t=n?n.value:"en",o=document.createElement("div");o.className="v2-lang-select-wrapper",o.innerHTML=`
            <select class="v2-lang-select" aria-label="Select Language">
                <option value="en" ${t==="en"?"selected":""}>English</option>
                <option value="de" ${t==="de"?"selected":""}>Deutsch</option>
                <option value="es" ${t==="es"?"selected":""}>Español</option>
                <option value="fr" ${t==="fr"?"selected":""}>Français</option>
                <option value="it" ${t==="it"?"selected":""}>Italiano</option>
            </select>
        `;const i=o.querySelector("select");i.addEventListener("change",s=>{const a=s.target.value;n&&(n.value=a,n.dispatchEvent(new Event("change",{bubbles:!0})),typeof oe.updateLanguage=="function"&&oe.updateLanguage(a),ke(a))}),n&&n.addEventListener("change",()=>{i.value!==n.value&&(i.value=n.value,ke(n.value))}),e.appendChild(o)}function Lo(e){if(e.querySelector("#v2RefreshBtn"))return;const n=document.createElement("button");n.className="v2-tool-btn",n.id="v2RefreshBtn",n.title="Force reload",n.setAttribute("aria-label","Force reload"),n.innerHTML=`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="23 4 23 10 17 10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `,n.addEventListener("click",()=>{const t=document.getElementById("reloadButton");t?t.click():window.location.reload(!0)}),e.appendChild(n)}function ke(e){document.querySelectorAll(".v2-sidebar-link-text, .v2-sidebar-section-title").forEach(o=>{o.dataset.key||(o.dataset.key=o.textContent.trim());const i=o.dataset.key,s=vo[i];s&&(o.textContent=Ge(s,{},e))});const t=document.getElementById(rt);t&&(t.placeholder=Ge("v2.sidebar.search.placeholder",{},e))}oe.updateSidebarTranslations=ke;function $o(){xo()}function Co(e){if(e.querySelector("#v2ThemeToggleDark"))return;const n=document.createElement("button");n.className="v2-theme-toggle",n.id="v2ThemeToggleDark",n.setAttribute("aria-label","Toggle dark mode"),n.setAttribute("aria-pressed","false"),n.setAttribute("title","Toggle dark mode"),n.innerHTML=`
            <span class="v2-icon-moon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xEC7E;</span>
            <span class="v2-icon-sun icon-glyph" aria-hidden="true" data-icon-font="uicons" style="display:none">&#xF1FE;</span>
        `,n.addEventListener("click",Do);const t=document.createElement("button");t.className="v2-theme-toggle",t.id="v2ThemeTogglePink",t.setAttribute("aria-label","Toggle pink mode"),t.setAttribute("aria-pressed","false"),t.setAttribute("title","Toggle pink mode"),t.setAttribute("data-theme","pink"),t.innerHTML=`
            <span class="icon-glyph icon-svg pink-mode-icon" aria-hidden="true">
                <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="m1 40c0-8 3-17 3-17a4.84 4.84 0 0 0-1.829-3.064 1 1 0 0 1 .45-1.716 19.438 19.438 0 0 1 4.379-.22c.579-2.317-1.19-3.963-2.782-4.938a1 1 0 0 1 .393-1.85 14.128 14.128 0 0 1 6.389.788c0-.958-1.147-2.145-2.342-3.122a1 1 0 0 1 .708-1.773 40.655 40.655 0 0 1 6.634.895 3.723 3.723 0 0 0-1.049-2.264 1 1 0 0 1 .823-1.652c6.151.378 9.226 1.916 9.226 1.916l10-1s8.472-2.311 15.954.5a1 1 0 0 1-.084 1.9c-1.455.394-2.87 1.143-2.87 2.6 0 0 4.426.738 5.675 4.114a1 1 0 0 1-1.228 1.317c-1.64-.48-4.273-.88-6.447.569Z" fill="#805333" />
                    <path d="m30.18 42.82c1.073 2.7 2.6 9.993 3.357 13.8a2 2 0 0 1-1.964 2.38h-28.573a2 2 0 0 1-2-2v-18c0-2.55 10.03-22.11 23.99-23.87Z" fill="#a56a43" />
                    <path d="m55.67 48.46-6.34 2.97a6 6 0 0 1-7.98-2.88l-.25-.54-.76-1.6a4.956 4.956 0 0 0-4.68-2.87c-.22.01-.44.02-.66.02a16.019 16.019 0 0 1-8.28-29.66c-1.81-2.97-3.45-8.03 2.03-12.49a2.1 2.1 0 0 1 2.5 0c4.23 3.45 4.21 7.25 3.16 10.17a16 16 0 0 1 15.91 11.36l5.31 11.31 2.92 6.22a6.008 6.008 0 0 1-2.88 7.99Z" fill="#cb8252" />
                    <circle cx="42" cy="26" r="3" fill="#2c2f38" />
                    <circle cx="54" cy="43" r="1" fill="#805333" />
                    <path d="m58.55 40.47-2.92-6.22-14.53 13.76.25.54a6 6 0 0 0 7.98 2.88l6.34-2.97a6.008 6.008 0 0 0 2.88-7.99Zm-4.55 3.53a1 1 0 1 1 1-1 1 1 0 0 1-1 1Z" fill="#cf976a" />
                    <circle cx="41" cy="25" r="1.25" fill="#ecf0f1" />
                </svg>
            </span>
        `,t.addEventListener("click",Io),e.appendChild(n),e.appendChild(t)}function xo(){const e=localStorage.getItem(Jt)==="true";Zt(e);const n=localStorage.getItem(Yt)==="true";Qt(n)}function Do(){const n=!document.body.classList.contains("dark-mode");Zt(n),localStorage.setItem(Jt,n)}function Zt(e){document.body.classList.toggle("dark-mode",e),document.body.classList.toggle("light-mode",!e);const n=document.getElementById("v2ThemeToggleDark");if(n){n.classList.toggle("active",e);const t=n.querySelector(".v2-icon-moon"),o=n.querySelector(".v2-icon-sun");t&&o&&(t.style.display=e?"none":"block",o.style.display=e?"block":"none")}}function Io(){const n=!document.body.classList.contains("pink-mode");Qt(n),localStorage.setItem(Yt,n),localStorage.setItem(uo,n)}function Qt(e){document.body.classList.toggle("pink-mode",e),Bo(e);const n=document.getElementById("v2ThemeTogglePink");n&&n.classList.toggle("active",e)}function Bo(e){const n=document.querySelector(".v2-sidebar-logo");n&&(n.src=e?"src/icons/Icon Pinknew.svg":"src/icons/Icon Bluenew.svg")}const lt={init:po};typeof oe<"u"&&(oe.cineV2Sidebar=lt);typeof window<"u"&&(window.cineV2Sidebar=lt);const Po=Object.freeze(Object.defineProperty({__proto__:null,V2Sidebar:lt},Symbol.toStringTag,{value:"Module"})),To=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},ht="view-rules",Mo=["Indoor","Outdoor","Studio","Tripod","Handheld","Easyrig","Cine Saddle","Steadybag","Dolly","Slider","Steadicam","Gimbal","Trinity","Rollcage","Car Mount","Technocrane","Crane","Jib","Ultimate Arm","Russian Arm","Special"],Ao=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Script Supervisor","Make-up Artist","Production Designer"];let wt=!1;function Pe(e){return e&&typeof e=="object"?Object.keys(e).sort():[]}function q(e,n){if(typeof window[e]=="function")try{const t=window[e](n);return Array.isArray(t)&&t.length>0&&typeof t[0]=="object"?t.map(o=>o.value):Array.isArray(t)?t:[]}catch(t){return console.warn(`[RulesView] Error calling ${e}`,t),[]}return[]}function g(e){if(typeof window<"u"&&window.texts){const n=document.getElementById("languageSelect"),t=n&&n.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",o=window.texts[t]||window.texts.en;if(o)return e.split(".").reduce((i,s)=>i?i[s]:null,o)||e}return e}const Xt={container:null,init(){if(this.container=document.getElementById(ht),!this.container){console.error(`[RulesView] Container element with ID '${ht}' not found.`);return}wt||(console.log("[RulesView] Initializing..."),document.addEventListener("v2:viewchange",e=>{e.detail&&e.detail.view==="rules"&&this.render()}),document.addEventListener("cine:ready",()=>{console.log("[RulesView] cine:ready event received, re-rendering..."),this.render()}),document.addEventListener("cine-loader-complete",()=>{console.log("[RulesView] cine-loader-complete event received, re-rendering..."),this.render()}),wt=!0,console.log("[RulesView] Initialized"))},render(){if(!this.container&&(this.init(),!this.container))return;if(!(typeof window.getAutoGearRules=="function")){typeof this._retryCount>"u"&&(this._retryCount=0);const i=10,s=this._retryCount<i;if(this.container.innerHTML=`
                    <div class="rules-header">
                        <div class="rules-title">
                            <h1>${g("rulesViewTitle")}</h1>
                            <p>${g("rulesViewSubtitle")}</p>
                        </div>
                    </div>
                    <div class="v2-empty-state">
                        ${s?'<div class="v2-spinner"></div>':'<span class="icon" style="font-size: 48px; color: var(--warning-color);">warning</span>'}
                        <p>${s?g("loadingRules")||"Loading rules system...":g("rulesLoadError")||"Unable to load rules system"}</p>
                        <p class="text-muted" style="font-size: 12px; margin-top: 8px;">${s?"Waiting for core modules...":"Please refresh the page to try again."}</p>
                        ${s?"":'<button class="v2-btn v2-btn-secondary" style="margin-top: 16px;" onclick="window.location.reload()">Refresh Page</button>'}
                    </div>
                `,s&&!this._loadCheckTimer){const a=Math.min(500*Math.pow(1.5,this._retryCount),5e3);console.log(`[RulesView] Retry ${this._retryCount+1}/${i} in ${a}ms...`),this._loadCheckTimer=setTimeout(()=>{this._loadCheckTimer=null,this._retryCount++,typeof window.getAutoGearRules=="function"?(this._retryCount=0,this.render()):this._retryCount<i?this.render():(console.error("[RulesView] Max retries reached. Rules module unavailable."),this.render())},a)}return}this._retryCount=0;const n=`
                <div class="rules-header">
                    <div class="rules-title">
                        <h1>${g("rulesViewTitle")}</h1>
                        <p>${g("rulesViewSubtitle")}</p>
                    </div>
                    <div class="rules-header-actions">
                         ${this.renderToolbar()}
                         <button class="v2-btn v2-btn-primary" id="btn-add-rule">
                            <span class="icon">add</span>
                            <span>${g("buttonAddRule")}</span>
                        </button>
                    </div>
                </div>
                ${this.renderDefaultsSection()}
            `;let t='<div class="rules-list">';const o=window.getAutoGearRules();o.length===0?t+=`
                    <div class="rule-empty-state">
                        <h3>${g("rulesEmptyTitle")}</h3>
                        <p>${g("rulesEmptyText")}</p>
                    </div>
                `:o.forEach(i=>{const s=this.countConditions(i),a=Array.isArray(i.add)?i.add.length:0;t+=`
                        <div class="rule-card" data-rule-id="${i.id}">
                             <div class="rule-status">
                                <label class="rule-toggle">
                                    <input type="checkbox" ${i.enabled!==!1?"checked":""} disabled>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="rule-content">
                                <div class="rule-header">
                                    <h3 class="rule-name">${this.escapeHtml(i.label)||"Untitled Rule"}</h3>
                                    ${i.always?`<span class="v2-badge v2-badge-primary">${g("ruleBadgeAlways")}</span>`:""}
                                </div>
                                <div class="rule-conditions">
                                    <span class="condition-tag"><strong>${s}</strong> ${g("ruleTagConditions")}</span>
                                    <span class="condition-tag"><strong>${a}</strong> ${g("ruleTagItemsAdded")}</span>
                                </div>
                            </div>
                            <div class="rule-actions">
                                <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-rule" title="${g("buttonEdit")}">
                                    <span class="icon">edit</span>
                                </button>
                                <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-rule" title="${g("buttonDelete")}">
                                    <span class="icon">delete</span>
                                </button>
                            </div>
                        </div>
                    `}),t+="</div>",this.container.innerHTML=n+t,this.attachListeners()},countConditions(e){if(!e)return 0;let n=0;return e.always&&n++,["scenarios","camera","mattebox","monitor","tripodHeadBrand","tripodBowl","tripodTypes","crewPresent"].forEach(t=>{e[t]&&e[t].length>0&&(n+=e[t].length)}),n},attachListeners(){const e=this.container.querySelector("#btn-add-rule");e&&(e.onclick=()=>this.showAddRuleModal()),this.container.querySelectorAll(".btn-edit-rule").forEach(i=>{i.onclick=s=>{const a=s.target.closest(".rule-card");this.showEditRuleModal(a.dataset.ruleId)}}),this.container.querySelectorAll(".btn-delete-rule").forEach(i=>{i.onclick=s=>{const a=s.target.closest(".rule-card");confirm(g("confirmDeleteRule"))&&this.deleteRule(a.dataset.ruleId)}}),this.container.querySelectorAll(".default-monitor-select").forEach(i=>{i.onchange=s=>{const a=s.target.dataset.key,r=s.target.value;window.setAutoGearDefault?window.setAutoGearDefault(a,r):localStorage.setItem("auto_gear_default_"+a,r)}});const n=this.container.querySelector("#btn-export-rules");n&&(n.onclick=()=>this.exportRules());const t=this.container.querySelector("#btn-import-rules");t&&(t.onclick=()=>this.triggerImport());const o=this.container.querySelector("#btn-reset-rules");o&&(o.onclick=()=>this.resetRules())},exportRules(){window.exportAutoGearPresets?window.exportAutoGearPresets():console.warn("[RulesView] Export helper not found")},triggerImport(){const e=document.getElementById("autoGearImportInput");if(e)e.click();else{const n=document.createElement("input");n.type="file",n.accept=".json,application/json",n.onchange=t=>this.handleImport(t.target.files[0]),n.click()}},handleImport(e){if(!e)return;const n=new FileReader;n.onload=t=>{try{const o=JSON.parse(t.target.result);window.importAutoGearRules&&(window.importAutoGearRules(o),this.render())}catch(o){console.error("Import failed",o),alert("Invalid rules file")}},n.readAsText(e)},resetRules(){confirm(g("confirmResetRules"))&&(window.clearAutoGearDefaultsSeeded&&window.clearAutoGearDefaultsSeeded(),typeof window.resetAutoGearRules=="function"&&(window.resetAutoGearRules(),this.render()))},deleteRule(e){if(window.getAutoGearRules&&window.setAutoGearRules){const t=window.getAutoGearRules().filter(o=>o.id!==e);window.setAutoGearRules(t),this.render()}},showAddRuleModal(){this.showEditRuleModal(null)},renderToolbar(){return`
                <div class="v2-toolbar-group">
                    <button class="v2-btn v2-btn-ghost" id="btn-export-rules" title="${g("buttonExportRules")}">
                        <span class="icon">download</span>
                    </button>
                    <button class="v2-btn v2-btn-ghost" id="btn-import-rules" title="${g("buttonImportRules")}">
                        <span class="icon">upload</span>
                    </button>
                     <button class="v2-btn v2-btn-ghost" id="btn-reset-rules" title="${g("buttonResetRules")}">
                        <span class="icon">restart_alt</span>
                    </button>
                </div>
            `},renderDefaultsSection(){const e=[...q("collectAutoGearMonitorNames","monitor"),...q("collectAutoGearMonitorNames","directorMonitor")],n=o=>[`<option value="">${g("optionNone")}</option>`,...e.map(i=>`<option value="${this.escapeHtml(i)}" ${i===o?"selected":""}>${this.escapeHtml(i)}</option>`)].join(""),t=o=>window.getAutoGearDefault?window.getAutoGearDefault(o):localStorage.getItem("auto_gear_default_"+o)||"";return`
                <div class="v2-card rules-defaults-card">
                    <div class="v2-card-header">
                        <h3>${g("headingMonitorDefaults")}</h3>
                    </div>
                    <div class="v2-card-body">
                         <div class="defaults-grid">
                            <div class="v2-form-group">
                                <label class="v2-label">${g("labelFocusMonitor")}</label>
                                <select class="v2-select default-monitor-select" data-key="focusMonitor">
                                    ${n(t("focusMonitor"))}
                                </select>
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-label">${g("labelHandheldMonitor")}</label>
                                <select class="v2-select default-monitor-select" data-key="handheldMonitor">
                                    ${n(t("handheldMonitor"))}
                                </select>
                            </div>
                             <div class="v2-form-group">
                                <label class="v2-label">${g("labelComboMonitor")}</label>
                                <select class="v2-select default-monitor-select" data-key="comboMonitor">
                                    ${n(t("comboMonitor"))}
                                </select>
                            </div>
                             <div class="v2-form-group">
                                <label class="v2-label">${g("labelDirectorMonitor")}</label>
                                <select class="v2-select default-monitor-select" data-key="directorMonitor">
                                    ${n(t("directorMonitor"))}
                                </select>
                            </div>
                         </div>
                    </div>
                </div>
            `},showEditRuleModal(e){let n=null,t=!0;if(e&&window.getAutoGearRules){const h=window.getAutoGearRules().find(b=>b.id===e);h&&(n=JSON.parse(JSON.stringify(h)),t=!1)}n||(n={id:"rule_"+Date.now(),label:"",enabled:!0,always:!1,scenarios:[],scenarioMode:"all",scenarioBase:"",scenarioFactor:1,shootingDays:null,shootingDaysMode:"minimum",camera:[],mattebox:[],viewfinderExtension:[],monitor:[],videoDistribution:[],wireless:[],tripodHeadBrand:[],tripodBowl:[],tripodTypes:[],tripodSpreader:[],crewPresent:[],crewAbsent:[],add:[],remove:[]});const o=document.querySelector(".v2-modal-backdrop");o&&o.remove();const i=document.createElement("div");i.className="v2-modal-backdrop";const s=window.devices||{},a={scenarios:Mo,cameras:Pe(s.cameras),matteboxes:Pe(s.matteboxes),viewfinders:q("getAllViewfinderTypes"),monitors:[...q("collectAutoGearMonitorNames","monitor"),...q("collectAutoGearMonitorNames","directorMonitor")],wireless:Pe(s.wireless),tripodHeads:q("collectAutoGearTripodNames","tripodHead"),tripodBowls:q("collectAutoGearTripodNames","tripodBowl"),tripodTypes:q("collectAutoGearTripodNames","tripodType"),tripodSpreaders:q("collectAutoGearTripodNames","tripodSpreader"),crew:Ao};a.matteboxes.length===0&&s.matteboxes&&(a.matteboxes=Object.keys(s.matteboxes));const r=q("collectAutoGearCatalogNames"),l=q("collectDeviceManagerCategories");l.length||l.push("Power","Video","Support","Cabling","Accessories"),i.innerHTML=`
                <div class="v2-modal v2-modal-lg">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${g(t?"modalTitleCreateRule":"modalTitleEditRule")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body rules-modal-body">
                        <datalist id="gearCatalogList">
                            ${r.map(c=>`<option value="${this.escapeHtml(c)}">`).join("")}
                        </datalist>

                        <div class="rules-modal-tabs">
                            <button class="rules-tab-btn active" data-tab="general">${g("tabGeneral")}</button>
                            <button class="rules-tab-btn" data-tab="context">${g("tabContext")}</button>
                            <button class="rules-tab-btn" data-tab="camera">${g("tabCamera")}</button>
                            <button class="rules-tab-btn" data-tab="monitor">${g("tabMonitoring")}</button>
                            <button class="rules-tab-btn" data-tab="support">${g("tabSupport")}</button>
                            <button class="rules-tab-btn" data-tab="crew">${g("tabCrew")}</button>
                            <button class="rules-tab-btn" data-tab="actions">${g("tabActions")}</button>
                        </div>

                        <!-- 1. GENERAL -->
                        <div class="rules-tab-content active" id="tab-general">
                            <div class="v2-form-group">
                                <label for="ruleLabel" class="v2-label">${g("labelRuleName")}</label>
                                <input type="text" id="ruleLabel" class="v2-input" value="${this.escapeHtml(n.label)}" placeholder="${g("placeholderRuleName")}">
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-checkbox-label">
                                    <input type="checkbox" id="ruleEnabled" ${n.enabled!==!1?"checked":""}>
                                    <span>${g("labelRuleEnabled")}</span>
                                </label>
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-checkbox-label">
                                    <input type="checkbox" id="ruleAlways" ${n.always?"checked":""}>
                                    <span>${g("labelRuleAlways")}</span>
                                </label>
                                <p class="v2-help-text">${g("helpRuleAlways")}</p>
                            </div>
                        </div>

                        <!-- 2. CONTEXT -->
                        <div class="rules-tab-content" id="tab-context">
                            <div class="form-section">
                                <span class="form-section-title">${g("sectionScenarios")}</span>
                                <div class="v2-form-group">
                                    <label class="v2-label">${g("labelScenarioMode")}</label>
                                    <select id="ruleScenarioMode" class="v2-select">
                                        <option value="all" ${n.scenarioMode==="all"?"selected":""}>${g("optionScenarioAll")}</option>
                                        <option value="any" ${n.scenarioMode==="any"?"selected":""}>${g("optionScenarioAny")}</option>
                                        <option value="multiplier" ${n.scenarioMode==="multiplier"?"selected":""}>${g("optionScenarioMultiplier")}</option>
                                    </select>
                                </div>
                                <div id="scenarioMultiplierConfig" style="display: ${n.scenarioMode==="multiplier"?"block":"none"}; padding-left: 10px; border-left: 2px solid var(--border-color);">
                                     <div class="v2-form-group">
                                        <label class="v2-label">${g("labelScenarioFactor")}</label>
                                        <input type="number" id="ruleScenarioFactor" class="v2-input" value="${n.scenarioFactor||1}" min="1">
                                    </div>
                                </div>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.scenarios,n.scenarios,"scenarios")}
                                </div>
                            </div>

                            <div class="form-section">
                                <span class="form-section-title">${g("sectionShootingDays")}</span>
                                <div class="v2-form-group">
                                    <label class="v2-label">${g("labelShootingDaysMode")}</label>
                                    <select id="ruleShootingDaysMode" class="v2-select">
                                        <option value="minimum" ${n.shootingDaysMode==="minimum"?"selected":""}>${g("optionDaysMinimum")}</option>
                                        <option value="maximum" ${n.shootingDaysMode==="maximum"?"selected":""}>${g("optionDaysMaximum")}</option>
                                        <option value="every" ${n.shootingDaysMode==="every"?"selected":""}>${g("optionDaysEvery")}</option>
                                    </select>
                                </div>
                                <div class="v2-form-group">
                                    <label class="v2-label">${g("labelShootingDaysValue")}</label>
                                    <input type="number" id="ruleShootingDays" class="v2-input" value="${n.shootingDays!==null?n.shootingDays:""}" placeholder="${g("placeholderOptional")}">
                                    <p class="v2-help-text">${g("helpShootingDays")}</p>
                                </div>
                            </div>
                        </div>

                        <!-- 3. CAMERA -->
                        <div class="rules-tab-content" id="tab-camera">
                            <div class="form-section">
                                <span class="form-section-title">${g("sectionCameraModels")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.cameras,n.camera,"camera")}
                                </div>
                            </div>
                            <div class="form-section">
                                <span class="form-section-title">${g("sectionMatteboxes")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.matteboxes,n.mattebox,"mattebox")}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${g("sectionViewfinders")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.viewfinders,n.viewfinderExtension,"viewfinderExtension")}
                                </div>
                            </div>
                        </div>

                        <!-- 4. MONITORING -->
                        <div class="rules-tab-content" id="tab-monitor">
                             <div class="form-section">
                                <span class="form-section-title">${g("sectionMonitors")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.monitors,n.monitor,"monitor")}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${g("sectionWireless")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.wireless,n.wireless,"wireless")}
                                </div>
                            </div>
                        </div>

                        <!-- 5. SUPPORT -->
                        <div class="rules-tab-content" id="tab-support">
                            <div class="form-section">
                                <span class="form-section-title">${g("sectionTripodHeads")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.tripodHeads,n.tripodHeadBrand,"tripodHeadBrand")}
                                </div>
                            </div>
                            <div class="form-section">
                                <span class="form-section-title">${g("sectionBowlSize")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.tripodBowls,n.tripodBowl,"tripodBowl")}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${g("sectionLegTypes")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.tripodTypes,n.tripodTypes,"tripodTypes")}
                                </div>
                            </div>
                             <div class="form-section">
                                <span class="form-section-title">${g("sectionSpreaders")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.tripodSpreaders,n.tripodSpreader,"tripodSpreader")}
                                </div>
                            </div>
                        </div>

                        <!-- 6. CREW -->
                        <div class="rules-tab-content" id="tab-crew">
                            <div class="form-section">
                                <span class="form-section-title">${g("sectionCrewPresent")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.crew,n.crewPresent,"crewPresent")}
                                </div>
                            </div>
                            <div class="form-section">
                                <span class="form-section-title">${g("sectionCrewAbsent")}</span>
                                <div class="condition-grid">
                                    ${this.renderCheckboxGroup(a.crew,n.crewAbsent,"crewAbsent")}
                                </div>
                            </div>
                        </div>

                        <!-- 7. ACTIONS -->
                        <div class="rules-tab-content" id="tab-actions">
                            <div class="form-section">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <span class="form-section-title" style="margin: 0;">${g("sectionItemsToAdd")}</span>
                                    <button class="v2-btn v2-btn-sm v2-btn-secondary btn-show-add-item" data-type="add">${g("buttonAddItem")}</button>
                                </div>
                                <div class="add-item-form-container" id="add-item-form-add" style="display: none; margin-bottom: 10px; padding: 10px; background: var(--bg-surface-active); border-radius: 4px;">
                                    ${this.renderAddItemForm("add",l)}
                                </div>
                                <div class="action-list" id="action-list-add">
                                    ${this.renderActionList(n.add,"add")}
                                </div>
                            </div>
                             <div class="form-section">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <span class="form-section-title" style="margin: 0;">${g("sectionItemsToRemove")}</span>
                                    <button class="v2-btn v2-btn-sm v2-btn-secondary btn-show-add-item" data-type="remove">${g("buttonAddItem")}</button>
                                </div>
                                <div class="add-item-form-container" id="add-item-form-remove" style="display: none; margin-bottom: 10px; padding: 10px; background: var(--bg-surface-active); border-radius: 4px;">
                                    ${this.renderAddItemForm("remove",l)}
                                </div>
                                <div class="action-list" id="action-list-remove">
                                    ${this.renderActionList(n.remove,"remove")}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-rule">${g("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-rule">${g("buttonSaveRule")}</button>
                    </div>
                </div>
            `,document.body.appendChild(i),requestAnimationFrame(()=>i.classList.add("open")),this.bindModalEvents(i,n,t)},renderCheckboxGroup(e,n,t){const o=new Set(n||[]);return!e||e.length===0?`<div class="v2-empty-text">${g("textNoOptions")}</div>`:e.map(i=>`
                <label class="condition-item">
                    <input type="checkbox" data-group="${t}" value="${this.escapeHtml(i)}" ${o.has(i)?"checked":""}>
                    <span>${this.escapeHtml(i)}</span>
                </label>
            `).join("")},renderAddItemForm(e,n){return`
                 <div style="display: grid; grid-template-columns: 2fr 1fr 0.5fr auto; gap: 8px; align-items: end;">
                    <div>
                        <label class="v2-label" style="font-size: 11px;">${g("labelItemName")}</label>
                        <input type="text" class="v2-input input-item-name" list="gearCatalogList" placeholder="${g("placeholderItemSearch")}" data-type="${e}">
                    </div>
                    <div>
                        <label class="v2-label" style="font-size: 11px;">${g("labelCategory")}</label>
                        <select class="v2-select select-item-category" data-type="${e}">
                            ${n.map(t=>`<option value="${t}">${t}</option>`).join("")}
                        </select>
                    </div>
                    <div>
                        <label class="v2-label" style="font-size: 11px;">${g("labelQty")}</label>
                        <input type="number" class="v2-input input-item-qty" value="1" min="1" data-type="${e}">
                    </div>
                    <div style="display: flex; gap: 4px;">
                        <button class="v2-btn v2-btn-primary btn-confirm-add-item" data-type="${e}">${g("buttonAdd")}</button>
                    </div>
                </div>
            `},renderActionList(e,n){return!e||!e.length?`<div class="v2-empty-text">${g("textNoItems")}</div>`:e.map((t,o)=>`
                <div class="action-item-row">
                    <span style="font-weight: 500; flex: 1;">${this.escapeHtml(t.name)}</span>
                    <span class="v2-badge">${t.category}</span>
                    <span class="v2-badge v2-badge-outline">x${t.quantity}</span>
                    <button type="button" class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-action-item" 
                            data-type="${n}" data-index="${o}" title="Remove Item">
                        <span class="icon" style="font-size: 16px;">close</span>
                    </button>
                </div>
            `).join("")},bindModalEvents(e,n,t){e.querySelectorAll(".rules-tab-btn").forEach(s=>{s.onclick=()=>{e.querySelectorAll(".rules-tab-btn").forEach(a=>a.classList.remove("active")),e.querySelectorAll(".rules-tab-content").forEach(a=>a.classList.remove("active")),s.classList.add("active"),e.querySelector(`#tab-${s.dataset.tab}`).classList.add("active")}}),e.querySelectorAll(".btn-show-add-item").forEach(s=>{s.onclick=()=>{const a=s.dataset.type,r=e.querySelector(`#add-item-form-${a}`);r.style.display=r.style.display==="none"?"block":"none"}}),e.querySelectorAll(".btn-confirm-add-item").forEach(s=>{s.onclick=()=>{const a=s.dataset.type,r=e.querySelector(`#add-item-form-${a}`),l=r.querySelector(".input-item-name").value.trim(),c=r.querySelector(".select-item-category").value,h=parseInt(r.querySelector(".input-item-qty").value,10)||1;if(!l)return;n[a]||(n[a]=[]),n[a].push({name:l,category:c,quantity:h}),r.querySelector(".input-item-name").value="",r.style.display="none";const b=e.querySelector(`#action-list-${a}`);b.innerHTML=this.renderActionList(n[a],a),o()}});const o=()=>{e.querySelectorAll(".btn-delete-action-item").forEach(s=>{s.onclick=a=>{a.stopPropagation();const r=s.dataset.type,l=parseInt(s.dataset.index,10);n[r]&&(n[r].splice(l,1),e.querySelector(`#action-list-${r}`).innerHTML=this.renderActionList(n[r],r),o())}})};o();const i=()=>{e.classList.remove("open"),setTimeout(()=>e.remove(),200)};e.querySelector(".v2-modal-close").onclick=i,e.querySelector("#btn-cancel-rule").onclick=i,e.querySelector("#btn-save-rule").onclick=()=>{if(n.label=e.querySelector("#ruleLabel").value.trim(),n.enabled=e.querySelector("#ruleEnabled").checked,n.always=e.querySelector("#ruleAlways").checked,!n.label){alert(g("alertEnterRuleName"));return}const s=r=>Array.from(e.querySelectorAll(`input[data-group="${r}"]:checked`)).map(l=>l.value);n.scenarios=s("scenarios"),n.scenarioMode=e.querySelector("#ruleScenarioMode").value,n.scenarioFactor=parseFloat(e.querySelector("#ruleScenarioFactor").value)||1,n.shootingDaysMode=e.querySelector("#ruleShootingDaysMode").value;const a=e.querySelector("#ruleShootingDays").value;n.shootingDays=a!==""?parseInt(a,10):null,n.camera=s("camera"),n.mattebox=s("mattebox"),n.viewfinderExtension=s("viewfinderExtension"),n.monitor=s("monitor"),n.wireless=s("wireless"),n.tripodHeadBrand=s("tripodHeadBrand"),n.tripodBowl=s("tripodBowl"),n.tripodTypes=s("tripodTypes"),n.tripodSpreader=s("tripodSpreader"),n.crewPresent=s("crewPresent"),n.crewAbsent=s("crewAbsent"),this.saveRule(n,t),i()}},saveRule(e,n){if(window.getAutoGearRules&&window.setAutoGearRules){const t=window.getAutoGearRules();let o;n?o=[...t,e]:o=t.map(i=>i.id===e.id?e:i),window.setAutoGearRules(o),this.render()}},escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};To.cineRulesView=Xt;const Vo=Object.freeze(Object.defineProperty({__proto__:null,RulesView:Xt},Symbol.toStringTag,{value:"Module"}));(function(e){const n="v2-device-library-content",t="device-manager";let o=!1,i=!1;function s(d){if(typeof window<"u"&&window.texts){const m=document.getElementById("languageSelect"),p=m&&m.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",w=window.texts[p]||window.texts.en;if(w)return d.split(".").reduce((S,$)=>S?S[$]:null,w)||d}return d}function a(){const d=document.createElement("header");return d.className="view-header",d.innerHTML=`
            <div class="header-content">
                <h1>${s("deviceLibraryTitle")||"Device Library"}</h1>
                <p class="header-subtitle">${s("deviceLibrarySubtitle")||"Add, edit, and manage devices in your local database"}</p>
            </div>
            <div class="view-header-actions">
                <button class="v2-btn v2-btn-secondary" id="v2-export-db-btn">
                    <span class="icon">download</span>
                    <span>Export</span>
                </button>
                <button class="v2-btn v2-btn-secondary" id="v2-import-db-btn">
                    <span class="icon">upload</span>
                    <span>Import</span>
                </button>
            </div>
        `,d}function r(){const d=document.createElement("div");return d.className="device-library-tabs",d.innerHTML=`
            <button class="device-library-tab active" data-tab="add">
                <span class="icon">add_circle</span>
                <span>${s("tabAddDevice")||"Add Device"}</span>
            </button>
            <button class="device-library-tab" data-tab="browse">
                <span class="icon">list</span>
                <span>${s("tabBrowseLibrary")||"Browse Library"}</span>
            </button>
        `,d}function l(){if(i)return;console.log("[DeviceLibraryView] Reparenting legacy content...");const d=document.getElementById(n),m=document.getElementById(t);if(!d){console.error(`[DeviceLibraryView] V2 Container #${n} not found.`);return}if(!m){console.error(`[DeviceLibraryView] Legacy Container #${t} not found.`);return}d.innerHTML="",d.appendChild(a()),d.appendChild(r());const p=document.createElement("div");p.className="view-content";const w=document.createElement("div");w.id="device-library-add-tab",w.className="device-library-tab-content active";const S=document.createElement("div");S.className="v2-card v2-device-library-card";const $=document.createElement("div");$.className="v2-card-header",$.innerHTML=`
            <div>
                <h3 class="v2-card-title">
                    <span class="icon section-icon">add_box</span>
                    ${s("addNewDeviceTitle")||"Add New Device"}
                </h3>
                <p class="v2-card-subtitle">${s("addDeviceSubtitle")||"Create a custom device entry for your database"}</p>
            </div>
        `;const x=document.createElement("div");x.className="v2-card-body";const K=m.querySelector(".button-group");if(K){const J=K.querySelector("#addDeviceHeading");J&&J.remove(),c(K),x.appendChild(K)}S.appendChild($),S.appendChild(x),w.appendChild(S);const R=document.createElement("div");R.id="device-library-browse-tab",R.className="device-library-tab-content";const A=document.createElement("div");A.className="v2-card v2-device-library-card";const ie=document.createElement("div");ie.className="v2-card-header browse-header",ie.innerHTML=`
            <div>
                <h3 class="v2-card-title">
                    <span class="icon section-icon">inventory_2</span>
                    ${s("existingDevicesTitle")||"Existing Devices"}
                </h3>
                <p class="v2-card-subtitle">${s("existingDevicesSubtitle")||"Browse and manage devices in your library"}</p>
            </div>
        `;const ee=document.createElement("div");ee.className="v2-card-body";const se=m.querySelector(".device-library-search"),re=m.querySelector("#deviceListContainer"),le=m.querySelector("#existingDevicesHeading");if(le&&le.remove(),se){const J=se.querySelector("input");J&&J.classList.add("v2-input"),ee.appendChild(se)}for(re&&(re.classList.add("v2-device-list"),ee.appendChild(re)),A.appendChild(ie),A.appendChild(ee),R.appendChild(A);m.firstChild;){if(m.firstChild.id==="deviceManagerHeading"){m.removeChild(m.firstChild);continue}if(m.firstChild.classList&&(m.firstChild.classList.contains("button-group")||m.firstChild.classList.contains("device-library-search"))){m.removeChild(m.firstChild);continue}if(m.firstChild.id==="deviceListContainer"){m.removeChild(m.firstChild);continue}w.appendChild(m.firstChild)}p.appendChild(w),p.appendChild(R),d.appendChild(p),h(S),h(A),b(),E(),i=!0,console.log("[DeviceLibraryView] Reparenting complete.")}function c(d){const m={cameraFields:{icon:"videocam",title:"Camera Settings"},monitorFields:{icon:"desktop_windows",title:"Monitor Settings"},lensFields:{icon:"blur_circular",title:"Lens Settings"},viewfinderFields:{icon:"center_focus_weak",title:"Viewfinder Settings"},videoFields:{icon:"sensors",title:"Video TX Settings"},motorFields:{icon:"settings",title:"Motor Settings"},controllerFields:{icon:"tune",title:"Controller Settings"},distanceFields:{icon:"straighten",title:"Distance Sensor Settings"},batteryFields:{icon:"battery_full",title:"Battery Settings"}};Object.keys(m).forEach(w=>{const S=d.querySelector(`#${w}`);if(S&&(S.classList.add("device-form-section"),!S.querySelector(".section-header"))){const $=document.createElement("div");$.className="section-header",$.innerHTML=`
                        <span class="icon section-icon">${m[w].icon}</span>
                        <span class="section-title">${m[w].title}</span>
                    `,S.insertBefore($,S.firstChild)}});const p={powerInputsHeading:"bolt",powerDistributionHeading:"power",videoOutputsHeading:"connected_tv",fizConnectorHeading:"settings_input_composite",mediaHeading:"sd_card",viewfinderHeading:"visibility",lensMountHeading:"camera"};Object.keys(p).forEach(w=>{const S=d.querySelector(`#${w}`);if(S&&!S.querySelector(".icon")){const $=document.createElement("span");$.className="icon",$.textContent=p[w],S.insertBefore($,S.firstChild)}})}function h(d){d.querySelectorAll('input[type="text"], input[type="number"], input[type="search"]').forEach(x=>x.classList.add("v2-input")),d.querySelectorAll("select").forEach(x=>x.classList.add("v2-select")),d.querySelectorAll("button").forEach(x=>{x.classList.contains("v2-btn")||(x.classList.add("v2-btn"),(x.textContent.toLowerCase().includes("add")||x.textContent.toLowerCase().includes("save"))&&x.classList.add("v2-btn-primary"))}),d.querySelectorAll(".form-row").forEach(x=>x.classList.add("v2-form-row")),d.querySelectorAll("label").forEach(x=>x.classList.add("v2-label"))}function b(){const d=document.querySelectorAll(".device-library-tab"),m=document.querySelectorAll(".device-library-tab-content");d.forEach(p=>{p.addEventListener("click",()=>{const w=p.dataset.tab;d.forEach($=>$.classList.remove("active")),p.classList.add("active"),m.forEach($=>$.classList.remove("active"));const S=document.getElementById(`device-library-${w}-tab`);S&&S.classList.add("active")})})}function E(){const d=document.getElementById("v2-export-db-btn"),m=document.getElementById("v2-import-db-btn"),p=document.getElementById("exportDataBtn"),w=document.getElementById("importDataBtn");d&&p&&d.addEventListener("click",()=>{p.click()}),m&&w&&m.addEventListener("click",()=>{w.click()})}function f(){if(!i)return;const d=document.getElementById(n),m=document.getElementById(t);if(d&&m){const p=d.querySelector(".v2-card-body");if(p)for(;p.firstChild;)m.appendChild(p.firstChild);else for(;d.firstChild;)m.appendChild(d.firstChild);d.innerHTML=""}i=!1,console.log("[DeviceLibraryView] Restored legacy content.")}function u(){l()}function y(){o||(console.log("[DeviceLibraryView] Initializing..."),document.addEventListener("v2:viewchange",d=>{d.detail&&d.detail.view==="devices"&&u()}),document.addEventListener("v2:languagechange",()=>{i&&(i=!1,u())}),o=!0,console.log("[DeviceLibraryView] Initialized"))}const v={init:y,render:u,restoreLegacyContent:f};e.cineV2DeviceLibrary=v})(typeof window<"u"?window:void 0);const jo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="view-contacts";let t=!1;function o(a){return typeof a!="string"?"":a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function i(a){if(typeof window<"u"&&window.texts){const r=document.getElementById("languageSelect"),l=r&&r.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",c=window.texts[l]||window.texts.en;if(c)return c[a]||a}return a}const s={container:null,init(){try{this.container=document.getElementById(n),this.container||this.createViewContainer(),t||(console.log("[ContactsView] Initializing..."),document.addEventListener("v2:viewchange",a=>{a.detail&&a.detail.view==="contacts"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),t=!0,console.log("[ContactsView] Initialized"))}catch(a){console.error("[ContactsView] Init failed:",a)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const a=document.querySelector(".v2-app")||document.body,r=document.createElement("div");r.id=n,r.className="app-view",a.appendChild(r),this.container=r},render(){try{if(!this.container&&(this.init(),!this.container))return;const a=e.cineFeaturesContacts;if(!a){this.container.innerHTML=`
                        <div class="view-empty-state">
                            <p>${i("statusUnavailable")||"Contacts module not loaded."}</p>
                        </div>
                    `;return}const r=a.loadStoredContacts(),l=`
                    <header class="view-header">
                        <div class="header-content">
                            <h1>${i("contactsViewTitle")}</h1>
                            <p class="header-subtitle">${i("contactsViewSubtitle")}</p>
                        </div>
                        <div class="view-header-actions">
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact">
                                <span class="icon">add</span>
                                <span>${i("buttonAddContact")}</span>
                            </button>
                        </div>
                    </header>
                `;let c='<div class="view-content">';!r||r.length===0?c+=`
                        <div class="view-empty-state">
                             <div class="view-empty-state-icon">
                                <span class="icon">group</span>
                            </div>
                            <h2>${i("contactsEmptyTitle")}</h2>
                            <p class="text-muted" style="margin-bottom: 24px;">${i("contactsEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact-empty">
                                <span class="icon">add</span>
                                ${i("buttonAddFirstContact")}
                            </button>
                        </div>
                    `:(c+='<div class="contacts-grid">',r.forEach(h=>{c+=this.renderContactCard(h)}),c+="</div>"),c+="</div>",this.container.innerHTML=l+c,this.attachListeners()}catch(a){console.error("[ContactsView] Render failed",a),this.container&&(this.container.innerHTML=`<div class="v2-error-state"><p>Error loading view: ${a.message}</p></div>`)}},renderContactCard(a){const r=a.name?a.name.split(" ").map(E=>E[0]).join("").substring(0,2).toUpperCase():"?",l=a.avatar?`<img src="${a.avatar}" alt="${o(a.name)}">`:r,c=a.phone?`<a href="tel:${o(a.phone)}" onclick="event.stopPropagation()">${o(a.phone)}</a>`:"",h=a.email?`<a href="mailto:${o(a.email)}" onclick="event.stopPropagation()">${o(a.email)}</a>`:"",b=a.website?`<a href="${o(a.website)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${i("linkWebsite")}</a>`:"";return`
                <div class="v2-card v2-card-interactive contact-card" data-contact-id="${o(a.id)}" tabindex="0" role="button">
                    <div class="v2-card-header">
                        <div class="contact-avatar">
                            ${l}
                        </div>
                        <div class="v2-tile-info">
                            <h3 class="v2-card-title">${o(a.name||i("contactUnnamed"))}</h3>
                            <div class="v2-card-subtitle">${o(a.role||i("contactNoRole"))}</div>
                        </div>
                        <div class="v2-card-actions">
                            <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-contact" title="${i("buttonEdit")}">
                                <span class="icon">edit</span>
                            </button>
                            <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-contact" title="${i("buttonDelete")}">
                                <span class="icon">delete</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="v2-card-body">
                        <div class="contact-details">
                            ${a.phone?`
                                <div class="contact-detail-row">
                                    <span class="icon">call</span>
                                    ${c}
                                </div>
                            `:""}
                            ${a.email?`
                                <div class="contact-detail-row">
                                    <span class="icon">mail</span>
                                    ${h}
                                </div>
                            `:""}
                            ${a.website?`
                                <div class="contact-detail-row">
                                    <span class="icon">language</span>
                                    ${b}
                                </div>
                            `:""}
                             ${a.notes?`
                                <div class="contact-detail-row" style="margin-top: 8px; font-style: italic; opacity: 0.8; align-items: flex-start;">
                                    <span class="icon" style="margin-top:2px;">description</span>
                                    <div>${o(a.notes)}</div>
                                </div>
                            `:""}
                        </div>
                    </div>
                </div>
            `},attachListeners(){const a=this.container.querySelector("#btn-add-contact"),r=this.container.querySelector("#btn-add-contact-empty");a&&(a.onclick=()=>this.showEditModal(null)),r&&(r.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".contact-card").forEach(l=>{l.onclick=c=>{c.target.closest("button")||c.target.closest("a")||this.showEditModal(l.dataset.contactId)}}),this.container.querySelectorAll(".btn-edit-contact").forEach(l=>{l.onclick=c=>{c.stopPropagation();const h=c.target.closest(".contact-card");this.showEditModal(h.dataset.contactId)}}),this.container.querySelectorAll(".btn-delete-contact").forEach(l=>{l.onclick=c=>{c.stopPropagation();const h=c.target.closest(".contact-card");this.showDeleteConfirmation(h.dataset.contactId)}})},showDeleteConfirmation(a){const r=document.createElement("div");r.className="v2-modal-backdrop",r.innerHTML=`
                <div class="v2-modal" style="max-width: 400px;">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${i("modalTitleDeleteContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body" style="padding: 24px;">
                        <p>${i("confirmDeleteContact")}</p>
                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-delete">${i("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-confirm-delete" style="background-color: var(--danger-color, #ef4444); border-color: var(--danger-color, #ef4444);">${i("buttonDeleteRed")}</button>
                    </div>
                </div>
            `,document.body.appendChild(r),requestAnimationFrame(()=>r.classList.add("open"));const l=()=>{r.classList.remove("open"),setTimeout(()=>r.remove(),200)};r.querySelector(".v2-modal-close").onclick=l,r.querySelector("#btn-cancel-delete").onclick=l,r.querySelector("#btn-confirm-delete").onclick=()=>{this.deleteContact(a),l()}},deleteContact(a){const r=e.cineFeaturesContacts;if(!r)return;const c=r.loadStoredContacts().filter(h=>h.id!==a);r.saveContactsToStorage(c)?this.render():alert("Failed to delete contact.")},showEditModal(a){const r=e.cineFeaturesContacts;if(!r)return;let l={},c=!0;if(a){const p=r.loadStoredContacts().find(w=>w.id===a);p&&(l={...p},c=!1)}c&&(l={name:"",role:"",phone:"",email:"",website:"",notes:"",avatar:""});const h=document.querySelector(".v2-modal-backdrop");h&&h.remove();const b=document.createElement("div");b.className="v2-modal-backdrop";const E=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Line Producer","Production Manager","Rental House","Post House","Agency","Client"];b.innerHTML=`
                <div class="v2-modal contact-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${i(c?"modalTitleNewContact":"modalTitleEditContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body contacts-modal-body">
                        
                        <!-- Avatar Upload Section -->
                        <div class="avatar-upload-section" id="avatarDropZone">
                            <div class="avatar-preview" id="modalAvatarPreview">
                                ${l.avatar?`<img src="${l.avatar}">`:'<span class="icon">person</span>'}
                            </div>
                            <div class="avatar-buttons">
                                <label class="v2-btn v2-btn-sm v2-btn-secondary">
                                    <span class="icon" style="font-size:14px; margin-right:4px;">upload</span>
                                    ${i("buttonUploadPhoto")}
                                    <input type="file" id="avatarUploadInput" accept="image/*" hidden>
                                </label>
                                <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost text-danger" id="removeAvatarBtn" ${l.avatar?"":"disabled"}>
                                    ${i("buttonRemovePhoto")}
                                </button>
                            </div>
                            <div class="avatar-hint">${i("avatarHint")||"Drag & drop or click to upload"}</div>
                        </div>

                        <!-- Basic Info Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">badge</span>
                                ${i("sectionBasicInfo")||"Basic Information"}
                            </div>
                            
                            <div class="v2-form-group">
                                <label class="v2-label">${i("labelName")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">person</span></span>
                                    <input type="text" id="contactName" class="v2-input" value="${o(l.name)}" placeholder="${i("placeholderFullName")}" required>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${i("labelRole")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">work</span></span>
                                    <input type="text" id="contactRole" class="v2-input" value="${o(l.role)}" list="roleList" placeholder="${i("placeholderRole")}">
                                </div>
                                <datalist id="roleList">
                                    ${E.map(m=>`<option value="${m}">`).join("")}
                                </datalist>
                            </div>
                        </div>

                        <!-- Contact Details Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">contacts</span>
                                ${i("sectionContactDetails")||"Contact Details"}
                            </div>

                            <div class="detail-row-group">
                                <div class="v2-form-group">
                                    <label class="v2-label">${i("labelPhone")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">call</span></span>
                                        <input type="tel" id="contactPhone" class="v2-input" value="${o(l.phone)}" placeholder="${i("placeholderPhone")}">
                                    </div>
                                </div>
                                
                                <div class="v2-form-group">
                                    <label class="v2-label">${i("labelEmail")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">mail</span></span>
                                        <input type="email" id="contactEmail" class="v2-input" value="${o(l.email)}" placeholder="${i("placeholderEmail")}">
                                    </div>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${i("labelWebsite")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">language</span></span>
                                    <input type="url" id="contactWebsite" class="v2-input" value="${o(l.website)}" placeholder="${i("placeholderWebsite")}">
                                </div>
                            </div>
                        </div>

                        <!-- Notes Section -->
                        <div class="v2-form-group">
                            <label class="v2-label">${i("labelNotes")}</label>
                            <textarea id="contactNotes" class="v2-input" rows="3" placeholder="${i("placeholderNotes")}">${o(l.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-contact">${i("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-contact">
                            <span class="icon" style="font-size:16px; margin-right:4px;">save</span>
                            ${i("buttonSaveContact")}
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(b),requestAnimationFrame(()=>b.classList.add("open"));const f=()=>{b.classList.remove("open"),setTimeout(()=>b.remove(),200)};b.querySelector(".v2-modal-close").onclick=f,b.querySelector("#btn-cancel-contact").onclick=f;const u=b.querySelector("#avatarUploadInput"),y=b.querySelector("#modalAvatarPreview"),v=b.querySelector("#removeAvatarBtn");let d=l.avatar||"";u.onchange=m=>{const p=m.target.files[0];if(p)if(e.CINE_CONTACTS_PROFILE_MODULE)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(p,w=>{d=w,y.innerHTML=`<img src="${w}">`,v.disabled=!1},w=>{alert("Error reading image: "+w)});else{const w=new FileReader;w.onload=S=>{d=S.target.result,y.innerHTML=`<img src="${d}">`,v.disabled=!1},w.readAsDataURL(p)}},v.onclick=()=>{d="",y.innerHTML='<span class="icon">person</span>',v.disabled=!0,u.value=""},b.querySelector("#btn-save-contact").onclick=()=>{const m=b.querySelector("#contactName").value.trim();if(!m){alert(i("alertEnterName"));return}const p={id:a||void 0,name:m,role:b.querySelector("#contactRole").value.trim(),phone:b.querySelector("#contactPhone").value.trim(),email:b.querySelector("#contactEmail").value.trim(),website:b.querySelector("#contactWebsite").value.trim(),notes:b.querySelector("#contactNotes").value.trim(),avatar:d},w=r.loadStoredContacts();let S;if(c){const $=r.normalizeContactEntry(p);S=[...w,$]}else S=w.map($=>$.id===a?r.normalizeContactEntry({...$,...p}):$);S=r.sortContacts(S),r.saveContactsToStorage(S)?(this.render(),f()):alert("Failed to save contact.")}}};e.cineContactsView=s})(typeof window<"u"?window:void 0);const _o=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(){const e="view-settings";let n=!1;function t(s){if(typeof window<"u"&&window.texts){const a=document.getElementById("languageSelect"),r=a&&a.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",l=window.texts[r]||window.texts.en;if(l)return s.split(".").reduce((c,h)=>c?c[h]:null,l)||s}return s}const o=[{v2:"v2-settings-language",legacy:"settingsLanguage",type:"value"},{v2:"v2-settings-temp-unit",legacy:"settingsTemperatureUnit",type:"value"},{v2:"v2-settings-focus-scale",legacy:"settingsFocusScale",type:"value"},{v2:"v2-settings-dark-mode",legacy:"settingsDarkMode",type:"checkbox"},{v2:"v2-settings-pink-mode",legacy:"settingsPinkMode",type:"checkbox"},{v2:"v2-settings-accent-color",legacy:"accentColorInput",type:"color"},{v2:"v2-settings-font-size",legacy:"settingsFontSize",type:"value"},{v2:"v2-settings-font-family",legacy:"settingsFontFamily",type:"value"},{v2:"v2-cam-color-a",legacy:"cameraColorA",type:"color"},{v2:"v2-cam-color-b",legacy:"cameraColorB",type:"color"},{v2:"v2-cam-color-c",legacy:"cameraColorC",type:"color"},{v2:"v2-cam-color-d",legacy:"cameraColorD",type:"color"},{v2:"v2-cam-color-e",legacy:"cameraColorE",type:"color"},{v2:"v2-settings-high-contrast",legacy:"settingsHighContrast",type:"checkbox"},{v2:"v2-settings-reduce-motion",legacy:"settingsReduceMotion",type:"checkbox"},{v2:"v2-settings-relaxed-spacing",legacy:"settingsRelaxedSpacing",type:"checkbox"},{v2:"v2-volt-v-high",legacy:"mountVoltageVHigh",type:"value"},{v2:"v2-volt-v-low",legacy:"mountVoltageVLow",type:"value"},{v2:"v2-volt-gold-high",legacy:"mountVoltageGoldHigh",type:"value"},{v2:"v2-volt-gold-low",legacy:"mountVoltageGoldLow",type:"value"},{v2:"v2-volt-b-high",legacy:"mountVoltageBHigh",type:"value"},{v2:"v2-volt-b-low",legacy:"mountVoltageBLow",type:"value"},{v2:"v2-settings-auto-backup",legacy:"settingsShowAutoBackups",type:"checkbox"},{v2:"v2-settings-backup-retention",legacy:"autoGearBackupRetention",type:"value"},{v2:"v2-settings-log-level",legacy:"loggingLevelFilter",type:"value"},{v2:"v2-settings-log-history",legacy:"loggingHistoryLimit",type:"value"},{v2:"v2-settings-log-filter",legacy:"loggingNamespaceFilter",type:"value"},{v2:"v2-settings-log-console",legacy:"loggingConsoleOutput",type:"checkbox"},{v2:"v2-settings-log-capture",legacy:"loggingCaptureConsole",type:"checkbox"},{v2:"v2-settings-log-errors",legacy:"loggingCaptureErrors",type:"checkbox"},{v2:"v2-settings-log-persist",legacy:"loggingPersistSession",type:"checkbox"}],i={init(){if(this.container=document.getElementById(e),!this.container){console.error(`[SettingsView] Container element with ID '${e}' not found.`);return}if(!n){console.log("[SettingsView] Initializing..."),document.addEventListener("v2:viewchange",a=>{a.detail&&a.detail.view==="settings"&&this.render()});const s=document.getElementById("languageSelect");s&&s.addEventListener("change",()=>{this.isVisible()&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),n=!0}},isVisible(){return this.container&&this.container.classList.contains("active")},render(){!this.container&&(this.init(),!this.container)||(this.container.innerHTML=this.getTemplate(),this.attachListeners(),this.syncFromLegacy(),this.initTabs(),this.initRehearsalSync(),this.initStatusObservers(),this.initBackupDiffSync(),this.initLogViewerSync())},getTemplate(){return`
            <div class="v2-modal-header">
                <h2>${t("settingsHeading")}</h2>
                <button class="v2-modal-close" id="v2-settings-close" aria-label="${t("buttonClose")}">
                    <span class="icon">close</span>
                </button>
            </div>
            
            <nav class="v2-tabs-nav v2-settings-tabs-nav" role="tablist" aria-label="${t("settingsHeading")}">
                <button type="button" class="v2-tab-btn active" data-tab="general" role="tab" aria-selected="true" aria-controls="v2-panel-general">
                    ${t("settingsTabGeneral")}
                </button>
                <button type="button" class="v2-tab-btn" data-tab="backup" role="tab" aria-selected="false" aria-controls="v2-panel-backup">
                    ${t("settingsTabBackup")}
                </button>
                <button type="button" class="v2-tab-btn" data-tab="data" role="tab" aria-selected="false" aria-controls="v2-panel-data">
                    ${t("settingsTabData")}
                </button>
                <button type="button" class="v2-tab-btn" data-tab="about" role="tab" aria-selected="false" aria-controls="v2-panel-about">
                    ${t("settingsTabAbout")}
                </button>
            </nav>

            <div class="v2-settings-body">
                ${this.getGeneralTabHtml()}
                ${this.getBackupTabHtml()}
                ${this.getDataTabHtml()}
                ${this.getAboutTabHtml()}
            </div>
            <div class="v2-settings-footer">
                <button class="v2-btn v2-btn-primary" id="v2-settings-done">${t("buttonClose")}</button>
            </div>
            
            <!-- Modals -->
            ${this.getBackupDiffModalHtml()}
            ${this.getRehearsalModalHtml()}
        `},getGeneralTabHtml(){return`
            <div class="v2-settings-panel active" id="v2-panel-general">
                <h2>${t("settingsTabGeneral")}</h2>
                
                <div class="v2-settings-card">
                    <h3><span class="icon">language</span> ${t("generalSectionLanguageHeading")}</h3>
                    <div class="v2-form-grid">
                        <div class="v2-form-group">
                            <label class="v2-label">${t("languageSetting")}</label>
                            <select class="v2-select" id="v2-settings-language">
                                <option value="en">English</option>
                                <option value="de">Deutsch</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="it">Italiano</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${t("temperatureUnitSetting")}</label>
                            <select class="v2-select" id="v2-settings-temp-unit">
                                <option value="celsius">${t("temperatureUnitCelsius")}</option>
                                <option value="fahrenheit">${t("temperatureUnitFahrenheit")}</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${t("focusScaleSetting")}</label>
                            <select class="v2-select" id="v2-settings-focus-scale">
                                <option value="metric">${t("focusScaleMetric")}</option>
                                <option value="imperial">${t("focusScaleImperial")}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">palette</span> ${t("generalSectionAppearanceHeading")}</h3>
                    <div class="v2-checkbox-group">
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${t("darkModeSetting")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-dark-mode">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${t("pinkModeSetting")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-pink-mode">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${t("accentColorSetting")}</label>
                        <div class="v2-color-input-wrapper">
                            <input type="color" class="v2-color-input" id="v2-settings-accent-color">
                            <button class="v2-btn v2-btn-sm v2-btn-secondary" id="v2-accent-reset">${t("buttonReset")}</button>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">battery_charging_full</span> ${t("mountVoltageSettingsHeading")}</h3>
                    <p>${t("mountVoltageDescription")}</p>
                    
                    <div class="v2-form-grid v2-voltage-grid">
                        
                        <!-- V-Mount -->
                        <div class="v2-voltage-card">
                            <h4>${t("mountVoltageCardLabelV")}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${t("mountVoltageHighLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-v-high" step="0.1" min="0">
                            </div>
                            <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${t("mountVoltageLowLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-v-low" step="0.1" min="0">
                            </div>
                        </div>

                        <!-- Gold Mount -->
                        <div class="v2-voltage-card">
                            <h4>${t("mountVoltageCardLabelGold")}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${t("mountVoltageHighLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-gold-high" step="0.1" min="0">
                            </div>
                             <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${t("mountVoltageLowLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-gold-low" step="0.1" min="0">
                            </div>
                        </div>

                        <!-- B-Mount -->
                        <div class="v2-voltage-card">
                            <h4>${t("mountVoltageCardLabelB")}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${t("mountVoltageHighLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-b-high" step="0.1" min="0">
                            </div>
                             <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${t("mountVoltageLowLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-b-low" step="0.1" min="0">
                            </div>
                        </div>
                    </div>
                     <div style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-sm v2-btn-secondary" id="v2-volt-reset">${t("mountVoltageReset")}</button>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">color_lens</span> ${t("generalSectionCameraColorsHeading")}</h3>
                    <p>${t("cameraColorSettingDescription")}</p>
                    <div class="v2-camera-colors-grid">
                        <div class="v2-color-field">
                            <label>${t("cameraColorALabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-a">
                        </div>
                        <div class="v2-color-field">
                            <label>${t("cameraColorBLabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-b">
                        </div>
                        <div class="v2-color-field">
                            <label>${t("cameraColorCLabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-c">
                        </div>
                        <div class="v2-color-field">
                            <label>${t("cameraColorDLabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-d">
                        </div>
                        <div class="v2-color-field">
                            <label>${t("cameraColorELabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-e">
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">tune</span> ${t("generalSectionInterfaceHeading")}</h3>
                    <p>${t("generalSectionInterfaceHelp")}</p>
                    <div class="v2-checkbox-group">
                        <label class="v2-toggle-row">
                             <span class="v2-toggle-label">${t("checkboxHighContrast")}</span>
                             <div class="v2-toggle-switch">
                                 <input type="checkbox" id="v2-settings-high-contrast">
                                 <span class="v2-toggle-slider"></span>
                             </div>
                        </label>
                        <label class="v2-toggle-row">
                             <span class="v2-toggle-label">${t("checkboxReduceMotion")}</span>
                             <div class="v2-toggle-switch">
                                 <input type="checkbox" id="v2-settings-reduce-motion">
                                 <span class="v2-toggle-slider"></span>
                             </div>
                        </label>
                         <label class="v2-toggle-row">
                             <span class="v2-toggle-label">${t("checkboxRelaxedSpacing")}</span>
                             <div class="v2-toggle-switch">
                                 <input type="checkbox" id="v2-settings-relaxed-spacing">
                                 <span class="v2-toggle-slider"></span>
                             </div>
                        </label>
                    </div>
                    
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${t("fontSizeSetting")}</label>
                        <select class="v2-select" id="v2-settings-font-size">
                            <option value="13px">Small (13px)</option>
                            <option value="14px">Medium (14px)</option>
                            <option value="15px">Large (15px)</option>
                            <option value="16px">X-Large (16px)</option>
                        </select>
                         <p class="v2-help-text">${t("fontSizeSettingHelp")}</p>
                    </div>
                     <div class="v2-form-group">
                        <label class="v2-label">${t("fontFamilySetting")}</label>
                        <select class="v2-select" id="v2-settings-font-family">
                            <option value="Inter, system-ui, sans-serif">Inter (Default)</option>
                            <option value="Roboto, sans-serif">Roboto</option>
                            <option value="Open Sans, sans-serif">Open Sans</option>
                            <option value="system-ui, sans-serif">System UI</option>
                        </select>
                         <p class="v2-help-text">${t("fontFamilySettingHelp")}</p>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">verified</span> ${t("generalSectionBrandingHeading")}</h3>
                    <p>${t("logoSettingHelp")}</p>
                    <div class="v2-branding-preview" id="v2-branding-preview" style="margin-bottom: 1rem; padding: 1rem; border: 1px dashed var(--v2-border-default); border-radius: var(--v2-radius-sm); text-align: center;">
                        <span style="color: var(--v2-text-muted);">${t("brandingNoLogo")}</span>
                    </div>
                    <button class="v2-btn v2-btn-secondary" id="v2-btn-branding-upload">
                        <span class="icon">upload</span> ${t("buttonUploadSvg")}
                    </button>
                    <!-- Legacy File Input is hidden and clicked via proxy -->
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">history_edu</span> ${t("documentationTrackerHeading")}</h3>
                    <p>${t("documentationTrackerDescription")}</p>
                    <div class="v2-doc-tracker-list" id="v2-doc-tracker-list" style="margin: 1rem 0; border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-sm); min-height: 50px;">
                        <!-- Mirrored Items -->
                        <p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">${t("documentationTrackerEmptyShort")}</p>
                    </div>
                    <button class="v2-btn v2-btn-sm v2-btn-primary" id="v2-btn-doc-tracker-add">
                        ${t("documentationTrackerAddRelease")}
                    </button>
                </div>
            </div>
        `},getBackupTabHtml(){return`
            <div class="v2-settings-panel" id="v2-panel-backup" hidden>
                <h2>${t("settingsTabBackup")}</h2>
                
                <div class="v2-settings-card">
                    <h3><span class="icon">cloud_sync</span> ${t("settingsBackupAutomatedHeading")}</h3>
                    <div class="v2-form-group">
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${t("checkboxAutoBackupList")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-auto-backup">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${t("labelBackupRetention")}</label>
                        <input type="number" class="v2-input" id="v2-settings-backup-retention" min="1" max="50" style="max-width: 120px;">
                    </div>
                    <!-- Compare Versions (Diff) -->
                    <div style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-backup-diff">
                            <span class="icon">compare_arrows</span>
                            ${t("buttonCompareVersions")}
                        </button>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">save</span> ${t("settingsBackupManualHeading")}</h3>
                    <div class="v2-form-row-inline">
                        <button class="v2-btn v2-btn-primary" id="v2-btn-backup">
                            <span class="icon">download</span>
                            ${t("buttonDownloadBackup")}
                        </button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-restore">
                            <span class="icon">upload</span>
                            ${t("buttonRestore")}
                        </button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-restore-rehearsal">
                            <span class="icon">science</span>
                            ${t("buttonRestoreRehearsal")}
                        </button>
                    </div>
                </div>

                <div class="v2-settings-card" style="border-color: var(--v2-status-error);">
                    <h3 style="color: var(--v2-status-error);"><span class="icon">warning</span> ${t("settingsBackupDangerHeading")}</h3>
                    <p>${t("settingsFactoryResetHelp")}</p>
                    <button class="v2-btn v2-btn-danger" id="v2-btn-factory-reset">
                        <span class="icon">delete_forever</span>
                        ${t("buttonFactoryReset")}
                    </button>
                </div>
            </div>
        `},getBackupDiffModalHtml(){return`
            <div class="v2-modal-backdrop" id="v2-backup-diff-modal" style="display: none;">
                <div class="v2-modal" role="dialog" aria-modal="true" style="max-width: 700px; width: 90%; max-height: 90vh; display: flex; flex-direction: column;">
                    <div class="v2-modal-header">
                        <h3>${t("backupDiffModalTitle")}</h3>
                        <button class="v2-btn-icon" data-action="close-diff">close</button>
                    </div>
                    <div class="v2-modal-content" style="overflow-y: auto;">
                        <p style="color: var(--v2-text-secondary); margin-bottom: 1.5rem;">
                            ${t("backupDiffModalSubtitle")}
                        </p>
                        
                        <div class="v2-form-grid">
                            <div class="v2-form-group">
                                <label class="v2-label">${t("labelBaselineVersion")}</label>
                                <select class="v2-select" id="v2-diff-primary"></select>
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-label">${t("labelComparisonVersion")}</label>
                                <select class="v2-select" id="v2-diff-secondary"></select>
                            </div>
                        </div>

                        <div id="v2-diff-summary" style="margin: 1rem 0; font-weight: 500;"></div>

                        <!-- Diff List Mirror -->
                        <div class="v2-diff-list-container" style="border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-sm); padding: 0.5rem; min-height: 100px; max-height: 300px; overflow-y: auto;">
                            <ul id="v2-diff-list" style="list-style: none; padding: 0; margin: 0;"></ul>
                            <p id="v2-diff-empty" style="text-align: center; color: var(--v2-text-muted); padding: 2rem;">
                                ${t("backupDiffEmptyState")}
                            </p>
                        </div>

                        <div class="v2-form-group" style="margin-top: 1rem;">
                            <label class="v2-label">${t("labelIncidentNotes")}</label>
                            <textarea class="v2-textarea" id="v2-diff-notes" rows="3" placeholder="${t("placeholderIncidentNotes")}"></textarea>
                        </div>
                    </div>
                    <div class="v2-modal-footer">
                        <button class="v2-btn v2-btn-secondary" data-action="close-diff">${t("buttonClose")}</button>
                        <button class="v2-btn v2-btn-primary" id="v2-btn-diff-export">${t("buttonExportLog")}</button>
                    </div>
                </div>
            </div>
        `},getDataTabHtml(){return`
            <div class="v2-settings-panel" id="v2-panel-data" hidden>
                <h2>${t("settingsTabData")}</h2>
                
                <div class="v2-settings-card">
                    <h3><span class="icon">storage</span> ${t("settingsDataStorageStatusHeading")}</h3>
                    <div class="v2-key-value-list">
                         <div class="v2-kv-item">
                            <span class="v2-kv-label">${t("labelLatestProjectSave")}</span>
                            <span class="v2-kv-value" id="v2-status-last-project">---</span>
                        </div>
                        <div class="v2-kv-item">
                            <span class="v2-kv-label">${t("labelLatestAutoBackup")}</span>
                            <span class="v2-kv-value" id="v2-status-last-auto">---</span>
                        </div>
                         <div class="v2-kv-item">
                            <span class="v2-kv-label">${t("labelLatestFullBackup")}</span>
                            <span class="v2-kv-value" id="v2-status-last-full">---</span>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">sd_storage</span> ${t("settingsDataPersistenceHeading")}</h3>
                    <p>${t("textManageLocalData")}</p>
                    <div class="v2-form-row-inline" style="margin-bottom: 1rem;">
                        <button class="v2-btn v2-btn-primary" id="v2-btn-data-backup">
                            <span class="icon">download</span>
                            ${t("buttonDownloadFullBackup")}
                        </button>
                    </div>
                    <p>${t("textRequestPersistence")}</p>
                    <button class="v2-btn v2-btn-secondary" id="v2-btn-storage-persist">
                        ${t("buttonRequestPersistence")}
                    </button>
                    <p id="v2-status-persistence" style="margin-top: 0.5rem; color: var(--v2-text-secondary); font-size: 0.9rem;">
                        ${t("statusCheckingPersistence")}
                    </p>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">terminal</span> ${t("settingsDataLoggingHeading")}</h3>
                    <div class="v2-form-grid">
                        <div class="v2-form-group">
                            <label class="v2-label">${t("labelLogLevel")}</label>
                            <select class="v2-select" id="v2-settings-log-level">
                                <option value="all">${t("optionLogLevelAll")}</option>
                                <option value="info">${t("optionLogLevelInfo")}</option>
                                <option value="warn">${t("optionLogLevelWarn")}</option>
                                <option value="error">${t("optionLogLevelError")}</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${t("labelHistoryLimit")}</label>
                            <input type="number" class="v2-input" id="v2-settings-log-history" min="50" max="2000" step="50">
                        </div>
                         <div class="v2-form-group" style="grid-column: span 2;">
                            <label class="v2-label">${t("labelNamespaceFilter")}</label>
                            <input type="search" class="v2-input" id="v2-settings-log-filter" placeholder="e.g. storage, backup">
                        </div>
                    </div>
                    <div class="v2-checkbox-group" style="margin-top: 1rem;">
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${t("checkboxMirrorConsole")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-log-console">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${t("checkboxCaptureConsole")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-log-capture">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${t("checkboxCaptureGlobalErrors")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-log-errors">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${t("checkboxPersistSession")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-log-persist">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                    
                    <!-- Log Viewer Mirror -->
                    <div class="v2-log-viewer" style="margin-top: 1rem; border: 1px solid var(--v2-border-default); background: var(--v2-surface-muted); height: 200px; overflow-y: auto; padding: 0.5rem; font-family: monospace; font-size: 0.85rem; border-radius: var(--v2-radius-sm);">
                        <ol id="v2-log-history-list" style="margin: 0; padding-left: 1.5rem;">
                            <!-- Mirrored Items -->
                        </ol>
                         <p id="v2-log-empty" style="text-align: center; color: var(--v2-text-muted); display: none;">${t("textNoLogEntries")}</p>
                    </div>

                    <div class="v2-form-row" style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-export-log">${t("buttonExportLog")}</button>
                    </div>
                </div>
            </div>
        `},getAboutTabHtml(){const s=document.getElementById("aboutVersion")?.textContent||"v2.0";return`
            <div class="v2-settings-panel" id="v2-panel-about" hidden>
                <h2>${t("settingsTabAbout")}</h2>
                <div class="v2-settings-card">
                    <h3><span class="icon">info</span> ${t("appTitle")}</h3>
                    <p class="v2-text-lead" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${s}</p>
                    <p>${t("appCreator")}</p>
                    
                    <div class="v2-form-row-inline" style="margin-top: 1.5rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-support">${t("buttonSupport")}</button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-bug">${t("buttonReportBug")}</button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-feature">${t("buttonSuggestFeature")}</button>
                    </div>
                </div>
            </div>
        `},getRehearsalModalHtml(){return`
            <div class="v2-modal-backdrop" id="v2-rehearsal-modal" style="display: none;">
                <div class="v2-modal" role="dialog" aria-modal="true" style="max-width: 600px; width: 90%;">
                    <div class="v2-modal-header">
                        <h3>${t("buttonRestoreRehearsal")}</h3>
                        <button class="v2-btn-icon" data-action="close-rehearsal">close</button>
                    </div>
                    <div class="v2-modal-content">
                        <p style="color: var(--v2-text-secondary); margin-bottom: 1.5rem;">
                            ${t("rehearsalModalSubtitle")}
                        </p>

                        <!-- Source Selection -->
                        <div class="v2-form-group">
                            <label class="v2-label">${t("rehearsalModalSourceLabel")}</label>
                            <div class="v2-radio-group" id="v2-rehearsal-mode-group">
                                <label class="v2-radio-label">
                                    <input type="radio" class="v2-radio" name="v2RehearsalMode" value="backup" checked>
                                    ${t("rehearsalModalSourceBackup")}
                                </label>
                                <label class="v2-radio-label">
                                    <input type="radio" class="v2-radio" name="v2RehearsalMode" value="project">
                                    ${t("rehearsalModalSourceProject")}
                                </label>
                            </div>
                        </div>

                        <!-- File Input -->
                        <div class="v2-form-group" style="margin-top: 1.5rem;">
                            <label class="v2-label">${t("labelSelectFile")}</label>
                            <div style="display: flex; gap: 1rem; align-items: center;">
                                <button class="v2-btn v2-btn-secondary" id="v2-rehearsal-browse-btn">
                                    <span class="icon">folder_open</span>
                                    ${t("buttonChooseFile")}
                                </button>
                                <span id="v2-rehearsal-filename" style="color: var(--v2-text-secondary); font-style: italic;">${t("labelNoFileSelected")}</span>
                            </div>
                        </div>

                        <!-- Legacy Status Mirror -->
                        <div id="v2-rehearsal-status" style="margin-top: 1rem; font-weight: 500;"></div>

                        <!-- Table Mirror -->
                        <div style="margin-top: 1.5rem; border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-md); overflow: hidden;">
                            <table class="v2-table" style="width: 100%;">
                                <thead style="background: var(--v2-surface-muted);">
                                    <tr>
                                        <th style="padding: 0.75rem; text-align: left;">${t("tableHeaderData")}</th>
                                        <th style="padding: 0.75rem; text-align: left;">${t("tableHeaderDifference")}</th>
                                    </tr>
                                </thead>
                                <tbody id="v2-rehearsal-table-body">
                                    <!-- Mirrored rows will go here -->
                                    <tr><td colspan="2" style="padding: 1rem; text-align: center; color: var(--v2-text-muted);">Load a file to compare...</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="v2-modal-footer" style="margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
                            <!-- Abort is effectively Close, triggers restoreRehearsalAbort -->
                            <button class="v2-btn v2-btn-secondary" id="v2-rehearsal-abort-btn">Abort Rehearsal</button>
                            <button class="v2-btn v2-btn-primary" id="v2-rehearsal-proceed-btn">Resume Restore</button>
                        </div>
                    </div>
                </div>
            </div>
        `},attachListeners(){const s=this.container.querySelectorAll(".v2-tab-btn"),a=this.container.querySelectorAll(".v2-settings-panel");s.forEach(u=>{u.addEventListener("click",()=>{s.forEach(d=>{d.classList.remove("active"),d.setAttribute("aria-selected","false")}),a.forEach(d=>d.hidden=!0),u.classList.add("active"),u.setAttribute("aria-selected","true");const y=`v2-panel-${u.dataset.tab}`,v=document.getElementById(y);v&&(v.hidden=!1)})}),o.forEach(u=>{const y=document.getElementById(u.v2);if(!y)return;const v=document.getElementById(u.legacy);if(!v){console.warn(`[SettingsView] Legacy element '${u.legacy}' not found.`);return}y.addEventListener("change",d=>{if(u.type==="checkbox"?v.checked=d.target.checked:v.value=d.target.value,v.dispatchEvent(new Event("change",{bubbles:!0})),v.dispatchEvent(new Event("input",{bubbles:!0})),["settingsLanguage","settingsTemperatureUnit","settingsFocusScale","settingsFontSize","settingsFontFamily","mountVoltageVHigh","mountVoltageVLow","mountVoltageGoldHigh","mountVoltageGoldLow","mountVoltageBHigh","mountVoltageBLow"].includes(u.legacy)){const p=document.getElementById("settingsSave");p&&p.click()}})});const r=document.getElementById("settingsLogo");r&&r.addEventListener("change",()=>{const u=document.getElementById("settingsSave");u&&u.click()});const l=(u,y)=>{const v=document.getElementById(u),d=document.getElementById(y);v&&d&&v.addEventListener("click",()=>d.click())};l("v2-btn-reset-accent","accentColorReset"),l("v2-btn-reset-voltages","mountVoltageReset"),l("v2-btn-backup","backupSettings"),l("v2-btn-restore","restoreSettings"),l("v2-btn-factory-reset","factoryResetButton"),l("v2-btn-data-backup","storageBackupNow"),l("v2-btn-storage-persist","storagePersistenceRequest"),l("v2-btn-export-log","loggingExportBtn"),l("v2-btn-support","supportLink"),l("v2-btn-bug","reportBugLink"),l("v2-btn-feature","suggestFeatureLink"),l("v2-btn-local-font","localFontsButton"),l("v2-btn-branding-upload","settingsLogo"),l("v2-btn-doc-tracker-add","documentationTrackerAddRelease");const c=document.getElementById("v2-btn-backup-diff");c&&c.addEventListener("click",()=>{const u=document.getElementById("v2-backup-diff-modal");u&&(u.style.display="flex");const y=document.getElementById("backupDiffToggleButton");y&&y.click()}),this.container.querySelectorAll('[data-action="close-diff"]').forEach(u=>{u.addEventListener("click",()=>{const y=document.getElementById("v2-backup-diff-modal");y&&(y.style.display="none");const v=document.getElementById("backupDiffToggleButton");v&&v.click()})});const b=document.getElementById("v2-btn-restore-rehearsal"),E=document.getElementById("v2-rehearsal-modal"),f=this.container.querySelectorAll('[data-action="close-rehearsal"]');b&&E&&b.addEventListener("click",()=>{const u=document.getElementById("restoreRehearsalButton");u&&u.click(),E.style.display="flex"}),f.forEach(u=>{u.addEventListener("click",()=>{E&&(E.style.display="none");const y=document.getElementById("restoreRehearsalClose");y&&y.click()})})},syncFromLegacy(){o.forEach(s=>{const a=document.getElementById(s.v2),r=document.getElementById(s.legacy);a&&r&&(s.type==="checkbox"?a.checked=r.checked:(s.type==="value"||s.type==="color")&&(a.value=r.value))})},initStatusObservers(){const s=[{legacyId:"storageStatusLastProjectValue",v2Id:"v2-status-last-project"},{legacyId:"storageStatusLastAutoBackupValue",v2Id:"v2-status-last-auto"},{legacyId:"storageStatusLastFullBackupValue",v2Id:"v2-status-last-full"},{legacyId:"storagePersistenceStatus",v2Id:"v2-status-persistence"}],a=new MutationObserver(()=>{s.forEach(f=>{const u=document.getElementById(f.legacyId),y=document.getElementById(f.v2Id);u&&y&&(y.textContent=u.textContent)})});s.forEach(f=>{const u=document.getElementById(f.legacyId);if(u){a.observe(u,{childList:!0,characterData:!0,subtree:!0});const y=document.getElementById(f.v2Id);y&&(y.textContent=u.textContent)}});const r=[{legacyId:"localFontsStatus",v2Id:"v2-status-local-font"}],l=new MutationObserver(()=>{r.forEach(f=>{const u=document.getElementById(f.legacyId),y=document.getElementById(f.v2Id);u&&y&&(y.textContent=u.textContent)})});r.forEach(f=>{const u=document.getElementById(f.legacyId);u&&l.observe(u,{childList:!0,characterData:!0,subtree:!0})});const c=document.getElementById("settingsLogoPreview"),h=document.getElementById("v2-branding-preview");c&&h&&(new MutationObserver(()=>{if(c.hidden||c.innerHTML.trim()==="")h.innerHTML='<span style="color: var(--v2-text-muted);">No custom logo set</span>';else{h.innerHTML=c.innerHTML;const u=h.querySelector("img, svg");u&&(u.style.maxWidth="100%",u.style.height="auto")}}).observe(c,{childList:!0,attributes:!0,subtree:!0}),!c.hidden&&c.innerHTML.trim()!==""&&(h.innerHTML=c.innerHTML));const b=document.getElementById("documentationTrackerList"),E=document.getElementById("v2-doc-tracker-list");b&&E&&new MutationObserver(()=>{b.children.length===0?E.innerHTML='<p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">No releases tracked.</p>':(E.innerHTML="",Array.from(b.children).forEach(u=>{const y=u.cloneNode(!0);y.style.padding="0.5rem",y.style.borderBottom="1px solid var(--v2-border-subtle)",E.appendChild(y)}))}).observe(b,{childList:!0,subtree:!0})},initTabs(){const s=this.container.querySelector(".v2-tab-btn.active");if(s){const a=`v2-panel-${s.dataset.tab}`,r=document.getElementById(a);r&&(r.hidden=!1)}},initRehearsalSync(){const s=document.querySelectorAll('input[name="v2RehearsalMode"]'),a=document.getElementsByName("restoreRehearsalMode");s.forEach(v=>{v.addEventListener("change",()=>{a.forEach(d=>{d.value===v.value&&(d.checked=!0,d.dispatchEvent(new Event("change",{bubbles:!0})))})})});const r=document.getElementById("v2-rehearsal-browse-btn"),l=document.getElementById("restoreRehearsalBrowse");r&&l&&r.addEventListener("click",()=>l.click());const c=document.getElementById("v2-rehearsal-proceed-btn"),h=document.getElementById("v2-rehearsal-abort-btn");c&&c.addEventListener("click",()=>{const v=document.getElementById("restoreRehearsalProceed");v&&v.click(),document.getElementById("v2-rehearsal-modal").style.display="none"}),h&&h.addEventListener("click",()=>{const v=document.getElementById("restoreRehearsalAbort");v&&v.click()});const b=document.getElementById("restoreRehearsalTableBody"),E=document.getElementById("v2-rehearsal-table-body"),f=document.getElementById("restoreRehearsalFileName"),u=document.getElementById("v2-rehearsal-filename"),y=document.getElementById("restoreRehearsalProceed");b&&E&&(new MutationObserver(()=>{E.innerHTML="",Array.from(b.children).forEach(d=>{const m=d.querySelectorAll("td");if(m.length>=4){const p=m[0].textContent,w=m[3].innerHTML,S=document.createElement("tr");S.innerHTML=`
                            <td style="padding: 0.75rem;"><strong>${p}</strong></td>
                            <td style="padding: 0.75rem;">${w}</td>
                        `,E.appendChild(S)}}),c&&y&&(c.disabled=y.disabled,y.style.display==="none"?c.style.display="none":c.style.display="inline-block")}).observe(b,{childList:!0,subtree:!0}),y&&(new MutationObserver(()=>{c&&(c.disabled=y.disabled,y.style.display==="none"?c.style.display="none":c.style.display="inline-block")}).observe(y,{attributes:!0}),c&&(c.disabled=y.disabled,y.style.display==="none"?c.style.display="none":c.style.display="inline-block"))),f&&u&&new MutationObserver(()=>{u.textContent=f.textContent}).observe(f,{childList:!0,characterData:!0,subtree:!0})},initBackupDiffSync(){const s=document.getElementById("v2-diff-primary"),a=document.getElementById("v2-diff-secondary"),r=document.getElementById("backupDiffPrimary"),l=document.getElementById("backupDiffSecondary"),c=()=>{s&&r&&(s.innerHTML=r.innerHTML,s.value=r.value),a&&l&&(a.innerHTML=l.innerHTML,a.value=l.value)};if(c(),r&&l){const m=new MutationObserver(c);m.observe(r,{childList:!0}),m.observe(l,{childList:!0})}s&&s.addEventListener("change",()=>{r&&(r.value=s.value,r.dispatchEvent(new Event("change",{bubbles:!0})))}),a&&a.addEventListener("change",()=>{l&&(l.value=a.value,l.dispatchEvent(new Event("change",{bubbles:!0})))});const h=document.getElementById("backupDiffSummary"),b=document.getElementById("v2-diff-summary");h&&b&&new MutationObserver(()=>{b.innerHTML=h.innerHTML}).observe(h,{childList:!0,subtree:!0});const E=document.getElementById("backupDiffList"),f=document.getElementById("v2-diff-list");E&&f&&new MutationObserver(()=>{f.innerHTML=E.innerHTML,Array.from(f.querySelectorAll("li")).forEach(p=>{p.style.padding="0.5rem",p.style.borderBottom="1px solid var(--v2-border-subtle)"})}).observe(E,{childList:!0,subtree:!0});const u=document.getElementById("v2-btn-diff-export"),y=document.getElementById("backupDiffExport");u&&y&&u.addEventListener("click",()=>y.click());const v=document.getElementById("v2-diff-notes"),d=document.getElementById("backupDiffNotes");v&&d&&(v.value=d.value,v.addEventListener("input",()=>{d.value=v.value,d.dispatchEvent(new Event("input",{bubbles:!0}))}),new MutationObserver(()=>{document.activeElement!==v&&(v.value=d.value)}).observe(d,{attributes:!0,attributeFilter:["value"]}),d.addEventListener("input",()=>{document.activeElement!==v&&(v.value=d.value)}))},initLogViewerSync(){const s=document.getElementById("loggingHistory"),a=document.getElementById("v2-log-history-list");s&&a&&(new MutationObserver(()=>{a.innerHTML=s.innerHTML,Array.from(a.querySelectorAll("li")).forEach(l=>{l.style.padding="0.25rem 0",l.style.borderBottom="1px dashed var(--v2-border-subtle)"})}).observe(s,{childList:!0,subtree:!0}),a.innerHTML=s.innerHTML)}};typeof window<"u"&&(window.cineSettingsView=i)})();const Ro=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="view-own-gear";let t=!1;function o(a){return typeof a!="string"?"":a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function i(a){if(typeof window<"u"&&window.texts){const r=document.getElementById("languageSelect"),l=r&&r.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",c=window.texts[l]||window.texts.en;if(c)return a.split(".").reduce((h,b)=>h?h[b]:null,c)||a}return a}const s={container:null,init(){try{this.container=document.getElementById(n),this.container||this.createViewContainer(),t||(console.log("[OwnGearView] Initializing..."),document.addEventListener("v2:viewchange",a=>{a.detail&&a.detail.view==="ownGear"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),t=!0,console.log("[OwnGearView] Initialized"))}catch(a){console.error("[OwnGearView] Init failed:",a)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const a=document.querySelector(".v2-main")||document.querySelector(".v2-app")||document.body,r=document.createElement("section");r.id=n,r.className="app-view",a.appendChild(r),this.container=r},render(){try{if(!this.container&&(this.init(),!this.container))return;const a=e.cineFeaturesOwnGear;if(!a){this.container.innerHTML=`
                        <div class="v2-empty-state">
                            <p>${i("statusUnavailable")||"Module not available"}</p>
                        </div>
                    `;return}const r=a.loadStoredOwnGearItems(),l=`
                    <header class="view-header">
                        <div class="header-content">
                            <h1>${i("ownGearViewTitle")}</h1>
                            <p class="header-subtitle">${i("ownGearViewSubtitle")}</p>
                        </div>
                        <div class="view-header-actions">
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear">
                                <span class="icon">add</span>
                                <span>${i("buttonAddGearItem")}</span>
                            </button>
                        </div>
                    </header>
                `;let c='<div class="view-content">';!r||r.length===0?c+=`
                        <div class="own-gear-empty-state">
                            <span class="icon">inventory_2</span>
                            <h3>${i("ownGearEmptyTitle")}</h3>
                            <p>${i("ownGearEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear-empty">
                                ${i("buttonAddFirstGearItem")}
                            </button>
                        </div>
                    `:(c+='<div class="own-gear-list">',r.forEach(h=>{c+=this.renderItemRow(h)}),c+="</div>"),c+="</div>",this.container.innerHTML=l+c,this.attachListeners()}catch(a){console.error("[OwnGearView] Render failed",a),this.container&&(this.container.innerHTML=`<div class="v2-error-state"><p>Error loading view: ${a.message}</p></div>`)}},renderItemRow(a){return`
                <div class="own-gear-item-card" data-item-id="${o(a.id)}">
                    <div class="own-gear-item-info">
                        <div class="own-gear-item-name">${o(a.name)}</div>
                        ${a.notes?`<div class="own-gear-item-notes">${o(a.notes)}</div>`:""}
                    </div>
                     <div class="own-gear-item-meta">
                        ${a.quantity?`<span class="own-gear-badge qty-badge">${i("labelQtyPrefix")}${o(a.quantity)}</span>`:""}
                        ${a.source?`<span class="own-gear-badge source-badge">${i("labelSourcePrefix")}${o(a.source)}</span>`:""}
                    </div>
                    <div class="own-gear-item-actions">
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-own-gear" title="${i("buttonEdit")}" data-id="${o(a.id)}">
                            <span class="icon">edit</span>
                        </button>
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-own-gear" title="${i("buttonDelete")}" data-id="${o(a.id)}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                </div>
            `},attachListeners(){const a=this.container.querySelector("#btn-add-own-gear"),r=this.container.querySelector("#btn-add-own-gear-empty");a&&(a.onclick=()=>this.showEditModal(null)),r&&(r.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".btn-edit-own-gear").forEach(l=>{l.onclick=c=>{c.stopPropagation();const h=c.currentTarget.dataset.id;h&&this.showEditModal(h)}}),this.container.querySelectorAll(".btn-delete-own-gear").forEach(l=>{l.onclick=c=>{c.stopPropagation();const h=c.currentTarget.dataset.id;h&&confirm(i("confirmDeleteGearItem"))&&this.deleteItem(h)}})},deleteItem(a){const r=e.cineFeaturesOwnGear;if(!r)return;const c=r.loadStoredOwnGearItems().filter(h=>h.id!==a);r.persistOwnGearItems(c)?this.render():alert(i("alertSaveItemFailed"))},showEditModal(a){const r=e.cineFeaturesOwnGear;if(!r)return;let l={},c=!0;if(a){const y=r.loadStoredOwnGearItems().find(v=>v.id===a);y&&(l={...y},c=!1)}c&&(l={name:"",quantity:"",notes:"",source:""});const h=document.querySelector(".v2-modal-backdrop");h&&h.remove();const b=document.createElement("div");b.className="v2-modal-backdrop",b.innerHTML=`
                <div class="v2-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${i(c?"modalTitleNewGearItem":"modalTitleEditGearItem")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body own-gear-modal-body">
                        
                        <div class="v2-form-group">
                            <label class="v2-label">${i("labelItemName")}</label>
                            <input type="text" id="ownGearName" class="v2-input" value="${o(l.name)}" placeholder="${i("placeholderGearName")}" required>
                        </div>

                         <div class="v2-form-group">
                            <label class="v2-label">${i("labelQuantity")}</label>
                            <input type="number" id="ownGearQuantity" class="v2-input" value="${o(l.quantity)}" placeholder="${i("placeholderGearQty")}">
                        </div>

                        <div class="v2-form-group">
                            <label class="v2-label">${i("labelNotes")}</label>
                            <textarea id="ownGearNotes" class="v2-input" rows="3" placeholder="${i("placeholderGearNotes")}">${o(l.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-own-gear">${i("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-own-gear">${i("buttonSaveGearItem")}</button>
                    </div>
                </div>
            `,document.body.appendChild(b),requestAnimationFrame(()=>b.classList.add("open"));const E=()=>{b.classList.remove("open"),setTimeout(()=>b.remove(),200)},f=b.querySelector("#ownGearName");f.focus(),b.querySelector(".v2-modal-close").onclick=E,b.querySelector("#btn-cancel-own-gear").onclick=E,b.querySelector("#btn-save-own-gear").onclick=()=>{const u=f.value.trim();if(!u){alert(i("alertEnterName"));return}const y={id:a||void 0,name:u,quantity:b.querySelector("#ownGearQuantity").value.trim(),notes:b.querySelector("#ownGearNotes").value.trim()},v=r.loadStoredOwnGearItems();let d;if(c?d=r.normalizeOwnGearRecord(y):d=r.normalizeOwnGearRecord({...l,...y}),!d){alert(i("alertInvalidItemData"));return}let m;c?m=[...v,d]:m=v.map(p=>p.id===a?d:p),r.persistOwnGearItems(m)?(this.render(),E()):alert(i("alertSaveItemFailed"))}}};e.cineOwnGearView=s})(typeof window<"u"?window:void 0);const Ho=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n=[{id:"v2-welcome",title:"Welcome to V2",keywords:"v2 new interface update overview navigation sidebar",icon:"✨",content:`
                <p>Welcome to the new Cine Power Planner V2 interface! We've redesigned the experience to be faster, more intuitive, and fully responsive.</p>
                
                <h4>Key Improvements</h4>
                <ul>
                    <li><strong>New Sidebar Navigation:</strong> Quickly access Projects, Tools, and Settings from the dedicated sidebar. Mobile users can access this via the menu button in the header.</li>
                    <li><strong>Enhanced Visuals:</strong> A modern, clean look with improved Dark Mode and Pink Mode support.</li>
                    <li><strong>Better Performance:</strong> Faster loading times and smoother transitions between views.</li>
                </ul>

                <h4>Getting Around</h4>
                <p>The sidebar is your main control center:</p>
                <ul>
                    <li><strong>Projects:</strong> View and manage all your power plans. Filter by Active or Archive.</li>
                    <li><strong>Tools:</strong> Access the Device Library, Contacts, and Auto Gear Rules.</li>
                    <li><strong>Settings:</strong> Configure app preferences, backup data, and manage storage.</li>
                </ul>
            `},{id:"v2-projects",title:"Managing Projects",keywords:"projects create new delete archive filter active dashboard",icon:"📁",content:`
                <p>The Projects Dashboard is where your work begins.</p>
                
                <h4>Creating a Project</h4>
                <p>Click the <strong>+ New Project</strong> button in the top right to start a fresh plan. You'll be prompted to enter a name and optional details.</p>

                <h4>Project Status & Filtering</h4>
                <p>Use the sidebar to filter your projects:</p>
                <ul>
                    <li><strong>All Projects:</strong> Everything you've created.</li>
                    <li><strong>Active Projects:</strong> Projects you are currently working on.</li>
                    <li><strong>Archive:</strong> Completed or on-hold projects. You can archive a project from its context menu.</li>
                </ul>

                <h4>Project Actions</h4>
                <p>Right-click (or long-press on touch devices) on any project tile to access the context menu:</p>
                <ul>
                    <li><strong>Rename:</strong> Change the project details.</li>
                    <li><strong>Duplicate:</strong> Create an exact copy of a project.</li>
                    <li><strong>Archive/Unarchive:</strong> Move the project to or from the archive.</li>
                    <li><strong>Delete:</strong> Permanently remove the project.</li>
                </ul>
            `},{id:"v2-device-library",title:"Device Library",keywords:"devices library equipment custom gear add edit database",icon:"📷",content:`
                <p>The Device Library allows you to manage the equipment available for your power plans.</p>

                <h4>Browsing Devices</h4>
                <p>Devices are organized by category (Cameras, Monitors, etc.). Use the tabs or dropdowns to switch between categories. You can also use the search bar to find specific gear instantly.</p>

                <h4>Adding Custom Gear</h4>
                <p>Can't find your equipment? Click <strong>Add Device</strong> to create a custom entry. You'll need to specify:</p>
                <ul>
                    <li><strong>Name:</strong> The model name.</li>
                    <li><strong>Power Draw:</strong> Typical power consumption in Watts (W).</li>
                    <li><strong>Voltage:</strong> Operating voltage range (optional but recommended).</li>
                </ul>
                <p>Once added, custom devices are available for all your projects.</p>
            `},{id:"v2-contacts",title:"Contacts",keywords:"contacts people crew rental houses list",icon:"👥",content:`
                <p>Keep track of rental houses, crew members, and clients directly in the app.</p>

                <h4>Managing Contacts</h4>
                <ul>
                    <li><strong>Add Contact:</strong> Click the <strong>New Contact</strong> button to add details like Name, Role, Phone, and Email.</li>
                    <li><strong>Edit/Delete:</strong> Use the action buttons on each contact card to update or remove information.</li>
                </ul>
                <p>Contacts can be assigned to projects for quick reference (coming soon to project details).</p>
            `},{id:"v2-settings",title:"Settings & Data",keywords:"settings preferences backup restore data storage theme language",icon:"⚙️",content:`
                <p>Customize your experience and keep your data safe.</p>

                <h4>Data Management</h4>
                <ul>
                    <li><strong>Backup:</strong> Download a full backup of all your projects and custom devices. We recommend doing this regularly.</li>
                    <li><strong>Restore:</strong> Load a previously saved backup file. <em>Note: This replaces current data.</em></li>
                    <li><strong>Auto-Backups:</strong> Enable automatic snapshots to protect against accidental data loss.</li>
                </ul>

                <h4>Preferences</h4>
                <ul>
                    <li><strong>Units:</strong> Toggle between Metric and Imperial measurements (if applicable).</li>
                    <li><strong>Theme:</strong> Force Dark Mode, Light Mode, or the special Pink Mode.</li>
                </ul>
            `},{id:"v2-auto-gear",title:"Auto Gear Rules",keywords:"auto gear rules automation kit list scenarios production requirements",icon:"🤖",content:`
                <p>Automate your kit list generation with smart rules based on production scenarios.</p>

                <h4>How it Works</h4>
                <p>Auto Gear Rules monitor your project's <strong>Production Requirements</strong> (e.g., "Handheld", "Studio", "Car Rig") and automatically add or remove specific items from your kit list.</p>

                <h4>Creating Rules</h4>
                <p>Go to the <strong>Auto Gear Rules</strong> tool and click <strong>Add Rule</strong>. You can define:</p>
                <ul>
                    <li><strong>Conditions:</strong> Triggers based on scenarios, camera models, or other gear selections.</li>
                    <li><strong>Actions:</strong> Items to <strong>Add</strong> (e.g., "Shoulder Pad" for "Handheld") or <strong>Remove</strong>.</li>
                </ul>

                <h4>Presets</h4>
                <p>Save your favorite rule sets as <strong>Presets</strong> to quickly switch between different production styles (e.g., "Narrative Feature" vs "Commercial").</p>
            `},{id:"v2-print-export",title:"Printing & Exporting",keywords:"print pdf export share report kit list diagram",icon:"🖨️",content:`
                <p>Share your power plans with your team or rental house.</p>

                <h4>Project Overview</h4>
                <p>From the Project Detail view, use the <strong>Print / Export PDF</strong> button to generate a clean summary of your project, including power totals and battery estimates.</p>
                
                <h4>Kit List</h4>
                <p>Generate a dedicated equipment list for quotes and prep. You can filter by department and customize columns before printing.</p>

                <h4>Power Diagram</h4>
                <p>Need a visual aid? Export the <strong>Connection Diagram</strong> as an image (PNG/JPG) or SVG to include in your tech pack.</p>

                <h4>PDF Tips</h4>
                <p>To save as a PDF, click "Print" and select <strong>"Save as PDF"</strong> as your destination in the print dialog.</p>
            `}],t=[{id:"v2-quick-start",title:"Quick Start Checklist",keywords:"quickstart onboarding tutorial first steps workflow basics getting started new project guide",icon:"🚀",content:`
                <p>Welcome to Cine Power Planner! Follow these steps to get your first project ready.</p>
                <ol>
                    <li>
                        <strong>Start Guided Tutorial:</strong>
                        <button type="button" class="button-link help-onboarding-secondary" data-onboarding-tour-trigger="secondary">Start guided tutorial</button>
                        to walk through every workflow with offline progress tracking.
                    </li>
                    <li>
                        <strong>Name Your Project:</strong>
                        Enter a name in the <em>Project Name</em> field and click <strong>Save</strong> (or press <kbd>Enter</kbd>/<kbd>Ctrl</kbd>+<kbd>S</kbd>) to capture the current rig.
                    </li>
                    <li>
                        <strong>Configure Devices:</strong>
                        Walk through <em>Configure Devices</em>, check the <em>Power Summary</em>, and review the <em>Connection Diagram</em>.
                    </li>
                    <li>
                        <strong>Secure Your Data:</strong>
                        Download an <strong>Export Project</strong> JSON and a full-app <strong>Backup</strong> so you have two offline recovery copies.
                    </li>
                    <li>
                        <strong>Check Offline Status:</strong>
                        Confirm the offline indicator (in the header) glows before disconnecting.
                    </li>
                    <li>
                        <strong>Rehearse Restore:</strong>
                        Open <strong>Restore rehearsal</strong> in Settings to verify your backup in a sandbox environment.
                    </li>
                </ol>
                <p class="help-callout-note">
                    Tip: Keep backups on separate drives when travelling—<strong>Restore</strong> always creates a fresh safety copy so nothing is lost when you undo a change.
                </p>
            `},{id:"v2-data-safety",title:"Data Safety Essentials",keywords:"backup restore protect save export safety offline preserve",icon:"🛡️",content:`
                <p>Protect your work with these essential habits.</p>
                <ul>
                    <li>
                        <strong>Save Often:</strong> Press <strong>Save</strong> after meaningful tweaks. Manual saves are instant and work offline.
                    </li>
                    <li>
                        <strong>Enable Auto Backups:</strong> Turn on "Show auto backups in project list" in Settings to surface background snapshots.
                    </li>
                    <li>
                        <strong>Download Redundancy:</strong> Export your project and download a full Backup whenever you finish a milestone.
                    </li>
                    <li>
                        <strong>Store Safely:</strong> Keep exports on at least two devices.
                    </li>
                    <li>
                        <strong>Update Safely:</strong> Before approving an update, capture a fresh manual backup.
                    </li>
                </ul>
                <p class="help-callout-note">
                    Manual backups bundle a timestamped copy of every saved project, favorite, rule, and preference. Restores make a safety snapshot first.
                </p>
            `},{id:"v2-shortcuts",title:"Essential Shortcuts",keywords:"keyboard shortcuts hotkeys fast navigation",icon:"⌨️",content:`
                <ul>
                    <li><kbd>?</kbd>, <kbd>H</kbd>, <kbd>F1</kbd>: Open Help</li>
                    <li><kbd>Ctrl</kbd>+<kbd>/</kbd> (<kbd>⌘</kbd>+<kbd>/</kbd>): Toggle Help</li>
                    <li><kbd>/</kbd> or <kbd>Ctrl</kbd>+<kbd>F</kbd> (<kbd>⌘</kbd>+<kbd>F</kbd>): Help Search</li>
                    <li><kbd>Ctrl</kbd>+<kbd>K</kbd> (<kbd>⌘</kbd>+<kbd>K</kbd>): Global Feature Search</li>
                    <li><kbd>Ctrl</kbd>+<kbd>,</kbd> (<kbd>⌘</kbd>+<kbd>,</kbd>): Open Settings</li>
                    <li><kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>⌘</kbd>+<kbd>S</kbd>): Save Project</li>
                    <li><kbd>D</kbd>: Toggle Dark Mode</li>
                    <li><kbd>P</kbd>: Toggle Pink Mode</li>
                </ul>
            `},{id:"v2-features",title:"Features at a Glance",keywords:"overview capabilities highlights offline favorites search",icon:"🌟",content:`
                <ul>
                    <li><strong>Rig Planning:</strong> Configure cameras, monitors, and accessories in <em>Configure Devices</em>.</li>
                    <li><strong>Power Analysis:</strong> Review draw and runtime in <em>Power Summary</em>.</li>
                    <li><strong>Visual Diagram:</strong> Map connections with the interactive <em>Connection Diagram</em>.</li>
                    <li><strong>Battery Comparison:</strong> Compare runtimes and output limits.</li>
                    <li><strong>Device Library:</strong> Customize the database with your own gear.</li>
                    <li><strong>Contacts & Own Gear:</strong> Manage crew info and personal kits.</li>
                    <li><strong>Print & Export:</strong> Generate clean PDF summaries and kit lists.</li>
                    <li><strong>Offline Capable:</strong> Works fully without an internet connection.</li>
                    <li><strong>Customizable:</strong> Adjust themes (Dark, Light, Pink), fonts, and accent colors.</li>
                </ul>
            `}];n.push(...t),e.cineV2HelpData=n})(typeof window<"u"?window:void 0);const qo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n=e.cineV2HelpData||[];function t(){const r=["v2-quick-start","v2-shortcuts","v2-data-safety","v2-features"];return{essentials:n.filter(l=>r.includes(l.id)),guides:n.filter(l=>!r.includes(l.id))}}function o(r){return r?r.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>").split(/\n\n+/).map(c=>c.trim().startsWith("- ")?`<ul>${c.trim().split(/\n/).map(b=>`<li>${b.replace(/^- /,"")}</li>`).join("")}</ul>`:`<p>${c}</p>`).join(""):""}function i(){const r=e.cineCoreLocalization||e.cineModuleBase&&e.cineModuleBase.resolveLocalization&&e.cineModuleBase.resolveLocalization();if(!r||typeof r.getString!="function")return console.warn("[HelpService] Localization module not found. V1 topics unavailable."),[];const l=["projectManagement","saveShareBackup","deviceConfiguration","powerCalculation","connectionDiagram","gearList","contacts","ownGear","settings","offlineUse","troubleshooting","shortcuts","pinkMode"],c={projectManagement:"📂",saveShareBackup:"💾",deviceConfiguration:"⚙️",powerCalculation:"⚡",connectionDiagram:"🔌",gearList:"📋",contacts:"👥",ownGear:"📷",settings:"🛠️",offlineUse:"📡",troubleshooting:"❓",shortcuts:"⌨️",pinkMode:"🌸"};return l.map(h=>{const b=r.getString(`helpTopics.${h}.title`),E=r.getString(`helpTopics.${h}.content`);return b?{id:`v1-${h}`,category:"reference",title:b,keywords:"legacy reference v1",icon:c[h]||"📄",content:o(E)}:null}).filter(h=>h!==null)}function s(){const r=n,l=i();return[...r,...l]}function a(){const r=t();return{essentials:{title:"Essentials",items:r.essentials},guide:{title:"Guides",items:r.guides},reference:{title:"Topic Reference",items:i()}}}e.cineHelpService={getAllSections:s,getGroupedSections:a}})(typeof window<"u"?window:void 0);const Oo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="v2HelpToc",t="v2HelpContent",o="v2HelpSearch";let i=null,s=!1;function a(v){return document.getElementById(v)}function r(){const v=a(t);if(!v)return[];v.innerHTML="";const d=[],m=e.cineHelpService;if(!m)return v.innerHTML='<div class="v2-empty-state"><p>Help service unavailable.</p></div>',[];const p=m.getGroupedSections();if(p.guide&&p.guide.items.length>0&&l(v,p.guide.title,p.guide.items,d),p.guide&&p.guide.items.length>0&&p.reference&&p.reference.items.length>0){const S=document.createElement("hr");S.className="v2-help-divider",v.appendChild(S)}p.reference&&p.reference.items.length>0&&l(v,p.reference.title,p.reference.items,d);const w=document.createElement("div");return w.id="v2HelpNoResults",w.className="v2-help-no-results",w.style.display="none",w.innerHTML=`
            <div class="v2-help-no-results-content">
                <span class="v2-help-no-results-icon">🔍</span>
                <h3>No results found</h3>
                <p>Try adjusting your search terms.</p>
            </div>
        `,v.appendChild(w),d}function l(v,d,m,p){p.push({type:"header",title:d}),m.forEach(w=>{const S=document.createElement("section");S.className="v2-help-section",S.id=w.id,S.setAttribute("data-keywords",(w.keywords||"")+" "+(w.title||""));const $=document.createElement("h2");w.icon?$.innerHTML=`<span class="v2-help-icon">${w.icon}</span> ${w.title}`:$.textContent=w.title;const x=document.createElement("div");x.className="v2-help-content-body",x.innerHTML=w.content,S.appendChild($),S.appendChild(x),v.appendChild(S),p.push({type:"item",id:w.id,title:w.title,keywords:w.keywords,icon:w.icon})})}function c(v){const d=a(n);if(!d)return;d.innerHTML="";const m=document.createElement("ul");v.forEach(p=>{if(p.type==="header"){const w=document.createElement("li");w.className="v2-help-toc-header",w.textContent=p.title,m.appendChild(w)}else{const w=document.createElement("li"),S=document.createElement("a");S.href=`#${p.id}`,S.className="v2-help-toc-link",S.dataset.target=p.id,p.icon?S.innerHTML=`<span class="v2-toc-icon">${p.icon}</span> ${p.title}`:S.textContent=p.title,S.addEventListener("click",$=>{$.preventDefault();const x=document.getElementById(p.id);x&&x.scrollIntoView({behavior:"smooth"}),h(p.id)}),w.appendChild(S),m.appendChild(w)}}),d.appendChild(m)}function h(v){document.querySelectorAll(".v2-help-toc-link").forEach(d=>{d.dataset.target===v?d.classList.add("active"):d.classList.remove("active")})}function b(){i&&i.disconnect();const v={root:a(t),rootMargin:"-10% 0px -80% 0px",threshold:0},d=m=>{m.forEach(p=>{p.isIntersecting&&h(p.target.id)})};i=new IntersectionObserver(d,v),document.querySelectorAll(".v2-help-section").forEach(m=>{i.observe(m)})}function E(){const v=a(o);if(!v)return;const d=document.createElement("button");d.className="v2-help-search-clear",d.innerHTML="✕",d.style.display="none",d.ariaLabel="Clear search",v.parentNode.appendChild(d);function m(){const p=v.value.toLowerCase().trim(),w=document.querySelectorAll(".v2-help-section"),S=a("v2HelpNoResults");let $=!1;w.forEach(x=>{const K=x.innerText.toLowerCase(),R=(x.dataset.keywords||"").toLowerCase(),A=K.includes(p)||R.includes(p);x.style.display=A?"block":"none",A&&($=!0)}),document.querySelectorAll(".v2-help-divider").forEach(x=>{x.style.display=p?"none":"block"}),S&&(S.style.display=!$&&p?"flex":"none"),d.style.display=p.length>0?"block":"none"}v.addEventListener("input",m),d.addEventListener("click",()=>{v.value="",m(),v.focus()})}function f(){s||(console.log("[HelpView] Initializing..."),u(),E(),s=!0)}function u(){const v=r();v&&(c(v),setTimeout(()=>b(),100))}function y(){s||f()}e.cineHelpView={init:f,enter:y,refresh:u}})(typeof globalThis<"u"?globalThis:typeof window<"u"?window:void 0);const No=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Te="backups",en={init(){window.cineViewManager&&window.cineViewManager.registerView(Te,{onEnter:()=>this.render(),onLeave:()=>{}});const e=document.getElementById("navAutoBackups");e&&(e.style.display="flex")},async render(){document.getElementById("v2-main");let e=document.getElementById(`view-${Te}`);e||(e=document.createElement("section"),e.id=`view-${Te}`,e.className="app-view",e.innerHTML=`
                <header class="view-header">
                    <button class="v2-mobile-menu-toggle" aria-label="Open menu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <h1>Data Vault (Backups)</h1>
                </header>
                <div class="view-content">
                    <div class="v2-backup-list" id="backupList">
                        <div class="v2-empty-state">Loading backups...</div>
                    </div>
                </div>
            `,document.querySelector(".v2-main").appendChild(e));const n=e.querySelector("#backupList");n.innerHTML='<div class="v2-spinner"></div>';try{const t=await xe.listSnapshots();if(t.length===0){n.innerHTML=`
                    <div class="v2-empty-state">
                        <p>No backups found in the Vault.</p>
                        <p class="subtext">Backups are created automatically when you save projects.</p>
                    </div>`;return}let o='<ul class="v2-list">';for(const i of t){const s=i.replace(".json","").replace("snapshot_","");o+=`
                    <li class="v2-list-item">
                        <div class="v2-list-content">
                            <div class="v2-list-title">${s}</div>
                        </div>
                        <div class="v2-list-actions">
                            <button class="v2-btn v2-btn-sm" onclick="cineBackupsView.restore('${i}')">Restore</button>
                            <button class="v2-btn v2-btn-sm v2-btn-danger" onclick="cineBackupsView.delete('${i}')">Delete</button>
                        </div>
                    </li>
                `}o+="</ul>",n.innerHTML=o}catch(t){n.innerHTML=`<div class="v2-error-state">Failed to load backups: ${t.message}</div>`}},async restore(e){if(confirm(`Are you sure you want to restore ${e}? This will overwrite current data.`))try{const n=await xe.restoreSnapshot(e);n.id&&n.name?(await nn.saveProject(n.id,n),alert("Project restored successfully!")):alert("Unknown backup format.")}catch(n){alert("Failed to restore: "+n.message)}},async delete(e){confirm(`Delete ${e}?`)&&(await xe.deleteSnapshot(e),this.render())}};window.cineBackupsView=en;const Go=Object.freeze(Object.defineProperty({__proto__:null,cineBackupsView:en},Symbol.toStringTag,{value:"Module"}))});export default Fo();
//# sourceMappingURL=v2-ui-BwEyNXHr.js.map
