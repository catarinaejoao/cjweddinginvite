#!/bin/bash

# Define the directory containing your icons
TARGET_DIR="./assets/icons"

# Target width for web icons (Height is set to 0 to automatically preserve aspect ratio)
TARGET_WIDTH="512"

# Check if directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Error: Directory $TARGET_DIR does not exist."
    exit 1
fi

echo "🚀 Starting image optimization in: $TARGET_DIR"
echo "------------------------------------------------"

# Loop through all PNG images in the folder
for img in "$TARGET_DIR"/*.png; do
    
    # Ensure files actually match the glob pattern
    [ -e "$img" ] || continue
    
    # Get the raw filename
    filename=$(basename "$img")
    
    # Skip any images containing "-original"
    if [[ "$filename" == *"-original"* ]]; then
        echo "⏭️  Skipping original backup: $filename"
        continue
    fi
    
    # Define output filename
    output_webp="${img%.png}.webp"
    
    echo "⚙️  Optimizing: $filename..."
    
    # Perform resizing and conversion natively in cwebp
    cwebp -q 85 -resize $TARGET_WIDTH 0 -quiet "$img" -o "$output_webp"
    
    # Check if successful
    if [ $? -eq 0 ]; then
        orig_size=$(du -sh "$img" | cut -f1 | xargs)
        new_size=$(du -sh "$output_webp" | cut -f1 | xargs)
        echo "✅ Created: $(basename "$output_webp") ($orig_size ➡️  $new_size)"
    else
        echo "❌ Failed to process: $filename"
    fi
done

echo "------------------------------------------------"
echo "🎉 Optimization complete!"