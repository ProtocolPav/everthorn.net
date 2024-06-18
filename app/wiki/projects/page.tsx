"use client"

import { Separator } from "@/components/ui/separator";
import { AllProjects } from "@/components/server/all-projects";


export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">

      <h1>
        Projects
      </h1>
      <Separator />
      {/* @ts-expect-error Server Component */}
      <AllProjects />

    </section>
  )
}
