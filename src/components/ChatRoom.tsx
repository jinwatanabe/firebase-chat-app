import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, db } from '../lib/firebase'
import { collection, query, orderBy, limit, FirestoreDataConverter, DocumentData, addDoc,WithFieldValue, serverTimestamp } from 'firebase/firestore'
import { Message } from '../domain/Messge'
import { ChatMessage } from './ChatMessage'
import { useRef, useState } from 'react'

const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(message: WithFieldValue<Omit<Message, 'id'>>): DocumentData {
    return { ...message }
  },
  fromFirestore(snapshot, options): Message {
    const data = snapshot.data(options)!
    return { id: snapshot.id, text: data.text, createdAt: data.createdAt, uid: data.uid, photoURL: data.photoURL }
  }
}

export const ChatRoom = () => {
  const messagesRef = collection(db, 'messages').withConverter(messageConverter)
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25))
  const [messages] = useCollectionData<Message>(messagesQuery)
  const [formValue, setFormValue] = useState('')
  const dummy = useRef<HTMLInputElement>(null);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser!
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL: photoURL || ''
    } as WithFieldValue<Omit<Message, 'id'>>)

    setFormValue('')
    dummy.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div>
          { messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />) }
      </div>
      <form onSubmit={sendMessage}>
        <input onChange={(e) => setFormValue(e.target.value)} value={formValue} />
        <button type="submit">Send</button>
      </form>
    </>
  )
}
