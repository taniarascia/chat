import { Session } from './types'

// Helpers
export function getUniqueUsersOnlineByUsername(activeUserSessions: Session[]) {
  return [...new Set(activeUserSessions.map((userSession) => userSession.username))]
}
