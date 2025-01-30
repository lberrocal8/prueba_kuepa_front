import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import LoginForm from "@/app/login/page"
import RegisterForm from "@/app/register/page"

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 items-center justify-center min-h-screen">
        <Tabs defaultValue="singin" className="w-[300px] h-[300px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="singin">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="singup">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="singin">
            <LoginForm />
          </TabsContent>
          <TabsContent value="singup">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
