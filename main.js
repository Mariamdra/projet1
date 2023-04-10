class LoadPictures {
    constructor(apiUrl, displayArea = 'body', batchSize = 10, sortOrder = 'ASC') {
      this.apiUrl = apiUrl;
      this.displayArea = displayArea;
      this.batchSize = batchSize;
      this.sortOrder = sortOrder;
      this.lastBatchIndex = 0;
      this.photos = [];
      this.loadingIcon = document.createElement('img');
      this.loadingIcon.src = 'https://cdn.dribbble.com/users/1302953/screenshots/5869508/______.gif';
      this.loadMoreBtn = document.getElementById('load-more-btn');
      this.loadMoreBtn.addEventListener('click', () => this.display());
    }
  
    async load() {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.photos = data.sort((a, b) => {
        if (this.sortOrder === 'ASC') {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
      this.display();
    }
  
    display() {
      const displayArea = document.querySelector(this.displayArea);
      displayArea.innerHTML = '';
  
      for (let i = this.lastBatchIndex; i < this.lastBatchIndex + this.batchSize; i++) {
        if (this.photos[i]) {
          const photo = this.photos[i];
          const img = document.createElement('img');
          img.src = photo.url;
          displayArea.appendChild(img);
        }
      }
  
      this.lastBatchIndex += this.batchSize;
      if (this.lastBatchIndex >= this.photos.length) {
        this.loadMoreBtn.style.display = 'none';
      } else {
        this.loadMoreBtn.style.display = 'block';
      }
    }
  }
  
  const loadPictures = new LoadPictures('https://jsonplaceholder.typicode.com/photos', '#photos');
  loadPictures.load();
  