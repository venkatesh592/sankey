import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import { Input, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateDataPointName } from '../sankey/sankeySlice';
import { useTranslation } from 'react-i18next';
import styles from './EditDialog.module.css'

export function EditDialog(props) {
  const dispatch = useDispatch()
  const { onClose, selectedValue = {}, open } = props;
  const { name, index } = selectedValue || { name: '' }
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
    dispatch(updateDataPointName({ name: latest, index }))
    setLatest('')
    onClose(selectedValue)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
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
    </Dialog>
  )
}

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object
}
