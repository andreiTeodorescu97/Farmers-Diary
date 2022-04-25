import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { IconsComponent } from "./icons/icons.component";
import { LoginComponent } from "./login/login.component";
import { MapsComponent } from "./maps/maps.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { TablesComponent } from "./tables/tables.component";
import { TypographyComponent } from "./typography/typography.component";
import { UpgradeComponent } from "./upgrade/upgrade.component";
import { UserComponent } from "./user/user.component";
import { ShellComponent } from "./shell/shell.component";
import { RegisterComponent } from "./register/register.component";
import { FarmComponent } from "./farm/farm.component";
import { IsAuthenticated } from "./_guards/isauthenticated.guard";
import { IsNotAuthenticated } from "./_guards/isnotauthenticated.guard";
import { AvailableFinancingComponent } from "./available-financing/available-financing.component";

const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    runGuardsAndResolvers: "always",
    canActivate: [IsAuthenticated],
    children: [
      { path: "dashboard", component: HomeComponent },
      { path: "user", component: UserComponent },
      { path: "table", component: TablesComponent },
      { path: "typography", component: TypographyComponent },
      { path: "icons", component: IconsComponent },
      { path: "maps", component: MapsComponent },
      { path: "notifications", component: NotificationsComponent },
      { path: "upgrade", component: UpgradeComponent },
      { path: "farm", component: FarmComponent },
      { path: "financing", component: AvailableFinancingComponent },
    ],
  },
  {
    path: "",
    component: LoginComponent,
    canActivate: [IsNotAuthenticated],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [IsNotAuthenticated],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [IsNotAuthenticated],
  },
  {
    path: "**",
    redirectTo: "/login",
    pathMatch: "full",
    canActivate: [IsNotAuthenticated],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
