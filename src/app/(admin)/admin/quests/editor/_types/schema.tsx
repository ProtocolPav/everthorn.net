import { z } from "zod";

const formRewardSchema = z.object({
    display_name: z.string().optional(),
    reward: z.string(),
    amount: z.coerce.number(),
})

export const formObjectiveSchema = z.object({
    objective: z.string(),
    display: z.string().optional(),
    description: z.string().max(800).min(30, "The Objective Flavour should be at least 30 characters"),
    objective_count: z.coerce.number().min(1, "Must be ≥1"),
    objective_type: z.string(),
    require_natural_block: z.boolean().default(false),
    objective_timer: z.coerce.number().optional(),
    mainhand: z.string().optional(),
    location: z.tuple([z.coerce.number().nullable(), z.coerce.number().nullable()]),
    location_radius: z.coerce.number().default(100).optional(),
    rewards: z.array(formRewardSchema).optional(),
}).refine(
    (data) => data.objective_type !== "encounter" || data.display !== undefined,
    {
        message: "Custom Encounters require a Display Text",
        path: ["display"],
    }
);

export const formSchema = z.object({
    range: z.object({
        from: z.date(),
        to: z.date()
    }),
    title: z.string().min(1, 'Include a Quest Title'),
    description: z.string().max(800).min(50, "The Quest Flavour should be at least 50 characters"),
    objectives: z.array(formObjectiveSchema).nonempty("There must be at least one objective"),
});