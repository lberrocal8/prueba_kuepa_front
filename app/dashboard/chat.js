import { useState, useEffect } from 'react';
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import io from 'socket.io-client';
const socket = io('http://localhost:5001');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const activeUserName = localStorage.getItem("activeUserName");
  const activeRole = localStorage.getItem("activeUserType");

  useEffect(() => {
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages");
        if (!response.ok) throw new Error("Error al obtener mensajes");

        const data = await response.json();
        setMessages(data); 
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = (text) => {
    if (message.trim()) {
      socket.emit('message', { activeUserName, role: activeRole, text });
      setMessage('');
    }
  };

  return (
    <div className='flex items-center'>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chat de la sala</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col'>
            <ScrollArea className="h-[450] w-full rounded-md border p-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col max-w-fit my-1 px-2 py-1 rounded-md ${msg.activeUserName === activeUserName
                    ? "place-self-end bg-slate-200"
                    : "place-self-start bg-slate-400"
                    }`}>
                  <span className='text-xs'>@{msg.activeUserName}{msg.role === "Moderador" ? " - (Moderador)" : ""}</span>
                  {msg.text}
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex space-x-2'>
            <Input
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(e.target.value) }} />
            <Button type="submit" onClick={sendMessage}>
              <Send />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
