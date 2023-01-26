import CategoriesProduct from "../datas/CategoryProduct"
import ColorProduct from "../datas/ColorProduct"
import SizeProduct from "../datas/SizeProduct"

export const Categories = () => {
    return (
        CategoriesProduct.map((item, index) => {
            return(
                    <div className='radio-item' key={index}>
                        <input type="radio" name='category' id={`${item}-${index}`}/>
                        <label for={`${item}-${index}`}>{item}</label>
                    </div>
            )
        })
    )
}

export const Color = () => {
    return (
        ColorProduct.map((item, index) => {
            return(
                    <div className='radio-item' key={index}>
                        <input type="radio" name='color' id={`${item}-${index}`}/>
                        <label for={`${item}-${index}`}>{item}</label>
                    </div>
            )
        })
    )
}

export const Size = () => {
    return (
        SizeProduct.map((item, index) => {
            return(
                    <div className='radio-item' key={index}>
                        <input type="radio" name='size' id={`${item}-${index}`}/>
                        <label for={`${item}-${index}`}>{item}</label>
                    </div>
            )
        })
    )
}
