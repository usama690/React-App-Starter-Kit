import { Col, Row } from 'antd'
import { useState } from 'react'
import AppCard from '../../../component/card'
import { Wrapper } from './styles'
import Button from '../../../component/button'

interface ICard {
    title: string
    desc: string
    imgSrc: string
    price: string
}

const Products = (): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(6)
    const [totalCards, setTotalCards] = useState<number>(20)

    const [cards, setCards] = useState<ICard[]>(
        Array.from({ length: totalCards }).map((_, index) => ({
            title: `Card ${index + 1}`,
            desc: `Description for Card ${index + 1}`,
            imgSrc:
                'https://thesailsmen.pk/wp-content/uploads/2023/01/15.1.webp',
            price: `$${Math.floor(Math.random() * 100) + 10}`,
        }))
    )

    const loadMore = (): void => {
        setCurrentPage(currentPage + 1)
        setCards((prevCards) => [
            ...prevCards,
            ...Array.from({ length: pageSize }).map((_, index) => ({
                title: `Card ${totalCards + index + 1}`,
                desc: `Description for Card ${totalCards + index + 1}`,
                imgSrc:
                    'https://thesailsmen.pk/wp-content/uploads/2023/01/15.1.webp',
                price: `$${Math.floor(Math.random() * 100) + 10}`,
            })),
        ])
        setTotalCards(totalCards + pageSize)
    }

    return (
        <Wrapper>
            <div>
                <Row gutter={16}>
                    {cards.slice(0, currentPage * pageSize).map((card, index) => (
                        <Col key={index} span={5} style={{ marginBottom: '1rem' }}>
                            <AppCard data={card} />
                        </Col>
                    ))}
                </Row>
                {currentPage * pageSize < totalCards && (
                    <Button onClick={loadMore} > Load More </Button>
                )}
            </div>
        </Wrapper>
    )
}

export default Products
