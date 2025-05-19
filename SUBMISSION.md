# Rock Paper Scissors CV - Hackathon Submission

## Project Overview
Rock Paper Scissors CV is an innovative web application that uses computer vision to play the classic game of Rock Paper Scissors against the computer. The player makes hand gestures in front of their webcam, and the computer vision system detects and interprets these gestures in real-time to determine the player's move.

## Demo Link
- [Live Demo](#) (Replace with your hosted link after deployment)
- [GitHub Repository](#) (Replace with your GitHub repository link after pushing to GitHub)

## Technologies Used
- HTML5, CSS3, JavaScript
- TensorFlow.js for machine learning
- MediaPipe Hands for hand pose detection
- Progressive Web App capabilities with service worker

## Features

### Computer Vision Gesture Recognition
- Real-time hand tracking using MediaPipe Hands model
- Accurate detection of Rock, Paper, and Scissors hand gestures
- Visual feedback showing the detected hand landmarks
- Confidence-based gesture recognition with history tracking for stability

### Game Mechanics
- Traditional Rock-Paper-Scissors rules
- Computer opponent with random move selection
- Score tracking for player and computer
- Visual animations for player and computer moves
- Countdown timer for gameplay pacing

### User Experience
- Clean, intuitive user interface
- Real-time visual feedback of detected gestures
- Responsive design that works across devices
- Keyboard shortcuts for power users
- Offline capability through PWA features

## How It Addresses Judging Criteria

### User Experience
The application features smooth gesture detection with immediate visual feedback, making the interaction feel natural and intuitive. The countdown timer creates a smooth game flow, and the real-time hand tracking gives users immediate feedback on how the system perceives their hand position.

### Visual Design
The UI employs a clean, modern dark theme with contrasting accent colors for important elements. The layout is consistent across screens, with clear visual hierarchy and appealing animations that enhance the gameplay without being distracting.

### Functionality
Every feature works seamlessly together, from the hand detection to the game logic. The computer vision system accurately detects hand gestures, the game logic correctly determines winners, and the scoring system accurately tracks progress. The application also works offline thanks to the service worker implementation.

### Code Quality
The codebase is organized into modular components with clear separation of concerns:
- `handDetection.js` handles computer vision and gesture recognition
- `gameLogic.js` manages game rules and scoring
- `app.js` coordinates the overall application flow
- `computerMoves.js` handles visual representation of the computer's choices

## Challenges and Solutions

### Challenge 1: Reliable Hand Gesture Recognition
**Solution:** Implemented a confidence-based gesture recognition system with a history buffer to ensure stable gesture detection, reducing false positives and providing consistent user experience.

### Challenge 2: Performance Optimization
**Solution:** Optimized the TensorFlow.js and MediaPipe models to run efficiently in the browser, balancing accuracy with performance to ensure smooth gameplay even on lower-end devices.

### Challenge 3: Cross-Browser Compatibility
**Solution:** Used standardized web APIs and included fallbacks where necessary to ensure compatibility across major modern browsers.

## Future Improvements
- Multiplayer mode via WebRTC
- Additional game modes (Rock Paper Scissors Lizard Spock)
- Difficulty levels for the computer opponent
- Custom hand gesture training for accessibility
- Enhanced animations and sound effects

## Team Member
- [Your Name]

## Screenshots
*Include screenshots or GIFs here*

## Conclusion
Rock Paper Scissors CV demonstrates how modern web technologies can transform a simple classic game into an engaging, interactive experience. By leveraging computer vision, we've created a hands-free gaming experience that feels intuitive while showcasing the capabilities of browser-based machine learning.

Thank you for considering our submission!
