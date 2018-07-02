import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Source from './Source'
import UserAppellation from './UserAppellation'

import { fact, approvingFact, refutingFact, regularFact, userSection, right, scoreTag, sourceSection, userCommentText } from './Fact.css'

import starImageFile from '../../assets/star.png'

@translate(['translations'])
export class Fact extends React.PureComponent {
  render() {
    const { approve, text, source, user, score } = this.props.comment
    const factType = approve === true ? approvingFact : approve === false ? refutingFact : regularFact

    return (
      <div className={`${fact} ${factType}`}>
        <div className={sourceSection}>
          <span className={scoreTag}>
            <span>{score || 0} </span>
            <img src={this.props.graphics.star || starImageFile} alt={this.props.t('pts')} />
          </span>
          <Source source={source} imgNewTab={this.props.graphics.newTab}/>
        </div>
        {text && text.length > 0 &&
          <div className={userSection}>
            <div>
              <img src={user.miniPictureUrl} height="24"/>
              <div className={right}>
                <UserAppellation user={user}/>&nbsp;
                <span className={userCommentText}>{text}</span>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect(state => ({
  graphics: state.Configuration.getIn(['app', 'graphics'])
}))(Fact)
