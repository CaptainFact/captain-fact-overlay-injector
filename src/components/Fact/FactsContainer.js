import React from 'react'

import Fact from './Fact.js'
import { container } from './FactsContainer.css'


export default class FactsContainer extends React.PureComponent {
  render() {
    return (
      <div className={container}>
        {this.props.comments.map(comment =>
          <Fact key={comment.id} comment={comment}/>
        )}
      </div>
    )
  }
}