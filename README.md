# Band App

## Description

This is a web application for managing bands and their music. It allows users to create and manage bands, add and manage band members, and create and manage albums.

## Installation

To install and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/mkennedyakgrown/phase-4-project-Band-App.git`
2. Navigate to the project directory: `cd band-app`
3. Install the dependencies: `pipenv install`
4. Activate the Virtual Environment: `pipenv shell`
5. Set up the database:
   - Navigate to the server directory: `cd server`
   - Initialize the SqlAlchemy database with `flask db init`
   - Migrate the database with `flask db migrate -m "Initial migration"`
   - Update the `DATABASE_URI` in the `.env` file with your database credentials
6. Run the migrations: `flask db upgrade`
7. Start the server: `python app.py`
8. Install the client side dependencies:
   - IN A NEW TAB, navigate to the client directory: `cd ..` || `cd client`
   - Install the dependencies: `npm install`
   - Activate the Virtual Environment: `npm start`

## Usage

Once the project is installed and running, you can access the web application by opening your web browser and navigating to `http://localhost:5173`.

Here are some key features and functionality of the application:

- **Band Management**: Create and manage bands. Each band can have multiple members, songs, and instruments.
- **Member Management**: Add and manage band members. Each member can be associated with multiple bands.
- **Genre and Instrument Management**: Add new Genres and Instruments to assign to your bands, songs, and band members.
- **Authentication and Authorization**: Users can register and log in to the application. Only authenticated users can access the band management features.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue on the GitHub repository. Pull requests are also welcome.

## Technologies Used

- Python
- Flask
- SQLAlchemy
- HTML/CSS
- JavaScript

## License

This project is licensed under the [MIT License](LICENSE).
