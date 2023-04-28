FROM python

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY AI1.py ./

ENTRYPOINT [ "python3", "AI1.py" ]