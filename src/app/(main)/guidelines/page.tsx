"use client"
import {Accordion,} from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import * as React from "react"
import { ShieldCheck, Warning} from "@phosphor-icons/react"
import {Card, CardHeader} from "@/components/ui/card";
import ServerRules from "@/app/(main)/guidelines/_components/server";
import DiscordRules from "@/app/(main)/guidelines/_components/discord";
import ProjectRules from "@/app/(main)/guidelines/_components/projects";
import EventsRules from "@/app/(main)/guidelines/_components/events";
import ConnectionRules from "@/app/(main)/guidelines/_components/connection";
import ServerAddons from "@/app/(main)/guidelines/_components/addons";

export default function Guidelines() {
  return (
      <section className="mx-5 grid items-center gap-6 pb-8 pt-6 md:mx-10 md:py-10 xl:mx-20">
          <Card className={'w-full bg-background/20 bg-gradient-to-tr from-background/80 to-yellow-400/20'}>
              <CardHeader className={'flex pb-0'}>
                  <h1 className={'flex items-center justify-start gap-2'}>
                      <ShieldCheck weight={'duotone'}/>
                      Guidelines
                  </h1>
              </CardHeader>
          </Card>

          <Alert className="" variant={'amber'}>
              <Warning weight={'duotone'} className="size-4"/>
              <AlertDescription>
                  These rules are strictly enforced. Violations may result in removal from the community.
              </AlertDescription>
          </Alert>

          <Accordion type="single" collapsible className="w-full space-y-2">
              <ConnectionRules/>
              <ServerRules/>
              <ProjectRules/>
              <DiscordRules/>
              <EventsRules/>
              <ServerAddons/>
          </Accordion>
      </section>
  )
}
