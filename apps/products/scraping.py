from datetime import datetime

import requests
from bs4 import BeautifulSoup


def get_day():
    year = datetime.now().year
    request = requests.get(f'https://www.calendario-365.es/numeros-de-dias/{year}.html')
    soup = BeautifulSoup(request.text, "html.parser")
    response = soup.find("font", attrs={"color": "green"}).parent.parent
    result = response.find("td")
    return result.text
