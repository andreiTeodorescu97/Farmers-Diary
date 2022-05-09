import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { SidebarModule } from "./sidebar/sidebar.module";

import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { IconsComponent } from "./icons/icons.component";
import { LoginComponent } from "./login/login.component";
import { MapsComponent } from "./maps/maps.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { TablesComponent } from "./tables/tables.component";
import { TypographyComponent } from "./typography/typography.component";
import { UpgradeComponent } from "./upgrade/upgrade.component";
import { UserComponent } from "./user/user.component";
import { LbdModule } from "./lbd/lbd.module";
import { CommonModule } from "@angular/common";
import { ShellComponent } from "./shell/shell.component";
import { RegisterComponent } from "./register/register.component";
import { ToastrModule } from "ngx-toastr";
import { ModalModule } from "ngx-bootstrap/modal";
import { FarmComponent } from "./farm/farm.component";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AvailableFinancingComponent } from "./available-financing/available-financing.component";
import { FinancingProgramComponent } from "./available-financing/financing-program/financing-program.component";
import { DataTablesModule } from "angular-datatables";
import { MachineryComponent } from "./machinery/machinery.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    ShellComponent,
    RegisterComponent,
    FarmComponent,
    AvailableFinancingComponent,
    FinancingProgramComponent,
    MachineryComponent,
  ],
  imports: [
    CommonModule,
    LbdModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    DataTablesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
