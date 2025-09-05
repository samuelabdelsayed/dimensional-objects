/**
 * Dimensional Objects Visualizer
 * 
 * A WebGL application that visualizes geometric objects across different dimensions
 */

// Main application class
class DimensionalObjectsApp {
    constructor() {
        // Initialize properties
        this.scenes = {};
        this.cameras = {};
        this.renderers = {};
        this.objects = {};
        this.animationFrames = {};
        this.selectedObjectType = 'cube';
        this.selectedColor = '#3366FF';
        
        // Bind methods
        this.handleObjectTypeChange = this.handleObjectTypeChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.animate = this.animate.bind(this);
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize scenes
        this.initializeAllDimensions();
        
        // Start animation loop
        this.animate();
    }
    
    setupEventListeners() {
        // Get DOM elements
        const objectTypeSelector = document.getElementById('object-type');
        const colorSelector = document.getElementById('object-color');
        
        // Add event listeners
        objectTypeSelector.addEventListener('change', this.handleObjectTypeChange);
        colorSelector.addEventListener('change', this.handleColorChange);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeRenderers();
        });
    }
    
    handleObjectTypeChange(event) {
        this.selectedObjectType = event.target.value;
        this.updateAllObjects();
    }
    
    handleColorChange(event) {
        this.selectedColor = event.target.value;
        this.updateObjectColors();
    }
    
    initializeAllDimensions() {
        // Initialize all dimensional visualizations
        this.initialize1D();
        this.initialize2D();
        this.initialize3D();
        this.initialize4D();
    }
    
    initialize1D() {
        const container = document.getElementById('dimension-1');
        const { scene, camera, renderer } = this.setupBasicScene(container);
        
        this.scenes['1d'] = scene;
        this.cameras['1d'] = camera;
        this.renderers['1d'] = renderer;
        
        // Create the 1D representation (line)
        this.create1DObject();
    }
    
    initialize2D() {
        const container = document.getElementById('dimension-2');
        const { scene, camera, renderer } = this.setupBasicScene(container);
        
        this.scenes['2d'] = scene;
        this.cameras['2d'] = camera;
        this.renderers['2d'] = renderer;
        
        // Create the 2D representation (shape)
        this.create2DObject();
    }
    
    initialize3D() {
        const container = document.getElementById('dimension-3');
        const { scene, camera, renderer } = this.setupBasicScene(container);
        
        this.scenes['3d'] = scene;
        this.cameras['3d'] = camera;
        this.renderers['3d'] = renderer;
        
        // Create the 3D representation (object)
        this.create3DObject();
    }
    
    initialize4D() {
        const container = document.getElementById('dimension-4');
        const { scene, camera, renderer } = this.setupBasicScene(container);
        
        this.scenes['4d'] = scene;
        this.cameras['4d'] = camera;
        this.renderers['4d'] = renderer;
        
        // Create the 4D representation (projection)
        this.create4DObject();
    }
    
    setupBasicScene(container) {
        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Black background
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(
            75, // Field of view
            container.clientWidth / container.clientHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.z = 5;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        return { scene, camera, renderer };
    }
    
    create1DObject() {
        // Remove any existing object
        if (this.objects['1d']) {
            this.scenes['1d'].remove(this.objects['1d']);
        }
        
        // Create a 1D representation (line)
        const geometry = new THREE.BufferGeometry();
        
        // Line vertices depend on the object type
        let length = 2; // Default length
        
        // Create vertices for the line
        const vertices = new Float32Array([
            -length/2, 0, 0,
            length/2, 0, 0
        ]);
        
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        
        // Create material with the selected color
        const material = new THREE.LineBasicMaterial({ 
            color: this.selectedColor 
        });
        
        // Create line
        const line = new THREE.Line(geometry, material);
        
        // Add to scene
        this.scenes['1d'].add(line);
        this.objects['1d'] = line;
    }
    
    create2DObject() {
        // Remove any existing object
        if (this.objects['2d']) {
            this.scenes['2d'].remove(this.objects['2d']);
        }
        
        let geometry;
        
        // Create geometry based on selected object type
        switch(this.selectedObjectType) {
            case 'cube':
                // Square for cube
                geometry = new THREE.PlaneGeometry(2, 2);
                break;
            case 'sphere':
                // Circle for sphere
                geometry = new THREE.CircleGeometry(1, 32);
                break;
            case 'pyramid':
                // Triangle for pyramid
                geometry = new THREE.BufferGeometry();
                const vertices = new Float32Array([
                    0, 1, 0,    // Top
                    -1, -1, 0,  // Bottom left
                    1, -1, 0    // Bottom right
                ]);
                geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
                break;
            default:
                geometry = new THREE.PlaneGeometry(2, 2);
        }
        
        // Create material with the selected color
        const material = new THREE.MeshBasicMaterial({ 
            color: this.selectedColor,
            side: THREE.DoubleSide
        });
        
        // Create mesh
        const shape = new THREE.Mesh(geometry, material);
        
        // Add to scene
        this.scenes['2d'].add(shape);
        this.objects['2d'] = shape;
    }
    
    create3DObject() {
        // Remove any existing object
        if (this.objects['3d']) {
            this.scenes['3d'].remove(this.objects['3d']);
        }
        
        let geometry;
        
        // Create geometry based on selected object type
        switch(this.selectedObjectType) {
            case 'cube':
                geometry = new THREE.BoxGeometry(2, 2, 2);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(1, 32, 32);
                break;
            case 'pyramid':
                geometry = new THREE.ConeGeometry(1, 2, 4);
                break;
            default:
                geometry = new THREE.BoxGeometry(2, 2, 2);
        }
        
        // Create material with the selected color
        const material = new THREE.MeshPhongMaterial({ 
            color: this.selectedColor,
            shininess: 30,
            wireframe: false
        });
        
        // Create mesh
        const object3D = new THREE.Mesh(geometry, material);
        
        // Add to scene
        this.scenes['3d'].add(object3D);
        this.objects['3d'] = object3D;
    }
    
    create4DObject() {
        // Remove any existing object
        if (this.objects['4d']) {
            this.scenes['4d'].remove(this.objects['4d']);
        }
        
        // For 4D objects, we create a 3D projection
        // For a tesseract (4D cube), create a nested cube structure
        
        let object4D;
        
        switch(this.selectedObjectType) {
            case 'cube':
                // Create a tesseract representation (cube within a cube)
                object4D = this.createTesseract();
                break;
            case 'sphere':
                // Create a 4D hypersphere representation (sphere with inner structure)
                object4D = this.createHypersphere();
                break;
            case 'pyramid':
                // Create a 4D hyperpyramid representation
                object4D = this.createHyperpyramid();
                break;
            default:
                object4D = this.createTesseract();
        }
        
        // Add to scene
        this.scenes['4d'].add(object4D);
        this.objects['4d'] = object4D;
    }
    
    createTesseract() {
        // Create a group to hold all parts of the tesseract
        const tesseractGroup = new THREE.Group();
        
        // Create inner cube
        const innerGeometry = new THREE.BoxGeometry(1, 1, 1);
        const innerMaterial = new THREE.MeshPhongMaterial({ 
            color: this.selectedColor,
            opacity: 0.7,
            transparent: true
        });
        const innerCube = new THREE.Mesh(innerGeometry, innerMaterial);
        tesseractGroup.add(innerCube);
        
        // Create outer cube
        const outerGeometry = new THREE.BoxGeometry(2, 2, 2);
        const outerMaterial = new THREE.MeshPhongMaterial({ 
            color: this.selectedColor,
            opacity: 0.5,
            transparent: true,
            wireframe: true
        });
        const outerCube = new THREE.Mesh(outerGeometry, outerMaterial);
        tesseractGroup.add(outerCube);
        
        // Create connecting edges between inner and outer cube
        const edgeMaterial = new THREE.LineBasicMaterial({ color: this.selectedColor });
        
        // Define the 8 corners of the inner cube
        const innerCorners = [
            [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5],
            [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5]
        ];
        
        // Define the 8 corners of the outer cube
        const outerCorners = [
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
            [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1]
        ];
        
        // Connect corresponding corners
        for (let i = 0; i < 8; i++) {
            const lineGeometry = new THREE.BufferGeometry();
            const vertices = new Float32Array([
                innerCorners[i][0], innerCorners[i][1], innerCorners[i][2],
                outerCorners[i][0], outerCorners[i][1], outerCorners[i][2]
            ]);
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            const line = new THREE.Line(lineGeometry, edgeMaterial);
            tesseractGroup.add(line);
        }
        
        return tesseractGroup;
    }
    
    createHypersphere() {
        // Create a group to hold all parts of the hypersphere
        const hypersphereGroup = new THREE.Group();
        
        // Create inner sphere
        const innerGeometry = new THREE.SphereGeometry(0.7, 24, 24);
        const innerMaterial = new THREE.MeshPhongMaterial({ 
            color: this.selectedColor,
            opacity: 0.7,
            transparent: true
        });
        const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
        hypersphereGroup.add(innerSphere);
        
        // Create outer sphere
        const outerGeometry = new THREE.SphereGeometry(1.2, 24, 24);
        const outerMaterial = new THREE.MeshPhongMaterial({ 
            color: this.selectedColor,
            opacity: 0.3,
            transparent: true,
            wireframe: true
        });
        const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
        hypersphereGroup.add(outerSphere);
        
        // Create middle circles to represent cross-sections
        for (let i = 0; i < 3; i++) {
            const circleGeometry = new THREE.TorusGeometry(0.95, 0.02, 16, 100);
            const circleMaterial = new THREE.MeshPhongMaterial({ color: this.selectedColor });
            const circle = new THREE.Mesh(circleGeometry, circleMaterial);
            
            // Rotate each torus to a different orientation
            if (i === 0) {
                circle.rotation.x = Math.PI / 2;
            } else if (i === 1) {
                circle.rotation.y = Math.PI / 2;
            }
            
            hypersphereGroup.add(circle);
        }
        
        return hypersphereGroup;
    }
    
    createHyperpyramid() {
        // Create a group to hold all parts of the hyperpyramid
        const hyperpyramidGroup = new THREE.Group();
        
        // Create inner pyramid
        const innerGeometry = new THREE.ConeGeometry(0.7, 1.4, 4);
        const innerMaterial = new THREE.MeshPhongMaterial({ 
            color: this.selectedColor,
            opacity: 0.7,
            transparent: true
        });
        const innerPyramid = new THREE.Mesh(innerGeometry, innerMaterial);
        hyperpyramidGroup.add(innerPyramid);
        
        // Create outer pyramid
        const outerGeometry = new THREE.ConeGeometry(1.2, 2.4, 4);
        const outerMaterial = new THREE.MeshPhongMaterial({ 
            color: this.selectedColor,
            opacity: 0.3,
            transparent: true,
            wireframe: true
        });
        const outerPyramid = new THREE.Mesh(outerGeometry, outerMaterial);
        hyperpyramidGroup.add(outerPyramid);
        
        // Create connecting lines between vertices
        const lineMaterial = new THREE.LineBasicMaterial({ color: this.selectedColor });
        
        // Connect inner pyramid tip to outer pyramid tip
        const tipLineGeometry = new THREE.BufferGeometry();
        const tipVertices = new Float32Array([
            0, 0.7, 0,   // Inner tip
            0, 1.2, 0    // Outer tip
        ]);
        tipLineGeometry.setAttribute('position', new THREE.BufferAttribute(tipVertices, 3));
        const tipLine = new THREE.Line(tipLineGeometry, lineMaterial);
        hyperpyramidGroup.add(tipLine);
        
        // Connect the base corners
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const nextAngle = ((i + 1) / 4) * Math.PI * 2;
            
            // Inner base corner coordinates
            const innerX = 0.7 * Math.cos(angle);
            const innerZ = 0.7 * Math.sin(angle);
            
            // Outer base corner coordinates
            const outerX = 1.2 * Math.cos(angle);
            const outerZ = 1.2 * Math.sin(angle);
            
            // Create connection between inner and outer corner
            const connLineGeometry = new THREE.BufferGeometry();
            const connVertices = new Float32Array([
                innerX, -0.7, innerZ,   // Inner corner
                outerX, -1.2, outerZ    // Outer corner
            ]);
            connLineGeometry.setAttribute('position', new THREE.BufferAttribute(connVertices, 3));
            const connLine = new THREE.Line(connLineGeometry, lineMaterial);
            hyperpyramidGroup.add(connLine);
        }
        
        return hyperpyramidGroup;
    }
    
    updateAllObjects() {
        this.create1DObject();
        this.create2DObject();
        this.create3DObject();
        this.create4DObject();
    }
    
    updateObjectColors() {
        // Update material colors for all objects
        if (this.objects['1d']) {
            this.objects['1d'].material.color.set(this.selectedColor);
        }
        
        if (this.objects['2d']) {
            this.objects['2d'].material.color.set(this.selectedColor);
        }
        
        if (this.objects['3d']) {
            this.objects['3d'].material.color.set(this.selectedColor);
        }
        
        if (this.objects['4d']) {
            // For 4D object, update all child materials
            this.objects['4d'].traverse((child) => {
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.color.set(this.selectedColor));
                    } else {
                        child.material.color.set(this.selectedColor);
                    }
                }
            });
        }
    }
    
    resizeRenderers() {
        // Resize all renderers when window size changes
        Object.keys(this.renderers).forEach(dim => {
            const container = document.getElementById(`dimension-${dim[0]}`);
            const renderer = this.renderers[dim];
            const camera = this.cameras[dim];
            
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            
            renderer.setSize(width, height);
        });
    }
    
    animate() {
        // Request animation frame for next frame
        const animateFrame = requestAnimationFrame(this.animate);
        
        // Store the animation frame reference for potential cancellation
        this.animationFrames.main = animateFrame;
        
        // Rotate objects
        if (this.objects['1d']) {
            this.objects['1d'].rotation.z += 0.01;
        }
        
        if (this.objects['2d']) {
            this.objects['2d'].rotation.z += 0.01;
        }
        
        if (this.objects['3d']) {
            this.objects['3d'].rotation.x += 0.005;
            this.objects['3d'].rotation.y += 0.01;
        }
        
        if (this.objects['4d']) {
            this.objects['4d'].rotation.x += 0.005;
            this.objects['4d'].rotation.y += 0.01;
            this.objects['4d'].rotation.z += 0.002;
            
            // For tesseract, animate the inner cube differently
            if (this.selectedObjectType === 'cube' && this.objects['4d'].children[0]) {
                this.objects['4d'].children[0].rotation.x += 0.01;
                this.objects['4d'].children[0].rotation.y += 0.005;
            }
        }
        
        // Render all scenes
        Object.keys(this.renderers).forEach(dim => {
            this.renderers[dim].render(this.scenes[dim], this.cameras[dim]);
        });
    }
}

// Initialize the application when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing application...');
    try {
        window.app = new DimensionalObjectsApp();
        console.log('Application initialized successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
        document.body.innerHTML = `<div style="color: white; background: red; padding: 20px; margin: 20px;">
            Error initializing application: ${error.message}<br>
            See console for more details.
        </div>` + document.body.innerHTML;
    }
});