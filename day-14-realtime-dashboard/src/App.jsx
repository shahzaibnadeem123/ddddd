import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();

    const channel = supabase
      .channel("messege-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messege",
        },
        (payload) => {
          setMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function getMessages() {
    const { data, error } = await supabase
      .from("messege")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setMessages(data);
    }
  }

  return (
    <div>
      <h1>Realtime Dashboard</h1>

      {messages.map((msg) => (
        <p key={msg.id}>{msg.messege}</p>
      ))}
    </div>
  );
}

export default App;