const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-JqIge9Ya.js","assets/core-modules-Be_U3JJE.js","assets/vendor-DzOFLsIx.js","assets/data-So-wGb1N.js","assets/main-CBa7JvvH.css","assets/rules-view-H7Qqifg_.css","assets/contacts-BFtZKPDa.css","assets/settings-B7NLmzNQ.css","assets/owned-gear-D1_apNqb.css"])))=>i.map(i=>d[i]);
import{_ as I,p as O,d as je,u as $n,s as In}from"./core-modules-Be_U3JJE.js";import{d as Dn}from"./data-So-wGb1N.js";const E=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};let Lt=!1,F=!1;const Se="cine_use_v2_ui";function Bn(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2")){const t=e.get("v2")==="true";return localStorage.setItem(Se,t.toString()),t}return localStorage.getItem(Se)==="true"}catch{return!1}}function Tn(){const e=localStorage.getItem("darkMode")==="true";document.body.classList.toggle("dark-mode",e);const t=localStorage.getItem("cameraPowerPlanner_pinkMode")==="true"||localStorage.getItem("pinkMode")==="true";document.body.classList.toggle("pink-mode",t)}function at(){try{localStorage.setItem(Se,"true"),F=!0,document.body.classList.add("v2-mode"),Tn();const e=document.getElementById("topBar"),t=document.getElementById("mainContent"),n=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),o=document.getElementById("cineGlobalLoadingIndicator");o&&(o.style.display="none"),e&&(e.style.display="none"),t&&(t.style.display="none"),n&&(n.style.display="none"),a&&(a.style.display="none");const r=document.getElementById("siteFooter");r&&(r.style.display="none");const i=document.getElementById("installPromptBanner"),s=document.getElementById("offlineIndicator"),l=document.getElementById("backupNotificationContainer");i&&(i.style.display="none"),s&&(s.style.display="none"),l&&(l.style.display="none");const c=document.getElementById("v2-app");if(c&&(c.style.display="",c.setAttribute("aria-hidden","false")),E.cineProjectDetail&&typeof E.cineProjectDetail.init=="function"&&E.cineProjectDetail.init(),E.cineProjectDashboard&&typeof E.cineProjectDashboard.init=="function"){const f=typeof E.cineProjectDashboard.createUiOnlyDataProvider=="function"?E.cineProjectDashboard.createUiOnlyDataProvider():null;E.cineProjectDashboard.init({dataProvider:f})}return E.cineV2Sidebar&&typeof E.cineV2Sidebar.init=="function"&&E.cineV2Sidebar.init(),E.cineViewManager&&typeof E.cineViewManager.enableV2=="function"&&E.cineViewManager.enableV2(),Mn(),Ne(),console.log("[V2 Bootstrap] V2 UI enabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to enable V2:",e),Ne(),!1}}function An(){let e=document.getElementById("v2-loader");e||(e=document.createElement("div"),e.id="v2-loader",e.innerHTML=`
                <div class="v2-loader-content">
                    <div class="v2-spinner"></div>
                    <div class="v2-loader-text">Loading Cine Power Planner...</div>
                </div>
            `,document.body.appendChild(e)),e.classList.add("visible")}function Ne(){const e=document.getElementById("v2-loader");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},500))}function ot(){try{localStorage.setItem(Se,"false"),F=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("topBar"),t=document.getElementById("mainContent"),n=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),o=document.getElementById("siteFooter");e&&(e.style.display=""),t&&(t.style.display=""),n&&(n.style.display=""),a&&(a.style.display=""),o&&(o.style.display="");const r=document.getElementById("v2-app");return r&&(r.style.display="none",r.setAttribute("aria-hidden","true")),E.cineViewManager&&typeof E.cineViewManager.disableV2=="function"&&E.cineViewManager.disableV2(),console.log("[V2 Bootstrap] V2 UI disabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to disable V2:",e),!1}}function Mn(){const e=document.getElementById("v2ExitBtn");e&&!e.dataset.bound&&(e.dataset.bound="true",e.addEventListener("click",()=>{ot(),window.location.reload()}))}function Vt(){return F?ot():at()}async function _t(){try{console.log("[V2 Bootstrap] Loading V2 assets via Vite dynamic imports..."),await I(()=>import("./main-JqIge9Ya.js").then(t=>t.i),__vite__mapDeps([0,1,2,3,4])),await I(()=>Promise.resolve({}),__vite__mapDeps([5])),await I(()=>Promise.resolve({}),__vite__mapDeps([6])),await I(()=>Promise.resolve({}),__vite__mapDeps([7])),await I(()=>Promise.resolve({}),__vite__mapDeps([8])),console.log("[V2 Bootstrap] V2 CSS loaded"),await I(()=>Promise.resolve().then(()=>ha),void 0),await I(()=>Promise.resolve().then(()=>wa),void 0);const{LegacyShim:e}=await I(async()=>{const{LegacyShim:t}=await Promise.resolve().then(()=>Ta);return{LegacyShim:t}},void 0);return await I(()=>import("./main-JqIge9Ya.js").then(t=>t.a),__vite__mapDeps([0,1,2,3,4])),await I(()=>Promise.resolve().then(()=>Ua),void 0),await I(()=>Promise.resolve().then(()=>ro),void 0),await I(()=>Promise.resolve().then(()=>lo),void 0),await I(()=>Promise.resolve().then(()=>No),void 0),await I(()=>Promise.resolve().then(()=>Go),void 0),await I(()=>Promise.resolve().then(()=>zo),void 0),await I(()=>import("./core-modules-Be_U3JJE.js").then(t=>t.q),__vite__mapDeps([1,2])),await I(()=>import("./own-gear-CSm93DJ1.js"),[]),await I(()=>Promise.resolve().then(()=>Uo),void 0),await I(()=>Promise.resolve().then(()=>Wo),void 0),await I(()=>Promise.resolve().then(()=>Ko),void 0),await I(()=>Promise.resolve().then(()=>Yo),void 0),await I(()=>Promise.resolve().then(()=>Jo),void 0),await I(()=>Promise.resolve().then(()=>oi),void 0),await I(()=>Promise.resolve().then(()=>ii),void 0),window.cineBackupsView&&typeof window.cineBackupsView.init=="function"&&window.cineBackupsView.init(),console.log("[V2 Bootstrap] V2 JS modules loaded"),E.cineV2SidebarView&&typeof E.cineV2SidebarView.mount=="function"&&E.cineV2SidebarView.mount(),E.cineV2Sidebar&&typeof E.cineV2Sidebar.init=="function"&&E.cineV2Sidebar.init(),E.cineRulesView&&typeof E.cineRulesView.init=="function"&&E.cineRulesView.init(),E.cineV2DeviceLibrary&&typeof E.cineV2DeviceLibrary.init=="function"&&E.cineV2DeviceLibrary.init(),E.cineContactsView&&typeof E.cineContactsView.init=="function"&&E.cineContactsView.init(),E.cineSettingsView&&typeof E.cineSettingsView.init=="function"&&E.cineSettingsView.init(),E.cineOwnGearView&&typeof E.cineOwnGearView.init=="function"&&E.cineOwnGearView.init(),E.cineHelpView&&typeof E.cineHelpView.init=="function"&&E.cineHelpView.init(),!0}catch(e){return console.error("[V2 Bootstrap] Failed to load V2 assets:",e),!1}}async function jn(){if(Lt){console.warn("[V2 Bootstrap] Already initialized");return}Lt=!0,F=Bn(),console.log(`[V2 Bootstrap] Starting. V2 enabled: ${F}`),F&&(An(),await _t()?at():Ne()),Vn(),console.log("[V2 Bootstrap] Initialization complete")}function Vn(){if(document.getElementById("v2ToggleBtn"))return;const e=document.getElementById("settingsDialog");if(!e)return;const t=e.querySelector(".modal-content, .settings-content, .modal-surface");if(!t)return;const n=document.createElement("div");n.className="settings-row v2-toggle-section",n.style.cssText="margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;";const a=document.createElement("label");a.textContent="Experimental UI",a.style.cssText="font-weight: 600; display: block; margin-bottom: 8px;";const o=document.createElement("p");o.textContent="Try the new V2 interface design. This is experimental and can be toggled off at any time.",o.style.cssText="font-size: 0.875rem; color: #666; margin-bottom: 12px;";const r=document.createElement("button");r.id="v2ToggleBtn",r.type="button",r.className="v2-btn v2-btn-secondary",r.style.cssText="padding: 8px 16px; border-radius: 6px; cursor: pointer; background: #4a90d9; color: white; border: none;",r.textContent=F?"Return to Classic UI":"Try New UI",r.addEventListener("click",()=>{Vt(),r.textContent=F?"Return to Classic UI":"Try New UI",window.location.reload()}),n.appendChild(a),n.appendChild(o),n.appendChild(r),t.appendChild(n)}const Ct={init:jn,enableV2:at,disableV2:ot,toggleV2:Vt,isV2Enabled:()=>F,loadV2Assets:_t};typeof globalThis<"u"?globalThis.cineV2Bootstrap=Ct:typeof window<"u"&&(window.cineV2Bootstrap=Ct);function _n(){return typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof self<"u"?self:typeof global<"u"?global:{}}const ue=_n();function Rn(e){return typeof cineModuleBase=="object"&&cineModuleBase?cineModuleBase:e&&typeof e.cineModuleBase=="object"?e.cineModuleBase:null}const N=Rn(ue),Hn=N&&typeof N.safeWarn=="function"?N.safeWarn:function(t,n){typeof console>"u"||!console||typeof console.warn!="function"||(typeof n>"u"?console.warn(t):console.warn(t,n))},On=/[\u200B\u200C\u200D\u2060]/g,qn=/[\u0009-\u000D\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g,Nn=/[\u0300-\u036F]/g,Fn=/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g,Gn=/[\u2018\u2019\u201A\u201B\u2032\u2035]/g,zn=/[\u201C\u201D\u201E\u201F\u2033\u2036]/g,Un=/[\u2044\u2215]/g,Wn=/[×✕✖✗✘]/g,Kn=/[°º˚]/g,Yn=/[\u2026]/g,Jn=/[\u00AE\u2122]/g,Qn=/[!#$%()*,:;<=>?@[\]^{|}~._]/g,Zn=/[″‶‴⁗]/g,Xn=/[′‵]/g,De=String.raw`\d+(?:\s*[.,/-]\s*\d+)*(?:\s+\d+(?:\s*[.,/-]\s*\d+)*)*`,ea=new RegExp(String.raw`(${De})[\s-]*(?:feet|foot|ft\.?)(?![a-z])`,"gi"),ta=new RegExp(String.raw`(${De})\s*['’](?=\s|[\d"”″'-]|$)`,"g"),na=new RegExp(String.raw`(${De})[\s-]*(?:inches|inch|in\.?)(?![a-z])`,"gi"),aa=new RegExp(String.raw`(${De})\s*["”″](?=\s|[\d'’"-]|$)`,"g");function we(e){return typeof e=="string"?e.replace(/\s+/g," ").trim():e}function Rt(e){if(typeof e!="string"||!e)return e;let t=e.replace(Zn,'"').replace(Xn,"'");return t=t.replace(ea,(n,a)=>{const o=we(a);return o?`${o} ft `:a}),t=t.replace(ta,(n,a)=>{const o=we(a);return o?`${o} ft `:a}),t=t.replace(na,(n,a)=>{const o=we(a);return o?`${o} inch `:a}),t=t.replace(aa,(n,a)=>{const o=we(a);return o?`${o} inch `:a}),t}const Fe=[["ß","ss"],["æ","ae"],["œ","oe"],["ø","o"],["þ","th"],["ð","d"],["đ","d"],["ħ","h"],["ı","i"],["ĳ","ij"],["ŋ","ng"],["ł","l"],["ſ","s"]],oa=Fe.map(e=>new RegExp(e[0],"g"));function ia(e){if(typeof e!="string")return"";let t=e.replace(On,"");if(typeof t.normalize=="function")try{t=t.normalize("NFKD")}catch{}t=t.toLowerCase(),t=Rt(t),t=t.replace(qn," ").replace(Gn," ").replace(zn," ").replace(Fn," ").replace(Un," ").replace(Wn," x ").replace(Kn," deg ").replace(/\bdegrees?\b/gi," deg ").replace(/&/g," and ").replace(/\+/g," plus ").replace(/@/g," at ").replace(Jn," ").replace(Yn," ").replace(Qn," "),t=t.replace(Nn,"");for(let n=0;n<Fe.length;n+=1){const a=Fe[n],o=oa[n];t=t.replace(o,a[1])}return t=t.replace(/['"`]/g," ").replace(/\s+/g," ").trim(),t}const ie=Object.freeze({normalizeMeasurementUnits:Rt,normalizeSearchValue:ia});if(N)if(N.registerOrQueueModule("cine.features.featureSearchNormalization",ie,{category:"features",description:"Shared normalization helpers for feature search, including measurement units and punctuation folding.",replace:!0,connections:["cineModuleBase","cineModuleContext","cineUi"]},e=>Hn("Unable to register cine.features.featureSearchNormalization module.",e),ue,N.getModuleRegistry&&N.getModuleRegistry(ue)),typeof N.exposeGlobal=="function")N.exposeGlobal("cineFeaturesFeatureSearchNormalization",ie,ue,{configurable:!0,enumerable:!1,writable:!1});else try{ue.cineFeaturesFeatureSearchNormalization=ie}catch{}const sa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},ra=".app-view",xt="active",it="projects",re={projects:{id:"view-projects",title:"Projects",pattern:/^#?\/?projects?\/?$/i},projectDetail:{id:"view-project-detail",title:"Project",pattern:/^#?\/?project\/([^/]+)(\/([a-z]+))?\/?$/i},settings:{id:"view-settings",title:"Settings",pattern:/^#?\/?settings?\/?$/i},contacts:{id:"view-contacts",title:"Contacts",pattern:/^#?\/?contacts?\/?$/i},devices:{id:"view-devices",title:"Device Library",pattern:/^#?\/?devices?\/?$/i},help:{id:"view-help",title:"Help",pattern:/^#?\/?help\/?$/i},rules:{id:"view-rules",title:"Auto Gear Rules",pattern:/^#?\/?rules\/?$/i},ownGear:{id:"view-own-gear",title:"Owned Gear",pattern:/^#?\/?own-gear\/?$/i},backups:{id:"view-backups",title:"Cloud Backups",pattern:/^#?\/?backups\/?$/i}};let q=null,Ge={},se=[],st=!1;const ze={};function la(e,t){if(!re[e]){console.warn(`[ViewManager] Cannot register handlers for unknown view: ${e}`);return}ze[e]=t}function rt(){return document.querySelector(".v2-app")||document.getElementById("v2-app")}function ca(){const e=rt();return e?Array.from(e.querySelectorAll(ra)):[]}function da(e){return document.getElementById(e)}function Le(e,t={}){const n=re[e];if(!n)return console.warn(`[ViewManager] Unknown view: ${e}`),!1;const a=da(n.id);if(!a)return console.warn(`[ViewManager] View element not found: ${n.id}`),!1;if(q&&q!==e){const r=ze[q];if(r&&typeof r.onLeave=="function")try{r.onLeave()}catch(i){console.error(`[ViewManager] Error in onLeave for ${q}:`,i)}}ca().forEach(r=>{r.classList.remove(xt)}),a.classList.add(xt),q&&q!==e&&se.push({view:q,params:Ge}),q=e,Ge=t,ga(e,t),ma(e,t),fa(n.title,t);const o=ze[e];if(o&&typeof o.onEnter=="function")try{o.onEnter(t)}catch(r){console.error(`[ViewManager] Error in onEnter for ${e}:`,r)}return!0}function ua(){if(se.length>0){const e=se.pop();return Le(e.view,e.params),!0}return Le(it),!1}function va(){return q}function pa(){return{...Ge}}function ga(e,t){let n="";switch(re[e],e){case"projects":n="#/projects";break;case"projectDetail":n=`#/project/${encodeURIComponent(t.projectId||"new")}`,t.tab&&(n+=`/${t.tab}`);break;case"settings":n="#/settings";break;case"contacts":n="#/contacts";break;case"devices":n="#/devices";break;case"help":n="#/help";break;case"rules":n="#/rules";break;case"ownGear":n="#/own-gear";break;default:re[e]?e==="ownGear"?n="#/own-gear":n=`#/${e}`:n="#/projects"}window.location.hash!==n&&history.replaceState(null,"",n)}function Ht(){const e=window.location.hash||"#/projects";for(const[t,n]of Object.entries(re)){const a=e.match(n.pattern);if(a){const o={};return t==="projectDetail"&&a[1]&&(o.projectId=decodeURIComponent(a[1]),a[3]&&(o.tab=a[3])),{viewName:t,params:o}}}return{viewName:it,params:{}}}function Ot(){const{viewName:e,params:t}=Ht();Le(e,t)}function ma(e,t){const n=new CustomEvent("v2:viewchange",{bubbles:!0,detail:{view:e,params:t,previousView:se.length>0?se[se.length-1]:null}});document.dispatchEvent(n)}function fa(e,t){let n=e;t.projectId&&t.projectId!=="new"&&(n=`${t.projectId} - ${e}`),document.title=`${n} | Cine Power Planner`}function qt(){try{return localStorage.getItem("cine_use_v2_ui")==="true"}catch{return!1}}function Nt(){try{localStorage.setItem("cine_use_v2_ui","true"),st=!0,document.body.classList.add("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="none");const t=rt();return t&&(t.style.display=""),Ot(),!0}catch(e){return console.error("[ViewManager] Failed to enable V2 UI:",e),!1}}function Ft(){try{localStorage.setItem("cine_use_v2_ui","false"),st=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="");const t=rt();return t&&(t.style.display="none"),!0}catch(e){return console.error("[ViewManager] Failed to disable V2 UI:",e),!1}}function ba(){return st?Ft():Nt()}function Ue(){window.addEventListener("hashchange",Ot),qt()&&sa.cineV2Bootstrap,console.log("[ViewManager] Initialized")}const We={showView:Le,goBack:ua,getCurrentView:va,getCurrentParams:pa,registerView:la,parseHash:Ht,isV2Enabled:qt,enableV2:Nt,disableV2:Ft,toggleV2:ba,init:Ue,VIEWS:re,DEFAULT_VIEW:it};typeof globalThis<"u"?globalThis.cineViewManager=We:typeof window<"u"&&(window.cineViewManager=We);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ue):Ue());const ha=Object.freeze(Object.defineProperty({__proto__:null,ViewManager:We},Symbol.toStringTag,{value:"Module"})),Ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Gt=["contactsViewTitle","rulesViewTitle","ownGearViewTitle","deviceLibraryTitle","buttonAddContact","buttonAddRule","buttonAddGearItem"];function lt(){if(!Ve.texts||!Ve.texts.en)return console.warn("[V2 Translations] Main translation system not loaded"),!1;const e=Gt.filter(t=>!(t in Ve.texts.en));return e.length>0?(console.warn("[V2 Translations] Missing keys:",e),!1):(console.log("[V2 Translations] All V2 keys verified"),!0)}const zt=lt(),ya={verifyV2Translations:lt,isReady:zt},wa=Object.freeze(Object.defineProperty({__proto__:null,V2_REQUIRED_KEYS:Gt,default:ya,isReady:zt,verifyV2Translations:lt},Symbol.toStringTag,{value:"Module"})),ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},ct={project:["setupSelect","setupName","saveSetupBtn","deleteSetupBtn"],devices:["cameraSelect","monitorSelect","videoSelect","motor1Select","motor2Select","motor3Select","motor4Select","controller1Select","controller2Select","controller3Select","controller4Select","distanceSelect","batteryPlateSelect","batterySelect","batteryHotswapSelect"],hidden:["cageSelect"],power:["heroCard","heroTotalDraw","heroAvailablePower","heroRuntime","heroCurrent144","heroCurrent12","heroBatteryCount","breakdownList","pinWarning","dtapWarning","hotswapWarning"],outputs:["projectRequirementsOutput","gearListOutput","batteryTable","powerDiagram"]},dt=Object.values(ct).flat();let _=null,Ce=!0,be=new Map;function Ut(){return _||(_=document.getElementById("v2-legacy-context"),_||(_=document.createElement("div"),_.id="v2-legacy-context",_.setAttribute("aria-hidden","true"),_.style.cssText="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);",document.body.appendChild(_)),_)}function Ea(e){const t=document.getElementById(e);return t?(Ut().appendChild(t),t):(console.warn(`[LegacyShim] Element not found: ${e}`),null)}function Wt(e,t){if(!Ce)return;const n=document.getElementById(e),a=document.getElementById(t);!n||!a||(a.value=n.value,Y(a,"change"))}function Kt(e,t){if(!Ce)return;const n=document.getElementById(e),a=document.getElementById(t);!n||!a||(a.value=n.value,Y(a,"input"))}function Yt(e,t){const n=document.getElementById(e),a=document.getElementById(t);!n||!a||(Ce=!1,a.value=n.value,Ce=!0)}function Y(e,t,n={}){if(!e)return;const a=new Event(t,{bubbles:!0,cancelable:!0,...n});e.dispatchEvent(a)}function ut(e){const t=document.getElementById(e);return t?(Y(t,"click"),!0):(console.warn(`[LegacyShim] Cannot trigger click, element not found: ${e}`),!1)}function ka(e){const t=document.getElementById("setupSelect");if(!t)return console.error("[LegacyShim] setupSelect not found"),!1;let n=Array.from(t.options).find(a=>a.value===e);if(!n)if(Qt().includes(e))console.log(`[LegacyShim] Creating missing option for project: ${e}`),n=document.createElement("option"),n.value=e,n.textContent=e,t.appendChild(n);else return console.warn(`[LegacyShim] Project not found in storage: ${e}`),!1;return t.value=e,Y(t,"change"),!0}function Jt(){return ut("saveSetupBtn")}function Sa(){return ut("deleteSetupBtn")}function La(e){const t=document.getElementById("setupSelect"),n=document.getElementById("setupName");return!t||!n?(console.error("[LegacyShim] Project elements not found"),!1):(t.value="",Y(t,"change"),n.value=e,Y(n,"input"),Jt())}function Qt(){if(ve.cineStorage&&typeof ve.cineStorage.getProjectMemoryCache=="function")try{const t=ve.cineStorage.getProjectMemoryCache();if(t){const n=[];if(Object.keys(t).forEach(a=>{if(a.includes("cameraPowerPlanner_prj_")){const o=a.split("cameraPowerPlanner_prj_");o.length>1&&o[1]&&n.push(o[1])}if(a.includes("cameraPowerPlanner_setups")&&!a.includes("backup")){const o=t[a];o&&typeof o=="object"&&Object.keys(o).forEach(r=>{r&&!r.startsWith("auto-backup-")&&n.push(r)})}}),n.length>0)return[...new Set(n)]}}catch(t){console.warn("[LegacyShim] cineStorage cache check failed:",t)}if(typeof window.getSetups=="function")try{const t=window.getSetups()||{},n=Object.keys(t).filter(a=>a&&!a.startsWith("auto-backup-"));if(n.length>0)return n}catch(t){console.warn("[LegacyShim] getSetups failed:",t)}const e=document.getElementById("setupSelect");if(e&&e.options.length>1){const t=Array.from(e.options).map(n=>n.value).filter(n=>n!=="");if(t.length>0)return[...new Set(t)]}try{const t=localStorage.getItem("cameraPowerPlanner_setups");if(t){const n=JSON.parse(t);return Object.keys(n).filter(a=>a&&!a.startsWith("auto-backup-"))}}catch(t){console.warn("[LegacyShim] localStorage fallback failed:",t)}return[]}function Ca(e,t){const n=document.getElementById(e);return n?(n.value=t,Y(n,"change"),!0):(console.warn(`[LegacyShim] Device element not found: ${e}`),!1)}function xa(e){const t=document.getElementById(e);return t?t.value:null}function Pa(){const e={};return ct.devices.forEach(t=>{const n=document.getElementById(t);n&&(e[t]=n.value)}),e}function $a(e,t){const n=document.getElementById(e);if(!n)return;const a=()=>Wt(e,t);n.addEventListener("change",a),be.set(`${e}:change`,{element:n,handler:a})}function Ia(e,t){const n=document.getElementById(e);if(!n)return;const a=()=>Kt(e,t);n.addEventListener("input",a),be.set(`${e}:input`,{element:n,handler:a})}function Da(e,t){const n=document.getElementById(e);if(!n)return;const a=()=>Yt(e,t);n.addEventListener("change",a),be.set(`${e}:legacy:change`,{element:n,handler:a})}function Ba(){be.forEach(({element:e,handler:t},n)=>{const a=n.split(":")[1];e.removeEventListener(a,t)}),be.clear()}function Zt(){const e=[],t=[];return dt.forEach(n=>{document.getElementById(n)?t.push(n):e.push(n)}),e.length>0&&console.warn("[LegacyShim] Missing critical IDs:",e),{found:t,missing:e}}function Ke(){const{found:e,missing:t}=Zt();console.log(`[LegacyShim] Initialized. Found ${e.length}/${dt.length} critical elements.`),t.length>0&&console.warn("[LegacyShim] Missing elements:",t)}const Be={ensureLegacyContainer:Ut,shimToLegacyContainer:Ea,syncSelectValue:Wt,syncInputValue:Kt,syncToV2:Yt,dispatchNativeEvent:Y,triggerLegacyClick:ut,loadProject:ka,saveProject:Jt,deleteProject:Sa,createProject:La,getProjectNames:Qt,setDeviceValue:Ca,getDeviceValue:xa,getDeviceSnapshot:Pa,bindV2Select:$a,bindV2Input:Ia,listenLegacyChanges:Da,verifyLegacyIds:Zt,cleanup:Ba,init:Ke,CRITICAL_IDS:ct,ALL_CRITICAL_IDS:dt};typeof ve<"u"&&(ve.cineLegacyShim=Be);typeof window<"u"&&(window.cineLegacyShim=Be);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ke):Ke());typeof module<"u"&&module.exports&&(module.exports=Be);const Ta=Object.freeze(Object.defineProperty({__proto__:null,LegacyShim:Be},Symbol.toStringTag,{value:"Module"})),$=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Xt="projectGrid",pe="view-projects",ae="cameraPowerPlanner_setups",K=["blue","green","orange","purple","red","pink","teal","indigo","yellow","amber","lime","emerald","cyan","sky","violet","fuchsia","rose","slate","stone","neutral","gold","crimson","navy","aquamarine"],Aa=["📽️","🎬","⚡","🔋","🎥","📺","💡","🎞️","📸","🎯","📝","⭐","🐴","🦄","🤘","🦊","🐶","🦖","🐙","🐉","👽","👻","🤖","💀","👾","🤡","🎉","🔥","✨","🚀","🍕","🤙","✌️","💪"];let xe=!1,he={query:""},j=null;function vt(){return{loadProjectMetadata:()=>(console.warn("[V2] Synchronous metadata load requested - this is a legacy pattern. Using empty default."),{}),async getProjectNames(){const e=await O.getProjectNames();let t=[];if($.cineLegacyShim&&typeof $.cineLegacyShim.getProjectNames=="function")t=$.cineLegacyShim.getProjectNames();else try{const n=localStorage.getItem(ae);n&&(t=Object.keys(JSON.parse(n)))}catch{}return[...new Set([...e,...t])].filter(n=>n&&!n.startsWith("auto-backup-"))},async getProjectMetadata(e){let t=await O.getProjectMetadata(e);if(!t||Object.keys(t).length===0)try{const n=localStorage.getItem(ae);if(n){const a=JSON.parse(n);if(a[e])return a[e]}}catch{}return t},async loadProject(e){let t=await O.getProject(e);if(!t)try{const n=localStorage.getItem(ae);if(n){const a=JSON.parse(n);if(a[e])return a[e]}}catch{}return t},async saveProject(e,t,n={}){return await O.saveProject(e,t)},async updateProjectMetadata(e,t={}){let n=await O.getProject(e);if(!n)try{const a=localStorage.getItem(ae);a&&(n=JSON.parse(a)[e])}catch{}return n?(t.color&&(n.color=t.color),t.icon&&(n.icon=t.icon),t.prepDays&&(n.prepDays=t.prepDays),t.shootingDays&&(n.shootingDays=t.shootingDays),t.returnDays&&(n.returnDays=t.returnDays),typeof t.archived<"u"&&(n.archived=t.archived),t.status&&(n.status=t.status),{success:await O.saveProject(e,n),lastModified:n.lastModified}):{success:!1}},async deleteProject(e){await O.deleteProject(e);try{const t=localStorage.getItem(ae);if(t){const n=JSON.parse(t);n[e]&&(delete n[e],localStorage.setItem(ae,JSON.stringify(n)))}}catch{}return!0},async duplicateProject(e){return await O.duplicateProject(e)},renameProject:()=>({success:!1}),async createProject(e){return await O.createProject(e)}}}function X(){return vt()}function Ma(){return vt()}function Ye(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function ge(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function ke(e){if(!e||typeof e!="string")return"";const t=e.split(" to ");return t.length===1?ge(t[0]):t.length===2?`${ge(t[0])} - ${ge(t[1])}`:e}function P(e,t={}){const n=document.documentElement.lang||"en";let a=window.texts&&window.texts[n]?window.texts[n]:null;!a&&window.texts&&(a=window.texts.en);const o=(i,s)=>s.split(".").reduce((l,c)=>l?l[c]:null,i);let r=a?o(a,e):null;if(!r&&n!=="en"&&window.texts&&window.texts.en&&(r=o(window.texts.en,e)),!r)return e;if(typeof r=="string")for(const[i,s]of Object.entries(t))r=r.replace(`{${i}}`,s);return r}async function le(){const e=X();let t=e.loadProjectMetadata();if(t&&Object.keys(t).length>0){j=t;return}try{const n=await e.getProjectNames(),a={};await Promise.all(n.map(async o=>{if(o&&!o.startsWith("auto-backup-")){const r=await e.getProjectMetadata(o);a[o]=r||{}}})),j=a}catch(n){console.error("[Dashboard] Failed to refresh project cache:",n),j={}}}function Te(){return j?Object.keys(j).filter(e=>e&&!e.startsWith("auto-backup-")):[]}function ja(){let e=Te();if(e=e.filter(t=>!!!en(t).archived),he.query){const t=he.query.toLowerCase();e=e.filter(n=>n.toLowerCase().includes(t))}return[...new Set(e)]}function en(e){j===null&&le();const t=j[e];return t?{lastModified:t.lastModified||null,color:t.color||null,icon:t.icon||null,prepDays:t.prepDays||[],shootingDays:t.shootingDays||[],returnDays:t.returnDays||[],archived:t.archived||!1,status:t.status||(t.archived?"Archived":"Planning")}:{lastModified:null,color:null,icon:null,prepDays:[],shootingDays:[],returnDays:[],archived:!1,status:"Planning"}}function pt(e,t={}){const a=X().updateProjectMetadata(e,t);if(a&&a.success){if(j){j[e]||(j[e]={});const o={...t};a.lastModified&&(o.lastModified=a.lastModified),Object.assign(j[e],o)}return!0}return!1}function Va(e,t){const n=en(e);let a=n.color||K[t%K.length];K.includes(a)||(a=K[t%K.length]);const o=Ye(n.icon||"📽️"),r=n.lastModified?ge(n.lastModified):"",i=Ye(e),s=n.status||"Planning",l=s.toLowerCase().replace(/\s+/g,"-");let c=s.toLowerCase().replace(/\s+/g,"");c==="waitingforapproval"&&(c="waitingForApproval");const f=P(`v2.dashboard.status.${c}`)===`v2.dashboard.status.${c}`?s:P(`v2.dashboard.status.${c}`);let v="";return(n.prepDays?.length>0||n.shootingDays?.length>0||n.returnDays?.length>0)&&(v='<div class="v2-tile-periods">',Array.isArray(n.prepDays)&&n.prepDays.forEach(g=>{const u=ke(g);u&&(v+=`<span class="v2-period-badge prep" title="${P("v2.dashboard.projectTile.prep")} ${u}"><span class="period-icon">📅</span> ${u}</span>`)}),Array.isArray(n.shootingDays)&&n.shootingDays.forEach(g=>{const u=ke(g);u&&(v+=`<span class="v2-period-badge shoot" title="${P("v2.dashboard.projectTile.shoot")} ${u}"><span class="period-icon">🎥</span> ${u}</span>`)}),Array.isArray(n.returnDays)&&n.returnDays.forEach(g=>{const u=ke(g);u&&(v+=`<span class="v2-period-badge return" title="${P("v2.dashboard.projectTile.return")} ${u}"><span class="period-icon">🚛</span> ${u}</span>`)}),v+="</div>"),`
      <div class="v2-project-tile" data-project="${i}" tabindex="0" role="button" aria-label="${P("v2.dashboard.projectTile.actionsFor",{project:i})}">
        <div class="v2-tile-header">
          <div class="v2-tile-icon color-${a}">${o}</div>
            <div class="v2-tile-info">
            <h3 class="v2-tile-title">${i}</h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                 ${r?`<span class="v2-tile-meta">${r}</span>`:""}
                 <span class="v2-status-badge ${l}">${f}</span>
            </div>
            ${v}
          </div>
          <div class="v2-tile-actions">
            <button type="button" class="v2-tile-action-btn" data-action="menu" data-project="${i}" title="${P("v2.dashboard.projectTile.moreOptions")}" aria-label="${P("v2.dashboard.projectTile.actionsFor",{project:i})}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `}function _a(){return`
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
    `}function Ra(e){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 48px; display: flex; align-items: center; justify-content: center;">🔍</div>
        <h2>${P("v2.dashboard.search.noResults.title")}</h2>
        <p class="text-muted">${P("v2.dashboard.search.noResults.subtitle",{query:Ye(e)})}</p>
        <button id="v2ClearSearchBtn" class="v2-btn-secondary">
          Clear Search
        </button>
      </div>
    `}async function G(e=!1){$.cineProjectLockManager&&$.cineProjectLockManager.releaseLock();const t=document.getElementById(Xt);t&&(e&&(t.innerHTML='<div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--v2-text-secondary);">Loading projects...</div>'),await le(),Ha(t))}function Ha(e){if(e.innerHTML="",e.className="v2-project-grid",e.style="",Te().length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const r=e.closest(".v2-main");r&&r.classList.add("align-top"),e.innerHTML=Fa(),Na(e);return}const n=ja();if(n.length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const r=e.closest(".v2-main");r&&r.classList.add("align-top"),e.innerHTML=Ra(he.query);const i=e.querySelector("#v2ClearSearchBtn");i&&i.addEventListener("click",()=>{const s=document.getElementById("v2SidebarSearchInput");s&&(s.value="",s.dispatchEvent(new Event("input",{bubbles:!0})))});return}const a=e.closest(".v2-main");a&&a.classList.remove("align-top");let o="";n.forEach((r,i)=>{o+=Va(r,i)}),he.query||(o+=_a()),e.innerHTML=o,qa(e)}function Oa(){window.addEventListener("v2:search",e=>{he.query=e.detail?.query||"",G()})}function qa(e){e.querySelectorAll(".v2-project-tile").forEach(n=>{n.addEventListener("click",a=>{if(a.target.closest('[data-action="menu"]'))return;const o=n.dataset.project;o&&Pe(o)}),n.addEventListener("contextmenu",a=>{a.preventDefault();const o=n.dataset.project;o&&Pt(a,o)}),n.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),n.click())})}),e.querySelectorAll('[data-action="menu"]').forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation();const o=n.dataset.project;o&&Pt(a,o)})});const t=e.querySelector("#v2CreateProjectTile");t&&(t.addEventListener("click",()=>Je()),t.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),Je())}))}function Pt(e,t){R();const n=document.createElement("div");n.className="v2-context-menu",n.innerHTML=`
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
        `,n.style.left=`${e.clientX}px`,n.style.top=`${e.clientY}px`,n.querySelector('[data-action="open"]').addEventListener("click",()=>{Pe(t),R()}),n.querySelector('[data-action="edit"]').addEventListener("click",()=>{R(),Je(t)}),n.querySelector('[data-action="print"]').addEventListener("click",()=>{Pe(t,{action:"print"}),R()}),n.querySelector('[data-action="duplicate"]').addEventListener("click",()=>{za(t),R()}),n.querySelector('[data-action="archive"]').addEventListener("click",()=>{Ga(t),R()}),n.querySelector('[data-action="delete"]').addEventListener("click",()=>{tn(t),R()}),document.body.appendChild(n);const a=n.getBoundingClientRect();a.right>window.innerWidth&&(n.style.left=`${window.innerWidth-a.width-10}px`),a.bottom>window.innerHeight&&(n.style.top=`${window.innerHeight-a.height-10}px`),setTimeout(()=>{document.addEventListener("click",R,{once:!0}),document.addEventListener("contextmenu",R,{once:!0})},0)}function R(){const e=document.querySelector(".v2-context-menu");e&&e.remove(),document.removeEventListener("click",R)}function Na(e){const t=e.querySelector("#v2EmptyStateCreateBtn");t&&t.addEventListener("click",()=>Ae())}async function Pe(e,t={}){if($.cineProjectLockManager&&!await $.cineProjectLockManager.requestLock(e)){alert(P("v2.dashboard.projectLocked",{projectName:e}));return}$.cineLegacyShim&&$.cineLegacyShim.loadProject(e),$.cineViewManager&&$.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera",...t})}function Fa(){return`
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
    `}function tn(e){if(confirm(P("v2.dashboard.confirmDelete",{project:e})||`Are you sure you want to delete project "${e}"?`))try{X().deleteProject(e)&&(gt(),le()),$.cineLegacyShim&&typeof $.cineLegacyShim.deleteProject=="function"&&typeof $.cineLegacyShim.refreshProjects=="function"&&$.cineLegacyShim.refreshProjects(),G()}catch(t){console.error("[V2] Failed to delete project:",t),alert(P("v2.common.error")||"An error occurred.")}}function Ga(e){pt(e,{archived:!0,status:"Archived"}),G()}function za(e){const n=X().duplicateProject(e);n&&n.success&&(gt(),le(),G(),$.cineLegacyShim&&typeof $.cineLegacyShim.refreshProjects=="function"&&$.cineLegacyShim.refreshProjects())}function Je(e=null){Ae(e)}function Ae(e=null){const t=!!e,n=Math.floor(Math.random()*K.length);let a=K[n],o="📽️",r=null;t&&(le(),r=X().getProjectMetadata(e),r&&(r.color&&(a=r.color),r.icon&&(o=r.icon)));let i=[];if(t&&r){let y=1;const B=(L,A,z)=>{if(!L)return;let Q="",Z="";L.includes(" to ")?[Q,Z]=L.split(" to "):(Q=L,Z=L),i.push({id:`period-${y++}`,type:A,name:z,startDate:Q,endDate:Z})};Array.isArray(r.prepDays)&&r.prepDays.forEach(L=>B(L,"prep","Prep")),Array.isArray(r.shootingDays)&&r.shootingDays.forEach(L=>B(L,"shoot","Shoot")),Array.isArray(r.returnDays)&&r.returnDays.forEach(L=>B(L,"return","Return"))}!t&&i.length===0&&(i=[{id:"period-1",type:"prep",name:"Prep",startDate:"",endDate:""},{id:"period-2",type:"shoot",name:"Shoot",startDate:"",endDate:""},{id:"period-3",type:"return",name:"Return",startDate:"",endDate:""}]);let s=i.length>0?i.length:3;const l=[{value:"prep",label:"Prep",icon:"📅"},{value:"shoot",label:"Shoot",icon:"🎥"},{value:"return",label:"Return",icon:"🚛"}],c=y=>`var(--v2-color-${y})`,f=K.map(y=>`
            <button type="button" class="v2-color-swatch-sm color-${y} ${y===a?"selected":""}" 
                    data-color="${y}" aria-label="Select ${y} color">
            </button>
        `).join(""),v=Aa.map(y=>`
            <button type="button" class="v2-icon-option-sm ${y===o?"selected":""}" 
                    data-icon="${y}" aria-label="Select icon ${y}">
                ${y}
            </button>
        `).join(""),b=()=>i.length===0?'<div class="v2-empty-state" style="padding: 16px; font-size: 13px;">No dates added yet.</div>':i.map(y=>{const B=l.map(L=>`<option value="${L.value}" ${y.type===L.value?"selected":""}>${L.icon} ${L.label}</option>`).join("");return`
                <div class="v2-period-row" data-period-id="${y.id}">
                    <div class="v2-period-name">
                        <select class="v2-period-type-select" data-field="type">
                            ${B}
                        </select>
                    </div>
                    <input type="date" class="v2-date-input" value="${y.startDate}" data-field="startDate" aria-label="${y.name} Start Date">
                    <span class="v2-date-separator">to</span>
                    <input type="date" class="v2-date-input" value="${y.endDate}" data-field="endDate" aria-label="${y.name} End Date">
                    <button type="button" class="v2-period-remove" data-period-id="${y.id}" aria-label="Remove period">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `}).join(""),g=document.createElement("div");g.className="v2-modal-backdrop",g.innerHTML=`
            <div class="v2-modal" style="max-width: 520px;">
                <div class="v2-modal-header">
                    <h3 class="v2-modal-title">${t?"Edit Project":"Create New Project"}</h3>
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
                               value="${t?e:""}"
                               style="width: 100%; padding: var(--v2-space-sm) var(--v2-space-md); border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-md); font-size: var(--v2-font-size-base);">
                        ${t?'<p class="text-muted" style="font-size: 12px; margin-top: 4px;">Warning: Renaming will create a new entry.</p>':""}
                        <p id="v2NewProjectError" style="color: var(--v2-status-error); font-size: var(--v2-font-size-sm); margin-top: var(--v2-space-sm); display: none;"></p>
                    </div>

                    <!-- Color & Icon Pickers Row -->
                    <div class="v2-picker-row" style="margin-bottom: var(--v2-space-lg);">
                        <div class="v2-picker-group">
                            <label class="v2-form-section-label">Color</label>
                            <button type="button" class="v2-picker-trigger" id="v2ColorPickerTrigger">
                                <span class="v2-picker-preview" id="v2ColorPreview" style="background-color: ${c(a)};"></span>
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
                                <span class="v2-picker-icon-preview" id="v2IconPreview">${o}</span>
                                <span class="v2-picker-label">Icon</span>
                                <svg class="v2-picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="v2-picker-popover" id="v2IconPopover" style="min-width: 280px;">
                                <div class="v2-picker-popover-grid" style="grid-template-columns: repeat(7, 1fr);">
                                    ${v}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Periods -->
                    <div style="margin-bottom: var(--v2-space-md);">
                        <label class="v2-form-section-label">Project Roadmap</label>
                        <div class="v2-periods-container" id="v2PeriodsContainer">
                            ${b()}
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
                    <button type="button" class="v2-btn v2-btn-primary" id="v2CreateProjectBtn">${t?"Save Changes":"Create Project"}</button>
                </div>
            </div>
        `,document.body.appendChild(g),requestAnimationFrame(()=>{g.classList.add("open")});const u=g.querySelector("#v2NewProjectName"),d=g.querySelector("#v2NewProjectError"),m=g.querySelector("#v2CreateProjectBtn"),p=g.querySelector("#v2CancelProjectBtn"),h=g.querySelector(".v2-modal-close"),k=g.querySelector("#v2PeriodsContainer"),x=g.querySelector("#v2AddPeriodBtn"),S=g.querySelector("#v2ColorPickerTrigger"),T=g.querySelector("#v2ColorPopover"),D=g.querySelector("#v2ColorPreview"),Ln=S.querySelector(".v2-picker-label");S.addEventListener("click",y=>{y.stopPropagation(),S.classList.toggle("open"),T.classList.toggle("open"),ce.classList.remove("open"),te.classList.remove("open")}),T.querySelectorAll(".v2-color-swatch-sm").forEach(y=>{y.addEventListener("click",B=>{B.stopPropagation(),T.querySelectorAll(".v2-color-swatch-sm").forEach(L=>L.classList.remove("selected")),y.classList.add("selected"),a=y.dataset.color,D.style.backgroundColor=c(a),Ln.textContent=a.charAt(0).toUpperCase()+a.slice(1),S.classList.remove("open"),T.classList.remove("open")})});const ce=g.querySelector("#v2IconPickerTrigger"),te=g.querySelector("#v2IconPopover"),Cn=g.querySelector("#v2IconPreview");ce.addEventListener("click",y=>{y.stopPropagation(),ce.classList.toggle("open"),te.classList.toggle("open"),S.classList.remove("open"),T.classList.remove("open")}),te.querySelectorAll(".v2-icon-option-sm").forEach(y=>{y.addEventListener("click",B=>{B.stopPropagation(),te.querySelectorAll(".v2-icon-option-sm").forEach(L=>L.classList.remove("selected")),y.classList.add("selected"),o=y.dataset.icon,Cn.textContent=o,ce.classList.remove("open"),te.classList.remove("open")})}),g.addEventListener("click",()=>{S.classList.remove("open"),T.classList.remove("open"),ce.classList.remove("open"),te.classList.remove("open")});function wt(y,B,L){const A=i.find(z=>z.id===y);if(A)if(B==="type"){const z=l.find(Q=>Q.value===L);z&&(A.type=L,A.name=z.label)}else A[B]=L}function xn(y){i=i.filter(B=>B.id!==y),Et()}function Pn(){s++,i.push({id:`period-${s}`,type:"shoot",name:"Shoot",startDate:"",endDate:""}),Et()}function Et(){k.innerHTML=b(),kt()}function kt(){k.querySelectorAll(".v2-period-row").forEach(y=>{const B=y.dataset.periodId;y.querySelectorAll("input, select").forEach(A=>{A.addEventListener("change",()=>{wt(B,A.dataset.field,A.value)}),A.addEventListener("input",()=>{wt(B,A.dataset.field,A.value)})});const L=y.querySelector(".v2-period-remove");L&&L.addEventListener("click",()=>{xn(B)})})}kt(),x.addEventListener("click",Pn),t||setTimeout(()=>u.focus(),100);function ne(){g.classList.remove("open"),setTimeout(()=>g.remove(),200)}async function St(){const y=u.value.trim();if(!y){d.textContent="Please enter a project name.",d.style.display="block",u.focus();return}const B=Te();if(t){if(y!==e&&B.includes(y)){d.textContent="A project with this name already exists.",d.style.display="block",u.focus();return}}else if(B.includes(y)){d.textContent="A project with this name already exists.",d.style.display="block",u.focus();return}m.disabled=!0,m.textContent=t?"Saving...":"Creating...";const L=V=>{if(!V)return null;const U=V.startDate,W=V.endDate;return!U&&!W?null:U&&W?`${U} to ${W}`:U||W||null},A=i.filter(V=>V.type==="prep").map(L).filter(Boolean),z=i.filter(V=>V.type==="shoot").map(L).filter(Boolean),Q=i.filter(V=>V.type==="return").map(L).filter(Boolean),Z={color:a,icon:o,prepDays:A,shootingDays:z,returnDays:Q};if(t){if(y!==e){const U=X().renameProject(e,y,Z);if(U&&U.success){gt(),le();const W=document.getElementById("setupSelect");W&&W.value,G(),$.cineLegacyShim&&typeof $.cineLegacyShim.refreshProjects=="function"&&$.cineLegacyShim.refreshProjects()}}else pt(y,Z),G();ne()}else await nn(y,Z),ne()}m.addEventListener("click",St),p.addEventListener("click",ne),h.addEventListener("click",ne),g.addEventListener("click",y=>{y.target===g&&ne()}),u.addEventListener("keydown",y=>{y.key==="Enter"&&St(),y.key==="Escape"&&ne()}),u.addEventListener("input",()=>{d.style.display="none"})}async function nn(e,t={}){return await X().createProject(e)?(pt(e,t),$.cineViewManager&&$.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera"}),!0):!1}function gt(){try{const e="cameraPowerPlanner_project_rev",t=parseInt(localStorage.getItem(e)||"0",10);localStorage.setItem(e,(t+1).toString())}catch(e){console.error("[V2] Failed to update project revision:",e)}}function an(){if(document.getElementById(pe))return document.getElementById(pe);const e=document.createElement("section");e.id=pe,e.className="app-view",e.innerHTML=`
      <header class="view-header">
        <button class="v2-mobile-menu-toggle" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1>${P("v2.dashboard.header.title")}</h1>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-secondary" id="v2HeaderImportBtn" style="margin-right: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            ${P("v2.dashboard.actions.importProject")}
          </button>
          <button type="button" class="v2-btn v2-btn-primary" id="v2HeaderCreateBtn">
            + ${P("v2.dashboard.actions.newProject")}
          </button>
        </div>
      </header>
      <div class="view-content">
        <div class="v2-project-grid" id="${Xt}">
          <!-- Tiles will be rendered here -->
        </div>
      </div>
    `;const t=e.querySelector("#v2HeaderCreateBtn");return t&&t.addEventListener("click",Ae),e}function Qe(e={}){if(xe){console.warn("[ProjectDashboard] Already initialized, skipping.");return}xe=!0,e.dataProvider&&(e.dataProvider,j=null),console.log("[ProjectDashboard] init() called");const t=an(),n=document.querySelector(".v2-main");n&&!document.getElementById(pe)&&n.appendChild(t),document.addEventListener("click",o=>{o.target&&(o.target.closest("#v2HeaderCreateBtn")?Ae():o.target.closest("#v2HeaderImportBtn")&&$.cineLegacyShim&&$.cineLegacyShim.triggerLegacyClick("applySharedLinkBtn"))});const a=document.querySelector(".v2-view.active");a&&a.id===pe&&G(!0),window.addEventListener("v2:viewchange",o=>{o.detail.view==="projects"&&G(!0)}),Oa()}const mt={init:Qe,renderProjectGrid:G,createProject:nn,deleteProject:tn,openProject:Pe,getProjectNames:Te,createDashboardView:an,formatDate:ge,formatDateRange:ke,createDefaultDataProvider:vt,createUiOnlyDataProvider:Ma};typeof $<"u"&&($.cineProjectDashboard=mt);typeof window<"u"&&(window.cineProjectDashboard=mt);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{xe||(console.log("[ProjectDashboard] Auto-initializing (Fallback)"),Qe())},200)}):setTimeout(()=>{xe||(console.log("[ProjectDashboard] Auto-initializing (Fallback)"),Qe())},200));const Ua=Object.freeze(Object.defineProperty({__proto__:null,ProjectDashboard:mt},Symbol.toStringTag,{value:"Module"})),w=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},me="view-project-detail",on="cameraPowerPlanner_setups",Wa=["camera","power","requirements","kit"],Ka="camera";let H=null,sn=Ka,$t=!1,M=null;function $e(e){if(!Wa.includes(e)){console.warn(`[ProjectDetail] Invalid tab: ${e}`);return}sn=e,document.querySelectorAll("#view-project-detail .v2-tab-btn").forEach(a=>{const o=a.dataset.tab===e;a.classList.toggle("active",o),a.setAttribute("aria-selected",o?"true":"false")}),document.querySelectorAll("#view-project-detail .v2-tab-pane").forEach(a=>{const o=a.id===`tab-${e}`;a.classList.toggle("active",o),a.hidden=!o}),document.dispatchEvent(new CustomEvent("v2:tabchange",{detail:{tab:e,project:H}})),e==="power"&&setTimeout(()=>vn(),10)}function rn(){return sn}function _e(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function Re(e){if(!e||typeof e!="string")return"";const t=e.split(" to ");return t.length===1?_e(t[0]):t.length===2?`${_e(t[0])} - ${_e(t[1])}`:e}function C(e,t={}){const n=document.documentElement.lang||"en";let a=window.texts&&window.texts[n]?window.texts[n]:null;!a&&window.texts&&(a=window.texts.en);const o=(i,s)=>s.split(".").reduce((l,c)=>l?l[c]:null,i);let r=a?o(a,e):null;if(!r&&n!=="en"&&window.texts&&window.texts.en&&(r=o(window.texts.en,e)),!r)return e;if(typeof r=="string")for(const[i,s]of Object.entries(t))r=r.replace(`{${i}}`,s);return r}function ft(){if(w.cineStorage&&typeof w.cineStorage.getProjectMemoryCache=="function")try{const e=w.cineStorage.getProjectMemoryCache();if(e){M={},Object.keys(e).forEach(t=>{let n=t;if(t.includes("cameraPowerPlanner_prj_")){const a=t.split("cameraPowerPlanner_prj_");a.length>1&&a[1]&&(n=a[1])}M[n]=e[t]}),console.log("[ProjectDetail] Cache refreshed from cineStorage. Keys:",Object.keys(M).length);return}}catch(e){console.warn("[ProjectDetail] Failed to read from cineStorage cache:",e)}try{const e=localStorage.getItem(on);e?M=JSON.parse(e):M={}}catch(e){console.error("[ProjectDetail] Failed to parse project data:",e),M={}}}function ln(e){if(M===null&&ft(),M&&M[e]){const t=M[e];return{prepDays:t.prepDays||[],shootingDays:t.shootingDays||[],returnDays:t.returnDays||[],status:t.status||(t.archived?"Archived":"Planning")}}return{prepDays:[],shootingDays:[],returnDays:[],status:"Planning"}}function cn(e,t){try{ft();const n=M||{};if(n&&n[e])return n[e].status=t,t==="Archived"?n[e].archived=!0:n[e].archived=!1,localStorage.setItem(on,JSON.stringify(n)),M=n,!0}catch(n){console.error("[ProjectDetail] Failed to update status:",n)}return!1}function dn(e){if(!e)return console.warn("[ProjectDetail] No project name provided"),!1;ft(),H=e;const t=document.getElementById("v2ProjectName");t&&(t.textContent=e),w.cineLegacyShim&&w.cineLegacyShim.loadProject(e);const n=ln(e),a=document.getElementById("v2ProjectPeriods"),o=document.getElementById("v2ProjectStatus");if(o){o.value=n.status,Ze(o);const r=o.cloneNode(!0);o.parentNode.replaceChild(r,o),r.addEventListener("change",i=>{const s=i.target.value;cn(e,s),Ze(r)})}if(a){let r="";Array.isArray(n.prepDays)&&n.prepDays.forEach(i=>{const s=Re(i);s&&(r+=`<span class="v2-header-badge prep" title="Prep Dates: ${s}"><span class="period-icon">📅</span> ${s}</span>`)}),Array.isArray(n.shootingDays)&&n.shootingDays.forEach(i=>{const s=Re(i);s&&(r+=`<span class="v2-header-badge shoot" title="Shooting Dates: ${s}"><span class="period-icon">🎥</span> ${s}</span>`)}),Array.isArray(n.returnDays)&&n.returnDays.forEach(i=>{const s=Re(i);s&&(r+=`<span class="v2-header-badge return" title="Return Dates: ${s}"><span class="period-icon">🚛</span> ${s}</span>`)}),a.innerHTML=r,a.style.display=r?"flex":"none"}return console.log(`[ProjectDetail] Loaded project: ${e}`),!0}function Ya(){return H}function Ja(){w.cineViewManager&&w.cineViewManager.showView("projects")}function Qa(){if(document.getElementById(me))return document.getElementById(me);const e=document.createElement("section");e.id=me,e.className="app-view";const t=document.querySelector(".v2-main");return t&&t.appendChild(e),e}function un(){const e=Qa();e&&(e.innerHTML=`
      <header class="view-header view-header-with-back">
        <button type="button" class="v2-back-btn" id="v2BackToProjects" aria-label="${C("v2.detail.backButton")}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>${C("v2.detail.backButton")}</span>
        </button>
        <h1 id="v2ProjectName" class="view-header-title">Project</h1>
        <div class="v2-header-status">
            <select id="v2ProjectStatus" class="v2-status-select">
                <option value="Draft">${C("v2.dashboard.status.draft")}</option>
                <option value="Planning">${C("v2.dashboard.status.planning")}</option>
                <option value="Waiting for Approval">${C("v2.dashboard.status.waitingForApproval")}</option>
                <option value="Approved">${C("v2.dashboard.status.approved")}</option>
                <option value="Shooting">${C("v2.dashboard.status.shooting")}</option>
                <option value="Completed">${C("v2.dashboard.status.completed")}</option>
                <option value="Archived">${C("v2.dashboard.status.archived")}</option>
            </select>
        </div>
        <div id="v2ProjectPeriods" class="v2-header-periods" style="display: none;"></div>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-ghost" id="v2PrintProjectBtn" title="${C("v2.detail.header.print")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateReqsGearBtn" title="${C("v2.detail.header.generateReqs")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${C("v2.detail.header.generateReqs")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2ExportProjectBtn" title="${C("v2.detail.header.export")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
               <polyline points="16 6 12 2 8 6"/>
               <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span class="v2-btn-label">${C("v2.detail.header.export")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateOverviewBtn" title="${C("v2.detail.header.generateOverview")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${C("v2.detail.header.generateOverview")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-secondary" id="v2SaveProjectBtn">
            ${C("v2.detail.header.save")}
          </button>
        </div>
      </header>


      
      <!-- Tab Navigation (Sticky Top) -->
      <nav class="v2-tabs-nav" role="tablist" aria-label="Project sections">
        <button type="button" class="v2-tab-btn active" data-tab="camera" role="tab" aria-selected="true" aria-controls="tab-camera">
          ${C("v2.detail.tabs.cameraPackage")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="power" role="tab" aria-selected="false" aria-controls="tab-power">
          ${C("v2.detail.tabs.powerSummary")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="requirements" role="tab" aria-selected="false" aria-controls="tab-requirements">
          ${C("v2.detail.tabs.requirements")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="kit" role="tab" aria-selected="false" aria-controls="tab-kit">
          ${C("v2.detail.tabs.gearList")}
        </button>
      </nav>

      <div class="view-content">
        <!-- Tab Content -->
        <div class="v2-tab-content" style="padding-top: var(--v2-space-lg);">
          <!-- Camera Package Tab -->
          <section id="tab-camera" class="v2-tab-pane active" role="tabpanel" aria-labelledby="tab-camera-btn">
            ${Za()}
          </section>
          
          <!-- Power Summary Tab -->
          <section id="tab-power" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-power-btn" hidden>
            ${eo()}
          </section>
          
          <!-- Requirements Tab -->
          <section id="tab-requirements" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-requirements-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${C("v2.detail.actions.projectRequirements")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateRequirementsBtn">
                  ${C("v2.detail.actions.generateRequirements")}
                </button>
              </div>
              <div class="v2-card-body" id="v2RequirementsContainer">
                <p class="v2-text-muted">${C("v2.detail.actions.generateRequirementsHelp")}</p>
                <div data-reparent="projectForm"></div>
                <div id="v2RequirementsOutput" class="v2-requirements-output" style="margin-top: var(--v2-space-md);"></div>
              </div>
            </div>
          </section>
          
          <!-- Gear List Tab -->
          <section id="tab-kit" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-kit-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${C("v2.detail.actions.gearList")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateGearListBtn">
                  ${C("v2.detail.actions.generateGearList")}
                </button>
              </div>
              <div class="v2-card-body" id="v2KitListContainer">
                <p class="v2-text-muted">${C("v2.detail.actions.generateGearListHelp")}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `,to(e),setTimeout(()=>Xa(e),0))}function Za(){return`
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
    `}function Xa(e){e.querySelectorAll("[data-reparent]").forEach(n=>{const a=n.dataset.reparent,o=document.getElementById(a);if(o){const r=o.tagName.toLowerCase();["select","input","textarea"].includes(r)?(o.style.display="block",o.classList.add("v2-"+r),o.style.width="100%",o.style.height="",o.style.minHeight=""):r==="form"&&(o.style.display="block",o.style.position="static",o.style.visibility="visible",o.style.width="100%",o.classList.add("v2-reparented-form")),o.style.whiteSpace="";const i=o.closest(".select-wrapper"),s=i||o;i&&(i.classList.add("v2-select-container"),i.style.width="100%"),n.parentNode.replaceChild(s,n)}else console.warn(`[ProjectDetail] Legacy element not found: ${a}`),n.innerHTML='<span class="v2-error-text">Element missing</span>'})}function eo(){return`
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
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomOut" title="${C("v2.detail.diagram.zoomOut")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ResetView" title="${C("v2.detail.diagram.resetView")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomIn" title="${C("v2.detail.diagram.zoomIn")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <div class="v2-vr"></div>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2DownloadDiagram" title="${C("v2.detail.diagram.download")}">
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
    `}function to(e){const t=e.querySelector("#v2BackToProjects");t&&t.addEventListener("click",Ja);const n=e.querySelector("#v2PrintProjectBtn");n&&n.addEventListener("click",()=>{if(confirm('Do you want to set the project status to "Waiting for Approval"?')){cn(H,"Waiting for Approval");const b=document.getElementById("v2ProjectStatus");b&&(b.value="Waiting for Approval",Ze(b))}if(console.log("[ProjectDetail] Triggering Print/Export"),typeof window.openLegacyPrintDialog=="function"){window.openLegacyPrintDialog();return}w.cineFeaturePrint&&typeof w.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?w.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof w.triggerOverviewPrintWorkflow=="function"?w.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()});const a=e.querySelector("#v2SaveProjectBtn");a&&a.addEventListener("click",()=>{if(w.cineLegacyShim&&H){const b=document.getElementById("saveSetupBtn");b&&b.click()}});function o(){if(!H)return;const b=ln(H);let g={};w.getCurrentProjectInfo&&typeof w.getCurrentProjectInfo=="function"?g=w.getCurrentProjectInfo():g={projectName:H};const u=Object.assign({},g,{prepDays:b.prepDays||[],shootingDays:b.shootingDays||[],returnDays:b.returnDays||[],projectName:H});w.populateProjectForm&&typeof w.populateProjectForm=="function"?w.populateProjectForm(u):console.warn("[ProjectDetail] populateProjectForm not found"),$e("requirements");const d=document.getElementById("tab-requirements");d&&d.scrollIntoView({behavior:"smooth"})}const r=e.querySelector("#v2GenerateReqsGearBtn");r&&r.addEventListener("click",()=>{o()});const i=e.querySelector("#v2ExportProjectBtn");i&&i.addEventListener("click",()=>{const b=document.getElementById("shareSetupBtn");b&&b.click()});const s=e.querySelector("#v2GenerateOverviewBtn");s&&s.addEventListener("click",()=>{const b=document.getElementById("generateOverviewBtn");b&&b.click()});const l=e.querySelector("#v2GenerateRequirementsBtn");l&&(l.innerHTML='<i class="fas fa-save"></i> Save & Generate Gear List',l.addEventListener("click",()=>{let b={};w.collectProjectFormData&&typeof w.collectProjectFormData=="function"?b=w.collectProjectFormData():console.warn("[ProjectDetail] collectProjectFormData not found");let g="";if(w.generateGearListHtml&&typeof w.generateGearListHtml=="function")g=w.generateGearListHtml(b);else{alert("Error: Generator module not found.");return}if(w.getSafeGearListHtmlSections&&typeof w.getSafeGearListHtmlSections=="function"){const u=w.getSafeGearListHtmlSections(g),d=document.getElementById("v2RequirementsOutput");d&&(u.projectHtml?(d.innerHTML=u.projectHtml,d.style.display="block"):d.style.display="none");const m=document.getElementById("v2KitListContainer");m&&u.gearHtml?m.innerHTML=u.gearHtml:m&&(m.innerHTML='<p class="v2-text-muted">No gear list items generated.</p>'),alert("Requirements Saved & Gear List Generated!")}}));const c=e.querySelector("#v2GenerateGearListBtn");c&&c.addEventListener("click",()=>{o()}),e.querySelectorAll(".v2-tab-btn").forEach(b=>{b.addEventListener("click",()=>{const g=b.dataset.tab;$e(g)})});const v=e.querySelector("#v2DownloadDiagram");v&&v.addEventListener("click",b=>{const g=document.getElementById("downloadDiagram");if(g){const u=new MouseEvent("click",{bubbles:!0,cancelable:!0,shiftKey:b.shiftKey});g.dispatchEvent(u)}else console.warn("[ProjectDetail] Legacy download button not found")}),setTimeout(()=>so(e),0)}function vn(){if(!H)return;if(!w.cineFeaturesConnectionDiagram||typeof w.cineFeaturesConnectionDiagram.createConnectionDiagram!="function"){console.warn("[ProjectDetail] Connection Diagram module not found.");return}if(!document.getElementById("v2-diagram-area"))return;console.log("[ProjectDetail] Rendering Power Diagram...");const n={getSetupDiagramContainer:()=>document.getElementById("v2-diagram-area"),getDiagramLegend:()=>document.getElementById("v2-diagram-legend"),getDiagramHint:()=>document.getElementById("v2-diagram-hint"),getDownloadDiagramBtn:()=>document.getElementById("v2DownloadDiagram"),getZoomInBtn:()=>document.getElementById("v2ZoomIn"),getZoomOutBtn:()=>document.getElementById("v2ZoomOut"),getResetViewBtn:()=>document.getElementById("v2ResetView"),getDiagramDetailDialog:()=>{const a=document.getElementById("diagramDetailDialog");return a&&a.closest("#mainContent")&&document.body.appendChild(a),a},getDiagramDetailContent:()=>document.getElementById("diagramDetailDialogContent")};if(!document.getElementById("v2-diagram-css")){const a=typeof w.cineFeaturesConnectionDiagram.getDiagramCss=="function"?w.cineFeaturesConnectionDiagram.getDiagramCss(!1):"";if(a){const o=document.createElement("style");o.id="v2-diagram-css",o.textContent=a,document.head.appendChild(o)}}try{w.cineFeaturesConnectionDiagram.createConnectionDiagram(n)}catch(a){console.error("[ProjectDetail] Error rendering diagram:",a)}}function Ze(e){const n=e.value.toLowerCase().replace(/\s+/g,"-");e.classList.remove("draft","planning","waiting-for-approval","approved","shooting","completed","archived"),e.classList.add(n)}function bt(){const e={heroTotalDraw:"v2TotalDraw",heroRuntime:"v2Runtime",heroBatteryCount:"v2BatteryCount",heroCurrent144:"v2Current144",heroCurrent12:"v2Current12"};Object.keys(e).forEach(t=>{const n=document.getElementById(t),a=document.getElementById(e[t]);n&&a&&(a.textContent=n.textContent)}),rn()==="power"&&setTimeout(()=>vn(),50)}function no(){const e=document.getElementById("results");if(!e){console.warn("[ProjectDetail] Legacy results container not found. Auto-sync disabled.");return}new MutationObserver(()=>{bt()}).observe(e,{childList:!0,subtree:!0,characterData:!0}),console.log("[ProjectDetail] Power observer started")}function ao(){if(!$t){if($t=!0,no(),bt(),document.addEventListener("v2:viewchange",It),w.cineViewManager&&typeof w.cineViewManager.getCurrentView=="function"&&w.cineViewManager.getCurrentView()==="projectDetail"){const t=w.cineViewManager.getCurrentParams?w.cineViewManager.getCurrentParams():{};t&&t.projectId&&(console.log("[ProjectDetail] Already on projectDetail, triggering render"),It({detail:{view:"projectDetail",params:t}}))}console.log("[ProjectDetail] Initialized")}}function It(e){const{view:t,params:n}=e.detail||{};if(t==="projectDetail"&&n&&n.projectId){console.log("[ProjectDetail] View change detected, loading:",n.projectId);const a=document.getElementById(me);if(!a){console.warn("[ProjectDetail] View element not found:",me);return}a.querySelector(".view-header")||un(),dn(n.projectId),n.tab&&$e(n.tab),n.action==="print"&&(console.log("[ProjectDetail] Auto-triggering print workflow"),setTimeout(()=>{w.cineFeaturePrint&&typeof w.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?w.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof w.triggerOverviewPrintWorkflow=="function"?w.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()},800))}}function oo(e){return typeof e!="string"?"":e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}function io(e){const t=w.texts?w.texts[e]:null;if(!t){console.warn(`[ProjectDetail] Translation key not found: ${e}`);return}const n=oo(t);console.log(`[ProjectDetail] Triggering Add Custom for: ${t} (${n})`);const a=document.querySelector(`[data-gear-custom-add="${n}"]`);a?a.click():(console.warn(`[ProjectDetail] Legacy Add Button not found for slug: ${n}`),alert(`Could not open Add Custom dialog for ${t}. Legacy element missing.`))}function so(e){[{cardId:"v2-camera-card",key:"category_cameras"},{cardId:"v2-power-card",key:"category_batteries"}].forEach(({cardId:n,key:a})=>{const o=e.querySelector(`#${n}`);if(!o)return;const r=o.querySelector(".v2-card-header");if(!r||r.querySelector(".v2-add-custom-btn"))return;const i=document.createElement("button");i.type="button",i.className="v2-btn v2-btn-sm v2-btn-ghost v2-add-custom-btn",i.title="Add Custom Item",i.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `,i.addEventListener("click",s=>{s.stopPropagation(),io(a)}),r.appendChild(i)})}const ht={init:ao,createDetailViewContent:un,loadProject:dn,getCurrentProject:Ya,switchTab:$e,getCurrentTab:rn,syncLegacyResultsToV2:bt};typeof w<"u"&&(w.cineProjectDetail=ht);typeof window<"u"&&(window.cineProjectDetail=ht);const ro=Object.freeze(Object.defineProperty({__proto__:null,ProjectDetail:ht},Symbol.toStringTag,{value:"Module"}));(function(e){const t=`
        <nav class="v2-sidebar" aria-label="V2 Navigation">
          <div class="v2-sidebar-header">
            <img src="src/icons/Icon Bluenew.svg" alt="" class="v2-sidebar-logo" />
            <h1 class="v2-sidebar-title">Cine Power Planner</h1>
          </div>
          <div class="v2-sidebar-nav">
            <div class="v2-sidebar-section">
              <div class="v2-sidebar-section-title">Projects</div>

              <a href="#/projects" class="v2-sidebar-link active" data-view="projects">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4-5v4M8 12v8m8-8v8M3 12h18" />
                  <rect x="5" y="3" width="14" height="4" rx="1" />
                </svg>
                <span class="v2-sidebar-link-text">All Projects</span>
              </a>

              <a href="#/projects?filter=active" class="v2-sidebar-link" data-view="projects-active">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span class="v2-sidebar-link-text">Active Projects</span>
              </a>

              <a href="#/projects?filter=archive" class="v2-sidebar-link" data-view="projects-archive">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="21 8 21 21 3 21 3 8"></polyline>
                  <rect x="1" y="3" width="22" height="5"></rect>
                  <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                <span class="v2-sidebar-link-text">Archive</span>
              </a>

              <a href="#/backups" class="v2-sidebar-link" id="navAutoBackups" style="display:none;" data-view="backups">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
                <span class="v2-sidebar-link-text">Auto Backups</span>
              </a>
            </div>

            <div class="v2-sidebar-section">
              <div class="v2-sidebar-section-title">Tools</div>

              <a href="#/devices" class="v2-sidebar-link" data-view="devices">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span class="v2-sidebar-link-text">Device Library</span>
              </a>

              <a href="#/contacts" class="v2-sidebar-link" data-view="contacts">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span class="v2-sidebar-link-text">Contacts</span>
              </a>

              <a href="#/rules" class="v2-sidebar-link" data-view="rules">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                  </path>
                </svg>
                <span class="v2-sidebar-link-text">Auto Gear Rules</span>
              </a>

              <a href="#/own-gear" class="v2-sidebar-link" data-view="ownGear">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span class="v2-sidebar-link-text">Owned Gear</span>
              </a>
            </div>

            <div class="v2-sidebar-section">
              <div class="v2-sidebar-section-title">Support</div>
              <a href="#/settings" class="v2-sidebar-link" data-view="settings">
                <svg class="v2-sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3" />
                  <path
                    d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
                <span class="v2-sidebar-link-text">Settings</span>
              </a>
              <a href="#/help" class="v2-sidebar-link" data-view="help">
                <span class="v2-sidebar-link-icon icon-glyph icon-text" aria-hidden="true" data-icon-font="uicons">?</span>
                <span class="v2-sidebar-link-text">Help</span>
              </a>
            </div>
          </div>
          <div class="v2-sidebar-footer">
            <div class="v2-sidebar-legal">
              <a href="legal/impressum-en.html">Imprint</a>
              <span class="v2-legal-separator">&middot;</span>
              <a href="legal/datenschutz-en.html">Privacy Policy</a>
              <span class="v2-legal-separator">&middot;</span>
              <button type="button" id="v2ExitBtn" title="Return to Classic UI">Exit V2</button>
            </div>
          </div>
        </nav>
        <div class="v2-sidebar-overlay"></div>
    `;function n(){const r=document.getElementById("v2-app");if(!r)return!1;if(r.querySelector(".v2-sidebar"))return!0;const i=r.querySelector(".v2-main"),s=document.createElement("template");return s.innerHTML=t.trim(),i?r.insertBefore(s.content,i):r.appendChild(s.content),!0}function a(){n()||document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",()=>{n()},{once:!0})}const o={mount:a};e.cineV2SidebarView=o,typeof window<"u"&&(window.cineV2SidebarView=o)})(typeof globalThis<"u"?globalThis:window);const lo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Dt="cine_use_v2_search",co=40,Bt={cameras:"Cameras",monitors:"Monitors",video:"Video",fiz:"FIZ",batteries:"Batteries",batteryHotswaps:"Battery Hot Swap",carts:"Carts",wirelessReceivers:"Wireless",audio:"Audio",lights:"Lights",gimbals:"Gimbals",drones:"Drones",actionCameras:"Action Cameras",accessories:"Accessories",viewfinders:"Viewfinders",directorMonitors:"Director Monitors",iosVideo:"iOS Video",videoAssist:"Video Assist",media:"Media",lenses:"Lenses",filterOptions:"Filters",recordingMediaBrands:"Recording Media Brands",recordingMediaSizes:"Recording Media Sizes",gearList:"Gear List"},uo=ie&&typeof ie.normalizeSearchValue=="function"?ie:{normalizeSearchValue:e=>typeof e=="string"?e.trim().toLowerCase():""},J=e=>uo.normalizeSearchValue(e||""),Xe=e=>J(e).split(" ").map(t=>t.trim()).filter(Boolean);function vo(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2Search")){const n=e.get("v2Search")==="true";return localStorage.setItem(Dt,n.toString()),n}const t=localStorage.getItem(Dt);return t===null?!0:t==="true"}catch{return!0}}function po(){return(Array.isArray(window.featureSearchEntries)?window.featureSearchEntries:[]).map(t=>{const n=t?.optionLabel||t?.display||t?.label||"",a=t?.detail||t?.value?.detail||"",o=t?.display||n,r=t?.key||J(o),i=t?.type||t?.entryType||t?.value?.type||"feature",s=[n,a,o].filter(Boolean).join(" ");return{key:`legacy:${r}`,legacyKey:t?.key||null,type:i,label:n,display:o,detail:a,keywords:s,legacyEntry:t,legacyQuery:o||n}})}function go(e){const t=[];if(!e||typeof e!="object")return t;const n=(o,r,i)=>{if(!o)return;const s=[o,i,r].filter(Boolean).join(" ");t.push({key:`device:${J(o)}`,type:"device",label:o,display:o,detail:i?`Device · ${i}`:"Device",keywords:s,legacyQuery:o})},a=(o,r,i)=>{!r||typeof r!="object"||Object.keys(r).forEach(s=>{!s||s==="accessories"||n(s,o,i)})};return Object.entries(e).forEach(([o,r])=>{const i=Bt[o]||o;if(o==="accessories"&&r&&typeof r=="object"){Object.entries(r).forEach(([s,l])=>{const c=Bt[s]||s,f=`${i} · ${c}`;a(s,l,f)});return}a(o,r,i)}),t}function Tt(){const e=[],t=new Map,n=a=>{if(!a||!a.label)return;const o=J(a.label);if(!o)return;const r=`label:${o}`;if(t.has(r))return;const i=J(a.keywords||""),s=new Set([...Xe(a.label),...Xe(a.keywords||"")]),l={...a,normalizedLabel:o,normalizedKeywords:i,tokens:s};t.has(l.key)||e.push(l),t.set(l.key,l),a.legacyKey&&t.set(`legacyKey:${a.legacyKey}`,l),t.set(r,l)};return po().forEach(n),go(Dn).forEach(n),{entries:e,index:t}}function mo(e){const t=Array.isArray(window.featureSearchDefaultOptions)?window.featureSearchDefaultOptions:[];if(!t.length)return[];const n=[],a=new Set;return t.forEach(o=>{if(!o)return;const r=o.entryKey?`legacyKey:${o.entryKey}`:null,i=o.label||o.value||"",s=i?`label:${J(i)}`:null,l=r&&e.get(r)||s&&e.get(s);l&&!a.has(l.key)&&(n.push(l),a.add(l.key))}),n}function fo(e,t,n){if(!e||!t)return 0;if(e.normalizedLabel===t)return 1e3;if(e.normalizedLabel.startsWith(t))return 820;if(e.normalizedLabel.includes(t))return 650;let a=0;if(e.normalizedKeywords.includes(t)&&(a+=120),n.length){let o=0;n.forEach(r=>{e.tokens.has(r)&&(o+=1)}),a+=o*60}return e.type==="action"&&(a+=10),a}function bo(e,t){const n=J(t);if(!n)return[];const a=Xe(t);return e.map(o=>({entry:o,score:fo(o,n,a)})).filter(o=>o.score>0).sort((o,r)=>r.score-o.score||o.entry.label.localeCompare(r.entry.label)).slice(0,co).map(o=>o.entry)}function ho(e){if(!e)return null;const t=e.closest(".v2-search-input-wrapper")||e.parentElement;if(!t)return null;let n=document.getElementById("featureSearchDropdown");return n||(n=document.createElement("div"),n.id="featureSearchDropdown",n.className="feature-search-dropdown",n.setAttribute("role","listbox")),t.contains(n)||t.appendChild(n),n}function yo(e,t){if(!e)return;if(e.innerHTML="",!t.length){e.dataset.count="0",e.dataset.open="false",e.hidden=!0,e.setAttribute("aria-expanded","false");return}const n=document.createElement("div");n.className="feature-search-dropdown-list",t.forEach((a,o)=>{const r=document.createElement("button");r.type="button",r.className="feature-search-option";const i=`v2-feature-search-${a.key.replace(/[^a-z0-9_-]+/gi,"-")}`;r.id=i,r.setAttribute("role","option"),r.setAttribute("tabindex",o===0?"0":"-1"),r.setAttribute("data-value",a.display||a.label),r.setAttribute("data-entry-key",a.key),r.setAttribute("aria-label",a.label),r.setAttribute("aria-selected","false");const s=document.createElement("div");s.className="feature-search-option-content";const l=document.createElement("span");if(l.className="feature-search-option-label",l.textContent=a.label,s.appendChild(l),a.detail){const c=document.createElement("span");c.className="feature-search-option-value",c.textContent=a.detail,s.appendChild(c)}r.appendChild(s),n.appendChild(r)}),e.appendChild(n),e.dataset.count=String(t.length),e.dataset.activeIndex="0",e.dataset.open="true",e.hidden=!1,e.setAttribute("aria-expanded","true")}function et(e){return e?Array.from(e.querySelectorAll('[role="option"]')):[]}function de(e,t,n){const a=et(t);if(!a.length)return null;const o=Math.max(0,Math.min(n,a.length-1));return a.forEach((r,i)=>{const s=i===o;r.setAttribute("tabindex",s?"0":"-1"),r.setAttribute("aria-selected",s?"true":"false"),s&&e&&r.id&&e.setAttribute("aria-activedescendant",r.id)}),t.dataset.activeIndex=String(o),a[o]}function oe(e,t){t&&(t.dataset.open="false",t.hidden=!0,t.setAttribute("aria-expanded","false"),t.dataset.activeIndex="",e&&e.hasAttribute("aria-activedescendant")&&e.removeAttribute("aria-activedescendant"))}function At(e){!e||e.dataset.count==="0"||(e.dataset.open="true",e.hidden=!1,e.setAttribute("aria-expanded","true"))}function Mt(e){window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:e}}))}function He(e,t){if(!e)return;const n=e.legacyQuery||e.display||e.label||t||"";if(!n)return;if(typeof window.runFeatureSearch=="function"){window.runFeatureSearch(n);return}const a=document.getElementById("featureSearch");a&&(a.value=n,a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0})))}function Oe(e,t){if(!e)return null;const n=e.getAttribute("data-entry-key");if(n&&t.has(n))return t.get(n);const a=e.getAttribute("data-value")||"";return a&&t.get(`label:${J(a)}`)||null}function wo(e,t){let n=Tt(),a=[];const o=()=>{n=Tt()},r=i=>{o(),i?a=bo(n.entries,i):a=mo(n.index),yo(t,a),t.dataset.count!=="0"&&de(e,t,0)};e.addEventListener("input",i=>{i.stopPropagation();const s=i.target.value.trim();r(s),At(t),Mt(s)}),e.addEventListener("focus",()=>{r(e.value.trim()),At(t)}),e.addEventListener("blur",()=>{window.setTimeout(()=>{t.contains(document.activeElement)||oe(e,t)},120)}),e.addEventListener("keydown",i=>{i.stopPropagation();const s=et(t),l=t.dataset.activeIndex?Number(t.dataset.activeIndex):0;if(i.key==="Enter"){const c=s[l],f=Oe(c,n.index);He(f,e.value.trim()),oe(e,t);return}if(i.key==="Escape"){e.value&&(e.value="",r(""),Mt("")),oe(e,t),i.preventDefault();return}if(i.key==="ArrowDown"){if(!s.length)return;i.preventDefault();const c=l+1>=s.length?0:l+1;de(e,t,c);return}if(i.key==="ArrowUp"){if(!s.length)return;i.preventDefault();const c=l-1<0?s.length-1:l-1;de(e,t,c)}}),t.addEventListener("mousedown",i=>{i.target.closest("[data-value]")&&i.preventDefault()}),t.addEventListener("click",i=>{const s=i.target.closest("[data-value]");if(!s)return;const l=Oe(s,n.index);He(l,e.value.trim()),oe(e,t)}),t.addEventListener("keydown",i=>{const s=et(t);if(!s.length)return;const l=document.activeElement,c=s.indexOf(l);if(i.key==="ArrowDown"){i.preventDefault();const f=c>=0?c+1:0;de(e,t,f>=s.length?0:f)?.focus()}else if(i.key==="ArrowUp"){i.preventDefault();const f=c>0?c-1:s.length-1;de(e,t,f)?.focus()}else if(i.key==="Enter"){if(i.preventDefault(),c>=0&&s[c]){const f=Oe(s[c],n.index);He(f,e.value.trim()),oe(e,t)}}else i.key==="Escape"&&(i.preventDefault(),oe(e,t),e.focus())})}function Eo({inputId:e}={}){if(!vo())return!1;const t=document.getElementById(e||"v2SidebarSearchInput");if(!t)return!1;const n=ho(t);return n?(wo(t,n),!0):!1}const ee=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},jt="v2-sidebar-search",Me="v2SidebarSearchInput",pn="darkMode",gn="cameraPowerPlanner_pinkMode",ko="pinkMode",So={"All Projects":"v2.sidebar.nav.allProjects","Active Projects":"v2.sidebar.nav.activeProjects",Archive:"v2.sidebar.nav.archive","Auto Backups":"v2.sidebar.nav.autoBackups","Device Library":"v2.sidebar.nav.deviceLibrary",Contacts:"v2.sidebar.nav.contacts","Auto Gear Rules":"v2.sidebar.nav.autoGearRules","Owned Gear":"v2.sidebar.nav.ownedGear","Create New Project":"v2.sidebar.nav.createProject",Projects:"v2.sidebar.nav.projectsSection",Tools:"v2.sidebar.nav.toolsSection",Support:"v2.sidebar.nav.supportSection",Help:"v2.sidebar.nav.help",Settings:"v2.sidebar.nav.settings"};function fe(e,t={},n=null){const a=n||document.documentElement.lang||"en";let o=window.texts&&window.texts[a]?window.texts[a]:null;!o&&window.texts&&(o=window.texts.en);const r=(s,l)=>l.split(".").reduce((c,f)=>c?c[f]:null,s);let i=o?r(o,e):null;if(!i&&a!=="en"&&window.texts&&window.texts.en&&(i=r(window.texts.en,e)),!i)return e;if(typeof i=="string")for(const[s,l]of Object.entries(t))i=i.replace(`{${s}}`,l);return i}function Lo(){console.log("[V2 Sidebar] Initializing...");const e=document.querySelector(".v2-sidebar");if(!e){console.error("[V2 Sidebar] .v2-sidebar not found. Cannot inject controls.");return}Co(e),xo(e),$o(e),Eo({inputId:Me})||Po(),Vo(),To(),Ao(),Io(),Bo();const n=document.getElementById("languageSelect");n&&Ie(n.value)}function Co(e){if(e.querySelector(".v2-sidebar-header"))return;const t=document.createElement("div");t.className="v2-sidebar-header";const n=document.createElement("img");n.src="src/icons/Icon Bluenew.svg",n.className="v2-sidebar-logo",n.alt="Logo";const a=document.createElement("h1");a.className="v2-sidebar-title",a.innerHTML="Cine Power<br>Planner",t.appendChild(n),t.appendChild(a),e.insertBefore(t,e.firstChild)}function xo(e){if(e.querySelector(".v2-sidebar-controls-container"))return;const t=document.createElement("div");t.className="v2-sidebar-controls-container";const n=document.createElement("div");n.className="v2-controls-row-1",Mo(n),_o(n),jo(n),t.appendChild(n);const a=e.querySelector(".v2-sidebar-footer");a?a.insertAdjacentElement("beforebegin",t):e.appendChild(t)}function Po(){const e=document.getElementById(Me),t=document.getElementById("featureSearch");!e||!t||(e.addEventListener("input",n=>{n.stopPropagation(),t.value=n.target.value,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}),e.addEventListener("focus",()=>{t.dispatchEvent(new Event("focus",{bubbles:!0}))}),e.addEventListener("blur",()=>{setTimeout(()=>{t.dispatchEvent(new Event("blur",{bubbles:!0}))},200)}),e.addEventListener("keydown",n=>{if(n.stopPropagation(),!["ArrowUp","ArrowDown","Enter","Escape"].includes(n.key))return;const o=new KeyboardEvent("keydown",{key:n.key,code:n.code,keyCode:n.keyCode,bubbles:!0,cancelable:!0});t.dispatchEvent(o)}),e.addEventListener("input",n=>{const a=n.target.value.trim();window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:a}}))}))}function $o(e){if(e.querySelector(`.${jt}`))return;const t=document.createElement("div");t.className=jt,t.innerHTML=`
            <div class="v2-search-input-wrapper">
                <svg class="v2-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" id="${Me}" class="v2-search-input" placeholder="${fe("v2.sidebar.search.placeholder")}" aria-label="${fe("v2.sidebar.search.label")}">
            </div>
        `;const n=e.querySelector(".v2-sidebar-header");if(n)n.insertAdjacentElement("afterend",t);else{const a=e.querySelector(".v2-sidebar-nav");a?e.insertBefore(t,a):e.insertBefore(t,e.firstChild)}setTimeout(()=>{const a=document.getElementById("featureSearchDropdown"),o=t.querySelector(".v2-search-input-wrapper");a&&o&&(o.appendChild(a),a.style.top="110%",a.style.left="0",a.style.visibility="visible",a.style.display="none")},1e3)}function Io(){document.addEventListener("click",e=>{e.target.closest("#closeHelp")&&(e.preventDefault(),e.stopImmediatePropagation(),Do())})}function Do(){const e=document.getElementById("helpDialog");e&&(e.setAttribute("hidden",""),e.style.display="none",typeof ee.closeDialog=="function"&&ee.closeDialog(e))}function Bo(){const e=document.getElementById("helpButton"),t=document.querySelector('[data-nav-key="openHelpNav"]'),n=a=>{a.preventDefault(),a.stopImmediatePropagation(),window.location.hash="/help"};e&&e.addEventListener("click",n),t&&t.addEventListener("click",n),document.addEventListener("keydown",a=>{a.target.matches("input, textarea, [contenteditable]")||((a.key==="?"&&a.shiftKey||a.key==="H"||a.key==="h"||a.key==="F1")&&n(a),a.key==="/"&&(a.ctrlKey||a.metaKey)&&n(a))},!0)}function To(){const e=document.getElementById("navAutoBackups");if(e){const a=localStorage.getItem("cineAutoRecover")==="true";e.style.display=a?"flex":"none"}const t=document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(o=>o.classList.remove("active")),a.classList.add("active")})});const n=window.location.hash;n&&t.forEach(a=>{a.getAttribute("href")===n&&a.classList.add("active")})}function Ao(){const e=document.querySelectorAll(".v2-mobile-menu-toggle"),t=document.getElementById("v2-app"),n=document.querySelector(".v2-sidebar-overlay");if(!t)return;function a(){t.classList.add("sidebar-open")}function o(){t.classList.remove("sidebar-open")}e.forEach(s=>{s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),a()})}),n&&n.addEventListener("click",o),document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link").forEach(s=>{s.addEventListener("click",()=>{window.innerWidth<=768&&o()})});const i=document.getElementById("v2ExitBtn");i&&i.addEventListener("click",o)}function Mo(e){if(!e||e.querySelector(".v2-lang-select-wrapper"))return;const t=document.getElementById("languageSelect"),n=t?t.value:"en",a=document.createElement("div");a.className="v2-lang-select-wrapper",a.innerHTML=`
            <select class="v2-lang-select" aria-label="Select Language">
                <option value="en" ${n==="en"?"selected":""}>English</option>
                <option value="de" ${n==="de"?"selected":""}>Deutsch</option>
                <option value="es" ${n==="es"?"selected":""}>Español</option>
                <option value="fr" ${n==="fr"?"selected":""}>Français</option>
                <option value="it" ${n==="it"?"selected":""}>Italiano</option>
            </select>
        `;const o=a.querySelector("select");o.addEventListener("change",r=>{const i=r.target.value;t&&(t.value=i,t.dispatchEvent(new Event("change",{bubbles:!0})),typeof ee.updateLanguage=="function"&&ee.updateLanguage(i),Ie(i))}),t&&t.addEventListener("change",()=>{o.value!==t.value&&(o.value=t.value,Ie(t.value))}),e.appendChild(a)}function jo(e){if(e.querySelector("#v2RefreshBtn"))return;const t=document.createElement("button");t.className="v2-tool-btn",t.id="v2RefreshBtn",t.title="Force reload",t.setAttribute("aria-label","Force reload"),t.innerHTML=`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="23 4 23 10 17 10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `,t.addEventListener("click",()=>{const n=document.getElementById("reloadButton");n?n.click():window.location.reload(!0)}),e.appendChild(t)}function Ie(e){document.querySelectorAll(".v2-sidebar-link-text, .v2-sidebar-section-title").forEach(a=>{a.dataset.key||(a.dataset.key=a.textContent.trim());const o=a.dataset.key,r=So[o];r&&(a.textContent=fe(r,{},e))});const n=document.getElementById(Me);n&&(n.placeholder=fe("v2.sidebar.search.placeholder",{},e),n.setAttribute("aria-label",fe("v2.sidebar.search.label",{},e)))}ee.updateSidebarTranslations=Ie;function Vo(){Ro()}function _o(e){if(e.querySelector("#v2ThemeToggleDark"))return;const t=document.createElement("button");t.className="v2-theme-toggle",t.id="v2ThemeToggleDark",t.setAttribute("aria-label","Toggle dark mode"),t.setAttribute("aria-pressed","false"),t.setAttribute("title","Toggle dark mode"),t.innerHTML=`
            <span class="v2-icon-moon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xEC7E;</span>
            <span class="v2-icon-sun icon-glyph" aria-hidden="true" data-icon-font="uicons" style="display:none">&#xF1FE;</span>
        `,t.addEventListener("click",Ho);const n=document.createElement("button");n.className="v2-theme-toggle",n.id="v2ThemeTogglePink",n.setAttribute("aria-label","Toggle pink mode"),n.setAttribute("aria-pressed","false"),n.setAttribute("title","Toggle pink mode"),n.setAttribute("data-theme","pink"),n.innerHTML=`
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
        `,n.addEventListener("click",Oo),e.appendChild(t),e.appendChild(n)}function Ro(){const e=localStorage.getItem(pn)==="true";mn(e);const t=localStorage.getItem(gn)==="true";fn(t)}function Ho(){const t=!document.body.classList.contains("dark-mode");mn(t),localStorage.setItem(pn,t)}function mn(e){document.body.classList.toggle("dark-mode",e),document.body.classList.toggle("light-mode",!e);const t=document.getElementById("v2ThemeToggleDark");if(t){t.classList.toggle("active",e);const n=t.querySelector(".v2-icon-moon"),a=t.querySelector(".v2-icon-sun");n&&a&&(n.style.display=e?"none":"block",a.style.display=e?"block":"none")}}function Oo(){const t=!document.body.classList.contains("pink-mode");fn(t),localStorage.setItem(gn,t),localStorage.setItem(ko,t)}function fn(e){document.body.classList.toggle("pink-mode",e),qo(e);const t=document.getElementById("v2ThemeTogglePink");t&&t.classList.toggle("active",e)}function qo(e){const t=document.querySelector(".v2-sidebar-logo");t&&(t.src=e?"src/icons/Icon Pinknew.svg":"src/icons/Icon Bluenew.svg")}const yt={init:Lo};typeof ee<"u"&&(ee.cineV2Sidebar=yt);typeof window<"u"&&(window.cineV2Sidebar=yt);const No=Object.freeze(Object.defineProperty({__proto__:null,V2Sidebar:yt},Symbol.toStringTag,{value:"Module"}));class Fo{constructor(t){this.viewId=t,this.container=null,this.isInitialized=!1}init(){if(this.isInitialized)return;if(console.log(`[View: ${this.viewId}] Initializing...`),this.container=document.getElementById(this.viewId),!this.container){const n=document.querySelector(".v2-app")||document.body;this.container=document.createElement("div"),this.container.id=this.viewId,this.container.className="app-view",n.appendChild(this.container)}const t=this.viewId.replace(/^view-/,"");window.cineViewManager&&window.cineViewManager.registerView(t,{onEnter:n=>this.render(n),onLeave:()=>this.onLeave&&this.onLeave()}),this.isInitialized=!0}render(t){console.warn(`[View: ${this.viewId}] Render method not implemented`)}onLeave(){}escapeHtml(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}}class bn extends Fo{constructor(){super("rules"),this.devicesLocal={}}async render(){if(!window.getAutoGearRules){this.container.innerHTML=`
                <div class="v2-loading-state">
                    <div class="v2-spinner"></div>
                    <p class="v2-text-muted">Loading Auto Gear Core...</p>
                </div>
            `,setTimeout(()=>this.render(),500);return}const t=window.getAutoGearRules()||[],n=t.length,a=`
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
        `;n===0?this.container.innerHTML=a+`
                <div class="v2-empty-state">
                    <div class="v2-empty-icon">rule</div>
                    <h3>No Rules Defined</h3>
                    <p>Create rules to automatically add gear (like specific monitors for a director) based on the scenario.</p>
                    <button class="v2-btn v2-btn-primary" id="v2-ag-add-empty">Create First Rule</button>
                </div>
            `:this.container.innerHTML=a+`
                <div class="v2-rules-grid">
                    ${t.map((o,r)=>this.renderRuleCard(o,r)).join("")}
                </div>
            `,this.attachListeners()}renderRuleCard(t,n){const a=(t.addItems||[]).length,o=this.countConditions(t);return`
            <div class="v2-card v2-rule-card" data-index="${n}">
                <div class="v2-card-header">
                    <div class="v2-rule-title-group">
                        <div class="v2-rule-status ${t.enabled?"active":"inactive"}"></div>
                        <h3 class="v2-card-title">${this.escapeHtml(t.name||"Unnamed Rule")}</h3>
                    </div>
                     <div class="v2-card-actions">
                        <button class="v2-btn-icon" data-action="edit" data-index="${n}" title="Edit">edit</button>
                        <button class="v2-btn-icon v2-danger-hover" data-action="delete" data-index="${n}" title="Delete">delete</button>
                    </div>
                </div>
                <div class="v2-card-body">
                    <div class="v2-rule-meta">
                        <span class="v2-tag">${t.scenarioMode||"All Scenarios"}</span>
                        <span class="v2-tag v2-tag-outline">${o} Conditions</span>
                        <span class="v2-tag v2-tag-outline">${a} Actions</span>
                    </div>
                    ${t.always?'<div class="v2-badge v2-badge-accent">Always Active</div>':""}
                </div>
            </div>
        `}countConditions(t){let n=0;return t.scenarios&&t.scenarios.length&&(n+=t.scenarios.length),t.cameras&&t.cameras.length&&n++,t.cameraHandles&&t.cameraHandles.length&&n++,t.monitors&&t.monitors.length&&n++,n}attachListeners(){const t=this.container.querySelector("#v2-ag-import");t&&t.addEventListener("click",()=>this.handleImport());const n=this.container.querySelector("#v2-ag-export");n&&n.addEventListener("click",()=>this.handleExport()),this.container.querySelectorAll("#v2-ag-add, #v2-ag-add-empty").forEach(o=>o.addEventListener("click",()=>this.showEditRuleModal({},!0))),this.container.querySelectorAll('[data-action="edit"]').forEach(o=>{o.addEventListener("click",r=>{const i=parseInt(r.currentTarget.dataset.index,10),s=window.getAutoGearRules();s&&s[i]&&this.showEditRuleModal(s[i],!1,i)})}),this.container.querySelectorAll('[data-action="delete"]').forEach(o=>{o.addEventListener("click",r=>{const i=parseInt(r.currentTarget.dataset.index,10);this.deleteRule(i)})})}collectData(){const t=window.devices||{};return{cameras:Object.keys(t.cameras||{}).sort(),monitors:Object.keys(t.monitors||{}).sort(),video:Object.keys(t.video||{}).sort(),cameraHandles:this.getHardcodedOptions("cameraHandle"),scenarios:window.SCENARIOS||["Studio","Location","Handheld","Gimbal","Steadicam","Crane","Drone","Underwater","Car Mount"],viewfinders:Object.keys(t.viewfinders||{}).sort(),matteboxes:Object.keys(t.matteboxes||{}).sort(),tripodHeads:Object.keys(t.tripodHeads||{}).sort(),tripodBowls:["75mm","100mm","150mm","Flat","Mitchell"],wireless:Object.keys(t.wireless||{}).sort()}}getHardcodedOptions(t){return t==="cameraHandle"?["Blue Shape Top Handle","ARRI CCH-4","ARRI HEB-3","Wooden Camera Master Top Handle"]:t==="deliveryResolution"?["1080p","2K","4K UHD","4K DCI","6K","8K"]:[]}showEditRuleModal(t,n,a=-1){const o=this.collectData(),r=JSON.parse(JSON.stringify(t));r.scenarios||(r.scenarios=[]),r.addItems||(r.addItems=[]);const i=r.scenarios||[],s=document.createElement("div");s.className="v2-modal-backdrop",s.innerHTML=`
            <div class="v2-modal v2-modal-lg">
                <div class="v2-modal-header">
                    <h2>${n?"New Rule":"Edit Rule"}</h2>
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
                                ${o.scenarios.map(d=>`
                                    <label class="v2-checkbox-label">
                                        <input type="checkbox" class="scenario-check" value="${d}" ${i.includes(d)?"checked":""}>
                                        ${d}
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
                        ${this.renderMultiSelect("Cameras","cameras",o.cameras,r.cameras)}
                        ${this.renderMultiSelect("Matteboxes","matteboxes",o.matteboxes,r.matteboxes)}
                        ${this.renderMultiSelect("Camera Handles","cameraHandles",o.cameraHandles,r.cameraHandles)}
                        ${this.renderMultiSelect("Viewfinders","viewfinders",o.viewfinders,r.viewfinders)}
                         <div class="v2-form-group">
                            <label>Delivery Resolution</label>
                            <select class="v2-select" id="rule-delivery-res">
                                <option value="">(Any)</option>
                                ${this.getHardcodedOptions("deliveryResolution").map(d=>`<option value="${d}" ${r.deliveryResolution===d?"selected":""}>${d}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-monitoring" style="display:none;">
                         ${this.renderMultiSelect("Monitors","monitors",o.monitors,r.monitors)}
                         ${this.renderMultiSelect("Video Distribution","videoDist",o.video,r.videoDistribution)}
                         ${this.renderMultiSelect("Wireless Video","wireless",o.wireless,r.wireless)}
                    </div>

                    <div class="v2-tab-content" id="tab-support" style="display:none;">
                        ${this.renderMultiSelect("Tripod Heads","tripodHeads",o.tripodHeads,r.tripodHeads)}
                        ${this.renderMultiSelect("Tripod Bowls","tripodBowls",o.tripodBowls,r.tripodBowls)}
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
        `,document.body.appendChild(s);const l=()=>{s.remove()};s.querySelector(".v2-modal-close").onclick=l,s.querySelector("#v2-modal-cancel").onclick=l;const c=s.querySelectorAll(".v2-nav-item"),f=s.querySelectorAll(".v2-tab-content");c.forEach(d=>{d.onclick=()=>{c.forEach(p=>p.classList.remove("active")),f.forEach(p=>{p.style.display="none",p.classList.remove("active")}),d.classList.add("active");const m=s.querySelector(`#tab-${d.dataset.tab}`);m&&(m.style.display="block",setTimeout(()=>m.classList.add("active"),10))}});const v=s.querySelector("#rule-action-list"),b=s.querySelector("#btn-add-action-item"),g=s.querySelector("#new-item-name"),u=s.querySelector("#new-item-qty");b.onclick=()=>{const d=g.value.trim(),m=parseInt(u.value,10);d&&(r.addItems.push({name:d,qty:m}),v.innerHTML=this.renderActionListItems(r.addItems),g.value="",this.bindRemoveActionEvents(v,r))},this.bindRemoveActionEvents(v,r),s.querySelector("#v2-modal-save").onclick=()=>{const d={...r,name:s.querySelector("#rule-name").value.trim(),enabled:s.querySelector("#rule-enabled").checked,always:s.querySelector("#rule-always").checked,scenarioMode:s.querySelector("#rule-scenario-mode").value,scenarios:Array.from(s.querySelectorAll(".scenario-check:checked")).map(m=>m.value),shootingDaysCondition:s.querySelector("#rule-days-cond").value,shootingDaysValue:parseInt(s.querySelector("#rule-days-val").value,10)||0,cameras:this.collectMultiSelect(s,"cameras"),matteboxes:this.collectMultiSelect(s,"matteboxes"),cameraHandles:this.collectMultiSelect(s,"cameraHandles"),viewfinders:this.collectMultiSelect(s,"viewfinders"),monitors:this.collectMultiSelect(s,"monitors"),videoDistribution:this.collectMultiSelect(s,"videoDist"),wireless:this.collectMultiSelect(s,"wireless"),tripodHeads:this.collectMultiSelect(s,"tripodHeads"),tripodBowls:this.collectMultiSelect(s,"tripodBowls"),deliveryResolution:s.querySelector("#rule-delivery-res").value,crewPresent:s.querySelector("#rule-crew-present").value.split(",").map(m=>m.trim()).filter(m=>m),crewAbsent:s.querySelector("#rule-crew-absent").value.split(",").map(m=>m.trim()).filter(m=>m)};if(!d.name){alert("Rule name is required");return}this.saveRule(d,n,a),l()}}renderMultiSelect(t,n,a,o=[]){if(!a||a.length===0)return"";const r=o||[];return`
            <div class="v2-form-group">
                <label>${t}</label>
                <div class="v2-multi-select-container">
                    ${a.map(i=>`
                         <label class="v2-checkbox-label">
                            <input type="checkbox" class="multi-${n}" value="${this.escapeHtml(i)}" ${r.includes(i)?"checked":""}>
                            <span>${this.escapeHtml(i)}</span>
                        </label>
                    `).join("")}
                </div>
            </div>
        `}collectMultiSelect(t,n){return Array.from(t.querySelectorAll(`.multi-${n}:checked`)).map(a=>a.value)}renderActionListItems(t){return!t||!t.length?'<p class="v2-text-muted">No items added yet.</p>':t.map((n,a)=>`
            <div class="v2-action-item">
                <span class="v2-badge v2-badge-outline item-qty">${n.qty}x</span>
                <span class="item-name">${this.escapeHtml(n.name)}</span>
                <button class="v2-btn-icon-sm v2-danger-hover remove-action-item" data-idx="${a}">&times;</button>
            </div>
        `).join("")}bindRemoveActionEvents(t,n){t.querySelectorAll(".remove-action-item").forEach(a=>{a.onclick=o=>{const r=parseInt(o.target.dataset.idx,10);n.addItems.splice(r,1),t.innerHTML=this.renderActionListItems(n.addItems),this.bindRemoveActionEvents(t,n)}})}saveRule(t,n,a){const o=window.getAutoGearRules()||[];n?o.push(t):o[a]=t,window.setAutoGearRules?(window.setAutoGearRules(o),window.requestAutoSave&&window.requestAutoSave(),this.render()):console.error("Core function setAutoGearRules not available")}deleteRule(t){if(!confirm("Are you sure you want to delete this rule?"))return;const n=window.getAutoGearRules()||[];n.splice(t,1),window.setAutoGearRules(n),window.requestAutoSave&&window.requestAutoSave(),this.render()}}typeof window<"u"&&(window.cineRulesView=new bn);const Go=Object.freeze(Object.defineProperty({__proto__:null,RulesView:bn},Symbol.toStringTag,{value:"Module"}));(function(e){const t="v2-device-library-content",n="device-manager";let a=!1,o=!1,r=null;function i(p){if(typeof window<"u"&&window.texts){const h=document.getElementById("languageSelect"),k=h&&h.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",x=window.texts[k]||window.texts.en;if(x)return p.split(".").reduce((S,T)=>S?S[T]:null,x)||p}return p}function s(){const p=document.createElement("header");return p.className="view-header",p.innerHTML=`
            <div class="header-content">
                <h1>${i("deviceLibraryTitle")||"Device Library"}</h1>
                <p class="header-subtitle">${i("deviceLibrarySubtitle")||"Database Management"} / ${i("v2ui.revision")||"REV.01"}</p>
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
        `,p}function l(){if(o)return;console.log("[DeviceLibraryView] Reparenting legacy content...");const p=document.getElementById(t),h=document.getElementById(n);if(!p){console.error(`[DeviceLibraryView] V2 Container #${t} not found.`);return}if(!h){console.error(`[DeviceLibraryView] Legacy Container #${n} not found.`);return}r=h.classList.contains("hidden");const k=document.createElement("div");k.id="device-manager-placeholder",k.style.display="none",h.parentNode.insertBefore(k,h),p.innerHTML="",p.appendChild(s()),p.appendChild(h),h.classList.remove("hidden"),Array.from(h.children).forEach(S=>{if(S.classList.contains("device-library-search")){const T=S.querySelector("input");if(T){T.classList.add("v2-input");const D=i("searchPlaceholder");T.placeholder=D&&D!=="searchPlaceholder"?D:"Search database..."}}else S.classList.contains("button-group")||S.id==="deviceManagerHeading"&&(S.style.display="none")}),c(h),b(),o=!0,console.log("[DeviceLibraryView] Reparenting complete (Hierarchy Preserved).")}function c(p){p.querySelectorAll('input[type="text"], input[type="number"], input[type="search"]').forEach(D=>D.classList.add("v2-input")),p.querySelectorAll("select").forEach(D=>D.classList.add("v2-select")),p.querySelectorAll("button").forEach(D=>{D.classList.contains("v2-btn")||(D.classList.add("v2-btn"),(D.textContent.toLowerCase().includes("add")||D.textContent.toLowerCase().includes("save"))&&D.classList.add("v2-btn-primary"))}),p.querySelectorAll(".form-row").forEach(D=>D.classList.add("v2-form-row")),p.querySelectorAll("label").forEach(D=>D.classList.add("v2-label"))}function f(){const p=document.getElementById("exportDataBtn");p&&p.click()}function v(){const p=document.getElementById("importDataBtn");p&&p.click()}function b(){const p=document.getElementById("v2-export-db-btn"),h=document.getElementById("v2-import-db-btn");p&&(p.removeEventListener("click",f),p.addEventListener("click",f)),h&&(h.removeEventListener("click",v),h.addEventListener("click",v))}function g(){if(!o)return;const p=document.getElementById(t),h=document.getElementById(n),k=document.getElementById("device-manager-placeholder");if(h){const x=h.querySelector(".device-list-panel .panel-content"),S=h.querySelector(".device-form-panel .panel-content");if(x)for(;x.firstChild;)h.appendChild(x.firstChild);if(S)for(;S.firstChild;)h.appendChild(S.firstChild);h.querySelectorAll(".v2-panel").forEach(D=>D.remove()),h.classList.remove("device-library-layout"),r===!0?h.classList.add("hidden"):r===!1&&h.classList.remove("hidden"),k&&k.parentNode?(k.parentNode.insertBefore(h,k),k.remove()):document.body.appendChild(h)}p&&(p.innerHTML=""),o=!1,console.log("[DeviceLibraryView] Restored legacy content.")}function u(){l()}function d(){a||(console.log("[DeviceLibraryView] Initializing..."),document.addEventListener("v2:viewchange",p=>{p.detail&&p.detail.view==="devices"&&u()}),document.addEventListener("v2:languagechange",()=>{o&&(o=!1,u())}),a=!0,console.log("[DeviceLibraryView] Initialized"))}const m={init:d,render:u,restoreLegacyContent:g};e.cineV2DeviceLibrary=m})(typeof window<"u"?window:void 0);const zo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const t="view-contacts";let n=!1;function a(i){return typeof i!="string"?"":i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function o(i){if(typeof window<"u"&&window.texts){const s=document.getElementById("languageSelect"),l=s&&s.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",c=window.texts[l]||window.texts.en;if(c)return c[i]||i}return i}const r={container:null,init(){try{this.container=document.getElementById(t),this.container||this.createViewContainer(),n||(console.log("[ContactsView] Initializing..."),document.addEventListener("v2:viewchange",i=>{i.detail&&i.detail.view==="contacts"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),n=!0,console.log("[ContactsView] Initialized"))}catch(i){console.error("[ContactsView] Init failed:",i)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const i=document.querySelector(".v2-app")||document.body,s=document.createElement("div");s.id=t,s.className="app-view",i.appendChild(s),this.container=s},render(){try{if(!this.container&&(this.init(),!this.container))return;const i=e.cineFeaturesContacts;if(!i){this.container.innerHTML=`
                        <div class="view-empty-state">
                            <p>${o("statusUnavailable")||"Contacts module not loaded."}</p>
                        </div>
                    `;return}const s=i.loadStoredContacts(),l=`
                    <header class="view-header swiss-header">
                        <div class="header-content">
                            <h1 class="swiss-title">${o("contactsViewTitle")}</h1>
                            <div class="swiss-subtitle">
                                <span class="count-badge">${s?s.length:0}</span>
                                ${o("contactsViewSubtitle")||"Production Directory"}
                            </div>
                        </div>
                        <div class="view-header-actions">
                            <button class="swiss-btn swiss-btn-primary" id="btn-add-contact">
                                <span class="icon">add</span>
                                <span>${o("buttonAddContact")}</span>
                            </button>
                        </div>
                    </header>
                `;let c='<div class="view-content swiss-content">';!s||s.length===0?c+=`
                        <div class="view-empty-state swiss-empty-state">
                             <div class="swiss-empty-icon">
                                <span class="icon">group_off</span>
                            </div>
                            <h2>${o("contactsEmptyTitle")}</h2>
                            <p>${o("contactsEmptyText")}</p>
                            <button class="swiss-btn swiss-btn-primary" id="btn-add-contact-empty">
                                ${o("buttonAddFirstContact")}
                            </button>
                        </div>
                    `:(c+='<div class="swiss-grid">',s.forEach(f=>{c+=this.renderContactCard(f)}),c+="</div>"),c+="</div>",this.container.innerHTML=l+c,this.attachListeners()}catch(i){console.error("[ContactsView] Render failed",i),this.container&&(this.container.innerHTML=`<div class="swiss-error-state"><p>Error loading view: ${i.message}</p></div>`)}},renderContactCard(i){const s=i.name?i.name.split(" ").map(g=>g[0]).join("").substring(0,2).toUpperCase():"?",l=i.avatar?`<img src="${i.avatar}" alt="${a(i.name)}" class="avatar-img">`:`<span class="avatar-initials">${s}</span>`,c=i.phone?`<a href="tel:${a(i.phone)}" class="swiss-link" onclick="event.stopPropagation()">${a(i.phone)}</a>`:'<span class="swiss-placeholder">—</span>',f=i.email?`<a href="mailto:${a(i.email)}" class="swiss-link" onclick="event.stopPropagation()">${a(i.email)}</a>`:'<span class="swiss-placeholder">—</span>';let v=i.website||"";v.includes("://")&&(v=v.split("://")[1]),v.endsWith("/")&&(v=v.slice(0,-1));const b=i.website?`<a href="${a(i.website)}" target="_blank" rel="noopener noreferrer" class="swiss-link" onclick="event.stopPropagation()">${a(v)}</a>`:"";return`
                <div class="swiss-card contact-card" data-contact-id="${a(i.id)}" tabindex="0" role="button">
                    <div class="swiss-card-main">
                        <div class="swiss-card-identity">
                            <div class="swiss-avatar">
                                ${l}
                            </div>
                            <div class="swiss-identity-text">
                                <h3 class="swiss-name">${a(i.name||o("contactUnnamed"))}</h3>
                                <div class="swiss-role">${a(i.role||o("contactNoRole"))}</div>
                            </div>
                        </div>
                        <div class="swiss-card-actions-overlay">
                             <button class="swiss-icon-btn btn-edit-contact" title="${o("buttonEdit")}">
                                <span class="icon">edit</span>
                            </button>
                             <button class="swiss-icon-btn btn-delete-contact" title="${o("buttonDelete")}">
                                <span class="icon">delete</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="swiss-card-data-grid">
                        <div class="data-cell">
                            <span class="data-label">Phone</span>
                            <span class="data-value">${c}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">Email</span>
                            <span class="data-value">${f}</span>
                        </div>
                        ${i.website?`
                        <div class="data-cell full-width">
                            <span class="data-label">Web</span>
                            <span class="data-value">${b}</span>
                        </div>
                        `:""}
                        ${i.notes?`
                        <div class="data-cell full-width notes-cell">
                            <span class="data-label">Notes</span>
                            <span class="data-value notes-text">${a(i.notes)}</span>
                        </div>
                        `:""}
                    </div>
                </div>
            `},attachListeners(){const i=this.container.querySelector("#btn-add-contact"),s=this.container.querySelector("#btn-add-contact-empty");i&&(i.onclick=()=>this.showEditModal(null)),s&&(s.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".contact-card").forEach(l=>{l.onclick=c=>{c.target.closest("button")||c.target.closest("a")||this.showEditModal(l.dataset.contactId)}}),this.container.querySelectorAll(".btn-edit-contact").forEach(l=>{l.onclick=c=>{c.stopPropagation();const f=c.target.closest(".contact-card");this.showEditModal(f.dataset.contactId)}}),this.container.querySelectorAll(".btn-delete-contact").forEach(l=>{l.onclick=c=>{c.stopPropagation();const f=c.target.closest(".contact-card");this.showDeleteConfirmation(f.dataset.contactId)}})},showDeleteConfirmation(i){const s=document.createElement("div");s.className="v2-modal-backdrop",s.innerHTML=`
                <div class="v2-modal" style="max-width: 400px;">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${o("modalTitleDeleteContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body" style="padding: 24px;">
                        <p>${o("confirmDeleteContact")}</p>
                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-delete">${o("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-confirm-delete" style="background-color: var(--danger-color, #ef4444); border-color: var(--danger-color, #ef4444);">${o("buttonDeleteRed")}</button>
                    </div>
                </div>
            `,document.body.appendChild(s),requestAnimationFrame(()=>s.classList.add("open"));const l=()=>{s.classList.remove("open"),setTimeout(()=>s.remove(),200)};s.querySelector(".v2-modal-close").onclick=l,s.querySelector("#btn-cancel-delete").onclick=l,s.querySelector("#btn-confirm-delete").onclick=()=>{this.deleteContact(i),l()}},deleteContact(i){const s=e.cineFeaturesContacts;if(!s)return;const c=s.loadStoredContacts().filter(f=>f.id!==i);s.saveContactsToStorage(c)?this.render():alert("Failed to delete contact.")},showEditModal(i){const s=e.cineFeaturesContacts;if(!s)return;let l={},c=!0;if(i){const k=s.loadStoredContacts().find(x=>x.id===i);k&&(l={...k},c=!1)}c&&(l={name:"",role:"",phone:"",email:"",website:"",notes:"",avatar:""});const f=document.querySelector(".v2-modal-backdrop");f&&f.remove();const v=document.createElement("div");v.className="v2-modal-backdrop";const b=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Line Producer","Production Manager","Rental House","Post House","Agency","Client"];v.innerHTML=`
                <div class="v2-modal contact-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${o(c?"modalTitleNewContact":"modalTitleEditContact")}</h3>
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
                                    ${o("buttonUploadPhoto")}
                                    <input type="file" id="avatarUploadInput" accept="image/*" hidden>
                                </label>
                                <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost text-danger" id="removeAvatarBtn" ${l.avatar?"":"disabled"}>
                                    ${o("buttonRemovePhoto")}
                                </button>
                            </div>
                            <div class="avatar-hint">${o("avatarHint")||"Drag & drop or click to upload"}</div>
                        </div>

                        <!-- Basic Info Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">badge</span>
                                ${o("sectionBasicInfo")||"Basic Information"}
                            </div>
                            
                            <div class="v2-form-group">
                                <label class="v2-label">${o("labelName")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">person</span></span>
                                    <input type="text" id="contactName" class="v2-input" value="${a(l.name)}" placeholder="${o("placeholderFullName")}" required>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${o("labelRole")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">work</span></span>
                                    <input type="text" id="contactRole" class="v2-input" value="${a(l.role)}" list="roleList" placeholder="${o("placeholderRole")}">
                                </div>
                                <datalist id="roleList">
                                    ${b.map(h=>`<option value="${h}">`).join("")}
                                </datalist>
                            </div>
                        </div>

                        <!-- Contact Details Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">contacts</span>
                                ${o("sectionContactDetails")||"Contact Details"}
                            </div>

                            <div class="detail-row-group">
                                <div class="v2-form-group">
                                    <label class="v2-label">${o("labelPhone")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">call</span></span>
                                        <input type="tel" id="contactPhone" class="v2-input" value="${a(l.phone)}" placeholder="${o("placeholderPhone")}">
                                    </div>
                                </div>
                                
                                <div class="v2-form-group">
                                    <label class="v2-label">${o("labelEmail")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">mail</span></span>
                                        <input type="email" id="contactEmail" class="v2-input" value="${a(l.email)}" placeholder="${o("placeholderEmail")}">
                                    </div>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${o("labelWebsite")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">language</span></span>
                                    <input type="url" id="contactWebsite" class="v2-input" value="${a(l.website)}" placeholder="${o("placeholderWebsite")}">
                                </div>
                            </div>
                        </div>

                        <!-- Notes Section -->
                        <div class="v2-form-group">
                            <label class="v2-label">${o("labelNotes")}</label>
                            <textarea id="contactNotes" class="v2-input" rows="3" placeholder="${o("placeholderNotes")}">${a(l.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-contact">${o("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-contact">
                            <span class="icon" style="font-size:16px; margin-right:4px;">save</span>
                            ${o("buttonSaveContact")}
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(v),requestAnimationFrame(()=>v.classList.add("open"));const g=()=>{v.classList.remove("open"),setTimeout(()=>v.remove(),200)};v.querySelector(".v2-modal-close").onclick=g,v.querySelector("#btn-cancel-contact").onclick=g;const u=v.querySelector("#avatarUploadInput"),d=v.querySelector("#modalAvatarPreview"),m=v.querySelector("#removeAvatarBtn");let p=l.avatar||"";u.onchange=h=>{const k=h.target.files[0];if(k)if(e.CINE_CONTACTS_PROFILE_MODULE)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(k,x=>{p=x,d.innerHTML=`<img src="${x}">`,m.disabled=!1},x=>{alert("Error reading image: "+x)});else{const x=new FileReader;x.onload=S=>{p=S.target.result,d.innerHTML=`<img src="${p}">`,m.disabled=!1},x.readAsDataURL(k)}},m.onclick=()=>{p="",d.innerHTML='<span class="icon">person</span>',m.disabled=!0,u.value=""},v.querySelector("#btn-save-contact").onclick=()=>{const h=v.querySelector("#contactName").value.trim();if(!h){alert(o("alertEnterName"));return}const k={id:i||void 0,name:h,role:v.querySelector("#contactRole").value.trim(),phone:v.querySelector("#contactPhone").value.trim(),email:v.querySelector("#contactEmail").value.trim(),website:v.querySelector("#contactWebsite").value.trim(),notes:v.querySelector("#contactNotes").value.trim(),avatar:p},x=s.loadStoredContacts();let S;if(c){const T=s.normalizeContactEntry(k);S=[...x,T]}else S=x.map(T=>T.id===i?s.normalizeContactEntry({...T,...k}):T);S=s.sortContacts(S),s.saveContactsToStorage(S)?(this.render(),g()):alert("Failed to save contact.")}}};e.cineContactsView=r})(typeof window<"u"?window:void 0);const Uo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(){const e="view-settings";let t=!1;function n(r){if(typeof window<"u"&&window.texts){const i=document.getElementById("languageSelect"),s=i&&i.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",l=window.texts[s]||window.texts.en;if(l)return r.split(".").reduce((c,f)=>c?c[f]:null,l)||r}return r}const a=[{v2:"v2-settings-language",legacy:"settingsLanguage",type:"value"},{v2:"v2-settings-temp-unit",legacy:"settingsTemperatureUnit",type:"value"},{v2:"v2-settings-focus-scale",legacy:"settingsFocusScale",type:"value"},{v2:"v2-settings-dark-mode",legacy:"settingsDarkMode",type:"checkbox"},{v2:"v2-settings-pink-mode",legacy:"settingsPinkMode",type:"checkbox"},{v2:"v2-settings-accent-color",legacy:"accentColorInput",type:"color"},{v2:"v2-settings-font-size",legacy:"settingsFontSize",type:"value"},{v2:"v2-settings-font-family",legacy:"settingsFontFamily",type:"value"},{v2:"v2-cam-color-a",legacy:"cameraColorA",type:"color"},{v2:"v2-cam-color-b",legacy:"cameraColorB",type:"color"},{v2:"v2-cam-color-c",legacy:"cameraColorC",type:"color"},{v2:"v2-cam-color-d",legacy:"cameraColorD",type:"color"},{v2:"v2-cam-color-e",legacy:"cameraColorE",type:"color"},{v2:"v2-settings-high-contrast",legacy:"settingsHighContrast",type:"checkbox"},{v2:"v2-settings-reduce-motion",legacy:"settingsReduceMotion",type:"checkbox"},{v2:"v2-settings-relaxed-spacing",legacy:"settingsRelaxedSpacing",type:"checkbox"},{v2:"v2-volt-v-high",legacy:"mountVoltageVHigh",type:"value"},{v2:"v2-volt-v-low",legacy:"mountVoltageVLow",type:"value"},{v2:"v2-volt-gold-high",legacy:"mountVoltageGoldHigh",type:"value"},{v2:"v2-volt-gold-low",legacy:"mountVoltageGoldLow",type:"value"},{v2:"v2-volt-b-high",legacy:"mountVoltageBHigh",type:"value"},{v2:"v2-volt-b-low",legacy:"mountVoltageBLow",type:"value"},{v2:"v2-settings-auto-backup",legacy:"settingsShowAutoBackups",type:"checkbox"},{v2:"v2-settings-backup-retention",legacy:"autoGearBackupRetention",type:"value"},{v2:"v2-settings-log-level",legacy:"loggingLevelFilter",type:"value"},{v2:"v2-settings-log-history",legacy:"loggingHistoryLimit",type:"value"},{v2:"v2-settings-log-filter",legacy:"loggingNamespaceFilter",type:"value"},{v2:"v2-settings-log-console",legacy:"loggingConsoleOutput",type:"checkbox"},{v2:"v2-settings-log-capture",legacy:"loggingCaptureConsole",type:"checkbox"},{v2:"v2-settings-log-errors",legacy:"loggingCaptureErrors",type:"checkbox"},{v2:"v2-settings-log-persist",legacy:"loggingPersistSession",type:"checkbox"}],o={init(){if(this.container=document.getElementById(e),!this.container){console.error(`[SettingsView] Container element with ID '${e}' not found.`);return}if(!t){console.log("[SettingsView] Initializing..."),document.addEventListener("v2:viewchange",i=>{i.detail&&i.detail.view==="settings"&&this.render()});const r=document.getElementById("languageSelect");r&&r.addEventListener("change",()=>{this.isVisible()&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),t=!0}},isVisible(){return this.container&&this.container.classList.contains("active")},render(){!this.container&&(this.init(),!this.container)||(this.container.innerHTML=this.getTemplate(),this.attachListeners(),this.syncFromLegacy(),this.initTabs(),this.initRehearsalSync(),this.initStatusObservers(),this.initBackupDiffSync(),this.initLogViewerSync())},getTemplate(){return`
            <div class="v2-modal-header">
                <h2>${n("settingsHeading")}</h2>
                <button class="v2-modal-close" id="v2-settings-close" aria-label="${n("buttonClose")}">
                    <span class="icon">close</span>
                </button>
            </div>
            
            <nav class="v2-tabs-nav v2-settings-tabs-nav" role="tablist" aria-label="${n("settingsHeading")}">
                <button type="button" class="v2-tab-btn active" data-tab="general" role="tab" aria-selected="true" aria-controls="v2-panel-general">
                    ${n("settingsTabGeneral")}
                </button>
                <button type="button" class="v2-tab-btn" data-tab="backup" role="tab" aria-selected="false" aria-controls="v2-panel-backup">
                    ${n("settingsTabBackup")}
                </button>
                <button type="button" class="v2-tab-btn" data-tab="data" role="tab" aria-selected="false" aria-controls="v2-panel-data">
                    ${n("settingsTabData")}
                </button>
                <button type="button" class="v2-tab-btn" data-tab="about" role="tab" aria-selected="false" aria-controls="v2-panel-about">
                    ${n("settingsTabAbout")}
                </button>
            </nav>

            <div class="v2-settings-body">
                ${this.getGeneralTabHtml()}
                ${this.getBackupTabHtml()}
                ${this.getDataTabHtml()}
                ${this.getAboutTabHtml()}
            </div>
            <div class="v2-settings-footer">
                <button class="v2-btn v2-btn-primary" id="v2-settings-done">${n("buttonClose")}</button>
            </div>
            
            <!-- Modals -->
            ${this.getBackupDiffModalHtml()}
            ${this.getRehearsalModalHtml()}
        `},getGeneralTabHtml(){return`
            <div class="v2-settings-panel active" id="v2-panel-general">
                <h2>${n("settingsTabGeneral")}</h2>
                
                <div class="v2-settings-card">
                    <h3><span class="icon">language</span> ${n("generalSectionLanguageHeading")}</h3>
                    <div class="v2-form-grid">
                        <div class="v2-form-group">
                            <label class="v2-label">${n("languageSetting")}</label>
                            <select class="v2-select" id="v2-settings-language">
                                <option value="en">English</option>
                                <option value="de">Deutsch</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="it">Italiano</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${n("temperatureUnitSetting")}</label>
                            <select class="v2-select" id="v2-settings-temp-unit">
                                <option value="celsius">${n("temperatureUnitCelsius")}</option>
                                <option value="fahrenheit">${n("temperatureUnitFahrenheit")}</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${n("focusScaleSetting")}</label>
                            <select class="v2-select" id="v2-settings-focus-scale">
                                <option value="metric">${n("focusScaleMetric")}</option>
                                <option value="imperial">${n("focusScaleImperial")}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">palette</span> ${n("generalSectionAppearanceHeading")}</h3>
                    <div class="v2-checkbox-group">
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${n("darkModeSetting")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-dark-mode">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${n("pinkModeSetting")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-pink-mode">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${n("accentColorSetting")}</label>
                        <div class="v2-color-input-wrapper">
                            <input type="color" class="v2-color-input" id="v2-settings-accent-color">
                            <button class="v2-btn v2-btn-sm v2-btn-secondary" id="v2-accent-reset">${n("buttonReset")}</button>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">battery_charging_full</span> ${n("mountVoltageSettingsHeading")}</h3>
                    <p>${n("mountVoltageDescription")}</p>
                    
                    <div class="v2-form-grid v2-voltage-grid">
                        
                        <!-- V-Mount -->
                        <div class="v2-voltage-card">
                            <h4>${n("mountVoltageCardLabelV")}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${n("mountVoltageHighLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-v-high" step="0.1" min="0">
                            </div>
                            <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${n("mountVoltageLowLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-v-low" step="0.1" min="0">
                            </div>
                        </div>

                        <!-- Gold Mount -->
                        <div class="v2-voltage-card">
                            <h4>${n("mountVoltageCardLabelGold")}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${n("mountVoltageHighLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-gold-high" step="0.1" min="0">
                            </div>
                             <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${n("mountVoltageLowLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-gold-low" step="0.1" min="0">
                            </div>
                        </div>

                        <!-- B-Mount -->
                        <div class="v2-voltage-card">
                            <h4>${n("mountVoltageCardLabelB")}</h4>
                            <div class="v2-form-group">
                                <label class="v2-label v2-voltage-label-small">${n("mountVoltageHighLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-b-high" step="0.1" min="0">
                            </div>
                             <div class="v2-form-group" style="margin-top: 0.5rem;">
                                <label class="v2-label v2-voltage-label-small">${n("mountVoltageLowLabel")}</label>
                                <input type="number" class="v2-input" id="v2-volt-b-low" step="0.1" min="0">
                            </div>
                        </div>
                    </div>
                     <div style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-sm v2-btn-secondary" id="v2-volt-reset">${n("mountVoltageReset")}</button>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">color_lens</span> ${n("generalSectionCameraColorsHeading")}</h3>
                    <p>${n("cameraColorSettingDescription")}</p>
                    <div class="v2-camera-colors-grid">
                        <div class="v2-color-field">
                            <label>${n("cameraColorALabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-a">
                        </div>
                        <div class="v2-color-field">
                            <label>${n("cameraColorBLabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-b">
                        </div>
                        <div class="v2-color-field">
                            <label>${n("cameraColorCLabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-c">
                        </div>
                        <div class="v2-color-field">
                            <label>${n("cameraColorDLabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-d">
                        </div>
                        <div class="v2-color-field">
                            <label>${n("cameraColorELabel")}</label>
                            <input type="color" class="v2-color-input" id="v2-cam-color-e">
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">tune</span> ${n("generalSectionInterfaceHeading")}</h3>
                    <p>${n("generalSectionInterfaceHelp")}</p>
                    <div class="v2-checkbox-group">
                        <label class="v2-toggle-row">
                             <span class="v2-toggle-label">${n("checkboxHighContrast")}</span>
                             <div class="v2-toggle-switch">
                                 <input type="checkbox" id="v2-settings-high-contrast">
                                 <span class="v2-toggle-slider"></span>
                             </div>
                        </label>
                        <label class="v2-toggle-row">
                             <span class="v2-toggle-label">${n("checkboxReduceMotion")}</span>
                             <div class="v2-toggle-switch">
                                 <input type="checkbox" id="v2-settings-reduce-motion">
                                 <span class="v2-toggle-slider"></span>
                             </div>
                        </label>
                         <label class="v2-toggle-row">
                             <span class="v2-toggle-label">${n("checkboxRelaxedSpacing")}</span>
                             <div class="v2-toggle-switch">
                                 <input type="checkbox" id="v2-settings-relaxed-spacing">
                                 <span class="v2-toggle-slider"></span>
                             </div>
                        </label>
                    </div>
                    
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${n("fontSizeSetting")}</label>
                        <select class="v2-select" id="v2-settings-font-size">
                            <option value="13px">Small (13px)</option>
                            <option value="14px">Medium (14px)</option>
                            <option value="15px">Large (15px)</option>
                            <option value="16px">X-Large (16px)</option>
                        </select>
                         <p class="v2-help-text">${n("fontSizeSettingHelp")}</p>
                    </div>
                     <div class="v2-form-group">
                        <label class="v2-label">${n("fontFamilySetting")}</label>
                        <select class="v2-select" id="v2-settings-font-family">
                            <option value="Inter, system-ui, sans-serif">Inter (Default)</option>
                            <option value="Roboto, sans-serif">Roboto</option>
                            <option value="Open Sans, sans-serif">Open Sans</option>
                            <option value="system-ui, sans-serif">System UI</option>
                        </select>
                         <p class="v2-help-text">${n("fontFamilySettingHelp")}</p>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">verified</span> ${n("generalSectionBrandingHeading")}</h3>
                    <p>${n("logoSettingHelp")}</p>
                    <div class="v2-branding-preview" id="v2-branding-preview" style="margin-bottom: 1rem; padding: 1rem; border: 1px dashed var(--v2-border-default); border-radius: var(--v2-radius-sm); text-align: center;">
                        <span style="color: var(--v2-text-muted);">${n("brandingNoLogo")}</span>
                    </div>
                    <button class="v2-btn v2-btn-secondary" id="v2-btn-branding-upload">
                        <span class="icon">upload</span> ${n("buttonUploadSvg")}
                    </button>
                    <!-- Legacy File Input is hidden and clicked via proxy -->
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">history_edu</span> ${n("documentationTrackerHeading")}</h3>
                    <p>${n("documentationTrackerDescription")}</p>
                    <div class="v2-doc-tracker-list" id="v2-doc-tracker-list" style="margin: 1rem 0; border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-sm); min-height: 50px;">
                        <!-- Mirrored Items -->
                        <p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">${n("documentationTrackerEmptyShort")}</p>
                    </div>
                    <button class="v2-btn v2-btn-sm v2-btn-primary" id="v2-btn-doc-tracker-add">
                        ${n("documentationTrackerAddRelease")}
                    </button>
                </div>
            </div>
        `},getBackupTabHtml(){return`
            <div class="v2-settings-panel" id="v2-panel-backup" hidden>
                <h2>${n("settingsTabBackup")}</h2>
                
                <div class="v2-settings-card">
                    <h3><span class="icon">cloud_sync</span> ${n("settingsBackupAutomatedHeading")}</h3>
                    <div class="v2-form-group">
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${n("checkboxAutoBackupList")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-auto-backup">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                    <div class="v2-form-group" style="margin-top: 1rem;">
                        <label class="v2-label">${n("labelBackupRetention")}</label>
                        <input type="number" class="v2-input" id="v2-settings-backup-retention" min="1" max="50" style="max-width: 120px;">
                    </div>
                    <!-- Compare Versions (Diff) -->
                    <div style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-backup-diff">
                            <span class="icon">compare_arrows</span>
                            ${n("buttonCompareVersions")}
                        </button>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">save</span> ${n("settingsBackupManualHeading")}</h3>
                    <div class="v2-form-row-inline">
                        <button class="v2-btn v2-btn-primary" id="v2-btn-backup">
                            <span class="icon">download</span>
                            ${n("buttonDownloadBackup")}
                        </button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-restore">
                            <span class="icon">upload</span>
                            ${n("buttonRestore")}
                        </button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-restore-rehearsal">
                            <span class="icon">science</span>
                            ${n("buttonRestoreRehearsal")}
                        </button>
                    </div>
                </div>

                <div class="v2-settings-card" style="border-color: var(--v2-status-error);">
                    <h3 style="color: var(--v2-status-error);"><span class="icon">warning</span> ${n("settingsBackupDangerHeading")}</h3>
                    <p>${n("settingsFactoryResetHelp")}</p>
                    <button class="v2-btn v2-btn-danger" id="v2-btn-factory-reset">
                        <span class="icon">delete_forever</span>
                        ${n("buttonFactoryReset")}
                    </button>
                </div>
            </div>
        `},getBackupDiffModalHtml(){return`
            <div class="v2-modal-backdrop" id="v2-backup-diff-modal" style="display: none;">
                <div class="v2-modal" role="dialog" aria-modal="true" style="max-width: 700px; width: 90%; max-height: 90vh; display: flex; flex-direction: column;">
                    <div class="v2-modal-header">
                        <h3>${n("backupDiffModalTitle")}</h3>
                        <button class="v2-btn-icon" data-action="close-diff">close</button>
                    </div>
                    <div class="v2-modal-content" style="overflow-y: auto;">
                        <p style="color: var(--v2-text-secondary); margin-bottom: 1.5rem;">
                            ${n("backupDiffModalSubtitle")}
                        </p>
                        
                        <div class="v2-form-grid">
                            <div class="v2-form-group">
                                <label class="v2-label">${n("labelBaselineVersion")}</label>
                                <select class="v2-select" id="v2-diff-primary"></select>
                            </div>
                            <div class="v2-form-group">
                                <label class="v2-label">${n("labelComparisonVersion")}</label>
                                <select class="v2-select" id="v2-diff-secondary"></select>
                            </div>
                        </div>

                        <div id="v2-diff-summary" style="margin: 1rem 0; font-weight: 500;"></div>

                        <!-- Diff List Mirror -->
                        <div class="v2-diff-list-container" style="border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-sm); padding: 0.5rem; min-height: 100px; max-height: 300px; overflow-y: auto;">
                            <ul id="v2-diff-list" style="list-style: none; padding: 0; margin: 0;"></ul>
                            <p id="v2-diff-empty" style="text-align: center; color: var(--v2-text-muted); padding: 2rem;">
                                ${n("backupDiffEmptyState")}
                            </p>
                        </div>

                        <div class="v2-form-group" style="margin-top: 1rem;">
                            <label class="v2-label">${n("labelIncidentNotes")}</label>
                            <textarea class="v2-textarea" id="v2-diff-notes" rows="3" placeholder="${n("placeholderIncidentNotes")}"></textarea>
                        </div>
                    </div>
                    <div class="v2-modal-footer">
                        <button class="v2-btn v2-btn-secondary" data-action="close-diff">${n("buttonClose")}</button>
                        <button class="v2-btn v2-btn-primary" id="v2-btn-diff-export">${n("buttonExportLog")}</button>
                    </div>
                </div>
            </div>
        `},getDataTabHtml(){return`
            <div class="v2-settings-panel" id="v2-panel-data" hidden>
                <h2>${n("settingsTabData")}</h2>
                
                <div class="v2-settings-card">
                    <h3><span class="icon">storage</span> ${n("settingsDataStorageStatusHeading")}</h3>
                    <div class="v2-key-value-list">
                         <div class="v2-kv-item">
                            <span class="v2-kv-label">${n("labelLatestProjectSave")}</span>
                            <span class="v2-kv-value" id="v2-status-last-project">---</span>
                        </div>
                        <div class="v2-kv-item">
                            <span class="v2-kv-label">${n("labelLatestAutoBackup")}</span>
                            <span class="v2-kv-value" id="v2-status-last-auto">---</span>
                        </div>
                         <div class="v2-kv-item">
                            <span class="v2-kv-label">${n("labelLatestFullBackup")}</span>
                            <span class="v2-kv-value" id="v2-status-last-full">---</span>
                        </div>
                    </div>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">sd_storage</span> ${n("settingsDataPersistenceHeading")}</h3>
                    <p>${n("textManageLocalData")}</p>
                    <div class="v2-form-row-inline" style="margin-bottom: 1rem;">
                        <button class="v2-btn v2-btn-primary" id="v2-btn-data-backup">
                            <span class="icon">download</span>
                            ${n("buttonDownloadFullBackup")}
                        </button>
                    </div>
                    <p>${n("textRequestPersistence")}</p>
                    <button class="v2-btn v2-btn-secondary" id="v2-btn-storage-persist">
                        ${n("buttonRequestPersistence")}
                    </button>
                    <p id="v2-status-persistence" style="margin-top: 0.5rem; color: var(--v2-text-secondary); font-size: 0.9rem;">
                        ${n("statusCheckingPersistence")}
                    </p>
                </div>

                <div class="v2-settings-card">
                    <h3><span class="icon">terminal</span> ${n("settingsDataLoggingHeading")}</h3>
                    <div class="v2-form-grid">
                        <div class="v2-form-group">
                            <label class="v2-label">${n("labelLogLevel")}</label>
                            <select class="v2-select" id="v2-settings-log-level">
                                <option value="all">${n("optionLogLevelAll")}</option>
                                <option value="info">${n("optionLogLevelInfo")}</option>
                                <option value="warn">${n("optionLogLevelWarn")}</option>
                                <option value="error">${n("optionLogLevelError")}</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label class="v2-label">${n("labelHistoryLimit")}</label>
                            <input type="number" class="v2-input" id="v2-settings-log-history" min="50" max="2000" step="50">
                        </div>
                         <div class="v2-form-group" style="grid-column: span 2;">
                            <label class="v2-label">${n("labelNamespaceFilter")}</label>
                            <input type="search" class="v2-input" id="v2-settings-log-filter" placeholder="e.g. storage, backup">
                        </div>
                    </div>
                    <div class="v2-checkbox-group" style="margin-top: 1rem;">
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${n("checkboxMirrorConsole")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-log-console">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${n("checkboxCaptureConsole")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-log-capture">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${n("checkboxCaptureGlobalErrors")}</span>
                            <div class="v2-toggle-switch">
                                <input type="checkbox" id="v2-settings-log-errors">
                                <span class="v2-toggle-slider"></span>
                            </div>
                        </label>
                        <label class="v2-toggle-row">
                            <span class="v2-toggle-label">${n("checkboxPersistSession")}</span>
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
                         <p id="v2-log-empty" style="text-align: center; color: var(--v2-text-muted); display: none;">${n("textNoLogEntries")}</p>
                    </div>

                    <div class="v2-form-row" style="margin-top: 1rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-export-log">${n("buttonExportLog")}</button>
                    </div>
                </div>
            </div>
        `},getAboutTabHtml(){const r=document.getElementById("aboutVersion")?.textContent||"v2.0";return`
            <div class="v2-settings-panel" id="v2-panel-about" hidden>
                <h2>${n("settingsTabAbout")}</h2>
                <div class="v2-settings-card">
                    <h3><span class="icon">info</span> ${n("appTitle")}</h3>
                    <p class="v2-text-lead" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${r}</p>
                    <p>${n("appCreator")}</p>
                    
                    <div class="v2-form-row-inline" style="margin-top: 1.5rem;">
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-support">${n("buttonSupport")}</button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-bug">${n("buttonReportBug")}</button>
                        <button class="v2-btn v2-btn-secondary" id="v2-btn-feature">${n("buttonSuggestFeature")}</button>
                    </div>
                </div>
            </div>
        `},getRehearsalModalHtml(){return`
            <div class="v2-modal-backdrop" id="v2-rehearsal-modal" style="display: none;">
                <div class="v2-modal" role="dialog" aria-modal="true" style="max-width: 600px; width: 90%;">
                    <div class="v2-modal-header">
                        <h3>${n("buttonRestoreRehearsal")}</h3>
                        <button class="v2-btn-icon" data-action="close-rehearsal">close</button>
                    </div>
                    <div class="v2-modal-content">
                        <p style="color: var(--v2-text-secondary); margin-bottom: 1.5rem;">
                            ${n("rehearsalModalSubtitle")}
                        </p>

                        <!-- Source Selection -->
                        <div class="v2-form-group">
                            <label class="v2-label">${n("rehearsalModalSourceLabel")}</label>
                            <div class="v2-radio-group" id="v2-rehearsal-mode-group">
                                <label class="v2-radio-label">
                                    <input type="radio" class="v2-radio" name="v2RehearsalMode" value="backup" checked>
                                    ${n("rehearsalModalSourceBackup")}
                                </label>
                                <label class="v2-radio-label">
                                    <input type="radio" class="v2-radio" name="v2RehearsalMode" value="project">
                                    ${n("rehearsalModalSourceProject")}
                                </label>
                            </div>
                        </div>

                        <!-- File Input -->
                        <div class="v2-form-group" style="margin-top: 1.5rem;">
                            <label class="v2-label">${n("labelSelectFile")}</label>
                            <div style="display: flex; gap: 1rem; align-items: center;">
                                <button class="v2-btn v2-btn-secondary" id="v2-rehearsal-browse-btn">
                                    <span class="icon">folder_open</span>
                                    ${n("buttonChooseFile")}
                                </button>
                                <span id="v2-rehearsal-filename" style="color: var(--v2-text-secondary); font-style: italic;">${n("labelNoFileSelected")}</span>
                            </div>
                        </div>

                        <!-- Legacy Status Mirror -->
                        <div id="v2-rehearsal-status" style="margin-top: 1rem; font-weight: 500;"></div>

                        <!-- Table Mirror -->
                        <div style="margin-top: 1.5rem; border: 1px solid var(--v2-border-default); border-radius: var(--v2-radius-md); overflow: hidden;">
                            <table class="v2-table" style="width: 100%;">
                                <thead style="background: var(--v2-surface-muted);">
                                    <tr>
                                        <th style="padding: 0.75rem; text-align: left;">${n("tableHeaderData")}</th>
                                        <th style="padding: 0.75rem; text-align: left;">${n("tableHeaderDifference")}</th>
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
        `},attachListeners(){const r=this.container.querySelectorAll(".v2-tab-btn"),i=this.container.querySelectorAll(".v2-settings-panel");r.forEach(u=>{u.addEventListener("click",()=>{r.forEach(p=>{p.classList.remove("active"),p.setAttribute("aria-selected","false")}),i.forEach(p=>p.hidden=!0),u.classList.add("active"),u.setAttribute("aria-selected","true");const d=`v2-panel-${u.dataset.tab}`,m=document.getElementById(d);m&&(m.hidden=!1)})}),a.forEach(u=>{const d=document.getElementById(u.v2);if(!d)return;const m=document.getElementById(u.legacy);if(!m){console.warn(`[SettingsView] Legacy element '${u.legacy}' not found.`);return}d.addEventListener("change",p=>{if(u.type==="checkbox"?m.checked=p.target.checked:m.value=p.target.value,m.dispatchEvent(new Event("change",{bubbles:!0})),m.dispatchEvent(new Event("input",{bubbles:!0})),["settingsLanguage","settingsTemperatureUnit","settingsFocusScale","settingsFontSize","settingsFontFamily","mountVoltageVHigh","mountVoltageVLow","mountVoltageGoldHigh","mountVoltageGoldLow","mountVoltageBHigh","mountVoltageBLow"].includes(u.legacy)){const k=document.getElementById("settingsSave");k&&k.click()}})});const s=document.getElementById("settingsLogo");s&&s.addEventListener("change",()=>{const u=document.getElementById("settingsSave");u&&u.click()});const l=(u,d)=>{const m=document.getElementById(u),p=document.getElementById(d);m&&p&&m.addEventListener("click",()=>p.click())};l("v2-btn-reset-accent","accentColorReset"),l("v2-btn-reset-voltages","mountVoltageReset"),l("v2-btn-backup","backupSettings"),l("v2-btn-restore","restoreSettings"),l("v2-btn-factory-reset","factoryResetButton"),l("v2-btn-data-backup","storageBackupNow"),l("v2-btn-storage-persist","storagePersistenceRequest"),l("v2-btn-export-log","loggingExportBtn"),l("v2-btn-support","supportLink"),l("v2-btn-bug","reportBugLink"),l("v2-btn-feature","suggestFeatureLink"),l("v2-btn-local-font","localFontsButton"),l("v2-btn-branding-upload","settingsLogo"),l("v2-btn-doc-tracker-add","documentationTrackerAddRelease");const c=document.getElementById("v2-btn-backup-diff");c&&c.addEventListener("click",()=>{const u=document.getElementById("v2-backup-diff-modal");u&&(u.style.display="flex");const d=document.getElementById("backupDiffToggleButton");d&&d.click()}),this.container.querySelectorAll('[data-action="close-diff"]').forEach(u=>{u.addEventListener("click",()=>{const d=document.getElementById("v2-backup-diff-modal");d&&(d.style.display="none");const m=document.getElementById("backupDiffToggleButton");m&&m.click()})});const v=document.getElementById("v2-btn-restore-rehearsal"),b=document.getElementById("v2-rehearsal-modal"),g=this.container.querySelectorAll('[data-action="close-rehearsal"]');v&&b&&v.addEventListener("click",()=>{const u=document.getElementById("restoreRehearsalButton");u&&u.click(),b.style.display="flex"}),g.forEach(u=>{u.addEventListener("click",()=>{b&&(b.style.display="none");const d=document.getElementById("restoreRehearsalClose");d&&d.click()})})},syncFromLegacy(){a.forEach(r=>{const i=document.getElementById(r.v2),s=document.getElementById(r.legacy);i&&s&&(r.type==="checkbox"?i.checked=s.checked:(r.type==="value"||r.type==="color")&&(i.value=s.value))})},initStatusObservers(){const r=[{legacyId:"storageStatusLastProjectValue",v2Id:"v2-status-last-project"},{legacyId:"storageStatusLastAutoBackupValue",v2Id:"v2-status-last-auto"},{legacyId:"storageStatusLastFullBackupValue",v2Id:"v2-status-last-full"},{legacyId:"storagePersistenceStatus",v2Id:"v2-status-persistence"}],i=new MutationObserver(()=>{r.forEach(g=>{const u=document.getElementById(g.legacyId),d=document.getElementById(g.v2Id);u&&d&&(d.textContent=u.textContent)})});r.forEach(g=>{const u=document.getElementById(g.legacyId);if(u){i.observe(u,{childList:!0,characterData:!0,subtree:!0});const d=document.getElementById(g.v2Id);d&&(d.textContent=u.textContent)}});const s=[{legacyId:"localFontsStatus",v2Id:"v2-status-local-font"}],l=new MutationObserver(()=>{s.forEach(g=>{const u=document.getElementById(g.legacyId),d=document.getElementById(g.v2Id);u&&d&&(d.textContent=u.textContent)})});s.forEach(g=>{const u=document.getElementById(g.legacyId);u&&l.observe(u,{childList:!0,characterData:!0,subtree:!0})});const c=document.getElementById("settingsLogoPreview"),f=document.getElementById("v2-branding-preview");c&&f&&(new MutationObserver(()=>{if(c.hidden||c.innerHTML.trim()==="")f.innerHTML='<span style="color: var(--v2-text-muted);">No custom logo set</span>';else{f.innerHTML=c.innerHTML;const u=f.querySelector("img, svg");u&&(u.style.maxWidth="100%",u.style.height="auto")}}).observe(c,{childList:!0,attributes:!0,subtree:!0}),!c.hidden&&c.innerHTML.trim()!==""&&(f.innerHTML=c.innerHTML));const v=document.getElementById("documentationTrackerList"),b=document.getElementById("v2-doc-tracker-list");v&&b&&new MutationObserver(()=>{v.children.length===0?b.innerHTML='<p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">No releases tracked.</p>':(b.innerHTML="",Array.from(v.children).forEach(u=>{const d=u.cloneNode(!0);d.style.padding="0.5rem",d.style.borderBottom="1px solid var(--v2-border-subtle)",b.appendChild(d)}))}).observe(v,{childList:!0,subtree:!0})},initTabs(){const r=this.container.querySelector(".v2-tab-btn.active");if(r){const i=`v2-panel-${r.dataset.tab}`,s=document.getElementById(i);s&&(s.hidden=!1)}},initRehearsalSync(){const r=document.querySelectorAll('input[name="v2RehearsalMode"]'),i=document.getElementsByName("restoreRehearsalMode");r.forEach(m=>{m.addEventListener("change",()=>{i.forEach(p=>{p.value===m.value&&(p.checked=!0,p.dispatchEvent(new Event("change",{bubbles:!0})))})})});const s=document.getElementById("v2-rehearsal-browse-btn"),l=document.getElementById("restoreRehearsalBrowse");s&&l&&s.addEventListener("click",()=>l.click());const c=document.getElementById("v2-rehearsal-proceed-btn"),f=document.getElementById("v2-rehearsal-abort-btn");c&&c.addEventListener("click",()=>{const m=document.getElementById("restoreRehearsalProceed");m&&m.click(),document.getElementById("v2-rehearsal-modal").style.display="none"}),f&&f.addEventListener("click",()=>{const m=document.getElementById("restoreRehearsalAbort");m&&m.click()});const v=document.getElementById("restoreRehearsalTableBody"),b=document.getElementById("v2-rehearsal-table-body"),g=document.getElementById("restoreRehearsalFileName"),u=document.getElementById("v2-rehearsal-filename"),d=document.getElementById("restoreRehearsalProceed");v&&b&&(new MutationObserver(()=>{b.innerHTML="",Array.from(v.children).forEach(p=>{const h=p.querySelectorAll("td");if(h.length>=4){const k=h[0].textContent,x=h[3].innerHTML,S=document.createElement("tr");S.innerHTML=`
                            <td style="padding: 0.75rem;"><strong>${k}</strong></td>
                            <td style="padding: 0.75rem;">${x}</td>
                        `,b.appendChild(S)}}),c&&d&&(c.disabled=d.disabled,d.style.display==="none"?c.style.display="none":c.style.display="inline-block")}).observe(v,{childList:!0,subtree:!0}),d&&(new MutationObserver(()=>{c&&(c.disabled=d.disabled,d.style.display==="none"?c.style.display="none":c.style.display="inline-block")}).observe(d,{attributes:!0}),c&&(c.disabled=d.disabled,d.style.display==="none"?c.style.display="none":c.style.display="inline-block"))),g&&u&&new MutationObserver(()=>{u.textContent=g.textContent}).observe(g,{childList:!0,characterData:!0,subtree:!0})},initBackupDiffSync(){const r=document.getElementById("v2-diff-primary"),i=document.getElementById("v2-diff-secondary"),s=document.getElementById("backupDiffPrimary"),l=document.getElementById("backupDiffSecondary"),c=()=>{r&&s&&(r.innerHTML=s.innerHTML,r.value=s.value),i&&l&&(i.innerHTML=l.innerHTML,i.value=l.value)};if(c(),s&&l){const h=new MutationObserver(c);h.observe(s,{childList:!0}),h.observe(l,{childList:!0})}r&&r.addEventListener("change",()=>{s&&(s.value=r.value,s.dispatchEvent(new Event("change",{bubbles:!0})))}),i&&i.addEventListener("change",()=>{l&&(l.value=i.value,l.dispatchEvent(new Event("change",{bubbles:!0})))});const f=document.getElementById("backupDiffSummary"),v=document.getElementById("v2-diff-summary");f&&v&&new MutationObserver(()=>{v.innerHTML=f.innerHTML}).observe(f,{childList:!0,subtree:!0});const b=document.getElementById("backupDiffList"),g=document.getElementById("v2-diff-list");b&&g&&new MutationObserver(()=>{g.innerHTML=b.innerHTML,Array.from(g.querySelectorAll("li")).forEach(k=>{k.style.padding="0.5rem",k.style.borderBottom="1px solid var(--v2-border-subtle)"})}).observe(b,{childList:!0,subtree:!0});const u=document.getElementById("v2-btn-diff-export"),d=document.getElementById("backupDiffExport");u&&d&&u.addEventListener("click",()=>d.click());const m=document.getElementById("v2-diff-notes"),p=document.getElementById("backupDiffNotes");m&&p&&(m.value=p.value,m.addEventListener("input",()=>{p.value=m.value,p.dispatchEvent(new Event("input",{bubbles:!0}))}),new MutationObserver(()=>{document.activeElement!==m&&(m.value=p.value)}).observe(p,{attributes:!0,attributeFilter:["value"]}),p.addEventListener("input",()=>{document.activeElement!==m&&(m.value=p.value)}))},initLogViewerSync(){const r=document.getElementById("loggingHistory"),i=document.getElementById("v2-log-history-list");r&&i&&(new MutationObserver(()=>{i.innerHTML=r.innerHTML,Array.from(i.querySelectorAll("li")).forEach(l=>{l.style.padding="0.25rem 0",l.style.borderBottom="1px dashed var(--v2-border-subtle)"})}).observe(r,{childList:!0,subtree:!0}),i.innerHTML=r.innerHTML)}};typeof window<"u"&&(window.cineSettingsView=o)})();const Wo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const t="view-own-gear";let n=!1;function a(i){return typeof i!="string"?"":i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function o(i){if(typeof window<"u"&&window.texts){const s=document.getElementById("languageSelect"),l=s&&s.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",c=window.texts[l]||window.texts.en;if(c)return i.split(".").reduce((f,v)=>f?f[v]:null,c)||i}return i}const r={container:null,init(){try{this.container=document.getElementById(t),this.container||this.createViewContainer(),n||(console.log("[OwnGearView] Initializing..."),document.addEventListener("v2:viewchange",i=>{i.detail&&i.detail.view==="ownGear"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),n=!0,console.log("[OwnGearView] Initialized"))}catch(i){console.error("[OwnGearView] Init failed:",i)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const i=document.querySelector(".v2-main")||document.querySelector(".v2-app")||document.body,s=document.createElement("section");s.id=t,s.className="app-view",i.appendChild(s),this.container=s},render(){try{if(!this.container&&(this.init(),!this.container))return;const i=e.cineFeaturesOwnGear;if(!i){this.container.innerHTML=`
                        <div class="v2-empty-state">
                            <p>${o("statusUnavailable")||"Module not available"}</p>
                        </div>
                    `;return}const s=i.loadStoredOwnGearItems(),l=`
                    <header class="view-header">
                        <div class="header-content">
                            <h1>${o("ownGearViewTitle")}</h1>
                            <p class="header-subtitle">${o("ownGearViewSubtitle")}</p>
                        </div>
                        <div class="view-header-actions">
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear">
                                <span class="icon">add</span>
                                <span>${o("buttonAddGearItem")}</span>
                            </button>
                        </div>
                    </header>
                `;let c='<div class="view-content">';!s||s.length===0?c+=`
                        <div class="own-gear-empty-state">
                            <span class="icon">inventory_2</span>
                            <h3>${o("ownGearEmptyTitle")}</h3>
                            <p>${o("ownGearEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear-empty">
                                ${o("buttonAddFirstGearItem")}
                            </button>
                        </div>
                    `:(c+='<div class="own-gear-list">',s.forEach(f=>{c+=this.renderItemRow(f)}),c+="</div>"),c+="</div>",this.container.innerHTML=l+c,this.attachListeners()}catch(i){console.error("[OwnGearView] Render failed",i),this.container&&(this.container.innerHTML=`<div class="v2-error-state"><p>Error loading view: ${i.message}</p></div>`)}},renderItemRow(i){return`
                <div class="own-gear-item-card" data-item-id="${a(i.id)}">
                    <div class="own-gear-item-info">
                        <div class="own-gear-item-name">${a(i.name)}</div>
                        ${i.notes?`<div class="own-gear-item-notes">${a(i.notes)}</div>`:""}
                    </div>
                     <div class="own-gear-item-meta">
                        ${i.quantity?`<span class="own-gear-badge qty-badge">${o("labelQtyPrefix")}${a(i.quantity)}</span>`:""}
                        ${i.source?`<span class="own-gear-badge source-badge">${o("labelSourcePrefix")}${a(i.source)}</span>`:""}
                    </div>
                    <div class="own-gear-item-actions">
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-own-gear" title="${o("buttonEdit")}" data-id="${a(i.id)}">
                            <span class="icon">edit</span>
                        </button>
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-own-gear" title="${o("buttonDelete")}" data-id="${a(i.id)}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                </div>
            `},attachListeners(){const i=this.container.querySelector("#btn-add-own-gear"),s=this.container.querySelector("#btn-add-own-gear-empty");i&&(i.onclick=()=>this.showEditModal(null)),s&&(s.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".btn-edit-own-gear").forEach(l=>{l.onclick=c=>{c.stopPropagation();const f=c.currentTarget.dataset.id;f&&this.showEditModal(f)}}),this.container.querySelectorAll(".btn-delete-own-gear").forEach(l=>{l.onclick=c=>{c.stopPropagation();const f=c.currentTarget.dataset.id;f&&confirm(o("confirmDeleteGearItem"))&&this.deleteItem(f)}})},deleteItem(i){const s=e.cineFeaturesOwnGear;if(!s)return;const c=s.loadStoredOwnGearItems().filter(f=>f.id!==i);s.persistOwnGearItems(c)?this.render():alert(o("alertSaveItemFailed"))},showEditModal(i){const s=e.cineFeaturesOwnGear;if(!s)return;let l={},c=!0;if(i){const d=s.loadStoredOwnGearItems().find(m=>m.id===i);d&&(l={...d},c=!1)}c&&(l={name:"",quantity:"",notes:"",source:""});const f=document.querySelector(".v2-modal-backdrop");f&&f.remove();const v=document.createElement("div");v.className="v2-modal-backdrop",v.innerHTML=`
                <div class="v2-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${o(c?"modalTitleNewGearItem":"modalTitleEditGearItem")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body own-gear-modal-body">
                        
                        <div class="v2-form-group">
                            <label class="v2-label">${o("labelItemName")}</label>
                            <input type="text" id="ownGearName" class="v2-input" value="${a(l.name)}" placeholder="${o("placeholderGearName")}" required>
                        </div>

                         <div class="v2-form-group">
                            <label class="v2-label">${o("labelQuantity")}</label>
                            <input type="number" id="ownGearQuantity" class="v2-input" value="${a(l.quantity)}" placeholder="${o("placeholderGearQty")}">
                        </div>

                        <div class="v2-form-group">
                            <label class="v2-label">${o("labelNotes")}</label>
                            <textarea id="ownGearNotes" class="v2-input" rows="3" placeholder="${o("placeholderGearNotes")}">${a(l.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-own-gear">${o("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-own-gear">${o("buttonSaveGearItem")}</button>
                    </div>
                </div>
            `,document.body.appendChild(v),requestAnimationFrame(()=>v.classList.add("open"));const b=()=>{v.classList.remove("open"),setTimeout(()=>v.remove(),200)},g=v.querySelector("#ownGearName");g.focus(),v.querySelector(".v2-modal-close").onclick=b,v.querySelector("#btn-cancel-own-gear").onclick=b,v.querySelector("#btn-save-own-gear").onclick=()=>{const u=g.value.trim();if(!u){alert(o("alertEnterName"));return}const d={id:i||void 0,name:u,quantity:v.querySelector("#ownGearQuantity").value.trim(),notes:v.querySelector("#ownGearNotes").value.trim()},m=s.loadStoredOwnGearItems();let p;if(c?p=s.normalizeOwnGearRecord(d):p=s.normalizeOwnGearRecord({...l,...d}),!p){alert(o("alertInvalidItemData"));return}let h;c?h=[...m,p]:h=m.map(k=>k.id===i?p:k),s.persistOwnGearItems(h)?(this.render(),b()):alert(o("alertSaveItemFailed"))}}};e.cineOwnGearView=r})(typeof window<"u"?window:void 0);const Ko=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const t=[{id:"v2-welcome",title:"Welcome to V2",keywords:"v2 new interface update overview navigation sidebar",icon:"✨",content:`
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
            `},{id:"v2-sidebar-search",title:"Sidebar Search",keywords:"search sidebar features devices actions help keyboard offline",icon:"🔎",content:`
                <p>The sidebar search now runs fully offline and blends features, devices, actions, and help topics into one fast list.</p>

                <h4>What It Covers</h4>
                <ul>
                    <li><strong>Features:</strong> Jump straight to inputs, sections, and dialogs.</li>
                    <li><strong>Devices:</strong> Search the local device catalog and open the matching entry.</li>
                    <li><strong>Actions:</strong> Trigger quick commands like Save, Export, or Settings.</li>
                    <li><strong>Help:</strong> Open the most relevant help topic without leaving the planner.</li>
                </ul>

                <h4>Keyboard Navigation</h4>
                <ul>
                    <li><strong>Arrow keys:</strong> Move through suggestions.</li>
                    <li><strong>Enter:</strong> Activate the highlighted result.</li>
                    <li><strong>Esc:</strong> Clear the query and close the list.</li>
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
            `}],n=[{id:"v2-quick-start",title:"Quick Start Checklist",keywords:"quickstart onboarding tutorial first steps workflow basics getting started new project guide",icon:"🚀",content:`
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
            `}];t.push(...n),e.cineV2HelpData=t})(typeof window<"u"?window:void 0);const Yo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const t=e.cineV2HelpData||[];function n(){const s=["v2-quick-start","v2-shortcuts","v2-data-safety","v2-features"];return{essentials:t.filter(l=>s.includes(l.id)),guides:t.filter(l=>!s.includes(l.id))}}function a(s){return s?s.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>").split(/\n\n+/).map(c=>c.trim().startsWith("- ")?`<ul>${c.trim().split(/\n/).map(v=>`<li>${v.replace(/^- /,"")}</li>`).join("")}</ul>`:`<p>${c}</p>`).join(""):""}function o(){let s=e.cineCoreLocalization||e.cineCoreLocalizationBridge||e.cineModuleBase&&e.cineModuleBase.resolveLocalization&&e.cineModuleBase.resolveLocalization();if(!s||typeof s.getString!="function")if(typeof e.getText=="function")s={getString:d=>e.getText(d)};else if(e.texts){const d=(h,k)=>k.split(".").reduce((x,S)=>x&&x[S],h),m=e.currentLanguage||e.currentLang||"en",p=e.texts[m]||e.texts.en;s={getString:h=>d(p,h)||""}}else return console.warn("[HelpService] Localization module not found. V1 topics unavailable."),[];const l=["projectManagement","saveShareBackup","deviceConfiguration","powerCalculation","connectionDiagram","gearList","contacts","ownGear","settings","offlineUse","troubleshooting","shortcuts","pinkMode"],c=e.currentLanguage||e.currentLang||e.document?.documentElement?.lang||"en",f=e.texts&&(e.texts[c]||e.texts.en),v=f&&f.helpTopics,b=v&&typeof v=="object"?Object.keys(v):[],g=b.length?[...l.filter(d=>b.includes(d)),...b.filter(d=>!l.includes(d))]:l,u={projectManagement:"📂",saveShareBackup:"💾",deviceConfiguration:"⚙️",powerCalculation:"⚡",connectionDiagram:"🔌",gearList:"📋",contacts:"👥",ownGear:"📷",settings:"🛠️",offlineUse:"📡",troubleshooting:"❓",shortcuts:"⌨️",pinkMode:"🌸"};return g.map(d=>{const m=v&&v[d],p=m&&m.title||s.getString(`helpTopics.${d}.title`),h=m&&m.content||s.getString(`helpTopics.${d}.content`);return p?{id:`v1-${d}`,category:"reference",title:p,keywords:`legacy reference v1 ${d}`,icon:u[d]||"📄",content:a(h)}:null}).filter(d=>d!==null)}function r(){const s=t,l=o();return[...s,...l]}function i(){const s=n();return{essentials:{title:"Essentials",items:s.essentials},guide:{title:"Guides",items:s.guides},reference:{title:"Topic Reference",items:o()}}}e.cineHelpService={getAllSections:r,getGroupedSections:i}})(typeof window<"u"?window:void 0);const Jo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Qo="v2HelpToc",hn="v2HelpContent",Zo="v2HelpSearch";let Ee=null,tt=!1;function ye(e){return document.getElementById(e)}function Xo(){const e=ye(hn);if(!e)return[];e.innerHTML="";const t=[],n=window.cineHelpService;if(!n)return e.innerHTML='<div class="v2-empty-state"><p>Help service unavailable.</p></div>',[];const a=n.getGroupedSections(),o=[a.essentials,a.guide,a.reference].filter(i=>i&&i.items.length>0);o.forEach((i,s)=>{if(ei(e,i.title,i.items,t),s<o.length-1){const l=document.createElement("hr");l.className="v2-help-divider",e.appendChild(l)}});const r=document.createElement("div");return r.id="v2HelpNoResults",r.className="v2-help-no-results",r.style.display="none",r.innerHTML=`
        <div class="v2-help-no-results-content">
            <span class="v2-help-no-results-icon">🔍</span>
            <h3>No results found</h3>
            <p>Try adjusting your search terms.</p>
        </div>
    `,e.appendChild(r),t}function ei(e,t,n,a){a.push({type:"header",title:t}),n.forEach(o=>{const r=document.createElement("section");r.className="v2-help-section",r.id=o.id,r.setAttribute("data-keywords",(o.keywords||"")+" "+(o.title||""));const i=document.createElement("h2");o.icon?i.innerHTML=`<span class="v2-help-icon">${o.icon}</span> ${o.title}`:i.textContent=o.title;const s=document.createElement("div");s.className="v2-help-content-body",s.innerHTML=o.content,r.appendChild(i),r.appendChild(s),e.appendChild(r),a.push({type:"item",id:o.id,title:o.title,keywords:o.keywords,icon:o.icon})})}function ti(e){const t=ye(Qo);if(!t)return;t.innerHTML="";const n=document.createElement("ul");e.forEach(a=>{if(a.type==="header"){const o=document.createElement("li");o.className="v2-help-toc-header",o.textContent=a.title,n.appendChild(o)}else{const o=document.createElement("li"),r=document.createElement("a");r.href=`#${a.id}`,r.className="v2-help-toc-link",r.dataset.target=a.id,a.icon?r.innerHTML=`<span class="v2-toc-icon">${a.icon}</span> ${a.title}`:r.textContent=a.title,r.addEventListener("click",i=>{i.preventDefault();const s=document.getElementById(a.id);s&&s.scrollIntoView({behavior:"smooth"}),yn(a.id)}),o.appendChild(r),n.appendChild(o)}}),t.appendChild(n)}function yn(e){document.querySelectorAll(".v2-help-toc-link").forEach(t=>{t.dataset.target===e?t.classList.add("active"):t.classList.remove("active")})}function ni(){Ee&&Ee.disconnect();const e={root:ye(hn),rootMargin:"-10% 0px -80% 0px",threshold:0},t=n=>{n.forEach(a=>{a.isIntersecting&&yn(a.target.id)})};Ee=new IntersectionObserver(t,e),document.querySelectorAll(".v2-help-section").forEach(n=>{Ee.observe(n)})}function ai(){const e=ye(Zo);if(!e)return;const t=document.createElement("button");t.className="v2-help-search-clear",t.innerHTML="✕",t.style.display="none",t.ariaLabel="Clear search",e.parentNode.appendChild(t);function n(){const a=e.value.toLowerCase().trim(),o=document.querySelectorAll(".v2-help-section"),r=ye("v2HelpNoResults");let i=!1;o.forEach(s=>{const l=s.innerText.toLowerCase(),c=(s.dataset.keywords||"").toLowerCase(),f=l.includes(a)||c.includes(a);s.style.display=f?"block":"none",f&&(i=!0)}),document.querySelectorAll(".v2-help-divider").forEach(s=>{s.style.display=a?"none":"block"}),r&&(r.style.display=!i&&a?"flex":"none"),t.style.display=a.length>0?"block":"none"}e.addEventListener("input",n),t.addEventListener("click",()=>{e.value="",n(),e.focus()})}function wn(){tt||(console.log("[HelpView] Initializing..."),window.cineViewManager&&window.cineViewManager.registerView("help",{onEnter:()=>En(),onLeave:()=>{}}),nt(),ai(),document.addEventListener("v2:languagechange",()=>nt()),tt=!0)}function nt(){const e=Xo();e&&(ti(e),setTimeout(()=>ni(),100))}function En(){tt||wn()}const kn={init:wn,enter:En,refresh:nt};window.cineHelpView=kn;const oi=Object.freeze(Object.defineProperty({__proto__:null,cineHelpView:kn},Symbol.toStringTag,{value:"Module"})),qe="backups",Sn={init(){window.cineViewManager&&window.cineViewManager.registerView(qe,{onEnter:()=>this.render(),onLeave:()=>{}});const e=document.getElementById("navAutoBackups");e&&(e.style.display="flex")},async render(){document.getElementById("v2-main");let e=document.getElementById(`view-${qe}`);e||(e=document.createElement("section"),e.id=`view-${qe}`,e.className="app-view",e.innerHTML=`
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
            `,document.querySelector(".v2-main").appendChild(e));const t=e.querySelector("#backupList");t.innerHTML='<div class="v2-spinner"></div>';try{const n=await je.listSnapshots();if(n.length===0){t.innerHTML=`
                    <div class="v2-empty-state">
                        <p>No backups found in the Vault.</p>
                        <p class="subtext">Backups are created automatically when you save projects.</p>
                    </div>`;return}let a='<ul class="v2-list">';for(const o of n){const r=o.replace(/\.json$/i,"").replace(/^snapshot_/,"");a+=`
                    <li class="v2-list-item">
                        <div class="v2-list-content">
                            <div class="v2-list-title">${r}</div>
                        </div>
                        <div class="v2-list-actions">
                            <button class="v2-btn v2-btn-sm" onclick="cineBackupsView.restore('${o}')">Restore</button>
                            <button class="v2-btn v2-btn-sm v2-btn-danger" onclick="cineBackupsView.delete('${o}')">Delete</button>
                        </div>
                    </li>
                `}a+="</ul>",t.innerHTML=a}catch(n){t.innerHTML=`<div class="v2-error-state">Failed to load backups: ${n.message}</div>`}},async restore(e){if(confirm(`Are you sure you want to restore ${e}? This will overwrite current data.`))try{const t=await je.restoreSnapshot(e),{data:n,meta:a}=$n(t),o=e.replace(/\.json$/i,""),r=a&&a.docId||n&&n.id||o;if(!n){alert("Unknown backup format.");return}const i=a?{...a,lock:null}:null,s=await In.saveProject(r,n,i);if(!s||s.success===!1){const l=s&&s.error==="PROJECT_LOCKED"?"This project is locked by another session.":"Unknown error.";alert(`Restore failed. ${l}`);return}alert("Project restored successfully!")}catch(t){alert("Failed to restore: "+t.message)}},async delete(e){confirm(`Delete ${e}?`)&&(await je.deleteSnapshot(e),this.render())}};window.cineBackupsView=Sn;const ii=Object.freeze(Object.defineProperty({__proto__:null,cineBackupsView:Sn},Symbol.toStringTag,{value:"Module"}));export{Ct as V};
//# sourceMappingURL=v2-ui-czcGWvey.js.map
