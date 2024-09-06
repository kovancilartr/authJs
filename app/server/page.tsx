import { auth } from "@/auth";
// auth fonksiyonunu içe aktarır. Bu fonksiyon, kullanıcı oturumunu doğrulamak için kullanılır.

import { redirect } from "next/navigation";
// redirect fonksiyonunu içe aktarır. Bu fonksiyon, belirli bir URL'ye yönlendirme yapmak için kullanılır.

import React from "react";
// React kütüphanesini içe aktarır. React bileşenlerini oluşturmak için gereklidir.

const Server = async () => {
  // Asenkron bir React bileşeni tanımlar. Bu bileşen, sunucu tarafında çalışacak ve kullanıcı oturumunu kontrol edecektir.

  const session = await auth();
  // Kullanıcının oturum bilgilerini almak için auth fonksiyonunu çağırır. Bu, kullanıcının giriş yapıp yapmadığını kontrol etmek için gereklidir.

  if (!session?.user) {
    redirect("/sign-in");
    // Eğer kullanıcı oturum açmamışsa (session.user yoksa), kullanıcıyı "/sign-in" sayfasına yönlendirir.
  }

  return (
    <main className="flex h-full items-center justify-center flex-col gap-2">
      {/* Sayfanın ana içeriğini oluşturur. flex, h-full, items-center, justify-center, flex-col ve gap-2 sınıfları ile esnek bir düzen oluşturur ve içeriği sayfanın ortasında dikey olarak hizalar. */}
      <h1 className="text-3xl">Server Sayfası</h1>
      {/* Sayfa başlığını "Server Sayfası" olarak belirler ve metni 3xl boyutunda yapar. */}
      <p className="text-lg">{session?.user?.email}</p>
      {/* Kullanıcının email adresini gösterir. Eğer session.user varsa, email adresini metin olarak döner; yoksa bu satır gösterilmez. */}
    </main>
  );
};

export default Server;
// Server bileşenini varsayılan olarak dışa aktarır.
