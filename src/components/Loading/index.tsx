import React from 'react'
import styles from './index.module.scss'
const Loading: React.FC<any> = () => {
  return <div className={styles.loader}>
    <div className={styles.loaderInner}>
      {Array(5).fill('').map((_, index) => <div key={index} className={styles.loaderLineWrap}>
        <div className={styles.loaderLine}></div>
      </div>)}
    </div>
  </div>
}

export default Loading
