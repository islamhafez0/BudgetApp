import React, { useContext, useState } from 'react'
import { CategoriesContext } from 'services/context/budget/CategoriesContext'
import { transActionsContext } from 'services/context/budget/transactionsContext'

const TransHeader = () => {

  const { filtering } = useContext(transActionsContext)

  const {data: catData} = useContext(CategoriesContext)


  const [inputs, setInputs] = useState({
    keys: '',
    category: '',
    type: ''
  })


  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const f = { ...inputs, [name]: value }
    setInputs(f)
    filtering(f)
  }


  return (
    <div className='trans_header'>
      <div className='trans_header-title'>
        Recent Transactions
      </div>
      <div className='trans_header-filters'>
      <select className='filters_select' name='keys'
        onChange={handleChange}
        value={inputs.keys}
      >
      <option value=''>Sort By</option>
          <option value='date'>Date</option>
          <option value='amount'>Amount</option>
          <option value='alphabetical'>Alphabetical</option>
        </select>

        <select className='filters_select' name='category'
          onChange={handleChange}
          value={inputs.category}
        >
          <option value=''>Categories</option>
        {catData && catData.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
        </select>

        <select className='filters_select' name='type'
          onChange={handleChange}
          value={inputs.type}
        >
          <option value=''>All</option>
          <option value='income'>Income</option>
          <option value='exepanse'>Exepanse</option>
        </select>
      </div>
    </div>
  )
}

export default TransHeader