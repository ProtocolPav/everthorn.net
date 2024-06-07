export interface QuestFormApiReady {
  quest: {
    start_time: null,
    end_time: null,
    timer: string,
    title: string,
    description: string,
    rewards: Reward[]
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