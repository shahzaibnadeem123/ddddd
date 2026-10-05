import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Messages read karna
  const getMessages = async () => {
    const { data, error } = await supabase
      .from("messege")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setMessages(data);
    }
  };

  // New message insert karna
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const { error } = await supabase
      .from("messege")
      .insert([{ messege: message }]);

    if (error) {
      console.log(error);
    } else {
      setMessage("");
      getMessages();
    }
  };

  useEffect(() => {
  getMessages();

  const channel = supabase
    .channel("messages-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messege",
      },
      (payload) => {
        setMessages((currentMessages) => [
          ...currentMessages,
          payload.new,
        ]);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
  return (
    <div>
      <h1>Realtime Chat</h1>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>

      <hr />

      {messages.map((msg) => (
        <p key={msg.id}>{msg.messege}</p>
      ))}
    </div>
  );
}

export default App;