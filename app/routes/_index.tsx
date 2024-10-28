import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Mozz } from "~/components/Mozz"
import { trpc } from "~/lib/trpc"
import { createTrpcServer } from "~/server/trpc"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { AppSidebar } from "~/components/app-sidebar"
 

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

// For demo purpose
// Fetch data in the server loader
// and pass fetched data to the client query as initialData
// Remove it if you don't need to fetch data on the server
export const loader = async (ctx: LoaderFunctionArgs) => {
  const trpcServer = createTrpcServer(ctx.request)
  const message = await trpcServer.hello()
  return {
    message,
  }
}
export default function Index() {
  const data = useLoaderData<typeof loader>()
  const messageQuery = trpc.hello.useQuery(undefined, {
    initialData: data.message,
  })

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
      <Mozz />
      <div className="grid h-dvh place-items-center text-3xl">
        <div>Hello {messageQuery.data}</div>
      </div>
    </>
  )
}
