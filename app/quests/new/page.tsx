"use client"

import { useState } from "react"
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

const formSchema = z.object({
  title: z
    .string({ required_error: "MARS!!! Did you forget to add a title? ;-;" })
    .min(2, { message: "MARS!!! Quests need a bigger title." })
    .max(63, { message: "MARS...!!! That's a little too much, init?" }),
  description: z
    .string()
    .min(10, { message: "MARS!!! People need to know what to do!" })
    .max(255, { message: "MARS!!! The people have asked for you to stop!" }),
  objective_type: z.number(),
  objective_amount: z
    .number({ required_error: "MARS!!! How many??" })
    .int({ message: "MARS!!! Fractional numbers??" })
    .gt(0, { message: "MARS!!! No negative numbers!" }),
  objective_reward_type: z.string(),
  objective_reward_amount: z
    .number()
    .int({ message: "MARS!!! Fractional numbers??" })
    .gt(0, { message: "MARS!!! Seriously? People get nothing?" }),
  objective_reward_item: z.string({ required_error: "MARS!!! What exactly?" }),
  objective_main_hand: z.string(),
  location_x: z.number(),
  location_z: z.number(),
  radius: z.number().gt(0, { message: "MARS!!! A radius cannot be negative! Learn math!" }),
  time_limit_h: z.number().int().gt(-1, { message: "MARS!!! No negative time!" }),
  time_limit_min: z.number().int().gt(-1, { message: "MARS!!! No negative time!" }).lt(61, { message: "MARS!!! How many minutes does an hour have?" })
})

export default function NewQuest() {
  const [formStep, setFormStep] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className="container grid gap-6 pb-8 pt-6 max-w-screen-md md:py-10">
      <h1 className="text-4xl">Let's create a new quest!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={
            cn({ 'hidden': formStep !== 0 })
          }>
            <h2>The Basics</h2>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <>
                  <FormItem className="my-4">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Cow Murder"></Input>
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
                      <Textarea placeholder="Do you like cows? So do I, plea..."></Textarea>
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
          <div className={
            cn({ 'hidden': formStep !== 1 })
          }>
            <h2>Objectives</h2>
            {/* Objective Type */}
            <FormField
              control={form.control}
              name="objective_type"
              render={({ field }) => (
                <>
                  <FormItem className="my-4">
                    <FormLabel>Objective Type</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Kill"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kill">Kill</SelectItem>
                          <SelectItem value="mine">Mine</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      The type of quest. Feeling murderous or chill mining and crafting?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}  
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className={ cn({ "hidden": formStep !== 2 }) }>Submit</Button>
            <Button variant="outline" onClick={() => {
              if (formStep === 0) {
                form.trigger(["title", "description"])
                const titleState = form.getFieldState('title')
                const descriptionState = form.getFieldState('description')

                if (!titleState.isDirty || !titleState.invalid) return
                if (!descriptionState.isDirty || !descriptionState.invalid) return
              }

              setFormStep(Math.min(formStep + 1, 2)) // make sure it never goes past 2
            }}>
              Next <ArrowRight className={"ml-1"} size="18" />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
