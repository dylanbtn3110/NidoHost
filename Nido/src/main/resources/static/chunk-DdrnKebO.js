import{t as g}from"./chunk-Bjd0E5uO.js";import{t as e}from"./chunk-CWVJ7qjH.js";import{n as fn,r as gn,t as $$1}from"./chunk-DCGowrPB.js";import{t as E}from"./chunk-BjddbmDx.js";import{$t as He,At as to,Ct as _e,Dn as Qb,Dr as gb,Dt as ko,En as Q,Et as ke,Fn as Sm,G as Bo$1,Gt as D,Ht as Cb,Jr as ql,Jt as Dv,Mr as j$,Mt as xs,Nt as $$2,On as Ql,Ot as qo,Pn as Sb,Pt as $m,Qn as Yw,Rn as Ui,Rr as lb,St as Zs,Tr as g$1,Tt as ia,Wt as Cm,X as Dt$1,Yn as YT,Yr as r8,Yt as ES,Zr as rl,_i as yr,ai as ud,bn as Nb,bt as Ws,di as xm,dn as Kt$1,dr as bt,ei as sp,en as Ho,et as Gs,fn as Kw,gi as ym,hn as Ls,hr as cw,it as K,jr as ie,kn as Qs,kr as hb,kt as qs,li as wm,ln as Kl,nn as Ib,nr as _b,nt as Hs,o as pt,on as Jl,pt as Se,qn as Xl,qr as pb,si as vp,sn as Js,sr as ap,ti as td,tn as IT,un as Km,ut as Ns,vi as yt$1,vn as Mm,wn as P$,wr as fb,xr as ed,xt as Zr,yr as dy,yt as Wn,zn as Um,zt as Bo}from"./main-LFFLPQ66.js";import{n as j,t as L}from"./chunk-fRYHbQHR.js";import{a as M,c as ie$1,i as Kt$2,n as I,o as Xt$1,r as Jt$1,s as ee,t as $t$1}from"./chunk-DERO7lhh.js";import{n as Pe,t as Be}from"./chunk-bPCide5O.js";import{t as Vt$1}from"./chunk-DNl5cl1H.js";import{a as It,d as Vt$2,f as Wt$1,h as zt$1,i as Ht$1,l as Qt$1,m as qt$1,n as At$1,o as Kt$3,p as jt$1,s as Lt$1}from"./chunk-DGiU6yRI.js";import{l as re,n as $t$2,o as ft,s as mt,t as $e}from"./chunk-C0IUHD70.js";import{t as oe}from"./chunk-CzRzsXBx.js";import"./chunk-Di3a-xKT.js";var St=new D(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var X=class{source;checked;constructor(n,t){this.source=n,this.checked=t}};var H=(()=>{class e{_elementRef=g$1(bt);_focusMonitor=g$1(_e);_changeDetectorRef=g$1(dy);defaults=g$1(St);_injector=g$1(ie);_signalFormField=null;_onChange=t=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(t){return new X(this,t)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=r8();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(t){this._checked=t,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new He;toggleChange=new He;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){g$1(ES).load(Wn);let t=g$1(new Js(`tabindex`),{optional:!0}),l=this.defaults;this.tabIndex=t==null?0:parseInt(t)||0,this.color=l.color||`accent`,this.id=this._uniqueId=g$1(Se).getId(`mat-mdc-slide-toggle-`),this.hideIcon=l.hideIcon??!1,this.disabledInteractive=l.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngOnInit(){this._signalFormField=this._injector.get(oe,void 0,{optional:!0,self:!0})}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t===`keyboard`||t===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(t){t.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}validate(t){return this.required&&t.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(t){this._validatorOnChange=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new X(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(l){return new(l||e)};static ɵcmp=(function(){let t=[`switch`],l=[`*`];function f(m,_){m&1&&(Ls(0,`span`,11),vp(),Ls(1,`svg`,13),Cm(2,`path`,14),ql(),Ls(3,`svg`,15),Cm(4,`path`,16),ql()())}return Bo({type:e,selectors:[[`mat-slide-toggle`]],viewQuery:function(_,s){if(_&1&&xm(t,5),_&2){let I;_b(I=Sb())&&(s._switchElement=I.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(_,s){_&2&&(Sm(`id`,s.id),Ho(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),ed(s.color?`mat-`+s.color:``),Qs(`mat-mdc-slide-toggle-focused`,s._focused)(`mat-mdc-slide-toggle-checked`,s.checked)(`mat-slide-toggle-full-width`,s.fullWidth)(`_mat-animation-noopable`,s._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,ud],color:`color`,disabled:[2,`disabled`,`disabled`,ud],fullWidth:[2,`fullWidth`,`fullWidth`,ud],disableRipple:[2,`disableRipple`,`disableRipple`,ud],tabIndex:[2,`tabIndex`,`tabIndex`,m=>m==null?0:YT(m)],checked:[2,`checked`,`checked`,ud],hideIcon:[2,`hideIcon`,`hideIcon`,ud],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,ud]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[Km([{provide:Dt$1,useExisting:Ui(()=>e),multi:!0},{provide:K,useExisting:e,multi:!0}]),rl],ngContentSelectors:l,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(_,s){if(_&1&&(Xl(),Ls(0,`div`,1)(1,`button`,2,0),Mm(`click`,function(){return s._handleClick()}),Cm(3,`div`,3)(4,`span`,4),Ls(5,`span`,5)(6,`span`,6)(7,`span`,7),Cm(8,`span`,8),ql(),Ls(9,`span`,9),Cm(10,`span`,10),ql(),lb(11,f,5,0,`span`,11),ql()()(),Ls(12,`label`,12),Mm(`click`,function(kt){return kt.stopPropagation()}),Jl(13),ql()()),_&2){let I=Nb(2);wm(`labelPosition`,s.labelPosition),cw(),Qs(`mdc-switch--selected`,s.checked)(`mdc-switch--unselected`,!s.checked)(`mdc-switch--checked`,s.checked)(`mdc-switch--disabled`,s.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,s.disabledInteractive),wm(`tabIndex`,s.disabled&&!s.disabledInteractive?-1:s.tabIndex)(`disabled`,s.disabled&&!s.disabledInteractive),Ho(`id`,s.buttonId)(`name`,s.name)(`aria-label`,s.ariaLabel)(`aria-labelledby`,s._getAriaLabelledBy())(`aria-describedby`,s.ariaDescribedby)(`aria-required`,s.required||null)(`aria-checked`,s.checked)(`aria-disabled`,s.disabled&&s.disabledInteractive?`true`:null),cw(9),wm(`matRippleTrigger`,I)(`matRippleDisabled`,s.disableRipple||s.disabled)(`matRippleCentered`,!0),cw(),fb(s.hideIcon?-1:11),cw(),wm(`for`,s.buttonId),Ho(`id`,s._labelId)}},dependencies:[Zr,g],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--%NS%mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--%NS%mat-slide-toggle-track-height, 32px);
  border-radius: var(--%NS%mat-slide-toggle-track-shape, var(--%NS%mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--%NS%mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--%NS%mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-track-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-color, var(--%NS%mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--%NS%mat-slide-toggle-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-hover-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-focus-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-track-color, var(--%NS%mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--%NS%mat-slide-toggle-selected-track-color, var(--%NS%mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-track-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-track-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--%NS%mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--%NS%mat-slide-toggle-handle-width);
  height: var(--%NS%mat-slide-toggle-handle-height);
  border-radius: var(--%NS%mat-slide-toggle-handle-shape, var(--%NS%mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--%NS%mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--%NS%mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--%NS%selected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-handle-color, var(--%NS%mat-sys-on-primary));
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-handle-color, var(--%NS%mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-handle-color, var(--%NS%mat-sys-surface));
}
.mdc-switch--%NS%unselected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-handle-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--%NS%unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-handle-color, var(--%NS%mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--%NS%mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
  height: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--%NS%unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-selected-icon-color, var(--%NS%mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--%NS%mat-slide-toggle-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-slide-toggle-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-slide-toggle-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-slide-toggle-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-slide-toggle-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-slide-toggle-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--%NS%mat-slide-toggle-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-slide-toggle-full-width {
  width: 100%;
}
.mat-slide-toggle-full-width .mat-internal-form-field {
  width: 100%;
  justify-content: space-between;
}
.mat-slide-toggle-full-width .mat-internal-form-field label {
  margin: 0;
  flex-grow: 1;
  text-align: end;
}
.mat-slide-toggle-full-width .mdc-form-field--align-end label {
  text-align: start;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})})()}return e})();var wt=(()=>{class e{static ɵfac=function(l){return new(l||e)};static ɵmod=Kt$1({type:e});static ɵinj=yt$1({imports:[H,Dv]})}return e})();function Pt(e,n){e&1&&(Ls(0,`mat-error`),Qb(1,`Ingrese los nombres`),ql())}function Dt(e,n){e&1&&(Ls(0,`mat-error`),Qb(1,`Ingrese los apellidos`),ql())}function zt(e,n){e&1&&(Ls(0,`mat-error`),Qb(1,`El DNI debe tener 8 dígitos`),ql())}function Tt(e,n){if(e&1&&(Ls(0,`mat-option`,8),Qb(1),ql()),e&2){let t=n.$implicit;wm(`value`,t),cw(),Um(t)}}function At(e,n){e&1&&(Ls(0,`mat-error`),Qb(1,`Seleccione la especialidad`),ql())}function Rt(e,n){e&1&&(Ls(0,`mat-error`),Qb(1,`Ingrese el usuario (máximo 15 caracteres)`),ql())}function Lt(e,n){e&1&&(Ls(0,`mat-error`),Qb(1,`Mínimo 8 caracteres`),ql())}function Ft(e,n){e&1&&(Ls(0,`mat-error`),Qb(1,`Ingrese un correo válido`),ql())}var $=class e$1{fb=g$1(qs);servicio=g$1(e);aviso=g$1(pt);ref=g$1(M);especialidades=[`LIMPIEZA`,`MANTENIMIENTO`,`INSPECCION`];guardando=yr(!1);verClave=yr(!1);form=this.fb.nonNullable.group({nombres:[``,ke.required],apellidos:[``,ke.required],dni:[``,[ke.required,ke.pattern(/^\d{8}$/)]],login:[``,[ke.required,ke.maxLength(15)]],password:[``,[ke.required,ke.minLength(8)]],correo:[``,ke.email],especialidad:[``,ke.required]});guardar(){if(this.form.invalid){this.form.markAllAsTouched();return}let n=this.form.getRawValue();this.guardando.set(!0),this.servicio.registrarPersonal(Q($$2({},n),{nombres:n.nombres.trim(),apellidos:n.apellidos.trim(),login:n.login.trim()})).subscribe({next:()=>{this.aviso.exito(`Personal registrado`),this.ref.close(!0)},error:()=>this.guardando.set(!1)})}static ɵfac=function(t){return new(t||e$1)};static ɵcmp=Bo({type:e$1,selectors:[[`app-personal-dialogo`]],decls:50,vars:11,consts:[[`mat-dialog-title`,``],[`novalidate`,``,1,`form-dialogo`,3,`ngSubmit`,`formGroup`],[1,`fila-form`],[`appearance`,`outline`],[`matInput`,``,`formControlName`,`nombres`],[`matInput`,``,`formControlName`,`apellidos`],[`matInput`,``,`formControlName`,`dni`,`maxlength`,`8`,`inputmode`,`numeric`],[`formControlName`,`especialidad`],[3,`value`],[`matInput`,``,`formControlName`,`login`,`maxlength`,`15`,`autocomplete`,`off`],[`matInput`,``,`formControlName`,`password`,`autocomplete`,`new-password`,3,`type`],[`mat-icon-button`,``,`matSuffix`,``,`type`,`button`,`aria-label`,`Mostrar u ocultar contraseña`,3,`click`],[`appearance`,`outline`,1,`ancho`],[`matInput`,``,`type`,`email`,`formControlName`,`correo`],[`align`,`end`],[`mat-button`,``,`mat-dialog-close`,``],[`mat-flat-button`,``,3,`click`,`disabled`]],template:function(t,l){t&1&&(Ls(0,`h2`,0),Qb(1,`Registrar personal`),ql(),Ls(2,`mat-dialog-content`)(3,`form`,1),Mm(`ngSubmit`,function(){return l.guardar()}),Ls(4,`div`,2)(5,`mat-form-field`,3)(6,`mat-label`),Qb(7,`Nombres`),ql(),Ls(8,`input`,4),Yw(),ql(),lb(9,Pt,2,0,`mat-error`),ql(),Ls(10,`mat-form-field`,3)(11,`mat-label`),Qb(12,`Apellidos`),ql(),Ls(13,`input`,5),Yw(),ql(),lb(14,Dt,2,0,`mat-error`),ql(),Ls(15,`mat-form-field`,3)(16,`mat-label`),Qb(17,`DNI`),ql(),Ls(18,`input`,6),Yw(),ql(),lb(19,zt,2,0,`mat-error`),ql(),Ls(20,`mat-form-field`,3)(21,`mat-label`),Qb(22,`Especialidad`),ql(),Ls(23,`mat-select`,7),Yw(),hb(24,Tt,2,2,`mat-option`,8,pb),ql(),lb(26,At,2,0,`mat-error`),ql(),Ls(27,`mat-form-field`,3)(28,`mat-label`),Qb(29,`Usuario`),ql(),Ls(30,`input`,9),Yw(),ql(),lb(31,Rt,2,0,`mat-error`),ql(),Ls(32,`mat-form-field`,3)(33,`mat-label`),Qb(34,`Contraseña`),ql(),Ls(35,`input`,10),Yw(),ql(),Ls(36,`button`,11),Mm(`click`,function(){return l.verClave.set(!l.verClave())}),Ls(37,`mat-icon`),Qb(38),ql()(),lb(39,Lt,2,0,`mat-error`),ql(),Ls(40,`mat-form-field`,12)(41,`mat-label`),Qb(42,`Correo`),ql(),Ls(43,`input`,13),Yw(),ql(),lb(44,Ft,2,0,`mat-error`),ql()()()(),Ls(45,`mat-dialog-actions`,14)(46,`button`,15),Qb(47,`Cancelar`),ql(),Ls(48,`button`,16),Mm(`click`,function(){return l.guardar()}),Qb(49,`Guardar`),ql()()),t&2&&(cw(3),wm(`formGroup`,l.form),cw(5),Kw(),cw(),fb(l.form.controls.nombres.invalid?9:-1),cw(4),Kw(),cw(),fb(l.form.controls.apellidos.invalid?14:-1),cw(4),Kw(),cw(),fb(l.form.controls.dni.invalid?19:-1),cw(4),Kw(),cw(),gb(l.especialidades),cw(2),fb(l.form.controls.especialidad.invalid?26:-1),cw(4),Kw(),cw(),fb(l.form.controls.login.invalid?31:-1),cw(4),wm(`type`,l.verClave()?`text`:`password`),Kw(),cw(3),Um(l.verClave()?`visibility_off`:`visibility`),cw(),fb(l.form.controls.password.invalid?39:-1),cw(4),Kw(),cw(),fb(l.form.controls.correo.invalid?44:-1),cw(4),wm(`disabled`,l.guardando()))},dependencies:[Zs,Ws,ia,Gs,Hs,ko,Bo$1,qo,ee,$t$1,Kt$2,Jt$1,Xt$1,$t$2,$e,re,mt,ft,Pe,Be,fn,gn,$$1,Ns,xs,to,j$,P$],styles:[`mat-form-field[_ngcontent-%COMP%]{margin-bottom:8px}`]})};function Ot(e,n){e&1&&Cm(0,`mat-progress-bar`,8)}function Vt(e,n){e&1&&(Ls(0,`th`,23),Qb(1,`Nombre completo`),ql())}function qt(e,n){if(e&1&&(Ls(0,`td`,24)(1,`strong`),Qb(2),ql()()),e&2){let t=n.$implicit;cw(2),$m(``,t.nombres,` `,t.apellidos)}}function Bt(e,n){e&1&&(Ls(0,`th`,23),Qb(1,`Usuario`),ql())}function Xt(e,n){if(e&1&&(Ls(0,`td`,24),Qb(1),ql()),e&2){let t=n.$implicit;cw(),Um(t.login)}}function $t(e,n){e&1&&(Ls(0,`th`,23),Qb(1,`Especialidad`),ql())}function jt(e,n){if(e&1&&(Ls(0,`td`,24),Qb(1),ql()),e&2){let t=n.$implicit;cw(),Um(t.especialidad||`—`)}}function Gt(e,n){e&1&&(Ls(0,`th`,23),Qb(1,`Correo`),ql())}function Ht(e,n){if(e&1&&(Ls(0,`td`,24),Qb(1),ql()),e&2){let t=n.$implicit;cw(),Um(t.correo||`—`)}}function Ut(e,n){e&1&&(Ls(0,`th`,23),Qb(1,`Estado`),ql())}function Wt(e,n){if(e&1&&(Ls(0,`td`,24),Cm(1,`app-estado`,25),ql()),e&2){let t=n.$implicit;cw(),wm(`valor`,t.estado)}}function Zt(e,n){e&1&&Cm(0,`th`,23)}function Qt(e,n){if(e&1){let t=Ib();Ls(0,`td`,26)(1,`button`,27),Mm(`click`,function(){let f=sp(t).$implicit,m=Cb();return ap(m.cambiarEstado(f))}),Qb(2),ql()()}if(e&2){let t=n.$implicit;cw(2),td(` `,t.estado===`ACTIVO`?`Desactivar`:`Activar`,` `)}}function Yt(e,n){e&1&&Cm(0,`tr`,28)}function Jt(e,n){e&1&&Cm(0,`tr`,29)}function Kt(e,n){e&1&&(Ls(0,`div`,22),Qb(1,`No se encontró personal.`),ql())}var yt=class e$2{servicio=g$1(e);dialogo=g$1(I);confirmar=g$1(ie$1);aviso=g$1(pt);personal=yr([]);cargando=yr(!0);texto=yr(``);soloActivos=yr(!0);columnas=[`nombre`,`login`,`especialidad`,`correo`,`estado`,`acciones`];filtrados=IT(()=>{let n=this.texto().trim().toLowerCase();return this.personal().filter(t=>(!this.soloActivos()||t.estado===`ACTIVO`)&&(!n||`${t.nombres} ${t.apellidos} ${t.login} ${t.especialidad??``}`.toLowerCase().includes(n)))});constructor(){this.cargar()}cargar(){this.cargando.set(!0),this.servicio.personal().subscribe({next:n=>{this.personal.set(n),this.cargando.set(!1)},error:()=>this.cargando.set(!1)})}registrar(){this.dialogo.open($,{width:`640px`,maxWidth:`96vw`}).afterClosed().subscribe(n=>{n&&this.cargar()})}async cambiarEstado(n){let t=n.estado===`ACTIVO`?`INACTIVO`:`ACTIVO`;t===`INACTIVO`&&!await this.confirmar.pedir(`Desactivar personal`,`\xBFDesactivar a ${n.nombres} ${n.apellidos}? Ya no podr\xE1 recibir servicios.`,`Desactivar`)||this.servicio.cambiarEstadoPersonal(n.idusuario,t).subscribe(()=>{this.aviso.exito(t===`ACTIVO`?`Personal activado`:`Personal desactivado`),this.cargar()})}static ɵfac=function(t){return new(t||e$2)};static ɵcmp=Bo({type:e$2,selectors:[[`app-personal`]],decls:44,vars:7,consts:[[1,`pagina`],[1,`encabezado`],[`mat-flat-button`,``,3,`click`],[1,`herramientas`],[`appearance`,`outline`,`subscriptSizing`,`dynamic`,1,`crecer`],[`matInput`,``,3,`input`,`value`],[`matSuffix`,``],[3,`change`,`checked`],[`mode`,`indeterminate`],[1,`tarjeta-tabla`],[`mat-table`,``,3,`dataSource`],[`matColumnDef`,`nombre`],[`mat-header-cell`,``,4,`matHeaderCellDef`],[`mat-cell`,``,4,`matCellDef`],[`matColumnDef`,`login`],[`matColumnDef`,`especialidad`],[`matColumnDef`,`correo`],[`matColumnDef`,`estado`],[`matColumnDef`,`acciones`],[`mat-cell`,``,`class`,`acciones`,4,`matCellDef`],[`mat-header-row`,``,4,`matHeaderRowDef`],[`mat-row`,``,4,`matRowDef`,`matRowDefColumns`],[1,`vacio`],[`mat-header-cell`,``],[`mat-cell`,``],[3,`valor`],[`mat-cell`,``,1,`acciones`],[`mat-stroked-button`,``,3,`click`],[`mat-header-row`,``],[`mat-row`,``]],template:function(t,l){t&1&&(Ls(0,`div`,0)(1,`div`,1)(2,`div`)(3,`h1`),Qb(4,`Personal`),ql(),Ls(5,`p`),Qb(6,`Equipo operativo que atiende los servicios de los alojamientos.`),ql()(),Ls(7,`button`,2),Mm(`click`,function(){return l.registrar()}),Ls(8,`mat-icon`),Qb(9,`add`),ql(),Qb(10,` Registrar personal`),ql()(),Ls(11,`div`,3)(12,`mat-form-field`,4)(13,`mat-label`),Qb(14,`Buscar por nombre, usuario o especialidad`),ql(),Ls(15,`input`,5),Mm(`input`,function(m){return l.texto.set(m.target.value)}),ql(),Ls(16,`mat-icon`,6),Qb(17,`search`),ql()(),Ls(18,`mat-slide-toggle`,7),Mm(`change`,function(m){return l.soloActivos.set(m.checked)}),Qb(19,`Solo activos`),ql()(),lb(20,Ot,1,0,`mat-progress-bar`,8),Ls(21,`div`,9)(22,`table`,10),Ql(23,11),ym(24,Vt,2,0,`th`,12)(25,qt,3,2,`td`,13),Kl(),Ql(26,14),ym(27,Bt,2,0,`th`,12)(28,Xt,2,1,`td`,13),Kl(),Ql(29,15),ym(30,$t,2,0,`th`,12)(31,jt,2,1,`td`,13),Kl(),Ql(32,16),ym(33,Gt,2,0,`th`,12)(34,Ht,2,1,`td`,13),Kl(),Ql(35,17),ym(36,Ut,2,0,`th`,12)(37,Wt,2,1,`td`,13),Kl(),Ql(38,18),ym(39,Zt,1,0,`th`,12)(40,Qt,3,1,`td`,19),Kl(),ym(41,Yt,1,0,`tr`,20)(42,Jt,1,0,`tr`,21),ql(),lb(43,Kt,2,0,`div`,22),ql()()),t&2&&(cw(15),wm(`value`,l.texto()),cw(3),wm(`checked`,l.soloActivos()),cw(2),fb(l.cargando()?20:-1),cw(2),wm(`dataSource`,l.filtrados()),cw(19),wm(`matHeaderRowDef`,l.columnas),cw(),wm(`matRowDefColumns`,l.columnas),cw(),fb(!l.cargando()&&l.filtrados().length===0?43:-1))},dependencies:[qt$1,It,Ht$1,jt$1,zt$1,At$1,Wt$1,Lt$1,Vt$2,Qt$1,Kt$3,$t$2,$e,re,ft,Pe,Be,Ns,xs,j$,P$,Vt$1,j,L,wt,H,E],styles:[`table[_ngcontent-%COMP%]{min-width:760px}`]})};export{yt as PersonalPage};