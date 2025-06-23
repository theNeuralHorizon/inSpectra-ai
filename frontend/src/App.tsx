import React from 'react';
import { Container, Typography } from '@mui/material';
import DocumentUploader from './components/DocumentUploader';

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        InSpectra AI
      </Typography>
      {/* TODO: Add navigation and routes */}
      <p>Welcome to InSpectra AI. Upload a document to get started.</p>
      <DocumentUploader />
    </Container>
  );
}

export default App; 