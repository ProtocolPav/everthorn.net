import {formSchema} from "./schema";
import {z} from "zod";
import {formatDateToAPI} from "@/lib/utils";

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

interface ApiSchema {
    start_time: string,
    end_time: string,
    title: string,
    description: string,
    objectives: ObjectiveSchema[]
}

export function formatDataToApi(form: z.infer<typeof formSchema>): ApiSchema {
    let apiObjectives: ObjectiveSchema[] = []

    form.objectives.forEach((obj, index) => {
        let objectiveRewards: RewardSchema[] = []

        obj.rewards?.forEach((reward) => {
            objectiveRewards.push({
                balance: reward.reward === 'nugs_balance' ? reward.amount : null,
                display_name: reward.display_name ? reward.display_name : null,
                item: reward.reward !== 'nugs_balance' ? reward.reward : null,
                count: reward.amount
            })
        })

        apiObjectives.push({
            objective: obj.objective,
            display: obj.objective_type === 'encounter' && obj.display ? obj.display : null,
            order: index,
            description: obj.description,
            objective_count: obj.objective_count,
            objective_type: obj.objective_type,
            natural_block: obj.require_natural_block,
            objective_timer: obj.require_timer && obj.objective_timer ? obj.objective_timer : null,
            required_mainhand: obj.require_mainhand && obj.mainhand ? obj.mainhand : null,
            required_location: obj.require_location && obj.location ? obj.location : null,
            location_radius: obj.require_location && obj.location_radius ? obj.location_radius : null,
            rewards: objectiveRewards ? objectiveRewards : null
        })
    })

    return {
        start_time: formatDateToAPI(form.range.from),
        end_time: formatDateToAPI(form.range.to),
        title: form.title,
        description: form.description,
        objectives: apiObjectives
    }
}