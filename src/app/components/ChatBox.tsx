"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import VoiceRecorder from "./VoiceRecorder";
import { useThemeContext } from "../context/ThemeContext";


export default function ChatBox({ voiceInput }: { voiceInput?: string }) {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([]);
  const [input, setInput] = useState(voiceInput || "");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const { darkMode } = useThemeContext();
  const theme = useTheme();

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (voiceInput) {
      setInput(voiceInput);
      sendMessage(voiceInput);
    }
  }, [voiceInput]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async (message?: string) => {
    const userMessage = message || input;
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const aiMessage = data.reply;

    setMessages((prev) => [...prev, { text: aiMessage, sender: "ai" }]);
    speak(aiMessage);
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      position="relative"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
      {/* Scrollable Chat Area */}
      <Box
        ref={chatRef}
        flex={1}
        overflow="auto"
        px={2}
        py={2}
      >
        <Box
          mx="auto"
          width="100%"
          maxWidth="720px"
          display="flex"
          flexDirection="column"
          gap={1}
        >
          {messages.map((msg, i) => (
            <Box
              key={i}
              alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
              bgcolor={
                msg.sender === "user"
                  ? darkMode
                    ? "#444"
                    : theme.palette.primary.main
                  : darkMode
                    ? "#2a2a3a"
                    : "#e2eafc"
              }
              color={
                msg.sender === "user"
                  ? "white"
                  : darkMode
                    ? "#e0e0e0"
                    : "black"
              }
              px={3}
              py={1.5}
              borderRadius={3}
              maxWidth="80%"
              boxShadow={1}
              fontSize="15px"
              whiteSpace="pre-wrap"
            >
              {msg.text}
            </Box>
          ))}

          {loading && (
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="textSecondary">
                Thinking...
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Fixed Input Bar */}
      <Box
        position="sticky"
        bottom={0}
        width="100%"
        bgcolor={theme.palette.background.paper}
        borderTop={`1px solid ${theme.palette.divider}`}
        px={2}
        py={1.5}
        zIndex={1}
        display="flex"
        justifyContent="center"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          width="100%"
          maxWidth="720px"
        >
          <TextField
            placeholder="Send a message..."
            variant="outlined"
            size="small"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            sx={{
              backgroundColor: darkMode ? "#1f1f1f" : "#f9f9f9",
              borderRadius: 2,
              flex: 1,
              input: {
                color: theme.palette.text.primary,
              },
            }}
          />
          <IconButton
            onClick={() => sendMessage()}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "",
              borderRadius: 2,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            <Send size={20} />
          </IconButton>
          <VoiceRecorder onTranscribe={setInput} />
        </Box>
      </Box>
    </Box>
  );
}
