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
          {data.title}
        </div>
      </div>
    </div>
  )
}

export default VenueCard