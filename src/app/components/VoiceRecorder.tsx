"use client";

import { useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
import styles from "../../styles/VoiceRecorder.module.css";

export default function VoiceRecorder({ onTranscribe }: { onTranscribe: (text: string) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      onTranscribe(data.transcription);
    };

    audioChunks.current = [];
    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className={styles.recorderButton}>
      {isRecording && <span className={styles.pulseRing} />}
      <IconButton
        onClick={isRecording ? stopRecording : startRecording}
        sx={{
          backgroundColor: isRecording ? "#ff4d4f" : "#0078ff",
          color: "white",
          borderRadius: "10px",
          padding: "8px",
          transition: "0.3s ease",
          zIndex: 1,
          "&:hover": {
            backgroundColor: isRecording ? "#e04343" : "#005ecb",
          },
        }}
        title={isRecording ? "Stop recording" : "Start voice input"}
      >
        {isRecording ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </div>
  );
}
