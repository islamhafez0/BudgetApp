import React, { useContext, useMemo, useState } from 'react'
import { CurrencyDollar, PencilLine, Trash } from 'phosphor-react'
import { Button, Modal } from 'components/ui'
import { transActionsContext } from 'services/context/budget/transactionsContext'
import BudgetForm from 'components/budget/budgetForm/BudgetForm'
const SingleTrans = ({ transaction, categories }) => {

  const {handleDelete} = useContext(transActionsContext)


  const [showModal, setShowModal] = useState(false)


  const currentCategory = useMemo(() => {
    // eslint-disable-next-line eqeqeq
    let cat = categories.find(c => c.id == transaction.category)
    if(cat && cat.name) {
      return cat.name;
    }else {
      return '';
    }
  }, [categories, transaction])

  return (
    <div className='trans_item'>
      <div className={`trans_item-icon ${transaction.type === 'exepanse' ? 'error' : ''}`}>
        <CurrencyDollar />
      </div>
      <div className='trans_item-data'>
        <h4>{ transaction.title }</h4>
        <div>
          <small>${ transaction.amount }</small>,
          <small>{ transaction.date }</small>,
          <small>{ currentCategory }</small>
        </div>
      </div>
      <div className='trans_item-cta'>
        <Button icon onClick={() => setShowModal(true)}>
          <PencilLine />
        </Button>

        <Button type='error' icon onClick={() => handleDelete(transaction.id)}>
          <Trash />
        </Button>
        
      </div>
      <Modal 
        visible={showModal}
        closeModal={() => setShowModal(false)}
      >
        <BudgetForm 
          closeModal={() => setShowModal(false)}
          defaultData={transaction}
        />
      </Modal>
    </div>
  )
}

export default SingleTrans