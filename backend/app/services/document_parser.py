import PyPDF2
import docx
from fastapi import UploadFile
import io

async def parse_document(file: UploadFile) -> str:
    """
    Parses the content of an uploaded file (PDF or DOCX) and returns the text.
    """
    content = ""
    # Use the filename to determine the file type
    file_extension = file.filename.split('.')[-1].lower() if file.filename else ''
    
    # Read the file content into an in-memory buffer
    file_content = await file.read()
    file_stream = io.BytesIO(file_content)

    if file_extension == 'pdf':
        try:
            pdf_reader = PyPDF2.PdfReader(file_stream)
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    content += page_text + "\\n"
        except Exception as e:
            print(f"Error parsing PDF: {e}")
            return "Error: Could not parse the PDF file."

    elif file_extension == 'docx':
        try:
            document = docx.Document(file_stream)
            for para in document.paragraphs:
                content += para.text + '\\n'
        except Exception as e:
            print(f"Error parsing DOCX: {e}")
            return "Error: Could not parse the DOCX file."
            
    else:
        return "Error: Unsupported file type. Please upload a PDF or DOCX."

    # Reset the file stream pointer in case it needs to be read again
    await file.seek(0)
    return content 