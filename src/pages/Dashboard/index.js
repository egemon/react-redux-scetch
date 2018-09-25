import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'recompose'

import injectSaga from '../../utils/dynamicRedux/injectSaga'
import injectReducer from '../../utils/dynamicRedux/injectReducer'

import reducer, { ROOT_KEY } from './reducer'
import saga, { SAGA_KEY } from './flows'

const container = compose(
  injectReducer({ key: ROOT_KEY, reducer }),
  injectSaga({ key: SAGA_KEY, saga }),
  connect(createStructuredSelector({

  }), dispatch => bindActionCreators({

  }, dispatch)),
)

/* eslint-disable react/prop-types */
const Dasbhoard = ({
}) => (
  <div>
    Text
  </div>
)

/* eslint-enable react/prop-types */

export default container(Dasbhoard)
