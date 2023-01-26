import React, {useState} from "react";
import Card from "./Card";
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'
import '../../styles/components/Products.css'

const Product = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSelect, setIsSelect] = useState('Default')
    
    const select = ["Default", "Low - High", "High - Low"]


    return (
        <div className="product-page">
            <div className="select">
                <div className="dropdown-wrapper">
                    <div className="dropdown">
                        <span className="sort">Sort As : </span>
                        <button className={(isOpen ? 'input active':'input')} onClick={() => setIsOpen(!isOpen)}>
                            <span>{isSelect}</span>
                            <MdIcons.MdExpandMore />
                        </button>
                    </div>
                    <div className={(isOpen ? 'menu open':'menu close')}>
                        <button onClick={() => {
                            setIsSelect(select[0])
                            setIsOpen(!isOpen)
                            }}>
                            <span>{select[0]}</span>
                        </button>
                        <button onClick={() => {
                            setIsSelect(select[1])
                            setIsOpen(!isOpen)
                            }}>
                            <span>{select[1]}</span>
                            <AiIcons.AiOutlineArrowUp />
                        </button>
                        <button onClick={() => {
                            setIsSelect(select[2])
                            setIsOpen(!isOpen)
                            }}>
                            <span>{select[2]}</span>
                            <AiIcons.AiOutlineArrowDown />
                        </button>
                    </div>
                </div>
            </div>

            <div className={(isOpen ? 'cards open':'cards')}>
                <div className="card-wrapper">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Product