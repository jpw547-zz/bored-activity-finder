const MAX_ACCESS = 1.0;
const MIN_ACCESS = 0.0;
const MAX_PRICE = 1.0;
const MIN_PRICE = 1.0;

const app = new Vue({
    el: '#app',
    data: {
        current: {},
        loaded: false,
        low: false,
        medium: false,
        high: false,
        priceCount: 0
    },
    methods: {
        getActivity() {
            this.loaded = false;
            const url = "http://localhost:2700/activity?minaccessibility=0.4";
            // const url = "http://localhost:2700/activity";
            const response = axios.get(url).then(response => {
                // console.log(response);
                this.current = response.data;
                this.loaded = true;
                this.price();
            });
        },
        activityType(t) {
            if (t === "diy") {
                return "DIY";
            } else {
                return t;
            }
        },
        price() {
            var percent = Math.floor((this.current.price / MAX_PRICE) * 100);
            if (percent == 0) {
                this.priceCount = 0;
                return;
            } else {
                this.priceCount = Math.floor(percent / 20);
                if (this.priceCount === 0) {
                    this.priceCount = 1;
                }
            }
        }
    },
    computed: {
        accessibility() {
            this.low = false;
            this.medium = false;
            this.high = false;
            var percent = Math.floor((this.current.accessibility / MAX_ACCESS) * 100);
            var rating = "";

            switch (true) {
                case percent < 33:
                    rating = "Low";
                    this.low = true;
                    break;
                case percent < 66:
                    rating = "Medium";
                    this.medium = true;
                    break;
                case percent <= 100:
                    rating = "High";
                    this.high = true;
                    break;
            }
            console.log(rating);
            return rating;
        },
        fullWords() {
            return window.screen.width > 768;
        }
    }
});