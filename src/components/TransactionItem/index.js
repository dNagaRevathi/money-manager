import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {title, amount, type, id} = transactionDetails
  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }
  return (
    <li className="list-item">
      <p className="title-value">{title}</p>
      <p className="title-value">Rs {amount}</p>
      <p className="title-value">{type}</p>
      <button type="button" onClick={onDeleteTransaction}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
