# Allhours

Projekt je bil narejen s pomočjo Angularja.

## Namestitev

Za namestitev poženite npm install.
Če bo kaj manjkalo, lahko ročno namestite Angular takole: npm i @angular/cli

## Zagon aplikacije

Angular projekt lahko zaženete z ng serve.

## Kaj vsebuje naloga
- Settings pogled (localhost:4200/settings) - tu se vpiše client id in client secret
- Users pogled (localhost:4200/users in /addUser) - izpis uporabnikov ter dodajanje uporabnika
- Absences pogled (localhost:4200/absences) - izpis absencov (ne dela za določen dan, vpišite testni datum v polja npr. 2020-11-11)
- Poleg tega imajo pogledi za uporabnike in odsotnosti enostaven error handling (če token ni nastavljen) in nastavljen race condition pri absencih
Manjka pa dodajanje odsotnosti uporabniku in delujoč filter za datume...
