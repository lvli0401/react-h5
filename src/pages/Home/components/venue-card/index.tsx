import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

interface dataProps {
    imgurl: string
    title: string
    id: string
}
const VenueCard  = ({data}: {data: dataProps}) => {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate('/demeanor-info', {state: {
      id: data.id,
      name: data.title
    }})
  }, [data])
  return (
    <div className={styles.card} onClick={handleClick}>
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