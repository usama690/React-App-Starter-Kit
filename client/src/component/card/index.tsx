import { Card } from 'antd'

interface ICard {
    data: {
        title: string
        desc: string
        imgSrc: string
        price: string
    }
}

const { Meta } = Card

const AppCard = ({ data }: ICard): any => (
    <Card
        style={{ width: 300 }}
        bordered={false}
        hoverable
        cover={<img alt="example" src={data.imgSrc} />}
    >
        <Meta title={data.title} description={data.desc} />
        <p>Price: {data.price} </p>
    </Card>
)

export default AppCard
