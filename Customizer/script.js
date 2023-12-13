document.getElementById('textInput').addEventListener('input', function() {
    document.getElementById('textPlaceholder').textContent = this.value;
});

document.getElementById('textInputTwo').addEventListener('input', function() {
    document.getElementById('textPlaceholderTwo').textContent = this.value;
});

document.getElementById('textInputThree').addEventListener('input', function() {
    document.getElementById('textPlaceholderThree').textContent = this.value;
});

function changePattern(pattern) {
    const iphoneCover = document.getElementById('iphone-cover');
    iphoneCover.className = ''; // Remove all existing classes
    iphoneCover.style.backgroundImage = '';
    iphoneCover.classList.add(pattern); // Add the selected pattern class
}


function displayImage(event) {
    const uploadedImage = document.getElementById('iphone-cover');
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        uploadedImage.classList = '';
        uploadedImage.classList.add('patternImg')
        uploadedImage.style.backgroundImage = `url(${reader.result})`;
    }

    reader.readAsDataURL(image);
}

function displayStickerOne(event) {
    const uploadedImage = document.getElementById('stickerOne');
    const image = event.target.files[0];
    const reader = new FileReader();



    reader.onload = function() {
        uploadedImage.style.backgroundImage = `url(${reader.result})`;
    }

    reader.readAsDataURL(image);
}

function displayStickerTwo(event) {
    const uploadedImage = document.getElementById('stickerTwo');
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        uploadedImage.style.backgroundImage = `url(${reader.result})`;
    }


    reader.readAsDataURL(image);
}

function deleteImage(elemId) {
    const uploadedImage = document.getElementById(elemId);
    uploadedImage.style.backgroundImage = 'none';

    // Clear the file input
    document.getElementById('imageUpload').value = null;
}

function takeScreenshot() {
    const elementToCapture = document.getElementById('iphone-cover');

    html2canvas(elementToCapture).then(canvas => {
        const screenshotURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = screenshotURL;
        link.download = 'screenshot.png';
        link.click();
    });

    displaySuccesfulView();
}

function displaySuccesfulView() {
    const element = document.getElementById('successView')
    element.style.opacity = 1;
    element.style.pointerEvents = 'unset'
}



function reloadPage() {
    location.reload();
}

document.addEventListener("DOMContentLoaded", function(event) {
    const loader = document.getElementById('splash-overlay');

    setTimeout(function(){
        loader.style.opacity = 0;
        loader.style.pointerEvents = 'none';
    }, 1500);
    setTimeout(function(){
        loader.style.display = 'none';
    }, 2000);
});


document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animated-element');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function handleScroll() {
        animatedElements.forEach(function(element) {
            if (isInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger check on page load
});






