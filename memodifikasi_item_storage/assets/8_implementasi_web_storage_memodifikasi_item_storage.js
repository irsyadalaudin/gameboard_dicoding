// INISIALISASI VARIABEL UNTUK MENAMPUNG ELEMEN DOKUMEN
const localTotalVictoryField = document.getElementById('local-total-victory-field');
const localMaximumAttemptField = document.getElementById('local-maximum-attemp-field');
const destroyDataButton = document.getElementById('destroy-data-button');
const playButton = document.getElementById('play-button');
const beforeGameDisplay = document.getElementById('before-game-display');
const duringGameDisplay = document.getElementById('during-game-display');
const afterGameDisplay = document.getElementById('after-game-display');
const answerButton1 = document.getElementById('answer-1-button');
const answerButton2 = document.getElementById('answer-2-button');
const answerButton3 = document.getElementById('answer-3-button');
const sessionUserAnswerField = document.getElementById('session-user-answer-field');
const sessionUserWrongAnswerField = document.getElementById('session-user-wrong-answer-field');
const sessionTrueAnswerField = document.getElementById('session-true-answer-field');
const sessionUserAttemptsField = document.getElementById('session-user-attempts-field');


// INISIALISASI FUNGSI UNTUK MENGHASILKAN JAWABAN PERMAINAN
function getAnswer() {                                          // function getAnswer() BERFUNGSI UNTUK MENGHASILKAN KOMBINASI DARI ANGKA "1","2", dan "3"
    let answer = '123'.split('');                               //                      KOMBINASI TERSEBUT AKAN MENJADI JAWABAN UNTUK PERMAINAN TEBAK ANGKA
    for (let i = 0; i < answer.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = answer[i];
        answer[i] = answer[j];
        answer[j] = tmp;
    }
    return answer.join('')
}


// INISIALISASI KEY UNTUK SESSION STORAGE                      // VARIABLE-VARIABLE YANG MENAMPUNG key UNTUK session storage MAUPUN local storage
const sessionAnswerKey = 'SESSSION_ANSWER';
const sessionUserAttemptsKey = 'SESSION_USER_ATTEMPTS';
const sessionUserIsPlayingKey = 'SESSION_USER_IS_PLAYING';


// INISIALISASI KEY UNTUK LOCAL STORAGE
const localTotalVictoryKey = 'LOCAL_TOTAL_VICTORIES_PLAYED';
const localMaximumAttemptsKey = 'LOCAL_MAXIMUM_ATTEMPTS';


/* 
UNTUK MEM-BUAT ITEM PADA SESSION STORAGE
sessionStorage.setItem(<namaKey>, <nilaiAwal>);                // (DI KOLOM 62, 65, 68)

UNTUK MEM-BUAT ITEM PADA LOCAL STORAGE
localStorage.setItem(<namaKey>, <nilaiAwal>)                   // (DI KOLOM 71, 74)


UNTUK MENG-AKSES ITEM PADA SESSION STORAGE
sessionStorage.getItem(<namaKey>);                             // (DI KOLOM 61, 64, 67)

UNTUK MENG-AKSES ITEM PADA LOCAL STORAGE
localStorage.getItem(<namaKey>);                               // (DI KOLOM 70, 74)
*/


window.addEventListener('load', function () {
    if (typeof (Storage) !== 'undefined') {                                        // !== MEMBANDINGKAN KEDUA NILAI APAKAH TIDAK IDENTIK DENGAN 'undefined' (DENGAN ARTI LAIN tidak undefined ATAU tidak error)
    // INISIALISASI SEMUA ITEM WEB STORAGE YANG KITA GUNAKAN JIKA BELUM ADA
        if (sessionStorage.getItem(sessionAnswerKey) === null) {
            sessionStorage.setItem(sessionAnswerKey, '');
        }
        if (sessionStorage.getItem(sessionUserAttemptsKey) === null) {
            sessionStorage.setItem(sessionUserAttemptsKey, 0);
        }
        if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
            sessionStorage.setItem(sessionUserIsPlayingKey, false);
        }
        if (localStorage.getItem(localTotalVictoryKey) === null) {
            localStorage.setItem(localTotalVictoryKey, 0);
        }
        if (localStorage.getItem(localMaximumAttemptsKey) === null) {
            localStorage.setItem(localMaximumAttemptsKey, 0);
        }
    } else {
        alert('Browser yang anda gunakan tidak mendukung Web Storage')
        
    }
    // INISIALISASI SEMUA NILAI FIELD PADA DOKUMEN YANG MENGGUNAKAN NILAI DARI WEB STORAGE
    sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
    localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
    localMaximumAttemptField.innerText = localStorage.getItem(localMaximumAttemptsKey);
});


playButton.addEventListener('click', function () {              // (DI HTML: KOLOM 39)
    sessionStorage.setItem(sessionAnswerKey, getAnswer());
    sessionStorage.setItem(sessionUserIsPlayingKey, true);
    beforeGameDisplay.setAttribute('hidden', true);
    duringGameDisplay.removeAttribute('hidden');
});


answerButton1.addEventListener('click', function () {           // event listener untu kevent clICK SETELAH MUNVCUL LAYOUT BARU DIMANA SALAH SATU KONTEN YANG PALING MENCOLOK ADALAH 3 TOMBOL
    sessionUserAnswerField.innerText += '1';                    // t = t + u;  nambah angka 1
    if (sessionUserAnswerField.innerText.length == 3) {         // MEMBANDINGKAN APAKAH NILAI SAMA (BUKAN IDENTIK); JIKA PANJANG NILAI NYA 3
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

answerButton2.addEventListener('click', function () {
    sessionUserAnswerField.innerText += '2';                   // nambah angka 2
    if(sessionUserAnswerField.innerText.length == 3) {
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

answerButton3.addEventListener('click', function () {
    sessionUserAnswerField.innerText += '3';                   // nambah angka 3
    if(sessionUserAnswerField.innerText.length == 3) {
        checkAnswer(sessionUserAnswerField.innerText);
    }
});


function checkAnswer(userGuess) {
    const answer = sessionStorage.getItem(sessionAnswerKey);
    if (userGuess == answer) {
        duringGameDisplay.setAttribute('hidden', true);
        afterGameDisplay.setAttribute('hidden');
        sessionTrueAnswerField.innerText = answer;
        updateScore();
    } else {
        const previousAttemptAmount = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
        sessionStorage.setItem(sessionUserAttemptsKey, previousAttemptAmount + 1);
        sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
        sessionUserAnswerField.innerText = '';
        sessionUserWrongAnswerField.innerText = userGuess;
    }
}


function updateScore() {
    const sessionAttemptsValue = parseInt(sessionStorage.getItem(sessionUserAttemptsKey));
    const localAttemptsValue = parseInt(localStorage.getItem(localMaximumAttemptsKey));
    if (sessionAttemptsValue > localAttemptsValue) {
        localStorage.setItem(localMaximumAttemptsKey, sessionAttemptsValue);
        localMaximumAttemptField.innerText = sessionAttemptsValue;    
    }
    const previousTotalVictoryAmount = parseInt(localStorage.getItem(localTotalVictoryKey));
    localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount + 1);
    localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
}


window.addEventListener('beforeunload', function () {
    sessionUserAnswerField.innerText = '';
    sessionUserWrongAnswerField.innerText = '';
    sessionStorage.setItem(sessionUserAttemptsKey, 0);
    sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey);
});


// NOTES
// Pada materi "Menambahkan Item Storage", kita sudah menggunakan method setItem() untuk membuat sebuah item storage pada session storage maupun local storage ketika item storage dengan key yang digunakan belum ada.
// Namun, jika item storage tersebut sudah ada, kita bisa gunakan method setItem() untuk memodifikasi nilai yang terdapat pada item storage tersebut sesuai dengan nilai key-nya.
// (DI ./assets/8. Implementasi web storage memodifikasi item storage/1)
// (DI ./assets/8. Implementasi web storage memodifikasi item storage/2)

// Untuk mengakses item pada session storage maupun local storage, kita bisa menggunakan method setItem() dari masing-masing jenis storage:
// (DI KOLOM 51, 54)

// Kemudian kita akan menambahkan kode-kode berikut di bagian akhir isi dari elemen <script>:
// (DI KOLOM 87-148)


// Tenang, walau kelihatan banyak, kita akan membahas fungsi dan masing-masing method addEventListener di atas satu per satu.
// Kita mulai dari penambahan event listener pada variabel playButton, yakni variabel yang memiliki referensi ke tombol yang bertuliskan "Bermain".
// (DI KOLOM 87)
// Tombol ini memiliki dua fungsionalitas yakni menghasilkan angka yang harus ditebak melalui fungsi getAnswer() dan menyimpannya pada session storage dengan key sessionAnswerKey. 
//                                              Fungsionalitas kedua adalah mengubah layout pada kumpulan elemen "Game Board".

// Elemen ini sebenarnya mengandung 3 layout berbeda, di mana hanya 1 saja yang ditampilkan berdasarkan skenario tertentu. 
// Layout-layout disembunyikan melalui atribut hidden. 
// Jika ingin dimunculkan, atribut tersebut (hidden) perlu dihilangkan dengan method removeAttribute(), 
// sementara layout sebelumnya disembunyikan dengan method setAttribute().
// Sehingga, jika tombol "Bermain" ditekan, maka layout pada elemen "Game Board" akan berubah.
// Setelah layout dari elemen "Game Board" berubah, muncul layout baru di mana salah satu konten paling mencolok adalah 3 tombol masing-masing berisi angka "1", "2", dan "3". Masing-masing tombol tersebut akan kita berikan sebuah event listener untuk event "click".
// (DI KOLOM 94-114)
// Setiap event listener dari ketiga tombol tersebut kurang lebih memiliki fungsionalitas yang sama, yakni menambahkan angka ke dalam kombinasi tebakan user berdasarkan tombol yang ditekan.

// Berikutnya kita akan membahas penerapan dari fungsi checkAnswer() untuk memeriksa apakah tebakan user sudah benar atau belum. Kode fungsi tersebut akan dibuat sebagai berikut:
// (DI KOLOM 117-131)
// Fungsi checkAnswer akan menjalankan kode yang berbeda berdasarkan kondisi apakah user berhasil menebak angka yang tepat sesuai di session storage sebelumnya.
// Jika user salah menebak, stats pada Game Session Stats akan menghitung jumlah masukan tebakan yang salah. Kemudian halaman web akan menampilkan informasi tebakan kita salah.
// (DI ./assets/8. Implementasi web storage memodifikasi item storage/6)
// Namun, jika tebakan user sudah sama dengan jawaban yang dihasilkan pada sistem yang tersimpan pada session storage, tampilan elemen Game Board akan berubah. Tampilan elemen gameboard akan memberitahu user bahwa ia telah menebak dengan tepat. Selain itu, stats pada local stats akan juga ikut diperbarui.
// (DI ./assets/8. Implementasi web storage memodifikasi item storage/7)

// Keren, bukan? Dengan memanfaatkan local storage dan session storage, kita bisa menyimpan progress selama memainkan permainan tebak angka!
// Tunggu sebentar, perhatikan kode yang dijalankan ketika user menebak dengan tepat. Terdapat pemanggilan fungsi yang bernama updateScore() seperti kode yang tercetak tebak di bawah ini:
// (DI KOLOM 134-144)