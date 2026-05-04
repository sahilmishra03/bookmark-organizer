from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    database_url: str = Field(..., env="DATABASE_URL")

    secret_key: str = Field(..., env="SECRET_KEY")

    google_client_id: str = Field(..., env="GOOGLE_CLIENT_ID")
    google_client_secret: str = Field(..., env="GOOGLE_CLIENT_SECRET")

    github_client_id: str = Field(..., env="GITHUB_CLIENT_ID")
    github_client_secret: str = Field(..., env="GITHUB_CLIENT_SECRET")
    github_authorize_url: str = Field(..., env="GITHUB_AUTHORIZE_URL")
    github_access_token_url: str = Field(..., env="GITHUB_ACCESS_TOKEN_URL")
    github_userinfo_endpoint: str = Field(..., env="GITHUB_USERINFO_ENDPOINT")

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }


settings = Settings()