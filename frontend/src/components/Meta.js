import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}></meta>
            <meta name='keyword' content={keywords}></meta>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcom To ProShop',
    description: 'We sell the best products for cheap price',
    keywords: 'buy, best products'
}

export default Meta
