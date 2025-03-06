import { z } from "zod";

const formRewardSchema = z.object({
    display_name: z.string().optional(),
    reward: z.string(),
    amount: z.number(),
})

const formObjectiveSchema = z.object({
    objective: z.string(),
    display: z.string().optional(),
    order: z.number(),
    description: z.string().max(300),
    objective_count: z.number(),
    objective_type: z.enum(["mine", "kill", "encounter"]),
    natural_block: z.boolean().default(false),
    require_timer: z.boolean().default(false),
    objective_timer: z.number().optional(),
    require_mainhand: z.boolean().default(false),
    mainhand: z.string().optional(),
    require_location: z.boolean().default(false),
    location: z.tuple([z.number(), z.number()]).optional(),
    location_radius: z.number().default(100).optional(),
    rewards: z.array(formRewardSchema).optional(),
}).refine(
    (data) => data.objective_type !== "encounter" || data.display !== undefined,
    {
        message: "Custom Encounters require a Display Text",
        path: ["display"],
    }
)
.refine(
    (data) => !data.require_timer || (data.require_timer && data.objective_timer !== undefined),
    {
        message: "You forgot to fill in the Timer Requirement!",
        path: ["objective_timer"],
    }
)
.refine(
    (data) => !data.require_mainhand || (data.require_mainhand && data.mainhand !== undefined),
    {
        message: "You forgot to fill in the Mainhand Requirement!",
        path: ["mainhand"],
    }
)
.refine(
    (data) => !data.require_location ||
        (data.require_location && data.location !== undefined && data.location_radius !== undefined),
    {
        message: "You forgot to fill in the Location Requirement!",
        path: ["location"],
    }
);

export const formSchema = z.object({
    range: z.object({
        from: z.date(),
        to: z.date()
    }),
    title: z.string(),
    description: z.string().max(300).min(50, "At least 50 characters"),
    objectives: z.array(formObjectiveSchema).min(1, "There must be at least one objective"),
});