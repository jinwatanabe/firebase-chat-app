
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './lib/firebase'
import { SignIn } from './components/SignIn'
import { ChatRoom } from './components/ChatRoom'

function App() {

  const [ user ] = useAuthState(auth)

  return (
    <>
      <header></header>
      <section>
        { user ? <ChatRoom /> : <SignIn /> }
      </section>
    </>
  )
}

export default App
