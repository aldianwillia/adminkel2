import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';


@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  @Input('appHasRole') roles: string[];

  constructor(private autServices: AuthenticationService, 
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

              ngOnInit(){
               
              }

}
