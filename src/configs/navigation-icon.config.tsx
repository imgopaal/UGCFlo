import { Inbox } from 'lucide-react'
import { LuBoxes } from 'react-icons/lu'
import { MdOutlineShoppingCart } from "react-icons/md";
import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone
} from 'react-icons/pi'
import { LiaFileContractSolid } from "react-icons/lia";

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    flos: <LuBoxes />,
    inbox: <Inbox />,
    orders: <MdOutlineShoppingCart />,
    contracts: <LiaFileContractSolid />,
    singleMenu: <PiAcornDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />
}

export default navigationIcon
