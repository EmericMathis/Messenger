import {useMemo} from "react"
import {useParams, usePathname} from "next/navigation"
import { HiChat, HiArrowLeft, HiUsers } from "react-icons/hi"
import { signOut } from "next-auth/react"

import useConversation from "./useConversation"

const useRoutes = () => {
    const pathname = usePathname()
    const {conversationId} = useConversation()

    const routes = useMemo(() => [
    {
        label:'Chat',
        href: '/conversations',
        icon: HiChat,
        active:pathname === '/conversations' || !!conversationId
    },
    {
        label:'Users',
        href: '/users',
        icon: HiUsers,
        active:pathname === '/users'
    },
    {
        label:'Logout',
        href:"#",
        onClick: ()=> signOut(),
        icon: HiArrowLeft,
    }
], [pathname, conversationId])

return routes

}

export default useRoutes;