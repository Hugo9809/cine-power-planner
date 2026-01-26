const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./main-BAsE-KKD.js","./core-modules-nwKhU9-4.js","./vendor-BnBlqqbr.js","./data-So-wGb1N.js","./main-A_PeDQch.css","./rules-view-H7Qqifg_.css","./contacts-QKDXsRfU.css","./settings-CeVW_oVS.css","./owned-gear-D1_apNqb.css"])))=>i.map(i=>d[i]);
import{_ as O,p as te,d as He,u as Gn,s as Jt}from"./core-modules-nwKhU9-4.js";import{d as Kn}from"./data-So-wGb1N.js";const I=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};let Ot=!1,le=!1;const qe="cine_use_v2_ui";function Un(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2")){const t=e.get("v2")==="true";return localStorage.setItem(qe,t.toString()),t}return localStorage.getItem(qe)==="true"}catch{return!1}}function Wn(){const e=localStorage.getItem("darkMode")==="true";document.body.classList.toggle("dark-mode",e);const t=localStorage.getItem("cameraPowerPlanner_pinkMode")==="true"||localStorage.getItem("pinkMode")==="true";document.body.classList.toggle("pink-mode",t)}function St(){try{localStorage.setItem(qe,"true"),le=!0,document.body.classList.add("v2-mode"),Wn();const e=document.getElementById("topBar"),t=document.getElementById("mainContent"),n=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),o=document.getElementById("cineGlobalLoadingIndicator");o&&(o.style.display="none"),e&&(e.style.display="none"),t&&(t.style.display="none"),n&&(n.style.display="none"),a&&(a.style.display="none");const i=document.getElementById("siteFooter");i&&(i.style.display="none");const s=document.getElementById("installPromptBanner"),r=document.getElementById("offlineIndicator"),l=document.getElementById("backupNotificationContainer");s&&(s.style.display="none"),r&&(r.style.display="none"),l&&(l.style.display="none");const v=document.getElementById("v2-app");if(v&&(v.style.display="",v.setAttribute("aria-hidden","false")),I.cineProjectDetail&&typeof I.cineProjectDetail.init=="function"&&I.cineProjectDetail.init(),I.cineProjectDashboard&&typeof I.cineProjectDashboard.init=="function"){const y=typeof I.cineProjectDashboard.createUiOnlyDataProvider=="function"?I.cineProjectDashboard.createUiOnlyDataProvider():null;I.cineProjectDashboard.init({dataProvider:y})}return I.cineV2Sidebar&&typeof I.cineV2Sidebar.init=="function"&&I.cineV2Sidebar.init(),I.cineViewManager&&typeof I.cineViewManager.enableV2=="function"&&I.cineViewManager.enableV2(),Zn(),rt(),console.log("[V2 Bootstrap] V2 UI enabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to enable V2:",e),rt(),!1}}function Yn(){let e=document.getElementById("v2-loader");e||(e=document.createElement("div"),e.id="v2-loader",e.innerHTML=`
                <div class="v2-loader-content">
                    <div class="v2-spinner"></div>
                    <div class="v2-loader-text">Loading Cine Power Planner...</div>
                </div>
            `,document.body.appendChild(e)),e.classList.add("visible")}function rt(){const e=document.getElementById("v2-loader");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},500))}function Lt(){try{localStorage.setItem(qe,"false"),le=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("topBar"),t=document.getElementById("mainContent"),n=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),o=document.getElementById("siteFooter");e&&(e.style.display=""),t&&(t.style.display=""),n&&(n.style.display=""),a&&(a.style.display=""),o&&(o.style.display="");const i=document.getElementById("v2-app");return i&&(i.style.display="none",i.setAttribute("aria-hidden","true")),I.cineViewManager&&typeof I.cineViewManager.disableV2=="function"&&I.cineViewManager.disableV2(),console.log("[V2 Bootstrap] V2 UI disabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to disable V2:",e),!1}}function Zn(){const e=document.getElementById("v2ExitBtn");e&&!e.dataset.bound&&(e.dataset.bound="true",e.addEventListener("click",()=>{Lt(),window.location.reload()}))}function Qt(){return le?Lt():St()}async function en(){try{return console.log("[V2 Bootstrap] Loading V2 assets via Vite dynamic imports..."),await O(()=>import("./main-BAsE-KKD.js").then(e=>e.i),__vite__mapDeps([0,1,2,3,4]),import.meta.url),await O(()=>Promise.resolve({}),__vite__mapDeps([5]),import.meta.url),await O(()=>Promise.resolve({}),__vite__mapDeps([6]),import.meta.url),await O(()=>Promise.resolve({}),__vite__mapDeps([7]),import.meta.url),await O(()=>Promise.resolve({}),__vite__mapDeps([8]),import.meta.url),console.log("[V2 Bootstrap] V2 CSS loaded"),await O(()=>Promise.resolve().then(()=>ua),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>pa),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>Ca),void 0,import.meta.url),await O(()=>import("./auto-gear-rules-DS0lYD-U.js"),[],import.meta.url),await O(()=>Promise.resolve().then(()=>Ha),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>eo),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>to),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>li),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>di),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>ui),void 0,import.meta.url),await O(()=>import("./core-modules-nwKhU9-4.js").then(e=>e.t),__vite__mapDeps([1,2]),import.meta.url),await O(()=>import("./own-gear-CSm93DJ1.js"),[],import.meta.url),await O(()=>Promise.resolve().then(()=>vi),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>mi),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>gi),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>fi),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>bi),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>yi),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>Pi),void 0,import.meta.url),await O(()=>Promise.resolve().then(()=>Mi),void 0,import.meta.url),window.cineBackupsView&&typeof window.cineBackupsView.init=="function"&&window.cineBackupsView.init(),console.log("[V2 Bootstrap] V2 JS modules loaded"),I.cineV2SidebarView&&typeof I.cineV2SidebarView.mount=="function"&&I.cineV2SidebarView.mount(),I.cineV2Sidebar&&typeof I.cineV2Sidebar.init=="function"&&I.cineV2Sidebar.init(),I.cineRulesView&&typeof I.cineRulesView.init=="function"&&I.cineRulesView.init(),I.cineV2DeviceLibrary&&typeof I.cineV2DeviceLibrary.init=="function"&&I.cineV2DeviceLibrary.init(),I.cineContactsView&&typeof I.cineContactsView.init=="function"&&I.cineContactsView.init(),I.cineSettingsView&&typeof I.cineSettingsView.init=="function"&&I.cineSettingsView.init(),I.cineOwnGearView&&typeof I.cineOwnGearView.init=="function"&&I.cineOwnGearView.init(),I.cineHelpView&&typeof I.cineHelpView.init=="function"&&I.cineHelpView.init(),!0}catch(e){return console.error("[V2 Bootstrap] Failed to load V2 assets:",e),!1}}async function Xn(){if(Ot){console.warn("[V2 Bootstrap] Already initialized");return}Ot=!0,le=Un(),console.log(`[V2 Bootstrap] Starting. V2 enabled: ${le}`),le&&(Yn(),await en()?St():rt()),Jn(),console.log("[V2 Bootstrap] Initialization complete")}function Jn(){if(document.getElementById("v2ToggleBtn"))return;const e=document.getElementById("settingsDialog");if(!e)return;const t=e.querySelector(".modal-content, .settings-content, .modal-surface");if(!t)return;const n=document.createElement("div");n.className="settings-row v2-toggle-section",n.style.cssText="margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;";const a=document.createElement("label");a.textContent="Experimental UI",a.style.cssText="font-weight: 600; display: block; margin-bottom: 8px;";const o=document.createElement("p");o.textContent="Try the new V2 interface design. This is experimental and can be toggled off at any time.",o.style.cssText="font-size: 0.875rem; color: #666; margin-bottom: 12px;";const i=document.createElement("button");i.id="v2ToggleBtn",i.type="button",i.className="v2-btn v2-btn-secondary",i.style.cssText="padding: 8px 16px; border-radius: 6px; cursor: pointer; background: #4a90d9; color: white; border: none;",i.textContent=le?"Return to Classic UI":"Try New UI",i.addEventListener("click",()=>{Qt(),i.textContent=le?"Return to Classic UI":"Try New UI",window.location.reload()}),n.appendChild(a),n.appendChild(o),n.appendChild(i),t.appendChild(n)}const qt={init:Xn,enableV2:St,disableV2:Lt,toggleV2:Qt,isV2Enabled:()=>le,loadV2Assets:en};typeof globalThis<"u"?globalThis.cineV2Bootstrap=qt:typeof window<"u"&&(window.cineV2Bootstrap=qt);const Qn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},ea=".app-view",Nt="active",kt="projects",Te={projects:{id:"view-projects",title:"Projects",pattern:/^#?\/?projects?\/?$/i},projectDetail:{id:"view-project-detail",title:"Project",pattern:/^#?\/?project\/([^/]+)(\/([a-z]+))?\/?$/i},settings:{id:"view-settings",title:"Settings",pattern:/^#?\/?settings?\/?$/i},contacts:{id:"view-contacts",title:"Contacts",pattern:/^#?\/?contacts?\/?$/i},devices:{id:"view-devices",title:"Device Library",pattern:/^#?\/?devices?\/?$/i},help:{id:"view-help",title:"Help",pattern:/^#?\/?help\/?$/i},rules:{id:"view-rules",title:"Auto Gear Rules",pattern:/^#?\/?rules\/?$/i},ownGear:{id:"view-own-gear",title:"Owned Gear",pattern:/^#?\/?own-gear\/?$/i},backups:{id:"view-backups",title:"Cloud Backups",pattern:/^#?\/?backups\/?$/i}};let ie=null,st={},he=[],Ct=!1;const lt={};function ta(e,t){if(!Te[e]){console.warn(`[ViewManager] Cannot register handlers for unknown view: ${e}`);return}lt[e]=t}function It(){return document.querySelector(".v2-app")||document.getElementById("v2-app")}function na(){const e=It();return e?Array.from(e.querySelectorAll(ea)):[]}function aa(e){return document.getElementById(e)}function Ne(e,t={}){const n=Te[e];if(!n)return console.warn(`[ViewManager] Unknown view: ${e}`),!1;const a=aa(n.id);if(!a)return console.warn(`[ViewManager] View element not found: ${n.id}`),!1;if(ie&&ie!==e){const i=lt[ie];if(i&&typeof i.onLeave=="function")try{i.onLeave()}catch(s){console.error(`[ViewManager] Error in onLeave for ${ie}:`,s)}}na().forEach(i=>{i.classList.remove(Nt)}),a.classList.add(Nt),ie&&ie!==e&&he.push({view:ie,params:st}),ie=e,st=t,sa(e,t),la(e,t),ca(n.title,t);const o=lt[e];if(o&&typeof o.onEnter=="function")try{o.onEnter(t)}catch(i){console.error(`[ViewManager] Error in onEnter for ${e}:`,i)}return!0}function oa(){if(he.length>0){const e=he.pop();return Ne(e.view,e.params),!0}return Ne(kt),!1}function ia(){return ie}function ra(){return{...st}}function sa(e,t){let n="";switch(e){case"projects":n="#/projects";break;case"projectDetail":n=`#/project/${encodeURIComponent(t.projectId||"new")}`,t.tab&&(n+=`/${t.tab}`);break;case"settings":n="#/settings";break;case"contacts":n="#/contacts";break;case"devices":n="#/devices";break;case"help":n="#/help";break;case"rules":n="#/rules";break;case"ownGear":n="#/own-gear";break;default:Te[e]?e==="ownGear"?n="#/own-gear":n=`#/${e}`:n="#/projects"}window.location.hash!==n&&history.replaceState(null,"",n)}function tn(){const e=window.location.hash||"#/projects";for(const[t,n]of Object.entries(Te)){const a=e.match(n.pattern);if(a){const o={};return t==="projectDetail"&&a[1]&&(o.projectId=decodeURIComponent(a[1]),a[3]&&(o.tab=a[3])),{viewName:t,params:o}}}return{viewName:kt,params:{}}}function nn(){const{viewName:e,params:t}=tn();Ne(e,t)}function la(e,t){const n=new CustomEvent("v2:viewchange",{bubbles:!0,detail:{view:e,params:t,previousView:he.length>0?he[he.length-1]:null}});document.dispatchEvent(n)}function ca(e,t){let n=e;t.projectId&&t.projectId!=="new"&&(n=`${t.projectId} - ${e}`),document.title=`${n} | Cine Power Planner`}function an(){try{return localStorage.getItem("cine_use_v2_ui")==="true"}catch{return!1}}function on(){try{localStorage.setItem("cine_use_v2_ui","true"),Ct=!0,document.body.classList.add("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="none");const t=It();return t&&(t.style.display=""),nn(),!0}catch(e){return console.error("[ViewManager] Failed to enable V2 UI:",e),!1}}function rn(){try{localStorage.setItem("cine_use_v2_ui","false"),Ct=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="");const t=It();return t&&(t.style.display="none"),!0}catch(e){return console.error("[ViewManager] Failed to disable V2 UI:",e),!1}}function da(){return Ct?rn():on()}function ct(){window.addEventListener("hashchange",nn),an()&&Qn.cineV2Bootstrap,console.log("[ViewManager] Initialized")}const dt={showView:Ne,goBack:oa,getCurrentView:ia,getCurrentParams:ra,registerView:ta,parseHash:tn,isV2Enabled:an,enableV2:on,disableV2:rn,toggleV2:da,init:ct,VIEWS:Te,DEFAULT_VIEW:kt};typeof globalThis<"u"?globalThis.cineViewManager=dt:typeof window<"u"&&(window.cineViewManager=dt);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ct):ct());const ua=Object.freeze(Object.defineProperty({__proto__:null,ViewManager:dt},Symbol.toStringTag,{value:"Module"})),et=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},sn=["contactsViewTitle","rulesViewTitle","ownGearViewTitle","deviceLibraryTitle","buttonAddContact","buttonAddRule","buttonAddGearItem"];function xt(){if(!et.texts||!et.texts.en)return console.warn("[V2 Translations] Main translation system not loaded"),!1;const e=sn.filter(t=>!(t in et.texts.en));return e.length>0?(console.warn("[V2 Translations] Missing keys:",e),!1):(console.log("[V2 Translations] All V2 keys verified"),!0)}const ln=xt(),va={verifyV2Translations:xt,isReady:ln},pa=Object.freeze(Object.defineProperty({__proto__:null,V2_REQUIRED_KEYS:sn,default:va,isReady:ln,verifyV2Translations:xt},Symbol.toStringTag,{value:"Module"})),J=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Pt={project:["setupSelect","setupName","saveSetupBtn","deleteSetupBtn"],devices:["cameraSelect","monitorSelect","videoSelect","motor1Select","motor2Select","motor3Select","motor4Select","controller1Select","controller2Select","controller3Select","controller4Select","distanceSelect","batteryPlateSelect","batterySelect","batteryHotswapSelect"],hidden:["cageSelect"],power:["heroCard","heroTotalDraw","heroAvailablePower","heroRuntime","heroCurrent144","heroCurrent12","heroBatteryCount","breakdownList","pinWarning","dtapWarning","hotswapWarning"],outputs:["projectRequirementsOutput","gearListOutput","batteryTable","powerDiagram"]},cn=Object.values(Pt).flat();let ee=null,Fe=!0,De=new Map;function dn(){return ee||(ee=document.getElementById("v2-legacy-context"),ee||(ee=document.createElement("div"),ee.id="v2-legacy-context",ee.setAttribute("aria-hidden","true"),ee.style.cssText="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);",document.body.appendChild(ee)),ee)}function ma(e){const t=document.getElementById(e);return t?(dn().appendChild(t),t):(console.warn(`[LegacyShim] Element not found: ${e}`),null)}function un(e,t){if(!Fe)return;const n=document.getElementById(e),a=document.getElementById(t);!n||!a||(a.value=n.value,me(a,"change"))}function vn(e,t){if(!Fe)return;const n=document.getElementById(e),a=document.getElementById(t);!n||!a||(a.value=n.value,me(a,"input"))}function pn(e,t){const n=document.getElementById(e),a=document.getElementById(t);!n||!a||(Fe=!1,a.value=n.value,Fe=!0)}function me(e,t,n={}){if(!e)return;const a=new Event(t,{bubbles:!0,cancelable:!0,...n});e.dispatchEvent(a)}function $t(e){const t=document.getElementById(e);return t?(me(t,"click"),!0):(console.warn(`[LegacyShim] Cannot trigger click, element not found: ${e}`),!1)}async function ga(e){const t=document.getElementById("setupSelect");if(!t)return console.error("[LegacyShim] setupSelect not found"),!1;let n=Array.from(t.options).find(a=>a.value===e);if(!n){let a=null;if(J.cineProjectService)try{a=await J.cineProjectService.getProject(e)}catch(i){console.warn("[LegacyShim] IDB lookup failed",i)}if(a)return console.log(`[LegacyShim] Hydrating native project: ${e}`),n=document.createElement("option"),n.value=e,n.textContent=e,t.appendChild(n),t.value=e,typeof window.populateProjectForm=="function"&&window.populateProjectForm(a),typeof window.updateCalculations=="function"&&window.updateCalculations(),!0;if(gn().includes(e))console.log(`[LegacyShim] Creating missing option for legacy project: ${e}`),n=document.createElement("option"),n.value=e,n.textContent=e,t.appendChild(n);else return console.warn(`[LegacyShim] Project not found in storage: ${e}`),!1}return t.value=e,me(t,"change"),!0}function mn(){return $t("saveSetupBtn")}function fa(){return $t("deleteSetupBtn")}function ba(e){const t=document.getElementById("setupSelect"),n=document.getElementById("setupName");return!t||!n?(console.error("[LegacyShim] Project elements not found"),!1):(t.value="",me(t,"change"),n.value=e,me(n,"input"),mn())}function gn(){if(J.cineStorage&&typeof J.cineStorage.getProjectMemoryCache=="function")try{const t=J.cineStorage.getProjectMemoryCache();if(t){const n=[];if(Object.keys(t).forEach(a=>{if(a.includes("cameraPowerPlanner_prj_")){const o=a.split("cameraPowerPlanner_prj_");o.length>1&&o[1]&&n.push(o[1])}if(a.includes("cameraPowerPlanner_setups")&&!a.includes("backup")){const o=t[a];o&&typeof o=="object"&&Object.keys(o).forEach(i=>{i&&!i.startsWith("auto-backup-")&&n.push(i)})}}),n.length>0)return[...new Set(n)]}}catch(t){console.warn("[LegacyShim] cineStorage cache check failed:",t)}if(typeof window.getSetups=="function")try{const t=window.getSetups()||{},n=Object.keys(t).filter(a=>a&&!a.startsWith("auto-backup-"));if(n.length>0)return n}catch(t){console.warn("[LegacyShim] getSetups failed:",t)}const e=document.getElementById("setupSelect");if(e&&e.options.length>1){const t=Array.from(e.options).map(n=>n.value).filter(n=>n!=="");if(t.length>0)return[...new Set(t)]}try{const t=localStorage.getItem("cameraPowerPlanner_setups");if(t){const n=JSON.parse(t);if(n&&typeof n=="object")return Object.keys(n).filter(a=>a&&!a.startsWith("auto-backup-"))}}catch(t){console.warn("[LegacyShim] localStorage fallback failed:",t)}return[]}function ya(e,t){const n=document.getElementById(e);return n?(n.value=t,me(n,"change"),!0):(console.warn(`[LegacyShim] Device element not found: ${e}`),!1)}function ha(e){const t=document.getElementById(e);return t?t.value:null}function wa(){const e={};return Pt.devices.forEach(t=>{const n=document.getElementById(t);n&&(e[t]=n.value)}),e}function Ea(e,t){const n=document.getElementById(e);if(!n)return;const a=()=>un(e,t);n.addEventListener("change",a),De.set(`${e}:change`,{element:n,handler:a})}function Sa(e,t){const n=document.getElementById(e);if(!n)return;const a=()=>vn(e,t);n.addEventListener("input",a),De.set(`${e}:input`,{element:n,handler:a})}function La(e,t){const n=document.getElementById(e);if(!n)return;const a=()=>pn(e,t);n.addEventListener("change",a),De.set(`${e}:legacy:change`,{element:n,handler:a})}function ka(){De.forEach(({element:e,handler:t},n)=>{const a=n.split(":")[1];e.removeEventListener(a,t)}),De.clear()}function fn(){const e=[],t=[];return cn.forEach(n=>{document.getElementById(n)?t.push(n):e.push(n)}),e.length>0&&console.warn("[LegacyShim] Missing critical IDs:",e),{found:t,missing:e}}async function bn(){if(J.cineProjectService)try{const e=localStorage.getItem("cameraPowerPlanner_setups");if(!e)return;const t=JSON.parse(e),n=document.getElementById("setupSelect"),a=n?n.value:null;a&&t[a]&&(console.log(`[LegacyShim] Reverse Sync: Saving ${a} to Native IDB`),await J.cineProjectService.saveProject(a,t[a]))}catch(e){console.warn("[LegacyShim] Reverse Sync failed",e)}}function ut(){if(document.body&&document.body.dataset&&document.body.dataset.shimInitialized)return;document.body&&(document.body.dataset.shimInitialized="true"),console.log("[LegacyShim] Initializing...");const{missing:e}=fn();e.length>0&&console.warn("[LegacyShim] Missing elements:",e);const t=document.getElementById("saveSetupBtn");t&&(console.log("[LegacyShim] Hooking Save Button for Reverse Sync"),t.addEventListener("click",()=>{setTimeout(()=>bn(),200)}));const n=document.getElementById("deleteSetupBtn");n&&(console.log("[LegacyShim] Hooking Delete Button for Reverse Sync"),n.addEventListener("click",()=>{const o=document.getElementById("setupSelect"),i=o?o.value:null;i&&setTimeout(async()=>{const s=localStorage.getItem("cameraPowerPlanner_setups");s&&(JSON.parse(s)[i]||(console.log(`[LegacyShim] Reverse Sync: Deleting ${i} from Native IDB`),J.cineProjectService&&await J.cineProjectService.deleteProject(i)))},500)}));const a=document.getElementById("shareSetupBtn");a&&t&&(console.log("[LegacyShim] Hooking Share Button for Pre-Export Save"),a.addEventListener("click",()=>{console.log("[LegacyShim] Pre-Share: Triggering Save to ensure memory consistency"),t.click()},!0))}const We={ensureLegacyContainer:dn,shimToLegacyContainer:ma,syncSelectValue:un,syncInputValue:vn,syncToV2:pn,syncLegacyToNative:bn,dispatchNativeEvent:me,triggerLegacyClick:$t,loadProject:ga,saveProject:mn,deleteProject:fa,createProject:ba,getProjectNames:gn,setDeviceValue:ya,getDeviceValue:ha,getDeviceSnapshot:wa,bindV2Select:Ea,bindV2Input:Sa,listenLegacyChanges:La,verifyLegacyIds:fn,cleanup:ka,init:ut,CRITICAL_IDS:Pt,ALL_CRITICAL_IDS:cn};typeof J<"u"&&(J.cineLegacyShim=We);typeof window<"u"&&(window.cineLegacyShim=We);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ut):ut());typeof module<"u"&&module.exports&&(module.exports=We);const Ca=Object.freeze(Object.defineProperty({__proto__:null,LegacyShim:We},Symbol.toStringTag,{value:"Module"})),M=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},yn="projectGrid",Ie="view-projects",be="cameraPowerPlanner_setups",ve=["blue","green","orange","purple","red","pink","teal","indigo","yellow","amber","lime","emerald","cyan","sky","violet","fuchsia","rose","slate","stone","neutral","gold","crimson","navy","aquamarine"],Ia=["📽️","🎬","⚡","🔋","🎥","📺","💡","🎞️","📸","🎯","📝","⭐","🐴","🦄","🤘","🦊","🐶","🦖","🐙","🐉","👽","👻","🤖","💀","👾","🤡","🎉","🔥","✨","🚀","🍕","🤙","✌️","💪"];let ze=!1,Be={query:""},X=null;function Dt(){return{loadProjectMetadata:()=>(console.warn("[V2] Synchronous metadata load requested - this is a legacy pattern. Using empty default."),{}),async getProjectNames(){const e=await te.getProjectNames();let t=[];if(M.cineLegacyShim&&typeof M.cineLegacyShim.getProjectNames=="function")t=M.cineLegacyShim.getProjectNames();else try{const n=localStorage.getItem(be);n&&(t=Object.keys(JSON.parse(n)))}catch(n){console.warn("[Dashboard] Failed to read legacy storage:",n)}return[...new Set([...e,...t])].filter(n=>n&&!n.startsWith("auto-backup-"))},async getProjectMetadata(e){let t=await te.getProjectMetadata(e);if(!t||Object.keys(t).length===0)try{const n=localStorage.getItem(be);if(n){const a=JSON.parse(n);if(a[e])return a[e]}}catch(n){console.warn("[Dashboard] Failed to read legacy project metadata:",n)}return t},async loadProject(e){let t=await te.getProject(e);if(!t)try{const n=localStorage.getItem(be);if(n){const a=JSON.parse(n);if(a[e])return a[e]}}catch(n){console.warn("[Dashboard] Failed to fallback load legacy project:",n)}return t},async saveProject(e,t){return await te.saveProject(e,t)},async updateProjectMetadata(e,t={}){let n=await te.getProject(e);if(!n)try{const a=localStorage.getItem(be);a&&(n=JSON.parse(a)[e])}catch(a){console.warn("[Dashboard] Failed to read legacy project for update:",a)}return n?(t.color&&(n.color=t.color),t.icon&&(n.icon=t.icon),t.prepDays&&(n.prepDays=t.prepDays),t.shootingDays&&(n.shootingDays=t.shootingDays),t.returnDays&&(n.returnDays=t.returnDays),typeof t.archived<"u"&&(n.archived=t.archived),t.status&&(n.status=t.status),{success:await te.saveProject(e,n),lastModified:n.lastModified}):{success:!1}},async deleteProject(e){await te.deleteProject(e);try{const t=localStorage.getItem(be);if(t){const n=JSON.parse(t);n[e]&&(delete n[e],localStorage.setItem(be,JSON.stringify(n)))}}catch(t){console.warn("[Dashboard] Failed to delete legacy project:",t)}return!0},async duplicateProject(e){return await te.duplicateProject(e)},renameProject:()=>({success:!1}),async createProject(e){return await te.createProject(e)}}}function ge(){return Dt()}function xa(){return Dt()}function vt(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function xe(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function Oe(e){if(!e||typeof e!="string")return"";const t=e.split(" to ");return t.length===1?xe(t[0]):t.length===2?`${xe(t[0])} - ${xe(t[1])}`:e}function V(e,t={}){const n=document.documentElement.lang||"en";let a=window.texts&&window.texts[n]?window.texts[n]:null;!a&&window.texts&&(a=window.texts.en);const o=(s,r)=>r.split(".").reduce((l,v)=>l?l[v]:null,s);let i=a?o(a,e):null;if(!i&&n!=="en"&&window.texts&&window.texts.en&&(i=o(window.texts.en,e)),!i)return e;if(typeof i=="string")for(const[s,r]of Object.entries(t))i=i.replace(`{${s}}`,r);return i}async function Se(){const e=ge();let t=e.loadProjectMetadata();if(t&&Object.keys(t).length>0){X=t;return}try{const n=await e.getProjectNames(),a={};await Promise.all(n.map(async o=>{if(o&&!o.startsWith("auto-backup-")){const i=await e.getProjectMetadata(o);a[o]=i||{lastModified:Date.now()}}})),X=a}catch(n){console.error("[Dashboard] Failed to refresh project cache:",n),X={}}}function Ye(){return X?Object.keys(X).filter(e=>e&&!e.startsWith("auto-backup-")):[]}function Pa(){let e=Ye();if(e=e.filter(t=>!!!hn(t).archived),Be.query){const t=Be.query.toLowerCase();e=e.filter(n=>n.toLowerCase().includes(t))}return[...new Set(e)]}function hn(e){X===null&&Se();const t=X[e];return t?{lastModified:t.lastModified||null,color:t.color||null,icon:t.icon||null,prepDays:t.prepDays||[],shootingDays:t.shootingDays||[],returnDays:t.returnDays||[],archived:t.archived||!1,status:t.status||(t.archived?"Archived":"Planning")}:{lastModified:null,color:null,icon:null,prepDays:[],shootingDays:[],returnDays:[],archived:!1,status:"Planning"}}function Bt(e,t={}){const a=ge().updateProjectMetadata(e,t);if(a&&a.success){if(X){X[e]||(X[e]={});const o={...t};a.lastModified&&(o.lastModified=a.lastModified),Object.assign(X[e],o)}return!0}return!1}function $a(e,t){const n=hn(e);let a=n.color||ve[t%ve.length];ve.includes(a)||(a=ve[t%ve.length]);const o=vt(n.icon||"📽️"),i=n.lastModified?xe(n.lastModified):"",s=vt(e),r=n.status||"Planning",l=r.toLowerCase().replace(/\s+/g,"-");let v=r.toLowerCase().replace(/\s+/g,"");v==="waitingforapproval"&&(v="waitingForApproval");const y=V(`v2.dashboard.status.${v}`)===`v2.dashboard.status.${v}`?r:V(`v2.dashboard.status.${v}`);let E="";return(n.prepDays?.length>0||n.shootingDays?.length>0||n.returnDays?.length>0)&&(E='<div class="v2-tile-periods">',Array.isArray(n.prepDays)&&n.prepDays.forEach(u=>{const c=Oe(u);c&&(E+=`<span class="v2-period-badge prep" title="${V("v2.dashboard.projectTile.prep")} ${c}"><span class="period-icon">📅</span> ${c}</span>`)}),Array.isArray(n.shootingDays)&&n.shootingDays.forEach(u=>{const c=Oe(u);c&&(E+=`<span class="v2-period-badge shoot" title="${V("v2.dashboard.projectTile.shoot")} ${c}"><span class="period-icon">🎥</span> ${c}</span>`)}),Array.isArray(n.returnDays)&&n.returnDays.forEach(u=>{const c=Oe(u);c&&(E+=`<span class="v2-period-badge return" title="${V("v2.dashboard.projectTile.return")} ${c}"><span class="period-icon">🚛</span> ${c}</span>`)}),E+="</div>"),`
      <div class="v2-project-tile" data-project="${s}" tabindex="0" role="button" aria-label="${V("v2.dashboard.projectTile.actionsFor",{project:s})}">
        <div class="v2-tile-header">
          <div class="v2-tile-icon color-${a}">${o}</div>
            <div class="v2-tile-info">
            <h3 class="v2-tile-title">${s}</h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                 ${i?`<span class="v2-tile-meta">${i}</span>`:""}
                 <span class="v2-status-badge ${l}">${y}</span>
            </div>
            ${E}
          </div>
          <div class="v2-tile-actions">
            <button type="button" class="v2-tile-action-btn" data-action="menu" data-project="${s}" title="${V("v2.dashboard.projectTile.moreOptions")}" aria-label="${V("v2.dashboard.projectTile.actionsFor",{project:s})}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `}function Da(){return`
      <div class="v2-project-tile new-project" id="v2CreateProjectTile" tabindex="0" role="button" aria-label="${V("v2.dashboard.newProject")}">
        <div class="v2-tile-header center">
          <div class="v2-tile-icon-add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="v2-tile-title">${V("v2.dashboard.newProject")}</h3>
        </div>
      </div>
    `}function Ba(e){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 48px; display: flex; align-items: center; justify-content: center;">🔍</div>
        <h2>${V("v2.dashboard.search.noResults.title")}</h2>
        <p class="text-muted">${V("v2.dashboard.search.noResults.subtitle",{query:vt(e)})}</p>
        <button id="v2ClearSearchBtn" class="v2-btn-secondary">
          ${V("v2.dashboard.search.clear")}
        </button>
      </div>
    `}async function oe(e=!1){M.cineProjectLockManager&&M.cineProjectLockManager.releaseLock();const t=document.getElementById(yn);t&&(e&&(t.innerHTML='<div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--v2-text-secondary);">Loading projects...</div>'),await Se(),Ta(t))}function Ta(e){if(e.innerHTML="",e.className="v2-project-grid",e.style="",Ye().length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const i=e.closest(".v2-main");i&&i.classList.add("align-top"),e.innerHTML=_a(),Ma(e);return}const n=Pa();if(n.length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const i=e.closest(".v2-main");i&&i.classList.add("align-top"),e.innerHTML=Ba(Be.query);const s=e.querySelector("#v2ClearSearchBtn");s&&s.addEventListener("click",()=>{const r=document.getElementById("v2SidebarSearchInput");r&&(r.value="",r.dispatchEvent(new Event("input",{bubbles:!0})))});return}const a=e.closest(".v2-main");a&&a.classList.remove("align-top");let o="";n.forEach((i,s)=>{o+=$a(i,s)}),Be.query||(o+=Da()),e.innerHTML=o,Va(e)}function Aa(){window.addEventListener("v2:search",e=>{Be.query=e.detail?.query||"",oe()})}function Va(e){e.querySelectorAll(".v2-project-tile").forEach(n=>{n.addEventListener("click",a=>{if(a.target.closest('[data-action="menu"]'))return;const o=n.dataset.project;o&&Ge(o)}),n.addEventListener("contextmenu",a=>{a.preventDefault();const o=n.dataset.project;o&&Ft(a,o)}),n.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),n.click())})}),e.querySelectorAll('[data-action="menu"]').forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation();const o=n.dataset.project;o&&Ft(a,o)})});const t=e.querySelector("#v2CreateProjectTile");t&&(t.addEventListener("click",()=>pt()),t.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),pt())}))}function Ft(e,t){ne();const n=document.createElement("div");n.className="v2-context-menu",n.innerHTML=`
            <button class="v2-context-menu-item" data-action="open">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                ${V("v2.dashboard.contextMenu.open")}
            </button>
            <button class="v2-context-menu-item" data-action="edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                ${V("v2.dashboard.contextMenu.rename")}
            </button>
            <button class="v2-context-menu-item" data-action="print">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                ${V("v2.dashboard.contextMenu.print")}
            </button>
            <button class="v2-context-menu-item" data-action="duplicate">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                ${V("v2.dashboard.contextMenu.duplicate")}
            </button>
            <button class="v2-context-menu-item" data-action="archive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                ${V("v2.dashboard.contextMenu.archive")}
            </button>
             <div style="height: 1px; background: var(--v2-border-default); margin: 4px 0;"></div>
            <button class="v2-context-menu-item danger" data-action="delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                ${V("v2.dashboard.contextMenu.delete")}
            </button>
        `,n.style.left=`${e.clientX}px`,n.style.top=`${e.clientY}px`,n.querySelector('[data-action="open"]').addEventListener("click",()=>{Ge(t),ne()}),n.querySelector('[data-action="edit"]').addEventListener("click",()=>{ne(),pt(t)}),n.querySelector('[data-action="print"]').addEventListener("click",()=>{Ge(t,{action:"print"}),ne()}),n.querySelector('[data-action="duplicate"]').addEventListener("click",()=>{Ra(t),ne()}),n.querySelector('[data-action="archive"]').addEventListener("click",()=>{ja(t),ne()}),n.querySelector('[data-action="delete"]').addEventListener("click",async()=>{await wn(t),ne()}),document.body.appendChild(n);const a=n.getBoundingClientRect();a.right>window.innerWidth&&(n.style.left=`${window.innerWidth-a.width-10}px`),a.bottom>window.innerHeight&&(n.style.top=`${window.innerHeight-a.height-10}px`),setTimeout(()=>{document.addEventListener("click",ne,{once:!0}),document.addEventListener("contextmenu",ne,{once:!0})},0)}function ne(){const e=document.querySelector(".v2-context-menu");e&&e.remove(),document.removeEventListener("click",ne)}function Ma(e){const t=e.querySelector("#v2EmptyStateCreateBtn");t&&t.addEventListener("click",()=>Ze())}async function Ge(e,t={}){if(M.cineProjectLockManager&&!await M.cineProjectLockManager.requestLock(e)){alert(V("v2.dashboard.projectLocked",{projectName:e}));return}M.cineLegacyShim&&M.cineLegacyShim.loadProject(e),M.cineViewManager&&M.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera",...t})}function _a(){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 64px; opacity: 0.8; margin-bottom: 16px;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h2>${V("v2.dashboard.emptyState.title")}</h2>
        <p class="text-muted">${V("v2.dashboard.emptyState.subtitle")}</p>
        <div class="v2-empty-actions">
            <button id="v2EmptyStateCreateBtn" class="v2-btn-primary">
              + ${V("v2.dashboard.newProject")}
            </button>
            <p class="v2-help-link-container">
                <a href="#/help" class="v2-link-subtle">${V("v2.dashboard.emptyState.help")}</a>
            </p>
        </div>
      </div>
    `}async function wn(e){if(confirm(V("v2.dashboard.confirmDelete",{project:e})||`Are you sure you want to delete project "${e}"?`))try{await ge().deleteProject(e)&&(Tt(),Se()),M.cineLegacyShim&&typeof M.cineLegacyShim.deleteProject=="function"&&typeof M.cineLegacyShim.refreshProjects=="function"&&M.cineLegacyShim.refreshProjects(),oe()}catch(t){console.error("[V2] Failed to delete project:",t),alert(V("v2.common.error")||"An error occurred.")}}function ja(e){Bt(e,{archived:!0,status:"Archived"}),oe()}function Ra(e){const n=ge().duplicateProject(e);n&&n.success&&(Tt(),Se(),oe(),M.cineLegacyShim&&typeof M.cineLegacyShim.refreshProjects=="function"&&M.cineLegacyShim.refreshProjects())}function pt(e=null){Ze(e)}function Ze(e=null){const t=!!e,n=Math.floor(Math.random()*ve.length);let a=ve[n],o="📽️",i=null;t&&(Se(),i=ge().getProjectMetadata(e),i&&(i.color&&(a=i.color),i.icon&&(o=i.icon)));let s=[];if(t&&i){let L=1;const N=(m,h,P)=>{if(!m)return;let R="",T="";m.includes(" to ")?[R,T]=m.split(" to "):(R=m,T=m),s.push({id:`period-${L++}`,type:h,name:P,startDate:R,endDate:T})};Array.isArray(i.prepDays)&&i.prepDays.forEach(m=>N(m,"prep","Prep")),Array.isArray(i.shootingDays)&&i.shootingDays.forEach(m=>N(m,"shoot","Shoot")),Array.isArray(i.returnDays)&&i.returnDays.forEach(m=>N(m,"return","Return"))}!t&&s.length===0&&(s=[{id:"period-1",type:"prep",name:"Prep",startDate:"",endDate:""},{id:"period-2",type:"shoot",name:"Shoot",startDate:"",endDate:""},{id:"period-3",type:"return",name:"Return",startDate:"",endDate:""}]);let r=s.length>0?s.length:3;const l=[{value:"prep",label:"Prep",icon:"📅"},{value:"shoot",label:"Shoot",icon:"🎥"},{value:"return",label:"Return",icon:"🚛"}],v=L=>`var(--v2-color-${L})`,y=ve.map(L=>`
            <button type="button" class="v2-color-swatch-sm color-${L} ${L===a?"selected":""}" 
                    data-color="${L}" aria-label="Select ${L} color">
            </button>
        `).join(""),E=Ia.map(L=>`
            <button type="button" class="v2-icon-option-sm ${L===o?"selected":""}" 
                    data-icon="${L}" aria-label="Select icon ${L}">
                ${L}
            </button>
        `).join(""),w=()=>s.length===0?'<div class="v2-empty-state" style="padding: 16px; font-size: 13px;">No dates added yet.</div>':s.map(L=>{const N=l.map(m=>`<option value="${m.value}" ${L.type===m.value?"selected":""}>${m.icon} ${m.label}</option>`).join("");return`
                <div class="v2-period-row" data-period-id="${L.id}">
                    <div class="v2-period-name">
                        <select class="v2-period-type-select" data-field="type">
                            ${N}
                        </select>
                    </div>
                    <input type="date" class="v2-date-input" value="${L.startDate}" data-field="startDate" aria-label="${L.name} Start Date">
                    <span class="v2-date-separator">to</span>
                    <input type="date" class="v2-date-input" value="${L.endDate}" data-field="endDate" aria-label="${L.name} End Date">
                    <button type="button" class="v2-period-remove" data-period-id="${L.id}" aria-label="Remove period">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `}).join(""),u=document.createElement("div");u.className="v2-modal-backdrop",u.innerHTML=`
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
                                <span class="v2-picker-preview" id="v2ColorPreview" style="background-color: ${v(a)};"></span>
                                <span class="v2-picker-label">${a.charAt(0).toUpperCase()+a.slice(1)}</span>
                                <svg class="v2-picker-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="v2-picker-popover" id="v2ColorPopover">
                                <div class="v2-picker-popover-grid">
                                    ${y}
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
                                    ${E}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Project Periods -->
                    <div style="margin-bottom: var(--v2-space-md);">
                        <label class="v2-form-section-label">Project Roadmap</label>
                        <div class="v2-periods-container" id="v2PeriodsContainer">
                            ${w()}
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
        `,document.body.appendChild(u),requestAnimationFrame(()=>{u.classList.add("open")});const c=u.querySelector("#v2NewProjectName"),d=u.querySelector("#v2NewProjectError"),p=u.querySelector("#v2CreateProjectBtn"),b=u.querySelector("#v2CancelProjectBtn"),f=u.querySelector(".v2-modal-close"),g=u.querySelector("#v2PeriodsContainer"),S=u.querySelector("#v2AddPeriodBtn"),C=u.querySelector("#v2ColorPickerTrigger"),$=u.querySelector("#v2ColorPopover"),_=u.querySelector("#v2ColorPreview"),A=C.querySelector(".v2-picker-label");C.addEventListener("click",L=>{L.stopPropagation(),C.classList.toggle("open"),$.classList.toggle("open"),F.classList.remove("open"),x.classList.remove("open")}),$.querySelectorAll(".v2-color-swatch-sm").forEach(L=>{L.addEventListener("click",N=>{N.stopPropagation(),$.querySelectorAll(".v2-color-swatch-sm").forEach(m=>m.classList.remove("selected")),L.classList.add("selected"),a=L.dataset.color,_.style.backgroundColor=v(a),A.textContent=a.charAt(0).toUpperCase()+a.slice(1),C.classList.remove("open"),$.classList.remove("open")})});const F=u.querySelector("#v2IconPickerTrigger"),x=u.querySelector("#v2IconPopover"),Q=u.querySelector("#v2IconPreview");F.addEventListener("click",L=>{L.stopPropagation(),F.classList.toggle("open"),x.classList.toggle("open"),C.classList.remove("open"),$.classList.remove("open")}),x.querySelectorAll(".v2-icon-option-sm").forEach(L=>{L.addEventListener("click",N=>{N.stopPropagation(),x.querySelectorAll(".v2-icon-option-sm").forEach(m=>m.classList.remove("selected")),L.classList.add("selected"),o=L.dataset.icon,Q.textContent=o,F.classList.remove("open"),x.classList.remove("open")})}),u.addEventListener("click",()=>{C.classList.remove("open"),$.classList.remove("open"),F.classList.remove("open"),x.classList.remove("open")});function D(L,N,m){const h=s.find(P=>P.id===L);if(h)if(N==="type"){const P=l.find(R=>R.value===m);P&&(h.type=m,h.name=P.label)}else h[N]=m}function j(L){s=s.filter(N=>N.id!==L),W()}function G(){r++,s.push({id:`period-${r}`,type:"shoot",name:"Shoot",startDate:"",endDate:""}),W()}function W(){g.innerHTML=w(),U()}function U(){g.querySelectorAll(".v2-period-row").forEach(L=>{const N=L.dataset.periodId;L.querySelectorAll("input, select").forEach(h=>{h.addEventListener("change",()=>{D(N,h.dataset.field,h.value)}),h.addEventListener("input",()=>{D(N,h.dataset.field,h.value)})});const m=L.querySelector(".v2-period-remove");m&&m.addEventListener("click",()=>{j(N)})})}U(),S.addEventListener("click",G),t||setTimeout(()=>c.focus(),100);function de(){u.classList.remove("open"),setTimeout(()=>u.remove(),200)}async function Ae(){const L=c.value.trim();if(!L){d.textContent="Please enter a project name.",d.style.display="block",c.focus();return}const N=Ye();if(t){if(L!==e&&N.includes(L)){d.textContent="A project with this name already exists.",d.style.display="block",c.focus();return}}else if(N.includes(L)){d.textContent="A project with this name already exists.",d.style.display="block",c.focus();return}p.disabled=!0,p.textContent=t?"Saving...":"Creating...";const m=H=>{if(!H)return null;const z=H.startDate,K=H.endDate;return!z&&!K?null:z&&K?`${z} to ${K}`:z||K||null},h=s.filter(H=>H.type==="prep").map(m).filter(Boolean),P=s.filter(H=>H.type==="shoot").map(m).filter(Boolean),R=s.filter(H=>H.type==="return").map(m).filter(Boolean),T={color:a,icon:o,prepDays:h,shootingDays:P,returnDays:R};if(t){if(L!==e){const z=ge().renameProject(e,L,T);if(z&&z.success){Tt(),Se();const K=document.getElementById("setupSelect");K&&K.value,oe(),M.cineLegacyShim&&typeof M.cineLegacyShim.refreshProjects=="function"&&M.cineLegacyShim.refreshProjects()}}else Bt(L,T),oe();de()}else await En(L,T),de()}p.addEventListener("click",Ae),b.addEventListener("click",de),f.addEventListener("click",de),u.addEventListener("click",L=>{L.target===u&&de()}),c.addEventListener("keydown",L=>{L.key==="Enter"&&Ae(),L.key==="Escape"&&de()}),c.addEventListener("input",()=>{d.style.display="none"})}typeof M<"u"&&(M.cineProjectService=te);async function En(e,t={}){return await ge().createProject(e)?(Bt(e,t),oe(),M.cineViewManager&&M.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera"}),!0):!1}function Tt(){try{const e="cameraPowerPlanner_project_rev",t=parseInt(localStorage.getItem(e)||"0",10);localStorage.setItem(e,(t+1).toString())}catch(e){console.error("[V2] Failed to update project revision:",e)}}function Sn(){if(document.getElementById(Ie))return document.getElementById(Ie);const e=document.createElement("section");e.id=Ie,e.className="app-view",e.innerHTML=`
      <header class="view-header">
        <button class="v2-mobile-menu-toggle" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1>${V("v2.dashboard.header.title")}</h1>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-secondary" id="v2HeaderImportBtn" style="margin-right: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            ${V("v2.dashboard.actions.importProject")}
          </button>
          <button type="button" class="v2-btn v2-btn-primary" id="v2HeaderCreateBtn">
            + ${V("v2.dashboard.actions.newProject")}
          </button>
        </div>
      </header>
      <div class="view-content">
        <div class="v2-project-grid" id="${yn}">
          <!-- Tiles will be rendered here -->
        </div>
      </div>
    `;const t=e.querySelector("#v2HeaderCreateBtn");return t&&t.addEventListener("click",Ze),e}function mt(e={}){if(ze){console.warn("[ProjectDashboard] Already initialized, skipping.");return}ze=!0,e.dataProvider&&(e.dataProvider,X=null),console.log("[ProjectDashboard] init() called");const t=Sn(),n=document.querySelector(".v2-main");n&&!document.getElementById(Ie)&&n.appendChild(t),document.addEventListener("click",o=>{o.target&&(o.target.closest("#v2HeaderCreateBtn")?Ze():o.target.closest("#v2HeaderImportBtn")&&M.cineLegacyShim&&M.cineLegacyShim.triggerLegacyClick("applySharedLinkBtn"))});const a=document.querySelector(".v2-view.active");a&&a.id===Ie&&oe(!0),window.addEventListener("v2:viewchange",o=>{o.detail.view==="projects"&&oe(!0)}),Aa()}const At={init:mt,renderProjectGrid:oe,createProject:En,deleteProject:wn,openProject:Ge,getProjectNames:Ye,createDashboardView:Sn,formatDate:xe,formatDateRange:Oe,createDefaultDataProvider:Dt,createUiOnlyDataProvider:xa};typeof M<"u"&&(M.cineProjectDashboard=At);typeof window<"u"&&(window.cineProjectDashboard=At);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{ze||(console.log("[ProjectDashboard] Auto-initializing (Fallback)"),mt())},200)}):setTimeout(()=>{ze||(console.log("[ProjectDashboard] Auto-initializing (Fallback)"),mt())},200));const Ha=Object.freeze(Object.defineProperty({__proto__:null,ProjectDashboard:At},Symbol.toStringTag,{value:"Module"})),k=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Pe="view-project-detail",gt="cameraPowerPlanner_setups",Oa=["camera","power","requirements","kit"],qa="camera";let ae=null,Ln=qa,zt=!1,Z=null;function Ke(e){if(!Oa.includes(e)){console.warn(`[ProjectDetail] Invalid tab: ${e}`);return}Ln=e,document.querySelectorAll("#view-project-detail .v2-tab-btn").forEach(a=>{const o=a.dataset.tab===e;a.classList.toggle("active",o),a.setAttribute("aria-selected",o?"true":"false")}),document.querySelectorAll("#view-project-detail .v2-tab-pane").forEach(a=>{const o=a.id===`tab-${e}`;a.classList.toggle("active",o),a.hidden=!o}),document.dispatchEvent(new CustomEvent("v2:tabchange",{detail:{tab:e,project:ae}})),e==="power"&&setTimeout(()=>$n(),10)}function kn(){return Ln}function tt(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function nt(e){if(!e||typeof e!="string")return"";const t=e.split(" to ");return t.length===1?tt(t[0]):t.length===2?`${tt(t[0])} - ${tt(t[1])}`:e}function B(e,t={}){const n=document.documentElement.lang||"en";let a=window.texts&&window.texts[n]?window.texts[n]:null;!a&&window.texts&&(a=window.texts.en);const o=(s,r)=>r.split(".").reduce((l,v)=>l?l[v]:null,s);let i=a?o(a,e):null;if(!i&&n!=="en"&&window.texts&&window.texts.en&&(i=o(window.texts.en,e)),!i)return e;if(typeof i=="string")for(const[s,r]of Object.entries(t))i=i.replace(`{${s}}`,r);return i}function Vt(){if(k.cineStorage&&typeof k.cineStorage.getProjectMemoryCache=="function")try{const e=k.cineStorage.getProjectMemoryCache();if(e){Z={},Object.keys(e).forEach(t=>{let n=t;if(t.includes("cameraPowerPlanner_prj_")){const a=t.split("cameraPowerPlanner_prj_");a.length>1&&a[1]&&(n=a[1])}Z[n]=e[t]}),console.log("[ProjectDetail] Cache refreshed from cineStorage. Keys:",Object.keys(Z).length);return}}catch(e){console.warn("[ProjectDetail] Failed to read from cineStorage cache:",e)}try{const e=localStorage.getItem(gt);e?Z=JSON.parse(e):Z={}}catch(e){console.error("[ProjectDetail] Failed to parse project data:",e),Z={}}}function Cn(e){if(Z===null&&Vt(),Z&&Z[e]){const t=Z[e];return{prepDays:t.prepDays||[],shootingDays:t.shootingDays||[],returnDays:t.returnDays||[],status:t.status||(t.archived?"Archived":"Planning")}}return{prepDays:[],shootingDays:[],returnDays:[],status:"Planning"}}function In(e,t){try{Vt();const n=Z||{};if(n&&n[e]){n[e].status=t,t==="Archived"?n[e].archived=!0:n[e].archived=!1;const a=B("v2.detail.errors.statusUpdateFailed");let o=!1;if(k.cineStorage&&typeof k.cineStorage.saveProject=="function")k.cineStorage.saveProject(e,n[e]),o=!0;else if(typeof k.saveProject=="function")k.saveProject(e,n[e]),o=!0;else if(typeof k.resolveSafeLocalStorage=="function"){const i=k.resolveSafeLocalStorage();i&&(i.setItem(gt,JSON.stringify(n)),o=!0)}else k.cineStorage&&typeof k.cineStorage.safeSetLocalStorage=="function"&&(k.cineStorage.safeSetLocalStorage(gt,JSON.stringify(n)),o=!0);return o?(Z=n,!0):(alert(a),!1)}}catch(n){console.error("[ProjectDetail] Failed to update status:",n),alert(B("v2.detail.errors.statusUpdateFailed"))}return!1}async function xn(e){if(!e)return console.warn("[ProjectDetail] No project name provided"),!1;Vt(),ae=e;const t=document.getElementById("v2ProjectName");t&&(t.textContent=e),k.cineLegacyShim&&await k.cineLegacyShim.loadProject(e);const n=Cn(e),a=document.getElementById("v2ProjectPeriods"),o=document.getElementById("v2ProjectStatus");if(o){o.value=n.status,ft(o);const i=o.parentNode,s=i?o.cloneNode(!0):o;i&&i.replaceChild(s,o),s.addEventListener("change",r=>{const l=r.target.value;In(e,l),ft(s)})}if(a){let i="";Array.isArray(n.prepDays)&&n.prepDays.forEach(s=>{const r=nt(s);r&&(i+=`<span class="v2-header-badge prep" title="Prep Dates: ${r}"><span class="period-icon">📅</span> ${r}</span>`)}),Array.isArray(n.shootingDays)&&n.shootingDays.forEach(s=>{const r=nt(s);r&&(i+=`<span class="v2-header-badge shoot" title="Shooting Dates: ${r}"><span class="period-icon">🎥</span> ${r}</span>`)}),Array.isArray(n.returnDays)&&n.returnDays.forEach(s=>{const r=nt(s);r&&(i+=`<span class="v2-header-badge return" title="Return Dates: ${r}"><span class="period-icon">🚛</span> ${r}</span>`)}),a.innerHTML=i,a.style.display=i?"flex":"none"}return console.log(`[ProjectDetail] Loaded project: ${e}`),!0}function Na(){return ae}function Fa(){k.cineViewManager&&k.cineViewManager.showView("projects")}function za(){if(document.getElementById(Pe))return document.getElementById(Pe);const e=document.createElement("section");e.id=Pe,e.className="app-view";const t=document.querySelector(".v2-main");return t&&t.appendChild(e),e}function Pn(){const e=za();e&&(e.innerHTML=`
      <header class="view-header view-header-with-back">
        <button type="button" class="v2-back-btn" id="v2BackToProjects" aria-label="${B("v2.detail.backButton")}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>${B("v2.detail.backButton")}</span>
        </button>
        <h1 id="v2ProjectName" class="view-header-title">Project</h1>
        <div class="v2-header-status">
            <select id="v2ProjectStatus" class="v2-status-select">
                <option value="Draft">${B("v2.dashboard.status.draft")}</option>
                <option value="Planning">${B("v2.dashboard.status.planning")}</option>
                <option value="Waiting for Approval">${B("v2.dashboard.status.waitingForApproval")}</option>
                <option value="Approved">${B("v2.dashboard.status.approved")}</option>
                <option value="Shooting">${B("v2.dashboard.status.shooting")}</option>
                <option value="Completed">${B("v2.dashboard.status.completed")}</option>
                <option value="Archived">${B("v2.dashboard.status.archived")}</option>
            </select>
        </div>
        <div id="v2ProjectPeriods" class="v2-header-periods" style="display: none;"></div>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-ghost" id="v2PrintProjectBtn" title="${B("v2.detail.header.print")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateReqsGearBtn" title="${B("v2.detail.header.generateReqs")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${B("v2.detail.header.generateReqs")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2ExportProjectBtn" title="${B("v2.detail.header.export")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
               <polyline points="16 6 12 2 8 6"/>
               <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span class="v2-btn-label">${B("v2.detail.header.export")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateOverviewBtn" title="${B("v2.detail.header.generateOverview")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${B("v2.detail.header.generateOverview")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-secondary" id="v2SaveProjectBtn">
            ${B("v2.detail.header.save")}
          </button>
        </div>
      </header>


      
      <!-- Tab Navigation (Sticky Top) -->
      <nav class="v2-tabs-nav" role="tablist" aria-label="Project sections">
        <button type="button" class="v2-tab-btn active" data-tab="camera" role="tab" aria-selected="true" aria-controls="tab-camera">
          ${B("v2.detail.tabs.cameraPackage")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="power" role="tab" aria-selected="false" aria-controls="tab-power">
          ${B("v2.detail.tabs.powerSummary")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="requirements" role="tab" aria-selected="false" aria-controls="tab-requirements">
          ${B("v2.detail.tabs.requirements")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="kit" role="tab" aria-selected="false" aria-controls="tab-kit">
          ${B("v2.detail.tabs.gearList")}
        </button>
      </nav>

      <div class="view-content">
        <!-- Tab Content -->
        <div class="v2-tab-content" style="padding-top: var(--v2-space-lg);">
          <!-- Camera Package Tab -->
          <section id="tab-camera" class="v2-tab-pane active" role="tabpanel" aria-labelledby="tab-camera-btn">
            ${Ga()}
          </section>
          
          <!-- Power Summary Tab -->
          <section id="tab-power" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-power-btn" hidden>
            ${Ua()}
          </section>
          
          <!-- Requirements Tab -->
          <section id="tab-requirements" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-requirements-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${B("v2.detail.actions.projectRequirements")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateRequirementsBtn">
                  ${B("v2.detail.actions.generateRequirements")}
                </button>
              </div>
              <div class="v2-card-body" id="v2RequirementsContainer">
                <p class="v2-text-muted">${B("v2.detail.actions.generateRequirementsHelp")}</p>
                <div data-reparent="projectForm"></div>
                <div id="v2RequirementsOutput" class="v2-requirements-output" style="margin-top: var(--v2-space-md);"></div>
              </div>
            </div>
          </section>
          
          <!-- Gear List Tab -->
          <section id="tab-kit" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-kit-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${B("v2.detail.actions.gearList")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateGearListBtn">
                  ${B("v2.detail.actions.generateGearList")}
                </button>
              </div>
              <div class="v2-card-body" id="v2KitListContainer">
                <p class="v2-text-muted">${B("v2.detail.actions.generateGearListHelp")}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `,Wa(e),setTimeout(()=>Ka(e),0))}function Ga(){return`
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
    `}function Ka(e){e.querySelectorAll("[data-reparent]").forEach(n=>{const a=n.dataset.reparent,o=document.getElementById(a);if(o){const i=o.tagName.toLowerCase();["select","input","textarea"].includes(i)?(o.style.display="block",o.classList.add("v2-"+i),o.style.width="100%",o.style.height="",o.style.minHeight=""):i==="form"&&(o.style.display="block",o.style.position="static",o.style.visibility="visible",o.style.width="100%",o.classList.add("v2-reparented-form")),o.style.whiteSpace="";const s=o.closest(".select-wrapper"),r=s||o;s&&(s.classList.add("v2-select-container"),s.style.width="100%"),n.parentNode.replaceChild(r,n)}else console.warn(`[ProjectDetail] Legacy element not found: ${a}`),n.innerHTML='<span class="v2-error-text">Element missing</span>'})}function Ua(){return`
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
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomOut" title="${B("v2.detail.diagram.zoomOut")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ResetView" title="${B("v2.detail.diagram.resetView")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomIn" title="${B("v2.detail.diagram.zoomIn")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <div class="v2-vr"></div>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2DownloadDiagram" title="${B("v2.detail.diagram.download")}">
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
    `}function Wa(e){const t=e.querySelector("#v2BackToProjects");t&&t.addEventListener("click",Fa);const n=e.querySelector("#v2PrintProjectBtn");n&&n.addEventListener("click",()=>{if(confirm('Do you want to set the project status to "Waiting for Approval"?')){In(ae,"Waiting for Approval");const w=document.getElementById("v2ProjectStatus");w&&(w.value="Waiting for Approval",ft(w))}if(console.log("[ProjectDetail] Triggering Print/Export"),typeof window.openLegacyPrintDialog=="function"){window.openLegacyPrintDialog();return}k.cineFeaturePrint&&typeof k.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?k.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof k.triggerOverviewPrintWorkflow=="function"?k.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()});const a=e.querySelector("#v2SaveProjectBtn");a&&a.addEventListener("click",()=>{if(k.cineLegacyShim&&ae){const w=document.getElementById("saveSetupBtn");w&&w.click()}});function o(){if(!ae)return;const w=Cn(ae);let u={};k.getCurrentProjectInfo&&typeof k.getCurrentProjectInfo=="function"?u=k.getCurrentProjectInfo():u={projectName:ae};const c=Object.assign({},u,{prepDays:w.prepDays||[],shootingDays:w.shootingDays||[],returnDays:w.returnDays||[],projectName:ae});k.populateProjectForm&&typeof k.populateProjectForm=="function"?k.populateProjectForm(c):console.warn("[ProjectDetail] populateProjectForm not found"),Ke("requirements");const d=document.getElementById("tab-requirements");d&&d.scrollIntoView({behavior:"smooth"})}const i=e.querySelector("#v2GenerateReqsGearBtn");i&&i.addEventListener("click",()=>{o()});const s=e.querySelector("#v2ExportProjectBtn");s&&s.addEventListener("click",()=>{const w=document.getElementById("shareSetupBtn");w&&w.click()});const r=e.querySelector("#v2GenerateOverviewBtn");r&&r.addEventListener("click",()=>{const w=document.getElementById("generateOverviewBtn");w&&w.click()});const l=e.querySelector("#v2GenerateRequirementsBtn");l&&(l.innerHTML='<i class="fas fa-save"></i> Save & Generate Gear List',l.addEventListener("click",()=>{let w={};k.collectProjectFormData&&typeof k.collectProjectFormData=="function"?w=k.collectProjectFormData():console.warn("[ProjectDetail] collectProjectFormData not found");let u="";if(k.generateGearListHtml&&typeof k.generateGearListHtml=="function")u=k.generateGearListHtml(w);else{alert("Error: Generator module not found.");return}if(k.getSafeGearListHtmlSections&&typeof k.getSafeGearListHtmlSections=="function"){const c=k.getSafeGearListHtmlSections(u),d=document.getElementById("v2RequirementsOutput");d&&(c.projectHtml?(d.innerHTML=c.projectHtml,d.style.display="block"):d.style.display="none");const p=document.getElementById("v2KitListContainer");p&&c.gearHtml?p.innerHTML=c.gearHtml:p&&(p.innerHTML='<p class="v2-text-muted">No gear list items generated.</p>'),alert("Requirements Saved & Gear List Generated!")}}));const v=e.querySelector("#v2GenerateGearListBtn");v&&v.addEventListener("click",()=>{o()}),e.querySelectorAll(".v2-tab-btn").forEach(w=>{w.addEventListener("click",()=>{const u=w.dataset.tab;Ke(u)})});const E=e.querySelector("#v2DownloadDiagram");E&&E.addEventListener("click",w=>{const u=document.getElementById("downloadDiagram");if(u){const c=new MouseEvent("click",{bubbles:!0,cancelable:!0,shiftKey:w.shiftKey});u.dispatchEvent(c)}else console.warn("[ProjectDetail] Legacy download button not found")}),setTimeout(()=>Qa(e),0)}function $n(){if(!ae)return;if(!k.cineFeaturesConnectionDiagram||typeof k.cineFeaturesConnectionDiagram.createConnectionDiagram!="function"){console.warn("[ProjectDetail] Connection Diagram module not found.");return}if(!document.getElementById("v2-diagram-area"))return;console.log("[ProjectDetail] Rendering Power Diagram...");const n={getSetupDiagramContainer:()=>document.getElementById("v2-diagram-area"),getDiagramLegend:()=>document.getElementById("v2-diagram-legend"),getDiagramHint:()=>document.getElementById("v2-diagram-hint"),getDownloadDiagramBtn:()=>document.getElementById("v2DownloadDiagram"),getZoomInBtn:()=>document.getElementById("v2ZoomIn"),getZoomOutBtn:()=>document.getElementById("v2ZoomOut"),getResetViewBtn:()=>document.getElementById("v2ResetView"),getDiagramDetailDialog:()=>{const a=document.getElementById("diagramDetailDialog");return a&&a.closest("#mainContent")&&document.body.appendChild(a),a},getDiagramDetailContent:()=>document.getElementById("diagramDetailDialogContent")};if(!document.getElementById("v2-diagram-css")){const a=typeof k.cineFeaturesConnectionDiagram.getDiagramCss=="function"?k.cineFeaturesConnectionDiagram.getDiagramCss(!1):"";if(a){const o=document.createElement("style");o.id="v2-diagram-css",o.textContent=a,document.head.appendChild(o)}}try{k.cineFeaturesConnectionDiagram.createConnectionDiagram(n)}catch(a){console.error("[ProjectDetail] Error rendering diagram:",a)}}function ft(e){const n=e.value.toLowerCase().replace(/\s+/g,"-");e.classList.remove("draft","planning","waiting-for-approval","approved","shooting","completed","archived"),e.classList.add(n)}function Mt(){const e={heroTotalDraw:"v2TotalDraw",heroRuntime:"v2Runtime",heroBatteryCount:"v2BatteryCount",heroCurrent144:"v2Current144",heroCurrent12:"v2Current12"};Object.keys(e).forEach(t=>{const n=document.getElementById(t),a=document.getElementById(e[t]);n&&a&&(a.textContent=n.textContent)}),kn()==="power"&&setTimeout(()=>$n(),50)}function Ya(){const e=document.getElementById("results");if(!e){console.warn("[ProjectDetail] Legacy results container not found. Auto-sync disabled.");return}new MutationObserver(()=>{Mt()}).observe(e,{childList:!0,subtree:!0,characterData:!0}),console.log("[ProjectDetail] Power observer started")}function Za(){if(!zt){if(zt=!0,Ya(),Mt(),document.addEventListener("v2:viewchange",Gt),k.cineViewManager&&typeof k.cineViewManager.getCurrentView=="function"&&k.cineViewManager.getCurrentView()==="projectDetail"){const t=k.cineViewManager.getCurrentParams?k.cineViewManager.getCurrentParams():{};t&&t.projectId&&(console.log("[ProjectDetail] Already on projectDetail, triggering render"),Gt({detail:{view:"projectDetail",params:t}}))}console.log("[ProjectDetail] Initialized")}}async function Gt(e){const{view:t,params:n}=e.detail||{};if(t==="projectDetail"&&n&&n.projectId){console.log("[ProjectDetail] View change detected, loading:",n.projectId);const a=document.getElementById(Pe);if(!a){console.warn("[ProjectDetail] View element not found:",Pe);return}a.querySelector(".view-header")||Pn(),await xn(n.projectId),n.tab&&Ke(n.tab),n.action==="print"&&(console.log("[ProjectDetail] Auto-triggering print workflow"),setTimeout(()=>{k.cineFeaturePrint&&typeof k.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?k.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof k.triggerOverviewPrintWorkflow=="function"?k.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()},800))}}function Xa(e){return typeof e!="string"?"":e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}function Ja(e){const t=k.texts?k.texts[e]:null;if(!t){console.warn(`[ProjectDetail] Translation key not found: ${e}`);return}const n=Xa(t);console.log(`[ProjectDetail] Triggering Add Custom for: ${t} (${n})`);const a=document.querySelector(`[data-gear-custom-add="${n}"]`);a?a.click():(console.warn(`[ProjectDetail] Legacy Add Button not found for slug: ${n}`),alert(`Could not open Add Custom dialog for ${t}. Legacy element missing.`))}function Qa(e){[{cardId:"v2-camera-card",key:"category_cameras"},{cardId:"v2-power-card",key:"category_batteries"}].forEach(({cardId:n,key:a})=>{const o=e.querySelector(`#${n}`);if(!o)return;const i=o.querySelector(".v2-card-header");if(!i||i.querySelector(".v2-add-custom-btn"))return;const s=document.createElement("button");s.type="button",s.className="v2-btn v2-btn-sm v2-btn-ghost v2-add-custom-btn",s.title="Add Custom Item",s.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `,s.addEventListener("click",r=>{r.stopPropagation(),Ja(a)}),i.appendChild(s)})}const _t={init:Za,createDetailViewContent:Pn,loadProject:xn,getCurrentProject:Na,switchTab:Ke,getCurrentTab:kn,syncLegacyResultsToV2:Mt};typeof k<"u"&&(k.cineProjectDetail=_t);typeof window<"u"&&(window.cineProjectDetail=_t);const eo=Object.freeze(Object.defineProperty({__proto__:null,ProjectDetail:_t},Symbol.toStringTag,{value:"Module"}));(function(e){const t=`
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
    `;function n(){const i=document.getElementById("v2-app");if(!i)return!1;if(i.querySelector(".v2-sidebar"))return!0;const s=i.querySelector(".v2-main"),r=document.createElement("template");return r.innerHTML=t.trim(),s?i.insertBefore(r.content,s):i.appendChild(r.content),!0}function a(){n()||document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",()=>{n()},{once:!0})}const o={mount:a};e.cineV2SidebarView=o,typeof window<"u"&&(window.cineV2SidebarView=o)})(typeof globalThis<"u"?globalThis:window);const to=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));function no(){return typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof self<"u"?self:typeof global<"u"?global:{}}const Ce=no();function ao(e){return typeof cineModuleBase=="object"&&cineModuleBase?cineModuleBase:e&&typeof e.cineModuleBase=="object"?e.cineModuleBase:null}const re=ao(Ce),oo=re&&typeof re.safeWarn=="function"?re.safeWarn:function(t,n){typeof console>"u"||!console||typeof console.warn!="function"||(typeof n>"u"?console.warn(t):console.warn(t,n))},io=/[\u200B\u200C\u200D\u2060]/g,ro=/[\u0009-\u000D\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g,so=/[\u0300-\u036F]/g,lo=/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g,co=/[\u2018\u2019\u201A\u201B\u2032\u2035]/g,uo=/[\u201C\u201D\u201E\u201F\u2033\u2036]/g,vo=/[\u2044\u2215]/g,po=/[×✕✖✗✘]/g,mo=/[°º˚]/g,go=/[\u2026]/g,fo=/[\u00AE\u2122]/g,bo=/[!#$%()*,:;<=>?@[\]^{|}~._]/g,yo=/[″‶‴⁗]/g,ho=/[′‵]/g,Xe=String.raw`\d+(?:\s*[.,/-]\s*\d+)*(?:\s+\d+(?:\s*[.,/-]\s*\d+)*)*`,wo=new RegExp(String.raw`(${Xe})[\s-]*(?:feet|foot|ft\.?)(?![a-z])`,"gi"),Eo=new RegExp(String.raw`(${Xe})\s*['’](?=\s|[\d"”″'-]|$)`,"g"),So=new RegExp(String.raw`(${Xe})[\s-]*(?:inches|inch|in\.?)(?![a-z])`,"gi"),Lo=new RegExp(String.raw`(${Xe})\s*["”″](?=\s|[\d'’"-]|$)`,"g");function je(e){return typeof e=="string"?e.replace(/\s+/g," ").trim():e}function Dn(e){if(typeof e!="string"||!e)return e;let t=e.replace(yo,'"').replace(ho,"'");return t=t.replace(wo,(n,a)=>{const o=je(a);return o?`${o} ft `:a}),t=t.replace(Eo,(n,a)=>{const o=je(a);return o?`${o} ft `:a}),t=t.replace(So,(n,a)=>{const o=je(a);return o?`${o} inch `:a}),t=t.replace(Lo,(n,a)=>{const o=je(a);return o?`${o} inch `:a}),t}const bt=[["ß","ss"],["æ","ae"],["œ","oe"],["ø","o"],["þ","th"],["ð","d"],["đ","d"],["ħ","h"],["ı","i"],["ĳ","ij"],["ŋ","ng"],["ł","l"],["ſ","s"]],ko=bt.map(e=>new RegExp(e[0],"g"));function Co(e){if(typeof e!="string")return"";let t=e.replace(io,"");if(typeof t.normalize=="function")try{t=t.normalize("NFKD")}catch{}t=t.toLowerCase(),t=Dn(t),t=t.replace(ro," ").replace(co," ").replace(uo," ").replace(lo," ").replace(vo," ").replace(po," x ").replace(mo," deg ").replace(/\bdegrees?\b/gi," deg ").replace(/&/g," and ").replace(/\+/g," plus ").replace(/@/g," at ").replace(fo," ").replace(go," ").replace(bo," "),t=t.replace(so,"");for(let n=0;n<bt.length;n+=1){const a=bt[n],o=ko[n];t=t.replace(o,a[1])}return t=t.replace(/['"`]/g," ").replace(/\s+/g," ").trim(),t}const we=Object.freeze({normalizeMeasurementUnits:Dn,normalizeSearchValue:Co});if(re)if(re.registerOrQueueModule("cine.features.featureSearchNormalization",we,{category:"features",description:"Shared normalization helpers for feature search, including measurement units and punctuation folding.",replace:!0,connections:["cineModuleBase","cineModuleContext","cineUi"]},e=>oo("Unable to register cine.features.featureSearchNormalization module.",e),Ce,re.getModuleRegistry&&re.getModuleRegistry(Ce)),typeof re.exposeGlobal=="function")re.exposeGlobal("cineFeaturesFeatureSearchNormalization",we,Ce,{configurable:!0,enumerable:!1,writable:!1});else try{Ce.cineFeaturesFeatureSearchNormalization=we}catch{}const Kt="cine_use_v2_search",Io=40,Bn=[],Ut={cameras:"Cameras",monitors:"Monitors",video:"Video",fiz:"FIZ",batteries:"Batteries",batteryHotswaps:"Battery Hot Swap",carts:"Carts",wirelessReceivers:"Wireless",audio:"Audio",lights:"Lights",gimbals:"Gimbals",drones:"Drones",actionCameras:"Action Cameras",accessories:"Accessories",viewfinders:"Viewfinders",directorMonitors:"Director Monitors",iosVideo:"iOS Video",videoAssist:"Video Assist",media:"Media",lenses:"Lenses",filterOptions:"Filters",recordingMediaBrands:"Recording Media Brands",recordingMediaSizes:"Recording Media Sizes",gearList:"Gear List"},xo=we&&typeof we.normalizeSearchValue=="function"?we:{normalizeSearchValue:e=>typeof e=="string"?e.trim().toLowerCase():""},ce=e=>xo.normalizeSearchValue(e||""),yt=e=>ce(e).split(" ").map(t=>t.trim()).filter(Boolean);function Po(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2Search")){const n=e.get("v2Search")==="true";return localStorage.setItem(Kt,n.toString()),n}const t=localStorage.getItem(Kt);return t===null?!0:t==="true"}catch{return!0}}function $o(){return(Array.isArray(window.featureSearchEntries)?window.featureSearchEntries:Bn).map(t=>{const n=t?.optionLabel||t?.display||t?.label||"",a=t?.detail||t?.value?.detail||"",o=t?.display||n,i=t?.key||ce(o),s=t?.type||t?.entryType||t?.value?.type||"feature",r=[n,a,o].filter(Boolean).join(" ");return{key:`legacy:${i}`,legacyKey:t?.key||null,type:s,label:n,display:o,detail:a,keywords:r,legacyEntry:t,legacyQuery:o||n}})}function Do(e){const t=[];if(!e||typeof e!="object")return t;const n=(o,i,s)=>{if(!o)return;const r=[o,s,i].filter(Boolean).join(" ");t.push({key:`device:${ce(o)}:${ce(i)}`,type:"device",label:o,display:o,detail:s?`Device · ${s}`:"Device",keywords:r,legacyQuery:o})},a=(o,i,s)=>{!i||typeof i!="object"||Object.keys(i).forEach(r=>{!r||r==="accessories"||n(r,o,s)})};return Object.entries(e).forEach(([o,i])=>{const s=Ut[o]||o;if(o==="accessories"&&i&&typeof i=="object"){Object.entries(i).forEach(([r,l])=>{const v=Ut[r]||r,y=`${s} · ${v}`;a(`accessories:${r}`,l,y)});return}a(o,i,s)}),t}function Bo(){const e=[],t=new Map,n=a=>{if(!a||!a.label)return;const o=ce(a.label);if(!o)return;const i=`label:${o}`,s=ce(a.keywords||""),r=new Set([...yt(a.label),...yt(a.keywords||"")]),l={...a,normalizedLabel:o,normalizedKeywords:s,tokens:r};t.has(l.key)||e.push(l),t.set(l.key,l),a.legacyKey&&t.set(`legacyKey:${a.legacyKey}`,l),t.has(i)||t.set(i,l)};return $o().forEach(n),Do(Kn).forEach(n),{entries:e,index:t}}function To(){const e=Array.isArray(window.featureSearchEntries)?window.featureSearchEntries:Bn;return{ref:e,length:e.length}}function Ao({buildIndex:e=Bo,getSnapshot:t=To}={}){let n=e(),a=t(),o=!1;return{getIndexState:()=>n,refreshIfStale:()=>{const l=t(),v=l.ref!==a.ref,y=l.length!==a.length;(o||v||y)&&(n=e(),a=l,o=!1)},markStale:()=>{o=!0}}}function Vo(e){const t=Array.isArray(window.featureSearchDefaultOptions)?window.featureSearchDefaultOptions:[];if(!t.length)return[];const n=[],a=new Set;return t.forEach(o=>{if(!o)return;const i=o.entryKey?`legacyKey:${o.entryKey}`:null,s=o.label||o.value||"",r=s?`label:${ce(s)}`:null,l=i&&e.get(i)||r&&e.get(r);l&&!a.has(l.key)&&(n.push(l),a.add(l.key))}),n}function Mo(e,t,n){if(!e||!t)return 0;if(e.normalizedLabel===t)return 1e3;if(e.normalizedLabel.startsWith(t))return 820;if(e.normalizedLabel.includes(t))return 650;let a=0;if(e.normalizedKeywords.includes(t)&&(a+=120),n.length){let o=0;n.forEach(i=>{e.tokens.has(i)&&(o+=1)}),a+=o*60}return e.type==="action"&&(a+=10),a}function _o(e,t){const n=ce(t);if(!n)return[];const a=yt(t);return e.map(o=>({entry:o,score:Mo(o,n,a)})).filter(o=>o.score>0).sort((o,i)=>i.score-o.score||o.entry.label.localeCompare(i.entry.label)).slice(0,Io).map(o=>o.entry)}function jo(e){if(!e)return null;const t=e.closest(".v2-search-input-wrapper")||e.parentElement;if(!t)return null;let n=document.getElementById("featureSearchDropdown");return n||(n=document.createElement("div"),n.id="featureSearchDropdown",n.className="feature-search-dropdown",n.setAttribute("role","listbox")),t.contains(n)||t.appendChild(n),n}function Ro(e,t){if(!e)return;if(e.innerHTML="",!t.length){e.dataset.count="0",e.dataset.open="false",e.hidden=!0,e.setAttribute("aria-expanded","false");return}const n=document.createElement("div");n.className="feature-search-dropdown-list",t.forEach((a,o)=>{const i=document.createElement("button");i.type="button",i.className="feature-search-option";const s=`v2-feature-search-${a.key.replace(/[^a-z0-9_-]+/gi,"-")}`;i.id=s,i.setAttribute("role","option"),i.setAttribute("tabindex",o===0?"0":"-1"),i.setAttribute("data-value",a.display||a.label),i.setAttribute("data-entry-key",a.key),i.setAttribute("aria-label",a.label),i.setAttribute("aria-selected","false");const r=document.createElement("div");r.className="feature-search-option-content";const l=document.createElement("span");if(l.className="feature-search-option-label",l.textContent=a.label,r.appendChild(l),a.detail){const v=document.createElement("span");v.className="feature-search-option-value",v.textContent=a.detail,r.appendChild(v)}i.appendChild(r),n.appendChild(i)}),e.appendChild(n),e.dataset.count=String(t.length),e.dataset.activeIndex="0",e.dataset.open="true",e.hidden=!1,e.setAttribute("aria-expanded","true")}function ht(e){return e?Array.from(e.querySelectorAll('[role="option"]')):[]}function ke(e,t,n){const a=ht(t);if(!a.length)return null;const o=Math.max(0,Math.min(n,a.length-1));return a.forEach((i,s)=>{const r=s===o;i.setAttribute("tabindex",r?"0":"-1"),i.setAttribute("aria-selected",r?"true":"false"),r&&e&&i.id&&e.setAttribute("aria-activedescendant",i.id)}),t.dataset.activeIndex=String(o),a[o]}function ye(e,t){t&&(t.dataset.open="false",t.hidden=!0,t.setAttribute("aria-expanded","false"),t.dataset.activeIndex="",e&&e.hasAttribute("aria-activedescendant")&&e.removeAttribute("aria-activedescendant"))}function Wt(e){!e||e.dataset.count==="0"||(e.dataset.open="true",e.hidden=!1,e.setAttribute("aria-expanded","true"))}function Yt(e){window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:e}}))}function at(e,t,n){if(!e)return;const a=e.display||e.label||t||"",o=e.legacyQuery||a;if(!o)return;if(n&&(n.value=a,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))),typeof window.runFeatureSearch=="function"){window.runFeatureSearch(o);return}const i=document.getElementById("featureSearch");i&&(i.value=o,i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0})))}function ot(e,t){if(!e)return null;const n=e.getAttribute("data-entry-key");if(n&&t.has(n))return t.get(n);const a=e.getAttribute("data-value")||"";return a&&t.get(`label:${ce(a)}`)||null}function Ho(e,t){const n=Ao();let a=[];const o=()=>a.length>0,i=()=>{n.markStale()};window.addEventListener("v2:search-index-refresh",i);const s=r=>{n.refreshIfStale();const{entries:l,index:v}=n.getIndexState();r?a=_o(l,r):a=Vo(v),Ro(t,a),t.dataset.count!=="0"&&ke(e,t,0)};e.addEventListener("input",r=>{r.stopPropagation();const l=r.target.value.trim();s(l),Wt(t),Yt(l)}),e.addEventListener("focus",()=>{!e.value&&!o()&&n.refreshIfStale(),s(e.value.trim()),Wt(t)}),e.addEventListener("blur",()=>{window.setTimeout(()=>{t.contains(document.activeElement)||ye(e,t)},120)}),e.addEventListener("keydown",r=>{r.stopPropagation();const l=ht(t),v=t.dataset.activeIndex?Number(t.dataset.activeIndex):0;if(r.key==="Enter"){const y=l[v],E=ot(y,n.getIndexState().index);at(E,e.value.trim(),e),ye(e,t);return}if(r.key==="Escape"){e.value&&(e.value="",s(""),Yt("")),ye(e,t),r.preventDefault();return}if(r.key==="ArrowDown"){if(!l.length)return;r.preventDefault();const y=v+1>=l.length?0:v+1;ke(e,t,y);return}if(r.key==="ArrowUp"){if(!l.length)return;r.preventDefault();const y=v-1<0?l.length-1:v-1;ke(e,t,y)}}),t.addEventListener("mousedown",r=>{r.target.closest("[data-value]")&&r.preventDefault()}),t.addEventListener("click",r=>{const l=r.target.closest("[data-value]");if(!l)return;const v=ot(l,n.getIndexState().index);at(v,e.value.trim(),e),ye(e,t)}),t.addEventListener("keydown",r=>{const l=ht(t);if(!l.length)return;const v=document.activeElement,y=l.indexOf(v);if(r.key==="ArrowDown"){r.preventDefault();const E=y>=0?y+1:0;ke(e,t,E>=l.length?0:E)?.focus()}else if(r.key==="ArrowUp"){r.preventDefault();const E=y>0?y-1:l.length-1;ke(e,t,E)?.focus()}else if(r.key==="Enter"){if(r.preventDefault(),y>=0&&l[y]){const E=ot(l[y],n.getIndexState().index);at(E,e.value.trim(),e),ye(e,t)}}else r.key==="Escape"&&(r.preventDefault(),ye(e,t),e.focus())})}function Oo({inputId:e}={}){if(!Po())return!1;const t=document.getElementById(e||"v2SidebarSearchInput");if(!t)return!1;const n=jo(t);return n?(Ho(t,n),!0):!1}const fe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Zt="v2-sidebar-search",Je="v2SidebarSearchInput",Tn="darkMode",An="cameraPowerPlanner_pinkMode",qo="pinkMode",No={"All Projects":"v2.sidebar.nav.allProjects","Active Projects":"v2.sidebar.nav.activeProjects",Archive:"v2.sidebar.nav.archive","Auto Backups":"v2.sidebar.nav.autoBackups","Device Library":"v2.sidebar.nav.deviceLibrary",Contacts:"v2.sidebar.nav.contacts","Auto Gear Rules":"v2.sidebar.nav.autoGearRules","Owned Gear":"v2.sidebar.nav.ownedGear","Create New Project":"v2.sidebar.nav.createProject",Projects:"v2.sidebar.nav.projectsSection",Tools:"v2.sidebar.nav.toolsSection",Support:"v2.sidebar.nav.supportSection",Help:"v2.sidebar.nav.help",Settings:"v2.sidebar.nav.settings"};function $e(e,t={},n=null){const a=n||document.documentElement.lang||"en";let o=window.texts&&window.texts[a]?window.texts[a]:null;!o&&window.texts&&(o=window.texts.en);const i=(r,l)=>l.split(".").reduce((v,y)=>v?v[y]:null,r);let s=o?i(o,e):null;if(!s&&a!=="en"&&window.texts&&window.texts.en&&(s=i(window.texts.en,e)),!s)return e;if(typeof s=="string")for(const[r,l]of Object.entries(t))s=s.replace(`{${r}}`,l);return s}function Fo(){console.log("[V2 Sidebar] Initializing...");const e=document.querySelector(".v2-sidebar");if(!e){console.error("[V2 Sidebar] .v2-sidebar not found. Cannot inject controls.");return}zo(e),Go(e),Uo(e),Oo({inputId:Je})||Ko(),ti(),Xo(),Jo(),Wo(),Zo();const n=document.getElementById("languageSelect");n&&Ue(n.value)}function zo(e){if(e.querySelector(".v2-sidebar-header"))return;const t=document.createElement("div");t.className="v2-sidebar-header";const n=document.createElement("img");n.src="src/icons/Icon Bluenew.svg",n.className="v2-sidebar-logo",n.alt="Logo";const a=document.createElement("h1");a.className="v2-sidebar-title",a.innerHTML="Cine Power<br>Planner",t.appendChild(n),t.appendChild(a),e.insertBefore(t,e.firstChild)}function Go(e){if(e.querySelector(".v2-sidebar-controls-container"))return;const t=document.createElement("div");t.className="v2-sidebar-controls-container";const n=document.createElement("div");n.className="v2-controls-row-1",Qo(n),ai(n),ei(n),t.appendChild(n);const a=e.querySelector(".v2-sidebar-footer");a?a.insertAdjacentElement("beforebegin",t):e.appendChild(t)}function Ko(){const e=document.getElementById(Je),t=document.getElementById("featureSearch");!e||!t||(e.addEventListener("input",n=>{n.stopPropagation(),t.value=n.target.value,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}),e.addEventListener("focus",()=>{t.dispatchEvent(new Event("focus",{bubbles:!0}))}),e.addEventListener("blur",()=>{setTimeout(()=>{t.dispatchEvent(new Event("blur",{bubbles:!0}))},200)}),e.addEventListener("keydown",n=>{if(n.stopPropagation(),!["ArrowUp","ArrowDown","Enter","Escape"].includes(n.key))return;const o=new KeyboardEvent("keydown",{key:n.key,code:n.code,keyCode:n.keyCode,bubbles:!0,cancelable:!0});t.dispatchEvent(o)}),e.addEventListener("input",n=>{const a=n.target.value.trim();window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:a}}))}))}function Uo(e){if(e.querySelector(`.${Zt}`))return;const t=document.createElement("div");t.className=Zt,t.innerHTML=`
            <div class="v2-search-input-wrapper">
                <svg class="v2-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" id="${Je}" class="v2-search-input" placeholder="${$e("v2.sidebar.search.placeholder")}" aria-label="${$e("v2.sidebar.search.label")}">
            </div>
        `;const n=e.querySelector(".v2-sidebar-header");if(n)n.insertAdjacentElement("afterend",t);else{const a=e.querySelector(".v2-sidebar-nav");a?e.insertBefore(t,a):e.insertBefore(t,e.firstChild)}setTimeout(()=>{const a=document.getElementById("featureSearchDropdown"),o=t.querySelector(".v2-search-input-wrapper");a&&o&&(o.appendChild(a),a.style.top="110%",a.style.left="0",a.style.visibility="visible",a.style.display="none")},1e3)}function Wo(){document.addEventListener("click",e=>{e.target.closest("#closeHelp")&&(e.preventDefault(),e.stopImmediatePropagation(),Yo())})}function Yo(){const e=document.getElementById("helpDialog");e&&(e.setAttribute("hidden",""),e.style.display="none",typeof fe.closeDialog=="function"&&fe.closeDialog(e))}function Zo(){const e=document.getElementById("helpButton"),t=document.querySelector('[data-nav-key="openHelpNav"]'),n=a=>{a.preventDefault(),a.stopImmediatePropagation(),window.location.hash="/help"};e&&e.addEventListener("click",n),t&&t.addEventListener("click",n),document.addEventListener("keydown",a=>{a.target.matches("input, textarea, [contenteditable]")||((a.key==="?"&&a.shiftKey||a.key==="H"||a.key==="h"||a.key==="F1")&&n(a),a.key==="/"&&(a.ctrlKey||a.metaKey)&&n(a))},!0)}function Xo(){const e=document.getElementById("navAutoBackups");if(e){const a=localStorage.getItem("cineAutoRecover")==="true";e.style.display=a?"flex":"none"}const t=document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(o=>o.classList.remove("active")),a.classList.add("active")})});const n=window.location.hash;n&&t.forEach(a=>{a.getAttribute("href")===n&&a.classList.add("active")})}function Jo(){const e=document.querySelectorAll(".v2-mobile-menu-toggle"),t=document.getElementById("v2-app"),n=document.querySelector(".v2-sidebar-overlay");if(!t)return;function a(){t.classList.add("sidebar-open")}function o(){t.classList.remove("sidebar-open")}e.forEach(r=>{r.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),a()})}),n&&n.addEventListener("click",o),document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link").forEach(r=>{r.addEventListener("click",()=>{window.innerWidth<=768&&o()})});const s=document.getElementById("v2ExitBtn");s&&s.addEventListener("click",o)}function Qo(e){if(!e||e.querySelector(".v2-lang-select-wrapper"))return;const t=document.getElementById("languageSelect"),n=t?t.value:"en",a=document.createElement("div");a.className="v2-lang-select-wrapper",a.innerHTML=`
            <select class="v2-lang-select" aria-label="Select Language">
                <option value="en" ${n==="en"?"selected":""}>English</option>
                <option value="de" ${n==="de"?"selected":""}>Deutsch</option>
                <option value="es" ${n==="es"?"selected":""}>Español</option>
                <option value="fr" ${n==="fr"?"selected":""}>Français</option>
                <option value="it" ${n==="it"?"selected":""}>Italiano</option>
            </select>
        `;const o=a.querySelector("select");o.addEventListener("change",i=>{const s=i.target.value;t&&(t.value=s,t.dispatchEvent(new Event("change",{bubbles:!0})),typeof fe.updateLanguage=="function"&&fe.updateLanguage(s),Ue(s))}),t&&t.addEventListener("change",()=>{o.value!==t.value&&(o.value=t.value,Ue(t.value))}),e.appendChild(a)}function ei(e){if(e.querySelector("#v2RefreshBtn"))return;const t=document.createElement("button");t.className="v2-tool-btn",t.id="v2RefreshBtn",t.title="Force reload",t.setAttribute("aria-label","Force reload"),t.innerHTML=`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="23 4 23 10 17 10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `,t.addEventListener("click",()=>{const n=document.getElementById("reloadButton");n?n.click():window.location.reload(!0)}),e.appendChild(t)}function Ue(e){document.querySelectorAll(".v2-sidebar-link-text, .v2-sidebar-section-title").forEach(a=>{a.dataset.key||(a.dataset.key=a.textContent.trim());const o=a.dataset.key,i=No[o];i&&(a.textContent=$e(i,{},e))});const n=document.getElementById(Je);n&&(n.placeholder=$e("v2.sidebar.search.placeholder",{},e),n.setAttribute("aria-label",$e("v2.sidebar.search.label",{},e)))}fe.updateSidebarTranslations=Ue;function ti(){oi()}function ni(e,t){return t?e?"pink-dark":"pink-light":e?"dark":"light"}function Vn(){const e=document.body,t=document.documentElement;if(!e||!t)return;const n=e.classList.contains("dark-mode"),a=e.classList.contains("pink-mode"),o=ni(n,a);t.setAttribute("data-theme",o),e.setAttribute("data-theme",o);const i=document.getElementById("themeVariantSelect");i&&i.value!==o&&(i.value=o)}function ai(e){if(e.querySelector("#v2ThemeToggleDark"))return;const t=document.createElement("button");t.className="v2-theme-toggle",t.id="v2ThemeToggleDark",t.setAttribute("aria-label","Toggle dark mode"),t.setAttribute("aria-pressed","false"),t.setAttribute("title","Toggle dark mode"),t.innerHTML=`
            <span class="v2-icon-moon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xEC7E;</span>
            <span class="v2-icon-sun icon-glyph" aria-hidden="true" data-icon-font="uicons" style="display:none">&#xF1FE;</span>
        `,t.addEventListener("click",ii);const n=document.createElement("button");n.className="v2-theme-toggle",n.id="v2ThemeTogglePink",n.setAttribute("aria-label","Toggle pink mode"),n.setAttribute("aria-pressed","false"),n.setAttribute("title","Toggle pink mode"),n.setAttribute("data-theme","pink"),n.innerHTML=`
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
        `,n.addEventListener("click",ri),e.appendChild(t),e.appendChild(n)}function oi(){const e=localStorage.getItem(Tn)==="true";Mn(e);const t=localStorage.getItem(An)==="true";_n(t)}function ii(){const t=!document.body.classList.contains("dark-mode");Mn(t),localStorage.setItem(Tn,t)}function Mn(e){document.body.classList.toggle("dark-mode",e),document.body.classList.toggle("light-mode",!e);const t=document.getElementById("v2ThemeToggleDark");if(t){t.classList.toggle("active",e);const n=t.querySelector(".v2-icon-moon"),a=t.querySelector(".v2-icon-sun");n&&a&&(n.style.display=e?"none":"block",a.style.display=e?"block":"none")}Vn()}function ri(){const t=!document.body.classList.contains("pink-mode");_n(t),localStorage.setItem(An,t),localStorage.setItem(qo,t)}function _n(e){document.body.classList.toggle("pink-mode",e),si(e);const t=document.getElementById("v2ThemeTogglePink");t&&t.classList.toggle("active",e),Vn()}function si(e){const t=document.querySelector(".v2-sidebar-logo");t&&(t.src=e?"src/icons/Icon Pinknew.svg":"src/icons/Icon Bluenew.svg")}const jt={init:Fo};typeof fe<"u"&&(fe.cineV2Sidebar=jt);typeof window<"u"&&(window.cineV2Sidebar=jt);const li=Object.freeze(Object.defineProperty({__proto__:null,V2Sidebar:jt},Symbol.toStringTag,{value:"Module"}));class ci{constructor(t){this.viewId=t,this.container=null,this.isInitialized=!1}init(){if(this.isInitialized)return;if(console.log(`[View: ${this.viewId}] Initializing...`),this.container=document.getElementById(this.viewId),!this.container){const n=document.querySelector(".v2-app")||document.body;this.container=document.createElement("div"),this.container.id=this.viewId,this.container.className="app-view",n.appendChild(this.container)}const t=this.viewId.replace(/^view-/,"");window.cineViewManager&&window.cineViewManager.registerView(t,{onEnter:n=>this.render(n),onLeave:()=>this.onLeave&&this.onLeave()}),this.isInitialized=!0}render(t){console.warn(`[View: ${this.viewId}] Render method not implemented`)}onLeave(){}escapeHtml(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}}class jn extends ci{constructor(){super("rules"),this.devicesLocal={}}async render(){if(!window.getAutoGearRules){this.container.innerHTML=`
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
                    ${t.map((o,i)=>this.renderRuleCard(o,i)).join("")}
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
        `}countConditions(t){let n=0;return t.scenarios&&t.scenarios.length&&(n+=t.scenarios.length),t.cameras&&t.cameras.length&&n++,t.cameraHandles&&t.cameraHandles.length&&n++,t.monitors&&t.monitors.length&&n++,n}attachListeners(){const t=this.container.querySelector("#v2-ag-import");t&&t.addEventListener("click",()=>this.handleImport());const n=this.container.querySelector("#v2-ag-export");n&&n.addEventListener("click",()=>this.handleExport()),this.container.querySelectorAll("#v2-ag-add, #v2-ag-add-empty").forEach(o=>o.addEventListener("click",()=>this.showEditRuleModal({},!0))),this.container.querySelectorAll('[data-action="edit"]').forEach(o=>{o.addEventListener("click",i=>{const s=parseInt(i.currentTarget.dataset.index,10),r=window.getAutoGearRules();r&&r[s]&&this.showEditRuleModal(r[s],!1,s)})}),this.container.querySelectorAll('[data-action="delete"]').forEach(o=>{o.addEventListener("click",i=>{const s=parseInt(i.currentTarget.dataset.index,10);this.deleteRule(s)})})}collectData(){const t=window.devices||{};return{cameras:Object.keys(t.cameras||{}).sort(),monitors:Object.keys(t.monitors||{}).sort(),video:Object.keys(t.video||{}).sort(),cameraHandles:this.getHardcodedOptions("cameraHandle"),scenarios:window.SCENARIOS||["Studio","Location","Handheld","Gimbal","Steadicam","Crane","Drone","Underwater","Car Mount"],viewfinders:Object.keys(t.viewfinders||{}).sort(),matteboxes:Object.keys(t.matteboxes||{}).sort(),tripodHeads:Object.keys(t.tripodHeads||{}).sort(),tripodBowls:["75mm","100mm","150mm","Flat","Mitchell"],wireless:Object.keys(t.wireless||{}).sort()}}getHardcodedOptions(t){return t==="cameraHandle"?["Blue Shape Top Handle","ARRI CCH-4","ARRI HEB-3","Wooden Camera Master Top Handle"]:t==="deliveryResolution"?["1080p","2K","4K UHD","4K DCI","6K","8K"]:[]}showEditRuleModal(t,n,a=-1){const o=this.collectData(),i=JSON.parse(JSON.stringify(t));i.scenarios||(i.scenarios=[]),i.addItems||(i.addItems=[]);const s=i.scenarios||[],r=document.createElement("div");r.className="v2-modal-backdrop",r.innerHTML=`
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
                            <input type="text" class="v2-input" id="rule-name" value="${this.escapeHtml(i.name||"")}" placeholder="e.g. Director's Monitor">
                        </div>
                        <div class="v2-form-check">
                            <input type="checkbox" id="rule-enabled" ${i.enabled!==!1?"checked":""}>
                            <label for="rule-enabled">Rule Enabled</label>
                        </div>
                        <div class="v2-form-check">
                            <input type="checkbox" id="rule-always" ${i.always?"checked":""}>
                            <label for="rule-always">Always Apply (Ignore Scenarios)</label>
                        </div>
                        <hr class="v2-divider">
                        <div class="v2-form-group">
                            <label>Scenario Logic</label>
                            <select class="v2-select" id="rule-scenario-mode">
                                <option value="any" ${i.scenarioMode==="any"?"selected":""}>Match ANY selected scenario</option>
                                <option value="all" ${i.scenarioMode==="all"?"selected":""}>Match ALL selected scenarios</option>
                            </select>
                        </div>
                        <div class="v2-form-group">
                            <label>Scenarios</label>
                            <div class="v2-checkbox-grid">
                                ${o.scenarios.map(d=>`
                                    <label class="v2-checkbox-label">
                                        <input type="checkbox" class="scenario-check" value="${d}" ${s.includes(d)?"checked":""}>
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
                                    <option value="min" ${i.shootingDaysCondition==="min"?"selected":""}>Minimum Days</option>
                                    <option value="max" ${i.shootingDaysCondition==="max"?"selected":""}>Maximum Days</option>
                                </select>
                                <input type="number" class="v2-input v2-input-sm" id="rule-days-val" value="${i.shootingDaysValue||""}" min="1">
                             </div>
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-camera" style="display:none;">
                        ${this.renderMultiSelect("Cameras","cameras",o.cameras,i.cameras)}
                        ${this.renderMultiSelect("Matteboxes","matteboxes",o.matteboxes,i.matteboxes)}
                        ${this.renderMultiSelect("Camera Handles","cameraHandles",o.cameraHandles,i.cameraHandles)}
                        ${this.renderMultiSelect("Viewfinders","viewfinders",o.viewfinders,i.viewfinders)}
                         <div class="v2-form-group">
                            <label>Delivery Resolution</label>
                            <select class="v2-select" id="rule-delivery-res">
                                <option value="">(Any)</option>
                                ${this.getHardcodedOptions("deliveryResolution").map(d=>`<option value="${d}" ${i.deliveryResolution===d?"selected":""}>${d}</option>`).join("")}
                            </select>
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-monitoring" style="display:none;">
                         ${this.renderMultiSelect("Monitors","monitors",o.monitors,i.monitors)}
                         ${this.renderMultiSelect("Video Distribution","videoDist",o.video,i.videoDistribution)}
                         ${this.renderMultiSelect("Wireless Video","wireless",o.wireless,i.wireless)}
                    </div>

                    <div class="v2-tab-content" id="tab-support" style="display:none;">
                        ${this.renderMultiSelect("Tripod Heads","tripodHeads",o.tripodHeads,i.tripodHeads)}
                        ${this.renderMultiSelect("Tripod Bowls","tripodBowls",o.tripodBowls,i.tripodBowls)}
                    </div>

                    <div class="v2-tab-content" id="tab-crew" style="display:none;">
                        <p class="v2-text-muted">Requires specific crew members to be present/absent.</p>
                         <div class="v2-form-group">
                            <label>Crew Present (Comma separated)</label>
                            <input type="text" class="v2-input" id="rule-crew-present" value="${(i.crewPresent||[]).join(", ")}">
                        </div>
                        <div class="v2-form-group">
                            <label>Crew Absent (Comma separated)</label>
                            <input type="text" class="v2-input" id="rule-crew-absent" value="${(i.crewAbsent||[]).join(", ")}">
                        </div>
                    </div>

                    <div class="v2-tab-content" id="tab-actions" style="display:none;">
                        <h3>Items to Add</h3>
                        <p class="v2-text-muted">When rule matches, these items are added to the list.</p>
                        
                        <div class="v2-action-list" id="rule-action-list">
                            ${this.renderActionListItems(i.addItems)}
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
        `,document.body.appendChild(r);const l=()=>{r.remove()};r.querySelector(".v2-modal-close").onclick=l,r.querySelector("#v2-modal-cancel").onclick=l;const v=r.querySelectorAll(".v2-nav-item"),y=r.querySelectorAll(".v2-tab-content");v.forEach(d=>{d.onclick=()=>{v.forEach(b=>b.classList.remove("active")),y.forEach(b=>{b.style.display="none",b.classList.remove("active")}),d.classList.add("active");const p=r.querySelector(`#tab-${d.dataset.tab}`);p&&(p.style.display="block",setTimeout(()=>p.classList.add("active"),10))}});const E=r.querySelector("#rule-action-list"),w=r.querySelector("#btn-add-action-item"),u=r.querySelector("#new-item-name"),c=r.querySelector("#new-item-qty");w.onclick=()=>{const d=u.value.trim(),p=parseInt(c.value,10);d&&(i.addItems.push({name:d,qty:p}),E.innerHTML=this.renderActionListItems(i.addItems),u.value="",this.bindRemoveActionEvents(E,i))},this.bindRemoveActionEvents(E,i),r.querySelector("#v2-modal-save").onclick=()=>{const d={...i,name:r.querySelector("#rule-name").value.trim(),enabled:r.querySelector("#rule-enabled").checked,always:r.querySelector("#rule-always").checked,scenarioMode:r.querySelector("#rule-scenario-mode").value,scenarios:Array.from(r.querySelectorAll(".scenario-check:checked")).map(p=>p.value),shootingDaysCondition:r.querySelector("#rule-days-cond").value,shootingDaysValue:parseInt(r.querySelector("#rule-days-val").value,10)||0,cameras:this.collectMultiSelect(r,"cameras"),matteboxes:this.collectMultiSelect(r,"matteboxes"),cameraHandles:this.collectMultiSelect(r,"cameraHandles"),viewfinders:this.collectMultiSelect(r,"viewfinders"),monitors:this.collectMultiSelect(r,"monitors"),videoDistribution:this.collectMultiSelect(r,"videoDist"),wireless:this.collectMultiSelect(r,"wireless"),tripodHeads:this.collectMultiSelect(r,"tripodHeads"),tripodBowls:this.collectMultiSelect(r,"tripodBowls"),deliveryResolution:r.querySelector("#rule-delivery-res").value,crewPresent:r.querySelector("#rule-crew-present").value.split(",").map(p=>p.trim()).filter(p=>p),crewAbsent:r.querySelector("#rule-crew-absent").value.split(",").map(p=>p.trim()).filter(p=>p)};if(!d.name){alert("Rule name is required");return}this.saveRule(d,n,a),l()}}renderMultiSelect(t,n,a,o=[]){if(!a||a.length===0)return"";const i=o||[];return`
            <div class="v2-form-group">
                <label>${t}</label>
                <div class="v2-multi-select-container">
                    ${a.map(s=>`
                         <label class="v2-checkbox-label">
                            <input type="checkbox" class="multi-${n}" value="${this.escapeHtml(s)}" ${i.includes(s)?"checked":""}>
                            <span>${this.escapeHtml(s)}</span>
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
        `).join("")}bindRemoveActionEvents(t,n){t.querySelectorAll(".remove-action-item").forEach(a=>{a.onclick=o=>{const i=parseInt(o.target.dataset.idx,10);n.addItems.splice(i,1),t.innerHTML=this.renderActionListItems(n.addItems),this.bindRemoveActionEvents(t,n)}})}saveRule(t,n,a){const o=window.getAutoGearRules()||[];n?o.push(t):o[a]=t,window.setAutoGearRules?(window.setAutoGearRules(o),window.requestAutoSave&&window.requestAutoSave(),this.render()):console.error("Core function setAutoGearRules not available")}deleteRule(t){if(!confirm("Are you sure you want to delete this rule?"))return;const n=window.getAutoGearRules()||[];n.splice(t,1),window.setAutoGearRules(n),window.requestAutoSave&&window.requestAutoSave(),this.render()}}typeof window<"u"&&(window.cineRulesView=new jn);const di=Object.freeze(Object.defineProperty({__proto__:null,RulesView:jn},Symbol.toStringTag,{value:"Module"}));(function(e){const t="v2-device-library-content",n="device-manager";let a=!1,o=!1,i=null;function s(f){if(typeof window<"u"&&window.texts){const g=document.getElementById("languageSelect"),S=g&&g.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",C=window.texts[S]||window.texts.en;if(C)return f.split(".").reduce(($,_)=>$?$[_]:null,C)||f}return f}function r(){const f=document.getElementById("view-devices");if(!f)return;const g=f.querySelector(".view-header");if(!g)return;let S=g.querySelector(".view-header-actions");S||(S=document.createElement("div"),S.className="view-header-actions",g.appendChild(S)),S.innerHTML=`
            <button class="v2-btn v2-btn-secondary" id="v2-export-db-btn" title="Export database to file">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Export</span>
            </button>
            <button class="v2-btn v2-btn-secondary" id="v2-import-db-btn" title="Import database from file">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span>Import</span>
            </button>
            <button class="v2-btn v2-btn-danger" id="v2-reset-db-btn" title="Reset to default database">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                <span>Reset</span>
            </button>
        `}function l(){if(o)return;console.log("[DeviceLibraryView] Reparenting legacy content...");const f=document.getElementById(t),g=document.getElementById(n);if(!f){console.error(`[DeviceLibraryView] V2 Container #${t} not found.`);return}if(!g){console.error(`[DeviceLibraryView] Legacy Container #${n} not found.`);return}i=g.classList.contains("hidden");const S=document.createElement("div");S.id="device-manager-placeholder",S.style.display="none",g.parentNode.insertBefore(S,g),r(),f.innerHTML="";const C=document.createElement("div");C.className="device-library-content-wrapper",g.classList.remove("hidden");const $=document.createElement("section");$.className="v2-card device-library-form-tile",$.innerHTML='<h2 class="tile-heading">Add New Device</h2>';const _=document.createElement("section");_.className="v2-card device-library-list-tile",_.innerHTML='<h2 class="tile-heading">Existing Devices</h2>',Array.from(g.children).forEach(x=>{if(x.id==="deviceManagerHeading"||x.id==="addDeviceHeading"||x.id==="existingDevicesHeading")x.style.display="none";else if(x.id==="exportDataBtn"||x.id==="importDataBtn"||x.id==="exportAndRevertBtn")x.style.display="none";else if(x.classList.contains("button-group"))x.querySelectorAll("#exportDataBtn, #importDataBtn, #exportAndRevertBtn").forEach(D=>D.style.display="none"),$.appendChild(x);else if(x.classList.contains("device-library-search")||x.id==="deviceListContainer"){if(x.classList.contains("device-library-search")){const Q=x.querySelector("input");if(Q){Q.classList.add("v2-input");const D=s("searchPlaceholder");Q.placeholder=D&&D!=="searchPlaceholder"?D:"Search all device categories..."}}_.appendChild(x)}}),C.appendChild($),C.appendChild(_),f.appendChild(C),f.appendChild(g),g.style.display="none",v($),v(_),v(g),w();const F=()=>{if(typeof window.syncDeviceManagerCategories=="function"){console.log("[DeviceLibraryView] Triggering syncDeviceManagerCategories...");try{return window.syncDeviceManagerCategories(),!0}catch(x){console.warn("[DeviceLibraryView] syncDeviceManagerCategories failed:",x)}}if(typeof window.refreshDeviceLists=="function"){console.log("[DeviceLibraryView] Triggering refreshDeviceLists...");try{return window.refreshDeviceLists(),!0}catch(x){console.warn("[DeviceLibraryView] refreshDeviceLists failed:",x)}}if(typeof window.loadDeviceData=="function"){console.log("[DeviceLibraryView] Triggering loadDeviceData...");try{return window.loadDeviceData(),!0}catch(x){console.warn("[DeviceLibraryView] loadDeviceData failed:",x)}}return console.warn("[DeviceLibraryView] No device list population function found"),!1};F()||setTimeout(F,100),o=!0,console.log("[DeviceLibraryView] Reparenting complete (Hierarchy Preserved).")}function v(f){f.querySelectorAll('input[type="text"], input[type="number"], input[type="search"]').forEach(A=>A.classList.add("v2-input")),f.querySelectorAll("select").forEach(A=>A.classList.add("v2-select")),f.querySelectorAll("button").forEach(A=>{A.classList.contains("v2-btn")||(A.classList.add("v2-btn"),(A.textContent.toLowerCase().includes("add")||A.textContent.toLowerCase().includes("save"))&&A.classList.add("v2-btn-primary"))}),f.querySelectorAll(".form-row").forEach(A=>A.classList.add("v2-form-row")),f.querySelectorAll("label").forEach(A=>A.classList.add("v2-label"))}function y(){const f=document.getElementById("exportDataBtn");f&&f.click()}function E(){const f=document.getElementById("importDataBtn");f&&f.click()}function w(){const f=document.getElementById("v2-export-db-btn"),g=document.getElementById("v2-import-db-btn"),S=document.getElementById("v2-reset-db-btn");f&&(f.removeEventListener("click",y),f.addEventListener("click",y)),g&&(g.removeEventListener("click",E),g.addEventListener("click",E)),S&&(S.removeEventListener("click",u),S.addEventListener("click",u))}function u(){const f=document.getElementById("exportAndRevertBtn");f?f.click():console.warn("[DeviceLibraryView] Legacy reset button not found")}function c(){if(!o)return;const f=document.getElementById(t),g=document.getElementById(n),S=document.getElementById("device-manager-placeholder");if(g){const C=g.querySelector(".device-list-panel .panel-content"),$=g.querySelector(".device-form-panel .panel-content");if(C)for(;C.firstChild;)g.appendChild(C.firstChild);if($)for(;$.firstChild;)g.appendChild($.firstChild);g.querySelectorAll(".v2-panel").forEach(A=>A.remove()),g.classList.remove("device-library-layout"),i===!0?g.classList.add("hidden"):i===!1&&g.classList.remove("hidden"),S&&S.parentNode?(S.parentNode.insertBefore(g,S),S.remove()):document.body.appendChild(g)}f&&(f.innerHTML=""),o=!1,console.log("[DeviceLibraryView] Restored legacy content.")}function d(){l()}function p(){a||(console.log("[DeviceLibraryView] Initializing..."),document.addEventListener("v2:viewchange",f=>{if(f.detail){if(f.detail.view==="devices"){d();return}o&&c()}}),document.addEventListener("v2:languagechange",()=>{o&&(c(),o=!1,d())}),a=!0,console.log("[DeviceLibraryView] Initialized"))}const b={init:p,render:d,restoreLegacyContent:c};e.cineV2DeviceLibrary=b})(typeof window<"u"?window:void 0);const ui=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){let s=!1,r=null,l=null,v=null,y=null,E=null;function w(m){const h={avatarEditorTitle:"Edit Photo",avatarEditorDescription:"Drag to reposition, use slider to zoom",avatarEditorZoom:"Zoom",buttonCancel:"Cancel",buttonSave:"Save",buttonRemovePhoto:"Remove Photo",avatarUploadHint:"Drop or click to upload"};if(typeof window<"u"&&window.texts){const P=document.getElementById("languageSelect"),R=P&&P.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",T=window.texts[R]||window.texts.en;if(T){const H=m.split(".").reduce((z,K)=>z?z[K]:null,T);if(H&&typeof H=="string")return H}}return h[m]||m}function u(m){return typeof m!="string"?"":m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function c(m){return`
            <div class="avatar-editor-modal" role="dialog" aria-modal="true" aria-labelledby="avatar-editor-title">
                <div class="avatar-editor-backdrop"></div>
                <div class="avatar-editor-surface">
                    <header class="avatar-editor-header">
                        <div class="avatar-editor-header-main">
                            <h2 id="avatar-editor-title" class="avatar-editor-title">${u(w("avatarEditorTitle"))}</h2>
                            <p class="avatar-editor-description">${u(w("avatarEditorDescription"))}</p>
                        </div>
                        <button type="button" class="avatar-editor-close" aria-label="Close">
                            <span class="icon">close</span>
                        </button>
                    </header>
                    <div class="avatar-editor-body">
                        <div class="avatar-editor-viewport" id="avatarEditorViewport" tabindex="0">
                            <img class="avatar-editor-image" id="avatarEditorImage" alt="" draggable="false" />
                            <div class="avatar-editor-placeholder" id="avatarEditorPlaceholder">
                                <span class="icon">add_a_photo</span>
                                <span>${u(w("avatarUploadHint"))}</span>
                            </div>
                            <input type="file" id="avatarEditorFileInput" accept="image/png,image/jpeg,image/webp,image/gif" class="visually-hidden" tabindex="-1" />
                        </div>
                        <div class="avatar-editor-controls" id="avatarEditorControls">
                            <label class="avatar-editor-zoom-label">
                                <span class="icon">zoom_out</span>
                                <input type="range" id="avatarEditorZoom" min="50" max="250" step="5" value="100" aria-label="${u(w("avatarEditorZoom"))}" />
                                <span class="icon">zoom_in</span>
                            </label>
                        </div>
                    </div>
                    <footer class="avatar-editor-footer">
                        <button type="button" class="avatar-editor-btn avatar-editor-btn-danger" id="avatarEditorDelete" ${m?"":"disabled"}>
                            ${u(w("buttonRemovePhoto"))}
                        </button>
                        <div class="avatar-editor-primary-actions">
                            <button type="button" class="avatar-editor-btn avatar-editor-btn-secondary" id="avatarEditorCancel">
                                ${u(w("buttonCancel"))}
                            </button>
                            <button type="button" class="avatar-editor-btn avatar-editor-btn-primary" id="avatarEditorSave">
                                ${u(w("buttonSave"))}
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        `}function d(m,h){const R=Math.max(200/h.naturalWidth,200/h.naturalHeight);l={active:!0,dataUrl:m,image:h,mime:p(m),viewportSize:200,baseScale:R,zoom:1,offsetX:(200-h.naturalWidth*R)/2,offsetY:(200-h.naturalHeight*R)/2,pointerId:null,pointerStartX:0,pointerStartY:0,offsetStartX:0,offsetStartY:0,displayWidth:0,displayHeight:0},f()}function p(m){if(typeof m!="string"||!m.startsWith("data:"))return"image/png";const h=m.indexOf(";");return h===-1?"image/png":m.substring(5,h)||"image/png"}function b(){if(!l)return;const m=Math.min(0,l.viewportSize-l.displayWidth),h=Math.min(0,l.viewportSize-l.displayHeight);l.offsetX=Math.max(m,Math.min(0,l.offsetX)),l.offsetY=Math.max(h,Math.min(0,l.offsetY))}function f(){if(!l||!l.image)return;const m=l.image.naturalWidth||l.image.width||0,h=l.image.naturalHeight||l.image.height||0,P=m*l.baseScale*l.zoom,R=h*l.baseScale*l.zoom;l.displayWidth=P,l.displayHeight=R,b();const T=document.getElementById("avatarEditorImage");T&&(T.style.width=`${P}px`,T.style.height=`${R}px`,T.style.transform=`translate(${l.offsetX}px, ${l.offsetY}px)`)}function g(){if(!l||!l.image)return"";const m=l.baseScale*l.zoom;if(!m)return"";const h=l.viewportSize/m,P=Math.max(0,Math.min(l.image.naturalWidth-h,-l.offsetX/m)),R=Math.max(0,Math.min(l.image.naturalHeight-h,-l.offsetY/m)),T=document.createElement("canvas");T.width=256,T.height=256;const H=T.getContext("2d");if(!H)return"";H.clearRect(0,0,T.width,T.height),H.drawImage(l.image,P,R,h,h,0,0,T.width,T.height);const z=l.mime&&l.mime.startsWith("image/")?l.mime:"image/png";try{return T.toDataURL(z)}catch{try{return T.toDataURL("image/png")}catch{return""}}}function S(m){if(!l||!l.active)return;const h=Number(m?.target?.value)||100,P=Math.max(50,h)/100,R=l.displayWidth||1,T=l.displayHeight||1,H=-l.offsetX+l.viewportSize/2,z=-l.offsetY+l.viewportSize/2,K=H/R,Le=z/T;l.zoom=P,f();const Ve=l.displayWidth*K,Me=l.displayHeight*Le;l.offsetX=-(Ve-l.viewportSize/2),l.offsetY=-(Me-l.viewportSize/2),b(),f()}function C(m){if(!l||!l.active||l.pointerId!==null)return;const h=document.getElementById("avatarEditorViewport");if(h){l.pointerId=m.pointerId,l.pointerStartX=m.clientX,l.pointerStartY=m.clientY,l.offsetStartX=l.offsetX,l.offsetStartY=l.offsetY;try{h.setPointerCapture(m.pointerId)}catch{}m.preventDefault()}}function $(m){if(!l||!l.active||l.pointerId!==m.pointerId)return;const h=m.clientX-l.pointerStartX,P=m.clientY-l.pointerStartY;l.offsetX=l.offsetStartX+h,l.offsetY=l.offsetStartY+P,b(),f(),m.preventDefault()}function _(m){if(!l||!l.active||l.pointerId!==m.pointerId)return;l.pointerId=null;const h=document.getElementById("avatarEditorViewport");if(h)try{h.releasePointerCapture(m.pointerId)}catch{}m.preventDefault()}function A(m){if(!l||!l.active)return;const h=m.shiftKey?10:2;let P=!1;switch(m.key){case"ArrowUp":l.offsetY+=h,P=!0;break;case"ArrowDown":l.offsetY-=h,P=!0;break;case"ArrowLeft":l.offsetX+=h,P=!0;break;case"ArrowRight":l.offsetX-=h,P=!0;break}P&&(b(),f(),m.preventDefault())}function F(m){const h=m?.target?.files?.[0];h&&(j(h),m.target&&(m.target.value=""))}function x(m){m.preventDefault(),m.stopPropagation();const h=document.getElementById("avatarEditorViewport");h&&h.classList.remove("drag-over");const P=m.dataTransfer?.files?.[0];P&&j(P)}function Q(m){m.preventDefault(),m.stopPropagation();const h=document.getElementById("avatarEditorViewport");h&&h.classList.add("drag-over")}function D(m){m.preventDefault(),m.stopPropagation();const h=document.getElementById("avatarEditorViewport");h&&h.classList.remove("drag-over")}function j(m){if(e.CINE_CONTACTS_PROFILE_MODULE&&typeof e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile=="function")e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(m,h=>G(h),h=>console.warn("Failed to read avatar file:",h));else{const h=new FileReader;h.onload=P=>{typeof P.target?.result=="string"&&G(P.target.result)},h.onerror=()=>console.warn("Failed to read file"),h.readAsDataURL(m)}}function G(m){if(!m)return;const h=new Image;h.decoding="async",h.onload=()=>{if(!h.naturalWidth||!h.naturalHeight){console.warn("Invalid image dimensions");return}d(m,h);const P=document.getElementById("avatarEditorImage"),R=document.getElementById("avatarEditorPlaceholder"),T=document.getElementById("avatarEditorControls"),H=document.getElementById("avatarEditorViewport"),z=document.getElementById("avatarEditorZoom"),K=document.getElementById("avatarEditorDelete");P&&(P.src=m),R&&R.classList.add("hidden"),H&&H.classList.add("has-image"),T&&T.classList.remove("hidden"),z&&(z.value="100"),K&&(K.disabled=!1)},h.onerror=()=>console.warn("Failed to load image"),h.src=m}function W(m={}){s&&U();const{avatar:h="",onSave:P=null,onDelete:R=null,onCancel:T=null}=m;v=P,y=R,E=T;const H=!!h,z=document.createElement("div");z.innerHTML=c(H),r=z.firstElementChild,document.body.appendChild(r);const K=r.querySelector(".avatar-editor-backdrop"),Le=r.querySelector(".avatar-editor-close"),Ve=document.getElementById("avatarEditorCancel"),Me=document.getElementById("avatarEditorSave"),Rt=document.getElementById("avatarEditorDelete"),Y=document.getElementById("avatarEditorViewport"),Ht=document.getElementById("avatarEditorZoom"),_e=document.getElementById("avatarEditorFileInput");K&&K.addEventListener("click",()=>U()),Le&&Le.addEventListener("click",()=>U()),Ve&&Ve.addEventListener("click",L),Me&&Me.addEventListener("click",de),Rt&&Rt.addEventListener("click",Ae),Y&&(Y.addEventListener("pointerdown",C),Y.addEventListener("pointermove",$),Y.addEventListener("pointerup",_),Y.addEventListener("pointercancel",_),Y.addEventListener("keydown",A),Y.addEventListener("drop",x),Y.addEventListener("dragover",Q),Y.addEventListener("dragleave",D),Y.addEventListener("click",_i=>{!l?.active&&_e&&_e.click()})),Ht&&Ht.addEventListener("input",S),_e&&_e.addEventListener("change",F),h&&G(h),requestAnimationFrame(()=>{r&&r.classList.add("open")}),s=!0,setTimeout(()=>{Y&&Y.focus()},100)}function U(){!s||!r||(r.classList.remove("open"),setTimeout(()=>{r&&r.parentNode&&r.parentNode.removeChild(r),r=null,l=null,s=!1,v=null,y=null,E=null},200))}function de(){let m="";l&&l.active&&(m=g()),typeof v=="function"&&v(m),U()}function Ae(){typeof y=="function"&&y(),U()}function L(){typeof E=="function"&&E(),U()}const N={open:W,close:U,isOpen:()=>s};e.cineAvatarEditorModal=N})(typeof window<"u"?window:void 0);const vi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));async function pi(e,t,n={}){const a={mimeType:"text/plain",charset:"utf-8",...n};let o;if(e instanceof Blob)o=e;else{const i=`${a.mimeType};charset=${a.charset}`;try{o=new Blob([e],{type:i})}catch(s){return console.warn("[DownloadManager] Blob creation failed",s),!1}}if(typeof window.showSaveFilePicker=="function")try{const s=await(await window.showSaveFilePicker({suggestedName:t,types:[{description:"File",accept:{[a.mimeType]:["."+t.split(".").pop()]}}]})).createWritable();return await s.write(o),await s.close(),!0}catch(i){if(i.name!=="AbortError")console.warn("[DownloadManager] File System Access API failed, falling back",i);else return!1}if(typeof navigator<"u"&&typeof navigator.msSaveOrOpenBlob=="function")return navigator.msSaveOrOpenBlob(o,t);try{const i=URL.createObjectURL(o),s=document.createElement("a");return s.style.display="none",s.href=i,s.download=t,document.body.appendChild(s),s.click(),setTimeout(()=>{document.body.removeChild(s),URL.revokeObjectURL(i)},2e3),!0}catch(i){return console.warn("[DownloadManager] Anchor download failed",i),!1}}(function(e){const t="view-contacts",n="cameraPowerPlanner_userProfile";let a=!1,o=null,i=null;function s(c){return typeof c!="string"?"":c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function r(c){const d={contactsViewTitle:"Contacts",contactsViewSubtitle:"Production Directory",buttonAddContact:"Add Contact",buttonImportVCard:"Import vCard",buttonExportContacts:"Export",contactsEmptyTitle:"No contacts yet",contactsEmptyText:"Add crew members to reuse them across projects.",buttonAddFirstContact:"Add Your First Contact",contactUnnamed:"Unnamed",contactNoRole:"No role specified",modalTitleNewContact:"New Contact",modalTitleEditContact:"Edit Contact",modalTitleDeleteContact:"Delete Contact",confirmDeleteContact:"Are you sure you want to delete this contact?",buttonCancel:"Cancel",buttonDeleteRed:"Delete",buttonSaveContact:"Save",buttonEdit:"Edit",buttonDelete:"Delete",buttonUploadPhoto:"Upload Photo",buttonRemovePhoto:"Remove",avatarHint:"Drag & drop or click to upload",sectionBasicInfo:"Basic Information",sectionContactDetails:"Contact Details",labelName:"Name",labelRole:"Role",labelPhone:"Phone",labelEmail:"Email",labelWebsite:"Website",labelNotes:"Notes",placeholderFullName:"Full name",placeholderRole:"e.g. DoP, 1st AC",placeholderPhone:"+1 234 567 890",placeholderEmail:"name@example.com",placeholderWebsite:"https://",placeholderNotes:"Additional notes...",alertEnterName:"Please enter a name",statusUnavailable:"Contacts module not loaded.",profileSectionTitle:"Your Profile",profileSectionDescription:'Add your details to appear as "User" in gear assignments.',importSuccess:"Imported {added} contacts, updated {updated}",exportFilename:"contacts.vcf"};if(typeof window<"u"&&window.texts){const p=document.getElementById("languageSelect"),b=p&&p.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",f=window.texts[b]||window.texts.en;if(f){const g=c.split(".").reduce((S,C)=>S?S[C]:null,f);if(g&&typeof g=="string")return g}}return d[c]||c}function l(){try{const c=localStorage.getItem(n);if(c){const d=JSON.parse(c);o={name:typeof d.name=="string"?d.name:"",role:typeof d.role=="string"?d.role:"",phone:typeof d.phone=="string"?d.phone:"",email:typeof d.email=="string"?d.email:"",avatar:typeof d.avatar=="string"?d.avatar:""};return}}catch(c){console.warn("[ContactsView] Failed to load profile:",c)}o={name:"",role:"",phone:"",email:"",avatar:""}}function v(){try{localStorage.setItem(n,JSON.stringify(o))}catch(c){console.warn("[ContactsView] Failed to save profile:",c)}}function y(){i&&clearTimeout(i),i=setTimeout(()=>{v(),i=null},400)}function E(){const c=e.cineFeaturesContacts;if(!c)return;const d=c.loadStoredContacts();if(!d||d.length===0){alert("No contacts to export.");return}const p=c.generateAllContactsVCard?c.generateAllContactsVCard(d):"";if(!p){alert("Failed to generate vCard data.");return}pi(p,r("exportFilename"),{mimeType:"text/vcard"}).then(b=>{b||alert("Download failed. Please check your browser settings.")})}function w(c){if(!c)return;const d=new FileReader;d.onload=p=>{const b=p.target?.result;if(typeof b!="string")return;const f=e.cineFeaturesContacts;if(!f){alert("Contacts module not loaded.");return}if(!f.parseVCard||!f.mergeImportedContacts){console.error("[ContactsView] Import functions missing from contacts module."),alert("Import functionality unavailable.");return}const g=f.parseVCard(b);if(!g||g.length===0){alert("No valid contacts found in file.");return}const S=f.loadStoredContacts(),C=f.mergeImportedContacts({existing:S,imported:g});if(f.saveContactsToStorage(C.contacts)){const $=r("importSuccess").replace("{added}",C.added).replace("{updated}",C.updated);alert($),u.render()}},d.readAsText(c)}const u={container:null,init(){try{this.container=document.getElementById(t),this.container||this.createViewContainer(),l(),a||(console.log("[ContactsView] Initializing..."),document.addEventListener("v2:viewchange",c=>{c.detail&&c.detail.view==="contacts"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),a=!0,console.log("[ContactsView] Initialized"))}catch(c){console.error("[ContactsView] Init failed:",c)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const c=document.querySelector(".v2-app")||document.body,d=document.createElement("div");d.id=t,d.className="app-view",c.appendChild(d),this.container=d},render(){try{if(!this.container&&(this.init(),!this.container))return;l();const c=e.cineFeaturesContacts;if(!c){this.container.innerHTML=`
                        <div class="view-empty-state">
                            <p>${r("statusUnavailable")}</p>
                        </div>
                    `;return}const d=c.loadStoredContacts(),p=`
                    <header class="view-header swiss-header">
                        <div class="header-content">
                            <h1 class="swiss-title">${r("contactsViewTitle")}</h1>
                            <div class="swiss-subtitle">
                                <span class="count-badge">${d?d.length:0}</span>
                                ${r("contactsViewSubtitle")}
                            </div>
                        </div>
                        <div class="view-header-actions contacts-toolbar">
                            <button class="v2-btn v2-btn-secondary" id="btn-import-vcard">
                                <span class="icon">upload_file</span>
                                <span>${r("buttonImportVCard")}</span>
                            </button>
                            <button class="v2-btn v2-btn-secondary" id="btn-export-contacts" ${!d||d.length===0?"disabled":""}>
                                <span class="icon">download</span>
                                <span>${r("buttonExportContacts")}</span>
                            </button>
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact">
                                <span class="icon">add</span>
                                <span>${r("buttonAddContact")}</span>
                            </button>
                            <input type="file" id="import-vcard-input" accept=".vcf,.vcard,text/vcard" class="visually-hidden" />
                        </div>
                    </header>
                `;let b='<div class="view-content swiss-content">';b+=this.renderProfileSection(),!d||d.length===0?b+=`
                        <div class="view-empty-state swiss-empty-state">
                             <div class="swiss-empty-icon">
                                <span class="icon">group_off</span>
                            </div>
                            <h2>${r("contactsEmptyTitle")}</h2>
                            <p>${r("contactsEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact-empty">
                                ${r("buttonAddFirstContact")}
                            </button>
                        </div>
                    `:(b+='<div class="swiss-grid">',d.forEach(f=>{b+=this.renderContactCard(f)}),b+="</div>"),b+="</div>",this.container.innerHTML=p+b,this.attachListeners()}catch(c){console.error("[ContactsView] Render failed",c),this.container&&(this.container.innerHTML=`<div class="swiss-error-state"><p>Error loading view: ${c.message}</p></div>`)}},renderProfileSection(){const c=o.name?o.name.split(" ").map(f=>f[0]).join("").substring(0,2).toUpperCase():"",d=o.avatar?`<img src="${o.avatar}" alt="${s(o.name)}" class="avatar-img">`:`<span class="avatar-initials">${c||'<span class="icon">person</span>'}</span>`,b=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Line Producer","Production Manager"].map(f=>`<option value="${f}" ${o.role===f?"selected":""}>${f}</option>`).join("");return`
                <section class="swiss-profile-section">
                    <header class="swiss-profile-header">
                        <h3>${r("profileSectionTitle")}</h3>
                        <p>${r("profileSectionDescription")}</p>
                    </header>
                    <div class="swiss-profile-card">
                        <div class="swiss-card-main">
                            <div class="swiss-card-identity">
                                <div class="swiss-avatar" id="profile-avatar-container" tabindex="0" role="button" aria-label="Change profile photo">
                                    ${d}
                                </div>
                            </div>
                            <div class="swiss-profile-form">
                                <div class="swiss-profile-field">
                                    <label for="profile-name">${r("labelName")}</label>
                                    <input type="text" id="profile-name" value="${s(o.name)}" placeholder="${r("placeholderFullName")}" autocomplete="name">
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-role">${r("labelRole")}</label>
                                    <select id="profile-role">
                                        <option value="">Select role...</option>
                                        ${b}
                                    </select>
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-phone">${r("labelPhone")}</label>
                                    <input type="tel" id="profile-phone" value="${s(o.phone)}" placeholder="${r("placeholderPhone")}" autocomplete="tel">
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-email">${r("labelEmail")}</label>
                                    <input type="email" id="profile-email" value="${s(o.email)}" placeholder="${r("placeholderEmail")}" autocomplete="email">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `},renderContactCard(c){const d=c.name?c.name.split(" ").map(C=>C[0]).join("").substring(0,2).toUpperCase():"?",p=c.avatar?`<img src="${c.avatar}" alt="${s(c.name)}" class="avatar-img">`:`<span class="avatar-initials">${d}</span>`,b=c.phone?`<a href="tel:${s(c.phone)}" class="swiss-link" onclick="event.stopPropagation()">${s(c.phone)}</a>`:'<span class="swiss-placeholder">—</span>',f=c.email?`<a href="mailto:${s(c.email)}" class="swiss-link" onclick="event.stopPropagation()">${s(c.email)}</a>`:'<span class="swiss-placeholder">—</span>';let g=c.website||"";g.includes("://")&&(g=g.split("://")[1]),g.endsWith("/")&&(g=g.slice(0,-1));const S=c.website?`<a href="${s(c.website)}" target="_blank" rel="noopener noreferrer" class="swiss-link" onclick="event.stopPropagation()">${s(g)}</a>`:'<span class="swiss-placeholder">—</span>';return`
                <div class="swiss-card contact-card" data-contact-id="${s(c.id)}" tabindex="0" role="button">
                    <div class="swiss-card-actions-overlay">
                         <button class="swiss-icon-btn btn-edit-contact" title="${r("buttonEdit")}">
                            <span class="icon">edit</span>
                        </button>
                         <button class="swiss-icon-btn btn-delete-contact" title="${r("buttonDelete")}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                    <div class="swiss-card-main">
                        <div class="swiss-card-identity">
                            <div class="swiss-avatar">
                                ${p}
                            </div>
                            <div class="swiss-identity-text">
                                <h3 class="swiss-name">${s(c.name||r("contactUnnamed"))}</h3>
                                <div class="swiss-role">${s(c.role||r("contactNoRole"))}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="swiss-card-data-grid">
                        <div class="data-cell">
                            <span class="data-label">${r("labelPhone")}</span>
                            <span class="data-value">${b}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">${r("labelEmail")}</span>
                            <span class="data-value">${f}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">${r("labelWebsite")}</span>
                            <span class="data-value">${S}</span>
                        </div>
                        ${c.notes?`
                        <div class="data-cell notes-cell">
                            <span class="data-label">${r("labelNotes")}</span>
                            <span class="data-value notes-text">${s(c.notes)}</span>
                        </div>
                        `:`
                        <div class="data-cell">
                            <span class="data-label">${r("labelNotes")}</span>
                            <span class="data-value"><span class="swiss-placeholder">—</span></span>
                        </div>
                        `}
                    </div>
                </div>
            `},attachListeners(){const c=this.container.querySelector("#btn-add-contact"),d=this.container.querySelector("#btn-add-contact-empty"),p=this.container.querySelector("#btn-import-vcard"),b=this.container.querySelector("#import-vcard-input"),f=this.container.querySelector("#btn-export-contacts");c&&(c.onclick=()=>this.showEditModal(null)),d&&(d.onclick=()=>this.showEditModal(null)),p&&b&&(p.onclick=()=>b.click(),b.onchange=g=>{const S=g.target.files?.[0];S&&w(S),g.target.value=""}),f&&(f.onclick=E),this.attachProfileListeners(),this.container.querySelectorAll(".contact-card").forEach(g=>{g.onclick=S=>{S.target.closest("button")||S.target.closest("a")||this.showEditModal(g.dataset.contactId)}}),this.container.querySelectorAll(".btn-edit-contact").forEach(g=>{g.onclick=S=>{S.stopPropagation();const C=S.target.closest(".contact-card");this.showEditModal(C.dataset.contactId)}}),this.container.querySelectorAll(".btn-delete-contact").forEach(g=>{g.onclick=S=>{S.stopPropagation();const C=S.target.closest(".contact-card");this.showDeleteConfirmation(C.dataset.contactId)}})},attachProfileListeners(){const c=this.container.querySelector("#profile-name"),d=this.container.querySelector("#profile-role"),p=this.container.querySelector("#profile-phone"),b=this.container.querySelector("#profile-email"),f=this.container.querySelector("#profile-avatar-container"),g=(S,C)=>{o[S]=C,y()};c&&(c.oninput=()=>g("name",c.value)),d&&(d.onchange=()=>g("role",d.value)),p&&(p.oninput=()=>g("phone",p.value)),b&&(b.oninput=()=>g("email",b.value)),f&&(f.onclick=()=>this.openProfileAvatarEditor(),f.onkeydown=S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),this.openProfileAvatarEditor())})},openProfileAvatarEditor(){if(e.cineAvatarEditorModal)e.cineAvatarEditorModal.open({avatar:o.avatar||"",onSave:c=>{o.avatar=c,v(),this.render()},onDelete:()=>{o.avatar="",v(),this.render()}});else{const c=document.createElement("input");c.type="file",c.accept="image/*",c.onchange=d=>{const p=d.target.files?.[0];if(p)if(e.CINE_CONTACTS_PROFILE_MODULE?.readAvatarFile)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(p,b=>{o.avatar=b,v(),this.render()},b=>console.warn("Avatar read error:",b));else{const b=new FileReader;b.onload=f=>{o.avatar=f.target?.result||"",v(),this.render()},b.readAsDataURL(p)}},c.click()}},showDeleteConfirmation(c){const d=document.createElement("div");d.className="v2-modal-backdrop",d.innerHTML=`
                <div class="v2-modal" style="max-width: 400px;">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${r("modalTitleDeleteContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body" style="padding: 24px;">
                        <p>${r("confirmDeleteContact")}</p>
                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-delete">${r("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-confirm-delete" style="background-color: var(--v2-status-error); border-color: var(--v2-status-error);">${r("buttonDeleteRed")}</button>
                    </div>
                </div>
            `,document.body.appendChild(d),requestAnimationFrame(()=>d.classList.add("open"));const p=()=>{d.classList.remove("open"),setTimeout(()=>d.remove(),200)};d.querySelector(".v2-modal-close").onclick=p,d.querySelector("#btn-cancel-delete").onclick=p,d.querySelector("#btn-confirm-delete").onclick=()=>{this.deleteContact(c),p()}},deleteContact(c){const d=e.cineFeaturesContacts;if(!d)return;const b=d.loadStoredContacts().filter(f=>f.id!==c);d.saveContactsToStorage(b)?this.render():alert("Failed to delete contact.")},showEditModal(c){const d=e.cineFeaturesContacts;if(!d)return;let p={},b=!0;if(c){const j=d.loadStoredContacts().find(G=>G.id===c);j&&(p={...j},b=!1)}b&&(p={name:"",role:"",phone:"",email:"",website:"",notes:"",avatar:""});const f=document.querySelector(".v2-modal-backdrop");f&&f.remove();const g=document.createElement("div");g.className="v2-modal-backdrop";const S=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Line Producer","Production Manager","Rental House","Post House","Agency","Client"];g.innerHTML=`
                <div class="v2-modal contact-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${r(b?"modalTitleNewContact":"modalTitleEditContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body contacts-modal-body">
                        
                        <!-- Avatar Upload Section -->
                        <div class="avatar-upload-section" id="avatarDropZone">
                            <div class="avatar-preview" id="modalAvatarPreview">
                                ${p.avatar?`<img src="${p.avatar}">`:'<span class="icon">person</span>'}
                            </div>
                            <div class="avatar-buttons">
                                <label class="v2-btn v2-btn-sm v2-btn-secondary">
                                    <span class="icon" style="font-size:14px; margin-right:4px;">upload</span>
                                    ${r("buttonUploadPhoto")}
                                    <input type="file" id="avatarUploadInput" accept="image/*" hidden>
                                </label>
                                <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost text-danger" id="removeAvatarBtn" ${p.avatar?"":"disabled"}>
                                    ${r("buttonRemovePhoto")}
                                </button>
                            </div>
                            <div class="avatar-hint">${r("avatarHint")}</div>
                        </div>

                        <!-- Basic Info Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">badge</span>
                                ${r("sectionBasicInfo")}
                            </div>
                            
                            <div class="v2-form-group">
                                <label class="v2-label">${r("labelName")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">person</span></span>
                                    <input type="text" id="contactName" class="v2-input" value="${s(p.name)}" placeholder="${r("placeholderFullName")}" required>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${r("labelRole")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">work</span></span>
                                    <input type="text" id="contactRole" class="v2-input" value="${s(p.role)}" list="roleList" placeholder="${r("placeholderRole")}">
                                </div>
                                <datalist id="roleList">
                                    ${S.map(D=>`<option value="${D}">`).join("")}
                                </datalist>
                            </div>
                        </div>

                        <!-- Contact Details Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">contacts</span>
                                ${r("sectionContactDetails")}
                            </div>

                            <div class="detail-row-group">
                                <div class="v2-form-group">
                                    <label class="v2-label">${r("labelPhone")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">call</span></span>
                                        <input type="tel" id="contactPhone" class="v2-input" value="${s(p.phone)}" placeholder="${r("placeholderPhone")}">
                                    </div>
                                </div>
                                
                                <div class="v2-form-group">
                                    <label class="v2-label">${r("labelEmail")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">mail</span></span>
                                        <input type="email" id="contactEmail" class="v2-input" value="${s(p.email)}" placeholder="${r("placeholderEmail")}">
                                    </div>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${r("labelWebsite")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">language</span></span>
                                    <input type="url" id="contactWebsite" class="v2-input" value="${s(p.website)}" placeholder="${r("placeholderWebsite")}">
                                </div>
                            </div>
                        </div>

                        <!-- Notes Section -->
                        <div class="v2-form-group">
                            <label class="v2-label">${r("labelNotes")}</label>
                            <textarea id="contactNotes" class="v2-input" rows="3" placeholder="${r("placeholderNotes")}">${s(p.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-contact">${r("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-contact">
                            <span class="icon" style="font-size:16px; margin-right:4px;">save</span>
                            ${r("buttonSaveContact")}
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(g),requestAnimationFrame(()=>g.classList.add("open"));const C=()=>{g.classList.remove("open"),setTimeout(()=>g.remove(),200)};g.querySelector(".v2-modal-close").onclick=C,g.querySelector("#btn-cancel-contact").onclick=C;const $=g.querySelector("#avatarUploadInput"),_=g.querySelector("#modalAvatarPreview"),A=g.querySelector("#removeAvatarBtn");let F=p.avatar||"";$.onchange=D=>{const j=D.target.files[0];if(j)if(e.CINE_CONTACTS_PROFILE_MODULE)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(j,G=>{F=G,_.innerHTML=`<img src="${G}">`,A.disabled=!1},G=>{alert("Error reading image: "+G)});else{const G=new FileReader;G.onload=W=>{F=W.target.result,_.innerHTML=`<img src="${F}">`,A.disabled=!1},G.readAsDataURL(j)}},A.onclick=()=>{F="",_.innerHTML='<span class="icon">person</span>',A.disabled=!0,$.value=""};const x=g.querySelector("#avatarDropZone"),Q=D=>{if(!(!D||!D.type.startsWith("image/")))if(e.CINE_CONTACTS_PROFILE_MODULE)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(D,j=>{F=j,_.innerHTML=`<img src="${j}">`,A.disabled=!1},j=>{alert("Error reading image: "+j)});else{const j=new FileReader;j.onload=G=>{F=G.target.result,_.innerHTML=`<img src="${F}">`,A.disabled=!1},j.readAsDataURL(D)}};x.addEventListener("dragover",D=>{D.preventDefault(),D.stopPropagation(),x.classList.add("drag-over")}),x.addEventListener("dragleave",D=>{D.preventDefault(),D.stopPropagation(),x.classList.remove("drag-over")}),x.addEventListener("drop",D=>{D.preventDefault(),D.stopPropagation(),x.classList.remove("drag-over");const j=D.dataTransfer?.files?.[0];j&&Q(j)}),g.querySelector("#btn-save-contact").onclick=()=>{const D=g.querySelector("#contactName").value.trim();if(!D){alert(r("alertEnterName"));return}const j={id:c||void 0,name:D,role:g.querySelector("#contactRole").value.trim(),phone:g.querySelector("#contactPhone").value.trim(),email:g.querySelector("#contactEmail").value.trim(),website:g.querySelector("#contactWebsite").value.trim(),notes:g.querySelector("#contactNotes").value.trim(),avatar:F},G=d.loadStoredContacts();let W;if(b){const U=d.normalizeContactEntry(j);W=[...G,U]}else W=G.map(U=>U.id===c?d.normalizeContactEntry({...U,...j}):U);W=d.sortContacts(W),d.saveContactsToStorage(W)?(this.render(),C()):alert("Failed to save contact.")}}};e.cineContactsView=u})(typeof window<"u"?window:void 0);const mi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(){const e="view-settings";let t=!1;function n(i){if(typeof window<"u"&&window.texts){const s=document.getElementById("languageSelect"),r=s&&s.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",l=window.texts[r]||window.texts.en;if(l)return i.split(".").reduce((v,y)=>v?v[y]:null,l)||i}return i}const a=[{v2:"v2-settings-language",legacy:"settingsLanguage",type:"value"},{v2:"v2-settings-temp-unit",legacy:"settingsTemperatureUnit",type:"value"},{v2:"v2-settings-focus-scale",legacy:"settingsFocusScale",type:"value"},{v2:"v2-settings-dark-mode",legacy:"settingsDarkMode",type:"checkbox"},{v2:"v2-settings-pink-mode",legacy:"settingsPinkMode",type:"checkbox"},{v2:"v2-settings-accent-color",legacy:"accentColorInput",type:"color"},{v2:"v2-settings-font-size",legacy:"settingsFontSize",type:"value"},{v2:"v2-settings-font-family",legacy:"settingsFontFamily",type:"value"},{v2:"v2-cam-color-a",legacy:"cameraColorA",type:"color"},{v2:"v2-cam-color-b",legacy:"cameraColorB",type:"color"},{v2:"v2-cam-color-c",legacy:"cameraColorC",type:"color"},{v2:"v2-cam-color-d",legacy:"cameraColorD",type:"color"},{v2:"v2-cam-color-e",legacy:"cameraColorE",type:"color"},{v2:"v2-settings-high-contrast",legacy:"settingsHighContrast",type:"checkbox"},{v2:"v2-settings-reduce-motion",legacy:"settingsReduceMotion",type:"checkbox"},{v2:"v2-settings-relaxed-spacing",legacy:"settingsRelaxedSpacing",type:"checkbox"},{v2:"v2-volt-v-high",legacy:"mountVoltageVHigh",type:"value"},{v2:"v2-volt-v-low",legacy:"mountVoltageVLow",type:"value"},{v2:"v2-volt-gold-high",legacy:"mountVoltageGoldHigh",type:"value"},{v2:"v2-volt-gold-low",legacy:"mountVoltageGoldLow",type:"value"},{v2:"v2-volt-b-high",legacy:"mountVoltageBHigh",type:"value"},{v2:"v2-volt-b-low",legacy:"mountVoltageBLow",type:"value"},{v2:"v2-settings-auto-backup",legacy:"settingsShowAutoBackups",type:"checkbox"},{v2:"v2-settings-backup-retention",legacy:"autoGearBackupRetention",type:"value"},{v2:"v2-settings-log-level",legacy:"loggingLevelFilter",type:"value"},{v2:"v2-settings-log-history",legacy:"loggingHistoryLimit",type:"value"},{v2:"v2-settings-log-filter",legacy:"loggingNamespaceFilter",type:"value"},{v2:"v2-settings-log-console",legacy:"loggingConsoleOutput",type:"checkbox"},{v2:"v2-settings-log-capture",legacy:"loggingCaptureConsole",type:"checkbox"},{v2:"v2-settings-log-errors",legacy:"loggingCaptureErrors",type:"checkbox"},{v2:"v2-settings-log-persist",legacy:"loggingPersistSession",type:"checkbox"}],o={init(){if(this.container=document.getElementById(e),!this.container){console.error(`[SettingsView] Container element with ID '${e}' not found.`);return}if(!t){console.log("[SettingsView] Initializing..."),document.addEventListener("v2:viewchange",s=>{s.detail&&s.detail.view==="settings"&&this.render()});const i=document.getElementById("languageSelect");i&&i.addEventListener("change",()=>{this.isVisible()&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),t=!0}},isVisible(){return this.container&&this.container.classList.contains("active")},render(){!this.container&&(this.init(),!this.container)||(this.container.innerHTML=this.getTemplate(),this.attachListeners(),this.syncFromLegacy(),this.initTabs(),this.initRehearsalSync(),this.initStatusObservers(),this.initBackupDiffSync(),this.initLogViewerSync())},getTemplate(){return`
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
        `},getAboutTabHtml(){const i=document.getElementById("aboutVersion")?.textContent||"v2.0";return`
            <div class="v2-settings-panel" id="v2-panel-about" hidden>
                <h2>${n("settingsTabAbout")}</h2>
                <div class="v2-settings-card">
                    <h3><span class="icon">info</span> ${n("appTitle")}</h3>
                    <p class="v2-text-lead" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${i}</p>
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
        `},attachListeners(){const i=this.container.querySelectorAll(".v2-tab-btn"),s=this.container.querySelectorAll(".v2-settings-panel");i.forEach(c=>{c.addEventListener("click",()=>{i.forEach(b=>{b.classList.remove("active"),b.setAttribute("aria-selected","false")}),s.forEach(b=>b.hidden=!0),c.classList.add("active"),c.setAttribute("aria-selected","true");const d=`v2-panel-${c.dataset.tab}`,p=document.getElementById(d);p&&(p.hidden=!1)})}),a.forEach(c=>{const d=document.getElementById(c.v2);if(!d)return;const p=document.getElementById(c.legacy);if(!p){console.warn(`[SettingsView] Legacy element '${c.legacy}' not found.`);return}d.addEventListener("change",b=>{if(c.type==="checkbox"?p.checked=b.target.checked:p.value=b.target.value,p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0})),["settingsLanguage","settingsTemperatureUnit","settingsFocusScale","settingsFontSize","settingsFontFamily","mountVoltageVHigh","mountVoltageVLow","mountVoltageGoldHigh","mountVoltageGoldLow","mountVoltageBHigh","mountVoltageBLow"].includes(c.legacy)){const g=document.getElementById("settingsSave");g&&g.click()}})});const r=document.getElementById("settingsLogo");r&&r.addEventListener("change",()=>{const c=document.getElementById("settingsSave");c&&c.click()});const l=(c,d)=>{const p=document.getElementById(c),b=document.getElementById(d);p&&b&&p.addEventListener("click",()=>b.click())};l("v2-btn-reset-accent","accentColorReset"),l("v2-btn-reset-voltages","mountVoltageReset"),l("v2-btn-backup","backupSettings"),l("v2-btn-restore","restoreSettings"),l("v2-btn-factory-reset","factoryResetButton"),l("v2-btn-data-backup","storageBackupNow"),l("v2-btn-storage-persist","storagePersistenceRequest"),l("v2-btn-export-log","loggingExportBtn"),l("v2-btn-support","supportLink"),l("v2-btn-bug","reportBugLink"),l("v2-btn-feature","suggestFeatureLink"),l("v2-btn-local-font","localFontsButton"),l("v2-btn-branding-upload","settingsLogo"),l("v2-btn-doc-tracker-add","documentationTrackerAddRelease");const v=document.getElementById("v2-btn-backup-diff");v&&v.addEventListener("click",()=>{const c=document.getElementById("v2-backup-diff-modal");c&&(c.style.display="flex");const d=document.getElementById("backupDiffToggleButton");d&&d.click()}),this.container.querySelectorAll('[data-action="close-diff"]').forEach(c=>{c.addEventListener("click",()=>{const d=document.getElementById("v2-backup-diff-modal");d&&(d.style.display="none");const p=document.getElementById("backupDiffToggleButton");p&&p.click()})});const E=document.getElementById("v2-btn-restore-rehearsal"),w=document.getElementById("v2-rehearsal-modal"),u=this.container.querySelectorAll('[data-action="close-rehearsal"]');E&&w&&E.addEventListener("click",()=>{const c=document.getElementById("restoreRehearsalButton");c&&c.click(),w.style.display="flex"}),u.forEach(c=>{c.addEventListener("click",()=>{w&&(w.style.display="none");const d=document.getElementById("restoreRehearsalClose");d&&d.click()})})},syncFromLegacy(){a.forEach(i=>{const s=document.getElementById(i.v2),r=document.getElementById(i.legacy);s&&r&&(i.type==="checkbox"?s.checked=r.checked:(i.type==="value"||i.type==="color")&&(s.value=r.value))})},initStatusObservers(){const i=[{legacyId:"storageStatusLastProjectValue",v2Id:"v2-status-last-project"},{legacyId:"storageStatusLastAutoBackupValue",v2Id:"v2-status-last-auto"},{legacyId:"storageStatusLastFullBackupValue",v2Id:"v2-status-last-full"},{legacyId:"storagePersistenceStatus",v2Id:"v2-status-persistence"}],s=new MutationObserver(()=>{i.forEach(u=>{const c=document.getElementById(u.legacyId),d=document.getElementById(u.v2Id);c&&d&&(d.textContent=c.textContent)})});i.forEach(u=>{const c=document.getElementById(u.legacyId);if(c){s.observe(c,{childList:!0,characterData:!0,subtree:!0});const d=document.getElementById(u.v2Id);d&&(d.textContent=c.textContent)}});const r=[{legacyId:"localFontsStatus",v2Id:"v2-status-local-font"}],l=new MutationObserver(()=>{r.forEach(u=>{const c=document.getElementById(u.legacyId),d=document.getElementById(u.v2Id);c&&d&&(d.textContent=c.textContent)})});r.forEach(u=>{const c=document.getElementById(u.legacyId);c&&l.observe(c,{childList:!0,characterData:!0,subtree:!0})});const v=document.getElementById("settingsLogoPreview"),y=document.getElementById("v2-branding-preview");v&&y&&(new MutationObserver(()=>{if(v.hidden||v.innerHTML.trim()==="")y.innerHTML='<span style="color: var(--v2-text-muted);">No custom logo set</span>';else{y.innerHTML=v.innerHTML;const c=y.querySelector("img, svg");c&&(c.style.maxWidth="100%",c.style.height="auto")}}).observe(v,{childList:!0,attributes:!0,subtree:!0}),!v.hidden&&v.innerHTML.trim()!==""&&(y.innerHTML=v.innerHTML));const E=document.getElementById("documentationTrackerList"),w=document.getElementById("v2-doc-tracker-list");E&&w&&new MutationObserver(()=>{E.children.length===0?w.innerHTML='<p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">No releases tracked.</p>':(w.innerHTML="",Array.from(E.children).forEach(c=>{const d=c.cloneNode(!0);d.style.padding="0.5rem",d.style.borderBottom="1px solid var(--v2-border-subtle)",w.appendChild(d)}))}).observe(E,{childList:!0,subtree:!0})},initTabs(){const i=this.container.querySelector(".v2-tab-btn.active");if(i){const s=`v2-panel-${i.dataset.tab}`,r=document.getElementById(s);r&&(r.hidden=!1)}},initRehearsalSync(){const i=document.querySelectorAll('input[name="v2RehearsalMode"]'),s=document.getElementsByName("restoreRehearsalMode");i.forEach(p=>{p.addEventListener("change",()=>{s.forEach(b=>{b.value===p.value&&(b.checked=!0,b.dispatchEvent(new Event("change",{bubbles:!0})))})})});const r=document.getElementById("v2-rehearsal-browse-btn"),l=document.getElementById("restoreRehearsalBrowse");r&&l&&r.addEventListener("click",()=>l.click());const v=document.getElementById("v2-rehearsal-proceed-btn"),y=document.getElementById("v2-rehearsal-abort-btn");v&&v.addEventListener("click",()=>{const p=document.getElementById("restoreRehearsalProceed");p&&p.click(),document.getElementById("v2-rehearsal-modal").style.display="none"}),y&&y.addEventListener("click",()=>{const p=document.getElementById("restoreRehearsalAbort");p&&p.click()});const E=document.getElementById("restoreRehearsalTableBody"),w=document.getElementById("v2-rehearsal-table-body"),u=document.getElementById("restoreRehearsalFileName"),c=document.getElementById("v2-rehearsal-filename"),d=document.getElementById("restoreRehearsalProceed");E&&w&&(new MutationObserver(()=>{w.innerHTML="",Array.from(E.children).forEach(b=>{const f=b.querySelectorAll("td");if(f.length>=4){const g=f[0].textContent,S=f[3].innerHTML,C=document.createElement("tr");C.innerHTML=`
                            <td style="padding: 0.75rem;"><strong>${g}</strong></td>
                            <td style="padding: 0.75rem;">${S}</td>
                        `,w.appendChild(C)}}),v&&d&&(v.disabled=d.disabled,d.style.display==="none"?v.style.display="none":v.style.display="inline-block")}).observe(E,{childList:!0,subtree:!0}),d&&(new MutationObserver(()=>{v&&(v.disabled=d.disabled,d.style.display==="none"?v.style.display="none":v.style.display="inline-block")}).observe(d,{attributes:!0}),v&&(v.disabled=d.disabled,d.style.display==="none"?v.style.display="none":v.style.display="inline-block"))),u&&c&&new MutationObserver(()=>{c.textContent=u.textContent}).observe(u,{childList:!0,characterData:!0,subtree:!0})},initBackupDiffSync(){const i=document.getElementById("v2-diff-primary"),s=document.getElementById("v2-diff-secondary"),r=document.getElementById("backupDiffPrimary"),l=document.getElementById("backupDiffSecondary"),v=()=>{i&&r&&(i.innerHTML=r.innerHTML,i.value=r.value),s&&l&&(s.innerHTML=l.innerHTML,s.value=l.value)};if(v(),r&&l){const f=new MutationObserver(v);f.observe(r,{childList:!0}),f.observe(l,{childList:!0})}i&&i.addEventListener("change",()=>{r&&(r.value=i.value,r.dispatchEvent(new Event("change",{bubbles:!0})))}),s&&s.addEventListener("change",()=>{l&&(l.value=s.value,l.dispatchEvent(new Event("change",{bubbles:!0})))});const y=document.getElementById("backupDiffSummary"),E=document.getElementById("v2-diff-summary");y&&E&&new MutationObserver(()=>{E.innerHTML=y.innerHTML}).observe(y,{childList:!0,subtree:!0});const w=document.getElementById("backupDiffList"),u=document.getElementById("v2-diff-list");w&&u&&new MutationObserver(()=>{u.innerHTML=w.innerHTML,Array.from(u.querySelectorAll("li")).forEach(g=>{g.style.padding="0.5rem",g.style.borderBottom="1px solid var(--v2-border-subtle)"})}).observe(w,{childList:!0,subtree:!0});const c=document.getElementById("v2-btn-diff-export"),d=document.getElementById("backupDiffExport");c&&d&&c.addEventListener("click",()=>d.click());const p=document.getElementById("v2-diff-notes"),b=document.getElementById("backupDiffNotes");p&&b&&(p.value=b.value,p.addEventListener("input",()=>{b.value=p.value,b.dispatchEvent(new Event("input",{bubbles:!0}))}),new MutationObserver(()=>{document.activeElement!==p&&(p.value=b.value)}).observe(b,{attributes:!0,attributeFilter:["value"]}),b.addEventListener("input",()=>{document.activeElement!==p&&(p.value=b.value)}))},initLogViewerSync(){const i=document.getElementById("loggingHistory"),s=document.getElementById("v2-log-history-list");i&&s&&(new MutationObserver(()=>{s.innerHTML=i.innerHTML,Array.from(s.querySelectorAll("li")).forEach(l=>{l.style.padding="0.25rem 0",l.style.borderBottom="1px dashed var(--v2-border-subtle)"})}).observe(i,{childList:!0,subtree:!0}),s.innerHTML=i.innerHTML)}};typeof window<"u"&&(window.cineSettingsView=o)})();const gi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const t="view-own-gear";let n=!1;function a(s){return typeof s!="string"?"":s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function o(s){if(typeof window<"u"&&window.texts){const r=document.getElementById("languageSelect"),l=r&&r.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",v=window.texts[l]||window.texts.en;if(v)return s.split(".").reduce((y,E)=>y?y[E]:null,v)||s}return s}const i={container:null,init(){try{this.container=document.getElementById(t),this.container||this.createViewContainer(),n||(console.log("[OwnGearView] Initializing..."),document.addEventListener("v2:viewchange",s=>{s.detail&&s.detail.view==="ownGear"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),n=!0,console.log("[OwnGearView] Initialized"))}catch(s){console.error("[OwnGearView] Init failed:",s)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const s=document.querySelector(".v2-main")||document.querySelector(".v2-app")||document.body,r=document.createElement("section");r.id=t,r.className="app-view",s.appendChild(r),this.container=r},render(){try{if(!this.container&&(this.init(),!this.container))return;const s=e.cineFeaturesOwnGear;if(!s){this.container.innerHTML=`
                        <div class="v2-empty-state">
                            <p>${o("statusUnavailable")||"Module not available"}</p>
                        </div>
                    `;return}const r=s.loadStoredOwnGearItems(),l=`
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
                `;let v='<div class="view-content">';!r||r.length===0?v+=`
                        <div class="own-gear-empty-state">
                            <span class="icon">inventory_2</span>
                            <h3>${o("ownGearEmptyTitle")}</h3>
                            <p>${o("ownGearEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear-empty">
                                ${o("buttonAddFirstGearItem")}
                            </button>
                        </div>
                    `:(v+='<div class="own-gear-list">',r.forEach(y=>{v+=this.renderItemRow(y)}),v+="</div>"),v+="</div>",this.container.innerHTML=l+v,this.attachListeners()}catch(s){console.error("[OwnGearView] Render failed",s),this.container&&(this.container.innerHTML=`<div class="v2-error-state"><p>Error loading view: ${s.message}</p></div>`)}},renderItemRow(s){return`
                <div class="own-gear-item-card" data-item-id="${a(s.id)}">
                    <div class="own-gear-item-info">
                        <div class="own-gear-item-name">${a(s.name)}</div>
                        ${s.notes?`<div class="own-gear-item-notes">${a(s.notes)}</div>`:""}
                    </div>
                     <div class="own-gear-item-meta">
                        ${s.quantity?`<span class="own-gear-badge qty-badge">${o("labelQtyPrefix")}${a(s.quantity)}</span>`:""}
                        ${s.source?`<span class="own-gear-badge source-badge">${o("labelSourcePrefix")}${a(s.source)}</span>`:""}
                    </div>
                    <div class="own-gear-item-actions">
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-own-gear" title="${o("buttonEdit")}" data-id="${a(s.id)}">
                            <span class="icon">edit</span>
                        </button>
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-own-gear" title="${o("buttonDelete")}" data-id="${a(s.id)}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                </div>
            `},attachListeners(){const s=this.container.querySelector("#btn-add-own-gear"),r=this.container.querySelector("#btn-add-own-gear-empty");s&&(s.onclick=()=>this.showEditModal(null)),r&&(r.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".btn-edit-own-gear").forEach(l=>{l.onclick=v=>{v.stopPropagation();const y=v.currentTarget.dataset.id;y&&this.showEditModal(y)}}),this.container.querySelectorAll(".btn-delete-own-gear").forEach(l=>{l.onclick=v=>{v.stopPropagation();const y=v.currentTarget.dataset.id;y&&confirm(o("confirmDeleteGearItem"))&&this.deleteItem(y)}})},deleteItem(s){const r=e.cineFeaturesOwnGear;if(!r)return;const v=r.loadStoredOwnGearItems().filter(y=>y.id!==s);r.persistOwnGearItems(v)?this.render():alert(o("alertSaveItemFailed"))},showEditModal(s){const r=e.cineFeaturesOwnGear;if(!r)return;let l={},v=!0;if(s){const d=r.loadStoredOwnGearItems().find(p=>p.id===s);d&&(l={...d},v=!1)}v&&(l={name:"",quantity:"",notes:"",source:""});const y=document.querySelector(".v2-modal-backdrop");y&&y.remove();const E=document.createElement("div");E.className="v2-modal-backdrop",E.innerHTML=`
                <div class="v2-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${o(v?"modalTitleNewGearItem":"modalTitleEditGearItem")}</h3>
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
            `,document.body.appendChild(E),requestAnimationFrame(()=>E.classList.add("open"));const w=()=>{E.classList.remove("open"),setTimeout(()=>E.remove(),200)},u=E.querySelector("#ownGearName");u.focus(),E.querySelector(".v2-modal-close").onclick=w,E.querySelector("#btn-cancel-own-gear").onclick=w,E.querySelector("#btn-save-own-gear").onclick=()=>{const c=u.value.trim();if(!c){alert(o("alertEnterName"));return}const d={id:s||void 0,name:c,quantity:E.querySelector("#ownGearQuantity").value.trim(),notes:E.querySelector("#ownGearNotes").value.trim()},p=r.loadStoredOwnGearItems();let b;if(v?b=r.normalizeOwnGearRecord(d):b=r.normalizeOwnGearRecord({...l,...d}),!b){alert(o("alertInvalidItemData"));return}let f;v?f=[...p,b]:f=p.map(g=>g.id===s?b:g),r.persistOwnGearItems(f)?(this.render(),w()):alert(o("alertSaveItemFailed"))}}};e.cineOwnGearView=i})(typeof window<"u"?window:void 0);const fi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const t=[{id:"v2-welcome",titleKey:"helpV2WelcomeTitle",keywordsKey:"helpV2WelcomeKeywords",iconKey:"overview",contentKey:"helpV2WelcomeContent"},{id:"v2-projects",titleKey:"helpV2ProjectsTitle",keywordsKey:"helpV2ProjectsKeywords",iconKey:"load",contentKey:"helpV2ProjectsContent"},{id:"v2-sidebar-search",titleKey:"helpV2SidebarSearchTitle",keywordsKey:"helpV2SidebarSearchKeywords",iconKey:"distance",contentKey:"helpV2SidebarSearchContent"},{id:"v2-device-library",titleKey:"helpV2DeviceLibraryTitle",keywordsKey:"helpV2DeviceLibraryKeywords",iconKey:"camera",contentKey:"helpV2DeviceLibraryContent"},{id:"v2-contacts",titleKey:"helpV2ContactsTitle",keywordsKey:"helpV2ContactsKeywords",iconKey:"contacts",contentKey:"helpV2ContactsContent"},{id:"v2-settings",titleKey:"helpV2SettingsTitle",keywordsKey:"helpV2SettingsKeywords",iconKey:"settingsData",contentKey:"helpV2SettingsContent"},{id:"v2-save-share-backup",titleKey:"helpV2SaveShareBackupTitle",keywordsKey:"helpV2SaveShareBackupKeywords",iconKey:"settingsBackup",contentKey:"helpV2SaveShareBackupContent"},{id:"v2-auto-gear",titleKey:"helpV2AutoGearTitle",keywordsKey:"helpV2AutoGearKeywords",iconKey:"settingsAutoGear",contentKey:"helpV2AutoGearContent"},{id:"v2-print-export",titleKey:"helpV2PrintExportTitle",keywordsKey:"helpV2PrintExportKeywords",iconKey:"fileExport",contentKey:"helpV2PrintExportContent"}],n=[{id:"v2-quick-start",titleKey:"helpV2QuickStartTitle",keywordsKey:"helpV2QuickStartKeywords",iconKey:"check",contentKey:"helpV2QuickStartContent"},{id:"v2-data-safety",titleKey:"helpV2DataSafetyTitle",keywordsKey:"helpV2DataSafetyKeywords",iconKey:"settingsBackup",contentKey:"helpV2DataSafetyContent"},{id:"v2-shortcuts",titleKey:"helpV2ShortcutsTitle",keywordsKey:"helpV2ShortcutsKeywords",iconKey:"resetView",contentKey:"helpV2ShortcutsContent"},{id:"v2-features",titleKey:"helpV2FeaturesTitle",keywordsKey:"helpV2FeaturesKeywords",iconKey:"gearList",contentKey:"helpV2FeaturesContent"}];t.push(...n),e.cineV2HelpData=t})(typeof window<"u"?window:void 0);const bi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const t=e.cineV2HelpData||[],n="overview",a={projectManagement:"load",saveShareBackup:"settingsBackup",deviceConfiguration:"camera",powerCalculation:"batteryBolt",connectionDiagram:"plug",gearList:"gearList",contacts:"contacts",ownGear:"camera",settings:"settingsGeneral",offlineUse:"wifi",troubleshooting:"feedback",shortcuts:"resetView",pinkMode:"sun"};function o(){if(!e.texts)return null;const u=e.currentLanguage||e.currentLang||e.document?.documentElement?.lang||"en";return e.texts[u]||e.texts.en||null}function i(u){const c=o();return c&&c[u]||u}function s(u){const c=e.ICON_GLYPHS;return c&&u&&c[u]?c[u]:c&&c[n]?c[n]:null}function r(u){const c=u.titleKey?i(u.titleKey):u.title,d=u.keywordsKey?i(u.keywordsKey):u.keywords,p=u.contentKey?i(u.contentKey):u.content;return{...u,title:c,keywords:d,content:p,icon:s(u.iconKey||u.icon||n)}}function l(){const u=["v2-quick-start","v2-shortcuts","v2-data-safety","v2-features"],c=t.map(r);return{essentials:c.filter(d=>u.includes(d.id)),guides:c.filter(d=>!u.includes(d.id))}}function v(u){return u?u.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>").split(/\n\n+/).map(d=>d.trim().startsWith("- ")?`<ul>${d.trim().split(/\n/).map(b=>`<li>${b.replace(/^- /,"")}</li>`).join("")}</ul>`:`<p>${d}</p>`).join(""):""}function y(){let u=e.cineCoreLocalization||e.cineCoreLocalizationBridge||e.cineModuleBase&&e.cineModuleBase.resolveLocalization&&e.cineModuleBase.resolveLocalization();if(!u||typeof u.getString!="function")if(typeof e.getText=="function")u={getString:S=>e.getText(S)};else if(e.texts){const S=(_,A)=>A.split(".").reduce((F,x)=>F&&F[x],_),C=e.currentLanguage||e.currentLang||"en",$=e.texts[C]||e.texts.en;u={getString:_=>S($,_)||""}}else return console.warn("[HelpService] Localization module not found. V1 topics unavailable."),[];const c=["projectManagement","saveShareBackup","deviceConfiguration","powerCalculation","connectionDiagram","gearList","contacts","ownGear","settings","offlineUse","troubleshooting","shortcuts","pinkMode"],d=e.currentLanguage||e.currentLang||e.document?.documentElement?.lang||"en",p=e.texts&&(e.texts[d]||e.texts.en),b=p&&p.helpTopics,f=b&&typeof b=="object"?Object.keys(b):[];return(f.length?[...c.filter(S=>f.includes(S)),...f.filter(S=>!c.includes(S))]:c).map(S=>{const C=b&&b[S],$=C&&C.title||u.getString(`helpTopics.${S}.title`),_=C&&C.content||u.getString(`helpTopics.${S}.content`);return $?{id:`v1-${S}`,category:"reference",title:$,keywords:$,icon:s(a[S]||n),content:v(_)}:null}).filter(S=>S!==null)}function E(){const u=t.map(r),c=y();return[...u,...c]}function w(){const u=l();return{essentials:{title:i("helpGroupEssentials"),items:u.essentials},guide:{title:i("helpGroupGuides"),items:u.guides},reference:{title:i("helpGroupReference"),items:y()}}}e.cineHelpService={getAllSections:E,getGroupedSections:w}})(typeof window<"u"?window:void 0);const yi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),Rn="v2HelpToc",Hn="v2HelpContent",hi="v2HelpSearch",wi="v2HelpSearchStatus";let Re=null,wt=!1,se=null;function Ee(e){return document.getElementById(e)}function pe(e){if(typeof window<"u"&&window.texts){const t=document.getElementById("languageSelect"),n=t&&t.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",a=window.texts[n]||window.texts.en;if(a)return a[e]||e}return e}function Ei(e,t,n){let a=e.replace("{count}",String(t));return n&&a.indexOf("{query}")!==-1&&(a=a.replace("{query}",n)),a}function Qe(e,t){if(!e)return"";const n=window.iconMarkup||window.cineIcons&&window.cineIcons.iconMarkup;if(typeof n=="function")return n(e,t);const a=e.char||e;return a?`<span class="icon-glyph ${t||""}" aria-hidden="true" data-icon-font="uicons">${a}</span>`:""}function Si(){const e=Ee(Hn);if(!e)return[];e.innerHTML="";const t=[],n=window.cineHelpService;if(!n)return e.innerHTML=`<div class="v2-empty-state"><p>${pe("helpServiceUnavailable")}</p></div>`,[];const a=n.getGroupedSections(),o=[a.essentials,a.guide,a.reference].filter(r=>r&&r.items.length>0);o.forEach((r,l)=>{if(Li(e,r.title,r.items,t),l<o.length-1){const v=document.createElement("hr");v.className="v2-help-divider",e.appendChild(v)}});const i=document.createElement("div");i.id="v2HelpNoResults",i.className="v2-help-no-results",i.style.display="none";const s=Qe(window.ICON_GLYPHS&&window.ICON_GLYPHS.distance,"v2-help-no-results-icon");return i.innerHTML=`
        <div class="v2-help-no-results-content">
            ${s}
            <h3>${pe("helpSearchNoResultsTitle")}</h3>
            <p>${pe("helpSearchNoResultsHint")}</p>
        </div>
    `,e.appendChild(i),t}function Li(e,t,n,a){a.push({type:"header",title:t}),n.forEach(o=>{const i=document.createElement("section");i.className="v2-help-section",i.id=o.id,i.setAttribute("data-keywords",(o.keywords||"")+" "+(o.title||""));const s=document.createElement("h2");o.icon?(s.innerHTML=Qe(o.icon,"v2-help-icon"),s.appendChild(document.createTextNode(o.title||""))):s.textContent=o.title;const r=document.createElement("div");r.className="v2-help-content-body",r.innerHTML=o.content,i.appendChild(s),i.appendChild(r),e.appendChild(i),a.push({type:"item",id:o.id,title:o.title,keywords:o.keywords,icon:o.icon})})}function ki(e){const t=Ee(Rn);if(!t)return;t.innerHTML="";const n=document.createElement("ul");e.forEach(a=>{if(a.type==="header"){const o=document.createElement("li");o.className="v2-help-toc-header",o.textContent=a.title,n.appendChild(o)}else{const o=document.createElement("li"),i=document.createElement("a");i.href=`#${a.id}`,i.className="v2-help-toc-link",i.dataset.target=a.id,i.dataset.title=a.title||"",i.dataset.keywords=a.keywords||"",a.icon?(i.innerHTML=Qe(a.icon,"v2-toc-icon"),i.appendChild(document.createTextNode(a.title||""))):i.textContent=a.title,i.addEventListener("click",s=>{s.preventDefault();const r=document.getElementById(a.id);r&&r.scrollIntoView({behavior:"smooth"}),On(a.id)}),o.appendChild(i),n.appendChild(o)}}),t.appendChild(n)}function On(e){document.querySelectorAll(".v2-help-toc-link").forEach(t=>{t.dataset.target===e?t.classList.add("active"):t.classList.remove("active")})}function Ci(){Re&&Re.disconnect();const e={root:Ee(Hn),rootMargin:"-10% 0px -80% 0px",threshold:0},t=n=>{n.forEach(a=>{a.isIntersecting&&On(a.target.id)})};Re=new IntersectionObserver(t,e),document.querySelectorAll(".v2-help-section").forEach(n=>{Re.observe(n)})}function Ii(){const e=Ee(hi);if(!e)return;const t=o=>{if(!o)return;let i=null,s=!1;Array.from(o.children).forEach(r=>{r.classList.contains("v2-help-toc-header")?(i&&(i.style.display=s?"block":"none"),i=r,s=!1):i&&r.style.display!=="none"&&(s=!0)}),i&&(i.style.display=s?"block":"none")},n=document.createElement("button");n.className="v2-help-search-clear",n.style.display="none",n.type="button",n.setAttribute("aria-label",pe("helpSearchClearLabel")),n.title=pe("helpSearchClearLabel"),n.innerHTML=Qe(window.ICON_GLYPHS&&window.ICON_GLYPHS.resetView,"v2-help-search-clear-icon");const a=document.createElement("div");a.id=wi,a.className="visually-hidden",a.setAttribute("aria-live","polite"),a.setAttribute("aria-atomic","true"),a.setAttribute("role","status"),e.parentNode.appendChild(n),e.parentNode.appendChild(a),se=()=>{const o=e.value.trim(),i=o.toLowerCase(),s=document.querySelectorAll(".v2-help-section"),r=Ee("v2HelpNoResults"),l=Ee(Rn),v=l?l.querySelector("ul"):null;let y=!1,E=0;if(s.forEach(w=>{const u=w.innerText.toLowerCase(),c=(w.dataset.keywords||"").toLowerCase(),d=u.includes(i)||c.includes(i);w.style.display=d?"block":"none",d&&(y=!0,E+=1)}),document.querySelectorAll(".v2-help-toc-link").forEach(w=>{const u=document.getElementById(w.dataset.target),c=u&&u.style.display!=="none",d=w.parentElement;d&&(d.style.display=c?"block":"none")}),t(v),document.querySelectorAll(".v2-help-divider").forEach(w=>{w.style.display=i?"none":"block"}),r&&(r.style.display=!y&&i?"flex":"none"),n.style.display=i.length>0?"block":"none",a){const w=pe(i?"helpSearchStatusWithQuery":"helpSearchStatusAll");a.textContent=Ei(w,E,o)}},e.addEventListener("input",()=>{se&&se()}),n.addEventListener("click",()=>{e.value="",se&&se(),e.focus()})}function xi(){const e=document.querySelector(".v2-help-search-clear");if(!e)return;const t=pe("helpSearchClearLabel");e.setAttribute("aria-label",t),e.title=t}function qn(){wt||(console.log("[HelpView] Initializing..."),window.cineViewManager&&window.cineViewManager.registerView("help",{onEnter:()=>Nn(),onLeave:()=>{}}),Et(),Ii(),document.addEventListener("v2:languagechange",()=>{Et(),xi(),se&&se()}),wt=!0)}function Et(){const e=Si();e&&(ki(e),setTimeout(()=>Ci(),100)),se&&se()}function Nn(){wt||qn()}const Fn={init:qn,enter:Nn,refresh:Et};window.cineHelpView=Fn;const Pi=Object.freeze(Object.defineProperty({__proto__:null,cineHelpView:Fn},Symbol.toStringTag,{value:"Module"})),it="backups";function q(e){if(typeof window<"u"&&window.texts){const t=document.getElementById("languageSelect"),n=t&&t.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",a=window.texts[n]||window.texts.en;if(a)return e.split(".").reduce((o,i)=>o?o[i]:null,a)||e}return e}function ue(e,t={}){return typeof e!="string"?"":e.replace(/\{(\w+)\}/gu,(n,a)=>Object.prototype.hasOwnProperty.call(t,a)?String(t[a]):n)}function $i(e){return String(e||"").replace(/\.json$/i,"").replace(/^snapshot_/,"")}function Di(e){const t=new Date().toISOString().replace(/[^\d]/gu,"-");return`${e?`${e}-restore-safety`:"restore-safety"}-${t}`}function Bi(){const e=document.createElement("div");return e.className="v2-spinner",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-label",q("backupVaultLoading")),e}function Ti(e,t){const n=document.createElement("div");n.className="v2-empty-state";const a=document.createElement("p");if(a.textContent=e,n.appendChild(a),t){const o=document.createElement("p");o.className="subtext",o.textContent=t,n.appendChild(o)}return n}function Ai(e){const t=document.createElement("div");return t.className="v2-error-state",t.textContent=e,t}function Xt(e,t,n,a){const o=document.createElement("button");return o.type="button",o.className=t,o.textContent=e,a&&(o.setAttribute("aria-label",a),o.setAttribute("title",a)),o.addEventListener("click",n),o}async function Vi(e){if(!e)return!0;try{const t=await Jt.loadProject(e);if(!t||!t.data)return!0;const n=t.meta?{_meta:t.meta,data:t.data}:t.data,a=Di(e);return await He.saveSnapshot(a,n),!0}catch(t){return console.warn("Failed to capture safety snapshot before restore",t),!1}}const zn={init(){window.cineViewManager&&window.cineViewManager.registerView(it,{onEnter:()=>this.render(),onLeave:()=>{}});const e=document.getElementById("navAutoBackups");e&&(e.style.display="flex")},async render(){const e=document.querySelector(".v2-main")||document.querySelector(".v2-app")||document.body;let t=document.getElementById(`view-${it}`);t||(t=document.createElement("section"),t.id=`view-${it}`,t.className="app-view",t.innerHTML=`
                <header class="view-header">
                    <button class="v2-mobile-menu-toggle" aria-label="${q("menuToggleLabel")}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <h1>${q("backupVaultHeading")}</h1>
                </header>
                <div class="view-content">
                    <div class="v2-backup-list" id="backupList">
                        <div class="v2-empty-state">${q("backupVaultLoading")}</div>
                    </div>
                </div>
            `,e.appendChild(t));const n=t.querySelector("#backupList");n.replaceChildren(Bi());try{const a=await He.listSnapshots();if(a.length===0){n.replaceChildren(Ti(q("backupVaultEmptyTitle"),q("backupVaultEmptySubtitle")));return}const o=document.createElement("ul");o.className="v2-list";for(const i of a){const s=$i(i),r=document.createElement("li");r.className="v2-list-item";const l=document.createElement("div");l.className="v2-list-content";const v=document.createElement("div");v.className="v2-list-title",v.textContent=s,l.appendChild(v);const y=document.createElement("div");y.className="v2-list-actions";const E=q("buttonRestore"),w=ue(q("backupVaultRestoreAriaLabel"),{name:s}),u=q("buttonDelete"),c=ue(q("backupVaultDeleteAriaLabel"),{name:s});y.appendChild(Xt(E,"v2-btn v2-btn-sm",()=>this.restore(i,s),w)),y.appendChild(Xt(u,"v2-btn v2-btn-sm v2-btn-danger",()=>this.delete(i,s),c)),r.appendChild(l),r.appendChild(y),o.appendChild(r)}n.replaceChildren(o)}catch(a){const o=ue(q("backupVaultLoadError"),{message:a&&a.message?a.message:q("backupVaultLoadErrorFallback")});n.replaceChildren(Ai(o))}},async restore(e,t=""){const n=ue(q("backupVaultRestoreConfirm"),{name:t||e});if(confirm(n))try{const a=await He.restoreSnapshot(e),{data:o,meta:i}=Gn(a),s=e.replace(/\.json$/i,""),r=i&&i.docId||o&&o.id||s;if(!o){alert(q("backupVaultUnknownFormat"));return}if(!await Vi(r)){alert(q("restoreBackupFailed"));return}const v=i?{...i,lock:null}:null,y=await Jt.saveProject(r,o,v);if(!y||y.success===!1){const E=y&&y.error==="PROJECT_LOCKED"?q("backupVaultRestoreLocked"):q("backupVaultRestoreUnknownError");alert(ue(q("backupVaultRestoreFailed"),{reason:E}));return}alert(q("backupVaultRestoreSuccess"))}catch(a){const o=ue(q("backupVaultRestoreError"),{message:a&&a.message?a.message:q("backupVaultRestoreUnknownError")});alert(o)}},async delete(e,t=""){const n=ue(q("backupVaultDeleteConfirm"),{name:t||e});if(confirm(n))try{await He.deleteSnapshot(e),await this.render()}catch(a){const o=ue(q("backupVaultDeleteError"),{message:a&&a.message?a.message:q("backupVaultDeleteErrorFallback")});alert(o)}}};window.cineBackupsView=zn;const Mi=Object.freeze(Object.defineProperty({__proto__:null,cineBackupsView:zn},Symbol.toStringTag,{value:"Module"}));export{qt as V};
//# sourceMappingURL=v2-ui-ANVc2KBG.js.map
