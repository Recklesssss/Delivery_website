import React from 'react'
import Left_user from '../Users/Left/Left_user'
import Main__order from './Main__order/Main__order'
import Header_user from '../Users/Header/Header_user'

function OrderDeliveryManagement() {
  return (
    <div>
        <Header_user/>
        <Main__order/>
        <Left_user/>
    </div>
  )
}
 
export default OrderDeliveryManagement