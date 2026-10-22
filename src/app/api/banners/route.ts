import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const where = session ? {} : { active: true };

    const banners = await prisma.banner.findMany({
      where,
      orderBy: { sortOrder: "asc" }
    });

    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, image, imageUrl, ctaText, ctaLink, active, sortOrder, order } = body;

    const banner = await prisma.banner.create({
      data: {
        title: title || "",
        subtitle: subtitle || null,
        image: image || imageUrl || null,
        ctaText: ctaText || null,
        ctaLink: ctaLink || null,
        active: active ?? true,
        sortOrder: sortOrder ?? order ?? 0,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
