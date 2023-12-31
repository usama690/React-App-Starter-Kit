import { Input, InputProps } from 'antd'

const AppInput = ({ children, style, ...rest }: InputProps): ReactNode => {
  return (
    <Input style={style} {...rest}>
      {children}
    </Input>
  )
}

export default AppInput
