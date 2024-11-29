import React from 'react';
// Header component definition
const Header = () => (
<header className="header">
        {/* Navigation bar */}
    <navbar>
        <div>
            {/* Logo image */}
            <img src = "./LogoHeader.svg" alt="UnlimitedTranscriptionTool" />
        </div>
    </navbar>
    {/* Main title of the application */}
    <h1 className="header-title">Unlimited Transcription Tool</h1>
    </header>
);
// Export the Header component as the default export
export default Header;
