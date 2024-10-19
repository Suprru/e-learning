new Vue({
    el: '#app',
    data: {
        courses: [
            {id: 1, subject: 'biology 301', location: 'London', price: 80, space: 4},
            {id: 2, subject: 'maths 101', location: 'Online', price: 50, space: 20},
            {id: 3, subject: 'french', location: 'France', price: 90, space: 10},
            {id: 4, subject: 'history', location: 'Egypt', price: 23, space: 9},
            {id: 5, subject: 'CS50 2020', location: 'Kenya', price: 65, space: 5},
            {id: 6, subject: 'humanities', location: 'Japan', price: 45, space: 7},
        ],
        cart: [],
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
            console.log(param);
        },
        removeItemFromCart(param) {
            this.cart = this.cart.filter(item => item.id !== param.id);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }
})
