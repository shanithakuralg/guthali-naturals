import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalProducts,
      totalBlogPosts,
      unreadMessages,
      activeCoupons,
      categoriesWithCount,
      recentMessages,
      messages
    ] = await Promise.all([
      prisma.product.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.coupon.count({ where: { active: true } }),
      prisma.category.findMany({
        include: {
          _count: { select: { products: true } }
        }
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" }
      }),
      prisma.contactMessage.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 5)) // last 6 months including current
          }
        },
        select: { createdAt: true }
      })
    ]);

    const productsPerCategory = categoriesWithCount.map(cat => ({
      name: cat.name,
      count: cat._count.products
    }));

    // Calculate messages per month
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return {
        month: d.toLocaleString('default', { month: 'short' }),
        year: d.getFullYear(),
        count: 0
      };
    }).reverse();

    messages.forEach(msg => {
      const monthStr = msg.createdAt.toLocaleString('default', { month: 'short' });
      const year = msg.createdAt.getFullYear();
      const monthObj = months.find(m => m.month === monthStr && m.year === year);
      if (monthObj) {
        monthObj.count++;
      }
    });

    const messagesPerMonth = months.map(({ month, count }) => ({ month, count }));

    return NextResponse.json({
      totalProducts,
      totalBlogPosts,
      unreadMessages,
      activeCoupons,
      productsPerCategory,
      messagesPerMonth,
      recentMessages
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
