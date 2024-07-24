import { login } from "../lib/auth"

export const SignIn = () => {
  return (
    <button onClick={login}>Sign in with Google</button>
  )
}
