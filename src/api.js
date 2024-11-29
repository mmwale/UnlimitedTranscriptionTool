// Importing axios for making HTTP requests
import axios from 'axios';
// Retrieving the API key for Google Speech-to-Text from environment variables
const speechToTextApiKey = process.env.REACT_APP_SPEECH_TO_TEXT_API_KEY;

// Function to get transcription from Google Speech-to-Text API
export const getTranscription = async (audioData) => {  // Sending a POST request to the Google Speech-to-Text API with audio data and configuration
  const response = await axios.post(
    `https://speech.googleapis.com/v1/speech:recognize?key=${speechToTextApiKey}`,
    {
      config: {
        encoding: 'LINEAR16',          // Specify the encoding of the audio data
        sampleRateHertz: 16000,        // Sample rate in Hertz
        languageCode: 'en-US',         // Language code (e.g., 'en-US')
      },
      audio: {
        content: audioData,            // Base64-encoded audio content
      },
    }
  );
  // Map over the results and join the transcripts
  return response.data.results.map(result => result.alternatives[0].transcript).join('\n');
};
