import { default as React, useEffect, useState } from 'react';
import TranscriptionExport from './TranscriptionExport';

  // State variables
const TranscriptionInterface = () => {
  const [transcription, setTranscription] = useState('');// Stores the transcribed text
  const [recognition, setRecognition] = useState(null);// Stores the SpeechRecognition instance
  const [isTranscribing, setIsTranscribing] = useState(false);// Tracks if transcription is active
  const [browserSupport, setBrowserSupport] = useState(true);// Checks if browser supports speech recognition

  useEffect(() => {
  // Check for browser support of SpeechRecognition
    const SpeechRecognition = 
      window.SpeechRecognition || 
      window.webkitSpeechRecognition || 
      window.mozSpeechRecognition || 
      window.msSpeechRecognition;

    if (!SpeechRecognition) {
      setBrowserSupport(false);
      return;
    }
    // Create and configure SpeechRecognition instance
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;// Keep listening even if the user pauses
    recognitionInstance.interimResults = false;// Only return final results
    recognitionInstance.lang = 'en-US';// Set language to English (US)
    
    // Event handler for when recognition starts
    recognitionInstance.onstart = () => {
      console.log('Speech recognition started');
    };
    
    // Event handler for recognition results
    recognitionInstance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setTranscription(prev => prev + ' ' + transcript);
    };
    // Event handler for recognition errors
    recognitionInstance.onerror = (event) => {
      console.error('Error during speech recognition:', event.error);
    };
    // Event handler for when recognition ends
    recognitionInstance.onend = () => {
      console.log('Speech recognition ended');
      setIsTranscribing(false);
    };
    // Store the recognition instance in state
    setRecognition(recognitionInstance);
  }, []);// Empty dependency array ensures this effect runs only once on mount
  
  // Function to toggle transcription on/off
  const toggleRecognition = () => {
    if (recognition) {
      if (isTranscribing) {
        recognition.stop();
      } else {
        recognition.start();
      } 
      setIsTranscribing(!isTranscribing);
    }
  };
  // Function to clear the transcription
  const clearTranscription = () => {
    setTranscription('');
  };
  // Render a message if browser doesn't support speech recognition
  if (!browserSupport) {
    return (
      <div className="browser-support-message">
        <p>Sorry, your browser does not support speech recognition.</p>
        <p>Try using the latest version of Chrome, Edge, or Safari.</p>
      </div>
    );
  }
  // Main render of the transcription interface
  return (
    <div className="transcription-container">
      {/* Textarea to display the transcription */}
      <textarea
        className="transcription-textarea"
        value={transcription}
        readOnly 
        placeholder="Transcription will appear here..." 
      />
      {/* Container for transcription control buttons */}
      <div className="transcription-button-container">
        {/* Button to start/stop transcription */}
        <button 
          onClick={toggleRecognition}
          className={`btn ${isTranscribing ? 'btn-stop-transcription' : 'btn-start-transcription'}`}
        > 
          {isTranscribing ? 'Stop Transcription' : 'Start Transcription'} 
        </button>
        {/* Button to clear the transcription */}
        <button 
          onClick={() => clearTranscription()}
          className="btn btn-clear-transcription"
        >
          Clear Transcription
        </button>
      </div>
      {/* Component for exporting and managing transcriptions */}
      <TranscriptionExport transcription={transcription} />
    </div>
  );
};
// Export the TranscriptionInterface component as the default export
export default TranscriptionInterface;