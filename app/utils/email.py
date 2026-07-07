import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


def send_email(to_email, subject, body):
    message = MIMEText(body)

    message["Subject"] = subject
    message["From"] = SMTP_EMAIL
    message["To"] = to_email

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()

        # print("EMAIL:", SMTP_EMAIL)
        # print("PASSWORD LENGTH:", len(SMTP_PASSWORD))

        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(message)