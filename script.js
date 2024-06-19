let score = 0;
const scoreThreshold = 10; // Количество кликов до проверки на смену изображения
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg','image4.jpg','image5.jpg','image6.jpg','image7.jpg','image8.jpg','image9.jpg','image10.jpg','image11.jpg','image12.jpg','image13.jpg','image14.jpg','image15.jpg','image16.jpg','image17.jpg','image18.jpg','image19.jpg','image20.jpg','image29.jpg','image22.jpg','image23.jpg','image24.jpg','image25.jpg','image26.jpg','image27.jpg','image28.jpg']; // Массив с изображениями
const addedImages = new Set(); // Множество для отслеживания добавленных изображений

function updateTableHeader() {
    const header = document.getElementById('tableHeader');
    header.innerText = `Выбито ${addedImages.size} / ${images.length}`;
}

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

document.getElementById('clickerImage').addEventListener('click', () => {
    score++;
    document.getElementById('score').innerText = `Кликов: ${score}`;
    
    if (score % scoreThreshold === 0) {
        const randomChance = Math.random(); // Генерация случайного числа от 0 до 1

        if (randomChance > 0.6) { // Смена изображения с вероятностью 50%
            let newImage = getRandomImage();
            
            // Убедимся, что новое изображение отличается от текущего
            while (newImage === document.getElementById('clickerImage').src.split('/').pop()) {
                newImage = getRandomImage();
            }

            document.getElementById('clickerImage').src = newImage;
            
            // Проверка на уникальность и добавление записи в таблицу истории
            if (!addedImages.has(newImage)) {
                addedImages.add(newImage);
                const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
                const newRow = historyTable.insertRow();
                const newCell = newRow.insertCell(0);
                const newImg = document.createElement('img');
                newImg.src = newImage;
                newImg.width = 50; // Устанавливаем ширину миниатюры
                newCell.appendChild(newImg);

                // Обновление заголовка таблицы
                updateTableHeader();
            }
        }
    }
});

// Инициализация заголовка таблицы при загрузке
updateTableHeader();