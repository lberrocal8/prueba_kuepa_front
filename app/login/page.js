'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Debe tener al menos 2 caracteres de longitud.",
    })
    .max(200, {
      message: "No debe tener más de 200 caracteres de longitud.",
    }),
  password: z
    .string()
    .min(2)
    .max(12),
})

export default function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const loginUser = (data) => {
    setIsLoading(true);
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Credenciales incorrectas');
        }
        return response.json();
      })
      .then((result) => {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Redirigiendo...",
        })
        localStorage.setItem('nameActiveUser', result.user.name);
        localStorage.setItem('activeUserName', result.user.username);
        localStorage.setItem('activeUserType', result.user.usertype);
        sessionStorage.setItem('token', result.token);
        router.push('/dashboard')
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error al iniciar sesión",
        })
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function onSubmit(values) {
    loginUser(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su nombre de usuario registrado..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña registrada..."
                    className="pr-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}