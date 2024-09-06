import { NextResponse } from "next/server";
import { db } from "@/db"; // Prisma Client'i içe aktarır
import { auth } from "@/auth"; // auth fonksiyonunu içe aktarır

export const GET = auth(async function GET(req) {
  // İstek doğrulanmışsa
  if (req.auth) {
    try {
      // Veritabanından tüm kullanıcıları al
      const users = await db.user.findMany(); // Prisma Client ile tüm kullanıcıları alır

      // Kullanıcıları JSON formatında döndür
      return NextResponse.json(users);
    } catch (error) {
      console.error("Veritabanı hatası:", error);
      return NextResponse.json(
        { message: "Veritabanı hatası" },
        { status: 500 }
      );
    }
  }

  // Eğer istek doğrulanmamışsa
  return NextResponse.json({ message: "Bu API'den veri almak için giriş yapılmalıdır" }, { status: 401 });
});
