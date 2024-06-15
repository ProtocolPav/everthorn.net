"use client"

import {useEffect, useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {ArrowLeft, ArrowRight} from "@phosphor-icons/react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {formSchema} from "@/lib/forms/new_quest"

import {QuestFormApiReady} from "@/types/quest_form"

import {cn} from "@/lib/utils"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox"
import {MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes} from "@minecraft/vanilla-data";
import {useSession} from "next-auth/react";
import {NoPermission} from "@/components/no-permission";

export default function NewQuest() {
  const { data: session, status } = useSession()

  const items = Object.values(MinecraftItemTypes).map((item) => String(item))

  const blocks = Object.values(MinecraftBlockTypes).map((block) => String(block))

  const entities = Object.values(MinecraftEntityTypes).map((entity) => `minecraft:${entity}`)

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

  const [formStep, setFormStep] = useState(0)
  const [shouldHideRewardItem, setShouldHideRewardItem] = useState(form.getValues("objective_reward_type") === "balance")

  useEffect(() => {
    const subscription = form.watch((value) => {
      setShouldHideRewardItem(value.objective_reward_type !== "item")
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  function formatDataToApi(data: z.infer<typeof formSchema>): QuestFormApiReady {
    let timer: number = (
      Number(data.time_limit_h) * 3600 +
      Number(data.time_limit_min) * 60 +
      Number(data.time_limit_sec)
    )

    return {
      quest: {
        title: data.title,
        description: data.description,
        start_time: "",
        end_time: "",
      },

      objectives: [
        {
          objective: data.title,
          order: 0,
          objective_count: 0,
          objective_type: data.objective_type,
          objective_timer: String(timer),
          required_mainhand: String(data.objective_main_hand),
          required_location: [
            Number(data.location_x),
            Number(data.location_z),
          ],
          location_radius: Number(data.radius),
          rewards: [
            {
              balance: data.objective_reward_amount,
              item: String(data.objective_reward_item),
              count: data.objective_reward_amount,
            }
          ]
        }
      ]
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitted quest!")
    console.log(values)
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated" || !session?.user?.everthornMemberInfo.isCM) {
    return <NoPermission status={status} />
  }

  return (
    <section className="container grid max-w-screen-md gap-6 pb-8 pt-6 md:py-10">
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
            <div className="flex w-full justify-stretch gap-4">
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
              render={() => (
                <>
                  <FormItem className="flex flex-col">
                    <FormLabel>{ form.getValues("objective_type") === "mine" ? "Block" : "Entity" }</FormLabel>
                    <VirtualizedCombobox
                      options={ form.getValues("objective_type") === "mine" ? blocks : entities}
                      searchPlaceholder={`Search ${ form.getValues("objective_type") === "mine" ? "block" : "entity" }...`}
                      onOptionSelect={(value: string) => {
                        form.setValue("objective_reward_item", value)
                      }}
                    />
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
                render={() => (
                  <>
                    <FormItem className="flex flex-col pt-8">
                      <FormLabel>Mainhand</FormLabel>
                      <VirtualizedCombobox
                        options={items}
                        searchPlaceholder="Search mainhand item..."
                        onOptionSelect={(value: string) => {
                          form.setValue("objective_main_hand", value)
                        }}
                      />

                      <FormDescription>
                        Just bare hands? A wooden pick?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

            <div className="flex w-full justify-stretch gap-4">
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
            <div className="flex w-full justify-stretch gap-4">
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
            <div className="flex w-full justify-stretch gap-4">
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
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Item</FormLabel>
                    <VirtualizedCombobox
                      options={items}
                      searchPlaceholder="Search item..."
                      onOptionSelect={(value: string) => {
                        form.setValue("objective_reward_item", value)
                      }}
                      />
                    <FormDescription>
                      The minecraft: prefix will be auto included for you!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
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
          <div className="mt-10 flex gap-2">
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
                if(objectiveItemState.invalid) return
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
