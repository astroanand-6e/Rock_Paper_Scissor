<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Rock Paper Scissors CV Application

This application is a computer vision powered Rock Paper Scissors game for a hackathon. The app uses TensorFlow.js and MediaPipe Hands to detect hand gestures in real-time for playing Rock Paper Scissors against the computer.

## Architecture

- `index.html`: Main HTML file
- `styles.css`: CSS styling for the application
- `handDetection.js`: Module for hand gesture detection using TensorFlow.js
- `gameLogic.js`: Module for Rock Paper Scissors game rules and logic
- `app.js`: Main application entry point that ties everything together
- `service-worker.js`: Service worker for offline capabilities
- `manifest.json`: Web app manifest for PWA support
- `icons/`: Directory containing app icons

## Development Guidelines

1. Maintain clean, modular code with clear separation of concerns
2. Follow modern JavaScript best practices
3. Prioritize performance and responsiveness
4. Ensure accessibility features are implemented
5. Always test on multiple browsers and devices

## Hackathon Judging Criteria

- User Experience: Navigation and flow should feel smooth, clear, and intuitive
- Visual Design: Clean visuals with strong consistency and appealing layout
- Functionality: Every feature should work as expected with no broken elements
- Code Quality: Clean, organized, and efficient implementation throughout

## Potential Enhancements

- Add multiplayer support
- Implement difficulty levels for the computer opponent
- Add sound effects and more animations
- Improve hand gesture recognition accuracy
- Add more game modes (like Rock Paper Scissors Lizard Spock)
