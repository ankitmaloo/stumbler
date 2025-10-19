"""Configuration settings for the Stumbler backend."""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Gemini API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash-exp")

# Application Settings
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# API Settings
MAX_IMAGE_SIZE_MB = int(os.getenv("MAX_IMAGE_SIZE_MB", "10"))
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "8192"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))

def validate_config():
    """Validate that required configuration is present."""
    if not GEMINI_API_KEY:
        raise ValueError(
            "GEMINI_API_KEY is not set. Please set it in .env file or environment variables."
        )
    return True
