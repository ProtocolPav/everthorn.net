export interface QuestFormApiReady {
  quest: {
    start_time: string,
    end_time: string,
    title: string,
    description: string,
  },
  objectives: Objective[]
}

interface Reward {
  balance: number,
  item: string,
  count: number
}

interface Objective {
  objective: string,
  order: number,
  objective_count: number,
  objective_type: string,
  objective_timer: string,
  required_mainhand: string,
  required_location: number[],
  location_radius: number,
  rewards: Reward[]
}
