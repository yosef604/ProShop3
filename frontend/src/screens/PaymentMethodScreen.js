import React, { useState } from 'react'
import { Button, Col, Form, FormCheck, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentMethodScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress.address){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel as='legend'>
                        Select Method
                    </FormLabel>

                    <Col>
                        <FormCheck type='radio' label='PayPal or Credit Dard' id='PayPal' name='paymentMethod' 
                        value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></FormCheck>

                        <FormCheck type='radio' label='Stripe' id='Stripe' name='paymentMethod' 
                        value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></FormCheck>
                    </Col>
                </FormGroup>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentMethodScreen
