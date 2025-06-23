from pydantic import BaseModel

class DocumentAnalysisRequest(BaseModel):
    file_name: str
    # Add more fields as needed

class DocumentAnalysisResponse(BaseModel):
    summary: str
    risks: list
    # Add more fields as needed 