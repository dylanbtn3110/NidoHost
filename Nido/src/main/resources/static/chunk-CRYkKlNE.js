import{$t as He,At as to,Dn as Qb,Dr as gb,Er as gT,Gt as D,Hn as Vr,Hr as ne$1,Ht as Cb,Jr as ql,Mr as j$,Mt as xs,On as Ql,Qn as Yw,Rr as lb,Sr as ee,St as Zs,Tr as g,Tt as ia,Ut as Ci,Vt as Ca,W as $o,Wt as Cm,Yn as YT,_i as yr,ai as ud,bn as Nb,br as eD,ct as Mt,dn as Kt,ei as sp,en as Ho,et as Gs,fn as Kw,fr as cT,gi as ym,hn as Ls,hr as cw,kr as hb,li as wm,ln as Kl,mi as yT,nn as Ib,pt as Se,qr as pb,qt as Dp,rn as Im,si as vp,sr as ap,ti as td,tn as IT,tr as __,u as U,ui as x,un as Km,ut as Ns,vi as yt,vn as Mm,wn as P$,wr as fb,xr as ed,yr as dy,zn as Um,zt as Bo}from"./main-LFFLPQ66.js";import{n as fn,r as gn,t as $}from"./chunk-DCGowrPB.js";import{n as Pe,t as Be}from"./chunk-bPCide5O.js";import{n as _t,t as Vt}from"./chunk-DNl5cl1H.js";import{a as It,d as Vt$1,f as Wt$1,h as zt,i as Ht,l as Qt$1,m as qt,n as At,o as Kt$1,p as jt,s as Lt}from"./chunk-DGiU6yRI.js";import{l as re$1,n as $t,o as ft,t as $e}from"./chunk-C0IUHD70.js";import"./chunk-CzRzsXBx.js";var Z=(()=>{class t{changes=new ee;itemsPerPageLabel=`Items per page:`;nextPageLabel=`Next page`;previousPageLabel=`Previous page`;firstPageLabel=`First page`;lastPageLabel=`Last page`;getRangeLabel=(a,i,d)=>{if(d==0||i==0)return`0 of ${d}`;d=Math.max(d,0);let c=a*i,C=c<d?Math.min(c+i,d):c+i;return`${c+1} \u2013 ${C} of ${d}`};static ɵfac=function(i){return new(i||t)};static ɵprov=ne$1({token:t,factory:t.ɵfac})}return t})();var Yt=50;var te=new D(`MAT_PAGINATOR_DEFAULT_OPTIONS`);var W=(()=>{class t{_intl=g(Z);_changeDetectorRef=g(dy);_formFieldAppearance;_pageSizeLabelId=g(Se).getId(`mat-paginator-page-size-label-`);_intlChanges;_isInitialized=!1;_initializedStream=new Vr(1);color;get pageIndex(){return this._pageIndex}set pageIndex(a){this._pageIndex=Math.max(a||0,0),this._changeDetectorRef.markForCheck()}_pageIndex=0;get length(){return this._length}set length(a){this._length=a||0,this._changeDetectorRef.markForCheck()}_length=0;get pageSize(){return this._pageSize}set pageSize(a){this._pageSize=Math.max(a||0,0),this._updateDisplayedPageSizeOptions()}_pageSize;get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(a){this._pageSizeOptions=(a||[]).map(i=>YT(i,0)),this._updateDisplayedPageSizeOptions()}_pageSizeOptions=[];hidePageSize=!1;showFirstLastButtons=!1;selectConfig={};disabled=!1;page=new He;_displayedPageSizeOptions;initialized=this._initializedStream;constructor(){let a=this._intl,i=g(te,{optional:!0});if(this._intlChanges=a.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),i){let{pageSize:d,pageSizeOptions:c,hidePageSize:C,showFirstLastButtons:O}=i;d!=null&&(this._pageSize=d),c!=null&&(this._pageSizeOptions=c),C!=null&&(this.hidePageSize=C),O!=null&&(this.showFirstLastButtons=O)}this._formFieldAppearance=i?.formFieldAppearance||`outline`}ngOnInit(){this._isInitialized=!0,this._updateDisplayedPageSizeOptions(),this._initializedStream.next()}ngOnDestroy(){this._initializedStream.complete(),this._intlChanges.unsubscribe()}nextPage(){this.hasNextPage()&&this._navigate(this.pageIndex+1)}previousPage(){this.hasPreviousPage()&&this._navigate(this.pageIndex-1)}firstPage(){this.hasPreviousPage()&&this._navigate(0)}lastPage(){this.hasNextPage()&&this._navigate(this.getNumberOfPages()-1)}hasPreviousPage(){return this.pageIndex>=1&&this.pageSize!=0}hasNextPage(){let a=this.getNumberOfPages()-1;return this.pageIndex<a&&this.pageSize!=0}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(a){let i=this.pageIndex*this.pageSize,d=this.pageIndex;this.pageIndex=Math.floor(i/a)||0,this.pageSize=a,this._emitPageEvent(d)}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._isInitialized&&(this.pageSize||(this._pageSize=this.pageSizeOptions.length!=0?this.pageSizeOptions[0]:Yt),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),this._displayedPageSizeOptions.indexOf(this.pageSize)===-1&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((a,i)=>a-i),this._changeDetectorRef.markForCheck())}_emitPageEvent(a){this.page.emit({previousPageIndex:a,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length})}_navigate(a){let i=this.pageIndex;a!==i&&(this.pageIndex=a,this._emitPageEvent(i))}_buttonClicked(a,i){i||this._navigate(a)}static ɵfac=function(i){return new(i||t)};static ɵcmp=(function(){function a(p,h){if(p&1&&(Ls(0,`mat-option`,17),Qb(1),ql()),p&2){let e=h.$implicit;wm(`value`,e),cw(),td(` `,e,` `)}}function i(p,h){if(p&1){let e=Ib();Ls(0,`mat-form-field`,14)(1,`mat-select`,16,0),Mm(`selectionChange`,function(u){sp(e);let Xt=Cb(2);return ap(Xt._changePageSize(u.value))}),hb(3,a,2,2,`mat-option`,17,pb),ql(),Ls(5,`div`,18),Mm(`click`,function(){sp(e);let u=Nb(2);return ap(u.open())}),ql()()}if(p&2){let e=Cb(2);wm(`appearance`,e._formFieldAppearance)(`color`,e.color),cw(),wm(`value`,e.pageSize)(`disabled`,e.disabled),Im(`aria-labelledby`,e._pageSizeLabelId),wm(`panelClass`,e.selectConfig.panelClass||``)(`disableOptionCentering`,e.selectConfig.disableOptionCentering),cw(2),gb(e._displayedPageSizeOptions)}}function d(p,h){if(p&1&&(Ls(0,`div`,15),Qb(1),ql()),p&2){let e=Cb(2);cw(),Um(e.pageSize)}}function c(p,h){if(p&1&&(Ls(0,`div`,3)(1,`div`,13),Qb(2),ql(),lb(3,i,6,7,`mat-form-field`,14),lb(4,d,2,1,`div`,15),ql()),p&2){let e=Cb();cw(),Ho(`id`,e._pageSizeLabelId),cw(),td(` `,e._intl.itemsPerPageLabel,` `),cw(),fb(e._displayedPageSizeOptions.length>1?3:-1),cw(),fb(e._displayedPageSizeOptions.length<=1?4:-1)}}function C(p,h){if(p&1){let e=Ib();Ls(0,`button`,19),Mm(`click`,function(){sp(e);let u=Cb();return ap(u._buttonClicked(0,u._previousButtonsDisabled()))}),vp(),Ls(1,`svg`,8),Cm(2,`path`,20),ql()()}if(p&2){let e=Cb();wm(`matTooltip`,e._intl.firstPageLabel)(`matTooltipDisabled`,e._previousButtonsDisabled())(`disabled`,e._previousButtonsDisabled())(`tabindex`,e._previousButtonsDisabled()?-1:null),Ho(`aria-label`,e._intl.firstPageLabel)}}function O(p,h){if(p&1){let e=Ib();Ls(0,`button`,21),Mm(`click`,function(){sp(e);let u=Cb();return ap(u._buttonClicked(u.getNumberOfPages()-1,u._nextButtonsDisabled()))}),vp(),Ls(1,`svg`,8),Cm(2,`path`,22),ql()()}if(p&2){let e=Cb();wm(`matTooltip`,e._intl.lastPageLabel)(`matTooltipDisabled`,e._nextButtonsDisabled())(`disabled`,e._nextButtonsDisabled())(`tabindex`,e._nextButtonsDisabled()?-1:null),Ho(`aria-label`,e._intl.lastPageLabel)}}return Bo({type:t,selectors:[[`mat-paginator`]],hostAttrs:[`role`,`group`,1,`mat-mdc-paginator`],inputs:{color:`color`,pageIndex:[2,`pageIndex`,`pageIndex`,YT],length:[2,`length`,`length`,YT],pageSize:[2,`pageSize`,`pageSize`,YT],pageSizeOptions:`pageSizeOptions`,hidePageSize:[2,`hidePageSize`,`hidePageSize`,ud],showFirstLastButtons:[2,`showFirstLastButtons`,`showFirstLastButtons`,ud],selectConfig:`selectConfig`,disabled:[2,`disabled`,`disabled`,ud]},outputs:{page:`page`},exportAs:[`matPaginator`],decls:14,vars:14,consts:[[`selectRef`,``],[1,`mat-mdc-paginator-outer-container`],[1,`mat-mdc-paginator-container`],[1,`mat-mdc-paginator-page-size`],[1,`mat-mdc-paginator-range-actions`],[`aria-atomic`,`true`,`aria-live`,`polite`,`role`,`status`,1,`mat-mdc-paginator-range-label`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-first`,3,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-previous`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`viewBox`,`0 0 24 24`,`focusable`,`false`,`aria-hidden`,`true`,1,`mat-mdc-paginator-icon`],[`d`,`M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-next`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`d`,`M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-last`,3,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`aria-hidden`,`true`,1,`mat-mdc-paginator-page-size-label`],[1,`mat-mdc-paginator-page-size-select`,3,`appearance`,`color`],[1,`mat-mdc-paginator-page-size-value`],[`hideSingleSelectionIndicator`,``,3,`selectionChange`,`value`,`disabled`,`aria-labelledby`,`panelClass`,`disableOptionCentering`],[3,`value`],[1,`mat-mdc-paginator-touch-target`,3,`click`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-first`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`d`,`M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-last`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`d`,`M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z`]],template:function(h,e){h&1&&(Ls(0,`div`,1)(1,`div`,2),lb(2,c,5,4,`div`,3),Ls(3,`div`,4)(4,`div`,5),Qb(5),ql(),lb(6,C,3,5,`button`,6),Ls(7,`button`,7),Mm(`click`,function(){return e._buttonClicked(e.pageIndex-1,e._previousButtonsDisabled())}),vp(),Ls(8,`svg`,8),Cm(9,`path`,9),ql()(),Dp(),Ls(10,`button`,10),Mm(`click`,function(){return e._buttonClicked(e.pageIndex+1,e._nextButtonsDisabled())}),vp(),Ls(11,`svg`,8),Cm(12,`path`,11),ql()(),lb(13,O,3,5,`button`,12),ql()()()),h&2&&(cw(2),fb(e.hidePageSize?-1:2),cw(3),td(` `,e._intl.getRangeLabel(e.pageIndex,e.pageSize,e.length),` `),cw(),fb(e.showFirstLastButtons?6:-1),cw(),wm(`matTooltip`,e._intl.previousPageLabel)(`matTooltipDisabled`,e._previousButtonsDisabled())(`disabled`,e._previousButtonsDisabled())(`tabindex`,e._previousButtonsDisabled()?-1:null),Ho(`aria-label`,e._intl.previousPageLabel),cw(3),wm(`matTooltip`,e._intl.nextPageLabel)(`matTooltipDisabled`,e._nextButtonsDisabled())(`disabled`,e._nextButtonsDisabled())(`tabindex`,e._nextButtonsDisabled()?-1:null),Ho(`aria-label`,e._intl.nextPageLabel),cw(3),fb(e.showFirstLastButtons?13:-1))},dependencies:[$e,gn,$,to,_t],styles:[`.mat-mdc-paginator {
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--%NS%mat-paginator-container-text-color, var(--%NS%mat-sys-on-surface));
  background-color: var(--%NS%mat-paginator-container-background-color, var(--%NS%mat-sys-surface));
  font-family: var(--%NS%mat-paginator-container-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-paginator-container-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-paginator-container-text-size, var(--%NS%mat-sys-body-small-size));
  font-weight: var(--%NS%mat-paginator-container-text-weight, var(--%NS%mat-sys-body-small-weight));
  letter-spacing: var(--%NS%mat-paginator-container-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  --%NS%mat-form-field-container-height: var(--%NS%mat-paginator-form-field-container-height, 40px);
  --%NS%mat-form-field-container-vertical-padding: var(--%NS%mat-paginator-form-field-container-vertical-padding, 8px);
}
.mat-mdc-paginator .mat-mdc-select-value {
  font-size: var(--%NS%mat-paginator-select-trigger-text-size, var(--%NS%mat-sys-body-small-size));
}
.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {
  display: none;
}
.mat-mdc-paginator .mat-mdc-select {
  line-height: 1.5;
}

.mat-mdc-paginator-outer-container {
  display: flex;
}

.mat-mdc-paginator-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  flex-wrap: wrap;
  width: 100%;
  min-height: var(--%NS%mat-paginator-container-size, 56px);
}

.mat-mdc-paginator-page-size {
  display: flex;
  align-items: baseline;
  margin-right: 8px;
}
[dir=rtl] .mat-mdc-paginator-page-size {
  margin-right: 0;
  margin-left: 8px;
}

.mat-mdc-paginator-page-size-label {
  margin: 0 4px;
}

.mat-mdc-paginator-page-size-select {
  margin: 0 4px;
  width: var(--%NS%mat-paginator-page-size-select-width, 84px);
}

.mat-mdc-paginator-range-label {
  margin: 0 32px 0 24px;
}

.mat-mdc-paginator-range-actions {
  display: flex;
  align-items: center;
}

.mat-mdc-paginator-icon {
  display: inline-block;
  width: 28px;
  fill: var(--%NS%mat-paginator-enabled-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {
  fill: var(--%NS%mat-paginator-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
[dir=rtl] .mat-mdc-paginator-icon {
  transform: rotate(180deg);
}

@media (forced-colors: active) {
  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,
  .mat-mdc-paginator-icon {
    fill: currentColor;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {
    outline: solid 1px;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {
    color: GrayText;
  }
}
.mat-mdc-paginator-touch-target {
  display: var(--%NS%mat-paginator-touch-target-display, block);
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--%NS%mat-paginator-page-size-select-width, 84px);
  height: var(--%NS%mat-paginator-page-size-select-touch-target-height, 48px);
  background-color: transparent;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
`],encapsulation:2})})()}return t})();var Qt=(()=>{class t{static ɵfac=function(i){return new(i||t)};static ɵmod=Kt({type:t});static ɵinj=yt({imports:[Ns,fn,Vt,W]})}return t})();var q=class t{http=g(Ca);listar(r,a){let i={};return r&&(i.entidad=r),a&&(i.usuario=a),this.http.get(`/api/v1/auditorias`,{params:i})}static ɵfac=function(a){return new(a||t)};static ɵprov=x({token:t,factory:t.ɵfac,providedIn:`root`})};var ae=()=>[10,25,50];function ie(t,r){if(t&1&&(Ls(0,`mat-option`,7),Qb(1),ql()),t&2){let a=r.$implicit;wm(`value`,a),cw(),Um(a)}}function ne(t,r){t&1&&(Ls(0,`th`,27),Qb(1,`Fecha y hora`),ql())}function oe(t,r){if(t&1&&(Ls(0,`td`,28),Qb(1),gT(2,`date`),ql()),t&2){let a=r.$implicit;cw(),Um(yT(2,1,a.fecha,`dd/MM/yyyy HH:mm:ss`))}}function re(t,r){t&1&&(Ls(0,`th`,27),Qb(1,`Usuario`),ql())}function le(t,r){if(t&1&&(Ls(0,`td`,29),Qb(1),ql()),t&2){let a=r.$implicit;cw(),Um(a.usuario)}}function se(t,r){t&1&&(Ls(0,`th`,27),Qb(1,`Entidad`),ql())}function de(t,r){if(t&1&&(Ls(0,`td`,29),Qb(1),ql()),t&2){let a=r.$implicit;cw(),Um(a.entidad)}}function pe(t,r){t&1&&(Ls(0,`th`,27),Qb(1,`Operación`),ql())}function me(t,r){if(t&1&&(Ls(0,`td`,29)(1,`span`),Qb(2),ql()()),t&2){let a=r.$implicit,i=Cb();cw(),ed(`chip-estado `+i.tono(a.operacion)),cw(),Um(a.operacion)}}function ce(t,r){t&1&&(Ls(0,`th`,27),Qb(1,`Id registro`),ql())}function ge(t,r){if(t&1&&(Ls(0,`td`,29),Qb(1),ql()),t&2){let a=r.$implicit;cw(),Um(a.idRegistro||`—`)}}function ue(t,r){t&1&&(Ls(0,`th`,27),Qb(1,`Detalle`),ql())}function be(t,r){if(t&1&&(Ls(0,`td`,30),Qb(1),ql()),t&2){let a=r.$implicit;cw(),Um(a.detalle)}}function fe(t,r){t&1&&Cm(0,`tr`,31)}function he(t,r){t&1&&Cm(0,`tr`,32)}function ve(t,r){t&1&&(Ls(0,`div`,24),Qb(1,`Cargando…`),ql())}function _e(t,r){t&1&&(Ls(0,`div`,25),Qb(1,`No hay registros de auditoría con esos filtros.`),ql())}var xe=[`alojamientos`,`huespedes`,`reservas`,`pagos`,`servicios`,`incidencias`,`usuarios`,`evidencias`,`roles`];var ye={CREAR:`bueno`,ACTUALIZAR:`atencion`,ELIMINAR:`malo`};var X=class extends Z{itemsPerPageLabel=`Filas por página`;nextPageLabel=`Página siguiente`;previousPageLabel=`Página anterior`;firstPageLabel=`Primera página`;lastPageLabel=`Última página`;getRangeLabel=(r,a,i)=>{if(i===0)return`0 de 0`;let d=r*a+1;return`${d} \u2013 ${Math.min(d+a-1,i)} de ${i}`}};var Wt=class t{servicio=g(q);entidades=xe;entidad=new Mt(``,{nonNullable:!0});usuario=new Mt(``,{nonNullable:!0});registros=yr([]);cargando=yr(!0);pagina=yr(0);tamano=yr(10);columnas=[`fecha`,`usuario`,`entidad`,`operacion`,`idRegistro`,`detalle`];visibles=IT(()=>this.registros().slice(this.pagina()*this.tamano(),(this.pagina()+1)*this.tamano()));constructor(){eD(this.entidad.valueChanges,this.usuario.valueChanges.pipe(Ci(400))).pipe(U()).subscribe(()=>this.cargar()),this.cargar()}cargar(){this.cargando.set(!0),this.servicio.listar(this.entidad.value,this.usuario.value.trim()).subscribe({next:r=>{this.registros.set(r),this.pagina.set(0),this.cargando.set(!1)},error:()=>this.cargando.set(!1)})}cambiarPagina(r){this.pagina.set(r.pageIndex),this.tamano.set(r.pageSize)}tono(r){return ye[r]??`neutro`}static ɵfac=function(a){return new(a||t)};static ɵcmp=Bo({type:t,selectors:[[`app-auditoria`]],features:[Km([{provide:Z,useClass:X}])],decls:51,vars:12,consts:[[1,`pagina`],[1,`encabezado`],[`mat-stroked-button`,``,`type`,`button`,3,`click`],[1,`herramientas`],[`appearance`,`outline`,`subscriptSizing`,`dynamic`],[3,`formControl`],[`value`,``],[3,`value`],[`matInput`,``,`placeholder`,`Ej. lmendoza`,3,`formControl`],[`matSuffix`,``],[1,`tarjeta-tabla`],[`mat-table`,``,3,`dataSource`],[`matColumnDef`,`fecha`],[`mat-header-cell`,``,4,`matHeaderCellDef`],[`mat-cell`,``,`class`,`nowrap`,4,`matCellDef`],[`matColumnDef`,`usuario`],[`mat-cell`,``,4,`matCellDef`],[`matColumnDef`,`entidad`],[`matColumnDef`,`operacion`],[`matColumnDef`,`idRegistro`],[`matColumnDef`,`detalle`],[`mat-cell`,``,`class`,`detalle`,4,`matCellDef`],[`mat-header-row`,``,4,`matHeaderRowDef`],[`mat-row`,``,4,`matRowDef`,`matRowDefColumns`],[1,`cargando`],[1,`vacio`],[3,`page`,`length`,`pageIndex`,`pageSize`,`pageSizeOptions`],[`mat-header-cell`,``],[`mat-cell`,``,1,`nowrap`],[`mat-cell`,``],[`mat-cell`,``,1,`detalle`],[`mat-header-row`,``],[`mat-row`,``]],template:function(a,i){a&1&&(Ls(0,`div`,0)(1,`header`,1)(2,`div`)(3,`h1`),Qb(4,`Auditoría`),ql(),Ls(5,`p`),Qb(6),ql()(),Ls(7,`button`,2),Mm(`click`,function(){return i.cargar()}),Ls(8,`mat-icon`),Qb(9,`refresh`),ql(),Qb(10,` Actualizar`),ql()(),Ls(11,`div`,3)(12,`mat-form-field`,4)(13,`mat-label`),Qb(14,`Entidad`),ql(),Ls(15,`mat-select`,5),Yw(),Ls(16,`mat-option`,6),Qb(17,`Todas`),ql(),hb(18,ie,2,2,`mat-option`,7,pb),ql()(),Ls(20,`mat-form-field`,4)(21,`mat-label`),Qb(22,`Usuario (login)`),ql(),Ls(23,`input`,8),Yw(),ql(),Ls(24,`mat-icon`,9),Qb(25,`search`),ql()()(),Ls(26,`div`,10)(27,`table`,11),Ql(28,12),ym(29,ne,2,0,`th`,13)(30,oe,3,4,`td`,14),Kl(),Ql(31,15),ym(32,re,2,0,`th`,13)(33,le,2,1,`td`,16),Kl(),Ql(34,17),ym(35,se,2,0,`th`,13)(36,de,2,1,`td`,16),Kl(),Ql(37,18),ym(38,pe,2,0,`th`,13)(39,me,3,3,`td`,16),Kl(),Ql(40,19),ym(41,ce,2,0,`th`,13)(42,ge,2,1,`td`,16),Kl(),Ql(43,20),ym(44,ue,2,0,`th`,13)(45,be,2,1,`td`,21),Kl(),ym(46,fe,1,0,`tr`,22)(47,he,1,0,`tr`,23),ql(),lb(48,ve,2,0,`div`,24)(49,_e,2,0,`div`,25),Ls(50,`mat-paginator`,26),Mm(`page`,function(c){return i.cambiarPagina(c)}),ql()()()),a&2&&(cw(6),td(`Historial de acciones críticas del sistema · `,i.registros().length,` registros`),cw(9),wm(`formControl`,i.entidad),Kw(),cw(3),gb(i.entidades),cw(5),wm(`formControl`,i.usuario),Kw(),cw(4),wm(`dataSource`,i.visibles()),cw(19),wm(`matHeaderRowDef`,i.columnas),cw(),wm(`matRowDefColumns`,i.columnas),cw(),fb(i.cargando()?48:i.registros().length?-1:49),cw(2),wm(`length`,i.registros().length)(`pageIndex`,i.pagina())(`pageSize`,i.tamano())(`pageSizeOptions`,cT(11,ae)))},dependencies:[Zs,ia,Gs,$o,qt,It,Ht,jt,zt,At,Wt$1,Lt,Vt$1,Qt$1,Kt$1,Qt,W,$t,$e,re$1,ft,Pe,Be,fn,gn,$,Ns,xs,j$,P$,__],styles:[`.nowrap[_ngcontent-%COMP%]{white-space:nowrap}.detalle[_ngcontent-%COMP%]{font:12px/1.4 ui-monospace,Menlo,Consolas,monospace;color:var(--%NS%nido-gris)}`]})};export{Wt as AuditoriaPage};