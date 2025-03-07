import { z } from "zod";

const formRewardSchema = z.object({
    display_name: z.string().optional(),
    reward: z.string(),
    amount: z.number(),
})

export const formObjectiveSchema = z.object({
    objective: z.string(),
    display: z.string().optional(),
    description: z.string().max(300).min(30, "The Objective Flavour should be at least 30 characters"),
    objective_count: z.coerce.number().min(1, "Must be ≥1"),
    objective_type: z.string(),
    require_natural_block: z.boolean().default(false),
    require_timer: z.boolean().default(false),
    objective_timer: z.coerce.number().optional(),
    require_mainhand: z.boolean().default(false),
    mainhand: z.string().optional(),
    require_location: z.boolean().default(false),
    location: z.tuple([z.coerce.number(), z.coerce.number()]).optional(),
    location_radius: z.coerce.number().default(100).optional(),
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
    description: z.string().max(300).min(50, "The Quest Flavour should be at least 50 characters"),
    objectives: z.array(formObjectiveSchema).nonempty("There must be at least one objective"),
});