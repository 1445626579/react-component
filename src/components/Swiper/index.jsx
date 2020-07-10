import React, { createRef } from 'react';
import Swiper from "swiper/js/swiper.min.js";
import "swiper/css/swiper.min.css";
import './index.scss'
/**
 * @property {string} type  轮播类型 （可选） multigraph vertical
 * @property {Objcet} setting 轮播额外的设置 参考swiper官网 https://www.swiper.com.cn/api/start/new.html
 * @property {Number} autoplaySpeed 自动播放速度 单位ms 默认3000 设置为false不自动播放 
 * @property {DOM} children 轮播元素 最外层div的class必须为 swiper-slide 不存在时自动添加
 * @property {Number} spaceBetween 横向轮播有效 轮播元素的间距 默认值0
 * @property {Number} loopedSlides 横向轮播有效 loop的个数 https://www.swiper.com.cn/api/loop/25.html 默认值5
 * @property {Number} height 竖向轮播有效 轮播的高度
 * @property {Boolear} showArrow 是否展示左右箭头 横向轮播有效
 * @property {Boolear} loop 是否循环展示内容 默认false
 * @property {Boolear} hasIndex 是否展示页码
 * @property {Number} speed 切换速度 默认300
 */
export default class Scroll extends React.PureComponent {
  setting = {
    vertical: {
      direction: 'vertical',
      height: this.props.height,
      loopAdditionalSlides: 1,
    },//竖向轮播
    multigraph: {
      slidesPerView: 'auto',
      loopedSlides: this.props.loopedSlides,
      autoplayDisableOnInteraction: false,
      spaceBetween: this.props.spaceBetween
    }//单图或多图横向轮播

  }
  static defaultProps = {
    loopedSlides: 5,
    spaceBetween: 0,
    type: 'multigraph',
    height: 40,
    autoplaySpeed: 3000,
    loop: false,
    speed: 300
  }
  target = createRef()
  prevEl = createRef()
  nextEl = createRef()
  componentDidMount () {
    const _this = this;
    const setting = {
      observer: true,//修改swiper自己或子元素时，自动初始化swiper 
      observeParents: true,//修改swiper的父元素时，自动初始化swiper 
      autoplay: this.props.autoplaySpeed > 0 ? {
        delay: this.props.autoplaySpeed,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      } : false,
      on: {
        slideChangeTransitionEnd () {
          _this.props.onChange && _this.props.onChange(this.realIndex, this);
        }
      },
      pagination: _this.props.hasIndex ? {
        el: '.swiper-pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          var _html = '';
          for (var i = 1; i <= total; i++) {
            if (current == i) {
              _html += '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
            } else {
              _html += '<span class="swiper-pagination-customs"></span>';
            }
          }
          return _html;
        }
      } : {},
      navigation: _this.props.showArrow && _this.props.type !== 'vertical' ? {
        nextEl: _this.nextEl.current,
        prevEl: _this.prevEl.current,
      } : '',
      ...this.setting[this.props.type],
      ...this.props.setting,
      loop: this.props.loop,
      speed: this.props.speed
    }
    const { children = [] } = this.props;
    if (children.length > 1) {
      new Swiper(this.target.current, setting);
    }
  }

  render () {
    const { children = [] } = this.props;
    return (
      <div ref={this.target} className="swiper-container">
        <div className="swiper-wrapper">
          {children.length && children.map(item => {
            if (item.props.className === 'swiper-slide') {
              return item;
            } else {
              return <div className="swiper-slide" key={item.key}>{item}</div>
            }
          })}
        </div>
        {
          this.props.showArrow && children.length > 1 && this.props.type !== 'vertical' ? [
            <div key="next" className="swiper-button-next swiper-button-white" ref={this.nextEl}></div>,
            <div className="swiper-button-prev swiper-button-white" key="prev" ref={this.prevEl}></div>] : ''
        }
        {this.props.hasIndex && children.length > 1 && <div className="swiper-pagination"></div>}
      </div>)
  }
}