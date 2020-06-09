import React, { createRef } from 'react';
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import './index.scss'
/**
 * 初始化时必须保证swiper轮播元素的长度大于0，否则将无法循环播放 swiperItems.length>0&&<Swiper>{swiperItems.map(...)}</Swiper>
 * @property {string} type  轮播类型 （可选） multigraph vertical
 * @property {Objcet} setting 轮播额外的设置 参考swiper官网 https://www.swiper.com.cn/api/start/new.html
 * @property {Number} autoplaySpeed 自动播放速度 单位ms 默认3000 设置为false不自动播放 
 * @property {DOM} children 轮播元素 最外层div的class必须为 swiper-slide 不存在时自动添加
 * @property {Number} spaceBetween 横向轮播有效 轮播元素的间距 默认值12 
 * @property {Number} loopedSlides 横向轮播有效 loop的个数 https://www.swiper.com.cn/api/loop/25.html 默认值5
 * @property {Number} height 竖向轮播有效 轮播的高度
 * @property {Boolear} showArrow 是否展示左右箭头 横向轮播有效
 * @property {Boolear} loop 是否循环展示内容 默认true
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
    spaceBetween: 12,
    type: 'multigraph',
    height: 40,
    autoplaySpeed: 3000,
    loop: false
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
        stopOnLastSlide: false
      } : false,
      on: {
        slideChangeTransitionEnd () {
          _this.props.onChange && _this.props.onChange(this.realIndex, this);
        }
      },
      navigation: _this.props.showArrow && _this.props.type !== 'vertical' ? {
        nextEl: _this.nextEl.current,
        prevEl: _this.prevEl.current,
      } : '',
      ...this.setting[this.props.type],
      ...this.props.setting,
      loop: this.props.loop,
    }
    new Swiper(this.target.current, setting);
  }

  render () {
    return (
      <div ref={this.target} className="swiper-container">
        <div className="swiper-wrapper">
          {this.props.children.map(item => {
            if (item.props.className === 'swiper-slide') {
              return item;
            } else {
              return <div className="swiper-slide" key={item.key}>{item}</div>
            }
          })}
        </div>
        {
          this.props.showArrow && this.props.type !== 'vertical' ? [
            <div key="next" className="swiper-button-next swiper-button-white" ref={this.nextEl}></div>,
            <div className="swiper-button-prev swiper-button-white" key="prev" ref={this.prevEl}></div>] : ''
        }
      </div>)
  }
}