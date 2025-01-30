'use client'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Debe tener al menos 2 caracteres de longitud.",
    }).max(200, {
      message: "No debe tener más de 200 caracteres de longitud.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Debe tener al menos 2 caracteres de longitud.",
    }).max(200, {
      message: "No debe tener más de 200 caracteres de longitud.",
    }),
  password: z
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .max(20, "No debe superar los 20 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[@$!%*?_&-]/, "Debe contener al menos un carácter especial (@$!%*?&)"),
  usertype: z.string({
    required_error: "Debe escoger un tipo de usuario",
  }),
})

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      usertype: "",
    },
  })

  const registerUser = (data) => {
    setIsLoading(true);
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
      .then((result) => {
        toast({
          title: "Registro exitoso",
          description: "Se registro correctamente el usuario en el sistema",
        })
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error al crear el usuario",
          description: "Error del servidor o el usuario ya existe",
        })
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onSubmit(values) {
    registerUser(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Su nombre completo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Escoja un usuario..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
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
                      placeholder="Ingrese una contraseña segura..."
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
            )} />
          <FormField
            control={form.control}
            name="usertype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de usuario</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Escoge un tipo de usuario" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Estudiante">Estudiante</SelectItem>
                    <SelectItem value="Moderador">Moderador</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          <Button type="submit" className="w-full">
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </form>
      </Form>
    </>
  )
}