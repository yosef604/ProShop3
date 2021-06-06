import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({p}) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/products/${p._id}`}>
                <Card.Img src={p.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/products/${p._id}`}>
                    <Card.Title as='div'>
                        <strong>{p.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={p.rating} text={` ${p.numReviews} Reviews`} />
                </Card.Text>

                <Card.Text as='h3'>
                    ${p.price}
                </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Product
