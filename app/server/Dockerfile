FROM python:3.6-slim

# pipenv is installed to this path
ENV PATH "$PATH:/root/.local/bin"

# Install the required packages
RUN apt-get update && \
    apt-get install -y wget && \
    pip install --user pipenv

COPY ./Pipfile ./Pipfile.lock ./
# Build app
RUN pipenv sync && \
    pipenv run install_datasets
    
COPY ./ ./

ENV PORT 6789

EXPOSE 6789

ENTRYPOINT ["pipenv", "run"]

CMD ["start"]