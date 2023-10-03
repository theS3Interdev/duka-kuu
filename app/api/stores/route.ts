import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/utils/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    /* destructure name from body */
    const { name } = body;

    /* check if the user has been authenticated */
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /* check if the user has input a store name */
    if (!name) {
      return new NextResponse("The e-commerce store must have a name", {
        status: 400,
      });
    }

    /* create a new store */
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
