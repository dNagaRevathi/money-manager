import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balanceInput: 0,
    incomeInput: 0,
    expensesInput: 0,
    titleInput: '',
    amountInput: '',
    activeId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  moneyDetail = () => {
    const {balanceInput, incomeInput, expensesInput} = this.state
    const moneyCollection = {
      balance: balanceInput,
      income: incomeInput,
      expense: expensesInput,
    }
    return moneyCollection
  }

  onChangeOption = event => {
    this.setState({activeId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, activeId} = this.state
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: activeId,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
    }))
    if (activeId === 'INCOME') {
      this.setState(prevState => ({
        incomeInput: prevState.incomeInput + parseInt(amountInput),
      }))
      this.setState(prevState => ({
        balanceInput: prevState.balanceInput + parseInt(amountInput),
      }))
    }
    this.setState(prevState => ({
      expensesInput: prevState.expensesInput + parseInt(amountInput),
    }))
    this.setState(prevState => ({
      balanceInput: prevState.balanceInput - parseInt(amountInput),
    }))
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const filteredTransaction = transactionList.filter(each => each.id === id)
    const filtered = filteredTransaction[0]
    if (filtered.type === 'INCOME') {
      this.setState(prevState => ({
        incomeInput: prevState.incomeInput - parseInt(filtered.amountInput),
      }))
      this.setState(prevState => ({
        balanceInput: prevState.balanceInput - parseInt(filtered.amountInput),
      }))
    } else {
      this.setState(prevState => ({
        expensesInput: prevState.expensesInput - parseInt(filtered.amountInput),
      }))
      this.setState(prevState => ({
        balanceInput: prevState.balanceInput - parseInt(filtered.amountInput),
      }))
    }
    this.setState(prevState => ({
      transactionList: prevState.transactionList.map(each => each.id !== id),
    }))
  }

  render() {
    const {titleInput, amountInput, activeId, transactionList} = this.state
    return (
      <div className="app-container">
        <div className="app-header">
          <h1 className="head">Hi, Richard</h1>
          <p className="describe">
            Welcome back to your <span className="account">Money Manager</span>{' '}
          </p>
        </div>
        <MoneyDetails moneyDetail={this.moneyDetail} />
        <div className="transaction-footer">
          <form className="form-container" onSubmit={this.onAddTransaction}>
            <h1 className="heading2">Add Transaction</h1>
            <label htmlFor="title" className="label-text">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              placeholder="TITLE"
              className="input"
              value={titleInput}
            />
            <label htmlFor="amount" className="label-text">
              AMOUNT
            </label>
            <input
              type="text"
              id="amount"
              placeholder="AMOUNT"
              className="input"
              value={amountInput}
            />
            <label htmlFor="type" className="label-text">
              TYPE
            </label>
            <select
              className="option-select"
              value={activeId}
              onChange={this.onChangeOption}
            >
              {transactionTypeOptions.map(eachTransaction => (
                <option
                  key={eachTransaction.optionId}
                  value={eachTransaction.optionId}
                  className="option"
                >
                  {eachTransaction.displayText}
                </option>
              ))}
            </select>
            <div>
              <button type="submit" className="button">
                Add
              </button>
            </div>
          </form>
          <div className="history-container">
            <h1 className="heading2">History</h1>
            <div className="heading-container">
              <p className="salary">Title</p>
              <p className="salary">Amount</p>
              <p className="salary">Type</p>
            </div>
            <ul className="transaction-container">
              {transactionList.map(each => (
                <TransactionItem
                  key={each.id}
                  transactionDetails={each}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
