import bcrypt from "bcryptjs";
// bcryptjs kütüphanesini içe aktarır. Bu kütüphane, şifrelerin güvenli bir şekilde hash'lenmesi ve doğrulanması için kullanılır.

export function saltAndHashPassword(password: any) {
    // Şifreyi salt ekleyerek hash'lemek için bir fonksiyon tanımlar.

    const saltRounds = 10;
    // Salt oluşturmak için kaç tur yapılacağını belirler. Daha fazla tur, daha güçlü bir hash üretir, ancak daha uzun süre alır.

    const salt = bcrypt.genSaltSync(saltRounds);
    // Senkronize olarak salt oluşturur. Salt, şifreye eklenen rastgele bir değer olup, aynı şifrenin her seferinde farklı bir hash ile sonuçlanmasını sağlar.

    const hash = bcrypt.hashSync(password, salt);
    // Verilen şifreyi, oluşturulan salt ile hash'ler. Bu işlem, şifreyi geri döndürülemez bir şekilde şifreler.

    return hash;
    // Hash'lenmiş şifreyi geri döner. Bu hash, veritabanında saklanacak ve kullanıcı giriş yaparken doğrulama için kullanılacak.
}
