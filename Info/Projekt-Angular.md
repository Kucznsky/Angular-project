To accept self-signed certificates on chrome:

```
chrome://flags/#allow-insecure-localhost
```

# Dokumentacja strony zarządzania seansami w kinie:

### Autorzy projektu:

- Michał Kuczyński,
- Daniel Pietrzeniuk

## Funkcjonalności (12pkt):

- elementy aplikacji: sale (nr, pojemność/liczba osób), filmy (tytuł, czas trwania), seanse (data, godzina, film, sala, liczba sprzedanych i dostępnych biletów, numery zajętych miejsc),
- możliwe operacje:
  - dodawanie/edycja filmu, dodawanie/edycja seansu - w każdym przypadku edycja na danych bieżących - 4pkt,
    > 4/4
  - usuwanie filmu - 1pkt
    > 1/1
  - kupowanie biletu (seans, nr miejsca) - 2pkt
    > 2/2
  - wyświetlanie seansów w danym dniu, wyświetlanie aktualnie trwających seansów (zaczynamy od bieżącego dnia i bieżącej godziny) - 2pkt
    > 2/2
- wyświetlanie popularności danego filmu w poszczególnych dniach (tekstowo - max 2pkt) - 3pkt
  > 2/3 (jedynie tekstowo)

## Punktacja elementów technicznych (20pkt):

- klasa TypeScript (czy zdefiniowano i zastosowano klasę do organizacji danych, czy pola w klasie są prywatne ) - 1pkt
  > 1/1
- typy TypeScript (czy każda zmienna ma przyporządkowany typ) - 1pkt
  > 1/1
- zaawansowane elementy TypeScript (jeden z wymienionych): - 2pkt - klasy pochodne TypeScript (czy wykorzystano również klasy pochodne) , - getter+setter (czy wykorzystano i czy właściwie zostały dobrane)+parametry opcjonalne metod (czy są i czy właściwie dobrane)+modyfikatory dostępu w konstruktorze.
  > 0/2
- wykorzystanie formularzy, min. 5 elementów (czy właściwie wybrano dane do wprowadzania i dobrano rodzaj elementu formularza, czy nie ma dwustronnego wiązania danych w szablonie) - 1pkt
  > 1/1 (formularze użyto w odpowiedni sposób, a formularz do dodawania seansów zawiera 5 elementów - 4 pola i przycisk submit)
- walidacja danych wprowadzanych przez użytkownika ( w każdym przypadku wprowadzania danych, czy odpowiednio dobrano walidatory) - 2pkt,
  > 2/2
- dwukierunkowa komunikacja pomiędzy komponentami (czy jest w każdym spodziewanym przypadku) - 1pkt,
  > 0/1
- modyfikacja danych odbywa się tylko w jednym komponencie - 1pkt
  > 0/1
- operacje modyfikacji danych za pomocą 4 rodzajów żądań http - 1pkt
  > 1/1
- dane pochodzące z jednej klasy usługi - 1pkt
  > 1/1
- dodatkowy serwis synchroniczny - 1pkt
  > 0/1
- własna dyrektywa - 1pkt
  > 0/1
- wykorzystanie dowolnego filtru standardowego w szablonie oraz implementacja własnego filtru - 1pkt
  > .5/1 (wszelkie daty są formatowane przy pomocy pipe'ów)
- routing (ścieżki 'routes', w tym jedna z parametrem, operacje na obiekcie ActivateRoute i Route) - 1pkt
  > 1/1
- testy jednostkowe/integracyjne komponentów (minimalnie 2 z 4 rodzajów: renderowania, zdarzeń, przesyłania właściwości, komunikacji z serwerem, za każdy napisany test 0,5pkt) - 3pkt
  > 0/3
- testy routingu (obiektu Router oraz ActivatedRoute i dyrektywy 'routerLink') - 2pkt
  > 0/2

## Architektura

### Pasek nawigacji:

- Komponent navigation odpowiada za wyświetlanie paska nawigacji na górze strony, w którym znajdują się linki odsyłające do pomponentów home, screenings, movies oraz rooms.

### Wyświetlanie listy sal:

- Za wyśiwetlanie listy sal odpowiada komponent rooms. W pliku rooms.component.ts dane są pobierane z API w metodzie onInit przy pomocy zdefiniowanej w serwisie rooms.service.ts metody getRooms().
- Pobrana tak z bazy sala jest wyśweitlana w pliku rooms.component.html.

### Wyświetlanie seansów:

- Za wyśiwetlanie seansów odpowiada komponent screenings. Dane z api są pobierane przy pomocy jednej z trzech metod w pliku screenings.component.ts: todayScreenings() (dzsiejsze seanse), currentScreenings() (obecnie odbywające się seanse) oraz allScreenings() (wszystkie seanse).
- Użytkownik wybiera, który wariant chce zobaczyć klikając na jeden z przycisków dodanych w screenings.component.html.
- Wyżej wymienione metody kożystają z metod z serwisu screening.service.ts ( todayScreenings(): getScreenings_InDay(), currentScreenings(): getScreenings_Now(), allScreenings(): getScreenings())
- Obok przycisków zmieniających wariant wyświetlanych seansów, znajduje się również przycisk Add Screenings, który przekierowuje do komponentu add-screening zawierającego formularz dodawania nowego seansu.
- Za pojedyńczy element listy seansów odpowiada komponent screening-element.
- W każdym pojedyńczym elemencie listy znajduje się link przekierowujący do formularza edycji seansu w komponencie edit-screening, link do komponentu odpowiadającego za stronę pojedyńczego filmu (movie-page) oraz do komponentu odpowiadającego za zakup biletu na seans (buy-ticket)

### Wyświetlanie listy filmów:

- Za wyśiwetlanie seansów odpowiada komponent movies. W pliku movies.component.ts dane są pobierane z API w metodzie onInit przy pomocy zdefiniowanej w serwisie movies.service.ts metody getFilms().
- Pobrana tak z bazy sala jest wyśweitlana w pliku movies.component.html.
- Każdy element listy filmów zawiera link odsyłający do widoku pojedyńczego filmu zawartego w komponencie movie-page.
- Nad listą filmów znajduje się przycisk AddMovies przekierowujący do komponentu add-movies zawierającego formularz dodawania filmu.

### Wyświetlanie popularności filmów

- Za wyśiwetlanie spopularności filmów odpowiada komponent popularity.
- W komponencie pobierany jest od użytkownika tytuł filmu oraz przedział czasowy (od danego dnia do danego dnia) , po czym wyśiwetlany jest ranking sprzedarzy filmu w danym czasie.
- Komponent popularity generowany jest w komponencie home-page.

### Strona filmu

- Każdy film ma swoją stronę (wykorzystano routing z parametrem) na której widnieje tytuł, czas trwania filmu, a także linki do komponentów edit-movie (edycja filmu), add-screening (drugi sposób na przekierowanie użytkownika do formularza dodania seansu poza linkiem znajdującym się w komponencie screenings) oraz przycisk usuwający dany film.

### Kupowanie biletu

- Za wyświetlanie formularza kupna biletu odpowiada komponent buy-ticket.
- Do komponentu użytkownik zostaje przekierowany po kliknięciu "buy ticket", na danym elemencie listy seanów.
- W formularzu użytkownik musi zaznaczyć jedno z miejsc na sali, po kilnięciu odblokowuje się przycisk Buy Ticket, którego kliknięcie finalizuje zakup.

### Dodawanie seansów:

- W komponencie add-screenings znajduje się formularz dodawania seansu.
- Komponnet pobiera od użytkownika tytuł filmu, numer sali, datę seansu oraz godzinę seansu.

### Edytowanie seansów:

- Komponent działa tak samo jak dodawanie seansów, jedyną różnicą jest to, że domyślnymi wartościami są te już wcześniej dodane do bazy.

### Dodawanie filmów:

- W komponencie add-movies znajduje się formularz dodawania nowych filmów.
- Komponnet pobiera od użytkownika tytuł oraz czas trwania filmu.

### Edytowanie filmów:

- Komponent działa tak samo jak dodawanie filmów, jedyną różnicą jest to, że domyślnymi wartościami są te już wcześniej dodane do bazy.

## API serwera:

- https://localhost:5001/Films
- https://localhost:5001/Film/{index}
- https://localhost:5001/Films/FilmPopularity
- https://localhost:5001/Reservation/{index}
- https://localhost:5001/Reservation
- https://localhost:5001/Rooms
- https://localhost:5001/Rooms/{index}
- https://localhost:5001/Screenings
- https://localhost:5001/Screening/{index}
- https://localhost:5001/Screenings/ScreeningsInDay
- https://localhost:5001/Screenings/ScreeningNow

## Ścieżki i komponenty związane z routingiem:

- Home-page: '/'
- Rooms: '/rooms'
- Movies: '/movies'
- Add-movie: '/movies/new'
- Edit-movie: '/movie/:id/edit'
- Screenings: '/screenings'
- Add-screening: '/screenings/new'
- Edit-screening: '/screenings/:id/edit',
- Movie-page: '/movie/:id'
- Buy-ticket: '/buyTicket/:screeningID'

## Dodatkowe biblioteki użyte w aplikacji: link oraz zdanie opisu biblioteki i celu użycia:

### Font awesome

- https://www.npmjs.com/package/font-awesome
- Biblioteka zawiera gotowe ikony.
- Cel: Użycie wybranych ikon w celu zwiększenia estetyki interfejsu aplikacji.

# Instrukcja:

```sh
# Żeby uruchomić Front-End:
# - Przechodzimy do folderu AngularCinema.
# - Instalujemy moduły:
npm install
npm ci
# - Uruchamiamy Angulara:
ng run

# Żeby uruchomić Back-End (sposób bez IDE):
# - Wymagana jest instalacja dotnet-sdk 6, oraz SQLite.
# - Wymagana jest także instalacja Entity Framework CLI.
dotnet tool install --global dotnet-ef
# - Przechodzimy do folderu Backend.
# - Inicjalizujemy bazę danych:
dotnet ef database update
# - Uruchamiamy aplikację ASP.NET
dotnet run
```
