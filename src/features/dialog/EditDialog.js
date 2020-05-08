import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import { Input, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateDataPointName, updateAmount } from '../sankey/sankeySlice';
import { useTranslation } from 'react-i18next';
import styles from './EditDialog.module.css'

export function EditDialog(props) {
  const dispatch = useDispatch()
  const { onClose, selectedValue = {}, open } = props;
  const { name, index, type } = selectedValue || { name: '' }
  const existingName = name ? name : ''
  const [latest, setLatest] = useState(existingName)
  const { t } = useTranslation()

  const handleClose = () => {
    onClose(selectedValue);
  }

  /**
   * @method update
   * @description dispatch update Data Point Name action
   */
  const update = () => {
    if (type === 'data') {
      dispatch(updateDataPointName({ name: latest, index }))
    } else {
      dispatch(updateAmount({ amount: latest, index }))
    }
    setLatest('')
    onClose(selectedValue)
  }

  const renderEditName = () => {
    return (
      <div className={styles.container}>
        <Input
          placeholder={t('Latest Name')}
          value={latest}
          onChange={e => setLatest(e.target.value)} />
        <Button variant="contained" color="primary" onClick={update}>
          {t('Update')}
        </Button>
        {t('* Use unique name')}
      </div>
    )
  }

  const renderEditAmount = () => {
    return (
      <div className={styles.container}>
        <Input
          placeholder={t('Expenditure')}
          value={latest}
          onChange={e => setLatest(e.target.value)} />
        <Button variant="contained" color="primary" onClick={update}>
          {t('Update')}
        </Button>
      </div>
    )
  }

  const renderBody = (props) => {
    if (type === 'data') return renderEditName()
    else return renderEditAmount()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      {
        renderBody()
      }
    </Dialog>
  )
}

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object
}
