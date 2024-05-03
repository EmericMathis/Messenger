import getConversations from "../actions/getConversation"
import SideBar from "../components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations();
    return (
        <SideBar>
            <div className="h-full">
                <ConversationList
                    initalItems={conversations}
                />
                {children}
            </div>
        </SideBar>
    )
}