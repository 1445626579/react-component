import React from 'react';
import ReactDom from "react-dom";
import "./index.scss";
class Dialog extends React.PureComponent {
  /**
   * 当内容中有变量时需要使用reload方法重置。
   * @property {Boolean} isShow 是否展示
   * @property {function} onClose 关闭按钮的回调函数
   * @property {string} title 弹窗标题
   * @property {string||ReactDomObject} content 弹窗内容 支持HTML字符串或ReactDom对象
   * @property {string} btnText 弹窗按钮内容
   * @property {function} btnHandle 弹窗按钮回调方法
   * @property {Number} titleFontSize 弹窗标题文字大小
   * @property {Boolean}customChildren 是否自定义子元素，默认false ，children属性无效，children生效时，title等属性无效
   * @property {DOM} children 子元素 
   */
  static defaultProps = {
    children: <div></div>,
    customChildren: false,
    title: '通知',
    btnText: '确认',

  }
  componentDidMount () {

  }
  onClose = () => {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }
  clickHandle = () => {
    if (typeof this.props.btnHandle === 'function') {
      this.props.btnHandle();
    }
  }
  state = {
    colsing: false
  }
  render () {
    return (
      <div className="dialogComponent">
        <div className="dialogBox ani" ref="animate">
          <div className="dialogContent">
            <div className="top"></div>
            <div className="children">
              <div className="childrenContent">
                {!this.props.customChildren ?
                  <div className="content">
                    <h3 style={{ fontSize: this.props.titleFontSize / 100 + 'rem' }}>{this.props.title}</h3>
                    {typeof this.props.content === 'string' ?
                      <div className="contentText" dangerouslySetInnerHTML={{ __html: this.props.content }}></div> :
                      <div className="contentText" >{this.props.content}</div>
                    }
                    <button type="button" className="btn btn-block" onClick={this.clickHandle}>{this.props.btnText}</button>
                  </div> : this.props.children}
              </div>
            </div>
            <div className="bottom"></div>
          </div>
          <div className="close" onClick={this.onClose.bind(this)}></div>
        </div>
      </div>
    )
  }
}
export default (function () {
  function animate (el, e) {
    if (e.animationName === "dialogContentReverse") {
      e.target.removeEventListener('animationend', animate);
      ReactDom.unmountComponentAtNode(el);
      if (document.body.hasChildNodes(el)) {
        document.body.removeChild(el);
      }
    }
  }
  const el = () => document.createElement('div');
  const elements = [];
  const scrollTop = (() => ({ setPrev () { this.prev = window.scrollY; }, prev: 0 }))();
  return {
    show (props) {
      const element = el();
      document.body.appendChild(element);
      const onClose = () => {
        props.onClose && props.onClose(); this.hide();
      }
      if (elements.length === 0) {
        scrollTop.setPrev();
        document.body.style.height = "100vh"
      }
      ReactDom.render(<Dialog {...props} onClose={onClose}></Dialog>, element, () => {
        elements.push(element);
        element.querySelector('.dialogBox').addEventListener('animationend', animate.bind(this, element));
      });
    },
    hide () {
      ReactDom.findDOMNode(elements.pop()).childNodes[0].classList.add('closing');
      if (elements.length === 0) {
        document.body.style.height = "initial";
        window.scrollTo(0, scrollTop.prev);
      }
    },
    reload (props) {
      const onClose = () => {
        props.onClose && props.onClose(); this.hide();
      }
      ReactDom.render(<Dialog {...props} onClose={onClose}></Dialog>, elements[elements.length - 1]);
    }
  }
})()