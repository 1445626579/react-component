export default {
  //移出空字符串
  removeEmpty (str) {
    return str.replace(/\s*/g, "");
  },
  //判断字符串是否为空
  notEmpty (str) {
    if (str === undefined || str === null) return false;
    str = str.toString();
    if (str.length === 0 || this.removeEmpty(str).length === 0) {
      return false;
    }
    return true;
  },
  //验证手机号
  phoneNumber (str) {
    if (!(/^1[3456789]\d{9}$/.test(str))) {
      return false;
    }
    return true;
  },
  /* 判断是否满足最小长度 */
  minLength (str, minLen) {
    if (this.removeEmpty(str).length >= minLen) {
      return true;
    }
    return false;
  },
  //判断最大长度
  maxLength (str, maxLen) {
    if (this.removeEmpty(str).length <= maxLen) {
      return true;
    }
    return false;
  },
  /**
   * 验证所有内容
   * @method testAll
   * @param {Object} testTarget 要测试的值
   * @param {Object} valiType 测试的类型
   * @returns {Promise} 测试成功返回测试成功的数据 失败返回message
   */
  /**
   * valiType示例
   * {
        real_name: [
          { required: true, message: '请输入收货人姓名' },
          { len: 10, message: '联系姓名不能超过十个字', type: 'maxLength' },
        ],
          address: [
            { required: true, message: '请输入收货人姓名' },
            { len: 100, message: '详细地址不能超过100个字', type: 'maxLength' }
          ]
      }
   */
  testAll (testTarget = {}, relus = {}, ...rest) {
    return new Promise((resolve, reject) => {
      const result = Object.keys(relus).every(key => {
        return relus[key].every(vali => {
          const err = { message: vali.message };
          if (rest) {
            err.rest = rest.length === 1 ? rest[0] : rest;
          }
          if (vali.required) {
            if (!this.notEmpty(testTarget[key])) {
              reject(err);
              return false;
            }
            return true;
          } else {
            if (typeof this[vali.type] !== 'function') {
              console.warn(vali.type + "验证类型不存在");
              return true;
            }
            if (vali.type === 'minLength' || vali.type === 'maxLength') {
              if (!this[vali.type](testTarget[key], vali.len)) {
                reject(err);
                return false;
              }
              return true;
            }
            if (!this[vali.type](testTarget[key])) {
              reject(err);
              return false;
            }
            return true;
          }
        })
      })
      if (result) {
        resolve(testTarget);
      }
    })
  },
  //验证array
  testArray (targetArr, relus) {
    return new Promise((resolve, reject) => {
      if (Object.prototype.toString.call(targetArr) === "[object Array]") {
        Promise.all(targetArr.map((element, index) => this.testAll(element, relus, index))).then(resArr => {
          resolve(resArr);
        }).catch(err => {
          reject(err);
        })
      } else {
        console.warn("参数应该是一个数组")
      }
    })
  }
}