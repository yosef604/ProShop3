import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({variant, child}) => {
    return (
        <Alert variant={variant}>
            {child}
        </Alert>
    )
}

Message.defaultProps ={
    variant: 'info'
}

export default Message
