import React, { useContext } from 'react'
import SingleTrans from './SingleTrans'
import { transActionsContext } from 'services/context/budget/transactionsContext'
import { CategoriesContext } from 'services/context/budget/CategoriesContext'


const TransContent = () => {

  const { filteredData: transactions, loading, error } = useContext(transActionsContext)
  const { data: categories, Categloading } = useContext(CategoriesContext)  
  return (
    <div className='trans_content'>

      {!loading && !Categloading && transactions && transactions.length &&
        categories.length && !error ? (
        <>
          {transactions.map((transaction) => (
              <SingleTrans transaction={transaction} key={transaction.id}
                categories={categories}/>
          ))}
        </>
      ): (<></>)}

      { (loading || Categloading) && (
          <p className='loading'>
            <span></span>
          </p>
        ) }


      { error && !loading && (
        <p className='req_error'>{ error }</p>
      )}

      {!loading && transactions && !transactions.length && !error &&(
        <p className='no-data'> No Data </p>
      )}
    </div>
  )
}

export default TransContent