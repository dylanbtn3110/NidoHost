import{a as Ra,i as Oa,n as La,o as Ta,r as N,s as wt,t as Ei}from"./chunk-qLBPykm-.js";import{t as p}from"./chunk-RkYmiXAV.js";import{n as Z,t as J}from"./chunk-lfJGNX7o.js";import{a as r,i as o,r as n}from"./chunk-DT_OjC_N.js";import{t as E}from"./chunk-BjddbmDx.js";import{n as Pe,t as Be}from"./chunk-bPCide5O.js";import{a as It,c as Pt$1,d as Vt$1,f as Wt$1,h as zt,i as Ht$1,l as Qt,m as qt$1,n as At,o as Kt,p as jt$1,r as Bt$1,s as Lt$1,t as $t$1,u as Ut$1}from"./chunk-DGiU6yRI.js";import{$n as Zl,$r as se,$t as He,Ct as _e,Dn as Qb,Dr as gb,Er as gT,Et as ke,Fn as Sm,Ft as Ai,G as Bo$1,Gt as D,Ht as Cb,It as Am,Jr as ql,Jt as Dv,Kn as Xa,Mn as S_,Mr as j$,Mt as xs,On as Ql,Or as gm,Ot as qo,Pn as Sb,Pr as kh,Pt as $m,Qn as Yw,Rr as lb,Rt as B,Sr as ee,St as Zs,Tr as g,Tt as ia,U as $n,Vn as Va,Wt as Cm,Xn as Yl,Yn as YT,Yr as r8,Yt as ES,Zn as Ys,_i as yr,ai as ud,at as Kn,br as eD,bt as Ws,cn as Ka,di as xm,dn as Kt$1,dr as bt,en as Ho,et as Gs,fn as Kw,gi as ym,gn as M_,gr as d$,hn as Ls,hr as cw,jn as SS,jr as ie,kn as Qs,kr as hb,kt as qs,li as wm,ln as Kl,lt as Ne,mi as yT,nr as _b,nt as Hs,oi as vT,on as Jl,or as aH,pt as Se,q as De,qn as Xl,ri as uH,ti as td,tn as IT,tr as __,un as Km,ur as bs,ut as Ns,vi as yt,vn as Mm,wn as P$,wr as fb,xr as ed,yr as dy,yt as Wn,zn as Um,zt as Bo}from"./main-LFFLPQ66.js";import{l as re,n as $t$2,r as Kt$2,t as $e}from"./chunk-C0IUHD70.js";import"./chunk-CzRzsXBx.js";var Vt=new D(`mat-chips-default-options`,{providedIn:`root`,factory:()=>({separatorKeyCodes:[13]})});var Dt=new D(`MatChipAvatar`);var Rt=new D(`MatChipLeadingIcon`);var Tt=new D(`MatChipTrailingIcon`);var Pt=new D(`MatChipEdit`);var Ft=new D(`MatChipRemove`);var Lt=new D(`MatChip`);var Bt=(()=>{class t{_elementRef=g(bt);_parentChip=g(Lt);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(i){this._disabled=i}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?``:null}constructor(){g(ES).load(Wn),this._elementRef.nativeElement.nodeName===`BUTTON`&&this._elementRef.nativeElement.setAttribute(`type`,`button`)}focus(){this._elementRef.nativeElement.focus()}static ɵfac=function(n){return new(n||t)};static ɵdir=Ys({type:t,selectors:[[``,`matChipContent`,``]],hostAttrs:[1,`mat-mdc-chip-action`,`mdc-evolution-chip__action`,`mdc-evolution-chip__action--presentational`],hostVars:8,hostBindings:function(n,o){n&2&&(Ho(`disabled`,o._getDisabledAttribute())(`aria-disabled`,o.disabled),Qs(`mdc-evolution-chip__action--primary`,o._isPrimary)(`mdc-evolution-chip__action--secondary`,!o._isPrimary)(`mdc-evolution-chip__action--trailing`,!o._isPrimary&&!o._isLeading))},inputs:{disabled:[2,`disabled`,`disabled`,ud],tabIndex:[2,`tabIndex`,`tabIndex`,i=>i==null?-1:YT(i)],_allowFocusWhenDisabled:`_allowFocusWhenDisabled`}})}return t})();var qt=(()=>{class t extends Bt{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(i){!this.disabled&&this._isPrimary&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(i){(i.keyCode===13||i.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(i.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static ɵfac=(()=>{let i;return function(o){return(i||(i=kh(t)))(o||t)}})();static ɵdir=Ys({type:t,selectors:[[``,`matChipAction`,``]],hostVars:3,hostBindings:function(n,o){n&1&&Mm(`click`,function(h){return o._handleClick(h)})(`keydown`,function(h){return o._handleKeydown(h)}),n&2&&(Ho(`tabindex`,o._getTabindex()),Qs(`mdc-evolution-chip__action--presentational`,!1))},features:[gm]})}return t})();var di=(()=>{class t{_changeDetectorRef=g(dy);_elementRef=g(bt);_tagName=g(aH);_ngZone=g(se);_focusMonitor=g(_e);_globalRippleOptions=g(De,{optional:!0});_document=g(B);_onFocus=new ee;_onBlur=new ee;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=r8();_allAvatars;_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=g(Se).getId(`mat-mdc-chip-`);ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(i){this._value=i}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(i){this._disabled=i}_disabled=!1;removed=new He;destroyed=new He;basicChipAttrName=`mat-basic-chip`;avatar;leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=g($n);_injector=g(ie);constructor(){let i=g(ES);i.load(Wn),i.load(d$),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:`mat-mdc-chip-ripple`,disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(`.mat-mdc-chip-action-label`),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=eD(this._allAvatars.changes,this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasLeadingGraphic(){return!!(this.leadingIcon||this.avatar)}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(i){(i.keyCode===8&&!i.repeat||i.keyCode===46)&&(i.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(i){return this._getActions().find(n=>{let o=n._elementRef.nativeElement;return o===i||o.contains(i)})}_getActions(){let i=[];return this.editIcon&&i.push(this.editIcon),this.primaryAction&&i.push(this.primaryAction),this.removeIcon&&i.push(this.removeIcon),i}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(i){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(i=>{let n=i!==null;n!==this._hasFocusInternal&&(this._hasFocusInternal=n,n?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static ɵfac=function(n){return new(n||t)};static ɵcmp=(function(){let i=[`*`,[[`mat-chip-avatar`],[``,`matChipAvatar`,``],[`mat-chip-leading-icon`],[``,`matChipLeadingIcon`,``]],[[`mat-chip-trailing-icon`],[``,`matChipRemove`,``],[``,`matChipTrailingIcon`,``]]],n=[`*`,`mat-chip-avatar, [matChipAvatar], mat-chip-leading-icon, [matChipLeadingIcon]`,`mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]`];function o(h,p){h&1&&(Ls(0,`span`,3),Jl(1,1),ql())}function s(h,p){h&1&&(Ls(0,`span`,7),Jl(1,2),ql())}return Bo({type:t,selectors:[[`mat-basic-chip`],[``,`mat-basic-chip`,``],[`mat-chip`],[``,`mat-chip`,``]],contentQueries:function(p,l,f){if(p&1&&Am(f,Dt,5)(f,Rt,5)(f,Pt,5)(f,Tt,5)(f,Ft,5)(f,Dt,5)(f,Rt,5)(f,Tt,5)(f,Pt,5)(f,Ft,5),p&2){let m;_b(m=Sb())&&(l.avatar=m.first),_b(m=Sb())&&(l.leadingIcon=m.first),_b(m=Sb())&&(l.editIcon=m.first),_b(m=Sb())&&(l.trailingIcon=m.first),_b(m=Sb())&&(l.removeIcon=m.first),_b(m=Sb())&&(l._allAvatars=m),_b(m=Sb())&&(l._allLeadingIcons=m),_b(m=Sb())&&(l._allTrailingIcons=m),_b(m=Sb())&&(l._allEditIcons=m),_b(m=Sb())&&(l._allRemoveIcons=m)}},viewQuery:function(p,l){if(p&1&&xm(qt,5),p&2){let f;_b(f=Sb())&&(l.primaryAction=f.first)}},hostAttrs:[1,`mat-mdc-chip`],hostVars:33,hostBindings:function(p,l){p&1&&Mm(`keydown`,function(m){return l._handleKeydown(m)}),p&2&&(Sm(`id`,l.id),Ho(`role`,l.role)(`aria-label`,l.ariaLabel),ed(`mat-`+(l.color||`primary`)),Qs(`mdc-evolution-chip`,!l._isBasicChip)(`mdc-evolution-chip--disabled`,l.disabled)(`mdc-evolution-chip--with-trailing-action`,l._hasTrailingIcon())(`mdc-evolution-chip--with-primary-graphic`,l._hasLeadingGraphic())(`mdc-evolution-chip--with-primary-icon`,l.leadingIcon||l.avatar)(`mdc-evolution-chip--with-avatar`,l.avatar)(`mat-mdc-chip-with-avatar`,l.avatar)(`mat-mdc-chip-with-leading-icon`,l.leadingIcon)(`mat-mdc-chip-highlighted`,l.highlighted)(`mat-mdc-chip-disabled`,l.disabled)(`mat-mdc-basic-chip`,l._isBasicChip)(`mat-mdc-standard-chip`,!l._isBasicChip)(`mat-mdc-chip-with-trailing-icon`,l._hasTrailingIcon())(`_mat-animation-noopable`,l._animationsDisabled))},inputs:{role:`role`,id:`id`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaDescription:[0,`aria-description`,`ariaDescription`],value:`value`,color:`color`,removable:[2,`removable`,`removable`,ud],highlighted:[2,`highlighted`,`highlighted`,ud],disableRipple:[2,`disableRipple`,`disableRipple`,ud],disabled:[2,`disabled`,`disabled`,ud]},outputs:{removed:`removed`,destroyed:`destroyed`},exportAs:[`matChip`],features:[Km([{provide:Lt,useExisting:t}])],ngContentSelectors:n,decls:9,vars:2,consts:[[1,`mat-mdc-chip-focus-overlay`],[1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--primary`],[`matChipContent`,``],[1,`mdc-evolution-chip__graphic`,`mat-mdc-chip-graphic`],[1,`mdc-evolution-chip__text-label`,`mat-mdc-chip-action-label`],[1,`mat-mdc-chip-primary-focus-indicator`,`mat-focus-indicator`],[1,`mat-mdc-chip-touch-target`],[1,`mdc-evolution-chip__cell`,`mdc-evolution-chip__cell--trailing`]],template:function(p,l){p&1&&(Xl(i),Cm(0,`span`,0),Ls(1,`span`,1)(2,`span`,2),lb(3,o,2,0,`span`,3),Ls(4,`span`,4),Jl(5),Cm(6,`span`,5),ql(),Cm(7,`span`,6),ql()(),lb(8,s,2,0,`span`,7)),p&2&&(cw(3),fb(l._hasLeadingGraphic()?3:-1),cw(5),fb(l._hasTrailingIcon()?8:-1))},dependencies:[Bt],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mat-mdc-chip-touch-target {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 48px;
  transform: translateY(-50%);
  display: var(--%NS%mat-chip-touch-target-display, block);
  pointer-events: auto;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-outline-width, 1px);
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-evolution-chip__action--%NS%primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--%NS%mat-chip-focus-outline-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, [dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--%NS%mat-chip-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-chip-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-chip-label-text-size, var(--%NS%mat-sys-label-large-size));
  font-weight: var(--%NS%mat-chip-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-chip-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  height: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--%NS%selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--%NS%mat-chip-trailing-action-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--%NS%mat-chip-trailing-action-focus-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  height: var(--%NS%mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  width: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  height: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  font-size: var(--%NS%mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --%NS%mat-chip-with-icon-icon-color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-elevated-container-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
  --%NS%mat-chip-label-text-color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-outline-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-hover-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-hover-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--%NS%disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--%NS%mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--%NS%disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-leading-icon {
  opacity: var(--%NS%mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--%NS%mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--%NS%mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-trailing-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--%NS%mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--%NS%mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-trailing-action-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-selected-trailing-action-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-leading-icon,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--%NS%mat-chip-with-icon-icon-color, currentColor);
}
.mat-mdc-standard-chip .mat-mdc-chip-avatar {
  border-radius: var(--%NS%mat-chip-with-avatar-avatar-shape-radius, 24px);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--%NS%mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2})})()}return t})();var jt=(()=>{class t{_elementRef=g(bt);_changeDetectorRef=g(dy);_dir=g(SS,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new ee;_defaultRole=`presentation`;get chipFocusChanges(){return this._getChipStream(i=>i._onFocus)}get chipDestroyedChanges(){return this._getChipStream(i=>i.destroyed)}get chipRemovedChanges(){return this._getChipStream(i=>i.removed)}get disabled(){return this._disabled}set disabled(i){this._disabled=i,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(i){this._explicitRole=i}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new bs;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(i=>i._hasFocus())}_syncChipsState(){this._chips?.forEach(i=>{i._chipListDisabled=this._disabled,i._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(i){this._originatesFromChip(i)&&this._keyManager.onKeydown(i)}_isValidIndex(i){return i>=0&&i<this._chips.length}_allowFocusEscape(){let i=this._elementRef.nativeElement.tabIndex;i!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=i))}_getChipStream(i){return this._chips.changes.pipe(Ai(null),Ka(()=>eD(...this._chips.map(i))))}_originatesFromChip(i){let n=i.target;for(;n&&n!==this._elementRef.nativeElement;){if(n.classList.contains(`mat-mdc-chip`))return!0;n=n.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(Ai(this._chips)).subscribe(i=>{let n=[];i.forEach(o=>o._getActions().forEach(s=>n.push(s))),this._chipActions.reset(n),this._chipActions.notifyOnChanges()}),this._keyManager=new Ne(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:`ltr`).withHomeAndEnd().skipPredicate(i=>this._skipPredicate(i)),this.chipFocusChanges.pipe(Xa(this._destroyed)).subscribe(({chip:i})=>{let n=i._getSourceAction(document.activeElement);n&&this._keyManager.updateActiveItem(n)}),this._dir?.change.pipe(Xa(this._destroyed)).subscribe(i=>this._keyManager.withHorizontalOrientation(i))}_skipPredicate(i){return i.disabled}_trackChipSetChanges(){this._chips.changes.pipe(Ai(null),Xa(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Xa(this._destroyed)).subscribe(i=>{let o=this._chips.toArray().indexOf(i.chip),s=i.chip._hasFocus(),h=i.chip._hadFocusOnRemove&&this._keyManager.activeItem&&i.chip._getActions().includes(this._keyManager.activeItem),p=s||h;this._isValidIndex(o)&&p&&(this._lastDestroyedFocusedChipIndex=o)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let i=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),n=this._chips.toArray()[i];n.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():n.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static ɵfac=function(n){return new(n||t)};static ɵcmp=(function(){return Bo({type:t,selectors:[[`mat-chip-set`]],contentQueries:function(o,s,h){if(o&1&&Am(h,di,5),o&2){let p;_b(p=Sb())&&(s._chips=p)}},hostAttrs:[1,`mat-mdc-chip-set`,`mdc-evolution-chip-set`],hostVars:1,hostBindings:function(o,s){o&1&&Mm(`keydown`,function(p){return s._handleKeydown(p)}),o&2&&Ho(`role`,s.role)},inputs:{disabled:[2,`disabled`,`disabled`,ud],role:`role`,tabIndex:[2,`tabIndex`,`tabIndex`,n=>n==null?0:YT(n)]},ngContentSelectors:[`*`],decls:2,vars:0,consts:[[`role`,`presentation`,1,`mdc-evolution-chip-set__chips`]],template:function(o,s){o&1&&(Xl(),Zl(0,`div`,0),Jl(1),Yl())},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 8px 0 8px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2})})()}return t})();var Ht=(()=>{class t{static ɵfac=function(n){return new(n||t)};static ɵmod=Kt$1({type:t});static ɵinj=yt({providers:[Kt$2,{provide:Vt,useValue:{separatorKeyCodes:[13]}}],imports:[Kn,Dv]})}return t})();function $t(t,e){if(t&1&&Cm(0,`app-grafico`,0),t&2){let i=Cb();wm(`datos`,i.datos())(`opciones`,i.opciones)(`alto`,300)}}function Wt(t,e){t&1&&(Ls(0,`div`,1),Qb(1,`Sin servicios en el periodo.`),ql())}var Q=class t{evidencia=uH.required();total=IT(()=>this.evidencia().completa+this.evidencia().incompleta);datos=IT(()=>({labels:[`Completa`,`Incompleta`],datasets:[{data:[this.evidencia().completa,this.evidencia().incompleta],backgroundColor:[N.verde,N.ambar],borderColor:`#fff`,borderWidth:2}]}));opciones={cutout:`62%`,plugins:{legend:Ei,tooltip:{callbacks:{label:e=>`${e.label}: ${e.parsed} (${(Number(e.parsed)/this.total()*100).toFixed(0)} %)`}}}};static ɵfac=function(i){return new(i||t)};static ɵcmp=Bo({type:t,selectors:[[`app-grafico-evidencia`]],hostAttrs:[1,`tarjeta`],inputs:{evidencia:[1,`evidencia`]},decls:4,vars:1,consts:[[`tipo`,`doughnut`,3,`datos`,`opciones`,`alto`],[1,`vacio`]],template:function(i,n){i&1&&(Ls(0,`h2`),Qb(1,`Evidencia de los servicios`),ql(),lb(2,$t,1,3,`app-grafico`,0)(3,Wt,2,0,`div`,1)),i&2&&(cw(2),fb(n.total()>0?2:3))},dependencies:[wt],encapsulation:2})};var Ut=(t,e)=>e.idServicio;function Yt(t,e){t&1&&(Ls(0,`p`,12),Qb(1,`La fecha de inicio no puede ser posterior a la fecha de fin.`),ql())}function Zt(t,e){t&1&&(Ls(0,`div`,13),Cm(1,`mat-spinner`,14),ql())}function Xt(t,e){if(t&1&&Qb(0),t&2){let i=Cb();td(` (`,i.operacion.atrasos.cantidad,`) `)}}function Jt(t,e){if(t&1&&(Ls(0,`div`,29)(1,`div`)(2,`strong`),Qb(3),ql(),Ls(4,`small`),Qb(5),gT(6,`date`),gT(7,`date`),ql()(),Cm(8,`app-estado`,50),ql()),t&2){let i=e.$implicit;cw(3),Um(i.tipo),cw(2),$m(``,yT(6,4,i.inicio,`dd/MM/yyyy HH:mm`),` – `,yT(7,7,i.fin,`HH:mm`)),cw(3),wm(`valor`,i.estado)}}function tn(t,e){t&1&&(Ls(0,`div`,30),Qb(1,`Sin atrasos en el periodo.`),ql())}function nn(t,e){t&1&&(Ls(0,`th`,51),Qb(1,`Alojamiento`),ql())}function en(t,e){if(t&1&&(Ls(0,`td`,52),Qb(1),ql()),t&2){let i=e.$implicit;cw(),Um(i.alojamiento)}}function an(t,e){t&1&&(Ls(0,`td`,53),Qb(1,`Total`),ql())}function cn(t,e){t&1&&(Ls(0,`th`,54),Qb(1,`Ingresos`),ql())}function on(t,e){if(t&1&&(Ls(0,`td`,55),Qb(1),gT(2,`currency`),ql()),t&2){let i=e.$implicit;cw(),Um(vT(2,1,i.ingresos,`PEN`,`symbol-narrow`,`1.2-2`))}}function rn(t,e){if(t&1&&(Ls(0,`td`,56),Qb(1),gT(2,`currency`),ql()),t&2){let i=Cb(2);cw(),Um(vT(2,1,i.totales().ingresos,`PEN`,`symbol-narrow`,`1.2-2`))}}function dn(t,e){t&1&&(Ls(0,`th`,54),Qb(1,`Gastos`),ql())}function ln(t,e){if(t&1&&(Ls(0,`td`,55),Qb(1),gT(2,`currency`),ql()),t&2){let i=e.$implicit;cw(),Um(vT(2,1,i.gastos,`PEN`,`symbol-narrow`,`1.2-2`))}}function pn(t,e){if(t&1&&(Ls(0,`td`,56),Qb(1),gT(2,`currency`),ql()),t&2){let i=Cb(2);cw(),Um(vT(2,1,i.totales().gastos,`PEN`,`symbol-narrow`,`1.2-2`))}}function sn(t,e){t&1&&(Ls(0,`th`,54),Qb(1,`Neto`),ql())}function mn(t,e){if(t&1&&(Ls(0,`td`,55),Qb(1),gT(2,`currency`),ql()),t&2){let i=e.$implicit;cw(),Um(vT(2,1,i.neto,`PEN`,`symbol-narrow`,`1.2-2`))}}function hn(t,e){if(t&1&&(Ls(0,`td`,56),Qb(1),gT(2,`currency`),ql()),t&2){let i=Cb(2);cw(),Um(vT(2,1,i.totales().neto,`PEN`,`symbol-narrow`,`1.2-2`))}}function un(t,e){t&1&&(Ls(0,`th`,54),Qb(1,`Noches ocupadas`),ql())}function vn(t,e){if(t&1&&(Ls(0,`td`,55),Qb(1),ql()),t&2){let i=e.$implicit;cw(),Um(i.nochesOcupadas)}}function gn(t,e){if(t&1&&(Ls(0,`td`,56),Qb(1),ql()),t&2){let i=Cb(2);cw(),Um(i.totales().nochesOcupadas)}}function _n(t,e){t&1&&(Ls(0,`th`,54),Qb(1,`Reservas`),ql())}function fn(t,e){if(t&1&&(Ls(0,`td`,55),Qb(1),ql()),t&2){let i=e.$implicit;cw(),Um(i.reservas)}}function yn(t,e){if(t&1&&(Ls(0,`td`,56),Qb(1),ql()),t&2){let i=Cb(2);cw(),Um(i.totales().reservas)}}function bn(t,e){t&1&&(Ls(0,`th`,54),Qb(1,`Ocupación`),ql())}function wn(t,e){if(t&1&&(Ls(0,`td`,55),Qb(1),gT(2,`number`),ql()),t&2){let i=e.$implicit;cw(),td(``,yT(2,1,i.ocupacion,`1.1-1`),` %`)}}function xn(t,e){if(t&1&&(Ls(0,`td`,56),Qb(1),gT(2,`number`),ql()),t&2){let i=Cb();cw(),td(``,yT(2,1,i.ocupacion.ocupacionPromedio,`1.1-1`),` %`)}}function Cn(t,e){t&1&&Cm(0,`tr`,57)}function Sn(t,e){t&1&&Cm(0,`tr`,58)}function kn(t,e){t&1&&Cm(0,`tr`,49)}function Nn(t,e){if(t&1&&ym(0,kn,1,0,`tr`,59),t&2){let i=Cb(2);wm(`matFooterRowDef`,i.columnas)}}function In(t,e){t&1&&(Ls(0,`div`,30),Qb(1,`Sin movimiento en el periodo.`),ql())}function En(t,e){if(t&1&&(Ls(0,`p`,15),Qb(1),ql(),Ls(2,`section`,16)(3,`div`,17)(4,`span`,18),Qb(5,`Ingresos`),ql(),Ls(6,`span`,19),Qb(7),gT(8,`currency`),ql(),Ls(9,`span`,20),Qb(10,`Pagos cobrados`),ql()(),Ls(11,`div`,17)(12,`span`,18),Qb(13,`Gastos`),ql(),Ls(14,`span`,21),Qb(15),gT(16,`currency`),ql(),Ls(17,`span`,20),Qb(18,`Mantenimiento y otros`),ql()(),Ls(19,`div`,17)(20,`span`,18),Qb(21,`Neto`),ql(),Ls(22,`span`,19),Qb(23),gT(24,`currency`),ql(),Ls(25,`span`,20),Qb(26,`Ingresos menos gastos`),ql()(),Ls(27,`div`,17)(28,`span`,18),Qb(29,`Pendiente de cobro`),ql(),Ls(30,`span`,22),Qb(31),gT(32,`currency`),ql(),Ls(33,`span`,20),Qb(34,`Pagos aún no cobrados`),ql()()(),Ls(35,`section`,23),Cm(36,`app-grafico-ingresos`,24)(37,`app-grafico-ocupacion`,24)(38,`app-grafico-servicios`,25)(39,`app-grafico-incidencias`,26)(40,`app-grafico-evidencia`,27),Ls(41,`div`,28)(42,`h2`),Qb(43,`Servicios atrasados `),lb(44,Xt,1,1),ql(),hb(45,Jt,9,10,`div`,29,Ut,!1,tn,2,0,`div`,30),ql()(),Ls(48,`h2`,31),Qb(49,`Detalle por alojamiento`),ql(),Ls(50,`div`,32)(51,`table`,33),Ql(52,34),ym(53,nn,2,0,`th`,35)(54,en,2,1,`td`,36)(55,an,2,0,`td`,37),Kl(),Ql(56,38),ym(57,cn,2,0,`th`,39)(58,on,3,6,`td`,40)(59,rn,3,6,`td`,41),Kl(),Ql(60,42),ym(61,dn,2,0,`th`,39)(62,ln,3,6,`td`,40)(63,pn,3,6,`td`,41),Kl(),Ql(64,43),ym(65,sn,2,0,`th`,39)(66,mn,3,6,`td`,40)(67,hn,3,6,`td`,41),Kl(),Ql(68,44),ym(69,un,2,0,`th`,39)(70,vn,2,1,`td`,40)(71,gn,2,1,`td`,41),Kl(),Ql(72,45),ym(73,_n,2,0,`th`,39)(74,fn,2,1,`td`,40)(75,yn,2,1,`td`,41),Kl(),Ql(76,46),ym(77,bn,2,0,`th`,39)(78,wn,3,4,`td`,40)(79,xn,3,4,`td`,41),Kl(),ym(80,Cn,1,0,`tr`,47)(81,Sn,1,0,`tr`,48),lb(82,Nn,1,1,`tr`,49),ql(),lb(83,In,2,0,`div`,30),ql()),t&2){let i=e,n=Cb();cw(),$m(`Periodo consultado: del `,n.fechaCorta(n.periodo().fechaInicio),` al `,n.fechaCorta(n.periodo().fechaFin)),cw(),Qs(`actualizando`,n.cargando()),cw(5),Um(vT(8,26,i.ingresos.totalIngresos,`PEN`,`symbol-narrow`,`1.2-2`)),cw(8),Um(vT(16,31,i.ingresos.totalGastos,`PEN`,`symbol-narrow`,`1.2-2`)),cw(7),Qs(`positivo`,i.ingresos.neto>=0)(`negativo`,i.ingresos.neto<0),cw(),td(` `,vT(24,36,i.ingresos.neto,`PEN`,`symbol-narrow`,`1.2-2`),` `),cw(8),Um(vT(32,41,i.ingresos.pendienteDeCobro,`PEN`,`symbol-narrow`,`1.2-2`)),cw(4),Qs(`actualizando`,n.cargando()),cw(),wm(`reporte`,i.ingresos),cw(),wm(`reporte`,i.ocupacion),cw(),wm(`porEstado`,i.operacion.serviciosPorEstado),cw(),wm(`porPrioridad`,i.operacion.incidenciasPorPrioridad),cw(),wm(`evidencia`,i.operacion.evidencia),cw(4),fb(i.operacion.atrasos.cantidad>0?44:-1),cw(),gb(i.operacion.atrasos.servicios),cw(6),wm(`dataSource`,n.detalle()),cw(29),wm(`matHeaderRowDef`,n.columnas),cw(),wm(`matRowDefColumns`,n.columnas),cw(),fb(n.detalle().length?82:-1),cw(),fb(n.detalle().length?-1:83)}}function Mn(t){let{fechaInicio:e,fechaFin:i}=t.value;return e&&i&&e>i?{periodoInvertido:!0}:null}var Gt=class t{fb=g(qs);reportes=g(p);hoy=/* @__PURE__ */ new Date;form=this.fb.nonNullable.group({fechaInicio:[n(new Date(this.hoy.getFullYear(),this.hoy.getMonth(),this.hoy.getDate()-90)),ke.required],fechaFin:[n(this.hoy),ke.required]},{validators:Mn});datos=yr(null);cargando=yr(!1);periodo=yr({fechaInicio:``,fechaFin:``});columnas=[`alojamiento`,`ingresos`,`gastos`,`neto`,`nochesOcupadas`,`reservas`,`ocupacion`];detalle=IT(()=>{let e=this.datos();if(!e)return[];let i=/* @__PURE__ */ new Map,n=(o,s)=>(i.has(o)||i.set(o,{idAlojamiento:o,alojamiento:s,ingresos:0,gastos:0,neto:0,nochesOcupadas:0,reservas:0,ocupacion:0}),i.get(o));return e.ingresos.porAlojamiento.forEach(o=>Object.assign(n(o.idAlojamiento,o.alojamiento),o)),e.ocupacion.porAlojamiento.forEach(o=>Object.assign(n(o.idAlojamiento,o.alojamiento),o)),[...i.values()].sort((o,s)=>s.ingresos-o.ingresos||o.alojamiento.localeCompare(s.alojamiento))});totales=IT(()=>{let e=this.detalle(),i=n=>e.reduce((o,s)=>o+s[n],0);return{ingresos:i(`ingresos`),gastos:i(`gastos`),neto:i(`neto`),nochesOcupadas:i(`nochesOcupadas`),reservas:i(`reservas`)}});constructor(){this.consultar()}consultar(){if(this.form.invalid){this.form.markAllAsTouched();return}let{fechaInicio:e,fechaFin:i}=this.form.getRawValue();this.cargando.set(!0),Va({ingresos:this.reportes.ingresos(e,i),ocupacion:this.reportes.ocupacion(e,i),operacion:this.reportes.operacion(e,i)}).subscribe({next:n=>{this.datos.set(n),this.periodo.set({fechaInicio:e,fechaFin:i}),this.cargando.set(!1)},error:()=>this.cargando.set(!1)})}atajo(e){let i=/* @__PURE__ */ new Date,n$1=new Date(i.getFullYear(),i.getMonth()-1,1),[o$1,s]=e===`mes`?[r(i),o(i)]:e===`mesAnterior`?[r(n$1),o(n$1)]:[new Date(i.getFullYear(),i.getMonth(),i.getDate()-90),i];this.form.setValue({fechaInicio:n(o$1),fechaFin:n(s)}),this.consultar()}exportarCsv(){let{fechaInicio:e,fechaFin:i}=this.periodo(),n=[`Alojamiento`,`Ingresos`,`Gastos`,`Neto`,`Noches ocupadas`,`Reservas`,`Ocupación (%)`],o=this.detalle().map(p=>[`"${p.alojamiento.replaceAll(`"`,`""`)}"`,p.ingresos,p.gastos,p.neto,p.nochesOcupadas,p.reservas,p.ocupacion].join(`,`)),s=`﻿`+[n.join(`,`),...o].join(`\r
`),h=document.createElement(`a`);h.href=URL.createObjectURL(new Blob([s],{type:`text/csv;charset=utf-8`})),h.download=`nido-reporte-${e}-${i}.csv`,h.click(),URL.revokeObjectURL(h.href)}imprimir(){window.print()}fechaCorta(e){return e.split(`-`).reverse().join(`/`)}static ɵfac=function(i){return new(i||t)};static ɵcmp=Bo({type:t,selectors:[[`app-reportes`]],decls:40,vars:6,consts:[[1,`pagina`],[1,`encabezado`],[1,`acciones-reporte`,`no-imprimir`],[`mat-stroked-button`,``,`type`,`button`,3,`click`,`disabled`],[`novalidate`,``,1,`tarjeta`,`periodo`,`no-imprimir`,3,`ngSubmit`,`formGroup`],[1,`herramientas`],[`appearance`,`outline`,`subscriptSizing`,`dynamic`],[`matInput`,``,`type`,`date`,`formControlName`,`fechaInicio`],[`matInput`,``,`type`,`date`,`formControlName`,`fechaFin`],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`aria-label`,`Atajos de periodo`],[3,`click`],[`role`,`alert`,1,`error`],[1,`cargando`],[`diameter`,`40`],[1,`rango`],[1,`kpis`],[1,`kpi`],[1,`etiqueta`],[1,`valor`],[1,`detalle`],[1,`valor`,`gasto`],[1,`valor`,`pendiente`],[1,`rejilla-graficos`],[3,`reporte`],[3,`porEstado`],[3,`porPrioridad`],[3,`evidencia`],[1,`tarjeta`],[1,`atraso`],[1,`vacio`],[1,`titulo-tabla`],[1,`tarjeta-tabla`],[`mat-table`,``,3,`dataSource`],[`matColumnDef`,`alojamiento`],[`mat-header-cell`,``,4,`matHeaderCellDef`],[`mat-cell`,``,4,`matCellDef`],[`mat-footer-cell`,``,4,`matFooterCellDef`],[`matColumnDef`,`ingresos`],[`mat-header-cell`,``,`class`,`numero`,4,`matHeaderCellDef`],[`mat-cell`,``,`class`,`numero`,4,`matCellDef`],[`mat-footer-cell`,``,`class`,`numero`,4,`matFooterCellDef`],[`matColumnDef`,`gastos`],[`matColumnDef`,`neto`],[`matColumnDef`,`nochesOcupadas`],[`matColumnDef`,`reservas`],[`matColumnDef`,`ocupacion`],[`mat-header-row`,``,4,`matHeaderRowDef`],[`mat-row`,``,4,`matRowDef`,`matRowDefColumns`],[`mat-footer-row`,``],[3,`valor`],[`mat-header-cell`,``],[`mat-cell`,``],[`mat-footer-cell`,``],[`mat-header-cell`,``,1,`numero`],[`mat-cell`,``,1,`numero`],[`mat-footer-cell`,``,1,`numero`],[`mat-header-row`,``],[`mat-row`,``],[`mat-footer-row`,``,4,`matFooterRowDef`]],template:function(i,n){if(i&1&&(Ls(0,`div`,0)(1,`header`,1)(2,`div`)(3,`h1`),Qb(4,`Reportes`),ql(),Ls(5,`p`),Qb(6,`Ingresos, ocupación y operación de los alojamientos en un periodo.`),ql()(),Ls(7,`div`,2)(8,`button`,3),Mm(`click`,function(){return n.exportarCsv()}),Ls(9,`mat-icon`),Qb(10,`download`),ql(),Qb(11,` Exportar CSV `),ql(),Ls(12,`button`,3),Mm(`click`,function(){return n.imprimir()}),Ls(13,`mat-icon`),Qb(14,`print`),ql(),Qb(15,` Imprimir `),ql()()(),Ls(16,`form`,4),Mm(`ngSubmit`,function(){return n.consultar()}),Ls(17,`div`,5)(18,`mat-form-field`,6)(19,`mat-label`),Qb(20,`Fecha de inicio`),ql(),Ls(21,`input`,7),Yw(),ql()(),Ls(22,`mat-form-field`,6)(23,`mat-label`),Qb(24,`Fecha de fin`),ql(),Ls(25,`input`,8),Yw(),ql()(),Ls(26,`button`,9)(27,`mat-icon`),Qb(28,`search`),ql(),Qb(29,` Consultar `),ql()(),Ls(30,`mat-chip-set`,10)(31,`mat-chip`,11),Mm(`click`,function(){return n.atajo(`mes`)}),Qb(32,`Este mes`),ql(),Ls(33,`mat-chip`,11),Mm(`click`,function(){return n.atajo(`mesAnterior`)}),Qb(34,`Mes anterior`),ql(),Ls(35,`mat-chip`,11),Mm(`click`,function(){return n.atajo(`noventa`)}),Qb(36,`Últimos 90 días`),ql()(),lb(37,Yt,2,0,`p`,12),ql(),lb(38,Zt,2,0,`div`,13)(39,En,84,46),ql()),i&2){let o;cw(8),wm(`disabled`,!n.datos()),cw(4),wm(`disabled`,!n.datos()),cw(4),wm(`formGroup`,n.form),cw(5),Kw(),cw(4),Kw(),cw(),wm(`disabled`,n.form.invalid||n.cargando()),cw(11),fb(n.form.hasError(`periodoInvertido`)?37:-1),cw(),fb(n.cargando()&&!n.datos()?38:(o=n.datos())?39:-1,o)}},dependencies:[Zs,Ws,ia,Gs,Hs,Bo$1,qo,$t$2,$e,re,Pe,Be,Ns,xs,j$,P$,Ht,di,jt,qt$1,It,Ht$1,jt$1,zt,At,Wt$1,Pt$1,Ut$1,Lt$1,Vt$1,Bt$1,Qt,Kt,$t$1,J,Z,E,Ta,La,Ra,Oa,Q,M_,__,S_],styles:[`.rejilla-graficos[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr));margin-bottom:24px}.rejilla-graficos[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{min-width:0}.acciones-reporte[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.periodo[_ngcontent-%COMP%]{margin-bottom:16px}.periodo[_ngcontent-%COMP%]   .herramientas[_ngcontent-%COMP%]{margin-bottom:12px}.periodo[_ngcontent-%COMP%]   .herramientas[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:180px}.error[_ngcontent-%COMP%]{color:#9b2c20;font-size:13px;margin:10px 0 0}.rango[_ngcontent-%COMP%]{color:var(--%NS%nido-gris);margin:0 0 12px}.actualizando[_ngcontent-%COMP%]{opacity:.55;transition:opacity .2s}.kpi[_ngcontent-%COMP%]   .valor.gasto[_ngcontent-%COMP%]{color:var(--%NS%nido-ambar)}.kpi[_ngcontent-%COMP%]   .valor.pendiente[_ngcontent-%COMP%]{color:#8a5a00}.kpi[_ngcontent-%COMP%]   .valor.positivo[_ngcontent-%COMP%]{color:#1d6b3d}.kpi[_ngcontent-%COMP%]   .valor.negativo[_ngcontent-%COMP%]{color:#9b2c20}.atraso[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--%NS%nido-borde)}.atraso[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.atraso[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--%NS%nido-gris)}.titulo-tabla[_ngcontent-%COMP%]{font-size:18px;margin:0 0 12px}.numero[_ngcontent-%COMP%]{text-align:right;white-space:nowrap}td[mat-footer-cell][_ngcontent-%COMP%]{font-weight:600}@media print{.no-imprimir[_ngcontent-%COMP%]{display:none}}`]})};export{Gt as ReportesPage};