import React from 'react'
import { Categories, Color, Size } from '../../utils/Sorting'
import '../../styles/components/Sidebar.css'

const Sidebar = () => {
   
    return (
        <div className="sidebar">
            <div className="search-sidebar-wrapper">
                <h2>Search Items</h2>
                <input type="text" placeholder='Search...' className='search-input'/>
            </div>
            <div className="category-sidebar-wrapper">
                <h2>Categories</h2>
                <div className="categories">
                    <Categories />
                </div>
            </div>
            <div className="color-sidebar-wrapper">
                <h2>Color</h2>
                <div className="colors">
                    <Color />
                </div>
            </div>
            <div className="size-sidebar-wrapper">
                <h2>Size</h2>
                <div className="sizes">
                    <Size />
                </div>
            </div>
        </div>
    )
}


export default Sidebar