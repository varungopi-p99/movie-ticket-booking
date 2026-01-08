
# Stage 1: Builder
FROM python:3.12-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY .env .env

# Stage 2: Final Image
FROM python:3.12-slim

WORKDIR /app
COPY --from=builder /usr/local /usr/local

COPY --from=builder /app/app ./app
COPY --from=builder /app/.env .env
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]