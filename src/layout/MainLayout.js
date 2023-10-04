import React from 'react'
import Header from 'components/layout/header/Header'

const MainLayout = (props) => {
  return (
    <>
        <Header />
        <main>
            {props.children}
        </main>
    </>
  )
}

export default MainLayout