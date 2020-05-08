import React, { useState } from 'react';

import styles from './DataLinkList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectDataLinks, removeDataLink } from '../sankey/sankeySlice';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { EditDialog } from '../index';

export function DataLinkList() {
  const links = useSelector(selectDataLinks)
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  const dispatch = useDispatch()
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
  const handleEdit = (index, link) => {
    setOpen(true)
    setSelectedValue({ index, ...link, type: 'link' })
  }
  /**
   * @method handleDelete
   * @description dispatch remove aata link action
   */
  const handleDelete = (index, link) => {
    dispatch(removeDataLink({ index, ...link, type: 'link' }))
  }

  if (!links.length) return null
  return (
    <div className={styles.container}>
      <List component="nav" aria-label="main mailbox folders">
        {
          links.map((link, index) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={`Target: ${link.source}, Source: ${link.target}, Amount:  ${link.value}`} />
                <EditIcon onClick={() => handleEdit(index, link)} />
                <DeleteIcon onClick={() => handleDelete(index, link)} />
              </ListItem>
            )
          })
        }
      </List>
      <EditDialog open={open} onClose={handleClose} selectedValue={selectedValue}></EditDialog>
    </div>
  )
}
