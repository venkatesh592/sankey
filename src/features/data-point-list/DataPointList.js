import React, { useState } from 'react';

import styles from './DataPointList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectDataPoints, removeDataPoint } from '../sankey/sankeySlice';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { EditDialog } from '../index';

export function DataPointList() {
  const dispatch = useDispatch()
  const points = useSelector(selectDataPoints)
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  
  /**
   * @method handleClose
   * @description it will close edit dialog
   */
  const handleClose = () => {
    setOpen(false)
  }

  /**
   * @method handleEdit
   * @description it will selectedValue
   */
  const handleEdit = (index, point) => {
    setOpen(true)
    setSelectedValue({ index, ...point, type: 'data' })
  }

  /**
   * @method handleDelete
   * @description dispatch remove data point action
   */
  const handleDelete = (index, point) => {
    dispatch(removeDataPoint({ index, ...point, type: 'data' }))
  }

  if (!points.length) return null

  return (
    <div className={styles.container}>
      <List component="nav" aria-label="main mailbox folders">
        {
          points.map((point, index) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={point.name} />
                <DeleteIcon onClick={() => handleDelete(index, point)} />
                <EditIcon onClick={() => handleEdit(index, point)} />
              </ListItem>
            )
          })
        }
      </List>
      <EditDialog open={open} onClose={handleClose} selectedValue={selectedValue}></EditDialog>
    </div>
  )
}
