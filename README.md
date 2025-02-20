# FSG Tour
Dieses Repository enthält den aktuellen Stand eines Schüler Projekts des aktuellen Kust Kurses der Q2 des FSG Geldern.
Das Ziel ist es einen digitalen Rundgang durch das noch aktuelle Schulgebäude, auch nach dem Neubau, zu ermöglichen.
Die aktuellste Version kann aktuell unter [oxydemeton.github.io/fsg-tour](https://oxydemeton.github.io/fsg-tour/) angesehen werden. In der Zukunft wird es eine offizielle Seite unter [fsggeldern.de](https://fsggeldern.de/) geben.

Hinweis: Es wird ein aktueller Browser empfohlen (Chrome >=120, Firefox >= 117, Safari/iOS >= 17.2 oder weite Browser auf Chrome basis)

## Die aktuelle Version lokal ansehen
### Vo­r­aus­set­zungen
- [NodeJs](https://nodejs.org/de) Version 20 oder neuer inklusive NPM
### Aktuelle Version des Projekts herunterladen
Dazu zuerst auf die Seite dieses Repository gehen [github.com/oxydemeton/fsg-tour](https://github.com/oxydemeton/fsg-tour) und dort und dem grünen Feld code diesen als ZIP herunterladen.
### Lokalen Server starten
Um diese Seite lokal zu starten, gibt es zwei Möglichkeiten. Entweder kann die gesamte Seite im Vorhinein generiert werden oder alle Bilder, während dem Besuch der Seite generiert werden. Wenn alles im Vorhinein generiert wird, kann die Seite ohne Verzögerungen beim Navigieren besucht werden. Dafür muss, aber bevor überhaupt etwas gesehen werden kann alles generiert werden, was mit steigender Anzahl der gemachten Bilder sehr lange dauern kann (bis zu mehreren Minuten).
#### Die Seite im Vorhinein generieren
1. Die ZIP-Datei in einen lehren Ordner entpacken.
2. Ein Terminal im ersten Ordner mit Dateien öffnen.
3. Alle dependencies mit `npm install` herunterladen.
4. Die Seite mit dem Befehl `npm run build` generieren.
5. Abwarten, bis die Seite erfolgreich generiert wurde.
6. Um einen lokalen Server zu starten den Befehl `npm run preview` ausführen.
7. In der Konsole sollte nun ein Link der ähnlich zu `http://localhost:4321/fsg-tour` aussieht erscheinen.
8. Öffnen Sie den Link in einem aktuellen Browser auf diesem Gerät.
#### Bilder während der Navigation generieren
Hinweis: Die Ladezeiten einzelner Bilder kann einige Senkungen, Teils bis zu einer halben Minute dauern.
1. Die ZIP-Datei in einen lehren Ordner entpacken.
2. Ein Terminal im ersten Ordner mit Dateien öffnen
3. Alle dependencies mit `npm install` herunterladen
4. Den lokalen Sever mit `npm run dev` starten.
7. In der Konsole sollte nun ein Link der ähnlich zu `http://localhost:4321/fsg-tour` aussieht erscheinen.
8. Öffnen Sie den Link in einem aktuellen Browser auf diesem Gerät.

### Fragen zum Projekt?
Bei Fragen oder Problemen mit der Seite oder zur technischen Umsetzung erreichen sie mich per mail: mabla@mabla.name


## Deteis zur verwendeten Technik für Interessierte
Das gesamte Prohjekt besteht aus vielen Bildern die in jedem Raum, teils an meheren Punkten, aufgenommen wurden.
Um daraus eine Website zu machen wird das Framework [Astro](https://astro.build) verwendet, welches aus einer Kollektion an Daten viele Seiten generieren kann.
Dafür befindet sich im Orderner [`./src/data`](./src/data) die Datei [`rooms.yaml`](./src/data/rooms.yaml) welche eine Beschreibung jedes Punktes an dem Bilder gemacht wurden enthält. Dazu gehören unter anderem die Verbindungen zu anderen Punkten und wie viele Bilder an diesem Ort gemacht wurden. In der selben Reihnfolge wie die Punkte und ihre beschriebenen Bilder befinden sich im Ordner [`images`](./src/data/images/) die aufgenommenen Bilder im original. Um aber am Ende Bandbeite und Ladezeiten zu reduzieren, werden beim generieren der Bilder diese kompromiert bzw. optimiert, was wiederum zu Qualitätsverlust führen kann.