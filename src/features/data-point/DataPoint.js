import React, { useState } from 'react';

import styles from './DataPoint.module.css';
import { setSeriesData } from '../sankey/sankeySlice';
import { useDispatch } from 'react-redux';
import { getRandomColor } from '../../app/helpers/random-color';
import { useTranslation } from 'react-i18next';

import { Input, Button } from '@material-ui/core';

export function DataPoint() {
  const dispatch = useDispatch();
  const [usage, setUsage] = useState('')
  const { t } = useTranslation();

  /**
   * @method createUsage
   * @description dispatch create data point action
   */
  const createUsage = () => {
    const color = getRandomColor()
    const point = {
      name: usage,
      itemStyle: {
        normal: {
          color,
          borderColor: color
        }
      }
    }
    dispatch(setSeriesData(point))
    setUsage('')
  }

  return (
    <div className={styles.dataPoint}>
      <span>{t('Create Entry')}</span>
      <Input
        className={styles.input}
        placeholder={t('Usage Name Placeholder')}
        value={usage}
        onChange={e => setUsage(e.target.value)} />
        <Button variant="contained" color="primary" onClick={createUsage}>
          {t('Create')}
        </Button>
    </div>
  )
}
