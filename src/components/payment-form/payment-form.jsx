import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import { useState } from 'react'
import Button ,{BUTTON_TYPE_CLASSES}from '../button/button.component'
import { useSelector } from 'react-redux'
import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { PaymentButton,PaymentFormContainer,FormContainer } from './payment-form-styles'

const PaymentForm =() =>{
    const stripe =useStripe()
    const elements =useElements()

    const paymentHandler = async (e)=>{
        e.preventDeafault()

        if(!stripe || !elements){
            return
        }

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            }
        })

    }

return(
    <div>
        <PaymentFormContainer>
            <FormContainer>
             <h2>Credit Card Payment:</h2>
            <CardElement/>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>

    </div>
)
}

export default PaymentForm