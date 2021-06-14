import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productsActions'

const ProductsCarousel = () => {
    const dispatch = useDispatch()

    const topProductRated = useSelector(state => state.topProductRated)
    const {loading, error, products} = topProductRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(p => (
                <Carousel.Item key={p._id}>
                    <Link to={`/products/${p._id}`}>
                        <Image src={p.image} alt={p.name} fluid></Image>
                        <Carousel.Caption className='carousel-caption'>
                            <h2> {p.name} (${p.price}) </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductsCarousel
