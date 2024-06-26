import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
async authorize(credentials) {
    if (!credentials) {
        throw new Error("Credentials are undefined");
    }

    if (!credentials.email || !credentials.password) {
        throw new Error("Missing credentials");
    }

    const user = await prisma.user.findUnique({
        where: {email: credentials.email}
    });

    if (!user || !user?.hashedPassword) {
        throw new Error("Invalid credentials");
    }

    const isCorrectPassword = await bcrypt.compare(
        credentials.password, 
        user.hashedPassword
    );

    if (!isCorrectPassword) {
        throw new Error("Invalid credentials");
    }

    return user;

}})
],
debug: process.env.NODE_ENV === "development",
session: {
    strategy: "jwt",
},
secret: process.env.NEXTAUTH_SECRET,
}
