import React from "react";
import ReactDom from "react-dom";
import myStyle from "./index.module.scss";
import Icon from "antd-mobile/lib/icon";
import "antd-mobile/lib/icon/style/index.css";
class Loading extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      bgColor: false
    };
    this.count = 0;
  }
  hide () {
    if (this.count > 0 && --this.count === 0)
      this.setState({ isOpen: false });
  }
  //强制关闭
  enforceHide () {
    this.count = 0;
    this.setState({ isOpen: false });
  }
  show () {
    this.count++;
    this.setState({ isOpen: true });
  }
  setBgColor (color) {
    this.setState({ bgColor: color })
  }
  render () {
    if (this.state.isOpen) {
      return (
        <div className={myStyle["loading"]} style={{ backgroundColor: this.state.bgColor || "rgba(0,0,0,.7)" }}>
          <Icon type="loading" size="lg"></Icon>
        </div>
      );
    } else {
      return null;
    }
  }
}
// let cDiv = document.createElement("div");
export default (function () {
  return {
    example: ReactDom.render(
      <Loading />,
      document.body.appendChild(document.createElement("div"))),
    show () {
      if (this.example)
        this.example.show();
    },
    hide () {
      if (this.example)
        this.example.hide();
    },
    setBgColor (color) {
      if (this.example)
        this.example.setBgColor(color);
    },
    enforceHide () {
      if (this.example)
        this.example.enforceHide();
    }
  };
})()
