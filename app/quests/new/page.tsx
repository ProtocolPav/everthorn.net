"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  MinecraftBlockTypes,
  MinecraftEntityTypes,
  MinecraftItemTypes,
} from "@minecraft/vanilla-data"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { PlusIcon, TrashIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { QuestFormApiReady } from "@/types/quest_form"
import { formSchema } from "@/lib/forms/new_quest"
import {
  capitalizeCase,
  cn,
  formatDateToAPI,
  minecraftItemStringToWords,
} from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox"
import Objective from "@/components/client/quests-form/objective"
import { NoPermission } from "@/components/no-permission"

export default function NewQuest() {
  const { data: session, status } = useSession()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",

      objectives: [
        {
          type: undefined,
          amount: undefined,
          mob_block: undefined,

          require_main_hand: false,
          require_time_limit: false,
          require_location: false,

          main_hand: undefined,
          location_x: undefined,
          location_z: undefined,
          radius: undefined,
          time_limit: {
            hours: undefined,
            min: undefined,
            sec: undefined,
          },
        },
      ],

      rewards: [
        {
          type: undefined,
          amount: undefined,
          item: "",
        },
      ],
    },
  })

  const [formStep, setFormStep] = useState(0)
  const [shouldHideRewardItem, setShouldHideRewardItem] = useState(
    form.getValues("objective_reward_type") === "balance"
  )
  const [submitted, setSubmitted] = useState<boolean | undefined>(false)

  const { fields } = useFieldArray({
    name: "objectives",
    control: form.control,
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      setShouldHideRewardItem(value.objective_reward_type !== "item")
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  function addObjective() {
    const objectives = form.getValues("objectives")

    objectives.push({
      type: "",
      amount: 0,
      mob_block: "",

      require_main_hand: false,
      require_time_limit: false,
      require_location: false,

      main_hand: undefined,
      location_x: undefined,
      location_z: undefined,
      radius: undefined,
      time_limit: {
        hours: undefined,
        min: undefined,
        sec: undefined,
      },
    })

    form.setValue("objectives", objectives)
  }

  function formatDataToApi(
    data: z.infer<typeof formSchema>
  ): QuestFormApiReady {
    let timer: number =
      Number(data.time_limit_h) * 3600 +
      Number(data.time_limit_min) * 60 +
      Number(data.time_limit_sec)

    let now = new Date()
    let inAWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    return {
      quest: {
        title: data.title,
        description: data.description,
        start_time: formatDateToAPI(now),
        end_time: formatDateToAPI(inAWeek),
      },

      objectives: [
        {
          objective: data.objective_item,
          order: 1,
          objective_count: data.objective_amount,
          objective_type: data.objective_type,
          objective_timer: data.require_time_limit ? timer : null,
          required_mainhand: data.require_main_hand
            ? String(data.objective_main_hand)
            : null,
          required_location: data.require_location
            ? [Number(data.location_x), Number(data.location_z)]
            : null,
          location_radius: isNaN(Number(data.radius)) ? 0 : Number(data.radius),
          rewards: [
            {
              balance:
                data.objective_reward_type === "balance"
                  ? data.objective_reward_amount
                  : null,
              item:
                data.objective_reward_type === "item"
                  ? String(data.objective_reward_item)
                  : null,
              count: data.objective_reward_amount,
            },
          ],
        },
      ],
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true)
    let apiReadyData = formatDataToApi(values)

    const questResponse = await fetch("/nexuscore-api/v0.1/quests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiReadyData),
    })

    if (questResponse.ok) {
      toast({
        title: "Success!",
        description: "The quest has been submitted!",
      })
      setTimeout(() => location.reload, 5000)
    } else {
      setSubmitted(false)
      toast({
        title: "Error!",
        description: `
            Something went wrong!
            ${questResponse.status}: ${questResponse.statusText}
          `,
        variant: "destructive",
      })
    }
  }

  function getConfirmationObjectiveString(): string {
    const mainObjective = `${form.getValues("objective_type")} ${form.getValues(
      "objective_amount"
    )} ${minecraftItemStringToWords(form.getValues("objective_item"))}`

    const mainhand: string = form.getValues("objective_main_hand") as string
    const withMainHand =
      form.getValues("require_main_hand") && mainhand
        ? ` with ${minecraftItemStringToWords(mainhand)}`
        : ""

    const onLocation =
      form.getValues("require_location") &&
        form.getValues("location_x") &&
        form.getValues("location_z") &&
        form.getValues("radius")
        ? ` up to ${form.getValues("radius")} blocks from X:${form.getValues(
          "location_x"
        )} Z:${form.getValues("location_z")}`
        : ""

    const h = form.getValues("time_limit_h")
    const min = form.getValues("time_limit_min")
    const sec = form.getValues("time_limit_sec")

    const timeLimit = form.getValues("require_time_limit")
      ? ` within ${Number(h) ? `${h}h` : ""}${Number(min) ? `${min}min` : ""}${Number(sec) ? `${sec}sec` : ""
      }`
      : ""

    return `The player must ${mainObjective}${withMainHand}${onLocation}${timeLimit}.`
  }

  function getConfirmationRewardString(): string {
    const reward =
      form.getValues("objective_reward_type") === "balance"
        ? "nugs"
        : minecraftItemStringToWords(
          form.getValues("objective_reward_item") as string
        )

    return `The player will get ${form.getValues(
      "objective_reward_amount"
    )} ${reward}.`
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (
    status === "unauthenticated" ||
    !session?.user?.everthornMemberInfo.isCM
  ) {
    return <NoPermission status={status} />
  }

  return (
    <section className="container grid max-w-screen-md gap-6 pb-8 pt-6 md:py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step 1: The Basics */}
          <div className={cn({ hidden: formStep !== 0 })}>
            <h1 className="text-4xl">Let's create a new quest!</h1>
            <h2 className="text-2xl mt-4">The Basics</h2>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
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
                    <FormLabel>
                      <h3>Description</h3>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Do you like cows? So do I, plea..."
                        {...field}
                      ></Textarea>
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
          <div className={cn({ hidden: formStep !== 1 })}>
            <div className="flex justify-between items-center space-x-4 mb-2">
              <h2 className="text-2xl md:text-3xl">Objectives</h2>
              <Button variant="ghost" onClick={() => addObjective()}>
                <PlusIcon />
              </Button>
            </div>
            {fields.map((field, index) => (
              <Card className="mb-4">
                <CardContent>
                  <Objective form={form} field={field} index={index} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* {/* Step 4: Rewards */}
          {/* <div className={ */}
          {/*   cn({ 'hidden': formStep !== 2 }) */}
          {/* }> */}
          {/*   <h2 className="text-2xl">Rewards</h2> */}
          {/*   <div className="flex w-full justify-stretch gap-4"> */}
          {/*     {/* Objective Reward Type */}
          {/*     <FormField */}
          {/*       control={form.control} */}
          {/*       name="objective_reward_type" */}
          {/*       render={({ field }) => ( */}
          {/*         <> */}
          {/*           <FormItem className="my-4 flex-1"> */}
          {/*             <FormLabel>Type</FormLabel> */}
          {/*             <FormControl> */}
          {/*               <Select onValueChange={field.onChange} {...field}> */}
          {/*                 <SelectTrigger> */}
          {/*                   <SelectValue placeholder="Select a reward type..." /> */}
          {/*                 </SelectTrigger> */}
          {/*                 <SelectContent> */}
          {/*                   <SelectItem value="balance">Balance</SelectItem> */}
          {/*                   <SelectItem value="item">Item</SelectItem> */}
          {/*                 </SelectContent> */}
          {/*               </Select> */}
          {/*             </FormControl> */}
          {/*             <FormDescription> */}
          {/*               What you giving to the people? */}
          {/*             </FormDescription> */}
          {/*             <FormMessage /> */}
          {/*           </FormItem> */}
          {/*         </> */}
          {/*       )} */}
          {/*     /> */}
          {/**/}
          {/*     {/* Objective Reward Amount */}
          {/*     <FormField */}
          {/*       control={form.control} */}
          {/*       name="objective_reward_amount" */}
          {/*       render={({ field }) => ( */}
          {/*         <> */}
          {/*           <FormItem className="my-4 flex-1"> */}
          {/*             <FormLabel>Amount</FormLabel> */}
          {/*             <FormControl> */}
          {/*               <Input type="number" placeholder='0' {...field} /> */}
          {/*             </FormControl> */}
          {/*             <FormDescription> */}
          {/*               Feeling generous? */}
          {/*             </FormDescription> */}
          {/*             <FormMessage /> */}
          {/*           </FormItem> */}
          {/*         </> */}
          {/*       )} */}
          {/*     /> */}
          {/*   </div> */}
          {/**/}
          {/*    Objective Reward Item */}
          {/*   <div className={cn({ "hidden": shouldHideRewardItem })}> */}
          {/*     <FormField */}
          {/*       control={form.control} */}
          {/*       name="objective_reward_item" */}
          {/*       render={() => ( */}
          {/*         <FormItem className="flex flex-col"> */}
          {/*           <FormLabel>Item</FormLabel> */}
          {/*           <VirtualizedCombobox */}
          {/*             options={items} */}
          {/*             searchPlaceholder="Search item..." */}
          {/*             onOptionSelect={(value: string) => { */}
          {/*               form.setValue("objective_reward_item", value) */}
          {/*             }} */}
          {/*           /> */}
          {/*           <FormDescription> */}
          {/*             The minecraft: prefix will be auto included for you! */}
          {/*           </FormDescription> */}
          {/*           <FormMessage /> */}
          {/*         </FormItem> */}
          {/*       )} */}
          {/*     /> */}
          {/*   </div> */}
          {/* </div> */}

          {/* Step 5: Confirm */}
          <div className={cn({ hidden: formStep !== 4 }, "space-y-4")}>
            <Card>
              <CardHeader>
                <CardTitle>{form.getValues("title")}</CardTitle>
                <CardDescription>
                  {form.getValues("description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-xl">Objectives</h2>
                  <p>{getConfirmationObjectiveString()}</p>
                </div>
                <div>
                  <h2 className="text-xl">Reward</h2>
                  <p>{getConfirmationRewardString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-2">
            <Button
              variant="outline"
              type="button"
              className={cn({ hidden: formStep < 1 })}
              onClick={() => {
                setFormStep(Math.max(0, formStep - 1)) // go back and ensure it's never below 0
              }}
            >
              <ArrowLeft className="mr-1" size="18" /> Back
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                if (formStep === 0) {
                  form.trigger(["title", "description"])

                  const titleState = form.getFieldState("title")
                  const descriptionState = form.getFieldState("description")

                  if (!titleState.isDirty || titleState.invalid) return
                  if (!descriptionState.isDirty || descriptionState.invalid)
                    return
                }

                if (formStep === 1) {
                  form.trigger([
                    "objective_type",
                    "objective_amount",
                    "objective_item",
                  ])

                  const objectiveTypeState =
                    form.getFieldState("objective_type")
                  const objectiveAmountState =
                    form.getFieldState("objective_amount")
                  const objectiveItemState =
                    form.getFieldState("objective_item")

                  if (!objectiveTypeState.isDirty || objectiveTypeState.invalid)
                    return
                  if (
                    !objectiveAmountState.isDirty ||
                    objectiveAmountState.invalid
                  )
                    return
                  if (objectiveItemState.invalid) return
                }

                if (formStep === 2) {
                  form.trigger([
                    "require_main_hand",
                    "require_location",
                    "require_time_limit",
                    "objective_main_hand",
                    "location_x",
                    "location_z",
                    "radius",
                    "time_limit_h",
                    "time_limit_min",
                    "time_limit_sec",
                  ])

                  const timeLimitHState = form.getFieldState("time_limit_h")
                  const timeLimitMinState = form.getFieldState("time_limit_min")
                  const timeLimitSecState = form.getFieldState("time_limit_sec")

                  if (
                    form.getValues("require_main_hand") &&
                    typeof form.getValues("objective_main_hand") === "undefined"
                  )
                    return

                  if (
                    form.getValues("require_location") &&
                    typeof form.getValues("location_x") === "undefined"
                  )
                    return
                  if (
                    form.getValues("require_location") &&
                    typeof form.getValues("location_z") === "undefined"
                  )
                    return

                  if (timeLimitHState.invalid) return
                  if (timeLimitMinState.invalid) return
                  if (timeLimitSecState.invalid) return
                }

                if (formStep === 3) {
                  form.trigger([
                    "objective_reward_type",
                    "objective_reward_amount",
                    "objective_reward_item",
                  ])

                  const rewardTypeState = form.getFieldState(
                    "objective_reward_type"
                  )
                  const rewardAmountState = form.getFieldState(
                    "objective_reward_amount"
                  )
                  const rewardItemState = form.getFieldState(
                    "objective_reward_item"
                  )

                  const rewardType = form.getValues("objective_reward_type")

                  if (!rewardTypeState.isDirty || rewardTypeState.invalid)
                    return
                  if (!rewardAmountState.isDirty || rewardAmountState.invalid)
                    return
                  if (rewardType === "item" && rewardItemState.invalid) return
                }

                setFormStep(Math.min(formStep + 1, 4)) // make sure it never goes past 3
              }}
              className={cn({ hidden: formStep > 3 })}
            >
              Next <ArrowRight className={"ml-1"} size="18" />
            </Button>
            <Button
              type="submit"
              disabled={submitted}
              className={cn({ hidden: formStep !== 4 })}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </section>
  )
}
