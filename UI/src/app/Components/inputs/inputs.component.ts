import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioInput } from '../../../models/models';
import { FormsModule } from '@angular/forms';

type inputVariant = "text" | "radio" | "visual"

@Component({
  selector: 'inputsComponent',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})

export class InputsComponent {
  @Input() variant : inputVariant = "text"
  @Input() placeholder : string = ''
  @Input() options : RadioInput[] = []
  @Output() infoCadastro = new EventEmitter();

  informacao : string | number = ''

  mandarInfo(){
    this.infoCadastro.emit(this.informacao)
  }
}
