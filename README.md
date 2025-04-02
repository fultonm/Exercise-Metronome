# React Metronome App

This is a simple React application that implements a metronome. The metronome allows users to set a tick interval, specify the number of ticks per set, and define the number of sets to play. It uses the Web Audio API to produce sound for each tick.

## Project Structure

```
react-metronome-app
├── public
│   ├── index.html         # Main HTML file
├── src
│   ├── components
│   │   └── Metronome.jsx  # Metronome component
│   ├── App.jsx            # Main application component
│   ├── index.js           # Entry point of the application
├── package.json           # NPM configuration file
├── README.md              # Project documentation
```

## Getting Started

To get started with the React Metronome App, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd react-metronome-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

   This will start the development server and open the application in your default web browser.

## Usage

- Adjust the "Tick Interval" to set how often the metronome ticks.
- Specify the number of ticks per set and the number of sets to play.
- Click "Start" to begin the metronome and "Stop" to halt it.

## License

This project is licensed under the MIT License.