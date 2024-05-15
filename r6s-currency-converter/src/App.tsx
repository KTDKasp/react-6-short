import React from 'react'
import './App.scss'
import { Block } from './Block';

export const App: React.FC = () => {

  return (
    <div className="App">
      <Block value={0} currency="RUB" onChangeCurrency={(cur) => console.log(cur)} />
      <Block value={0} currency="USD" />
    </div>
  )
};
