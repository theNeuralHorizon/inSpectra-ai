import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Alert, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { uploadAndAnalyzeDocument } from '../services/api';
import DescriptionIcon from '@mui/icons-material/Description';
import GppGoodIcon from '@mui/icons-material/GppGood';
import WarningIcon from '@mui/icons-material/Warning';

interface AnalysisResult {
  filename: string;
  summary: string;
  risks: string[];
}

const DocumentUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsLoading(true);
      setError(null);
      try {
        const analysisResult = await uploadAndAnalyzeDocument(selectedFile);
        setResult(analysisResult);
      } catch (err: any) {
        const errorMsg = err.response?.data?.detail || 'Failed to analyze the document. Please try again.';
        setError(errorMsg);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Paper elevation={2} style={{ padding: '16px', border: '2px dashed #ccc', width: '100%', textAlign: 'center' }}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ display: 'block', margin: '10px auto' }}
          id="file-upload"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Upload & Analyze'}
        </Button>
        {selectedFile && !isLoading && (
          <Typography variant="body2" mt={2}>
            Selected file: {selectedFile.name}
          </Typography>
        )}
      </Paper>
      
      {error && (
        <Alert severity="error" style={{ marginTop: 16, width: '100%' }}>
          {error}
        </Alert>
      )}

      {result && (
         <Paper elevation={3} style={{ marginTop: 24, padding: 24, width: '100%' }}>
            <Typography variant="h5" gutterBottom>Analysis for: {result.filename}</Typography>
            
            <Box mt={2}>
              <Typography variant="h6">Summary</Typography>
              <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>{result.summary}</Typography>
            </Box>

            <Box mt={3}>
              <Typography variant="h6">Detected Risks</Typography>
              <List>
                {result.risks.length > 0 ? (
                  result.risks.map((risk, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <WarningIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary={risk} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemIcon>
                      <GppGoodIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="No significant risks detected." />
                  </ListItem>
                )}
              </List>
            </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DocumentUploader; 