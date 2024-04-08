import React from 'react'
import CampaignList from './CampaignList'

const Homepage = ({state}) => {
  return (
    <div>
      <CampaignList state={state}/>
    </div>
  )
}

export default Homepage
