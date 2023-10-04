import React, { useContext } from 'react'
import './Hero.css'
import BudgetNumber from './BudgetNumber'
import { Coins, Wallet, CreditCard } from 'phosphor-react'
import { transActionsContext } from 'services/context/budget/transactionsContext'
const Hero = () => {
  const {totals} = useContext(transActionsContext)
  return (
    <div className='hero_budget'>
      <div className='hero_budget-bg'>
        <img src='https://unsplash.it/1200/400' alt='hero background'/>
      </div>
      <div className='container'>
        <div className='hero_budget_numbers'>
          <BudgetNumber money={totals.total} title="Total Money">
            <Coins weight='duotone'/>
          </BudgetNumber>
          <BudgetNumber money={totals.income} title="Total Income">
            <Wallet weight='duotone'/>
          </BudgetNumber>
          <BudgetNumber money={totals.exepanse} title="Total Expanse">
            <CreditCard weight='duotone'/>
          </BudgetNumber>
        </div>
      </div>
    </div>
  )
}
export default Hero