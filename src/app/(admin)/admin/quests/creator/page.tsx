"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon } from "@phosphor-icons/react"
import { PlusIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { ObjectiveType, QuestFormApiReady } from "@/types/quest_form"
import { formSchema } from "@/lib/forms/new_quest"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {  format } from "date-fns"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function NewQuest() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",

      objectives: [
        {
          description: undefined,
          type: undefined,
          amount: undefined,
          mob_block: undefined,
          script_id: undefined,
          display: "",

          require_natural_block: true,
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
          display_name: undefined,
          type: undefined,
          amount: undefined,
          item: "",
        },
      ],
    },
  })

  function handleTimeChange(type: "hour" | "minute", value: string, getvalue: "end" | "start") {
    const currentDate = form.getValues(getvalue) || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue(getvalue, newDate);
  }

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
      description: "",
      type: "",
      amount: 0,
      mob_block: "",
      script_id: "",
      display: "",

      require_natural_block: true,
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
      display_name: undefined,
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

    const objectivesForApi: ObjectiveType[] = []

    for (let i = 0; i < data.objectives.length; i++) {
      const objective = data.objectives[i]
      const reward = data.rewards[i]

      let timer: number =
        Number(objective.time_limit.hours) * 3600 +
        Number(objective.time_limit.min) * 60 +
        Number(objective.time_limit.sec)

      let task: string = ''
      if (objective.type == 'encounter' && objective.script_id !== undefined) {
        task = objective.script_id
      }
      else if (objective.mob_block !== undefined) {
        task = objective.mob_block
      }

      let objectiveForApi: ObjectiveType = {
        description: objective.description,
        objective: task,
        display: objective.display ?? null,
        order: i,
        objective_count: objective.amount,
        objective_type: objective.type,
        objective_timer: timer,
        natural_block: objective.require_natural_block,
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
            display_name: reward.display_name ?? null,
            balance: reward.type === "balance" ? reward.amount : null,
            item: reward.type === "item" ? String(reward.item) : null,
            count: reward.amount,
          },
        ],
      }
      objectivesForApi.push(objectiveForApi)
    }

    return {
      title: data.title,
      description: data.description,
      start_time: formatDateToAPI(data.start),
      end_time: formatDateToAPI(data.end),
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

  async function validate(): Promise<boolean> {
    if (formStep === 0) {
      await form.trigger(["title", "description"])

      const titleState = form.getFieldState("title")
      const descriptionState = form.getFieldState("description")

      if (!((titleState.isDirty || titleState.invalid)
        && (descriptionState.isDirty || descriptionState.invalid)))
      return false;
    }

    if (formStep === 1) {
      let hasErrors: boolean = false

      const thereAreObjectives: boolean = await form.trigger(
        "objectives"
      )

      if (!thereAreObjectives) return false;
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
          `objectives.${i}.script_id`,
          `objectives.${i}.display`,
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

          `rewards.${i}.display_name`,
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

      if (hasErrors) return false;
    }

    return true;
  }

  return (
    <section className="container grid max-w-screen-md gap-6 pb-8 pt-6 md:py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onBlur={validate}>
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
                        placeholder="Old man Geeza wants his gems back... Embark on a big quest where you'll be fighting monsters, traveling the world, and trying to retrieve the gems. Will you manage?"
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormDescription>
                      Descriptions should describe the quest to come. Introduce the story,
                      describe some of the things people will be doing (like traveling to x place, killing x mobs, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>

          {/* Step 2: Objectives */}
          <div className={cn({ hidden: formStep !== 1 })}>
            <div className="mb-2 flex items-center justify-between space-x-4">
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
                        <Objective form={form} field={field} index={index} create_new={addObjective} length={fields.length} />
                      </CardContent>
                    </Card>
                  ))}

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

            <CardContent className="flex gap-4">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy HH:mm")
                            ) : (
                              <span>MM/DD/YYYY HH:mm</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="sm:flex">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                          <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex p-2 sm:flex-col">
                                {Array.from({ length: 24 }, (_, i) => i)
                                  .reverse()
                                  .map((hour) => (
                                    <Button
                                      key={hour}
                                      size="icon"
                                      variant={
                                        field.value && field.value.getHours() === hour
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="aspect-square shrink-0 sm:w-full"
                                      onClick={() =>
                                        handleTimeChange("hour", hour.toString(), "start")
                                      }
                                    >
                                      {hour}
                                    </Button>
                                  ))}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex p-2 sm:flex-col">
                                {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                  (minute) => (
                                    <Button
                                      key={minute}
                                      size="icon"
                                      variant={
                                        field.value &&
                                        field.value.getMinutes() === minute
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="aspect-square shrink-0 sm:w-full"
                                      onClick={() =>
                                        handleTimeChange("minute", minute.toString(), "start")
                                      }
                                    >
                                      {minute.toString().padStart(2, "0")}
                                    </Button>
                                  )
                                )}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Please select your preferred date and time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy HH:mm")
                            ) : (
                              <span>MM/DD/YYYY HH:mm</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="sm:flex">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                          <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex p-2 sm:flex-col">
                                {Array.from({ length: 24 }, (_, i) => i)
                                  .reverse()
                                  .map((hour) => (
                                    <Button
                                      key={hour}
                                      size="icon"
                                      variant={
                                        field.value && field.value.getHours() === hour
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="aspect-square shrink-0 sm:w-full"
                                      onClick={() =>
                                        handleTimeChange("hour", hour.toString(), "end")
                                      }
                                    >
                                      {hour}
                                    </Button>
                                  ))}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="w-64 sm:w-auto">
                              <div className="flex p-2 sm:flex-col">
                                {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                  (minute) => (
                                    <Button
                                      key={minute}
                                      size="icon"
                                      variant={
                                        field.value &&
                                        field.value.getMinutes() === minute
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="aspect-square shrink-0 sm:w-full"
                                      onClick={() =>
                                        handleTimeChange("minute", minute.toString(), "end")
                                      }
                                    >
                                      {minute.toString().padStart(2, "0")}
                                    </Button>
                                  )
                                )}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Please select your preferred date and time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            </Card>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-2">
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
                if (await validate()) {
                  setFormStep(Math.min(formStep + 1, 2))
                }
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
