import { NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

type btnVariant = "cadastro" | "salvar" | "cancelar" | "meta";

@Component({
  selector: 'buttonsComponent',
  standalone: true,
  imports: [NgIf, NgStyle],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() variant : btnVariant = "cadastro";
  @Input() text : string = '';
  @Input() metaFeita : boolean = false;
}
