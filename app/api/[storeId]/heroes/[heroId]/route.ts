import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/utils/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { heroId: string } },
) {
  try {
    if (!params.heroId) {
      return new NextResponse("The hero id is required.", { status: 400 });
    }

    const hero = await prismadb.hero.findUnique({
      where: {
        id: params.heroId,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_GET]", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { heroId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated.", { status: 401 });
    }

    if (!params.heroId) {
      return new NextResponse("The hero id is required.", { status: 400 });
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

    const hero = await prismadb.hero.delete({
      where: {
        id: params.heroId,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_DELETE]", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { heroId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated.", { status: 401 });
    }

    if (!label) {
      return new NextResponse("The label is required.", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("The image url is required.", { status: 400 });
    }

    if (!params.heroId) {
      return new NextResponse("The hero id is required.", { status: 400 });
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

    const hero = await prismadb.hero.update({
      where: {
        id: params.heroId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_PATCH]", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
