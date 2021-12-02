<template>
  <div>
    <div class="company-calendar-wrap">
      <div class="company-consultant">
        <div class="company-consultant-info-about">
          <div class="company-consultant-name">Личные данные:</div>
          <div class="company-consultant-name"></div>
          <div class="company-consultant-name">Тестов</div>
          <div class="company-consultant-position">Фамилия</div>
          <div class="company-consultant-name">Тест</div>
          <div class="company-consultant-position">Имя</div>
          <div class="company-consultant-name">Тестович</div>
          <div class="company-consultant-position">Отчество</div>
        </div>
        <div class="company-consultant-info-about">
          <div class="company-consultant-name">Контакты:</div>
        </div>
        <a class="company-consultant-phone" href="tel:84951033030"
          >+7 977 577 77 7</a
        >
        <div class="company-consultant-info-about">
          <div class="company-consultant-name">Почта:</div>
        </div>
        <div class="company-consultant-info-about">
          <path
            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
            data-v-f39c4a28=""
          ></path>
          <div class="company-consultant-name">testov_tt@test.test</div>
        </div>
        <!--<div class="row align-items-start">
        <div class="col-9">
          <p class="h3">Личные данные</p>
          <br />
          <p class="h4">Персональная информация</p>
          <dl class="row">
            <dt class="col-sm-3">Фамилия</dt>
            <dd class="company-consultant-name">Тестов</dd>
            <dt class="col-sm-3">Имя</dt>
            <dd class="company-consultant-name">Тест</dd>
            <dt class="col-sm-3">Отчество</dt>
            <dd class="company-consultant-name">Тестович</dd>
          </dl>
          <p class="h4">Контактная информация</p>
          <dl class="row">
            <dt class="col-sm-3">Контактный телефон</dt>
            <dd class="col-sm-9">+7 977 577 77 77</dd>
            <dt class="col-sm-3">Электронная почта</dt>
            <dd class="col-sm-9">testov_tt@test.test</dd>
          </dl>
        </div>
      </div>-->
      </div>
      <div class="company-consultant">
        <div class="company-consultant-info">
          <div class="company-consultant-img-box" style="border-radius: 100%">
            <img
              class="company-consultant-img"
              src="http://10.68.5.243/upload/main/476/476c8c674d0c302163f5d03734e538dd.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container" id="vue-personal-mailviewer-app">
      <section class="btn-controller__wrap">
        <button type="button" class="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-envelope-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
            />
          </svg>
          Сообщения <span class="badge badge-light">3</span>
        </button>

        <button type="button" class="btn btn-danger" disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-bell-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
            />
          </svg>
          Уведомления <span class="badge badge-warning">1</span>
        </button>
      </section>

      <div class="row">
        <div class="col-5" style="padding-right: 0">
          <section>
            <div
              class="list-group"
              style="
                border-bottom-right-radius: 0rem;
                border-top-right-radius: 0rem;
              "
            >
              <a href="#" class="list-group-item list-group-item-action active">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Заголовок сообщения №1</h5>
                  <small>сегодня</small>
                </div>
                <p class="mb-1">Часть текста сообщения 1...</p>
                <small>...опциональное поле...</small>
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Заголовок сообщения №2</h5>
                  <small class="text-muted">2 дня назад</small>
                </div>
                <p class="mb-1">Часть текста сообщения 2...</p>
                <small class="text-muted">...опциональное поле...</small>
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Заголовок сообщения №3</h5>
                  <small class="text-muted">5 дней назад</small>
                </div>
                <p class="mb-1">Часть текста сообщения 3...</p>
                <small class="text-muted">...опциональное поле...</small>
              </a>
            </div>
          </section>
        </div>
        <div class="col-7" style="padding-left: 0">
          <section
            class="personal-message__wrap"
            style="width: 100%; height: 100%; background-color: white"
          >
            <div class="personal-message__wrap__message-area">
              <p style="color: black"><strong>Тема сообщения #1.</strong></p>
              <p class="mb-1" style="color: gray; text-align: justify">
                Текст сообщения... текст-"рыба", часто используемый в печати и
                вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                текстов на латинице с начала XVI века. В то время некий
                безымянный печатник создал большую коллекцию размеров и форм
                шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                Ipsum не только успешно пережил без заметных изменений пять
                веков, но и перешагнул в электронный дизайн. Его популяризации в
                новое время послужили публикация листов Letraset с образцами
                Lorem Ipsum в 60-х годах и, в более недавнее время, программы
                электронной вёрстки типа Aldus PageMaker, в шаблонах которых
                используется Lorem Ipsum.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
.container {
  padding-top: 30px;
}
.btn-controller__wrap > button {
  margin-left: 10px;
}

.btn-controller__wrap > button:first-child {
  margin-left: 0px;
}

.personal-message__wrap__message-area {
  padding: 10px;
}
</style>