import React, { useEffect, useRef, useState } from 'react'
import { Plus } from 'phosphor-react'
import './Header.css'
import logo from 'assets/images/logo.png'
import Button from '../../ui/button/Button'
import { Modal } from 'components/ui'
import BudgetForm from 'components/budget/budgetForm/BudgetForm'
const Header = () => {
  const  [isScrolled, setScroll] = useState(false)
  const [showModal, setShowModal] = useState(false)


  const isMount = useRef(false)
  useEffect(() => {
    if(!isMount.current) {
      window.addEventListener('scroll', () => {
        if(window.scrollY >= 50) {
          setScroll(true)
        }else {
          setScroll(false)
        }
      })
      isMount.current = true
    }
  }, [])
  return (
    <header className={`header ${isScrolled ? "scrolled": ""}`}>
      <div className='container'>
        <div className='header_row'>
          <div className='header_brand'>
            <div className='logo'>
              <img src={logo} alt='brand' />
            </div>
            <h1>Budget App</h1>
          </div>
          <div className='header_actions'>
            <div className='header_actions-add'>
              <Button onClick={() => setShowModal(true)}>
                <Plus weight='duotone' />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal 
        visible={showModal}
        closeModal={() => setShowModal(false)}
      >
        <BudgetForm closeModal={() => setShowModal(false)}/>
      </Modal>
    </header>
  )
}

export default Header