from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services import document_parser, summarizer, classifier

router = APIRouter()

@router.post('/analyze')
async def analyze_document(file: UploadFile = File(...)):
    """
    Analyzes an uploaded document by parsing its content, classifying risks,
    and generating a summary.
    """
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")

    # 1. Parse document to extract text
    text_content = await document_parser.parse_document(file)
    if text_content.startswith("Error:"):
        raise HTTPException(status_code=400, detail=text_content)
    
    if not text_content.strip():
        raise HTTPException(status_code=400, detail="Could not extract any text from the document.")

    # 2. Classify text to find risks (currently a placeholder)
    risks = classifier.classify_text(text_content)

    # 3. Summarize text (currently a placeholder)
    summary = summarizer.summarize_text(text_content)

    return {
        "filename": file.filename,
        "summary": summary,
        "risks": risks
    } 