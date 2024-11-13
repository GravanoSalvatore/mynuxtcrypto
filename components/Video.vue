<template>
    <div class="container mt-5">
      <!-- Адаптивное видео -->
      <div class="embed-responsive embed-responsive-16by9 mb-5">
        <iframe
          class="embed-responsive-item"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/GoQVqhwOK4g?si=sWvjPxjmi7uMhu3K"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
  
      <!-- Ряд с карточками -->
      <!-- <div class="row">
        
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img
              src="https://via.placeholder.com/350x150"
              class="card-img-top"
              alt="Card image"
            />
            <div class="card-body">
              <h5 class="card-title">Заголовок карточки 1</h5>
              <p class="card-text">
                Это описание карточки 1. Карточка с адаптивным дизайном.
              </p>
              <a href="#" class="btn btn-primary">Подробнее</a>
            </div>
          </div>
        </div>
  
        
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img
              src="https://via.placeholder.com/350x150"
              class="card-img-top"
              alt="Card image"
            />
            <div class="card-body">
              <h5 class="card-title">Заголовок карточки 2</h5>
              <p class="card-text">
                Это описание карточки 2. Карточка с адаптивным дизайном.
              </p>
              <a href="#" class="btn btn-primary">Подробнее</a>
            </div>
          </div>
        </div>
  
        
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img
              src="https://via.placeholder.com/350x150"
              class="card-img-top"
              alt="Card image"
            />
            <div class="card-body">
              <h5 class="card-title">Заголовок карточки 3</h5>
              <p class="card-text">
                Это описание карточки 3. Карточка с адаптивным дизайном.
              </p>
              <a href="#" class="btn btn-primary">Подробнее</a>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </template>
  
  <script>
  export default {
    name: "VideoWithCards",
  };
  </script>
  
  <style scoped>
  /* Адаптивное видео */
  .embed-responsive {
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding: 0;
    overflow: hidden;
  }
  
  .embed-responsive-16by9 {
    padding-top: 56.25%; /* Соотношение 16:9 */
  }
  
  .embed-responsive-item {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  
  /* Стиль для карточек */
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  