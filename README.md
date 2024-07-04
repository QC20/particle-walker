# Particle Swarm Interactive Visualization 🌟

## About
This project is an interactive particle swarm visualization that responds to user input, creating a mesmerizing and dynamic visual experience. It explores the intersection of generative art, user interaction, and performance optimization.

![Particle Swarm Demo](link-to-your-demo-gif-or-image.gif)

## Features 🚀

- **Responsive Particle System**: Adapts to both desktop and mobile environments
- **Mouse Influence**: Particles react to mouse movement, creating an engaging user experience
- **Click Randomization**: Instantly refreshes the particle arrangement
- **Radius Control**: Adjust the interaction field using the mouse wheel
- **Performance Optimized**: Ensures smooth performance even on mobile devices

## Interaction Guide 🖱️

- **Mouse Movement**: Influence particle behavior
- **Click**: Randomize particle positions
- **Mouse Wheel**: Adjust the radius of influence

## Technical Highlights 💻

- Built with p5.js for smooth canvas rendering
- Implements vector mathematics for natural-feeling motion
- Utilizes perlin noise for organic movement patterns
- Responsive design with mobile detection

## Getting Started 🏁

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Move your mouse, click, and scroll to interact with the particles!

## Customization 🎨

Feel free to experiment with the `influences` object in `sketch.js` to create your own unique particle behaviors:

```javascript
let influences = {
  mouse: 0.008,
  particles: 0.0025,
  center: 0.006,
  noise: 3
};