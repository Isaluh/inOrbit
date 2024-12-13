import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Goal, GoalCompleted } from "../models/models";

@Injectable({providedIn: 'root'})

export class GoalsService{
    public static API_url: string = "http://localhost:8080/goals";

    constructor(private httpClient:HttpClient) {}

    getGoalsWeek(data : string){
        let url : string = GoalsService.API_url + `/week?week=${data}`;
        return this.httpClient.get<Goal[]>(url)
    }

    getGoalsWeekProgress(data : string){
        let url : string = GoalsService.API_url + `-progress/week?week=${data}`;
        return this.httpClient.get<GoalCompleted[]>(url)
    }

    getGoalsWeekCompleted(data : string){
        let url : string = GoalsService.API_url + `-completed/week?week=${data}`;
        return this.httpClient.get<GoalCompleted[]>(url)
    }
    
    addGoal(goal : Goal){
        // const formData = new FormData();
        // formData.append("title", goal.title)
        // formData.append("desiredWeeklyFrequency", goal.desiredWeeklyFrequency.toString())
        // return this.httpClient.post<any>(GoalsService.API_url, formData)
        const body = {
            title: goal.title,
            desiredWeeklyFrequency: goal.desiredWeeklyFrequency
        };
        return this.httpClient.post<any>(GoalsService.API_url, body);
    }

    addGoalProgress(id : number) {
        const body = {
            goal: {
                id: id
            }
        };
        return this.httpClient.post<any>(GoalsService.API_url + '-progress', body);
    }

    // addProdutoComanda(mesa : number, produto : string){
    //     const formData = new FormData();
    //     this.localStorageService.adicionarLogin(formData)
    //     formData.append("numero", String(mesa))
    //     formData.append("produto", produto)
        
    //     return this.httpClient.post<any>(CardapioService.API_url + "/mesa/add/produto", formData)
    // }
    
}