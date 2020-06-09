import React from 'react';
import Star from "./components/Star";
import Swiper from "./components/Swiper";
import Loading from "./components/Loading";
import './App.css';

class App extends React.PureComponent {
  componentWillMount () {
    Loading.show();
  }
  componentDidMount () {
    setTimeout(() => { Loading.hide(); }, 500)
  }
  state = {
    star: 4,
    bgColor: ['red', 'blue', 'black', 'green', 'pink', 'violet']
  }
  render () {
    return (
      <div className="App">
        <div className="block">
          <Star onChange={(v) => { this.setState({ star: v }) }} value={this.state.star}></Star>
        </div>
        <div className="block">
          <Swiper type="multigraph" loop>
            {this.state.bgColor.map((item, key) => <div className="example-swiper" style={{ backgroundColor: item }} key={key.toString()}>{key + 1}</div>)}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default App;
