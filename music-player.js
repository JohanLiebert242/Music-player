const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist');
const cd = $('.cd');
const cdWidth = cd.offsetWidth;
const app = {
    currentIndex: 0,
    songs:  [
        {
            name: 'Anh đã ổn hơn',
            singer: 'MCK',
            path: './assets/music/song1.mp3',
            image: './assets/img/image1.jpg',
        },

        {
            name: 'All my ninjas',
            singer: 'Baby Red & Bray',
            path: './assets/music/song2.mp3',
            image: './assets/img/image2.jpg',
        },


        {
            name: 'Anh chỉ muốn',
            singer: 'Ronboogz',
            path: './assets/music/song3.mp3',
            image: './assets/img/image3.jpg',
        },


        {
            name: 'Hit me up',
            singer: 'Binz',
            path: './assets/music/song4.mp3',
            image: './assets/img/image4.jpg',
        },


        {
            name: 'Cuốn cho anh một điếu',
            singer: 'MCK',
            path: './assets/music/song5.mp3',
            image: './assets/img/image5.jpg',
        },


        {
            name: 'Đi qua đồi hoa cúc',
            singer: 'PC',
            path: './assets/music/song6.mp3',
            image: './assets/img/image6.jpg',
        },


        {
            name: 'Đi qua hoa cúp',
            singer: 'MCK',
            path: './assets/music/song7.mp3',
            image: './assets/img/image7.jpg',
        },


        {
            name: 'Tokyo Cypher',
            singer: 'Lil Wuyn & 16 Typh',
            path: './assets/music/song8.mp3',
            image: './assets/img/image8.jpg',
        },


        {
            name: 'Sài gòn ơi',
            singer: 'Obito',
            path: './assets/music/song9.mp3',
            image: './assets/img/image9.jpg',
        },

        {
            name: 'Simp gái 808',
            singer: 'Low g',
            path: './assets/music/song10.mp3',
            image: './assets/img/image10.jpg',
        },
    ],

    render: function() {
        const htmls = this.songs.map((song) => {
            return `
                <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('');
    },

    handleEvents: function() {
        // Ẩn hiện Cd
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
           }
    },

    start: function() {
        this.handleEvents();

        this.currentSong();

        
        this.render();
    }
}

app.start();