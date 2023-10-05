import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/utils/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated.", { status: 401 });
    }

    if (!label) {
      return new NextResponse("The label is required.", {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new NextResponse("The image url is required.", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse("The store id is required.", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized.", { status: 403 });
    }

    const hero = await prismadb.hero.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HEROES_POST]", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse("The store id is required.", { status: 400 });
    }

    const heroes = await prismadb.hero.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(heroes);
  } catch (error) {
    console.log("[HEROES_GET]", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
