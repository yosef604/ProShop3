import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({p}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/products/${p._id}`}>
                <Card.Img src={p.image} variant='top' />
            </a>

            <Card.Body>
                <a href={`/products/${p._id}`}>
                    <Card.Title as='div'>
                        <strong>{p.name}</strong>
                    </Card.Title>
                </a>
            </Card.Body>

            <Card.Text as='div'>
                <div className>
                    {p.rating} From {p.numReviews} Reviews
                </div>
            </Card.Text>

            <Card.Text>
                <h3>${p.price}</h3>
            </Card.Text>
        </Card>
    )
}

export default Product
