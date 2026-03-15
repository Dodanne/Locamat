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
│ |   ├─init.js
│ |   └─sequelize.js
│ ├───routes
│ |     ├─auth.routes.js
│ |     ├─category.routes.js
│ |     ├─equipment.routes.js
│ |     ├─index.routes.js
│ |     ├─paiement.routes.js
│ |     ├─rental.routes.js
│ |     ├─review.routes.js
│ |     └─user.routes.js
│ ├───controllers
│ |     ├─auth.controller.js
│ |     ├─category.controller.js
│ |     ├─equipment.controller.js
│ |     ├─index.controller.js
│ |     ├─paiement.controller.js
│ |     ├─rental.controller.js
│ |     ├─review.controller.js
│ |     └─user.controller.js
│ ├───config
│ |     ├─cloudinary.config.js
│ |     ├─env.js
│ |     └─jwt.config.js
│ ├───middleware
│ |     ├─authentificateToken.js
│ |     ├─isAdmin.js
│ |     ├─isSuperAdmin.js
│ |     └─upload.middleware.js
│ ├───services
│ |     ├─email.service.js
│ |     ├─emailToken.service.js
│ |     └─stripe.service.js
│ ├───models
│ |     ├─Category.js
│ |     ├─Equipment.js
│ |     ├─index.js
│ |     ├─Rental.js
│ |     ├─Review_equipment.js
│ |     ├─Review_user.js
│ |     └─User.js
│ ├─ .env
│ ├─ app.js
│ ├─ server.js
│ └─ package.json
└───front-end
        ├───public
        ├───src
        |    ├───pages
        |    │      ├───Home
        |    │      |    ├───ActionSection.tsx
        |    │      |    ├───Banner.tsx
        |    │      |    ├───CategoriesItems.tsx
        |    │      |    ├───Home.tsx
        |    │      |    ├───PopularItems.tsx
        |    │      |    └───ProcessSteps.tsx
        |    │      ├───User
        |    │      |    ├───Connexion.tsx
        |    │      |    ├───Deconnexion.tsx
        |    │      |    ├───EmailChecked.tsx
        |    │      |    ├───Succes.tsx
        |    │      |    ├───UserForm.tsx
        |    │      |    └───UserProfile.tsx
        |    │      ├───EquipmentItem
        |    │      |    ├───EquipmentItem.tsx
        |    │      |    └───Summary.tsx
        |    │      ├───EquipmentSearch
        |    │      |    └───EquipmentSearch.tsx
        |    │      ├───Admin
        |    │      |    └───Dashboard.tsx
        |    │      ├───AddEquipment
        |    │      |    ├───AddEquipmpent.tsx
        |    │      |    └───Succes.tsx
        |    │      ├───Chat
        |    │      |    └───ChatPage.tsx
        |    │      ├───Errors
        |    │      |    └───404.tsx
        |    │      ├───Legal
        |    │      |    ├───MentionsLegales.tsx
        |    │      |    ├───Confidentialite.tsx
        |    │      |    ├───CGU.tsx
        |    │      |    ├───Cookies.tsx
        |    │      |    └───RGPD.tsx
        |    │      └───Reservation
        |    │           ├───FailPaiement.tsx
        |    │           └───SuccesPaiement.tsx
        |    ├───components
        |    │       ├───admin
        |    │       |     ├───ListeAdministrateurs.tsx
        |    │       |     ├───ListeEquipments.tsx
        |    │       |     ├───ListeUtilisateurs.tsx
        |    │       |     ├───Params.tsx
        |    │       |     └───Statistiques.tsx
        |    │       ├───user
        |    │       |     ├───EquipmentUserProfile.tsx
        |    │       |     ├───OwnerRentalUserProfile.tsx
        |    │       |     ├───RenterRentalUserProfile.tsx
        |    │       |     ├───RenterGivenUserProfile.tsx
        |    │       |     ├───RenterReceivedUserProfile.tsx
        |    │       |     └───ReviewsUserProfile.tsx
        |    │       ├───equipment
        |    │       |     ├───ItemCard.tsx
        |    │       |     └───Reservation.tsx
        |    │       ├───reviews
        |    │       |     └───Reviews.tsx
        |    │       ├───AddEquipmentBtn.tsx
        |    │       ├───Footer.tsx
        |    │       ├───FormatDate.tsx
        |    │       ├───GetInitials.tsx
        |    │       ├───Header.tsx
        |    │       ├───Loader.tsx
        |    │       ├───ProtectedRoute.tsx
        |    │       ├───ScrollToTop.tsx
        |    │       ├───Slider.tsx
        |    │       ├───StarRating.tsx
        |    │       └──StripePaiement.tsx
        |    ├───types
        |    │     ├──Category.ts
        |    │     ├──Equipement.ts
        |    │     ├──Owner.ts
        |    │     ├──Rental.ts
        |    │     ├──Review_equipment.ts
        |    │     ├──Review_user.ts
        |    │     └──User.ts
        |    ├───context
        |    │    ├───AuthContext.tsx 
        |    │    ├───EquipmentContext.tsx 
        |    │    └───StatusContext.tsx 
        |    ├───api 
        |    │    ├───axios.ts 
        |    │    └───axiosAuth.ts
        |    ├───hook 
        |    |     ├───useAdmin.tsx 
        |    |     ├───useCategories.tsx 
        |    |     ├───useEquipments.tsx 
        |    |     ├───usepaiements.tsx 
        |    |     ├───useRentals.tsx 
        |    |     ├───useReviews.tsx 
        |    |     └───useUsers.tsx 
        |    ├───App.tsx
        |    ├───index.css
        |    └───main.tsx 
        ├─.env
        ├─index.html
        ├─tailwind.config.js
        ├─tsconfig.js
        ├─vite.config.js
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

## Librairies & Dépendances

### Dépendances back-end

- Sequelize
- Dotenv
- Bcrypt
- JsonWebToken
- Stripe
- Multer-storage-coudinary

### Dépendances front-end

- TypeScript
- Tailwind CSS
- React-icon
- EsLint
- ReactDayPicker
- ReactLoaderSpinner
- Stripe
