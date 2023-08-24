// Importación de módulos y clases necesarios para la creación del servicio.
import { Injectable } from '@angular/core';          // Decorador que permite inyectar el servicio en otros componentes o servicios.
import { HttpClient } from '@angular/common/http';   // Módulo HTTP de Angular para hacer peticiones.
import { Observable } from 'rxjs';                   // Para manejar objetos observables.

// Decorador que marca la clase como disponible para ser inyectada como dependencia.
@Injectable({
  providedIn: 'root'                                  // Esto asegura que el servicio sea un singleton en la aplicación.
})
export class LicenciaService {                      // Declaración de la clase del servicio.

  private baseURL = 'http://localhost:3000/licencia'; // URL base de la API para gestionar las licencias.

  // Constructor de la clase, en el que se inyecta HttpClient.
  constructor(private http: HttpClient) { }        // "http" es una instancia de HttpClient que permite hacer peticiones HTTP.

  // Método que devuelve todas las licencias desde la API.
  getLicencias(): Observable<any> {                 // Observable<any> indica que el método devuelve un observable que emite algún tipo de dato.
    return this.http.get(this.baseURL);             // Hace una petición GET a la URL base. 
  }                                                 // Cuando el servidor responda, el observable emitirá la respuesta.

  // Método que elimina una licencia específica por su ID.
  eliminarLicencia(licenseId: string): Observable<any> {  // Acepta un ID de licencia como parámetro.
    return this.http.delete(`${this.baseURL}/${licenseId}`); // Hace una petición DELETE a la URL de la licencia específica.
  }                                                         // Utiliza una plantilla de cadena de texto para construir la URL completa.
}
