import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Button } from 'components/ui'
import { X } from 'phosphor-react'
import './BudgetForm.css'
import { CategoriesContext } from 'services/context/budget/CategoriesContext'
import { postTransaction, updateTransaction } from 'services/apis/transactions.api'
import { transActionsContext } from 'services/context/budget/transactionsContext'


const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


let initialState = {
  title: '',
  amount: '',
  type: 'income',
  category: '',
  date: getCurrentDate()
}


const BudgetForm = ({ closeModal, defaultData }) => {

  if(defaultData) {
    initialState = { ...defaultData }
  }
  const [data, setData] = useState(initialState)
  const [validation, setValidation] = useState({
    isValid: true,
    touched: false,
    data: {}
  })

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      date: getCurrentDate(),
    }));
  }, [])
  const { data: categories, loading: catLoading } = useContext(CategoriesContext)


  const handleValidation = useCallback( (touchedKey) => {
    let validData = {...validation}
    validData.isValid = true
    validData.touched = true
    const stateData = {...data}

    if(stateData.id) {
      delete stateData.id
    }


    Object.keys(stateData).forEach(key => {
      let isValid = true
      let error = null
      let touched = validData.data[key]?.touched || false
      if(touchedKey && touchedKey === key) {
        touched = true
      }
      if(!data[key] || !data[key].trim) {
        isValid = false
        error = 'Field Is Required'
      }
      if(key === 'amount' && data[key] && isNaN(data[key])) {
        isValid = false
        error = 'Please add a valid numbr'
      }
      if(key === 'amount' && data[key] && !isNaN(data[key]) && +data[key] <= 0) {
        isValid = false
        error = 'Please add a valid number greater than 0';
      }
      if(!touched) {
        validData.touched = false
        error = null
      }
      validData.data[key] = {isValid, error, touched}
      if(!isValid) {
        validData.isValid = false
      }
    })
    setValidation(validData)
  }, [data, validation])


  const { fetchData } = useContext(transActionsContext)


  const clearForm = () => {
    setData({
      title: '',
      amount: '',
      type: 'income',
      category: '',
      date: getCurrentDate()
    })
  }


  const isMount = useRef(false)
  useEffect(() => {
    if(!isMount.current) {
      handleValidation()
      isMount.current = true
    }
  }, [handleValidation])


  useEffect(() => {
    if(!defaultData) {
      clearForm()
    }
  }, [])


  const handleChange = (e) => {
    setValidation(d => {
      d.data[e.target.name].error = null
      return d
    })

    setData(d => {
      return {
        ...d,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleBlur = (e) => {
    handleValidation(e.target.name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if(defaultData) {
        await updateTransaction(defaultData.id, data)
      }else {
        await postTransaction(data)
      }
      setLoading(false)
      fetchData()
      closeModal()
    }catch (error) {
      console.log(error.message)
    }
  }
  console.log(validation)
  return (
    <div className='new_budget'>
        <h2>{defaultData ? "Edit" : "Add new"} Budget</h2>
        <form className='form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                id='title' 
                name='title' 
                className={`${validation.data.title?.error && 'error'}`} 
                placeholder='Title...'
                value={data.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validation.data.title?.error && (
                <p className='req_error'>{validation.data.title?.error}</p>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='amount'>Amount</label>
              <input 
                type='number' 
                id='amount' 
                name='amount'
                className={`${validation.data.amount?.error && 'error'}`} 
                placeholder='Amount...'
                value={data.amount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {validation.data.amount?.error && (
                <p className='req_error'>{validation.data.amount?.error}</p>
              )}
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='type'>Select Type</label>
                <select
                  id='type' 
                  name='type' 
                  className={`${validation.data.type?.error && 'error'}`} 
                  placeholder='type...'
                  value={data.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value='income'>Income</option>
                  <option value='exepanse'>Exepense</option>
                </select>
                {validation.data.type?.error && (
                  <p className='req_error'>{validation.data.type?.error}</p>
                )}
              </div>

            {catLoading ?
            <div className='loading'>
              <span></span>
            </div>
            : (
              <div className='form-group'>
              <label htmlFor='category'>Select Category</label>
              <select
                id='category' 
                name='category' 
                className={`${validation.data.category?.error && 'error'}`} 
                placeholder='category...'
                value={data.category}
                onChange={handleChange}
                onBlur={handleBlur}  
              >
                  <option value='' disabled>Select a category</option>
                {categories.map(cat => (
                  <option
                    key={cat.id} 
                    value={cat.id}
                  >
                    { cat.name }
                  </option>
                ))} 
              </select>
              {validation.data.category?.error && (
                <p className='req_error'>{validation.data.category?.error}</p>
              )}
            </div>
            )}
            </div>

            <div className='form-group'>
              <label htmlFor='date'>Date</label>
                <input
                  type='date' 
                  id='date' 
                  name='date'
                  className={`${validation.data.date?.error && 'error'}`} 
                  placeholder='date...'
                  value={data.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              {validation.data.date?.error && (
                <p className='req_error'>{validation.data.date?.error}</p>
              )}
            </div>

            <Button size='large' block disabled={!validation.isValid || loading}>
            {defaultData ? "Edit" : "Add"}
            </Button>

            <div className='close'>
              <Button onClick={closeModal}>
                <X />
              </Button>
            </div>

        </form>
    </div>
  )
}

export default BudgetForm