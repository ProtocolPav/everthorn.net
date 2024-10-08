"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { PlusIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { ObjectiveType, QuestFormApiReady } from "@/types/quest_form"
import { formSchema, objectiveSchema } from "@/lib/forms/new_quest"
import { cn, formatDateToAPI } from "@/lib/utils"
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
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import Objective from "@/components/client/quests-form/objective"
import ConfirmObjectives from "@/components/client/quests-form/quest-objective-confirm"
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
  const [submitted, setSubmitted] = useState<boolean | undefined>(false)
  const [submitSuccess, setSuccess] = useState<boolean>(false)

  const { fields } = useFieldArray({
    name: "objectives",
    control: form.control,
  })

  function addObjective() {
    const objectives = form.getValues("objectives")
    const rewards = form.getValues("rewards")

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

    rewards.push({
      type: "",
      amount: 0,
      item: "",
    })

    form.setValue("objectives", objectives)
    form.setValue("rewards", rewards)
  }

  function formatDataToApi(
    data: z.infer<typeof formSchema>
  ): QuestFormApiReady {
    let now = new Date()
    let inAWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const objectivesForApi: ObjectiveType[] = []

    for (let i = 0; i < data.objectives.length; i++) {
      const objective = data.objectives[i]
      const reward = data.rewards[i]

      let timer: number =
        Number(objective.time_limit.hours) * 3600 +
        Number(objective.time_limit.min) * 60 +
        Number(objective.time_limit.sec)

      let objectiveForApi: ObjectiveType = {
        objective: objective.mob_block,
        order: i,
        objective_count: objective.amount,
        objective_type: objective.type,
        objective_timer: timer,
        required_mainhand: objective.require_main_hand
          ? String(objective.main_hand)
          : null,
        required_location: objective.require_location
          ? [Number(objective.location_x), Number(objective.location_z)]
          : null,
        location_radius: isNaN(Number(objective.radius))
          ? 0
          : Number(objective.radius),
        rewards: [
          {
            balance: reward.type === "balance" ? reward.amount : null,
            item: reward.type === "item" ? String(reward.item) : null,
            count: reward.amount,
          },
        ],
      }
      objectivesForApi.push(objectiveForApi)
    }

    return {
      quest: {
        title: data.title,
        description: data.description,
        start_time: formatDateToAPI(now),
        end_time: formatDateToAPI(inAWeek),
      },

      objectives: objectivesForApi,
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
      setSuccess(true)
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
    <section className="container grid gap-6 pt-6 pb-8 max-w-screen-md md:py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step 1: The Basics */}
          <div className={cn({ hidden: formStep !== 0 })}>
            <h1 className="text-4xl">Let's create a new quest!</h1>
            <h2 className="mt-4 text-2xl">The Basics</h2>
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
            <div className="flex justify-between items-center mb-2 space-x-4">
              <h2 className="text-2xl md:text-3xl">Objectives</h2>
              <Button variant="ghost" onClick={() => addObjective()}>
                <PlusIcon />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="objectives"
              render={() => (
                <>
                  {fields.map((field, index) => (
                    <Card className="mb-4">
                      <CardContent>
                        <Objective form={form} field={field} index={index} />
                      </CardContent>
                    </Card>
                  ))}
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/* Step 3: Confirm */}
          <div className={cn({ hidden: formStep !== 2 }, "space-y-4")}>
            <Card>
              <CardHeader>
                <CardTitle>{form.getValues("title")}</CardTitle>
                <CardDescription>
                  {form.getValues("description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {fields.map((_, index) => (
                  <ConfirmObjectives
                    objective={form.getValues(`objectives.${index}`)}
                    reward={form.getValues(`rewards.${index}`)}
                    index={index}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-10">
            <Button
              variant="outline"
              type="button"
              disabled={submitted}
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
              onClick={async () => {
                if (formStep === 0) {
                  form.trigger(["title", "description"])

                  const titleState = form.getFieldState("title")
                  const descriptionState = form.getFieldState("description")

                  if (!titleState.isDirty || titleState.invalid) return
                  if (!descriptionState.isDirty || descriptionState.invalid)
                    return
                }

                if (formStep === 1) {
                  let hasErrors: boolean = false

                  const thereAreObjectives: boolean = await form.trigger(
                    "objectives"
                  )

                  if (!thereAreObjectives) return
                  else {
                    form.clearErrors("objectives")
                  }

                  for (
                    let i = 0;
                    i < form.getValues("objectives").length;
                    i++
                  ) {
                    const objectiveIsValid: boolean = await form.trigger([
                      `objectives.${i}.type`,
                      `objectives.${i}.amount`,
                      `objectives.${i}.mob_block`,
                      `objectives.${i}.require_main_hand`,
                      `objectives.${i}.require_location`,
                      `objectives.${i}.require_time_limit`,
                      `objectives.${i}.main_hand`,
                      `objectives.${i}.location_x`,
                      `objectives.${i}.location_z`,
                      `objectives.${i}.radius`,
                      `objectives.${i}.time_limit.hours`,
                      `objectives.${i}.time_limit.min`,
                      `objectives.${i}.time_limit.sec`,

                      `rewards.${i}.type`,
                      `rewards.${i}.amount`,
                      `rewards.${i}.item`,
                    ])

                    if (!objectiveIsValid) {
                      form.setError(`objectives.${i}`, {
                        message:
                          "MARS!!! There's an issue with this objective!",
                      })

                      hasErrors = true
                    }
                  }

                  if (hasErrors) return
                }

                setFormStep(Math.min(formStep + 1, 2))
              }}
              className={cn({ hidden: formStep > 1 })}
            >
              Next <ArrowRight className={"ml-1"} size="18" />
            </Button>
            <Button
              type="submit"
              disabled={submitted}
              className={cn({ hidden: formStep !== 2 })}
            >
              Submit
            </Button>
            <Button
              type="reset"
              disabled={!submitSuccess}
              onClick={() => location.reload()}
              className={cn({ hidden: formStep !== 2 })}
            >
              Create another!
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </section>
  )
}
