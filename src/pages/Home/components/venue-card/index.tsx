import React from 'react'

interface dataProps {
    imgurl: string
    title: string
    link: string
}
const VenueCard  = (data: dataProps) => {
  return (
    <div>
      <img src={data.imgurl}/>
      <div>
        <div>
          <p>标题: {data.title}</p>
        </div>
        <div>预约</div>
      </div>
    </div>
  )
}

export default VenueCard