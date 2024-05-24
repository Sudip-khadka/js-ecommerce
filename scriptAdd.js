window.addEventListener("load", (event) => {
    if(!localStorage.getItem('token')){
        window.location.href="./index.html"
    }
})

//logout
const logout=(event)=>{
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href='./index.html'
   }

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('addTitle').value.trim();
    const description = document.getElementById('addDescription').value.trim();
    const price = document.getElementById('addPrice').value.trim();
    const image = document.getElementById('addImage').value.trim();

    // Validation flags
    let isValid = true;
    let errorMessage = '';

    // Validate Title
    if (name.length === 0) {
        isValid = false;
        errorMessage += 'Title is required.\n';
    }

    // Validate Description
    const trimmedDescription = description.replace(/\s+/g, ' '); // Replace multiple spaces with a single space
    const wordCount = trimmedDescription.split(' ').filter(word => word !== '').length;
    if (wordCount < 8) {
        isValid = false;
        errorMessage += 'Description must contain a minimum of 8 words.\n';
    }

    // Validate Price
    if (price <= 0 || isNaN(price)) {
        isValid = false;
        errorMessage += 'Price must be a positive number.\n';
    }

    // Validate Image URL (if provided)
    if (image.length > 0) {
        try {
            new URL(image); // This will throw an error if the URL is invalid
        } catch (_) {
            isValid = false;
            errorMessage += 'Image URL is invalid.\n';
        }
    }

    // If the form is invalid, show error message
    if (!isValid) {
        alert(errorMessage);
    } else {
        // If the form is valid, save the product
        const newProduct = { name, description, price, image };
        let products = localStorage.getItem('products');
        products = products ? JSON.parse(products) : [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product added successfully!');

        // Clear the form
        document.getElementById('productForm').reset();
    }
});
