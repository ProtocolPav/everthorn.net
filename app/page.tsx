"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site";
import { buttonVariants, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator} from "@/components/ui/separator";
import { LayoutGrid, Card } from "@/components/ui/layout-grid";
import backgroundimage from '../public/bg.png';
import screenshot1 from '../public/screenshots/Minecraft-Screenshot-2024.04.21-10.07.58.92.webp'
import screenshot2 from '../public/screenshots/Minecraft Screenshot 2024.04.21 - 09.57.54.67.webp'
import screenshot3 from '../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.00.09.26.webp'
import screenshot4 from '../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.01.35.73.webp'
import screenshot5 from '../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.02.34.49.webp'
import screenshot6 from '../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.06.35.13.webp'
import screenshot7 from '../public/screenshots/Minecraft-Screenshot-2024.04.21-10.08.45.35.webp'
import screenshot8 from '../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.04.18.79.webp'
import {Icons} from '@/components/icons'

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
        {
          siteConfig.latestupdate.text ?
          <Link
            href={siteConfig.latestupdate.link}
            target={siteConfig.latestupdate.external ? '_blank' : ''}
            className={buttonVariants({ variant: "outline", className: 'mb-2 h-auto' })}>

          <Badge variant={'attention'}>NEW</Badge>&nbsp;&nbsp;
          {siteConfig.latestupdate.text}

          </Link>
          :
          <span></span>
        }
        <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-7xl">
          <span>The hub for all that is <br /> </span>
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-6xl text-transparent md:text-8xl">Everthorn</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Everything Everthorn. All in one place. <br className="hidden sm:inline" />
          Find the guidelines, our world map and our newly updated wiki.
        </p>
      </div>
      <div className="mx-auto flex gap-4">
        <Link href={"/news"} className={buttonVariants({ variant: "secondary" })}>
          🤔 Checkout the latest News & Updates!
        </Link>
      </div>

      <div className="h-[800px] p-5">
        <LayoutGrid cards={cards} />
      </div>

      <section className={'mx-auto mt-5 grid grid-rows-2 items-center gap-x-9 gap-y-7 lg:mx-0 lg:grid-cols-3 lg:items-start'}>
        <div>
          <h1 className="col-span-1 row-span-1 items-start text-2xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          <span>Wonderful projects, right? </span>
          </h1>
          <p className="mt-2 max-w-[700px] text-lg text-muted-foreground">
            Create your own. Let your imagination run free. <br />
            Projects are how we work on Everthorn.
          </p>
          <Link href={'/wiki/projects'}>
            <Button className={'mt-4 w-full justify-between'}>
              <div> Explore our Projects </div>
              <Icons.arrow_right size={20} />
            </Button>
          </Link>
        </div>

        <div className="col-span-2 row-span-2 hidden h-[500px] ps-5 lg:block">
          <LayoutGrid cards={cards_secondary} />
        </div>

        <div className='row-span-1'>
          <h1 className="col-span-1 items-start text-2xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          <span>Lore. Stories. Wiki. <br/> We got it. </span>
          </h1>
          <p className="mt-2 max-w-[700px] text-lg text-muted-foreground">
            The wiki is the place to read and write stories.<br />
            Everthorn is where those stories play out.
          </p>
          <Link href={'/wiki'}>
            <Button className={'mt-4 w-full justify-between'}>
              <div> Enter the Wiki </div>
              <Icons.arrow_right size={20} />
            </Button>
          </Link>
        </div>

      </section>

      <section className='mx-auto mt-12 text-center'>
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl">
        <span>Even Thorny has to eat. </span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Support the server by becoming a <b className={'text-attention2'}>Patron!</b> <br /> Donating helps keep
          Everthorn running, and also provides Thorny with dinner every night.
        </p>
        <Link href={siteConfig.links.patreon} target={'_blank'}>
          <Button className={'mt-4 justify-between'} variant={'patreon'} size={'lg'}>
            <Icons.patreon className={'size-6'} weight={'fill'} /> <div className='ms-2'>Feed Thorny </div>
          </Button>
        </Link>
      </section>

    </section>
  )
}

let cards: Card[]

cards = [
  {
    id: 1,
    className: "md:col-span-2",
    thumbnail:
      screenshot5,
  },
  {
    id: 2,
    className: "col-span-1",
    thumbnail:
      screenshot4,
  },
  {
    id: 3,
    className: "col-span-1",
    thumbnail:
      screenshot1,
  },
  {
    id: 5,
    className: "md:col-span-2 md:block hidden",
    thumbnail:
      screenshot8,
  }
];

const cards_secondary = [
  {
    id: 1,
    className: "md:col-span-2 row-span-2",
    thumbnail:
      screenshot2,
  },
  {
    id: 2,
    className: "col-span-",
    thumbnail:
      screenshot6,
  },
  {
    id: 3,
    className: "col-span-1",
    thumbnail:
      screenshot7,
  }
];