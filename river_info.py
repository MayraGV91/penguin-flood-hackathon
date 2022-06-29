import requests
from datetime import date

def nivel():
    todays_date = date.today()
    anio = str(todays_date.year)
    mes =  int(todays_date.month)
    if mes < 10:
        mes = "0"+ str(mes)
    else:
        mes = str(mes)
    dia =  int(todays_date.day) - 1
    if dia < 10:
        dia = "0"+ str(dia)
    else:
        dia = str(dia)

    hidromet_site = requests.get('https://hidroinformatica.itaipu.gov.py/services/hidrometricaestacion/' + anio + '-' + mes + '-' + dia + '/'+ anio + '-' + mes + '-' + dia + '/12/').json()
    nivel = float(hidromet_site[0]["nivel"])
    return nivel
 
def estado(nivel):
    if nivel > 4.5 and nivel <= 5:
        estado = "Alerta amarilla"
    elif nivel > 5 and nivel <= 6:
        estado = "Alerta naranja"
    elif nivel > 6:
        estado = "Alerta roja"
    else:
        estado = "Fuera de peligro"
    return estado

nivel = nivel()
print(nivel)
estado = estado(nivel)
print(estado)

with open('river_level.txt', 'w') as f:
    f.write(str(nivel))