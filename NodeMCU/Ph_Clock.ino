// Pedro Gabriel Sanchez Valdez
#define PH_OFFSET -1.00 // Si hay un desplazamiento

#include <ESP32Time.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <Servo.h>

ESP32Time rtc;

#define SensorPin A0        // La salida analógica del medidor de pH está conectada al pin analógico del Arduino

// Conexiones a internet (TEC)
const char* ssid = "Tec-IoT";
const char* password = "spotless.magnetic.bridge";

HTTPClient httpClient;
WiFiClient wClient;

String URLPh = "http://ip:3100/api/logPh/2";
String URLReloj = "http://ip:3100/api/logTime/3";

// valores promedios del sensor Ph
unsigned long int avgValue;  // Almacena el valor promedio de la retroalimentación del sensor
float b;
int buf[10], temp;

// Valores iniciales del Buzzer/ Reloj
unsigned long tiempoInicio;
unsigned long intervaloBuzzer = 15000; // Establece el intervalo en milisegundos
unsigned long tiempoBuzzer = 0;
const int pinBuzzer = 14;

// creación de los objetos
Servo servoMotor;

void setup() {
  // setUp de Servomotor y Ph
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  servoMotor.attach(5); // Asocia el servo al pin 9
  Serial.println("Ready");    // Prueba el monitor serial

  // Setup del Reloj/ buzzer
  delay(5000);
  Serial.begin(9600); // Se tiene que ajustar en serial monitor para que se muestren los datos
  rtc.setTime(0); // AQUÍ ES DONDE SE INICIALIZAN LOS VALORES -> segundo, minutos, hora, dia, mes, año.
  tiempoInicio = millis(); // Registra el momento de inicio
  pinMode(pinBuzzer, OUTPUT); // Pin del buzzer

  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void loop() {
  // Ph sensor
  bool pastilla;
  for (int i = 0; i < 10; i++) {       // Obtiene 10 valores de muestra del sensor para suavizar el valor
    buf[i] = analogRead(SensorPin);
    delay(10);
  }
  for (int i = 0; i < 9; i++) {        // Ordena los valores analógicos de menor a mayor
    for (int j = i + 1; j < 10; j++) {
      if (buf[i] > buf[j]) {
        temp = buf[i];
        buf[i] = buf[j];
        buf[j] = temp;
      }
    }
  }
  avgValue = 0;
  for (int i = 2; i < 8; i++) {                      // Calcula el valor promedio de 6 muestras centrales
    avgValue += buf[i];
  }
  float phValue = (float)avgValue * 3.3 / 1024 / 6; // Convierte el valor analógico en milivoltios
  phValue = 5.5 * phValue;                      // Convierte los milivoltios en valor de pH
  phValue = phValue + PH_OFFSET;

  if (phValue > 7.5 || phValue < 6.5) {
    pastilla = true;
    Serial.println("Servo motor activado");
    servoMotor.write(0); // Mueve el servo a 90 grados
    delay(1000);
    servoMotor.write(90); // Vuelve a la posición inicial
     delay(10000);
  } else {
    pastilla = false;
  }

  // void loop reloj
  Serial.print("pH: ");
  Serial.print(phValue, 2);
  Serial.print(" Formatted Time: ");

  unsigned long tiempoActual = millis();
  unsigned long tiempoTranscurrido = tiempoActual - tiempoInicio;
  bool buzzerSonando = false;

  if (tiempoTranscurrido >= intervaloBuzzer) {
    if (tiempoBuzzer == 0) {
      // Si el tiempo que se especificó en el intervaloBuzzer se termina, comienza a sonar la alarma
      digitalWrite(pinBuzzer, HIGH); // Enciende el buzzer
      tiempoBuzzer = millis(); // Registra el momento de inicio del sonido del buzzer, comienza cuando terminan los 60 segundos
      buzzerSonando = true;
    } else {
      // Si el buzzer está sonando, verifica si han pasado 10 segundos para dejar de hacerlo
      if (tiempoActual - tiempoBuzzer >= 10000) {
        digitalWrite(pinBuzzer, LOW); // Apaga el buzzer
        // Restablece los tiempos del buzzer y se vuelve a repetir el proceso
        tiempoBuzzer = 0;
        tiempoInicio = millis();
      }
    }
  }

  // Proceso para imprimir la fecha en el formato especificado en la base de datos
  String formattedTime;
  if (buzzerSonando) {
    // Imprimir 10 ceros cuando el buzzer esté sonando
    for(int i = 0; i < 10; i ++){
      Serial.println("0");
      delay(1000);
    }
    rtc.setTime(0);
  } else {
    // Imprimir la cuenta de tiempo normal
    formattedTime = rtc.getTime("%M:%S"); // mostramos minutos y segundos
    Serial.println(formattedTime);
  }

  logIntento(phValue, pastilla);
  logIntentoTime( buzzerSonando, formattedTime);

  delay(1000); // Utilizamos un delay para poder leer los datos de una mejor manera, puede cambiar, pero es mejor ver un poco más lenta la salida.
  digitalWrite(13, HIGH);
  delay(800);
  digitalWrite(13, LOW);
}

void logIntento(float phValue, bool pastilla) {
  if (WiFi.status() == WL_CONNECTED) {
    String data = URLPh;
    data = data + "/" + String(phValue) + "/" + String(pastilla);
    Serial.println(data);



    httpClient.begin(wClient, data.c_str());
    httpClient.addHeader("Content-Type", "Content-Type: application/json");
    int httpResponseCode = httpClient.POST(data.c_str());
    Serial.println(httpResponseCode);
    httpClient.end();

    
  }
  return;
}

void logIntentoTime(bool buzzerSonando, String formattedTime) {
  if (WiFi.status() == WL_CONNECTED) {
    

    String dataReloj = URLReloj;
    dataReloj = dataReloj + "/" + String(buzzerSonando)+ "/" +  "'"+ String(formattedTime)+"'"  ;
    Serial.print(dataReloj);


    httpClient.begin(wClient, dataReloj.c_str());
    httpClient.addHeader("Content-Type", "Content-Type: application/json");
    int httpResponseCode = httpClient.POST(dataReloj.c_str());
    Serial.println(httpResponseCode);
    httpClient.end();
  }
  return;
}


