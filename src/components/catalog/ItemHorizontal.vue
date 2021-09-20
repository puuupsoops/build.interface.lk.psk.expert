<template>
  <div class="item horizontal_item dark_bg">
    <div class="item_top_label">New collection</div>
    <div class="horizontal_item_sides">
      <div class="item__image_container dark_bg">
        <div class="item__images">
          <img class="item__image active" src="upload/catalog/item__image1.jpg" />
          <img class="item__image" src="upload/catalog/item__image3.jpg" />
          <img class="item__image" src="upload/catalog/item__image5.jpg" />
          <img class="item__image" src="upload/catalog/item__image6.jpg" />
        </div>
        <ul class="item_images_controls"></ul>
      </div>

      <div class="item__body">
        <div class="item__body__heading">
          <div class="item__image_heading">
            <div class="item__image_logo"><img src="upload/catalog/item_logo2.png" /></div>
          </div>
          <div class="horizontal_item_heading">
            <div class="item__title">Куртка рабочая мужская зимняя "Прим"</div>
            <div class="item__art">КУР591</div>
          </div>
        </div>
        <div class="item__body_container">
          <ul class="item__hover_list">
            <li><strong>Размеры: </strong><span>с 40-42 по 60-62</span></li>
            <li><strong>рост: </strong><span>158-164, 170-176</span></li>
          </ul>
        </div>
        <div class="item__body_bottom">
          <div class="item__body_top">
            <div class="item__prices">
              <div class="item__price stroked">3200 ₽</div>
              <div class="item__price"><strong>1 345 </strong>₽ (опт.)</div>
            </div>
          </div>
          <a class="modal item__hover_link" href="#modal_preview">БЫСТРЫЙ ПРОСМОТР</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JQuery from "../../js/jquery";

export default {
  mounted() {
    let $ = JQuery;

    $(".item").each(function () {
      var th = $(this),
        imagesLen = th.find(".item__images>.item__image").length;

      for (var i = 1; i <= imagesLen; i++) {
        th.find(".item_images_controls").append(
          '<li style="width: ' + 100 / imagesLen + '%"></li>'
        );
      }

      $(".item_images_controls>li")
        .mouseenter(function () {
          var th = $(this),
            ind = th.index();
          th.closest(".item__image_container")
            .find(".item__images>img")
            .eq(ind)
            .addClass("active")
            .siblings()
            .removeClass("active");
        })
        .mouseleave(function () {
          var th = $(this);
          th.closest(".item__image_container")
            .find(".item__images>img")
            .not(":first-child")
            .removeClass("active")
            .siblings("img:first-child")
            .addClass("active");
        }); // select
    });
  },
};
</script>

<style scoped>
.dark_bg .horizontal_item_sides .item_likes_image svg:not(.static) *,
.dark_bg .side_modal .header_top_line .inline_select .fe_img svg * {
  fill: #fff !important;
}

.catalog_slide:hover .catalog_slide_hover,
.horizontal_item:hover .item__body_main_info,
.item_images_controls > :hover:before,
.small_item:hover .item__body_main_info {
  opacity: 1;
}

.gray_bg .horizontal_item_sides {
  background-color: rgba(255, 255, 255, 0);
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
}

.gray_bg .horizontal_item:hover .horizontal_item_sides {
  background-color: #fff;
}

.breadcrumbs_list,
.horizontal_item_sides {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
}

.color_block_selector,
.dark_bg .horizontal_item_sides,
.frame_check_block {
  -webkit-transition: all 0.3s ease-in-out;
}

.dark_bg .breadcrumbs_list a:hover,
.dark_bg .horizontal_item_sides .item__hover_link,
.dark_bg .horizontal_item_sides .item_likes_count {
  color: #fce326;
}

.horizontal_item .item__hover_list {
  text-align: left;
}

.horizontal_item .item__hover_list > * {
  border: none;
}

.horizontal_item .item_likes_image img,
.horizontal_item .item_likes_image svg {
  width: 1.8rem;
  max-height: 1.8rem;
}

.horizontal_item .item__body_container:not(:last-child) {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.horizontal_item:hover .horizontal_item_sides {
  -webkit-box-shadow: 0 1.1rem 10.3rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.1rem 10.3rem rgba(0, 0, 0, 0.1);
}

.horizontal_item:hover .item__image_container {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.horizontal_item_sides {
  display: flex;
  background-color: #fff;
}

.horizontal_item_sides .item__image_container {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 22rem;
  height: 32rem;
  margin-bottom: 0;
}

.horizontal_item_sides .item__body {
  width: -webkit-calc(100% - 22rem);
  width: calc(100% - 22rem);
  padding: 1.5rem 3rem;
}

.dark_bg .horizontal_item_sides {
  background: rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
}

.dark_bg .horizontal_item_sides .item_likes_image.filled svg * {
  fill: #fce326 !important;
}

.dark_bg .gray_bg .horizontal_item:hover .horizontal_item_sides,
.dark_bg .horizontal_item_sides:hover {
  background: rgba(255, 255, 255, 0.05);
  -webkit-box-shadow: 0 1.1rem 10.3rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.1rem 10.3rem rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 600px) {
  .horizontal_item .item__hover_list {
    display: block;
  }
  .horizontal_item_sides .item__image_container {
    width: 130px;
    height: 190px;
  }
  .horizontal_item_sides .item__body {
    width: -webkit-calc(100% - 130px);
    width: calc(100% - 130px);
    padding: 0 0 0 15px;
  }
  .horizontal_item_sides .item__body .item_likes {
    line-height: normal;
  }
  .horizontal_item_sides .item__body .horizontal_item_heading {
    padding: 0;
    margin-bottom: 1rem;
    border-bottom: none;
    min-height: unset;
  }
  .horizontal_item_sides .item__body .item__body_bottom > :not(:last-child) {
    margin-bottom: 1rem;
  }
  .horizontal_item .item__body_container:not(:last-child) {
    padding: 0;
    margin-bottom: 1rem;
    border-bottom: none;
  }
  .horizontal_item_heading .item__title {
    font-size: 12px;
  }
  .horizontal_item:hover .horizontal_item_sides {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}

@media screen and (max-width: 420px) {
  .horizontal_item .item__body_container {
    display: none;
  }
  .horizontal_item .item__body_top {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -webkit-flex-direction: column-reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .horizontal_item .item__body_top > :not(:last-child) {
    margin-top: 1rem;
  }
}
</style>
