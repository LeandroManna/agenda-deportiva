import requests
import json
import os

# URL de la API
url = "https://www.ole.com.ar/wg-agenda-deportiva/json/agenda.json"

# Frecuencias de cada canal por plataforma
frecuencias = {
    "9": {"HD": 9, "ANALOGICO": 8, "ISDBT": 22.6, "IPTV": 8},
    "7": {"HD": 20, "ANALOGICO": 14, "ISDBT": 24.2, "IPTV": 14},
    "8": {"HD": 25, "ANALOGICO": 19, "ISDBT": 25.4, "IPTV": 19},
    "39": {"HD": 26, "ANALOGICO": 20, "ISDBT": 25.5, "IPTV": 20},
    "20": {"HD": 23, "ANALOGICO": 17, "ISDBT": 24.5, "IPTV": 17},
    "28": {"HD": 31, "IPTV": 25},
    "150": {"HD": 30, "IPTV": 23},
    "95": {"HD": 29, "IPTV": 24}
}

# Lista de plataformas generales
plataformas_generales = ["HD", "ANALOGICO", "ISDBT", "IPTV"]

# Lista de IDs de canales a excluir completamente
exclusion_ids = {"171", "179", "181", "182", "11", "164", "12", "50", "82"}

# Lista de plataformas específicas para ciertos IDs
plataformas_especificas = {
    "28": ["HD", "IPTV"],
    "150": ["HD", "IPTV"],
    "95": ["HD", "IPTV"]
}

def modificar_canales(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == "canales" and isinstance(value, list):
                for canal in value:
                    if isinstance(canal, dict):
                        canal_id = canal.get("id")
                        if canal_id in exclusion_ids:
                            continue
                        elif canal_id in plataformas_especificas:
                            canal["plataformas"] = plataformas_especificas[canal_id]
                        else:
                            canal["plataformas"] = plataformas_generales
                        
                        # Agregar frecuencias específicas a cada canal
                        if canal_id in frecuencias:
                            canal["frecuencias"] = frecuencias[canal_id]
            else:
                modificar_canales(value)
    elif isinstance(data, list):
        for item in data:
            modificar_canales(item)

try:
    # Realizar la solicitud GET a la URL
    response = requests.get(url)
    response.raise_for_status()  # Verificar que la solicitud fue exitosa

    # Obtener los datos en formato JSON
    data = response.json()

    # Modificar los canales en el JSON
    modificar_canales(data)

    # Agregar información de contacto
    data['firma'] = {
        "mail": "leandromanna@gmail.com // https://mannaleandro.netlify.app/",
        "nombre": "Leandro A. Manna"
    }

    # Guardar los datos en un nuevo archivo agenda.json en la misma ubicación que el script
    with open("agenda.json", "w", encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    # Guardar los datos en otra ubicación especificada
    otra_ruta = "Y:\\FLOWICS\\agenda-deportiva\\agenda.json"
    """ with open(otra_ruta, "w", encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4) """

    print("Datos guardados exitosamente en ambas ubicaciones")

except requests.exceptions.RequestException as e:
    print(f"Error al realizar la solicitud: {e}")

except json.JSONDecodeError:
    print("Error al decodificar los datos JSON")

except Exception as e:
    print(f"Ocurrió un error: {e}")
