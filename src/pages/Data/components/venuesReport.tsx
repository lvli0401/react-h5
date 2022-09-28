import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import Table from 'rc-table'
import { DatePicker, Button } from 'antd-mobile';
import dayjs from "dayjs";
import { getQueryOrder, getQueryStadiumOrder } from '@/apis/index'
import * as echarts from 'echarts'

const VenueReport: React.FC<Record<string, never>> = () => {

  const venuesList = [
    {
      id: 1,
      name: '哪吒1',
      bookingRate: '10%',

    },
    {
      id: 2,
      name: '哪吒2',
      bookingRate: '10%',

    },
    {
      id: 3,
      name: '哪吒3',
      bookingRate: '10%',

    },
  ];
  const [venuesIsUsedList, setVIsUsedList] = useState([]);
  const getDataList = async () => {
    const { result: { list } } = await getQueryStadiumOrder();
    if (list && list.length > 0) {
      const rList = list.map((i: any) => ({
        ...i,
        hasOrder: i.hasOrder ? '是' : '否'
      }))
      setVIsUsedList(rList);
    }
  }
  const columns = [
    {
      title: '场馆名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      className: styles.tCenter,
    },
    {
      title: '预约率',
      dataIndex: 'bookingRate',
      key: 'bookingRate',
      width: 200,
      className: styles.tCenter,
    },
  ]
  const usedColumns = [
    {
      title: '场馆名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      className: styles.tCenter,
    },
    {
      title: '是否使用',
      dataIndex: 'hasOrder',
      key: 'hasOrder',
      width: 200,
      className: styles.tCenter,
    },
  ]

  const [visible, setVisible] = useState(false);
  const popPicker = () => {
    setVisible(true);
  }
  const closePicker = () => {
    setVisible(false);
  }

  const [rate, setRate] = useState('');
  const getInfo = async () => {
    const { result } = await getQueryOrder();
    setRate(result.bookRate);
  }

  const chartNameRef = useRef<any>(null)
  const getChartInit = () => {
    const chartNameInstance = echarts.init(chartNameRef.current)
    const optionName = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['2012', '2013', '2014', '2015', '2016']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Forest',
          type: 'bar',
          barGap: 0,
          // label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390]
        },
        {
          name: 'Steppe',
          type: 'bar',
          // label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290]
        },
        {
          name: 'Desert',
          type: 'bar',
          // label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190]
        },
        {
          name: 'Wetland',
          type: 'bar',
          // label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [98, 77, 101, 99, 40]
        }
      ]
    }
    chartNameInstance.setOption(optionName)
  }
  useEffect(() => {
    getInfo();
    getDataList();
    getChartInit();
  }, []);
  return (
    <div>
      <div className={styles.topBar}>
        总预约率：{rate}
      </div>
      {/* <div className={styles.card}>
        <div className={styles.title}>
          <span>每年场馆预约率</span>
          <Button
            size='mini'
            onClick={popPicker}
          >
            选择年份:
          </Button>
          <DatePicker
            max={new Date()}
            visible={visible}
            onClose={() => {
              closePicker();
            }}
            onConfirm={() => {
              closePicker();
            }}
            precision="year"
          >
            {(value) =>
              value ? `${dayjs(value).format("YYYY")}年` : ""
            }
          </DatePicker>
        </div>
        <Table columns={columns} data={venuesList} />

      </div> */}
      <div className={styles.chart} style={{ textAlign: 'center' }}>
        <div className={styles.genderWrapper}>
          <div ref={chartNameRef} className={styles.gender}></div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>实时场馆使用情况</div>
        <Table columns={usedColumns} data={venuesIsUsedList} />
      </div>
    </div>
  )
}

export default VenueReport;