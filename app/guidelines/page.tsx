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
            <Badge variant={'outline'}>Last Updated: July 2024</Badge>
          </span>
          <h1>
            <span>Guidelines</span>
          </h1>
          <p>
            The Guidelines include all of our rules, different concepts such as
            'Projects' and 'Quests', as well as how to connect to the server on all devices!
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
                        <span className='font-bold text-attention2'>Don't grief, steal or hack/glitch the game in any way. We are a community built on trust. </span>
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
                        This means you can't just build a cobblestone box, you must actually decorate it. Make it into a “factory” building, get creative!
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>No tall or floating farms. </span>
                        These types of farms can affect the view of other projects,
                        and we do not want to deter people from building somewhere
                        simply because there is a large pillar in the sky that they don't like.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Farms should be turned off. </span>
                        If you go offline, switch off your farms. It reduces lag.
                      </li>

                      <li>
                        <span className='font-bold text-attention2'>Don't build hate symbols </span>
                        Pretty obvious why. Regardless if it's for a prank or not.
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
                        Self explanatory. It is up to each CM's discretion as to what falls under NSFW.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Alt accounts aren't allowed. </span>
                        We're happy enough with one of you :)
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
                    as well as provide a way to share progress easily. What's great is they're
                    really simple to work with.
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Applying For A Project</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        <span className='font-bold text-attention2'>All projects must be applied for. </span>
                        This is so we can have them in the system
                        to be able to create Discord Threads, Wiki pages and add your project to the World Map!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>Applying is simple. </span>
                        You run the <Badge variant='command'>/project apply</Badge> command on discord.
                        The command will then guide you to filling in all the fields: The coordinates, description, name, etc.
                      </li>
                    </ul>
                    <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                      <p className='mx-3 text-slate-300 text-sm my-0'>
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
                        <span className='font-bold text-attention2'>You will get a discord thread. </span>
                        There, you can send regular progress updates and ask for others' opinions on your project.
                        You will also receive a page on the wiki that you can update with lore and progress updates!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>We encourage COLLABORATION. </span>
                        Help others with their projects and get them finished quicker!
                      </li>
                    </ul>
                  
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Roads</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        <span className='font-bold text-attention2'>Roads connect our world together. </span>
                        You can start at any project and get to any other project via our interconnected road system!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>All projects must be connected. </span>
                        It can be as simple as a default shovel path, or as beautifully decorated as you want,
                        but please make sure that a road exists.
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
                        <span className='font-bold text-attention2'>Everthorn hosts a different event each month. </span>
                        These events range from something massive like a boss fight, 
                        to something fun like a scavenger hunt or a build battle.
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>Prizes are available for everyone, </span>
                        so make sure you participate in them!
                      </li>
                    </ul>
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Quests</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        <span className='font-bold text-attention2'>Quests let you challenge yourself. </span>
                        All while earning rewards, ranging from Nugs to in-game items!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>Quests refresh weekly. </span>
                        You can always try your hand at something new. Many weeks, we also have continuations of
                        mini storylines as well!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>You can have 1 quest active at a time. </span>
                        Choose your quests wisely! The Quest Board will expire after a week, so try to do all of them!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>Viewing quests is easy. </span>
                        Run <Badge variant='command'>/quests view</Badge> on discord.
                        This will show all available quests, or your currently active quest.
                      </li>
                    </ul>
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Monthly Market</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        <span className='font-bold text-attention2'>The Monthly Market lets you get stuff easier. </span>
                        It's our version of the "Admin Shop", and refreshes monthly!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>The Monthly Market is thematic. </span>
                        Every month there is a different theme around the items, such as "underwater", "shiny blocks", etc.
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>Items are limited! </span>
                        As people purchase more, stock runs out! If you need something, buy it NOW!
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>Buying is simple. </span>
                        Send a message in the thread, along with the location of your diamonds. If you buy something with
                        nugs, you can directly pay the server.
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
                    Our server runs on Amethyst, a server software developed specifically for Everthorn. This of course
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
                      <p className='mx-3 text-slate-300 my-0 text-sm'>
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

                    <section className={'mt-4 rounded-lg bg-yellow-800 py-2'}>
                      <p className='mx-3 text-slate-300 my-0 text-lg font-extrabold'>
                        IF YOU PLAY ON PS4/5 PLEASE READ THIS!!!
                      </p>
                      <p className='mx-3 text-slate-300 my-0 text-lg mt-2'>
                        To get you whitelisted, the process is the same, however
                        after a Community Manager whitelists you, they will ask you to
                        change your gamertag again, you must set this one to your PSN, whereas
                        the first gamertag should be your Microsoft one.
                      </p>
                      <p className='mx-3 text-slate-300 my-0 text-lg mt-2'>
                        This is important because our systems will not work properly otherwise.
                      </p>
                    </section>
                    
                  </AccordionContent>
                </AccordionItem>
            
              </Accordion>
          
        </div>
      </section>
    )
}