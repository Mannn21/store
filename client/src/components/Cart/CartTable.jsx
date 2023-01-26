import React, {useState} from "react"
import TableHead from "../../datas/TableHead"
import TableData from "../../datas/TableData"
import '../../styles/components/CartTable.css'

const CartTable = () => {
    const [count, setCount] = useState(1)

    const decrement = () => {
        return(
            setCount(count-1)
        )
    }

    const increment = () => {
        return(
            setCount(count+1)
        )
    }



    const Head = () => {
        return(
            TableHead.map((item, index) => {
                return(
                    <th className={item.cName} key={index}>{item.title}</th>
                )
            })
        )
    }

    const Data = () => {
        return(
            TableData.map((item, index) => {
                return(
                    <tr key={index} className="row-data">
                        <td className="cart-image-wrapper">
                            <div className="cart-image-background">
                                <img src={item.image} alt={item.title} className="cart-image"/>
                            </div>
                        </td>
                        <td className="cart-title">{item.title}</td>
                        <td className="cart-qty">
                            <div className="cart-quantity">
                                <span onClick={() => decrement()}>-</span>
                                {count}
                                <span onClick={() => increment()}>+</span>
                            </div>
                        </td>
                        <td className="cart-price">$ {item.Price}</td> 
                        <td className="cart-total">$ {item.Price * count}</td>
                        <td className="cart-action">{item.action}</td>
                    </tr>
                )
            })
        )
    }


    return(
        <div className="cart-table">
            <table className="cart-table-wrapper" border={1}>
                <thead>
                    <tr className="row-head">
                        <Head />
                    </tr>
                </thead>
                <tbody>
                    <Data />
                </tbody>
            </table>
        </div>
    )
}

export default CartTable