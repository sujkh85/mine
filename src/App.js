import React from 'react';
import './App.css';
import Main from './component/Main'

class App extends React.PureComponent{
  render(){
    return(
      <div className="main-page-wrapper">
        <div className="page-container_header">
          지뢰찾기    
        </div>
        <div style={{paddingLeft:30,color:'#507e26'}}>승리시 블록체인에 기록할수있습니다.</div>
        <div style={{paddingLeft:30, color:'#507e26'}}>불러오기로 몇승했는지 로드할수있습니다.</div>
        <div className="main-page-container">
          <div className="page-container_content">
            <Main />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
