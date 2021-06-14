import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productsActions'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import ProductsCarousel from '../components/ProductsCarousel'

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productsList = useSelector(state => state.productsList)

    const {loading, error, products, page, pages} = productsList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {!keyword && <ProductsCarousel />}
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message>{error}</Message> :
            <>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product p={product} />
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>
            }
        </>
    )
}

export default HomeScreen
