import * as AiIcons from 'react-icons/ai'
import image1 from '../assets/product1.png'
import image2 from '../assets/product2.png'
import image3 from '../assets/product3.png'

const TableData = [
    {
        image: image1,
        title: "Product 1",
        Price: 10.21,
        action: <AiIcons.AiOutlineClose className='delete-icon'/>
    },
    {
        image: image2,
        title: "Product 2",
        Price: 30.32,
        action: <AiIcons.AiOutlineClose className='delete-icon'/>
    },
    {
        image: image3,
        title: "Product 3",
        Price: 14.87,
        action: <AiIcons.AiOutlineClose className='delete-icon'/>
    }
]

export default TableData