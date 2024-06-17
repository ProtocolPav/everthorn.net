"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"


export default function Guidelines() {
  return (
      <section className="container grid gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          
          <span>
            <Badge variant={'outline'}>Last Updated: April 2024</Badge>
          </span>
          <h1>
            <span>Guidelines</span>
          </h1>
          <p>
            The Guidelines include all of our rules, different concepts such as
            &apos;Projects&apos; and &apos;Quests&apos;, as well as how to connect to the server on all devices!
          </p>
          
          <Separator className="my-5" />
          
          <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span>
                      Server Rules &nbsp;
                      <Badge variant={'attention'}>Must-Read</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={'text-muted-foreground'}>
                    <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                      <li>
                        <span className='font-bold text-attention2'>Don’t grief, steal or hack/glitch the game in any way. We are a community built on trust. </span>
                        Losing that means losing your spot in our community.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Some farms are not allowed. </span>
                        To make the experience better for everyone, the following farms are not allowed:
                          <ul className='max-w-[750px] list-disc pl-8 pt-2'>
                            <li>Raid Farms</li>
                            <li>Boss Farms (Wither, Ender Dragon, Warden, etc.)</li>
                            <li>Nether Portal Farms</li>
                            <li>0-tick farms</li>
                            <li>Flying Machines</li>
                            <li>Chunk Loaders</li>
                          </ul>
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Redstone Farms should be reasonable in size. </span>
                        If they cause significant lag, you may be asked to take it down.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>All farms built must be decorated. </span>
                        This means you can’t just build a cobblestone box, you must actually decorate it. Make it into a “factory” building, get creative!
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>No tall or floating farms. </span>
                        These types of farms can affect the view of other projects,
                        and we do not want to deter people from building somewhere
                        simply because there is a large pillar in the sky that they don’t like.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Farms should be turned off. </span>
                        If you go offline, switch off your farms. It reduces lag.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
            
                <AccordionItem value="item-2">
                  <AccordionTrigger>Discord Rules</AccordionTrigger>
                  <AccordionContent className={'text-muted-foreground'}>
                    <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                      <li>
                        <span className='font-bold'>Follow&nbsp;
                          <Link href={'https://discord.com/tos'} className='text-purple-500 hover:underline'>Discord TOS </Link>
                        </span>
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Take arguments into DMs. </span>
                        We do not want to have an agressive environment. Deal with things privately, please.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>No NSFW. </span>
                        Self explanatory. It is up to each CM&apos;s discretion as to what falls under NSFW.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Alt accounts aren&apos;t allowed. </span>
                        We&apos;re happy enough with one of you :)
                      </li>
                      
                    </ul>
                  </AccordionContent>
                </AccordionItem>
            
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <span>
                      Projects &nbsp;
                      <Badge variant={'attention'}>Must-Read</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
                    This is possibly the most important part of these guidelines.
                    Projects is how we work here on Everthorn. They help organize ourselves
                    as well as provide a way to share progress easily. What&apos;s great is they&apos;re
                    really simple to work with.
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Applying For A Project</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        All projects must be applied for. This is so we can have them in the system
                        to be able to create Discord Threads, Wiki pages and add your project to the World Map!
                      </li>
                      <li>
                        Applying is simple. You run the <Badge variant='command'>/project apply</Badge> command on discord.
                        The command will then guide you to filling in all the fields: The coordinates, description, name, etc.
                      </li>
                    </ul>
                    <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                      <p className='mx-3 text-slate-300'>
                        Projects will <span className="font-bold">almost always</span> be accepted! The only reason a project
                        will be denied is that it is deemed too large, or it is too close to another project and the project lead has plans
                        for that area.
                      </p>
                    </section>
                  
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Threads & Collaboration</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        You will receive a discord Thread for your project to send regular progress updates in.
                        You will also receive a page on the wiki that you can update with lore and progress updates!
                      </li>
                      <li>
                        We highly encourage collaboration. Help others with their projects and get them finished quicker!
                      </li>
                    </ul>
                  
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Roads</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        All projects MUST be connected to the public roads system, and this should be done as soon as your project is accepted.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
            
                <AccordionItem value="item-4">
                  <AccordionTrigger>Events, Quests & Monthly Market</AccordionTrigger>
                  <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
                    This section covers everything you need to know about Events, the Monthly Market, Nugs and Quests
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Events</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        Everthorn hosts a different event each month. These events range from something massive
                        like a boss fight, to something fun like a scavenger hunt or a build battle.
                      </li>
                      <li>
                        There is always something fun to do, with prizes available for every participant!
                      </li>
                    </ul>
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Quests</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        Quests are a fun new way to challenge yourself on Everthorn.
                      </li>
                      <li>
                        There are 5 new quests, refreshed weekly. They range in difficulty, but the
                        harder the quest, the better the prizes are!
                      </li>
                      <li>
                        You can only have 1 quest active at a time, so choose wisely! If you drop a quest
                        you will <span className={'font-bold text-attention2'}>never be able to do it again!</span>
                      </li>
                      <li>
                        Access the Quest Board by running <Badge variant='command'>/quests view</Badge> on discord.
                        This will show all available quests, or your currently active quest.
                      </li>
                    </ul>
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Monthly Market</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        The Monthly Market is our version of the Admin Shop. It refreshes on the 1st of every month.
                      </li>
                      <li>
                        It has a theme every month, such as Underwater or Nether.
                      </li>
                      <li>
                        Items in the Market have a limited stock, so if you really need something
                        it is a good idea to buy it immediately!
                      </li>
                      <li>
                        You buy items by sending a message in the thread, and we will set up a time to
                        deliver payment.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Natural Progression</AccordionTrigger>
                  <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
                    We have set up a few limits to help the server have a stable and natural progression. All of these
                    limits are enforced in-game by addons or command blocks.
                    <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                      <li>
                        <span className='font-bold text-attention2'>There is only one Nether Portal. </span>
                        This encourages people to explore the world and to expand and improve roads and other transportation systems.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>We have a World Border. </span>
                        Currently set at 2000 blocks in each direction, traveling past the border
                        will inflict you with negative effects such as blindness and nausea.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>The End is closed. </span>
                        In a future event, we will unlock the End. Until then, participate in events and quests to win shulker boxes!
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Elytra cannot be enchanted with Mending. </span>
                        This encourages the use of roads and other transportation methods.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
            
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    <span>
                      Connecting &nbsp;
                      <Badge variant={'attention'}>Must-Read</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
                    Our server runs on AmethystBDS, a server software developed specifically for Everthorn. This of course
                    means that we are not a realm and there must be a different way to connect.
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Getting Whitelisted</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        Each player must enter their gamertag into the server
                        whitelist by running the <Badge variant='command'>/profile view</Badge> command
                        on Discord, and pressing <b>Edit Profile</b>.
                      </li>
                      <li>
                        Once you enter your gamertag, ask a Community Manager to whitelist you, and you are set!
                      </li>
                    </ul>
                    
                    <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                      <p className='mx-3 text-slate-300'>
                        You are recommended to ping a Community Manager (or the Owner) to whitelist you.
                        We are not always online, but pinging ensures a quick response.
                      </p>
                    </section>
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Connecting To The Server</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        Add the following user as a friend on Xbox Live: <Badge variant={'outline'} className={'text-md'}>PlayEverthorn</Badge>
                      </li>
                      <li>
                        It will add you back, and then the server will appear on your friends tab in Minecraft!
                      </li>
                      <li className={'text-muted-foreground'}>
                        For PC players who want to use the traditional method, the IP is <b>play.everthorn.net</b>
                      </li>
                    </ul>
                    
                  </AccordionContent>
                </AccordionItem>
            
              </Accordion>
          
        </div>
      </section>
    )
}