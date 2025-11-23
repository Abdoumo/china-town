import { useState, useCallback, useRef } from "react";

export interface SpeechRecognitionResult {
  transcript: string;
  accuracy: number;
  isCorrect: boolean;
  confidence: number;
}

export interface UseSpeechRecognitionReturn {
  isListening: boolean;
  isSupported: boolean;
  result: SpeechRecognitionResult | null;
  error: string | null;
  startListening: (targetText: string) => void;
  stopListening: () => void;
  clearResult: () => void;
}

const removeToneMarks = (text: string): string => {
  // Remove Chinese tone diacritical marks
  const toneMap: Record<string, string> = {
    // First tone (macron)
    ā: "a", é: "e", ī: "i", ō: "o", ū: "u", ǖ: "v", ń: "n", ň: "n", ǹ: "n",
    // Second tone (acute)
    á: "a", é: "e", í: "i", ó: "o", ú: "u", ǘ: "v",
    // Third tone (caron)
    ǎ: "a", ě: "e", ǐ: "i", ǒ: "o", ǔ: "u", ǚ: "v",
    // Fourth tone (grave)
    à: "a", è: "e", ì: "i", ò: "o", ù: "u", ǜ: "v",
    // Additional variants
    m̄: "m", n̄: "n", nḡ: "ng",
    ń: "n", ň: "n", ǹ: "n",
  };

  return text
    .toLowerCase()
    .replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜḿńňǹ]/g, (char) => toneMap[char] || char)
    .trim();
};

const calculateAccuracy = (spoken: string, target: string): number => {
  const normalizeText = (text: string) => removeToneMarks(text);

  const spokenNorm = normalizeText(spoken);
  const targetNorm = normalizeText(target);

  // Exact match (ignoring tones)
  if (spokenNorm === targetNorm) {
    return 100;
  }

  // Calculate Levenshtein distance for partial matches
  const longer = spokenNorm.length > targetNorm.length ? spokenNorm : targetNorm;
  const shorter = spokenNorm.length > targetNorm.length ? targetNorm : spokenNorm;

  if (longer.length === 0) {
    return 100;
  }

  const editDistance = getEditDistance(shorter, longer);
  const maxDistance = Math.max(spokenNorm.length, targetNorm.length);

  return Math.round((1 - editDistance / maxDistance) * 100);
};

const getEditDistance = (s1: string, s2: string): number => {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
};

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<SpeechRecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const isSupported = typeof window !== "undefined" && 
    ("webkitSpeechRecognition" in window || "SpeechRecognition" in window);

  const startListening = useCallback((targetText: string) => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser");
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "zh-CN";

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setResult(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          transcript += transcriptPart;

          if (event.results[i].isFinal) {
            isFinal = true;
          }
        }

        if (isFinal) {
          const accuracy = calculateAccuracy(transcript, targetText);
          const confidence = accuracy >= 70 ? accuracy / 100 : (accuracy / 100) * 0.8;

          setResult({
            transcript,
            accuracy,
            isCorrect: accuracy >= 70,
            confidence,
          });
        }
      };

      recognition.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setError("Failed to start speech recognition");
      setIsListening(false);
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isListening,
    isSupported,
    result,
    error,
    startListening,
    stopListening,
    clearResult,
  };
};
