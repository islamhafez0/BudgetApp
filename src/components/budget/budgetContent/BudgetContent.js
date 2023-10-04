import React, { useMemo } from 'react'
import './BudgetContent.css'
import { useContext } from 'react' 
import { Tabs, Tab } from 'components/ui'
import Transactions from './transactions/Transactions'
import { transActionsContext } from 'services/context/budget/transactionsContext'
import { CategoriesContext } from 'services/context/budget/CategoriesContext'
import DougnutChart from 'components/ui/DougnutChart/DougnutChart'

const incomeColors = [
  "#557B83",
  "#82954B",
  "#A2D5AB",
  "#E5EFC1",
  "#85C88A",
  "#0d5235",
  "#82A284",
  "#BABD42",
]

const expanseColors = [
  "#4C0033",
  "#790252",
  "#AF0171",
  "#E80F88",
  "#513252",
  "#7A4069",
  "#CA4E79",
  "#FFC18E",
]


const BudgetContent = () => {
  const {data: transactionsData} = useContext(transActionsContext)
  const {data: categoriesData} = useContext(CategoriesContext)

  const chartedData = useMemo(() => {
    const data = [...transactionsData];
    const chartData = { income: {}, expanse: {} };
  
    if (transactionsData && transactionsData.length && categoriesData && categoriesData.length) {
      data.forEach(d => {
        // eslint-disable-next-line eqeqeq
        let catName = categoriesData.find(c => c.id == d.category).name;
        if (d.type === 'income') {
          if (chartData.income[catName]) {
            chartData.income[catName] += +d.amount;
          } else {
            chartData.income[catName] = +d.amount;
          }
        } else {
          if (chartData.expanse[catName]) {
            chartData.expanse[catName] += +d.amount;
          } else {
            chartData.expanse[catName] = +d.amount;
          }
        }
      });
    }
    return chartData;
  }, [transactionsData, categoriesData]);
  

  return (
    <div className='budget_content'>
        <div className='container'>
            <Tabs>
              <Tab title='Data'>
                <Transactions />
              </Tab>
              <Tab title='Income'>
                <DougnutChart
                  data={ chartedData.income }
                  colors={incomeColors}
                />
              </Tab>
              <Tab title='Expanses'>
                <DougnutChart 
                  data={ chartedData.expanse } 
                  colors={expanseColors}
                />
              </Tab>
            </Tabs>
        </div>
    </div>
  )
}

export default BudgetContent