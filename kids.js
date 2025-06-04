// Kids Section JavaScript

// Shopping cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    showAllProducts();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});

// Add item to cart
function addToCart(id, price, name) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    cartCount++;
    cartTotal += price;
    updateCartDisplay();
    
    // Show success animation
    showAddToCartSuccess(name);
}

// Remove item from cart
function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cartTotal -= (item.price * item.quantity);
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        updateCartModal();
    }
}

// Update cart display
function updateCartDisplay() {
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal.toLocaleString();
}

// Show add to cart success message
function showAddToCartSuccess(itemName) {
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #00b894, #00a085);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            z-index: 3000;
            box-shadow: 0 10px 25px rgba(0, 184, 148, 0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        ">
            <strong>🎉 Added to Cart!</strong><br>
            <small>${itemName}</small>
        </div>
    `;
    
    document.body.appendChild(successMsg);
    const msgElement = successMsg.firstElementChild;
    
    // Animate in
    setTimeout(() => {
        msgElement.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        msgElement.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 300);
    }, 3000);
}


