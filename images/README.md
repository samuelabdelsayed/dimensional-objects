# How to Create Dimension Cube Images

Follow these steps to create the images for the README:

## Step 1: Run the Application
Make sure the server is running:
```
node server.js
```

## Step 2: Access the Application
Open your web browser and go to http://localhost:3001

## Step 3: Create Screenshots
For each dimension (1D, 2D, 3D, and 4D):
1. Select "cube" from the object type dropdown
2. Take a screenshot of just that dimension's panel
3. Crop the image to show only the cube in that dimension
4. Save the screenshot with the appropriate filename in the images directory:
   - 1D cube: `images/1d_cube.png`
   - 2D cube: `images/2d_cube.png`
   - 3D cube: `images/3d_cube.png`
   - 4D cube: `images/4d_cube.png`

## Step 4: Commit and Push the Images
After creating all four images, add them to git and push:
```
git add images/*.png
git commit -m "Added cube dimension visualizations"
git push origin main
```

## Step 5: Verify
Check the README on GitHub to make sure the images are displaying correctly.