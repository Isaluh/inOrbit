import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ButtonsComponent } from "../buttons/buttons.component";
import { NgStyle } from '@angular/common';

@Component({
  selector: 'semMetasComponent',
  standalone: true,
  imports: [ButtonsComponent, NgStyle],
  templateUrl: './sem-metas.component.html',
  styleUrl: './sem-metas.component.css'
})
export class SemMetasComponent {
  @Input() cadastroAberto : boolean = false
  @Output() cadastro = new EventEmitter();

  iniciarCadastro(){
    this.cadastroAberto = true
    this.cadastro.emit();
  }
}
