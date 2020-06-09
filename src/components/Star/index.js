import React from "react";
/**
 * @property {String} checkedColor 选中的颜色
 * @property {Number} number 星星的个数
 * @property {Number} size 星星的大小
 * @property {Number} rem 每个rem的大小
 * @property {Number} value 默认的选中的星星个数
 * @property {Number} space 星星的间隔
 * @property {String} defaultColor 未选中的颜色
 * @property {function} onChange 当选中星星个数改变时的回调函数
 * @property {Boolear} readonly 只读模式
 */
export default class Star extends React.PureComponent {

  static defaultProps = {
    checkedColor: "#FB6472",
    number: 5,
    value: 0,
    size: 21,
    defaultColor: "#DADADA",
    rem: 100,
    space: 5,
    onChange: (i) => {
      console.log("得分：" + i);
    },
    readonly: false
  }
  state = {
    checked: 0
  }
  checked (index) {
    if (!this.props.readonly && index + 1 !== this.state.checked) {
      this.setState({ checked: index + 1 });
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(index + 1);
      }
    }
  }
  componentWillMount () {
    this.setState({ checked: this.props.value });
  }
  render () {
    const starStyle = { display: 'flex', alignItem: 'center' };
    const style = i => {
      const css = {
        color: this.state.checked >= i + 1 ? this.props.checkedColor : this.props.defaultColor,
        fontSize: this.props.size / this.props.rem + 'rem',
        marginRight: i + 1 !== this.props.number ? this.props.space / this.props.rem + 'rem' : 0
      }
      if (this.state.checked !== parseInt(this.state.checked) && i === parseInt(this.state.checked)) {
        const ratio = (this.state.checked - i).toFixed(2) * 100;
        css.color = "transparent"
        css.backgroundImage = `linear-gradient(to right,${this.props.checkedColor} ${ratio}%,${this.props.defaultColor} ${100 - ratio}%)`;
        css.WebkitBackgroundClip = 'text';
      }
      return css;
    }
    return (
      <div className="star" style={starStyle}>
        {Array(this.props.number).fill(0).map((e, i) => <div
          onClick={this.checked.bind(this, i)}
          key={i.toString()}
          style={style(i)}
        >★</div>)
        }
      </div>
    )
  }
} 