import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LockComponent } from "./lock/lock.component";
import { AuthGuard } from "../guards/auth.guard";
import { CpanelModule } from "./cpanel/cpanel.module";
import { CpanelComponent } from "./cpanel/cpanel.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "lock", component: LockComponent },
  { path: 'cpanel', loadChildren:'./cpanel/cpanel.module#CpanelModule', canActivate: [AuthGuard] },    
  { path : '**' , redirectTo :  'login'}   
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
