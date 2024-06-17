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
            <Badge variant={'outline'}>Last Updated: April 2024</Badge>
          </span>
          <h1>
            <span>Community Manager Guidelines</span>
          </h1>
          <p style={{ "--max-width": "900px" } as React.CSSProperties}>
            Everything that's important for the CM's to function properly.
            <br/>
            <Link href={'/map/unmined.index.html'}>
              <Button variant={'secondary'} className={'mx-1 mt-5 h-auto'}>
                Community Manager Map. Helpful for viewing Project Coordinates without going into the world.
              </Button>
            </Link>
            <br/>
            <Link href={'https://learn.microsoft.com/en-us/minecraft/creator/commands/enums/item?view=minecraft-bedrock-stable'}>
              <Button variant={'secondary'} className={'mx-1 mt-5 h-auto'}>
                Quests: Item List
              </Button>
            </Link>
            <Link href={'https://learn.microsoft.com/en-us/minecraft/creator/commands/enums/entitytype?view=minecraft-bedrock-stable'}>
              <Button variant={'secondary'} className={'mx-1 mt-5 h-auto'}>
                Quests: Entity List
              </Button>
            </Link>

            <Link href={'https://r.3v.fi/discord-timestamps/'}>
              <Button variant={'secondary'} className={'mx-1 mt-5 h-auto'}>
                Discord Timestamps
              </Button>
            </Link>
          </p>
          
          <Separator className="my-5" />
          
          <Accordion type="single" collapsible className="w-full">
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
                          Send a kick command to the server.
                      </li>
                      
                      <li>
                        <Badge variant='command' className={'mx-1'}>/quests manage</Badge>
                          Manage the current quests board. Currently you can only Expire different quests.
                      </li>
                      
                      <li>
                        <Badge variant='command' className={'mx-1'}>/quests create</Badge>
                          Creates a new quest <b>immediately</b> and adds it to the quest board. The quest will be
                        set to expire in 7 days.
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
                      </li>
                      
                      <li>
                        <Badge variant='command' className={'mx-1'}>/whitelist view</Badge>
                         View the whitelist, seeing each member's name and their Gamertag that is entered in the whitelist.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
            
                <AccordionItem value="item-2">
                  <AccordionTrigger>New Recruit Procedures</AccordionTrigger>
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
                        They should have already read them during the interview, but ask just in case. Let them know to read
                        the sections marked <Badge variant={'attention'}>Must-Read</Badge> for sure.
                        If they have truly read the guidelines, they should know how to whitelist themselves.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Add to whitelist. </span>
                        Once they add their gamertag and are ready to play, you can add them to the server whitelist!
                      </li>
                      
                      <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                        <p className='mx-3 text-slate-300'>
                          Ask them if they would like to have a tour or not. Try to push them to have a tour, since the world
                          is large and they should get a good first impression. <b>Tours can be done by ANYONE, so long as they
                          have been a member on Everthorn for enough time.</b>
                        </p>
                      </section>
                      
                      <li>
                        <span className='font-bold text-attention2'>Inform about projects. </span>
                        Yes, they have read the guidelines twice, but believe it or not I've seen people forget
                        about the projects system entirely. Remind them constantly about projects, and guide them to the
                        guidelines if they have any more questions.
                      </li>
                      
                      <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                        <p className='mx-3 text-slate-300'>
                          They should either join someone else's project, take on an abandoned project, or create their own. <br/>
                          <b className={'text-yellow-400'}> KEEP TRACK of all New Recruits to ensure that they are indeed in a project. </b>
                          You keep track by checking up on them in DMs or in-game. <br/><br/>
                          This is probably the most important thing, getting people accustomed to our Projects System.
                        </p>
                      </section>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
            
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <span>
                      Projects
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
                    This is the foundation of Everthorn in this current world. Without Projects,
                    everything falls apart. It is our job to ensure that everything gets
                    followed correctly.
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Project Applications</span>
                    </h2>
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        Project applications come into the Project Applications thread.
                      </li>
                      <li>
                        <span className='font-bold text-attention2'>Deny</span> a project if:
                        <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                          <li>
                            The coordinates are missing or entered wrong. Coordinates must be a number,
                            and only have the - symbol in front of them and no other. (Some people may put the ~ symbol.
                            This breaks the system.)
                          </li>
                          
                          <li>
                            The project description is not enough. Descriptions should give a good
                            idea of what the project will be like, and also the size of it.
                          </li>
                          
                          <li>
                            The name of the project is bad. It should be something better than <i>x-'s Base</i>
                          </li>
                        </ul>
                        
                        <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                          <p className='mx-3 text-slate-300'>
                            When you Deny a project, ping the person and ask them to re-submit with corrections.
                            NEVER delete a Denied application.
                          </p>
                        </section>
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
                          <p className='mx-3 text-slate-300'>
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
                          <p className='mx-3 text-slate-300'>
                            You can't undo a project acceptance. So make sure everything is fine BEFORE accepting :)
                          </p>
                        </section>
                      </li>
                    </ul>
                  
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
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
                  
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
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
            
                <AccordionItem value="item-4">
                  <AccordionTrigger>Quests</AccordionTrigger>
                  <AccordionContent className="max-w-[800px] pl-2 pt-2 text-muted-foreground">
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
                      <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                        <p className='mx-3 text-slate-300'>
                          You must use minecraft item IDs for this.
                        </p>
                      </section>
                      <li>
                        <span className='font-bold text-attention2'>Time Limit: </span>
                        People have a time limit on the quest. The Time Limit only begins when they begin the quest, not
                        when they accept it.
                      </li>
                      <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                        <p className='mx-3 text-slate-300'>
                          Time limit is in EITHER m or h. So, 30m OR 1h OR 3h, etc.
                        </p>
                      </section>
                      <li>
                        <span className='font-bold text-attention2'>Location Limit: </span>
                        People must complete the quest in a specific location. There is a default radius of 100
                        blocks around the coordinates, which can be changed.
                      </li>
                      <section className={'mt-4 rounded-lg bg-slate-800 py-2'}>
                        <p className='mx-3 text-slate-300'>
                          Location must be input as a set of 3 coordinates separated by a space. So: 400,500,32<br/>
                          The radius must be a number. It is set at 100 as a default.
                        </p>
                      </section>
                    </ul>
                    
                    <h2 className="mt-5 text-lg font-extrabold text-primary">
                      <span>Limitations</span>
                    </h2>
                    Quests have many limitations currently. This is not an exhaustive list of all of the limiations and will be updated
                    as more are found.
                    <ul className="flex max-w-[800px] list-disc flex-col space-y-4 pl-8 pt-2">
                      <li>
                        <span className='font-bold text-attention2'>Location Limit is a circle </span>
                        The coordinates provided are the centre of it, and the radius is the distance around it.
                        Location limit ONLY checks the x and z axes, ignoring the y.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>Mainhand Limit checks item types. </span>
                        You can not say that "use a pickaxe with efficiency 5". You can only specify what pickaxe to use,
                        diamond, netherite, stone, etc.
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
                        <span className='font-bold text-attention2'>Objectives aren't specific. </span>
                        Objectives (e.g. minecraft:copper_ore) are not specific. They are wildcards. What does this mean?
                        If you set an objective to be minecraft:copper_ore, but somebody mines minecraft:deepslate_copper_ore,
                        then it will count towards the quest.<br/><br/>
                        In the same light, you can write the objective to be minecraft:oak, and anything that is mined that
                        has the word oak in it will count towards the quest.<br/><br/>
                        However, if you write minecraft:deepslate_copper_ore, and you mine minecraft:copper_ore, it will not count
                        since deepslate isnt part of the block mined.
                      </li>
                      
                      <li>
                        <span className='font-bold text-attention2'>This does NOT work with mainhand. </span>
                        What I just said above ONLY works for objectives, not for the Mainhand requirement.
                        With Mainhand, what you put IS specific. So if you put minecraft:pickaxe,
                        nobody will be able to complete the quest since such an item does not exist.
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
            
              </Accordion>
          
        </div>
      </section>
    )
}