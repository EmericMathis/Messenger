"use client"

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { MdFactCheck } from "react-icons/md";
import { FaCheck, FaCheckDouble } from 'react-icons/fa';




//? clsx c'est une librairie qui permet de combiner des classes css conditionnellement

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}


const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {
    const session = useSession();

    if (!data) {
        return null; // ou retourner un composant de chargement ou une autre chose
    }

    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ')

    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    );


    const avatar = clsx(isOwn && "order-2")

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )

    return (
        <div className={container}>
            <div className={avatar}>

                {/* avatar de l'envoyeur */}
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500"></div>

                    {/* Nom de l'envoyeur */}
                    {data.sender.name}
                    <div className="text-xs text-gray-40">

                        {/* Heure de l'envoi du message */}
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className="flex items-end gap-1">
                    <div className={message} >

                        {/* image de profil envoyée si il y'en a une */}
                        {data.image ? (
                            <Image
                                alt="image"
                                height={288}
                                width={288}
                                src={data.image}
                                className="object-cover cursor-pointer hover:scale-110 transition translate" />
                        ) : (
                            <div>{data.body}</div>
                        )}

                    </div>
                    <div className="text-xs font-light text-gray-500">
                        {isLast && isOwn && (
                            !seenList ? <FaCheck /> : <FaCheckDouble />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;