import { PrismaClient } from "@prisma/client";
// PrismaClient sınıfını "@prisma/client" paketinden içe aktarır. Bu sınıf, Prisma ORM ile veritabanı işlemlerini yapmak için kullanılır.

declare global {
    var prisma: PrismaClient | undefined;
}
// global ad alanında (namespace) `prisma` adında bir değişken tanımlar. Bu değişken ya `PrismaClient` türünde bir nesne ya da `undefined` olabilir. Bu, TypeScript'in global değişkeni tanıyabilmesi için yapılır.

export const db = global.prisma || new PrismaClient();
// Eğer global alanda `prisma` değişkeni tanımlıysa, onu `db` olarak kullanır; tanımlı değilse, yeni bir `PrismaClient` örneği oluşturur ve `db` olarak atar. Bu, her yerde aynı `PrismaClient` örneğini kullanmanızı sağlar ve uygulama boyunca bağlantı havuzlarını yönetmenizi kolaylaştırır.

if (process.env.NODE_ENV !== "production") global.prisma = db;
// Eğer uygulama üretim ortamında değilse (`NODE_ENV` üretim dışında bir değer ise), `prisma` değişkenini global alanda saklar. Bu, uygulamanın geliştirme ortamında çalışırken, her dosya yeniden yüklendiğinde yeni bir `PrismaClient` örneği oluşturulmasını önler. Böylece, veritabanı bağlantıları daha verimli bir şekilde yönetilir.
