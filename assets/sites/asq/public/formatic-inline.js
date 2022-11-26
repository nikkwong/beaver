// class FormaticInline extends Formatic {
//     constructor(c: IConfig) {
//         super(c);
//     }
//     private setTitle(obj: { name: string, id: string }) {
//         const el = document.getElementById('list-item-' + obj.id + '-title');
//         if (!el) return console.log('Attempting to set widget survey name but there are no widget elements');
//         el.innerHTML = obj.name;
//     }
//     protected resize() {
//         const el = document.getElementById('formatic-widget');
//         const listContainer = document.getElementById('formatic-widget-list-container');
//         const elTrigger = document.getElementById('formatic-widget-frame-trigger');
//         const isLg = window.outerWidth >= 450;
//         // this.el.style.top = 'calc(100% - 201px)' : 
//         el.style.width = isLg ? 'initial' : (this.fullscreen ? '100%' : (this.open ? '220px' : '50px'));
//         el.style.marginLeft = isLg ? 'initial' : 'auto';
//         el.style.right = isLg ? '20px' : (this.fullscreen ? '0px' : '20px');
//         el.style.left = isLg ? 'calc(100% - 400px)' : (this.fullscreen ? '0px' : 'initial');
//         el.style.top = (this.fullscreen && !isLg) ? '0px' : (isLg ? 'calc(100% - ' + (Formatic.widget.height + 'px' + ')') : /* is sm */ 'calc(100% - 275px)');
//         el.style.bottom = (this.fullscreen && !isLg) ? '0px' : '20px';
//         // Move inner iframe to bottom (not atop the button);
//         listContainer.style.bottom = (this.fullscreen && !isLg) ? '0px' : '60px';
//         elTrigger.style.display = (this.fullscreen && !isLg) ? 'none' : 'block';
//         // Hide radius on fs
//         listContainer.style.borderRadius = (this.fullscreen && !isLg) ? '0px' : '20px';
//         // override all if hidden.
//         if (this.open) {
//             if (el.style.display === 'none') {
//                 this.open = true;
//                 setTimeout(() => {
//                     listContainer.style.width = '100%';
//                     listContainer.style.height = '100%';
//                 })
//             } else {
//                 listContainer.style.width = '100%';
//                 listContainer.style.height = '100%';
//             }
//             el.style.left = 'calc(100% - 400px)';
//             // setTimeout(() => {
//             // })
//         } else {
//             el.style.top = 'calc(100% - 95px)';
//             el.style.left = 'calc(100% - 70px)';
//             // listContainer.style.top = '0px';
//             listContainer.style.width = '0px';
//             listContainer.style.height = '0px';
//         }
//     }
//     /**
//      * @description If the type is widget, then we have to create an
//      * element for it, and then add it to the page. 
//      * If its not a widget, we ahve to find it on the page
//      * and init it. 
//      * 
//      */
//     private initWidget() {
//         this.fmWidgetNotifications = document.createElement('div');
//         this.fmWidgetNotifications.id = 'fmNotifications';
//         this.fmWidgetNotifications.style.cssText += 'display:none;position: absolute;top: 0;left: 0;height: 15px;width: 15px;background: #fc6666;z-index: 123;border-radius: 100%;font-size: 10px;text-align: center;line-height: 14px;color: white;';
//         this.formaticWidgetParent = document.createElement('div');
//         this.formaticWidgetParent.id = 'formatic-widget';
//         this.formaticWidgetListContainer = document.createElement('div');
//         this.formaticWidgetListContainer.id = 'formatic-widget-list-container';
//         this.formaticWidgetListContainer.style.cssText += ('border:0;height:0;margin-top:100%;margin-left:auto;width:0;bottom:0px;right:0;overflow:hidden;position: absolute;background:white;transition: height .5s linear, width .5s linear, margin-top .5s linear;' + this.boxShadow);
//         this.formaticWidgetList = document.createElement('div');
//         this.formaticWidgetList.style.display = 'none';
//         this.formaticWidgetList.id = 'formatic-widget-list';
//         this.formaticWidgets = document.createElement('div');
//         this.formaticWidgets.id = 'formatic-widgets';
//         this.formaticWidgets.style.cssText += 'height: 100%;';
//         this.formaticWidgetListContainer.innerHTML = this.loaderTmp;
//         this.formaticWidgetListContainer.appendChild(this.formaticWidgetList);
//         this.formaticWidgetListContainer.appendChild(this.formaticWidgets);
//         const styles = document.createElement('style');
//         styles.innerHTML = this.kf;
//         this.formaticWidgetParent.appendChild(this.formaticWidgetListContainer);
//         this.formaticWidgetParent.appendChild(styles);
//         document.body.appendChild(this.formaticWidgetParent);
//         this.formaticWidgetParent.style.cssText = 'display: none;z-index: 2147483647; left: 0; transition: top .5s linear, left .5s linear;position: fixed;top: calc(100% - 97px);bottom:20px;';
//         // this.formaticParentEl.style.left = this.opts.widgetPos === 'left' ? '20px' : 'calc(100% - 400px)';
//         // this.formaticParentEl.style.right = this.opts.widgetPos === 'right' ? '20px' : 'calc(100% - 400px)';
//         this.widgetTriggerFrameWrapper = document.createElement('div');
//         this.widgetTriggerFrameWrapper.id = 'formatic-widget-frame-trigger-wrapper';
//         this.widgetTriggerFrameWrapper.style.cssText += 'height: 50px;width: 50px;cursor:pointer;position: absolute;bottom: 0px;right: 0px;';
//         this.widgetTriggerFrame = document.createElement('iframe');
//         this.widgetTriggerFrame.id = 'formatic-widget-frame-trigger';
//         const body = document.createElement('body');
//         body.style.cssText = 'margin: 0;';
//         body.innerHTML = ` 
//                 <div id="fm-trigger" style="padding: 0 10px; position: relative;background: #1eccff; cursor: pointer;">
//                     <?xml version="1.0" encoding="UTF-8" standalone="no"?>
//                     <svg width="100%" height="100%" viewBox="0 0 397 224" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//                         <g id="fm-logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//                             <g id="Artboard-10" transform="translate(-1608.000000, -141.000000)" fill="#FFFFFF">
//                                 <g id="Group-10" transform="translate(1806.500000, 253.000000) rotate(-180.000000) translate(-1806.500000, -253.000000) translate(1608.000000, 141.000000)">
//                                     <polygon id="Fill-40" points="231.823661 42.5129731 99 42.5129731 106.330014 0 239.153674 0"></polygon>
//                                     <polygon id="Fill-48" points="321.49459 0 279.912344 0 272.584906 42.5129731 314.162 42.5129731"></polygon>
//                                     <polygon id="Fill-40" points="231.823661 223.312973 99 223.312973 106.330014 180.8 239.153674 180.8"></polygon>
//                                     <polygon id="Fill-48" points="321.49459 180.8 279.912344 180.8 272.584906 223.312973 314.162 223.312973"></polygon>
//                                     <polygon id="Fill-40" points="307.295358 132.912973 174.471698 132.912973 181.801711 90.4 314.625372 90.4"></polygon>
//                                     <polygon id="Fill-40" points="133.710453 132.912973 0.886792 132.912973 8.21680574 90.4 141.040466 90.4"></polygon>
//                                     <polygon id="Fill-48" points="396.966287 90.4 355.384042 90.4 348.056603 132.912973 389.633698 132.912973"></polygon>
//                                 </g>
//                             </g>
//                         </g> 
//                     </svg>
//                 </div>`;
//         const s = document.createElement('script');
//         s.innerHTML = `
//             window.addEventListener('click', function(event) {
//                 event.preventDefault();window.parent.postMessage({triggerClick: true}, '*'); return false;});
//             window.addEventListener('touchend', function(event) {
//                 event.preventDefault();window.parent.postMessage({triggerClick: true}, '*'); return false;});`;
//         body.appendChild(s);
//         this.widgetTriggerFrame.style.cssText = 'border: 0; width:100%;height:100%;border-radius: 50%;box-shadow: rgba(0, 0, 0, .3) 0px 15px 30px;';
//         // TODO: Reenable
//         this.widgetTriggerFrame.style.right = '0';
//         this.widgetTriggerFrame.style.left = 'initial';
//         this.formaticWidgetParent.style.left = 'calc(100% - 400px)';
//         this.formaticWidgetParent.style.right = '20px';
//         // this.formaticParentEl.style.left = this.opts.widgetPos === 'left' ? '20px' : 'calc(100% - 400px)';
//         // this.formaticParentEl.style.right = this.opts.widgetPos === 'right' ? '20px' : 'calc(100% - 400px)';
//         // this.widgetTriggerFrame.style.right = this.opts.widgetPos === 'right' ? '0' : 'initial';
//         // this.widgetTriggerFrame.style.left = this.opts.widgetPos === 'left' ? '0' : 'initial';
//         this.widgetTriggerFrameWrapper.appendChild(this.widgetTriggerFrame);
//         this.widgetTriggerFrameWrapper.appendChild(this.fmWidgetNotifications);
//         this.formaticWidgetParent.appendChild(this.widgetTriggerFrameWrapper);
//         this.widgetTriggerFrame.contentWindow.document.body = body;
//     }
//     protected init() {
//         /* We add the iframe to the base widget in the case that this is a widget. If its not a widget, we must just add it to the element that was passed in */
//         const parent = this.config.type === 'widget' ? this.formaticWidgetListContainer : this.config.parent;
//         const formaticIFrameWrapper = document.createElement('div');
//         formaticIFrameWrapper.id = 'fm-frame-wrapper';
//         formaticIFrameWrapper.style.cssText += 'height: 100%;';
//         if (this.config.type !== 'widget')
//             parent.prepend(formaticIFrameWrapper);
//         const formaticIFrame = document.createElement('iframe');
//         formaticIFrame.id = 'fm-frame-' + this.config.surveyId;
//         formaticIFrame.className += 'fm-frame';
//         //<!-- https://gist.github.com/Mao8a/5963675 -->
//         formaticIFrame.style.cssText += 'height:100%;border:0;width: 1px;min-width: 100%;transition:height .5s linear, width .5s linear;';
//         // formaticIFrame.setAttribute('scrolling', 'no');
//         formaticIFrameWrapper.appendChild(formaticIFrame);
//         if (this.config.type === 'inline') {
//             parent.style.width = parent.dataset['width'] || '100%';
//             parent.style.height = parent.dataset['height'] || '500px';
//         }
//         if (this.config.type !== 'button' && this.config.type !== 'widget')
//             formaticIFrameWrapper.style.cssText += this.boxShadow;
//         if (this.config.type === 'widget') {
//             formaticIFrameWrapper.id = `formatic-widget-frame-wrapper-${this.config.surveyId}`;
//             formaticIFrameWrapper.className += 'formatic-widget-frame-wrapper';
//         }
//         // At this point elements have been styled and frames have been attached. Now let's add our event listener.
//         switch (this.config.showEvent) {
//             case 'click':
//                 this.createClickHandler();
//             case 'onload':
//                 this.load();
//             case 'scroll':
//                 this.createScrollHandler();
//             case 'timeout':
//                 this.createTimeoutHandler();
//             default: this.load();
//         }
//         window.addEventListener("resize", () => {
//             setTimeout(() => {
//                 this.resize();
//             }, 500);
//         });
//         this.load();
//     }
// } 
