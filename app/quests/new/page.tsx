"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { ArrowRight } from "@phosphor-icons/react"

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "MARS!!! Quests need a bigger title.",
    })
    .max(50, {
      message: "MARS...!!! That's a little too much, init?",
    }),
  description: z
    .string()
    .min(10, {
      message: "MARS!!! People need to know what to do!",
    })
    .max(300, {
      message: "MARS!!! The people have asked for you to stop!",
    }),
})

export default function NewQuest() {
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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <>
                <FormItem>
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
                    Descriptions should hook people, but shouldn't be so long that it bores them.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          
          <Button variant="outline">Next <ArrowRight className={"ml-1"} size="18"/></Button>
        </form>
      </Form>
    </section>
  )
}
