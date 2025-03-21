# real-time-forum

## Usage

```bash
go run ./cmd/app/main.go
```

## File structure

```go
/mon-projet
│── /cmd
│   └── /app
│       └── main.go          // Point d'entrée de l'application
│
│── /internal                // Code métier et logique du serveur
│   ├── /api            // Gestion des requêtes HTTP
│   │   ├── user.go
│   │   ├── data.go
│   │   └── ... autres handlers
│   ├── /config              // Configuration de l'application
│   │   ├── config.go
│   │   ├── config.json
│   │   └── ... autres fichiers de config
│   ├── /db                  // Connexion et gestion de la BDD (si nécessaire)
│   │   ├── db.go
│   │   ├── migrations/
│   │   └── ... autres fichiers de base de données
│   ├── /middlewares          // Middleware pour l’auth, logs, etc.
│   │   ├── auth.go
│   │   ├── logging.go
│   │   └── cors.go
│   ├── /models              // Structures de données et JSON
│   │   ├── user.go
│   │   ├── response.go
│   │   └── ... autres modèles
│   └── /server
│
│── /static                     // Partie frontend
│   ├── /assets              // Ressources statiques (images, fonts, etc.)
│   ├── /css                 // Fichiers CSS
│   │   ├── styles.css
│   │   └── ... autres styles
│   ├── /js                  // Fichiers JavaScript
│   │   ├── app.js           // Point d’entrée JS
│   │   ├── api.js           // Gestion des appels API
│   │   ├── ui.js            // Gestion de l'interface utilisateur
│   │   └── ... autres modules
│   └── index.html           // Fichier HTML principal (SPA)
│
│── /test                    // Tests unitaires et d’intégration
│   ├── api_test.go
│   ├── services_test.go
│   └── ...
│
│── go.mod                   // Fichier de gestion des dépendances
│── go.sum                   // Hashes des dépendances
│── Makefile                 // Commandes pour build, test et run
└── README.md                // Documentation du projet
```