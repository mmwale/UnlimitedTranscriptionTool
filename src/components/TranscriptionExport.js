import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import React, { useState } from 'react'; // Import React and useState hook

// TranscriptionExport component definition
const TranscriptionExport = ({ transcription }) => {
  // Function to save transcription to local storage
  const saveToLocalStorage = () => {// Retrieve existing transcriptions from local storage or initialize empty array
    const savedTranscriptions = 
      JSON.parse(localStorage.getItem('transcriptions') || '[]');
      
        // Create new transcription object
    const newTranscription = {
      id: Date.now(),
      text: transcription,
      timestamp: new Date().toLocaleString()
    };
    // Add new transcription to the array
    savedTranscriptions.push(newTranscription);
    localStorage.setItem('transcriptions', JSON.stringify(savedTranscriptions));    // Save updated array back to local storage
    alert('Transcription saved successfully!');
  };

  // Function to export transcription as a text file
  const exportAsTextFile = () => {
    const blob = new Blob([transcription], { type: 'text/plain' });    // Create a Blob with the transcription text
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');    // Create a temporary link element
    link.href = url;
    link.download = `transcription_${new Date().toISOString().replace(/:/g, '-')}.txt`;
    document.body.appendChild(link);    // Append link to body, click it, and remove it
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);// Clean up the URL object
  };

   // Function to export transcription as a PDF
  const exportAsPDF = () => {
    const doc = new jsPDF();
    
    // Set PDF document properties
    doc.setProperties({
      title: 'Transcription',
      subject: 'Transcribed Text',
      author: 'Unlimited Transcription Tool',
      keywords: 'transcription, export, pdf',
      creator: 'Unlimited Transcription Tool'
    });

    // Add title to PDF
    doc.setFontSize(18);
    doc.text('Transcription', 10, 10);

    // Add timestamp to PDF
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 10, 20);

    // Add transcription text to PDF
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(transcription, 180);
    doc.text(splitText, 10, 30);

    // Save PDF
    doc.save(`transcription_${new Date().toISOString().replace(/:/g, '-')}.pdf`);
  };
  // Calculate statistics for the transcription
  const stats = { 
characters: transcription.length, 
words: transcription.split(/\s+/).filter(Boolean).length,
 paragraphs: transcription.split(/\n+/).filter(Boolean).length 
}; 

// View Saved Transcriptions
const [savedTranscriptions, setSavedTranscriptions] = useState(
    JSON.parse(localStorage.getItem('transcriptions') || '[]')
  );
  // Function to delete a saved transcription
  const deleteSavedTranscription = (id) => {
    const updatedTranscriptions = savedTranscriptions.filter(t => t.id !== id);
    localStorage.setItem('transcriptions', JSON.stringify(updatedTranscriptions));
    setSavedTranscriptions(updatedTranscriptions);
  };

  // State and handler for search functionality
  const [searchTerm, setSearchTerm] = useState(''); 
const handleSearch = (e) => setSearchTerm(e.target.value); 
  // Filter transcriptions based on search term
const filteredTranscriptions = savedTranscriptions.filter(transcription => 
    transcription.text.toLowerCase().includes(searchTerm.toLowerCase()) 
);

    // Render the component
  return (
    <div style={{ width: '80%', marginTop: '20px' }}>
      {/* Statistics Section */}
      <div className="stats-container">
        <div className="stats-item">
          <strong>Characters:</strong> {stats.characters}
        </div>
        <div className="stats-item">
          <strong>Words:</strong> {stats.words}
        </div>
        <div className="stats-item">
          <strong>Paragraphs:</strong> {stats.paragraphs}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="export-buttons">
        <button 
          onClick={saveToLocalStorage}
          className="btn btn-save"
        >
          Save Transcription
        </button>
        <button 
          onClick={exportAsTextFile}
          className="btn btn-export-text"
        >
          Export as Text
        </button>
        <button 
          onClick={exportAsPDF}
          className="btn btn-export-pdf"
        >
          Export as PDF
        </button>
      </div>

      {/* Saved Transcriptions Section */}
      <div>
        {/* Search input for saved transcriptions */}
        <input 
          type="text"
          placeholder="Search saved transcriptions..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <h3>Saved Transcriptions</h3>
        {/* Display message if no transcriptions, otherwise show list */}
        {(searchTerm ? filteredTranscriptions : savedTranscriptions).length === 0 ? (
          <p>No saved transcriptions</p>
        ) : (
          <ul className="saved-transcriptions-list">
            {/* Map through and display saved transcriptions */}
            {(searchTerm ? filteredTranscriptions : savedTranscriptions).map((saved) => (
              <li 
                key={saved.id} 
                className="saved-transcription-item"
              >
                <div className="saved-transcription-header">
                  <strong>Timestamp:</strong> {saved.timestamp}
                  <button 
                    onClick={() => deleteSavedTranscription(saved.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              {/* Display truncated text if longer than 200 characters */}
                <p>
                  {saved.text.length > 200 
                    ? saved.text.substring(0, 200) + '...' 
                    : saved.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
// Export the TranscriptionExport component as the default export
export default TranscriptionExport;