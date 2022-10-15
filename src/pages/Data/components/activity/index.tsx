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
  const [ageShow, setAgeShow] = useState(false)
  const [sexShow, setSexShow] = useState(false)

  const initData = useCallback(async () => {
    const [{ result: ageData}, {result: sexData}] = await Promise.all([
      request('post', '/nan_qiao/data/activity/query_activity_data', {
        startTime: dayjs(range[0]).startOf('d').valueOf(),
        endTime: dayjs(range[1]).endOf('d').valueOf(),
        type: 0,
      }),
      request('post', '/nan_qiao/data/activity/query_activity_data', {
        startTime: dayjs(range[0]).startOf('d').valueOf(),
        endTime: dayjs(range[1]).endOf('d').valueOf(),
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
      legend: {type: 'scroll'},
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
    if (ageData) {
      setAgeShow(true)
      const chartAgeInstance = echarts.init(chartAgeRef.current)
      ageData.xAxis = {
        ...ageData.xAxis,
        axisLabel:{  
          interval: 0,  //控制坐标轴刻度标签的显示间隔.设置成 0 强制显示所有标签。设置为 1，隔一个标签显示一个标签。设置为2，间隔2个标签。以此类推
          rotate:45,//倾斜度 -90 至 90 默认为0 
          textStyle:{ 
            // fontWeight:'bold',  //加粗
            // color:'#000000'   //黑色
          },                 
        }, 
      }
      chartAgeInstance.setOption({...option, ...ageData})
    } else setAgeShow(false)
    if (sexData) {
      setSexShow(true)
      const chartSexInstance = echarts.init(chartSexRef.current)
      sexData.xAxis = {
        ...sexData.xAxis,
        axisLabel:{  
          interval: 0,  //控制坐标轴刻度标签的显示间隔.设置成 0 强制显示所有标签。设置为 1，隔一个标签显示一个标签。设置为2，间隔2个标签。以此类推
          rotate:45,//倾斜度 -90 至 90 默认为0 
          textStyle:{ 
            // color:'#000000'   //黑色
          },                 
        }, 
      }
      chartSexInstance.setOption({...option, ...sexData})
    } else setSexShow(false)
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
          max={dayjs().add(1, 'year').toDate()}
          min={dayjs().add(-30, 'd').toDate()}
          onChange={(val) => {
            val && setRange(val)
          }}
        />
      </Popup>

      <div className={styles.genderWrapper}>
        <div style={ageShow ? {} : {visibility: 'hidden'}} ref={chartAgeRef} className={styles.gender}></div>
      </div>
      <div className={styles.genderWrapper}>
        <div style={sexShow ? {} : {visibility: 'hidden'}} ref={chartSexRef} className={styles.gender}></div>
      </div>

    </div>
  )
}

export default LineBarChart