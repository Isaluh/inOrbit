export interface RadioInput{
    opc : string,
    emoji : string,
    value : number
}

// ver melhor sobre esse model
export interface Goal{
    id : number,
    title: string,
    desiredWeeklyFrequency: number,
    currentWeeklyFrequency: number
}

export interface GoalCompleted{
    id : number,
    goal: Goal,
    createdAt : Date
}