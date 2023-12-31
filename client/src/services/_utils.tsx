import { RcFile } from 'antd/es/upload'

export const prepareHeaders = (headers: any, { getState }: any): void => {
  const token = getState().auth.token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
