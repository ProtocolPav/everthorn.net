"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site";
import { buttonVariants, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator} from "@/components/ui/separator";
import { Icons } from "@/components/icons"

export default function ProjectPage( {params,}: {params: {projectName: string}}) {
  return (
    <div
      className='max-w-8xl mx-auto px-4 lg:px-8 xl:px-12 w-full flex flex-col flex-grow'
    >
      <div className='hidden md:grid grid-cols-8'>
        <div className='sticky top-20 self-start col-span-3 pr-8 lg:pr-12 py-6 pl-6'>
          <Badge variant={'outline'} className={'mx-1'}> New Project!</Badge>
          <Badge variant={'outline'} className={'mx-1'}> Status: Ongoing</Badge>
          <h1 className={'text-5xl font-extrabold mt-3'}>
            {params.projectName}
          </h1>
          
          <Separator className={'w-9/10 mt-12 mb-3 mx-auto'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Project Lead:</p> <p>ProtocolPav</p>
          </div>
          
          <Separator className={'w-9/10 mt-3 mb-3 mx-auto'} />
          <div className={'flex grid-cols-2 justify-between'}>
            <p>Started On:</p> <p>21/04/2022</p>
          </div>
        </div>
        
        <div
          className='col-span-5 border-l overflow-auto pt-8 pb-12 pl-8 lg:pl-12 pr-6'
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