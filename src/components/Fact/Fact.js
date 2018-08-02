import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Source from './Source'
import UserAppellation from './UserAppellation'

import { fact, approvingFact, refutingFact, regularFact, userSection, right, scoreTag, sourceSection, userCommentText, anonymous } from './Fact.css'

import starImageFile from '../../assets/star.png'


const mapStateToProps = state => ({
  graphics: state.Configuration.getIn(['app', 'graphics'])
})

@translate(['translations'])
export class Fact extends React.PureComponent {
  render() {
    const { approve, text, source, user, score } = this.props.comment

    return (
      <div className={`${fact} ${getFactType(approve)}`}>
        <div className={sourceSection}>
          <span className={scoreTag}>
            <span>{score || 0} </span>
            <img src={this.props.graphics.star || starImageFile} alt={this.props.t('pts')} />
          </span>
          <Source source={source} imgNewTab={this.props.graphics.newTab}/>
        </div>
        {text && text.length > 0 &&
          <div className={userSection}>
            {this.renderUserComment(user, text)}
          </div>
        }
      </div>
    )
  }

  renderUserComment(user, text) {
    return user ? (
      <div>
        <img src={user.miniPictureUrl} height="24" alt=""/>
        <div className={right}>
          <UserAppellation user={user}/>&nbsp;
          <span className={userCommentText}>{text}</span>
        </div>
      </div>
    ) : (
      <div>
        <span className={anonymous}>{this.props.t('anonymous')}</span>
        <span className={userCommentText}>{text}</span>
      </div>
    )
  }
}

function getFactType(approve) {
  if (approve === true)
    return approvingFact
  else if (approve === false)
    return refutingFact
  return regularFact
}

export default connect(mapStateToProps)(Fact)
