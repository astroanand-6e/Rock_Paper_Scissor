# Rock Paper Scissors CV

A computer vision powered Rock Paper Scissors game built for a hackathon. This web application uses TensorFlow.js and MediaPipe to detect hand gestures in real-time and play Rock Paper Scissors against the computer.

## Features

- Real-time hand gesture recognition (Rock, Paper, Scissors)
- Computer opponent with random move generation
- Score tracking
- Clean, modern UI with responsive design
- Countdown timer for gameplay
- Works offline with service worker

## Technologies Used

- HTML5, CSS3, JavaScript
- TensorFlow.js for machine learning
- MediaPipe Hands for hand pose detection
- Progressive Web App features (offline support)

## How to Play

1. Open the web application in a browser that supports WebRTC (most modern browsers)
2. Grant camera permissions when prompted
3. Click "Start Game" to begin
4. Make a hand gesture for Rock, Paper, or Scissors
5. Hold your gesture until the countdown completes
6. See who wins!

## Hand Gesture Guide

- **Rock**: Make a fist with all fingers closed
- **Paper**: Open your hand with all fingers extended
- **Scissors**: Extend your index and middle fingers while keeping others closed

## Keyboard Shortcuts

- **Space**: Start a new game
- **R**: Reset scores
- **Esc**: Cancel current game

## Local Development

1. Clone the repository
2. Open the project folder
3. Start a local web server (e.g., using Python's `http.server` or Node.js Live Server)
4. Open the local address in your browser

```bash
# Example using Python 3
python -m http.server

# Example using npm live-server
npx live-server
```

## Hosting

This project can be deployed to any static site hosting service such as:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## Hackathon Criteria Alignment

This project was designed to meet the hackathon judging criteria:

### User Experience
- Smooth and intuitive game flow
- Clear instructions and visual feedback
- Keyboard shortcuts for power users

### Visual Design
- Clean, modern UI with consistent styling
- Responsive layout that works across devices
- Animated feedback for game results

### Functionality
- Real-time hand gesture recognition
- Complete game logic implementation
- Offline capability with service worker

### Code Quality
- Modular code organization
- Clear separation of concerns
- Well-commented code for maintainability

## Future Improvements

- Add multiplayer support
- Implement difficulty levels for the computer opponent
- Add sound effects and more animations
- Improve hand gesture recognition accuracy
- Add more game modes (e.g., Rock Paper Scissors Lizard Spock)

## License

MIT License
