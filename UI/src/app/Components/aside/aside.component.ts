import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../../models/models';
import { ButtonsComponent } from "../buttons/buttons.component";
import { InputsComponent } from "../inputs/inputs.component";
import { NgIf } from '@angular/common';
import { GoalsService } from '../../../services/goals.service';

type asideVariant = "cadastro" | "meta"

@Component({
  selector: 'asideComponent',
  standalone: true,
  imports: [ButtonsComponent, InputsComponent, NgIf],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  @Input() variant : asideVariant | string = 'cadastro'
  @Input() goalOpened : Goal = {id : 0, title : '', desiredWeeklyFrequency: 0, currentWeeklyFrequency : 0}
  @Output() cancelar = new EventEmitter();
  @Output() post = new EventEmitter();

  infosCadastro : Goal = {id : 0, title : '', desiredWeeklyFrequency: 0, currentWeeklyFrequency : 0}
  
  constructor(private goalsService : GoalsService){}

  fecharCadastro(){
    this.cancelar.emit()
  }

  criarGoal(){
    if(this.infosCadastro.title.trim() == '' || this.infosCadastro.desiredWeeklyFrequency == 0){
      console.log('mnadar msg de erro')
      return
    }
    this.postGoal(this.infosCadastro)
  }

  postGoal(goal : Goal){
    this.goalsService.addGoal(goal).subscribe(() => {
      this.fecharCadastro()
      this.post.emit()
      // fazer msg de erro
    });
  }

  concluirGoal(id : number){
    this.goalsService.addGoalProgress(id).subscribe(() => {
      this.fecharCadastro()
      this.post.emit()
      // fazer msg de erro
    });
  }
}
