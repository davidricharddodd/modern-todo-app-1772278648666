# Todo List Application with Light/Dark Theme

A modern, responsive todo list application with light and dark theme support, built with HTML, CSS, and JavaScript.

## Features

- ✅ **Light/Dark Theme Toggle** - Switch between light and dark modes
- ✅ **Add, Edit, Delete Tasks** - Full CRUD functionality
- ✅ **Task Completion** - Mark tasks as complete/incomplete
- ✅ **Task Filtering** - View all, active, or completed tasks
- ✅ **Statistics** - Track total, completed, and remaining tasks
- ✅ **Local Storage** - Persists todos and theme preference
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Clean UI** - Modern, intuitive interface with smooth animations
- ✅ **Keyboard Support** - Add tasks with Enter key, edit with double-click

## Live Demo

[View Live Demo](#) *(Replace with your deployment URL)*

## Screenshots

### Light Theme
![Light Theme Screenshot](#)

### Dark Theme
![Dark Theme Screenshot](#)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd todo-list-app
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js with http-server
   npx http-server .
   ```

## Usage

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click the "Add Task" button

### Managing Tasks
- **Complete Task**: Click the checkbox
- **Edit Task**: Double-click the task text
- **Delete Task**: Click the trash icon
- **Filter Tasks**: Use the filter buttons (All, Active, Completed)
- **Clear Completed**: Remove all completed tasks

### Theme Switching
- Click the theme toggle button in the top-right corner to switch between light and dark modes

## File Structure

```
todo-list-app/
├── index.html          # Main HTML file
├── style.css           # CSS styles with theme variables
├── script.js           # JavaScript application logic
└── README.md           # This file
```

## Code Structure

### HTML Structure
- Semantic HTML5 elements
- Font Awesome icons
- Google Fonts (Poppins, Roboto)
- Organized sections: Header, Input, Stats, Todo List, Footer

### CSS Architecture
- CSS Custom Properties (CSS Variables) for theming
- Responsive design with media queries
- Modern CSS features (Flexbox, Grid, transitions, animations)
- BEM-like naming convention

### JavaScript Features
- Module pattern for organization
- LocalStorage API for data persistence
- Event delegation for dynamic elements
- ES6+ features (arrow functions, template literals, destructuring)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Styling with CSS variables for theming
- **JavaScript (ES6+)** - Application logic
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **LocalStorage** - Data persistence

## Future Enhancements

- [ ] Drag and drop task reordering
- [ ] Due dates and reminders
- [ ] Task categories/tags
- [ ] Export/import functionality
- [ ] PWA support (offline capability)
- [ ] Backend integration
- [ ] User authentication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by various todo list applications
- Icons by [Font Awesome](https://fontawesome.com)
- Fonts by [Google Fonts](https://fonts.google.com)
- Color palette inspired by modern design systems

---

Made with ❤️ by [Your Name](https://github.com/yourusername)
