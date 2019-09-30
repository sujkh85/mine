import React, { Component } from "react";
import classnames from "classnames";
import "../css/Main.scss";
import boom from "./boom.mp3";
import victory from "./victory.m4a";
import clicksound from "./click.mp3";
import bombImg from "./bomb.png";
import IconexConnect from "./IconexConnect";
import { IconConverter, IconBuilder } from "icon-sdk-js";
import { async } from "q";
import IconSDK from "./SDK";
import Const from "./Const";

const { CallTransactionBuilder } = IconBuilder;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.boomRef = React.createRef();
    this.victoryRef = React.createRef();
    this.clickRef = React.createRef();
  }
  config = {
    //10*10
    row: 10,
    column: 10,
    mineCount: 15
  };
  getTxBuild = ({
    from,
    to,
    method,
    params = {},
    networkId = "0x3",
    stepLimit = "0x13d620",
    value = "0x0"
  } = {}) => {
    const callTransactionBuilder = new CallTransactionBuilder();
    const obj = callTransactionBuilder
      .nid(networkId)
      .from(from)
      .to(to)
      .stepLimit(stepLimit)
      .value(value)
      .timestamp(`0x${(new Date().getTime() * 1000).toString(16)}`)
      .method(method)
      .params(params)
      .version("0x3")
      .build();

    return {
      jsonrpc: "2.0",
      method: "icx_sendTransaction",
      params: obj,
      id: 1
    };
  };
  arrToObject(arr) {
    let result = {};
    arr.forEach(item => {
      result[item] = true;
    });
    return result;
  }
  initState = () => {
    //랜덤 숫자
    let mineList = this.initMakeMineList(
      this.config.row * this.config.column,
      this.config.mineCount
    );
    //랜덤 숫자를 객체로 변환
    let mineObj = this.arrToObject(mineList);
    //데이터 구조 만들기
    let mainDataList = this.initMainDataList({
      mineObj: mineObj,
      row: this.config.row,
      column: this.config.column
    });
    //근처 지뢰 숫자 업데이트
    let updatedMineMainData = this.updatedMineMainData({
      mainDataList: mainDataList,
      mineList: mineList,
      row: this.config.row,
      column: this.config.column
    });
    let updatedPositionMainData = this.updatedPositionMainData(
      updatedMineMainData
    );
    return {
      mineList,
      mineObj,
      mainDataList: updatedPositionMainData,
      gameState: "start",
      victoryCount: 0
    };
  };
  updatedPositionMainData = mainDataList => {
    mainDataList.forEach(row => {
      row.forEach(item => {
        let position = this.getPosition(item.index, this.config.row);
        item.x = position.x;
        item.y = position.y;
      });
    });
    return mainDataList;
  };
  updatedMineMainData = ({ mainDataList, mineList, row, column }) => {
    mineList.forEach(num => {
      //index를 좌표로 변환
      let position = this.getPosition(num, row);
      //8방향 좌표 찾는 함수
      let way8List = this.getWay8List({
        x: position.x,
        y: position.y,
        maxX: column,
        maxY: row
      });
      way8List.forEach(item => {
        let target = mainDataList[item.y][item.x];
        target.mineCount += 1;
        if (target.isMine) {
          target.mineCount = 0;
        }
      });
    });
    return mainDataList;
  };
  //인덱스로 x y 좌표를 구하는 함수
  getPosition = (index, row) => {
    let x = index % row;
    let y = parseInt(index / row);
    return {
      x,
      y
    };
  };
  /* 
    1 2 3 
    4 5 6 
    7 8 9
    5번의 좌표 1,1을 넣을경우 8방향의 좌표배열을 리턴하는 함수
  */
  getWay8List = ({ x, y, maxX, maxY }) => {
    let list = [];
    // x -1
    list.push({ x: x - 1, y: y - 1 });
    list.push({ x: x - 1, y: y });
    list.push({ x: x - 1, y: y + 1 });
    // x
    list.push({ x: x, y: y - 1 });
    list.push({ x: x, y: y + 1 });
    // x + 1
    list.push({ x: x + 1, y: y - 1 });
    list.push({ x: x + 1, y: y });
    list.push({ x: x + 1, y: y + 1 });
    list = list.filter(item => {
      if (item.x < 0) {
        return false;
      }
      if (item.x >= maxX) {
        return false;
      }
      if (item.y < 0) {
        return false;
      }
      if (item.y >= maxY) {
        return false;
      }
      return true;
    });
    return list;
  };

  initMakeMineList = (max = 100, mineCount = 10) => {
    let arr = [];
    while (arr.length < mineCount) {
      let r = Math.floor(Math.random() * max);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    arr.sort((a, b) => {
      return a - b;
    });
    return arr;
  };
  initMainDataList = ({ mineObj, row, column }) => {
    let list = [];
    let count = 0;
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < column; j++) {
        let item = this.initMakeCellData({ index: count, mineObj: mineObj });
        count++;
        row.push(item);
      }
      list.push(row);
    }
    return list;
  };
  //지뢰인지 판단
  isMine = (index, mineObj) => {
    return mineObj[index];
  };
  //셀 데이터 구조
  initMakeCellData = ({ index, mineObj, mineCount = 0 }) => {
    let isMine = this.isMine(index, mineObj);
    return {
      index,
      isMine: isMine ? isMine : false,
      mineCount,
      isHide: true,
      setMine: false
    };
  };
  checkVictory = () => {
    const { mainDataList } = this.state;
    let isVictory = true;
    mainDataList.forEach(row => {
      row.forEach(item => {
        if (item.isHide === true) {
          if (item.isMine && item.setMine) {
          } else {
            isVictory = false;
          }
        }
      });
    });
    if (isVictory === true) {
      this.victoryRef.current.play();
      this.setState({
        gameState: "victory"
      });
    }
  };
  onClickItem = (e, onClickItem) => {
    let { mainDataList, gameState } = this.state;
    let num = e.currentTarget.getAttribute("data");
    if (num === null) {
    }
    console.log("num", num);
    let position = this.getPosition(num, this.config.row);
    let target = mainDataList[position.y][position.x];
    if (gameState === "end" || gameState === "victory") {
      return;
    }

    if (target.setMine === true) {
      //폭탄설정 해제
      target.setMine = false;
    } else if (target.isMine) {
      //폭탄터짐 모든 폭탄 오픈
      mainDataList.forEach(row => {
        row.forEach(item => {
          if (item.isMine === true) {
            item.isHide = false;
          }
        });
      });
      this.setState({
        gameState: "end"
      });
      this.boomRef.current.play();
    } else if (target.mineCount !== 0) {
      //지뢰숫자오픈
      target.isHide = false;
      this.clickPlay();
    } else if (target.mineCount === 0) {
      //지뢰 카운트가 0이라서 주변 상자들오픈
      this.clickPlay();
      this.emptyOpen(target);
    }

    this.setState({ mainDataList }, () => {
      this.checkVictory();
    });
  };
  emptyOpen = target => {
    target.isHide = false;
    let { mainDataList } = this.state;
    let arr = this.getWay8List({
      x: target.x,
      y: target.y,
      maxX: this.config.column,
      maxY: this.config.row
    });
    arr.forEach(position => {
      let item = mainDataList[position.y][position.x];
      if (
        item.isHide === true &&
        item.isMine === false &&
        item.mineCount === 0
      ) {
        this.emptyOpen(item);
      } else {
        item.isHide = false;
      }
    });
    this.setState({ mainDataList });
  };
  clickPlay = () => {
    this.clickRef.current.play();
  };
  setMine = e => {
    e.preventDefault();
    const { mainDataList } = this.state;
    let num = e.currentTarget.getAttribute("data");
    let position = this.getPosition(num, this.config.row);
    let target = mainDataList[position.y][position.x];
    this.clickPlay();
    if (target.isHide === true) {
      target.setMine = !target.setMine;
      this.setState({ mainDataList: mainDataList }, () => {
        this.checkVictory();
      });
    }
  };

  cellText = item => {
    if (item.isHide === false) {
      if (item.isMine) {
        return (
          <img src={bombImg} alt="" style={{ width: "100%", height: "100%" }} />
        );
      }
      if (item.mineCount !== 0) {
        let color = {
          "1": "#4374D9",
          "2": "black",
          "3": "#FF0000",
          "4": "#005766",
          "5": "#005766",
          "6": "#005766",
          "7": "#005766",
          "8": "#005766"
        };
        return (
          <span style={{ color: color[item.mineCount], fontWeight: "bold" }}>
            {item.mineCount}
          </span>
        );
      } else {
        return "";
      }
    } else {
      if (item.setMine === true) {
        return (
          <img src={bombImg} alt="" style={{ width: "100%", height: "100%" }} />
        );
      }
      return "";
    }
  };
  retry = () => {
    const { victoryCount } = this.state;
    let state = this.initState();
    state.victoryCount = victoryCount;
    this.setState(state);
  };

  save = () => {
    this.getUserAddress(this.registSave);
  };

  getUserAddress = async callback => {
    let address = await IconexConnect.getAddress();
    if (callback) {
      setTimeout(() => {
        callback(address);
      }, 1000);
    }
  };

  registSave = async address => {
    //블록체인에 기록
    const txObj = this.getTxBuild({
      method: "setCount",
      params: {},
      from: address,
      to: Const.contractAddress
    });

    console.log("txObj", txObj);
    // from: address,
    const tx = await IconexConnect.sendTransaction(txObj);
    console.log("tx", tx);
    window.open(`https://tracker.icon.foundation/transaction/${tx}`);
    setTimeout(() => {
      this.getVictory(address);
    }, 3000);
  };

  getVictory = async address => {
    const result = await IconSDK.iconService
      .call(
        IconSDK.callBuild({
          method: "getCount",
          params: {},
          to: Const.contractAddress,
          from: address
        })
      )
      .execute();
    this.setState(
      {
        victoryCount: IconConverter.toNumber(result)
      },
      () => {
        this.retry();
      }
    );
  };
  load = () => {
    //몇승했는지 블러오기
    this.getUserAddress(this.getVictory);
  };
  render() {
    const { mainDataList, gameState, victoryCount } = this.state;
    return (
      <div>
        <div style={{ marginTop: 10, marginBottom: 20 }}>
          승리수 : {victoryCount}
        </div>
        <div
          className="main-container"
          onDragStart={e => {
            e.preventDefault();
            return false;
          }}
        >
          {mainDataList.map((rowList, index) => {
            return (
              <div key={index} className={classnames("main-row-container")}>
                {rowList.map((item, idx) => {
                  let num = index + idx;
                  return (
                    <div
                      key={idx}
                      className={classnames(
                        "main-row-item",
                        item.isHide ? "hide" : "open",
                        {
                          "main-row-item-even": num % 2 === 0,
                          "main-row-item-odd": num % 2 === 1
                        }
                      )}
                      data={item.index}
                      onClick={e => {
                        this.onClickItem(e, item);
                      }}
                      onContextMenu={this.setMine}
                    >
                      {this.cellText(item)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="button-container">
          {gameState === "victory" && (
            <button onClick={this.save}>블록체인에 기록하기</button>
          )}

          <button onClick={this.retry}>다시하기</button>

          {gameState !== "victory" && (
            <button onClick={this.load}>블러오기</button>
          )}
        </div>
        <video src={boom} ref={this.boomRef} />
        <video src={victory} ref={this.victoryRef} />
        <video src={clicksound} ref={this.clickRef} />
      </div>
    );
  }
}

export default Main;
