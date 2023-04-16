var p=Object.defineProperty;var g=(s,t,e)=>t in s?p(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var h=(s,t,e)=>(g(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();class Dom{constructor(t){this.$el=typeof t=="string"?document.querySelector(t):t}get dataset(){return this.$el.dataset}get value(){return this.$el.value}id(t){if(t){const e=this.id().split(":");return{row:Number(e[0]),col:Number(e[1])}}return this.$el.dataset.id}html(t){return typeof t=="string"?(this.$el.innerHTML=t,this):this.$el.outerHTMl.trim()}clear(){return this.html(""),this}on(t,e){this.$el.addEventListener(t,e)}off(t,e){this.$el.removeEventListener(t,e)}append(t){return t instanceof Dom&&(t=t.$el),Element.prototype.append?this.$el.append(t):this.$el.appendChild(t),this}text(t){return t?(this.$el.textContent=t,this):this.$el.textContent}closest(t){return $(this.$el.closest(t))}getCoords(){return this.$el.getBoundingClientRect()}find(t){return $(this.$el.querySelector(t))}findAll(t){return this.$el.querySelectorAll(t)}focus(){return this.$el.focus(),this}attr(t,e){return e?(this.$el.setAttribute(t,e),this):this.$el.getAttribute(t)}addClass(t){return this.$el.classList.add(t),this}removeClass(t){return this.$el.classList.remove(t),this}toggleClass(t){return this.$el.classList.toggle(t),this}isHasClass(t){return this.$el.classList.contains(t)}addClasses(...t){return t.length>0&&t.forEach(e=>this.$el.classList.add(e)),this}css(t={}){return Object.keys(t).length>0&&Object.entries(t).map(([e,r])=>this.$el.style[e]=r),this}getStyles(t=[]){return t.reduce((e,r)=>(e[r]=this.$el.style[r],e),{})}}function $(s){return new Dom(s)}$.create=(s,...t)=>{const e=document.createElement(s);return t.length>0&&t.forEach(r=>{e.classList.add(r)}),$(e)};class ActiveRoute{static get path(){return window.location.hash.slice(1)}static get pathname(){return window.location.pathname}static get param(){return ActiveRoute.path.split("/")[1]}static goTo(t){window.location.href=t}}class Router{constructor(t,e){if(!t)throw new Error("Selector is not provided in ROUTER");this.$placeholder=$(t),this.routes=e,this.changePageHandler=this.changePageHandler.bind(this),this.currentPage=null,this.init()}init(){window.addEventListener("hashchange",this.changePageHandler),this.changePageHandler()}changePageHandler(){if(this.page&&this.page.destroy(),this.$placeholder.clear(""),ActiveRoute.path.includes("excel")){const t=this.routes.excel;this.page=new t(ActiveRoute.param),this.$placeholder.append(this.page.getRoot())}else{const t=this.routes.dashboard;this.page=new t,this.$placeholder.append(this.page.getRoot())}this.page.afterRender()}destroy(){window.removeEventListener("hashchange",this.changePageHandler)}}const generateDocuments=s=>s.length===0?"<p>Записей нет</p>":s.map(t=>{const e=JSON.parse(localStorage.getItem(t));return`
		<li class="db__record">
			<a href="#excel/${t.split(":")[1]}">${e.tableName}</a>
			<strong>
				${new Date(e.lastUpdate).toLocaleDateString()}
				${new Date(e.lastUpdate).toLocaleTimeString()}
			</strong>
		</li>
		`}),createRecordsTable=()=>`
		<div class="db__table db__view">
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия</span>
		</div>
		<ul class="db__list">

			${generateDocuments(getAllkeys())}
		</ul>
		</div>
		`,generateDashboardTemplate=()=>`
		<div class="db__header">
			<h1>Excel Dashboard</h1>
		</div>

		<div class="db__new">
	 	<div class="db__view">
			<a href="#excel/${Date.now().toString()}" class="db__create">
		  		Новая <br /> Таблица
			</a>
		</div>
   		</div>

		${createRecordsTable()}
		`,getAllkeys=()=>{const s=[];for(let t=0;t<localStorage.length;t++){const e=localStorage.key(t);e.includes("excel")&&s.push(e)}return s};class Page{constructor(t){this.params=t}getRoot(){throw new Error("GetRoot method should be implemented")}afterRender(){}destroy(){}}class DashboardPage extends Page{getRoot(){return $.create("div","db").html(generateDashboardTemplate())}}const toolBarButton=({isActive:s,icon:t,value:e})=>{const r=`
		data-type="button"
		data-value=${JSON.stringify(e)} 
		`;return`
		<div 
			${r}
			class="button ${s?"active":""}"
		>
			<i ${r} class="material-icons">${t}</i>
		</div>
		`},generateToolBarTemplate=s=>[{icon:"format_align_left",isActive:s.textAlign==="left",value:{textAlign:s.textAlign==="left"?"center":"left"}},{icon:"format_align_center",isActive:s.textAlign==="center",value:{textAlign:s.textAlign==="center"?"left":"center"}},{icon:"format_align_right",isActive:s.textAlign==="right",value:{textAlign:s.textAlign==="right"?"left":"right"}},{icon:"format_bold",isActive:s.fontWeight==="bold",value:{fontWeight:s.fontWeight==="bold"?"normal":"bold"}},{icon:"format_italic",isActive:s.fontStyle==="italic",value:{fontStyle:s.fontStyle==="italic"?"normal":"italic"}},{icon:"format_underlined",isActive:s.textDecoration==="underline",value:{textDecoration:s.textDecoration==="underline"?"none":"underline"}}].map(toolBarButton).join(""),capitalizeFirstChar=s=>typeof s!="string"?"":s.charAt(0).toUpperCase()+s.slice(1),getMethodName=s=>`on${capitalizeFirstChar(s)}`,storage=(s,t=null)=>{if(!t)return JSON.parse(localStorage.getItem(s));localStorage.setItem(s,JSON.stringify(t))},isEqual=(s,t)=>typeof s=="object"&&typeof t=="object"?JSON.stringify(s)===JSON.stringify(t):s===t,camelToDash=s=>s.replace(/[A-Z]/g,"-$&").toLowerCase(),toInlineStyle=(s={})=>Object.keys(s).map(t=>`${camelToDash(t)}: ${s[t]};`).join(" "),debounce=(s,t)=>{let e;return(...r)=>{const o=()=>{clearTimeout(e),s(...r)};clearTimeout(e),e=setTimeout(o,t)}};class DOMListener{constructor(t,e=[]){if(!t)throw new Error("No root element provided for DomListener");this.$root=t,this.listeners=e}initDOMListeners(){this.listeners.forEach(t=>{const e=getMethodName(t);if(!this[e])throw new Error(`Method with name ${e} is not implemented in ${this.name} Component`);this[e]=this[e].bind(this),this.$root.on(t,this[e])})}removeDOMListeners(){this.listeners.forEach(t=>{const e=getMethodName(t);this.$root.off(t,this[e])})}}class AbstractStatelessComponent extends DOMListener{constructor(t,e={}){super(t,e.listeners),this.name=e.name||"",this.observer=e.observer,this.store=e.store,this.subOnStore=e.subOnStore||[],this.unsubList=[],this.prepare()}$dispatch(t){this.store.dispatch(t)}$getState(){return this.store.getState()}storeChanged(){}isWatching(t){return this.subOnStore.includes(t)}$emit(t,...e){this.observer.emit(t,e)}$subscribe(t,e){const r=this.observer.subscribe(t,e);this.unsubList.push(r)}prepare(){}toHtml(){return""}init(){this.initDOMListeners()}destroy(){this.removeDOMListeners(),this.unsubList.forEach(t=>t())}}class AbstractComponentWithState extends AbstractStatelessComponent{constructor(...t){super(...t)}get template(){return JSON.stringify(this.state,null,2)}initState(t={}){this.state={...t}}setState(t){this.state={...this.state,...t},this.$root.html(this.template)}}const defaultStyle={textAlign:"left",fontWeight:"normal",textDecoration:"none",fontStyle:"normal"},defaultTableName="new Table";class Toolbar extends AbstractComponentWithState{constructor(t,e){super(t,{name:"Toolbar",listeners:["click"],subOnStore:["currentStyleCell"],...e})}prepare(){this.initState(defaultStyle)}get template(){return generateToolBarTemplate(this.state)}onClick(t){const e=$(t.target);if(e.dataset.type==="button"){const r=JSON.parse(e.dataset.value);this.$emit("toolbar:applyStyle",r)}}toHtml(){return this.template}storeChanged(t){this.setState(t.currentStyleCell)}}h(Toolbar,"className","excel__toolbar");const parseCell=(value="")=>{if(typeof value=="string"){if(value.startsWith("="))try{return eval(value.slice(1))}catch(s){return value}return value}},CODES={A:65,Z:90},isExist=(s,t)=>t in s,setSizes=(s,t)=>`${s}: ${t}px;`,getSizes=(s,t,e)=>{if(isExist(s,t))return setSizes(e,s[t])},getCellValue=(s,t,e)=>{if(isExist(s,`${e}:${t}`))return s[`${e}:${t}`]},toCell=(s,t)=>(e,r)=>{const o=`${r}:${s}`,a=getSizes(t.colState,r,"width"),i=getCellValue(t.dataTableState,s,r)||"",c=toInlineStyle({...defaultStyle,...t.styleState[o]})||toInlineStyle(defaultStyle);return`<div 
			class="cell" 
			contenteditable 
			data-col="${r}"
			data-row="${s}"
			data-id="${o}"
			data-value="${i||" "}"
			style="${c} ${a||""}" 
			data-type="cell"
		>
		${parseCell(i)||""}
		</div>`},toColumn=s=>(t,e)=>`
		<div 
			class="column" 
			style="${getSizes(s.colState,e,"width")||""}" 
			data-type="resizable" 
			data-col="${e}"
			>
				${t}
			<div class="col-resize" data-resize="col"></div>
		</div>
		`,createRow=(s,t,e={})=>{let r=getSizes(e,s,"height");return`
		<div class="row" data-row="${s}" style="${r||""}" data-type="resizable">
			<div class="row-info">
			${s||""}
			${s?'<div class="row-resize" data-resize="row"></div>':""}
			</div>
			<div class="row-data">${t}</div>
		</div>
		`},toChar=(s,t)=>String.fromCharCode(CODES.A+t);function createTable(s=15,t={}){const e=CODES.Z-CODES.A+1,r=[],o=new Array(e).fill("").map(toChar).map(toColumn(t)).join("");r.push(createRow(null,o));for(let a=0;a<s;a++){const i=new Array(e).fill("").map(toCell(a,t)).join("");r.push(createRow(a+1,i,t.rowState))}return r.join("")}const resizeHandler=(s,t)=>new Promise(e=>{if(s.target.dataset.resize){s.target.style.opacity=1;const r=$(s.target),o=r.closest('[data-type="resizable"]'),a=o.getCoords(),i=t.findAll(`[data-col="${o.dataset.col}"]`),c=r.dataset.resize;let l;document.onmousemove=n=>{if(c==="col"){const u=n.pageX-a.right;l=a.width+u,o.css({width:`${l}px`})}else{const u=n.pageY-a.bottom;l=a.height+u,o.css({height:`${l}px`})}},document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,s.target.style.opacity=null,e({value:l,type:c,id:o.dataset[c]}),c==="col"&&i.forEach(n=>$(n).css({width:l+"px"}))}}});class TableSelection{constructor(){this.group=[],this.className="selected",this.current=null}select(t){this.clear(),this.current=t,this.group.push(t),t.focus().addClass(this.className)}clear(){this.group.forEach(t=>t.removeClass(this.className)),this.group=[],this.current=null}selectGroup(t=[]){t.length>0&&(this.group=t,t.forEach(e=>{e.addClass(this.className)}))}applyStyles(t){this.group.forEach(e=>e.css(t))}get getAllGroudIds(){return this.group.map(t=>t.id())}}function range(s,t){return s>t&&([t,s]=[s,t]),new Array(t-s+1).fill(" ").map((e,r)=>s+r)}const nextSelector=(s,{col:t,row:e})=>{const r={col:t,row:e};switch(s){case"Enter":case"ArrowDown":r.col<19&&r.col++;break;case"Tab":break;case"ArrowRight":r.row<25&&r.row++;break;case"ArrowLeft":r.row>0&&r.row--;break;case"ArrowUp":r.col>0&&r.col--;break}return`[data-id="${r.row}:${r.col}"]`},isCell=s=>s.target.dataset.type==="cell",shiftPressed$1=s=>s.shiftKey===!0,selectionCells=(s,t,e,r)=>{const o=$(s.target);if(shiftPressed(s)){const a=range(t.id(!0).col,o.id(!0).col),i=range(t.id(!0).row,o.id(!0).row),l=a.reduce((n,u)=>(i.forEach(d=>n.push(`${d}:${u}`)),n),[]).map(n=>r.find(`[data-id="${n}"]`));e.selectGroup(l)}},shiftPressed=s=>s.shiftKey===!0,TABLE_RESIZE="TABLE_RESIZE",CHANGE_CELL_VALUE="CHANGE_CELL_VALUE",APPLY_STYLES="APPLY_STYLES",CURRENT_STYLE_CELL="CURRENT_STYLE_CELL",TABLE_NAME="TABLE_NAME",LAST_UPDATE="LAST_UPDATE",actionFactory=s=>t=>({type:s,data:t}),tableResize=actionFactory(TABLE_RESIZE),changeCellValue=actionFactory(CHANGE_CELL_VALUE),changeStyles=actionFactory(CURRENT_STYLE_CELL),applyStyles=actionFactory(APPLY_STYLES),tableNameChange=actionFactory(TABLE_NAME),lastUpdateChange=()=>({type:LAST_UPDATE});class Table extends AbstractStatelessComponent{constructor(t,e){super(t,{name:"Table",listeners:["mousedown","keydown","input"],...e})}toHtml(){return createTable(20,this.$getState())}prepare(){this.selection=new TableSelection}init(){super.init();const t=this.$root.find('[data-id="0:0"]');this.selection.select(t),this.$subscribe("formula:input",e=>{const r=parseCell(...e);this.selection.current.attr("data-value",...e).text(r),this.updateTextInStore(String(e))}),this.$subscribe("formula:keydown",e=>{this.selection.current.focus()}),this.$subscribe("toolbar:applyStyle",e=>{this.selection.applyStyles(...e),this.$dispatch(applyStyles({ids:this.selection.getAllGroudIds,value:e}))})}updateTextInStore(t){this.$dispatch(changeCellValue({id:this.selection.current.id(),value:t}))}onInput(t){isCell(t)&&(this.updateTextInStore($(t.target).text()),$(t.target).attr("data-value",$(t.target).text()))}async resizeTable(t,e){try{const r=await resizeHandler(t,e);this.$dispatch(tableResize(r))}catch(r){console.warn(r.message)}}selectCell(t){const e=this.$root.find(`[data-id="${t.target.dataset.id}"]`);this.selection.select(e),this.$emit("table:select",this.selection.current);const r=Object.keys(defaultStyle),o=e.getStyles(r);this.$dispatch(changeStyles(o))}onMousedown(t){this.resizeTable(t,this.$root),isCell(t)&&(shiftPressed$1(t)?selectionCells(t,this.selection.current,this.selection,this.$root):this.selectCell(t))}onKeydown(t){const e=["Enter","Tab","ArrowLeft","ArrowRight","ArrowDown","ArrowUp"],{key:r}=t;if(e.includes(r)&&!t.shiftKey){t.preventDefault();const o=this.selection.current.id(!0),a=this.$root.find(nextSelector(r,o));console.log(a),console.log(nextSelector(r,o)),this.selection.select(a),this.$emit("table:select",a.text())}}destroy(){super.destroy()}}h(Table,"className","excel__table");const generateHeeaderTemplate=s=>`
		<input 
			type="text" 
			class="input" 
			value="${s.tableName}"
			data-type="header-tableName-input" 
		/>

		<div>

			<div class="button" data-type="button-header-delete">
				<i data-type="button-header-delete" class="material-icons">delete</i>
			</div>

			<div class="button" data-type="button-header-exit">
				<i data-type="button-header-exit" class="material-icons">exit_to_app</i>
			</div>

		</div>
		`;class Header extends AbstractStatelessComponent{constructor(t,e){super(t,{name:"Header",listeners:["input","click"],subOnStore:["tableName"],...e})}onClick(t){$(t.target).dataset.type==="button-header-exit"&&ActiveRoute.goTo("/"),$(t.target).dataset.type==="button-header-delete"&&confirm("Are you sure that you want to delete this table")===!0&&(localStorage.removeItem("excel:"+ActiveRoute.param),ActiveRoute.goTo("/"))}onInput(t){this.$dispatch(tableNameChange($(t.target).value))}toHtml(){return generateHeeaderTemplate(this.$getState())}}h(Header,"className","excel__header");class Formula extends AbstractStatelessComponent{constructor(t,e){super(t,{name:"Formula",listeners:["input","keydown"],subOnStore:["currentText"],...e})}init(){super.init();const t=this.$root.find('[data-type="formula-input"]');this.$subscribe("table:select",e=>{typeof e[0]=="object"?t.text(e[0].dataset.value):t.text(e[0])})}storeChanged({currentText:t}){this.$root.find('[data-type="formula-input"]').text(t)}onInput(t){this.$emit("formula:input",$(t.target).text())}onKeydown(t){t.key==="Enter"&&(t.preventDefault(),this.$emit("formula:keydown","ee"))}toHtml(){return`
			<div class="info">fx</div>
      		<div data-type="formula-input" class="input" contenteditable spellcheck="false"></div>
			`}}h(Formula,"className","excel__formula");const createStore=(s,t={})=>{let e=s({...t},{type:"__INIT__"}),r=[];return{subscribe(o){return r.push(o),{unsubscribe(){r=r.filter(a=>a!==o)}}},dispatch(o){e=s(e,o),r.forEach(a=>a(e))},getState(){return JSON.parse(JSON.stringify(e))}}},defaultState={tableName:defaultTableName,colState:{},rowState:{},currentText:"",styleState:{},dataTableState:{},currentStyleCell:defaultStyle,lastUpdate:new Date().toJSON()},normalize=s=>({...s,currentText:"",currentStyleCell:defaultStyle}),normalizeInitialState=s=>storage(s)?normalize(storage(s)):defaultState,value=(s,t,e)=>{const r=s[t]||{};return r[e.data.id]=e.data.value,r},rootReducer=(s,t)=>{let e,r;switch(t.type){case TABLE_NAME:return e="tableName",{...s,[e]:t.data};case TABLE_RESIZE:return e=t.data.type==="col"?"colState":"rowState",{...s,[e]:value(s,e,t)};case CHANGE_CELL_VALUE:return e="dataTableState",{...s,currentText:t.data.value,[e]:value(s,e,t)};case CURRENT_STYLE_CELL:return{...s,currentStyleCell:t.data};case APPLY_STYLES:return e="styleState",r=s[e]||{},t.data.ids.forEach(o=>{r[o]={...r[o],...t.data.value[0]}}),{...s,[e]:r,currentStyleCell:{...s.currentStyleCell,...t.data.value}};case LAST_UPDATE:return e="lastUpdate",{...s,[e]:new Date().toJSON()};default:return s}};class Observer{constructor(){this.listeners={}}emit(t,...e){this.listeners[t].forEach(r=>{r(...e)})}subscribe(t,e){return this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(e),()=>{this.listeners[t]=this.listeners[t].filter(r=>r!==e)}}}class StoreSubscriber{constructor(t){this.store=t,this.sub=null,this.previousState={}}subscribeComponents(t){this.previousState=this.store.getState(),this.sub=this.store.subscribe(e=>{Object.keys(e).forEach(r=>{isEqual(this.previousState[r],e[r])||t.forEach(o=>{if(o.isWatching(r)){const a={[r]:e[r]};o.storeChanged(a)}})}),this.previousState=this.store.getState()})}unsubscribeFromStore(){this.sub.unsubscribe()}}class RootComponent{constructor(t){this.components=t.components||[],this.store=t.store,this.observer=new Observer,this.storeSubscriber=new StoreSubscriber(this.store)}getRoot(){const t={observer:this.observer,store:this.store},e=$.create("div","excel");return this.components=this.components.map(r=>{const o=$.create("div",r.className),a=new r(o,t);return o.html(a.toHtml()),e.append(o),a}),e}init(){this.store.dispatch(lastUpdateChange()),this.storeSubscriber.subscribeComponents(this.components),this.components.forEach(t=>t.init())}destroy(){this.storeSubscriber.unsubscribeFromStore(),this.components.forEach(t=>t.destroy())}}const storageNameGener=s=>`excel:${s}`;class TablePage extends Page{constructor(t){super(t),this.storeSub=null}getRoot(){const t=storageNameGener(this.params),e=createStore(rootReducer,normalizeInitialState(t)),r=debounce(o=>{storage(t,o)},300);return e.subscribe(r),this.rootComponent=new RootComponent({components:[Header,Toolbar,Formula,Table],store:e}),this.rootComponent.getRoot()}afterRender(){this.rootComponent.init()}destroy(){this.rootComponent.destroy(),this.storeSub.unsubscribe()}}const index="";new Router("#root",{dashboard:DashboardPage,excel:TablePage});
