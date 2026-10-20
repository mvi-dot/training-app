# Træning

Min personlige træningslog. Virker på mobil og desktop, kan installeres på hjemmeskærmen og virker uden signal.
Alt data gemmes kun i browseren på din egen enhed (localStorage). Der er ingen server.

## Filer (skal alle ligge i roden af repoet)
- index.html (selve appen, fonte er indlejret)
- manifest.webmanifest (navn, farver og ikoner til hjemmeskærmen)
- sw.js (offline-funktion)
- icon-192.png, icon-512.png, apple-touch-icon.png

## Sæt op på GitHub Pages
1. Opret et nyt repository på github.com, fx `training-app`. Sæt det til Public (kræves for gratis Pages).
2. Add file > Upload files. Træk alle filerne ovenfor ind, og tryk Commit changes.
3. Settings > Pages > Source: Deploy from a branch > Branch: main, mappe: / (root) > Save.
4. Efter ca. 1 minut ligger appen på https://DIT-BRUGERNAVN.github.io/training-app/

## Installér på iPhone
Åbn adressen i Safari > Del-ikonet > Føj til hjemmeskærm. Brug fra da af kun ikonet på hjemmeskærmen.
(Safari og hjemmeskærms-ikonet har hver sit lager, så data følger ikke med imellem dem.)

## Opdatér appen senere
Erstat filerne i repoet. Ret `VERSION` i sw.js (fx til traening-v2), så telefonen henter den nye udgave.

## Backup til GitHub
Program > Data > Backup og gendan. Opret et privat repo (fx training-backup) og et fine-grained token med
Contents: Read and write på netop det repo. Indsæt repo og token i appen. Backups lægges i mappen `backup`.
Tokenet gemmes kun på telefonen og er ikke en del af backupfilerne.
