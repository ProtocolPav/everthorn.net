import Hero from "./_sections/hero";
import Feature from "./_sections/feature";
import History from "./_sections/history";


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
            {/*  <p>*/}
            {/*    Support the server by becoming a <b className={'text-attention2'}>Patron!</b> <br /> Donating helps keep*/}
            {/*    Everthorn running, and also provides Thorny with dinner every night.*/}
            {/*  </p>*/}
            {/*  <Link href={'/support'} target={'_blank'}>*/}
            {/*    <Button className={'mt-4 justify-between'} variant={'patreon'} size={'lg'}>*/}
            {/*      <PatreonLogo className={'size-6'} weight={'fill'} /> <div className='ms-2'>Feed Thorny </div>*/}
            {/*    </Button>*/}
            {/*  </Link>*/}
            {/*</section>*/}

        </section>
    )
}