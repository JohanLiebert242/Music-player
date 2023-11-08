const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');

const player = $('.player');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');

const playList = $('.playlist');
const cd = $('.cd');
const cdWidth = cd.offsetWidth;

const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
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
            name: 'No love no life',
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
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex? 'active' : ''}" data-index="${index}">
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

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong',  {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function() {
        //Cd rotation
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)',
            }
        ], 
            {
                duration: 10000,
                iterations: Infinity,
            },
        );
        cdThumbAnimate.pause();

        // Handle enlarging or shrinking cd
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;
           }

         //Handle play btn
         playBtn.onclick = function() {
            if(app.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
         }  

         //Handle playing state
         audio.onplay = function() {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
         }

         //Handle pausing state
         audio.onpause = function() {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
         }
         
         // Handle progress of songs being changed
         audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercentage = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercentage;
            }
         }

         // Handle changing the progress
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        //Handle next song & random song
        nextBtn.onclick = function() {
            if(app.isRandom) {
                app.randomSong();
            }
            else {
                app.nextSong();
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }

        //Handle prev song  & random song
        prevBtn.onclick = function() {
            if(app.isRandom) {
                app.randomSong();
            }
            else {
                app.prevSong();
            }
            audio.play();
            app.render();
            app.scrollToActiveSong();
        }

        //Handle random song
        randomBtn.onclick = function() {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle('active', app.isRandom);
        }

        //Handle repeat song 
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat;
            repeatBtn.classList.toggle('active', app.isRepeat);
        }

        //Handle when a song ended 
        audio.onended = function() {
            if(app.isRepeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
        }

        //Handle when a song in playlist cliked
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)') || e.target.closest('.option');
            if(songNode) {
                app.currentIndex = Number(songNode.dataset.index);
                app.loadCurrentSong();
                app.render();
                audio.play();
            }
        }
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            if(this.currentIndex === 0 || this.currentIndex === 1 || this.currentIndex === 2) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
            else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                })
            }
        },300)
    },

    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function() {
        //Define new Properties for object
        this.defineProperties();

        //Listen and handle events in DOOM
        this.handleEvents();


        //Load the first song into UI when first starting
        this.loadCurrentSong();

        // Render playlist
        this.render();
    }
}

app.start();