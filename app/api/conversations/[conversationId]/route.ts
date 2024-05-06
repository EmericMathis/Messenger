import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    try {
        const {conversationId} = params;
        const currentUser = await getCurrentUser()

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if (!existingConversation) {
            return new NextResponse("Invalid ID", {status: 404})
        }

        // Vérifier si l'utilisateur actuel fait partie de la conversation
        const isUserPartOfConversation = existingConversation.users.some(user => user.id === currentUser.id);
        if (!isUserPartOfConversation) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        // Supprimer tous les messages liés à la conversation
        await prisma.message.deleteMany({
            where: {
                conversationId: conversationId,
            }
        });

        // Supprimer la conversation
        const deletedConversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
            }
        });

        return NextResponse.json(deletedConversation)
    } catch (error:any) {
        console.log(error, 'ERROR_CONVERSATION_DELETE');
        return new NextResponse("Something went wrong", {status: 500})
    }
}