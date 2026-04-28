import { Jimp } from 'jimp';

async function removeBackground() {
  try {
    console.log("Loading image...");
    const image = await Jimp.read('public/logo.png');
    
    // We expect near-black pixels. Threshold of 15 out of 255
    const threshold = 18; 

    // Convert to RGBA
    // not needed in the current Jimp version
    
    // In newer jimp version, scan takes a callback directly or you just iterate.
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If the pixel is very dark (black background)
      if (red < threshold && green < threshold && blue < threshold) {
        // Set alpha to 0 (transparent)
        this.bitmap.data[idx + 3] = 0;
      }
    });

    console.log("Saving image...");
    await image.write('public/logo.png');
    console.log("Background removed successfully!");
  } catch (err) {
    console.error("Error modifying image:", err);
  }
}

removeBackground();
