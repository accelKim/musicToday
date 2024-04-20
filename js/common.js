const lyricsRadio = document.getElementById('lyricsRadio');
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
        'X-RapidAPI-Key': 'ef3118dbd4mshac48c8e2a6b1a24p1ead0fjsn684d8ccb26ce',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
    },
};

itemList.addEventListener('click', (e) => {
    const clickedAlbumImg = e.target.closest('.albumImg');
    if (clickedAlbumImg) {
        e.stopPropagation();
        const parentItem = clickedAlbumImg.closest('.item');

        // 부모 요소가 item 클래스를 가지고 있는 경우에만 처리
        if (parentItem) {
            const clickedItem = parentItem;
            const itemData = {
                id: clickedItem.id,
                title: clickedItem.querySelector('h2').textContent,
                singer: clickedItem.querySelector('.singer').textContent,
                src: clickedItem.querySelector('img').src,
                lyrics: clickedItem.querySelector('.lyrics').innerHTML,
                // 필요한 정보들을 추가로 저장할 수 있습니다.
            };

            // 로컬 스토리지에서 기존 데이터 가져오기
            let storedData = JSON.parse(localStorage.getItem('clickedItemData'));
            if (!storedData) {
                storedData = []; // 저장된 데이터가 없으면 빈 배열 생성
            }

            // 중복 데이터 확인
            const isDuplicate = storedData.some((data) => data.id === itemData.id);

            // 중복된 데이터가 없는 경우에만 추가
            if (!isDuplicate) {
                console.log('저장 되었음');
                // 새로운 데이터 추가
                storedData.push(itemData);

                // 로컬 스토리지에 저장
                localStorage.setItem('clickedItemData', JSON.stringify(storedData));
            } else {
                alert(`이미 데이터 있음 ㅋ`);
            }
        }
    }
});

itemList.addEventListener('click', (e) => {
    const clickedItem = e.target.closest('.item');

    if (clickedItem) {
        // 클릭한 요소에 클래스 추가
        clickedItem.classList.toggle('on');

        // 나머지 요소의 클래스 제거
        const allItems = document.querySelectorAll('.item');
        allItems.forEach((item) => {
            if (item !== clickedItem) {
                item.classList.remove('on');
            }
        });

        getMusicLyrics(clickedItem.id);
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
    console.log(myMusic);
    if (myMusic && myMusic.length > 0) {
        renderMyMusics(myMusic);
    }
});
// 폼 제출 이벤트 리스너 추가
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    // 라디오 버튼 값 가져오기
    const searchType = lyricsRadio.checked ? 'lyrics' : 'title';

    // 입력 필드 값 가져오기
    const getSearchInfo = searchInput.value;

    // 가져온 값 확인
    console.log('Search Type:', searchType);
    console.log('Search Keyword:', getSearchInfo);

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
        console.log(data);
        console.log(musicList);
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
        console.log(data);
        console.log(lyricsIndex);
        createLyrics(lyricsIndex);
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
    if (lyricsIndex == null) {
        lyricsWrap.innerHTML = `<p class='nolist'>검색결과가 없습니다.</p>`;
        return;
    }
    // 선택한 항목의 가사를 표시할 요소를 찾아서 해당 요소의 innerHTML을 설정
    const selectedItem = document.querySelector('.item.on > .itemWrap > .itemText');
    if (selectedItem) {
        const lyricsElement = selectedItem.querySelector('.lyrics');
        lyricsElement.innerHTML = lyricsIndex;
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
    if (musicList.length == 0) {
        itemList.innerHTML = `<li class='nolist'>검색결과가 없습니다.</li>`;
        return;
    }
    const musicHtml = musicList.map((music) => createMyMusic(music)).join('');
    itemList.innerHTML = musicHtml;
};
