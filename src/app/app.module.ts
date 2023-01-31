import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockTablesComponent } from './stock-tables/stock-tables.component';
import { SortableHeaderDirective } from './sortable-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    StockTablesComponent,
    SortableHeaderDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
