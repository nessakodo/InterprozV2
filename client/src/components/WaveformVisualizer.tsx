import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface WaveformVisualizerProps {
  isRecording: boolean;
}

export default function WaveformVisualizer({ isRecording }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128));

  useEffect(() => {
    if (isRecording) {
      startVisualization();
    } else {
      stopVisualization();
    }

    return () => {
      stopVisualization();
    };
  }, [isRecording]);

  const startVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateWaveform = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          setAudioData(new Uint8Array(dataArray));
          animationRef.current = requestAnimationFrame(updateWaveform);
        }
      };

      updateWaveform();
    } catch (error) {
      console.error('Error starting audio visualization:', error);
    }
  };

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setAudioData(new Uint8Array(128));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Draw waveform
      const barWidth = width / audioData.length;
      let x = 0;

      for (let i = 0; i < audioData.length; i++) {
        const barHeight = isRecording ? (audioData[i] / 255) * height * 0.8 : Math.random() * 20;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, '#2A64B2');
        gradient.addColorStop(1, '#1E4A8C');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
        
        x += barWidth;
      }
    };

    draw();
  }, [audioData, isRecording]);

  return (
    <motion.div 
      className="w-full h-24 bg-gray-50 rounded-lg border-2 border-gray-200 overflow-hidden"
      animate={{ 
        borderColor: isRecording ? '#2A64B2' : '#e5e7eb',
        boxShadow: isRecording ? '0 0 20px rgba(42, 100, 178, 0.3)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={96}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Status indicator */}
      <div className="absolute top-2 right-2">
        <motion.div
          className={`w-3 h-3 rounded-full ${
            isRecording ? 'bg-red-500' : 'bg-gray-400'
          }`}
          animate={{
            scale: isRecording ? [1, 1.2, 1] : 1,
            opacity: isRecording ? [1, 0.5, 1] : 1
          }}
          transition={{
            duration: 1,
            repeat: isRecording ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}