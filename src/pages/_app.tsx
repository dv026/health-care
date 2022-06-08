import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

import Layout from "./layout"
import { publicRoutes } from "../routes/public.routes"
import { AuthGuard } from "../components/auth"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {publicRoutes.includes(Component.name) ? (
        <Component {...pageProps} />
      ) : (
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthGuard>
      )}
    </SessionProvider>
  )
}

export default MyApp
