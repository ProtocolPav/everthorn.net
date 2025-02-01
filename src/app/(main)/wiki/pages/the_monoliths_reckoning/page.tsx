"use client";
import { Separator} from "@/components/ui/separator";

export default function LorePage() {
  return (
    <div
      className='max-w-8xl mx-auto flex w-full grow flex-col px-4 lg:px-8 xl:px-12'
    >
      <div className='grid-cols-8 md:grid'>
        <div className='top-20 col-span-3 self-start py-6 pl-6 pr-8 md:sticky lg:pr-12'>
          <h1>
            The Monolith's Reckoning
          </h1>

          <Separator className={'w-9/10 mx-auto mb-3 mt-12'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Our very first Quest Storyline</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Quests so far:</p> <p>1</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Started On:</p> <p>24/11/2024</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Status:</p> <p>Ongoing</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Major World Changes:</p> <p>None</p>
          </div>
        </div>

        <div className='col-span-5 overflow-auto pb-12 pl-8 pr-6 pt-8 md:border-l lg:pl-12'>
          <h2>Backstory</h2>
          <p>
            Before we begin with the current storyline, we've got to take a look at
            our past. Where did this all begin? Let's see.
          </p>
          <h3 className='mt-4'>World 1</h3>
          <p>
            During the First World, some miners stumble across a mysterious green gem. It is
            the largest gem they've ever seen, spanning possibly 20 blocks in height alone. In hopes
            of making money, they try to dig it out as fast as possible. Unfortunately, one
            of them slipped and hit the gem. They thought nothing of it.
          </p>
          <p>
            At the same time, on the surface, a great storm approached. It had green lightning, high speed winds,
            and ultimately, people who were whisked away by those winds were never seen again.
          </p>
          <p>
            That gem was <b className='text-green-400'>The Anomaly</b>. And it was awakened.
          </p>
          <h3 className='mt-4'>World 2</h3>
          <p>
            The people built anew. But weirdly enough, many reports said that in the blink of an eye,
            their sons, friends, parents all disappeared.
            One by one, this world grew abandoned until the last people disappeared.
          </p>
          <h3 className='mt-4'>World 3</h3>
          <p>
            But they appeared in a new world.
            One that had history. Kingdoms which were there for centuries.
            It was time for them to learn to live in this strange new place and conform to strange new rules.
            Ruthless kings, peaceful emperors. They learnt to survive. Until the Anomaly was discovered.
          </p>
          <p>
            In a cave under spawn, there existed a village of people who worshipped the crystal,
            not knowing what they were getting themselves into.
            A scientist found it, and began experiments on it.
            Slowly, it began to glitch. As it usually did. The world began to rift.
            Almost merging with another.
            Until one day the scientist’s experiment went wrong and the Anomaly <i>Exploded...</i>
          </p>
          <h3 className='mt-4'>World 4 - Present Day</h3>
          <p>
            <b className='text-yellow-300'>The Conjunction</b> happened. The Anomaly controls worlds.
            All of its worlds combined into one, and the Anomaly itself disappeared.
            Destroyed by its own explosion. Remnants can be found of the old worlds, scattered
            around as relics of the past.
          </p>
          <p>
            This world is dangerous though, many environments clashing together makes it toxic to the people.
            <b className='text-purple-300'>The Monolith</b>, luckily, exists at the centre of it all, protecting all those who are within its borders.
          </p>

          <h2 className='mt-4'>Quests</h2>

        </div>
      </div>
    </div>
  )
}
