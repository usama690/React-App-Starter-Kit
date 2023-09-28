export const prepareHeaders = (headers: any, { getState }: any) => {
  const token = getState().auth.token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

export const validatePassword = (
  _: any,
  value: string,
  callback: (value?: string) => void
): void => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{10,}$/
  if (value && !passwordRegex.test(value)) {
    callback(
      'Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and be 10 characters long'
    )
  } else {
    callback()
  }
}
