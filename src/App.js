import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

class App extends Component {
  componentDidMount() {
    // 컴포넌트가 처음 마운트 될 때 현재 number 를 postId 로 사용하여 포스트 내용을 불러옵니다.
    const { number, PostActions } = this.props;
    PostActions.getPost(number);
  }

  componentDidUpdate(prevProps, prevState) {
    const { PostActions } = this.props;

    // 현재 number 와 새로 받을 number 가 다를 경우에 요청을 시도합니다.
    if (this.props.number !== prevProps.number) {
      PostActions.getPost(this.props.number);
    }
  }

  render() {
    const { CounterActions, number, post, error, loading } = this.props;

    return (
      <div>
        <h1>{number}</h1>
        <button onClick={() => CounterActions.incrementAsync()}>+</button>
        <button onClick={() => CounterActions.decrementAsync()}>-</button>
        {loading && <h2>로딩중...</h2>}
        {error ? (
          <h1>에러발생!</h1>
        ) : (
          <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    number: state.counter,
    post: state.post.data
    // loading: state.pender.pending['GET_POST'],
    // error: state.pender.failure['GET_POST']
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(App);
