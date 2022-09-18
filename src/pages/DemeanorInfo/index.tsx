import React from 'react'
import Waterfall from '@/components/Waterfall'
import styles from './index.module.scss'
const DemeanorInfo = () => {
  const source = [
    {
      src: 'https://picsum.photos/500/800?random=11',
      type: 'City',
    },
    {
      src: 'https://picsum.photos/500/500?random=12',
      type: 'City',
    },
    {
      src: 'https://picsum.photos/500/300?random=13',
      type: 'City',
    },
    {
      src: 'https://picsum.photos/500/400?random=14',
      type: 'City',
    },
    {
      src: 'https://picsum.photos/500/500?random=15',
      type: 'City',
    },
    {
      src: 'https://picsum.photos/500/500?random=16',
      type: 'City',
    },
    {
      src: 'https://picsum.photos/500/300?random=17',
      type: 'City',
    },
    {
      src: 'https://picsum.photos/500/400?random=18',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/500?random=19',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/300?random=20',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/700?random=21',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/500?random=22',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/300?random=23',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/400?random=24',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/500?random=25',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/600?random=26',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/700?random=27',
      type: 'Beaches',
    },
    {
      src: 'https://picsum.photos/500/600?random=28',
      type: 'Mountain Resort',
    },
    {
      src: 'https://picsum.photos/500/700?random=29',
      type: 'Mountain Resort',
    },
    {
      src: 'https://picsum.photos/500/800?random=30',
      type: 'Mountain Resort',
    },
  ]
  console.log(source.length)
  return (
    <Waterfall data={source.map(v => v.src)} wrapClass={styles.container} col={2}>
      {source.map((v, i) => (
        <img src={v.src} key={i} alt={v.src} />
      ))}
    </Waterfall>
  )
}

export default DemeanorInfo