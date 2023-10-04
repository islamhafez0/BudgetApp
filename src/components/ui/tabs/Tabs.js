import React, { useState } from 'react'
import './Tabs.css'
const Tabs = ({ children, defaultTab = 1 }) => {
const [activeTab, setActiveTab] = useState(defaultTab)
const tabs = [...children]

const tabstitles = tabs.map(t => t.props.title || '')
const tabsContent = tabs.map(t => t.props.children)
  return (
    <div className='tabs'>
        <div className='tabs_titles'>
            {tabstitles.map((title, index) => (
              <div className={`tab_title ${activeTab === (index + 1) ? "active" : ""}`} key={`tab-title-${index + 1}`}
                onClick={ () => setActiveTab(index + 1) }
              >
                {title}
              </div>
            ))}
        </div>
        <div className='tab_content'>
            { tabsContent[activeTab - 1] }
        </div>
    </div>
  )
}

export default Tabs