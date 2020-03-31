import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const wrapper = document.querySelector('.wrapper');
    const footer = document.querySelector('.footer');
    if (footer) {
      let footerHeight = footer.offsetHeight;
      wrapper.style.paddingBottom = footerHeight + 'px';

      window.onresize = () => {
        footerHeight = footer.offsetHeight;
        wrapper.style.paddingBottom = footerHeight + 'px';
      }
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className="wrapper">
        {children}
      </div>
    )
  }
}

export default App;