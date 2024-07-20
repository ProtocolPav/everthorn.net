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
import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"


export default function CMGuidelines() {
  return (
      <section className="container grid gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          
          <span>
            <Badge variant={'outline'}>Last Updated: July 2024</Badge>
          </span>
          <h1>
            <span>Community Manager Guidelines</span>
          </h1>
          <p style={{ "--max-width": "900px" } as React.CSSProperties}>
            Everything that's important for the CM's to function properly.
            <br/>
            <Link href={'/map/unmined.index.html'}>
              <Button variant={'secondary'} className={'mx-1 mt-5 h-auto'}>
                Community Manager Map
              </Button>
            </Link>

            <Link href={'https://r.3v.fi/discord-timestamps/'}>
              <Button variant={'secondary'} className={'mx-1 mt-5 h-auto'}>
                Discord Timestamps
              </Button>
            </Link>

            <Link href={'/quests/new'}>
              <Button variant={'secondary'} className={'mx-1 mt-5 h-auto'}>
                Quest Creator
              </Button>
            </Link>
          </p>
          
          <Separator className="my-5" />
          
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-5">
              <AccordionTrigger><span>General Duties <Badge variant={'attention'}>Must-Read</Badge></span></AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following is everything that <b>ALL</b> CMs should be doing and looking out for.
                  </div>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be fair and respectful. </span>
                    No matter who it is, or what they did, always be fair and respectful when speaking with them.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be active and participate. </span>
                    You should be in the loop of what's going on. <br/> Constantly asking questions like "who is this" or "what's this" are unacceptable
                    and show that you have not been paying attention to the server.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Answer ASAP. </span>
                    If somebody has a question or an issue, try to answer as soon as you see it, 
                    and make sure that when you <i>can</i> be available, that you <i>actually are!</i>
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Regularly check on projects. </span>
                    All projects, new and old should be connected to the <b>ROAD NETWORK!!!</b>
                  </li>

                  <li>
                    <span className='font-bold text-attention2'>Communicate. </span>
                    If something happens on the server, communicate so we are all in the same loop.
                    Best place to communicate is via the <Badge variant='command' className={'mx-1'}>#announcements</Badge> channel.
                  </li>

                  <li>
                    <span className='font-bold text-attention2'>Have regular meetings, </span>
                    or if you can't meet live, post regularly about your specific role and what's going on.
                  </li>

                  <li>
                    <span className='font-bold text-yellow-400'>What to do in case of a glitch/grief/corruption: </span>
                    <br/> If somebody reports dying by a glitch, or reports corruption or griefing, you must follow this procedure.
                  </li>

                  <ul className='flex max-w-[800px] list-decimal flex-col pl-8 space-y-1'>
                    <li>
                      <span className='font-bold text-attention2'>Stop the server immediately. </span>
                      9 times out of 10, we will have to rollback. Stopping the server prevents people from making progress that 
                      will be lost.
                    </li>

                    <li>
                      <span className='font-bold text-attention2'>Inform Ezio. </span>
                      Ezio will have to investigate further and decide whether a rollback is necessary, and perform one.
                    </li>

                    <li>
                      <span className='font-bold text-attention2'>Inform the discord. </span>
                      You do not have to ping, just send an announcement that the server is down for xyz reasons.
                    </li>
                  </ul>

                  <li>
                    <span className='font-bold text-yellow-400'>Minecraft Update Policy: </span>
                  </li>

                  <ul className='flex max-w-[800px] list-disc flex-col pl-8 space-y-1'>
                    <li>
                      <span className='font-bold text-attention2'>Updates happen automatically. </span>
                      Each time the server starts, it checks and applies any updates that are released by Mojang.
                      The server is also set to auto-restart once every 3 days, so sometimes you may not have to do anything.
                    </li>

                    <li>
                      <span className='font-bold text-attention2'>Wait 1 hour before manually updating. </span>
                      You can always update by restarting the server, but wait 1-2 hours after an update releases.
                      Mojang will not always release the update to <b>EVERYONE</b> immediately.
                    </li>

                    <li>
                      <span className='font-extrabold text-attention2 text-lg'>INFORM EZIO!!! </span>
                      Perhaps the most important thing. DO NOT update if Ezio isn't available. He needs to check
                      and update Amethyst if necessary. If Amethyst is not updated, our services like Chat-Link and
                      Player Logs break!
                    </li>

                    <li>
                      <span className='font-extrabold text-attention2'>Stop the server. </span>
                      Test by joining the server. If you receive a welcome message, Amethyst works. Otherwise,
                      it is broken. <b>STOP THE SERVER IF AMETHYST IS BROKEN</b>
                    </li>

                  </ul>
                  
                </ul>
              </AccordionContent>
            </AccordionItem>
        
            <AccordionItem value="item-2">
              <AccordionTrigger><span>New Recruit Procedures <Badge variant={'attention'}>Must-Read</Badge></span></AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-decimal flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following is the entire procedure that must be followed for every
                    new recruit.
                  </div>
                  
                  <li>
                    <span className='font-bold text-attention2'>Give a warm welcome. </span>
                    When a new recruit first joins the discord, they must be welcomed by everyone. Make them feel
                    special.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Ask to read the Guidelines. </span>
                    They should have already read them during the interview, but ask just in case. The 
                    sections marked <Badge variant={'attention'}>Must-Read</Badge> should be read 100%.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Add to whitelist. </span>
                    Once they add their gamertag and are ready to play, you can add them to the server whitelist!
                  </li>
                  
                  <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                    <p className='mx-3 text-slate-300 text-sm my-0'>
                      Set up a tour for them. <b className={'text-yellow-400'}>Tours can be done by ANYONE, so long as they
                      have been a member on Everthorn for enough time.</b> However, you are still responsible for setting one up.
                    </p>
                  </section>
                  
                  <li>
                    <span className='font-bold text-attention2'>Inform about projects. </span>
                    Yes, they have read the guidelines twice, but believe it or not I've seen people forget
                    about the projects system entirely. Remind them constantly about projects, and guide them to the
                    guidelines if they have any more questions.
                  </li>
                  
                  <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                    <p className='mx-3 text-slate-300 text-sm my-0'>
                      A New Recruit must be part of a project. Either their own, or someone elses. <br/>
                      <b className={'text-yellow-400'}> It is YOUR JOB to keep track of all New Recruits to ensure that they are indeed in a project. </b>
                      <br/><br/>
                      This is probably the most important thing, getting people accustomed to our Projects System.
                    </p>
                  </section>
                </ul>
              </AccordionContent>
            </AccordionItem>
        
            <AccordionItem value="item-3">
              <AccordionTrigger><span>Projects</span></AccordionTrigger>
              <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
                This is the foundation of Everthorn in this current world. Without Projects,
                everything falls apart. It is our job to ensure that everything gets
                followed correctly.
                
                <h2 className="mt-5 text-xl font-extrabold text-primary">
                  <span>Applications</span>
                </h2>
                <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                  <li>
                    Project applications come into the Project Applications thread.
                  </li>
                  <li>
                    <span className='font-bold text-attention2'>Deny</span> a project if:
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      
                      <li>
                        Currently, denying a project has been removed for technical reasons. 
                        If corrections are needed, ask Ezio/Pav to enter them manually.
                      </li>
                    </ul>
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Wait-list</span> a project if:
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        The project seems too large for one person to complete
                      </li>
                      
                      <li>
                        The coordinates are too close to someone else's project. You must ask that
                        project if they are fine with a new project popping up near them.
                      </li>
                      
                      <li>
                        If you are generally unsure of the project. Better to discuss with other CMs
                        rather than accepting. You can't undo an acceptance.
                      </li>
                    </ul>
                    
                    <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                      <p className='mx-3 text-slate-300 text-sm my-0 text-yellow-400 font-bold'>
                        The Wait List is essentially informing other CM's that this project needs some
                        discussion before we accept it.
                      </p>
                    </section>
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Accept</span> a project if:
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        Everything seems fine!
                      </li>
                      
                      <li>
                        You have talked with other CMs about it.
                      </li>
                    </ul>
                    
                    <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                      <p className='mx-3 text-slate-300 text-sm my-0'>
                        You can't undo a project acceptance. So make sure everything is fine BEFORE accepting :)
                      </p>
                    </section>
                  </li>
                </ul>
              
                <h2 className="mt-5 text-xl font-extrabold text-primary">
                  <span>Roads</span>
                </h2>
                <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                  <li>
                    All projects must be connected to the roads system. Check up regularly on new projects
                    to ensure they have roads connecting to them.
                  </li>
                  <li>
                    Remind new project leads to connect their project to the roads. Let them know that this is
                    highly important. If they do not prioritize it then you must start giving daily reminders.
                  </li>
                </ul>
              
                <h2 className="mt-5 text-xl font-extrabold text-primary">
                  <span>Large Projects</span>
                </h2>
                <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                  <li>
                    We generally do NOT accept large-scale projects anymore. We have
                    too many of them that have not been completed. This means, large scale projects
                    will be in the waiting list until others are completed.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span>
                  Commands
                </span>
              </AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following are a list of all the commands you may need to use and their functions.
                    Every command has some parameters, such as "id" which discord will automatically ask you to fill in.
                    Thus, the parameters will NOT be explained here, only the function of each command.
                  </div>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/stop</Badge>
                    <Badge variant='command' className={'mx-1'}>/start</Badge>
                      Starts and stops the server. Wait at least 2 seconds after stopping to start again.
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/send message</Badge>
                      Schedules a message to be sent to the server. Messages get sent every 2 hours.
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/send announcement</Badge>
                      Sends a one-time announcement to the server. Announcements display <b>above</b> the inventory, and
                    play a sound for people.
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/send boot</Badge>
                      Kick somebody from the server.
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/balance edit</Badge>
                      Edit someone's nugs balance. If you put a negative number, this decreases their balance.
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/gulag</Badge>
                      Send someone to the discord gulag. It will disable their permissions to view anything except the gulag.
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/whitelist add</Badge>
                      Add a user to the whitelist. <b>Note: The user must have already entered their gamertag using
                    the profile.</b>
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/whitelist remove</Badge>
                      Remove someone from the whitelist. 
                      <span className="font-bold text-yellow-400"> Currently, this command half-works. 
                        It will remove the user from the whitelist, but will not update it on Thorny.
                        Thus, you cannot re-whitelist the person. Ezio must manually update the NexusCore whitelist.
                      </span>
                  </li>
                  
                  <li>
                    <Badge variant='command' className={'mx-1'}>/whitelist view</Badge>
                      View the whitelist, seeing each member's name and their Gamertag that is entered in the whitelist.
                      <span className="font-bold text-yellow-400"> Doesn't work for now.</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
        
            <AccordionItem value="item-4">
              <AccordionTrigger>Quests</AccordionTrigger>
              <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
                <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                  <p className='mx-3 text-slate-300 text-sm my-0 text-yellow-400 font-bold'>
                    Please note this section will be going away soon most likely as it is not as needed anymore!
                  </p>
                </section>

                This section covers everything you need to know about Quests from the CM side of things.
                <h2 className="mt-5 text-lg font-extrabold text-primary">
                  <span>Quest Types</span>
                </h2>
                <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                  <li>
                    We only have 2 types of quests: <b>kill</b> and <b>mine</b>
                  </li>
                  <li>
                    This means all quests MUST be designed around these in mind.
                    No gather item quest or building quests.
                  </li>
                  <li>
                    A quest should always have a type, amount and objective.
                    Something like: <b>kill 3 minecraft:skeleton</b>
                  </li>
                </ul>
                
                <h2 className="mt-5 text-lg font-extrabold text-primary">
                  <span>Extra Customization</span>
                </h2>
                <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                  <li>
                    We have some extra options to customize quests and make them more interesting.
                  </li>
                  <li>
                    These customizations are designed to be combined and to create a fun, interesting quest.
                    You should be creative and think of ways that can use these customizations and limitations
                    to our advantage.
                  </li>
                  <li>
                    <span className='font-bold text-attention2'>Mainhand Limit: </span>
                    People must complete this quest while holding a specific item. E.g. Mine using a diamond pickaxe.
                  </li>
                  <li>
                    <span className='font-bold text-attention2'>Time Limit: </span>
                    People have a time limit on the quest. The Time Limit only begins when they begin the quest, not
                    when they accept it.
                  </li>
                  <li>
                    <span className='font-bold text-attention2'>Location Limit: </span>
                    People must complete the quest in a specific location. There is a default radius of 100
                    blocks around the coordinates, which can be changed.
                  </li>
                </ul>
                
                <h2 className="mt-5 text-lg font-extrabold text-primary">
                  <span>Limitations</span>
                </h2>
                Quests have many limitations currently. This is not an exhaustive list of all of the limiations and will be updated
                as more are found.
                <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                  <li>
                    <span className='font-bold text-attention2'>Location Limit doesn't check y-axis </span>
                    Location limit ONLY checks the x and z axes, ignoring the y.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Mainhand Limit won't check for specific items </span>
                    You can't say "use a pickaxe with efficiency 5". You can only specify what pickaxe to use,
                    diamond, netherite, stone, etc. Likewise, you can't specify item names like "use a specific stick named Excalibur"
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Blocks mined must be natural. </span>
                    Quests will not count progress if the block mined is placed down and mined. HOWEVER, since we do not
                    have logs from before March 2024, any blocks placed before that will count towards quest progress.
                    People generally shouldn't know that though.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>We cannot summon mobs via quests. </span>
                    For killing quests, we cannot summon mobs. If you want to summon mobs, use in-game commands
                    at a specific location, or a monster spawner at a specific location.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Objectives are specific </span>
                    In the new Quests, Objectives are specific. Meaning, if you say "mine minecraft:log", this will not
                    work anymore. You must specify specific blocks like "minecraft:oak_log".
                  </li>

                  <li>
                    <span className='font-bold text-attention2'>Multi-objectives and rewards haven't been added yet </span>
                    While the system supports them, the Quest Creator must be updated to allow you to create these quests.
                    Time will tell.
                  </li>
                  
                </ul>
                
                <h2 className="mt-5 text-lg font-extrabold text-primary">
                  <span>Rewards</span>
                </h2>
                Quests can have one of two rewards available.
                <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                  <li>
                    <span className='font-bold text-attention2'>Nugs Reward. </span>
                    You must enter the amount of nugs that will be awarded on completion of the quest.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Items Reward. </span>
                    You must enter the minecraft ID of the item, and an amount. The default is 1.<br/>
                    You cannot give enchanted or named items, nor can you give variants (e.g. Sharpness 5 book)
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger><span>Event Manager Duties</span></AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following is the responsibilities of the Events Manager
                  </div>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be creative. </span>
                    Think of new creative events, never done before. Each month should be something
                    fun for people. Not necessarily big.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be perceptive. </span>
                    See how events perform. Is there a lot of participation? Why? Are people enjoying it? Why?
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Lead team discussion. </span>
                    You're responsible for making sure that other Community Managers are giving their
                    input. Listen to their input and adjust accordingly! We are still a team.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Deliver Rewards. </span>
                    You're responsible for delivering people their rewards. Easiest way is via spawn and labeling chests.
                  </li>
                  
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger><span>Recruits Manager Duties</span></AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following is the responsibilities of the Recruits Manager
                  </div>
                  
                  <li>
                    <span className='font-bold text-attention2'>Check in regularly. </span>
                    You're their clingy girlfriend! Never stop asking them about how they're doing! 
                    Are you enjoying the server? Have you built a road to your project? What you working on?
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Keep track and report. </span>
                    You're our eyes and ears. Report to us what the newbies are up to. Did they get diamond gear within a week? 
                    Are they building a beautiful house? Are they acting sus? Tell us.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Remind about rules. </span>
                    You're their personal guidebook. Remind them that they should apply for projects using the command,
                    remind them about roads, remind them that they can always join somebody else's projects. Remind. Remind. Remind!
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Make posts. </span>
                    We recruit 5-7 people every 6 months. Make posts, do interviews, and have the team decide who to accept
                    or reject. Always discuss the best time to make posts and what to include in them.
                  </li>
                  
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger><span>Quests Manager Duties</span></AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following is the responsibilities of the Quests Manager
                  </div>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be creative. </span>
                    Think of creative quests. Things that push the boundaries. Quests should be
                    constantly innovating and creating something intriguing for people.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be perceptive. </span>
                    See how quests perform. Is there a lot of participation? Why? Are people enjoying it? Why?
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Lead team discussion. </span>
                    You're responsible for making sure that other Community Managers are giving their
                    input. Listen to their input and adjust accordingly! We are still a team.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Deliver Nugs Rewards. </span>
                    Quests don't give out nugs automatically. When somebody asks you to give them their nugs, do it!
                  </li>
                  
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger><span>Technical Manager Duties</span></AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following is the responsibilities of the Technical Manager
                  </div>
                  
                  <li>
                    <span className='font-bold text-attention2'>Regular checkups. </span>
                    Go into the logs and look through them for any errors that may happen, and report!
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be active. </span>
                    You are in charge of restoring backups, and of making sure that the server is running smoothly on the 
                    technical side. Be active and make sure you deal with the issues ASAP!
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Check for updates. </span>
                    Make sure that you are up-to-date on minecraft updates, and that Amethyst is working as needed.
                  </li>
                  
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger><span>Market Manager Duties</span></AccordionTrigger>
              <AccordionContent className={'text-muted-foreground'}>
                <ul className='flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2'>
                  <div>
                    The following is the responsibilities of the Market Manager
                  </div>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be creative. </span>
                    Think of new creative markets. Each month should be something interesting. Work together
                    with other CMs to come up with the best prices/items to sell each month.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Be perceptive. </span>
                    See how the market performs. Why was this item sold more? Why not? 
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Lead team discussion. </span>
                    You're responsible for making sure that other Community Managers are giving their
                    input. Listen to their input and adjust accordingly! We are still a team.
                  </li>
                  
                  <li>
                    <span className='font-bold text-attention2'>Deliver Rewards. </span>
                    You're responsible for delivering people their rewards.
                    Collect diamonds from them as well, and deliver the reward in the same chest as the diamonds.
                    If somebody bought something with Nugs, then deliver their item in a chest at spawn.
                  </li>
                  
                </ul>
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
          
        </div>
      </section>
    )
}