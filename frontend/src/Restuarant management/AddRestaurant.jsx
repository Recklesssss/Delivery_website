import React from 'react'
import Header_restaurant from './Header/Header_restaurant'
import Left_restaurant from './Left/Left_restaurant'
import Main_restaurant from './Main/Main_restaurant'

function AddRestaurant() {
  return (
    <div className='add__restaurant'>
        <Header_restaurant/>
        <Left_restaurant/>
        <Main_restaurant/>
    </div>
  )
}

export default AddRestaurant;