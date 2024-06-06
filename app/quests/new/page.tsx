"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

const formSchema = z.object({
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
    .startsWith("minecraft:", { message: "MARS!!! Did you forget \"minecraft:\"?" })
    .trim()
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
    // .startsWith("minecraft:", { message: "MARS!!! Did you forget \"minecraft:\"?" })
    .trim()
    .toLowerCase()
    .optional(),


  objective_main_hand: z
    .string()
    .startsWith("minecraft:", { message: "MARS!!! Did you forget \"minecraft:\"?" })
    .trim()
    .toLowerCase()
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
  if (data!.objective_reward_type === "balance") return true
  else return data!.objective_reward_item?.startsWith("minecraft:")
}, {
  message: "MARS!!! You specified a reward item, but it doesn't start with \"minecraft:\"!",
  path: ["password"]
})

export default function NewQuest() {
  const [formStep, setFormStep] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",

      objective_type: "",
      objective_amount: undefined,
      objective_item: "",

      objective_reward_type: "",
      objective_reward_amount: undefined,
      objective_reward_item: "",

      objective_main_hand: undefined,
      location_x: undefined,
      location_z: undefined,
      radius: 100,
      time_limit_h: undefined,
      time_limit_min: undefined,
      time_limit_sec: undefined,

      password: ""
    },
  })

  const [shouldHideRewardItem, setShouldHideRewardItem] = useState(form.getValues("objective_reward_type") === "balance")

  useEffect(() => {
    const subscription = form.watch((value) => {
      setShouldHideRewardItem(value.objective_reward_type !== "item")
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitted quest!")
    console.log(values)
  }

  return (
    <section className="container grid gap-6 pb-8 pt-6 max-w-screen-md md:py-10">
      <h1 className="text-4xl">Let's create a new quest!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* Step 1: The Basics */}
          <div className={
            cn({ 'hidden': formStep !== 0 })
          }>
            <h2  className="text-2xl">The Basics</h2>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <>
                  <FormItem className="my-4">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Cow Murder" {...field}></Input>
                    </FormControl>
                    <FormDescription>
                      This is the quest title, give it a good one!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <>
                  <FormItem className="my-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Do you like cows? So do I, plea..." {...field}></Textarea>
                    </FormControl>
                    <FormDescription>
                      Descriptions should hook people, but shouldn't be so long
                      that it bores them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>

          {/* Step 2: Objectives */}
          <div className={
            cn({ 'hidden': formStep !== 1 })
          }>
            <h2 className="text-2xl">Objectives</h2>
            <div className="flex gap-4 w-full justify-stretch">
              {/* Objective Type */}
              <FormField
                control={form.control}
                name="objective_type"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue="field.value" {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an objective type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kill">Kill</SelectItem>
                            <SelectItem value="mine">Mine</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Feeling murderous or chill mining?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />

              {/* Objective Amount */}
              <FormField
                control={form.control}
                name="objective_amount"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder='0' {...field} />
                      </FormControl>
                      <FormDescription>
                        How much to kill? Mine?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />
            </div>

            {/* Objective Item */}
            <FormField
              control={form.control}
              name="objective_item"
              render={({ field }) => (
                <>
                  <FormItem className="my-4 w-full">
                    <FormLabel>Block/Mob</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="minecraft:cow" {...field} />
                    </FormControl>
                    <FormDescription>
                      What to kill? Mine?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}  
            />
          </div>

          {/* Step 3: Requirements */}
          <div className={
            cn({ 'hidden': formStep !== 2 })
          }>
            <h2 className="text-2xl">Requirements</h2>
            <p className="text-sm">Only fill in the requirements you want, and leave anything else blank!</p>
            {/* Objective Mainhand */}
            <FormField
                control={form.control}
                name="objective_main_hand"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Mainhand</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="minecraft:stone_sword" {...field} />
                      </FormControl>
                      <FormDescription>
                        Just bare hands? A wooden pick?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />

            <div className="flex gap-4 w-full justify-stretch">
              {/* Objective X */}
              <FormField
                control={form.control}
                name="location_x"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>X</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />

              {/* Objective Z */}
              <FormField
                control={form.control}
                name="location_z"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Z</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />

              {/* Objective Radius */}
              <FormField
                control={form.control}
                name="radius"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Radius</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="20" {...field} />
                      </FormControl>
                      <FormDescription>
                        Radius, defaults to 100
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />
            </div>

            <h3>Time Limit</h3>
            <div className="flex gap-4 w-full justify-stretch">
              {/* Objective Time H */}
              <FormField
                control={form.control}
                name="time_limit_h"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Hours</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />

              {/* Objective Time Min */}
              <FormField
                control={form.control}
                name="time_limit_min"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Minutes</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />

              {/* Objective Time Sec */}
              <FormField
                control={form.control}
                name="time_limit_sec"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Seconds</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />
            </div>
          </div>

          {/* Step 4: Rewards */}
          <div className={
            cn({ 'hidden': formStep !== 3 })
          }>
            <h2 className="text-2xl">Rewards</h2>
            <div className="flex gap-4 w-full justify-stretch">
              {/* Objective Reward Type */}
              <FormField
                control={form.control}
                name="objective_reward_type"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue="field.value" {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reward type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="balance">Balance</SelectItem>
                            <SelectItem value="item">Item</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        What you giving to the people?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />

              {/* Objective Reward Amount */}
              <FormField
                control={form.control}
                name="objective_reward_amount"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 flex-1">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder='0' {...field} />
                      </FormControl>
                      <FormDescription>
                        Feeling generous?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />
            </div>

            {/* Objective Reward Item */}
            <div className={ cn({ "hidden": shouldHideRewardItem }) }>
              <FormField
                control={form.control}
                name="objective_reward_item"
                render={({ field }) => (
                  <>
                    <FormItem className="my-4 w-full">
                      <FormLabel>Item</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="minecraft:stick" {...field} />
                      </FormControl>
                      <FormDescription>
                        Exactly, what are you giving them?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}  
              />
            </div>
          </div>

          {/* Step 5: Password */}
          <div className={
            cn({ 'hidden': formStep !== 4 })
          }>
            <h2 className="text-2xl">Rewards</h2>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FormItem className="my-4 w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password..." {...field} />
                    </FormControl>
                    <FormDescription>
                      You need a password to submit a quest. If you're not Mars, please contact him to suggest a quest of your own!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}  
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-10">
            <Button variant="outline" type="button" className={ cn({ "hidden": formStep < 1 }) } onClick={() => {
              setFormStep(Math.max(0, formStep - 1)) // go back and ensure it's never below 0
            }}>
              <ArrowLeft className="mr-1" size="18" /> Back
            </Button>
            <Button variant="outline" type="button" onClick={() => {
              if (formStep === 0) {
                form.trigger(["title", "description"])

                const titleState = form.getFieldState('title')
                const descriptionState = form.getFieldState('description')

                if (!titleState.isDirty || titleState.invalid) return
                if (!descriptionState.isDirty || descriptionState.invalid) return
              }

              if (formStep === 1) {
                form.trigger(["objective_type", "objective_amount", "objective_item"])

                const objectiveTypeState = form.getFieldState("objective_type")
                const objectiveAmountState = form.getFieldState("objective_amount")
                const objectiveItemState = form.getFieldState("objective_item")

                if(!objectiveTypeState.isDirty || objectiveTypeState.invalid) return
                if(!objectiveAmountState.isDirty || objectiveAmountState.invalid) return
                if(!objectiveItemState.isDirty || objectiveItemState.invalid) return
              }

              if (formStep === 2) {
                form.trigger(["objective_main_hand", "location_x", "location_z", "radius", "time_limit_h", "time_limit_min", "time_limit_sec"])

                const mainHandState = form.getFieldState("objective_main_hand")
                const locationXState = form.getFieldState("location_x")
                const locationZState = form.getFieldState("location_z")

                const timeLimitHState = form.getFieldState("time_limit_h")
                const timeLimitMinState = form.getFieldState("time_limit_min")
                const timeLimitSecState = form.getFieldState("time_limit_sec")

                if(mainHandState.invalid) return
                if(locationXState.invalid) return
                if(locationZState.invalid) return
                
                if(timeLimitHState.invalid) return
                if(timeLimitMinState.invalid) return
                if(timeLimitSecState.invalid) return
              }

              if (formStep === 3) {
                form.trigger(["objective_reward_type", "objective_reward_amount", "objective_reward_item"])

                const rewardTypeState = form.getFieldState("objective_reward_type")
                const rewardAmountState = form.getFieldState("objective_reward_amount")
                const rewardItemState = form.getFieldState("objective_reward_item")

                const rewardType = form.getValues("objective_reward_type")

                if (!rewardTypeState.isDirty || rewardTypeState.invalid) return
                if (!rewardAmountState.isDirty || rewardAmountState.invalid) return
                if (rewardType === "item" && rewardItemState.invalid) return
              }

              setFormStep(Math.min(formStep + 1, 4)) // make sure it never goes past 3
            }} className={ cn({ "hidden": formStep > 3 }) }>
              Next <ArrowRight className={"ml-1"} size="18" />
            </Button>
            <Button type="submit" className={ cn({ "hidden": formStep !== 4 }) }>Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
