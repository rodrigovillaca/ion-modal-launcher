# ion-modal-launcher

Ionic 4 component that subscribe to a list of observables and display an ion-modal when each observable emits a value.

- [ion-modal-launcher](#ion-modal-launcher)
  - [Install](#install)
  - [Usage](#usage)
    - [template](#template)
    - [obsevables parameter](#obsevables-parameter)
  - [Contributing](#contributing)
  - [Todo](#todo)



It can be used to trigger modals from different observables, very useful if you need to display a modal from a service or a route guard for example (or anything injected at root).

## Install

Run:
``` 
npm install ion-modal-launcher --save 
```


Import IonFormErrorMessagesModule app.module.ts:

```typescript
import ...
...
import { IonModalLauncherModule } from 'ion-modal-launcher';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        IonicModule,
        ... ,
        IonModalLauncherModule
    ],
    ...
})
export class AppModule {}
```

You could import in another module too, but I find it better to have only one instance of it at app.component.


## Usage

### template

I recommend using it at you app.component.html file like the example bellow:

```html
<ion-app>
    <ion-split-pane contentId="main-content">
        ...
        <ion-modal-launcher [observables]="modalObservables">
        </ion-modal-launcher>
    </ion-split-pane>
</ion-app>
```

### obsevables parameter

This parameter is an array of `Observable<ModalLauncherOptions>`. 

ModalLaucherOptions have two properties:
-   modalOptions: 
    -    ModalOptions from '@ionic/core/dist/types/components/modal/modal-interface'
    -    Same options as you pass to ionModalController.creat(options).
    -    More information here: https://ionicframework.com/docs/api/modal
-   callback:
    -   function that is called when modal is dismissed 
    -   it have one details parameter that is the result of Ionic modal.dismiss(data), this data param will be available at the callback as details.data. 
    -   The details parameter type is OverlayEventDetail from @ionic/core

Example for displaying a login modal:

```javascript
const loginObservable = this.authentication.forbidden.pipe(
    map(url => {
        return {
            modalOptions: {
                component: LoginModalComponent
            },
            callback: details => {
                if (details?.data?.authenticated && url) {
                    this.router.navigate([url]);
                }
            }
        };
    })
);

this.modalObservables = [loginObservable];
```

I've been using it for a similar case as the above, the authentication guard triggers an next value on the `this.authentication.forbidden` observable and this displays the login modal as we didn't want the page redirection behavior the login screen on this specific app.

It can be used to trigger modals from any kind of observable, very useful if you need to display a modal from a service or a route guard for example, you add an observable on your service, pass it to the ion-modal-launcher through app.componet as the example above.

## Contributing

If you are contributing with the project you should build the library with: 
```
npm run build
```
This will copy the README file so it is update on NPM. Any further scripts required on future versions will be called by this command.


## Todo

Make the calback part of the rxjs pipeline instead of it being a parameter
