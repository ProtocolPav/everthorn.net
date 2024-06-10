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


  objective_type: z.string({ required_error: "MARS!!! Did you check this out?" }),
  objective_amount: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number({ required_error: "MARS!!! How many??" })
    .int({ message: "MARS!!! Fractional numbers??" })
    .min(1, { message: "MARS!!! People can't just sit back and relax!" })
  ),
  objective_item: z
    .string({ required_error: "MARS!!! What do people need to kill or mine?" })
    .toLowerCase(),


  objective_reward_type: z.string(),
  objective_reward_amount: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number()
    .int({ message: "MARS!!! Fractional numbers??" })
    .min(1, { message: "MARS!!! Seriously? People get nothing?" })
  ),
  objective_reward_item: z
    .string()
    .optional(),


  objective_main_hand: z
    .string()
    .optional(),
  location_x: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number().optional()
  ),
  location_z: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number().optional()
  ),
  radius: z.preprocess(
    (value) => (typeof value === "string") ? Number(value) : 0,
    z.number().optional()
  ),
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
  ),
  password: z.string({ required_error: "You shall not pass!" })
    .startsWith("together2024", { message: "Wrong Password" })
    .max(12, { message: "Wrong Password" })
}).refine(data => {
  return data!.objective_reward_type === "item" && data!.objective_reward_item !== "";
}, {
  message: "MARS!!! You forgot to specify an item to reward!",
  path: ["password"]
})
