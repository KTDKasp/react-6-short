import React from 'react'
import axios from 'axios';
import { Block } from './Block';

import './App.scss'

type RatesType = {[key: string]: number};
export const App: React.FC = () => {
  const ratesRef = React.useRef<RatesType>({});

  const [fromCurrency, setFromCurrency] = React.useState<string>('RUB');
  const [toCurrency, setToCurrency] = React.useState<string>('USD');
  const [fromValue, setFromValue] = React.useState<string>('0');
  const [toValue, setToValue] = React.useState<string>('0');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('https://www.cbr-xml-daily.ru/latest.js');
        ratesRef.current = ({...data.rates, "RUB": 1});
        onChangeToPrice("1");
      } catch (error) {
        console.log(`Hey, you have error: ${error}`);
      }
    }
    fetchData();    
  }, [])

  const onChangeFromPrice = (value: string) => {
    const price = Number(value) * ratesRef.current[toCurrency];
    const result = price / ratesRef.current[fromCurrency];
    setFromValue(value);
    setToValue(result.toString());
  }

  const onChangeToPrice = (value: string) => {
    const price = Number(value) / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setToValue(value);
    setFromValue(result.toString());
  }

  React.useEffect(() => {
    onChangeFromPrice(fromValue)
  }, [fromCurrency])

  React.useEffect(() => {
    onChangeToPrice(toValue)
  }, [toCurrency])

  return (
    <div className="App">
      <Block value={fromValue} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toValue} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  )
};
