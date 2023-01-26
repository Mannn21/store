import * as HiIcons from 'react-icons/hi'
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'

const IconNavbar = [
    {
        title: "Wishlist",
        icon: <AiIcons.AiOutlineHeart className="icon"/>,
        cName: "navbar-icon",
        to: "/wishlist"
    },
    {
        title: "Cart",
        icon: <HiIcons.HiOutlineShoppingBag className="icon"/>,
        cName: "navbar-icon" ,
        to: "/cart"
    },
    {
        title: "Compare",
        icon: <AiIcons.AiOutlinePushpin className="icon"/>,
        cName: "navbar-icon",
        to: "/compare"
    },
    {
        title: "Message",
        icon: <AiIcons.AiOutlineMail className="icon"/>,
        cName: "navbar-icon",
        to: "/mail"
    },
    {
        title: "Account",
        icon: <MdIcons.MdOutlineAccountCircle className="icon"/>,
        cName: "navbar-icon",
        to: "/user"
    },
]

export default IconNavbar