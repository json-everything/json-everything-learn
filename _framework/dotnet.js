//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"47fb725acf5d7094af51aebbb5b7e5c44a3b2a77",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "LearnJsonEverything",
  "resources": {
    "hash": "sha256-TX/2ejumujDhvxjB/8sIeueTVKMvDi0Di/4Si/wkMyc=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.3qf6w265iu.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.f4b1oiwlzh.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.4zyobjtzg3.wasm",
        "integrity": "sha256-EG7563iSTaNeFBPXgBHokcbGGGNf06/UZpJv7TKR3c0=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Private.CoreLib.dll",
        "name": "System.Private.CoreLib.o2g0hplrdb.dll",
        "integrity": "sha256-YBZkD/6vv4JJRusBspfScHQxoSa8UXfKfkMf2t/soW4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.dll",
        "name": "System.Runtime.InteropServices.JavaScript.jysn0ms5gl.dll",
        "integrity": "sha256-pfWT4ZwqDUeXMiBVchmFPJtZ/3NRLBwR3eCF5sEPhOI=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "BlazorMonaco.dll",
        "name": "BlazorMonaco.8amkbtt9ah.dll",
        "integrity": "sha256-0DwAMDShv0IXbPeW9PueG9CcLW9Q1GEhOIKnImY6joE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Blazored.LocalStorage.dll",
        "name": "Blazored.LocalStorage.somf8dykn2.dll",
        "integrity": "sha256-ZGOhicUlxsmaD44LUlk9QGefwrharIvp8bP1r4UKlPU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ColorCode.dll",
        "name": "ColorCode.4gmet5xqu1.dll",
        "integrity": "sha256-JGrcn2j0wtkL4DMqzxgENQkz77cEYJrRUUlofxUJL2Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Humanizer.dll",
        "name": "Humanizer.fa3m3j6lp6.dll",
        "integrity": "sha256-J2ntgmW2kaVILHJQbtJ03FJEb6FkGZeowSxm9bkmPTk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "IndexRange.dll",
        "name": "IndexRange.bygh09sfqq.dll",
        "integrity": "sha256-E7RZqXJb865Csmg2YTIhRoRYlSv1n4SLgJwD7WAkf7E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Json.More.dll",
        "name": "Json.More.cprly6tb6d.dll",
        "integrity": "sha256-gLbNUDMfot7U+6zb+A3O3SsULe5nnfInwwKZ0qPDhA8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonE.Net.dll",
        "name": "JsonE.Net.ko84cwha9q.dll",
        "integrity": "sha256-DF/Vx1tTuIz4ii2gvn1tQQSjwLLSjnnmJGR8pvnSdXg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonLogic.dll",
        "name": "JsonLogic.e9mqtvz41i.dll",
        "integrity": "sha256-MjxlQgQSoKxq6ZMJY0+5kUrcVkpGFoFaxAdWu29lyfQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonPatch.Net.dll",
        "name": "JsonPatch.Net.ro44mgrzd3.dll",
        "integrity": "sha256-u3aj7OZATG075HAl7ftyKvibVmUSKdtsylaUiVhqaNM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonPath.Net.dll",
        "name": "JsonPath.Net.jsss61btl1.dll",
        "integrity": "sha256-w9pUjh+OfM9PrW6aVIQZxqEIuoCYG+YKTsMDw6n0Cjo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonPointer.Net.dll",
        "name": "JsonPointer.Net.b4tdy285cc.dll",
        "integrity": "sha256-qz6CNvAti1EQ0Lyk9kCx6FUHKPrP50DWXg9L0VjFn48=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonSchema.Net.Generation.dll",
        "name": "JsonSchema.Net.Generation.fejvxgdmzu.dll",
        "integrity": "sha256-98TG2ihRX/AgSgYtbTESqYHKZpEGqqfzBBxcOoESZ18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "JsonSchema.Net.dll",
        "name": "JsonSchema.Net.ntfbzq6ktm.dll",
        "integrity": "sha256-JdCVnKuqMv73R9rZ7neTLu/6nBHz+D7sTkTXtobT8U4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LearnJsonEverything.Template.dll",
        "name": "LearnJsonEverything.Template.7nogexqri1.dll",
        "integrity": "sha256-wzJAH9zcwL1GERe3QhW7Tid650/lfpZsR/NS/jMEJoE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "LearnJsonEverything.dll",
        "name": "LearnJsonEverything.pb2o1onw93.dll",
        "integrity": "sha256-O20uX8HEidGxRHiFHoBI1elK8+wyMH4eNU/9678lFuc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Markdig.SyntaxHighlighting.dll",
        "name": "Markdig.SyntaxHighlighting.gwly8z30z1.dll",
        "integrity": "sha256-YEfO9OsS0T4kDjPXOW2pJF8qg62omn4UYMy/C2tcmC4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Markdig.dll",
        "name": "Markdig.nucp4ls729.dll",
        "integrity": "sha256-sXr4jiGbCxasFl1lVE8UwIf/sLlS8n45w9YW/23tCEg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.dll",
        "name": "Microsoft.AspNetCore.Authorization.6bu8fbinhb.dll",
        "integrity": "sha256-jlkQWygWEK2ZxPDNvgc7yFzMSWOsNS+kk8YySOh9fsQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.dll",
        "name": "Microsoft.AspNetCore.Components.Forms.7u7q2g9ss6.dll",
        "integrity": "sha256-0UPVkA2WNNPnPGs8tOilAB2jKwoUNDmmghxrPr11FY0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.dll",
        "name": "Microsoft.AspNetCore.Components.Web.we5lpnvbbz.dll",
        "integrity": "sha256-qDOrJw7gM9hA+iI3FLQ4i4eXEBe6xhyy3oSVdyQa4xw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.dll",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.7slo8bpqqi.dll",
        "integrity": "sha256-uVcfki/9BFXmcq9yQQ6RcVQYVaKedbwQFArYTqQbVEw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.dll",
        "name": "Microsoft.AspNetCore.Components.kto2khloq7.dll",
        "integrity": "sha256-KLLflTxI69RFitaDtCA0LWlVjilq2rOpai2ewj9MSeg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.dll",
        "name": "Microsoft.AspNetCore.Metadata.4444ykfxig.dll",
        "integrity": "sha256-1E95rXarrrBqOcP8s/C/zZXmRBNqp3pAOdcg4igm/xM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Bcl.Memory.dll",
        "name": "Microsoft.Bcl.Memory.45ykfzsfz8.dll",
        "integrity": "sha256-2ESi4xt6CrwQkRYI4KgZUjqgVXdKW0bo4S3hTNWkSzI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.dll",
        "name": "Microsoft.CSharp.b2j0i0pu9y.dll",
        "integrity": "sha256-fT1NM3S1SNruQp/xdYxPPaNGAnjRntMK7cfpLEQKiDU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.dll",
        "name": "Microsoft.CodeAnalysis.CSharp.Scripting.6fd9rbq4w8.dll",
        "integrity": "sha256-zqzfUy37szHIkeBjCe7fdBlmY5K0F3Iyp1kYyz/Dl8c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.CSharp.dll",
        "name": "Microsoft.CodeAnalysis.CSharp.obbod6kesa.dll",
        "integrity": "sha256-VBQncKAOWUlC7okjcm6kkSYwPQxSOTKIbCQX62bcB/g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.Scripting.dll",
        "name": "Microsoft.CodeAnalysis.Scripting.ln8qw0ccz4.dll",
        "integrity": "sha256-r3HmFyTqDn6v+NNxUYHPs/6QFFs0AmCalFewae5gpMo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CodeAnalysis.dll",
        "name": "Microsoft.CodeAnalysis.t0tf1lj017.dll",
        "integrity": "sha256-rYV/HOf44mwnIq3nBfrD+QUCpHWQwUB13xMnIQ8Qse8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.DotNet.HotReload.WebAssembly.Browser.dll",
        "name": "Microsoft.DotNet.HotReload.WebAssembly.Browser.luxj1tar81.dll",
        "integrity": "sha256-HccPJBMyi9NzgA69yHl2czamJ7vN9E45UB998wmC130=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.dll",
        "name": "Microsoft.Extensions.Configuration.Abstractions.c12yfrle4n.dll",
        "integrity": "sha256-0MmLFMweCh0vtKGug+U7wEqpVmPuE7fkwcjsZEATKD8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.dll",
        "name": "Microsoft.Extensions.Configuration.Binder.scphrmm7wc.dll",
        "integrity": "sha256-nM15Uqg7M4BCCO7eVumkXXSB/K+qesoIZoU/aYIx9ac=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.dll",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.w3hubz4rdn.dll",
        "integrity": "sha256-5PYF3lbGJGrY6aQ05Swj/dUGkHiv0r0p6/6TQYDOH+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.dll",
        "name": "Microsoft.Extensions.Configuration.Json.crl3p9jjf7.dll",
        "integrity": "sha256-GAL1h7buS8DPbSNk9vJjP7eP7qWQhc/zf9dVKHm1hOI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.dll",
        "name": "Microsoft.Extensions.Configuration.c7v0t5ykc8.dll",
        "integrity": "sha256-+C421XCdJNoF6SM0fnIGSL2NKz53l9JFYSePdnBJZb0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.dll",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.onpolta4wt.dll",
        "integrity": "sha256-HP+rPSByK/XDyT4ufRwk79ii/ew1apNUZQLJMn34RdA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.dll",
        "name": "Microsoft.Extensions.DependencyInjection.u0o3cweqak.dll",
        "integrity": "sha256-Xgg6WGDIiEwV1ysoyEHhxL8z0kXXYvwcUQkVn33wQxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.dll",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.yc7hdrk7ux.dll",
        "integrity": "sha256-fkd0aV3nPnq1OVEb21jVlJe1AbyB+7BWp7F23DDl2XI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.dll",
        "name": "Microsoft.Extensions.Diagnostics.bdfvu1dwkd.dll",
        "integrity": "sha256-j7HVVAyb4IxFK46sDU1h5RKTnPtFuKn87o3DKiLguEg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.dll",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.35nvvm7p9t.dll",
        "integrity": "sha256-GTJq1XPZvQ+4Awg4bTnt9WClq61k39pjs2lLQeCNQZk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.dll",
        "name": "Microsoft.Extensions.FileProviders.Physical.bo4grbc7j9.dll",
        "integrity": "sha256-qwKEAJCtPQ9FVxLS2rkccUwG4u8W6dvxv++3W8SsIN4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.dll",
        "name": "Microsoft.Extensions.FileSystemGlobbing.080u6srf08.dll",
        "integrity": "sha256-YH0aEGwQJzCjVHgn6pbUuvq+RoM5EkeRKiMEn9f41QU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.dll",
        "name": "Microsoft.Extensions.Logging.16awan9em6.dll",
        "integrity": "sha256-h+6G+nA01qP9BbcXCba7uk+qgfVxum2AIAMbKLlVzyM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.dll",
        "name": "Microsoft.Extensions.Logging.Abstractions.ukfxey4w3l.dll",
        "integrity": "sha256-4lxsrsf1/1iQC4iQLtJSi355Gnv6dNhJtrjjxtm4n9k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.dll",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.n7kb6kg9f5.dll",
        "integrity": "sha256-ExGbYpSxJTQTUcXWul7hj/3eWG8mUQzKTDY+pA1FudE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.dll",
        "name": "Microsoft.Extensions.Options.c686rg5zqn.dll",
        "integrity": "sha256-5LmmPkiaj5NJdQ+3c5DUrQ9ylk4Q96+a1iMhIw2hmiQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.dll",
        "name": "Microsoft.Extensions.Primitives.rsvuaqgv1v.dll",
        "integrity": "sha256-hVF9yKXhRd6GBITQTu/GQ7SFIUXfPqFZKeqvPE8MPQc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.dll",
        "name": "Microsoft.Extensions.Validation.1awy6a6bey.dll",
        "integrity": "sha256-6SWqYrPg3tNYbDOtK1FAGTobrC+y3Zl5EotGSTETPdw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.dll",
        "name": "Microsoft.JSInterop.WebAssembly.y0jm9x3rvi.dll",
        "integrity": "sha256-0saaOGtij/sj6KfOEllooUBCDkOVZHzHxfco4K4cBMA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.dll",
        "name": "Microsoft.JSInterop.i2wb50ibwl.dll",
        "integrity": "sha256-5oOXiwG1X3/pjakCr9Sr7KvrEn+akObWhBfH317m9XY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.dll",
        "name": "Microsoft.VisualBasic.7v2gk9iw6v.dll",
        "integrity": "sha256-fRX7IZ6ziXrk6fGVLvyrxG17/rMtT41kg0ZaW1bwZr0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.dll",
        "name": "Microsoft.VisualBasic.Core.636g4g4q5c.dll",
        "integrity": "sha256-LvlPg1nOnE2c4x6B1WZ3ktPVHAAY/cidFbsJV+RfO2Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.dll",
        "name": "Microsoft.Win32.Primitives.icdxtwdu8j.dll",
        "integrity": "sha256-0s4muyVfjIJMoa/+vCzWQEKDa3SEu05WtFr3cSBP4jg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.dll",
        "name": "Microsoft.Win32.Registry.0s57lmw5qd.dll",
        "integrity": "sha256-AKagacPF8W0tbFFA+mWQkO9DrQKHcKb4p0SDrvpWmZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.dll",
        "name": "System.AppContext.vhlhans232.dll",
        "integrity": "sha256-7TJhJY+jbm3aBle+fhozoKfMg0ot7fwSD6QIY2Zd7OI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.dll",
        "name": "System.Buffers.8o9iq35qu4.dll",
        "integrity": "sha256-eBdzQmIsE348kKwAVQL/TOV4fJ+HrhiROuI7JuNwUEY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.dll",
        "name": "System.Collections.Concurrent.l6pza1ttq5.dll",
        "integrity": "sha256-PWi0uBGmWiAJvUWN3+HkeRGC1hdIynq7ifD2Yg4RGkI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.dll",
        "name": "System.Collections.Immutable.llsqwlwezx.dll",
        "integrity": "sha256-t9iIAtQ2AfyLt+K/LAQ3SE5QUEHbrrFQ8uoTOqmkLbI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.dll",
        "name": "System.Collections.NonGeneric.11tzw1tq95.dll",
        "integrity": "sha256-S25zzeNwo82KdlruyTt/mzSgx9idbKpzMZ5PaD/AR7c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.dll",
        "name": "System.Collections.Specialized.6se4kqzvbu.dll",
        "integrity": "sha256-KrALp5tUiYKYQSeM7bgRA9KvjYmlZZhZUMOWVtHLDrk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.dll",
        "name": "System.Collections.ilu6sbkkkg.dll",
        "integrity": "sha256-mjdaaDjZK/2C3D0SPyeoJhdl0EIUK70BR+6Q+Peh98I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.dll",
        "name": "System.ComponentModel.3nmuh1qfmr.dll",
        "integrity": "sha256-4XxsUuX0FnyyXfhwU97D4ILnvYQWUGWGSNWfYBJUMgg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.dll",
        "name": "System.ComponentModel.Annotations.8v8jkdyd3j.dll",
        "integrity": "sha256-XATfIPSo4q/XKycfaxDEppmx6x9e8qD9nXUuuoqPDAU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.dll",
        "name": "System.ComponentModel.DataAnnotations.lotnxmv986.dll",
        "integrity": "sha256-Bf8bNGJsCTJfhN+lokq8S1OfjY7P8s160Mj7HteI5Gs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.dll",
        "name": "System.ComponentModel.EventBasedAsync.isok4iue03.dll",
        "integrity": "sha256-ftkTQwA5THqyysM0oypEYadiTSRXzuYIyzC0Qw/f+Cg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.dll",
        "name": "System.ComponentModel.Primitives.fuwsuqb3fl.dll",
        "integrity": "sha256-R4udPpOqpYAszogIk/RIb4WjQhNcPN3wS3TCVTS4V1U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.dll",
        "name": "System.ComponentModel.TypeConverter.fealkofm7a.dll",
        "integrity": "sha256-54tJ4O6vDiE9mCmrCzuy/8b07v8XfMZ78oLOn3SF710=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.dll",
        "name": "System.Configuration.f2pdcoub3z.dll",
        "integrity": "sha256-2bMTGR9mnhiwecF6CD75i7oCz59LkFnF7qa2SAB/jz0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.dll",
        "name": "System.Console.altdd2dw7q.dll",
        "integrity": "sha256-8uO4rRbv9XChEDuPxCyctvnDi5ntbjKx3oKPCN/HooI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.dll",
        "name": "System.Core.dmqbbdq0b7.dll",
        "integrity": "sha256-hTqLDOdABdxpYdLHKPy/Zo8C0XJQ9Cw9OLWgq96Rgws=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.dll",
        "name": "System.Data.566lu34hbp.dll",
        "integrity": "sha256-fVyNAhdEDJM62HJFTop4L+TSew+BDNrNQ34024hdwrc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.dll",
        "name": "System.Data.Common.gtbhgtilgf.dll",
        "integrity": "sha256-FFqR5kHTHdhsvo7nsvIWcFDkVlkLkZ71gisi97kqQ2k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.dll",
        "name": "System.Data.DataSetExtensions.rj451moana.dll",
        "integrity": "sha256-uaChBMC4llGoXOXL+BHUtkDDlZUAl6oYntAWHzxo5Mo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.dll",
        "name": "System.Diagnostics.Contracts.utc9bb4g9f.dll",
        "integrity": "sha256-zh+FksiM8RzfvPm5kQrUYpkychRfhASqpB08wQRZidw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.dll",
        "name": "System.Diagnostics.Debug.k4elgavd01.dll",
        "integrity": "sha256-PB0sEjKmf5z/Htw3jWOP1CaT/Ahm7/EXv4HxxMpcGXg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.dll",
        "name": "System.Diagnostics.DiagnosticSource.6z9ch61ukr.dll",
        "integrity": "sha256-gtZWz937syxUi9sfDk9X5FChm25tRAZ8BjhnRM5YJGw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.dll",
        "name": "System.Diagnostics.FileVersionInfo.2178iuup45.dll",
        "integrity": "sha256-aoD9t8CGNrezceup7bcD9utk+j6K/qeey7leRS4ANEo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.dll",
        "name": "System.Diagnostics.Process.guefhv2k2p.dll",
        "integrity": "sha256-6KV5mc/qMIFox014MPdkU/KI5xou/yumqrtFhy1i0qQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.dll",
        "name": "System.Diagnostics.StackTrace.vudehhqkqn.dll",
        "integrity": "sha256-p3I98T//d6w/n/0m8wXJ0tKDswnTE3AtVCvp0BdPDQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.dll",
        "name": "System.Diagnostics.TextWriterTraceListener.uany8fi560.dll",
        "integrity": "sha256-dq4hcJvBcooB76ehflhwN28/H94CIHE0YC4nuvz9wXQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.dll",
        "name": "System.Diagnostics.Tools.liuklzitlw.dll",
        "integrity": "sha256-fdhO5t6oXZkLxX4y2RWLXtQsjwSw/uwcq4nhTyrYF0A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.dll",
        "name": "System.Diagnostics.TraceSource.r13vm3hjba.dll",
        "integrity": "sha256-0Uw021KX+DeyqaHNXdkj9vHhO5xrf4B7mdaz0FO29yQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.dll",
        "name": "System.Diagnostics.Tracing.xk24lnzm5s.dll",
        "integrity": "sha256-73iAzR1/0G3zu5GWef1pRC2LezBCPggwf8rdprXOMQA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.dll",
        "name": "System.Drawing.Primitives.s4ntos5y83.dll",
        "integrity": "sha256-XPKZ86K270kcVwujkfgZgecQ5JKMikAykfqreNncBH4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.dll",
        "name": "System.Drawing.nk1qsr8a5j.dll",
        "integrity": "sha256-iY34G/1IqVvKh/UlsghuCiPROJ76+qPK5Wef94Q/G8Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Dynamic.Runtime.dll",
        "name": "System.Dynamic.Runtime.f7h219gjay.dll",
        "integrity": "sha256-m+h8G4YUBuh+VOnGHSjq6Cd/Eeco7Tg3q36owxl+jwA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.dll",
        "name": "System.Formats.Asn1.5qnz2odizc.dll",
        "integrity": "sha256-I6tsIAWkSrzRxrJkiSx+hN4j1aagcB+94o10dDX8FTE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Tar.dll",
        "name": "System.Formats.Tar.vd8kjpi495.dll",
        "integrity": "sha256-jYFLfV5tM06JiQnPUrIr/moa+T3QUkrRSX7vEfTvYrY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Calendars.dll",
        "name": "System.Globalization.Calendars.c31sa1rwf3.dll",
        "integrity": "sha256-iJI4yQeC9hkTmiJOSseb1NP/2fPuclRFWD3ItnPjpmY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Extensions.dll",
        "name": "System.Globalization.Extensions.o6zhjf3fno.dll",
        "integrity": "sha256-oLSi8Evrf6ztni+kerSHsFZ8Rq6NbRQ40z3CjFEFCis=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.dll",
        "name": "System.Globalization.an1tgvh8i2.dll",
        "integrity": "sha256-lqk0bnE0Pzwer0ZUXirbZuxAYsHitmvNpB2C2wGzPks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.dll",
        "name": "System.IO.0gvp8ef1xr.dll",
        "integrity": "sha256-cJuBqsgijdE4UZnxM5Yxh6QDZ3qVspeNnG8vcx4gPDw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.dll",
        "name": "System.IO.Compression.Brotli.cau8xcdqll.dll",
        "integrity": "sha256-VAxzyuZbh6dcR/Besp/rpr2Tt3jNG1FQEwREg0jxKtk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.dll",
        "name": "System.IO.Compression.FileSystem.9cjl9esnav.dll",
        "integrity": "sha256-KXbu0WknwOZDckIfFz7/ogcGUwZw9FZdl12yqYZTpfU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.dll",
        "name": "System.IO.Compression.ZipFile.1ioui22gsb.dll",
        "integrity": "sha256-iZHiNb/CYmU+x1MO5Px5NXr4VQShzsEQv7wAVrE5TAo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.dll",
        "name": "System.IO.Compression.g59gxyq6z9.dll",
        "integrity": "sha256-VDtnLcFu6FMWgFBqOxwT8SGGInd5qV3HvHqhbWK/d+8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.dll",
        "name": "System.IO.FileSystem.3vh2pszn4f.dll",
        "integrity": "sha256-EaBs96f1QJOdASGX+66IODWbu8wM/4sa8eJlOSFYvow=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.dll",
        "name": "System.IO.FileSystem.AccessControl.xx55au0kjp.dll",
        "integrity": "sha256-VS+nYgIa9akxmwwmM0U39L4pAea6IPU3iJ5w4U6gZ8s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.dll",
        "name": "System.IO.FileSystem.DriveInfo.be3s106miy.dll",
        "integrity": "sha256-M4HrwiM0LQRwxpsNcTgmmkt3xY+wwRNSm9rMw9RKh68=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.dll",
        "name": "System.IO.FileSystem.Primitives.kxvv2gf94k.dll",
        "integrity": "sha256-mJpF6lvQoVyMDKDmH80UF78ogh88qNiwDzBgv2qc6J8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.dll",
        "name": "System.IO.FileSystem.Watcher.l4kez5161h.dll",
        "integrity": "sha256-ZSTK4r8akb9k3zxAwSoO31I32i1hF4DOr1kCUSjSrQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.dll",
        "name": "System.IO.IsolatedStorage.6bxqvkrq7g.dll",
        "integrity": "sha256-3lX95C5rsPHs4LuP21RJADk81r5oyCXBvBey9X35m1A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.dll",
        "name": "System.IO.MemoryMappedFiles.vk7bkiewn6.dll",
        "integrity": "sha256-4QhuzHgfIAHW0UD6rck0mMxa2P063tMgkFeq0eW9cDU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.dll",
        "name": "System.IO.Pipelines.51z3im6mmt.dll",
        "integrity": "sha256-GR4o2b8AhO1UOJp/XqHexpFvuJDTxnfKjB3d/3yD/Gs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.dll",
        "name": "System.IO.Pipes.AccessControl.p9uxgg0wmq.dll",
        "integrity": "sha256-g5iNHZpCc9KgPvOGPh6+x1A9zNSHEnwN1YKzDP25kZ8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.dll",
        "name": "System.IO.Pipes.n7fttbc8c2.dll",
        "integrity": "sha256-Q/urgB1woJ54cbuvd+S8HffuGM8x8zTAL29gxMCG0xY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.dll",
        "name": "System.IO.UnmanagedMemoryStream.pis00wgjvy.dll",
        "integrity": "sha256-ny8kRnqmhb2waueDAsOd56dtIjUFl1iRH0vtVzqjtm0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.dll",
        "name": "System.Linq.AsyncEnumerable.zhzxzunt26.dll",
        "integrity": "sha256-9xwKLeA+G1t1Xb/OEC/pY2un65rKuuetA/C1NW7v+0s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.dll",
        "name": "System.Linq.Expressions.qg7usha7c5.dll",
        "integrity": "sha256-SmEyBlh1caYU5nu5vwT8MHZ14dc0PRQQOaVavrofg0Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.dll",
        "name": "System.Linq.Parallel.vd9860rlft.dll",
        "integrity": "sha256-g5c0BCYUvwVRxIHhICbRFK6PE2HSxRr7v6ZIytdCdc4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.dll",
        "name": "System.Linq.Queryable.gbmq6y13a2.dll",
        "integrity": "sha256-fFEy9Fq+f9I3UeKEHM3wyt4XKMX4z3HG1U7LEcxZREA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.dll",
        "name": "System.Linq.e8m20ppr3h.dll",
        "integrity": "sha256-8s7TYWuf2AO6f5wITNgRgafTyMTV3VEgECYCYk7bqsA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.dll",
        "name": "System.Memory.5we0zscdi1.dll",
        "integrity": "sha256-m8GQAv2XkarQnzWOaxhQ6NF21FC8VaUdBO2OfPG6QaE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.dll",
        "name": "System.Net.Http.Json.ygvpatu6lj.dll",
        "integrity": "sha256-kqnxdHbxCq8w7eol5N3XrqXECnLSsXrH/Q/GggM5aZ8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.dll",
        "name": "System.Net.Http.n1xrbf76wm.dll",
        "integrity": "sha256-9ahLevCTfHODIGBN0dSirUe05+LUNc4UcxTtEfGiLKk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.dll",
        "name": "System.Net.HttpListener.lrpkn5zb85.dll",
        "integrity": "sha256-cVrpxuGYdS5EvuKTSho5gZ87tQZVC/9h8oUfe2ukYqo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.dll",
        "name": "System.Net.Mail.xcow6zvry0.dll",
        "integrity": "sha256-USUL1BUhlBM+U51TVIvbiorSTYXwQCX7MY3vY59j75I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.dll",
        "name": "System.Net.NameResolution.0tr5rkvj2x.dll",
        "integrity": "sha256-BJeEJfeY3FYAdfBSdIK9YcGIgLr7lMmbZEGbeFHutqg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.dll",
        "name": "System.Net.NetworkInformation.7y8mqkjgwx.dll",
        "integrity": "sha256-Mc+qJO1dR4ifCOqwQPk6Tdql9LhXcXsS448PzlBMktg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Ping.dll",
        "name": "System.Net.Ping.7nngcnvk4i.dll",
        "integrity": "sha256-TexPVL/zEI/m+yPwEPzfzoPlSDjwXfVWKcv8RiN+jEI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.dll",
        "name": "System.Net.Primitives.2zfn8ur25q.dll",
        "integrity": "sha256-niD9HXO//zhlnhBjAxSUIVrrVw05B5It2DOll+FcR0c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Quic.dll",
        "name": "System.Net.Quic.c5bdshsztn.dll",
        "integrity": "sha256-UIZiVBJOOYahnSksDifhMZIXz3ZqUQEnxfBRiMOx4N0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.dll",
        "name": "System.Net.Requests.h7it4it92x.dll",
        "integrity": "sha256-bR3GutoRTmIgfpeHv2GXIS6uhErbUgK3K9nebV/NKUs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.dll",
        "name": "System.Net.Security.xq66zknnvy.dll",
        "integrity": "sha256-qWozds3uX5lQnV15Mf1zRR69fwqfXxNV6p8LmLRgNyU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.dll",
        "name": "System.Net.ServerSentEvents.n7cs71b0i9.dll",
        "integrity": "sha256-0+dtOPEBfXwC0/RWx7T4KpATPT0hUY9w9TOnuhBPGrg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServicePoint.dll",
        "name": "System.Net.ServicePoint.sbpczqwvto.dll",
        "integrity": "sha256-yImIn6l1fCT+xaeDMg4NvDZhWDJh/f+LZKJYkVgl4Hc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.dll",
        "name": "System.Net.Sockets.dha6tf8ylv.dll",
        "integrity": "sha256-b6yGINYYxuvd+GmYbhkz5NV9HbnijXKA4E0T3t2T6Rc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.dll",
        "name": "System.Net.WebClient.3p171axjw4.dll",
        "integrity": "sha256-qSIn8vHACYq5j/F+iBMLe5dNPIF8y9CMIrEfn+HkpEM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.dll",
        "name": "System.Net.WebHeaderCollection.viezrfvw9s.dll",
        "integrity": "sha256-R7vgKAKn8I0Y4HXD0VUPq9iBs1TanD4TdW9+gaUZW2s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.dll",
        "name": "System.Net.WebProxy.8e9ifevpoi.dll",
        "integrity": "sha256-8Gi2joizGFGNciaRgewWig22HMQ/LqrbjQ0HLct7DDw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.dll",
        "name": "System.Net.WebSockets.Client.cy461w5gs0.dll",
        "integrity": "sha256-lM/9Sd0VtC5Rl44yg57OI2Laj2lZ1B2i9rhmWXvRdXU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.dll",
        "name": "System.Net.WebSockets.cwcvgkig9p.dll",
        "integrity": "sha256-9KwqhwEdVHu/U8ptsAEwE4Es0k82D3o3vQTnhrncTgs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.dll",
        "name": "System.Net.xin17v3n38.dll",
        "integrity": "sha256-p5+ZL9vMugy97jyLTq53DwOeQw3RzBLulnsFuViNVVw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.dll",
        "name": "System.Numerics.88vbb1gq2u.dll",
        "integrity": "sha256-KH71sAOCpNCAc0BffpZ/lZThaFjrqWw+/AcBoJJAvUQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.dll",
        "name": "System.Numerics.Vectors.ngkqwkeylg.dll",
        "integrity": "sha256-6cWHi4/1MIDSb3ujMBvDleEyRC+4edQZyLO37xA3gg0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.dll",
        "name": "System.ObjectModel.5aa8l8nwnj.dll",
        "integrity": "sha256-DavKDDevDRw1T9an+G72+4kabf3LWPfsNZzixVBQBfI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.dll",
        "name": "System.Private.DataContractSerialization.inemxy71xz.dll",
        "integrity": "sha256-UtMjHvIxjo2kAbgn9QKe94heF92eO//W+sGweOwDxcM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.dll",
        "name": "System.Private.Uri.sxm8ukc65c.dll",
        "integrity": "sha256-IBRLbxN4VVlr1LEYtNQ2NgJuXDX1X5tiTBmaVgUL37U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.dll",
        "name": "System.Private.Xml.1chrqonk2p.dll",
        "integrity": "sha256-gbo6/zkvicU/JsKhMCfdDLu3KXowPHDcbtvsxNgojEw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.dll",
        "name": "System.Private.Xml.Linq.207oo2qvy4.dll",
        "integrity": "sha256-cvlAQYUqWK09uFTOlfQ9bxV8jD3tu0rqoLO3NnUV2uU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.dll",
        "name": "System.Reflection.DispatchProxy.l0v2rxhao7.dll",
        "integrity": "sha256-hbjXUZdPbsp1iE/tjcFbT5b4ho6TaQwySDwA1/HpkEU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.dll",
        "name": "System.Reflection.Emit.0rcorim6et.dll",
        "integrity": "sha256-jLnnoPOA1IoM4juV33ZDTV74nnZXR7AioX7NYLIdIkg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.dll",
        "name": "System.Reflection.Emit.ILGeneration.0wt32nv17p.dll",
        "integrity": "sha256-EOjWvJ3m7uJQF+VJW2ZvcUnjx1wxTIY63cFxbzfZsWw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.dll",
        "name": "System.Reflection.Emit.Lightweight.2j09eudyfq.dll",
        "integrity": "sha256-Ej8UvLf4QsWTLDTTN74eypBHsl49KmvXfsqr7GX7XQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Extensions.dll",
        "name": "System.Reflection.Extensions.fqghgrqox3.dll",
        "integrity": "sha256-92rg7S8YUgwL8oEKwFahL7/hE1ryi6MSLflVeD8T+TM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.dll",
        "name": "System.Reflection.Metadata.3hmv1s76ov.dll",
        "integrity": "sha256-efvih3swtlfB4zWZ7CAu8KSwAMrBCg2FE2k1ICkriW4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.dll",
        "name": "System.Reflection.Primitives.fyy1pljmcg.dll",
        "integrity": "sha256-N0RlCSYpGC9YrbpgjBaesiLyVX+vfMGYh0QO93WjfDM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.dll",
        "name": "System.Reflection.TypeExtensions.qzj6u5154o.dll",
        "integrity": "sha256-SvMK7yDHoGfcnMaMPBsc9X1i/WjNOp5vnNKTjnicJ/4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.dll",
        "name": "System.Reflection.okg3vj4kph.dll",
        "integrity": "sha256-WJ7C1b1z4tmnv6i5cX1vcGBfy0/NdNojV9lGi0aaxg4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Reader.dll",
        "name": "System.Resources.Reader.egk4pv9qks.dll",
        "integrity": "sha256-juWbK9NOtKMlRwV1ttNa6ZlolkdUeVzl7DgmXJodRdU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.dll",
        "name": "System.Resources.ResourceManager.zrghbkmpe7.dll",
        "integrity": "sha256-L8qUfiPZS1tFhaHf1Ful5SQEaQo696I1ivUYS0EOigg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Writer.dll",
        "name": "System.Resources.Writer.kr42gcsocn.dll",
        "integrity": "sha256-YPvA7NrGl9jEM2/Wtol1HgeflZ2TwMth8eEbQWg1+VE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.dll",
        "name": "System.Runtime.CompilerServices.Unsafe.c23zrbxkf4.dll",
        "integrity": "sha256-RBG/GZkSOAU0J60FuOaz8R0CzkslIOvWz71M4ouea6o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.dll",
        "name": "System.Runtime.CompilerServices.VisualC.4fue4xfgnv.dll",
        "integrity": "sha256-gCkJo1sTqjJlQpn6soWJw9PPHvfpMEYoC5bLXwCx/18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.dll",
        "name": "System.Runtime.Extensions.zy4hyhty2e.dll",
        "integrity": "sha256-lTYEAmHjPrnR+evu6R5g3bfysb7tDsaZb4KzL1LHsng=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Handles.dll",
        "name": "System.Runtime.Handles.pd9jfret52.dll",
        "integrity": "sha256-PZFqyAC2wRYEUMlKIe6baSb9fP1FmmFoHS8jtSUH0AM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.dll",
        "name": "System.Runtime.InteropServices.07h0zgh4sy.dll",
        "integrity": "sha256-9FXXq3WOh9+gMY6GnbLJVuUC/7qwSLbvPZjv8dGOsns=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.dll",
        "name": "System.Runtime.InteropServices.RuntimeInformation.5pj3je91i0.dll",
        "integrity": "sha256-eUHWbgTZ0HI+9FwV3D/L6fOLCzl021fhLLTzci+/zWQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.dll",
        "name": "System.Runtime.Intrinsics.6d2ub0oirk.dll",
        "integrity": "sha256-elKEEX7ajPVne8QIK2TXR+wlNqHgnO9PULq1ksRZc2k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.dll",
        "name": "System.Runtime.Loader.ehj7ewci0y.dll",
        "integrity": "sha256-nhMSlhC8cXXGj3L4BxOUoum21/5LPEXvJLYADe/InIA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.dll",
        "name": "System.Runtime.Numerics.34s1a9cgm3.dll",
        "integrity": "sha256-kxJsgyKKSyxD1jjXAsKY1NqA3x0W7oqkhYZgMgLQHxY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.dll",
        "name": "System.Runtime.Serialization.Formatters.6tinnczjhy.dll",
        "integrity": "sha256-BirrYqYc3wfPFyyDQfNPVfYCfw57dlSvrxwmFABtU1o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.dll",
        "name": "System.Runtime.Serialization.Json.jlt96d8b8n.dll",
        "integrity": "sha256-6adLRWfRX/rCeVDfnZ8TQH3+M6QH4dxKOntp73ilBwA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.dll",
        "name": "System.Runtime.Serialization.Primitives.sw1iqh3ei9.dll",
        "integrity": "sha256-1DdZzb0fLJSYpk6hDRgj8OleOb/sQw17rc7TMt+99d8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.dll",
        "name": "System.Runtime.Serialization.Xml.4ko7yuomgj.dll",
        "integrity": "sha256-7O3k3yUiOJ6Np5ws6FEX+h3fSfKByxIdgELU/PZiK7c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.dll",
        "name": "System.Runtime.Serialization.b6ybfc7s7t.dll",
        "integrity": "sha256-Pe8jMBSkhuHGPGcLNbnqyOGmYbOKEn8T8AMbq+sAANc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.dll",
        "name": "System.Runtime.mx8otvo6b5.dll",
        "integrity": "sha256-OlygNP3IfQMGqRW87muuX4tjiSbreK56cvF434vNeo8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.dll",
        "name": "System.Security.AccessControl.xc14sih8ri.dll",
        "integrity": "sha256-4RO1ABbiXW4YgBQhAHIZ9pYcOJx+WrySZSQH3DDGB4M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.dll",
        "name": "System.Security.Claims.zgew77bwui.dll",
        "integrity": "sha256-vVtHEe+uVPXdNmA9WdwnbAk6ZBeVW0FsjnnpqSW2vaA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.dll",
        "name": "System.Security.Cryptography.Algorithms.62ohnjyvbs.dll",
        "integrity": "sha256-DheJXh059kNlMPtkfKlLJBu+x/ULyBqmRvsumwdFc6Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.dll",
        "name": "System.Security.Cryptography.Cng.g3e49b884b.dll",
        "integrity": "sha256-XFXJORK5u9ZLcixNrkIiOInoN6xM/BrQ1fsLruF4yfI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.dll",
        "name": "System.Security.Cryptography.Csp.5xdwcoldrc.dll",
        "integrity": "sha256-h3UFqXUjPNTZbsuqeL2KNehhFI4bkWP2zR1qwrbDRMY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.dll",
        "name": "System.Security.Cryptography.Encoding.u6eg57e2wa.dll",
        "integrity": "sha256-KlPymAkMD2as46rBmlBZWJTzjJ32pNOezs5aZFjf2Us=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.dll",
        "name": "System.Security.Cryptography.OpenSsl.1kodbcysvm.dll",
        "integrity": "sha256-kXhZFxLxkDo8RGnkXr3KOMXlh49j/KNc7SiOjX5F9Xw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.dll",
        "name": "System.Security.Cryptography.Primitives.pb3x60ef9j.dll",
        "integrity": "sha256-FfUO+tXHSvt7eKuvQLqAt41X0fX1oLNPJtPSaQyJF+0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.dll",
        "name": "System.Security.Cryptography.X509Certificates.6tzdhrg55j.dll",
        "integrity": "sha256-ijNmSkN1HRk/rnsC4SMYQenx3GCInOkJE3A/q/b8E0w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.dll",
        "name": "System.Security.Cryptography.y6cz1ia1ua.dll",
        "integrity": "sha256-hs5C5D8dVYnSF59USoR0JQH4zFjdO0F+7N5wb+vLYFQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.dll",
        "name": "System.Security.Principal.Windows.5ni2kj7ulu.dll",
        "integrity": "sha256-H4XhOiPZNLvb1Xxdvbw+WGNCA0kKq3d6Zmfuen+HfjE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.dll",
        "name": "System.Security.Principal.iawtwdiv86.dll",
        "integrity": "sha256-upwM9ktl5UofuIZF7HMuLilCtJlyO2gjJHvdn675DZE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.SecureString.dll",
        "name": "System.Security.SecureString.dwzl29zu9b.dll",
        "integrity": "sha256-/V4SoPXZ+llAMfqICOueb79ejLPzMp5G2KcpTNDF5/A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.dll",
        "name": "System.Security.wethbwj7kv.dll",
        "integrity": "sha256-KApd2tLhGQkJ37Tr0YTenQPTm5kZK17tLFvVDPBmauQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Web.dll",
        "name": "System.ServiceModel.Web.zoh5elya9w.dll",
        "integrity": "sha256-LTWOXgowd/W5lcYwUopnIWbSUDR1tUVAsFL9HSZMRc0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.dll",
        "name": "System.ServiceProcess.pptor4xr6f.dll",
        "integrity": "sha256-bQdErzi/PkRgdLnBOKf5MC64iuvLEuSscXloRkTdd4E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.dll",
        "name": "System.Text.Encoding.1w1jrdd342.dll",
        "integrity": "sha256-r5CpKAxNg5K0DcESIX8DhEt+/1cL70WatmMJh0euZIg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.dll",
        "name": "System.Text.Encoding.CodePages.5m9450cbc5.dll",
        "integrity": "sha256-U1HrDGm/xO6FY62scfqNtV++TdXW7Hkw8r4SpYe8Z38=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.dll",
        "name": "System.Text.Encoding.Extensions.11qmdva6xc.dll",
        "integrity": "sha256-RVY0971ebAkjr6hTdsA9kAKY/4I/g4Seb+0F6+Ger00=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.dll",
        "name": "System.Text.Encodings.Web.zbffgb2tja.dll",
        "integrity": "sha256-oYhPmrk14knJfG/thn6hurTlIsBA7OPAJ0CqIA3ATzI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.dll",
        "name": "System.Text.Json.zvpl7cjb41.dll",
        "integrity": "sha256-T301eSRAI4hSkisnRxkYHi1WGRZk7FKFj4z8yBM2T/E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.dll",
        "name": "System.Text.RegularExpressions.n7gp6l96lp.dll",
        "integrity": "sha256-rZfumBQLLo+d563cEXHuT+hnSm/x2+82/Awl3X0FMQw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.dll",
        "name": "System.Threading.7w3yl5dpru.dll",
        "integrity": "sha256-yT59csTingb6i0XzvYCs2s4OnJBiSK82vhwItenHHg4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.AccessControl.dll",
        "name": "System.Threading.AccessControl.80nswrhfx3.dll",
        "integrity": "sha256-iGAlqqpyVZ7dEt9/0K+LVNrwquwkBuZhy8LXUDkQlV0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.dll",
        "name": "System.Threading.Channels.z9899xdph0.dll",
        "integrity": "sha256-2ZDKnZaNCFmsQzQ9hsyUVKHGWnhe4TlmJlcN9J8Q69E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.dll",
        "name": "System.Threading.Overlapped.yr0kxqrdv9.dll",
        "integrity": "sha256-7pmTAtAaTpROBD2zBcqM/041MnprpSrSoQuLny9JL2k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.dll",
        "name": "System.Threading.Tasks.Dataflow.kbu90q3wq3.dll",
        "integrity": "sha256-QCZJXi2SjJ39EKY8tat9Vgl/U9eGWAf5I5dALwriBdE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.dll",
        "name": "System.Threading.Tasks.Extensions.bfrs7kjk0q.dll",
        "integrity": "sha256-1+DPBMRUgXVuhuWPpwhA46UxMlmJ+UN9ic0rZ9H/SNg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.dll",
        "name": "System.Threading.Tasks.Parallel.lgfjx7phom.dll",
        "integrity": "sha256-+x2PTYj+K3v9lr55LRpziyi2kiQr+Lg2P8+jd+eT+Zo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.dll",
        "name": "System.Threading.Tasks.kcme06cx7j.dll",
        "integrity": "sha256-XL8HLcjjZJrbEij3CJVCM3/PnkrBuw2YiXdC7mxWeig=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.dll",
        "name": "System.Threading.Thread.kb88hr05ne.dll",
        "integrity": "sha256-IBkvcKyzVdcgkS8bwhcW2FCqWrtu0NLDvUjnOi41lyQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.dll",
        "name": "System.Threading.ThreadPool.dgihp26x2i.dll",
        "integrity": "sha256-U+dyxORQ3gXCSK1cL4pYKb0oUXVjaxpsYDbCb843B2U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Timer.dll",
        "name": "System.Threading.Timer.kdm10220gn.dll",
        "integrity": "sha256-eHCfFmX8rznY+5m5YlqpLn6cT3E5rQYoKPPMSxgqn5Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.dll",
        "name": "System.Transactions.0t033zgozd.dll",
        "integrity": "sha256-LIruI7flW5S/bmyan0VZL28or4YuNa7V+9Z0g5TBKRI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.dll",
        "name": "System.Transactions.Local.x1bj4pj5gv.dll",
        "integrity": "sha256-tbZ/OK59IZA0xQns/CzXOmhMSHA1YQpxtp/CVGzwIwQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ValueTuple.dll",
        "name": "System.ValueTuple.3zty9p5950.dll",
        "integrity": "sha256-PwlaKi9gxvdCJTC4IRbemEFyDpScAzGn6JkvwHQ7s8w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.dll",
        "name": "System.Web.8dlq57u23x.dll",
        "integrity": "sha256-VBCL0+XqNzvcHcvrFQiDHt+D1V2crF8gXIO9omFnIIY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.dll",
        "name": "System.Web.HttpUtility.0zpsne972q.dll",
        "integrity": "sha256-fDGsyRKhYSU7J7gxasp/dbQjNAmXNo3Zc9Ba6PYdxs8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Windows.dll",
        "name": "System.Windows.70449jc91e.dll",
        "integrity": "sha256-uT3OEsjBOaWaVopg+YFSdW18J52JU83RZuNi6HsVLTE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.dll",
        "name": "System.Xml.Linq.oijph4pt48.dll",
        "integrity": "sha256-8L9VWK5VOwqANWgwNd9Em/bBxk2efqUQZVlDGCIHVsM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.dll",
        "name": "System.Xml.ReaderWriter.oulv6c4vkw.dll",
        "integrity": "sha256-YPZ5GlGtjRZgNpHda3JRMf16sMqfbhhl5H7k3cm74oI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Serialization.dll",
        "name": "System.Xml.Serialization.vc4fqa6ifd.dll",
        "integrity": "sha256-z2VtywS9q70QvxHUvGv7+T+ZawF9O0kd9epn0SN9Ilk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.dll",
        "name": "System.Xml.XDocument.ie81s3aumg.dll",
        "integrity": "sha256-yoh2qGO2aNlwwTSDHPs2lvCboC555y8d7nlt+XgLUxc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.dll",
        "name": "System.Xml.XPath.XDocument.ik7rfnl6je.dll",
        "integrity": "sha256-Elpl88qSnZtJEDq0pIPJc6cBeizf0xywYCr0fKQew7g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.dll",
        "name": "System.Xml.XPath.sd5w6d57wv.dll",
        "integrity": "sha256-QA3mzuKJEc9uzMrm8zfhPubTEes5fMJwVgAKlpvoZnY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlDocument.dll",
        "name": "System.Xml.XmlDocument.denemd2cbk.dll",
        "integrity": "sha256-C0gzN0HA0Z+J0oS23zWD/Psz7NvkKfN1H1Mi5w2LuIE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.dll",
        "name": "System.Xml.XmlSerializer.3i1h6b5zhp.dll",
        "integrity": "sha256-Jfwx2SjM0efTU61A0dkPWJ4NOzzVUm+Ubu5RzlEbgUY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.dll",
        "name": "System.Xml.cne75dsyff.dll",
        "integrity": "sha256-GAH7EJH1yU3T3QNHJnJnVLcRsF+wzwSwd8wnfqYKHu0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.dll",
        "name": "System.x9jf076cl6.dll",
        "integrity": "sha256-Vevn/rB8AytJZXZOUcKIRAaFpFLqVHPFzIfA07ZkBVE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "WindowsBase.dll",
        "name": "WindowsBase.eu83zxsg3n.dll",
        "integrity": "sha256-hjaLrAJUtPx0Ohi486zQnJzNNaNi5W1Di/5YeiOnJf8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.dll",
        "name": "mscorlib.wo3144799w.dll",
        "integrity": "sha256-8IxULgWQhAAe5+HFAhF3AgVq1iREYcxVyD3bQQA8Qac=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.dll",
        "name": "netstandard.vbsl6ruxok.dll",
        "integrity": "sha256-q7RKdYgrXv4YO3k0ZLLlg8fP+dcip1DS/PM+1YnS28Y=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.g5wy09fo8b.dll",
          "integrity": "sha256-vHTbbkpM2kycWwUjHsT9LvK15O38jR5wci7JakU1nK0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.65n57obgrc.dll",
          "integrity": "sha256-loQUBqj//cfk+CBIk561GT0OU0VBGTaKToJmvd3+3qM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.lod3jadc6o.dll",
          "integrity": "sha256-+2ynljycHBiAw0lH3jAYwbsCJSohQ78lUfqUYzrGpeU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.uaw4s2y3o9.dll",
          "integrity": "sha256-hkC9Bad9Axw+EGuYo2jk9RYY4qrPECf54OKLJgmXg58=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.lyt1hyqtz6.dll",
          "integrity": "sha256-E1lhD7dHj7HdtLvQWeBBIML1xcWeHzhX4X2N0S1Wn8U=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.mugvdr7vzl.dll",
          "integrity": "sha256-8u8SquSv90ntWWMHXahqqP097EOJDl/XsAvCJ9qtKLY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.ipm7fif8t9.dll",
          "integrity": "sha256-SqrlI30USrH/Qrxrj9mAZodiWOiA4aeG3mlUcj2FOGY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.s6i2e8yg8z.dll",
          "integrity": "sha256-lNZ1f7OdY3QIyuAFaXeaWO1bqRz+F0hLfZw3teaG6oU=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.qua00i8v0p.dll",
          "integrity": "sha256-DgFaVKURSBWrQgIZsmwGD8ze7aNrYy+Z2chSerpE0gA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.yjbpb7yvrf.dll",
          "integrity": "sha256-vk3H9dK2wHRgHUrPFAQ1D61AGW2O2wpOPQTVnqPdUw0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.31t5emkiqc.dll",
          "integrity": "sha256-N8gc6yLprk1BMlHkP/gWkgg6FzpdcmLdv/r2ZQIY4TU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.rb8tohm9ix.dll",
          "integrity": "sha256-mZQNGHEFSuW72DHZP4J78/Rs+sE+xjfWML5EkM6A5Tc=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.ektdxdgpt6.dll",
          "integrity": "sha256-7iss2LdKMGEZ4Qjua4YW5boUeC4GMphsjzriMXsAH20=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.r8p0pz3mcg.dll",
          "integrity": "sha256-y1SoV559haF+CLtysaZ1Jk7pL1GwCh1emjuINn2oXvk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.99w7rlxv5d.dll",
          "integrity": "sha256-8yFzbw3AzJDCFq5pu6MUN8cWJmnFfFuJOiTUhqpxids=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.0ktb2aauzh.dll",
          "integrity": "sha256-YDTv+4IWTEMDDwRSQAtTfYlVsemoS3rnbl96H3/s9yg=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.tyaz3pzecg.dll",
          "integrity": "sha256-u0Yd1Q3htc7bGtWPYB4yta/SZ0Kb6glx+rzeSl8gJZ4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.gy90yiqytk.dll",
          "integrity": "sha256-aDyAi+nv1sh85qfeBtf8jfFSMk2z1yvc/84gmjgqda4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.yzh871k4wa.dll",
          "integrity": "sha256-HlgCnPdBIHBbWU1BfGneFuDWVewr8DToglol5T8iiQ4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.5bkwbd06ms.dll",
          "integrity": "sha256-0e12/SP6w+A7py67ZrEp99wncc352LpEGy3UBG3Mt2k=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.7pl4yklo3u.dll",
          "integrity": "sha256-JTdzCtEP13q2ys/GPBtLF8k0Pm699wTSRhJyRCjW1cc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.3gyziivzwi.dll",
          "integrity": "sha256-3dwbXkpUkmmeZlltU5jjunrv8MGkQXuu3lpE+EGfiWc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.bqublycray.dll",
          "integrity": "sha256-U+1jLTP6Tk8KtHebDUPlDo9hThzjSTC10es/EDxSfsA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.mol16k8uj8.dll",
          "integrity": "sha256-Brr2iu7uju1qbW6M6QNu8+3P6xLeh2WD7duOrsYNsrs=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.6gdb6vs3r3.dll",
          "integrity": "sha256-KsX8Xe0lH2+HbxEhzpXOZ2Ps2bAsCSYmLBF1mnUUn0U=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.f1xugstzjv.dll",
          "integrity": "sha256-PW3vtc4H/RfLAMpWM+V6OmXlq3lncy1QavGhbgnwuqA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.gswzf7dpuw.dll",
          "integrity": "sha256-QHTV5IhzOUKCIkaI/dpXRdraDJmZuiA1zmdbK7F+nI8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.fw35399350.dll",
          "integrity": "sha256-AWb4DxpV2UfKQVHLcPNvDOrTn60fz2SOviQZw94flTg=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.8fuyjox7fg.dll",
          "integrity": "sha256-fA59UlJmEj3PbHtnMIqzY1A1mBHIpNi9+jb9oH3xpic=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.hyhfwwxee9.dll",
          "integrity": "sha256-qTh+wxVxOn4yhhQlFZlUk55hObbe4XH+t4WyfR0xyoU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.jilt6ptxst.dll",
          "integrity": "sha256-1RMcABEFvCvDpii5+puVvYNZxS/KLX/i3X5CfMHdqkM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.cj4c4ixvth.dll",
          "integrity": "sha256-+H0qSV2JGGhpbiTHJdLEgHeXV99+O9IrxmrpJyKPGBo=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.foaiw7egnb.dll",
          "integrity": "sha256-j4JVBBQwWoEphCJBs8NCJ/C46MvP2VBtk2blnQ30Mu8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.n8jd7qpyqv.dll",
          "integrity": "sha256-p8HEMHrDS+ERY59a3foXKXJf53SHA/8krdVdS9o1hRs=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.kf29xlao1o.dll",
          "integrity": "sha256-kEmhU2fEYgUbTZsp10LbIbnXwW1NCYM+5aTGqgXXqs0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.loi83chxrs.dll",
          "integrity": "sha256-lfNz9wVawDQsKhFnEGiAFeo6ZizBm4qmbFSEQJqkk2k=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.e3q2sbmlnu.dll",
          "integrity": "sha256-mjgKmTMBtl9oZwwHS59A6QL9BbzQ34haZrwxJGKVwQ8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.9mo5t2764o.dll",
          "integrity": "sha256-4YDzUNazihlGQEXCsfDD5AnTA4Q+AjIbi/z2HQYW1RM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.u6xpw84ici.dll",
          "integrity": "sha256-RnQ89MYDOchgJ6DS7vNS0Fw1hyOyuyNISRR0rWsy9LY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.0de2ycv0p6.dll",
          "integrity": "sha256-NLd8I2JRYLNACYszBFmXE4/wQsqH/M+Q+b+rnesTL4o=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.pn0xjym4q0.dll",
          "integrity": "sha256-a2NJGUd0iY/S6tSik+mGb3KpzdeXi7d53Nw5aJbxgdM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.dohn0e7vu8.dll",
          "integrity": "sha256-wx75DzIFdVuse1McktLOeQ94lQo2D0OIViIlk+vdx4Q=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.su6mi0o6wu.dll",
          "integrity": "sha256-zOHb6hHtdfnWJ4AoDdqQxhRdb/VdW53oclWU1bwIKQE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.mrlcqinieo.dll",
          "integrity": "sha256-MssrAPZGCqo3KTCyWtx3Jwnp2T6pg6bKKV/1vBxrdHI=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.1xbgrl853s.dll",
          "integrity": "sha256-Vc/R10GBWMIJKnmFdVW9FRN5c8UfAbEUtBSR4Qv/d24=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.ktyctd8wsg.dll",
          "integrity": "sha256-uLPIo5FDQg3+yy9k5Ru1NhP1VPGEeiMkXo7dQCo8ybE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.7wq4q33v2d.dll",
          "integrity": "sha256-2WgVIP4wolnk8A5YCHr1p1xsXV6bmkYxEjrNFnDpGhc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.vzxryhoc3g.dll",
          "integrity": "sha256-JVWIPw/u/kSRdV43/rbLA+ddJEiogIEnC18kD1Zz6NA=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.Scripting.resources.iz0ki7u683.dll",
          "integrity": "sha256-/m+TeLM3w/YrGZPEWGp7ZiUqlsnCkuCVb10cMM1JXpo=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.CSharp.resources.dll",
          "name": "Microsoft.CodeAnalysis.CSharp.resources.7uupalq6ag.dll",
          "integrity": "sha256-oblWPgsW2jr6G7gFFLs9kygiCLmsFNSvqaQpNpp9iaA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.Scripting.resources.dll",
          "name": "Microsoft.CodeAnalysis.Scripting.resources.7ptk5a5xoh.dll",
          "integrity": "sha256-W/C2TmDrfiEGajGsX/8BiDky+6aXTqGaORSpYQZNZhw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "Microsoft.CodeAnalysis.resources.dll",
          "name": "Microsoft.CodeAnalysis.resources.oobcinzg1t.dll",
          "integrity": "sha256-2PscfXE1Yg2dWsMwzJf6zokSzQr91Txy69eHXTU0tVk=",
          "cache": "force-cache"
        }
      ]
    },
    "libraryInitializers": [
      {
        "name": "_content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.99zm1jdh75.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../_content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.99zm1jdh75.lib.module.js"
      }
    ]
  },
  "debugLevel": 0,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
