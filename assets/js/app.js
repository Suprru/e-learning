new Vue({
    el: '#app',
    data: {
        courses: [
            {id: 1, subject: 'biology 301', location: 'London', price: 80, space: 4},
            {id: 2, subject: 'maths 101', location: 'Online', price: 50, space: 30},
            {id: 3, subject: 'french', location: 'France', price: 90, space: 10},
            {id: 4, subject: 'history', location: 'Egypt', price: 23, space: 9},
            {id: 5, subject: 'CS50 2020', location: 'Kenya', price: 65, space: 5},
            {id: 6, subject: 'humanities', location: 'Japan', price: 45, space: 7},
            {id: 7, subject: 'English', location: 'United Kingdom', price: 95, space: 0},
        ],
        cart: [],
        name_: '',
        phone: '',
        validName: false,
        validPhone: false
    },
    created() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
    },
    computed: {
        totalPrice() {
            return this.cart.reduce((sum, item) => sum + item.price, 0);
        }
    },
    methods: {
        addToCart(param){
            this.cart.push(param);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            alert(" added to cart!");   
        },
        checkout(param) {
            window.location = 'checkout.html';
        },
        removeItemFromCart(param) {
            this.cart = this.cart.filter(item => item.id !== param.id);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        validateName() {
            const nameRegx = /^[a-zA-Z\s]+$/;
            this.validName = nameRegx.test(this.name_)
        },
        validatePhone() {
            const phoneRegx = /^[0-9]+$/;
            this.validPhone = phoneRegx.test(this.phone)
        },
        completeOrder() {
            alert(`Order Completed ${name_.value}`);
            // any logic here
            this.cart = []
            console.log(name_.value, phone.value);
        }
    }
})
