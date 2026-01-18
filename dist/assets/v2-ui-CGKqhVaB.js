const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-P40cA4Iv.js","assets/core-modules-DlPoJ4C3.js","assets/vendor-BnBlqqbr.js","assets/data-So-wGb1N.js","assets/main-BamV2Yfq.css","assets/rules-view-H7Qqifg_.css","assets/contacts-Do1OeS7p.css","assets/settings-B7NLmzNQ.css","assets/owned-gear-D1_apNqb.css"])))=>i.map(i=>d[i]);
import{_,p as te,d as Oe,u as zn,s as Jt}from"./core-modules-DlPoJ4C3.js";import{d as Gn}from"./data-So-wGb1N.js";const x=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{};let Ht=!1,le=!1;const Ne="cine_use_v2_ui";function Kn(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2")){const n=e.get("v2")==="true";return localStorage.setItem(Ne,n.toString()),n}return localStorage.getItem(Ne)==="true"}catch{return!1}}function Un(){const e=localStorage.getItem("darkMode")==="true";document.body.classList.toggle("dark-mode",e);const n=localStorage.getItem("cameraPowerPlanner_pinkMode")==="true"||localStorage.getItem("pinkMode")==="true";document.body.classList.toggle("pink-mode",n)}function St(){try{localStorage.setItem(Ne,"true"),le=!0,document.body.classList.add("v2-mode"),Un();const e=document.getElementById("topBar"),n=document.getElementById("mainContent"),t=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),o=document.getElementById("cineGlobalLoadingIndicator");o&&(o.style.display="none"),e&&(e.style.display="none"),n&&(n.style.display="none"),t&&(t.style.display="none"),a&&(a.style.display="none");const i=document.getElementById("siteFooter");i&&(i.style.display="none");const r=document.getElementById("installPromptBanner"),s=document.getElementById("offlineIndicator"),l=document.getElementById("backupNotificationContainer");r&&(r.style.display="none"),s&&(s.style.display="none"),l&&(l.style.display="none");const p=document.getElementById("v2-app");if(p&&(p.style.display="",p.setAttribute("aria-hidden","false")),x.cineProjectDetail&&typeof x.cineProjectDetail.init=="function"&&x.cineProjectDetail.init(),x.cineProjectDashboard&&typeof x.cineProjectDashboard.init=="function"){const y=typeof x.cineProjectDashboard.createUiOnlyDataProvider=="function"?x.cineProjectDashboard.createUiOnlyDataProvider():null;x.cineProjectDashboard.init({dataProvider:y})}return x.cineV2Sidebar&&typeof x.cineV2Sidebar.init=="function"&&x.cineV2Sidebar.init(),x.cineViewManager&&typeof x.cineViewManager.enableV2=="function"&&x.cineViewManager.enableV2(),Yn(),st(),console.log("[V2 Bootstrap] V2 UI enabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to enable V2:",e),st(),!1}}function Wn(){let e=document.getElementById("v2-loader");e||(e=document.createElement("div"),e.id="v2-loader",e.innerHTML=`
                <div class="v2-loader-content">
                    <div class="v2-spinner"></div>
                    <div class="v2-loader-text">Loading Cine Power Planner...</div>
                </div>
            `,document.body.appendChild(e)),e.classList.add("visible")}function st(){const e=document.getElementById("v2-loader");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},500))}function Lt(){try{localStorage.setItem(Ne,"false"),le=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("topBar"),n=document.getElementById("mainContent"),t=document.getElementById("sideMenu"),a=document.getElementById("menuOverlay"),o=document.getElementById("siteFooter");e&&(e.style.display=""),n&&(n.style.display=""),t&&(t.style.display=""),a&&(a.style.display=""),o&&(o.style.display="");const i=document.getElementById("v2-app");return i&&(i.style.display="none",i.setAttribute("aria-hidden","true")),x.cineViewManager&&typeof x.cineViewManager.disableV2=="function"&&x.cineViewManager.disableV2(),console.log("[V2 Bootstrap] V2 UI disabled"),!0}catch(e){return console.error("[V2 Bootstrap] Failed to disable V2:",e),!1}}function Yn(){const e=document.getElementById("v2ExitBtn");e&&!e.dataset.bound&&(e.dataset.bound="true",e.addEventListener("click",()=>{Lt(),window.location.reload()}))}function Qt(){return le?Lt():St()}async function en(){try{return console.log("[V2 Bootstrap] Loading V2 assets via Vite dynamic imports..."),await _(()=>import("./main-P40cA4Iv.js").then(e=>e.i),__vite__mapDeps([0,1,2,3,4])),await _(()=>Promise.resolve({}),__vite__mapDeps([5])),await _(()=>Promise.resolve({}),__vite__mapDeps([6])),await _(()=>Promise.resolve({}),__vite__mapDeps([7])),await _(()=>Promise.resolve({}),__vite__mapDeps([8])),console.log("[V2 Bootstrap] V2 CSS loaded"),await _(()=>Promise.resolve().then(()=>da),void 0),await _(()=>Promise.resolve().then(()=>va),void 0),await _(()=>Promise.resolve().then(()=>ka),void 0),await _(()=>import("./auto-gear-rules-DS0lYD-U.js"),[]),await _(()=>Promise.resolve().then(()=>Ra),void 0),await _(()=>Promise.resolve().then(()=>Qa),void 0),await _(()=>Promise.resolve().then(()=>eo),void 0),await _(()=>Promise.resolve().then(()=>si),void 0),await _(()=>Promise.resolve().then(()=>li),void 0),await _(()=>Promise.resolve().then(()=>ci),void 0),await _(()=>import("./core-modules-DlPoJ4C3.js").then(e=>e.o),__vite__mapDeps([1,2])),await _(()=>import("./own-gear-CSm93DJ1.js"),[]),await _(()=>Promise.resolve().then(()=>di),void 0),await _(()=>Promise.resolve().then(()=>ui),void 0),await _(()=>Promise.resolve().then(()=>vi),void 0),await _(()=>Promise.resolve().then(()=>pi),void 0),await _(()=>Promise.resolve().then(()=>gi),void 0),await _(()=>Promise.resolve().then(()=>fi),void 0),await _(()=>Promise.resolve().then(()=>Ci),void 0),await _(()=>Promise.resolve().then(()=>Ti),void 0),window.cineBackupsView&&typeof window.cineBackupsView.init=="function"&&window.cineBackupsView.init(),console.log("[V2 Bootstrap] V2 JS modules loaded"),x.cineV2SidebarView&&typeof x.cineV2SidebarView.mount=="function"&&x.cineV2SidebarView.mount(),x.cineV2Sidebar&&typeof x.cineV2Sidebar.init=="function"&&x.cineV2Sidebar.init(),x.cineRulesView&&typeof x.cineRulesView.init=="function"&&x.cineRulesView.init(),x.cineV2DeviceLibrary&&typeof x.cineV2DeviceLibrary.init=="function"&&x.cineV2DeviceLibrary.init(),x.cineContactsView&&typeof x.cineContactsView.init=="function"&&x.cineContactsView.init(),x.cineSettingsView&&typeof x.cineSettingsView.init=="function"&&x.cineSettingsView.init(),x.cineOwnGearView&&typeof x.cineOwnGearView.init=="function"&&x.cineOwnGearView.init(),x.cineHelpView&&typeof x.cineHelpView.init=="function"&&x.cineHelpView.init(),!0}catch(e){return console.error("[V2 Bootstrap] Failed to load V2 assets:",e),!1}}async function Xn(){if(Ht){console.warn("[V2 Bootstrap] Already initialized");return}Ht=!0,le=Kn(),console.log(`[V2 Bootstrap] Starting. V2 enabled: ${le}`),le&&(Wn(),await en()?St():st()),Zn(),console.log("[V2 Bootstrap] Initialization complete")}function Zn(){if(document.getElementById("v2ToggleBtn"))return;const e=document.getElementById("settingsDialog");if(!e)return;const n=e.querySelector(".modal-content, .settings-content, .modal-surface");if(!n)return;const t=document.createElement("div");t.className="settings-row v2-toggle-section",t.style.cssText="margin-top: 16px; padding-top: 16px; border-top: 1px solid #ddd;";const a=document.createElement("label");a.textContent="Experimental UI",a.style.cssText="font-weight: 600; display: block; margin-bottom: 8px;";const o=document.createElement("p");o.textContent="Try the new V2 interface design. This is experimental and can be toggled off at any time.",o.style.cssText="font-size: 0.875rem; color: #666; margin-bottom: 12px;";const i=document.createElement("button");i.id="v2ToggleBtn",i.type="button",i.className="v2-btn v2-btn-secondary",i.style.cssText="padding: 8px 16px; border-radius: 6px; cursor: pointer; background: #4a90d9; color: white; border: none;",i.textContent=le?"Return to Classic UI":"Try New UI",i.addEventListener("click",()=>{Qt(),i.textContent=le?"Return to Classic UI":"Try New UI",window.location.reload()}),t.appendChild(a),t.appendChild(o),t.appendChild(i),n.appendChild(t)}const Nt={init:Xn,enableV2:St,disableV2:Lt,toggleV2:Qt,isV2Enabled:()=>le,loadV2Assets:en};typeof globalThis<"u"?globalThis.cineV2Bootstrap=Nt:typeof window<"u"&&(window.cineV2Bootstrap=Nt);const Jn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Qn=".app-view",qt="active",kt="projects",Te={projects:{id:"view-projects",title:"Projects",pattern:/^#?\/?projects?\/?$/i},projectDetail:{id:"view-project-detail",title:"Project",pattern:/^#?\/?project\/([^/]+)(\/([a-z]+))?\/?$/i},settings:{id:"view-settings",title:"Settings",pattern:/^#?\/?settings?\/?$/i},contacts:{id:"view-contacts",title:"Contacts",pattern:/^#?\/?contacts?\/?$/i},devices:{id:"view-devices",title:"Device Library",pattern:/^#?\/?devices?\/?$/i},help:{id:"view-help",title:"Help",pattern:/^#?\/?help\/?$/i},rules:{id:"view-rules",title:"Auto Gear Rules",pattern:/^#?\/?rules\/?$/i},ownGear:{id:"view-own-gear",title:"Owned Gear",pattern:/^#?\/?own-gear\/?$/i},backups:{id:"view-backups",title:"Cloud Backups",pattern:/^#?\/?backups\/?$/i}};let ie=null,rt={},he=[],Ct=!1;const lt={};function ea(e,n){if(!Te[e]){console.warn(`[ViewManager] Cannot register handlers for unknown view: ${e}`);return}lt[e]=n}function It(){return document.querySelector(".v2-app")||document.getElementById("v2-app")}function ta(){const e=It();return e?Array.from(e.querySelectorAll(Qn)):[]}function na(e){return document.getElementById(e)}function qe(e,n={}){const t=Te[e];if(!t)return console.warn(`[ViewManager] Unknown view: ${e}`),!1;const a=na(t.id);if(!a)return console.warn(`[ViewManager] View element not found: ${t.id}`),!1;if(ie&&ie!==e){const i=lt[ie];if(i&&typeof i.onLeave=="function")try{i.onLeave()}catch(r){console.error(`[ViewManager] Error in onLeave for ${ie}:`,r)}}ta().forEach(i=>{i.classList.remove(qt)}),a.classList.add(qt),ie&&ie!==e&&he.push({view:ie,params:rt}),ie=e,rt=n,sa(e,n),ra(e,n),la(t.title,n);const o=lt[e];if(o&&typeof o.onEnter=="function")try{o.onEnter(n)}catch(i){console.error(`[ViewManager] Error in onEnter for ${e}:`,i)}return!0}function aa(){if(he.length>0){const e=he.pop();return qe(e.view,e.params),!0}return qe(kt),!1}function oa(){return ie}function ia(){return{...rt}}function sa(e,n){let t="";switch(e){case"projects":t="#/projects";break;case"projectDetail":t=`#/project/${encodeURIComponent(n.projectId||"new")}`,n.tab&&(t+=`/${n.tab}`);break;case"settings":t="#/settings";break;case"contacts":t="#/contacts";break;case"devices":t="#/devices";break;case"help":t="#/help";break;case"rules":t="#/rules";break;case"ownGear":t="#/own-gear";break;default:Te[e]?e==="ownGear"?t="#/own-gear":t=`#/${e}`:t="#/projects"}window.location.hash!==t&&history.replaceState(null,"",t)}function tn(){const e=window.location.hash||"#/projects";for(const[n,t]of Object.entries(Te)){const a=e.match(t.pattern);if(a){const o={};return n==="projectDetail"&&a[1]&&(o.projectId=decodeURIComponent(a[1]),a[3]&&(o.tab=a[3])),{viewName:n,params:o}}}return{viewName:kt,params:{}}}function nn(){const{viewName:e,params:n}=tn();qe(e,n)}function ra(e,n){const t=new CustomEvent("v2:viewchange",{bubbles:!0,detail:{view:e,params:n,previousView:he.length>0?he[he.length-1]:null}});document.dispatchEvent(t)}function la(e,n){let t=e;n.projectId&&n.projectId!=="new"&&(t=`${n.projectId} - ${e}`),document.title=`${t} | Cine Power Planner`}function an(){try{return localStorage.getItem("cine_use_v2_ui")==="true"}catch{return!1}}function on(){try{localStorage.setItem("cine_use_v2_ui","true"),Ct=!0,document.body.classList.add("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="none");const n=It();return n&&(n.style.display=""),nn(),!0}catch(e){return console.error("[ViewManager] Failed to enable V2 UI:",e),!1}}function sn(){try{localStorage.setItem("cine_use_v2_ui","false"),Ct=!1,document.body.classList.remove("v2-mode");const e=document.getElementById("mainContent");e&&(e.style.display="");const n=It();return n&&(n.style.display="none"),!0}catch(e){return console.error("[ViewManager] Failed to disable V2 UI:",e),!1}}function ca(){return Ct?sn():on()}function ct(){window.addEventListener("hashchange",nn),an()&&Jn.cineV2Bootstrap,console.log("[ViewManager] Initialized")}const dt={showView:qe,goBack:aa,getCurrentView:oa,getCurrentParams:ia,registerView:ea,parseHash:tn,isV2Enabled:an,enableV2:on,disableV2:sn,toggleV2:ca,init:ct,VIEWS:Te,DEFAULT_VIEW:kt};typeof globalThis<"u"?globalThis.cineViewManager=dt:typeof window<"u"&&(window.cineViewManager=dt);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ct):ct());const da=Object.freeze(Object.defineProperty({__proto__:null,ViewManager:dt},Symbol.toStringTag,{value:"Module"})),et=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},rn=["contactsViewTitle","rulesViewTitle","ownGearViewTitle","deviceLibraryTitle","buttonAddContact","buttonAddRule","buttonAddGearItem"];function xt(){if(!et.texts||!et.texts.en)return console.warn("[V2 Translations] Main translation system not loaded"),!1;const e=rn.filter(n=>!(n in et.texts.en));return e.length>0?(console.warn("[V2 Translations] Missing keys:",e),!1):(console.log("[V2 Translations] All V2 keys verified"),!0)}const ln=xt(),ua={verifyV2Translations:xt,isReady:ln},va=Object.freeze(Object.defineProperty({__proto__:null,V2_REQUIRED_KEYS:rn,default:ua,isReady:ln,verifyV2Translations:xt},Symbol.toStringTag,{value:"Module"})),Z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},$t={project:["setupSelect","setupName","saveSetupBtn","deleteSetupBtn"],devices:["cameraSelect","monitorSelect","videoSelect","motor1Select","motor2Select","motor3Select","motor4Select","controller1Select","controller2Select","controller3Select","controller4Select","distanceSelect","batteryPlateSelect","batterySelect","batteryHotswapSelect"],hidden:["cageSelect"],power:["heroCard","heroTotalDraw","heroAvailablePower","heroRuntime","heroCurrent144","heroCurrent12","heroBatteryCount","breakdownList","pinWarning","dtapWarning","hotswapWarning"],outputs:["projectRequirementsOutput","gearListOutput","batteryTable","powerDiagram"]},cn=Object.values($t).flat();let ee=null,Fe=!0,De=new Map;function dn(){return ee||(ee=document.getElementById("v2-legacy-context"),ee||(ee=document.createElement("div"),ee.id="v2-legacy-context",ee.setAttribute("aria-hidden","true"),ee.style.cssText="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);",document.body.appendChild(ee)),ee)}function pa(e){const n=document.getElementById(e);return n?(dn().appendChild(n),n):(console.warn(`[LegacyShim] Element not found: ${e}`),null)}function un(e,n){if(!Fe)return;const t=document.getElementById(e),a=document.getElementById(n);!t||!a||(a.value=t.value,ge(a,"change"))}function vn(e,n){if(!Fe)return;const t=document.getElementById(e),a=document.getElementById(n);!t||!a||(a.value=t.value,ge(a,"input"))}function pn(e,n){const t=document.getElementById(e),a=document.getElementById(n);!t||!a||(Fe=!1,a.value=t.value,Fe=!0)}function ge(e,n,t={}){if(!e)return;const a=new Event(n,{bubbles:!0,cancelable:!0,...t});e.dispatchEvent(a)}function Pt(e){const n=document.getElementById(e);return n?(ge(n,"click"),!0):(console.warn(`[LegacyShim] Cannot trigger click, element not found: ${e}`),!1)}async function ga(e){const n=document.getElementById("setupSelect");if(!n)return console.error("[LegacyShim] setupSelect not found"),!1;let t=Array.from(n.options).find(a=>a.value===e);if(!t){let a=null;if(Z.cineProjectService)try{a=await Z.cineProjectService.getProject(e)}catch(i){console.warn("[LegacyShim] IDB lookup failed",i)}if(a)return console.log(`[LegacyShim] Hydrating native project: ${e}`),t=document.createElement("option"),t.value=e,t.textContent=e,n.appendChild(t),n.value=e,typeof window.populateProjectForm=="function"&&window.populateProjectForm(a),typeof window.updateCalculations=="function"&&window.updateCalculations(),!0;if(fn().includes(e))console.log(`[LegacyShim] Creating missing option for legacy project: ${e}`),t=document.createElement("option"),t.value=e,t.textContent=e,n.appendChild(t);else return console.warn(`[LegacyShim] Project not found in storage: ${e}`),!1}return n.value=e,ge(n,"change"),!0}function gn(){return Pt("saveSetupBtn")}function fa(){return Pt("deleteSetupBtn")}function ma(e){const n=document.getElementById("setupSelect"),t=document.getElementById("setupName");return!n||!t?(console.error("[LegacyShim] Project elements not found"),!1):(n.value="",ge(n,"change"),t.value=e,ge(t,"input"),gn())}function fn(){if(Z.cineStorage&&typeof Z.cineStorage.getProjectMemoryCache=="function")try{const n=Z.cineStorage.getProjectMemoryCache();if(n){const t=[];if(Object.keys(n).forEach(a=>{if(a.includes("cameraPowerPlanner_prj_")){const o=a.split("cameraPowerPlanner_prj_");o.length>1&&o[1]&&t.push(o[1])}if(a.includes("cameraPowerPlanner_setups")&&!a.includes("backup")){const o=n[a];o&&typeof o=="object"&&Object.keys(o).forEach(i=>{i&&!i.startsWith("auto-backup-")&&t.push(i)})}}),t.length>0)return[...new Set(t)]}}catch(n){console.warn("[LegacyShim] cineStorage cache check failed:",n)}if(typeof window.getSetups=="function")try{const n=window.getSetups()||{},t=Object.keys(n).filter(a=>a&&!a.startsWith("auto-backup-"));if(t.length>0)return t}catch(n){console.warn("[LegacyShim] getSetups failed:",n)}const e=document.getElementById("setupSelect");if(e&&e.options.length>1){const n=Array.from(e.options).map(t=>t.value).filter(t=>t!=="");if(n.length>0)return[...new Set(n)]}try{const n=localStorage.getItem("cameraPowerPlanner_setups");if(n){const t=JSON.parse(n);if(t&&typeof t=="object")return Object.keys(t).filter(a=>a&&!a.startsWith("auto-backup-"))}}catch(n){console.warn("[LegacyShim] localStorage fallback failed:",n)}return[]}function ba(e,n){const t=document.getElementById(e);return t?(t.value=n,ge(t,"change"),!0):(console.warn(`[LegacyShim] Device element not found: ${e}`),!1)}function ya(e){const n=document.getElementById(e);return n?n.value:null}function ha(){const e={};return $t.devices.forEach(n=>{const t=document.getElementById(n);t&&(e[n]=t.value)}),e}function wa(e,n){const t=document.getElementById(e);if(!t)return;const a=()=>un(e,n);t.addEventListener("change",a),De.set(`${e}:change`,{element:t,handler:a})}function Ea(e,n){const t=document.getElementById(e);if(!t)return;const a=()=>vn(e,n);t.addEventListener("input",a),De.set(`${e}:input`,{element:t,handler:a})}function Sa(e,n){const t=document.getElementById(e);if(!t)return;const a=()=>pn(e,n);t.addEventListener("change",a),De.set(`${e}:legacy:change`,{element:t,handler:a})}function La(){De.forEach(({element:e,handler:n},t)=>{const a=t.split(":")[1];e.removeEventListener(a,n)}),De.clear()}function mn(){const e=[],n=[];return cn.forEach(t=>{document.getElementById(t)?n.push(t):e.push(t)}),e.length>0&&console.warn("[LegacyShim] Missing critical IDs:",e),{found:n,missing:e}}async function bn(){if(Z.cineProjectService)try{const e=localStorage.getItem("cameraPowerPlanner_setups");if(!e)return;const n=JSON.parse(e),t=document.getElementById("setupSelect"),a=t?t.value:null;a&&n[a]&&(console.log(`[LegacyShim] Reverse Sync: Saving ${a} to Native IDB`),await Z.cineProjectService.saveProject(a,n[a]))}catch(e){console.warn("[LegacyShim] Reverse Sync failed",e)}}function ut(){if(document.body&&document.body.dataset&&document.body.dataset.shimInitialized)return;document.body&&(document.body.dataset.shimInitialized="true"),console.log("[LegacyShim] Initializing...");const{missing:e}=mn();e.length>0&&console.warn("[LegacyShim] Missing elements:",e);const n=document.getElementById("saveSetupBtn");n&&(console.log("[LegacyShim] Hooking Save Button for Reverse Sync"),n.addEventListener("click",()=>{setTimeout(()=>bn(),200)}));const t=document.getElementById("deleteSetupBtn");t&&(console.log("[LegacyShim] Hooking Delete Button for Reverse Sync"),t.addEventListener("click",()=>{const o=document.getElementById("setupSelect"),i=o?o.value:null;i&&setTimeout(async()=>{const r=localStorage.getItem("cameraPowerPlanner_setups");r&&(JSON.parse(r)[i]||(console.log(`[LegacyShim] Reverse Sync: Deleting ${i} from Native IDB`),Z.cineProjectService&&await Z.cineProjectService.deleteProject(i)))},500)}));const a=document.getElementById("shareSetupBtn");a&&n&&(console.log("[LegacyShim] Hooking Share Button for Pre-Export Save"),a.addEventListener("click",()=>{console.log("[LegacyShim] Pre-Share: Triggering Save to ensure memory consistency"),n.click()},!0))}const We={ensureLegacyContainer:dn,shimToLegacyContainer:pa,syncSelectValue:un,syncInputValue:vn,syncToV2:pn,syncLegacyToNative:bn,dispatchNativeEvent:ge,triggerLegacyClick:Pt,loadProject:ga,saveProject:gn,deleteProject:fa,createProject:ma,getProjectNames:fn,setDeviceValue:ba,getDeviceValue:ya,getDeviceSnapshot:ha,bindV2Select:wa,bindV2Input:Ea,listenLegacyChanges:Sa,verifyLegacyIds:mn,cleanup:La,init:ut,CRITICAL_IDS:$t,ALL_CRITICAL_IDS:cn};typeof Z<"u"&&(Z.cineLegacyShim=We);typeof window<"u"&&(window.cineLegacyShim=We);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ut):ut());typeof module<"u"&&module.exports&&(module.exports=We);const ka=Object.freeze(Object.defineProperty({__proto__:null,LegacyShim:We},Symbol.toStringTag,{value:"Module"})),A=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},yn="projectGrid",Ie="view-projects",be="cameraPowerPlanner_setups",ve=["blue","green","orange","purple","red","pink","teal","indigo","yellow","amber","lime","emerald","cyan","sky","violet","fuchsia","rose","slate","stone","neutral","gold","crimson","navy","aquamarine"],Ca=["📽️","🎬","⚡","🔋","🎥","📺","💡","🎞️","📸","🎯","📝","⭐","🐴","🦄","🤘","🦊","🐶","🦖","🐙","🐉","👽","👻","🤖","💀","👾","🤡","🎉","🔥","✨","🚀","🍕","🤙","✌️","💪"];let ze=!1,Be={query:""},Y=null;function Dt(){return{loadProjectMetadata:()=>(console.warn("[V2] Synchronous metadata load requested - this is a legacy pattern. Using empty default."),{}),async getProjectNames(){const e=await te.getProjectNames();let n=[];if(A.cineLegacyShim&&typeof A.cineLegacyShim.getProjectNames=="function")n=A.cineLegacyShim.getProjectNames();else try{const t=localStorage.getItem(be);t&&(n=Object.keys(JSON.parse(t)))}catch(t){console.warn("[Dashboard] Failed to read legacy storage:",t)}return[...new Set([...e,...n])].filter(t=>t&&!t.startsWith("auto-backup-"))},async getProjectMetadata(e){let n=await te.getProjectMetadata(e);if(!n||Object.keys(n).length===0)try{const t=localStorage.getItem(be);if(t){const a=JSON.parse(t);if(a[e])return a[e]}}catch(t){console.warn("[Dashboard] Failed to read legacy project metadata:",t)}return n},async loadProject(e){let n=await te.getProject(e);if(!n)try{const t=localStorage.getItem(be);if(t){const a=JSON.parse(t);if(a[e])return a[e]}}catch(t){console.warn("[Dashboard] Failed to fallback load legacy project:",t)}return n},async saveProject(e,n){return await te.saveProject(e,n)},async updateProjectMetadata(e,n={}){let t=await te.getProject(e);if(!t)try{const a=localStorage.getItem(be);a&&(t=JSON.parse(a)[e])}catch(a){console.warn("[Dashboard] Failed to read legacy project for update:",a)}return t?(n.color&&(t.color=n.color),n.icon&&(t.icon=n.icon),n.prepDays&&(t.prepDays=n.prepDays),n.shootingDays&&(t.shootingDays=n.shootingDays),n.returnDays&&(t.returnDays=n.returnDays),typeof n.archived<"u"&&(t.archived=n.archived),n.status&&(t.status=n.status),{success:await te.saveProject(e,t),lastModified:t.lastModified}):{success:!1}},async deleteProject(e){await te.deleteProject(e);try{const n=localStorage.getItem(be);if(n){const t=JSON.parse(n);t[e]&&(delete t[e],localStorage.setItem(be,JSON.stringify(t)))}}catch(n){console.warn("[Dashboard] Failed to delete legacy project:",n)}return!0},async duplicateProject(e){return await te.duplicateProject(e)},renameProject:()=>({success:!1}),async createProject(e){return await te.createProject(e)}}}function fe(){return Dt()}function Ia(){return Dt()}function vt(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function xe(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function He(e){if(!e||typeof e!="string")return"";const n=e.split(" to ");return n.length===1?xe(n[0]):n.length===2?`${xe(n[0])} - ${xe(n[1])}`:e}function T(e,n={}){const t=document.documentElement.lang||"en";let a=window.texts&&window.texts[t]?window.texts[t]:null;!a&&window.texts&&(a=window.texts.en);const o=(r,s)=>s.split(".").reduce((l,p)=>l?l[p]:null,r);let i=a?o(a,e):null;if(!i&&t!=="en"&&window.texts&&window.texts.en&&(i=o(window.texts.en,e)),!i)return e;if(typeof i=="string")for(const[r,s]of Object.entries(n))i=i.replace(`{${r}}`,s);return i}async function Se(){const e=fe();let n=e.loadProjectMetadata();if(n&&Object.keys(n).length>0){Y=n;return}try{const t=await e.getProjectNames(),a={};await Promise.all(t.map(async o=>{if(o&&!o.startsWith("auto-backup-")){const i=await e.getProjectMetadata(o);a[o]=i||{lastModified:Date.now()}}})),Y=a}catch(t){console.error("[Dashboard] Failed to refresh project cache:",t),Y={}}}function Ye(){return Y?Object.keys(Y).filter(e=>e&&!e.startsWith("auto-backup-")):[]}function xa(){let e=Ye();if(e=e.filter(n=>!!!hn(n).archived),Be.query){const n=Be.query.toLowerCase();e=e.filter(t=>t.toLowerCase().includes(n))}return[...new Set(e)]}function hn(e){Y===null&&Se();const n=Y[e];return n?{lastModified:n.lastModified||null,color:n.color||null,icon:n.icon||null,prepDays:n.prepDays||[],shootingDays:n.shootingDays||[],returnDays:n.returnDays||[],archived:n.archived||!1,status:n.status||(n.archived?"Archived":"Planning")}:{lastModified:null,color:null,icon:null,prepDays:[],shootingDays:[],returnDays:[],archived:!1,status:"Planning"}}function Bt(e,n={}){const a=fe().updateProjectMetadata(e,n);if(a&&a.success){if(Y){Y[e]||(Y[e]={});const o={...n};a.lastModified&&(o.lastModified=a.lastModified),Object.assign(Y[e],o)}return!0}return!1}function $a(e,n){const t=hn(e);let a=t.color||ve[n%ve.length];ve.includes(a)||(a=ve[n%ve.length]);const o=vt(t.icon||"📽️"),i=t.lastModified?xe(t.lastModified):"",r=vt(e),s=t.status||"Planning",l=s.toLowerCase().replace(/\s+/g,"-");let p=s.toLowerCase().replace(/\s+/g,"");p==="waitingforapproval"&&(p="waitingForApproval");const y=T(`v2.dashboard.status.${p}`)===`v2.dashboard.status.${p}`?s:T(`v2.dashboard.status.${p}`);let E="";return(t.prepDays?.length>0||t.shootingDays?.length>0||t.returnDays?.length>0)&&(E='<div class="v2-tile-periods">',Array.isArray(t.prepDays)&&t.prepDays.forEach(v=>{const g=He(v);g&&(E+=`<span class="v2-period-badge prep" title="${T("v2.dashboard.projectTile.prep")} ${g}"><span class="period-icon">📅</span> ${g}</span>`)}),Array.isArray(t.shootingDays)&&t.shootingDays.forEach(v=>{const g=He(v);g&&(E+=`<span class="v2-period-badge shoot" title="${T("v2.dashboard.projectTile.shoot")} ${g}"><span class="period-icon">🎥</span> ${g}</span>`)}),Array.isArray(t.returnDays)&&t.returnDays.forEach(v=>{const g=He(v);g&&(E+=`<span class="v2-period-badge return" title="${T("v2.dashboard.projectTile.return")} ${g}"><span class="period-icon">🚛</span> ${g}</span>`)}),E+="</div>"),`
      <div class="v2-project-tile" data-project="${r}" tabindex="0" role="button" aria-label="${T("v2.dashboard.projectTile.actionsFor",{project:r})}">
        <div class="v2-tile-header">
          <div class="v2-tile-icon color-${a}">${o}</div>
            <div class="v2-tile-info">
            <h3 class="v2-tile-title">${r}</h3>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                 ${i?`<span class="v2-tile-meta">${i}</span>`:""}
                 <span class="v2-status-badge ${l}">${y}</span>
            </div>
            ${E}
          </div>
          <div class="v2-tile-actions">
            <button type="button" class="v2-tile-action-btn" data-action="menu" data-project="${r}" title="${T("v2.dashboard.projectTile.moreOptions")}" aria-label="${T("v2.dashboard.projectTile.actionsFor",{project:r})}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `}function Pa(){return`
      <div class="v2-project-tile new-project" id="v2CreateProjectTile" tabindex="0" role="button" aria-label="${T("v2.dashboard.newProject")}">
        <div class="v2-tile-header center">
          <div class="v2-tile-icon-add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="v2-tile-title">${T("v2.dashboard.newProject")}</h3>
        </div>
      </div>
    `}function Da(e){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 48px; display: flex; align-items: center; justify-content: center;">🔍</div>
        <h2>${T("v2.dashboard.search.noResults.title")}</h2>
        <p class="text-muted">${T("v2.dashboard.search.noResults.subtitle",{query:vt(e)})}</p>
        <button id="v2ClearSearchBtn" class="v2-btn-secondary">
          ${T("v2.dashboard.search.clear")}
        </button>
      </div>
    `}async function oe(e=!1){A.cineProjectLockManager&&A.cineProjectLockManager.releaseLock();const n=document.getElementById(yn);n&&(e&&(n.innerHTML='<div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--v2-text-secondary);">Loading projects...</div>'),await Se(),Ba(n))}function Ba(e){if(e.innerHTML="",e.className="v2-project-grid",e.style="",Ye().length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const i=e.closest(".v2-main");i&&i.classList.add("align-top"),e.innerHTML=Ma(),Va(e);return}const t=xa();if(t.length===0){e.classList.add("v2-grid-empty"),e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center",e.style.justifyContent="flex-start",e.style.paddingTop="10vh",e.style.minHeight="100%",e.style.flex="1";const i=e.closest(".v2-main");i&&i.classList.add("align-top"),e.innerHTML=Da(Be.query);const r=e.querySelector("#v2ClearSearchBtn");r&&r.addEventListener("click",()=>{const s=document.getElementById("v2SidebarSearchInput");s&&(s.value="",s.dispatchEvent(new Event("input",{bubbles:!0})))});return}const a=e.closest(".v2-main");a&&a.classList.remove("align-top");let o="";t.forEach((i,r)=>{o+=$a(i,r)}),Be.query||(o+=Pa()),e.innerHTML=o,Aa(e)}function Ta(){window.addEventListener("v2:search",e=>{Be.query=e.detail?.query||"",oe()})}function Aa(e){e.querySelectorAll(".v2-project-tile").forEach(t=>{t.addEventListener("click",a=>{if(a.target.closest('[data-action="menu"]'))return;const o=t.dataset.project;o&&Ge(o)}),t.addEventListener("contextmenu",a=>{a.preventDefault();const o=t.dataset.project;o&&Ft(a,o)}),t.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),t.click())})}),e.querySelectorAll('[data-action="menu"]').forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();const o=t.dataset.project;o&&Ft(a,o)})});const n=e.querySelector("#v2CreateProjectTile");n&&(n.addEventListener("click",()=>pt()),n.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),pt())}))}function Ft(e,n){ne();const t=document.createElement("div");t.className="v2-context-menu",t.innerHTML=`
            <button class="v2-context-menu-item" data-action="open">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                ${T("v2.dashboard.contextMenu.open")}
            </button>
            <button class="v2-context-menu-item" data-action="edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                ${T("v2.dashboard.contextMenu.rename")}
            </button>
            <button class="v2-context-menu-item" data-action="print">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                ${T("v2.dashboard.contextMenu.print")}
            </button>
            <button class="v2-context-menu-item" data-action="duplicate">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                ${T("v2.dashboard.contextMenu.duplicate")}
            </button>
            <button class="v2-context-menu-item" data-action="archive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
                ${T("v2.dashboard.contextMenu.archive")}
            </button>
             <div style="height: 1px; background: var(--v2-border-default); margin: 4px 0;"></div>
            <button class="v2-context-menu-item danger" data-action="delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                ${T("v2.dashboard.contextMenu.delete")}
            </button>
        `,t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`,t.querySelector('[data-action="open"]').addEventListener("click",()=>{Ge(n),ne()}),t.querySelector('[data-action="edit"]').addEventListener("click",()=>{ne(),pt(n)}),t.querySelector('[data-action="print"]').addEventListener("click",()=>{Ge(n,{action:"print"}),ne()}),t.querySelector('[data-action="duplicate"]').addEventListener("click",()=>{ja(n),ne()}),t.querySelector('[data-action="archive"]').addEventListener("click",()=>{_a(n),ne()}),t.querySelector('[data-action="delete"]').addEventListener("click",async()=>{await wn(n),ne()}),document.body.appendChild(t);const a=t.getBoundingClientRect();a.right>window.innerWidth&&(t.style.left=`${window.innerWidth-a.width-10}px`),a.bottom>window.innerHeight&&(t.style.top=`${window.innerHeight-a.height-10}px`),setTimeout(()=>{document.addEventListener("click",ne,{once:!0}),document.addEventListener("contextmenu",ne,{once:!0})},0)}function ne(){const e=document.querySelector(".v2-context-menu");e&&e.remove(),document.removeEventListener("click",ne)}function Va(e){const n=e.querySelector("#v2EmptyStateCreateBtn");n&&n.addEventListener("click",()=>Xe())}async function Ge(e,n={}){if(A.cineProjectLockManager&&!await A.cineProjectLockManager.requestLock(e)){alert(T("v2.dashboard.projectLocked",{projectName:e}));return}A.cineLegacyShim&&A.cineLegacyShim.loadProject(e),A.cineViewManager&&A.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera",...n})}function Ma(){return`
      <div class="view-empty-state">
        <div class="view-empty-state-icon" style="font-size: 64px; opacity: 0.8; margin-bottom: 16px;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h2>${T("v2.dashboard.emptyState.title")}</h2>
        <p class="text-muted">${T("v2.dashboard.emptyState.subtitle")}</p>
        <div class="v2-empty-actions">
            <button id="v2EmptyStateCreateBtn" class="v2-btn-primary">
              + ${T("v2.dashboard.newProject")}
            </button>
            <p class="v2-help-link-container">
                <a href="#/help" class="v2-link-subtle">${T("v2.dashboard.emptyState.help")}</a>
            </p>
        </div>
      </div>
    `}async function wn(e){if(confirm(T("v2.dashboard.confirmDelete",{project:e})||`Are you sure you want to delete project "${e}"?`))try{await fe().deleteProject(e)&&(Tt(),Se()),A.cineLegacyShim&&typeof A.cineLegacyShim.deleteProject=="function"&&typeof A.cineLegacyShim.refreshProjects=="function"&&A.cineLegacyShim.refreshProjects(),oe()}catch(n){console.error("[V2] Failed to delete project:",n),alert(T("v2.common.error")||"An error occurred.")}}function _a(e){Bt(e,{archived:!0,status:"Archived"}),oe()}function ja(e){const t=fe().duplicateProject(e);t&&t.success&&(Tt(),Se(),oe(),A.cineLegacyShim&&typeof A.cineLegacyShim.refreshProjects=="function"&&A.cineLegacyShim.refreshProjects())}function pt(e=null){Xe(e)}function Xe(e=null){const n=!!e,t=Math.floor(Math.random()*ve.length);let a=ve[t],o="📽️",i=null;n&&(Se(),i=fe().getProjectMetadata(e),i&&(i.color&&(a=i.color),i.icon&&(o=i.icon)));let r=[];if(n&&i){let k=1;const R=(f,h,$)=>{if(!f)return;let V="",B="";f.includes(" to ")?[V,B]=f.split(" to "):(V=f,B=f),r.push({id:`period-${k++}`,type:h,name:$,startDate:V,endDate:B})};Array.isArray(i.prepDays)&&i.prepDays.forEach(f=>R(f,"prep","Prep")),Array.isArray(i.shootingDays)&&i.shootingDays.forEach(f=>R(f,"shoot","Shoot")),Array.isArray(i.returnDays)&&i.returnDays.forEach(f=>R(f,"return","Return"))}!n&&r.length===0&&(r=[{id:"period-1",type:"prep",name:"Prep",startDate:"",endDate:""},{id:"period-2",type:"shoot",name:"Shoot",startDate:"",endDate:""},{id:"period-3",type:"return",name:"Return",startDate:"",endDate:""}]);let s=r.length>0?r.length:3;const l=[{value:"prep",label:"Prep",icon:"📅"},{value:"shoot",label:"Shoot",icon:"🎥"},{value:"return",label:"Return",icon:"🚛"}],p=k=>`var(--v2-color-${k})`,y=ve.map(k=>`
            <button type="button" class="v2-color-swatch-sm color-${k} ${k===a?"selected":""}" 
                    data-color="${k}" aria-label="Select ${k} color">
            </button>
        `).join(""),E=Ca.map(k=>`
            <button type="button" class="v2-icon-option-sm ${k===o?"selected":""}" 
                    data-icon="${k}" aria-label="Select icon ${k}">
                ${k}
            </button>
        `).join(""),w=()=>r.length===0?'<div class="v2-empty-state" style="padding: 16px; font-size: 13px;">No dates added yet.</div>':r.map(k=>{const R=l.map(f=>`<option value="${f.value}" ${k.type===f.value?"selected":""}>${f.icon} ${f.label}</option>`).join("");return`
                <div class="v2-period-row" data-period-id="${k.id}">
                    <div class="v2-period-name">
                        <select class="v2-period-type-select" data-field="type">
                            ${R}
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
            `}).join(""),v=document.createElement("div");v.className="v2-modal-backdrop",v.innerHTML=`
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
                                <span class="v2-picker-preview" id="v2ColorPreview" style="background-color: ${p(a)};"></span>
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
                    <button type="button" class="v2-btn v2-btn-primary" id="v2CreateProjectBtn">${n?"Save Changes":"Create Project"}</button>
                </div>
            </div>
        `,document.body.appendChild(v),requestAnimationFrame(()=>{v.classList.add("open")});const g=v.querySelector("#v2NewProjectName"),c=v.querySelector("#v2NewProjectError"),d=v.querySelector("#v2CreateProjectBtn"),u=v.querySelector("#v2CancelProjectBtn"),m=v.querySelector(".v2-modal-close"),S=v.querySelector("#v2PeriodsContainer"),b=v.querySelector("#v2AddPeriodBtn"),L=v.querySelector("#v2ColorPickerTrigger"),I=v.querySelector("#v2ColorPopover"),P=v.querySelector("#v2ColorPreview"),F=L.querySelector(".v2-picker-label");L.addEventListener("click",k=>{k.stopPropagation(),L.classList.toggle("open"),I.classList.toggle("open"),z.classList.remove("open"),q.classList.remove("open")}),I.querySelectorAll(".v2-color-swatch-sm").forEach(k=>{k.addEventListener("click",R=>{R.stopPropagation(),I.querySelectorAll(".v2-color-swatch-sm").forEach(f=>f.classList.remove("selected")),k.classList.add("selected"),a=k.dataset.color,P.style.backgroundColor=p(a),F.textContent=a.charAt(0).toUpperCase()+a.slice(1),L.classList.remove("open"),I.classList.remove("open")})});const z=v.querySelector("#v2IconPickerTrigger"),q=v.querySelector("#v2IconPopover"),X=v.querySelector("#v2IconPreview");z.addEventListener("click",k=>{k.stopPropagation(),z.classList.toggle("open"),q.classList.toggle("open"),L.classList.remove("open"),I.classList.remove("open")}),q.querySelectorAll(".v2-icon-option-sm").forEach(k=>{k.addEventListener("click",R=>{R.stopPropagation(),q.querySelectorAll(".v2-icon-option-sm").forEach(f=>f.classList.remove("selected")),k.classList.add("selected"),o=k.dataset.icon,X.textContent=o,z.classList.remove("open"),q.classList.remove("open")})}),v.addEventListener("click",()=>{L.classList.remove("open"),I.classList.remove("open"),z.classList.remove("open"),q.classList.remove("open")});function G(k,R,f){const h=r.find($=>$.id===k);if(h)if(R==="type"){const $=l.find(V=>V.value===f);$&&(h.type=f,h.name=$.label)}else h[R]=f}function N(k){r=r.filter(R=>R.id!==k),J()}function K(){s++,r.push({id:`period-${s}`,type:"shoot",name:"Shoot",startDate:"",endDate:""}),J()}function J(){S.innerHTML=w(),Q()}function Q(){S.querySelectorAll(".v2-period-row").forEach(k=>{const R=k.dataset.periodId;k.querySelectorAll("input, select").forEach(h=>{h.addEventListener("change",()=>{G(R,h.dataset.field,h.value)}),h.addEventListener("input",()=>{G(R,h.dataset.field,h.value)})});const f=k.querySelector(".v2-period-remove");f&&f.addEventListener("click",()=>{N(R)})})}Q(),b.addEventListener("click",K),n||setTimeout(()=>g.focus(),100);function de(){v.classList.remove("open"),setTimeout(()=>v.remove(),200)}async function Ae(){const k=g.value.trim();if(!k){c.textContent="Please enter a project name.",c.style.display="block",g.focus();return}const R=Ye();if(n){if(k!==e&&R.includes(k)){c.textContent="A project with this name already exists.",c.style.display="block",g.focus();return}}else if(R.includes(k)){c.textContent="A project with this name already exists.",c.style.display="block",g.focus();return}d.disabled=!0,d.textContent=n?"Saving...":"Creating...";const f=M=>{if(!M)return null;const O=M.startDate,H=M.endDate;return!O&&!H?null:O&&H?`${O} to ${H}`:O||H||null},h=r.filter(M=>M.type==="prep").map(f).filter(Boolean),$=r.filter(M=>M.type==="shoot").map(f).filter(Boolean),V=r.filter(M=>M.type==="return").map(f).filter(Boolean),B={color:a,icon:o,prepDays:h,shootingDays:$,returnDays:V};if(n){if(k!==e){const O=fe().renameProject(e,k,B);if(O&&O.success){Tt(),Se();const H=document.getElementById("setupSelect");H&&H.value,oe(),A.cineLegacyShim&&typeof A.cineLegacyShim.refreshProjects=="function"&&A.cineLegacyShim.refreshProjects()}}else Bt(k,B),oe();de()}else await En(k,B),de()}d.addEventListener("click",Ae),u.addEventListener("click",de),m.addEventListener("click",de),v.addEventListener("click",k=>{k.target===v&&de()}),g.addEventListener("keydown",k=>{k.key==="Enter"&&Ae(),k.key==="Escape"&&de()}),g.addEventListener("input",()=>{c.style.display="none"})}typeof A<"u"&&(A.cineProjectService=te);async function En(e,n={}){return await fe().createProject(e)?(Bt(e,n),oe(),A.cineViewManager&&A.cineViewManager.showView("projectDetail",{projectId:e,tab:"camera"}),!0):!1}function Tt(){try{const e="cameraPowerPlanner_project_rev",n=parseInt(localStorage.getItem(e)||"0",10);localStorage.setItem(e,(n+1).toString())}catch(e){console.error("[V2] Failed to update project revision:",e)}}function Sn(){if(document.getElementById(Ie))return document.getElementById(Ie);const e=document.createElement("section");e.id=Ie,e.className="app-view",e.innerHTML=`
      <header class="view-header">
        <button class="v2-mobile-menu-toggle" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1>${T("v2.dashboard.header.title")}</h1>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-secondary" id="v2HeaderImportBtn" style="margin-right: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            ${T("v2.dashboard.actions.importProject")}
          </button>
          <button type="button" class="v2-btn v2-btn-primary" id="v2HeaderCreateBtn">
            + ${T("v2.dashboard.actions.newProject")}
          </button>
        </div>
      </header>
      <div class="view-content">
        <div class="v2-project-grid" id="${yn}">
          <!-- Tiles will be rendered here -->
        </div>
      </div>
    `;const n=e.querySelector("#v2HeaderCreateBtn");return n&&n.addEventListener("click",Xe),e}function gt(e={}){if(ze){console.warn("[ProjectDashboard] Already initialized, skipping.");return}ze=!0,e.dataProvider&&(e.dataProvider,Y=null),console.log("[ProjectDashboard] init() called");const n=Sn(),t=document.querySelector(".v2-main");t&&!document.getElementById(Ie)&&t.appendChild(n),document.addEventListener("click",o=>{o.target&&(o.target.closest("#v2HeaderCreateBtn")?Xe():o.target.closest("#v2HeaderImportBtn")&&A.cineLegacyShim&&A.cineLegacyShim.triggerLegacyClick("applySharedLinkBtn"))});const a=document.querySelector(".v2-view.active");a&&a.id===Ie&&oe(!0),window.addEventListener("v2:viewchange",o=>{o.detail.view==="projects"&&oe(!0)}),Ta()}const At={init:gt,renderProjectGrid:oe,createProject:En,deleteProject:wn,openProject:Ge,getProjectNames:Ye,createDashboardView:Sn,formatDate:xe,formatDateRange:He,createDefaultDataProvider:Dt,createUiOnlyDataProvider:Ia};typeof A<"u"&&(A.cineProjectDashboard=At);typeof window<"u"&&(window.cineProjectDashboard=At);typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{ze||(console.log("[ProjectDashboard] Auto-initializing (Fallback)"),gt())},200)}):setTimeout(()=>{ze||(console.log("[ProjectDashboard] Auto-initializing (Fallback)"),gt())},200));const Ra=Object.freeze(Object.defineProperty({__proto__:null,ProjectDashboard:At},Symbol.toStringTag,{value:"Module"})),C=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},$e="view-project-detail",ft="cameraPowerPlanner_setups",Oa=["camera","power","requirements","kit"],Ha="camera";let ae=null,Ln=Ha,zt=!1,W=null;function Ke(e){if(!Oa.includes(e)){console.warn(`[ProjectDetail] Invalid tab: ${e}`);return}Ln=e,document.querySelectorAll("#view-project-detail .v2-tab-btn").forEach(a=>{const o=a.dataset.tab===e;a.classList.toggle("active",o),a.setAttribute("aria-selected",o?"true":"false")}),document.querySelectorAll("#view-project-detail .v2-tab-pane").forEach(a=>{const o=a.id===`tab-${e}`;a.classList.toggle("active",o),a.hidden=!o}),document.dispatchEvent(new CustomEvent("v2:tabchange",{detail:{tab:e,project:ae}})),e==="power"&&setTimeout(()=>Pn(),10)}function kn(){return Ln}function tt(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})}catch{return""}}function nt(e){if(!e||typeof e!="string")return"";const n=e.split(" to ");return n.length===1?tt(n[0]):n.length===2?`${tt(n[0])} - ${tt(n[1])}`:e}function D(e,n={}){const t=document.documentElement.lang||"en";let a=window.texts&&window.texts[t]?window.texts[t]:null;!a&&window.texts&&(a=window.texts.en);const o=(r,s)=>s.split(".").reduce((l,p)=>l?l[p]:null,r);let i=a?o(a,e):null;if(!i&&t!=="en"&&window.texts&&window.texts.en&&(i=o(window.texts.en,e)),!i)return e;if(typeof i=="string")for(const[r,s]of Object.entries(n))i=i.replace(`{${r}}`,s);return i}function Vt(){if(C.cineStorage&&typeof C.cineStorage.getProjectMemoryCache=="function")try{const e=C.cineStorage.getProjectMemoryCache();if(e){W={},Object.keys(e).forEach(n=>{let t=n;if(n.includes("cameraPowerPlanner_prj_")){const a=n.split("cameraPowerPlanner_prj_");a.length>1&&a[1]&&(t=a[1])}W[t]=e[n]}),console.log("[ProjectDetail] Cache refreshed from cineStorage. Keys:",Object.keys(W).length);return}}catch(e){console.warn("[ProjectDetail] Failed to read from cineStorage cache:",e)}try{const e=localStorage.getItem(ft);e?W=JSON.parse(e):W={}}catch(e){console.error("[ProjectDetail] Failed to parse project data:",e),W={}}}function Cn(e){if(W===null&&Vt(),W&&W[e]){const n=W[e];return{prepDays:n.prepDays||[],shootingDays:n.shootingDays||[],returnDays:n.returnDays||[],status:n.status||(n.archived?"Archived":"Planning")}}return{prepDays:[],shootingDays:[],returnDays:[],status:"Planning"}}function In(e,n){try{Vt();const t=W||{};if(t&&t[e]){t[e].status=n,n==="Archived"?t[e].archived=!0:t[e].archived=!1;const a=D("v2.detail.errors.statusUpdateFailed");let o=!1;if(C.cineStorage&&typeof C.cineStorage.saveProject=="function")C.cineStorage.saveProject(e,t[e]),o=!0;else if(typeof C.saveProject=="function")C.saveProject(e,t[e]),o=!0;else if(typeof C.resolveSafeLocalStorage=="function"){const i=C.resolveSafeLocalStorage();i&&(i.setItem(ft,JSON.stringify(t)),o=!0)}else C.cineStorage&&typeof C.cineStorage.safeSetLocalStorage=="function"&&(C.cineStorage.safeSetLocalStorage(ft,JSON.stringify(t)),o=!0);return o?(W=t,!0):(alert(a),!1)}}catch(t){console.error("[ProjectDetail] Failed to update status:",t),alert(D("v2.detail.errors.statusUpdateFailed"))}return!1}async function xn(e){if(!e)return console.warn("[ProjectDetail] No project name provided"),!1;Vt(),ae=e;const n=document.getElementById("v2ProjectName");n&&(n.textContent=e),C.cineLegacyShim&&await C.cineLegacyShim.loadProject(e);const t=Cn(e),a=document.getElementById("v2ProjectPeriods"),o=document.getElementById("v2ProjectStatus");if(o){o.value=t.status,mt(o);const i=o.parentNode,r=i?o.cloneNode(!0):o;i&&i.replaceChild(r,o),r.addEventListener("change",s=>{const l=s.target.value;In(e,l),mt(r)})}if(a){let i="";Array.isArray(t.prepDays)&&t.prepDays.forEach(r=>{const s=nt(r);s&&(i+=`<span class="v2-header-badge prep" title="Prep Dates: ${s}"><span class="period-icon">📅</span> ${s}</span>`)}),Array.isArray(t.shootingDays)&&t.shootingDays.forEach(r=>{const s=nt(r);s&&(i+=`<span class="v2-header-badge shoot" title="Shooting Dates: ${s}"><span class="period-icon">🎥</span> ${s}</span>`)}),Array.isArray(t.returnDays)&&t.returnDays.forEach(r=>{const s=nt(r);s&&(i+=`<span class="v2-header-badge return" title="Return Dates: ${s}"><span class="period-icon">🚛</span> ${s}</span>`)}),a.innerHTML=i,a.style.display=i?"flex":"none"}return console.log(`[ProjectDetail] Loaded project: ${e}`),!0}function Na(){return ae}function qa(){C.cineViewManager&&C.cineViewManager.showView("projects")}function Fa(){if(document.getElementById($e))return document.getElementById($e);const e=document.createElement("section");e.id=$e,e.className="app-view";const n=document.querySelector(".v2-main");return n&&n.appendChild(e),e}function $n(){const e=Fa();e&&(e.innerHTML=`
      <header class="view-header view-header-with-back">
        <button type="button" class="v2-back-btn" id="v2BackToProjects" aria-label="${D("v2.detail.backButton")}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>${D("v2.detail.backButton")}</span>
        </button>
        <h1 id="v2ProjectName" class="view-header-title">Project</h1>
        <div class="v2-header-status">
            <select id="v2ProjectStatus" class="v2-status-select">
                <option value="Draft">${D("v2.dashboard.status.draft")}</option>
                <option value="Planning">${D("v2.dashboard.status.planning")}</option>
                <option value="Waiting for Approval">${D("v2.dashboard.status.waitingForApproval")}</option>
                <option value="Approved">${D("v2.dashboard.status.approved")}</option>
                <option value="Shooting">${D("v2.dashboard.status.shooting")}</option>
                <option value="Completed">${D("v2.dashboard.status.completed")}</option>
                <option value="Archived">${D("v2.dashboard.status.archived")}</option>
            </select>
        </div>
        <div id="v2ProjectPeriods" class="v2-header-periods" style="display: none;"></div>
        <div class="view-header-actions">
          <button type="button" class="v2-btn v2-btn-ghost" id="v2PrintProjectBtn" title="${D("v2.detail.header.print")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateReqsGearBtn" title="${D("v2.detail.header.generateReqs")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${D("v2.detail.header.generateReqs")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2ExportProjectBtn" title="${D("v2.detail.header.export")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
               <polyline points="16 6 12 2 8 6"/>
               <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span class="v2-btn-label">${D("v2.detail.header.export")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-ghost" id="v2GenerateOverviewBtn" title="${D("v2.detail.header.generateOverview")}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
            <span class="v2-btn-label">${D("v2.detail.header.generateOverview")}</span>
          </button>
          <button type="button" class="v2-btn v2-btn-secondary" id="v2SaveProjectBtn">
            ${D("v2.detail.header.save")}
          </button>
        </div>
      </header>


      
      <!-- Tab Navigation (Sticky Top) -->
      <nav class="v2-tabs-nav" role="tablist" aria-label="Project sections">
        <button type="button" class="v2-tab-btn active" data-tab="camera" role="tab" aria-selected="true" aria-controls="tab-camera">
          ${D("v2.detail.tabs.cameraPackage")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="power" role="tab" aria-selected="false" aria-controls="tab-power">
          ${D("v2.detail.tabs.powerSummary")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="requirements" role="tab" aria-selected="false" aria-controls="tab-requirements">
          ${D("v2.detail.tabs.requirements")}
        </button>
        <button type="button" class="v2-tab-btn" data-tab="kit" role="tab" aria-selected="false" aria-controls="tab-kit">
          ${D("v2.detail.tabs.gearList")}
        </button>
      </nav>

      <div class="view-content">
        <!-- Tab Content -->
        <div class="v2-tab-content" style="padding-top: var(--v2-space-lg);">
          <!-- Camera Package Tab -->
          <section id="tab-camera" class="v2-tab-pane active" role="tabpanel" aria-labelledby="tab-camera-btn">
            ${za()}
          </section>
          
          <!-- Power Summary Tab -->
          <section id="tab-power" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-power-btn" hidden>
            ${Ka()}
          </section>
          
          <!-- Requirements Tab -->
          <section id="tab-requirements" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-requirements-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${D("v2.detail.actions.projectRequirements")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateRequirementsBtn">
                  ${D("v2.detail.actions.generateRequirements")}
                </button>
              </div>
              <div class="v2-card-body" id="v2RequirementsContainer">
                <p class="v2-text-muted">${D("v2.detail.actions.generateRequirementsHelp")}</p>
                <div data-reparent="projectForm"></div>
                <div id="v2RequirementsOutput" class="v2-requirements-output" style="margin-top: var(--v2-space-md);"></div>
              </div>
            </div>
          </section>
          
          <!-- Gear List Tab -->
          <section id="tab-kit" class="v2-tab-pane" role="tabpanel" aria-labelledby="tab-kit-btn" hidden>
            <div class="v2-card">
              <div class="v2-card-header">
                <h2>${D("v2.detail.actions.gearList")}</h2>
                <button type="button" class="v2-btn v2-btn-primary" id="v2GenerateGearListBtn">
                  ${D("v2.detail.actions.generateGearList")}
                </button>
              </div>
              <div class="v2-card-body" id="v2KitListContainer">
                <p class="v2-text-muted">${D("v2.detail.actions.generateGearListHelp")}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `,Ua(e),setTimeout(()=>Ga(e),0))}function za(){return`
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
    `}function Ga(e){e.querySelectorAll("[data-reparent]").forEach(t=>{const a=t.dataset.reparent,o=document.getElementById(a);if(o){const i=o.tagName.toLowerCase();["select","input","textarea"].includes(i)?(o.style.display="block",o.classList.add("v2-"+i),o.style.width="100%",o.style.height="",o.style.minHeight=""):i==="form"&&(o.style.display="block",o.style.position="static",o.style.visibility="visible",o.style.width="100%",o.classList.add("v2-reparented-form")),o.style.whiteSpace="";const r=o.closest(".select-wrapper"),s=r||o;r&&(r.classList.add("v2-select-container"),r.style.width="100%"),t.parentNode.replaceChild(s,t)}else console.warn(`[ProjectDetail] Legacy element not found: ${a}`),t.innerHTML='<span class="v2-error-text">Element missing</span>'})}function Ka(){return`
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
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomOut" title="${D("v2.detail.diagram.zoomOut")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ResetView" title="${D("v2.detail.diagram.resetView")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </button>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2ZoomIn" title="${D("v2.detail.diagram.zoomIn")}">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
               <div class="v2-vr"></div>
               <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost" id="v2DownloadDiagram" title="${D("v2.detail.diagram.download")}">
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
    `}function Ua(e){const n=e.querySelector("#v2BackToProjects");n&&n.addEventListener("click",qa);const t=e.querySelector("#v2PrintProjectBtn");t&&t.addEventListener("click",()=>{if(confirm('Do you want to set the project status to "Waiting for Approval"?')){In(ae,"Waiting for Approval");const w=document.getElementById("v2ProjectStatus");w&&(w.value="Waiting for Approval",mt(w))}if(console.log("[ProjectDetail] Triggering Print/Export"),typeof window.openLegacyPrintDialog=="function"){window.openLegacyPrintDialog();return}C.cineFeaturePrint&&typeof C.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?C.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof C.triggerOverviewPrintWorkflow=="function"?C.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()});const a=e.querySelector("#v2SaveProjectBtn");a&&a.addEventListener("click",()=>{if(C.cineLegacyShim&&ae){const w=document.getElementById("saveSetupBtn");w&&w.click()}});function o(){if(!ae)return;const w=Cn(ae);let v={};C.getCurrentProjectInfo&&typeof C.getCurrentProjectInfo=="function"?v=C.getCurrentProjectInfo():v={projectName:ae};const g=Object.assign({},v,{prepDays:w.prepDays||[],shootingDays:w.shootingDays||[],returnDays:w.returnDays||[],projectName:ae});C.populateProjectForm&&typeof C.populateProjectForm=="function"?C.populateProjectForm(g):console.warn("[ProjectDetail] populateProjectForm not found"),Ke("requirements");const c=document.getElementById("tab-requirements");c&&c.scrollIntoView({behavior:"smooth"})}const i=e.querySelector("#v2GenerateReqsGearBtn");i&&i.addEventListener("click",()=>{o()});const r=e.querySelector("#v2ExportProjectBtn");r&&r.addEventListener("click",()=>{const w=document.getElementById("shareSetupBtn");w&&w.click()});const s=e.querySelector("#v2GenerateOverviewBtn");s&&s.addEventListener("click",()=>{const w=document.getElementById("generateOverviewBtn");w&&w.click()});const l=e.querySelector("#v2GenerateRequirementsBtn");l&&(l.innerHTML='<i class="fas fa-save"></i> Save & Generate Gear List',l.addEventListener("click",()=>{let w={};C.collectProjectFormData&&typeof C.collectProjectFormData=="function"?w=C.collectProjectFormData():console.warn("[ProjectDetail] collectProjectFormData not found");let v="";if(C.generateGearListHtml&&typeof C.generateGearListHtml=="function")v=C.generateGearListHtml(w);else{alert("Error: Generator module not found.");return}if(C.getSafeGearListHtmlSections&&typeof C.getSafeGearListHtmlSections=="function"){const g=C.getSafeGearListHtmlSections(v),c=document.getElementById("v2RequirementsOutput");c&&(g.projectHtml?(c.innerHTML=g.projectHtml,c.style.display="block"):c.style.display="none");const d=document.getElementById("v2KitListContainer");d&&g.gearHtml?d.innerHTML=g.gearHtml:d&&(d.innerHTML='<p class="v2-text-muted">No gear list items generated.</p>'),alert("Requirements Saved & Gear List Generated!")}}));const p=e.querySelector("#v2GenerateGearListBtn");p&&p.addEventListener("click",()=>{o()}),e.querySelectorAll(".v2-tab-btn").forEach(w=>{w.addEventListener("click",()=>{const v=w.dataset.tab;Ke(v)})});const E=e.querySelector("#v2DownloadDiagram");E&&E.addEventListener("click",w=>{const v=document.getElementById("downloadDiagram");if(v){const g=new MouseEvent("click",{bubbles:!0,cancelable:!0,shiftKey:w.shiftKey});v.dispatchEvent(g)}else console.warn("[ProjectDetail] Legacy download button not found")}),setTimeout(()=>Ja(e),0)}function Pn(){if(!ae)return;if(!C.cineFeaturesConnectionDiagram||typeof C.cineFeaturesConnectionDiagram.createConnectionDiagram!="function"){console.warn("[ProjectDetail] Connection Diagram module not found.");return}if(!document.getElementById("v2-diagram-area"))return;console.log("[ProjectDetail] Rendering Power Diagram...");const t={getSetupDiagramContainer:()=>document.getElementById("v2-diagram-area"),getDiagramLegend:()=>document.getElementById("v2-diagram-legend"),getDiagramHint:()=>document.getElementById("v2-diagram-hint"),getDownloadDiagramBtn:()=>document.getElementById("v2DownloadDiagram"),getZoomInBtn:()=>document.getElementById("v2ZoomIn"),getZoomOutBtn:()=>document.getElementById("v2ZoomOut"),getResetViewBtn:()=>document.getElementById("v2ResetView"),getDiagramDetailDialog:()=>{const a=document.getElementById("diagramDetailDialog");return a&&a.closest("#mainContent")&&document.body.appendChild(a),a},getDiagramDetailContent:()=>document.getElementById("diagramDetailDialogContent")};if(!document.getElementById("v2-diagram-css")){const a=typeof C.cineFeaturesConnectionDiagram.getDiagramCss=="function"?C.cineFeaturesConnectionDiagram.getDiagramCss(!1):"";if(a){const o=document.createElement("style");o.id="v2-diagram-css",o.textContent=a,document.head.appendChild(o)}}try{C.cineFeaturesConnectionDiagram.createConnectionDiagram(t)}catch(a){console.error("[ProjectDetail] Error rendering diagram:",a)}}function mt(e){const t=e.value.toLowerCase().replace(/\s+/g,"-");e.classList.remove("draft","planning","waiting-for-approval","approved","shooting","completed","archived"),e.classList.add(t)}function Mt(){const e={heroTotalDraw:"v2TotalDraw",heroRuntime:"v2Runtime",heroBatteryCount:"v2BatteryCount",heroCurrent144:"v2Current144",heroCurrent12:"v2Current12"};Object.keys(e).forEach(n=>{const t=document.getElementById(n),a=document.getElementById(e[n]);t&&a&&(a.textContent=t.textContent)}),kn()==="power"&&setTimeout(()=>Pn(),50)}function Wa(){const e=document.getElementById("results");if(!e){console.warn("[ProjectDetail] Legacy results container not found. Auto-sync disabled.");return}new MutationObserver(()=>{Mt()}).observe(e,{childList:!0,subtree:!0,characterData:!0}),console.log("[ProjectDetail] Power observer started")}function Ya(){if(!zt){if(zt=!0,Wa(),Mt(),document.addEventListener("v2:viewchange",Gt),C.cineViewManager&&typeof C.cineViewManager.getCurrentView=="function"&&C.cineViewManager.getCurrentView()==="projectDetail"){const n=C.cineViewManager.getCurrentParams?C.cineViewManager.getCurrentParams():{};n&&n.projectId&&(console.log("[ProjectDetail] Already on projectDetail, triggering render"),Gt({detail:{view:"projectDetail",params:n}}))}console.log("[ProjectDetail] Initialized")}}async function Gt(e){const{view:n,params:t}=e.detail||{};if(n==="projectDetail"&&t&&t.projectId){console.log("[ProjectDetail] View change detected, loading:",t.projectId);const a=document.getElementById($e);if(!a){console.warn("[ProjectDetail] View element not found:",$e);return}a.querySelector(".view-header")||$n(),await xn(t.projectId),t.tab&&Ke(t.tab),t.action==="print"&&(console.log("[ProjectDetail] Auto-triggering print workflow"),setTimeout(()=>{C.cineFeaturePrint&&typeof C.cineFeaturePrint.triggerOverviewPrintWorkflow=="function"?C.cineFeaturePrint.triggerOverviewPrintWorkflow({},{reason:"export"}):typeof C.triggerOverviewPrintWorkflow=="function"?C.triggerOverviewPrintWorkflow({},{reason:"export"}):window.print()},800))}}function Xa(e){return typeof e!="string"?"":e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}function Za(e){const n=C.texts?C.texts[e]:null;if(!n){console.warn(`[ProjectDetail] Translation key not found: ${e}`);return}const t=Xa(n);console.log(`[ProjectDetail] Triggering Add Custom for: ${n} (${t})`);const a=document.querySelector(`[data-gear-custom-add="${t}"]`);a?a.click():(console.warn(`[ProjectDetail] Legacy Add Button not found for slug: ${t}`),alert(`Could not open Add Custom dialog for ${n}. Legacy element missing.`))}function Ja(e){[{cardId:"v2-camera-card",key:"category_cameras"},{cardId:"v2-power-card",key:"category_batteries"}].forEach(({cardId:t,key:a})=>{const o=e.querySelector(`#${t}`);if(!o)return;const i=o.querySelector(".v2-card-header");if(!i||i.querySelector(".v2-add-custom-btn"))return;const r=document.createElement("button");r.type="button",r.className="v2-btn v2-btn-sm v2-btn-ghost v2-add-custom-btn",r.title="Add Custom Item",r.innerHTML=`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      `,r.addEventListener("click",s=>{s.stopPropagation(),Za(a)}),i.appendChild(r)})}const _t={init:Ya,createDetailViewContent:$n,loadProject:xn,getCurrentProject:Na,switchTab:Ke,getCurrentTab:kn,syncLegacyResultsToV2:Mt};typeof C<"u"&&(C.cineProjectDetail=_t);typeof window<"u"&&(window.cineProjectDetail=_t);const Qa=Object.freeze(Object.defineProperty({__proto__:null,ProjectDetail:_t},Symbol.toStringTag,{value:"Module"}));(function(e){const n=`
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
    `;function t(){const i=document.getElementById("v2-app");if(!i)return!1;if(i.querySelector(".v2-sidebar"))return!0;const r=i.querySelector(".v2-main"),s=document.createElement("template");return s.innerHTML=n.trim(),r?i.insertBefore(s.content,r):i.appendChild(s.content),!0}function a(){t()||document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",()=>{t()},{once:!0})}const o={mount:a};e.cineV2SidebarView=o,typeof window<"u"&&(window.cineV2SidebarView=o)})(typeof globalThis<"u"?globalThis:window);const eo=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));function to(){return typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof self<"u"?self:typeof global<"u"?global:{}}const Ce=to();function no(e){return typeof cineModuleBase=="object"&&cineModuleBase?cineModuleBase:e&&typeof e.cineModuleBase=="object"?e.cineModuleBase:null}const se=no(Ce),ao=se&&typeof se.safeWarn=="function"?se.safeWarn:function(n,t){typeof console>"u"||!console||typeof console.warn!="function"||(typeof t>"u"?console.warn(n):console.warn(n,t))},oo=/[\u200B\u200C\u200D\u2060]/g,io=/[\u0009-\u000D\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g,so=/[\u0300-\u036F]/g,ro=/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g,lo=/[\u2018\u2019\u201A\u201B\u2032\u2035]/g,co=/[\u201C\u201D\u201E\u201F\u2033\u2036]/g,uo=/[\u2044\u2215]/g,vo=/[×✕✖✗✘]/g,po=/[°º˚]/g,go=/[\u2026]/g,fo=/[\u00AE\u2122]/g,mo=/[!#$%()*,:;<=>?@[\]^{|}~._]/g,bo=/[″‶‴⁗]/g,yo=/[′‵]/g,Ze=String.raw`\d+(?:\s*[.,/-]\s*\d+)*(?:\s+\d+(?:\s*[.,/-]\s*\d+)*)*`,ho=new RegExp(String.raw`(${Ze})[\s-]*(?:feet|foot|ft\.?)(?![a-z])`,"gi"),wo=new RegExp(String.raw`(${Ze})\s*['’](?=\s|[\d"”″'-]|$)`,"g"),Eo=new RegExp(String.raw`(${Ze})[\s-]*(?:inches|inch|in\.?)(?![a-z])`,"gi"),So=new RegExp(String.raw`(${Ze})\s*["”″](?=\s|[\d'’"-]|$)`,"g");function je(e){return typeof e=="string"?e.replace(/\s+/g," ").trim():e}function Dn(e){if(typeof e!="string"||!e)return e;let n=e.replace(bo,'"').replace(yo,"'");return n=n.replace(ho,(t,a)=>{const o=je(a);return o?`${o} ft `:a}),n=n.replace(wo,(t,a)=>{const o=je(a);return o?`${o} ft `:a}),n=n.replace(Eo,(t,a)=>{const o=je(a);return o?`${o} inch `:a}),n=n.replace(So,(t,a)=>{const o=je(a);return o?`${o} inch `:a}),n}const bt=[["ß","ss"],["æ","ae"],["œ","oe"],["ø","o"],["þ","th"],["ð","d"],["đ","d"],["ħ","h"],["ı","i"],["ĳ","ij"],["ŋ","ng"],["ł","l"],["ſ","s"]],Lo=bt.map(e=>new RegExp(e[0],"g"));function ko(e){if(typeof e!="string")return"";let n=e.replace(oo,"");if(typeof n.normalize=="function")try{n=n.normalize("NFKD")}catch{}n=n.toLowerCase(),n=Dn(n),n=n.replace(io," ").replace(lo," ").replace(co," ").replace(ro," ").replace(uo," ").replace(vo," x ").replace(po," deg ").replace(/\bdegrees?\b/gi," deg ").replace(/&/g," and ").replace(/\+/g," plus ").replace(/@/g," at ").replace(fo," ").replace(go," ").replace(mo," "),n=n.replace(so,"");for(let t=0;t<bt.length;t+=1){const a=bt[t],o=Lo[t];n=n.replace(o,a[1])}return n=n.replace(/['"`]/g," ").replace(/\s+/g," ").trim(),n}const we=Object.freeze({normalizeMeasurementUnits:Dn,normalizeSearchValue:ko});if(se)if(se.registerOrQueueModule("cine.features.featureSearchNormalization",we,{category:"features",description:"Shared normalization helpers for feature search, including measurement units and punctuation folding.",replace:!0,connections:["cineModuleBase","cineModuleContext","cineUi"]},e=>ao("Unable to register cine.features.featureSearchNormalization module.",e),Ce,se.getModuleRegistry&&se.getModuleRegistry(Ce)),typeof se.exposeGlobal=="function")se.exposeGlobal("cineFeaturesFeatureSearchNormalization",we,Ce,{configurable:!0,enumerable:!1,writable:!1});else try{Ce.cineFeaturesFeatureSearchNormalization=we}catch{}const Kt="cine_use_v2_search",Co=40,Bn=[],Ut={cameras:"Cameras",monitors:"Monitors",video:"Video",fiz:"FIZ",batteries:"Batteries",batteryHotswaps:"Battery Hot Swap",carts:"Carts",wirelessReceivers:"Wireless",audio:"Audio",lights:"Lights",gimbals:"Gimbals",drones:"Drones",actionCameras:"Action Cameras",accessories:"Accessories",viewfinders:"Viewfinders",directorMonitors:"Director Monitors",iosVideo:"iOS Video",videoAssist:"Video Assist",media:"Media",lenses:"Lenses",filterOptions:"Filters",recordingMediaBrands:"Recording Media Brands",recordingMediaSizes:"Recording Media Sizes",gearList:"Gear List"},Io=we&&typeof we.normalizeSearchValue=="function"?we:{normalizeSearchValue:e=>typeof e=="string"?e.trim().toLowerCase():""},ce=e=>Io.normalizeSearchValue(e||""),yt=e=>ce(e).split(" ").map(n=>n.trim()).filter(Boolean);function xo(){try{const e=new URLSearchParams(window.location.search);if(e.has("v2Search")){const t=e.get("v2Search")==="true";return localStorage.setItem(Kt,t.toString()),t}const n=localStorage.getItem(Kt);return n===null?!0:n==="true"}catch{return!0}}function $o(){return(Array.isArray(window.featureSearchEntries)?window.featureSearchEntries:Bn).map(n=>{const t=n?.optionLabel||n?.display||n?.label||"",a=n?.detail||n?.value?.detail||"",o=n?.display||t,i=n?.key||ce(o),r=n?.type||n?.entryType||n?.value?.type||"feature",s=[t,a,o].filter(Boolean).join(" ");return{key:`legacy:${i}`,legacyKey:n?.key||null,type:r,label:t,display:o,detail:a,keywords:s,legacyEntry:n,legacyQuery:o||t}})}function Po(e){const n=[];if(!e||typeof e!="object")return n;const t=(o,i,r)=>{if(!o)return;const s=[o,r,i].filter(Boolean).join(" ");n.push({key:`device:${ce(o)}:${ce(i)}`,type:"device",label:o,display:o,detail:r?`Device · ${r}`:"Device",keywords:s,legacyQuery:o})},a=(o,i,r)=>{!i||typeof i!="object"||Object.keys(i).forEach(s=>{!s||s==="accessories"||t(s,o,r)})};return Object.entries(e).forEach(([o,i])=>{const r=Ut[o]||o;if(o==="accessories"&&i&&typeof i=="object"){Object.entries(i).forEach(([s,l])=>{const p=Ut[s]||s,y=`${r} · ${p}`;a(`accessories:${s}`,l,y)});return}a(o,i,r)}),n}function Do(){const e=[],n=new Map,t=a=>{if(!a||!a.label)return;const o=ce(a.label);if(!o)return;const i=`label:${o}`,r=ce(a.keywords||""),s=new Set([...yt(a.label),...yt(a.keywords||"")]),l={...a,normalizedLabel:o,normalizedKeywords:r,tokens:s};n.has(l.key)||e.push(l),n.set(l.key,l),a.legacyKey&&n.set(`legacyKey:${a.legacyKey}`,l),n.has(i)||n.set(i,l)};return $o().forEach(t),Po(Gn).forEach(t),{entries:e,index:n}}function Bo(){const e=Array.isArray(window.featureSearchEntries)?window.featureSearchEntries:Bn;return{ref:e,length:e.length}}function To({buildIndex:e=Do,getSnapshot:n=Bo}={}){let t=e(),a=n(),o=!1;return{getIndexState:()=>t,refreshIfStale:()=>{const l=n(),p=l.ref!==a.ref,y=l.length!==a.length;(o||p||y)&&(t=e(),a=l,o=!1)},markStale:()=>{o=!0}}}function Ao(e){const n=Array.isArray(window.featureSearchDefaultOptions)?window.featureSearchDefaultOptions:[];if(!n.length)return[];const t=[],a=new Set;return n.forEach(o=>{if(!o)return;const i=o.entryKey?`legacyKey:${o.entryKey}`:null,r=o.label||o.value||"",s=r?`label:${ce(r)}`:null,l=i&&e.get(i)||s&&e.get(s);l&&!a.has(l.key)&&(t.push(l),a.add(l.key))}),t}function Vo(e,n,t){if(!e||!n)return 0;if(e.normalizedLabel===n)return 1e3;if(e.normalizedLabel.startsWith(n))return 820;if(e.normalizedLabel.includes(n))return 650;let a=0;if(e.normalizedKeywords.includes(n)&&(a+=120),t.length){let o=0;t.forEach(i=>{e.tokens.has(i)&&(o+=1)}),a+=o*60}return e.type==="action"&&(a+=10),a}function Mo(e,n){const t=ce(n);if(!t)return[];const a=yt(n);return e.map(o=>({entry:o,score:Vo(o,t,a)})).filter(o=>o.score>0).sort((o,i)=>i.score-o.score||o.entry.label.localeCompare(i.entry.label)).slice(0,Co).map(o=>o.entry)}function _o(e){if(!e)return null;const n=e.closest(".v2-search-input-wrapper")||e.parentElement;if(!n)return null;let t=document.getElementById("featureSearchDropdown");return t||(t=document.createElement("div"),t.id="featureSearchDropdown",t.className="feature-search-dropdown",t.setAttribute("role","listbox")),n.contains(t)||n.appendChild(t),t}function jo(e,n){if(!e)return;if(e.innerHTML="",!n.length){e.dataset.count="0",e.dataset.open="false",e.hidden=!0,e.setAttribute("aria-expanded","false");return}const t=document.createElement("div");t.className="feature-search-dropdown-list",n.forEach((a,o)=>{const i=document.createElement("button");i.type="button",i.className="feature-search-option";const r=`v2-feature-search-${a.key.replace(/[^a-z0-9_-]+/gi,"-")}`;i.id=r,i.setAttribute("role","option"),i.setAttribute("tabindex",o===0?"0":"-1"),i.setAttribute("data-value",a.display||a.label),i.setAttribute("data-entry-key",a.key),i.setAttribute("aria-label",a.label),i.setAttribute("aria-selected","false");const s=document.createElement("div");s.className="feature-search-option-content";const l=document.createElement("span");if(l.className="feature-search-option-label",l.textContent=a.label,s.appendChild(l),a.detail){const p=document.createElement("span");p.className="feature-search-option-value",p.textContent=a.detail,s.appendChild(p)}i.appendChild(s),t.appendChild(i)}),e.appendChild(t),e.dataset.count=String(n.length),e.dataset.activeIndex="0",e.dataset.open="true",e.hidden=!1,e.setAttribute("aria-expanded","true")}function ht(e){return e?Array.from(e.querySelectorAll('[role="option"]')):[]}function ke(e,n,t){const a=ht(n);if(!a.length)return null;const o=Math.max(0,Math.min(t,a.length-1));return a.forEach((i,r)=>{const s=r===o;i.setAttribute("tabindex",s?"0":"-1"),i.setAttribute("aria-selected",s?"true":"false"),s&&e&&i.id&&e.setAttribute("aria-activedescendant",i.id)}),n.dataset.activeIndex=String(o),a[o]}function ye(e,n){n&&(n.dataset.open="false",n.hidden=!0,n.setAttribute("aria-expanded","false"),n.dataset.activeIndex="",e&&e.hasAttribute("aria-activedescendant")&&e.removeAttribute("aria-activedescendant"))}function Wt(e){!e||e.dataset.count==="0"||(e.dataset.open="true",e.hidden=!1,e.setAttribute("aria-expanded","true"))}function Yt(e){window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:e}}))}function at(e,n,t){if(!e)return;const a=e.display||e.label||n||"",o=e.legacyQuery||a;if(!o)return;if(t&&(t.value=a,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))),typeof window.runFeatureSearch=="function"){window.runFeatureSearch(o);return}const i=document.getElementById("featureSearch");i&&(i.value=o,i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0})))}function ot(e,n){if(!e)return null;const t=e.getAttribute("data-entry-key");if(t&&n.has(t))return n.get(t);const a=e.getAttribute("data-value")||"";return a&&n.get(`label:${ce(a)}`)||null}function Ro(e,n){const t=To();let a=[];const o=()=>a.length>0,i=()=>{t.markStale()};window.addEventListener("v2:search-index-refresh",i);const r=s=>{t.refreshIfStale();const{entries:l,index:p}=t.getIndexState();s?a=Mo(l,s):a=Ao(p),jo(n,a),n.dataset.count!=="0"&&ke(e,n,0)};e.addEventListener("input",s=>{s.stopPropagation();const l=s.target.value.trim();r(l),Wt(n),Yt(l)}),e.addEventListener("focus",()=>{!e.value&&!o()&&t.refreshIfStale(),r(e.value.trim()),Wt(n)}),e.addEventListener("blur",()=>{window.setTimeout(()=>{n.contains(document.activeElement)||ye(e,n)},120)}),e.addEventListener("keydown",s=>{s.stopPropagation();const l=ht(n),p=n.dataset.activeIndex?Number(n.dataset.activeIndex):0;if(s.key==="Enter"){const y=l[p],E=ot(y,t.getIndexState().index);at(E,e.value.trim(),e),ye(e,n);return}if(s.key==="Escape"){e.value&&(e.value="",r(""),Yt("")),ye(e,n),s.preventDefault();return}if(s.key==="ArrowDown"){if(!l.length)return;s.preventDefault();const y=p+1>=l.length?0:p+1;ke(e,n,y);return}if(s.key==="ArrowUp"){if(!l.length)return;s.preventDefault();const y=p-1<0?l.length-1:p-1;ke(e,n,y)}}),n.addEventListener("mousedown",s=>{s.target.closest("[data-value]")&&s.preventDefault()}),n.addEventListener("click",s=>{const l=s.target.closest("[data-value]");if(!l)return;const p=ot(l,t.getIndexState().index);at(p,e.value.trim(),e),ye(e,n)}),n.addEventListener("keydown",s=>{const l=ht(n);if(!l.length)return;const p=document.activeElement,y=l.indexOf(p);if(s.key==="ArrowDown"){s.preventDefault();const E=y>=0?y+1:0;ke(e,n,E>=l.length?0:E)?.focus()}else if(s.key==="ArrowUp"){s.preventDefault();const E=y>0?y-1:l.length-1;ke(e,n,E)?.focus()}else if(s.key==="Enter"){if(s.preventDefault(),y>=0&&l[y]){const E=ot(l[y],t.getIndexState().index);at(E,e.value.trim(),e),ye(e,n)}}else s.key==="Escape"&&(s.preventDefault(),ye(e,n),e.focus())})}function Oo({inputId:e}={}){if(!xo())return!1;const n=document.getElementById(e||"v2SidebarSearchInput");if(!n)return!1;const t=_o(n);return t?(Ro(n,t),!0):!1}const me=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Xt="v2-sidebar-search",Je="v2SidebarSearchInput",Tn="darkMode",An="cameraPowerPlanner_pinkMode",Ho="pinkMode",No={"All Projects":"v2.sidebar.nav.allProjects","Active Projects":"v2.sidebar.nav.activeProjects",Archive:"v2.sidebar.nav.archive","Auto Backups":"v2.sidebar.nav.autoBackups","Device Library":"v2.sidebar.nav.deviceLibrary",Contacts:"v2.sidebar.nav.contacts","Auto Gear Rules":"v2.sidebar.nav.autoGearRules","Owned Gear":"v2.sidebar.nav.ownedGear","Create New Project":"v2.sidebar.nav.createProject",Projects:"v2.sidebar.nav.projectsSection",Tools:"v2.sidebar.nav.toolsSection",Support:"v2.sidebar.nav.supportSection",Help:"v2.sidebar.nav.help",Settings:"v2.sidebar.nav.settings"};function Pe(e,n={},t=null){const a=t||document.documentElement.lang||"en";let o=window.texts&&window.texts[a]?window.texts[a]:null;!o&&window.texts&&(o=window.texts.en);const i=(s,l)=>l.split(".").reduce((p,y)=>p?p[y]:null,s);let r=o?i(o,e):null;if(!r&&a!=="en"&&window.texts&&window.texts.en&&(r=i(window.texts.en,e)),!r)return e;if(typeof r=="string")for(const[s,l]of Object.entries(n))r=r.replace(`{${s}}`,l);return r}function qo(){console.log("[V2 Sidebar] Initializing...");const e=document.querySelector(".v2-sidebar");if(!e){console.error("[V2 Sidebar] .v2-sidebar not found. Cannot inject controls.");return}Fo(e),zo(e),Ko(e),Oo({inputId:Je})||Go(),ei(),Xo(),Zo(),Uo(),Yo();const t=document.getElementById("languageSelect");t&&Ue(t.value)}function Fo(e){if(e.querySelector(".v2-sidebar-header"))return;const n=document.createElement("div");n.className="v2-sidebar-header";const t=document.createElement("img");t.src="src/icons/Icon Bluenew.svg",t.className="v2-sidebar-logo",t.alt="Logo";const a=document.createElement("h1");a.className="v2-sidebar-title",a.innerHTML="Cine Power<br>Planner",n.appendChild(t),n.appendChild(a),e.insertBefore(n,e.firstChild)}function zo(e){if(e.querySelector(".v2-sidebar-controls-container"))return;const n=document.createElement("div");n.className="v2-sidebar-controls-container";const t=document.createElement("div");t.className="v2-controls-row-1",Jo(t),ti(t),Qo(t),n.appendChild(t);const a=e.querySelector(".v2-sidebar-footer");a?a.insertAdjacentElement("beforebegin",n):e.appendChild(n)}function Go(){const e=document.getElementById(Je),n=document.getElementById("featureSearch");!e||!n||(e.addEventListener("input",t=>{t.stopPropagation(),n.value=t.target.value,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0}))}),e.addEventListener("focus",()=>{n.dispatchEvent(new Event("focus",{bubbles:!0}))}),e.addEventListener("blur",()=>{setTimeout(()=>{n.dispatchEvent(new Event("blur",{bubbles:!0}))},200)}),e.addEventListener("keydown",t=>{if(t.stopPropagation(),!["ArrowUp","ArrowDown","Enter","Escape"].includes(t.key))return;const o=new KeyboardEvent("keydown",{key:t.key,code:t.code,keyCode:t.keyCode,bubbles:!0,cancelable:!0});n.dispatchEvent(o)}),e.addEventListener("input",t=>{const a=t.target.value.trim();window.dispatchEvent(new CustomEvent("v2:search",{detail:{query:a}}))}))}function Ko(e){if(e.querySelector(`.${Xt}`))return;const n=document.createElement("div");n.className=Xt,n.innerHTML=`
            <div class="v2-search-input-wrapper">
                <svg class="v2-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" id="${Je}" class="v2-search-input" placeholder="${Pe("v2.sidebar.search.placeholder")}" aria-label="${Pe("v2.sidebar.search.label")}">
            </div>
        `;const t=e.querySelector(".v2-sidebar-header");if(t)t.insertAdjacentElement("afterend",n);else{const a=e.querySelector(".v2-sidebar-nav");a?e.insertBefore(n,a):e.insertBefore(n,e.firstChild)}setTimeout(()=>{const a=document.getElementById("featureSearchDropdown"),o=n.querySelector(".v2-search-input-wrapper");a&&o&&(o.appendChild(a),a.style.top="110%",a.style.left="0",a.style.visibility="visible",a.style.display="none")},1e3)}function Uo(){document.addEventListener("click",e=>{e.target.closest("#closeHelp")&&(e.preventDefault(),e.stopImmediatePropagation(),Wo())})}function Wo(){const e=document.getElementById("helpDialog");e&&(e.setAttribute("hidden",""),e.style.display="none",typeof me.closeDialog=="function"&&me.closeDialog(e))}function Yo(){const e=document.getElementById("helpButton"),n=document.querySelector('[data-nav-key="openHelpNav"]'),t=a=>{a.preventDefault(),a.stopImmediatePropagation(),window.location.hash="/help"};e&&e.addEventListener("click",t),n&&n.addEventListener("click",t),document.addEventListener("keydown",a=>{a.target.matches("input, textarea, [contenteditable]")||((a.key==="?"&&a.shiftKey||a.key==="H"||a.key==="h"||a.key==="F1")&&t(a),a.key==="/"&&(a.ctrlKey||a.metaKey)&&t(a))},!0)}function Xo(){const e=document.getElementById("navAutoBackups");if(e){const a=localStorage.getItem("cineAutoRecover")==="true";e.style.display=a?"flex":"none"}const n=document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link");n.forEach(a=>{a.addEventListener("click",()=>{n.forEach(o=>o.classList.remove("active")),a.classList.add("active")})});const t=window.location.hash;t&&n.forEach(a=>{a.getAttribute("href")===t&&a.classList.add("active")})}function Zo(){const e=document.querySelectorAll(".v2-mobile-menu-toggle"),n=document.getElementById("v2-app"),t=document.querySelector(".v2-sidebar-overlay");if(!n)return;function a(){n.classList.add("sidebar-open")}function o(){n.classList.remove("sidebar-open")}e.forEach(s=>{s.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),a()})}),t&&t.addEventListener("click",o),document.querySelectorAll(".v2-sidebar-nav .v2-sidebar-link").forEach(s=>{s.addEventListener("click",()=>{window.innerWidth<=768&&o()})});const r=document.getElementById("v2ExitBtn");r&&r.addEventListener("click",o)}function Jo(e){if(!e||e.querySelector(".v2-lang-select-wrapper"))return;const n=document.getElementById("languageSelect"),t=n?n.value:"en",a=document.createElement("div");a.className="v2-lang-select-wrapper",a.innerHTML=`
            <select class="v2-lang-select" aria-label="Select Language">
                <option value="en" ${t==="en"?"selected":""}>English</option>
                <option value="de" ${t==="de"?"selected":""}>Deutsch</option>
                <option value="es" ${t==="es"?"selected":""}>Español</option>
                <option value="fr" ${t==="fr"?"selected":""}>Français</option>
                <option value="it" ${t==="it"?"selected":""}>Italiano</option>
            </select>
        `;const o=a.querySelector("select");o.addEventListener("change",i=>{const r=i.target.value;n&&(n.value=r,n.dispatchEvent(new Event("change",{bubbles:!0})),typeof me.updateLanguage=="function"&&me.updateLanguage(r),Ue(r))}),n&&n.addEventListener("change",()=>{o.value!==n.value&&(o.value=n.value,Ue(n.value))}),e.appendChild(a)}function Qo(e){if(e.querySelector("#v2RefreshBtn"))return;const n=document.createElement("button");n.className="v2-tool-btn",n.id="v2RefreshBtn",n.title="Force reload",n.setAttribute("aria-label","Force reload"),n.innerHTML=`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="23 4 23 10 17 10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        `,n.addEventListener("click",()=>{const t=document.getElementById("reloadButton");t?t.click():window.location.reload(!0)}),e.appendChild(n)}function Ue(e){document.querySelectorAll(".v2-sidebar-link-text, .v2-sidebar-section-title").forEach(a=>{a.dataset.key||(a.dataset.key=a.textContent.trim());const o=a.dataset.key,i=No[o];i&&(a.textContent=Pe(i,{},e))});const t=document.getElementById(Je);t&&(t.placeholder=Pe("v2.sidebar.search.placeholder",{},e),t.setAttribute("aria-label",Pe("v2.sidebar.search.label",{},e)))}me.updateSidebarTranslations=Ue;function ei(){ni()}function ti(e){if(e.querySelector("#v2ThemeToggleDark"))return;const n=document.createElement("button");n.className="v2-theme-toggle",n.id="v2ThemeToggleDark",n.setAttribute("aria-label","Toggle dark mode"),n.setAttribute("aria-pressed","false"),n.setAttribute("title","Toggle dark mode"),n.innerHTML=`
            <span class="v2-icon-moon icon-glyph" aria-hidden="true" data-icon-font="uicons">&#xEC7E;</span>
            <span class="v2-icon-sun icon-glyph" aria-hidden="true" data-icon-font="uicons" style="display:none">&#xF1FE;</span>
        `,n.addEventListener("click",ai);const t=document.createElement("button");t.className="v2-theme-toggle",t.id="v2ThemeTogglePink",t.setAttribute("aria-label","Toggle pink mode"),t.setAttribute("aria-pressed","false"),t.setAttribute("title","Toggle pink mode"),t.setAttribute("data-theme","pink"),t.innerHTML=`
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
        `,t.addEventListener("click",oi),e.appendChild(n),e.appendChild(t)}function ni(){const e=localStorage.getItem(Tn)==="true";Vn(e);const n=localStorage.getItem(An)==="true";Mn(n)}function ai(){const n=!document.body.classList.contains("dark-mode");Vn(n),localStorage.setItem(Tn,n)}function Vn(e){document.body.classList.toggle("dark-mode",e),document.body.classList.toggle("light-mode",!e);const n=document.getElementById("v2ThemeToggleDark");if(n){n.classList.toggle("active",e);const t=n.querySelector(".v2-icon-moon"),a=n.querySelector(".v2-icon-sun");t&&a&&(t.style.display=e?"none":"block",a.style.display=e?"block":"none")}}function oi(){const n=!document.body.classList.contains("pink-mode");Mn(n),localStorage.setItem(An,n),localStorage.setItem(Ho,n)}function Mn(e){document.body.classList.toggle("pink-mode",e),ii(e);const n=document.getElementById("v2ThemeTogglePink");n&&n.classList.toggle("active",e)}function ii(e){const n=document.querySelector(".v2-sidebar-logo");n&&(n.src=e?"src/icons/Icon Pinknew.svg":"src/icons/Icon Bluenew.svg")}const jt={init:qo};typeof me<"u"&&(me.cineV2Sidebar=jt);typeof window<"u"&&(window.cineV2Sidebar=jt);const si=Object.freeze(Object.defineProperty({__proto__:null,V2Sidebar:jt},Symbol.toStringTag,{value:"Module"}));class ri{constructor(n){this.viewId=n,this.container=null,this.isInitialized=!1}init(){if(this.isInitialized)return;if(console.log(`[View: ${this.viewId}] Initializing...`),this.container=document.getElementById(this.viewId),!this.container){const t=document.querySelector(".v2-app")||document.body;this.container=document.createElement("div"),this.container.id=this.viewId,this.container.className="app-view",t.appendChild(this.container)}const n=this.viewId.replace(/^view-/,"");window.cineViewManager&&window.cineViewManager.registerView(n,{onEnter:t=>this.render(t),onLeave:()=>this.onLeave&&this.onLeave()}),this.isInitialized=!0}render(n){console.warn(`[View: ${this.viewId}] Render method not implemented`)}onLeave(){}escapeHtml(n){return n?String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}}class _n extends ri{constructor(){super("rules"),this.devicesLocal={}}async render(){if(!window.getAutoGearRules){this.container.innerHTML=`
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
                    ${n.map((o,i)=>this.renderRuleCard(o,i)).join("")}
                </div>
            `,this.attachListeners()}renderRuleCard(n,t){const a=(n.addItems||[]).length,o=this.countConditions(n);return`
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
                        <span class="v2-tag v2-tag-outline">${o} Conditions</span>
                        <span class="v2-tag v2-tag-outline">${a} Actions</span>
                    </div>
                    ${n.always?'<div class="v2-badge v2-badge-accent">Always Active</div>':""}
                </div>
            </div>
        `}countConditions(n){let t=0;return n.scenarios&&n.scenarios.length&&(t+=n.scenarios.length),n.cameras&&n.cameras.length&&t++,n.cameraHandles&&n.cameraHandles.length&&t++,n.monitors&&n.monitors.length&&t++,t}attachListeners(){const n=this.container.querySelector("#v2-ag-import");n&&n.addEventListener("click",()=>this.handleImport());const t=this.container.querySelector("#v2-ag-export");t&&t.addEventListener("click",()=>this.handleExport()),this.container.querySelectorAll("#v2-ag-add, #v2-ag-add-empty").forEach(o=>o.addEventListener("click",()=>this.showEditRuleModal({},!0))),this.container.querySelectorAll('[data-action="edit"]').forEach(o=>{o.addEventListener("click",i=>{const r=parseInt(i.currentTarget.dataset.index,10),s=window.getAutoGearRules();s&&s[r]&&this.showEditRuleModal(s[r],!1,r)})}),this.container.querySelectorAll('[data-action="delete"]').forEach(o=>{o.addEventListener("click",i=>{const r=parseInt(i.currentTarget.dataset.index,10);this.deleteRule(r)})})}collectData(){const n=window.devices||{};return{cameras:Object.keys(n.cameras||{}).sort(),monitors:Object.keys(n.monitors||{}).sort(),video:Object.keys(n.video||{}).sort(),cameraHandles:this.getHardcodedOptions("cameraHandle"),scenarios:window.SCENARIOS||["Studio","Location","Handheld","Gimbal","Steadicam","Crane","Drone","Underwater","Car Mount"],viewfinders:Object.keys(n.viewfinders||{}).sort(),matteboxes:Object.keys(n.matteboxes||{}).sort(),tripodHeads:Object.keys(n.tripodHeads||{}).sort(),tripodBowls:["75mm","100mm","150mm","Flat","Mitchell"],wireless:Object.keys(n.wireless||{}).sort()}}getHardcodedOptions(n){return n==="cameraHandle"?["Blue Shape Top Handle","ARRI CCH-4","ARRI HEB-3","Wooden Camera Master Top Handle"]:n==="deliveryResolution"?["1080p","2K","4K UHD","4K DCI","6K","8K"]:[]}showEditRuleModal(n,t,a=-1){const o=this.collectData(),i=JSON.parse(JSON.stringify(n));i.scenarios||(i.scenarios=[]),i.addItems||(i.addItems=[]);const r=i.scenarios||[],s=document.createElement("div");s.className="v2-modal-backdrop",s.innerHTML=`
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
                                ${o.scenarios.map(c=>`
                                    <label class="v2-checkbox-label">
                                        <input type="checkbox" class="scenario-check" value="${c}" ${r.includes(c)?"checked":""}>
                                        ${c}
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
                                ${this.getHardcodedOptions("deliveryResolution").map(c=>`<option value="${c}" ${i.deliveryResolution===c?"selected":""}>${c}</option>`).join("")}
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
        `,document.body.appendChild(s);const l=()=>{s.remove()};s.querySelector(".v2-modal-close").onclick=l,s.querySelector("#v2-modal-cancel").onclick=l;const p=s.querySelectorAll(".v2-nav-item"),y=s.querySelectorAll(".v2-tab-content");p.forEach(c=>{c.onclick=()=>{p.forEach(u=>u.classList.remove("active")),y.forEach(u=>{u.style.display="none",u.classList.remove("active")}),c.classList.add("active");const d=s.querySelector(`#tab-${c.dataset.tab}`);d&&(d.style.display="block",setTimeout(()=>d.classList.add("active"),10))}});const E=s.querySelector("#rule-action-list"),w=s.querySelector("#btn-add-action-item"),v=s.querySelector("#new-item-name"),g=s.querySelector("#new-item-qty");w.onclick=()=>{const c=v.value.trim(),d=parseInt(g.value,10);c&&(i.addItems.push({name:c,qty:d}),E.innerHTML=this.renderActionListItems(i.addItems),v.value="",this.bindRemoveActionEvents(E,i))},this.bindRemoveActionEvents(E,i),s.querySelector("#v2-modal-save").onclick=()=>{const c={...i,name:s.querySelector("#rule-name").value.trim(),enabled:s.querySelector("#rule-enabled").checked,always:s.querySelector("#rule-always").checked,scenarioMode:s.querySelector("#rule-scenario-mode").value,scenarios:Array.from(s.querySelectorAll(".scenario-check:checked")).map(d=>d.value),shootingDaysCondition:s.querySelector("#rule-days-cond").value,shootingDaysValue:parseInt(s.querySelector("#rule-days-val").value,10)||0,cameras:this.collectMultiSelect(s,"cameras"),matteboxes:this.collectMultiSelect(s,"matteboxes"),cameraHandles:this.collectMultiSelect(s,"cameraHandles"),viewfinders:this.collectMultiSelect(s,"viewfinders"),monitors:this.collectMultiSelect(s,"monitors"),videoDistribution:this.collectMultiSelect(s,"videoDist"),wireless:this.collectMultiSelect(s,"wireless"),tripodHeads:this.collectMultiSelect(s,"tripodHeads"),tripodBowls:this.collectMultiSelect(s,"tripodBowls"),deliveryResolution:s.querySelector("#rule-delivery-res").value,crewPresent:s.querySelector("#rule-crew-present").value.split(",").map(d=>d.trim()).filter(d=>d),crewAbsent:s.querySelector("#rule-crew-absent").value.split(",").map(d=>d.trim()).filter(d=>d)};if(!c.name){alert("Rule name is required");return}this.saveRule(c,t,a),l()}}renderMultiSelect(n,t,a,o=[]){if(!a||a.length===0)return"";const i=o||[];return`
            <div class="v2-form-group">
                <label>${n}</label>
                <div class="v2-multi-select-container">
                    ${a.map(r=>`
                         <label class="v2-checkbox-label">
                            <input type="checkbox" class="multi-${t}" value="${this.escapeHtml(r)}" ${i.includes(r)?"checked":""}>
                            <span>${this.escapeHtml(r)}</span>
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
        `).join("")}bindRemoveActionEvents(n,t){n.querySelectorAll(".remove-action-item").forEach(a=>{a.onclick=o=>{const i=parseInt(o.target.dataset.idx,10);t.addItems.splice(i,1),n.innerHTML=this.renderActionListItems(t.addItems),this.bindRemoveActionEvents(n,t)}})}saveRule(n,t,a){const o=window.getAutoGearRules()||[];t?o.push(n):o[a]=n,window.setAutoGearRules?(window.setAutoGearRules(o),window.requestAutoSave&&window.requestAutoSave(),this.render()):console.error("Core function setAutoGearRules not available")}deleteRule(n){if(!confirm("Are you sure you want to delete this rule?"))return;const t=window.getAutoGearRules()||[];t.splice(n,1),window.setAutoGearRules(t),window.requestAutoSave&&window.requestAutoSave(),this.render()}}typeof window<"u"&&(window.cineRulesView=new _n);const li=Object.freeze(Object.defineProperty({__proto__:null,RulesView:_n},Symbol.toStringTag,{value:"Module"}));(function(e){const n="v2-device-library-content",t="device-manager";let a=!1,o=!1,i=null;function r(u){if(typeof window<"u"&&window.texts){const m=document.getElementById("languageSelect"),S=m&&m.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",b=window.texts[S]||window.texts.en;if(b)return u.split(".").reduce((L,I)=>L?L[I]:null,b)||u}return u}function s(){const u=document.createElement("header");return u.className="view-header",u.innerHTML=`
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
        `,u}function l(){if(o)return;console.log("[DeviceLibraryView] Reparenting legacy content...");const u=document.getElementById(n),m=document.getElementById(t);if(!u){console.error(`[DeviceLibraryView] V2 Container #${n} not found.`);return}if(!m){console.error(`[DeviceLibraryView] Legacy Container #${t} not found.`);return}i=m.classList.contains("hidden");const S=document.createElement("div");S.id="device-manager-placeholder",S.style.display="none",m.parentNode.insertBefore(S,m),u.innerHTML="",u.appendChild(s()),u.appendChild(m),m.classList.remove("hidden"),Array.from(m.children).forEach(I=>{if(I.classList.contains("device-library-search")){const P=I.querySelector("input");if(P){P.classList.add("v2-input");const F=r("searchPlaceholder");P.placeholder=F&&F!=="searchPlaceholder"?F:"Search database..."}}else I.classList.contains("button-group")||I.id==="deviceManagerHeading"&&(I.style.display="none")}),p(m),w();const L=()=>{if(typeof window.syncDeviceManagerCategories=="function"){console.log("[DeviceLibraryView] Triggering syncDeviceManagerCategories...");try{return window.syncDeviceManagerCategories(),!0}catch(I){console.warn("[DeviceLibraryView] syncDeviceManagerCategories failed:",I)}}if(typeof window.refreshDeviceLists=="function"){console.log("[DeviceLibraryView] Triggering refreshDeviceLists...");try{return window.refreshDeviceLists(),!0}catch(I){console.warn("[DeviceLibraryView] refreshDeviceLists failed:",I)}}if(typeof window.loadDeviceData=="function"){console.log("[DeviceLibraryView] Triggering loadDeviceData...");try{return window.loadDeviceData(),!0}catch(I){console.warn("[DeviceLibraryView] loadDeviceData failed:",I)}}return console.warn("[DeviceLibraryView] No device list population function found"),!1};L()||setTimeout(L,100),o=!0,console.log("[DeviceLibraryView] Reparenting complete (Hierarchy Preserved).")}function p(u){u.querySelectorAll('input[type="text"], input[type="number"], input[type="search"]').forEach(P=>P.classList.add("v2-input")),u.querySelectorAll("select").forEach(P=>P.classList.add("v2-select")),u.querySelectorAll("button").forEach(P=>{P.classList.contains("v2-btn")||(P.classList.add("v2-btn"),(P.textContent.toLowerCase().includes("add")||P.textContent.toLowerCase().includes("save"))&&P.classList.add("v2-btn-primary"))}),u.querySelectorAll(".form-row").forEach(P=>P.classList.add("v2-form-row")),u.querySelectorAll("label").forEach(P=>P.classList.add("v2-label"))}function y(){const u=document.getElementById("exportDataBtn");u&&u.click()}function E(){const u=document.getElementById("importDataBtn");u&&u.click()}function w(){const u=document.getElementById("v2-export-db-btn"),m=document.getElementById("v2-import-db-btn");u&&(u.removeEventListener("click",y),u.addEventListener("click",y)),m&&(m.removeEventListener("click",E),m.addEventListener("click",E))}function v(){if(!o)return;const u=document.getElementById(n),m=document.getElementById(t),S=document.getElementById("device-manager-placeholder");if(m){const b=m.querySelector(".device-list-panel .panel-content"),L=m.querySelector(".device-form-panel .panel-content");if(b)for(;b.firstChild;)m.appendChild(b.firstChild);if(L)for(;L.firstChild;)m.appendChild(L.firstChild);m.querySelectorAll(".v2-panel").forEach(P=>P.remove()),m.classList.remove("device-library-layout"),i===!0?m.classList.add("hidden"):i===!1&&m.classList.remove("hidden"),S&&S.parentNode?(S.parentNode.insertBefore(m,S),S.remove()):document.body.appendChild(m)}u&&(u.innerHTML=""),o=!1,console.log("[DeviceLibraryView] Restored legacy content.")}function g(){l()}function c(){a||(console.log("[DeviceLibraryView] Initializing..."),document.addEventListener("v2:viewchange",u=>{if(u.detail){if(u.detail.view==="devices"){g();return}o&&v()}}),document.addEventListener("v2:languagechange",()=>{o&&(v(),o=!1,g())}),a=!0,console.log("[DeviceLibraryView] Initialized"))}const d={init:c,render:g,restoreLegacyContent:v};e.cineV2DeviceLibrary=d})(typeof window<"u"?window:void 0);const ci=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){let r=!1,s=null,l=null,p=null,y=null,E=null;function w(f){const h={avatarEditorTitle:"Edit Photo",avatarEditorDescription:"Drag to reposition, use slider to zoom",avatarEditorZoom:"Zoom",buttonCancel:"Cancel",buttonSave:"Save",buttonRemovePhoto:"Remove Photo",avatarUploadHint:"Drop or click to upload"};if(typeof window<"u"&&window.texts){const $=document.getElementById("languageSelect"),V=$&&$.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",B=window.texts[V]||window.texts.en;if(B){const M=f.split(".").reduce((O,H)=>O?O[H]:null,B);if(M&&typeof M=="string")return M}}return h[f]||f}function v(f){return typeof f!="string"?"":f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function g(f){return`
            <div class="avatar-editor-modal" role="dialog" aria-modal="true" aria-labelledby="avatar-editor-title">
                <div class="avatar-editor-backdrop"></div>
                <div class="avatar-editor-surface">
                    <header class="avatar-editor-header">
                        <div class="avatar-editor-header-main">
                            <h2 id="avatar-editor-title" class="avatar-editor-title">${v(w("avatarEditorTitle"))}</h2>
                            <p class="avatar-editor-description">${v(w("avatarEditorDescription"))}</p>
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
                                <span>${v(w("avatarUploadHint"))}</span>
                            </div>
                            <input type="file" id="avatarEditorFileInput" accept="image/png,image/jpeg,image/webp,image/gif" class="visually-hidden" tabindex="-1" />
                        </div>
                        <div class="avatar-editor-controls" id="avatarEditorControls">
                            <label class="avatar-editor-zoom-label">
                                <span class="icon">zoom_out</span>
                                <input type="range" id="avatarEditorZoom" min="50" max="250" step="5" value="100" aria-label="${v(w("avatarEditorZoom"))}" />
                                <span class="icon">zoom_in</span>
                            </label>
                        </div>
                    </div>
                    <footer class="avatar-editor-footer">
                        <button type="button" class="avatar-editor-btn avatar-editor-btn-danger" id="avatarEditorDelete" ${f?"":"disabled"}>
                            ${v(w("buttonRemovePhoto"))}
                        </button>
                        <div class="avatar-editor-primary-actions">
                            <button type="button" class="avatar-editor-btn avatar-editor-btn-secondary" id="avatarEditorCancel">
                                ${v(w("buttonCancel"))}
                            </button>
                            <button type="button" class="avatar-editor-btn avatar-editor-btn-primary" id="avatarEditorSave">
                                ${v(w("buttonSave"))}
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        `}function c(f,h){const V=Math.max(200/h.naturalWidth,200/h.naturalHeight);l={active:!0,dataUrl:f,image:h,mime:d(f),viewportSize:200,baseScale:V,zoom:1,offsetX:(200-h.naturalWidth*V)/2,offsetY:(200-h.naturalHeight*V)/2,pointerId:null,pointerStartX:0,pointerStartY:0,offsetStartX:0,offsetStartY:0,displayWidth:0,displayHeight:0},m()}function d(f){if(typeof f!="string"||!f.startsWith("data:"))return"image/png";const h=f.indexOf(";");return h===-1?"image/png":f.substring(5,h)||"image/png"}function u(){if(!l)return;const f=Math.min(0,l.viewportSize-l.displayWidth),h=Math.min(0,l.viewportSize-l.displayHeight);l.offsetX=Math.max(f,Math.min(0,l.offsetX)),l.offsetY=Math.max(h,Math.min(0,l.offsetY))}function m(){if(!l||!l.image)return;const f=l.image.naturalWidth||l.image.width||0,h=l.image.naturalHeight||l.image.height||0,$=f*l.baseScale*l.zoom,V=h*l.baseScale*l.zoom;l.displayWidth=$,l.displayHeight=V,u();const B=document.getElementById("avatarEditorImage");B&&(B.style.width=`${$}px`,B.style.height=`${V}px`,B.style.transform=`translate(${l.offsetX}px, ${l.offsetY}px)`)}function S(){if(!l||!l.image)return"";const f=l.baseScale*l.zoom;if(!f)return"";const h=l.viewportSize/f,$=Math.max(0,Math.min(l.image.naturalWidth-h,-l.offsetX/f)),V=Math.max(0,Math.min(l.image.naturalHeight-h,-l.offsetY/f)),B=document.createElement("canvas");B.width=256,B.height=256;const M=B.getContext("2d");if(!M)return"";M.clearRect(0,0,B.width,B.height),M.drawImage(l.image,$,V,h,h,0,0,B.width,B.height);const O=l.mime&&l.mime.startsWith("image/")?l.mime:"image/png";try{return B.toDataURL(O)}catch{try{return B.toDataURL("image/png")}catch{return""}}}function b(f){if(!l||!l.active)return;const h=Number(f?.target?.value)||100,$=Math.max(50,h)/100,V=l.displayWidth||1,B=l.displayHeight||1,M=-l.offsetX+l.viewportSize/2,O=-l.offsetY+l.viewportSize/2,H=M/V,Le=O/B;l.zoom=$,m();const Ve=l.displayWidth*H,Me=l.displayHeight*Le;l.offsetX=-(Ve-l.viewportSize/2),l.offsetY=-(Me-l.viewportSize/2),u(),m()}function L(f){if(!l||!l.active||l.pointerId!==null)return;const h=document.getElementById("avatarEditorViewport");if(h){l.pointerId=f.pointerId,l.pointerStartX=f.clientX,l.pointerStartY=f.clientY,l.offsetStartX=l.offsetX,l.offsetStartY=l.offsetY;try{h.setPointerCapture(f.pointerId)}catch{}f.preventDefault()}}function I(f){if(!l||!l.active||l.pointerId!==f.pointerId)return;const h=f.clientX-l.pointerStartX,$=f.clientY-l.pointerStartY;l.offsetX=l.offsetStartX+h,l.offsetY=l.offsetStartY+$,u(),m(),f.preventDefault()}function P(f){if(!l||!l.active||l.pointerId!==f.pointerId)return;l.pointerId=null;const h=document.getElementById("avatarEditorViewport");if(h)try{h.releasePointerCapture(f.pointerId)}catch{}f.preventDefault()}function F(f){if(!l||!l.active)return;const h=f.shiftKey?10:2;let $=!1;switch(f.key){case"ArrowUp":l.offsetY+=h,$=!0;break;case"ArrowDown":l.offsetY-=h,$=!0;break;case"ArrowLeft":l.offsetX+=h,$=!0;break;case"ArrowRight":l.offsetX-=h,$=!0;break}$&&(u(),m(),f.preventDefault())}function z(f){const h=f?.target?.files?.[0];h&&(N(h),f.target&&(f.target.value=""))}function q(f){f.preventDefault(),f.stopPropagation();const h=document.getElementById("avatarEditorViewport");h&&h.classList.remove("drag-over");const $=f.dataTransfer?.files?.[0];$&&N($)}function X(f){f.preventDefault(),f.stopPropagation();const h=document.getElementById("avatarEditorViewport");h&&h.classList.add("drag-over")}function G(f){f.preventDefault(),f.stopPropagation();const h=document.getElementById("avatarEditorViewport");h&&h.classList.remove("drag-over")}function N(f){if(e.CINE_CONTACTS_PROFILE_MODULE&&typeof e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile=="function")e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(f,h=>K(h),h=>console.warn("Failed to read avatar file:",h));else{const h=new FileReader;h.onload=$=>{typeof $.target?.result=="string"&&K($.target.result)},h.onerror=()=>console.warn("Failed to read file"),h.readAsDataURL(f)}}function K(f){if(!f)return;const h=new Image;h.decoding="async",h.onload=()=>{if(!h.naturalWidth||!h.naturalHeight){console.warn("Invalid image dimensions");return}c(f,h);const $=document.getElementById("avatarEditorImage"),V=document.getElementById("avatarEditorPlaceholder"),B=document.getElementById("avatarEditorControls"),M=document.getElementById("avatarEditorViewport"),O=document.getElementById("avatarEditorZoom"),H=document.getElementById("avatarEditorDelete");$&&($.src=f),V&&V.classList.add("hidden"),M&&M.classList.add("has-image"),B&&B.classList.remove("hidden"),O&&(O.value="100"),H&&(H.disabled=!1)},h.onerror=()=>console.warn("Failed to load image"),h.src=f}function J(f={}){r&&Q();const{avatar:h="",onSave:$=null,onDelete:V=null,onCancel:B=null}=f;p=$,y=V,E=B;const M=!!h,O=document.createElement("div");O.innerHTML=g(M),s=O.firstElementChild,document.body.appendChild(s);const H=s.querySelector(".avatar-editor-backdrop"),Le=s.querySelector(".avatar-editor-close"),Ve=document.getElementById("avatarEditorCancel"),Me=document.getElementById("avatarEditorSave"),Rt=document.getElementById("avatarEditorDelete"),U=document.getElementById("avatarEditorViewport"),Ot=document.getElementById("avatarEditorZoom"),_e=document.getElementById("avatarEditorFileInput");H&&H.addEventListener("click",()=>Q()),Le&&Le.addEventListener("click",()=>Q()),Ve&&Ve.addEventListener("click",k),Me&&Me.addEventListener("click",de),Rt&&Rt.addEventListener("click",Ae),U&&(U.addEventListener("pointerdown",L),U.addEventListener("pointermove",I),U.addEventListener("pointerup",P),U.addEventListener("pointercancel",P),U.addEventListener("keydown",F),U.addEventListener("drop",q),U.addEventListener("dragover",X),U.addEventListener("dragleave",G),U.addEventListener("click",Ai=>{!l?.active&&_e&&_e.click()})),Ot&&Ot.addEventListener("input",b),_e&&_e.addEventListener("change",z),h&&K(h),requestAnimationFrame(()=>{s&&s.classList.add("open")}),r=!0,setTimeout(()=>{U&&U.focus()},100)}function Q(){!r||!s||(s.classList.remove("open"),setTimeout(()=>{s&&s.parentNode&&s.parentNode.removeChild(s),s=null,l=null,r=!1,p=null,y=null,E=null},200))}function de(){let f="";l&&l.active&&(f=S()),typeof p=="function"&&p(f),Q()}function Ae(){typeof y=="function"&&y(),Q()}function k(){typeof E=="function"&&E(),Q()}const R={open:J,close:Q,isOpen:()=>r};e.cineAvatarEditorModal=R})(typeof window<"u"?window:void 0);const di=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="view-contacts",t="cameraPowerPlanner_userProfile";let a=!1,o=null,i=null;function r(c){return typeof c!="string"?"":c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function s(c){const d={contactsViewTitle:"Contacts",contactsViewSubtitle:"Production Directory",buttonAddContact:"Add Contact",buttonImportVCard:"Import vCard",buttonExportContacts:"Export",contactsEmptyTitle:"No contacts yet",contactsEmptyText:"Add crew members to reuse them across projects.",buttonAddFirstContact:"Add Your First Contact",contactUnnamed:"Unnamed",contactNoRole:"No role specified",modalTitleNewContact:"New Contact",modalTitleEditContact:"Edit Contact",modalTitleDeleteContact:"Delete Contact",confirmDeleteContact:"Are you sure you want to delete this contact?",buttonCancel:"Cancel",buttonDeleteRed:"Delete",buttonSaveContact:"Save",buttonEdit:"Edit",buttonDelete:"Delete",buttonUploadPhoto:"Upload Photo",buttonRemovePhoto:"Remove",avatarHint:"Drag & drop or click to upload",sectionBasicInfo:"Basic Information",sectionContactDetails:"Contact Details",labelName:"Name",labelRole:"Role",labelPhone:"Phone",labelEmail:"Email",labelWebsite:"Website",labelNotes:"Notes",placeholderFullName:"Full name",placeholderRole:"e.g. DoP, 1st AC",placeholderPhone:"+1 234 567 890",placeholderEmail:"name@example.com",placeholderWebsite:"https://",placeholderNotes:"Additional notes...",alertEnterName:"Please enter a name",statusUnavailable:"Contacts module not loaded.",profileSectionTitle:"Your Profile",profileSectionDescription:'Add your details to appear as "User" in gear assignments.',importSuccess:"Imported {added} contacts, updated {updated}",exportFilename:"contacts.vcf"};if(typeof window<"u"&&window.texts){const u=document.getElementById("languageSelect"),m=u&&u.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",S=window.texts[m]||window.texts.en;if(S){const b=c.split(".").reduce((L,I)=>L?L[I]:null,S);if(b&&typeof b=="string")return b}}return d[c]||c}function l(){try{const c=localStorage.getItem(t);if(c){const d=JSON.parse(c);o={name:typeof d.name=="string"?d.name:"",role:typeof d.role=="string"?d.role:"",phone:typeof d.phone=="string"?d.phone:"",email:typeof d.email=="string"?d.email:"",avatar:typeof d.avatar=="string"?d.avatar:""};return}}catch(c){console.warn("[ContactsView] Failed to load profile:",c)}o={name:"",role:"",phone:"",email:"",avatar:""}}function p(){try{localStorage.setItem(t,JSON.stringify(o))}catch(c){console.warn("[ContactsView] Failed to save profile:",c)}}function y(){i&&clearTimeout(i),i=setTimeout(()=>{p(),i=null},400)}function E(c){const d=["BEGIN:VCARD","VERSION:3.0"];if(c.name){d.push(`FN:${c.name}`);const u=c.name.split(" ");u.length>=2?d.push(`N:${u.slice(1).join(" ")};${u[0]};;;`):d.push(`N:;${c.name};;;`)}if(c.role&&d.push(`TITLE:${c.role}`),c.phone&&d.push(`TEL:${c.phone}`),c.email&&d.push(`EMAIL:${c.email}`),c.website&&d.push(`URL:${c.website}`),c.notes&&d.push(`NOTE:${c.notes.replace(/\n/g,"\\n")}`),c.avatar&&c.avatar.startsWith("data:")){const[u,m]=c.avatar.split(","),S=u.match(/data:([^;]+)/),b=S?S[1]:"image/jpeg";d.push(`PHOTO;ENCODING=b;TYPE=${b.split("/")[1].toUpperCase()}:${m}`)}return d.push("END:VCARD"),d.join(`\r
`)}function w(){const c=e.cineFeaturesContacts;if(!c)return;const d=c.loadStoredContacts();if(!d||d.length===0){alert("No contacts to export.");return}const u=d.map(E).join(`\r
\r
`),m=new Blob([u],{type:"text/vcard;charset=utf-8"}),S=URL.createObjectURL(m),b=document.createElement("a");b.href=S,b.download=s("exportFilename"),document.body.appendChild(b),b.click(),document.body.removeChild(b),URL.revokeObjectURL(S)}function v(c){if(!c)return;const d=new FileReader;d.onload=u=>{const m=u.target?.result;if(typeof m!="string")return;const S=e.CINE_CONTACTS_LIST_MODULE,b=e.cineFeaturesContacts;if(!S||!b){alert("Contacts modules not loaded.");return}const L=S.parseVCard(m);if(!L||L.length===0){alert("No valid contacts found in file.");return}const I=b.loadStoredContacts(),P=S.mergeImportedContacts({existing:I,imported:L});if(b.saveContactsToStorage(P.contacts)){const F=s("importSuccess").replace("{added}",P.added).replace("{updated}",P.updated);alert(F),g.render()}},d.readAsText(c)}const g={container:null,init(){try{this.container=document.getElementById(n),this.container||this.createViewContainer(),l(),a||(console.log("[ContactsView] Initializing..."),document.addEventListener("v2:viewchange",c=>{c.detail&&c.detail.view==="contacts"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),a=!0,console.log("[ContactsView] Initialized"))}catch(c){console.error("[ContactsView] Init failed:",c)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const c=document.querySelector(".v2-app")||document.body,d=document.createElement("div");d.id=n,d.className="app-view",c.appendChild(d),this.container=d},render(){try{if(!this.container&&(this.init(),!this.container))return;l();const c=e.cineFeaturesContacts;if(!c){this.container.innerHTML=`
                        <div class="view-empty-state">
                            <p>${s("statusUnavailable")}</p>
                        </div>
                    `;return}const d=c.loadStoredContacts(),u=`
                    <header class="view-header swiss-header">
                        <div class="header-content">
                            <h1 class="swiss-title">${s("contactsViewTitle")}</h1>
                            <div class="swiss-subtitle">
                                <span class="count-badge">${d?d.length:0}</span>
                                ${s("contactsViewSubtitle")}
                            </div>
                        </div>
                        <div class="view-header-actions contacts-toolbar">
                            <button class="v2-btn v2-btn-secondary" id="btn-import-vcard">
                                <span class="icon">upload_file</span>
                                <span>${s("buttonImportVCard")}</span>
                            </button>
                            <button class="v2-btn v2-btn-secondary" id="btn-export-contacts" ${!d||d.length===0?"disabled":""}>
                                <span class="icon">download</span>
                                <span>${s("buttonExportContacts")}</span>
                            </button>
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact">
                                <span class="icon">add</span>
                                <span>${s("buttonAddContact")}</span>
                            </button>
                            <input type="file" id="import-vcard-input" accept=".vcf,.vcard,text/vcard" class="visually-hidden" />
                        </div>
                    </header>
                `;let m='<div class="view-content swiss-content">';m+=this.renderProfileSection(),!d||d.length===0?m+=`
                        <div class="view-empty-state swiss-empty-state">
                             <div class="swiss-empty-icon">
                                <span class="icon">group_off</span>
                            </div>
                            <h2>${s("contactsEmptyTitle")}</h2>
                            <p>${s("contactsEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-contact-empty">
                                ${s("buttonAddFirstContact")}
                            </button>
                        </div>
                    `:(m+='<div class="swiss-grid">',d.forEach(S=>{m+=this.renderContactCard(S)}),m+="</div>"),m+="</div>",this.container.innerHTML=u+m,this.attachListeners()}catch(c){console.error("[ContactsView] Render failed",c),this.container&&(this.container.innerHTML=`<div class="swiss-error-state"><p>Error loading view: ${c.message}</p></div>`)}},renderProfileSection(){const c=o.name?o.name.split(" ").map(S=>S[0]).join("").substring(0,2).toUpperCase():"",d=o.avatar?`<img src="${o.avatar}" alt="${r(o.name)}" class="avatar-img">`:`<span class="avatar-initials">${c||'<span class="icon">person</span>'}</span>`,m=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Line Producer","Production Manager"].map(S=>`<option value="${S}" ${o.role===S?"selected":""}>${S}</option>`).join("");return`
                <section class="swiss-profile-section">
                    <header class="swiss-profile-header">
                        <h3>${s("profileSectionTitle")}</h3>
                        <p>${s("profileSectionDescription")}</p>
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
                                    <label for="profile-name">${s("labelName")}</label>
                                    <input type="text" id="profile-name" value="${r(o.name)}" placeholder="${s("placeholderFullName")}" autocomplete="name">
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-role">${s("labelRole")}</label>
                                    <select id="profile-role">
                                        <option value="">Select role...</option>
                                        ${m}
                                    </select>
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-phone">${s("labelPhone")}</label>
                                    <input type="tel" id="profile-phone" value="${r(o.phone)}" placeholder="${s("placeholderPhone")}" autocomplete="tel">
                                </div>
                                <div class="swiss-profile-field">
                                    <label for="profile-email">${s("labelEmail")}</label>
                                    <input type="email" id="profile-email" value="${r(o.email)}" placeholder="${s("placeholderEmail")}" autocomplete="email">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `},renderContactCard(c){const d=c.name?c.name.split(" ").map(I=>I[0]).join("").substring(0,2).toUpperCase():"?",u=c.avatar?`<img src="${c.avatar}" alt="${r(c.name)}" class="avatar-img">`:`<span class="avatar-initials">${d}</span>`,m=c.phone?`<a href="tel:${r(c.phone)}" class="swiss-link" onclick="event.stopPropagation()">${r(c.phone)}</a>`:'<span class="swiss-placeholder">—</span>',S=c.email?`<a href="mailto:${r(c.email)}" class="swiss-link" onclick="event.stopPropagation()">${r(c.email)}</a>`:'<span class="swiss-placeholder">—</span>';let b=c.website||"";b.includes("://")&&(b=b.split("://")[1]),b.endsWith("/")&&(b=b.slice(0,-1));const L=c.website?`<a href="${r(c.website)}" target="_blank" rel="noopener noreferrer" class="swiss-link" onclick="event.stopPropagation()">${r(b)}</a>`:'<span class="swiss-placeholder">—</span>';return`
                <div class="swiss-card contact-card" data-contact-id="${r(c.id)}" tabindex="0" role="button">
                    <div class="swiss-card-actions-overlay">
                         <button class="swiss-icon-btn btn-edit-contact" title="${s("buttonEdit")}">
                            <span class="icon">edit</span>
                        </button>
                         <button class="swiss-icon-btn btn-delete-contact" title="${s("buttonDelete")}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                    <div class="swiss-card-main">
                        <div class="swiss-card-identity">
                            <div class="swiss-avatar">
                                ${u}
                            </div>
                            <div class="swiss-identity-text">
                                <h3 class="swiss-name">${r(c.name||s("contactUnnamed"))}</h3>
                                <div class="swiss-role">${r(c.role||s("contactNoRole"))}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="swiss-card-data-grid">
                        <div class="data-cell">
                            <span class="data-label">${s("labelPhone")}</span>
                            <span class="data-value">${m}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">${s("labelEmail")}</span>
                            <span class="data-value">${S}</span>
                        </div>
                        <div class="data-cell">
                            <span class="data-label">${s("labelWebsite")}</span>
                            <span class="data-value">${L}</span>
                        </div>
                        ${c.notes?`
                        <div class="data-cell notes-cell">
                            <span class="data-label">${s("labelNotes")}</span>
                            <span class="data-value notes-text">${r(c.notes)}</span>
                        </div>
                        `:`
                        <div class="data-cell">
                            <span class="data-label">${s("labelNotes")}</span>
                            <span class="data-value"><span class="swiss-placeholder">—</span></span>
                        </div>
                        `}
                    </div>
                </div>
            `},attachListeners(){const c=this.container.querySelector("#btn-add-contact"),d=this.container.querySelector("#btn-add-contact-empty"),u=this.container.querySelector("#btn-import-vcard"),m=this.container.querySelector("#import-vcard-input"),S=this.container.querySelector("#btn-export-contacts");c&&(c.onclick=()=>this.showEditModal(null)),d&&(d.onclick=()=>this.showEditModal(null)),u&&m&&(u.onclick=()=>m.click(),m.onchange=b=>{const L=b.target.files?.[0];L&&v(L),b.target.value=""}),S&&(S.onclick=w),this.attachProfileListeners(),this.container.querySelectorAll(".contact-card").forEach(b=>{b.onclick=L=>{L.target.closest("button")||L.target.closest("a")||this.showEditModal(b.dataset.contactId)}}),this.container.querySelectorAll(".btn-edit-contact").forEach(b=>{b.onclick=L=>{L.stopPropagation();const I=L.target.closest(".contact-card");this.showEditModal(I.dataset.contactId)}}),this.container.querySelectorAll(".btn-delete-contact").forEach(b=>{b.onclick=L=>{L.stopPropagation();const I=L.target.closest(".contact-card");this.showDeleteConfirmation(I.dataset.contactId)}})},attachProfileListeners(){const c=this.container.querySelector("#profile-name"),d=this.container.querySelector("#profile-role"),u=this.container.querySelector("#profile-phone"),m=this.container.querySelector("#profile-email"),S=this.container.querySelector("#profile-avatar-container"),b=(L,I)=>{o[L]=I,y()};c&&(c.oninput=()=>b("name",c.value)),d&&(d.onchange=()=>b("role",d.value)),u&&(u.oninput=()=>b("phone",u.value)),m&&(m.oninput=()=>b("email",m.value)),S&&(S.onclick=()=>this.openProfileAvatarEditor(),S.onkeydown=L=>{(L.key==="Enter"||L.key===" ")&&(L.preventDefault(),this.openProfileAvatarEditor())})},openProfileAvatarEditor(){if(e.cineAvatarEditorModal)e.cineAvatarEditorModal.open({avatar:o.avatar||"",onSave:c=>{o.avatar=c,p(),this.render()},onDelete:()=>{o.avatar="",p(),this.render()}});else{const c=document.createElement("input");c.type="file",c.accept="image/*",c.onchange=d=>{const u=d.target.files?.[0];if(u)if(e.CINE_CONTACTS_PROFILE_MODULE?.readAvatarFile)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(u,m=>{o.avatar=m,p(),this.render()},m=>console.warn("Avatar read error:",m));else{const m=new FileReader;m.onload=S=>{o.avatar=S.target?.result||"",p(),this.render()},m.readAsDataURL(u)}},c.click()}},showDeleteConfirmation(c){const d=document.createElement("div");d.className="v2-modal-backdrop",d.innerHTML=`
                <div class="v2-modal" style="max-width: 400px;">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${s("modalTitleDeleteContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body" style="padding: 24px;">
                        <p>${s("confirmDeleteContact")}</p>
                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-delete">${s("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-confirm-delete" style="background-color: var(--v2-status-error); border-color: var(--v2-status-error);">${s("buttonDeleteRed")}</button>
                    </div>
                </div>
            `,document.body.appendChild(d),requestAnimationFrame(()=>d.classList.add("open"));const u=()=>{d.classList.remove("open"),setTimeout(()=>d.remove(),200)};d.querySelector(".v2-modal-close").onclick=u,d.querySelector("#btn-cancel-delete").onclick=u,d.querySelector("#btn-confirm-delete").onclick=()=>{this.deleteContact(c),u()}},deleteContact(c){const d=e.cineFeaturesContacts;if(!d)return;const m=d.loadStoredContacts().filter(S=>S.id!==c);d.saveContactsToStorage(m)?this.render():alert("Failed to delete contact.")},showEditModal(c){const d=e.cineFeaturesContacts;if(!d)return;let u={},m=!0;if(c){const G=d.loadStoredContacts().find(N=>N.id===c);G&&(u={...G},m=!1)}m&&(u={name:"",role:"",phone:"",email:"",website:"",notes:"",avatar:""});const S=document.querySelector(".v2-modal-backdrop");S&&S.remove();const b=document.createElement("div");b.className="v2-modal-backdrop";const L=["DoP","1st AC","2nd AC","Camera Operator","DIT","Data Wrangler","VTR/Playback","Gaffer","Best Boy","Key Grip","Grip","Sound Mixer","Boom Operator","PA","Director","Producer","Line Producer","Production Manager","Rental House","Post House","Agency","Client"];b.innerHTML=`
                <div class="v2-modal contact-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${s(m?"modalTitleNewContact":"modalTitleEditContact")}</h3>
                        <button type="button" class="v2-modal-close v2-btn v2-btn-ghost"><span class="icon">close</span></button>
                    </div>
                    <div class="v2-modal-body contacts-modal-body">
                        
                        <!-- Avatar Upload Section -->
                        <div class="avatar-upload-section" id="avatarDropZone">
                            <div class="avatar-preview" id="modalAvatarPreview">
                                ${u.avatar?`<img src="${u.avatar}">`:'<span class="icon">person</span>'}
                            </div>
                            <div class="avatar-buttons">
                                <label class="v2-btn v2-btn-sm v2-btn-secondary">
                                    <span class="icon" style="font-size:14px; margin-right:4px;">upload</span>
                                    ${s("buttonUploadPhoto")}
                                    <input type="file" id="avatarUploadInput" accept="image/*" hidden>
                                </label>
                                <button type="button" class="v2-btn v2-btn-sm v2-btn-ghost text-danger" id="removeAvatarBtn" ${u.avatar?"":"disabled"}>
                                    ${s("buttonRemovePhoto")}
                                </button>
                            </div>
                            <div class="avatar-hint">${s("avatarHint")}</div>
                        </div>

                        <!-- Basic Info Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">badge</span>
                                ${s("sectionBasicInfo")}
                            </div>
                            
                            <div class="v2-form-group">
                                <label class="v2-label">${s("labelName")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">person</span></span>
                                    <input type="text" id="contactName" class="v2-input" value="${r(u.name)}" placeholder="${s("placeholderFullName")}" required>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${s("labelRole")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">work</span></span>
                                    <input type="text" id="contactRole" class="v2-input" value="${r(u.role)}" list="roleList" placeholder="${s("placeholderRole")}">
                                </div>
                                <datalist id="roleList">
                                    ${L.map(X=>`<option value="${X}">`).join("")}
                                </datalist>
                            </div>
                        </div>

                        <!-- Contact Details Section -->
                        <div class="contact-form-section">
                            <div class="contact-form-section-title">
                                <span class="icon">contacts</span>
                                ${s("sectionContactDetails")}
                            </div>

                            <div class="detail-row-group">
                                <div class="v2-form-group">
                                    <label class="v2-label">${s("labelPhone")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">call</span></span>
                                        <input type="tel" id="contactPhone" class="v2-input" value="${r(u.phone)}" placeholder="${s("placeholderPhone")}">
                                    </div>
                                </div>
                                
                                <div class="v2-form-group">
                                    <label class="v2-label">${s("labelEmail")}</label>
                                    <div class="v2-input-group">
                                        <span class="input-icon"><span class="icon">mail</span></span>
                                        <input type="email" id="contactEmail" class="v2-input" value="${r(u.email)}" placeholder="${s("placeholderEmail")}">
                                    </div>
                                </div>
                            </div>

                            <div class="v2-form-group">
                                <label class="v2-label">${s("labelWebsite")}</label>
                                <div class="v2-input-group">
                                    <span class="input-icon"><span class="icon">language</span></span>
                                    <input type="url" id="contactWebsite" class="v2-input" value="${r(u.website)}" placeholder="${s("placeholderWebsite")}">
                                </div>
                            </div>
                        </div>

                        <!-- Notes Section -->
                        <div class="v2-form-group">
                            <label class="v2-label">${s("labelNotes")}</label>
                            <textarea id="contactNotes" class="v2-input" rows="3" placeholder="${s("placeholderNotes")}">${r(u.notes)}</textarea>
                        </div>

                    </div>
                    <div class="v2-modal-footer">
                        <button type="button" class="v2-btn v2-btn-secondary" id="btn-cancel-contact">${s("buttonCancel")}</button>
                        <button type="button" class="v2-btn v2-btn-primary" id="btn-save-contact">
                            <span class="icon" style="font-size:16px; margin-right:4px;">save</span>
                            ${s("buttonSaveContact")}
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(b),requestAnimationFrame(()=>b.classList.add("open"));const I=()=>{b.classList.remove("open"),setTimeout(()=>b.remove(),200)};b.querySelector(".v2-modal-close").onclick=I,b.querySelector("#btn-cancel-contact").onclick=I;const P=b.querySelector("#avatarUploadInput"),F=b.querySelector("#modalAvatarPreview"),z=b.querySelector("#removeAvatarBtn");let q=u.avatar||"";P.onchange=X=>{const G=X.target.files[0];if(G)if(e.CINE_CONTACTS_PROFILE_MODULE)e.CINE_CONTACTS_PROFILE_MODULE.readAvatarFile(G,N=>{q=N,F.innerHTML=`<img src="${N}">`,z.disabled=!1},N=>{alert("Error reading image: "+N)});else{const N=new FileReader;N.onload=K=>{q=K.target.result,F.innerHTML=`<img src="${q}">`,z.disabled=!1},N.readAsDataURL(G)}},z.onclick=()=>{q="",F.innerHTML='<span class="icon">person</span>',z.disabled=!0,P.value=""},b.querySelector("#btn-save-contact").onclick=()=>{const X=b.querySelector("#contactName").value.trim();if(!X){alert(s("alertEnterName"));return}const G={id:c||void 0,name:X,role:b.querySelector("#contactRole").value.trim(),phone:b.querySelector("#contactPhone").value.trim(),email:b.querySelector("#contactEmail").value.trim(),website:b.querySelector("#contactWebsite").value.trim(),notes:b.querySelector("#contactNotes").value.trim(),avatar:q},N=d.loadStoredContacts();let K;if(m){const J=d.normalizeContactEntry(G);K=[...N,J]}else K=N.map(J=>J.id===c?d.normalizeContactEntry({...J,...G}):J);K=d.sortContacts(K),d.saveContactsToStorage(K)?(this.render(),I()):alert("Failed to save contact.")}}};e.cineContactsView=g})(typeof window<"u"?window:void 0);const ui=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(){const e="view-settings";let n=!1;function t(i){if(typeof window<"u"&&window.texts){const r=document.getElementById("languageSelect"),s=r&&r.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",l=window.texts[s]||window.texts.en;if(l)return i.split(".").reduce((p,y)=>p?p[y]:null,l)||i}return i}const a=[{v2:"v2-settings-language",legacy:"settingsLanguage",type:"value"},{v2:"v2-settings-temp-unit",legacy:"settingsTemperatureUnit",type:"value"},{v2:"v2-settings-focus-scale",legacy:"settingsFocusScale",type:"value"},{v2:"v2-settings-dark-mode",legacy:"settingsDarkMode",type:"checkbox"},{v2:"v2-settings-pink-mode",legacy:"settingsPinkMode",type:"checkbox"},{v2:"v2-settings-accent-color",legacy:"accentColorInput",type:"color"},{v2:"v2-settings-font-size",legacy:"settingsFontSize",type:"value"},{v2:"v2-settings-font-family",legacy:"settingsFontFamily",type:"value"},{v2:"v2-cam-color-a",legacy:"cameraColorA",type:"color"},{v2:"v2-cam-color-b",legacy:"cameraColorB",type:"color"},{v2:"v2-cam-color-c",legacy:"cameraColorC",type:"color"},{v2:"v2-cam-color-d",legacy:"cameraColorD",type:"color"},{v2:"v2-cam-color-e",legacy:"cameraColorE",type:"color"},{v2:"v2-settings-high-contrast",legacy:"settingsHighContrast",type:"checkbox"},{v2:"v2-settings-reduce-motion",legacy:"settingsReduceMotion",type:"checkbox"},{v2:"v2-settings-relaxed-spacing",legacy:"settingsRelaxedSpacing",type:"checkbox"},{v2:"v2-volt-v-high",legacy:"mountVoltageVHigh",type:"value"},{v2:"v2-volt-v-low",legacy:"mountVoltageVLow",type:"value"},{v2:"v2-volt-gold-high",legacy:"mountVoltageGoldHigh",type:"value"},{v2:"v2-volt-gold-low",legacy:"mountVoltageGoldLow",type:"value"},{v2:"v2-volt-b-high",legacy:"mountVoltageBHigh",type:"value"},{v2:"v2-volt-b-low",legacy:"mountVoltageBLow",type:"value"},{v2:"v2-settings-auto-backup",legacy:"settingsShowAutoBackups",type:"checkbox"},{v2:"v2-settings-backup-retention",legacy:"autoGearBackupRetention",type:"value"},{v2:"v2-settings-log-level",legacy:"loggingLevelFilter",type:"value"},{v2:"v2-settings-log-history",legacy:"loggingHistoryLimit",type:"value"},{v2:"v2-settings-log-filter",legacy:"loggingNamespaceFilter",type:"value"},{v2:"v2-settings-log-console",legacy:"loggingConsoleOutput",type:"checkbox"},{v2:"v2-settings-log-capture",legacy:"loggingCaptureConsole",type:"checkbox"},{v2:"v2-settings-log-errors",legacy:"loggingCaptureErrors",type:"checkbox"},{v2:"v2-settings-log-persist",legacy:"loggingPersistSession",type:"checkbox"}],o={init(){if(this.container=document.getElementById(e),!this.container){console.error(`[SettingsView] Container element with ID '${e}' not found.`);return}if(!n){console.log("[SettingsView] Initializing..."),document.addEventListener("v2:viewchange",r=>{r.detail&&r.detail.view==="settings"&&this.render()});const i=document.getElementById("languageSelect");i&&i.addEventListener("change",()=>{this.isVisible()&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),n=!0}},isVisible(){return this.container&&this.container.classList.contains("active")},render(){!this.container&&(this.init(),!this.container)||(this.container.innerHTML=this.getTemplate(),this.attachListeners(),this.syncFromLegacy(),this.initTabs(),this.initRehearsalSync(),this.initStatusObservers(),this.initBackupDiffSync(),this.initLogViewerSync())},getTemplate(){return`
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
        `},getAboutTabHtml(){const i=document.getElementById("aboutVersion")?.textContent||"v2.0";return`
            <div class="v2-settings-panel" id="v2-panel-about" hidden>
                <h2>${t("settingsTabAbout")}</h2>
                <div class="v2-settings-card">
                    <h3><span class="icon">info</span> ${t("appTitle")}</h3>
                    <p class="v2-text-lead" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${i}</p>
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
        `},attachListeners(){const i=this.container.querySelectorAll(".v2-tab-btn"),r=this.container.querySelectorAll(".v2-settings-panel");i.forEach(g=>{g.addEventListener("click",()=>{i.forEach(u=>{u.classList.remove("active"),u.setAttribute("aria-selected","false")}),r.forEach(u=>u.hidden=!0),g.classList.add("active"),g.setAttribute("aria-selected","true");const c=`v2-panel-${g.dataset.tab}`,d=document.getElementById(c);d&&(d.hidden=!1)})}),a.forEach(g=>{const c=document.getElementById(g.v2);if(!c)return;const d=document.getElementById(g.legacy);if(!d){console.warn(`[SettingsView] Legacy element '${g.legacy}' not found.`);return}c.addEventListener("change",u=>{if(g.type==="checkbox"?d.checked=u.target.checked:d.value=u.target.value,d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0})),["settingsLanguage","settingsTemperatureUnit","settingsFocusScale","settingsFontSize","settingsFontFamily","mountVoltageVHigh","mountVoltageVLow","mountVoltageGoldHigh","mountVoltageGoldLow","mountVoltageBHigh","mountVoltageBLow"].includes(g.legacy)){const S=document.getElementById("settingsSave");S&&S.click()}})});const s=document.getElementById("settingsLogo");s&&s.addEventListener("change",()=>{const g=document.getElementById("settingsSave");g&&g.click()});const l=(g,c)=>{const d=document.getElementById(g),u=document.getElementById(c);d&&u&&d.addEventListener("click",()=>u.click())};l("v2-btn-reset-accent","accentColorReset"),l("v2-btn-reset-voltages","mountVoltageReset"),l("v2-btn-backup","backupSettings"),l("v2-btn-restore","restoreSettings"),l("v2-btn-factory-reset","factoryResetButton"),l("v2-btn-data-backup","storageBackupNow"),l("v2-btn-storage-persist","storagePersistenceRequest"),l("v2-btn-export-log","loggingExportBtn"),l("v2-btn-support","supportLink"),l("v2-btn-bug","reportBugLink"),l("v2-btn-feature","suggestFeatureLink"),l("v2-btn-local-font","localFontsButton"),l("v2-btn-branding-upload","settingsLogo"),l("v2-btn-doc-tracker-add","documentationTrackerAddRelease");const p=document.getElementById("v2-btn-backup-diff");p&&p.addEventListener("click",()=>{const g=document.getElementById("v2-backup-diff-modal");g&&(g.style.display="flex");const c=document.getElementById("backupDiffToggleButton");c&&c.click()}),this.container.querySelectorAll('[data-action="close-diff"]').forEach(g=>{g.addEventListener("click",()=>{const c=document.getElementById("v2-backup-diff-modal");c&&(c.style.display="none");const d=document.getElementById("backupDiffToggleButton");d&&d.click()})});const E=document.getElementById("v2-btn-restore-rehearsal"),w=document.getElementById("v2-rehearsal-modal"),v=this.container.querySelectorAll('[data-action="close-rehearsal"]');E&&w&&E.addEventListener("click",()=>{const g=document.getElementById("restoreRehearsalButton");g&&g.click(),w.style.display="flex"}),v.forEach(g=>{g.addEventListener("click",()=>{w&&(w.style.display="none");const c=document.getElementById("restoreRehearsalClose");c&&c.click()})})},syncFromLegacy(){a.forEach(i=>{const r=document.getElementById(i.v2),s=document.getElementById(i.legacy);r&&s&&(i.type==="checkbox"?r.checked=s.checked:(i.type==="value"||i.type==="color")&&(r.value=s.value))})},initStatusObservers(){const i=[{legacyId:"storageStatusLastProjectValue",v2Id:"v2-status-last-project"},{legacyId:"storageStatusLastAutoBackupValue",v2Id:"v2-status-last-auto"},{legacyId:"storageStatusLastFullBackupValue",v2Id:"v2-status-last-full"},{legacyId:"storagePersistenceStatus",v2Id:"v2-status-persistence"}],r=new MutationObserver(()=>{i.forEach(v=>{const g=document.getElementById(v.legacyId),c=document.getElementById(v.v2Id);g&&c&&(c.textContent=g.textContent)})});i.forEach(v=>{const g=document.getElementById(v.legacyId);if(g){r.observe(g,{childList:!0,characterData:!0,subtree:!0});const c=document.getElementById(v.v2Id);c&&(c.textContent=g.textContent)}});const s=[{legacyId:"localFontsStatus",v2Id:"v2-status-local-font"}],l=new MutationObserver(()=>{s.forEach(v=>{const g=document.getElementById(v.legacyId),c=document.getElementById(v.v2Id);g&&c&&(c.textContent=g.textContent)})});s.forEach(v=>{const g=document.getElementById(v.legacyId);g&&l.observe(g,{childList:!0,characterData:!0,subtree:!0})});const p=document.getElementById("settingsLogoPreview"),y=document.getElementById("v2-branding-preview");p&&y&&(new MutationObserver(()=>{if(p.hidden||p.innerHTML.trim()==="")y.innerHTML='<span style="color: var(--v2-text-muted);">No custom logo set</span>';else{y.innerHTML=p.innerHTML;const g=y.querySelector("img, svg");g&&(g.style.maxWidth="100%",g.style.height="auto")}}).observe(p,{childList:!0,attributes:!0,subtree:!0}),!p.hidden&&p.innerHTML.trim()!==""&&(y.innerHTML=p.innerHTML));const E=document.getElementById("documentationTrackerList"),w=document.getElementById("v2-doc-tracker-list");E&&w&&new MutationObserver(()=>{E.children.length===0?w.innerHTML='<p style="padding: 1rem; color: var(--v2-text-muted); text-align: center;">No releases tracked.</p>':(w.innerHTML="",Array.from(E.children).forEach(g=>{const c=g.cloneNode(!0);c.style.padding="0.5rem",c.style.borderBottom="1px solid var(--v2-border-subtle)",w.appendChild(c)}))}).observe(E,{childList:!0,subtree:!0})},initTabs(){const i=this.container.querySelector(".v2-tab-btn.active");if(i){const r=`v2-panel-${i.dataset.tab}`,s=document.getElementById(r);s&&(s.hidden=!1)}},initRehearsalSync(){const i=document.querySelectorAll('input[name="v2RehearsalMode"]'),r=document.getElementsByName("restoreRehearsalMode");i.forEach(d=>{d.addEventListener("change",()=>{r.forEach(u=>{u.value===d.value&&(u.checked=!0,u.dispatchEvent(new Event("change",{bubbles:!0})))})})});const s=document.getElementById("v2-rehearsal-browse-btn"),l=document.getElementById("restoreRehearsalBrowse");s&&l&&s.addEventListener("click",()=>l.click());const p=document.getElementById("v2-rehearsal-proceed-btn"),y=document.getElementById("v2-rehearsal-abort-btn");p&&p.addEventListener("click",()=>{const d=document.getElementById("restoreRehearsalProceed");d&&d.click(),document.getElementById("v2-rehearsal-modal").style.display="none"}),y&&y.addEventListener("click",()=>{const d=document.getElementById("restoreRehearsalAbort");d&&d.click()});const E=document.getElementById("restoreRehearsalTableBody"),w=document.getElementById("v2-rehearsal-table-body"),v=document.getElementById("restoreRehearsalFileName"),g=document.getElementById("v2-rehearsal-filename"),c=document.getElementById("restoreRehearsalProceed");E&&w&&(new MutationObserver(()=>{w.innerHTML="",Array.from(E.children).forEach(u=>{const m=u.querySelectorAll("td");if(m.length>=4){const S=m[0].textContent,b=m[3].innerHTML,L=document.createElement("tr");L.innerHTML=`
                            <td style="padding: 0.75rem;"><strong>${S}</strong></td>
                            <td style="padding: 0.75rem;">${b}</td>
                        `,w.appendChild(L)}}),p&&c&&(p.disabled=c.disabled,c.style.display==="none"?p.style.display="none":p.style.display="inline-block")}).observe(E,{childList:!0,subtree:!0}),c&&(new MutationObserver(()=>{p&&(p.disabled=c.disabled,c.style.display==="none"?p.style.display="none":p.style.display="inline-block")}).observe(c,{attributes:!0}),p&&(p.disabled=c.disabled,c.style.display==="none"?p.style.display="none":p.style.display="inline-block"))),v&&g&&new MutationObserver(()=>{g.textContent=v.textContent}).observe(v,{childList:!0,characterData:!0,subtree:!0})},initBackupDiffSync(){const i=document.getElementById("v2-diff-primary"),r=document.getElementById("v2-diff-secondary"),s=document.getElementById("backupDiffPrimary"),l=document.getElementById("backupDiffSecondary"),p=()=>{i&&s&&(i.innerHTML=s.innerHTML,i.value=s.value),r&&l&&(r.innerHTML=l.innerHTML,r.value=l.value)};if(p(),s&&l){const m=new MutationObserver(p);m.observe(s,{childList:!0}),m.observe(l,{childList:!0})}i&&i.addEventListener("change",()=>{s&&(s.value=i.value,s.dispatchEvent(new Event("change",{bubbles:!0})))}),r&&r.addEventListener("change",()=>{l&&(l.value=r.value,l.dispatchEvent(new Event("change",{bubbles:!0})))});const y=document.getElementById("backupDiffSummary"),E=document.getElementById("v2-diff-summary");y&&E&&new MutationObserver(()=>{E.innerHTML=y.innerHTML}).observe(y,{childList:!0,subtree:!0});const w=document.getElementById("backupDiffList"),v=document.getElementById("v2-diff-list");w&&v&&new MutationObserver(()=>{v.innerHTML=w.innerHTML,Array.from(v.querySelectorAll("li")).forEach(S=>{S.style.padding="0.5rem",S.style.borderBottom="1px solid var(--v2-border-subtle)"})}).observe(w,{childList:!0,subtree:!0});const g=document.getElementById("v2-btn-diff-export"),c=document.getElementById("backupDiffExport");g&&c&&g.addEventListener("click",()=>c.click());const d=document.getElementById("v2-diff-notes"),u=document.getElementById("backupDiffNotes");d&&u&&(d.value=u.value,d.addEventListener("input",()=>{u.value=d.value,u.dispatchEvent(new Event("input",{bubbles:!0}))}),new MutationObserver(()=>{document.activeElement!==d&&(d.value=u.value)}).observe(u,{attributes:!0,attributeFilter:["value"]}),u.addEventListener("input",()=>{document.activeElement!==d&&(d.value=u.value)}))},initLogViewerSync(){const i=document.getElementById("loggingHistory"),r=document.getElementById("v2-log-history-list");i&&r&&(new MutationObserver(()=>{r.innerHTML=i.innerHTML,Array.from(r.querySelectorAll("li")).forEach(l=>{l.style.padding="0.25rem 0",l.style.borderBottom="1px dashed var(--v2-border-subtle)"})}).observe(i,{childList:!0,subtree:!0}),r.innerHTML=i.innerHTML)}};typeof window<"u"&&(window.cineSettingsView=o)})();const vi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n="view-own-gear";let t=!1;function a(r){return typeof r!="string"?"":r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function o(r){if(typeof window<"u"&&window.texts){const s=document.getElementById("languageSelect"),l=s&&s.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",p=window.texts[l]||window.texts.en;if(p)return r.split(".").reduce((y,E)=>y?y[E]:null,p)||r}return r}const i={container:null,init(){try{this.container=document.getElementById(n),this.container||this.createViewContainer(),t||(console.log("[OwnGearView] Initializing..."),document.addEventListener("v2:viewchange",r=>{r.detail&&r.detail.view==="ownGear"&&this.render()}),document.addEventListener("v2:languagechange",()=>{this.isVisible()&&this.render()}),t=!0,console.log("[OwnGearView] Initialized"))}catch(r){console.error("[OwnGearView] Init failed:",r)}},isVisible(){return this.container&&!this.container.classList.contains("hidden")&&this.container.style.display!=="none"},createViewContainer(){const r=document.querySelector(".v2-main")||document.querySelector(".v2-app")||document.body,s=document.createElement("section");s.id=n,s.className="app-view",r.appendChild(s),this.container=s},render(){try{if(!this.container&&(this.init(),!this.container))return;const r=e.cineFeaturesOwnGear;if(!r){this.container.innerHTML=`
                        <div class="v2-empty-state">
                            <p>${o("statusUnavailable")||"Module not available"}</p>
                        </div>
                    `;return}const s=r.loadStoredOwnGearItems(),l=`
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
                `;let p='<div class="view-content">';!s||s.length===0?p+=`
                        <div class="own-gear-empty-state">
                            <span class="icon">inventory_2</span>
                            <h3>${o("ownGearEmptyTitle")}</h3>
                            <p>${o("ownGearEmptyText")}</p>
                            <button class="v2-btn v2-btn-primary" id="btn-add-own-gear-empty">
                                ${o("buttonAddFirstGearItem")}
                            </button>
                        </div>
                    `:(p+='<div class="own-gear-list">',s.forEach(y=>{p+=this.renderItemRow(y)}),p+="</div>"),p+="</div>",this.container.innerHTML=l+p,this.attachListeners()}catch(r){console.error("[OwnGearView] Render failed",r),this.container&&(this.container.innerHTML=`<div class="v2-error-state"><p>Error loading view: ${r.message}</p></div>`)}},renderItemRow(r){return`
                <div class="own-gear-item-card" data-item-id="${a(r.id)}">
                    <div class="own-gear-item-info">
                        <div class="own-gear-item-name">${a(r.name)}</div>
                        ${r.notes?`<div class="own-gear-item-notes">${a(r.notes)}</div>`:""}
                    </div>
                     <div class="own-gear-item-meta">
                        ${r.quantity?`<span class="own-gear-badge qty-badge">${o("labelQtyPrefix")}${a(r.quantity)}</span>`:""}
                        ${r.source?`<span class="own-gear-badge source-badge">${o("labelSourcePrefix")}${a(r.source)}</span>`:""}
                    </div>
                    <div class="own-gear-item-actions">
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-edit-own-gear" title="${o("buttonEdit")}" data-id="${a(r.id)}">
                            <span class="icon">edit</span>
                        </button>
                        <button class="v2-btn v2-btn-icon v2-btn-ghost btn-delete-own-gear" title="${o("buttonDelete")}" data-id="${a(r.id)}">
                            <span class="icon">delete</span>
                        </button>
                    </div>
                </div>
            `},attachListeners(){const r=this.container.querySelector("#btn-add-own-gear"),s=this.container.querySelector("#btn-add-own-gear-empty");r&&(r.onclick=()=>this.showEditModal(null)),s&&(s.onclick=()=>this.showEditModal(null)),this.container.querySelectorAll(".btn-edit-own-gear").forEach(l=>{l.onclick=p=>{p.stopPropagation();const y=p.currentTarget.dataset.id;y&&this.showEditModal(y)}}),this.container.querySelectorAll(".btn-delete-own-gear").forEach(l=>{l.onclick=p=>{p.stopPropagation();const y=p.currentTarget.dataset.id;y&&confirm(o("confirmDeleteGearItem"))&&this.deleteItem(y)}})},deleteItem(r){const s=e.cineFeaturesOwnGear;if(!s)return;const p=s.loadStoredOwnGearItems().filter(y=>y.id!==r);s.persistOwnGearItems(p)?this.render():alert(o("alertSaveItemFailed"))},showEditModal(r){const s=e.cineFeaturesOwnGear;if(!s)return;let l={},p=!0;if(r){const c=s.loadStoredOwnGearItems().find(d=>d.id===r);c&&(l={...c},p=!1)}p&&(l={name:"",quantity:"",notes:"",source:""});const y=document.querySelector(".v2-modal-backdrop");y&&y.remove();const E=document.createElement("div");E.className="v2-modal-backdrop",E.innerHTML=`
                <div class="v2-modal">
                    <div class="v2-modal-header">
                        <h3 class="v2-modal-title">${o(p?"modalTitleNewGearItem":"modalTitleEditGearItem")}</h3>
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
            `,document.body.appendChild(E),requestAnimationFrame(()=>E.classList.add("open"));const w=()=>{E.classList.remove("open"),setTimeout(()=>E.remove(),200)},v=E.querySelector("#ownGearName");v.focus(),E.querySelector(".v2-modal-close").onclick=w,E.querySelector("#btn-cancel-own-gear").onclick=w,E.querySelector("#btn-save-own-gear").onclick=()=>{const g=v.value.trim();if(!g){alert(o("alertEnterName"));return}const c={id:r||void 0,name:g,quantity:E.querySelector("#ownGearQuantity").value.trim(),notes:E.querySelector("#ownGearNotes").value.trim()},d=s.loadStoredOwnGearItems();let u;if(p?u=s.normalizeOwnGearRecord(c):u=s.normalizeOwnGearRecord({...l,...c}),!u){alert(o("alertInvalidItemData"));return}let m;p?m=[...d,u]:m=d.map(S=>S.id===r?u:S),s.persistOwnGearItems(m)?(this.render(),w()):alert(o("alertSaveItemFailed"))}}};e.cineOwnGearView=i})(typeof window<"u"?window:void 0);const pi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n=[{id:"v2-welcome",titleKey:"helpV2WelcomeTitle",keywordsKey:"helpV2WelcomeKeywords",iconKey:"overview",contentKey:"helpV2WelcomeContent"},{id:"v2-projects",titleKey:"helpV2ProjectsTitle",keywordsKey:"helpV2ProjectsKeywords",iconKey:"load",contentKey:"helpV2ProjectsContent"},{id:"v2-sidebar-search",titleKey:"helpV2SidebarSearchTitle",keywordsKey:"helpV2SidebarSearchKeywords",iconKey:"distance",contentKey:"helpV2SidebarSearchContent"},{id:"v2-device-library",titleKey:"helpV2DeviceLibraryTitle",keywordsKey:"helpV2DeviceLibraryKeywords",iconKey:"camera",contentKey:"helpV2DeviceLibraryContent"},{id:"v2-contacts",titleKey:"helpV2ContactsTitle",keywordsKey:"helpV2ContactsKeywords",iconKey:"contacts",contentKey:"helpV2ContactsContent"},{id:"v2-settings",titleKey:"helpV2SettingsTitle",keywordsKey:"helpV2SettingsKeywords",iconKey:"settingsData",contentKey:"helpV2SettingsContent"},{id:"v2-save-share-backup",titleKey:"helpV2SaveShareBackupTitle",keywordsKey:"helpV2SaveShareBackupKeywords",iconKey:"settingsBackup",contentKey:"helpV2SaveShareBackupContent"},{id:"v2-auto-gear",titleKey:"helpV2AutoGearTitle",keywordsKey:"helpV2AutoGearKeywords",iconKey:"settingsAutoGear",contentKey:"helpV2AutoGearContent"},{id:"v2-print-export",titleKey:"helpV2PrintExportTitle",keywordsKey:"helpV2PrintExportKeywords",iconKey:"fileExport",contentKey:"helpV2PrintExportContent"}],t=[{id:"v2-quick-start",titleKey:"helpV2QuickStartTitle",keywordsKey:"helpV2QuickStartKeywords",iconKey:"check",contentKey:"helpV2QuickStartContent"},{id:"v2-data-safety",titleKey:"helpV2DataSafetyTitle",keywordsKey:"helpV2DataSafetyKeywords",iconKey:"settingsBackup",contentKey:"helpV2DataSafetyContent"},{id:"v2-shortcuts",titleKey:"helpV2ShortcutsTitle",keywordsKey:"helpV2ShortcutsKeywords",iconKey:"resetView",contentKey:"helpV2ShortcutsContent"},{id:"v2-features",titleKey:"helpV2FeaturesTitle",keywordsKey:"helpV2FeaturesKeywords",iconKey:"gearList",contentKey:"helpV2FeaturesContent"}];n.push(...t),e.cineV2HelpData=n})(typeof window<"u"?window:void 0);const gi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));(function(e){const n=e.cineV2HelpData||[],t="overview",a={projectManagement:"load",saveShareBackup:"settingsBackup",deviceConfiguration:"camera",powerCalculation:"batteryBolt",connectionDiagram:"plug",gearList:"gearList",contacts:"contacts",ownGear:"camera",settings:"settingsGeneral",offlineUse:"wifi",troubleshooting:"feedback",shortcuts:"resetView",pinkMode:"sun"};function o(){if(!e.texts)return null;const v=e.currentLanguage||e.currentLang||e.document?.documentElement?.lang||"en";return e.texts[v]||e.texts.en||null}function i(v){const g=o();return g&&g[v]||v}function r(v){const g=e.ICON_GLYPHS;return g&&v&&g[v]?g[v]:g&&g[t]?g[t]:null}function s(v){const g=v.titleKey?i(v.titleKey):v.title,c=v.keywordsKey?i(v.keywordsKey):v.keywords,d=v.contentKey?i(v.contentKey):v.content;return{...v,title:g,keywords:c,content:d,icon:r(v.iconKey||v.icon||t)}}function l(){const v=["v2-quick-start","v2-shortcuts","v2-data-safety","v2-features"],g=n.map(s);return{essentials:g.filter(c=>v.includes(c.id)),guides:g.filter(c=>!v.includes(c.id))}}function p(v){return v?v.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>").split(/\n\n+/).map(c=>c.trim().startsWith("- ")?`<ul>${c.trim().split(/\n/).map(u=>`<li>${u.replace(/^- /,"")}</li>`).join("")}</ul>`:`<p>${c}</p>`).join(""):""}function y(){let v=e.cineCoreLocalization||e.cineCoreLocalizationBridge||e.cineModuleBase&&e.cineModuleBase.resolveLocalization&&e.cineModuleBase.resolveLocalization();if(!v||typeof v.getString!="function")if(typeof e.getText=="function")v={getString:b=>e.getText(b)};else if(e.texts){const b=(P,F)=>F.split(".").reduce((z,q)=>z&&z[q],P),L=e.currentLanguage||e.currentLang||"en",I=e.texts[L]||e.texts.en;v={getString:P=>b(I,P)||""}}else return console.warn("[HelpService] Localization module not found. V1 topics unavailable."),[];const g=["projectManagement","saveShareBackup","deviceConfiguration","powerCalculation","connectionDiagram","gearList","contacts","ownGear","settings","offlineUse","troubleshooting","shortcuts","pinkMode"],c=e.currentLanguage||e.currentLang||e.document?.documentElement?.lang||"en",d=e.texts&&(e.texts[c]||e.texts.en),u=d&&d.helpTopics,m=u&&typeof u=="object"?Object.keys(u):[];return(m.length?[...g.filter(b=>m.includes(b)),...m.filter(b=>!g.includes(b))]:g).map(b=>{const L=u&&u[b],I=L&&L.title||v.getString(`helpTopics.${b}.title`),P=L&&L.content||v.getString(`helpTopics.${b}.content`);return I?{id:`v1-${b}`,category:"reference",title:I,keywords:I,icon:r(a[b]||t),content:p(P)}:null}).filter(b=>b!==null)}function E(){const v=n.map(s),g=y();return[...v,...g]}function w(){const v=l();return{essentials:{title:i("helpGroupEssentials"),items:v.essentials},guide:{title:i("helpGroupGuides"),items:v.guides},reference:{title:i("helpGroupReference"),items:y()}}}e.cineHelpService={getAllSections:E,getGroupedSections:w}})(typeof window<"u"?window:void 0);const fi=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"})),jn="v2HelpToc",Rn="v2HelpContent",mi="v2HelpSearch",bi="v2HelpSearchStatus";let Re=null,wt=!1,re=null;function Ee(e){return document.getElementById(e)}function pe(e){if(typeof window<"u"&&window.texts){const n=document.getElementById("languageSelect"),t=n&&n.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",a=window.texts[t]||window.texts.en;if(a)return a[e]||e}return e}function yi(e,n,t){let a=e.replace("{count}",String(n));return t&&a.indexOf("{query}")!==-1&&(a=a.replace("{query}",t)),a}function Qe(e,n){if(!e)return"";const t=window.iconMarkup||window.cineIcons&&window.cineIcons.iconMarkup;if(typeof t=="function")return t(e,n);const a=e.char||e;return a?`<span class="icon-glyph ${n||""}" aria-hidden="true" data-icon-font="uicons">${a}</span>`:""}function hi(){const e=Ee(Rn);if(!e)return[];e.innerHTML="";const n=[],t=window.cineHelpService;if(!t)return e.innerHTML=`<div class="v2-empty-state"><p>${pe("helpServiceUnavailable")}</p></div>`,[];const a=t.getGroupedSections(),o=[a.essentials,a.guide,a.reference].filter(s=>s&&s.items.length>0);o.forEach((s,l)=>{if(wi(e,s.title,s.items,n),l<o.length-1){const p=document.createElement("hr");p.className="v2-help-divider",e.appendChild(p)}});const i=document.createElement("div");i.id="v2HelpNoResults",i.className="v2-help-no-results",i.style.display="none";const r=Qe(window.ICON_GLYPHS&&window.ICON_GLYPHS.distance,"v2-help-no-results-icon");return i.innerHTML=`
        <div class="v2-help-no-results-content">
            ${r}
            <h3>${pe("helpSearchNoResultsTitle")}</h3>
            <p>${pe("helpSearchNoResultsHint")}</p>
        </div>
    `,e.appendChild(i),n}function wi(e,n,t,a){a.push({type:"header",title:n}),t.forEach(o=>{const i=document.createElement("section");i.className="v2-help-section",i.id=o.id,i.setAttribute("data-keywords",(o.keywords||"")+" "+(o.title||""));const r=document.createElement("h2");o.icon?(r.innerHTML=Qe(o.icon,"v2-help-icon"),r.appendChild(document.createTextNode(o.title||""))):r.textContent=o.title;const s=document.createElement("div");s.className="v2-help-content-body",s.innerHTML=o.content,i.appendChild(r),i.appendChild(s),e.appendChild(i),a.push({type:"item",id:o.id,title:o.title,keywords:o.keywords,icon:o.icon})})}function Ei(e){const n=Ee(jn);if(!n)return;n.innerHTML="";const t=document.createElement("ul");e.forEach(a=>{if(a.type==="header"){const o=document.createElement("li");o.className="v2-help-toc-header",o.textContent=a.title,t.appendChild(o)}else{const o=document.createElement("li"),i=document.createElement("a");i.href=`#${a.id}`,i.className="v2-help-toc-link",i.dataset.target=a.id,i.dataset.title=a.title||"",i.dataset.keywords=a.keywords||"",a.icon?(i.innerHTML=Qe(a.icon,"v2-toc-icon"),i.appendChild(document.createTextNode(a.title||""))):i.textContent=a.title,i.addEventListener("click",r=>{r.preventDefault();const s=document.getElementById(a.id);s&&s.scrollIntoView({behavior:"smooth"}),On(a.id)}),o.appendChild(i),t.appendChild(o)}}),n.appendChild(t)}function On(e){document.querySelectorAll(".v2-help-toc-link").forEach(n=>{n.dataset.target===e?n.classList.add("active"):n.classList.remove("active")})}function Si(){Re&&Re.disconnect();const e={root:Ee(Rn),rootMargin:"-10% 0px -80% 0px",threshold:0},n=t=>{t.forEach(a=>{a.isIntersecting&&On(a.target.id)})};Re=new IntersectionObserver(n,e),document.querySelectorAll(".v2-help-section").forEach(t=>{Re.observe(t)})}function Li(){const e=Ee(mi);if(!e)return;const n=o=>{if(!o)return;let i=null,r=!1;Array.from(o.children).forEach(s=>{s.classList.contains("v2-help-toc-header")?(i&&(i.style.display=r?"block":"none"),i=s,r=!1):i&&s.style.display!=="none"&&(r=!0)}),i&&(i.style.display=r?"block":"none")},t=document.createElement("button");t.className="v2-help-search-clear",t.style.display="none",t.type="button",t.setAttribute("aria-label",pe("helpSearchClearLabel")),t.title=pe("helpSearchClearLabel"),t.innerHTML=Qe(window.ICON_GLYPHS&&window.ICON_GLYPHS.resetView,"v2-help-search-clear-icon");const a=document.createElement("div");a.id=bi,a.className="visually-hidden",a.setAttribute("aria-live","polite"),a.setAttribute("aria-atomic","true"),a.setAttribute("role","status"),e.parentNode.appendChild(t),e.parentNode.appendChild(a),re=()=>{const o=e.value.trim(),i=o.toLowerCase(),r=document.querySelectorAll(".v2-help-section"),s=Ee("v2HelpNoResults"),l=Ee(jn),p=l?l.querySelector("ul"):null;let y=!1,E=0;if(r.forEach(w=>{const v=w.innerText.toLowerCase(),g=(w.dataset.keywords||"").toLowerCase(),c=v.includes(i)||g.includes(i);w.style.display=c?"block":"none",c&&(y=!0,E+=1)}),document.querySelectorAll(".v2-help-toc-link").forEach(w=>{const v=document.getElementById(w.dataset.target),g=v&&v.style.display!=="none",c=w.parentElement;c&&(c.style.display=g?"block":"none")}),n(p),document.querySelectorAll(".v2-help-divider").forEach(w=>{w.style.display=i?"none":"block"}),s&&(s.style.display=!y&&i?"flex":"none"),t.style.display=i.length>0?"block":"none",a){const w=pe(i?"helpSearchStatusWithQuery":"helpSearchStatusAll");a.textContent=yi(w,E,o)}},e.addEventListener("input",()=>{re&&re()}),t.addEventListener("click",()=>{e.value="",re&&re(),e.focus()})}function ki(){const e=document.querySelector(".v2-help-search-clear");if(!e)return;const n=pe("helpSearchClearLabel");e.setAttribute("aria-label",n),e.title=n}function Hn(){wt||(console.log("[HelpView] Initializing..."),window.cineViewManager&&window.cineViewManager.registerView("help",{onEnter:()=>Nn(),onLeave:()=>{}}),Et(),Li(),document.addEventListener("v2:languagechange",()=>{Et(),ki(),re&&re()}),wt=!0)}function Et(){const e=hi();e&&(Ei(e),setTimeout(()=>Si(),100)),re&&re()}function Nn(){wt||Hn()}const qn={init:Hn,enter:Nn,refresh:Et};window.cineHelpView=qn;const Ci=Object.freeze(Object.defineProperty({__proto__:null,cineHelpView:qn},Symbol.toStringTag,{value:"Module"})),it="backups";function j(e){if(typeof window<"u"&&window.texts){const n=document.getElementById("languageSelect"),t=n&&n.value||typeof window.currentLanguage=="string"&&window.currentLanguage||"en",a=window.texts[t]||window.texts.en;if(a)return e.split(".").reduce((o,i)=>o?o[i]:null,a)||e}return e}function ue(e,n={}){return typeof e!="string"?"":e.replace(/\{(\w+)\}/gu,(t,a)=>Object.prototype.hasOwnProperty.call(n,a)?String(n[a]):t)}function Ii(e){return String(e||"").replace(/\.json$/i,"").replace(/^snapshot_/,"")}function xi(e){const n=new Date().toISOString().replace(/[^\d]/gu,"-");return`${e?`${e}-restore-safety`:"restore-safety"}-${n}`}function $i(){const e=document.createElement("div");return e.className="v2-spinner",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-label",j("backupVaultLoading")),e}function Pi(e,n){const t=document.createElement("div");t.className="v2-empty-state";const a=document.createElement("p");if(a.textContent=e,t.appendChild(a),n){const o=document.createElement("p");o.className="subtext",o.textContent=n,t.appendChild(o)}return t}function Di(e){const n=document.createElement("div");return n.className="v2-error-state",n.textContent=e,n}function Zt(e,n,t,a){const o=document.createElement("button");return o.type="button",o.className=n,o.textContent=e,a&&(o.setAttribute("aria-label",a),o.setAttribute("title",a)),o.addEventListener("click",t),o}async function Bi(e){if(!e)return!0;try{const n=await Jt.loadProject(e);if(!n||!n.data)return!0;const t=n.meta?{_meta:n.meta,data:n.data}:n.data,a=xi(e);return await Oe.saveSnapshot(a,t),!0}catch(n){return console.warn("Failed to capture safety snapshot before restore",n),!1}}const Fn={init(){window.cineViewManager&&window.cineViewManager.registerView(it,{onEnter:()=>this.render(),onLeave:()=>{}});const e=document.getElementById("navAutoBackups");e&&(e.style.display="flex")},async render(){const e=document.querySelector(".v2-main")||document.querySelector(".v2-app")||document.body;let n=document.getElementById(`view-${it}`);n||(n=document.createElement("section"),n.id=`view-${it}`,n.className="app-view",n.innerHTML=`
                <header class="view-header">
                    <button class="v2-mobile-menu-toggle" aria-label="${j("menuToggleLabel")}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <h1>${j("backupVaultHeading")}</h1>
                </header>
                <div class="view-content">
                    <div class="v2-backup-list" id="backupList">
                        <div class="v2-empty-state">${j("backupVaultLoading")}</div>
                    </div>
                </div>
            `,e.appendChild(n));const t=n.querySelector("#backupList");t.replaceChildren($i());try{const a=await Oe.listSnapshots();if(a.length===0){t.replaceChildren(Pi(j("backupVaultEmptyTitle"),j("backupVaultEmptySubtitle")));return}const o=document.createElement("ul");o.className="v2-list";for(const i of a){const r=Ii(i),s=document.createElement("li");s.className="v2-list-item";const l=document.createElement("div");l.className="v2-list-content";const p=document.createElement("div");p.className="v2-list-title",p.textContent=r,l.appendChild(p);const y=document.createElement("div");y.className="v2-list-actions";const E=j("buttonRestore"),w=ue(j("backupVaultRestoreAriaLabel"),{name:r}),v=j("buttonDelete"),g=ue(j("backupVaultDeleteAriaLabel"),{name:r});y.appendChild(Zt(E,"v2-btn v2-btn-sm",()=>this.restore(i,r),w)),y.appendChild(Zt(v,"v2-btn v2-btn-sm v2-btn-danger",()=>this.delete(i,r),g)),s.appendChild(l),s.appendChild(y),o.appendChild(s)}t.replaceChildren(o)}catch(a){const o=ue(j("backupVaultLoadError"),{message:a&&a.message?a.message:j("backupVaultLoadErrorFallback")});t.replaceChildren(Di(o))}},async restore(e,n=""){const t=ue(j("backupVaultRestoreConfirm"),{name:n||e});if(confirm(t))try{const a=await Oe.restoreSnapshot(e),{data:o,meta:i}=zn(a),r=e.replace(/\.json$/i,""),s=i&&i.docId||o&&o.id||r;if(!o){alert(j("backupVaultUnknownFormat"));return}if(!await Bi(s)){alert(j("restoreBackupFailed"));return}const p=i?{...i,lock:null}:null,y=await Jt.saveProject(s,o,p);if(!y||y.success===!1){const E=y&&y.error==="PROJECT_LOCKED"?j("backupVaultRestoreLocked"):j("backupVaultRestoreUnknownError");alert(ue(j("backupVaultRestoreFailed"),{reason:E}));return}alert(j("backupVaultRestoreSuccess"))}catch(a){const o=ue(j("backupVaultRestoreError"),{message:a&&a.message?a.message:j("backupVaultRestoreUnknownError")});alert(o)}},async delete(e,n=""){const t=ue(j("backupVaultDeleteConfirm"),{name:n||e});if(confirm(t))try{await Oe.deleteSnapshot(e),await this.render()}catch(a){const o=ue(j("backupVaultDeleteError"),{message:a&&a.message?a.message:j("backupVaultDeleteErrorFallback")});alert(o)}}};window.cineBackupsView=Fn;const Ti=Object.freeze(Object.defineProperty({__proto__:null,cineBackupsView:Fn},Symbol.toStringTag,{value:"Module"}));export{Nt as V};
//# sourceMappingURL=v2-ui-CGKqhVaB.js.map
