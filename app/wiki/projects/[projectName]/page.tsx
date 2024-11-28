"use client";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator} from "@/components/ui/separator";
import { Icons } from "@/components/icons"

export default function ProjectPage(props: {params: Promise<{projectName: string}>}) {
  const params = use(props.params);
  return (
    <div
      className='max-w-8xl mx-auto flex w-full grow flex-col px-4 lg:px-8 xl:px-12'
    >
      <div className='hidden grid-cols-8 md:grid'>
        <div className='sticky top-20 col-span-3 self-start py-6 pl-6 pr-8 lg:pr-12'>
          <Button variant={'link'}><Icons.arrow_left size={18}/> <div className={'ms-2'}>Back to Projects</div></Button> <br/>
          <Badge variant={'outline'} className={'mx-1 mt-5'}> New Project!</Badge>
          <Badge variant={'outline'} className={'mx-1'}> Status: Ongoing</Badge>
          <h1>
            {params.projectName}
          </h1>

          <Separator className={'w-9/10 mx-auto mb-3 mt-12'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Project Lead:</p> <p>ProtocolPav</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Project Members:</p> <p>ProtocolPav, cakePhone, Jake</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Started On:</p> <p>21/04/2022</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Status:</p> <p>Ongoing</p>
          </div>

          <Separator className={'w-9/10 mx-auto my-3'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Project Type:</p> <p>Town</p>
          </div>
        </div>

        <div
          className='col-span-5 overflow-auto border-l pb-12 pl-8 pr-6 pt-8 lg:pl-12'
        >
          Balh Blah
          adsad
          dsadsa
          dsa
          dsadsadsafgr
          gregrtegre
          gregregre
          gregregre
          gregregre

        </div>
      </div>
    </div>
  )
}
