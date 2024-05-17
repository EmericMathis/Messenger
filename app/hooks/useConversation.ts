import { useParams } from "next/navigation"
import { useMemo } from "react"

const useConversation = () => {
    const params = useParams()

    const conversationId = useMemo(() => {
        // Ajoutez une vérification pour s'assurer que params n'est pas null
        if (!params || !params.conversationId) {
            return ""
        }

        return params.conversationId as string;
    }, [params])

    const isOpen = useMemo(() => !!conversationId, [conversationId])

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId])
}

export default useConversation