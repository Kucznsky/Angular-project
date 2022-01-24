To accept self-signed certificates on chrome:

```
chrome://flags/#allow-insecure-localhost
```


## Funkcjonalności (12pkt):
- elementy aplikacji: sale (nr, pojemność/liczba osób), filmy (tytuł, czas trwania), seanse (data, godzina, film, sala, liczba sprzedanych i dostępnych biletów, numery zajętych miejsc),
- możliwe operacje:
    - dodawanie/edycja filmu, dodawanie/edycja seansu - w każdym przypadku edycja na danych bieżących - 4pkt,
    - usuwanie filmu - 1pkt
    - kupowanie biletu (seans, nr miejsca) - 2pkt
    - wyświetlanie seansów w danym dniu, wyświetlanie aktualnie trwających seansów (zaczynamy od bieżącego dnia i bieżącej godziny) - 2pkt
- wyświetlanie popularności danego filmu w poszczególnych dniach (tekstowo - max 2pkt) - 3pkt

## Punktacja elementów technicznych (20pkt):
- klasa TypeScript (czy zdefiniowano i zastosowano klasę do organizacji danych, czy pola w klasie są prywatne ) - 1pkt
- typy TypeScript (czy każda zmienna ma przyporządkowany typ) - 1pkt
- zaawansowane elementy TypeScript (jeden z wymienionych): - 2pkt
- klasy pochodne TypeScript (czy wykorzystano również klasy pochodne) ,
- getter+setter (czy wykorzystano i  czy właściwie zostały dobrane)+parametry opcjonalne metod (czy są i czy właściwie dobrane)+modyfikatory dostępu w konstruktorze.
- wykorzystanie formularzy, min. 5 elementów (czy właściwie wybrano dane do wprowadzania i dobrano rodzaj elementu formularza, czy nie ma dwustronnego wiązania danych w szablonie) - 1pkt
- walidacja danych wprowadzanych przez użytkownika ( w każdym przypadku wprowadzania danych, czy odpowiednio dobrano walidatory) - 2pkt,
- dwukierunkowa komunikacja pomiędzy komponentami (czy jest w każdym spodziewanym przypadku) - 1pkt,
- modyfikacja danych odbywa się tylko w jednym komponencie - 1pkt
- operacje modyfikacji danych za pomocą 4 rodzajów żądań http - 1pkt
- dane pochodzące z jednej klasy usługi - 1pkt
- dodatkowy serwis synchroniczny - 1pkt
- własna dyrektywa - 1pkt
- wykorzystanie dowolnego filtru standardowego w szablonie oraz implementacja własnego filtru - 1pkt
- routing (ścieżki 'routes', w tym jedna z parametrem, operacje na obiekcie ActivateRoute i Route) - 1pkt
- testy jednostkowe/integracyjne komponentów (minimalnie 2 z 4 rodzajów:  renderowania, zdarzeń, przesyłania właściwości, komunikacji z serwerem, za każdy napisany test 0,5pkt) - 3pkt
- testy routingu (obiektu Router oraz ActivatedRoute i dyrektywy 'routerLink') - 2pkt