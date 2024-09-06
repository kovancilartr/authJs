import LoginForm from "@/components/LoginForm";
import LoginGithub from "@/components/LoginGithub";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex justify-center bg-black bg-opacity-65">
      <section className="flex flex-col w-[450px] justify-center">
        <div className="border-2 border-gray-800 rounded-md p-6 shadow-lg bg-gray-800 bg-opacity-80 pb-16">
          <h1 className="text-3xl w-full text-center font-bold mb-6 shadow-lg">
            Giriş Yap
          </h1>
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default SignIn;
