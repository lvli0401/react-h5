import React from 'react'
import styles from './index.module.scss'

interface dataProps {
    imgurl: string
    title: string
    link: string
}
const VenueCard  = ({data}: {data: dataProps}) => {
  return (
    <div className={styles.card}>
      <img src={data.imgurl}/>
      <div className={styles.content}>
        <div>
          <p>标题: {data.title}</p>
        </div>
        <div>预约</div>
      </div>
    </div>
  )
}

export default VenueCard