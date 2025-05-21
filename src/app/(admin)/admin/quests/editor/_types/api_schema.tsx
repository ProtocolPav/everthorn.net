import {formObjectiveSchema, formSchema} from "./schema";
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

export interface ApiSchema {
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
            objective_timer: obj.objective_timer ? obj.objective_timer : null,
            required_mainhand: obj.mainhand ? obj.mainhand : null,
            required_location: obj.location[0] && obj.location[1] ? obj.location : null,
            location_radius: obj.location_radius ? obj.location_radius : null,
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

export function formatApiToData(data: ApiSchema): z.infer<typeof formSchema> {
    let formObjectives: z.infer<typeof formObjectiveSchema>[] = data.objectives.map((obj) => {
        return {
            description: obj.description,
            objective: obj.objective,
            objective_type: obj.objective_type,
            objective_count: obj.objective_count,
            display: obj.display ? obj.display : undefined,
            require_natural_block: obj.natural_block,
            objective_timer: obj.objective_timer ? obj.objective_timer : undefined,
            mainhand: obj.required_mainhand ? obj.required_mainhand : undefined,
            location: obj.required_location as [number | null, number | null],
            location_radius: obj.location_radius ? obj.location_radius : undefined,
            rewards: obj.rewards?.map((reward) => {
                return {
                    reward: reward.item ? reward.item : 'nugs_balance',
                    display_name: reward.display_name ? reward.display_name : undefined,
                    amount: reward.item ? reward.count : reward.balance ? reward.balance : 0,
                }
            })
        }
    })

    if (formObjectives.length === 0) {
        formObjectives.push({
            description: '',
            objective: '',
            objective_type: '',
            objective_count: 0,
            display: undefined,
            require_natural_block: false,
            require_timer: false,
            objective_timer: undefined,
            require_mainhand: false,
            mainhand: undefined,
            require_location: false,
            location: undefined,
            location_radius: undefined,
            rewards: []
        })
    }

    return {
        range: {
            from: new Date(data.start_time),
            to: new Date(data.end_time)
        },
        title: data.title,
        description: data.description,
        objectives: formObjectives as [z.infer<typeof formObjectiveSchema>, ...z.infer<typeof formObjectiveSchema>[]]
    }
}