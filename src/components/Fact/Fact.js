import React from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Source from './Source'
import UserAppellation from './UserAppellation'

import styles from './Fact.module.css'

import starImageFile from '../../assets/star.png'

const mapStateToProps = (state) => ({
  graphics: state.Configuration.getIn(['app', 'graphics']),
})

export class Fact extends React.PureComponent {
  render() {
    const { approve, text, source, user, score } = this.props.comment

    return (
      <div className={`${styles.fact} ${getFactType(approve)}`}>
        <div className={styles.sourceSection}>
          <span className={styles.scoreTag}>
            <span>{score || 0} </span>
            <img
              src={this.props.graphics.star || starImageFile}
              alt={this.props.t('pts')}
            />
          </span>
          <Source source={source} imgNewTab={this.props.graphics.newTab} />
        </div>
        {text && text.length > 0 && (
          <div className={styles.userSection}>
            {this.renderUserComment(user, text)}
          </div>
        )}
      </div>
    )
  }

  renderUserComment(user, text) {
    return user ? (
      <div>
        <img src={user.miniPictureUrl} height="24" alt="" />
        <div className={styles.right}>
          <UserAppellation user={user} />
          &nbsp;
          <span className={styles.userCommentText}>{text}</span>
        </div>
      </div>
    ) : (
      <div>
        <span className={styles.anonymous}>{this.props.t('anonymous')}</span>
        <span className={styles.userCommentText}>{text}</span>
      </div>
    )
  }
}

function getFactType(approve) {
  if (approve === true) return styles.approvingFact
  if (approve === false) return styles.refutingFact
  return styles.regularFact
}

export default connect(mapStateToProps)(withTranslation(['translations'])(Fact))
