'use client'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Chat from "@/app/dashboard/chat"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter();

  const LogOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push('/');
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      alert("No autorizado. Inicia sesión antes")
      router.push('/');
    }
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] min-h-screen">
      <section className="flex items-center">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-xl">
              Bienvenid@, {localStorage.getItem('nameActiveUser')}
              <Badge className="bg-green-600 w-fit">En vivo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <iframe
                width="1080"
                height="610"
                src="https://www.youtube.com/embed/Xk33QyjSIl0?si=XJ1cs4V8d5vKnRNd"
                title="DeepSeek R1: genial para startups, malo para Silicon Valley"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"></iframe>
              <Chat />
            </div>
          </CardContent>
          <Button className="mx-6 mb-4" onClick={LogOut}>Cerrar sesión</Button>
        </Card>
      </section>
    </main>
  )
}