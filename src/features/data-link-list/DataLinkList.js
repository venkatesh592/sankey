import React from 'react';

import styles from './DataLinkList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectDataLinks, removeDataLink } from '../sankey/sankeySlice';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

export function DataLinkList() {
  const links = useSelector(selectDataLinks)
  const dispatch = useDispatch()

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
                <ListItemText primary={`${link.source} ${link.target}`} />
                <DeleteIcon onClick={() => handleDelete(index, link)} />
              </ListItem>
            )
          })
        }
      </List>
    </div>
  )
}
