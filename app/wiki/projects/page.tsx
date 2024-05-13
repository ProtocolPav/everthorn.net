"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import screenshot3 from "../../../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.00.09.26.webp"
import { Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <h1 className="text-6xl font-extrabold leading-tight tracking-tighter text-secondary-foreground md:text-7xl">
            <span>Projects</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Take a look at all of the Everthorn Projects. See what new projects have popped up,
            catch up with the projects you know and love, and maybe even find one that you
            can join!
          </p>

          <Separator className="my-5" />

          <div className={'grid md:grid-cols-3 gap-5'}>
            <Card>
              <CardHeader className={'p-2 container h-[240px]'}>
                <Image
                  src={screenshot3}
                  alt={'Project Image'}
                  className={"relative overflow-hidden size-full rounded-md opacity-80 object-cover"}
                />
              </CardHeader>
              <CardContent>
                {/*48 characters for title, 100 for description. Truncate with ellipsis*/}
                <CardTitle className={'mb-1'}>Padova</CardTitle>
                <CardDescription>This is the description! Max. 100 characters, so truncate and add so...</CardDescription>
              </CardContent>

              <CardFooter>
                <Button>View!</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className={'p-2 container h-[240px]'}>
                <Image
                  src={screenshot3}
                  alt={'Project Image'}
                  className={"relative overflow-hidden size-full rounded-md opacity-80 object-cover"}
                />
              </CardHeader>
              <CardContent>
                {/*48 characters for title, 100 for description. Truncate with ellipsis*/}
                <CardTitle className={'mb-1'}>Unreasonably Long Pr...</CardTitle>
                <CardDescription>This is the description! Max. 100 characters, so truncate and add so...</CardDescription>
              </CardContent>

              <CardFooter>
                <Button>View!</Button>
              </CardFooter>
            </Card>

          </div>
        </section>
  )
}
