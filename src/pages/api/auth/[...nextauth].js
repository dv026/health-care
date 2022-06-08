import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const isEmptyObj = (obj) => {
  return (JSON.stringify(obj) === '{}')
}

export default NextAuth({
  pages: {
    signIn: "/login",
    // signOut: '/login'
  },
  // secret: "test",
  session: {
    // указываем, где хранить сессию
    // если jwt - то вся инфа хранится в зашифрованном виде в сессии
    // если хотим сессию хранить в базе данных
    // то database - тогда в сессии хранится только айдишник сессии
    // для ее поиска в дб
    strategy: "jwt",
    // время жизни сессии
    maxAge: 30 * 24 * 60 * 60
  },
  jwt: {
    // время жизни токена
    maxAge: 2
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const response = await axios.post(process.env.AUTH_SERVICE_BASE_URL + '/login', {
          email: credentials.email,
          password: credentials.password
        })


        if (!isEmptyObj(response.data)) {
          // Any object returned will be saved in `user` property of the JWT
          return response.data
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          console.log('user is not here !!!!')
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (isEmptyObj(user)) {
        return false
      }
      return true
    },
    async jwt(props) {
      console.log('jwt callback', props.user)
      if (props.user) {
      const response = await axios.post('http://localhost:3000/api/token/generate', { user: props.user })
      // console.log('response api', response.data)
      return {
        ...response.data
      }
    }
    
      // if account exists, this callback runs for the first time
      // if (account) {
        // token.dima = 'liza'
      // }
      // console.log('JWT !!!!!!!!!!!!!!!!!', token)
      // if (account && user) {
      //   return {
      //     ...token,
      //     accessToken: user.data.token,
      //     refreshToken: user.data.refreshToken,
      //   };
      return props.token
      }
  }
})