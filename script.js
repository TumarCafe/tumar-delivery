document.addEventListener("DOMContentLoaded", () => {
    const menuItems = [
        { id: 1, name: "Плов", price: 1800, category: "hot" },
        { id: 2, name: "Бешбармак", price: 1500, category: "hot" },
        { id: 3, name: "Чизкейк", price: 1200, category: "desserts" },
        { id: 4, name: "Чай", price: 500, category: "drinks" },
    ];

    const cart = [];
    const menuContainer = document.getElementById("menu-items");
    const cartOverlay = document.querySelector(".cart-overlay");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");
    const closeCartBtn = document.getElementById("close-cart");

    function renderMenu(category = "all") {
        menuContainer.innerHTML = "";
        menuItems
            .filter(item => category === "all" || item.category === category)
            .forEach(item => {
                const div = document.createElement("div");
                div.classList.add("menu-item");
                div.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.price}₸</p>
                    <button onclick="addToCart(${item.id})">Добавить</button>
                `;
                menuContainer.appendChild(div);
            });
    }

    window.addToCart = function(id) {
        const item = menuItems.find(i => i.id === id);
        cart.push(item);
        updateCart();
    };

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ${item.price}₸ <button onclick="removeFromCart(${index})">❌</button>`;
            cartItemsContainer.appendChild(li);
        });
        cartTotal.textContent = total + "₸";
        cartCount.textContent = cart.length;
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    };

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Ваша корзина пуста!");
            return;
        }

        let orderText = "Здравствуйте! Хочу сделать заказ:\n\n";
        cart.forEach((item, index) => {
            orderText += `${index + 1}. ${item.name} - ${item.price}₸\n`;
        });

        orderText += `\nИтого: ${cart.reduce((sum, item) => sum + item.price, 0)}₸\n\n`;
        orderText += "Адрес доставки:\n\n";
        orderText += "Имя: \nТелефон: \nАдрес: \nКомментарий: \n";

        const phoneNumber = "77054517758"; // Номер WhatsApp без "+"
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderText)}`;

        window.location.href = whatsappUrl;
    });

    closeCartBtn.addEventListener("click", () => {
        cartOverlay.style.display = "none";
    });

    document.querySelector(".cart-btn").addEventListener("click", () => {
        cartOverlay.style.display = "flex";
    });

    document.querySelectorAll(".category").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".category.active").classList.remove("active");
            button.classList.add("active");
            renderMenu(button.dataset.category);
        });
    });

    renderMenu();
});