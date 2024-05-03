import prisma from "@/app/libs/prismadb";

import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return undefined;
        }

        const currentUser = await prisma.user.findUnique({
          where: {
            email: session.user.email as string,
          }  
        });

        if (!currentUser) {
            return undefined;
        }

        return currentUser;
    } catch (error:any) {
        return undefined;
    }
}

export default getCurrentUser;