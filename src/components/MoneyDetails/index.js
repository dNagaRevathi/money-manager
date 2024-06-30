import './index.css'

const MoneyDetails = props => {
  const {balanceInput, incomeInput, expensesInput} = props
  console.log(balanceInput)
  return (
    <div className="money-details-container">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="balance"
        />
        <div>
          <p className="heading">Your Balance</p>
          <p className="money" data-testid="balanceAmount">
            Rs {balanceInput}
          </p>
        </div>
      </div>
      <div className="income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="income"
        />
        <div>
          <p className="heading">Your Income</p>
          <p className="money" data-testid="incomeAmount">
            Rs {incomeInput}
          </p>
        </div>
      </div>
      <div className="expense-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="expense"
        />
        <div>
          <p className="heading">Your Expenses</p>
          <p className="money" data-testid="expensesAmount">
            Rs {expensesInput}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
