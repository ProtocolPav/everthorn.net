interface RewardSchema {
    balance: number | null,
    display_name: string | null,
    item: string | null,
    count: number
}

interface ObjectiveSchema {
    objective: string,
    display: string | null,
    order: number,
    description: string,
    objective_count: number,
    objective_type: string,
    natural_block: boolean,
    objective_timer: number | null,
    required_mainhand: string | null,
    location_radius: number | null,
    required_location: number[] | null,
    rewards: RewardSchema[] | null
}

export interface QuestSchema {
    start_time: string,
    end_time: string,
    title: string,
    description: string,
    objectives: ObjectiveSchema[]
}