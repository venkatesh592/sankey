import React from 'react';

import 'echarts/lib/chart/sankey';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip'

import ReactEcharts from 'echarts-for-react';
import styles from './Sankey.module.css';
import { selectOptions } from './sankeySlice';
import { useSelector } from 'react-redux';

import {
  DataLink,
  DataPoint,
  DataPointList,
  DataLinkList
} from '../index';

export function Sankey() {
  const sankeyOption = useSelector(selectOptions)

  return (
    <div className={styles.sankey}>
      <div className={styles.usage}>
        Usage: (Feed the Data)
        <br />
        1) Create Data point (should be unique)
        <br />
        2) Create Link between them
        <br />
        Example: Salary > Home [3000] > [Electricity - 1000, Grocery - 2000]
        <br />
        Steps:
        <br />
        1) Create four data points with names like [Salary, Home, Electricity, Grocery]
        <br />
        2) Create three links between them 
        <br />
        a) source: Salary, target: Home, Expenditure: 3000
        b) source: Home, target: Electricity, Expenditure: 1000
        c) source: Home, target: Grocery, Expenditure: 2000
        <br />
        You can see graph below based on inputs. (you can also do edit and delete options as well)
        <br />
        Note: Description only availalebe in English
      </div>
      <div className={styles.container}>
        <DataPoint></DataPoint>
        <DataLink></DataLink>
      </div>
      <div className={styles.container}>
        <DataPointList></DataPointList>
        <DataLinkList></DataLinkList>
      </div>
      <ReactEcharts
        style={{height: '100%', width: '100%'}}
        option={sankeyOption} />
    </div>
  )
}
