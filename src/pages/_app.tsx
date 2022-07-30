import type { AppProps } from "next/app"

import { publicRoutes } from "../routes/public.routes"
import { AuthGuard } from "../utils/auth-guard"
import Layout from "./layout"
import "./style.scss"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      {publicRoutes.includes(Component.name) ? (
        <Component {...pageProps} />
      ) : (
        <AuthGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthGuard>
      )}
    </>
  )
}

export default MyApp
