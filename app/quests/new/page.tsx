"use client"

import {useEffect, useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {ArrowLeft, ArrowRight} from "@phosphor-icons/react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {formSchema} from "@/lib/forms/new_quest"

import {QuestFormApiReady} from "@/types/quest_form"

import {capitalizeCase, cn, minecraftItemStringToWords} from "@/lib/utils"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox"
import {MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes} from "@minecraft/vanilla-data";
import {useSession} from "next-auth/react";
import {NoPermission} from "@/components/no-permission";
import {Card, CardTitle, CardHeader, CardDescription, CardContent} from "@/components/ui/card";
import {Switch} from "@/components/ui/switch";

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
    },
  })

  const [formStep, setFormStep] = useState(0)
  const [shouldHideRewardItem, setShouldHideRewardItem] = useState(form.getValues("objective_reward_type") === "balance")
  const [requireMainHand, setRequireMainHand] = useState<boolean | undefined>(form.getValues("require_main_hand"))
  const [requireLocation, setRequireLocation] = useState<boolean | undefined>(form.getValues("require_location"))
  const [requireTimeLimit, setRequireTimeLimit] = useState<boolean | undefined>(form.getValues("require_time_limit"))

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

  function getConfirmationObjectiveString(): string {
    const mainObjective = `${form.getValues("objective_type")} ${form.getValues("objective_amount")} ${minecraftItemStringToWords(form.getValues("objective_item"))}`

    const mainhand: string = form.getValues("objective_main_hand") as string
    const withMainHand = (form.getValues("require_main_hand") && mainhand)
      ? ` with ${minecraftItemStringToWords(mainhand)}`
      : ""

    const onLocation = (form.getValues("require_location") && form.getValues("location_x") && form.getValues("location_z") && form.getValues("radius"))
      ? ` up to ${form.getValues("radius")} blocks from X:${form.getValues("location_x")} Z:${form.getValues("location_z")}`
      : ""

    const h = form.getValues("time_limit_h")
    const min = form.getValues("time_limit_min")
    const sec = form.getValues("time_limit_sec")
    const timeLimit = (form.getValues("require_time_limit") && h && min && sec)
      ? ` within ${h}h${min}min${sec}sec`
      : ""

    return `The player must ${mainObjective}${withMainHand}${onLocation}${timeLimit}.`
  }

  function getConfirmationRewardString(): string {
    const reward = (form.getValues("objective_reward_type") === "balance")
      ? "nugs"
      : minecraftItemStringToWords(form.getValues("objective_reward_item") as string)

    return `The player will get ${form.getValues("objective_reward_amount")} ${reward}.`
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated" || !session?.user?.everthornMemberInfo.isCM) {
    return <NoPermission status={status} />
  }

  return (
    <section className="container grid max-w-screen-md gap-6 pb-8 pt-6 md:py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          {/* Step 1: The Basics */}
          <div className={
            cn({'hidden': formStep !== 0})
          }>
            <h1 className="text-4xl">Let's create a new quest!</h1>
            <h2 className="text-2xl mt-4">The Basics</h2>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <>
                  <FormItem className="my-4">
                    <FormLabel>
                      <h3>Title</h3>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Cow Murder" {...field}></Input>
                    </FormControl>
                    <FormDescription>
                      This is the quest title, give it a good one!
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                </>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <>
                  <FormItem className="my-4">
                    <FormLabel>
                      <h3>Description</h3>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Do you like cows? So do I, plea..." {...field}></Textarea>
                    </FormControl>
                    <FormDescription>
                      Descriptions should hook people, but shouldn't be so long
                      that it bores them.
                    </FormDescription>
                    <FormMessage/>
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
                      <FormLabel>
                        <h3>Type</h3>
                      </FormLabel>
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
                      <FormLabel>
                        <h3>Amount</h3>
                      </FormLabel>
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
                    <FormLabel>
                      <h3>{ form.getValues("objective_type") === "mine" ? "Block" : "Entity" }</h3>
                    </FormLabel>
                    <VirtualizedCombobox
                      options={ form.getValues("objective_type") === "mine" ? blocks : entities}
                      searchPlaceholder={`Search ${ form.getValues("objective_type") === "mine" ? "block" : "entity" }...`}
                      onOptionSelect={(value: string) => {
                        form.setValue("objective_item", value)
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
            cn({'hidden': formStep !== 2})
          }>
            <h2 className="text-2xl">Requirements</h2>
            <p className="text-sm mb-8">Only fill in the requirements you want, and leave anything else blank!</p>

            {/* Objective Mainhand */}
            <h3 className="text-lg">Main Hand</h3>
            <FormField
              control={form.control}
              name="require_main_hand"
              render={({field}) => (
                <>
                  <FormItem className="flex flex-row items-center justify-between my-2 border rounded-md p-3 shadow-sm">
                    <FormLabel>Require Main Hand Item</FormLabel>
                    <FormControl>
                      <Switch
                        className="!m-0"
                        checked={field.value}
                        onCheckedChange={
                          (val) => {
                            setRequireMainHand(val)
                            field.onChange(val)
                          }
                        }
                      />
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="objective_main_hand"
              render={() => (
                <>
                  <FormItem className={cn({ "!hidden": !requireMainHand }, "flex", "flex-col")}>
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
                    <FormMessage/>
                  </FormItem>
                </>
              )}
            />

            {/* Location */}
            <h3 className="text-lg mt-6">Location</h3>
            <FormField
              control={form.control}
              name="require_location"
              render={({field}) => (
                <>
                  <FormItem>
                    <div className="flex flex-row items-center justify-between my-2 border rounded-lg p-3 shadow-sm">
                      <FormLabel>Require Location</FormLabel>
                      <FormControl>
                        <Switch
                          className="!m-0"
                          checked={field.value}
                          onCheckedChange={
                            (val) => {
                              setRequireLocation(val)
                              field.onChange(val)
                            }
                          }
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className={cn({ "!hidden": !requireLocation }, "flex w-full justify-stretch gap-4")}>
              {/* Objective X */}
              <FormField
                control={form.control}
                name="location_x"
                render={({field}) => (
                  <>
                    <FormItem className="flex-1">
                      <FormLabel>X</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </>
                )}
              />

              {/* Objective Z */}
              <FormField
                control={form.control}
                name="location_z"
                render={({field}) => (
                  <>
                    <FormItem className="flex-1">
                      <FormLabel>Z</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </>
                )}
              />

              {/* Objective Radius */}
              <FormField
                control={form.control}
                name="radius"
                render={({field}) => (
                  <>
                    <FormItem className="flex-1">
                      <FormLabel>Radius</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="20" {...field} />
                      </FormControl>
                      <FormDescription>
                        Radius, defaults to 100
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                  </>
                )}
              />
            </div>

            <h3 className="text-lg mt-6">Time Limit</h3>
            <p className="text-sm">Pav can't figure out timers with the new system, this will be disabled meanwhile.</p>
            <FormField
              control={form.control}
              name="require_time_limit"
              render={({field}) => (
                <>
                  <FormItem className="flex flex-row items-center justify-between my-2 border rounded-md p-3 shadow-sm">
                    <FormLabel>Require Time Limit</FormLabel>
                    <FormControl>
                      <Switch
                        className="!m-0"
                        disabled={!field.value}
                        checked={field.value}
                        onCheckedChange={
                          (val) => {
                            setRequireTimeLimit(val)
                            field.onChange(val)
                          }
                        }
                      />
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
            <div className={cn({ "hidden": !requireTimeLimit }, "flex w-full justify-stretch gap-4")}>
              {/* Objective Time H */}
              <FormField
                control={form.control}
                name="time_limit_h"
                render={({field}) => (
                  <>
                    <FormItem className="flex-1">
                      <FormLabel>Hours</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" disabled={true} {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </>
                )}
              />

              {/* Objective Time Min */}
              <FormField
                control={form.control}
                name="time_limit_min"
                render={({field}) => (
                  <>
                    <FormItem className="flex-1">
                      <FormLabel>Minutes</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" disabled={true} {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </>
                )}
              />

              {/* Objective Time Sec */}
              <FormField
                control={form.control}
                name="time_limit_sec"
                render={({field}) => (
                  <>
                    <FormItem className="flex-1">
                      <FormLabel>Seconds</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" disabled={true} {...field} />
                      </FormControl>
                      <FormMessage/>
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

          {/* Step 5: Confirm */}
          <div className={
            cn({ 'hidden': formStep !== 4 }, "space-y-4")
          }>
            <Card>
              <CardHeader>
                <CardTitle>{ form.getValues("title") }</CardTitle>
                <CardDescription>{ form.getValues("description") }</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-xl">Objectives</h2>
                  <p>
                    { getConfirmationObjectiveString() }
                  </p>
                </div>
                <div>
                  <h2 className="text-xl">Reward</h2>
                  <p>
                    { getConfirmationRewardString() }
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-2">
            <Button variant="outline" type="button" className={cn({"hidden": formStep < 1})} onClick={() => {
              setFormStep(Math.max(0, formStep - 1)) // go back and ensure it's never below 0
            }}>
              <ArrowLeft className="mr-1" size="18"/> Back
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
                form.trigger(["require_main_hand", "require_location", "require_time_limit", "objective_main_hand", "location_x", "location_z", "radius", "time_limit_h", "time_limit_min", "time_limit_sec"])

                const timeLimitHState = form.getFieldState("time_limit_h")
                const timeLimitMinState = form.getFieldState("time_limit_min")
                const timeLimitSecState = form.getFieldState("time_limit_sec")

                if(form.getValues("require_main_hand") && typeof form.getValues("objective_main_hand") === "undefined") return

                if(form.getValues("require_location") && typeof form.getValues("location_x") === "undefined") return
                if(form.getValues("require_location") && typeof form.getValues("location_z") === "undefined") return

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
