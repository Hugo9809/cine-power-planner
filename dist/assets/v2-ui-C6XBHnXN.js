const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-DtfiKPkC.js","assets/core-modules-C8doLRdR.js","assets/vendor-DzOFLsIx.js","assets/data-So-wGb1N.js","assets/main-BqnCKykC.css","assets/rules-view-Cc041Lt8.css","assets/contacts-BFtZKPDa.css","assets/settings-BBj8wH5S.css","assets/owned-gear-D1_apNqb.css"])))=>i.map(i=>d[i]);
import{_ as P,d as we,u as Jt,s as Yt}from"./core-modules-C8doLRdR.js";const L=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};let it=!1,W=!1;const ue="cine_use_v2_ui";function Zt(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2")){const n=e.get("v2")==="true";return localStorage.setItem(ue,n.toString()),n}return localStorage.getItem(ue)==="true"}catch{return!1}}function Qt(){const e=localStorage.getItem("darkMode")==="true";document.body.classList.toggle("dark-mode",e);const n=localStorage.getItem("cameraPowerPlanner_pinkMode")==="true"||localStorage.getItem("pinkMode")==="true";document.body.classList.toggle("pink-mode",n)}function Ae(){try{localStorage.setItem(ue,"true"),W=!0,document.body.classList.add("v2-mode"),Qt();const e=document.getElementById("topBar"),n=document.getElementById("mainContent"),t=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),i=document.getElementById("cineGlobalLoadingIndicator");i&&(i.style.display="none"),e&&(e.style.display="none"),n&&(n.style.display="none"),t&&(t.style.display="none"),a&&(a.style.display="none");const r=document.getElementById("siteFooter");r&&(r.style.display="none");const o=document.getElementById("installPromptBanner"),s=document.getElementById("offlineIndicator"),c=document.getElementById("backupNotificationContainer");o&&(o.style.display="none"),s&&(s.style.display="none"),c&&(c.style.display="none");const u=document.getElementById("v2-app");return u&&(u.style.display="",u.setAttribute("aria-hidden","false")),L.cineProjectDetail&&typeof L.cineProjectDetail.init=="function"&&L.cineProjectDetail.init(),L.cineViewManager&&typeof L.cineViewManager.enableV2=="function"&&L.cineViewManager.enableV2(),en(),L.cineProjectDashboard&&typeof L.cineProjectDashboard.init=="function"&&L.cineProjectDashboard.init(),L.cineV2Sidebar&&typeof L.cineV2Sidebar.init=="function"&&L.cineV2Sidebar.init(),Ce(),console.log("[V2 Bootstrap] V2 UI enabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to enable V2:",e),Ce(),!1}}function Xt(){let e=document.getElementById("v2-loader");e||(e=document.createElement("div"),e.id="v2-loader",e.innerHTML=`
                <div class="v2-loader-content">
                    <div class="v2-spinner"></div>
                    <div class="v2-loader-text">Loading Cine Power Planner...</div>
                </div>
            `,document.body.appendChild(e)),e.classList.add("visible")}function Ce(){const e=document.getElementById("v2-loader");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},500))}function _e(){try{localStorage.setItem(ue,"false"),W=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("topBar"),n=document.getElementById("mainContent"),t=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),i=document.getElementById("siteFooter");e&&(e.style.display=""),n&&(n.style.display=""),t&&(t.style.display=""),a&&(a.style.display=""),i&&(i.style.display="");const r=document.getElementById("v2-app");return r&&(r.style.display="none",r.setAttribute("aria-hidden","true")),L.cineViewManager&&typeof L.cineViewManager.disableV2=="function"&&L.cineViewManager.disableV2(),console.log("[V2 Bootstrap] V2 UI disabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to disable V2:",e),!1}}function en(){const e=document.getElementById("v2ExitBtn");e&&!e.dataset.bound&&(e.dataset.bound="true",e.addEventListener("click",()=>{_e(),window.location.reload()}))}function pt(){return W?_e():Ae()}async function gt(){try{console.log("[V2 Bootstrap] Loading V2 assets via Vite dynamic imports..."),await P(()=>import("./main-DtfiKPkC.js").then(n=>n.i),__vite__mapDeps([0,1,2,3,4])),await P(()=>Promise.resolve({}),__vite__mapDeps([5])),await P(()=>Promise.resolve({}),__vite__mapDeps([6])),await P(()=>Promise.resolve({}),__vite__mapDeps([7])),await P(()=>Promise.resolve({}),__vite__mapDeps([8])),console.log("[V2 Bootstrap] V2 CSS loaded"),await P(()=>Promise.resolve().then(()=>bn),void 0),await P(()=>Promise.resolve().then(()=>yn),void 0);const{LegacyShim:e}=await P(async()=>{const{LegacyShim:n}=await Promise.resolve().then(()=>Pn);return{LegacyShim:n}},void 0);return await P(()=>import("./main-DtfiKPkC.js").then(n=>n.a),__vite__mapDeps([0,1,2,3,4])),await P(()=>Promise.resolve().then(()=>Gn),void 0),await P(()=>Promise.resolve().then(()=>ia),void 0),await P(()=>Promise.resolve().then(()=>$a),void 0),await P(()=>Promise.resolve().then(()=>xa),void 0),await P(()=>Promise.resolve().then(()=>Da),void 0),await P(()=>import("./core-modules-C8doLRdR.js").then(n=>n.p),__vite__mapDeps([1,2])),await P(()=>import("./own-gear-CSm93DJ1.js"),[]),await P(()=>Promise.resolve().then(()=>Ba),void 0),await P(()=>Promise.resolve().then(()=>Pa),void 0),await P(()=>Promise.resolve().then(()=>Ta),void 0),await P(()=>Promise.resolve().then(()=>Ma),void 0),await P(()=>Promise.resolve().then(()=>ja),void 0),await P(()=>Promise.resolve().then(()=>Va),void 0),await P(()=>Promise.resolve().then(()=>Aa),void 0),window.cineBackupsView&&typeof window.cineBackupsView.init=="function"&&window.cineBackupsView.init(),console.log("[V2 Bootstrap] V2 JS modules loaded"),L.cineV2Sidebar&&typeof L.cineV2Sidebar.init=="function"&&L.cineV2Sidebar.init(),L.cineRulesView&&typeof L.cineRulesView.init=="function"&&L.cineRulesView.init(),L.cineV2DeviceLibrary&&typeof L.cineV2DeviceLibrary.init=="function"&&L.cineV2DeviceLibrary.init(),L.cineContactsView&&typeof L.cineContactsView.init=="function"&&L.cineContactsView.init(),L.cineSettingsView&&typeof L.cineSettingsView.init=="function"&&L.cineSettingsView.init(),L.cineOwnGearView&&typeof L.cineOwnGearView.init=="function"&&L.cineOwnGearView.init(),L.cineHelpView&&typeof L.cineHelpView.init=="function"&&L.cineHelpView.init(),!0}catch(e){return console.error("[V2 Bootstrap] Failed to load V2 assets:",e),!1}}async function tn(){if(it){console.warn("[V2 Bootstrap] Already initialized");return}it=!0,W=Zt(),console.log(`[V2 Bootstrap] Starting. V2 enabled: ${W}`),W&&(Xt(),await gt()?Ae():Ce()),nn(),console.log("[V2 Bootstrap] Initialization complete")}function nn(){if(document.getElementById("v2ToggleBtn"))return;const e=document.getElementById("settingsDialog");if(!e)return;const n=e.querySelector(".modal-content, .settings-content, .modal-surface");if(!n)return;const t=document.createElement("div");t.className="settings-row v2-toggle-section",t.style.cssText="margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;";const a=document.createElement("label");a.textContent="Experimental UI",a.style.cssText="font-weight: 600; display: block; margin-bottom: 8px;";const i=document.createElement("p");i.textContent="Try the new V2 interface design. This is experimental and can be toggled off at any time.",i.style.cssText="font-size: 0.875rem; color: #666; margin-bottom: 12px;";const r=document.createElement("button");r.id="v2ToggleBtn",r.type="button",r.className="v2-btn v2-btn-secondary",r.style.cssText="padding: 8px 16px; border-radius: 6px; cursor: pointer; background: #4a90d9; color: white; border: none;",r.textContent=W?"Return to Classic UI":"Try New UI",r.addEventListener("click",()=>{pt(),r.textContent=W?"Return to Classic UI":"Try New UI",window.location.reload()}),t.appendChild(a),t.appendChild(i),t.appendChild(r),n.appendChild(t)}const st={init:tn,enableV2:Ae,disableV2:_e,toggleV2:pt,isV2Enabled:()=>W,loadV2Assets:gt};typeof globalThis<"u"?globalThis.cineV2Bootstrap=st:typeof window<"u"&&(window.cineV2Bootstrap=st);const an=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},on=".app-view",rt="active",He="projects",ae={projects:{id:"view-projects",title:"Projects",pattern:/^#?\/?projects?\/?$/i},projectDetail:{id:"view-project-detail",title:"Project",pattern:/^#?\/?project\/([^/]+)(\/([a-z]+))?\/?$/i},settings:{id:"view-settings",title:"Settings",pattern:/^#?\/?settings?\/?$/i},contacts:{id:"view-contacts",title:"Contacts",pattern:/^#?\/?contacts?\/?$/i},devices:{id:"view-devices",title:"Device Library",pattern:/^#?\/?devices?\/?$/i},help:{id:"view-help",title:"Help",pattern:/^#?\/?help\/?$/i},rules:{id:"view-rules",title:"Auto Gear Rules",pattern:/^#?\/?rules\/?$/i},ownGear:{id:"view-own-gear",title:"Owned Gear",pattern:/^#?\/?own-gear\/?$/i},backups:{id:"view-backups",title:"Cloud Backups",pattern:/^#?\/?backups\/?$/i}};let G=null,$e={},ne=[],Re=!1;const Ie={};function sn(e,n){if(!ae[e]){console.warn(`[ViewManager] Cannot register handlers for unknown view: ${e}`);return}Ie[e]=n}function qe(){return document.querySelector(".v2-app")||document.getElementById("v2-app")}function rn(){const e=qe();return e?Array.from(e.querySelectorAll(on)):[]}function ln(e){return document.getElementById(e)}function ve(e,n={}){const t=ae[e];if(!t)return console.warn(`[ViewManager] Unknown view: ${e}`),!1;const a=ln(t.id);if(!a)return console.warn(`[ViewManager] View element not found: ${t.id}`),!1;if(G&&G!==e){const r=Ie[G];if(r&&typeof r.onLeave=="function")try{r.onLeave()}catch(o){console.error(`[ViewManager] Error in onLeave for ${G}:`,o)}}rn().forEach(r=>{r.classList.remove(rt)}),a.classList.add(rt),G&&G!==e&&ne.push({view:G,params:$e}),G=e,$e=n,vn(e,n),pn(e,n),gn(t.title,n);const i=Ie[e];if(i&&typeof i.onEnter=="function")try{i.onEnter(n)}catch(r){console.error(`[ViewManager] Error in onEnter for ${e}:`,r)}return!0}function cn(){if(ne.length>0){const e=ne.pop();return ve(e.view,e.params),!0}return ve(He),!1}function dn(){return G}function un(){return{...$e}}function vn(e,n){let t="";switch(ae[e],e){case"projects":t="#/projects";break;case"projectDetail":t=`#/project/${encodeURIComponent(n.projectId||"new")}`,n.tab&&(t+=`/${n.tab}`);break;case"settings":t="#/settings";break;case"contacts":t="#/contacts";break;case"devices":t="#/devices";break;case"help":t="#/help";break;case"rules":t="#/rules";break;case"ownGear":t="#/own-gear";break;default:ae[e]?e==="ownGear"?t="#/own-gear":t=`#/${e}`:t="#/projects"}window.location.hash!==t&&history.replaceState(null,"",t)}function mt(){const e=window.location.hash||"#/projects";for(const[n,t]of Object.entries(ae)){const a=e.match(t.pattern);if(a){const i={};return n==="projectDetail"&&a[1]&&(i.projectId=decodeURIComponent(a[1]),a[3]&&(i.tab=a[3])),{viewName:n,params:i}}}return{viewName:He,params:{}}}function bt(){const{viewName:e,params:n}=mt();ve(e,n)}function pn(e,n){const t=new CustomEvent("v2:viewchange",{bubbles:!0,detail:{view:e,params:n,previousView:ne.length>0?ne[ne.length-1]:null}});document.dispatchEvent(t)}function gn(e,n){let t=e;n.projectId&&n.projectId!=="new"&&(t=`${n.projectId} - ${e}`),document.title=`${t} | Cine Power Planner`}function ft(){try{return localStorage.getItem("cine_use_v2_ui")==="true"}catch{return!1}}function yt(){try{localStorage.setItem("cine_use_v2_ui","true"),Re=!0,document.body.classList.add("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="none");const n=qe();return n&&(n.style.display=""),bt(),!0}catch(e){return console.error("[ViewManager] Failed to enable V2 UI:",e),!1}}function ht(){try{localStorage.setItem("cine_use_v2_ui","false"),Re=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="");const n=qe();return n&&(n.style.display="none"),!0}catch(e){return console.error("[ViewManager] Failed to disable V2 UI:",e),!1}}function mn(){return Re?ht():yt()}function xe(){window.addEventListener("hashchange",bt),ft()&&an.cineV2Bootstrap,console.log("[ViewManager] Initialized")}const De={showView:ve,goBack:cn,getCurrentView:dn,getCurrentParams:un,registerView:sn,parseHash:mt,isV2Enabled:ft,enableV2:yt,disableV2:ht,toggleV2:mn,init:xe,VIEWS:ae,DEFAULT_VIEW:He};typeof globalThis<"u"?globalThis.cineViewManager=De:typeof window<"u"&&(window.cineViewManager=De);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xe):xe());const bn=Object.freeze(Object.defineProperty({__proto__:null,ViewManager:De},Symbol.toStringTag,{value:"Module"})),Se=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},wt=["contactsViewTitle","rulesViewTitle","ownGearViewTitle","deviceLibraryTitle","buttonAddContact","buttonAddRule","buttonAddGearItem"];function Oe(){if(!Se.texts||!Se.texts.en)return console.warn("[V2 Translations] Main translation system not loaded"),!1;const e=wt.filter(n=>!(n in Se.texts.en));return e.length>0?(console.warn("[V2 Translations] Missing keys:",e),!1):(console.log("[V2 Translations] All V2 keys verified"),!0)}const St=Oe(),fn={verifyV2Translations:Oe,isReady:St},yn=Object.freeze(Object.defineProperty({__proto__:null,V2_REQUIRED_KEYS:wt,default:fn,isReady:St,verifyV2Translations:Oe},Symbol.toStringTag,{value:"Module"})),lt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Fe={project:["setupSelect","setupName","saveSetupBtn","deleteSetupBtn"],devices:["cameraSelect","monitorSelect","videoSelect","motor1Select","motor2Select","motor3Select","motor4Select","controller1Select","controller2Select","controller3Select","controller4Select","distanceSelect","batteryPlateSelect","batterySelect","batteryHotswapSelect"],hidden:["cageSelect"],power:["heroCard","heroTotalDraw","heroAvailablePower","heroRuntime","heroCurrent144","heroCurrent12","heroBatteryCount","breakdownList","pinWarning","dtapWarning","hotswapWarning"],outputs:["projectRequirementsOutput","gearListOutput","batteryTable","powerDiagram"]},Ne=Object.values(Fe).flat();let O=null,pe=!0,le=new Map;function kt(){return O||(O=document.getElementById("v2-legacy-context"),O||(O=document.createElement("div"),O.id="v2-legacy-context",O.setAttribute("aria-hidden","true"),O.style.cssText="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);",document.body.appendChild(O)),O)}function hn(e){const n=document.getElementById(e);return n?(kt().appendChild(n),n):(console.warn(`[LegacyShim] Element not found: ${e}`),null)}function Et(e,n){if(!pe)return;const t=document.getElementById(e),a=document.getElementById(n);!t||!a||(a.value=t.value,Z(a,"change"))}function Lt(e,n){if(!pe)return;const t=document.getElementById(e),a=document.getElementById(n);!t||!a||(a.value=t.value,Z(a,"input"))}function Ct(e,n){const t=document.getElementById(e),a=document.getElementById(n);!t||!a||(pe=!1,a.value=t.value,pe=!0)}function Z(e,n,t={}){if(!e)return;const a=new Event(n,{bubbles:!0,cancelable:!0,...t});e.dispatchEvent(a)}function Ge(e){const n=document.getElementById(e);return n?(Z(n,"click"),!0):(console.warn(`[LegacyShim] Cannot trigger click, element not found: ${e}`),!1)}function wn(e){const n=document.getElementById("setupSelect");return n?Array.from(n.options).find(a=>a.value===e)?(n.value=e,Z(n,"change"),!0):(console.warn(`[LegacyShim] Project not found: ${e}`),!1):(console.error("[LegacyShim] setupSelect not found"),!1)}function $t(){return Ge("saveSetupBtn")}function Sn(){return Ge("deleteSetupBtn")}function kn(e){const n=document.getElementById("setupSelect"),t=document.getElementById("setupName");return!n||!t?(console.error("[LegacyShim] Project elements not found"),!1):(n.value="",Z(n,"change"),t.value=e,Z(t,"input"),$t())}function En(){if(typeof window.getSetups=="function")try{const n=window.getSetups()||{},t=Object.keys(n).filter(a=>a&&!a.startsWith("auto-backup-"));if(t.length>0)return t}catch(n){console.warn("[LegacyShim] getSetups failed:",n)}const e=document.getElementById("setupSelect");if(e&&e.options.length>1){const n=Array.from(e.options).map(t=>t.value).filter(t=>t!=="");if(n.length>0)return[...new Set(n)]}try{const n=localStorage.getItem("cameraPowerPlanner_setups");if(n){const t=JSON.parse(n);return Object.keys(t).filter(a=>a&&!a.startsWith("auto-backup-"))}}catch(n){console.warn("[LegacyShim] localStorage fallback failed:",n)}return[]}function Ln(e,n){const t=document.getElementById(e);return t?(t.value=n,Z(t,"change"),!0):(console.warn(`[LegacyShim] Device element not found: ${e}`),!1)}function Cn(e){const n=document.getElementById(e);return n?n.value:null}function $n(){const e={};return Fe.devices.forEach(n=>{const t=document.getElementById(n);t&&(e[n]=t.value)}),e}function In(e,n){const t=document.getElementById(e);if(!t)return;const a=()=>Et(e,n);t.addEventListener("change",a),le.set(`${e}:change`,{element:t,handler:a})}function xn(e,n){const t=document.getElementById(e);if(!t)return;const a=()=>Lt(e,n);t.addEventListener("input",a),le.set(`${e}:input`,{element:t,handler:a})}function Dn(e,n){const t=document.getElementById(e);if(!t)return;const a=()=>Ct(e,n);t.addEventListener("change",a),le.set(`${e}:legacy:change`,{element:t,handler:a})}function Bn(){le.forEach(({element:e,handler:n},t)=>{const a=t.split(":")[1];e.removeEventListener(a,n)}),le.clear()}function It(){const e=[],n=[];return Ne.forEach(t=>{document.getElementById(t)?n.push(t):e.push(t)}),e.length>0&&console.warn("[LegacyShim] Missing critical IDs:",e),{found:n,missing:e}}function Be(){const{found:e,missing:n}=It();console.log(`[LegacyShim] Initialized. Found ${e.length}/${Ne.length} critical elements.`),n.length>0&&console.warn("[LegacyShim] Missing elements:",n)}const fe={ensureLegacyContainer:kt,shimToLegacyContainer:hn,syncSelectValue:Et,syncInputValue:Lt,syncToV2:Ct,dispatchNativeEvent:Z,triggerLegacyClick:Ge,loadProject:wn,saveProject:$t,deleteProject:Sn,createProject:kn,getProjectNames:En,setDeviceValue:Ln,getDeviceValue:Cn,getDeviceSnapshot:$n,bindV2Select:In,bindV2Input:xn,listenLegacyChanges:Dn,verifyLegacyIds:It,cleanup:Bn,init:Be,CRITICAL_IDS:Fe,ALL_CRITICAL_IDS:Ne};typeof lt<"u"&&(lt.cineLegacyShim=fe);typeof window<"u"&&(window.cineLegacyShim=fe);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Be):Be());typeof module<"u"&&module.exports&&(module.exports=fe);const Pn=Object.freeze(Object.defineProperty({__proto__:null,LegacyShim:fe},Symbol.toStringTag,{value:"Module"})),I=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},xt="projectGrid",ie="view-projects",q="cameraPowerPlanner_setups",Y=["blue","green","orange","purple","red","pink","teal","indigo","yellow","amber","lime","emerald","cyan","sky","violet","fuchsia","rose","slate","stone","neutral","gold","crimson","navy","aquamarine"],Tn=["📽️","🎬","⚡","🔋","🎥","📺","💡","🎞️","📸","🎯","📝","⭐","🐴","🦄","🤘","🦊","🐶","🦖","🐙","🐉","👽","👻","🤖","💀","👾","🤡","🎉","🔥","✨","🚀","🍕","🤙","✌️","💪"];let ce={query:""},_=null;function Pe(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function se(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function de(e){if(!e||typeof e!="string")return"";const n=e.split(" to ");return n.length===1?se(n[0]):n.length===2?`${se(n[0])} - ${se(n[1])}`:e}function D(e,n={}){const t=document.documentElement.lang||"en";let a=window.texts&&window.texts[t]?window.texts[t]:null;!a&&window.texts&&(a=window.texts.en);const i=(o,s)=>s.split(".").reduce((c,u)=>c?c[u]:null,o);let r=a?i(a,e):null;if(!r&&t!=="en"&&window.texts&&window.texts.en&&(r=i(window.texts.en,e)),!r)return e;if(typeof r=="string")for(const[o,s]of Object.entries(n))r=r.replace(`{${o}}`,s);return r}function ze(){if(typeof window.loadProjectMetadata=="function")try{_=window.loadProjectMetadata();return}catch(e){console.warn("[V2] Failed to load project metadata via storage API:",e)}try{const e=localStorage.getItem(q);e?_=JSON.parse(e):_={}}catch(e){console.error("[V2] Failed to parse project data:",e),_={}}}function ye(){if(_)return Object.keys(_).filter(n=>n&&!n.startsWith("auto-backup-"));if(I.cineLegacyShim&&typeof I.cineLegacyShim.getProjectNames=="function"){const n=I.cineLegacyShim.getProjectNames();if(n.length>0)return n}const e=document.getElementById("setupSelect");if(e&&e.options.length>1){const n=Array.from(e.options).map(t=>t.value).filter(t=>t!=="");if(n.length>0)return[...new Set(n)]}try{const n=localStorage.getItem(q);if(n){const t=JSON.parse(n);return Object.keys(t).filter(a=>a&&!a.startsWith("auto-backup-"))}}catch{}return[]}function Mn(){let e=ye();if(e=e.filter(n=>!!!Dt(n).archived),ce.query){const n=ce.query.toLowerCase();e=e.filter(t=>t.toLowerCase().includes(n))}return[...new Set(e)]}function Dt(e){_===null&&ze();const n=_[e];return n?{lastModified:n.lastModified||null,color:n.color||null,icon:n.icon||null,prepDays:n.prepDays||[],shootingDays:n.shootingDays||[],returnDays:n.returnDays||[],archived:n.archived||!1,status:n.status||(n.archived?"Archived":"Planning")}:{lastModified:null,color:null,icon:null,prepDays:[],shootingDays:[],returnDays:[],archived:!1,status:"Planning"}}function We(e,n={}){if(typeof window.loadProject=="function"&&typeof window.saveProject=="function")try{const t=window.loadProject(e);if(t)return n.color&&(t.color=n.color),n.icon&&(t.icon=n.icon),n.prepDays&&(t.prepDays=n.prepDays),n.shootingDays&&(t.shootingDays=n.shootingDays),n.returnDays&&(t.returnDays=n.returnDays),typeof n.archived<"u"&&(t.archived=n.archived),n.status&&(t.status=n.status),window.saveProject(e,t),_&&_[e]&&Object.assign(_[e],n),!0}catch(t){return console.error("[V2] Failed to update project via storage API:",t),!1}try{ze();const t=_||{};if(t&&t[e])return n.color&&(t[e].color=n.color),n.icon&&(t[e].icon=n.icon),n.prepDays&&(t[e].prepDays=n.prepDays),n.shootingDays&&(t[e].shootingDays=n.shootingDays),n.returnDays&&(t[e].returnDays=n.returnDays),typeof n.archived<"u"&&(t[e].archived=n.archived),n.status&&(t[e].status=n.status),localStorage.setItem(q,JSON.stringify(t)),_=t,!0}catch(t){console.error("[V2] Failed to update project metadata:",t)}return!1}function jn(e,n){const t=Dt(e);let a=t.color||Y[n%Y.length];Y.includes(a)||(a=Y[n%Y.length]);const i=Pe(t.icon||"📽️"),r=t.lastModified?se(t.lastModified):"",o=Pe(e),s=t.status||"Planning",c=s.toLowerCase().replace(/\s+/g,"-");let u=s.toLowerCase().replace(/\s+/g,"");u==="waitingforapproval"&&(u="waitingForApproval");const f=D(`v2.dashboard.status.${u}`)===`v2.dashboard.status.${u}`?s:D(`v2.dashboard.status.${u}`);let m="";return(t.prepDays?.length>0||t.shootingDays?.length>0||t.returnDays?.length>0)&&(m='<div class="v2-tile-periods">',Array.isArray(t.prepDays)&&t.prepDays.forEach(g=>{const v=de(g);v&&(m+=`<span class="v2-period-badge prep" title="${D("v2.dashboard.projectTile.prep")} ${v}"><span class="period-icon">📅</span> ${v}</span>`)}),Array.isArray(t.shootingDays)&&t.shootingDays.forEach(g=>{const v=de(g);v&&(m+=`<span class="v2-period-badge shoot" title="${D("v2.dashboard.projectTile.shoot")} ${v}"><span class="period-icon">🎥</span> ${v}</span>`)}),Array.isArray(t.returnDays)&&t.returnDays.forEach(g=>{const v=de(g);v&&(m+=`<span class="v2-period-badge return" title="${D("v2.dashboard.projectTile.return")} ${v}"><span class="period-icon">🚛</span> ${v}</span>`)}),m+="</div>"),`
      <div class="v2-project-tile" data-project="${o}" tabindex="0" role="button" aria-label="${D("v2.dashboard.projectTile.actionsFor",{project:o})}">
        <div class="v2-tile-header">
          <div class="v2-tile-icon color-${a}">${i}</div>
            <div class="v2-tile-info">
            <h3 class="v2-tile-title">${o}</h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                 ${r?`<span class="v2-tile-meta">${r}</span>`:""}
                 <span class="v2-status-badge ${c}">${f}</span>
            </div>
            ${m}
          </div>
          <div class="v2-tile-actions">
            <button type="button" class="v2-tile-action-btn" data-action="menu" data-project="${o}" title="${D("v2.dashboard.projectTile.moreOptions")}" aria-label="${D("v2.dashboard.projectTile.actionsFor",{project:o})}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `}function Vn(){return`
      <div class="v2-project-tile new-project" id="v2CreateProjectTile" tabindex="0" role="button" aria-label="${D("v2.dashboard.newProject")}">
        <div class="v2-tile-header center">
          <div class="v2-tile-icon-add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="v2-tile-title">${D("v2.dashboard.newProject")}</h3>
        </div>
      </div>
    `}function An(e){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 48px; display: flex; align-items: center; justify-content: center;">🔍</div>
        <h2>${D("v2.dashboard.search.noResults.title")}</h2>
        <p class="text-muted">${D("v2.dashboard.search.noResults.subtitle",{query:Pe(e)})}</p>
        <button id="v2ClearSearchBtn" class="v2-btn-secondary">
          Clear Search
        </button>
      </div>
    `}function U(){I.cineProjectLockManager&&I.cineProjectLockManager.releaseLock();const e=document.getElementById(xt);e&&_n(e)}function _n(e){if(e.innerHTML="",e.className="v2-project-grid",e.style="",ze(),ye().length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const r=e.closest(".v2-main");r&&r.classList.add("align-top"),e.innerHTML=On(),qn(e);return}const t=Mn();if(t.length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const r=e.closest(".v2-main");r&&r.classList.add("align-top"),e.innerHTML=An(ce.query);const o=e.querySelector("#v2ClearSearchBtn");o&&o.addEventListener("click",()=>{const s=document.getElementById("v2SidebarSearchInput");s&&(s.value="",s.dispatchEvent(new Event("input",{bubbles:!0})))});return}const a=e.closest(".v2-main");a&&a.classList.remove("align-top");let i="";t.forEach((r,o)=>{i+=jn(r,o)}),ce.query||(i+=Vn()),e.innerHTML=i,Rn(e)}function Hn(){window.addEventListener("v2:search",e=>{ce.query=e.detail?.query||"",U()})}function Rn(e){e.querySelectorAll(".v2-project-tile").forEach(t=>{t.addEventListener("click",a=>{if(a.target.closest('[data-action="menu"]'))return;const i=t.dataset.project;i&&ge(i)}),t.addEventListener("contextmenu",a=>{a.preventDefault();const i=t.dataset.project;i&&ct(a,i)}),t.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),t.click())})}),e.querySelectorAll('[data-action="menu"]').forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();const i=t.dataset.project;i&&ct(a,i)})});const n=e.querySelector("#v2CreateProjectTile");n&&(n.addEventListener("click",()=>Te()),n.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),Te())}))}function ct(e,n){F();const t=document.createElement("div");t.className="v2-context-menu",t.innerHTML=`
            <button class="v2-context-menu-item" data-action="open">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                ${D("v2.dashboard.contextMenu.open")}
            </button>
            <button class="v2-context-menu-item" data-action="edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                ${D("v2.dashboard.contextMenu.rename")}
            </button>
            <button class="v2-context-menu-item" data-action="print">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                ${D("v2.dashboard.contextMenu.print")}
            </button>
            <button class="v2-context-menu-item" data-action="duplicate">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                ${D("v2.dashboard.contextMenu.duplicate")}
            </button>
            <button class="v2-context-menu-item" data-action="archive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                ${D("v2.dashboard.contextMenu.archive")}
            </button>
             <div style="height: 1px; background: var(--v2-border-default); margin: 4px 0;"></div>
            <button class="v2-context-menu-item danger" data-action="delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                ${D("v2.dashboard.contextMenu.delete")}
            </button>
        `,t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`,t.querySelector('[data-action="open"]').addEventListener("click",()=>{ge(n),F()}),t.querySelector('[data-action="edit"]').addEventListener("click",()=>{F(),Te(n)}),t.querySelector('[data-action="print"]').addEventListener("click",()=>{ge(n,{action:"print"}),F()}),t.querySelector('[data-action="duplicate"]').addEventListener("click",()=>{Nn(n),F()}),t.querySelector('[data-action="archive"]').addEventListener("click",()=>{Fn(n),F()}),t.querySelector('[data-action="delete"]').addEventListener("click",()=>{Bt(n),F()}),document.body.appendChild(t);const a=t.getBoundingClientRect();a.right>window.innerWidth&&(t.style.left=`${window.innerWidth-a.width-10}px`),a.bottom>window.innerHeight&&(t.style.top=`${window.innerHeight-a.height-10}px`),setTimeout(()=>{document.addEventListener("click",F,{once:!0}),document.addEventListener("contextmenu",F,{once:!0})},0)}function F(){const e=document.querySelector(".v2-context-menu");e&&e.remove(),document.removeEventListener("click",F)}function qn(e){const n=e.querySelector("#v2EmptyStateCreateBtn");n&&n.addEventListener("click",he)}async function ge(e,n={}){if(I.cineProjectLockManager&&!await I.cineProjectLockManager.requestLock(e)){alert(D("v2.dashboard.projectLocked",{projectName:e}));return}I.cineLegacyShim&&I.cineLegacyShim.loadProject(e),I.cineViewManager&&I.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera",...n})}function On(){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 64px; opacity: 0.8; margin-bottom: 16px;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h2>${D("v2.dashboard.emptyState.title")}</h2>
        <p class="text-muted">${D("v2.dashboard.emptyState.subtitle")}</p>
        <div class="v2-empty-actions">
            <button id="v2EmptyStateCreateBtn" class="v2-btn-primary">
              + ${D("v2.dashboard.newProject")}
            </button>
            <p class="v2-help-link-container">
                <a href="#/help" class="v2-link-subtle">${D("v2.dashboard.emptyState.help")}</a>
            </p>
        </div>
      </div>
    `}function Bt(e){if(confirm(D("v2.dashboard.confirmDelete",{project:e})||`Are you sure you want to delete project "${e}"?`))try{const n=localStorage.getItem(q);if(n){const t=JSON.parse(n);t[e]&&(delete t[e],localStorage.setItem(q,JSON.stringify(t)),Ue())}I.cineLegacyShim&&typeof I.cineLegacyShim.deleteProject=="function"&&typeof I.cineLegacyShim.refreshProjects=="function"&&I.cineLegacyShim.refreshProjects(),U()}catch(n){console.error("[V2] Failed to delete project:",n),alert(D("v2.common.error")||"An error occurred.")}}function Fn(e){We(e,{archived:!0,status:"Archived"}),U()}function Nn(e){try{const n=localStorage.getItem(q);if(!n)return;const t=JSON.parse(n),a=t[e];if(!a)return;let i=`${e} (Copy)`,r=2;for(;t[i];)i=`${e} (Copy ${r})`,r++;const o=JSON.parse(JSON.stringify(a));o.created=new Date().toISOString(),o.lastModified=new Date().toISOString(),t[i]=o,localStorage.setItem(q,JSON.stringify(t)),Ue(),U(),I.cineLegacyShim&&typeof I.cineLegacyShim.refreshProjects=="function"&&I.cineLegacyShim.refreshProjects()}catch(n){console.error("Failed to duplicate project:",n)}}function Te(e=null){he(e)}function he(e=null){const n=!!e,t=Math.floor(Math.random()*Y.length);let a=Y[t],i="📽️",r=null;if(n){const S=localStorage.getItem(q);if(S){const B=JSON.parse(S);B[e]&&(r=B[e],r.color&&(a=r.color),r.icon&&(i=r.icon))}}let o=[];if(n&&r){let S=1;const B=(C,j,K)=>{if(!C)return;let X="",ee="";C.includes(" to ")?[X,ee]=C.split(" to "):(X=C,ee=C),o.push({id:`period-${S++}`,type:j,name:K,startDate:X,endDate:ee})};Array.isArray(r.prepDays)&&r.prepDays.forEach(C=>B(C,"prep","Prep")),Array.isArray(r.shootingDays)&&r.shootingDays.forEach(C=>B(C,"shoot","Shoot")),Array.isArray(r.returnDays)&&r.returnDays.forEach(C=>B(C,"return","Return"))}!n&&o.length===0&&(o=[{id:"period-1",type:"prep",name:"Prep",startDate:"",endDate:""},{id:"period-2",type:"shoot",name:"Shoot",startDate:"",endDate:""},{id:"period-3",type:"return",name:"Return",startDate:"",endDate:""}]);let s=o.length>0?o.length:3;const c=[{value:"prep",label:"Prep",icon:"📅"},{value:"shoot",label:"Shoot",icon:"🎥"},{value:"return",label:"Return",icon:"🚛"}],u=S=>`var(--v2-color-${S})`,f=Y.map(S=>`
            <button type="button" class="v2-color-swatch-sm color-${S} ${S===a?"selected":""}" 
                    data-color="${S}" aria-label="Select ${S} color">
            </button>
        `).join(""),m=Tn.map(S=>`
            <button type="button" class="v2-icon-option-sm ${S===i?"selected":""}" 
                    data-icon="${S}" aria-label="Select icon ${S}">
                ${S}
            </button>
        `).join(""),y=()=>o.length===0?'<div class="v2-empty-state" style="padding: 16px; font-size: 13px;">No dates added yet.</div>':o.map(S=>{const B=c.map(C=>`<option value="${C.value}" ${S.type===C.value?"selected":""}>${C.icon} ${C.label}</option>`).join("");return`
                <div class="v2-period-row" data-period-id="${S.id}">
                    <div class="v2-period-name">
                        <select class="v2-period-type-select" data-field="type">
                            ${B}
                        </select>
                    </div>
                    <input type="date" class="v2-date-input" value="${S.startDate}" data-field="startDate" aria-label="${S.name} Start Date">
                    <span class="v2-date-separator">to</span>
                    <input type="date" class="v2-date-input" value="${S.endDate}" data-field="endDate" aria-label="${S.name} End Date">
                    <button type="button" class="v2-period-remove" data-period-id="${S.id}" aria-label="Remove period">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `}).join(""),g=document.createElement("div");g.className="v2-modal-backdrop",g.innerHTML=`
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
                                <span class="v2-picker-preview" id="v2ColorPreview" style="background-color: ${u(a)};"></span>
                                <span class="v2-picker-label">${a.charAt(0).toUpperCase()+a.slice(1)}</span>
                                <svg class="v2-picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="v2-picker-popover" id="v2ColorPopover">
                                <div class="v2-picker-popover-grid">
                                    ${f}
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
                                    ${m}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Periods -->
                    <div style="margin-bottom: var(--v2-space-md);">
                        <label class="v2-form-section-label">Project Roadmap</label>
                        <div class="v2-periods-container" id="v2PeriodsContainer">
                            ${y()}
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
        `,document.body.appendChild(g),requestAnimationFrame(()=>{g.classList.add("open")});const v=g.querySelector("#v2NewProjectName"),l=g.querySelector("#v2NewProjectError"),d=g.querySelector("#v2CreateProjectBtn"),p=g.querySelector("#v2CancelProjectBtn"),h=g.querySelector(".v2-modal-close"),b=g.querySelector("#v2PeriodsContainer"),w=g.querySelector("#v2AddPeriodBtn"),k=g.querySelector("#v2ColorPickerTrigger"),x=g.querySelector("#v2ColorPopover"),T=g.querySelector("#v2ColorPreview"),Q=k.querySelector(".v2-picker-label");k.addEventListener("click",S=>{S.stopPropagation(),k.classList.toggle("open"),x.classList.toggle("open"),H.classList.remove("open"),V.classList.remove("open")}),x.querySelectorAll(".v2-color-swatch-sm").forEach(S=>{S.addEventListener("click",B=>{B.stopPropagation(),x.querySelectorAll(".v2-color-swatch-sm").forEach(C=>C.classList.remove("selected")),S.classList.add("selected"),a=S.dataset.color,T.style.backgroundColor=u(a),Q.textContent=a.charAt(0).toUpperCase()+a.slice(1),k.classList.remove("open"),x.classList.remove("open")})});const H=g.querySelector("#v2IconPickerTrigger"),V=g.querySelector("#v2IconPopover"),M=g.querySelector("#v2IconPreview");H.addEventListener("click",S=>{S.stopPropagation(),H.classList.toggle("open"),V.classList.toggle("open"),k.classList.remove("open"),x.classList.remove("open")}),V.querySelectorAll(".v2-icon-option-sm").forEach(S=>{S.addEventListener("click",B=>{B.stopPropagation(),V.querySelectorAll(".v2-icon-option-sm").forEach(C=>C.classList.remove("selected")),S.classList.add("selected"),i=S.dataset.icon,M.textContent=i,H.classList.remove("open"),V.classList.remove("open")})}),g.addEventListener("click",()=>{k.classList.remove("open"),x.classList.remove("open"),H.classList.remove("open"),V.classList.remove("open")});function et(S,B,C){const j=o.find(K=>K.id===S);if(j)if(B==="type"){const K=c.find(X=>X.value===C);K&&(j.type=C,j.name=K.label)}else j[B]=C}function Ut(S){o=o.filter(B=>B.id!==S),tt()}function Kt(){s++,o.push({id:`period-${s}`,type:"shoot",name:"Shoot",startDate:"",endDate:""}),tt()}function tt(){b.innerHTML=y(),nt()}function nt(){b.querySelectorAll(".v2-period-row").forEach(S=>{const B=S.dataset.periodId;S.querySelectorAll("input, select").forEach(j=>{j.addEventListener("change",()=>{et(B,j.dataset.field,j.value)}),j.addEventListener("input",()=>{et(B,j.dataset.field,j.value)})});const C=S.querySelector(".v2-period-remove");C&&C.addEventListener("click",()=>{Ut(B)})})}nt(),w.addEventListener("click",Kt),n||setTimeout(()=>v.focus(),100);function oe(){g.classList.remove("open"),setTimeout(()=>g.remove(),200)}function at(){const S=v.value.trim();if(!S){l.textContent="Please enter a project name.",l.style.display="block",v.focus();return}const B=ye();if(n){if(S!==e&&B.includes(S)){l.textContent="A project with this name already exists.",l.style.display="block",v.focus();return}}else if(B.includes(S)){l.textContent="A project with this name already exists.",l.style.display="block",v.focus();return}oe();const C=A=>{if(!A)return null;const R=A.startDate,J=A.endDate;return!R&&!J?null:R&&J?`${R} to ${J}`:R||J||null},j=o.filter(A=>A.type==="prep").map(C).filter(Boolean),K=o.filter(A=>A.type==="shoot").map(C).filter(Boolean),X=o.filter(A=>A.type==="return").map(C).filter(Boolean),ee={color:a,icon:i,prepDays:j,shootingDays:K,returnDays:X};if(n)if(S!==e)try{const A=localStorage.getItem(q);if(A){const R=JSON.parse(A),J=R[e];if(J){R[S]={...J,...ee},R[S].lastModified=new Date().toISOString(),delete R[e],localStorage.setItem(q,JSON.stringify(R)),Ue();const ot=document.getElementById("setupSelect");ot&&ot.value,U(),I.cineLegacyShim&&typeof I.cineLegacyShim.refreshProjects=="function"&&I.cineLegacyShim.refreshProjects()}}}catch(A){console.error("Rename failed",A)}else We(S,ee),U();else Pt(S,ee)}d.addEventListener("click",at),p.addEventListener("click",oe),h.addEventListener("click",oe),g.addEventListener("click",S=>{S.target===g&&oe()}),v.addEventListener("keydown",S=>{S.key==="Enter"&&at(),S.key==="Escape"&&oe()}),v.addEventListener("input",()=>{l.style.display="none"})}function Pt(e,n={}){if(I.cineLegacyShim){I.cineLegacyShim.createProject(e);const t=(a=0)=>{const r=localStorage.getItem(q);if(r)try{const o=JSON.parse(r);if(o&&o[e]){We(e,n);return}}catch{}a<20?setTimeout(()=>t(a+1),100):console.warn("[V2] Timed out waiting for project to be saved:",e)};t()}I.cineViewManager&&I.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera"})}function Ue(){try{const e="cameraPowerPlanner_project_rev",n=parseInt(localStorage.getItem(e)||"0",10);localStorage.setItem(e,(n+1).toString())}catch(e){console.error("[V2] Failed to update project revision:",e)}}function Tt(){if(document.getElementById(ie))return document.getElementById(ie);const e=document.createElement("section");e.id=ie,e.className="app-view v2-app",e.innerHTML=`
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
        <div class="v2-project-grid" id="${xt}">
          <!-- Tiles will be rendered here -->
        </div>
      </div>
    `;const n=e.querySelector("#v2HeaderCreateBtn");return n&&n.addEventListener("click",he),e}function Me(){console.log("[ProjectDashboard] init() called");const e=Tt(),n=document.querySelector(".v2-main");n&&!document.getElementById(ie)&&n.appendChild(e),document.addEventListener("click",a=>{a.target&&(a.target.closest("#v2HeaderCreateBtn")?he():a.target.closest("#v2HeaderImportBtn")&&I.cineLegacyShim&&I.cineLegacyShim.triggerLegacyClick("applySharedLinkBtn"))});const t=document.querySelector(".v2-view.active");t&&t.id===ie&&U(),window.addEventListener("v2:viewchange",a=>{a.detail.view==="projects"&&U()}),Hn()}const Ke={init:Me,renderProjectGrid:U,createProject:Pt,deleteProject:Bt,openProject:ge,getProjectNames:ye,createDashboardView:Tt,formatDate:se,formatDateRange:de};typeof I<"u"&&(I.cineProjectDashboard=Ke);typeof window<"u"&&(window.cineProjectDashboard=Ke);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(Me,200)}):setTimeout(Me,200));const Gn=Object.freeze(Object.defineProperty({__proto__:null,ProjectDashboard:Ke},Symbol.toStringTag,{value:"Module"})),E=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},re="view-project-detail",Mt="cameraPowerPlanner_setups",zn=["camera","power","requirements","kit"],Wn="camera";let N=null,jt=Wn,dt=!1,z=null;function me(e){if(!zn.includes(e)){console.warn(`[ProjectDetail] Invalid tab: ${e}`);return}jt=e,document.querySelectorAll("#view-project-detail .v2-tab-btn").forEach(a=>{const i=a.dataset.tab===e;a.classList.toggle("active",i),a.setAttribute("aria-selected",i?"true":"false")}),document.querySelectorAll("#view-project-detail .v2-tab-pane").forEach(a=>{const i=a.id===`tab-${e}`;a.classList.toggle("active",i),a.hidden=!i}),document.dispatchEvent(new CustomEvent("v2:tabchange",{detail:{tab:e,project:N}})),e==="power"&&setTimeout(()=>qt(),10)}function Vt(){return jt}function ke(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function Ee(e){if(!e||typeof e!="string")return"";const n=e.split(" to ");return n.length===1?ke(n[0]):n.length===2?`${ke(n[0])} - ${ke(n[1])}`:e}function $(e,n={}){const t=document.documentElement.lang||"en";let a=window.texts&&window.texts[t]?window.texts[t]:null;!a&&window.texts&&(a=window.texts.en);const i=(o,s)=>s.split(".").reduce((c,u)=>c?c[u]:null,o);let r=a?i(a,e):null;if(!r&&t!=="en"&&window.texts&&window.texts.en&&(r=i(window.texts.en,e)),!r)return e;if(typeof r=="string")for(const[o,s]of Object.entries(n))r=r.replace(`{${o}}`,s);return r}function Je(){try{const e=localStorage.getItem(Mt);e?z=JSON.parse(e):z={}}catch(e){console.error("[ProjectDetail] Failed to parse project data:",e),z={}}}function At(e){if(z===null&&Je(),z&&z[e]){const n=z[e];return{prepDays:n.prepDays||[],shootingDays:n.shootingDays||[],returnDays:n.returnDays||[],status:n.status||(n.archived?"Archived":"Planning")}}return{prepDays:[],shootingDays:[],returnDays:[],status:"Planning"}}function _t(e,n){try{Je();const t=z||{};if(t&&t[e])return t[e].status=n,n==="Archived"?t[e].archived=!0:t[e].archived=!1,localStorage.setItem(Mt,JSON.stringify(t)),z=t,!0}catch(t){console.error("[ProjectDetail] Failed to update status:",t)}return!1}function Ht(e){if(!e)return console.warn("[ProjectDetail] No project name provided"),!1;Je(),N=e;const n=document.getElementById("v2ProjectName");n&&(n.textContent=e),E.cineLegacyShim&&E.cineLegacyShim.loadProject(e);const t=At(e),a=document.getElementById("v2ProjectPeriods"),i=document.getElementById("v2ProjectStatus");if(i){i.value=t.status,je(i);const r=i.cloneNode(!0);i.parentNode.replaceChild(r,i),r.addEventListener("change",o=>{const s=o.target.value;_t(e,s),je(r)})}if(a){let r="";Array.isArray(t.prepDays)&&t.prepDays.forEach(o=>{const s=Ee(o);s&&(r+=`<span class="v2-header-badge prep" title="Prep Dates: ${s}"><span class="period-icon">📅</span> ${s}</span>`)}),Array.isArray(t.shootingDays)&&t.shootingDays.forEach(o=>{const s=Ee(o);s&&(r+=`<span class="v2-header-badge shoot" title="Shooting Dates: ${s}"><span class="period-icon">🎥</span> ${s}</span>`)}),Array.isArray(t.returnDays)&&t.returnDays.forEach(o=>{const s=Ee(o);s&&(r+=`<span class="v2-header-badge return" title="Return Dates: ${s}"><span class="period-icon">🚛</span> ${s}</span>`)}),a.innerHTML=r,a.style.display=r?"flex":"none"}return console.log(`[ProjectDetail] Loaded project: ${e}`),!0}function Un(){return N}function Kn(){E.cineViewManager&&E.cineViewManager.showView("projects")}function Jn(){if(document.getElementById(re))return document.getElementById(re);const e=document.createElement("section");e.id=re,e.className="app-view";const n=document.querySelector(".v2-main");return n&&n.appendChild(e),e}function Rt(){const e=Jn();e&&(e.innerHTML=`
      <header class="view-header view-header-with-back">
        <button type="button" class="v2-back-btn" id="v2BackToProjects" aria-label="${$("v2.detail.backButton")}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>${$("v2.detail.backButton")}</span>
        </button>
        <h1 id="v2ProjectName" class="view-header-title">Project</h1>
        <div class="v2-header-status">
            <select id="v2ProjectStatus" class="v2-status-select">
                <option value="Draft">${$("v2.dashboard.status.draft")}</option>
                <option value="Planning">${$("v2.dashboard.status.planning")}</option>
                <option value="Waiting for Approval">${$("v2.dashboard.status.waitingForApproval")}</option>
                <option value="Approved">${$("v2.dashboard.status.approved")}</option>
                <option value="Shooting">${$("v2.dashboard.status.shooting")}</option>
                <option value="Completed">${$("v2.dashboard.status.completed")}</option>
                <option value="Archived">${$("v2.dashboard.status.archived")}</option>
            </select>
        </div>
        <div id="v2ProjectPeriods" class="v2-header-periods" style="display: none;"></div>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-ghost" id="v2PrintProjectBtn" title="${$("v2.detail.header.print")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateReqsGearBtn" title="${$("v2.detail.header.generateReqs")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${$("v2.detail.header.generateReqs")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2ExportProjectBtn" title="${$("v2.detail.header.export")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
               <polyline points="16 6 12 2 8 6"/>
               <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span class="v2-btn-label">${$("v2.detail.header.export")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateOverviewBtn" title="${$("v2.detail.header.generateOverview")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${$("v2.detail.header.generateOverview")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-secondary" id="v2SaveProjectBtn">
            ${$("v2.detail.header.save")}
          </button>
        </div>
      </header>


      
      <!-- Tab Navigation (Sticky Top) -->
      <nav class="v2-tabs-nav" role="tablist" aria-label="Project sections">
        <button type="button" class="v2-tab-btn active" data-tab="camera" role="tab" aria-selected="true" aria-controls="tab-camera">
          ${$("v2.detail.tabs.cameraPackage")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="power" role="tab" aria-selected="false" aria-controls="tab-power">
          ${$("v2.detail.tabs.powerSummary")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="requirements" role="tab" aria-selected="false" aria-controls="tab-requirements">
          ${$("v2.detail.tabs.requirements")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="kit" role="tab" aria-selected="false" aria-controls="tab-kit">
          ${$("v2.detail.tabs.gearList")}
        </button>
      </nav>

      <div class="view-content">
        <!-- Tab Content -->
        <div class="v2-tab-content" style="padding-top: var(--v2-space-lg);">
          <!-- Camera Package Tab -->
          <section id="tab-camera" class="v2-tab-pane active" role="tabpanel" aria-labelledby="tab-camera-btn">
            ${Yn()}
          </section>
          
          <!-- Power Summary Tab -->
          <section id="tab-power" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-power-btn" hidden>
            ${Qn()}
          </section>
          
          <!-- Requirements Tab -->
          <section id="tab-requirements" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-requirements-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${$("v2.detail.actions.projectRequirements")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateRequirementsBtn">
                  ${$("v2.detail.actions.generateRequirements")}
                </button>
              </div>
              <div class="v2-card-body" id="v2RequirementsContainer">
                <p class="v2-text-muted">${$("v2.detail.actions.generateRequirementsHelp")}</p>
                <div data-reparent="projectForm"></div>
                <div id="v2RequirementsOutput" class="v2-requirements-output" style="margin-top: var(--v2-space-md);"></div>
              </div>
            </div>
          </section>
          
          <!-- Gear List Tab -->
          <section id="tab-kit" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-kit-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${$("v2.detail.actions.gearList")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateGearListBtn">
                  ${$("v2.detail.actions.generateGearList")}
                </button>
              </div>
              <div class="v2-card-body" id="v2KitListContainer">
                <p class="v2-text-muted">${$("v2.detail.actions.generateGearListHelp")}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `,Xn(e),setTimeout(()=>Zn(e),0))}function Yn(){return`
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
    `}function Zn(e){e.querySelectorAll("[data-reparent]").forEach(t=>{const a=t.dataset.reparent,i=document.getElementById(a);if(i){const r=i.tagName.toLowerCase();["select","input","textarea"].includes(r)?(i.style.display="block",i.classList.add("v2-"+r),i.style.width="100%",i.style.height="",i.style.minHeight=""):r==="form"&&(i.style.display="block",i.style.position="static",i.style.visibility="visible",i.style.width="100%",i.classList.add("v2-reparented-form")),i.style.whiteSpace="";const o=i.closest(".select-wrapper"),s=o||i;o&&(o.classList.add("v2-select-container"),o.style.width="100%"),t.parentNode.replaceChild(s,t)}else console.warn(`[ProjectDetail] Legacy element not found: ${a}`),t.innerHTML='<span class="v2-error-text">Element missing</span>'})}function Qn(){return`
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
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomOut" title="${$("v2.detail.diagram.zoomOut")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ResetView" title="${$("v2.detail.diagram.resetView")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomIn" title="${$("v2.detail.diagram.zoomIn")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <div class="v2-vr"></div>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2DownloadDiagram" title="${$("v2.detail.diagram.download")}">
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
    `}function Xn(e){const n=e.querySelector("#v2BackToProjects");n&&n.addEventListener("click",Kn);const t=e.querySelector("#v2PrintProjectBtn");t&&t.addEventListener("click",()=>{if(confirm('Do you want to set the project status to "Waiting for Approval"?')){_t(N,"Waiting for Approval");const y=document.getElementById("v2ProjectStatus");y&&(y.value="Waiting for Approval",je(y))}if(console.log("[ProjectDetail] Triggering Print/Export"),typeof window.openLegacyPrintDialog=="function"){window.openLegacyPrintDialog();return}E.cineFeaturePrint&&typeof E.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?E.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof E.triggerOverviewPrintWorkflow=="function"?E.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()});const a=e.querySelector("#v2SaveProjectBtn");a&&a.addEventListener("click",()=>{if(E.cineLegacyShim&&N){const y=document.getElementById("saveSetupBtn");y&&y.click()}});function i(){if(!N)return;const y=At(N);let g={};E.getCurrentProjectInfo&&typeof E.getCurrentProjectInfo=="function"?g=E.getCurrentProjectInfo():g={projectName:N};const v=Object.assign({},g,{prepDays:y.prepDays||[],shootingDays:y.shootingDays||[],returnDays:y.returnDays||[],projectName:N});E.populateProjectForm&&typeof E.populateProjectForm=="function"?E.populateProjectForm(v):console.warn("[ProjectDetail] populateProjectForm not found"),me("requirements");const l=document.getElementById("tab-requirements");l&&l.scrollIntoView({behavior:"smooth"})}const r=e.querySelector("#v2GenerateReqsGearBtn");r&&r.addEventListener("click",()=>{i()});const o=e.querySelector("#v2ExportProjectBtn");o&&o.addEventListener("click",()=>{const y=document.getElementById("shareSetupBtn");y&&y.click()});const s=e.querySelector("#v2GenerateOverviewBtn");s&&s.addEventListener("click",()=>{const y=document.getElementById("generateOverviewBtn");y&&y.click()});const c=e.querySelector("#v2GenerateRequirementsBtn");c&&(c.innerHTML='<i class="fas fa-save"></i> Save & Generate Gear List',c.addEventListener("click",()=>{let y={};E.collectProjectFormData&&typeof E.collectProjectFormData=="function"?y=E.collectProjectFormData():console.warn("[ProjectDetail] collectProjectFormData not found");let g="";if(E.generateGearListHtml&&typeof E.generateGearListHtml=="function")g=E.generateGearListHtml(y);else{alert("Error: Generator module not found.");return}if(E.getSafeGearListHtmlSections&&typeof E.getSafeGearListHtmlSections=="function"){const v=E.getSafeGearListHtmlSections(g),l=document.getElementById("v2RequirementsOutput");l&&(v.projectHtml?(l.innerHTML=v.projectHtml,l.style.display="block"):l.style.display="none");const d=document.getElementById("v2KitListContainer");d&&v.gearHtml?d.innerHTML=v.gearHtml:d&&(d.innerHTML='<p class="v2-text-muted">No gear list items generated.</p>'),alert("Requirements Saved & Gear List Generated!")}}));const u=e.querySelector("#v2GenerateGearListBtn");u&&u.addEventListener("click",()=>{i()}),e.querySelectorAll(".v2-tab-btn").forEach(y=>{y.addEventListener("click",()=>{const g=y.dataset.tab;me(g)})});const m=e.querySelector("#v2DownloadDiagram");m&&m.addEventListener("click",y=>{const g=document.getElementById("downloadDiagram");if(g){const v=new MouseEvent("click",{bubbles:!0,cancelable:!0,shiftKey:y.shiftKey});g.dispatchEvent(v)}else console.warn("[ProjectDetail] Legacy download button not found")}),setTimeout(()=>oa(e),0)}function qt(){if(!N)return;if(!E.cineFeaturesConnectionDiagram||typeof E.cineFeaturesConnectionDiagram.createConnectionDiagram!="function"){console.warn("[ProjectDetail] Connection Diagram module not found.");return}if(!document.getElementById("v2-diagram-area"))return;console.log("[ProjectDetail] Rendering Power Diagram...");const t={getSetupDiagramContainer:()=>document.getElementById("v2-diagram-area"),getDiagramLegend:()=>document.getElementById("v2-diagram-legend"),getDiagramHint:()=>document.getElementById("v2-diagram-hint"),getDownloadDiagramBtn:()=>document.getElementById("v2DownloadDiagram"),getZoomInBtn:()=>document.getElementById("v2ZoomIn"),getZoomOutBtn:()=>document.getElementById("v2ZoomOut"),getResetViewBtn:()=>document.getElementById("v2ResetView"),getDiagramDetailDialog:()=>{const a=document.getElementById("diagramDetailDialog");return a&&a.closest("#mainContent")&&document.body.appendChild(a),a},getDiagramDetailContent:()=>document.getElementById("diagramDetailDialogContent")};if(!document.getElementById("v2-diagram-css")){const a=typeof E.cineFeaturesConnectionDiagram.getDiagramCss=="function"?E.cineFeaturesConnectionDiagram.getDiagramCss(!1):"";if(a){const i=document.createElement("style");i.id="v2-diagram-css",i.textContent=a,document.head.appendChild(i)}}try{E.cineFeaturesConnectionDiagram.createConnectionDiagram(t)}catch(a){console.error("[ProjectDetail] Error rendering diagram:",a)}}function je(e){const t=e.value.toLowerCase().replace(/\s+/g,"-");e.classList.remove("draft","planning","waiting-for-approval","approved","shooting","completed","archived"),e.classList.add(t)}function Ye(){const e={heroTotalDraw:"v2TotalDraw",heroRuntime:"v2Runtime",heroBatteryCount:"v2BatteryCount",heroCurrent144:"v2Current144",heroCurrent12:"v2Current12"};Object.keys(e).forEach(n=>{const t=document.getElementById(n),a=document.getElementById(e[n]);t&&a&&(a.textContent=t.textContent)}),Vt()==="power"&&setTimeout(()=>qt(),50)}function ea(){const e=document.getElementById("results");if(!e){console.warn("[ProjectDetail] Legacy results container not found. Auto-sync disabled.");return}new MutationObserver(()=>{Ye()}).observe(e,{childList:!0,subtree:!0,characterData:!0}),console.log("[ProjectDetail] Power observer started")}function ta(){if(!dt){if(dt=!0,ea(),Ye(),document.addEventListener("v2:viewchange",ut),E.cineViewManager&&typeof E.cineViewManager.getCurrentView=="function"&&E.cineViewManager.getCurrentView()==="projectDetail"){const n=E.cineViewManager.getCurrentParams?E.cineViewManager.getCurrentParams():{};n&&n.projectId&&(console.log("[ProjectDetail] Already on projectDetail, triggering render"),ut({detail:{view:"projectDetail",params:n}}))}console.log("[ProjectDetail] Initialized")}}function ut(e){const{view:n,params:t}=e.detail||{};if(n==="projectDetail"&&t&&t.projectId){console.log("[ProjectDetail] View change detected, loading:",t.projectId);const a=document.getElementById(re);if(!a){console.warn("[ProjectDetail] View element not found:",re);return}a.querySelector(".view-header")||Rt(),Ht(t.projectId),t.tab&&me(t.tab),t.action==="print"&&(console.log("[ProjectDetail] Auto-triggering print workflow"),setTimeout(()=>{E.cineFeaturePrint&&typeof E.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?E.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof E.triggerOverviewPrintWorkflow=="function"?E.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()},800))}}function na(e){return typeof e!="string"?"":e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}function aa(e){const n=E.texts?E.texts[e]:null;if(!n){console.warn(`[ProjectDetail] Translation key not found: ${e}`);return}const t=na(n);console.log(`[ProjectDetail] Triggering Add Custom for: ${n} (${t})`);const a=document.querySelector(`[data-gear-custom-add="${t}"]`);a?a.click():(console.warn(`[ProjectDetail] Legacy Add Button not found for slug: ${t}`),alert(`Could not open Add Custom dialog for ${n}. Legacy element missing.`))}function oa(e){[{cardId:"v2-camera-card",key:"category_cameras"},{cardId:"v2-power-card",key:"category_batteries"}].forEach(({cardId:t,key:a})=>{const i=e.querySelector(`#${t}`);if(!i)return;const r=i.querySelector(".v2-card-header");if(!r||r.querySelector(".v2-add-custom-btn"))return;const o=document.createElement("button");o.type="button",o.className="v2-btn v2-btn-sm v2-btn-ghost v2-add-custom-btn",o.title="Add Custom Item",o.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `,o.addEventListener("click",s=>{s.stopPropagation(),aa(a)}),r.appendChild(o)})}const Ze={init:ta,createDetailViewContent:Rt,loadProject:Ht,getCurrentProject:Un,switchTab:me,getCurrentTab:Vt,syncLegacyResultsToV2:Ye};typeof E<"u"&&(E.cineProjectDetail=Ze);typeof window<"u"&&(window.cineProjectDetail=Ze);const ia=Object.freeze(Object.defineProperty({__proto__:null,ProjectDetail:Ze},Symbol.toStringTag,{value:"Module"})),te=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},vt="v2-sidebar-search",Qe="v2SidebarSearchInput",Ot="darkMode",Ft="cameraPowerPlanner_pinkMode",sa="pinkMode",ra={"All Projects":"v2.sidebar.nav.allProjects","Active Projects":"v2.sidebar.nav.activeProjects",Archive:"v2.sidebar.nav.archive","Auto Backups":"v2.sidebar.nav.autoBackups","Device Library":"v2.sidebar.nav.deviceLibrary",Contacts:"v2.sidebar.nav.contacts","Auto Gear Rules":"v2.sidebar.nav.autoGearRules","Owned Gear":"v2.sidebar.nav.ownedGear","Create New Project":"v2.sidebar.nav.createProject",Projects:"v2.sidebar.nav.projectsSection",Tools:"v2.sidebar.nav.toolsSection",Support:"v2.sidebar.nav.supportSection",Help:"v2.sidebar.nav.help",Settings:"v2.sidebar.nav.settings"};function Ve(e,n={},t=null){const a=t||document.documentElement.lang||"en";let i=window.texts&&window.texts[a]?window.texts[a]:null;!i&&window.texts&&(i=window.texts.en);const r=(s,c)=>c.split(".").reduce((u,f)=>u?u[f]:null,s);let o=i?r(i,e):null;if(!o&&a!=="en"&&window.texts&&window.texts.en&&(o=r(window.texts.en,e)),!o)return e;if(typeof o=="string")for(const[s,c]of Object.entries(n))o=o.replace(`{${s}}`,c);return o}function la(){console.log("[V2 Sidebar] Initializing...");const e=document.querySelector(".v2-sidebar");if(!e){console.error("[V2 Sidebar] .v2-sidebar not found. Cannot inject controls.");return}ca(e),da(e),va(e),ua(),wa(),ba(),fa(),pa(),ma();const n=document.getElementById("languageSelect");n&&be(n.value)}function ca(e){if(e.querySelector(".v2-sidebar-header"))return;const n=document.createElement("div");n.className="v2-sidebar-header";const t=document.createElement("img");t.src="src/icons/Icon Bluenew.svg",t.className="v2-sidebar-logo",t.alt="Logo";const a=document.createElement("h1");a.className="v2-sidebar-title",a.innerHTML="Cine Power<br>Planner",n.appendChild(t),n.appendChild(a),e.insertBefore(n,e.firstChild)}function da(e){if(e.querySelector(".v2-sidebar-controls-container"))return;const n=document.createElement("div");n.className="v2-sidebar-controls-container";const t=document.createElement("div");t.className="v2-controls-row-1",ya(t),Sa(t),ha(t),n.appendChild(t);const a=e.querySelector(".v2-sidebar-footer");a?a.insertAdjacentElement("beforebegin",n):e.appendChild(n)}function ua(){const e=document.getElementById(Qe),n=document.getElementById("featureSearch");!e||!n||(e.addEventListener("input",t=>{t.stopPropagation(),n.value=t.target.value,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))}),e.addEventListener("focus",()=>{n.dispatchEvent(new Event("focus",{bubbles:!0}))}),e.addEventListener("blur",()=>{setTimeout(()=>{n.dispatchEvent(new Event("blur",{bubbles:!0}))},200)}),e.addEventListener("keydown",t=>{if(t.stopPropagation(),!["ArrowUp","ArrowDown","Enter","Escape"].includes(t.key))return;const i=new KeyboardEvent("keydown",{key:t.key,code:t.code,keyCode:t.keyCode,bubbles:!0,cancelable:!0});n.dispatchEvent(i)}),e.addEventListener("input",t=>{const a=t.target.value.trim();window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:a}}))}))}function va(e){if(e.querySelector(`.${vt}`))return;const n=document.createElement("div");n.className=vt,n.innerHTML=`
            <div class="v2-search-input-wrapper">
                <svg class="v2-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" id="${Qe}" class="v2-search-input" placeholder="${Ve("v2.sidebar.search.placeholder")}" aria-label="Search features">
            </div>
        `;const t=e.querySelector(".v2-sidebar-header");if(t)t.insertAdjacentElement("afterend",n);else{const a=e.querySelector(".v2-sidebar-nav");a?e.insertBefore(n,a):e.insertBefore(n,e.firstChild)}setTimeout(()=>{const a=document.getElementById("featureSearchDropdown"),i=n.querySelector(".v2-search-input-wrapper");a&&i&&(i.appendChild(a),a.style.top="110%",a.style.left="0",a.style.visibility="visible",a.style.display="none")},1e3)}function pa(){document.addEventListener("click",e=>{e.target.closest("#closeHelp")&&(e.preventDefault(),e.stopImmediatePropagation(),ga())})}function ga(){const e=document.getElementById("helpDialog");e&&(e.setAttribute("hidden",""),e.style.display="none",typeof te.closeDialog=="function"&&te.closeDialog(e))}function ma(){const e=document.getElementById("helpButton"),n=document.querySelector('[data-nav-key="openHelpNav"]'),t=a=>{a.preventDefault(),a.stopImmediatePropagation(),window.location.hash="/help"};e&&e.addEventListener("click",t),n&&n.addEventListener("click",t),document.addEventListener("keydown",a=>{a.target.matches("input, textarea, [contenteditable]")||((a.key==="?"&&a.shiftKey||a.key==="H"||a.key==="h"||a.key==="F1")&&t(a),a.key==="/"&&(a.ctrlKey||a.metaKey)&&t(a))},!0)}function ba(){const e=document.getElementById("navAutoBackups");if(e){const a=localStorage.getItem("cineAutoRecover")==="true";e.style.display=a?"flex":"none"}const n=document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link");n.forEach(a=>{a.addEventListener("click",()=>{n.forEach(i=>i.classList.remove("active")),a.classList.add("active")})});const t=window.location.hash;t&&n.forEach(a=>{a.getAttribute("href")===t&&a.classList.add("active")})}function fa(){const e=document.querySelectorAll(".v2-mobile-menu-toggle"),n=document.getElementById("v2-app"),t=document.querySelector(".v2-sidebar-overlay");if(!n)return;function a(){n.classList.add("sidebar-open")}function i(){n.classList.remove("sidebar-open")}e.forEach(s=>{s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),a()})}),t&&t.addEventListener("click",i),document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link").forEach(s=>{s.addEventListener("click",()=>{window.innerWidth<=768&&i()})});const o=document.getElementById("v2ExitBtn");o&&o.addEventListener("click",i)}function ya(e){if(!e||e.querySelector(".v2-lang-select-wrapper"))return;const n=document.getElementById("languageSelect"),t=n?n.value:"en",a=document.createElement("div");a.className="v2-lang-select-wrapper",a.innerHTML=`
            <select class="v2-lang-select" aria-label="Select Language">
                <option value="en" ${t==="en"?"selected":""}>English</option>
                <option value="de" ${t==="de"?"selected":""}>Deutsch</option>
                <option value="es" ${t==="es"?"selected":""}>Español</option>
                <option value="fr" ${t==="fr"?"selected":""}>Français</option>
                <option value="it" ${t==="it"?"selected":""}>Italiano</option>
            </select>
        `;const i=a.querySelector("select");i.addEventListener("change",r=>{const o=r.target.value;n&&(n.value=o,n.dispatchEvent(new Event("change",{bubbles:!0})),typeof te.updateLanguage=="function"&&te.updateLanguage(o),be(o))}),n&&n.addEventListener("change",()=>{i.value!==n.value&&(i.value=n.value,be(n.value))}),e.appendChild(a)}function ha(e){if(e.querySelector("#v2RefreshBtn"))return;const n=document.createElement("button");n.className="v2-tool-btn",n.id="v2RefreshBtn",n.title="Force reload",n.setAttribute("aria-label","Force reload"),n.innerHTML=`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="23 4 23 10 17 10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `,n.addEventListener("click",()=>{const t=document.getElementById("reloadButton");t?t.click():window.location.reload(!0)}),e.appendChild(n)}function be(e){document.querySelectorAll(".v2-sidebar-link-text, .v2-sidebar-section-title").forEach(a=>{a.dataset.key||(a.dataset.key=a.textContent.trim());const i=a.dataset.key,r=ra[i];r&&(a.textContent=Ve(r,{},e))});const t=document.getElementById(Qe);t&&(t.placeholder=Ve("v2.sidebar.search.placeholder",{},e))}te.updateSidebarTranslations=be;function wa(){ka()}function Sa(e){if(e.querySelector("#v2ThemeToggleDark"))return;const n=document.createElement("button");n.className="v2-theme-toggle",n.id="v2ThemeToggleDark",n.setAttribute("aria-label","Toggle dark mode"),n.setAttribute("aria-pressed","false"),n.setAttribute("title","Toggle dark mode"),n.innerHTML=`
            <span class="v2-icon-moon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xEC7E;</span>
            <span class="v2-icon-sun icon-glyph" aria-hidden="true" data-icon-font="uicons" style="display:none">&#xF1FE;</span>
        `,n.addEventListener("click",Ea);const t=document.createElement("button");t.className="v2-theme-toggle",t.id="v2ThemeTogglePink",t.setAttribute("aria-label","Toggle pink mode"),t.setAttribute("aria-pressed","false"),t.setAttribute("title","Toggle pink mode"),t.setAttribute("data-theme","pink"),t.innerHTML=`
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
        `,t.addEventListener("click",La),e.appendChild(n),e.appendChild(t)}function ka(){const e=localStorage.getItem(Ot)==="true";Nt(e);const n=localStorage.getItem(Ft)==="true";Gt(n)}function Ea(){const n=!document.body.classList.contains("dark-mode");Nt(n),localStorage.setItem(Ot,n)}function Nt(e){document.body.classList.toggle("dark-mode",e),document.body.classList.toggle("light-mode",!e);const n=document.getElementById("v2ThemeToggleDark");if(n){n.classList.toggle("active",e);const t=n.querySelector(".v2-icon-moon"),a=n.querySelector(".v2-icon-sun");t&&a&&(t.style.display=e?"none":"block",a.style.display=e?"block":"none")}}function La(){const n=!document.body.classList.contains("pink-mode");Gt(n),localStorage.setItem(Ft,n),localStorage.setItem(sa,n)}function Gt(e){document.body.classList.toggle("pink-mode",e),Ca(e);const n=document.getElementById("v2ThemeTogglePink");n&&n.classList.toggle("active",e)}function Ca(e){const n=document.querySelector(".v2-sidebar-logo");n&&(n.src=e?"src/icons/Icon Pinknew.svg":"src/icons/Icon Bluenew.svg")}const Xe={init:la};typeof te<"u"&&(te.cineV2Sidebar=Xe);typeof window<"u"&&(window.cineV2Sidebar=Xe);const $a=Object.freeze(Object.defineProperty({__proto__:null,V2Sidebar:Xe},Symbol.toStringTag,{value:"Module"}));class Ia{constructor(n){this.viewId=n,this.container=null,this.isInitialized=!1}init(){if(this.isInitialized)return;if(console.log(`[View: ${this.viewId}] Initializing...`),this.container=document.getElementById(this.viewId),!this.container){const t=document.querySelector(".v2-app")||document.body;this.container=document.createElement("div"),this.container.id=this.viewId,this.container.className="app-view",t.appendChild(this.container)}const n=this.viewId.replace(/^view-/,"");window.cineViewManager&&window.cineViewManager.registerView(n,{onEnter:t=>this.render(t),onLeave:()=>this.onLeave&&this.onLeave()}),this.isInitialized=!0}render(n){console.warn(`[View: ${this.viewId}] Render method not implemented`)}onLeave(){}escapeHtml(n){return n?String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}}class zt extends Ia{constructor(){super("rules"),this.devicesLocal={}}async render(){if(!window.getAutoGearRules){this.container.innerHTML=`
                <div class="v2-loading-state">
                    <div class="v2-spinner"></div>
                    <p class="v2-text-muted">Loading Auto Gear Core...</p>
                </div>
            `,setTimeout(()=>this.render(),500);return}const n=window.getAutoGearRules()||[],t=n.length,a=`
            <div class="v2-view-header">
                <div>
                    <h1 class="v2-view-title">Auto Gear Rules</h1>
                    <p class="v2-view-subtitle">Define automatic equipment packages based on shoot conditions.</p>
                </div>
                <div class="v2-actions-group">
                    <button class="v2-btn v2-btn-secondary" id="v2-ag-import">Import</button>
                    <button class="v2-btn v2-btn-secondary" id="v2-ag-export">Export</button>
                    <button class="v2-btn v2-btn-primary" id="v2-ag-add">
                        <span class="v2-icon">add</span> New Rule
                    </button>
                </div>
            </div>
        `;t===0?this.container.innerHTML=a+`
                <div class="v2-empty-state">
                    <div class="v2-empty-icon">rule</div>
                    <h3>No Rules Defined</h3>
                    <p>Create rules to automatically add gear (like specific monitors for a director) based on the scenario.</p>
                    <button class="v2-btn v2-btn-primary" id="v2-ag-add-empty">Create First Rule</button>
                </div>
            `:this.container.innerHTML=a+`
                <div class="v2-rules-grid">
                    ${n.map((i,r)=>this.renderRuleCard(i,r)).join("")}
                </div>
            `,this.attachListeners()}renderRuleCard(n,t){const a=(n.addItems||[]).length,i=this.countConditions(n);return`
            <div class="v2-card v2-rule-card" data-index="${t}">
                <div class="v2-card-header">
                    <div class="v2-rule-title-group">
                        <div class="v2-rule-status ${n.enabled?"active":"inactive"}"></div>
                        <h3 class="v2-card-title">${this.escapeHtml(n.name||"Unnamed Rule")}</h3>
                    </div>
                     <div class="v2-card-actions">
                        <button class="v2-btn-icon" data-action="edit" data-index="${t}" title="Edit">edit</button>
                        <button class="v2-btn-icon v2-danger-hover" data-action="delete" data-index="${t}" title="Delete">delete</button>
                    </div>
                </div>
                <div class="v2-card-body">
                    <div class="v2-rule-meta">
                        <span class="v2-tag">${n.scenarioMode||"All Scenarios"}</span>
                        <span class="v2-tag v2-tag-outline">${i} Conditions</span>
                        <span class="v2-tag v2-tag-outline">${a} Actions</span>
                    </div>
                    ${n.always?'<div class="v2-badge v2-badge-accent">Always Active</div>':""}
                </div>
            </div>
        `}countConditions(n){let t=0;return n.scenarios&&n.scenarios.length&&(t+=n.scenarios.length),n.cameras&&n.cameras.length&&t++,n.cameraHandles&&n.cameraHandles.length&&t++,n.monitors&&n.monitors.length&&t++,t}attachListeners(){const n=this.container.querySelector("#v2-ag-import");n&&n.addEventListener("click",()=>this.handleImport());const t=this.container.querySelector("#v2-ag-export");t&&t.addEventListener("click",()=>this.handleExport()),this.container.querySelectorAll("#v2-ag-add, #v2-ag-add-empty").forEach(i=>i.addEventListener("click",()=>this.showEditRuleModal({},!0))),this.container.querySelectorAll('[data-action="edit"]').forEach(i=>{i.addEventListener("click",r=>{const o=parseInt(r.currentTarget.dataset.index,10),s=window.getAutoGearRules();s&&s[o]&&this.showEditRuleModal(s[o],!1,o)})}),this.container.querySelectorAll('[data-action="delete"]').forEach(i=>{i.addEventListener("click",r=>{const o=parseInt(r.currentTarget.dataset.index,10);this.deleteRule(o)})})}collectData(){const n=window.devices||{};return{cameras:Object.keys(n.cameras||{}).sort(),monitors:Object.keys(n.monitors||{}).sort(),video:Object.keys(n.video||{}).sort(),cameraHandles:this.getHardcodedOptions("cameraHandle"),scenarios:window.SCENARIOS||["Studio","Location","Handheld","Gimbal","Steadicam","Crane","Drone","Underwater","Car Mount"],viewfinders:Object.keys(n.viewfinders||{}).sort(),matteboxes:Object.keys(n.matteboxes||{}).sort(),tripodHeads:Object.keys(n.tripodHeads||{}).sort(),tripodBowls:["75mm","100mm","150mm","Flat","Mitchell"],wireless:Object.keys(n.wireless||{}).sort()}}getHardcodedOptions(n){return n==="cameraHandle"?["Blue Shape Top Handle","ARRI CCH-4","ARRI HEB-3","Wooden Camera Master Top Handle"]:n==="deliveryResolution"?["1080p","2K","4K UHD","4K DCI","6K","8K"]:[]}showEditRuleModal(n,t,a=-1){const i=this.collectData(),r=JSON.parse(JSON.stringify(n));r.scenarios||(r.scenarios=[]),r.addItems||(r.addItems=[]);const o=r.scenarios||[],s=document.createElement("div");s.className="v2-modal-backdrop",s.innerHTML=`
            <div class="v2-modal v2-modal-lg">
                <div class="v2-modal-header">
                    <h2>${t?"New Rule":"Edit Rule"}</h2>
                    <button class="v2-modal-close">&times;</button>
                </div>
                <div class="v2-modal-body v2-layout-sidebar">
                    <div class="v2-sidebar-nav">
                        <button class="v2-nav-item active" data-tab="general">General</button>
                        <button class="v2-nav-item" data-tab="camera">Camera</button>
                        <button class="v2-nav-item" data-tab="monitoring">Monitoring</button>
                        <button class="v2-nav-item" data-tab="support">Support</button>
                        <button class="v2-nav-item" data-tab="crew">Crew</button>
                        <button class="v2-nav-item" data-tab="actions">Actions</button>
                    </div>
                    <div class="v2-tab-content active" id="tab-general">
                        <div class="v2-form-group">
                            <label>Rule Name</label>
                            <input type="text" class="v2-input" id="rule-name" value="${this.escapeHtml(r.name||"")}" placeholder="e.g. Director's Monitor">
                        </div>
                        <div class="v2-form-check">
                            <input type="checkbox" id="rule-enabled" ${r.enabled!==!1?"checked":""}>
                            <label for="rule-enabled">Rule Enabled</label>
                        </div>
                        <div class="v2-form-check">
                            <input type="checkbox" id="rule-always" ${r.always?"checked":""}>
                            <label for="rule-always">Always Apply (Ignore Scenarios)</label>
                        </div>
                        <hr class="v2-divider">
                        <div class="v2-form-group">
                            <label>Scenario Logic</label>
                            <select class="v2-select" id="rule-scenario-mode">
                                <option value="any" ${r.scenarioMode==="any"?"selected":""}>Match ANY selected scenario</option>
                                <option value="all" ${r.scenarioMode==="all"?"selected":""}>Match ALL selected scenarios</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label>Scenarios</label>
                            <div class="v2-checkbox-grid">
                                ${i.scenarios.map(l=>`
                                    <label class="v2-checkbox-label">
                                        <input type="checkbox" class="scenario-check" value="${l}" ${o.includes(l)?"checked":""}>
                                        ${l}
                                    </label>
                                `).join("")}
                            </div>
                        </div>
                        <div class="v2-form-group">
                             <label>Shooting Days (Optional)</label>
                             <div class="v2-row-gap">
                                <select class="v2-select" id="rule-days-cond">
                                    <option value="">(Ignore)</option>
                                    <option value="min" ${r.shootingDaysCondition==="min"?"selected":""}>Minimum Days</option>
                                    <option value="max" ${r.shootingDaysCondition==="max"?"selected":""}>Maximum Days</option>
                                </select>
                                <input type="number" class="v2-input v2-input-sm" id="rule-days-val" value="${r.shootingDaysValue||""}" min="1">
                             </div>
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-camera" style="display:none;">
                        ${this.renderMultiSelect("Cameras","cameras",i.cameras,r.cameras)}
                        ${this.renderMultiSelect("Matteboxes","matteboxes",i.matteboxes,r.matteboxes)}
                        ${this.renderMultiSelect("Camera Handles","cameraHandles",i.cameraHandles,r.cameraHandles)}
                        ${this.renderMultiSelect("Viewfinders","viewfinders",i.viewfinders,r.viewfinders)}
                         <div class="v2-form-group">
                            <label>Delivery Resolution</label>
                            <select class="v2-select" id="rule-delivery-res">
                                <option value="">(Any)</option>
                                ${this.getHardcodedOptions("deliveryResolution").map(l=>`<option value="${l}" ${r.deliveryResolution===l?"selected":""}>${l}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-monitoring" style="display:none;">
                         ${this.renderMultiSelect("Monitors","monitors",i.monitors,r.monitors)}
                         ${this.renderMultiSelect("Video Distribution","videoDist",i.video,r.videoDistribution)}
                         ${this.renderMultiSelect("Wireless Video","wireless",i.wireless,r.wireless)}
                    </div>

                    <div class="v2-tab-content" id="tab-support" style="display:none;">
                        ${this.renderMultiSelect("Tripod Heads","tripodHeads",i.tripodHeads,r.tripodHeads)}
                        ${this.renderMultiSelect("Tripod Bowls","tripodBowls",i.tripodBowls,r.tripodBowls)}
                    </div>

                    <div class="v2-tab-content" id="tab-crew" style="display:none;">
                        <p class="v2-text-muted">Requires specific crew members to be present/absent.</p>
                         <div class="v2-form-group">
                            <label>Crew Present (Comma separated)</label>
                            <input type="text" class="v2-input" id="rule-crew-present" value="${(r.crewPresent||[]).join(", ")}">
                        </div>
                        <div class="v2-form-group">
                            <label>Crew Absent (Comma separated)</label>
                            <input type="text" class="v2-input" id="rule-crew-absent" value="${(r.crewAbsent||[]).join(", ")}">
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-actions" style="display:none;">
                        <h3>Items to Add</h3>
                        <p class="v2-text-muted">When rule matches, these items are added to the list.</p>
                        
                        <div class="v2-action-list" id="rule-action-list">
                            ${this.renderActionListItems(r.addItems)}
                        </div>
                        
                        <div class="v2-add-item-row">
                            <input type="text" class="v2-input" id="new-item-name" placeholder="Search item...">
                            <input type="number" class="v2-input v2-input-sm" id="new-item-qty" value="1" min="1">
                            <button class="v2-btn v2-btn-secondary" id="btn-add-action-item">Add</button>
                        </div>
                    </div>
                </div>
                <div class="v2-modal-footer">
                    <button class="v2-btn v2-btn-ghost" id="v2-modal-cancel">Cancel</button>
                    <button class="v2-btn v2-btn-primary" id="v2-modal-save">Save Rule</button>
                </div>
            </div>
        `,document.body.appendChild(s);const c=()=>{s.remove()};s.querySelector(".v2-modal-close").onclick=c,s.querySelector("#v2-modal-cancel").onclick=c;const u=s.querySelectorAll(".v2-nav-item"),f=s.querySelectorAll(".v2-tab-content");u.forEach(l=>{l.onclick=()=>{u.forEach(p=>p.classList.remove("active")),f.forEach(p=>{p.style.display="none",p.classList.remove("active")}),l.classList.add("active");const d=s.querySelector(`#tab-${l.dataset.tab}`);d&&(d.style.display="block",setTimeout(()=>d.classList.add("active"),10))}});const m=s.querySelector("#rule-action-list"),y=s.querySelector("#btn-add-action-item"),g=s.querySelector("#new-item-name"),v=s.querySelector("#new-item-qty");y.onclick=()=>{const l=g.value.trim(),d=parseInt(v.value,10);l&&(r.addItems.push({name:l,qty:d}),m.innerHTML=this.renderActionListItems(r.addItems),g.value="",this.bindRemoveActionEvents(m,r))},this.bindRemoveActionEvents(m,r),s.querySelector("#v2-modal-save").onclick=()=>{const l={...r,name:s.querySelector("#rule-name").value.trim(),enabled:s.querySelector("#rule-enabled").checked,always:s.querySelector("#rule-always").checked,scenarioMode:s.querySelector("#rule-scenario-mode").value,scenarios:Array.from(s.querySelectorAll(".scenario-check:checked")).map(d=>d.value),shootingDaysCondition:s.querySelector("#rule-days-cond").value,shootingDaysValue:parseInt(s.querySelector("#rule-days-val").value,10)||0,cameras:this.collectMultiSelect(s,"cameras"),matteboxes:this.collectMultiSelect(s,"matteboxes"),cameraHandles:this.collectMultiSelect(s,"cameraHandles"),viewfinders:this.collectMultiSelect(s,"viewfinders"),monitors:this.collectMultiSelect(s,"monitors"),videoDistribution:this.collectMultiSelect(s,"videoDist"),wireless:this.collectMultiSelect(s,"wireless"),tripodHeads:this.collectMultiSelect(s,"tripodHeads"),tripodBowls:this.collectMultiSelect(s,"tripodBowls"),deliveryResolution:s.querySelector("#rule-delivery-res").value,crewPresent:s.querySelector("#rule-crew-present").value.split(",").map(d=>d.trim()).filter(d=>d),crewAbsent:s.querySelector("#rule-crew-absent").value.split(",").map(d=>d.trim()).filter(d=>d)};if(!l.name){alert("Rule name is required");return}this.saveRule(l,t,a),c()}}renderMultiSelect(n,t,a,i=[]){if(!a||a.length===0)return"";const r=i||[];return`
            <div class="v2-form-group">
                <label>${n}</label>
                <div class="v2-multi-select-container">
                    ${a.map(o=>`
                         <label class="v2-checkbox-label">
                            <input type="checkbox" class="multi-${t}" value="${this.escapeHtml(o)}" ${r.includes(o)?"checked":""}>
                            <span>${this.escapeHtml(o)}</span>
                        </label>
                    `).join("")}
                </div>
            </div>
        `}collectMultiSelect(n,t){return Array.from(n.querySelectorAll(`.multi-${t}:checked`)).map(a=>a.value)}renderActionListItems(n){return!n||!n.length?'<p class="v2-text-muted">No items added yet.</p>':n.map((t,a)=>`
            <div class="v2-action-item">
                <span class="v2-badge v2-badge-outline item-qty">${t.qty}x</span>
                <span class="item-name">${this.escapeHtml(t.name)}</span>
                <button class="v2-btn-icon-sm v2-danger-hover remove-action-item" data-idx="${a}">&times;</button>
            </div>
        `).join("")}bindRemoveActionEvents(n,t){n.querySelectorAll(".remove-action-item").forEach(a=>{a.onclick=i=>{const r=parseInt(i.target.dataset.idx,10);t.addItems.splice(r,1),n.innerHTML=this.renderActionListItems(t.addItems),this.bindRemoveActionEvents(n,t)}})}saveRule(n,t,a){const i=window.getAutoGearRules()||[];t?i.push(n):i[a]=n,window.setAutoGearRules?(window.setAutoGearRules(i),window.requestAutoSave&&window.requestAutoSave(),this.render()):console.error("Core function setAutoGearRules not available")}deleteRule(n){if(!confirm("Are you sure you want to delete this rule?"))return;const t=window.getAutoGearRules()||[];t.splice(n,1),window.setAutoGearRules(t),window.requestAutoSave&&window.requestAutoSave(),this.render()}}typeof window<"u"&&(window.cineRulesView=new zt);const xa=Object.freeze(Object.defineProperty({__proto__:null,RulesView:zt},Symbol.toStringTag,{value:"Module"}));(function(e){const n="v2-device-library-content",t="device-manager";let a=!1,i=!1;function r(l){if(typeof window<"u"&&window.texts){const d=document.getElementById("languageSelect"),p=d&&d.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",h=window.texts[p]||window.texts.en;if(h)return l.split(".").reduce((b,w)=>b?b[w]:null,h)||l}return l}function o(){const l=document.createElement("header");return l.className="view-header",l.innerHTML=`
            <div class="header-content">
                <h1>${r("deviceLibraryTitle")||"Device Library"}</h1>
                <p class="header-subtitle">${r("deviceLibrarySubtitle")||"Database Management"} / ${r("v2ui.revision")||"REV.01"}</p>
            </div>
            <div class="view-header-actions">
                <button class="v2-btn" id="v2-export-db-btn">
                    <span class="icon">download</span>
                    <span>Export</span>
                </button>
                <button class="v2-btn" id="v2-import-db-btn">
                    <span class="icon">upload</span>
                    <span>Import</span>
                </button>
            </div>
        `,l}function s(){if(i)return;console.log("[DeviceLibraryView] Reparenting legacy content...");const l=document.getElementById(n),d=document.getElementById(t);if(!l){console.error(`[DeviceLibraryView] V2 Container #${n} not found.`);return}if(!d){console.error(`[DeviceLibraryView] Legacy Container #${t} not found.`);return}l.innerHTML="",l.appendChild(o());const p=document.createElement("div");p.className="device-library-layout";const h=document.createElement("div");h.className="v2-panel device-list-panel";const b=document.createElement("div");b.className="panel-header",b.innerHTML=`
            <span class="panel-title">
                <span class="icon">inventory_2</span>
                ${r("existingDevicesTitle")||"Inventory"}
            </span>
        `,h.appendChild(b);const w=document.createElement("div");w.className="panel-content";const k=d.querySelector(".device-library-search");if(k){const M=k.querySelector("input");M&&(M.classList.add("v2-input"),M.placeholder=r("searchPlaceholder")||"Search database..."),w.appendChild(k)}const x=d.querySelector("#deviceListContainer");x&&(x.classList.add("v2-device-list"),w.appendChild(x)),h.appendChild(w),p.appendChild(h);const T=document.createElement("div");T.className="v2-panel device-form-panel";const Q=document.createElement("div");Q.className="panel-header",Q.innerHTML=`
            <span class="panel-title">
                <span class="icon">tune</span>
                ${r("deviceProperties")||"Device Properties"}
            </span>
        `,T.appendChild(Q);const H=document.createElement("div");H.className="panel-content";const V=d.querySelector(".button-group");if(V){const M=V.querySelector("#addDeviceHeading");M&&M.remove(),c(V),H.appendChild(V)}for(T.appendChild(H),p.appendChild(T),l.appendChild(p);d.firstChild;){const M=d.firstChild;if(M.id==="deviceManagerHeading"||M.id==="existingDevicesHeading"){d.removeChild(M);continue}if(M.classList&&(M.classList.contains("button-group")||M.classList.contains("device-library-search"))){d.removeChild(M);continue}H.appendChild(M)}u(l),f(),i=!0,console.log("[DeviceLibraryView] Reparenting complete (Master-Detail).")}function c(l){const d={cameraFields:{icon:"videocam",title:"Camera Settings"},monitorFields:{icon:"desktop_windows",title:"Monitor Settings"},lensFields:{icon:"blur_circular",title:"Lens Settings"},viewfinderFields:{icon:"center_focus_weak",title:"Viewfinder Settings"},videoFields:{icon:"sensors",title:"Video TX Settings"},motorFields:{icon:"settings",title:"Motor Settings"},controllerFields:{icon:"tune",title:"Controller Settings"},distanceFields:{icon:"straighten",title:"Distance Sensor Settings"},batteryFields:{icon:"battery_full",title:"Battery Settings"}};Object.keys(d).forEach(h=>{const b=l.querySelector(`#${h}`);if(b&&(b.classList.add("device-form-section"),!b.querySelector(".section-header"))){const w=document.createElement("div");w.className="section-header",w.innerHTML=`
                        <span class="icon section-icon">${d[h].icon}</span>
                        <span class="section-title">${d[h].title}</span>
                    `,b.insertBefore(w,b.firstChild)}});const p={powerInputsHeading:"bolt",powerDistributionHeading:"power",videoOutputsHeading:"connected_tv",fizConnectorHeading:"settings_input_composite",mediaHeading:"sd_card",viewfinderHeading:"visibility",lensMountHeading:"camera"};Object.keys(p).forEach(h=>{const b=l.querySelector(`#${h}`);if(b&&!b.querySelector(".icon")){const w=document.createElement("span");w.className="icon",w.textContent=p[h],b.insertBefore(w,b.firstChild)}})}function u(l){l.querySelectorAll('input[type="text"], input[type="number"], input[type="search"]').forEach(k=>k.classList.add("v2-input")),l.querySelectorAll("select").forEach(k=>k.classList.add("v2-select")),l.querySelectorAll("button").forEach(k=>{k.classList.contains("v2-btn")||(k.classList.add("v2-btn"),(k.textContent.toLowerCase().includes("add")||k.textContent.toLowerCase().includes("save"))&&k.classList.add("v2-btn-primary"))}),l.querySelectorAll(".form-row").forEach(k=>k.classList.add("v2-form-row")),l.querySelectorAll("label").forEach(k=>k.classList.add("v2-label"))}function f(){const l=document.getElementById("v2-export-db-btn"),d=document.getElementById("v2-import-db-btn"),p=document.getElementById("exportDataBtn"),h=document.getElementById("importDataBtn");l&&p&&l.addEventListener("click",()=>{p.click()}),d&&h&&d.addEventListener("click",()=>{h.click()})}function m(){if(!i)return;const l=document.getElementById(n),d=document.getElementById(t);if(l&&d){const p=l.querySelector(".device-list-panel .panel-content"),h=l.querySelector(".device-form-panel .panel-content");if(p)for(;p.firstChild;)d.appendChild(p.firstChild);if(h)for(;h.firstChild;)d.appendChild(h.firstChild);for(;l.firstChild;)l.removeChild(l.firstChild);l.innerHTML=""}i=!1,console.log("[DeviceLibraryView] Restored legacy content.")}function y(){s()}function g(){a||(console.log("[DeviceLibraryView] Initializing..."),document.addEventListener("v2:viewchange",l=>{l.detail&&l.detail.view==="devices"&&y()}),document.addEventListener("v2:languagechange",()=>{i&&(i=!1,y())}),a=!0,console.log("[DeviceLibraryView] Initialized"))}const v={init:g,render:y,restoreLegacyContent:m};e.cineV2DeviceLibrary=v})(typeof window<"u"?window:void 0);const Da=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="view-contacts";let t=!1;function a(o){return typeof o!="string"?"":o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function i(o){if(typeof window<"u"&&window.texts){const s=document.getElementById("languageSelect"),c=s&&s.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",u=window.texts[c]||window.texts.en;if(u)return u[o]||o}return o}const r={container:null,init(){try{this.container=document.getElementById(n),this.container||this.createViewContainer(),t||(console.log("[ContactsView] Initializing..."),document.addEventListener("v2:viewchange",o=>{o.detail&&o.detail.view==="contacts"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),t=!0,console.log("[ContactsView] Initialized"))}catch(o){console.error("[ContactsView] Init failed:",o)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const o=document.querySelector(".v2-app")||document.body,s=document.createElement("div");s.id=n,s.className="app-view",o.appendChild(s),this.container=s},render(){try{if(!this.container&&(this.init(),!this.container))return;const o=e.cineFeaturesContacts;if(!o){this.container.innerHTML=`
                        <div class="view-empty-state">
                            <p>${i("statusUnavailable")||"Contacts module not loaded."}</p>
                        </div>
                    `;return}const s=o.loadStoredContacts(),c=`
                    <header class="view-header swiss-header">
                        <div class="header-content">
                            <h1 class="swiss-title">${i("contactsViewTitle")}</h1>
                            <div class="swiss-subtitle">
                                <span class="count-badge">${s?s.length:0}</span>
                                ${i("contactsViewSubtitle")||"Production Directory"}
                            </div>
                        </div>
                        <div class="view-header-actions">
                            <button class="swiss-btn swiss-btn-primary" id="btn-add-contact">
                                <span class="icon">add</span>
                                <span>${i("buttonAddContact")}</span>
                            </button>
                        </div>
                    </header>
                `;let u='<div class="view-content swiss-content">';!s||s.length===0?u+=`
                        <div class="view-empty-state swiss-empty-state">
                             <div class="swiss-empty-icon">
                                <span class="icon">group_off</span>
                            </div>
                            <h2>${i("contactsEmptyTitle")}</h2>
                            <p>${i("contactsEmptyText")}</p>
                            <button class="swiss-btn swiss-btn-primary" id="btn-add-contact-empty">
                                ${i("buttonAddFirstContact")}
                            </button>
                        </div>
                    `:(u+='<div class="swiss-grid">',s.forEach(f=>{u+=this.renderContactCard(f)}),u+="</div>"),u+="</div>",this.container.innerHTML=c+u,this.attachListeners()}catch(o){console.error("[ContactsView] Render failed",o),this.container&&(this.container.innerHTML=`<div class="swiss-error-state"><p>Error loading view: ${o.message}</p></div>`)}},renderContactCard(o){const s=o.name?o.name.split(" ").map(g=>g[0]).join("").substring(0,2).toUpperCase():"?",c=o.avatar?`<img src="${o.avatar}" alt="${a(o.name)}" class="avatar-img">`:`<span class="avatar-initials">${s}</span>`,u=o.phone?`<a href="tel:${a(o.phone)}" class="swiss-link" onclick="event.stopPropagation()">${a(o.phone)}</a>`:'<span class="swiss-placeholder">—</span>',f=o.email?`<a href="mailto:${a(o.email)}" class="swiss-link" onclick="event.stopPropagation()">${a(o.email)}</a>`:'<span class="swiss-placeholder">—</span>';let m=o.website||"";m.includes("://")&&(m=m.split("://")[1]),m.endsWith("/")&&(m=m.slice(0,-1));const y=o.website?`<a href="${a(o.website)}" target="_blank" rel="noopener noreferrer" class="swiss-link" onclick="event.stopPropagation()">${a(m)}</a>`:"";return`
                <div class="swiss-card contact-card" data-contact-id="${a(o.id)}" tabindex="0" role="button">
                    <div class="swiss-card-main">
                        <div class="swiss-card-identity">
                            <div class="swiss-avatar">
                                ${c}
                            </div>
                            <div class="swiss-identity-text">
                                <h3 class="swiss-name">${a(o.name||i("contactUnnamed"))}</h3>
                                <div class="swiss-role">${a(o.role||i("contactNoRole"))}</div>
                            </div>
                        </div>
                        <div class="swiss-card-actions-overlay">
                             <button class="swiss-icon-btn btn-edit-contact" title="${i("buttonEdit")}">
                                <span class="icon">edit</span>
                            </button>
                             <button class="swiss-icon-btn btn-delete-contact" title="${i("buttonDelete")}">
                                <span class="icon">delete</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="swiss-card-data-grid">
                        <div class="data-cell">
                            <span class="data-label">Phone</span>
                            <span class="data-value">${u}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">Email</span>
                            <span class="data-value">${f}</span>
                        </div>
                        ${o.website?`
                        <div class="data-cell full-width">
                            <span class="data-label">Web</span>
                            <span class="data-value">${y}</span>
                        </div>
                        `:""}
                        ${o.notes?`
                        <div class="data-cell full-width notes-cell">
                            <span class="data-label">Notes</span>
                            <span class="data-value notes-text">${a(o.notes)}</span>
                        </div>
                        `:""}
                    </div>
                </div>
            `},attachListeners(){const o=this.container.querySelector("#btn-add-contact"),s=this.container.querySelector("#btn-add-contact-empty");o&&(o.onclick=()=>this.showEditModal(null)),s&&(s.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".contact-card").forEach(c=>{c.onclick=u=>{u.target.closest("button")||u.target.closest("a")||this.showEditModal(c.dataset.contactId)}}),this.container.querySelectorAll(".btn-edit-contact").forEach(c=>{c.onclick=u=>{u.stopPropagation();const f=u.target.closest(".contact-card");this.showEditModal(f.dataset.contactId)}}),this.container.querySelectorAll(".btn-delete-contact").forEach(c=>{c.onclick=u=>{u.stopPropagation();const f=u.target.closest(".contact-card");this.showDeleteConfirmation(f.dataset.contactId)}})},showDeleteConfirmation(o){const s=document.createElement("div");s.className="v2-modal-backdrop",s.innerHTML=`
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
            `,document.body.appendChild(s),requestAnimationFrame(()=>s.classList.add("open"));const c=()=>{s.classList.remove("open"),setTimeout(()=>s.remove(),200)};s.querySelector(".v2-modal-close").onclick=c,s.querySelector("#btn-cancel-delete").onclick=c,s.querySelector("#btn-confirm-delete").onclick=()=>{this.deleteContact(o),c()}},deleteContact(o){const s=e.cineFeaturesContacts;if(!s)return;const u=s.loadStoredContacts().filter(f=>f.id!==o);s.saveContactsToStorage(u)?this.render():alert("Failed to delete contact.")},showEditModal(o){const s=e.cineFeaturesContacts;if(!s)return;let c={},u=!0;if(o){const b=s.loadStoredContacts().find(w=>w.id===o);b&&(c={...b},u=!1)}u&&(c={name:"",role:"",phone:"",email:"",website:"",notes:"",avatar:""});const f=document.querySelector(".v2-modal-backdrop");f&&f.remove();const m=document.createElement("div");m.className="v2-modal-backdrop";const y=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Line Producer","Production Manager","Rental House","Post House","Agency","Client"];m.innerHTML=`
                <div class="v2-modal contact-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${i(u?"modalTitleNewContact":"modalTitleEditContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body contacts-modal-body">
                        
                        <!-- Avatar Upload Section -->
                        <div class="avatar-upload-section" id="avatarDropZone">
                            <div class="avatar-preview" id="modalAvatarPreview">
                                ${c.avatar?`<img src="${c.avatar}">`:'<span class="icon">person</span>'}
                            </div>
                            <div class="avatar-buttons">
                                <label class="v2-btn v2-btn-sm v2-btn-secondary">
                                    <span class="icon" style="font-size:14px; margin-right:4px;">upload</span>
                                    ${i("buttonUploadPhoto")}
                                    <input type="file" id="avatarUploadInput" accept="image/*" hidden>
                                </label>
                                <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost text-danger" id="removeAvatarBtn" ${c.avatar?"":"disabled"}>
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
                                    <input type="text" id="contactName" class="v2-input" value="${a(c.name)}" placeholder="${i("placeholderFullName")}" required>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${i("labelRole")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">work</span></span>
                                    <input type="text" id="contactRole" class="v2-input" value="${a(c.role)}" list="roleList" placeholder="${i("placeholderRole")}">
                                </div>
                                <datalist id="roleList">
                                    ${y.map(h=>`<option value="${h}">`).join("")}
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
                                        <input type="tel" id="contactPhone" class="v2-input" value="${a(c.phone)}" placeholder="${i("placeholderPhone")}">
                                    </div>
                                </div>
                                
                                <div class="v2-form-group">
                                    <label class="v2-label">${i("labelEmail")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">mail</span></span>
                                        <input type="email" id="contactEmail" class="v2-input" value="${a(c.email)}" placeholder="${i("placeholderEmail")}">
                                    </div>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${i("labelWebsite")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">language</span></span>
                                    <input type="url" id="contactWebsite" class="v2-input" value="${a(c.website)}" placeholder="${i("placeholderWebsite")}">
                                </div>
                            </div>
                        </div>

                        <!-- Notes Section -->
                        <div class="v2-form-group">
                            <label class="v2-label">${i("labelNotes")}</label>
                            <textarea id="contactNotes" class="v2-input" rows="3" placeholder="${i("placeholderNotes")}">${a(c.notes)}</textarea>
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
            `,document.body.appendChild(m),requestAnimationFrame(()=>m.classList.add("open"));const g=()=>{m.classList.remove("open"),setTimeout(()=>m.remove(),200)};m.querySelector(".v2-modal-close").onclick=g,m.querySelector("#btn-cancel-contact").onclick=g;const v=m.querySelector("#avatarUploadInput"),l=m.querySelector("#modalAvatarPreview"),d=m.querySelector("#removeAvatarBtn");let p=c.avatar||"";v.onchange=h=>{const b=h.target.files[0];if(b)if(e.CINE_CONTACTS_PROFILE_MODULE)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(b,w=>{p=w,l.innerHTML=`<img src="${w}">`,d.disabled=!1},w=>{alert("Error reading image: "+w)});else{const w=new FileReader;w.onload=k=>{p=k.target.result,l.innerHTML=`<img src="${p}">`,d.disabled=!1},w.readAsDataURL(b)}},d.onclick=()=>{p="",l.innerHTML='<span class="icon">person</span>',d.disabled=!0,v.value=""},m.querySelector("#btn-save-contact").onclick=()=>{const h=m.querySelector("#contactName").value.trim();if(!h){alert(i("alertEnterName"));return}const b={id:o||void 0,name:h,role:m.querySelector("#contactRole").value.trim(),phone:m.querySelector("#contactPhone").value.trim(),email:m.querySelector("#contactEmail").value.trim(),website:m.querySelector("#contactWebsite").value.trim(),notes:m.querySelector("#contactNotes").value.trim(),avatar:p},w=s.loadStoredContacts();let k;if(u){const x=s.normalizeContactEntry(b);k=[...w,x]}else k=w.map(x=>x.id===o?s.normalizeContactEntry({...x,...b}):x);k=s.sortContacts(k),s.saveContactsToStorage(k)?(this.render(),g()):alert("Failed to save contact.")}}};e.cineContactsView=r})(typeof window<"u"?window:void 0);const Ba=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(){const e="view-settings";let n=!1;function t(r){if(typeof window<"u"&&window.texts){const o=document.getElementById("languageSelect"),s=o&&o.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",c=window.texts[s]||window.texts.en;if(c)return r.split(".").reduce((u,f)=>u?u[f]:null,c)||r}return r}const a=[{v2:"v2-settings-language",legacy:"settingsLanguage",type:"value"},{v2:"v2-settings-temp-unit",legacy:"settingsTemperatureUnit",type:"value"},{v2:"v2-settings-focus-scale",legacy:"settingsFocusScale",type:"value"},{v2:"v2-settings-dark-mode",legacy:"settingsDarkMode",type:"checkbox"},{v2:"v2-settings-pink-mode",legacy:"settingsPinkMode",type:"checkbox"},{v2:"v2-settings-accent-color",legacy:"accentColorInput",type:"color"},{v2:"v2-settings-font-size",legacy:"settingsFontSize",type:"value"},{v2:"v2-settings-font-family",legacy:"settingsFontFamily",type:"value"},{v2:"v2-cam-color-a",legacy:"cameraColorA",type:"color"},{v2:"v2-cam-color-b",legacy:"cameraColorB",type:"color"},{v2:"v2-cam-color-c",legacy:"cameraColorC",type:"color"},{v2:"v2-cam-color-d",legacy:"cameraColorD",type:"color"},{v2:"v2-cam-color-e",legacy:"cameraColorE",type:"color"},{v2:"v2-settings-high-contrast",legacy:"settingsHighContrast",type:"checkbox"},{v2:"v2-settings-reduce-motion",legacy:"settingsReduceMotion",type:"checkbox"},{v2:"v2-settings-relaxed-spacing",legacy:"settingsRelaxedSpacing",type:"checkbox"},{v2:"v2-volt-v-high",legacy:"mountVoltageVHigh",type:"value"},{v2:"v2-volt-v-low",legacy:"mountVoltageVLow",type:"value"},{v2:"v2-volt-gold-high",legacy:"mountVoltageGoldHigh",type:"value"},{v2:"v2-volt-gold-low",legacy:"mountVoltageGoldLow",type:"value"},{v2:"v2-volt-b-high",legacy:"mountVoltageBHigh",type:"value"},{v2:"v2-volt-b-low",legacy:"mountVoltageBLow",type:"value"},{v2:"v2-settings-auto-backup",legacy:"settingsShowAutoBackups",type:"checkbox"},{v2:"v2-settings-backup-retention",legacy:"autoGearBackupRetention",type:"value"},{v2:"v2-settings-log-level",legacy:"loggingLevelFilter",type:"value"},{v2:"v2-settings-log-history",legacy:"loggingHistoryLimit",type:"value"},{v2:"v2-settings-log-filter",legacy:"loggingNamespaceFilter",type:"value"},{v2:"v2-settings-log-console",legacy:"loggingConsoleOutput",type:"checkbox"},{v2:"v2-settings-log-capture",legacy:"loggingCaptureConsole",type:"checkbox"},{v2:"v2-settings-log-errors",legacy:"loggingCaptureErrors",type:"checkbox"},{v2:"v2-settings-log-persist",legacy:"loggingPersistSession",type:"checkbox"}],i={init(){if(this.container=document.getElementById(e),!this.container){console.error(`[SettingsView] Container element with ID '${e}' not found.`);return}if(!n){console.log("[SettingsView] Initializing..."),document.addEventListener("v2:viewchange",o=>{o.detail&&o.detail.view==="settings"&&this.render()});const r=document.getElementById("languageSelect");r&&r.addEventListener("change",()=>{this.isVisible()&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),n=!0}},isVisible(){return this.container&&this.container.classList.contains("active")},render(){!this.container&&(this.init(),!this.container)||(this.container.innerHTML=this.getTemplate(),this.attachListeners(),this.syncFromLegacy(),this.initTabs(),this.initRehearsalSync(),this.initStatusObservers(),this.initBackupDiffSync(),this.initLogViewerSync())},getTemplate(){return`
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
        `},getAboutTabHtml(){const r=document.getElementById("aboutVersion")?.textContent||"v2.0";return`
            <div class="v2-settings-panel" id="v2-panel-about" hidden>
                <h2>${t("settingsTabAbout")}</h2>
                <div class="v2-settings-card">
                    <h3><span class="icon">info</span> ${t("appTitle")}</h3>
                    <p class="v2-text-lead" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${r}</p>
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
        `},attachListeners(){const r=this.container.querySelectorAll(".v2-tab-btn"),o=this.container.querySelectorAll(".v2-settings-panel");r.forEach(v=>{v.addEventListener("click",()=>{r.forEach(p=>{p.classList.remove("active"),p.setAttribute("aria-selected","false")}),o.forEach(p=>p.hidden=!0),v.classList.add("active"),v.setAttribute("aria-selected","true");const l=`v2-panel-${v.dataset.tab}`,d=document.getElementById(l);d&&(d.hidden=!1)})}),a.forEach(v=>{const l=document.getElementById(v.v2);if(!l)return;const d=document.getElementById(v.legacy);if(!d){console.warn(`[SettingsView] Legacy element '${v.legacy}' not found.`);return}l.addEventListener("change",p=>{if(v.type==="checkbox"?d.checked=p.target.checked:d.value=p.target.value,d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0})),["settingsLanguage","settingsTemperatureUnit","settingsFocusScale","settingsFontSize","settingsFontFamily","mountVoltageVHigh","mountVoltageVLow","mountVoltageGoldHigh","mountVoltageGoldLow","mountVoltageBHigh","mountVoltageBLow"].includes(v.legacy)){const b=document.getElementById("settingsSave");b&&b.click()}})});const s=document.getElementById("settingsLogo");s&&s.addEventListener("change",()=>{const v=document.getElementById("settingsSave");v&&v.click()});const c=(v,l)=>{const d=document.getElementById(v),p=document.getElementById(l);d&&p&&d.addEventListener("click",()=>p.click())};c("v2-btn-reset-accent","accentColorReset"),c("v2-btn-reset-voltages","mountVoltageReset"),c("v2-btn-backup","backupSettings"),c("v2-btn-restore","restoreSettings"),c("v2-btn-factory-reset","factoryResetButton"),c("v2-btn-data-backup","storageBackupNow"),c("v2-btn-storage-persist","storagePersistenceRequest"),c("v2-btn-export-log","loggingExportBtn"),c("v2-btn-support","supportLink"),c("v2-btn-bug","reportBugLink"),c("v2-btn-feature","suggestFeatureLink"),c("v2-btn-local-font","localFontsButton"),c("v2-btn-branding-upload","settingsLogo"),c("v2-btn-doc-tracker-add","documentationTrackerAddRelease");const u=document.getElementById("v2-btn-backup-diff");u&&u.addEventListener("click",()=>{const v=document.getElementById("v2-backup-diff-modal");v&&(v.style.display="flex");const l=document.getElementById("backupDiffToggleButton");l&&l.click()}),this.container.querySelectorAll('[data-action="close-diff"]').forEach(v=>{v.addEventListener("click",()=>{const l=document.getElementById("v2-backup-diff-modal");l&&(l.style.display="none");const d=document.getElementById("backupDiffToggleButton");d&&d.click()})});const m=document.getElementById("v2-btn-restore-rehearsal"),y=document.getElementById("v2-rehearsal-modal"),g=this.container.querySelectorAll('[data-action="close-rehearsal"]');m&&y&&m.addEventListener("click",()=>{const v=document.getElementById("restoreRehearsalButton");v&&v.click(),y.style.display="flex"}),g.forEach(v=>{v.addEventListener("click",()=>{y&&(y.style.display="none");const l=document.getElementById("restoreRehearsalClose");l&&l.click()})})},syncFromLegacy(){a.forEach(r=>{const o=document.getElementById(r.v2),s=document.getElementById(r.legacy);o&&s&&(r.type==="checkbox"?o.checked=s.checked:(r.type==="value"||r.type==="color")&&(o.value=s.value))})},initStatusObservers(){const r=[{legacyId:"storageStatusLastProjectValue",v2Id:"v2-status-last-project"},{legacyId:"storageStatusLastAutoBackupValue",v2Id:"v2-status-last-auto"},{legacyId:"storageStatusLastFullBackupValue",v2Id:"v2-status-last-full"},{legacyId:"storagePersistenceStatus",v2Id:"v2-status-persistence"}],o=new MutationObserver(()=>{r.forEach(g=>{const v=document.getElementById(g.legacyId),l=document.getElementById(g.v2Id);v&&l&&(l.textContent=v.textContent)})});r.forEach(g=>{const v=document.getElementById(g.legacyId);if(v){o.observe(v,{childList:!0,characterData:!0,subtree:!0});const l=document.getElementById(g.v2Id);l&&(l.textContent=v.textContent)}});const s=[{legacyId:"localFontsStatus",v2Id:"v2-status-local-font"}],c=new MutationObserver(()=>{s.forEach(g=>{const v=document.getElementById(g.legacyId),l=document.getElementById(g.v2Id);v&&l&&(l.textContent=v.textContent)})});s.forEach(g=>{const v=document.getElementById(g.legacyId);v&&c.observe(v,{childList:!0,characterData:!0,subtree:!0})});const u=document.getElementById("settingsLogoPreview"),f=document.getElementById("v2-branding-preview");u&&f&&(new MutationObserver(()=>{if(u.hidden||u.innerHTML.trim()==="")f.innerHTML='<span style="color: var(--v2-text-muted);">No custom logo set</span>';else{f.innerHTML=u.innerHTML;const v=f.querySelector("img, svg");v&&(v.style.maxWidth="100%",v.style.height="auto")}}).observe(u,{childList:!0,attributes:!0,subtree:!0}),!u.hidden&&u.innerHTML.trim()!==""&&(f.innerHTML=u.innerHTML));const m=document.getElementById("documentationTrackerList"),y=document.getElementById("v2-doc-tracker-list");m&&y&&new MutationObserver(()=>{m.children.length===0?y.innerHTML='<p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">No releases tracked.</p>':(y.innerHTML="",Array.from(m.children).forEach(v=>{const l=v.cloneNode(!0);l.style.padding="0.5rem",l.style.borderBottom="1px solid var(--v2-border-subtle)",y.appendChild(l)}))}).observe(m,{childList:!0,subtree:!0})},initTabs(){const r=this.container.querySelector(".v2-tab-btn.active");if(r){const o=`v2-panel-${r.dataset.tab}`,s=document.getElementById(o);s&&(s.hidden=!1)}},initRehearsalSync(){const r=document.querySelectorAll('input[name="v2RehearsalMode"]'),o=document.getElementsByName("restoreRehearsalMode");r.forEach(d=>{d.addEventListener("change",()=>{o.forEach(p=>{p.value===d.value&&(p.checked=!0,p.dispatchEvent(new Event("change",{bubbles:!0})))})})});const s=document.getElementById("v2-rehearsal-browse-btn"),c=document.getElementById("restoreRehearsalBrowse");s&&c&&s.addEventListener("click",()=>c.click());const u=document.getElementById("v2-rehearsal-proceed-btn"),f=document.getElementById("v2-rehearsal-abort-btn");u&&u.addEventListener("click",()=>{const d=document.getElementById("restoreRehearsalProceed");d&&d.click(),document.getElementById("v2-rehearsal-modal").style.display="none"}),f&&f.addEventListener("click",()=>{const d=document.getElementById("restoreRehearsalAbort");d&&d.click()});const m=document.getElementById("restoreRehearsalTableBody"),y=document.getElementById("v2-rehearsal-table-body"),g=document.getElementById("restoreRehearsalFileName"),v=document.getElementById("v2-rehearsal-filename"),l=document.getElementById("restoreRehearsalProceed");m&&y&&(new MutationObserver(()=>{y.innerHTML="",Array.from(m.children).forEach(p=>{const h=p.querySelectorAll("td");if(h.length>=4){const b=h[0].textContent,w=h[3].innerHTML,k=document.createElement("tr");k.innerHTML=`
                            <td style="padding: 0.75rem;"><strong>${b}</strong></td>
                            <td style="padding: 0.75rem;">${w}</td>
                        `,y.appendChild(k)}}),u&&l&&(u.disabled=l.disabled,l.style.display==="none"?u.style.display="none":u.style.display="inline-block")}).observe(m,{childList:!0,subtree:!0}),l&&(new MutationObserver(()=>{u&&(u.disabled=l.disabled,l.style.display==="none"?u.style.display="none":u.style.display="inline-block")}).observe(l,{attributes:!0}),u&&(u.disabled=l.disabled,l.style.display==="none"?u.style.display="none":u.style.display="inline-block"))),g&&v&&new MutationObserver(()=>{v.textContent=g.textContent}).observe(g,{childList:!0,characterData:!0,subtree:!0})},initBackupDiffSync(){const r=document.getElementById("v2-diff-primary"),o=document.getElementById("v2-diff-secondary"),s=document.getElementById("backupDiffPrimary"),c=document.getElementById("backupDiffSecondary"),u=()=>{r&&s&&(r.innerHTML=s.innerHTML,r.value=s.value),o&&c&&(o.innerHTML=c.innerHTML,o.value=c.value)};if(u(),s&&c){const h=new MutationObserver(u);h.observe(s,{childList:!0}),h.observe(c,{childList:!0})}r&&r.addEventListener("change",()=>{s&&(s.value=r.value,s.dispatchEvent(new Event("change",{bubbles:!0})))}),o&&o.addEventListener("change",()=>{c&&(c.value=o.value,c.dispatchEvent(new Event("change",{bubbles:!0})))});const f=document.getElementById("backupDiffSummary"),m=document.getElementById("v2-diff-summary");f&&m&&new MutationObserver(()=>{m.innerHTML=f.innerHTML}).observe(f,{childList:!0,subtree:!0});const y=document.getElementById("backupDiffList"),g=document.getElementById("v2-diff-list");y&&g&&new MutationObserver(()=>{g.innerHTML=y.innerHTML,Array.from(g.querySelectorAll("li")).forEach(b=>{b.style.padding="0.5rem",b.style.borderBottom="1px solid var(--v2-border-subtle)"})}).observe(y,{childList:!0,subtree:!0});const v=document.getElementById("v2-btn-diff-export"),l=document.getElementById("backupDiffExport");v&&l&&v.addEventListener("click",()=>l.click());const d=document.getElementById("v2-diff-notes"),p=document.getElementById("backupDiffNotes");d&&p&&(d.value=p.value,d.addEventListener("input",()=>{p.value=d.value,p.dispatchEvent(new Event("input",{bubbles:!0}))}),new MutationObserver(()=>{document.activeElement!==d&&(d.value=p.value)}).observe(p,{attributes:!0,attributeFilter:["value"]}),p.addEventListener("input",()=>{document.activeElement!==d&&(d.value=p.value)}))},initLogViewerSync(){const r=document.getElementById("loggingHistory"),o=document.getElementById("v2-log-history-list");r&&o&&(new MutationObserver(()=>{o.innerHTML=r.innerHTML,Array.from(o.querySelectorAll("li")).forEach(c=>{c.style.padding="0.25rem 0",c.style.borderBottom="1px dashed var(--v2-border-subtle)"})}).observe(r,{childList:!0,subtree:!0}),o.innerHTML=r.innerHTML)}};typeof window<"u"&&(window.cineSettingsView=i)})();const Pa=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="view-own-gear";let t=!1;function a(o){return typeof o!="string"?"":o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function i(o){if(typeof window<"u"&&window.texts){const s=document.getElementById("languageSelect"),c=s&&s.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",u=window.texts[c]||window.texts.en;if(u)return o.split(".").reduce((f,m)=>f?f[m]:null,u)||o}return o}const r={container:null,init(){try{this.container=document.getElementById(n),this.container||this.createViewContainer(),t||(console.log("[OwnGearView] Initializing..."),document.addEventListener("v2:viewchange",o=>{o.detail&&o.detail.view==="ownGear"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),t=!0,console.log("[OwnGearView] Initialized"))}catch(o){console.error("[OwnGearView] Init failed:",o)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const o=document.querySelector(".v2-main")||document.querySelector(".v2-app")||document.body,s=document.createElement("section");s.id=n,s.className="app-view",o.appendChild(s),this.container=s},render(){try{if(!this.container&&(this.init(),!this.container))return;const o=e.cineFeaturesOwnGear;if(!o){this.container.innerHTML=`
                        <div class="v2-empty-state">
                            <p>${i("statusUnavailable")||"Module not available"}</p>
                        </div>
                    `;return}const s=o.loadStoredOwnGearItems(),c=`
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
                `;let u='<div class="view-content">';!s||s.length===0?u+=`
                        <div class="own-gear-empty-state">
                            <span class="icon">inventory_2</span>
                            <h3>${i("ownGearEmptyTitle")}</h3>
                            <p>${i("ownGearEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear-empty">
                                ${i("buttonAddFirstGearItem")}
                            </button>
                        </div>
                    `:(u+='<div class="own-gear-list">',s.forEach(f=>{u+=this.renderItemRow(f)}),u+="</div>"),u+="</div>",this.container.innerHTML=c+u,this.attachListeners()}catch(o){console.error("[OwnGearView] Render failed",o),this.container&&(this.container.innerHTML=`<div class="v2-error-state"><p>Error loading view: ${o.message}</p></div>`)}},renderItemRow(o){return`
                <div class="own-gear-item-card" data-item-id="${a(o.id)}">
                    <div class="own-gear-item-info">
                        <div class="own-gear-item-name">${a(o.name)}</div>
                        ${o.notes?`<div class="own-gear-item-notes">${a(o.notes)}</div>`:""}
                    </div>
                     <div class="own-gear-item-meta">
                        ${o.quantity?`<span class="own-gear-badge qty-badge">${i("labelQtyPrefix")}${a(o.quantity)}</span>`:""}
                        ${o.source?`<span class="own-gear-badge source-badge">${i("labelSourcePrefix")}${a(o.source)}</span>`:""}
                    </div>
                    <div class="own-gear-item-actions">
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-own-gear" title="${i("buttonEdit")}" data-id="${a(o.id)}">
                            <span class="icon">edit</span>
                        </button>
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-own-gear" title="${i("buttonDelete")}" data-id="${a(o.id)}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                </div>
            `},attachListeners(){const o=this.container.querySelector("#btn-add-own-gear"),s=this.container.querySelector("#btn-add-own-gear-empty");o&&(o.onclick=()=>this.showEditModal(null)),s&&(s.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".btn-edit-own-gear").forEach(c=>{c.onclick=u=>{u.stopPropagation();const f=u.currentTarget.dataset.id;f&&this.showEditModal(f)}}),this.container.querySelectorAll(".btn-delete-own-gear").forEach(c=>{c.onclick=u=>{u.stopPropagation();const f=u.currentTarget.dataset.id;f&&confirm(i("confirmDeleteGearItem"))&&this.deleteItem(f)}})},deleteItem(o){const s=e.cineFeaturesOwnGear;if(!s)return;const u=s.loadStoredOwnGearItems().filter(f=>f.id!==o);s.persistOwnGearItems(u)?this.render():alert(i("alertSaveItemFailed"))},showEditModal(o){const s=e.cineFeaturesOwnGear;if(!s)return;let c={},u=!0;if(o){const l=s.loadStoredOwnGearItems().find(d=>d.id===o);l&&(c={...l},u=!1)}u&&(c={name:"",quantity:"",notes:"",source:""});const f=document.querySelector(".v2-modal-backdrop");f&&f.remove();const m=document.createElement("div");m.className="v2-modal-backdrop",m.innerHTML=`
                <div class="v2-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${i(u?"modalTitleNewGearItem":"modalTitleEditGearItem")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body own-gear-modal-body">
                        
                        <div class="v2-form-group">
                            <label class="v2-label">${i("labelItemName")}</label>
                            <input type="text" id="ownGearName" class="v2-input" value="${a(c.name)}" placeholder="${i("placeholderGearName")}" required>
                        </div>

                         <div class="v2-form-group">
                            <label class="v2-label">${i("labelQuantity")}</label>
                            <input type="number" id="ownGearQuantity" class="v2-input" value="${a(c.quantity)}" placeholder="${i("placeholderGearQty")}">
                        </div>

                        <div class="v2-form-group">
                            <label class="v2-label">${i("labelNotes")}</label>
                            <textarea id="ownGearNotes" class="v2-input" rows="3" placeholder="${i("placeholderGearNotes")}">${a(c.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-own-gear">${i("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-own-gear">${i("buttonSaveGearItem")}</button>
                    </div>
                </div>
            `,document.body.appendChild(m),requestAnimationFrame(()=>m.classList.add("open"));const y=()=>{m.classList.remove("open"),setTimeout(()=>m.remove(),200)},g=m.querySelector("#ownGearName");g.focus(),m.querySelector(".v2-modal-close").onclick=y,m.querySelector("#btn-cancel-own-gear").onclick=y,m.querySelector("#btn-save-own-gear").onclick=()=>{const v=g.value.trim();if(!v){alert(i("alertEnterName"));return}const l={id:o||void 0,name:v,quantity:m.querySelector("#ownGearQuantity").value.trim(),notes:m.querySelector("#ownGearNotes").value.trim()},d=s.loadStoredOwnGearItems();let p;if(u?p=s.normalizeOwnGearRecord(l):p=s.normalizeOwnGearRecord({...c,...l}),!p){alert(i("alertInvalidItemData"));return}let h;u?h=[...d,p]:h=d.map(b=>b.id===o?p:b),s.persistOwnGearItems(h)?(this.render(),y()):alert(i("alertSaveItemFailed"))}}};e.cineOwnGearView=r})(typeof window<"u"?window:void 0);const Ta=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n=[{id:"v2-welcome",title:"Welcome to V2",keywords:"v2 new interface update overview navigation sidebar",icon:"✨",content:`
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
            `}];n.push(...t),e.cineV2HelpData=n})(typeof window<"u"?window:void 0);const Ma=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n=e.cineV2HelpData||[];function t(){const s=["v2-quick-start","v2-shortcuts","v2-data-safety","v2-features"];return{essentials:n.filter(c=>s.includes(c.id)),guides:n.filter(c=>!s.includes(c.id))}}function a(s){return s?s.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>").split(/\n\n+/).map(u=>u.trim().startsWith("- ")?`<ul>${u.trim().split(/\n/).map(m=>`<li>${m.replace(/^- /,"")}</li>`).join("")}</ul>`:`<p>${u}</p>`).join(""):""}function i(){let s=e.cineCoreLocalization||e.cineCoreLocalizationBridge||e.cineModuleBase&&e.cineModuleBase.resolveLocalization&&e.cineModuleBase.resolveLocalization();if(!s||typeof s.getString!="function")if(typeof e.getText=="function")s={getString:f=>e.getText(f)};else if(e.texts){const f=(g,v)=>v.split(".").reduce((l,d)=>l&&l[d],g),m=e.currentLang||"en",y=e.texts[m]||e.texts.en;s={getString:g=>f(y,g)||""}}else return console.warn("[HelpService] Localization module not found. V1 topics unavailable."),[];const c=["projectManagement","saveShareBackup","deviceConfiguration","powerCalculation","connectionDiagram","gearList","contacts","ownGear","settings","offlineUse","troubleshooting","shortcuts","pinkMode"],u={projectManagement:"📂",saveShareBackup:"💾",deviceConfiguration:"⚙️",powerCalculation:"⚡",connectionDiagram:"🔌",gearList:"📋",contacts:"👥",ownGear:"📷",settings:"🛠️",offlineUse:"📡",troubleshooting:"❓",shortcuts:"⌨️",pinkMode:"🌸"};return c.map(f=>{const m=s.getString(`helpTopics.${f}.title`),y=s.getString(`helpTopics.${f}.content`);return m?{id:`v1-${f}`,category:"reference",title:m,keywords:"legacy reference v1",icon:u[f]||"📄",content:a(y)}:null}).filter(f=>f!==null)}function r(){const s=n,c=i();return[...s,...c]}function o(){const s=t();return{essentials:{title:"Essentials",items:s.essentials},guide:{title:"Guides",items:s.guides},reference:{title:"Topic Reference",items:i()}}}e.cineHelpService={getAllSections:r,getGroupedSections:o}})(typeof window<"u"?window:void 0);const ja=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="v2HelpToc",t="v2HelpContent",a="v2HelpSearch";let i=null,r=!1;function o(d){return document.getElementById(d)}function s(){const d=o(t);if(!d)return[];d.innerHTML="";const p=[],h=e.cineHelpService;if(!h)return d.innerHTML='<div class="v2-empty-state"><p>Help service unavailable.</p></div>',[];const b=h.getGroupedSections();if(b.guide&&b.guide.items.length>0&&c(d,b.guide.title,b.guide.items,p),b.guide&&b.guide.items.length>0&&b.reference&&b.reference.items.length>0){const k=document.createElement("hr");k.className="v2-help-divider",d.appendChild(k)}b.reference&&b.reference.items.length>0&&c(d,b.reference.title,b.reference.items,p);const w=document.createElement("div");return w.id="v2HelpNoResults",w.className="v2-help-no-results",w.style.display="none",w.innerHTML=`
            <div class="v2-help-no-results-content">
                <span class="v2-help-no-results-icon">🔍</span>
                <h3>No results found</h3>
                <p>Try adjusting your search terms.</p>
            </div>
        `,d.appendChild(w),p}function c(d,p,h,b){b.push({type:"header",title:p}),h.forEach(w=>{const k=document.createElement("section");k.className="v2-help-section",k.id=w.id,k.setAttribute("data-keywords",(w.keywords||"")+" "+(w.title||""));const x=document.createElement("h2");w.icon?x.innerHTML=`<span class="v2-help-icon">${w.icon}</span> ${w.title}`:x.textContent=w.title;const T=document.createElement("div");T.className="v2-help-content-body",T.innerHTML=w.content,k.appendChild(x),k.appendChild(T),d.appendChild(k),b.push({type:"item",id:w.id,title:w.title,keywords:w.keywords,icon:w.icon})})}function u(d){const p=o(n);if(!p)return;p.innerHTML="";const h=document.createElement("ul");d.forEach(b=>{if(b.type==="header"){const w=document.createElement("li");w.className="v2-help-toc-header",w.textContent=b.title,h.appendChild(w)}else{const w=document.createElement("li"),k=document.createElement("a");k.href=`#${b.id}`,k.className="v2-help-toc-link",k.dataset.target=b.id,b.icon?k.innerHTML=`<span class="v2-toc-icon">${b.icon}</span> ${b.title}`:k.textContent=b.title,k.addEventListener("click",x=>{x.preventDefault();const T=document.getElementById(b.id);T&&T.scrollIntoView({behavior:"smooth"}),f(b.id)}),w.appendChild(k),h.appendChild(w)}}),p.appendChild(h)}function f(d){document.querySelectorAll(".v2-help-toc-link").forEach(p=>{p.dataset.target===d?p.classList.add("active"):p.classList.remove("active")})}function m(){i&&i.disconnect();const d={root:o(t),rootMargin:"-10% 0px -80% 0px",threshold:0},p=h=>{h.forEach(b=>{b.isIntersecting&&f(b.target.id)})};i=new IntersectionObserver(p,d),document.querySelectorAll(".v2-help-section").forEach(h=>{i.observe(h)})}function y(){const d=o(a);if(!d)return;const p=document.createElement("button");p.className="v2-help-search-clear",p.innerHTML="✕",p.style.display="none",p.ariaLabel="Clear search",d.parentNode.appendChild(p);function h(){const b=d.value.toLowerCase().trim(),w=document.querySelectorAll(".v2-help-section"),k=o("v2HelpNoResults");let x=!1;w.forEach(T=>{const Q=T.innerText.toLowerCase(),H=(T.dataset.keywords||"").toLowerCase(),V=Q.includes(b)||H.includes(b);T.style.display=V?"block":"none",V&&(x=!0)}),document.querySelectorAll(".v2-help-divider").forEach(T=>{T.style.display=b?"none":"block"}),k&&(k.style.display=!x&&b?"flex":"none"),p.style.display=b.length>0?"block":"none"}d.addEventListener("input",h),p.addEventListener("click",()=>{d.value="",h(),d.focus()})}function g(){r||(console.log("[HelpView] Initializing..."),v(),y(),r=!0)}function v(){const d=s();d&&(u(d),setTimeout(()=>m(),100))}function l(){r||g()}e.cineHelpView={init:g,enter:l,refresh:v}})(typeof globalThis<"u"?globalThis:typeof window<"u"?window:void 0);const Va=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Le="backups",Wt={init(){window.cineViewManager&&window.cineViewManager.registerView(Le,{onEnter:()=>this.render(),onLeave:()=>{}});const e=document.getElementById("navAutoBackups");e&&(e.style.display="flex")},async render(){document.getElementById("v2-main");let e=document.getElementById(`view-${Le}`);e||(e=document.createElement("section"),e.id=`view-${Le}`,e.className="app-view",e.innerHTML=`
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
            `,document.querySelector(".v2-main").appendChild(e));const n=e.querySelector("#backupList");n.innerHTML='<div class="v2-spinner"></div>';try{const t=await we.listSnapshots();if(t.length===0){n.innerHTML=`
                    <div class="v2-empty-state">
                        <p>No backups found in the Vault.</p>
                        <p class="subtext">Backups are created automatically when you save projects.</p>
                    </div>`;return}let a='<ul class="v2-list">';for(const i of t){const r=i.replace(/\.json$/i,"").replace(/^snapshot_/,"");a+=`
                    <li class="v2-list-item">
                        <div class="v2-list-content">
                            <div class="v2-list-title">${r}</div>
                        </div>
                        <div class="v2-list-actions">
                            <button class="v2-btn v2-btn-sm" onclick="cineBackupsView.restore('${i}')">Restore</button>
                            <button class="v2-btn v2-btn-sm v2-btn-danger" onclick="cineBackupsView.delete('${i}')">Delete</button>
                        </div>
                    </li>
                `}a+="</ul>",n.innerHTML=a}catch(t){n.innerHTML=`<div class="v2-error-state">Failed to load backups: ${t.message}</div>`}},async restore(e){if(confirm(`Are you sure you want to restore ${e}? This will overwrite current data.`))try{const n=await we.restoreSnapshot(e),{data:t,meta:a}=Jt(n),i=e.replace(/\.json$/i,""),r=a&&a.docId||t&&t.id||i;if(!t){alert("Unknown backup format.");return}const o=a?{...a,lock:null}:null,s=await Yt.saveProject(r,t,o);if(!s||s.success===!1){const c=s&&s.error==="PROJECT_LOCKED"?"This project is locked by another session.":"Unknown error.";alert(`Restore failed. ${c}`);return}alert("Project restored successfully!")}catch(n){alert("Failed to restore: "+n.message)}},async delete(e){confirm(`Delete ${e}?`)&&(await we.deleteSnapshot(e),this.render())}};window.cineBackupsView=Wt;const Aa=Object.freeze(Object.defineProperty({__proto__:null,cineBackupsView:Wt},Symbol.toStringTag,{value:"Module"}));export{st as V};
//# sourceMappingURL=v2-ui-C6XBHnXN.js.map
