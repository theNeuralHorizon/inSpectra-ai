# InSpectra AI

InSpectra AI is an AI-powered compliance assistant that scans large volumes of legal, financial, or procurement documents to automatically identify risks, classify clauses, and summarize action points using real-world regulatory standards (via APIs). It helps businesses and legal teams accelerate due diligence, vendor review, or internal audit workflows.

## Features
- Document upload and parsing (PDF/DOCX)
- Risk and clause classification (Zero-shot)
- Summarization of key points and action items
- Question-answering interface
- Integration with real-world regulatory APIs
- Vector store for semantic search (Qdrant)

## Tech Stack
- Backend: Python, FastAPI, Pydantic, Hugging Face Transformers, Qdrant, PyPDF2, python-docx
- Frontend: React, TypeScript (to be implemented)
- Deployment: Docker Compose

## Setup (Backend)
```bash
cd inSpectra-ai/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Project Structure
See the workflow in the project documentation for details. 