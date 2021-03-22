import React, { useMemo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'

import { Nav } from 'components/Nav'
import { Sidebar } from 'components/Sidebar'
import { ChatArea } from 'components/ChatArea'
import { sendMessage, getMessages } from 'store/messages.slice'
import { logout } from 'store/auth.slice'
import { getUsers } from 'store/users.slice'
import { RootState, Message } from 'utilities/types'

export const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const [messageInput, setMessageInput] = useState('')

  const { currentUser } = useSelector((state: RootState) => state.authState)
  const { users, loading: usersLoading, onlineUsersByUsername } = useSelector(
    (state: RootState) => state.usersState
  )
  const { messages, loading: messagesLoading } = useSelector(
    (state: RootState) => state.messagesState
  )

  const handleLogoutClick = (event: any) => {
    // Log out session
    localStorage.removeItem('user')

    dispatch(logout())
  }

  const handleSubmitForm = (event: any) => {
    event.preventDefault()

    if (messageInput && messageInput.trim() !== '') {
      const message: Message = {
        content: messageInput.trim(),
        date: dayjs().format(),
        author: currentUser!.username,
      }

      dispatch(sendMessage(message))
    }

    setMessageInput('')
  }

  const handleChangeInput = (event: any) => {
    setMessageInput(event.target.value)
  }

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getMessages())
  }, [dispatch])

  // Add green dot for online users
  const usersWithOnlineData = useMemo(() => {
    if (users.length < 1) {
      return []
    }

    return users
      .map((user) => ({
        ...user,
        online: onlineUsersByUsername.some((onlineUsername) => onlineUsername === user.username),
      }))
      .sort((a, b) => a.username.localeCompare(b.username))
  }, [users, onlineUsersByUsername])

  // Add green dot for online users
  const reversedMessages = useMemo(() => {
    if (messages.length < 1) {
      return []
    }

    return [...messages].reverse()
  }, [messages])

  if (messagesLoading || usersLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>
  }

  return (
    <>
      <Nav onClick={handleLogoutClick} />
      <div className="flex m-0 content">
        <Sidebar users={usersWithOnlineData} currentUser={currentUser} />
        <ChatArea
          messages={reversedMessages}
          messageInput={messageInput}
          handleSubmitForm={handleSubmitForm}
          handleChangeInput={handleChangeInput}
        />
      </div>
    </>
  )
}
