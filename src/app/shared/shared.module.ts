import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConsoleLogPipe } from "./pipes/console-log.pipe";

const modules = [
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
];

const declarations = [
  ConsoleLogPipe
]

@NgModule({
  declarations,
  exports: [
    ...modules,
    ...declarations
  ],
  imports: [...modules],
})
export class SharedModule { }
