import { Typography } from 'antd'

const { Title } = Typography

interface ITypoGraphy {
    value: string;
    level: 5 | 1 | 2 | 3 | 4 | undefined
}

const TypoGraphy = ({ value, level }: ITypoGraphy): ReactNode => {
    return (
        <Title level={level}>{value}</Title>
    )
}

export default TypoGraphy