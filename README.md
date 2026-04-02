# Locamat

## Description

Locamat est une application web permettant de louer du matériel entre particuliers et/ou professionnels .Elle permet de consulter les équipements disponibles, faire des réservations, gérer les locations.

Le projet est composé d’un backend exposant une API REST pour gérer les données (utilisateurs, matériels, locations, avis) et d’un frontend permettant d’interagir avec l’application.

Cette application a été réalisée dans le cadre d’un projet de fin de formation du Titre Professionnel Développeur Web et Web Mobile qui s'est déroulé du 22 septembre 2025 au 18 juin 2026.

## Technologies utilisées

- Node.js / Express – Backend et API
- MySQL – Base de données
- React – Interface utilisateur
- Vite

## Architecture

<pre>
├───back-end
│ ├───db
│ |   
│ ├───routes
│ |   
│ ├───controllers
│ |     
│ ├───config
│ |    
│ ├───middleware
│ |   
│ ├───services
│ |     
│ ├───models
│ |   
│ ├─ .env
│ ├─ app.js
│ ├─ server.js
│ └─ package.json
└───front-end
        ├───public
        ├───src
        |    ├───pages
        |    │      ├───Home
        |    │      |   
        |    │      ├───User
        |    │      |   
        |    │      ├───EquipmentItem
        |    │      |   
        |    │      ├───EquipmentSearch
        |    │      |  
        |    │      ├───Admin
        |    │      |   
        |    │      ├───AddEquipment
        |    │      |    
        |    │      ├───Chat
        |    │      |   
        |    │      ├───Errors
        |    │      |    
        |    │      ├───Legal
        |    │      |   
        |    │      └───Reservation
        |    │         
        |    ├───components
        |    │       ├───admin
        |    │       |    
        |    │       ├───user
        |    │       |   
        |    │       ├───equipment
        |    │       |     
        |    │       └────reviews
        |    │      
        |    ├───types
        |    │   
        |    ├───context
        |    │    
        |    ├───api 
        |    │    
        |    ├───services 
        |    |     
        |    ├───App.tsx
        |    ├───index.css
        |    └───main.tsx 
        ├─.env
        ├─index.html
        └─package.json
        
</pre>

## Installation

### Installer les dépendances

```bash
npm install
```

### Lancer le serveur

```bash
node server.js
```

### Lancer le front

```bash
npm run dev
```

## EndPoints

### Authentification

- POST '/login'

### Category

- GET '/category'
- GET '/category/:id'

### Equipment

- GET '/equipment'
- GET '/equipment6first'
- GET '/equipment/:id'
- GET '/user/:id/equipment'
- GET '/equipments/search'
- DELETE '/equipment/:id' //token
- DELETE '/equipment/admin/:id' //token //isAdmin
- PATCH '/equipment/:id' //token
- POST '/new-equipment' //token

### Paiement

- POST '/create-paiement-session'

### Rental

- GET '/rental/:id'
- GET '/rental/renter/:id'
- GET '/rental/owner/:id'
- POST '/rental/new-rental' //token
- PATCH '/rental/status/:id' //token

### Review

- POST '/review-user' //token
- GET '/review-user/:rental_id' //token
- POST '/review-equipment' //token
- GET '/review-equipment/:rental_id' //token
- GET '/review-user/user/:user_id'
- GET '/review-equipment/equipment/:equipment_id'
- GET '/reviews-given/:user_id' //token
- PATCH '/review-user/:reviews_user_id' //token
- PATCH '/review-equipment/:reviews_equipment_id' //token

### User

- GET '/users' //token
- GET '/role/users' //token //isAdmin
- PATCH '/:id/ban' //token //isAdmin
- PATCH '/:id/isAdmin' //token //isSuperAdmin
- GET '/role/admin' //token //isAdmin
- GET '/user/:id' //token
- GET '/verify-email'
- POST '/new-user'
- PATCH '/edit-profile/:id' //token

### Conversation

- GET '/conversations' //token
- POST '/conversations' //token
- GET '/conversations/:id' //token
- GET '/conversations/:conversation_id/messages' //token;
- POST '/messages'//token
- POST '/messages/read' //token

## Librairies & Dépendances

### Dépendances back-end

- Sequelize
- Dotenv
- Bcrypt
- JsonWebToken
- Stripe
- Multer-storage-coudinary
- Socket.io

### Dépendances front-end

- TypeScript
- Tailwind CSS
- React-icon
- EsLint
- ReactDayPicker
- ReactLoaderSpinner
- Stripe
- Socket.io-client
