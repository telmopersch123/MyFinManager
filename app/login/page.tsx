import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "../_components/ui/button";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid min-h-screen grid-cols-2 bg-gradient-to-br from-[#0C0A09] to-[#0C0A09]">
      <div className="max-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <div className="absolute z-20 w-auto rounded-lg bg-black bg-opacity-40 p-8 backdrop-blur-sm sm:relative sm:bg-transparent sm:p-0">
          <Image
            src="/logo.png"
            width={140}
            height={39}
            alt="MyFinManager"
            className="mb-8 opacity-90"
          />
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white">
            Bem-vindo ao MyFinManager
          </h1>
          <p className="text-shadow-md mb-8 text-lg leading-relaxed text-white sm:text-gray-300">
            Uma plataforma de gestão financeira com IA para monitorar suas
            movimentações, oferecer insights personalizados e simplificar o
            controle do seu orçamento.
          </p>
          <SignInButton>
            <Button
              className="duration-900 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-white shadow-md transition-colors hover:bg-indigo-700 sm:w-[250px]"
              variant="outline"
            >
              <LogInIcon className="h-5 w-5" />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        </div>
      </div>

      <div className="relative h-full w-full">
        <div className="absolute z-10 h-full w-10 bg-gradient-to-r from-[#0C0A09] to-transparent"></div>
        <Image
          src="/login.jpeg"
          alt="Faça Login"
          className="h-full w-full object-cover"
          fill
          priority
        />
      </div>
    </div>
  );
};

export default LoginPage;
