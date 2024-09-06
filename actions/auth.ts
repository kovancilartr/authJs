"use server";
// Bu satır, bu dosyanın sunucu tarafında çalışacağını belirtir.

import { signIn, signOut } from "@/auth";
// Giriş ve çıkış işlemleri için gerekli fonksiyonları içe aktarır.

import { db } from "@/db";
// Veritabanı işlemleri için gerekli veritabanı bağlantısını içe aktarır.

import { AuthError } from "next-auth";
// NextAuth hata yönetimi için gerekli sınıfı içe aktarır.

import { revalidatePath } from "next/cache";
// Belirtilen yolu tekrar geçerli kılmak (revalidate) için gerekli fonksiyonu içe aktarır.

const getUserByEmail = async (email: string) => {
  // Veritabanından email ile kullanıcıyı bulmak için kullanılan fonksiyon
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
        // Kullanıcının email adresine göre arama yapar
      },
    });
    return user; // Bulunan kullanıcıyı geri döner
  } catch (error) {
    console.log(error); // Hata durumunda hatayı konsola yazdırır
    return null; // Hata durumunda null döner
  }
};

export const login = async (provider: string) => {
  // Sağlayıcıya (provider) göre kullanıcı girişi yapar
  await signIn(provider, { redirectTo: "/" });
  // Giriş başarılı olursa ana sayfaya yönlendirir

  revalidatePath("/");
  // Ana sayfa yolunu tekrar geçerli kılar (örneğin, kullanıcı durumu güncellenir)
};

export const logout = async () => {
  // Kullanıcı çıkışını yapar
  await signOut({ redirectTo: "/" });
  // Çıkış başarılı olursa ana sayfaya yönlendirir

  revalidatePath("/");
  // Ana sayfa yolunu tekrar geçerli kılar
};

export const loginWithCredentials = async (formData: FormData) => {
  // Kullanıcıyı email ve şifreyle giriş yapması için kimlik doğrulaması yapar
  const rawFormData = {
    email: formData.get("email"),
    // FormData'dan email değerini alır

    password: formData.get("password"),
    // FormData'dan şifre değerini alır

    role: "ADMIN",
    // Rolü "ADMIN" olarak belirler (duruma göre değiştirilebilir)

    redirectTo: "/",
    // Giriş başarılı olursa yönlendirilmesi gereken yolu belirtir
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);
  // Email ile veritabanında kullanıcı olup olmadığını kontrol eder
  console.log(existingUser);
  // Bulunan kullanıcıyı konsola yazdırır

  try {
    await signIn("credentials", rawFormData);
    // "credentials" sağlayıcısı kullanılarak kullanıcı giriş yapar
  } catch (error: any) {
    if (error instanceof AuthError) {
      // Hata NextAuth hatasıysa
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Giriş yapılamadı" };
        // Giriş yapılamazsa hata mesajı döner

        default:
          return { error: "Bir hata oluştu" };
        // Genel bir hata mesajı döner
      }
    }

    throw error;
    // Eğer hata başka bir türse hatayı yeniden fırlatır
  }

  revalidatePath("/");
  // Giriş başarılı olursa ana sayfa yolunu tekrar geçerli kılar
};
