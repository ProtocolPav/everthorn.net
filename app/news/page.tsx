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
        <span>April 2024 - Introducing the new website</span>
      </h2>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        Introducing: Everthorn.net v2! It's been rebuilt from the ground up with a sleek new
        design..
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        Minimalism is the name, and accesibility is the game! Everything is clearly laid out, with the
        navigation menu allowing you to traverse the entire website with ease.
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        The website is also
          optimised for mobile devices, as well as PC. An example of this would be the Nav bar which
          turns into a side menu on mobile.
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        This section, News will feature all of our latest pieces of news, from website updates to new
        Everthorn features, to even Events! It is meant to be the one place to easily digest the latest happenings
        and keep yourself up-to-date.
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        But this is just the beginning! We have plans to expand the functionality of the website. Most notable, to move the
        Wiki onto here. Fandom is clunky. Everthorn is not.
      </p>
      <p className="max-w-[900px] text-lg text-muted-foreground">
        And of course, our World Map will become <i>actually</i> interactive, allowing you to view live updates
        to the world as they happen, view Projects created live, and see the locations of anyone on the server!
      </p>

    </section>
  )
}