import React from 'react'
import { Record } from 'immutable'
import { CFButton } from './CFButton'


const VALID_PROPS = new Record({
  hasVideo: true,
  hasStatements: true,
  displayed: true,
  statement: {comments: []},
  icons: {
    neutral: 'neutral-icon.jpg',
    confirm: 'approve-icon.jpg',
    refute: 'refute-icon.jpg',
  }
})()

const buildProps = (customProps={}) => VALID_PROPS.mergeDeep(customProps).toJS()

const POSITIVE_PROPS = buildProps({statement: {comments: [
  {approve: true, score: 25},
  {approve: false, score: 10},
  {approve: true, score: 2},
]}})

const NEGATIVE_PROPS = buildProps({statement: {comments: [
  {approve: false, score: 25},
  {approve: false, score: 10},
  {approve: true, score: 2},
]}})

const NEUTRAL_PROPS = buildProps({statement: {comments: [
  {approve: false, score: 10},
  {approve: true, score: 10},
]}})

test('Returns nothing if it has no video or statement', () => {
  snapshot(<CFButton {...buildProps({hasVideo: false})}/>)
  snapshot(<CFButton {...buildProps({hasStatements: false})}/>)
})

test('neutral icon if unsure', () => {
  snapshot(<CFButton {...NEUTRAL_PROPS}/>)
})

test('approve icon if approve', () => {
  snapshot(<CFButton {...POSITIVE_PROPS}/>)
})

test('refute icon if refute', () => {
  snapshot(<CFButton {...NEGATIVE_PROPS}/>)
})

test('Has default icons', () => {
  // Without icons
  snapshot(<CFButton {...buildProps({icons: null})}/>)

  // With partial icons object
  snapshot(<CFButton {...buildProps({icons: {approved: 'APPROVED.JPG'}})}/>)
})
