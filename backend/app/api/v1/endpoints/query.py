from fastapi import APIRouter, Query

router = APIRouter()

@router.get('/query')
def query_document(question: str = Query(...)):
    # Placeholder for QA logic
    return {"message": "QA not yet implemented."} 