export function NoPermission({ status }: { status: string }) {
  return (
    <div className="flex flex-col items-center w-full absolute top-1/2 -translate-y-1/2 p-10">
      <h1 className="text-2xl">Looks like you're {(status === "unauthenticated") ? status : "not a CM"} and you've stumbled upon some super secret area!</h1>
      <p>You really shouldn't be here. But if you think you should, check if you're logged in.</p>
    </div>
  )
}
