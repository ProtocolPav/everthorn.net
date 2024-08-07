import { z } from "zod"

export const formSchema = z.object({
  title: z
    .string({ required_error: "MARS!!! Did you forget to add a title? ;-;" })
    .min(2, { message: "MARS!!! Quests need a bigger title." })
    .max(63, { message: "MARS...!!! That's a little too much, init?" }),
  description: z
    .string()
    .min(10, { message: "MARS!!! People need to know what to do!" })
    .max(255, { message: "MARS!!! The people have asked for you to stop!" }),


  objective_type: z.string({ required_error: "MARS!!! What do the people need to do?" }),
  objective_amount: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number({ required_error: "MARS!!! How many??" })
    .int({ message: "MARS!!! Fractional numbers??" })
    .min(1, { message: "MARS!!! People can't just sit back and relax!" })
  ),
  objective_item: z
    .string({ required_error: "MARS!!! What do people need to kill or mine?" })
    .toLowerCase(),


  objective_reward_type: z.string({ required_error: "MARS!!! What kind of reward?!" }),
  objective_reward_amount: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number()
    .int({ message: "MARS!!! Fractional numbers??" })
    .min(1, { message: "MARS!!! Seriously? People get nothing?" })
  ),
  objective_reward_item: z
    .string()
    .optional(),


  require_main_hand: z
    .boolean()
    .default(false)
    .optional(),
  objective_main_hand: z
    .string()
    .optional(),
  require_location: z
    .boolean()
    .default(false)
    .optional(),
  location_x: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : undefined,
    z.number().optional()
  ),
  location_z: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : undefined,
    z.number().optional()
  ),
  radius: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 100,
    z.number().default(100).optional()
  ),

  require_time_limit: z
    .boolean()
    .default(false),
  time_limit_h: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number().int().min(0, { message: "MARS!!! No negative time!" }).optional()
  ),
  time_limit_min: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number().int().min(0, { message: "MARS!!! No negative time!" }).max(59, { message: "MARS!!! How many minutes does an hour have?" }).optional()
  ),
  time_limit_sec: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number().int().min(0, { message: "MARS!!! No negative time!" }).max(59, { message: "MARS!!! How many seconds does a minute have?" }).optional()
  )
}).refine(data => {
  return data?.objective_reward_type === "item" && data?.objective_reward_item !== "" || data?.objective_reward_type === "balance";
}, {
  message: "MARS!!! You forgot to specify an item to reward!",
  path: ["objective_reward_item"]
}).refine(data => {
  return (!data?.require_main_hand || (data?.require_main_hand && typeof data?.objective_main_hand !== "undefined"))
}, {
  message: "MARS!!! You forgot to specify the required main hand item!",
  path: ["objective_main_hand"]
}).refine(data => {
  return (!data?.require_location || (data?.require_location && typeof data?.location_x !== "undefined" && typeof data?.location_z !== "undefined" && typeof data?.radius !== "undefined"))
}, {
  message: "MARS!!! You forgot to specify the coordinates!",
  path: ["require_location"]
})
