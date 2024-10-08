export interface QuestFormApiReady {
  quest: {
    start_time: string
    end_time: string
    title: string
    description: string
  }
  objectives: ObjectiveType[]
}

export interface Reward {
  balance: number | null
  item: string | null
  count: number
}

export interface ObjectiveType {
  objective: string
  order: number
  objective_count: number
  objective_type: string
  objective_timer: number | null
  required_mainhand: string | null
  required_location: number[] | null
  location_radius: number
  rewards: Reward[]
}
