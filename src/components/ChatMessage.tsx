import { Message } from "../domain/Messge"
import { auth } from "../lib/firebase"

type Props = {
    message: Message
}
export const ChatMessage = (props: Props) => {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}
