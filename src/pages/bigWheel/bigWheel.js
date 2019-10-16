import { View, Text, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import './bigWheel.less';
import classNames from 'classnames';
import iconWheelBg from '../../static/wheelBg@3x.jpg';
import iconWheelCircle from '../../static/wheelCircle@3x.png';
import iconWheelModalFail from '../../static/wheelModalFail@3x.png';
import iconWheelModalSuccess from '../../static/wheelModalSuccess@3x.png';
import iconWheelRuleBg from '../../static/wheelRuleBg@3x.png';
import iconWheelStart from '../../static/wheelStart@3x.png';
import iconWheelTitle from '../../static/wheelTitle@3x.png';
import iconWheelModalClose from '../../static/icon-close.png';
class BigWheel extends Component {
  state = {
    rollState: false, // 是否正在抽奖
    visibleModal: false, //抽奖弹窗
    visibleHistoryModal: false, //中奖历史弹窗
    canRollNum: 0, // 抽奖次数
    prizeType: 0, // 奖品类型 0-优惠券1-积分2-实物
    prizeName: null,
    isWin: false, //是否中奖
    num: 1, //用在动画上，让用户在第二次点击的时候可以接着上次转动的角度继续转
    lottery: [
      '一等奖',
      '二等奖',
      '谢谢参与',
      '三等奖',
      '二等奖',
      '谢谢参与',
      '三等奖',
      '谢谢参与'
    ], //奖品数组
    title: '抽奖页面标题',
    lotteryArrLen: 8, //放奖品的数组的长度
    historyData: [
      {
        award: '华为xxxxxxxxxxxxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      },
      {
        award: '华为xxxx',
        awardName: '一等奖',
        exchangeStatusName: '已领取',
        winningTime: '2019-10-16'
      }
    ]
  };
  config = {
    navigationBarTitleText: '大转盘',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black'
  };
  componentWillMount() {
    // 掉接口看用户有几次抽奖机会，如果抽奖机会大于等于1就可以抽奖

    this.setState({
      canRollNum: 3
    });

    let aniData = Taro.createAnimation({
      //创建动画对象
      duration: 3000,
      timingFunction: 'ease'
    });
    this.aniData = aniData; //将动画对象赋值给this的aniData属性
  }
  showModal = () => {
    console.log('抽奖结束---显示弹窗');
  };
  closeModal = () => {
    this.setState({
      visibleModal: false
    });
  };
  showHistoryModal = flag => {
    this.setState({ visibleHistoryModal: flag });
  };
  startRollTap = () => {
    //开始转盘
    const {
      lotteryArrLen,
      lottery,
      canRollNum,
      rollState,
      visibleModal,
      num,
      isWin
    } = this.state;
    if (canRollNum < 1 || rollState || visibleModal) return;

    let aniData = this.aniData; //获取this对象上的动画对象
    let rightNum = ~~(Math.random() * lotteryArrLen); //生成随机数
    console.log('抽奖次数--', canRollNum);
    console.log(`随机数是${rightNum}`);
    // 随机次数为2,5,7则未中奖
    if (rightNum == 2 || rightNum == 5 || rightNum == 7) {
      this.setState({ isWin: false });
    } else {
      this.setState({ isWin: true, prizeName: lottery[rightNum] });
    }
    console.log(`奖品是：${lottery[rightNum]}`);
    aniData.rotate(3600 * num - (360 / lotteryArrLen) * rightNum).step(); //设置转动的圈数
    this.setState({
      rollState: true,
      aniData: aniData.export() //导出动画队列。export 方法每次调用后会清掉之前的动画操作。
    });

    // 动画停止设置状态
    setTimeout(_ => {
      this.showModal(); // 当转盘停止显示模态框显示抽奖结果
      this.setState({
        visibleModal: true,
        canRollNum: canRollNum - 1, // 抽奖次数减一
        rollState: false, // 将转盘状态切换为可抽奖
        num: num + 1
      });
    }, 3000);
  };

  render() {
    const {
      aniData,
      lottery,
      canRollNum,
      title,
      visibleModal,
      prizeType,
      isWin,
      visibleHistoryModal,
      historyData,
      prizeName
    } = this.state;
    let winText = `您获得${prizeName}`;
    let failText = '很遗憾您没有中奖';
    return (
      <View className="container">
        <Image className="iconWheelBg" src={iconWheelBg}></Image>
        <View className="history" onClick={() => this.showHistoryModal(true)}>
          <Text>中奖历史</Text>
        </View>
        <View className="title">
          <Text>{title}</Text>
        </View>
        <View className="rollNum">
          <Text>您共有{`${canRollNum}`}次抽奖机会</Text>
        </View>
        <View className="plate-wrap-box">
          <View className="plate-border" animation={aniData}>
            <Image className="iconWheelCircle" src={iconWheelCircle}></Image>
            <View className="plate-wrap">
              {lottery.map((item, index) => {
                return (
                  <View
                    className="plate-box"
                    key
                    style={
                      'top:-' +
                      (lottery.length - 6 <= 2
                        ? 36 + 4 * (lottery.length - 6)
                        : 50) +
                      'rpx;transform-origin: 50% ' +
                      (lottery.length - 6 <= 2
                        ? 256 + 4 * (lottery.length - 6)
                        : 270) +
                      'rpx;border-top: ' +
                      (lottery.length - 6 <= 2
                        ? 256 + 4 * (lottery.length - 6)
                        : 270) +
                      'rpx solid #' +
                      (index % 2 == 0 ? 'ffffff' : 'ff4f5f') +
                      ';transform:translate(-50%,0) rotate(' +
                      (360 / lottery.length) * index +
                      'deg);border-left: ' +
                      (440 / lottery.length) * 2 +
                      'rpx solid transparent;border-right: ' +
                      (440 / lottery.length) * 2 +
                      'rpx solid transparent;'
                    }
                  >
                    <Text
                      className="text-box"
                      style={'color:#' + (index % 2 == 0 ? 'ff4f5f' : 'ffffff')}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          {/* 开始抽奖 */}
          <View className="plate-btn-wrap" onClick={this.startRollTap}>
            <Image className="iconWheelStart" src={iconWheelStart}></Image>
          </View>
          {/* 活动详情 */}
          <View className="detial-wrap">
            <Image className="iconWheelTitle" src={iconWheelTitle}></Image>
            <View className="detail-text">
              <Text>活动详情</Text>
            </View>
            <Image className="iconWheelRuleBg" src={iconWheelRuleBg}></Image>
            <View className="rule-detail">
              {/* TODO-LIN 记得处理换行 */}
              <Text>
                一、这里就是签到规则这里就是签到规则这里就是签到规则
                二、这里就是签到规则这里就是签到规则这里就是签到规则这里就是签到规则这里就是签到规则这里就是签到规则
                三、这里就是签到规则这里就是签到规则这里就是签到规则这里就是签到规则这里就是签到规则
              </Text>
            </View>
          </View>
        </View>
        {/* 中奖提示弹窗 */}
        {visibleModal && (
          <View className="wheel-modal">
            <View className="wheel-modal-mask"></View>
            <View className="wheel-modal-content">
              <Image
                className="modal-img"
                src={isWin ? iconWheelModalSuccess : iconWheelModalFail}
              ></Image>
              <View className="modal-text">
                <Text>{isWin ? winText : failText}</Text>
              </View>
              {isWin ? (
                <View className="modal-btnGroup">
                  <View className="modal-btn-giveUp" onClick={this.closeModal}>
                    <Text>放弃奖品</Text>
                  </View>
                  <View
                    className={classNames({
                      'modal-btn-get-short': prizeType == 0 || prizeType == 1,
                      'modal-btn-get-long': prizeType == 2
                    })}
                    onClick={this.closeModal}
                  >
                    <Text>
                      {prizeType == 2 ? '联系客服领取奖品' : '立即领取'}
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="modal-btnGroup">
                  <View
                    className="modal-btn-continue"
                    onClick={this.closeModal}
                  >
                    <Text>继续努力</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
        {/* 中奖记录弹窗 */}
        {visibleHistoryModal && (
          <View className="history-modal">
            <View className="history-modal-mask"></View>
            <View className="history-modal-content">
              <Image
                onClick={() => this.showHistoryModal(false)}
                className="iconWheelModalClose"
                src={iconWheelModalClose}
              ></Image>

              <View className="history-modal-header">
                <Text>中奖历史</Text>
              </View>
              <View style={{ display: 'flex' }}>
                <View className="history-modal-title">
                  <Text>日期</Text>
                </View>
                <View className="history-modal-title">
                  <Text>奖品名称</Text>
                </View>
                <View className="history-modal-title">
                  <Text>奖品</Text>
                </View>
                <View className="history-modal-title">
                  <Text>兑换情况</Text>
                </View>
              </View>
              <View className="history-modal-table">
                {historyData.map((item, index) => {
                  return (
                    <View style={{ display: 'flex' }}>
                      <View className="history-modal-table-item">
                        <Text>{item.winningTime}</Text>
                      </View>
                      <View className="history-modal-table-item">
                        <Text>{item.awardName}</Text>
                      </View>
                      <View className="history-modal-table-item">
                        <Text>{item.award}</Text>
                      </View>
                      <View className="history-modal-table-item">
                        <Text>{item.exchangeStatusName}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default BigWheel;
