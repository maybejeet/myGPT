"use server";

import { currentUser } from "@clerk/nextjs/server";
import {prisma} from "@/lib/db"
import type { User } from "@/lib/generated/prisma/client";

export async function onBoard(){
    const clerkUser = await currentUser();

    if(!clerkUser){
        throw new Error("No clerk user found")
    }

    const email = clerkUser.emailAddresses[0].emailAddress;
    const firstName = clerkUser.firstName;
    const lastName = clerkUser.lastName;
    const imageUrl = clerkUser?.imageUrl;
    const createdAt = new Date(clerkUser.createdAt);
    const updatedAt = new Date(clerkUser.updatedAt);

    //upsert: to update, if does not exist then create
    return prisma.user.upsert({   
        where : {clearId : clerkUser.id},
        create: {
            clearId: clerkUser.id,
            email,
            firstName,
            lastName,
            imageUrl,
            createdAt,
            updatedAt
        },
        update: {
            email,
            firstName,
            lastName,
            imageUrl,
            updatedAt
        }
    }) 


}