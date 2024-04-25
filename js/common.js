const artistRadio = document.getElementById('artistRadio');
const titleRadio = document.getElementById('titleRadio');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const itemList = document.querySelector('.items');
const item = document.querySelector('.item');
const albumImg = document.querySelectorAll('.albumImg');
const items = document.querySelectorAll('.item');
const footer = document.querySelector('footer');
const footerBtns = document.querySelectorAll('footer > a');
const myPage = document.querySelector('.myPage');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'baa1183da2msh20e50e6e008ef61p16540bjsn1ee33e994319',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
    },
};
window.onload = function () {
    window.location.href = './page/login.html';
};
itemList.addEventListener('click', (e) => {
    const clickedAlbumImg = e.target.closest('.albumImg');
    if (clickedAlbumImg) {
        e.stopPropagation();
        const parentItem = clickedAlbumImg.closest('.item');

        if (parentItem) {
            const clickedItem = parentItem;
            const itemData = {
                id: clickedItem.id,
                title: clickedItem.querySelector('h2').textContent,
                singer: clickedItem.querySelector('.singer').textContent,
                src: clickedItem.querySelector('img').src,
                lyrics: clickedItem.querySelector('.lyrics').innerHTML,
                music: clickedItem.querySelector('embed').src,
            };

            // 로컬 스토리지에서 기존 데이터 가져오기
            let storedData = JSON.parse(localStorage.getItem('clickedItemData'));
            if (!storedData) {
                storedData = [];
            }

            // 중복 데이터 확인
            const isDuplicate = storedData.some((data) => data.id === itemData.id);

            if (!isDuplicate) {
                alert('저장되었습니다!');
                storedData.push(itemData);
                localStorage.setItem('clickedItemData', JSON.stringify(storedData));
            } else {
                alert(`이미 마이리스트에 있음`);
            }
            return;
        }
    } else {
        const clickedItem = e.target.closest('.item');
        if (clickedItem) {
            clickedItem.classList.toggle('on');
            const allItems = document.querySelectorAll('.item');
            allItems.forEach((item) => {
                if (item !== clickedItem) {
                    item.classList.remove('on');
                }
            });
            // 클릭된 아이템의 id를 전달하여 getMusic 및 getMusicLyrics 호출
            getMusic(clickedItem.id);
            getMusicLyrics(clickedItem.id);
        }
    }
});


footer.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('footer > a');
    if (clickedLink) {
        footerBtns.forEach((btn) => {
            btn.classList.remove('active');
        });
        clickedLink.classList.add('active');
    }
});
myPage.addEventListener('click', () => {
    const myMusic = JSON.parse(localStorage.getItem('clickedItemData'));
    // console.log(myMusic);
    if (myMusic == null) {
        itemList.innerHTML = `<li class='nolist'>마이리스트가 없습니다.</li>`;
        return;
    } else if (myMusic && myMusic.length > 0) {
        renderMyMusics(myMusic);
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchType = artistRadio.checked ? 'artist' : 'title';

    const getSearchInfo = searchInput.value;

    if (searchType == 'title') {
        getMusicTitle(getSearchInfo);
    } else {
        getMusicTitle(getSearchInfo);
    }
});

const getMusicTitle = async (searchInfo) => {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchInfo}&per_page=10&page=1`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        let musicList = data.hits;
        // console.log(data);
        // console.log(musicList);
        renderMusics(musicList);
    } catch (error) {
        console.error(error);
    }
};

const getMusicLyrics = async (songInfo) => {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songInfo}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        let lyricsIndex = data.lyrics.lyrics.body.html;
        // console.log(data);
        // console.log(lyricsIndex);
        createLyrics(lyricsIndex);
    } catch (error) {
        console.error(error);
    }
};

const getMusic = async (songInfo) => {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${songInfo}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        let musicPlayer = data.song;
        createPlayer(musicPlayer);
    } catch (error) {
        console.error(error);
    }
};

const createMusics = (music) => {
    return `
    <li class="item" id="${music.result.id}">
        <div class="itemWrap">
            <div class="itemText">
                <h2>${music.result.full_title}</h2>
                <p class="singer">${music.result.artist_names}</p>
                <div class="musicPlayer"></div>
                <div class="lyrics"></div>
            </div>
            <div class="albumImg">
                <img src="${music.result.header_image_thumbnail_url}" alt="앨범자켓" />
            </div>
        </div>
    </li>
    `;
};
const createMyMusic = (music) => {
    return `
 <li class="item" id="${music.id}">
    <div class="itemWrap">
        <div class="itemText">
            <h2>${music.title}</h2>
            <p class="singer">${music.singer}</p>
            <div class="musicPlayer">${music.musicPlayer}</div>
            <div class="lyrics">${music.lyrics}</div>
        </div>
        <div class="albumImg">
            <img src="${music.src}" alt="앨범자켓" />
        </div>
    </div>
 </li>
    `;
};

const createLyrics = (lyricsIndex) => {
    const selectedItem = document.querySelector('.item.on > .itemWrap > .itemText');
    if (selectedItem) {
        const lyricsElement = selectedItem.querySelector('.lyrics');
        lyricsElement.innerHTML = lyricsIndex;
    } else {
        lyricsElement.innerHTML = '<p>검색결과가 없습니다.</p>';
    }
};
const createPlayer = (musicDetails) => {
    const selectedItem = document.querySelector('.item.on > .itemWrap > .itemText');
    const playerWrap = selectedItem.querySelector('.musicPlayer'); 
    if (selectedItem) {
        if (musicDetails.apple_music_id == null) {
            playerWrap.innerHTML = '<p>노래가 없습니다 ㅠㅜ</p>';
        } else {
            playerWrap.innerHTML = `<embed src="${musicDetails.apple_music_player_url}" type="audio/mp3"/>`;
        }
    }
};

const renderMusics = (musicList) => {
    if (!musicList || musicList.length === 0) {
        itemList.innerHTML = `<li class='nolist'>검색결과가 없습니다.</li>`;
        return;
    }
    const musicHtml = musicList.map((music) => createMusics(music)).join('');
    itemList.innerHTML = musicHtml;
};
const renderMyMusics = (musicList) => {
    const musicHtml = musicList.map((music) => createMyMusic(music)).join('');
    itemList.innerHTML = musicHtml;
};
