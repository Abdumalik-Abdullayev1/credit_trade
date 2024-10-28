import { FaCartShopping, FaSackDollar } from "react-icons/fa6";
import { GrDropbox } from "react-icons/gr";
import { ImBooks } from "react-icons/im";
import { FaExchangeAlt, FaHome } from "react-icons/fa";


const user = [
    {
        content: "Home",
        path: "/user-layout",
        icon: <FaHome/>
    },
    {
        content: "Product",
        path: "/user-layout/product",
        icon: <GrDropbox />
    },
    {
        content: "Exchange",
        path: "/user-layout/exchange",
        icon: <FaExchangeAlt />
    },
    {
        content: "Contract",
        path: "/user-layout/contract",
        icon: <ImBooks />
    },
    {
        content: "Transaction",
        path: "/user-layout/transaction",
        icon: <FaSackDollar />
    },
    {
        content: "Cart",
        path: "/user-layout/cart",
        icon: <FaCartShopping />
    }
]

export { user }