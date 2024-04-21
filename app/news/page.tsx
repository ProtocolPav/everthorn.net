import Link from "next/link"

import { siteConfig } from "@/config/site";
import { buttonVariants, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator} from "@/components/ui/separator";
import { LayoutGrid } from "@/components/ui/layout-grid";
import backgroundimage from '../public/bg.png';

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      
      <h1 className="text-6xl font-extrabold leading-tight tracking-tighter text-secondary-foreground md:text-7xl">
        <span>Latest News</span>
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        What&apos;s been going on at Everthorn recently? Find out here!
      </p>
      
      <Separator className="my-5" />
      
      <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-secondary-foreground md:text-4xl">
        <span>May 2024 - Introducing the new website</span>
      </h2>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        Introducing: our new Website! It's been rebuilt from the ground up with a sleek new
        design and amazing new features.
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        Firstly, you'll notice the new design. Minimalism is the key behind it, making everything super easy to
        see and the website really easy to use. The navbar on the top of the screen has links to every important part of the
        website, from the Home page to the Guidelines, to even the Wiki and the News!
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        The Wiki has moved! Now, officially, our wiki is hosted locally on this website. You can
        create new pages and edit them. Gone are the days of the confusing fandom editor! Not all
        wiki pages have been ported yet, so be patient.
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        Additionally, 
      </p>

    </section>
  )
}