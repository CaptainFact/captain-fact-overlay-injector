import { Record, List } from 'immutable'
import { State } from 'jumpstate'
import Statement from './record'


export const StatementsState = State('Statements', {
  initial: new Record({
    isLoading: false,
    errors: null,
    data: new List()
  })(),
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
  }
})

function prepareStatementsList(statements) {
  const preparedStatements = []
  statements.forEach(({comments, ...attributes}) => {
    const preparedComments = new List(comments)
      .filter(c => !c.score || c.score >= 0 && c.source !== null && c.approve !== null) // Approving / Refuting facts
      .sortBy(c => c.score ? -c.score : 0)
    if (preparedComments.count() > 0)
      preparedStatements.push(new Statement({comments: preparedComments, ...attributes}))
  })
  return new List(preparedStatements).sortBy(st => st.time)
}