This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Projede Kullanılan Teknolojiler
    - NextJs
    - Prisma
    - MongoDB
    - Tailwind
    - React
    - NextAuth
# Prejede Kurulan Kütüphaneler
    - next-auth
    - bcryptjs
    - mongodb
    - prisma
    - react-icons

# Kütüphaneleri kurarken ve yapılan işlemlerde kullanılan komutlar
    - npn i @prisma/client
    - npn i @auth/prisma-adapter
    - npn i @auth/mongodb-adapter
    - npn i mongodb
    - npn i bcryptjs
    - npn i @types/bcryptjs
    - npn i react-icons
    - npn i prisma --save-dev
    - npn i next-auth@beta
    - npx auth secret ----> Auth Secret Key Oluşturmak İçin
    - npx prisma init ----> Prisma ile ilgili yapılandırma dosyası oluşturmak İçin
    - npx prisma generate ------> Prisma ile ilgili oluşturulan şemaları oluşturmak İçin
    - npx prisma db push ------> Prisma ile oluşturulanları veritabanına kaydetmek İçin


    


Prisma Şema Kodları:

```bash
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN
  USER
}

model User {
  id            String          @id @default(auto()) @map("_id") @db.ObjectId
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  role          UserRole?        @default(USER)
  // Optional for WebAuthn support
  Authenticator Authenticator[]
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@unique([provider, providerAccountId])
}
 
model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  sessionToken String   @unique
  userId       String   @db.ObjectId
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String
  expires    DateTime
 
  @@unique([identifier, token])
}
 
// Optional for WebAuthn support
model Authenticator {
  credentialID         String  @id @map("_id")
  userId               String  @db.ObjectId
  providerAccountId    String
  credentialPublicKey  String
  counter              Int
  credentialDeviceType String
  credentialBackedUp   Boolean
  transports           String?
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@unique([userId, credentialID])
}
```

## ENV Şablonu
```bash
AUTH_SECRET="npx auth secret ile oluşturulan bir şifre"
DATABASE_URL="MongoDB ile oluşturulan veritabanı URL'si"
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

### Prisma Şema Güncelleme
Prismada şemayı güncellemek için aşağıdaki komutları çalıştırınız.
```bash
npx prisma generate
npx prisma db push
```