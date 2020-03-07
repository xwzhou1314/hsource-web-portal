<template>
  <div class="article-content" v-cloak>
    <iv-row>

        <div class="layout-content">
          <article-page-header :article="article"></article-page-header>
          <article-page-content>
            <article id="article-main-page" class="typo container" slot="content" ref="article"
                     v-html="article.content">
            </article>
          </article-page-content>
        </div>

    </iv-row>
  </div>
</template>
<script type="text/ecmascript-6">
import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
export default {
  data () {
    return {
      article: {}
    }
  },
  components: {
    'article-page-header': ArticlePageHeader,
    'article-page-content': ArticlePageContent
  },
  created: function () {
    this.getArticle(this.$route.params.id)
  },
  methods: {
    getArticle (id) {
      this.$http({
        url: this.$http.adornUrl('api/item/invitation/selectInvitationById?id=' + id),
        method: 'get'
      }).then((resp) => {
        console.log(resp)
        if (resp.status === 200) {
          this.article = resp.data
        }
      })
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-content
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 10px 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 20px 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 50px 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
    .layout-left, .layout-right
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
        padding 0 10px
  p{
    text-indent:2em;
  }
</style>
