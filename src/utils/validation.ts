export const validateCredentials = (username: string, password: string) => {
  if (!username || !password) return false
  return true
}