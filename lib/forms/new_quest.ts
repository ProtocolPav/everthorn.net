import { z } from "zod"

export const objectiveSchema = z.object({
  description: z.string({ required_error: "" }),
  type: z.string({ required_error: "" }),
  amount: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : 0),
    z
      .number({ required_error: "" })
      .int({ message: "MARS!!! Fractional numbers??" })
      .min(1, { message: "" })
  ),
  mob_block: z
    .string()
    .toLowerCase()
    .optional(),
  
  script_id: z.string().toLowerCase().optional(),
  display: z.string().optional(),
  
  require_natural_block: z.boolean().default(true),
  require_main_hand: z.boolean().default(false).optional(),
  main_hand: z.string().optional(),
  require_location: z.boolean().default(false).optional(),
  location_x: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : undefined),
    z.number().optional()
  ),
  location_z: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : undefined),
    z.number().optional()
  ),
  radius: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : 100),
    z.number().default(100).optional()
  ),

  require_time_limit: z.boolean().default(false),

  time_limit: z.object({
    hours: z.preprocess(
      (value) => (typeof value === "string" ? Number(value) : 0),
      z
        .number()
        .int()
        .min(0, { message: "MARS!!! No negative time!" })
        .optional()
    ),
    min: z.preprocess(
      (value) => (typeof value === "string" ? Number(value) : 0),
      z
        .number()
        .int()
        .min(0, { message: "MARS!!! No negative time!" })
        .max(59, { message: "MARS!!! How many minutes does an hour have?" })
        .optional()
    ),
    sec: z.preprocess(
      (value) => (typeof value === "string" ? Number(value) : 0),
      z
        .number()
        .int()
        .min(0, { message: "MARS!!! No negative time!" })
        .max(59, { message: "MARS!!! How many seconds does a minute have?" })
        .optional()
    ),
  }),
})

export const rewardSchema = z.object({
  display_name: z.string().optional(),
  type: z.string({ required_error: "" }),
  amount: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : 0),
    z
      .number()
      .int({ message: "MARS!!! Fractional numbers??" })
      .min(1, { message: "" })
  ),
  item: z.string().optional(),
})

export const formSchema = z
  .object({
    title: z
      .string({ required_error: "MARS!!! Did you forget to add a title? ;-;" })
      .min(1, { message: "" })
      .max(63, { message: "That's a bit too much I feel..." }),
    description: z
      .string({ required_error: "MARS!!! Write a lil hook for the people!" })
      .min(1, { message: "" })
      .max(1246, { message: "That's a bit too much I feel..." }),

    objectives: objectiveSchema
      .array()
      .nonempty({ message: "MARS!!! No objectives? ;-;" }),

    rewards: rewardSchema
      .array()
      .nonempty({ message: "MARS!!! No rewards? ;-;" }),
  })
  .refine(
    (data) => {
      for (let i = 0; i < data?.rewards.length; i++) {
        const reward = data?.rewards[i]

        const check: boolean =
          (reward.type === "item" && reward.item !== "") ||
          reward.type === "balance"

        return check
      }
    },
    {
      message: "MARS!!! You forgot to specify an item to reward!",
      path: ["objective_reward_item"],
    }
  )
  .refine(
    (data) => {
      for (let i = 0; i < data?.objectives.length; i++) {
        const objective = data?.objectives[i]

        const check =
          !objective.require_main_hand ||
          (objective.require_main_hand &&
            typeof objective.main_hand !== "undefined")
        return check
      }

      // return (!data?.require_main_hand || (data?.require_main_hand && typeof data?.objective_main_hand !== "undefined"))
    },
    {
      message: "MARS!!! You forgot to specify the required main hand item!",
      path: ["objective_main_hand"],
    }
  )
  .refine(
    (data) => {
      for (let i = 0; i < data?.objectives.length; i++) {
        const objective = data?.objectives[i]

        const check =
          !objective.require_location ||
          (objective.require_location &&
            typeof objective.location_x !== "undefined" &&
            typeof objective.location_z !== "undefined" &&
            typeof objective.radius !== "undefined")
        return check
      }
    },
    {
      message: "MARS!!! You forgot to specify the coordinates!",
      path: ["require_location"],
    }
  )
