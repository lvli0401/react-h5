import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import styles from './index.module.scss'
import { Button, Calendar, Popup, Toast } from 'antd-mobile'
import dayjs from 'dayjs'
import request from '@/apis/request'


function LineBarChart() {
  const chartAgeRef = useRef<any>(null)
  const chartSexRef = useRef<any>(null)
  const [range, setRange] = useState<[Date, Date]>([dayjs().add(-30, 'd').toDate(), dayjs().toDate()])
  const [visible, setVisible] = useState(false)

  const initData = useCallback(async () => {
    const [{ result: ageData}, {result: sexData}] = await Promise.all([
      request('post', '/nan_qiao/data/activity/query_activity_data', {
        startTime: dayjs(range[0]).valueOf(),
        endTime: dayjs(range[0]).valueOf(),
        type: 0,
      }),
      request('post', '/nan_qiao/data/activity/query_activity_data', {
        startTime: dayjs(range[0]).valueOf(),
        endTime: dayjs(range[0]).valueOf(),
        type: 1,
      })
    ])
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
    }
    const chartAgeInstance = echarts.init(chartAgeRef.current)
    chartAgeInstance.setOption({...option, ...ageData})
    const chartSexInstance = echarts.init(chartSexRef.current)
    chartSexInstance.setOption({...option, ...sexData})
  }, [range])

  useEffect(() => {
    initData()
  }, [range, initData])

  return (
    <div className={styles.chart} style={{ textAlign: 'center' }}>
      <div className={styles.timeWrapper}>
        <Button onClick={() => setVisible(true)} className={styles.time}>请选择时间段</Button>
        {range && <span>{dayjs(range[0]).format('YYYY.MM.DD')}~{dayjs(range[1]).format('YYYY.MM.DD')}</span>}
      </div>
      <Popup visible={visible} onMaskClick={() => setVisible(false)}>
        <Calendar
          defaultValue={[dayjs().add(-30, 'd').toDate(), dayjs().toDate()]}
          selectionMode='range'
          max={dayjs().toDate()}
          min={dayjs().add(-90, 'd').toDate()}
          onChange={(val) => {
            val && setRange(val)
          }}
        />
      </Popup>
      <div className={styles.genderWrapper}>
        <div ref={chartAgeRef} className={styles.gender}></div>
      </div>
      <div className={styles.genderWrapper}>
        <div ref={chartSexRef} className={styles.gender}></div>
      </div>
    </div>
  )
}

export default LineBarChart