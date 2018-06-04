import { Record, List } from 'immutable'
import { State } from 'jumpstate'
import Statement from './record'


const INITIAL_STATE = new Record({
  isLoading: false,
  errors: null,
  data: new List()
})

export const StatementsState = State('Statements', {
  initial: INITIAL_STATE(),
  fetchSuccess(state, statements) {
    return state.merge({
      data: prepareStatementsList(statements),
      isLoading: false
    })
  },
  fetchFailure(state, errors) {
    return state.merge({
      isLoading: false, errors
    })
  },
  setLoading(state, isLoading) {
    return state.set('isLoading', isLoading)
  },
  reset: () => INITIAL_STATE()
})

function prepareStatementsList(statements) {
  const preparedStatements = []
  statements.forEach(({comments, ...attributes}) => {
    const preparedComments = new List(comments)
      .filter(filterFacts) // Approving / Refuting facts
      .sortBy(c => (c.score ? -c.score : 0))
    if (preparedComments.count() > 0)
      preparedStatements.push(new Statement({comments: preparedComments, ...attributes}))
  })
  return new List(preparedStatements).sortBy(st => st.time)
}

function filterFacts(c) {
  return (!c.score || c.score >= 0) && c.source !== null && c.replyToId === null
}
