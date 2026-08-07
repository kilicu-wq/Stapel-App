# Stapel

Trainingstracker mit Wave-Periodisierung (KW31–KW35) als installierbare PWA.

## Funktionen

- **Offline-fähig**: Ein Service Worker (`sw.js`) cached alle App-Dateien, Fonts und Icons, sodass die App nach dem ersten Laden ohne Internetverbindung funktioniert.
- **IndexedDB-Speicherung**: Trainingsergebnisse werden lokal im Browser über IndexedDB gespeichert (`js/db.js`), nicht nur im flüchtigen Speicher.
- **Installierbar**: Über `manifest.json` kann die App auf dem Homescreen (iOS/Android) oder als Desktop-App installiert werden.
- **Selbst gehostete Fonts**: Keine Abhängigkeit von externen Font-CDNs — funktioniert vollständig offline.

## Projektstruktur

```
index.html          Einstiegspunkt
css/style.css        Styles
css/fonts.css         @font-face Definitionen (selbst gehostet)
fonts/                Font-Dateien (woff2)
js/app.js             App-Logik (UI, Rendering, Export)
js/db.js              IndexedDB-Wrapper
manifest.json         PWA-Manifest
sw.js                 Service Worker (Offline-Caching)
icons/                App-Icons
scripts/              Hilfsskripte zur Icon-/Font-Generierung (nicht Teil der Laufzeit-App)
```

## Hosting über GitHub Pages

1. Diesen Branch nach `main` mergen (oder Pages direkt auf diesem Branch aktivieren).
2. In den Repository-Einstellungen unter **Settings → Pages** die Quelle auf **GitHub Actions** stellen.
3. Der Workflow `.github/workflows/deploy.yml` deployt bei jedem Push auf `main` automatisch.

> **Hinweis für private Repos**: GitHub Pages für private Repositories erfordert einen GitHub Pro/Team/Enterprise-Plan. Bei einem kostenlosen Account muss das Repo öffentlich gemacht werden, damit Pages funktioniert.

## Lokal testen

Da Service Worker `https` oder `localhost` benötigen, reicht ein einfacher lokaler Server:

```bash
python3 -m http.server 8080
```

Dann `http://localhost:8080` öffnen.

## Daten zurücksetzen

Die gespeicherten Ergebnisse liegen in der IndexedDB-Datenbank `stapel-db` des Browsers. Löschen über die Browser-Entwicklertools (Application → IndexedDB) oder Browser-Daten für die Seite löschen.
