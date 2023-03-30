import React from 'react'

import Fact from './Fact'

import styles from './FactsContainer.module.css'

export default class FactsContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <div className={styles.title}>Sources</div>
        {this.props.comments
          .map((comment) => <Fact key={comment.id} comment={comment} />)
          .toArray()}
      </div>
    )
  }
}
