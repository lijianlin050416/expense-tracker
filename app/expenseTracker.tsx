import { useEffect, useState } from "react"
interface listItem {
  id: number,
  text: string,
  amount: number
}

export function useExpenseTracker() {
  const [amount, setAmount] = useState(0)
  const [historyList, setHistoryList] = useState<listItem[]>([])
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  function addItem(item: listItem) {
    item.id = historyList.length + 1
    item.amount = parseFloat(item.amount.toFixed(2))
    setHistoryList(prevList => [...prevList, item])
    if (item.amount >= 0) sumIncome(item.amount)
    else sumExpense(item.amount)
    sumTotal(item.amount)
  }

  function removeItem(item: listItem) {
    item.amount = parseFloat(item.amount.toFixed(2))
    setHistoryList(prevList => prevList.filter(thing => thing.id !== item.id))
    if (item.amount >= 0) sumIncome(-item.amount)
    else sumExpense(-item.amount)
    sumTotal(-item.amount)
  }

  function sumIncome(num: number) {
    setIncome(prevIncome => parseFloat((prevIncome + num).toFixed(2)))
  }

  function sumExpense(num: number) {
    setExpense(prevExpense => parseFloat((prevExpense + num).toFixed(2)))
  }

  function sumTotal(num: number) {
    setAmount(prevAmount => parseFloat((prevAmount + num).toFixed(2)))
  }

  const [liItem, setLiItem] = useState(historyList.map(item => {
    return <li key={item.id}>
      <p>{item.text}</p>
      <p>{item.amount}</p>
    </li>
  }))

  useEffect(() => {
    setLiItem(historyList.map(item => {
      return <li key={item.id} onClick={() => removeItem(item)}>
        <p>{item.text}</p>
        <p className={item.amount < 0 ? "red" : "green"}>${item.amount}</p>
      </li>
    }))
  }, [historyList])

  return {
    amount,
    historyList,
    income,
    expense,
    addItem,
    removeItem,
    liItem
  }
}