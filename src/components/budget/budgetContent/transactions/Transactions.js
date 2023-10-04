import React from 'react'
import './Transactions.css'
import TransHeader from './shared/TransHeader'
import TransContent from './shared/TransContent'

const Transactions = () => {
  return (
    <div className='trans'>
      <TransHeader />
      <TransContent />
    </div>
  )
}

export default Transactions