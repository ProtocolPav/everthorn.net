import { z } from "zod"

export const objectiveSchema = z.object({
  description: z.string({ required_error: "MARS!!! Write some story for this objective, cmon dude" })
                .min(10, { message: "MARS!!! People need to know what to do!" }),
  type: z.string({ required_error: "MARS!!! What do the people need to do?" }),
  amount: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : 0),
    z
      .number({ required_error: "MARS!!! How many??" })
      .int({ message: "MARS!!! Fractional numbers??" })
      .min(1, { message: "MARS!!! People can't just sit back and relax!" })
  ),
  mob_block: z
    .string({ required_error: "MARS!!! What do people need to kill or mine?" })
    .toLowerCase(),
  
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
  type: z.string({ required_error: "MARS!!! What kind of reward?!" }),
  amount: z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : 0),
    z
      .number()
      .int({ message: "MARS!!! Fractional numbers??" })
      .min(1, { message: "MARS!!! Seriously? People get nothing?" })
  ),
  item: z.string().optional(),
})

export const formSchema = z
  .object({
    title: z
      .string({ required_error: "MARS!!! Did you forget to add a title? ;-;" })
      .min(2, { message: "MARS!!! Quests need a bigger title." })
      .max(63, { message: "MARS...!!! That's a little too much, init?" }),
    description: z
      .string({ required_error: "MARS!!! Write a lil hook for the people!" })
      .min(10, { message: "MARS!!! People need to know about this quest!" })
      .max(1246, { message: "MARS!!! The people have asked for you to stop!" }),

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
