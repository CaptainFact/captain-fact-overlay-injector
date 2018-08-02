import React from 'react'

import Fact from './Fact'

import { title } from './FactsContainer.css'


export default class FactsContainer extends React.PureComponent {
  render() {
    return (
      <div>
        <div className={title}>Sources</div>
        {this.props.comments.map(comment =>
          <Fact key={comment.id} comment={comment}/>
        ).toArray()}
      </div>
    )
  }
}
