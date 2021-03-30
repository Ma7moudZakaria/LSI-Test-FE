import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMoveNextByMaxLength]'
})
export class MoveNextByMaxLengthDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('keyup', ['$event']) onKeyDown(e: any) {

    if (e.srcElement.maxLength === e.srcElement.value.length) {
  
        e.preventDefault();
        let nextControl: any = e.srcElement.nextElementSibling;
       // Searching for next similar control to set it focus
        while (true)
        {
            if (nextControl)
            {
                if (nextControl.type === e.srcElement.type)
                {
                    nextControl.focus();
                    return;
                }
                else
                {
                    nextControl = nextControl.nextElementSibling;
                }
            }
            else
            {
            
                return;
            }
        }
    }
  }

  // @HostListener('window:change', ['$event'])
// change(event: any) {
//   if (event.srcElement.maxLength === event.srcElement.maxLength) {

//     event.preventDefault();

//    let nextControl= event.srcElement.nextElementSibling;
//     // let nextControl: any = event.srcElement.tabIndex+1;
//    // Searching for next similar control to set it focus
//     while (true)
//     {
//         if (nextControl)
        
//         {
//             if (nextControl.type === event.srcElement.type)
//             {
//                 nextControl.focus();
//                 return;
//             }
//             else
//             {
//                // nextControl = nextControl.nextElementSibling;
//                 nextControl= nextControl.parentElement.nextElementSibling;
//             }
//         }
       
//         else
//         {
//             return;
//         }
//     }
// }
// }
}
