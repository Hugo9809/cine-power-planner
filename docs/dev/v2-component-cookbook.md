# V2 Component Cookbook

This guide provides copy-paste recipes for common UI development tasks in the V2 SPA architecture.

## 1. Creating a New Page (View)

Views live in `src/scripts/v2/views/`. They must implement the **View Interface**.

### Template (`my-new-view.js`)

```javascript
import { createElement } from '../../modules/ui.js';

export default class MyNewView {
    constructor() {
        this.container = null;
    }

    /**
     * Called when the route is matched.
     * @param {HTMLElement} container - The #app-content div
     */
    mount(container) {
        this.container = container;
        this.render();
        this.attachListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="v2-view-header">
                <h1>My New View</h1>
            </div>
            <div class="v2-view-content">
                <p>Hello World</p>
                <button id="my-action-btn" class="btn-primary">Do Action</button>
            </div>
        `;
    }

    attachListeners() {
        const btn = this.container.querySelector('#my-action-btn');
        btn?.addEventListener('click', this.handleAction.bind(this));
    }

    handleAction() {
        console.log('Action clicked!');
    }

    /**
     * Cleanup (Critical for SPA memory management)
     */
    unmount() {
        // Remove event listeners if they were attached to global objects
        // Container cleanup is handled by the router clearing innerHTML
        this.container = null;
    }
}
```

### Registering the Route
In `src/scripts/v2/view-manager.js`:

```javascript
import MyNewView from './views/my-new-view.js';

// ... inside init()
this.routes = {
    // ... existing routes
    '#/my-view': new MyNewView()
};
```

## 2. UI Components (CSS Classes)

Using `src/styles/v2/*.css` variables.

### Buttons
```html
<button class="btn-primary">Save Changes</button>
<button class="btn-secondary">Cancel</button>
<button class="btn-danger">Delete</button>
<button class="btn-icon"><img src="icon.svg"></button>
```

### Cards
```html
<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-body">
        Content...
    </div>
</div>
```

## 3. Dealing with Global State

Do **NOT** poll for changes. Use Events.

```javascript
// In mount()
window.addEventListener('cine:projectLoaded', this.onProjectLoaded);

// In unmount() - MANDATORY
window.removeEventListener('cine:projectLoaded', this.onProjectLoaded);

// Handler
onProjectLoaded(e) {
    this.refreshData(e.detail.projectId);
}
```

## 4. Modals

Use the `cineUi` module.

```javascript
import { cineModules } from '../../modules/registry.js'; // Or window.cineModules

cineModules.cineUi.showModal({
    title: 'Create Item',
    content: '<input type="text" id="new-item-name">',
    buttons: [
        { 
            label: 'Create', 
            primary: true, 
            onClick: () => {
                const val = document.getElementById('new-item-name').value;
                return createItem(val); // Return true/promise to close
            } 
        }
    ]
});
```
