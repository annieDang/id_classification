FROM python:3.10-slim

# pipenv is installed to this path
ENV PATH "$PATH:/root/.local/bin"

# Install the required packages
RUN apt-get update && \
    apt-get install -y libgl1 && \
    apt-get install -y libglib2.0-0 && \
    apt-get install -y gcc python3-dev && \
    apt-get install -y tini wget && \
    pip install --user pipenv


COPY ./ ./

RUN pipenv install

ENV PORT 6789

EXPOSE 6789

ENTRYPOINT ["tini", "--", "pipenv", "run"]

CMD ["start"]