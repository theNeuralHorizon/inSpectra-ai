from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "InSpectra AI"
    environment: str = "development"
    # Add more settings as needed

settings = Settings() 