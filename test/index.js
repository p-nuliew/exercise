function format(factor) {
    // console.log(factor)
    let tot = 0
    let flag = false
    let left = 0 // 双引号外的左括号
    let right = 0 // 双引号外的右括号
    let bkleft = 0
    let bkright = 0
    let keyWords = []
    let computeSign = true
    let signWz = 1
    let wz = 0
    let custom = 0
    let customAsset = 0
    let custom1 = 0
    let factorAfter = '' // 裁切因子名时判断等号前是否为为特殊符号
    let factorBefore = '' // 裁切因子名时判断等号后是否为为特殊符号
    factor = factor.split('""').join('"')

    let index = factor.length
    for (let i = index; i >= 0; i--) {
        let str = factor.substring(i, index)
        let recent1 = str.indexOf('today')
        let recent2 = str.indexOf('今天')
        let recent3 = str.indexOf('oneYearAgo')
        let recent4 = str.indexOf('一年前')
        if (recent1 > -1) {
            if (str.charAt(recent1 - 1) !== '"' && str.charAt(recent1 + 6) !== '"' && str.charAt(recent1 + 6) !== '(' && str.charAt(recent1 + 7) !== ')') {
                str = str.split('today').join('today()')
                factor = factor.substring(0, i) + str + factor.substring(index, factor.length)
                index = i
            }
        } else if (recent2 > -1) {
            if (str.charAt(recent2 - 1) !== '"' && str.charAt(recent2 + 3) !== '"' && str.charAt(recent2 + 3) !== '(' && str.charAt(recent2 + 4) !== ')') {
                str = str.split('今天').join('今天()')
                factor = factor.substring(0, i) + str + factor.substring(index, factor.length)
                index = i
            }
        } else if (recent3 > -1) {
            if (str.charAt(recent3 - 1) !== '"' && str.charAt(recent3 + 11) !== '"' && str.charAt(recent3 + 11) !== '(' && str.charAt(recent3 + 12) !== ')') {
                str = str.split('oneYearAgo').join('oneYearAgo()')
                factor = factor.substring(0, i) + str + factor.substring(index, factor.length)
                index = i
            }
        } else if (recent4 > -1) {
            if (str.charAt(recent4 - 1) !== '"' && str.charAt(recent4 + 4) !== '"' && str.charAt(recent4 + 4) !== '(' && str.charAt(recent4 + 5) !== ')') {
                str = str.split('一年前').join('一年前()')
                factor = factor.substring(0, i) + str + factor.substring(index, factor.length)
                index = i
            }
        }
    }
  //   for (let i = index; i >= 0; i--) {
  //     // str 保存从当前字符到处理范围末尾的子字符串
  //     let str = factor.substring(i, index);
  //     let recent = [
  //         { keyword: 'today', replace: 'today()' },
  //         { keyword: '今天', replace: '今天()' },
  //         { keyword: 'oneYearAgo', replace: 'oneYearAgo()' },
  //         { keyword: '一年前', replace: '一年前()' }
  //     ];

  //     for (let j = 0; j < recent.length; j++) {
  //         // 找到关键词在str中的索引位置
  //         let keywordIndex = str.indexOf(recent[j].keyword);
  //         let leftChar = str.charAt(keywordIndex - 1);
  //         let rightChar = str.charAt(keywordIndex + recent[j].keyword.length);

  //         // 根据关键词的索引位置，判断该关键词前后的字符是否有效
  //         if (keywordIndex > -1 && isCharValid(leftChar) && isCharValid(rightChar)) {
  //             // 替换关键词
  //             str = str.split(recent[j].keyword).join(recent[j].replace);
  //             // 更新原始 factor
  //             factor = factor.substring(0, i) + str + factor.substring(index, factor.length);
  //             // 更新 index ，因为factor长度变了
  //             index = i;
  //             break;
  //         }
  //     }
  // }

  // function isCharValid(char) {
  //     return (char !== '"' && char !== '(' && char !== ')');
  // }

    for (let i = 0; i < factor.length; i++) {
        if (factor.charAt(i) === '"') {
            tot = tot + 1
            if (tot % 2 === 1) {
                flag = true
            } else {
                flag = false
                wz = i
            }
        } else {
            // console.log(i, tot)
            if (flag === false && tot % 2 === 0) {
                let isName = false
                customAsset = factor.indexOf('->')
                if (customAsset > 0) {
                    custom = customAsset // ->裁切因子名位置
                    this.nameInput = factor.substring(0, customAsset)
                    factor = factor.substring(customAsset + 2, factor.length)
                    this.reconstructionSelect = '2'
                    isName = true
                } else if (factor.charAt(i) === '=') {
                    factorAfter = factor.charAt(i + 1)
                    factorBefore = factor.charAt(i - 1)
                    let isTableZ = factor.indexOf('表格(')
                    let isTable = factor.indexOf('table(')
                    if (i > 0 && factorAfter !== '=' && factorBefore !== '=' && factorBefore !== '>' && factorBefore !== '<' && factorBefore !== '!') {
                        if ((isTableZ > -1 && isTableZ > i) || (isTable > -1 && isTable > i) || (isTableZ < 0 && isTable < 0)) { // 是否表格函数，表格函数=在表格函数后不解析，非表格函数解析
                            custom1 = i
                            this.nameInput = factor.substring(0, i)
                            factor = factor.substring(i + 1, factor.length)
                            this.reconstructionSelect = '1'
                            isName = true
                        }
                    }
                }
                if (isName) {
                    this.is_save = true
                    i = 0
                    keyWords = []
                    left = 0
                    right = 0
                    bkleft = 0
                    bkright = 0
                    break
                } // 截取名称及公式后退出当前循环进行下一个循环，不进行下列步骤
                if (factor.charAt(i) === '(' || factor.charAt(i) === '（') {
                    let patrnKey = factor.substring(0, i).split(/[-+*()（） /"“,，><=]/)
                    keyWords.push(patrnKey[patrnKey.length - 1])
                    left = left + 1
                } else if (factor.charAt(i) === ')' || factor.charAt(i) === '）') {
                    right = right + 1
                }
                let flag1 = false
                for (let zc = 0; zc < this.zcList.length; zc++) {
                    let zcWz = factor.indexOf(this.zcList[zc])
                    // console.log(this.zcList[zc], zcWz)
                    // console.log(i, factor.charAt(i), zcWz + this.zcList[zc].length + 1, zcWz > -1 && i > (zcWz + this.zcList[zc].length + 1))
                    if (zcWz >= wz && i > (zcWz + this.zcList[zc].length + 1)) {
                        flag1 = true
                        break
                    }
                }
                if (flag1) {
                    if (factor.charAt(i) === '（' && bkleft === 0) {
                        bkleft = bkleft + 1
                    } else if (factor.charAt(i) === '）' && bkleft - bkright === 1) {
                        bkright = bkright + 1
                    } else if (factor.charAt(i) === '？') {
                        factor = factor.substring(0, i) + '?' + factor.substring(i + 1, factor.length)
                    } else if (bkleft === bkright) {
                        bkleft = 0
                        bkright = 0
                        if (factor.charAt(i) === '“') {
                            factor = factor.substring(0, i) + '"' + factor.substring(i + 1, factor.length)
                        } else if (factor.charAt(i) === '”') {
                            factor = factor.substring(0, i) + '"' + factor.substring(i + 1, factor.length)
                        } else if (factor.charAt(i) === '（') {
                            factor = factor.substring(0, i) + '(' + factor.substring(i + 1, factor.length)
                        } else if (factor.charAt(i) === '）') {
                            factor = factor.substring(0, i) + ')' + factor.substring(i + 1, factor.length)
                        } else if (factor.charAt(i) === '，') {
                            factor = factor.substring(0, i) + ',' + factor.substring(i + 1, factor.length)
                        } else if (factor.charAt(i) === '？') {
                            factor = factor.substring(0, i) + '?' + factor.substring(i + 1, factor.length)
                        } else if (factor.charAt(i) === ' ') {
                            factor = factor.substring(0, i) + factor.substring(i + 1, factor.length)
                            i = i - 1
                        }
                    }
                } else {
                    // console.log(factor.charAt(i), i)
                    if (factor.charAt(i) === '“') {
                        factor = factor.substring(0, i) + '"' + factor.substring(i + 1, factor.length)
                    } else if (factor.charAt(i) === '”') {
                        factor = factor.substring(0, i) + '"' + factor.substring(i + 1, factor.length)
                    } else if (factor.charAt(i) === '（') {
                        factor = factor.substring(0, i) + '(' + factor.substring(i + 1, factor.length)
                    } else if (factor.charAt(i) === '）') {
                        factor = factor.substring(0, i) + ')' + factor.substring(i + 1, factor.length)
                    } else if (factor.charAt(i) === '，') {
                        factor = factor.substring(0, i) + ',' + factor.substring(i + 1, factor.length)
                    } else if (factor.charAt(i) === '？') {
                        factor = factor.substring(0, i) + '?' + factor.substring(i + 1, factor.length)
                    } else if (factor.charAt(i) === ' ') {
                        factor = factor.substring(0, i) + factor.substring(i + 1, factor.length)
                        i = i - 1
                    }
                }
                const replacements = [
                  { original: '“', replacement: '\"' },
                  { original: '”', replacement: '\"' },
                  { original: '（', replacement: '(' },
                  { original: '）', replacement: ')' },
                  { original: '，', replacement: ',' },
                  { original: '？', replacement: '?' },
                  { original: ' ', replacement: '' }
                ];
                const replaceChat = () => {
                  for (let j = 0; j < replacements.length; j++) {
                    if (factor.charAt(i) === replacements[j].original) {
                      factor = factor.substring(0, i) + replacements[j].replacement + factor.substring(i + 1, factor.length);
                      break;
                    }
                  }
                }
                if (flag1) {
                  if (factor.charAt(i) === '（' && bkleft === 0) {
                      bkleft = bkleft + 1
                  } else if (factor.charAt(i) === '）' && bkleft - bkright === 1) {
                      bkright = bkright + 1
                  } else if (factor.charAt(i) === '？') {
                      factor = factor.substring(0, i) + '?' + factor.substring(i + 1, factor.length)
                  } else if (bkleft === bkright) {
                      bkleft = 0
                      bkright = 0
                      replaceChat()
                  }
              } else {
                  // console.log(factor.charAt(i), i)
                  replaceChat()
              }
            }
        }
    }
    let factorList = factor.split(/[+*/><]/)
    for (let i = 0; i < factorList.length; i++) {
        signWz = signWz + factorList[i].length
        if (factorList[i].length < 1) {
            let sign = factor.slice(signWz, signWz + 2)
            return { computeSign: false, sign: sign }
        } else if (factorList[i].charAt(factorList[i].length - 1) === '-') {
            let sign = factor.slice(signWz - 2, signWz)
            return { computeSign: false, sign: sign }
        }
    }
    // console.log(right)
    // console.log(left)
    return { right: right, left: left, keyWords: keyWords, factor: factor, computeSign: computeSign, custom: custom, custom1: custom1 }
    return { right, left, keyWords, factor, computeSign, custom, custom1 }
}

format(str)