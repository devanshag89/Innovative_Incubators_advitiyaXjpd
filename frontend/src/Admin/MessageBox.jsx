import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/fetch-messages"
        );
        setMessages(response.data.messages);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2 className="text-4xl text-orange-600 font-bold">Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              className="bg-gray-200 border border-gray-300 p-4 my-4 rounded-md"
            >
              <p>
                <strong>Name:</strong> {message.fullName}
              </p>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p>
                <strong>Message:</strong> {message.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactMessages;
