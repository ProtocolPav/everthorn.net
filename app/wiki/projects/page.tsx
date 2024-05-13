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
import { Pencil, MapTrifold } from "@phosphor-icons/react";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-6xl font-extrabold leading-tight tracking-tighter text-secondary-foreground md:text-7xl">
        <span>Projects</span>
      </h1>
      <div className="max-w-[700px] text-lg text-muted-foreground">
        Take a look at all of the Everthorn Projects. See what new projects have popped up,
        catch up with the projects you know and love, and maybe even find one that you
        can join!

        You can also check out the live locations of these projects on our
        world map!
      </div>

      <div className={'flex grid-cols-2'}>
        <Link href={"/map"}>
          <Button variant={"outline"} className={"h-auto mx-1"}>
            <MapTrifold weight={'fill'} size={20}/> <div className={'ml-2'}>World Map</div>
          </Button>
        </Link>

        <Link href={"/wiki/projects/new"}>
          <Button variant={"outline"} className={"h-auto mx-1"}>
            <Pencil weight={'fill'} size={20}/> <div className={'ml-2'}>New Project</div>
          </Button>
        </Link>
      </div>

      <Separator className="my-5" />

      <div className={'grid md:grid-cols-3 gap-5'}>
        <Button variant={'card'} className={'h-auto w-auto p-0'}>
          <Card className={'bg-card/0 h-full w-full'}>
            <CardHeader className={'p-2 container h-[240px]'}>
              <Image
                src={screenshot3}
                alt={'Project Image'}
                className={"relative overflow-hidden size-full rounded-md opacity-80 object-cover"}
              />
            </CardHeader>
            <CardContent>
              {/*48 characters for title, 100 for description. Truncate with ellipsis*/}
              <CardTitle className={'mb-1 mt-2 line-clamp-1 leading-tight text-xl'}>Padova</CardTitle>
              <CardDescription className={'line-clamp-2 leading-tight'}>This is the description!</CardDescription>
            </CardContent>
          </Card>
        </Button>

        <Button variant={'card'} className={'h-auto w-auto p-0'}>
          <Card className={'bg-card/0 h-full w-full'}>
            <CardHeader className={'p-2 container h-[240px]'}>
              <Image
                src={screenshot3}
                alt={'Project Image'}
                className={"relative overflow-hidden size-full rounded-md opacity-80 object-cover"}
              />
            </CardHeader>
            <CardContent>
              {/*48 characters for title, 100 for description. Truncate with ellipsis*/}
              <CardTitle className={'mb-1 mt-2 line-clamp-1 leading-tight text-xl'}>Unreasonably Long Project Name</CardTitle>
              <CardDescription className={'line-clamp-2 leading-tight'}>This is the description! It auto-truncates to fit the content box, so no need for us to do anything!</CardDescription>
            </CardContent>
          </Card>
        </Button>

      </div>
    </section>
  )
}
