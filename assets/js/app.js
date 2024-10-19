new Vue({
    el: '#app',
    data: {
        courses: [
            {id: 1, subject: 'biology 301', location: 'London', price: 80, space:5},
            {id: 2, subject: 'maths 101', location: 'Online', price: 50, space: 5},
            {id: 3, subject: 'french', location: 'France', price: 90, space: 5},
            {id: 4, subject: 'history', location: 'Egypt', price: 23, space:5},
            {id: 5, subject: 'CS50 2020', location: 'Kenya', price: 65, space:5},
            {id: 6, subject: 'humanities', location: 'Japan', price: 45, space:5},
            {id: 7, subject: 'English', location: 'United Kingdom', price: 95, space:5},
        ],
        cart: [],
        sortKey: 'subject',
        sortOrder: 'asc',
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
        this.updateCourseSpaces();
    },
    computed: {
        sortedCourses() {
            let sorted = [...this.courses];

            sorted.sort((a, b) => {
                let modifier = 1;

                if(this.sortOrder === 'desc') {
                    modifier = -1;
                }

                if(this.sortKey === 'price' || this.sortKey === 'space') {
                    return (a[this.sortKey] - b[this.sortKey]) * modifier;
                } else {
                    let aValue = a[this.sortKey].toLowerCase();
                    let bValue = b[this.sortKey].toLowerCase();
                    if (aValue < bValue) return -1 * modifier;
                    if (aValue > bValue) return 1 * modifier;
                    return 0;
                }
            });
            return sorted;
        },
        totalPrice() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }
    },
    methods: {
        addToCart(param){
            if (param.space > 0){
                param.space -= 1;
                const inCart = this.cart.find(item => item.id === param.id);
                if (inCart) {
                    inCart.quantity += 1;
                } else {
                    this.cart.push({...param, quantity: 1});
                }
                localStorage.setItem('cart', JSON.stringify(this.cart));
                alert(" added to cart!");
            }
        },
        checkout(param) {
            window.location = 'checkout.html';
        },
        removeItemFromCart(param) {
            const inCart = this.cart.find(item => item.id === param.id);
            if (inCart) {
                inCart.quantity = inCart.quantity - 1;

                var originalCourse = this.courses.find(c => c.id === param.id);
                originalCourse += 1;

                if (inCart.quantity === 0) {
                    this.cart = this.cart.filter(item => item.id !== param.id);
                }
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        },
        updateCourseSpaces() {
            this.cart.forEach(cartItem => {
                const course = this.courses.find(c => c.id === cartItem.id);
                if (course) {
                    course.space -= cartItem.quantity;
                }
            });
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
