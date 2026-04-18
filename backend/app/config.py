from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    database_hostname: str = Field(..., env="DATABASE_HOSTNAME")
    database_port: str = Field(..., env="DATABASE_PORT")
    database_password: str = Field(..., env="DATABASE_PASSWORD")
    database_name: str = Field(..., env="DATABASE_NAME")
    database_user: str = Field(..., env="DATABASE_USER")

    secret_key: str = Field(..., env="SECRET_KEY")

    google_client_id: str = Field(..., env="GOOGLE_CLIENT_ID")
    google_client_secret: str = Field(..., env="GOOGLE_CLIENT_SECRET")

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }


settings = Settings()