const imageLabel = document.getElementById('image-label');
    document.getElementById('image').addEventListener('change', () => {
        console.log("%cIMAGE UPLOADED", 'color: red; font-weight: bold');
        imageLabel.style.backgroundColor = "white";
        imageLabel.style.backgroundImage = "url('images/upload_black.png')";
});