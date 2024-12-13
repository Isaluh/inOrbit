import { Component } from '@angular/core';
import { SemMetasComponent } from "../../Components/sem-metas/sem-metas.component";
import { NgFor, NgIf } from '@angular/common';
import { GoalsService } from '../../../services/goals.service';
import { Goal, GoalCompleted } from '../../../models/models';
import { ComMetasComponent } from "../../Components/com-metas/com-metas.component";
import { AsideComponent } from "../../Components/aside/aside.component";
import { ButtonsComponent } from "../../Components/buttons/buttons.component";

@Component({
  selector: 'homeView',
  standalone: true,
  imports: [SemMetasComponent, NgIf, ComMetasComponent, AsideComponent, ButtonsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  asideAberto : boolean = false
  statusAside : string = '';
  goalsWeek : Goal[] = []
  goalsCompletedWeek : GoalCompleted[] = []
  goalsProgressWeek : GoalCompleted[] = []
  goalsProgressWeekLiq: { [key: string]: GoalCompleted[] } = {};
  inicio : string = ''
  fim : string = ''
  mes : string = ''
  metaEscolhida : Goal = {id : 0, title : '', desiredWeeklyFrequency: 0, currentWeeklyFrequency : 0}

  constructor(private goalsService : GoalsService){}

  ngOnInit(){
    this.getPrimeiroDiaSemana(new Date());
  }

  mapPorData() {
    this.goalsProgressWeekLiq = {};

    this.goalsProgressWeek.forEach(goal => {
      const date = new Date(goal.createdAt).toLocaleDateString('pt-BR', {
        month: 'long',
        day: 'numeric',
      });
  
      const [day, month] = date.split(' de ');
      const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
      const formattedDate = `${day} de ${formattedMonth}`;
  
      if (!this.goalsProgressWeekLiq[formattedDate]) {
        this.goalsProgressWeekLiq[formattedDate] = [];
      }
      this.goalsProgressWeekLiq[formattedDate].push(goal);
    });
    
    // faltou ordenar pelo mais recente
    // console.log(this.goalsProgressWeekLiq);
  }
  

  getGoalsWeek(domingo : string){
    this.goalsService.getGoalsWeek(domingo).subscribe(goals => {
      this.goalsWeek = goals;
      // console.log(this.goalsWeek)
    });
  }

  getGoalsProgressWeek(domingo : string){
    this.goalsService.getGoalsWeekProgress(domingo).subscribe(goals => {
      this.goalsProgressWeek = goals;
      this.mapPorData()
    });
  }

  getGoalsCompletedWeek(domingo : string){
    this.goalsService.getGoalsWeekCompleted(domingo).subscribe(goals => {
      this.goalsCompletedWeek = goals;
      // console.log(this.goalsCompletedWeek)
    });
  }

  reload(){
    const domingo = this.getPrimeiroDiaSemana(new Date());
    this.getGoalsWeek(domingo)
    this.getGoalsProgressWeek(domingo)
    this.getGoalsCompletedWeek(domingo)
  }

  getPrimeiroDiaSemana(data: Date): string {
    // console.log(data)
    const hoje = data.getDay();
    const domingo = new Date(data);
    
    if (hoje != 0) {
      domingo.setDate(data.getDate() - hoje);
    }

    this.inicio = String(domingo.getDate()).padStart(2, '0');
    this.mes = this.getMesPorExtenso(domingo.getMonth());

    const fimDaSemana = new Date(domingo);
    fimDaSemana.setDate(domingo.getDate() + 6);
    this.fim = String(fimDaSemana.getDate()).padStart(2, '0');

    this.getGoalsWeek(`${domingo.getFullYear()}-${String(domingo.getMonth() + 1).padStart(2, '0')}-${String(domingo.getDate()).padStart(2, '0')}`);
    this.getGoalsProgressWeek(`${domingo.getFullYear()}-${String(domingo.getMonth() + 1).padStart(2, '0')}-${String(domingo.getDate()).padStart(2, '0')}`);
    this.getGoalsCompletedWeek(`${domingo.getFullYear()}-${String(domingo.getMonth() + 1).padStart(2, '0')}-${String(domingo.getDate()).padStart(2, '0')}`);

    return `${domingo.getFullYear()}-${String(domingo.getMonth() + 1).padStart(2, '0')}-${String(domingo.getDate()).padStart(2, '0')}`;
  
  }

  getMesPorExtenso(mes: number): string {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes];
  }

  abrirAside(opc : string, meta : Goal | null){
    this.asideAberto = true
    this.statusAside = opc
    if(meta){
      this.metaEscolhida = meta
    }
  }
}
