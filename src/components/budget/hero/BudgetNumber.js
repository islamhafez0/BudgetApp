import React from 'react'
const BudgetNumber = (props) => {
  return (
    <div className='budget_numbers'>
        <div className='budget_numbers-icon'>
            {props.children}
        </div>
        <div className='budget_numbers-money'>
            <div>${props.money}</div>
            <small>{props.title}</small>
        </div>
    </div>
  )
}

export default BudgetNumber