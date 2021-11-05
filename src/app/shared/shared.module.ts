import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { ConsoleLogPipe } from './pipes/console-log.pipe';
import { ReplacePipe } from './pipes/replace.pipe';

const modules = [
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
];

const declarations = [
  HeaderComponent,
  ConsoleLogPipe,
  ReplacePipe,
];

@NgModule({
  declarations,
  exports: [
    ...modules,
    ...declarations
  ],
  imports: [...modules],
})
export class SharedModule { }
