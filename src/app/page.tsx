"use client"
import Link from "next/link"
import Image from "next/image"

import { siteConfig } from "@/config/site";
import { buttonVariants, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator} from "@/components/ui/separator";
import { LayoutGrid } from "@/components/ui/layout-grid";
import backgroundimage from '../../public/bg.png';
import screenshot1 from '../../public/screenshots/Minecraft-Screenshot-2024.04.21-10.07.58.92.webp'
import screenshot2 from '../../public/screenshots/Minecraft Screenshot 2024.04.21 - 09.57.54.67.webp'
import screenshot3 from '../../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.00.09.26.webp'
import screenshot4 from '../../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.01.35.73.webp'
import screenshot5 from '../../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.02.34.49.webp'
import screenshot6 from '../../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.06.35.13.webp'
import screenshot7 from '../../public/screenshots/Minecraft-Screenshot-2024.04.21-10.08.45.35.webp'
import screenshot8 from '../../public/screenshots/Minecraft Screenshot 2024.04.21 - 10.04.18.79.webp'
import hero from '../../public/screenshots/Hero.png'
import Hero from "@/components/sections/hero";
import Feature from "@/components/sections/feature";
import History from "@/components/sections/history";
import {ArrowRight} from "lucide-react";
import {PatreonLogo} from "@phosphor-icons/react";


export default function IndexPage() {
    return (
        <section className="mx-5 grid items-center gap-6 pb-8 pt-6 md:mx-10 md:py-10 xl:mx-20">

            <Hero/>

            <Feature className={'pt-16'}/>

            <History className={'mx-0 pt-16 md:mx-24'}/>



            {/*<section className={'mx-auto mt-5 grid grid-rows-2 items-center gap-x-9 gap-y-7 lg:mx-0 lg:grid-cols-3 lg:items-start'}>*/}
            {/*  <div>*/}
            {/*    <h1 className="col-span-1 row-span-1 items-start text-2xl md:text-4xl">*/}
            {/*    <span>Wonderful projects, right? </span>*/}
            {/*    </h1>*/}
            {/*    <p>*/}
            {/*      Create your own. Let your imagination run free. <br />*/}
            {/*      Projects are how we work on Everthorn.*/}
            {/*    </p>*/}
            {/*    <Link href={'/wiki/projects'}>*/}
            {/*      <Button className={'mt-4 w-full justify-between'}>*/}
            {/*        <div> Explore our Projects </div>*/}
            {/*        <ArrowRight size={20} />*/}
            {/*      </Button>*/}
            {/*    </Link>*/}
            {/*  </div>*/}

            {/*  <div className='row-span-1'>*/}
            {/*    <h1 className="col-span-1 items-start text-2xl md:text-4xl">*/}
            {/*    <span>Lore. Stories. Wiki. <br/> We got it. </span>*/}
            {/*    </h1>*/}
            {/*    <p>*/}
            {/*      The wiki is the place to read and write stories.<br />*/}
            {/*      Everthorn is where those stories play out.*/}
            {/*    </p>*/}
            {/*    <Link href={'/wiki'}>*/}
            {/*      <Button className={'mt-4 w-full justify-between'}>*/}
            {/*        <div> Enter the Wiki </div>*/}
            {/*        <ArrowRight size={20} />*/}
            {/*      </Button>*/}
            {/*    </Link>*/}
            {/*  </div>*/}

            {/*</section>*/}

            {/*<section className='mx-auto mt-12 text-center'>*/}
            {/*  <h1 className="text-3xl font-bold md:text-6xl">*/}
            {/*  <span>Even Thorny has to eat. </span>*/}
            {/*  </h1>*/}
            {/*  <p style={{ "--max-width": "99999px" } as React.CSSProperties}>*/}
            {/*    Support the server by becoming a <b className={'text-attention2'}>Patron!</b> <br /> Donating helps keep*/}
            {/*    Everthorn running, and also provides Thorny with dinner every night.*/}
            {/*  </p>*/}
            {/*  <Link href={siteConfig.links.patreon} target={'_blank'}>*/}
            {/*    <Button className={'mt-4 justify-between'} variant={'patreon'} size={'lg'}>*/}
            {/*      <PatreonLogo className={'size-6'} weight={'fill'} /> <div className='ms-2'>Feed Thorny </div>*/}
            {/*    </Button>*/}
            {/*  </Link>*/}
            {/*</section>*/}

        </section>
    )
}