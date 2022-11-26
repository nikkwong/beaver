// import { Formatic, IConfig } from './formatic';
// export class FormaticWidget extends Formatic { 
//     private formaticWidgetList: HTMLElement;
//     private formaticWidgets: HTMLElement;
//     constructor(c: IConfig) {
//         super(c);
//     }
//     private setActiveState(surveyId?: string, screen?: 'list' | 'frame') {
//         // this.screen = screen || this.screen;
//         // this.activeSurveyId = surveyId || this.activeSurveyId;
//         // switch (this.screen) {
//         //     case 'list':
//         //         this.formaticWidgetList.style.display = 'block';
//         //         this.formaticWidgets.style.display = 'none';
//         //         break;
//         //     case 'frame':
//         //         this.formaticWidgetList.style.display = 'none';
//         //         this.formaticWidgets.style.display = 'block';
//         //         Array.prototype.slice.call(document.getElementsByClassName('formatic-widget-frame-wrapper')).forEach((el: HTMLElement) => {
//         //             el.style.display = 'none';
//         //         });
//         //         const currentFrame: HTMLIFrameElement = this.formaticWidgets.querySelector('#formatic-widget-frame-wrapper-' + this.activeSurveyId);
//         //         if (!currentFrame) throw new Error('Unexpected lost frame');
//         //         currentFrame.style.display = 'block';
//         //         break;
//         // }
//         // if (this.open && this.screen === 'frame') {
//         //     const el = document.getElementById('list-item-' + surveyId);
//         //     el.dataset.count = 0;
//         //     const e = el.querySelector('.list-item-unread');
//         //     e.style.display = 'none';
//         //     e.innerHTML = '';
//         // }
//     }
//     protected setTitle(title: string): void {
//         // const el = document.getElementById('list-item-' + obj.id + '-title');
//         // if (!el) return console.log('Attempting to set widget survey name but there are no widget elements');
//         // el.innerHTML = obj.name;
//     }
//     /**
//      * @description If the type is widget, then we have to create an
//      * element for it, and then add it to the page. 
//      * If its not a widget, we ahve to find it on the page
//      * and init it. 
//      * 
//      */
//     protected init() {
//         this.notifications = document.createElement('div');
//         this.notifications.id = 'fmNotifications';
//         this.notifications.style.cssText += 'display:none;position: absolute;top: 0;left: 0;height: 15px;width: 15px;background: #fc6666;z-index: 123;border-radius: 100%;font-size: 10px;text-align: center;line-height: 14px;color: white;';
//         // configure the parent.
//         this.config.parent.style.cssText = 'display: none;z-index: 2147483647; left: 0; transition: top .5s linear, left .5s linear;position: fixed;bottom:20px;';
//         document.body.appendChild(this.config.parent);
//         this.formaticIFrameWrapper.style.cssText += ('border:0;height:0;margin-top:100%;margin-left:auto;width:0;bottom:0px;right:0;overflow:hidden;position: absolute;background:white;transition: height .5s linear, width .5s linear, margin-top .5s linear;' + this.boxShadow);
//         this.formaticWidgetList = document.createElement('div');
//         this.formaticWidgetList.style.display = 'none';
//         this.formaticWidgetList.id = 'formatic-widget-list';
//         this.formaticWidgets = document.createElement('div');
//         this.formaticWidgets.id = 'formatic-widgets';
//         this.formaticWidgets.style.cssText += 'height: 100%;';
//         this.formaticIFrameWrapper.appendChild(this.formaticWidgetList);
//         this.formaticIFrameWrapper.appendChild(this.formaticWidgets);
//         this.config.parent.appendChild(this.formaticIFrameWrapper);
//     }
// } 
