import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonsComponent } from "../buttons/buttons.component";
import { Goal, GoalCompleted } from '../../../models/models';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'comMetasComponent',
  standalone: true,
  imports: [ButtonsComponent, ProgressBarComponent, NgFor, NgIf, CommonModule],
  templateUrl: './com-metas.component.html',
  styleUrl: './com-metas.component.css'
})
export class ComMetasComponent {
  @Input() goalsWeek : Goal[] = []
  @Input() goalsCompletedWeek : GoalCompleted[] = []
  @Input() goalsProgressWeek : GoalCompleted[] = []
  @Input() goalsProgressWeekLiq: { [key: string]: GoalCompleted[] } = {};
  @Input() diaInicio : String = ''
  @Input() diaFim : string = ''
  @Input() mes : string = ''
  @Output() cadastro = new EventEmitter();
  @Output() meta = new EventEmitter();

  iniciarCadastro(){
    this.cadastro.emit();
  }

  getCompletionPercentage(): number {
    if (this.goalsWeek.length === 0) {
      return 0;
    }
    return Math.floor((this.goalsCompletedWeek.length / this.goalsWeek.length) * 100);
  }

  isMetaFeita(id : number){
    return this.goalsCompletedWeek.some(completedGoal => completedGoal.goal.id === id)
  }

  abrirMeta(metaEscolhida : Goal){
    this.meta.emit(metaEscolhida)
  }

  formatarHora(data: string): string {
    const dataObj = new Date(data);
    const horas = String(dataObj.getHours()).padStart(2, '0');
    const minutos = String(dataObj.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}h`;
  }
}
